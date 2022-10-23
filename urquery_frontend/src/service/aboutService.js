import httpCommon from "./httpCommon.mjs";

const about = () => httpCommon.get("/una/about");

// const loading =  (data) =>  `${Date.now()}${data}`
//http://localhost:8080/api/una/about
export default { about };