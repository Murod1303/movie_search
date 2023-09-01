
const elForm = document.querySelector(".form");
const elInput = document.querySelector(".input");
const elList = document.querySelector(".list");
const elSelect = document.querySelector(".select");

const fragmentEl = document.createDocumentFragment();
const API_KEY = "6c726869"

const loveMovie = [
  {
    "Title": "Spider-Man: No Way Home",
    "Year": "2021",
    "imdbID": "tt10872600",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SX300.jpg"
  },
  {
    "Title": "Iron Man 3",
    "Year": "2013",
    "imdbID": "tt1300854",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjE5MzcyNjk1M15BMl5BanBnXkFtZTcwMjQ4MjcxOQ@@._V1_SX300.jpg"
  },
  {
    "Title": "Batman v Superman: Dawn of Justice",
    "Year": "2016",
    "imdbID": "tt2975590",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
  },
  {
    "Title": "Peaky Blinders",
    "Year": "2013–2022",
    "imdbID": "tt2442560",
    "Type": "series",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZjYzZDgzMmYtYjY5Zi00YTk1LThhMDYtNjFlNzM4MTZhYzgyXkEyXkFqcGdeQXVyMTE5NDQ1MzQ3._V1_SX300.jpg"
  },
  {
    "Title": "The Social Network",
    "Year": "2010",
    "imdbID": "tt1285016",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BOGUyZDUxZjEtMmIzMC00MzlmLTg4MGItZWJmMzBhZjE0Mjc1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
  },
  {
    "Title": "Spider-Man: Across the Spider-Verse",
    "Year": "2023",
    "imdbID": "tt9362722",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SX300.jpg"
  },
]
// localStorage.setItem("movies", JSON.stringify(loveMovie))
render(loveMovie, elList)

function render(arr, list) {
  list.innerHTML = "";
  arr.forEach(item => {
    /* create elements  */
    const liEl = document.createElement("li");
    const imgEl = document.createElement("img");
    const wrapperEl = document.createElement("div");
    const titleEl = document.createElement("h3");
    const innerEl = document.createElement("div")
    const categoryEl = document.createElement("span");
    const linkEl = document.createElement("a");
    
    /* create attribute and link href and class */
    liEl.classList.add("item");
    imgEl.classList.add("img")
    imgEl.width = "200";
    imgEl.height = "250";
    imgEl.src = item.Poster;
    imgEl.alt = item.Title;
    wrapperEl.classList.add("item-wrapper")
    titleEl.classList.add("title-item");
    titleEl.textContent = item.Title;
    innerEl.classList.add("wrapper-inner");
    categoryEl.classList.add("category")
    categoryEl.textContent = `Category: ${item.Type}`;
    linkEl.classList.add("link")
    linkEl.textContent = "ImDb"
    linkEl.href = `https://www.imdb.com/title/${item.imdbID}`
    
    
    
    /* append element */
    innerEl.append(categoryEl);
    wrapperEl.append(titleEl, innerEl, linkEl)
    liEl.append(imgEl, wrapperEl);
    fragmentEl.appendChild(liEl)
  });
  list.appendChild(fragmentEl)
}

function getObj(url) {
  fetch(url)
  .then(res => res.json())
  .then(data => {
    (render(data.Search, elList) || "[]")
  })
}




elForm.addEventListener("submit", evt => {
  evt.preventDefault();
  
  const elSelectVal = elSelect.value
  const elInputVal = elInput.value.trim();
  
  if (elSelectVal == "all" && !elInput.value == "") {
    getObj(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${elInputVal}`)
  }else{
    if (!elInput.value == "") {
      getObj(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${elInputVal}&type=${elSelectVal}`)
    }
  }
  
  elInput.value = "";
})



// /* for carusel  */


$(document).ready(function(){
  $('.list').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });
});

// console.log();
// /* end carusel */


