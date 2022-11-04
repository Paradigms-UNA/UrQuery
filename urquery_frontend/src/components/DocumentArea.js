import Editor from "@monaco-editor/react";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";

const componentName = "DA";

export const DocumentArea = ({ onChange, documentXml }) => {
  const handleLoadChange = (value) => {
    onChange(componentName, value);
  };

  return (
    <Editor
      // className="mt-1 mb-2 border border-2 rounded-3"
      height="30vh"
      width={`100%`}
      language="xml"
      theme="vs-dark"
      options={{ wordWrap: "on" }}
      onChange={handleLoadChange}
      value={documentXml}
    />
  );
};
