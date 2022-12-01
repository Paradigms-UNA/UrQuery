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

import { useEffect, useCallback, useRef } from "react";
import { useGlobalContext } from "./useGlobalContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import documentService from "../services/documentService.mjs";

const MySwal = withReactContent(Swal);

export const useDocument = () => {
  const {
    xml,
    setXml,
    xmlDocuments,
    setXmlDocuments,
    currentDocument,
    setCurrentDocument,
    handleFormatXML,
  } = useGlobalContext();

  const docTitleInput = useRef();

  const getAllXMLDocuments = useCallback(async () => {
    try {
      const { data } = await documentService.getAll();

      setXmlDocuments(data);
    } catch (err) {
      toast.error("Cannot get the documents");
    }
  }, [setXmlDocuments]);

  useEffect(() => {
    getAllXMLDocuments();
  }, [getAllXMLDocuments]);

  const editDocument = () => {
    MySwal.fire({
      title: "Do you want to save the document changes?",
      showDenyButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Extract the id to send only the rest of the values
          const { id, ...rest } = currentDocument;

          handleFormatXML(rest.data, setXml);

          const { data } = await documentService.update(id, rest);

          setCurrentDocument(data);

          getAllXMLDocuments();

          Swal.fire("Saved!", "", "success");
        } catch (err) {
          toast.error("Cannot save the document");
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const saveDocument = () => {
    if (xml === "") {
      toast.error("Document Area is empty!");
      return;
    }

    MySwal.fire({
      title: "Do you want to create a new the document?",
      showDenyButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
      allowOutsideClick: false,
      html: (
        <input
          type="text"
          ref={docTitleInput}
          className="form-control"
          placeholder="Please enter the title"
          required
        />
      ),
      preConfirm: () => {
        const title = docTitleInput.current.value;

        if (title === "") {
          MySwal.showValidationMessage("The title is empty");
          return;
        }

        if (title.length <= 3) {
          MySwal.showValidationMessage("The title is too short");
          return;
        }
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const title = docTitleInput.current.value;

          const XMLDocument = {
            data: xml,
            title,
          };

          const { data } = await documentService.insert(XMLDocument);

          setCurrentDocument(data);

          getAllXMLDocuments();

          Swal.fire("Saved!", "", "success");
        } catch (err) {
          toast.error("Cannot save the document");
        }
      } else if (result.isDenied) {
        Swal.fire("Document are not saved", "", "info");
      }
    });
  };

  return {
    xmlDocuments,
    editDocument,
    saveDocument,
  };
};
