// collegamento riferimento file html
const outputCard = document.getElementById("container");
const activateOverlay = document.getElementById("overlay");
const stopBody = document.querySelector("body");
const imageOverlay = document.getElementById("img-overlay");
const closeButton = document.querySelector("button");

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
    posts.forEach((post) => {
      //destrutturo l'array
      const { title, date, url } = post;
      //faccio chiamata alla funzione per avere il testo da inserire nell'html
      innerCard += cardGenerator(title, date, url);
    });
    outputCard.innerHTML = innerCard;
    console.log(posts);

    //Prendiamo riferimenti card della pagina(creando un array con tutti i riferimenti ad ogni singola card)
    const allCard = document.querySelectorAll(".card");
    console.log(allCard);

    //selezioniamo l'evento di click su una card
    for (let index = 0; index < allCard.length; index++) {
      allCard[index].addEventListener("click", (event) => {
        activateOverlay.classList.remove("disactive");
        stopBody.classList.add("hidden");
        const objectCard = posts.find((post) => post.id === index + 1);
        imageOverlay.innerHTML = `<img src="${objectCard.url}" alt="" />`;
      });

      closeButton.addEventListener("click", (event) => {
        event.preventDefault();
        activateOverlay.classList.add("disactive");
        stopBody.classList.remove("hidden");
      });
    }
  })
  .catch((error) => {
    // codice da eseguire in caso di errore(mando errore in pagina)
    document.querySelector("body").innerHTML = error.message;
  });

function cardGenerator(description, date, urlImage) {
  output = `       
        <div class="card">
          <img src="./img/pin.svg" alt="" id="pin" />
          <figure>
            <img src="${urlImage}" alt="" />
          </figure>
          <figcaption>
            <div>${description}</div>
            <div>${date}</div>
          </figcaption>
        </div>`;
  return output;
}
