const userAPI = 'https://randomuser.me/api/?results=12';
//begin getJSON
 let xhr = $.getJSON(userAPI, function(jqXHR){
   //loop through array of 12 'employees'
  for(var i = 0; i < 12; i++){
    //variables defined for use, var keywaord chosen because of no block level scoping
         var $cardImg = jqXHR.results[i].picture.thumbnail;
         var $name = jqXHR.results[i].name.first +' '+ jqXHR.results[i].name.last;
         var $email = jqXHR.results[i].email;
         var $city = jqXHR.results[i].location.city
         var $state = jqXHR.results[i].location.state;
         var $phone = jqXHR.results[i].cell;
         var $street = jqXHR.results[i].location.street;
         var $post = jqXHR.results[i].location.postcode;
         var $dob = jqXHR.results[i].dob.date;
         //attempt to alter the $dob so that the time is not present in the modal
         const reg = /T\w\w:\w\w:\w\w\w/;
        $dob.replace(reg, '');

//gallery html to be written to the document displaying the 12 'employee'
const html = `
         <div id="gallery" class="gallery">
             <div class="card">
                 <div class="card-img-container">
                     <img class="card-img" src=${$cardImg} alt="profile picture">
                 </div>
                 <div class="card-info-container">
                     <h3 id="name" class="card-name cap">${$name}</h3>
                     <p class="card-text">${$email}</p>
                     <p class="card-text cap">${$city}, ${$state}</p>
                 </div>
             </div>
          </div>
         `;
     $(`header`).after(html);
}
//dynamic html added for modal creation
const modHTML =
`
 <div class="modal-container">
     <div class="modal">
         <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
         <div class="modal-info-container">
             <img class="modal-img" src=${$cardImg} alt="profile picture">
             <h3 id="name" class="modal-name cap">${$name}</h3>
             <p class="modal-text">${$email}</p>
             <p class="modal-text cap">${$city}</p>
             <hr>
             <p class="modal-text">${$phone}</p>
             <p class="modal-text">${$street}, ${$city}, ${$state} ${$post}</p>
             <p class="modal-text">Birthday: ${$dob}</p>
         </div>
     </div>
 `;

$(document.body).append(modHTML);
const $cardDiv = $(`.card`);
const $modal = $(`.modal-container`);
$modal.hide();

//event listener to trigger modal window
$.each($cardDiv, function(i, val){
    val.click(function(){
      $modal.show();
    });
});//end event listener)

//adding functionality to 'X' button
$(`button`).click(function(e){
  $modal.hide();
  });
});// end getJSON
