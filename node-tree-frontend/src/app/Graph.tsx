/* eslint-disable @typescript-eslint/no-explicit-any */
// components/Graph.tsx
"use client"; // Marca este componente como Client Component

import { useEffect, useRef } from "react";
import { DataSet, Network } from "vis-network/standalone";

interface Node {
  id: number;
  node: string;
  value: number;
  children: Node[];
}

interface GraphProps {
  data: Node;
}

const getEdgesNodes = (
  node: Node,
  edges: any[],
  nodes: any[],
  parentId?: number
) => {
  const { id, node: label, value, children } = node;

  nodes.push({ id, label: `ID: ${id}\n${label}\nValue: ${value}`, value });

  if (parentId !== undefined) {
    edges.push({ from: parentId, to: id });
  }

  for (const child of children) {
    getEdgesNodes(child, edges, nodes, id);
  }
};

const calculateSumTot = (nodeId: number, nodes: any[], edges: any[]) => {
  let sum = 0;
  let currentNodeId = nodeId;

  while (currentNodeId) {
    const node = nodes.find((n) => n.id === currentNodeId);
    if (!node) break;
    sum += node.value;

    const parentEdge = edges.find((e) => e.to === currentNodeId);
    currentNodeId = parentEdge ? parentEdge.from : undefined;
  }

  return sum;
};

const Graph: React.FC<GraphProps> = ({ data }) => {
  const containerR = useRef<HTMLDivElement>(null);
  const networkR = useRef<Network | null>(null);

  useEffect(() => {
    const nodes: any[] = [];
    const edges: any[] = [];

    getEdgesNodes(data, edges, nodes);

    const dataSet = {
      nodes: new DataSet(nodes),
      edges: new DataSet(edges),
    };

    //parametros para el grafo
    const options = {
      height: "600px",
      width: "100%",
      layout: {
        hierarchical: {
          direction: "UD",
          sortMethod: "directed",
        },
      },
      nodes: {
        shape: "circle",
      },
      edges: {
        arrows: {
          to: { enabled: true, scaleFactor: 1 },
        },
      },
      interaction: {
        hover: true,
        zoomView: false,
        dragView: false,
        selectable: true,
      },
      physics: {
        enabled: false,
      },
    };

    if (containerR.current) {
      const network = new Network(containerR.current, dataSet, options);
      networkR.current = network;

      // el evento normal no es soportado T.T
      network.on("hoverNode", function (params) {
        const nodeId = params.node;
        const sum = calculateSumTot(nodeId, nodes, edges);
        const nodeLabel = `Sum to root: ${sum}`;

        const updatedNode = {
          ...nodes.find((n) => n.id === nodeId),
          label: nodeLabel,
        };
        dataSet.nodes.update(updatedNode);
      });

      // maldita logica >:v
      network.on("blurNode", function (params) {
        const nodeId = params.node;
        const originalNode = nodes.find((n) => n.id === nodeId);
        if (originalNode) {
          const updatedNode = {
            id: originalNode.id,
            label: `ID: ${originalNode.id}\n${originalNode.node}\nValue: ${originalNode.value}`,
          };
          dataSet.nodes.update(updatedNode);
        }
      });

      return () => {
        network.destroy();
      };
    }
  }, [data]);

  return <div ref={containerR} style={{ border: "1px solid lightgray" }} />;
};

export default Graph;
