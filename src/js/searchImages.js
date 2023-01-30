const axios = require('axios').default;

export async function searchImages(word, pageNumber) {
  const BASE_URL = 'https://pixabay.com/api';
  return await axios
    .get(BASE_URL, {
      params: {
        key: '33148659-9e7070eb586a161993750e023',
        q: word,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: '40',
        page: pageNumber,
      },
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

//searchImages(AUTH_KEY, 'word').then(r => console.log(r));
// { totalHits: 500,
//   hits:
//    [ { likes: 108,
//        tags: 'chihuahua, dog, puppy',
//        views: 38770,
//        comments: 17,
//        downloads: 11050,
//        webformatURL: 'https://pixabay.com/get/ef37b00e29f61c2ad65a5854e34b4294e277eac818b5184993f0c07fafe9_640.jpg',
//        userImageURL: 'https://cdn.pixabay.com/user/2015/02/02/17-19-43-530_250x250.jpg',
//    ],
//   total: 3343
// }
