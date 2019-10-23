function ResultItem({pato, onGoDetail}){

    const {id, title, imageUrl, price} = pato


    return <li className="item-list__li"> 
    <a className="item-list__link" onClick= {
        event => {
            event.preventDefault()

            onGoDetail(id)
        }
    }>
    
        <h2 className="item-list__title">{title} </h2>
        <img src={imageUrl} className="item-list__image"/>
        <p className="item-list__price">{price} </p>
        </a>
    </li>
    
}
