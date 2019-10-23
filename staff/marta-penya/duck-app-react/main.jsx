const { Component } = React

class App extends Component {
    constructor(){
        super()

        this.state = { view: 'login', error: undefined, user: undefined, ducks: []}

        this.handleonGoLogin = this.handleonGoLogin.bind(this)
        this.handleonGoRegister = this.handleonGoRegister.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleonSignOut = this.handleonSignOut.bind(this)
        this.handleDetail = this.handleDetail.bind(this)

    }

    handleonGoLogin(){
        this.setState({ view: 'login'})
    }
    
    handleonGoRegister(){
        this.setState({ view: 'register'})
    }

    handleRegister(name, surname, email, password){
        try{
            registerUser(name, surname, email, password, error => {
                if(error) this.setState({ error: error.message})
                else this.setState({ view: 'login'})
            })

        } catch (error){
            this.setState({ error: error.message})
        }
    }
    
    handleLogin(email, password){
        try{
            authenticateUser(email, password, (error, response) => {
                if(error){
                    this.setState({ error: error.message })
                } else{
                    
                    retrieveUser(response.id, response.token, (error, result) => {
                        this.setState({ view: 'search' })
                        this.setState({ user: result})
                        
                        this.handleSearch('')
                        
                        //poner vista de hello
                    })
                }
            })

        }catch (error){
            this.setState({ error: error.message })
        }
    }

    handleSearch(query) {
        try {
            searchDucks(query, (error, ducks) => {
                if (error) {
                    this.setState({ error: error.message})
        
                } else {
                    if(query.length === 0) {
                        ducks = ducks.shuffle().splice(0, 3)
                        this.setState({ ducks })
                    }
                    else {
                        this.setState({ ducks })
                    }
                }
            })            
        } catch (error) {
            this.setState({ error: error.message})
        }
    }

     

    handleonSignOut(){
        this.setState({ view: 'login', user: undefined})
        
    }

    handleDetail(id){
        retrieveDucks(id, (error, duck) => {
            if(error){
                this.setState({ error: error.message})
            } else {
                this.setState({ view: 'detail', user: undefined, ducks: duck})
            }
        })   
    }
    

    render() {
        const { state: { view, error, user, ducks }, handleonGoLogin, handleonGoRegister, handleRegister, handleLogin, handleSearch, handleonSignOut, handleDetail } = this
        debugger
        return <>
        <Header user = {user} onSignOut = {handleonSignOut}/>
        {view === 'register' && <Register onRegister={handleRegister} onGoLogin={handleonGoLogin} error={error}/>}
        {view === 'login' && <Login onLogin = {handleLogin} onGoRegister={handleonGoRegister} error={error}/>}
        {view === 'search' && <Search onSearch = {handleSearch} error={error} />}
        {view === 'search' && <Results onClickItem= {handleDetail} duckslist= {ducks}/> }
        
        {view === 'detail' && < Detail />}
        
        <Footer/>
        </>
    }

 }

ReactDOM.render(<App/>, document.getElementById('root'))


