// collegamento riferimento file html
const outputCard = document.getElementById('container');

// definizione endpoint di riferimento all'url dell'API 
const endpoint = "https://lanciweb.github.io/demo/api/pictures/";

// Chiamata ajax
axios.get(endpoint)
.then(response => {
    //prendo l'array di oggetti che mi serev dalla chiamata
    const posts = response.data;
    
    //Creo una stringa vuota dove andare ad incrementare il testo html ogni volta che prendo i dati che mi servono dall'oggetto dell'array
    let innerCard = "";
    //Faccio un ciclo per attraversare tutti gli oggetti dell'array
    posts.forEach(post => {
    //destrutturo l'array
    const { title, date, url : urlImg } = post;
    innerCard += `       
        <div class="card">
          <img src="./img/pin.svg" alt="" id="pin" />
          <figure>
            <img src="${urlImg}" alt="" />
          </figure>
          <figcaption>
            <div>${title}</div>
            <div>${date}</div>
          </figcaption>
        </div>`
    });
    outputCard.innerHTML = innerCard;
    

})
.catch( error => {
        // codice da eseguire in caso di errore
        console.error(error.message)
      })

