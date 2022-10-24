import httpCommon from "./httpCommon.mjs";

const loading = (id) => httpCommon.get(`document/${id}`);

export default { loading };