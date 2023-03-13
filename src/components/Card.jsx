import {useState} from "react";
import React, {useContext} from "react";
import {AppContext} from "../App";
export default function Card({ onPlus: addToCart, image, price, title, onFavorite, favorited = false, addedToCartItem = false }) {
    const [added,setAdded] = useState(addedToCartItem);
    const [addedFavorite, setAddedFavorite] = useState(favorited);

    const { isItemAdded, isItemFavorite } = React.useContext(AppContext)
    const onAddToCart = () => {
        addToCart();
        setAdded(!added);
    }

    const addToFavorite = () => {
        onFavorite();
        setAddedFavorite(!addedFavorite);
    }

    return (
        <div className="card">
            <div className="card__like cursor" onClick={addToFavorite}>
                {isItemFavorite(title) ?
                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.6129 2.86902C15.3646 2.30759 15.0067 1.79882 14.5591 1.3712C14.1111 0.94231 13.583 0.601475 13.0033 0.367231C12.4023 0.123371 11.7577 -0.0014504 11.1068 1.27149e-05C10.1938 1.27149e-05 9.30292 0.244222 8.52876 0.705507C8.34355 0.815853 8.1676 0.937054 8.00092 1.06911C7.83423 0.937054 7.65828 0.815853 7.47308 0.705507C6.69892 0.244222 5.80807 1.27149e-05 4.895 1.27149e-05C4.23752 1.27149e-05 3.60041 0.123022 2.99849 0.367231C2.41694 0.602396 1.89281 0.940672 1.44276 1.3712C0.994552 1.79834 0.636513 2.30723 0.388933 2.86902C0.131497 3.45332 0 4.07379 0 4.71235C0 5.31473 0.12594 5.94244 0.375969 6.58101C0.585252 7.11465 0.885287 7.66819 1.26866 8.22716C1.87614 9.11174 2.71142 10.0343 3.74858 10.9695C5.46729 12.5198 7.16934 13.5907 7.24157 13.6341L7.68051 13.9091C7.87498 14.0303 8.125 14.0303 8.31947 13.9091L8.75841 13.6341C8.83064 13.5889 10.5308 12.5198 12.2514 10.9695C13.2886 10.0343 14.1238 9.11174 14.7313 8.22716C15.1147 7.66819 15.4166 7.11465 15.624 6.58101C15.874 5.94244 16 5.31473 16 4.71235C16.0018 4.07379 15.8703 3.45332 15.6129 2.86902Z" fill="url(#paint0_linear_60_1001)"/>
                        <defs>
                            <linearGradient id="paint0_linear_60_1001" x1="8" y1="0" x2="8" y2="14" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#FFB0B0"/>
                                <stop offset="1" stopColor="#FF4343"/>
                            </linearGradient>
                        </defs>
                    </svg>
                    :
                    <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 19.7501C11.8012 19.7499 11.6105 19.6708 11.47 19.5301L4.70001 12.7401C3.78387 11.8054 3.27072 10.5488 3.27072 9.24006C3.27072 7.9313 3.78387 6.6747 4.70001 5.74006C5.6283 4.81186 6.88727 4.29042 8.20001 4.29042C9.51274 4.29042 10.7717 4.81186 11.7 5.74006L12 6.00006L12.28 5.72006C12.739 5.25606 13.2857 4.88801 13.8883 4.63736C14.4909 4.3867 15.1374 4.25845 15.79 4.26006C16.442 4.25714 17.088 4.38382 17.6906 4.63274C18.2931 4.88167 18.8402 5.24786 19.3 5.71006C20.2161 6.6447 20.7293 7.9013 20.7293 9.21006C20.7293 10.5188 20.2161 11.7754 19.3 12.7101L12.53 19.5001C12.463 19.5752 12.3815 19.636 12.2904 19.679C12.1994 19.7219 12.1006 19.7461 12 19.7501ZM8.21001 5.75006C7.75584 5.74675 7.30551 5.83342 6.885 6.00505C6.4645 6.17669 6.08215 6.42989 5.76001 6.75006C5.11088 7.40221 4.74646 8.28491 4.74646 9.20506C4.74646 10.1252 5.11088 11.0079 5.76001 11.6601L12 17.9401L18.23 11.6801C18.5526 11.3578 18.8086 10.9751 18.9832 10.5538C19.1578 10.1326 19.2477 9.68107 19.2477 9.22506C19.2477 8.76905 19.1578 8.31752 18.9832 7.89627C18.8086 7.47503 18.5526 7.09233 18.23 6.77006C17.9104 6.44929 17.5299 6.1956 17.1109 6.02387C16.6919 5.85215 16.2428 5.76586 15.79 5.77006C15.3358 5.76675 14.8855 5.85342 14.465 6.02505C14.0445 6.19669 13.6621 6.44989 13.34 6.77006L12.53 7.58006C12.3869 7.71581 12.1972 7.79149 12 7.79149C11.8028 7.79149 11.6131 7.71581 11.47 7.58006L10.66 6.77006C10.3395 6.44628 9.95791 6.18939 9.53733 6.01429C9.11675 5.83919 8.66558 5.74937 8.21001 5.75006Z" fill="#000000"/>
                    </svg>
                }

            </div>
            <div className="card__image">
                <img src={process.env.PUBLIC_URL + image} alt=""/>
            </div>
            <h2 className="card__title">
                {title}
            </h2>
            <div className="card__info">
                <div className="cars__coast">
                    <p className="card__price">Цена:</p>
                    <p className="card__sum">{price} руб.</p>
                </div>
                <div className="card__plus cursor" onClick={onAddToCart}>
                    <img src={isItemAdded(title) ? process.env.PUBLIC_URL + '/image/plus-done.svg' : process.env.PUBLIC_URL + '/image/plus.svg'} alt="plus"/>
                </div>
            </div>
        </div>
    )
}