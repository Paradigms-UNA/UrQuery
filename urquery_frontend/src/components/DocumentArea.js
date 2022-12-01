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
import { useDocument } from "../hooks/useDocument";

export const DocumentArea = () => {
  const { xml, setXml, currentDocument, setCurrentDocument, handleFormatXML } =
    useGlobalContext();

  const { xmlDocuments, editDocument, saveDocument } = useDocument();

  const onEditorsChange = (value) => {
    setXml(value);

    // Update the data of the document with code editor value
    setCurrentDocument((prev) => ({
      ...prev,
      data: value,
    }));
  };

  const handleViewDocument = (e) => {
    const id = e.target.value;

    const document = xmlDocuments.find((doc) => doc.id === id);

    if (!document) return;

    setCurrentDocument(document);

    handleFormatXML(document.data, setXml);
  };

  const handleSaveDocument = () => {
    if (currentDocument?.id) {
      editDocument();
      return;
    }

    saveDocument();
  };

  const handleClearEditor = () => {
    setCurrentDocument({});
    setXml("");
  };

  return (
    <>
      <CodeEditor language="xml" onChange={onEditorsChange} textValue={xml} />

      <div className="d-flex flex-wrap justify-content-between gap-3 mt-3">
        <div className="flex-fill">
          <select
            className="form-select form-select-custom"
            onChange={handleViewDocument}
            value={currentDocument?.id || "default"}
          >
            <option value="default" hidden>
              Select a document
            </option>

            {xmlDocuments.map((document) => (
              <option key={document.id} value={document.id}>
                {document.title}
              </option>
            ))}
          </select>
        </div>

        <div className="d-flex flex-wrap gap-2">
          <Button
            variant="btn btn-custom"
            onClick={() => handleFormatXML(xml, setXml)}
          >
            Format
          </Button>

          <Button variant="btn btn-custom" onClick={handleSaveDocument}>
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
