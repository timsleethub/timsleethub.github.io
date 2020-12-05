import centralEvents from "./centralEvents.js";
import Genres from "./Genres.js";

function renderBook(book) {
  return `<div class="book" data-isbn="${book.isbn}">
    <div class="book__poster">
    <img class ="poster" src="${book.poster}" alt="">
    </div>
    <div class="book__title">${book.title}</div>
    <div class="book__author">${book.author}</div>
    <div class="book__price-usd">${book.priceUsd}</div>
    <div class="book__buy-button">Buy</div>
  </div>`
}


function renderBookList(bookList) {
  const bookListItemsStr = bookList.map(renderBook).join('');
  return `<div class="booklist">
    ${bookListItemsStr}
  </div>`
}


function renderCart(cartBooks) {
  const cartBooksItemsStr = cartBooks.map(renderBook).join('');
  return `<div class="cart">
    Cart
    ${cartBooksItemsStr}
  </div>`
}

/**
 *
 * @param cartGroup {
 *     isbn: isbn,
 *     book: isbnBooks[0],
 *     count: isbnBooks.length,
 *     subtotal: subtotal,
 *   }
 * @returns {string}
 */
function renderCartGroup(cartGroup) {
  return `<div class="cart-items__tab">
    title: ${cartGroup.book.title}
    <br>
    count: ${cartGroup.count}
    <br>
    subtotal: ${cartGroup.subtotal}
  </div>`
}


function cartGroups(cartGroups) {
  return `
  <div class="cart-items">
      ${cartGroups.map(renderCartGroup).join('\n')}
  </div>
  `
}

function toggleCart () {
  let checkbox = document.getElementById('expand-cart');
  return checkbox.checked = !checkbox.checked;
}
window.toggleCart = toggleCart;

/**
 * @param {object} cartView
 * @param {Number}  cartView.totalAmount
 * @param {Array<ISBN>}  cartView.cartGroups
 * @returns {string}
 */
function renderNewCart(cartView) {
  if (!cartView) {
    return `<div class="control-wrapper">
        <input type="checkbox" id="expand-cart"/>
          <div class="cart">
          Cart is empty, but you can add some stuff :)
          </div>
      </div>`
  }
    return `<div class="control-wrapper">
          <input onclick="toggleCart()" type="checkbox" id="expand-cart"/>
          <div class="cart">
          <p onclick="toggleCart()" class="expanding-button">Click to expand</p>

          <div class="cart__items">
            ${cartGroups(cartView.cartGroups)}
          </div>

          Total books: ${cartView.cartGroups.length}
          <br>
          Total price: ${cartView.totalAmount}
        </div>
      </div>`
}


function onBookClick(clickEvent) {
  const newIsbn = clickEvent.currentTarget.dataset.isbn;
  centralEvents.dispatchEvent({
    type: "bookSelected",
    isbn: newIsbn,
  })
}


function listenBook(elem) {
  elem.addEventListener("click", onBookClick);
}


function listenBooksEvents(nodeList) {
  const nodeArr = Array.from(nodeList);
  nodeArr.forEach(listenBook);
}


function renderGenres(genres) {
  return `<div class="genres">
    <div class="genres__logo">Genres</div>
    ${Object.keys(genres).map((genreId) =>
    `<div class="genres__item" data-genre-id="${genreId}">${genres[genreId]}</div>`)
    .join('')}
    <div class="genres__item" data-genre-id="none">Reset genre</div>
  </div>`
}


function onGenreClick(clickEvent) {
  const selectedGenre = clickEvent.currentTarget.dataset.genreId;
  centralEvents.dispatchEvent({
    type: "genreSelected",
    genreId: selectedGenre === 'none' ? null : selectedGenre,
  })
}


function listenGenre(elem) {
  elem.addEventListener("click", onGenreClick);
}


function listenGenresEvents(nodeList) {
  const nodeArr = Array.from(nodeList);
  nodeArr.forEach(listenGenre);
}


function createHeader() {
  return `<div class="header">
    <div class="header__logo">
      <div class="logo">Bookstore</div>
    </div>
  </div>`
}


function createFooter() {
  return `<div class="footer">
    <div class="footer__logo">Bookstore, 2020</div>
  </div>`
}


function bodyWrapper(bookList, cart, genres) {
  return `<div class="bookstore">
    <div class="bookstore__booklist">${bookList}</div>
    <div class="bookstore__sidebar">
      <div class="sidebar">
        <div class="sidebar__cart">${cart}</div>
        <div class="sidebar__genres">${genres}</div>
      </div>
    </div>
  </div>`
}


function renderApp(state) {
  const appRoot = document.querySelector('.bookstore-root');
  const bookListHTML = renderBookList(state.books);
  const cartHTML = renderNewCart(state.cartView);
  const genresHTML = renderGenres(Genres);
  appRoot.innerHTML =
    createHeader()
    + bodyWrapper(bookListHTML, cartHTML, genresHTML)
    + createFooter();
}

export default function startUI(state) {
  renderApp(state);
  listenBooksEvents(document.querySelectorAll('.book'));
  listenGenresEvents(document.querySelectorAll('.genres__item'))
}


