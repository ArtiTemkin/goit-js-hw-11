const axios = require('axios').default;

export async function searchImages(word, pageNumber) {
  const BASE_URL = 'https://pixabay.com/api/';
  return await axios.get(BASE_URL, {
    params: {
      key: '33148659-9e7070eb586a161993750e023',
      q: word,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: '40',
      page: pageNumber,
    },
  });
}
