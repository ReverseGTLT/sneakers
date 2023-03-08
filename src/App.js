import React, {createContext, useEffect, useState} from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Overlay from "./components/Overlay";
import axios from "axios";

const URL = 'https://64023e33f61d96ac4866f0b0.mockapi.io/items';
const URL_USER_CART = 'https://64023e33f61d96ac4866f0b0.mockapi.io/userCart';
const URL_FAVORITES = 'https://64062d8f40597b65de4c746a.mockapi.io/favorites';

export const AppContext = createContext({})

function App() {
    const [cartOpen, setCartOpen] = useState(false);
    const [item, setItem] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [favoriteItems, setFavoriteItems] = useState([]);
    const [searchItem, setSearchItem] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const searchMain = (e) => {
        setSearchItem(e.target.value);
    };
    const addToCart = async (obj) => {
        try{
            if (cartItems.find(itemObj => Number(itemObj.id) === Number(obj.id))) {
                setCartItems(prevState => prevState.filter(item => Number(item.id) !== Number(obj.id)));
                axios.delete(`${URL_USER_CART}/${obj.id}`);
            } else {
                const res = await axios.post(URL_USER_CART, obj);
                setCartItems(currentValue => [...currentValue, res.data]);
            }
        } catch {
            console.log('Failed add to cart');
        }
    };
    const addToFavorites = async (obj) => {
        try{
            if (favoriteItems.find(itemObj => Number(itemObj.id) === Number(obj.id))) {
                axios.delete(`${URL_FAVORITES}/${obj.id}`);
                setFavoriteItems(prevState => prevState.filter(item => Number(item.id) !== Number(obj.id)));
            } else {
                const res = await axios.post(URL_FAVORITES, obj);
                setFavoriteItems(prevState => [...prevState, res.data]);
            }
        } catch {
            console.log('Failed add to favorites');
        }
    };
    const removeFromCart = (id) => {
        axios.delete(`${URL_USER_CART}/${id}`);
        setCartItems(prevState => prevState.filter(item => item.id !== id));

    };
    const isItemAdded = (id) => {
        return cartItems.some((obj) => +obj.id === +id)
    };
    const isItemFavorite = (id) => {
        return favoriteItems.some((obj) => +obj.id === +id)
    };

    useEffect(() => {
        async function fetchData () {
            try {
                setIsLoading(true);
                const cartResponse = await axios.get(URL_USER_CART);
                const favoriteResponse = await axios.get(URL_FAVORITES);
                const itemsResponse = await axios.get(URL);

                setIsLoading(false);

                setCartItems(cartResponse.data);
                setFavoriteItems(favoriteResponse.data);
                setItem(itemsResponse.data);
            }
            catch (error) {
                console.error(error)
            }
        }
        fetchData();
    }, []);

  return (
    <>
       <AppContext.Provider value={ { item, cartItems, favoriteItems, isItemAdded, isItemFavorite } }>
           <div className="wrapper">
               {cartOpen &&
               <Overlay
                   onCloseInBasketClick={() => setCartOpen(false)}
                   items={cartItems}
                   onClickRemove={removeFromCart}
               />}

               <Header onBasketClick={() => setCartOpen(true)}/>

               <Main getItem={item}
                     cartItems={cartItems}
                     targetCartItems={addToCart}
                     addToFavorites={addToFavorites}
                     search={searchMain}
                     searchValue={searchItem}
                     getSetSearchItem={setSearchItem}
                     items={favoriteItems}
                     isLoading={isLoading}
               />
           </div>
       </AppContext.Provider>
    </>
  );
}

export default App;
