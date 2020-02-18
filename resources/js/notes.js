(function() {    
    // check if signed in
    let signedIn = isSignedIn();
    if (!signedIn) {
        window.location.replace("https://www.watsoncodes.net/tap-taster/")
    };
    
    document.querySelector(".heading-primary").textContent = `Welcome back, ${signedIn}`;
    
    let beers = getBeers();
    // set up default beers if storage is cleared
    if (!beers) {
        beers = [{
            beer: "Corona",
            rating: "1",
            picture: "resources/img/beer-3.jpg",
            notes: "This beer is honestly pretty terrible"
            },{
            beer: "Heineken",
            rating: "2",
            picture: "resources/img/beer-2.jpg",
            notes: "This beer is also pretty terrible"
            },{
            beer: "Voodoo Ranger",
            rating: "4", 
            picture: "resources/img/beer-1.jpg",
            notes: "Alright this one is pretty good"    
            }
        ]
        saveBeers(beers);
    }        
    
    // make space for notes
    document.querySelector(".notes__box").style.height = (Math.ceil(beers.length / 3) * 32) + 'rem';
    
    // place the notes
    beers.forEach((current) => {        
        let markup = `
            <div class="note">
                <div class="note__side note__side--front">
                    <h3 class="note__name">${current.beer}</h3>
                    <img src="${current.picture}" alt="Beer" class="note__img">
                    <p class="note__rating">${('<ion-icon name="star"></ion-icon>').repeat(current.rating)}</p>
                </div>
                <div class="note__side note__side--back">
                    <p class="note__name">${current.beer}</p>
                    <p class="note__text">${current.notes}</p>
                </div>                            
            </div>
        `;
        document.querySelector(".notes__box").insertAdjacentHTML("beforeend", markup);
    });
    
    // new note 
    document.querySelector("#add-note").addEventListener("submit", (e) => {
        e.preventDefault();
        addBeer(beers);
    }, beers);
        
    // turn over notes on click
    document.querySelectorAll(".note").forEach((current) => {
        current.addEventListener("click", (e) => {
            e.preventDefault();
            e.target.closest(".note").classList.toggle("turn");
        });
    });
    
    // sign out
    document.querySelector(".sign-out").addEventListener("click", (e) => {
        e.preventDefault();
        signOut();
    });
    
    // scroll to top
    document.querySelector(".scroll__link").addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
    });
})();

