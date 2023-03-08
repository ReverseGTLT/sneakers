import Card from "./Card";
import React, {useContext} from "react";
import {AppContext} from "../App";

export default function Favorites({  addToFavorites, addToCart }) {

    const { favoriteItems } = React.useContext(AppContext)

    return (
        <div className="content">
            <div className="content-info">
                <h1 className="content__title">Избранное</h1>
            </div>
            <div className="content-cards">
                { favoriteItems
                    .map((item, index) => (
                        <Card image={item.image}
                              title={item.title}
                              price={item.price}
                              key={index}
                              favorited={true}
                              // onPlus={() => targetCartItems(item)}
                              // onFavorite={() => addToFavorites(item)}
                              onPlus={() => addToCart(item)}
                              onFavorite={() => addToFavorites(item)}
                        />
                    )) }
            </div>
        </div>
    )
}