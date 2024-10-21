# Node Tree

## test-trc

Este proyecto monorepo, se compone de dos artefactos.
1- un microservicio en nestJs con arquitectura hexagonal, el cual expone el siguiente endpoint

```sh
/node-tree-backend/v1/node/cascade
```

el cual retorna un json plano, con una estructura de padre e hijos, simulado la estructura de un grafo en base a un archivo json dado.
El archivo json original se encuentra al final de este documento

2- una app creada en nextJs, la cual consume la api ya mensionada y trae el resultado del archivo json convertido a nodos padre e hijo, simulando la estructura de un grafo y la gráfica correspondiente del grafo, ocupando la librería `vis-network`

La gracia de este gráfico es que es capaz de ordenar los nodos de tal manera que también se pueden sumar los valores que contiene cada nodo hasta su padre inicial, mostrando el total de la suma, poniendo el maouse sobre alguno de los nodos.

Para poder ejecutar este pryecto, es necesario crear el archivo `.env` copiando el archivo `.env-example` que esta en la carpeta del micro servicio de nestJs `node-tree-backend`.
Los valores deben ser los siguientes:

```sh
APP_PORT=3100
APP_ID=node-tree-backend
NODE_ENV=development
```

Luego de que ese archivo este creado correctamente, ejecutar el comando de docker correspondiente

```sh
docker compose up --build
```

cuando se termine de ejecutar las tareas en docker, pueden acceder al navegador e ingresar a
`http://localhost:3000`

Archivo original JSON:

```sh
[
  {
    id: 1,
    node: 'root node',
    value: 15,
    nodeList: [2, 3, 4],
  },
  {
    id: 2,
    node: 'branch 1',
    value: 15,
    nodeList: [5, 6],
  },
  {
    id: 3,
    node: 'branch 2',
    value: 15,
    nodeList: [7, 8, 9],
  },
  {
    id: 4,
    node: 'branch 3',
    value: 15,
    nodeList: [10, 11, 12, 13],
  },
  {
    id: 5,
    node: 'branch 1.1',
    value: 10,
    nodeList: [14, 15],
  },
  {
    id: 6,
    node: 'branch 1.2',
    value: 10,
    nodeList: [16, 17],
  },
  {
    id: 7,
    node: 'branch 2.1',
    value: 10,
    nodeList: [18, 19, 20],
  },
  {
    id: 8,
    node: 'branch 2.2',
    value: 10,
  },
  {
    id: 9,
    node: 'branch 2.3',
    value: 10,
  },
  {
    id: 10,
    node: 'branch 3.1',
    value: 10,
    nodeList: [21, 22],
  },
  {
    id: 11,
    node: 'branch 3.2',
    value: 10,
  },
  {
    id: 12,
    node: 'branch 3.3',
    value: 10,
  },
  {
    id: 13,
    node: 'branch 3.4',
    value: 10,
    nodeList: [23, 24],
  },
  {
    id: 14,
    node: 'branch 1.1.1',
    value: 5,
  },
  {
    id: 15,
    node: 'branch 1.1.2',
    value: 5,
  },
  {
    id: 16,
    node: 'branch 1.2.1',
    value: 5,
  },
  {
    id: 17,
    node: 'branch 1.2.2',
    value: 5,
  },
  {
    id: 18,
    node: 'branch 2.1.1',
    value: 5,
  },
  {
    id: 19,
    node: 'branch 2.1.2',
    value: 5,
  },
  {
    id: 20,
    node: 'branch 2.1.3',
    value: 5,
  },
  {
    id: 21,
    node: 'branch 3.1.1',
    value: 5,
  },
  {
    id: 22,
    node: 'branch 3.1.2',
    value: 5,
  },
  {
    id: 23,
    node: 'branch 3.4.1',
    value: 5,
  },
  {
    id: 24,
    node: 'branch 3.4.2',
    value: 5,
  },
];
```
