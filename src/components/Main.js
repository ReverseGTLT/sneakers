import Content from "./Content";
import Slider from "./Slider";

export default function Main({ targetCartItems, getItem, search, searchValue, getSetSearchItem }) {
    return (
        <div className="main">
            <Slider/>
            <Content itemGet={getItem}
                     targetCartItems={targetCartItems}
                     search={search}
                     searchValue={searchValue}
                     getSetSearchItem={getSetSearchItem}
            />
        </div>
    )
}