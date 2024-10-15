import { Injectable } from '@nestjs/common';
import { UseCase } from '../../shared/interfaces/use-case.interface';
import { nodeTree } from '../../shared/json-files/nodeTree';

@Injectable()
export class NodeCascadeProcessingDataUseCase implements UseCase {
  async run(): Promise<any> {
    const data = JSON.parse(JSON.stringify(nodeTree));
    const dataNode = this.transformDataNode(data);
    const dataTree = this.transformDataTree(dataNode);
    return JSON.stringify(dataTree, null, 2);
  }

  transformDataNode(data: any): any {
    const idMap = data.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});

    return data.map((item) => {
      const newItem = { ...item }; // Copia superficial del item
      if (newItem.nodeList) {
        newItem.nodeList = newItem.nodeList.map((id) => {
          const nodeObject = idMap[id];
          return {
            id: nodeObject.id,
            node: nodeObject.node,
            value: item.value,
          };
        });
      }
      return newItem; // Devuelve el nuevo objeto en lugar de mutar el original
    });
  }

  transformDataTree(data: any): any {
    const graph = {};

    data.forEach((item) => {
      graph[item.id] = {
        id: item.id,
        node: item.node,
        value: item.value,
        children: [],
      };
    });

    data.forEach((item) => {
      if (item.nodeList) {
        item.nodeList.forEach((child) => {
          graph[item.id].children.push(graph[child.id]);
        });
      }
    });

    return graph[1];
  }
}
