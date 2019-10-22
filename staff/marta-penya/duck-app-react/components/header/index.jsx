function Header( { user, onSingOut } ) {
    return <header className="header">
    <h1 className="header__title">DUCK APP</h1>
    <img className="header__image" src="https://www.favicon.cc/logo3d/75350.png" alt="duck image"/>
      
    {user && <p className="header__user">{`hello ${user.name}`}</p> &&
    <button className="header__button" onClick={
        event => {
            event.preventDefault()

            onSingOut()
        }
    }>Sign Out</button> }
        
    </header>
}