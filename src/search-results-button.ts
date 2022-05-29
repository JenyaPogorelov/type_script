import {renderSearchResultsBlock} from "./search-results.js";

export function renderSearchResult () {
  let button = document.getElementById('search-button');
  button.addEventListener('click', (e) => {
    e.preventDefault();
    renderSearchResultsBlock ()
  })
  console.log(button);
}
