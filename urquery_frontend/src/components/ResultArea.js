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

import Button from "react-bootstrap/Button";
import { CodeEditor } from "./CodeEditor";
import { useGlobalContext } from "../hooks/useGlobalContext";

export const ResultArea = () => {
  const { result, setResult } = useGlobalContext();

  const onEditorsChange = (value) => {
    setResult(value);
  };

  return (
    <>
      <CodeEditor
        language="javascript"
        onChange={onEditorsChange}
        textValue={result}
        height="70vh"
        readOnly={true}
      />

      <div className="d-flex flex-wrap justify-content-end gap-2 mt-3">
        <Button variant="btn btn-custom" onClick={() => setResult("")}>
          Clear
        </Button>
      </div>
    </>
  );
};
