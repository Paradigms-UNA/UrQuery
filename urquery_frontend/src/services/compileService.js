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

import httpCommon from "./httpCommon.mjs";

const compile = (script) => httpCommon.post("compile", script);

const compileService = {
  compile,
};

export default compileService;
