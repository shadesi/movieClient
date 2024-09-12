// Import React and necessary modules
import React from "react";
import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";

// Import Bootstrap and custom styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

// Main component that wraps MainView
const MyFlixApplication = () => {
  return <MainView />;
};

// Find the root element in the DOM
const container = document.getElementById("root");

// Create a root and render the application
const root = createRoot(container);
root.render(<MyFlixApplication />);
