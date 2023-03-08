import Content from "./Content";
import Slider from "./Slider";
import {Route, Routes} from "react-router-dom";
import Favorites from "./Favorites";
import {useContext} from "react";

export default function Main({ targetCartItems, isLoading, cartItems, items , getItem, search, searchValue, getSetSearchItem, addToFavorites }) {

    return (
        <div className="main">
            <Slider/>
            <Routes>
                <Route exact path="/"
                       element= {<Content itemGet={getItem}
                                          cartItems={cartItems}
                                          targetCartItems={targetCartItems}
                                          addToFavorites={addToFavorites}
                                          search={search}
                                          searchValue={searchValue}
                                          getSetSearchItem={getSetSearchItem}
                                          isLoading={isLoading}
                />} />

                <Route exact path="/favorites"
                       element={<Favorites itemGet={getItem}
                                           targetCartItems={targetCartItems}
                                           addToFavorites={addToFavorites}
                                           items={items}
                />} />

            </Routes>
        </div>
    )
}