import { React, ReactDOM, Fragment } from "react";
import Header from "./futures/Header";
import Main from "./futures/Main";
import Slider from "./futures/Slider";
import Content from "./futures/Content";
import Overlay from "./futures/Overlay";

function App() {
  return (
    <>
       <div className="wrapper">
           <Overlay/>
           <Header />
           <Main/>
       </div>
    </>
  );
}

export default App;
