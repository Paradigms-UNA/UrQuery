import httpCommon from "./httpCommon.mjs";

const loading = (id) => httpCommon.get(`document/${id}`);

// const loading =  (data) =>  `${Date.now()}${data}`

export default { loading };