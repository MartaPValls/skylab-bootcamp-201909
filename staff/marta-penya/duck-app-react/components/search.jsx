function Search({ onSearch }) {
    return <section className="view search _hide">
        <div>
    <form className="search__form" onSubmit={ function (event){
            event.preventDefault()

            const {query: {value: query}} = event.target
                
            onSearch(query)
    }

    }>               
        <input type="search" name="query" id="search__formitem" className="search__input"/>
        <button className="search__button"><i className="fas fa-search"></i>  Search</button>
    </form>
</div> 
<section className="view feedback hide">
    <span className="feedback__icon">🤡</span>
    <p className="feedback__message">Come with me...</p>
    <span className="feedback__icon">🎈</span>
</section>     
</section>
}

