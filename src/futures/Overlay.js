import {React} from "react";
import CartItem from "./CartItem";

export default function Overlay() {
    return (
        <div className="overlay">
            <div className="drawer">
                <div className="drawer-box">
                    <h2 className="cart-title">Корзина</h2>
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                </div>
            </div>
        </div>
    )
}