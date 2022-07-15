import {renderToast, setLocalStorage} from "./lib.js";
import {calculateUserInfo} from "./user-info.js";
import {renderUserBlock} from "./user.js";
import {renderSearchFormBlock} from "./search-form.js";

export function timeOut(action) {
  if (action === 'run') {
    const timerID = setTimeout(() => {
      setTimeout(() => {
        document.getElementById('search-button').setAttribute("disabled", "disabled")
        renderToast(
          {text: `Время выбора истекло. Обновите данные поиска`, type: 'timeOut'},
          {name: 'Обновить', handler: () => {location.reload();}}
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
  let stor: object[] = JSON.parse(localStorage.getItem('favoriteItems'));
  const blockResult = document.getElementsByClassName('result');
  for (let i = 0; blockResult.length > i; i++) {
    const buttonForm = blockResult[i].querySelector('.favorites');
    const favID: string = blockResult[i].querySelector('.result-container').id;
    const favName: string = blockResult[i].querySelector('.name').innerHTML;
    const favURL: string = blockResult[i].querySelector('.result-img')['src'];
    const favoriteInfo: object = {id: favID, name: favName, url: favURL};
    buttonForm
      .addEventListener('click', (event) => {
        const blockFavorite = blockResult[i].querySelector('div.favorites');
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
        renderUserBlock(userInfo.user.userName, userInfo.user.avatarUrl, userInfo.favoriteItemsAmount);
      })
  }
}


