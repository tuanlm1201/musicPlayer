const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

/*==============Đóng mở play list==============*/
const openList = document.querySelector(".open-list");
const closeList = document.querySelector(".close-list");
const listMusic = document.querySelector(".list-music");
const playList = document.querySelector(".play-list");

openList.addEventListener("click", handleOpenList);
function handleOpenList() {
  playList.style.bottom = 0 + "px";
  openList.style.display = "none";
  closeList.style.display = "flex";
}

closeList.addEventListener("click", handleCloseList);
function handleCloseList() {
  playList.style.bottom = -300 + "px";
  closeList.style.display = "none";
  openList.style.display = "flex";
}

/*========================= ChangeIcon Play =========================*/
$(".play");

/*==================================================================================*/
//Handle Music
let listSong = [
  {
    name: "Happy For You",
    author: "Lukas Graham & Vũ",
    src: "./assets/music/happyforyou.mp3",
    img: "./assets/image/happyforyou.jpg",
  },
  {
    name: "Tâm sử tuổi 30",
    author: "Trịnh Thăng Bình",
    src: "./assets/music/tamsutuoi30.mp3",
    img: "./assets/image/tamsutuoi30.jpg",
  },
  {
    name: "Stay",
    author: "The Kid LAROI & Justin Bieber",
    src: "./assets/music/stay.mp3",
    img: "./assets/image/stay.jpg",
  },
  {
    name: "Attention",
    author: "Charlie Puth",
    src: "./assets/music/attention.mp3",
    img: "./assets/image/attention.jfif",
  },
  {
    name: "Montero (Call Me By Your Name)",
    author: "Lil Nas X",
    src: "./assets/music/montero.mp3",
    img: "./assets/image/montero.jfif",
  },
  {
    name: "Peaches",
    author: "Justin Bieber, Daniel Caesar & Giveon",
    src: "./assets/music/peaches.mp3",
    img: "./assets/image/peaches.jpg",
  },
];

const nameSong = $(".name-song");
const nameAuthor = $(".name-author");
const cdThumb = $(".content-music__img");
const audio = $("#audio");
const btnPlay = $(".music-control__play");
const btnNext = $(".music-control__skip-next");
const btnPrev = $(".music-control__skip-prev");
const currentTimeSong = $(".music-control__time");
const endTimeSong = $(".music-control__time-end");
const progress = $(".progress");

const app = {
  currentIndex: 0,
  songs: listSong,
  isPlaying: false,
  render: function () {
    const htmls = this.songs.map((song,index) => {
      return `<div class="song" data-index="${index}">
          <div class="song__thumb" style="background-image: url(${song.img})"></div>
          <div class="song__body">
          <h3 class="song__title">${song.name}</h3>
          <p class="song__author">${song.author}</p>
          </div></div>`;
    });
    listMusic.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvents: function () {
    //Xử lí thumb quay
    console.log(cdThumb.style.animation);

    //Xử lí khi click Play
    btnPlay.onclick = () => {
      if (this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    //Khi bài hát đc chạy
    audio.onplay = () => {
      this.isPlaying = true;
      btnPlay.classList.add("playing");
    };

    //Khi bài hát đc dừng
    audio.onpause = () => {
      this.isPlaying = false;
      btnPlay.classList.remove("playing");
    };

    //Khi tiến độ bài hát thay đổi
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;

        currentTimeSong.innerHTML = Math.floor(audio.currentTime);
        console.log(audio.currentTime);
        endTimeSong.innerHTML = Math.floor(audio.duration);
        console.log(audio.duration);
      }
    };

    //Xử lí khi tua
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    //Xử lí nút Next
    btnNext.onclick = () => {
      this.nextSong();
      audio.play();
    };

    //Xử lí nút Prev
    btnPrev.onclick = () => {
      this.prevSong();
      audio.play();
    };

    //Xử lý khi bàn hát chạy hết
    audio.onended = function () {
      btnNext.click();
    };

    //Xử lí khi click bài hát trong Playlist
    listMusic.onclick = (e) =>{
      const songElement = e.target.closest('.song:not(.active)');

      if(e.target.closest('.song:not(.active)')){
        console.log(songElement.dataset.index)
        this.currentIndex = Number(songElement.dataset.index);
        this.loadCurrentSong();
        audio.play()
      }
    }
  },
  loadCurrentSong: function () {
    nameSong.textContent = this.currentSong.name;
    nameAuthor.textContent = this.currentSong.author;
    cdThumb.style.backgroundImage = `url('${this.currentSong.img}')`;
    audio.src = this.currentSong.src;
    if (audio.duration) {
      endTimeSong.innerHTML = Math.floor(audio.duration);
    }
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  start: function () {
    //Định nghĩa các thuộc tính cho Object
    this.defineProperties();

    //Xử lí các sự kiện
    this.handleEvents();

    //Tải thông tin bài hát đầu tiên Vào giao diện
    this.loadCurrentSong();

    //Render Playlist
    this.render();
  },
};

app.start();
