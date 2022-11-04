import React from "react";
import Editor from "@monaco-editor/react";

const componentName = "EA";

export const EditingArea = ({ onChange, code }) => {
  const handleEditorChange = (value) => {
    onChange(componentName, value);
  };

  return (
    <Editor
      // className="mt-1 mb-1 border border-2 rounded-3"
      height="30vh"
      width={`100%`}
      language="xml"
      value={code}
      theme="vs-dark"
      options={{ wordWrap: "on" }}
      onChange={handleEditorChange}
      /* defaultValue="// A test comment" */
    />
  );
};
