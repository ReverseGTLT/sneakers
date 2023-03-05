import {React} from "react";
import CartItem from "./CartItem";

export default function Overlay({ onCloseInBasketClick, items }) {
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
                    <div className="cart-items">
                        {items.map((item) => (
                            <CartItem
                                title={item.title}
                                price={item.price}
                                image={item.image}/>
                        ))}
                    </div>
                    <div className="cart-footer">
                        <div className="cart-footer__item">
                            <p className="cart-footer__title">Итого:</p>
                            <div className="cart-footer__dots"></div>
                            <p className="cart-footer__description">21 498 руб.</p>
                        </div>
                        <div className="cart-footer__item">
                            <p className="cart-footer__title">Налог 5%:</p>
                            <div className="cart-footer__dots"></div>
                            <p className="cart-footer__description">1074 руб.</p>
                        </div>
                        <button className="cart-btn">
                            <p className="cart-btn__title">Оформить заказ</p>
                            <img src="image/arrow.svg" alt="arrow" className="cart-btn__image"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}