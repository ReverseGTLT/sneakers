import Content from "./Content";
import Slider from "./Slider";
import {Route, Routes} from "react-router-dom";
import Favorites from "./Favorites";
import Orders from "./Orders";

export default function Main({ addToCart, isLoading, cartItems, items , item, searchMain, searchValue, getSetSearchItem, addToFavorites }) {

    return (
        <div className="main">
            <Slider/>
            <Routes>
                <Route exact path=""
                       element= {<Content item={item}
                                          cartItems={cartItems}
                                          addToCart={addToCart}
                                          addToFavorites={addToFavorites}
                                          searchMain={searchMain}
                                          searchValue={searchValue}
                                          getSetSearchItem={getSetSearchItem}
                                          isLoading={isLoading}
                       />} />

                <Route exact path="favorites"
                       element={<Favorites item={item}
                                           addToCart={addToCart}
                                           addToFavorites={addToFavorites}
                                           items={items}
                                           isLoading={isLoading}
                       />} />

                <Route exact path="order"
                       element={<Orders isLoading={isLoading}/>} />

            </Routes>
        </div>
    )
}