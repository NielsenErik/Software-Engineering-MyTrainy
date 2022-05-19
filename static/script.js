  
/**
 * This variable stores the logged in user
 */
var loggedUser = {};
var newUser = {};

/**
 * This function is called when login button is pressed.
 * Note that this does not perform an actual authentication of the user.
 * A student is loaded given the specified email,
 * if it exists, the studentId is used in future calls.
 */
function login(){   
    //get the form object
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;
    

    fetch('../api/v1/authentications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { email: email, password: password } ),
    })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) { // Here you get the data to modify as you please
        //console.log(data);
        loggedUser.token = data.token;
        loggedUser.email = data.email;
        loggedUser.id = data.id;
        loggedUser.self = data.self;
        // loggedUser.id = loggedUser.self.substring(loggedUser.self.lastIndexOf('/') + 1);
        document.getElementById("loggedUser").textContent = loggedUser.email;
        myCards();
        return;
    })
    .catch( error => console.error(error) ); // If there is any error you will catch them here

};

function registration(){
    console.log("in script.js")
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var userType = document.getElementById("userType").value;
    fetch('../api/v1/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { email: email, password: password, userType: userType } ),
    }).then(function(data) { // Here you get the data to modify as you please
        //console.log(data);
        newUser.email = data.email;
        newUser.id = data.id;
        newUser.self = data.self;
        // loggedUser.id = loggedUser.self.substring(loggedUser.self.lastIndexOf('/') + 1);
        document.getElementById("newUser").innerHTML = "Created";
        myCards();
        return;
    })
    .catch( error => console.error(error) ); // If there is any error you will catch them here

};

function myCards(){
    console.log("Sono in my Cards")
    const ul = document.getElementById('myCards'); // Get the list where we will place our lendings

    ul.innerHTML = '';
    fetch('../api/v1/card', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { userId:loggedUser.id } ),})
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) { // Here you get the data to modify as you please
        
        console.log(data);
        
        return data.map( (entry) => { // Map through the results and for each run the code below
            
            // let bookId = book.self.substring(book.self.lastIndexOf('/') + 1);
            
            let li = document.createElement('li');
            let span = document.createElement('span');
            // span.innerHTML = `<a href="${entry.self}">${entry.book}</a>`;
            let a = document.createElement('a');
            a.href = entry.self
            a.textContent = entry.book;
            
            // Append all our elements
            span.appendChild(a);
            li.appendChild(span);
            ul.appendChild(li);
        })
    })
    .catch( error => console.error(error) );// If there is any error you will catch them here
};


