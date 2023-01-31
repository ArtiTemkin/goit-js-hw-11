import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const inputValue = document.querySelector('#searchBox');

import { searchImages } from './js/searchImages';
import { generateGallery } from './js/generateGallery';

const buttonLoad = document.querySelector('.load-more');
const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
var lightbox = new SimpleLightbox('.gallery a');

let currentPage = 1;

form.addEventListener('submit', search);
buttonLoad.addEventListener('click', loadMore);

function search(event) {
  event.preventDefault();
  currentPage = 1;
  searchImages(inputValue.value, currentPage)
    .then(response => {
      if (response.data.totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        Notiflix.Notify.info(
          'Hooray! We found totalHits ' + response.data.totalHits + ' images.'
        );
      }
      if (Number(response.data.totalHits) > 40) {
        document.getElementById('load-more').style.visibility = 'visible';
      }
      return response.data;
    })
    .then(data => {
      gallery.innerHTML = generateGallery(data.hits);
      lightbox.refresh();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function loadMore() {
  searchImages(inputValue.value, ++currentPage).then(response => {
    if (Number(response.data.hits.length) < 40) {
      document.getElementById('load-more').style.visibility = 'hidden';
    }
    gallery.insertAdjacentHTML(
      'beforeend',
      generateGallery(response.data.hits)
    );
    lightbox.refresh();
  });
}
