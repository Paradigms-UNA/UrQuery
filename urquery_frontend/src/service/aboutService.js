import httpCommon from "./httpCommon.mjs";

const getAbout = () => httpCommon.get("about");

export default { getAbout };