
import {AppContext} from "../App";
import React, {useContext} from "react";

export default function CartEmpty({ image, imageAlt, title, description }) {

    const { setCartOpen, onCloseInBasketClick } = useContext(AppContext);

    return (
        <div className="cart-empty">
            <div className="cart-empty__image">
                <img src={image} alt={imageAlt}/>
            </div>
            <h3 className="cart-empty__title">{title}</h3>
            <p className="cart-empty__description">{description}</p>
            <button className="cart-empty__btn" onClick={ () => onCloseInBasketClick(false) }>
                <div className="cart-empty__btn-before">
                    <img src="/image/arrow-left.svg" alt="arrow"/>
                </div>
                <p>Назад к покупкам</p>
            </button>
        </div>
    )
}