import Editor from "@monaco-editor/react";

export const CodeEditor = ({
  language,
  onChange,
  textValue,
  height = "30vh",
  readOnly = false,
}) => {
  const handleEditorChange = (value) => {
    onChange(value);
  };

  return (
    <Editor
      height={height}
      width={`100%`}
      language={language}
      theme="vs-dark"
      options={{
        wordWrap: "on",
        autoIndent: "full",
        formatOnPaste: true,
        formatOnType: true,
        readOnly,
      }}
      onChange={handleEditorChange}
      value={textValue}
    />
  );
};
