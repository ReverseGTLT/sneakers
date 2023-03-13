import React, { useState } from "react";
import axios from "axios";
import {URL_ORDERS} from "../App";
import OrdersCard from "./Order";
import MyLoader from "./Skeleton";

export default function Orders({ isLoading }) {
    const [orders, setOrders] = useState([]);
    React.useEffect(() => {
        try {
            (async () => {
                const { data } = await axios.get(URL_ORDERS);
                setOrders(data);
            })();
        } catch (error) {
            console.log(error, 'Невозможно отобразить покупки')
        }
    }, []);

    return (
        <div className="content">
                <div className="content-info">
                    <h1 className="content__title">Мои покупки</h1>
                </div>
                <div className="content-cards">
                    { isLoading ? MyLoader() : orders.map(item => item.items).flat()
                        .map((item, index) => (
                            <OrdersCard image={item.image}
                                        title={item.title}
                                        price={item.price}
                                        key={index}
                            />
                        )) }
                </div>
            </div>
    )
}