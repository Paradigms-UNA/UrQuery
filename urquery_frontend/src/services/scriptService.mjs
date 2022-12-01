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

const getAll = () => httpCommon.get("scriptDocument");

const search = (id) => httpCommon.get(`scriptDocument/${id}`);

const insert = (script) => httpCommon.post("scriptDocument", script);

const update = (id, script) => httpCommon.put(`scriptDocument/${id}`, script);

const scriptService = {
  getAll,
  search,
  insert,
  update,
};

export default scriptService;
