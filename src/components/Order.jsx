import React from "react";
import MyLoader from "./Skeleton";

export default function OrderCard({ image, title, price }) {
    return (
        <div className="card">
            <div className="card__image">
                <img src={image} alt=""/>
            </div>
            <h2 className="card__title">
                {title}
            </h2>
            <div className="card__info">
                <div className="cars__coast">
                    <p className="card__price">Цена:</p>
                    <p className="card__sum">{price} руб.</p>
                </div>
            </div>
        </div>
    )
}