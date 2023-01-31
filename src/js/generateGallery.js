export function generateGallery(items) {
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
