import React from "react";
import ReactDOM from "react-dom/client"; // Correct import for createRoot
import App from "./App";

// Create the root for the element with id 'subpart'
const subpart = ReactDOM.createRoot(document.getElementById('subpart'));

// Render the App component
subpart.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
