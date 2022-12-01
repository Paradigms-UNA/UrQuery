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

import { useGlobalContext } from "./useGlobalContext";
import { toast } from "react-toastify";
import compileService from "../services/compileService";

export const useCompile = () => {
  const {
    currentScript,
    setCurrentScript,
    setResult,
    setCompiling,
    scriptsList,
  } = useGlobalContext();

  const compile = async () => {
    if (!currentScript?.id) {
      toast.info("First save the script after compiling");
      return;
    }

    try {
      setCompiling(true);
      const { data } = await compileService.compile(currentScript);

      setCurrentScript(data);

      const indexOfScript = scriptsList.findIndex(
        (script) => script.id === data.id
      );

      scriptsList[indexOfScript] = data;

      setResult(data.target);

      toast.success("Compiled Successfully");
    } catch (err) {
      toast.error(`Compilation Error: ${err.response.data.message}`);
    }

    setCompiling(false);
  };

  return {
    compile,
  };
};
