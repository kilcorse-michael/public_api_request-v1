const userAPI = 'https://randomuser.me/api/?results=12';

 let xhr = $.getJSON(userAPI, function(jqXHR){
   console.log(jqXHR);
  for(var i = 0; i < 12; i++){
         var $cardImg = jqXHR.results[i].picture.thumbnail;
         var $name = jqXHR.results[i].name.first +' '+ jqXHR.results[0].name.last;
         var $email = jqXHR.results[i].email;
         var $location = jqXHR.results[i].location.city + ', ' + jqXHR.results[0].location.state;
}
      for(let i = 0; i < 12; i++){
         let html = `
             <div class="card">
                 <div class="card-img-container">
                     <img class="card-img" src=${$cardImg} alt="profile picture">
                 </div>
                 <div class="card-info-container">
                     <h3 id="name" class="card-name cap">${$name}</h3>
                     <p class="card-text">${$email}</p>
                     <p class="card-text cap">${$location}</p>
                 </div>
             </div>
         `;
     $(`#gallery`).append(html);

 }



 });// end getJSON
