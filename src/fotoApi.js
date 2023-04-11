import Notiflix from 'notiflix';

import axios from 'axios';

export default class FotoAPI {
  #API_KEY = 'key=35143991-d0922efd298f1f4b6c593d4ee';
  #BASE_URL = 'https://pixabay.com/api/';
  #OTHER_PARAMS = 'image_type=photo&orientation=horizontal&safesearch=true';

  page = 1;
  per_page = 40;

  fetchFotos(searchInput) {
    return axios.get(
      `${this.#BASE_URL}?${this.#API_KEY}&q=${searchInput}&${
        this.#OTHER_PARAMS
      }&page=${this.page}&per_page=${this.per_page}`
    );
  }
  // fetchFotos(searchInput) {
  //   return fetch(
  //     `${this.#BASE_URL}?${this.#API_KEY}&q=${searchInput}&${
  //       this.#OTHER_PARAMS
  //     }&page=${this.page}&per_page=${this.per_page}`
  //   ).then(response => {
  //     if (!response.ok) {
  //       throw Notiflix.Notify.failure(
  //         'Oops, there is no photos with that name'
  //       );
  //     }
  //     return response.json();
  //   });
  // }
}

// const fotoAPI = new FotoAPI();
// fotoAPI.fetchFotos('mouse');

Notiflix.Notify.init({
  success: {
    background: 'rgb(9, 199, 155)',
  },
  failure: {
    background: 'rgb(199,9,79)',
  },
});

// объект параметров
// #OTHER_PARAMS = {
// image_type: photo,
//   orientation: horizontal,
//   safesearch: true,
// }
// 1.26 class 10 - 2

//const searchParams = new URLSearchParams({
//   ... this.#OTHER_PARAMS
// page: this.page,
//   per_page: this.per_page,
//   key: this.#API_KEY,
//   q: dog,
// });

// ====================================================
// import { clearRander } from './index';

// const BASE_URL = 'https://restcountries.com/v3.1/name/';
// const FIELDS = 'fields=name,capital,population,languages,flags';

// export function fetchCountries(countryName) {
//   return fetch(`${BASE_URL}${countryName}?${FIELDS}`).then(response => {
//     if (!response.ok) {
//       clearRander();
//       throw Notiflix.Notify.failure('Oops, there is no country with that name');
//     }
//     return response.json();
//   });
// }
