import './App.css';
import GoogleMap from "./components/GoogleMap";
import Fragments from "./components/Fragments";
import ContextExample1 from "./components/ContextExample1";
import React from "react";
import StateHook from "./components/StateHook";
import CounterHook from "./components/CounterHook";
import FetchData from "./components/FetchData";

export const MyContext = React.createContext()

function App() {
  return (
    <div className="App">
        {/*<GoogleMap />*/}
        {/*<Fragments />*/}
        {/*<MyContext.Provider value="this is the context from app">*/}
        {/*    <ContextExample1 />*/}
        {/*</MyContext.Provider>*/}
        {/*<StateHook />*/}
        {/*<CounterHook />*/}
        <FetchData/>
    </div>
  );
}

export default App;
