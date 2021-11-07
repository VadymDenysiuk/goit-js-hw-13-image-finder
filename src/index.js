import './sass/main.scss';
import ApiService from './js/apiService';
import imagesTpl from './templates/template.hbs';

const refs = {
  searchForm: document.querySelector('.search-form'),
  container: document.querySelector('.gallery'),
  loadMore: document.querySelector('[data-action="load-more"]'),
  listItem: document.querySelector('.list-item'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxImage: document.querySelector('.lightbox__image'),
  closeModalBtn: document.querySelector('.lightbox__button')
}

const apiService = new ApiService();
refs.loadMore.classList.add('is-hidden')
refs.searchForm.addEventListener('submit', onSearch)
refs.loadMore.addEventListener('click', onLoadMore)

function onSearch(e) {
  e.preventDefault();
  
  
  apiService.resetPage()
  apiService.query = e.currentTarget.elements.query.value;
  apiService.fetchArticles().then(({ hits }) => {
    if (!hits.length) {
      alert('Введите валидное значение');
      cleanContainer();
      refs.loadMore.classList.add('is-hidden')
      return;
    }
    cleanContainer();
    appendImagesMarkup(hits);
    refs.loadMore.classList.remove('is-hidden')
  }).catch((error) => { console.log(error) })
}

function onLoadMore() {
  apiService.fetchArticles().then( ({hits}) => {
    appendImagesMarkup(hits);
    addScrollIntoViev();
  });
}

function addScrollIntoViev() {
    refs.container.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
    });
}

function appendImagesMarkup(images) {
refs.container.insertAdjacentHTML('beforeend', imagesTpl(images))
}

function cleanContainer() {
  refs.container.innerHTML = '';
}

/* modal */

refs.container.addEventListener('click', onContainerClick)

function onContainerClick(e) {
  const imageEl = e.target;
  const isImageEl = e.target.classList.contains('gallery__image')
  if (!isImageEl) { return }
  addOpenClassOnlightbox()
  refs.lightboxImage.src = imageEl.dataset.source;
}


function addOpenClassOnlightbox() {
refs.lightbox.classList.add('is-open')
}

/* close modal function */

function removeClassFromLightbox() {
  refs.lightbox.classList.remove('is-open')
  refs.lightboxImage.src = ''
}

/* close modal with click on close modal btn */

 
refs.closeModalBtn.addEventListener('click', onCloseModalBtn)

function onCloseModalBtn() {
  removeClassFromLightbox()
}


/* close modal with click on lightbox overlay */

const lightboxOverlay = document.querySelector('.lightbox__overlay')
lightboxOverlay.addEventListener('click', onLightboxOverlay)

function onLightboxOverlay() {
  removeClassFromLightbox()
}