import { GlobalProvider } from "./context/GlobalContext";
import { NavigationBar } from "./components/NavigationBar";
import { MainContainer } from "./components/MainContainer";
import { ToastContainer } from "react-toastify";

import "./App.css";

const App = () => {
  return (
    <GlobalProvider>
      <NavigationBar />

      <MainContainer />

      <ToastContainer />
    </GlobalProvider>
  );
};

export default App;
