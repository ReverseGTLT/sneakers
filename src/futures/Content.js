import Card from "./Card";

export default function Content() {
    return (
        <div className="content">
            <div className="content-info">
                <h1 className="content__title">Все кроссовки</h1>
                <div className="search-box">
                    <img className="search-image" src="image/search.svg" alt="Search"/>
                    <input className="search-input" type="text" placeholder="Поиск..."/>
                </div>
            </div>
            <div className="content-cards">
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>
        </div>
    )
}