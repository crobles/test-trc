import { Injectable } from '@nestjs/common';
import { UseCase } from '../../shared/interfaces/use-case.interface';
import { nodeTree } from '../../shared/json-files/nodeTree';

@Injectable()
export class NodeCascadeProcessingDataUseCase implements UseCase {
  private config: any;
  constructor() {
    this.loadConfig();
  }
  private loadConfig() {
    console.log(typeof nodeTree);
    this.config = nodeTree;
  }
  async run(): Promise<any> {
    const dataNode = this.transformDataNode(this.config);
    const dataTree = this.transformDataTree(dataNode);
    return JSON.stringify(dataTree, null, 2);
  }

  transformDataNode(data: any): any {
    const idMap = data.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});

    return data.map((item) => {
      if (item.nodeList) {
        item.nodeList = item.nodeList.map((id) => {
          const nodeObject = idMap[id];
          return {
            id: nodeObject.id,
            node: nodeObject.node,
            value: item.value,
          };
        });
      }
      return item;
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
