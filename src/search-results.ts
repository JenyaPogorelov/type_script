import {renderBlock, setLocalStorage} from './lib.js'
import {Place, SearchFormData} from "./interfaces.js";
import {addListener} from "./additional-functions.js";
import {booking} from "./boocking.js";

export function renderSearchStubBlock() {
  renderBlock(
    'search-results-block',
    `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  )
}

export function renderEmptyOrErrorSearchBlock(reasonMessage) {
  renderBlock(
    'search-results-block',
    `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `
  )
}

export function SearchFormBlock(date: Place[]) {
  if (date.length === 0) {
    renderEmptyOrErrorSearchBlock('Ничего не найдено');
  } else {
    const isBlock = document.querySelector('.results-list');
    console.log(date);
    // console.log(test);
    let resultsBlocks: string = isBlock ? isBlock.innerHTML : '';
    date.forEach(block => {
      // console.log(block.id)
      resultsBlocks += `
      <li class="result" >
        <div class="result-container" id="${block.id}">
          <div class="result-img-container">
            <div ${setLocalStorage('find', 'favoriteItems', block.id)? 'class="favorites active"' : 'class="favorites"'}></div>
            <img class="result-img" src="${block.image ? block.image : block.photos[0]}" alt="">
          </div>	
          <div class="result-info">
            <div class="result-info--header">
              <p class="name">${block.name ? block.name : block.title}</p>
              <p class="price">${block.price ? block.price : block.totalPrice}&#8381;</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i>${block.remoteness}</div>
            <div class="result-info--descr">${block.description ? block.description : block.details}</div>
            <div class="result-info--footer">
              <div>
                <button name="${block.id}">Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>`
    })
    renderSearchResultsBlock(resultsBlocks);
  }
}

export function renderSearchResultsBlock(resultsBlocks: string) {
  renderBlock(
    'search-results-block',
    `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select>
                <option selected="">Сначала дешёвые</option>
                <option selected="">Сначала дорогие</option>
                <option>Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul class="results-list">
        ${resultsBlocks}
    </ul>
    `
  )
  addListener();
  booking ();
}
