function Search({ onSearch, error }) {
    return <section className="view search _hide">
        <div>
    <form className="search__form" onSubmit={ function (event){
            event.preventDefault()

            const {query: {value: query}} = event.target
                
            onSearch(query)
    }

    }>               
        <input type="search" name="query" id="search__formitem" className="search__input"/>
        <button className="search__button">🔎 Search</button>
    </form>
</div> 
{error && <Feedback message={error}/>}      
</section>

}

