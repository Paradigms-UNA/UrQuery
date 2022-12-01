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

import React from "react";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { CodeEditor } from "./CodeEditor";
import { useScript } from "../hooks/useScript";
import { useCompile } from "../hooks/useCompile";

import Spinner from "react-bootstrap/Spinner";

export const EditingArea = () => {
  const {
    code,
    setCode,
    setResult,
    compiling,
    currentScript,
    setCurrentScript,
    handleFormatXML,
  } = useGlobalContext();

  const { scriptsList, editScript, saveScript } = useScript();

  const { compile } = useCompile();

  const onEditorsChange = (value) => {
    setCode(value);

    setCurrentScript((prev) => {
      if (!prev?.id) return {};

      return {
        ...prev,
        data: value,
      };
    });
  };

  const handleViewScript = (e) => {
    const id = e.target.value;

    const script = scriptsList.find((script) => script.id === id);

    if (!script) return;

    setCurrentScript(script);
    setCode(script.data);
    setResult("");
  };

  const handleSaveScript = () => {
    if (currentScript?.id) {
      editScript();
      return;
    }

    saveScript();
  };

  const handleCompile = () => {
    compile();
  };

  const handleRedisplay = () => {
    if (currentScript?.target) {
      setResult(currentScript.target);
      return;
    }

    toast.error("The Script has not been compiled");
  };

  const handleClearEditor = () => {
    setCurrentScript({});
    setCode("");
    setResult("");
  };

  return (
    <>
      <CodeEditor language="xml" onChange={onEditorsChange} textValue={code} />

      <div className="d-flex flex-wrap justify-content-between gap-3 mt-3">
        <div className="flex-fill">
          <select
            className="form-select form-select-custom"
            onChange={handleViewScript}
            value={currentScript?.id || "default"}
          >
            <option value="default" hidden>
              Select a script
            </option>

            {scriptsList.map((script) => (
              <option key={script.id} value={script.id}>
                {script.title}
              </option>
            ))}
          </select>
        </div>

        <div className="d-flex flex-wrap gap-2">
          <Button variant="btn btn-custom" onClick={handleCompile}>
            {compiling ? (
              <>
                <Spinner animation="border" size="sm" /> <span>Compiling</span>
              </>
            ) : (
              "Compile"
            )}
          </Button>

          <Button variant="btn btn-custom" onClick={handleRedisplay}>
            Redisplay
          </Button>

          <Button variant="btn btn-custom" onClick={handleSaveScript}>
            Save
          </Button>

          <Button variant="btn btn-custom" onClick={handleClearEditor}>
            Clear
          </Button>
        </div>
      </div>
    </>
  );
};
