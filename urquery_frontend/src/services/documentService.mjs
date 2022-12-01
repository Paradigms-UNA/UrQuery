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

const getAll = () => httpCommon.get("xmlDocument");

const search = (id) => httpCommon.get(`xmlDocument/${id}`);

const insert = (document) => httpCommon.post("xmlDocument", document);

const update = (id, document) => httpCommon.put(`xmlDocument/${id}`, document);

const documentService = {
  getAll,
  search,
  insert,
  update,
};

export default documentService;
