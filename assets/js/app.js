import arrayMusic from "./listMusic.js";

const openList = document.querySelector('.open-list');
const closeList = document.querySelector('.close-list');
const listMusic = document.querySelector('.list-music');
const playList = document.querySelector('.play-list');

openList.addEventListener('click', handleOpenList);
function handleOpenList() {
    playList.style.bottom = 0 + 'px';
    openList.style.display = 'none';
    closeList.style.display = 'flex';
}

closeList.addEventListener('click', handleCloseList);
function handleCloseList() {
    playList.style.bottom = - 300 + 'px';
    closeList.style.display = 'none';
    openList.style.display = 'flex';
}
/*==================================================================================*/
//Handle Music

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = {
    songs: arrayMusic,
    render: function(){
        const htmls = this.songs.map(song =>{
            return `
            <div class="song">
                <div class="song__thumb" style="background-image: url(${song.img})"></div>
                <div class="song__body">
                  <h3 class="song__title">${song.name}</h3>
                  <p class="song__author">${song.author}</p>
                </div>
              </div>
            `;
        })

        listMusic.innerHTML = htmls;
    },
    start: function(){
        this.render()
    }
}
app.start();
