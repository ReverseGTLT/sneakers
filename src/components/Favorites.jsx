import Card from "./Card";
import React, {useContext} from "react";
import {AppContext} from "../App";
import MyLoader from "./Skeleton";
import FavoriteItem from "./FavoriteItem";

export default function Favorites({  addToFavorites, addToCart, isLoading }) {

    const { favoriteItems, removeFromFavorite } = React.useContext(AppContext)

    return (
        <div className="content">
            <div className="content-info">
                <h1 className="content__title">Избранное</h1>
            </div>
            <div className="content-cards">
                { isLoading ? MyLoader() : favoriteItems
                    .map((item, index) => (
                        <FavoriteItem image={item.image}
                              title={item.title}
                              price={item.price}
                              key={index}
                              favorited={true}
                              removeFromFavorite={() => removeFromFavorite(item) }
                              addToCart={() => addToCart(item)}
                              onFavorite={() => addToFavorites(item)}
                        />
                    )) }
            </div>
        </div>
    )
}