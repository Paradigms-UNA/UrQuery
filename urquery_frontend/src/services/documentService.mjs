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
