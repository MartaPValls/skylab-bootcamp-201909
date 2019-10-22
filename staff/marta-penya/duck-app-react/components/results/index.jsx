function Results({onResult: duck, onGoDetail}){

    return <li key={Math.random()} className="item-list__li">
    <a key={Math.random()} className="item-list__link" onClick= {
        event => {
            event.preventDefault()

            onGoDetail(duck.id)
        }
    }>
    
        <h2 key={Math.random()} className="item-list__title">{duck.title} </h2>
        <img key={Math.random()} src={duck.imageUrl} className="item-list__image"/>
        <p key={Math.random()} className="item-list__price">{duck.price} </p>
        </a>
    </li>
    
}


