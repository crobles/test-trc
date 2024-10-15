import React from "react";
import Graph from "./Graph";

const MainPage = async () => {
  const res = await fetch(
    "http://localhost:3100/node-tree-backend/v1/node/cascade",
    {
      cache: "no-store",
    }
  );

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
    flexDirection: "row", // Dos divs horizontales
    height: "100vh", // Altura completa de la ventana
  },
  sidebar: {
    width: "20%", // 20% del ancho
    backgroundColor: "black", // Un color de fondo claro
    padding: "20px",
    boxSizing: "border-box",
    overflowY: "auto", // Para permitir el desplazamiento si el contenido es largo
  },
  mainContent: {
    width: "80%", // 80% del ancho
    padding: "20px",
    boxSizing: "border-box",
  },
};

export default MainPage;
