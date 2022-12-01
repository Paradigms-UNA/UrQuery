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
import scriptService from "../services/scriptService.mjs";

const MySwal = withReactContent(Swal);

export const useScript = () => {
  const {
    code,
    setCode,
    scriptsList,
    setScriptsList,
    currentScript,
    setCurrentScript,
    handleFormatXML,
  } = useGlobalContext();

  const docTitleInput = useRef();

  const getAllScripts = useCallback(async () => {
    try {
      const { data } = await scriptService.getAll();

      setScriptsList(data);
    } catch (err) {
      toast.error("Cannot get the scripts");
    }
  }, [setScriptsList]);

  useEffect(() => {
    getAllScripts();
  }, [getAllScripts]);

  const editScript = () => {
    MySwal.fire({
      title: "Do you want to save the script changes?",
      showDenyButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Extract the id to send only the rest of the values
          const { id, ...rest } = currentScript;
          
          const { data } = await scriptService.update(id, rest);

          setCurrentScript(data);

          getAllScripts();

          Swal.fire("Saved!", "", "success");
        } catch (err) {
          toast.error("Cannot save the script");
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const saveScript = () => {
    if (code === "") {
      toast.error("Editting Area is empty!");
      return;
    }

    MySwal.fire({
      title: "Do you want to create a new the script?",
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

          const script = {
            data: code,
            title,
          };

          const { data } = await scriptService.insert(script);

          setCurrentScript(data);

          getAllScripts();

          Swal.fire("Saved!", "", "success");
        } catch (err) {
          toast.error("Cannot save the script");
        }
      } else if (result.isDenied) {
        Swal.fire("Script are not saved", "", "info");
      }
    });
  };

  return {
    scriptsList,
    editScript,
    saveScript,
  };
};
