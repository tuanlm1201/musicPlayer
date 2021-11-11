const openList = document.querySelector('.open-list');
const listMusic = document.querySelector('.list-music');
const playList = document.querySelector('.play-list');

openList.addEventListener('click', handleOpenList);

function handleOpenList() {
    console.log(listMusic);
    playList.style.bottom = 0 + 'px';
}