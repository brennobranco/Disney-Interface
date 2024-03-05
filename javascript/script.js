const mobileMenuBtn = document.querySelector('.mobile-btn')
const movieSection = document.querySelector('#movies_section')

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active')
    movieSection.classList.toggle('active')
})

const rating = document.querySelector('#rating_number')
const body = document.querySelector('body')
const year = document.querySelector('#ano')
const classificacao = document.querySelector('#classificacao')
const movieName = document.querySelector('#logo_movie')
const descricao = document.querySelector('#descricao')

const movieID = ['568124', '508947', '150540', '862', '38757', '49013', '585', '1076364', '508943', '330457', '260513', '354912', '2062', '177572', '11544', '976573', '269149', '105864'];

const API_KEY = '0a0749c1ceed4a8f273370d5c72fb227';

function renderizeMovie () {
    movieID.forEach(async (elem) => {
        const fetchAPI = await fetch(`https://api.themoviedb.org/3/movie/${elem}?api_key=${API_KEY}&language=pt-br`).then(response => response.json());

        createMovieDiv(fetchAPI)
    })
}

async function createMovieDiv (response) {
    const image = renderizeImage(response.backdrop_path)
    const scrollSection = document.querySelector('.scroll-section')
    const movieDiv = document.createElement('div')
    movieDiv.classList.add('movie')

    movieDiv.innerHTML = HTML_Content(response)
    movieDiv.style.backgroundImage = `linear-gradient(180deg, rgba(14, 23, 47, 0.0001) 11.72%, #0E172F 100%), url('${image}')`
    scrollSection.appendChild(movieDiv)
}

function HTML_Content (response) {
    return `
    <button class="play" value="${response.id}"><img src="./assets/icon-play-button.png" alt="imagem do filme"></button>
    <p class="classificacao">${kidOrAdultVerification(response.adult)}</p>
    <p class="movie-name">${response.title}</p>
    `
}

async function renderizeHTML (elem) {
    const fetchAPI = await fetch(`https://api.themoviedb.org/3/movie/${elem}?api_key=${API_KEY}&language=pt-br`).then(response => response.json()).then(data => {
    descricao.innerHTML = data.overview
    rating.innerHTML = ratingFormater(data.vote_average.toString())
    year.innerHTML = dataFormater(data.release_date)
    classificacao.innerHTML = kidOrAdultVerification(data.adult)
    movieName.innerHTML = data.title
    body.style.backgroundImage = `linear-gradient(90.18deg, rgba(13, 22, 46, 0.7) 23.21%, rgba(13, 22, 46, 0.0001) 96.69%), url('${renderizeImage(data.backdrop_path)}')`
    });
    return fetchAPI
}

function dataFormater (elem) {
    const arr = elem.split('')
    let newData = ''

    for(i = 0; i <= 3; i++) {
        newData += arr[i]
    }

    return newData
}

function ratingFormater (elem) {
    const number = elem.split('')
    let newNumber = ''

    for(i = 0; i <= 2; i++) {
        newNumber += number[i]
    }
    if(Number(number[3]) <= 5) {
        return newNumber
    }else {
        newNumber = Number(newNumber) + 0.1
        return Number(newNumber).toFixed(1)
    }
}

function kidOrAdultVerification(elem) {
    let KidOrAdult = ''
    if(!elem) {
        KidOrAdult = 'Infantil'
    }else {
        KidOrAdult = 'Adulto'
    }

    return KidOrAdult
}
function renderizeImage(elem) {
    const image = `https://image.tmdb.org/t/p/original/${elem}`

    return image
}
renderizeMovie()
renderizeHTML(568124)

  
setTimeout(() => {
    const buttonsPlay = document.querySelectorAll('.play')

    const isCelular = detectar_mobile();

    if(isCelular) {
        buttonsPlay.forEach((e) => {
            e.style.transform = 'translateY(0px)'
            e.style.opacity = '0.7'
        })
    }

    for(i = 0; i < buttonsPlay.length; i++) {
        buttonsPlay[i].setAttribute('id', i)
    }
    const movieDiv = document.querySelectorAll('.movie')

    let divAnterior = [];

    buttonsPlay.forEach((e) => {
        e.addEventListener('click', () => {
            renderizeHTML(e.value)

            movieSection.classList.toggle('active')
            mobileMenuBtn.classList.toggle('active')

            let identificador = e.id
            divAnterior.push(identificador)

            buttonsPlay[e.id].style.opacity = '0'
            movieDiv[identificador].style.pointerEvents = 'none'
            movieDiv[identificador].style.filter = 'grayscale(1)'

            let reset = Number(divAnterior[divAnterior.length - 2])

            buttonsPlay[reset].style.opacity = '0.7'
            movieDiv[reset].style.pointerEvents = ''
            movieDiv[reset].style.filter = ''
        })
    })
}, 1500)

function detectar_mobile() { 
    if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    ){
       return true;
     }
    else {
       return false;
     }
   }

   detectar_mobile()