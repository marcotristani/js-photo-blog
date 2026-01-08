// collegamento riferimento file html
const outputCard = document.getElementById('container');

// definizione endpoint di riferimento all'url dell'API 
const endpoint = "https://lanciweb.github.io/demo/api/pictures/";

// Chiamata ajax
axios.get(endpoint)
.then(response => {
    const posts = response.data;
    console.log(posts);
    
    

})
.catch( error => {
        // codice da eseguire in caso di errore
        console.error(error.message)
      })

