const seasons = {
  snowmen: [
    'https://cs8.pikabu.ru/post_img/big/2017/12/20/7/1513767713158227847.jpg',
    'https://wpapers.ru/wallpapers/Holidays/New-Year/14587/PREV_%D0%A1%D0%BD%D0%B5%D0%B3%D0%BE%D0%B2%D0%B8%D0%BA.jpg',
    'https://img5.goodfon.ru/wallpaper/nbig/4/e2/novyi-god-prazdnik-zima-rozhdestvo-novogodnie-igrushki-sne-1.jpg'
  ],
  balls: [
    'https://podarki.ru/articles/picture/91d30b95-0cf0-40e2-a1f9-a597fa91ec34.jpg',
    'https://www.eli.ru/img/goods/small/220002-282.jpg',
    'https://static.rcvostok.ru/images/product/a/9/7/a97cdf46-1f73-11e7-80d2-2c59e542282b/600x600_282da626-0f25-11ed-8f5f-00155d018f00.jpg'
  ],
  stars: [
    'https://shop-cdn1-2.vigbo.tech/shops/14741/products/3798959/images/3-e035f49fce439a41260956f555eaebb4.jpg',
    'https://basket-04.wb.ru/vol441/part44188/44188520/images/big/2.jpg',
    'https://happymodern.ru/wp-content/uploads/2015/12/Novogodnie_igrushki_71-650x650.jpg'
  ],
}


function changeImage (event) {
  const season = event.target.dataset.season;
   document.querySelector('#img1').src = seasons[season][0]
   document.querySelector('#img2').src = seasons[season][1]
   document.querySelector('#img3').src = seasons[season][2]
  //Array.from(seasonImages).forEach((image, index) => image.src = seasons[season][index]);
  // Array.from(seasonImages).forEach((image, index) => image.src = './assets/seasons/' + season + '/' + (index + 1) + '.jpg');
  
  const buttons = document.querySelector('.photo__buttons').children;
  Array.from(buttons).forEach(button => {
    if (button.dataset.season == season) {
      button.classList.add('button_color');
    } else {
      button.classList.remove('button_color');
    };
  });
  
};

function buttonClick (event) {
  if (event.target.classList.contains('photo__button')) {
    changeImage (event);
  };
};

document.querySelector('.photo__buttons').addEventListener('click', buttonClick);