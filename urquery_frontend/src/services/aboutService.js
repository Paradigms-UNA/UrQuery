import httpCommon from "./httpCommon.mjs";

const getAbout = () => httpCommon.get("about");

const aboutService = {
  getAbout,
};

export default aboutService;
