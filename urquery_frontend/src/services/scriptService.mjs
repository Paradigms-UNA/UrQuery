import httpCommon from "./httpCommon.mjs";

const getAll = () => httpCommon.get("getAllscriptDocuments");

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
