const userAPI = 'https://randomuser.me/api/?results=12&&nat=us';
//gallery html to be written to the document displaying the 12 'employees'

const searchHTML = `
      <form action="#" method="get">
          <input type="search" id="search-input" class="search-input" placeholder="Search...">
          <span>Press Enter to Search</span>
      </form>
      `;
$(`.search-container`).append(searchHTML);
const galleryHTML = `
    <div id="gallery" class="gallery">
    </div>
`;
// adding search functionality
$("#search-input").on("keydown", function(e) {
  if(13 === e.keyCode){
  var value = $(this).val().toLowerCase();
  $(".card").filter(function() {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  });
 }
});

$(document.body).append(galleryHTML);
//begin getJSON
let xhr = $.getJSON(userAPI, function(jqXHR){
       //loop through array of 12 'employees'
      for(var i = 0; i < 12; i++){
        //object to store values of jqXHR
        var directObj = {
             $cardImg : jqXHR.results[i].picture.large,
             $name : jqXHR.results[i].name.first +' '+ jqXHR.results[i].name.last,
             $email : jqXHR.results[i].email,
             $city : jqXHR.results[i].location.city,
             $state : jqXHR.results[i].location.state,
             $phone : jqXHR.results[i].cell,
             $street : jqXHR.results[i].location.street,
             $post : jqXHR.results[i].location.postcode,
             $dob : jqXHR.results[i].dob.date,
           };
             //attempt to alter the $dob so that the time is not present in the modal
            //  const reg = /T\w\w:\w\w:\w\w\w/;
            // $dob.replace(reg, '');
            const cardHTML = `
                         <div class="card">
                             <div class="card-img-container">
                                 <img class="card-img" src="${directObj.$cardImg}" alt="profile picture">
                             </div>
                             <div class="card-info-container">
                                 <h3 id="name" class="card-name cap">${directObj.$name}</h3>
                                 <p class="card-text">${directObj.$email}</p>
                                 <p class="card-text cap">${directObj.$city}, ${directObj.$state}</p>
                             </div>
                             <div id="extra-info" class="extra${i}">
                             ${directObj.$phone},
                             ${directObj.$street},
                             ${directObj.$post},
                             ${directObj.$dob}
                             </div>
                         </div>
                     `;
          $(`#gallery`).append(cardHTML);
          $(`.extra${i}`).hide();
    }//end loop
  const $cardDiv = $(`.card`);
  //event listener to trigger modal window
  $cardDiv.click(function(e){
    let imgSource = $(this).find(`img`).prop(`src`);
    let nameSource = $(this).find(`#name`).prop(`innerText`);
    let emailSource = $(this).find(`.card-text`).prop(`innerText`);
    let citySource = $(this).find(`.card-text`).next().prop(`innerText`);
    let extraInfo = $(this).find(`#extra-info`).prop(`innerText`);

    let extras = extraInfo.split(`,`);
    let phoneSource = extras[0];
    let streetSource = extras[1];
    let postSource = extras[2];
    let dobSource = extras[3];

    let city = citySource.split(`,`);

    let altDOB = dobSource.split(`T`);
      //dynamic html added for modal creation
      var modHTML =
           `
            <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src=${imgSource} alt="profile picture">
                        <h3 id="name" class="modal-name cap">${nameSource}</h3>
                        <p class="modal-text">${emailSource}</p>
                        <p class="modal-text cap">${city[0]}</p>
                        <hr>
                        <p class="modal-text">${phoneSource}</p>
                        <p class="modal-text">${streetSource}, ${city[0]}, ${city[1]} ${postSource}</p>
                        <p class="modal-text">Birthday: ${altDOB[0]}</p>
                    </div>
                </div>
                </div>
            `;
        $(document.body).append(modHTML);
        //adding functionality to 'X' button
        $(`.modal-close-btn`).click(function(e){
        $(`.modal-container`).remove();
            });//end X button event listener
      });//end event listener)
});// end getJSON
