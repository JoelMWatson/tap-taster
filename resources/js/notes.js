(function() {
    
    // check if signed in
    let signedIn = isSignedIn();
    if (!signedIn) {
        window.location.replace("https://www.watsoncodes.net/tap-taster/")
    }
    
})();

