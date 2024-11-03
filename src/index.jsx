import React from "react";
import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view"; // Ensure this path is correct
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

const MyFlixApplication = () => {
  return <MainView />;
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<MyFlixApplication />);
