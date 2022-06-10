export function dateToUnixStamp(date: Date): number {
  return +date.getTime() / 1000
}

export function addListener() {
  const blockResult = document.getElementsByClassName('result');
  for (let i = 0; blockResult.length > i; i++) {
    blockResult[i].querySelector('button')
      .addEventListener('click', (event) => {
        const  blockFavorite = blockResult[i].querySelector('div.favorites');
        if (!blockFavorite.classList.contains('active')) {
          localStorage.setItem('favoriteItems', `${+localStorage.getItem('favoriteItems') + 1}`)
          console.log(localStorage.getItem('favoriteItems'));
        } else {
          localStorage.setItem('favoriteItems', `${+localStorage.getItem('favoriteItems') - 1}`)
          console.log(localStorage.getItem('favoriteItems'));
        }
        blockFavorite.classList.toggle('active');
        // localStorage.setItem('favoriteItems', `${+localStorage.getItem('favoriteItems') + 1}`)
        // console.log(localStorage.getItem('favoriteItems'));
        console.log(i);
    })
  }
  // console.log(blockResult[0]);
  // const blockResult = document.querySelector('ul');
  // const buttonFavorite = blockResult.getElementsByTagName('button');
  // for (let i = 0; buttonFavorite.length > i; i++) {
  //   buttonFavorite[i].addEventListener('click', (event) => {
  //     console.log(blockResult.);
  //     console.log(i);
  //   })
  // }
}
