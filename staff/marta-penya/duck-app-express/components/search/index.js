const Feedback = require('../feedback')
const Results = require('../results')
const ResultItem = require('../result-item')

module.exports = function( { path, query, name, logout, error, results, favPath, detailPath } ){
    return `<section class="view search">
        <h2>Hello ${name} </h2><form method="post" action="${logout}"><button class="search__logout">Logout</button></form>
    <form class="search__form" method="get" action="${path}">               
        <input type="search" name="q" id="search__formitem" class="search__input" ${query? `value=${query}` : '' }/>
        <button class="search__button">🔎 Search</button>
    </form>
    ${error ? Feedback({ message: error}) : ''}

    ${results ? Results({ items: results, onItemRender: duck => ResultItem({ item: duck, favPath, detailPath }) }) : ''}
</section>`
}


