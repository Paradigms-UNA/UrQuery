import React, { createContext, useState } from "react";
import { toast } from "react-toastify";
import formatXML from "xml-formatter";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [code, setCode] = useState("");
  const [xml, setXml] = useState("");
  const [result, setResult] = useState("");
  const [xmlDocuments, setXmlDocuments] = useState([]);
  const [currentDocument, setCurrentDocument] = useState({});
  const [scriptsList, setScriptsList] = useState([]);
  const [currentScript, setCurrentScript] = useState({});
  const [hasCompile, setHasCompile] = useState(false);

  const handleFormatXML = (value, setValue) => {
    try {
      const formattedXML = formatXML(value);

      setValue(formattedXML);
    } catch (error) {
      toast.error("Please entry a valid XML");
    }
  };

  const showError = (statusCode) => {
    console.log(statusCode);
    let message = "";
    switch (statusCode) {
      case 404:
        message = "Document Not Found";
        break;
      case 500:
        message = "Prolog Connection Error";
        break;
      default:
        message = "Unkown Error";
    }
    toast.error(message);
  };

  const value = {
    code,
    setCode,
    xml,
    setXml,
    result,
    setResult,
    xmlDocuments,
    setXmlDocuments,
    currentDocument,
    setCurrentDocument,
    scriptsList,
    setScriptsList,
    currentScript,
    setCurrentScript,
    showError,
    handleFormatXML,
    hasCompile,
    setHasCompile,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
