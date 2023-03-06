import Card from "./Card";


export default function Favorites({ targetCartItems, addToFavorites, items }) {
    return (
        <div className="content">
            <div className="content-info">
                <h1 className="content__title">Избранное</h1>
            </div>
            <div className="content-cards">
                { items
                    .map((item, index) => (
                        <Card image={item.image}
                              title={item.title}
                              price={item.price}
                              key={index}
                              favorited={true}
                              onPlus={() => targetCartItems(item)}
                              onFavorite={() => addToFavorites(item)}
                        />
                    )) }
            </div>
        </div>
    )
}