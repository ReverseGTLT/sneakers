import Card from "./Card";
import React, {useContext} from "react";
import {AppContext} from "../App";
import MyLoader from "./Skeleton";

export default function Favorites({  addToFavorites, addToCart, isLoading }) {

    const { favoriteItems } = React.useContext(AppContext)

    return (
        <div className="content">
            <div className="content-info">
                <h1 className="content__title">Избранное</h1>
            </div>
            <div className="content-cards">
                { isLoading ? MyLoader() : favoriteItems
                    .map((item, index) => (
                        <Card image={item.image}
                              title={item.title}
                              price={item.price}
                              key={index}
                              favorited={true}
                              onPlus={() => addToCart(item)}
                              onFavorite={() => addToFavorites(item)}
                        />
                    )) }
            </div>
        </div>
    )
}