const { Component } = React

const {id, token} = sessionStorage

class App extends Component {
    state = { view: 'login', error: undefined, user: undefined,  ducks: []}

    

    handleonGoLogin = () => {
        this.setState({ view: 'login', error: undefined})
    }
    
    handleonGoRegister = () => {
        this.setState({ view: 'register', error: undefined})
    }

    handleRegister = (name, surname, email, password) => {
        try{
            registerUser(name, surname, email, password, error => {
                if(error) this.setState({ error: error.message})
                else this.setState({ view: 'login'})
            })

        } catch (error){
            this.setState({ error: error.message})
        }
    }
    
    handleLogin = (email, password) => {
        try{
            authenticateUser(email, password, (error, { id , token} ) => {
                if(error){
                    this.setState({ error: error.message })
                } else{
                    try{

                        sessionStorage.id = id
                        sessionStorage.token = token
                        
                        retrieveUser (id, token, (error, {name} ) => {
                            if (error) this.setState ({error: error.message})
                            else {
                                this.setState ({view: 'search', user: name})
                                this.handleSearch('')
                             }
                        })

                    } catch (error){
                        this.setState({error: error.message})
                    }
                    
                    // retrieveUser(response.id, response.token, (error, result) => {
                    //     this.setState({ view: 'search' })
                    //     this.setState({ user: result})
                        
                    //     this.handleSearch('')
                        
                    //     //poner vista de hello
                    // })
                }
            })

        }catch (error){
            this.setState({ error: error.message })
        }
    }

    handleSearch = (query) => {
        try {
            searchDucks(query, (error, ducks) => {
                if (error) {
                    this.setState({ error: error.message})
        
                } else {
                    if(query.length === 0) { 
                        ducks = ducks.shuffle().splice(0, 3)
                        this.setState({ error: undefined, ducks })
                    }
                    else {
                        this.setState({ error: undefined, ducks })
                    }
                }
            })            
        } catch (error) {
            this.setState({ error: error.message})
        }
    }

     

    handleonSignOut = () => {
        this.setState({ view: 'login', user: undefined})
        sessionStorage.clear()
        
    }

    handleDetail = (id)=> {
        try{ 
            retrieveDuck(id, (error, duck) => {
                if(error){
                    this.setState({ error: error.message})
                } else {
                    this.setState({ view: 'detail', duck})
                }
            })   

        } catch (error) {
            this.setState({ error: error.message })
        }
        
    }
    
    handleBackToSearch = () => {
        this.setState({ view: 'search' })
    }

    render() {
        const { state: { view, error, user, ducks, duck }, handleonGoLogin, handleonGoRegister, handleRegister, handleLogin, handleSearch, handleonSignOut, handleDetail, handleBackToSearch } = this
        
        return <>
        <Header user = {user} onSignOut = {handleonSignOut}/>
        {view === 'register' && <Register onRegister={handleRegister} onGoLogin={handleonGoLogin} error={error}/>}
        {view === 'login' && <Login onLogin ={handleLogin} onGoRegister={handleonGoRegister} error={error}/>}
        {view === 'search' && <Search onSearch={handleSearch} error={error} />}
        {view === 'search' && <Results onClickItem={handleDetail} duckslist= {ducks}/> }
        
        {view === 'detail' && < Detail item={duck} onBack={handleBackToSearch} />}
        
        <Footer/>
        </>
    }

 }

ReactDOM.render(<App/>, document.getElementById('root'))



