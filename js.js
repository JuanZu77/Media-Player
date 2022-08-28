// PRIMER EP 
const songList = [
    {
        title: "Super Yo", file: "1 - Superyo.mp3", cover: "El Mal de JOB.jpg" },
    {
        title: "Burofax", file: "2 - Burofax.mp3", cover: "El Mal de JOB.jpg" },
    {
        title: "EL Mal de Job", file: "3 - EL Mal De Job.mp3", cover: "El Mal de JOB.jpg"},
    {
        title: "Adiós", file: "4 - Adiós.mp3", cover: "El Mal de JOB.jpg" },
 //312 SESSIONS
        {
            title: "505", file: "505.mp3", cover: "El Mal de JOB_312sessions.jpg" },
        {
            title: "Bad Reputation", file: "Bad Reputation.mp3", cover: "El Mal de JOB_312sessions.jpg" },
        {
            title: "Even Fallen In Love", file: "Ever Fallen In Love.mp3", cover: "El Mal de JOB_312sessions.jpg"},
        {
            title: "First Time", file: "Fisrt Time.mp3", cover: "El Mal de JOB_312sessions.jpg" },

            {
                title: "Morning After", file: "Morning After.mp3", cover: "El Mal de JOB_312sessions.jpg" },
            {
                title: "Life's A Gas", file: "Life's A Gas.mp3", cover: "El Mal de JOB_312sessions.jpg" },
            {
                title: "Something Is Squeezing My Skull", file: "Something Is Squeezing My Skull.mp3", cover: "El Mal de JOB_312sessions.jpg"},
            {
                title: "Teenage Kicks", file: "Teenage Kicks.mp3", cover: "El Mal de JOB_312sessions.jpg" },
]




/*Elementos del DOM -------------------------------------------------------------------------*/
const songs = document.getElementById("songs") 
const audio = document.getElementById("audio")
const cover = document.getElementById("cover")
const title = document.getElementById("title")
const play = document.getElementById("play")
const prev = document.getElementById("prev")
const next = document.getElementById("next")
const progress = document.getElementById("progress") 
const progressContainer = document.getElementById("progress-container") 

/*-------------- CARGAR CANCIONES - MOSTRAR LISTADO ----------------------------------------*/
function loadSongs(){
    songList.forEach ((song, index) => {             
        /*Crear li*/
        const li=document.createElement("li")
        /*Crear a*/
        const link = document.createElement("a")
        /*Hidratar a (crear href)*/
        link.textContent = song.title
        link.href = "#"
        /*CAPTURAR CLICK*/ 
        link.addEventListener("click", ()=> loadSong(index)) 
        /*Añadir li*/
        li.appendChild(link) 
        /*Añadir li a ul */
        songs.appendChild(li)
    })
}

/*---------- CANCION ACTUAL ---------------------------------------------------------*/
let actualSong = null 

//CARGAR cancion SELECCINADA
function loadSong(songIndex){
     
    if (songIndex!==actualSong){ 
       
        changeActiveClass(actualSong, songIndex)
        actualSong=songIndex

        audio.src="./audio/" + songList[songIndex].file 
        audio.play()

        changeCover(songIndex)
        changeTitle(songIndex)
        playSong() 
    }
}

    // funcion cambiar imagen
    function changeCover(songIndex){
    cover.src="./img/" + songList[songIndex].cover
    }
   //funcion titulo
    function changeTitle(songIndex){
    title.innerText = songList[songIndex].title
    }

    //Actualizar Controles
    function updateControls(){
        if(audio.paused){ 
            play.classList.remove("fa-pause")
            play.classList.add("fa-play")
        }else{
            play.classList.add("fa-pause") 
            play.classList.remove("fa-play")
        }
    }

//Eventos CLick PAUSA y REPRODUCIR 
    play.addEventListener("click", ()=>{
        if (audio.paused){
            playSong()
        }else{
         pauseSong()
        }
    })
    //Reproducir
    function playSong() {
        if (actualSong !== null) {
            audio.play() 
            updateControls()
        }
    }
    //Pausar
    function pauseSong() {
        audio.pause() 
        updateControls()
    }

    
// Cambiar clase ACTIVA 
function changeActiveClass(lastIndex, newIndex) {
    const links = document.querySelectorAll("a")
    if (lastIndex !== null) {
        links[lastIndex].classList.remove("active")
    }
    links[newIndex].classList.add("active")
}

//Evento SIGUIENTE y ANTERIOR
    next.addEventListener("click", () => nextSong())
    prev.addEventListener("click", () => prevSong())
   
    //Boton ANTERIOR
    function prevSong() {
        if (actualSong > 0) {
            loadSong(actualSong - 1) 
        } else {
            loadSong(songList.length - 1)
        }
    }
    //Boton SIGUENTE
    function nextSong() {
    if (actualSong < songList.length -1) {
        loadSong(actualSong + 1) 
    } else {
        loadSong(0)
    }
}

/* ---------- BARRA DE PROGRESO ------------------------------------------------------*/
     //Eventos
     progressContainer.addEventListener("click", setProgress)
     audio.addEventListener("timeupdate", updateProgress)

    //Actualizar Barra
    function updateProgress(event) {
        const {duration, currentTime} = event.srcElement 
        const percent = (currentTime / duration) * 100 
        progress.style.width = percent + "%"  
    }

   // Hacer la Barra PROGRESO CLICABLE
    function setProgress(event) {
    const totalWidth = this.offsetWidth  
    const progressWidth = event.offsetX 
    const current = (progressWidth / totalWidth) * audio.duration 
    audio.currentTime = current  
   }

/* ----------------- Canción Sig al finalizar ----------------------------*/
audio.addEventListener("ended", () => nextSong())

/* ----------------- GO!--------------------------------------------------------------- */ 
loadSongs();