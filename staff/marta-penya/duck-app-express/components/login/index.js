module.exports = function() {
    return `<section class="login">
    <div class="login__div">
        <form class="login__form">               
            <input type="text" name="email" placeholder="email" class="login__input" required/>
            <input type="password" name="password" placeholder="password" class="login__input" required/>
            <button class="login__button"> Login</button>        
         </form>
        <button class="login__goregistrer"> Go to Register</button>
    </div>
    </section>`
}

