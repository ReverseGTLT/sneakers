import {React, useEffect, useState} from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Overlay from "./components/Overlay";

const URL = 'https://64023e33f61d96ac4866f0b0.mockapi.io/items';

function App() {
    const [cartOpen, setCartOpen] = useState(false);
    const [item, setItem] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    const addedToCart = (obj) => {
        setCartItems(currentValue => [...currentValue, obj])
    }

    useEffect(() => {
        fetch(URL)
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                setItem(json);
            })
    }, [])


  return (
    <>
       <div className="wrapper">
           {cartOpen && <Overlay
               onCloseInBasketClick={() => setCartOpen(false)}
           items={cartItems}/>}
           <Header
               onBasketClick={() => setCartOpen(true)}/>
           <Main getItem={item} targetCartItems={addedToCart}/>
       </div>
    </>
  );
}

export default App;
