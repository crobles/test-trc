const data = [
  {
    id: 1,
    node: "root node",
    value: 15,
    nodeList: [
      { id: 2, node: "branch 1", value: 15 },
      { id: 3, node: "branch 2", value: 15 },
      { id: 4, node: "branch 3", value: 15 },
    ],
  },
  {
    id: 2,
    node: "branch 1",
    value: 15,
    nodeList: [
      { id: 5, node: "branch 1.1", value: 15 },
      { id: 6, node: "branch 1.2", value: 15 },
    ],
  },
  {
    id: 3,
    node: "branch 2",
    value: 15,
    nodeList: [
      { id: 7, node: "branch 2.1", value: 15 },
      { id: 8, node: "branch 2.2", value: 15 },
      { id: 9, node: "branch 2.3", value: 15 },
    ],
  },
  {
    id: 4,
    node: "branch 3",
    value: 15,
    nodeList: [
      { id: 10, node: "branch 3.1", value: 15 },
      { id: 11, node: "branch 3.2", value: 15 },
      { id: 12, node: "branch 3.3", value: 15 },
      { id: 13, node: "branch 3.4", value: 15 },
    ],
  },
  {
    id: 5,
    node: "branch 1.1",
    value: 10,
    nodeList: [
      { id: 14, node: "branch 1.1.1", value: 10 },
      { id: 15, node: "branch 1.1.2", value: 10 },
    ],
  },
  {
    id: 6,
    node: "branch 1.2",
    value: 10,
    nodeList: [
      { id: 16, node: "branch 1.2.1", value: 10 },
      { id: 17, node: "branch 1.2.2", value: 10 },
    ],
  },
  {
    id: 7,
    node: "branch 2.1",
    value: 10,
    nodeList: [
      { id: 18, node: "branch 2.1.1", value: 10 },
      { id: 19, node: "branch 2.1.2", value: 10 },
      { id: 20, node: "branch 2.1.3", value: 10 },
    ],
  },
  { id: 8, node: "branch 2.2", value: 10 },
  { id: 9, node: "branch 2.3", value: 10 },
  {
    id: 10,
    node: "branch 3.1",
    value: 10,
    nodeList: [
      { id: 21, node: "branch 3.1.1", value: 10 },
      { id: 22, node: "branch 3.1.2", value: 10 },
    ],
  },
  { id: 11, node: "branch 3.2", value: 10 },
  { id: 12, node: "branch 3.3", value: 10 },
  {
    id: 13,
    node: "branch 3.4",
    value: 10,
    nodeList: [
      { id: 23, node: "branch 3.4.1", value: 10 },
      { id: 24, node: "branch 3.4.2", value: 10 },
    ],
  },
  { id: 14, node: "branch 1.1.1", value: 5 },
  { id: 15, node: "branch 1.1.2", value: 5 },
  { id: 16, node: "branch 1.2.1", value: 5 },
  { id: 17, node: "branch 1.2.2", value: 5 },
  { id: 18, node: "branch 2.1.1", value: 5 },
  { id: 19, node: "branch 2.1.2", value: 5 },
  { id: 20, node: "branch 2.1.3", value: 5 },
  { id: 21, node: "branch 3.1.1", value: 5 },
  { id: 22, node: "branch 3.1.2", value: 5 },
  { id: 23, node: "branch 3.4.1", value: 5 },
  { id: 24, node: "branch 3.4.2", value: 5 },
];

// Función para transformar el resultado en un grafo
const buildGraph = (data) => {
  const graph = {};

  // Crear nodos en el grafo
  data.forEach((item) => {
    graph[item.id] = {
      id: item.id,
      node: item.node,
      value: item.value,
      children: [], // Inicializar lista de hijos
    };
  });

  // Conectar nodos con sus nodos hijos
  data.forEach((item) => {
    if (item.nodeList) {
      item.nodeList.forEach((child) => {
        graph[item.id].children.push(graph[child.id]); // Añadir el nodo hijo al padre
      });
    }
  });

  // Retornar el nodo raíz que contiene toda la estructura
  return graph[1]; // Asumiendo que el id 1 es la raíz
};

const graph = buildGraph(data);
console.log(JSON.stringify(graph, null, 2));
