const userAPI = 'https://randomuser.me/api/?results=12';

 let xhr = $.getJSON(userAPI, function(jqXHR){
   console.log(jqXHR);
  for(var i = 0; i < 12; i++){
         var $cardImg = jqXHR.results[i].picture.thumbnail;
         var $name = jqXHR.results[i].name.first +' '+ jqXHR.results[i].name.last;
         var $email = jqXHR.results[i].email;
         var $city = jqXHR.results[i].location.city
         var $state = jqXHR.results[i].location.state;
         var $phone = jqXHR.results[i].cell;


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


 const modHTML = `
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
             <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
             <p class="modal-text">Birthday: 10/21/2015</p>
         </div>
     </div>
 `;

const $galleryDiv = $(`#gallery`);
const $modDiv = $(`.modal-container`);
const $modImg = $(`.modal-img`);
const $xbttn = $(`.modal-close-btn`);





$galleryDiv.click(function(e){
  $galleryDiv.after(modHTML);


});//end event listener)

$xbttn.click(function(e){
  $modDiv.hide();
});



 });// end getJSON
