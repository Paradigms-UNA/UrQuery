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

import React, { createContext, useState } from "react";
import { toast } from "react-toastify";
import formatXML from "xml-formatter";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [code, setCode] = useState("");
  const [xml, setXml] = useState("");
  const [result, setResult] = useState("");
  const [compiling, setCompiling] = useState(false);
  const [currentDocument, setCurrentDocument] = useState({});
  const [currentScript, setCurrentScript] = useState({});
  const [xmlDocuments, setXmlDocuments] = useState([]);
  const [scriptsList, setScriptsList] = useState([]);

  const handleFormatXML = (value, setValue) => {
    try {
      const formattedXML = formatXML(value);

      setValue(formattedXML);
    } catch (error) {
      toast.error("Please entry a valid XML");
    }
  };

  const value = {
    code,
    setCode,
    xml,
    setXml,
    result,
    setResult,
    compiling,
    setCompiling,
    xmlDocuments,
    setXmlDocuments,
    currentDocument,
    setCurrentDocument,
    scriptsList,
    setScriptsList,
    currentScript,
    setCurrentScript,
    handleFormatXML,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
