import Content from "./Content";
import Slider from "./Slider";

export default function Main({ targetCartItems, getItem}) {
    return (
        <div className="main">
            <Slider/>
            <Content itemGet={getItem} targetCartItems={targetCartItems}/>
        </div>
    )
}