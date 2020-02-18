(function() {
    // get list of existing users
    let users = getUsers();    
    
    // set up default user if storage cleared
    if (!users) {
        users = [{
            username: "Joel",
            password: "Watson"
        }];
    }
    
    // check if signed in
    let signedIn = isSignedIn();
    if (signedIn) {        
        document.querySelector('.header__form').innerHTML = `
            <h2 class="heading-secondary">Welcome back ${signedIn}</h2>
            <a href="https://www.watsoncodes.net/tap-taster/notes.html"><button class="btn" type="button">View Tasting Notes</button></a>
        `;
    } else {
        // handle sign in form
        document.querySelector("#sign-in").addEventListener("submit", (e) => {
            e.preventDefault();
            document.querySelector(".sign-in__error").textContent = "";
            signIn(users);
            if (isSignedIn()) {
                window.location.replace("https://www.watsoncodes.net/tap-taster/notes.html");
            } else {
                document.querySelector(".sign-in__error").textContent = "Username and Password combination incorrect!";
            }
        }, users);

        // handle sign up form
        document.querySelector("#sign-up").addEventListener("submit", (e) => {
            e.preventDefault();
            document.querySelector(".sign-up__error").textContent = "";
            addUser(users);
            saveUsers(users);
            if (isSignedIn()) {
                window.location.replace("https://www.watsoncodes.net/tap-taster/notes.html");
            } else {
                document.querySelector(".sign-up__error").textContent = "Username already in use!";
            }        
        }, users);
        
        // toggle the sign in / sing up forms
        document.querySelector(".header__link").addEventListener("click", (e) => {
            e.preventDefault();
            toggleForm();
        }); 
    }    
    
    // navigation
    document.querySelectorAll(".navigation__link").forEach( (current) => {
        current.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo(0, document.querySelector(e.target.getAttribute("href")).offsetTop);
        });
    });
    
    // scroll to top
    document.querySelector(".scroll__link").addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
    });       
})();

