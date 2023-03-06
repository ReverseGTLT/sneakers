import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Overlay from "./components/Overlay";
import axios from "axios";

const URL = 'https://64023e33f61d96ac4866f0b0.mockapi.io/items';
const URL_USER_CART = 'https://64023e33f61d96ac4866f0b0.mockapi.io/userCart';
const URL_FAVORITES = 'https://64062d8f40597b65de4c746a.mockapi.io/favorites';

function App() {
    const [cartOpen, setCartOpen] = useState(false);
    const [item, setItem] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [favoriteItems, setFavoriteItems] = useState([]);
    const [searchItem, setSearchItem] = useState('');

    const searchMain = (e) => {
        setSearchItem(e.target.value);
    };

    const addToCart = async (obj) => {
        if (cartItems.find(itemObj => itemObj.id === obj.id)) {
            axios.delete(`${URL_USER_CART}/${obj.id}`);
            setCartItems(prevState => prevState.filter(item => item.id !== obj.id));
        } else {
            const res = await axios.post(URL_USER_CART, obj);
            setCartItems(currentValue => [...currentValue, res.data]);
        }
    };

    const addToFavorites = async (obj) => {
        if (favoriteItems.find(itemObj => itemObj.id === obj.id)) {
            axios.delete(`${URL_FAVORITES}/${obj.id}`);
            setFavoriteItems(prevState => prevState.filter(item => item.id !== obj.id));
        } else {
            const res = await axios.post(URL_FAVORITES, obj);
            setFavoriteItems(prevState => [...prevState, res.data]);
        }
    };
    const removeFromCart = (id) => {
        axios.delete(`${URL_USER_CART}/${id}`);
        setCartItems(prevState => prevState.filter(item => item.id !== id))

    };

    useEffect(() => {
        axios.get(URL).then(res => setItem(res.data))
        axios.get(URL_USER_CART).then(res => setCartItems(res.data))
        axios.get(URL_FAVORITES).then(res => setFavoriteItems(res.data))
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

           <Main getItem={item}
                 targetCartItems={addToCart}
                 addToFavorites={addToFavorites}
                 search={searchMain}
                 searchValue={searchItem}
                 getSetSearchItem={setSearchItem}
                 items={favoriteItems}
           />
       </div>
    </>
  );
}

export default App;
