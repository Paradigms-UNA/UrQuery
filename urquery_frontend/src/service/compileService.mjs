import httpCommon from "./httpCommon.mjs";

const compile = (data) => httpCommon.post('/compile', data);

export default { compile };