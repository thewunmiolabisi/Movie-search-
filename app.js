document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const imagesContainer = document.querySelector('.images');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let query = form.querySelector('input').value;
    console.log(query);
    
    fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(movies => displayImages(movies, imagesContainer)) 
      .catch(errorFunc);
  });

  function displayImages(movies, imagesContainer) {
    imagesContainer.innerHTML = '';

    for (let movie of movies) {
      if (movie.show.image && movie.show.image.medium) {
        let imageUrl = movie.show.image.medium;
        const displayImg = document.createElement('img');
        displayImg.src = imageUrl;
        imagesContainer.appendChild(displayImg);
      }
    }
  }

  function errorFunc(error) {
    console.log('Error:', error);
  }
});
