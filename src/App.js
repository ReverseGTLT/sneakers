import {React, useState} from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Overlay from "./components/Overlay";

function App() {
    const [cartOpen, setCartOpen] = useState(false)

  return (
    <>
       <div className="wrapper">
           {cartOpen && <Overlay
               onCloseInBasketClick={() => setCartOpen(false)}/>}
           <Header
               onBasketClick={() => setCartOpen(true)}/>
           <Main/>
       </div>
    </>
  );
}

export default App;
