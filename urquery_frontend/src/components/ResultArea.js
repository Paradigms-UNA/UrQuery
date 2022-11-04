import Editor from "@monaco-editor/react";

export const ResultArea = ({ res }) => {
  return (
    <Editor
      // className="mt-1 mb-2 border border-2 rounded-3"
      height="75vh"
      width={`100%`}
      language="xml"
      theme="vs-dark"
      options={{ wordWrap: "on", readOnly: true }}
      value={res}
    />
  );
};
