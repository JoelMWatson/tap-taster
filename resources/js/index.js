const getUsers = () => {
    return JSON.parse(localStorage.getItem('users'));
}

const saveUsers = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
}

const isSignedIn = () => {
    return localStorage.getItem("signedIn");
}

const toggleForm = () => {
    document.querySelector("#sign-up").classList.toggle('hidden');
    document.querySelector("#sign-in").classList.toggle('hidden');
    document.querySelector(".header__signup").classList.toggle('hidden');
    document.querySelector(".header__signup").classList.toggle('hidden');
}

//document.querySelector(".section-team").offsetTop

const signIn = (event, users) => {
    event.preventDefault();
    const user = document.querySelector("input[name='username']").value;
    const pass = document.querySelector("input[name='password']").value;
    users.forEach((current) => {
         if (current.username === user && current.password === pass) {
            localStorage.setItem("signedIn", user);
             return true;
         }
    });
    return false;
}

const signOut = () => {
    localStorage.removeItem('signedIn');
}

const addUser = (event, users) => {
    event.preventDefault();
    const user = document.querySelector("input[name='new-username']").value;
    const pass = document.querySelector("input[name='new-password']").value;
    users.forEach((current) => {
         if (current.username === user) {
            console.log("User already exists!"); 
            return false;
         }
    });    
    users.push({username: user, password: pass});
    localStorage.setItem("signedIn", user);
    return true;
};

(function() {
    // get list of existing users
    let users = getUsers();    
    
    // if it doesnt exist set it to an empty array
    if (!users) {
        users = [];
    }
    
    let signedIn = isSignedIn();
    if (signedIn) {
        //TODO
    }
    
    document.querySelectorAll(".navigation__link").forEach( (current) => {
        current.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo(0, document.querySelector(e.target.getAttribute("href")).offsetTop);
        });
    });
    
    document.querySelector(".header__link").addEventListener("click", (e) => {
        e.preventDefault();
        toggleForm();
    });
    
    document.querySelector("#sign-in").addEventListener("submit", (e) => {
        addUser(e, users);
        saveUsers(users);
    }, users);
    
    document.querySelector("#sign-up").addEventListener("submit", (e) => {
        addUser(e, users);
        saveUsers(users);
    }, users);
})();

