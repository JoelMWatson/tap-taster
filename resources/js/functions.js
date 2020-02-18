const getUsers = () => {
    return JSON.parse(localStorage.getItem('users'));
}

const getBeers = () => {
    return JSON.parse(localStorage.getItem('notes'));
}

const saveUsers = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
}

const saveBeers = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes));
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
const addBeer = (beers) => {
    // clean up red feilds if any
    document.querySelectorAll(".required").forEach((current) => {
        current.classList.remove("required");
    });
    let beer = document.querySelector("input[name='beer']").value;
    let rating = document.querySelector("input[name='rating']").value;
    let picture = document.querySelector("input[name='picture']").value;
    let notes = document.querySelector("textarea[name='notes']").value;    
    if (beer !== "" && rating !== "" && notes !== "") {
        if (picture === "") {
            picture = "resources/img/no-pic.jpg";
        }
        
        // add note to notes
        beers.push({beer, rating, picture, notes});
        saveBeers(beers);
        
        // add note to UI
        let markup = `
            <div class="note">
                <div class="note__side note__side--front">
                    <h3 class="note__name">${beer}</h3>
                    <img src="${picture}" alt="Beer" class="note__img">
                    <p class="note__rating">${('<ion-icon name="star"></ion-icon>').repeat(rating)}</p>
                </div>
                <div class="note__side note__side--back">
                    <p class="note__name">${beer}</p>
                    <p class="note__text">${notes}</p>
                </div>                            
            </div>            
        `;        
        document.querySelector(".notes__box").style.height = (Math.ceil(beers.length / 3) * 32) + 'rem';
        document.querySelector(".notes__box").insertAdjacentHTML("beforeend", markup);
        document.querySelector('.notes__box').lastElementChild.addEventListener("click", (e) => {
            e.preventDefault();
            e.target.closest(".note").classList.toggle("turn");
        });
        document.querySelector("form").reset();   
    } else {
        if (beer === "") {
            document.querySelector("input[name='beer']").classList.add("required");
        }        
        if (rating === "") {
            document.querySelector("input[name='rating']").classList.add("required");
        }               
        if (notes === "") {
            document.querySelector("textarea[name='notes']").classList.add("required");
        }
    }
    
}