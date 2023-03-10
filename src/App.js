import React, {createContext, useEffect, useState} from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Overlay from "./components/Overlay";
import axios from "axios";

const URL = 'https://64023e33f61d96ac4866f0b0.mockapi.io/items';
export const URL_USER_CART = 'https://64023e33f61d96ac4866f0b0.mockapi.io/userCart';
const URL_FAVORITES = 'https://64062d8f40597b65de4c746a.mockapi.io/favorites';
export const URL_ORDERS = 'https://64062d8f40597b65de4c746a.mockapi.io/orders';

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
            if (cartItems.find(itemObj => itemObj.title === obj.title)) {
                setCartItems(prevState => prevState.filter(item => item.title !== obj.title));
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
                setFavoriteItems(prevState => prevState.filter(item => Number(item.id) !== Number(obj.id)));
                axios.delete(`${URL_FAVORITES}/${obj.id}`);
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
    const isItemAdded = (title) => {
        return cartItems.some((obj) => obj.title === title)
    };
    const isItemFavorite = (title) => {
        return favoriteItems.some((obj) => obj.title === title)
    };
    const onCloseInBasketClick = () => {
        return setCartOpen(false)
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
            <AppContext.Provider value={ { item, cartItems, favoriteItems, isItemAdded, isItemFavorite, onCloseInBasketClick, setCartItems } }>
                <div className="wrapper">
                    {cartOpen &&
                    <Overlay
                        cartItems={cartItems}
                        onClickRemove={removeFromCart}
                    />}

                    <Header setCartOpen={() => setCartOpen(true)}/>

                    <Main item={item}
                          cartItems={cartItems}
                          addToCart={addToCart}
                          addToFavorites={addToFavorites}
                          searchMain={searchMain}
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