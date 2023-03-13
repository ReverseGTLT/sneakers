import React, {useContext, useState} from "react";
import CartItem from "./CartItem";
import {AppContext, URL_USER_CART} from "../App";
import CartEmpty from "./CartEmpty";
import axios from "axios";
import {URL_ORDERS} from "../App";

export default function Overlay({ onClickRemove }) {

    const { onCloseInBasketClick, setCartItems, cartItems, sum } = useContext(AppContext);
    const [isDone, setIsDone] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    const onClickOrder = async () => {
        try {
            setIsLoading(true)
            const {data} = await axios.post(URL_ORDERS, {
                items: cartItems
            });

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete(`${URL_USER_CART}/${item.id}`);
                await delay(1000);
            }

            setOrderId(data.id);
            setIsDone(true);
            setCartItems([]);
        } catch (error) {
            console.log(error, 'Не удалось создать заказ')
        }
        setIsLoading(false)
    }


    return (
        <div className="overlay">
            <div className="drawer">
                <div className="drawer-box">
                    <div className="cart-info">
                        <h2 className="cart-title">Корзина</h2>
                        <div className="cart-item__cancel" onClick={onCloseInBasketClick}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" stroke="#DBDBDB"/>
                                <path d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z" fill="#B5B5B5"/>
                            </svg>
                        </div>
                    </div>
                    {cartItems.length === 0 ?
                        <CartEmpty
                            image={isDone ? "image/cart-done.png" : "image/empty-cart.png"}
                            title={isDone ? "Заказ оформлен!" : "Корзина пустая"}
                            description={isDone ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
                        />
                        :
                        <>
                            <div className="cart-items">
                                {cartItems
                                    .map((item, index) => (
                                        <CartItem
                                            title={item.title}
                                            price={item.price}
                                            image={item.image}
                                            onClickRemove={onClickRemove}
                                            key={index}
                                            itemId={item.id}
                                            cartItems={cartItems}
                                        />
                                    ))}
                            </div>
                            <div className="cart-footer">
                                <div className="cart-footer__item">
                                    <p className="cart-footer__title">Итого:</p>
                                    <div className="cart-footer__dots"></div>
                                    <p className="cart-footer__description">{`${sum} руб.`}</p>
                                </div>
                                <div className="cart-footer__item">
                                    <p className="cart-footer__title">Налог 5%: руб.</p>
                                    <div className="cart-footer__dots"></div>
                                    <p className="cart-footer__description">{`${(sum/100*5).toFixed(2)} руб.`}</p>
                                </div>
                                <button className="cart-btn" disabled={isLoading} onClick={onClickOrder}>
                                    <p className="cart-btn__title">Оформить заказ</p>
                                    <img src="image/arrow.svg" alt="arrow" className="cart-btn__image"/>
                                </button>
                            </div>
                        </>}
                </div>
            </div>
        </div>
    )
}