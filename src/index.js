import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const inputValue = document.querySelector('#searchBox');

import { searchImages } from './js/searchImages';

const buttonLoad = document.querySelector('.load-more');
const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
var lightbox = new SimpleLightbox('.gallery a');

let currentPage = 1;

form.addEventListener('submit', search);

function search(event) {
  event.preventDefault();
  currentPage = 1;
  searchImages(inputValue.value, currentPage)
    .then(response => {
      Notiflix.Notify.info(
        'Hooray! We found totalHits ' + response.data.totalHits + ' images.'
      );
      return response;
    })
    .then(response => processResponse(response.data))
    .then(galleryItems => {
      gallery.innerHTML = galleryItems;
      lightbox.refresh();
    });

  function loadMore() {
    searchImages(inputValue.value, ++currentPage)
      .then(response => processResponse(response.data))
      .then(galleryItems => {
        gallery.insertAdjacentHTML('beforeend', galleryItems);
        lightbox.refresh();
      });
  }

  buttonLoad.addEventListener('click', loadMore);

  function processResponse(data) {
    if (data.totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return '';
    }
    let sum = (currentPage - 1) * 40 + data.hits.length;

    document.getElementById('load-more').style.visibility =
      Number(sum) < Number(data.totalHits) ? 'visible' : 'hidden';

    return generateGallery(data.hits);
  }
}

function generateGallery(items) {
  return items
    .map(
      item => `<a href='${item.largeImageURL}'><div class="photo-card">
               <img src='${item.webformatURL}' alt="" loading="lazy" />
               <div class="info">
                 <p class="info-item">
                   <b>Likes ${item.likes}</b>
                 </p>
                 <p class="info-item">
                   <b>Views ${item.views}</b>
                 </p>
                 <p class="info-item">
                   <b>Comments ${item.comments}</b>
                 </p>
                 <p class="info-item">
                   <b>Downloads ${item.downloads}</b>
                 </p>
               </div>
             </div></a>`
    )
    .join('');
}
