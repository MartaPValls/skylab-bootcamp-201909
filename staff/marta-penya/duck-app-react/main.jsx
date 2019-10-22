function handleonGoLogin() {
    debugger
}

function handleonGoRegister() {
    debugger
}

function handleRegister(name, surname, email, password) {
    debugger
}

function handleLogin(email, password){
    debugger
}

function handleSearch(query){
    debugger
}
// TODO login and search

ReactDOM.render(<>
    {/* <Landing onLogin={handleGoToLogin} onRegister={handleGoToRegister}  /> */}
    <Register onRegister={handleRegister} onGoLogin={handleonGoLogin} />
    <Login onLogin = {handleLogin} onGoRegister={handleonGoRegister} />
    <Search onSearch = {handleSearch}/>
</>, document.getElementById('root'))