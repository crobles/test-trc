import React from "react";
import Graph from "./Graph";

const API_URL = process.env.API_URL;

const MainPage = async () => {
  const res = await fetch(`${API_URL}/node-tree-backend/v1/node/cascade`, {
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h1>Datos del API</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      <div style={styles.mainContent}>
        <h2>Grafo</h2>
        <Graph data={data} />
      </div>
    </div>
  );
};

// Estilos en línea para los contenedores
import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100vh",
  },
  sidebar: {
    width: "20%",
    backgroundColor: "black",
    padding: "20px",
    boxSizing: "border-box",
    overflowY: "auto",
  },
  mainContent: {
    width: "80%",
    padding: "20px",
    boxSizing: "border-box",
  },
};

export default MainPage;
