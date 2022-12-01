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
