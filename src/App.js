import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Overlay from "./components/Overlay";
import axios from "axios";

const URL = 'https://64023e33f61d96ac4866f0b0.mockapi.io/items';
const URL_USER_CART = 'https://64023e33f61d96ac4866f0b0.mockapi.io/userCart';

function App() {
    const [cartOpen, setCartOpen] = useState(false);
    const [item, setItem] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [searchItem, setSearchItem] = useState('');

    const searchMain = (e) => {
        setSearchItem(e.target.value);
    };

    const getSetSearchItem = () => {
        return setSearchItem;
    }

    const addToCart = (obj) => {
        axios.post(URL_USER_CART, obj);
        setCartItems(currentValue => [...currentValue, obj]);
    };

    const removeFromCart = (id) => {
        axios.delete(`${URL_USER_CART}/${id}`);
        setCartItems(prevState => prevState.filter(item => item.id !== id))
    };


    useEffect(() => {
        axios.get(URL).then(res => setItem(res.data))
        axios.get(URL_USER_CART).then(res => setCartItems(res.data))
    }, []);

  return (
    <>
       <div className="wrapper">
           {cartOpen &&
           <Overlay
               onCloseInBasketClick={() => setCartOpen(false)}
               items={cartItems}
               onClickRemove={removeFromCart}
           />}

           <Header onBasketClick={() => setCartOpen(true)}/>

           <Main getItem={item} targetCartItems={addToCart}
                 search={searchMain}
                 searchValue={searchItem}
                 getSetSearchItem={setSearchItem}
           />
       </div>
    </>
  );
}

export default App;
