// collegamento riferimento file html
const outputCard = document.getElementById("container");
const activateOverlay = document.getElementById("overlay");
const stopBody = document.querySelector("body");

// definizione endpoint di riferimento all'url dell'API
const endpoint = "https://lanciweb.github.io/demo/api/pictures/";

// Chiamata ajax
axios
  .get(endpoint)
  .then((response) => {
    //prendo l'array di oggetti che mi serev dalla chiamata
    const posts = response.data;

    //Creo una stringa vuota dove andare ad incrementare il testo html ogni volta che prendo i dati che mi servono dall'oggetto dell'array
    let innerCard = "";
    //Faccio un ciclo per attraversare tutti gli oggetti dell'array
    posts.forEach( post => {
      //destrutturo l'array
      const { title, date, url } = post;
      //faccio chiamata alla funzione per avere il testo da inserire nell'html
      innerCard += cardGenerator(title, date, url);
    });
    outputCard.innerHTML = innerCard;

    //Prendiamo riferimenti card della pagina(creando un array con tutti i riferimenti ad ogni singola card)
    const allCard = document.querySelectorAll(".card");

    //selezioniamo l'evento di click sulle varie card
    allCard.forEach( (card, index) => {
      card.addEventListener("click", (event) => {                           //quando viene cliccata una card:
        activateOverlay.classList.remove("disactive");                      //appare overlay con immagine della card grande
        stopBody.classList.add("hidden");                                   //viene bloccato lo scroll e i vari comportamenti del body
        const selectedCard = posts.find(post => post.id === index + 1);     //recupero l'oggetto corrispondente alla card selezionata
        activateOverlay.innerHTML = overlayGenerator(selectedCard.url, selectedCard.title);    //faccio creare l'overlay con l'url dell'immagine di questa card da inssrire nell'html
        const closeButton = document.querySelector("button");              //seleziono il bottone appena creato
        closeButton.addEventListener("click", (event) => {                 //quando clicco il bottone:
          event.preventDefault();
          activateOverlay.classList.add("disactive");                      //faccio chiudere l'overlay e riprendo tutti i normali comportamenti del body
          stopBody.classList.remove("hidden");
        });
      });
    });
  })
  .catch((error) => {
    // codice da eseguire in caso di errore(mando errore in pagina)
    document.querySelector("body").innerHTML = error.message;
  });

// FUNZIONI
function cardGenerator(description, date, urlImage) {
  output = `       
        <div class="card">
          <img src="./img/pin.svg" alt="pin rosso che blocca la foto sulla bacheca" class="pin" />
          <figure>
            <img src="${urlImage}" alt="${description}" />
          </figure>
          <figcaption>
            <h2>${description.toUpperCase()}</h2>
            <p>${date}</p>
          </figcaption>
        </div>`;
  return output;
}

function overlayGenerator(urlImage, description) {
  output = `<button>Chiudi</button>
      </div><img src="${urlImage}" alt="${description}" />`;
  return output;
}
