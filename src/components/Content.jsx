
import Card from "./Card";
import React from "react";
import MyLoader from "./Skeleton";
import {AppContext} from "../App";

export default function Content({
    itemGet,
    isLoading,
    cartItems,
    targetCartItems,
    search,
    searchValue,
    getSetSearchItem,
    addToFavorites }) {

    const { isItemAdded, isItemFavorite } = React.useContext(AppContext)
    const filterSearchItem = (item) => {
        return item.title.toLowerCase().includes(searchValue.toLowerCase())
    }
    const renderItems = () => {
        return itemGet
            .filter(filterSearchItem)
            .map((item, index) => (
                <Card image={item.image}
                      title={item.title}
                      price={item.price}
                      id={item.id}
                      isItemAdded={() => isItemAdded(item.id)}
                      isItemFavorite={() => isItemFavorite(item.id)}
                      cartItems={cartItems}
                      key={index}
                      onPlus={() => targetCartItems(item)}
                      onFavorite={() => addToFavorites(item)}
                      addedToCartItem={cartItems.some(obj => Number(obj.id) === Number(item.id))}
                />

            ))
    }

    return (
        <div className="content">
            <div className="content-info">
                <h1 className="content__title">{searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}</h1>
                <div className="search-box">
                    <img className="search-image" src="image/search.svg" alt="Search"/>
                    <input className="search-input" onChange={search} value={searchValue} type="text" placeholder="Поиск..."/>
                    {searchValue && <div className="cart-item__cancel" onClick={() => getSetSearchItem('')}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" stroke="#DBDBDB"/>
                            <path
                                d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z"
                                fill="#B5B5B5"/>
                        </svg>
                    </div>}
                </div>
            </div>
            <div className="content-cards">
                { isLoading ? MyLoader()
                : renderItems()}
            </div>
        </div>
    )
}