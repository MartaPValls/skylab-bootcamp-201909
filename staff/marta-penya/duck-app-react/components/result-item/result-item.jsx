function ResultItem({item, onGoDetail}){

    const {id, title, imageUrl, price} = item

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
        <img className="item-list__fav" src="https://image.flaticon.com/icons/svg/1469/1469600.svg" onClick={event => {
                event.stopPropagation()

                onFav(id)
            }}/>
        </a>
    </li>
    
}
