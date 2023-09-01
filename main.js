
const elForm = document.querySelector(".form");
const elInput = document.querySelector(".input");
const elList = document.querySelector(".list");
const elSelect = document.querySelector(".select");

const fragmentEl = document.createDocumentFragment();
const API_KEY = "6c726869"


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


// $(document).ready(function(){
//   $(".list").slick({
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//   });
// });

// console.log();
// /* end carusel */


