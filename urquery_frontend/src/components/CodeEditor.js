/*

UrQuery

Autores:
  Elias Arias Muñoz
  Jose Andres Lopez Cruz
  Carlos Albornoz Rondon
  Jose Joaquin Garcia Ramirez
  Julissa Seas Segura

Curso:
  Universidad Nacional
  Facultad de Ciencias Exactas y Naturales
  Escuela de Informática
  EIF-400 Paradigmas de Programación
  II ciclo, 2022
  
*/

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
