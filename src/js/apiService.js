
export default class ApiService {
  constructor() {
    this.page = 1;
    this.searchQuery = ''
  }
  async fetchArticles () {
  const API_KEY = '24210531-913aea170a5833c8fd964936d'  
    /* return fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&page=${this.page}&per_page=12`)
      .then(r => r.json())
      .then(({hits}) => {
        this.page += 1
        return hits;
      }
        ) */
    const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&page=${this.page}&per_page=12`);
    const data = response.json();
    this.incrementPage();
    return data;
  }
  resetPage() {
    this.page = 1;
  }
  incrementPage() {
    this.page += 1;
  }
  get query() {
    return this.searchQuery;
  }
  
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}