(function() {    
    // check if signed in
    let signedIn = isSignedIn();
    if (!signedIn) {
        window.location.replace("https://www.watsoncodes.net/tap-taster/")
    };
    
    document.querySelector(".heading-primary").textContent = `Welcome back, ${signedIn}`;
    
    let notes = getNotes();
    // set up default notes if storage is cleared
    if (!notes) {
        notes = [{
            name: "Corona",
            rating: "1",
            picture: "resources/img/beer-3.jpg",
            notes: "This beer is honestly pretty terrible"
            },{
            name: "Heineken",
            rating: "2",
            picture: "resources/img/beer-2.jpg",
            notes: "This beer is also pretty terrible"
            },{
            name: "Voodoo Ranger",
            rating: "4", 
            picture: "resources/img/beer-1.jpg",
            notes: "Alright this one is pretty good"    
            }
        ]
        saveNotes(notes);
    }
    
    // place the notes
    notes.forEach((current, index) => {        
        let markup = `
            <div class="note">
                <div class="note__side note__side--front">
                    <h3 class="note__name">${current.name}</h3>
                    <img src="${current.picture}" alt="Beer" class="note__img">
                    <p class="note__rating">${current.rating}</p>
                </div>
                <div class="note__side note__side--back">
                    <p class="note__name">${current.name}</p>
                    <p class="note__text">${current.notes}</p>
                </div>                            
            </div>            
        `;
        document.querySelector(".notes__box").insertAdjacentHTML("beforeend", markup);
    });
        
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

