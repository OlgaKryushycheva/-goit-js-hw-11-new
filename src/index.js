import Notiflix from 'notiflix';
import './css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import FotoAPI from './fotoApi';

const searchFormEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadMorBtnEl = document.querySelector('.load-more');

searchFormEl.addEventListener('submit', onSearchFotos);
loadMorBtnEl.addEventListener('click', onloadMorFotos);

const fotoAPI = new FotoAPI();

function onSearchFotos(evt) {
  evt.preventDefault();

  const searchQuery = evt.target.elements.searchQuery.value.trim();
  fotoAPI.q = searchQuery;
  fotoAPI.page += 1; //перенести в обробник кнопки - 10 модуль, 2 урок, 1.45

  console.log(searchQuery);

  fotoAPI
    .fetchFotos(searchQuery)
    .then(({ data }) => {
      console.log(data);

      // прятать кнопку ЛоадМоре если больше нет фоток

      if (data.hits.length !== 0) {
        loadMoreBtnEnable();
        console.log(data.hits);

        totalHits = data.totalHits;
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);

        const fotos = data.hits;

        const markup = fotos.map(el => createMarkup(el)).join('');
        galleryEl.innerHTML = markup;

        console.log(data.hits.length);

        function createMarkup({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) {
          return `<div class="photo-card">
       <a href="${largeImageURL}">
       <img class="gallery__image"
       src="${webformatURL}" 
       alt="${tags}" 
       loading="lazy" />
       </a>
     <div class="info">
         <p class="info-item">
           <b>Likes <br />${likes}</b>
         </p>
         <p class="info-item">
           <b>Views <br />${views}</b>
         </p>
         <p class="info-item">
           <b>Comments <br />${comments}</b>
         </p>
         <p class="info-item">
           <b>Downloads <br />${downloads}</b>
         </p>
       </div>
     </div>`;
        }
        gallery.refresh();
      } else {
        galleryEl.innerHTML = '';
        throw Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
    })
    .catch(err => {
      loadMoreBtnDisable();
      console.log(err);
    });
}

function onloadMorFotos() {
  //  galleryEl.insertAdjacentHTML('beforeend', markup);
  console.log('onloadMorFotos');
  // if (data.totalHits === data.hits.length) {
  // Notiflix.Notify.failure(
  //   'We're sorry, but you've reached the end of search results.'
  // );
  // }
}

function loadMoreBtnEnable() {
  loadMorBtnEl.classList.remove('hidden');
}

function loadMoreBtnDisable() {
  loadMorBtnEl.classList.add('hidden');
}

const gallery = new SimpleLightbox('.gallery a');

Notiflix.Notify.init({
  success: {
    background: 'rgb(9, 199, 155)',
  },
  failure: {
    background: 'rgb(199,9,79)',
  },
});

// ========================================

// function onSearchCountry() {
//   const searchQuery = searchInputEl.value.trim();

//   if (searchQuery.length === 0) {
//     clearRander();
//     return;
//   } else if (searchQuery.length > 0) {
//     fetchCountries(searchQuery)
//       .then(data => {
//         if (data.length > 10) {
//           clearRander();
//           throw Notiflix.Notify.info(
//             `Too many matches found. Please enter a more specific name.`
//           );
//         } else if (data.length > 1 && data.length <= 10) {
//           countryInfoEl.innerHTML = '';

//           let countryCollectionArr = [];
//           let countryCollection;

//           for (let i = 0; i < data.length; i++) {
//             let name = data[i].name.official;
//             let flag = data[i].flags.svg;

//             const markupCountryList = ` <li class="country-item">
//           <img
//             src="${flag}"
//             alt="flag"
//             width="25"
//             height="20"
//           />
//           <p class="country-name">${name}</p>
//         </li>`;

//             countryCollectionArr.push(markupCountryList);
//             countryCollection = countryCollectionArr.join('');
//           }

//           countryListEl.innerHTML = countryCollection;
//         } else {
//           countryListEl.innerHTML = '';

//           let dataSity = data[0];
//           let name = dataSity.name.official;
//           let flag = dataSity.flags.svg;
//           let capital = dataSity.capital[0];
//           let languages = Object.values(dataSity.languages).join(', ');
//           let population = dataSity.population;

//           const markupCountryInfo = `<div class="country-title">
//           <img
//             src="${flag}"
//             alt="flag"
//             width="30"
//             height="25"
//           />
//           <p>${name}</p>
//         </div>
//         <p class="country-descr">
//           <span class="country-field">Capital: </span>${capital}
//         </p>
//         <p class="country-descr">
//           <span class="country-field">Population: </span>${population}
//         </p>
//         <p class="country-descr">
//           <span class="country-field">Languages: </span>${languages}
//         </p>`;

//           countryInfoEl.innerHTML = markupCountryInfo;
//         }
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }
// }

// export function clearRander() {
//   countryListEl.innerHTML = '';
//   countryInfoEl.innerHTML = '';
// }

console.log('TEST');

// ==========================================================
// спроба зробити окремі функції по створенню розмітки

// function makeCountryInfo(flag, name, capital, population, languages) {
//   countryInfoEl.innerHTML = ` <div class="country-title">
//         <img
//           src="${flag}"
//           alt="flag"
//           width="25"
//           height="20"
//         />
//         <p>${name}</p>
//       </div>

//       <p class="country-descr">
//         <span class="country-field">Capital: </span>${capital}
//       </p>
//       <p class="country-descr">
//         <span class="country-field">Population: </span>${population}
//       </p>
//       <p class="country-descr">
//         <span class="country-field">Languages: </span>${languages}
//       </p>`;

//   // countryInfoEl.innerHTML = markupCountryInfo;
// }

// const markup = ` <div class="country-title">
//         <img
//           src="${flag}"
//           alt="flag"
//           width="25"
//           height="20"
//         />
//         <p>${name}</p>
//       </div>

//       <p class="country-descr">
//         <span class="country-field">Capital: </span>${capital}
//       </p>
//       <p class="country-descr">
//         <span class="country-field">Population: </span>${population}
//       </p>
//       <p class="country-descr">
//         <span class="country-field">Languages: </span>${languages}
//       </p>`
