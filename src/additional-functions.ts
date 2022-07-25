import {renderToast, setLocalStorage} from "./lib.js";
import {calculateUserInfo} from "./user-info.js";
import {renderUserBlock} from "./user.js";
import {renderSearchFormBlock} from "./search-form.js";

export function timeOut(action: string) {
  if (action === 'run') {
    const timerID = setTimeout(() => {
      setTimeout(() => {
        let searchButton = document.getElementById('search-button');
        if (searchButton != null) {
          searchButton.setAttribute("disabled", "disabled")
        }
        renderToast(
          {text: `Время выбора истекло. Обновите данные поиска`, type: 'timeOut'},
          {
            name: 'Обновить', handler: () => {
              location.reload();
            }
          }
        )
      }, 1000)

    }, 50000)
    setLocalStorage('add', 'timer', timerID)
  } else if (action === 'stop') {
    console.log('Вроде должен был остановиться таймер')
    const timerID = setLocalStorage('get', 'timer')
    clearTimeout(+timerID)
  }
}

export function dateToUnixStamp(date: Date): number {
  return +date.getTime() / 1000
}

export function addListener() {
  let favoriteItems = localStorage.getItem('favoriteItems')
  let stor: object[];
  if (favoriteItems != null) {
    stor = JSON.parse(favoriteItems);
  }
  const blockResult = document.getElementsByClassName('result');
  for (let i = 0; blockResult.length > i; i++) {
    let resultContainer = blockResult[i].querySelector('.result-container')
    let name = blockResult[i].querySelector('.name');
    let resultImg = blockResult[i].querySelector('.result-img');
    let favorites = blockResult[i].querySelector('.favorites');
    if (resultContainer != null && name != null && resultImg != null && favorites != null) {
      const buttonForm = favorites;
      const favID: string = resultContainer.id;
      const favName: string = name.innerHTML;
      const favURL: string = resultImg['src'];
      const favoriteInfo: object = {id: favID, name: favName, url: favURL};
      buttonForm
        .addEventListener('click', (event) => {
          const blockFavorite = blockResult[i].querySelector('div.favorites');
          if (blockFavorite != null) {
            if (!blockFavorite.classList.contains('active')) {
              setLocalStorage('increment', 'user');
              stor.push(favoriteInfo)
            } else {
              setLocalStorage('decrement', 'user');
              stor = stor.filter(item => item['id'] !== favID);
            }
            blockFavorite.classList.toggle('active');
            setLocalStorage('add', 'favoriteItems', stor)
            const userInfo = calculateUserInfo()
            if (userInfo != null) {
              renderUserBlock(userInfo.user.userName, userInfo.user.avatarUrl, userInfo.favoriteItemsAmount);
            }
          }

        })
    }

  }
}


