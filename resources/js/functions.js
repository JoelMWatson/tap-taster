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
    // toggle form
    document.querySelector("#sign-up").classList.toggle('hidden');
    document.querySelector("#sign-in").classList.toggle('hidden');
    document.querySelector(".header__signup").classList.toggle('hidden');
    document.querySelector(".header__signup").classList.toggle('hidden');
    
    // clear passwords    
    document.querySelector("input[name='password']").value = "";
    document.querySelector("input[name='new-password']").value = "";
    
    // clear errors
    document.querySelector(".sign-in__error").textContent = "";
    document.querySelector(".sign-up__error").textContent = "";
    document.querySelectorAll(".required").forEach((current) => {
        current.classList.remove("required");
    });
}

const signIn = (users) => {
    const user = document.querySelector("input[name='username']").value;
    const pass = document.querySelector("input[name='password']").value;
    if (user !== "" && pass !== "") {
        users.forEach((current) => {
             if (current.username === user && current.password === pass) {
                localStorage.setItem("signedIn", user);
             }
        });
    } else {
        if (user === "") {
            document.querySelector("input[name='username']").classList.add("required");
        }
        if (pass === "") {
            document.querySelector("input[name='password']").classList.add("required");
        }
    }
}

const signOut = () => {
    localStorage.removeItem('signedIn');
    window.location.replace("https://www.watsoncodes.net/tap-taster/notes.html");
}

const addUser = (users) => {
    const user = document.querySelector("input[name='new-username']").value;
    const pass = document.querySelector("input[name='new-password']").value;
    if (user !== "" && pass !== "") {
        let exists = false;
        users.forEach((current) => {
             if (current.username === user) {
                exists = true;
             }
        });
        if (!exists) {
            users.push({username: user, password: pass});
            localStorage.setItem("signedIn", user);
        }
    } else {
        if (user === "") {
            document.querySelector("input[name='new-username']").classList.add("required");
        }
        if (pass === "") {
            document.querySelector("input[name='new-password']").classList.add("required");
        }
    }
};
