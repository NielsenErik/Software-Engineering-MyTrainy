 
// /**
//  * This variable stores the logged in user
//  */
//  var loggedUser = {};
//  var newUser = {};
 
//  /**
//   * This function is called when login button is pressed.
//   * Note that this does not perform an actual authentication of the user.
//   * A student is loaded given the specified email,
//   * if it exists, the studentId is used in future calls.
//   */
//  function login(){   
//      //get the form object
//      var email = document.getElementById("loginEmail").value;
//      var password = document.getElementById("loginPassword").value;
     
 
//      fetch('../api/v1/authentications', {
//          method: 'POST',
//          headers: { 'Content-Type': 'application/json' },
//          body: JSON.stringify( { email: email, password: password } ),
//      })
//      .then((resp) => resp.json()) // Transform the data into json
//      .then(function(data) { // Here you get the data to modify as you please
//          //console.log(data);
//          loggedUser.token = data.token;
//          loggedUser.email = data.email;
//          loggedUser.id = data.id;
//          loggedUser.self = data.self;
         
//          document.getElementById("loggedUser").textContent = loggedUser.email;
//          loadCard();
//          return;
//      })
//      .catch( error => console.error(error) ); // If there is any error you will catch them here
 
//  };
 
//  function registration(){
//      console.log("in script.js")
//      var email = document.getElementById("email").value;
//      var password = document.getElementById("password").value;
//      var userType = document.getElementById("userType").value;
//      fetch('../api/v1/users', {
//          method: 'POST',
//          headers: { 'Content-Type': 'application/json' },
//          body: JSON.stringify( { email: email, password: password, userType: userType } ),
//      }).then(function(data) { // Here you get the data to modify as you please
//          //console.log(data);
//          newUser.email = data.email;
//          newUser.id = data.id;
//          newUser.self = data.self;
//          // loggedUser.id = loggedUser.self.substring(loggedUser.self.lastIndexOf('/') + 1);
//          document.getElementById("newUser").innerHTML = "Created";
//          return;
//      })
//      .catch( error => console.error(error) ); // If there is any error you will catch them here
 
//  };
 
//  function loadCard(){
     
//      fetch('../api/v1/userCards/'+loggedUser.id, {
//          method: 'GET',
//          headers: { 'Content-Type': 'application/json' },
//          body: JSON.stringify(),
//      })
//      .then((resp) => resp.json())
//      .then(function(data) {
//          data.forEach(el => {
//              var opt = document.createElement('option');
//              var training = el.title +"  |   "+el.sport+"  |  "+el.startDate + "  |  "+"  |  "+el.endDate + "  |  "+ el.self
//              opt.innerHTML = training;
//              opt.value = el._id;
//              document.getElementById("myCards").appendChild(opt);
//          })
//      })
//  }
 
//  function createNewTraining(){
//      console.log("in script.js")
//      var title = document.getElementById("title").value;
//      var sport = document.getElementById("sport").value;
//      var startDate = document.getElementById("startdate").value;
//      var endDate = document.getElementById("enddate").value;
//      var comment = document.getElementById("comment").value;
//      fetch('../api/v1/card/'+loggedUser.id, {
//          method: 'POST',
//          headers: { 'Content-Type': 'application/json' },
//          body: JSON.stringify( { userId: loggedUser.id, title: title, sport: sport, startDate:startDate, endDate:endDate, comment: comment } ),
//      }).then(function(data) { 
         
//          var opt = document.createElement('option');
//          var createdTraining = "New training created, reload page and login to see it!"
//          opt.innerHTML = createdTraining;
//          opt.value = data._id;
         
//          document.getElementById("createdTraining").appendChild(opt);
//          return;
//      })
//      .catch( error => console.error(error) ); 
 
//  };
 
 