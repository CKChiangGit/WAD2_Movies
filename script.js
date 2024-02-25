// // https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server 
// cd C:\wamp64\www\WAD2-PROJECT 
// py -3 -m http.server 

const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const app = Vue.createApp({ 
    data() { 
        return { 
            data: '',
        };
    }, 
    // computed: {
    //     data() {
    //         alert(this.isSearch == '0')
    //         if (this.isSearch == '0') {
    //             fetch('templateResult.json')
    //                 .then((response) => response.json())
    //                 .then(function(json) {
    //                     // console.log(json.results)
    //                     showMovies(json.results)

    //                     this.isSearch = '1'
    //                     return json.results
    //                 });
    //         } else {
    //             movies = this.getMovies(SEARCH_API + this.search)
    //             return movies
    //         }
    //     } 
    // },
    methods: {
        async display() {
            // alert('displaying')
            // when just load
            const res = await fetch(API_URL) // toggle to this before submission!!!
            // const res = await fetch('templateResult.json')
            const data = await res.json()
            
            console.log(data.results)
            this.data = data.results
            return data.results
        },

        async getMovies(searchTerm) {
            // alert('getting')
            
            const res = await fetch(searchTerm);
            const data = await res.json();
        
            console.log(data.results);
            this.data = data.results
            return data.results
        },
    }
});
app.component('mypage', { 
    props: [ 'data'],
    data() {
        return {
            search: '',
            isLoaded: false
        }
    },
    
    emits: ['searching', 'empty'],
    methods: {
        emitSearch(msg) {
            // event.preventDefault()
            // alert(msg)
            this.$emit('searching', SEARCH_API + msg)
        },
        emitEmpty() {
            // alert('is empty')
            this.$emit('empty')
            isLoaded = true
        }
    },

    // <movie v-for="movie of this.data"
    //                 :title="movie['title']"
    //                 :img="movie['img']"
    //                 :title_type="movie['title_type']"
    //                 :netflix_id="movie['netflix_id']"
    //                 :synopsis="movie['synopsis']"
    //                 :rating="movie['rating']"
    //                 :year="movie['year']"
    //                 :runtime="movie['runtime']"
    //                 :imdb_id="movie['imdb_id']"
    //                 :poster="movie['poster']"
    //                 :top250="movie['top250']"
    //                 :top250tv="movie['top250tv']"
    //                 :title_date="movie['title_date']">             
    //                 </movie>
    template: `
    <header>
        <div class="logo">
            <img
            src="https://logos-download.com/wp-content/uploads/2016/03/Netflix_Logo_2014.png"
            alt="NETFLIX"
            />
            <i class="fa fa-ticket-alt"></i> Movies
        </div>
    </header>

    <div class="container-fluid" id="form" style="padding: 0">
    <div class="row p-1">
        <div class="col-2 p-0" id="searchL"></div>
        <!-- col -->
        <div class="col-8 d-flex justify-content-center" id="searchM">
        <form @submit.prevent="emitSearch(this.search)">
            <input
            type="text"
            id="search"
            class="search"
            placeholder="Search"
            v-model='search'
            />
        </form>
        </div>
        <!-- col -->
        <div class="col-2 p-0" id="searchR"></div>
        <!-- col -->
    </div>
    <!-- row -->
    </div>
    <!-- container -->

    <button class="nav-btnL" id="open_btnL">
    <i class="fas fa-bars"></i>
    </button>

    <button class="nav-btnR" id="open_btnR">
    <i class="fas fa-folder"></i>
    </button>

    <!-- search results -->
    <div class="container-fluid">
        <div class="row">
            <div class="col-1" id="resultL"></div>
            <!-- col -->
            <div class="d-flex justify-content-center col p-0" id="resultM">
                <!-- title, img, title_type, netflix_id, synopsis, rating, year, runtime, imdb_id, poster, top250, top250tv, title_date -->
                <div class="row">
                    <movie v-for="movie of this.data"
                    :title="movie['title']"
                    :img="movie['img']"
                    :title_type="movie['title_type']"
                    :netflix_id="movie['netflix_id']"
                    :synopsis="movie['overview']"
                    :rating="movie['vote_average']"
                    :year="movie['year']"
                    :runtime="movie['runtime']"
                    :imdb_id="movie['imdb_id']"
                    :poster="movie['poster_path']"
                    :top250="movie['top250']"
                    :top250tv="movie['top250tv']"
                    :title_date="movie['title_date']">             
                    </movie>
                    <div v-if="this.data == '' && !isLoaded && emitEmpty()"></div>
                </div>
                
            </div>
            <!-- col -->
            <div class="col-1" id="resultR"></div>
        </div>
    </div>
    <slot></slot>
    `,
});

var checked = false
app.component('movie', {     
    props: [ 'title', 'img', 'title_type', 'netflix_id', 'synopsis', 'rating', 'year', 'runtime', 'imdb_id', 'poster', 'top250', 'top250tv', 'title_date' ],
    methods: {
        getClassByRate(str) {
            vote = parseFloat(str)
            if (vote >= 8) {
                return 'good';
            } else if (vote >= 5) {
                return 'fine';
            }
            return 'bad';
        },
        convert(str) {
            rate = parseFloat(str).toFixed(1)
            if (rate == 0.0) {
                return 'NA'
            }
            return rate
        },
        concatURL() {
            return 'https://image.tmdb.org/t/p/original/' + this.poster
        }
    },
    template: `
    <div class="col-lg-3 col-md-4 col-sm-6 col-12">
        <div class="movie track">
            <div class="movie-info track" :data-title='title'>
                <h3 :data-title='title'>{{title}}</h3>
                <span :class="this.getClassByRate(rating)" :data-title='title'>{{this.convert(rating)}}</span>
            </div>
            <div class='movie-poster'>
                <img class='show' :src="'https://image.tmdb.org/t/p/original/' + poster" :alt="title" :data-backup="img">
                <div class="overview">
                <h4>Overview</h4>
                {{synopsis}}
            </div>
            </div>
            
            
        </div>
        <slot></slot>
    </div>
    
    `,
    mounted() {
        // // checks if any poster failed to load, use img instead 
        function showMovies() {
            // alert('checking')
            const posters = document.getElementsByClassName('show')
            count = 0
            // console.log(posters)
            for (let poster of posters) {
                // console.log(poster)
                poster.addEventListener("error", function(event) {
                    event.target.src = event.target.dataset.backup
                })
            }
            checked = true
        }
        function addToPlaylist() {
            // const adds = document.getElementsByClassName('adding')
            const movieInfo = document.getElementsByClassName('movie-info')
            // const playlist = document.getElementById('playlist')
            const tbody = document.getElementById('tbody')

            // console.log(adds)
            console.log(tbody)
            for (let plus of movieInfo) {
                console.log(plus)
                plus.addEventListener("dblclick", function(event) {
                    // alert('added')
                    
                    console.log(event.target)
                    console.log(event.target.dataset.title)
                    title = event.target.dataset.title
                    console.log(title)
                    tr = tbody.insertRow()
                    td = tr.insertCell( [index=-1] ) 
                    td.innerHTML = `
                        ${title}
                    `
                    tr.addEventListener('dblclick', function(event) {
                        event.target.remove()
                    })
                })
            }
        }

        if (!checked){
            showMovies()
            addToPlaylist()
        }

        
        // Array.from(adds).forEach((plus) => {
        //         plus.addEventListener("click", function(event) {
        //             alert('added')
        //             console.log(event.target, event)
        //             console.log(event.target.dataset.title)
        //         })
        //     }
        // );
    }
    
});
const vm = app.mount('#main'); 

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

const open_btnL = document.getElementById('open_btnL');
const open_btnR = document.getElementById('open_btnR');

const close_btnL = document.getElementById('close_btnL');
const close_btnR = document.getElementById('close_btnR');

const resultL = document.getElementById('resultL');
const resultM = document.getElementById('resultM');
const resultR = document.getElementById('resultR');

const searchL = document.getElementById('searchL');
const searchM = document.getElementById('searchM');
const searchR = document.getElementById('searchR');
const searchbar = document.getElementById('search');

const navL = document.querySelectorAll('.navL')
const navR = document.querySelectorAll('.navR')



// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     alert('searching')
//     const searchTerm = search.value;
//     alert(search.value)
//     if (searchTerm != '') {
//         alert(searchTerm)
//         // getMovies(SEARCH_API + searchTerm);
//         getMovies(searchTerm);
//         // search.value = '';
//         alert('done')
//     } else {
//         window.location.reload();
//     }
// })


// // // toggle this once API is ready
// function getMovies(searchTerm) {
//     alert('getting')
//     const options = {
//         method: 'GET',
//         url: 'https://unogs-unogs-v1.p.rapidapi.com/search/titles',
//         params: {limit: '10', order_by: 'rating_asc', title: searchTerm, type: 'movie'},
//         headers: {
//           'X-RapidAPI-Key': '33958221f5msh57d1aa6b0862db5p1c1fe5jsnee50e87acdca',
//           'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com'
//         }
//     };
//     axios.request(options).then(function (response) {
//         console.log(response.data);
//         showMovies(response.data)
//     }).catch(function (error) {
//         console.error(error);
//     });
// }

// // using templateResult when not using api
// fetch('templateResult.json')
//     .then((response) => response.json())
//     .then(function(json) {
//         // console.log(json.results)
//         showMovies(json.results)
//     });

// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navbar and offset
var navbar = document.getElementById("form");
// console.log(navbar.offsetHeight)
var header = document.getElementsByTagName("header")[0];
var sticky = navbar.offsetTop - 5;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
    // console.log(window.pageYOffset)
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
    header.classList.add("getSticky")
  } else {
    navbar.classList.remove("sticky");
    header.classList.remove("getSticky");
  }
}

// sidebtn eventlistener that makes #resultL COL-3 from col-0
function openL() {
    // alert("pressed")
    resultL.classList.remove("col-1")
    resultL.classList.add("col-3")
    
    searchL.classList.remove("col-2")
    searchL.classList.remove("col-1")
    searchL.classList.add("col-3")

    searchM.classList.remove("col-7")
    searchM.classList.remove("col-8")
    searchM.classList.add("col-9")

    searchR.classList.remove("col-2")
    searchR.classList.remove("col-5")
    searchR.classList.add("col-1")
    
    searchbar.style.width = '80%'
    navL.forEach(nav_el => nav_el.classList.add('visible'))
}
function closeL() {
    // alert('close')
    resultL.classList.remove("col-3")
    resultL.classList.add("col-1")
    
    searchL.classList.remove("col-3")
    searchL.classList.add("col-2")

    searchM.classList.remove("col-9")
    searchM.classList.add("col-8")

    searchR.classList.remove("col-1")
    searchR.classList.add("col-2")

    searchbar.style.width = '100%'

    navL.forEach(nav_el => nav_el.classList.remove('visible'))
}
function openR() {
    // alert('open folder')
    resultR.classList.remove("col-1")
    resultR.classList.add("col-5")

    searchL.classList.remove("col-2")
    searchL.classList.remove("col-3")
    searchL.classList.add("col-1")

    searchM.classList.remove("col-8")
    searchM.classList.remove("col-9")
    searchM.classList.add("col-7")

    searchR.classList.remove("col-2")
    searchR.classList.remove("col-0")
    searchR.classList.add("col-5")

    searchbar.style.width = '80%'
    navR.forEach(nav_el => nav_el.classList.add('visible'))
}
function closeR() {
    // alert('close')
    resultR.classList.remove("col-3")
    resultR.classList.add("col-1")

    searchL.classList.remove("col-1")
    searchL.classList.add("col-2")

    searchR.classList.remove("col-5")
    searchR.classList.add("col-2")

    searchM.classList.add("col-8")
    searchM.classList.remove("col-7")

    searchbar.style.width = '100%'

    navR.forEach(nav_el => nav_el.classList.remove('visible'))
}

open_btnL.addEventListener('click', function() {
    closeR()
    openL()
})
close_btnL.addEventListener('click', function() {
    closeR()
    closeL()
})
open_btnR.addEventListener('click', function() {
    closeL()
    openR()
})
close_btnR.addEventListener('click', function() {
    closeL()
    closeR()
})

function templateMsg(index) {

    
    if (index==0){
    document.getElementsByClassName("form-control")[0].value = 
    "    \u058D \u058D \u058D \u058D Movie Night Out! \u058D \u058D \u058D \u058D \n-------------------------\uD83D\uDE00 \uD83D\uDE00 \uD83D\uDE00----------------------\n    Join me for a Netflix movie binge!\n    Time: \n    Venue -\n    1.\n    2.\n    3.\n            \u0700\u0700\u0700\u0700\u0700\u0700 See you there \u0700\u0700\u0700\u0700\u0700\u0700";
    }
    console.log(document.getElementsByClassName("form-control"))
    if (index==1){
    document.getElementsByClassName("form-control")[0].value = 
    "\u0C0B\u0C0B\u0C0B\u0C0B Heres your Movie Night ticket \u0C0B\u0C0B\u0C0B\u0C0B\n    Join me for a Netflix movie binge!\n    Time - \n    Venue - \n    1.\n    2.\n    3.\n - ADMISSION FOR ONE\u0C34\u0C34\u0C34\u0C34\u0C34\u0C34\u0C34";
    }
    if (index==2){
    document.getElementsByClassName("form-control")[0].value = 
    "\u0C5A\u0C5A\u0C5A\u0C5A\u0C5A\u0C5A\u0C5A\u0C5A\u0C5A\u0C5A\u0C5A\u0C5A\u0C5A\u0C5A\u0C5A\u0C5A\u0C5A\u0C5A\u0C5A\u0C5A\u0C5A\u0C5A\n         \u0C3C\u0C3C\u0C3C\u0C3C Movie Night \u0C3C\u0C3C\u0C3C\u0C3C\n         \u1f52 \u1f52 \u1f52 Its time to pop the corn! \u1f52 \u1f52 \u1f52\n    Join me for a Netflix movie binge!\n    Time: \n    Venue -\n    1.\n    2.\n    3.\n    ** Remember to bring some snacks!! \n \u0C5A\u0C5A\u0C5A\u0C5A\u0C5A\u0C5A\u0C5A\u0C5A\u0C5A\u0C5A\u0C5A\u0C5A\u0C5A\u0C5A\u0C5A\u0C5A\u0C5A\u0C5A\u0C5A\u0C5A\u0C5A\u0C5A";
    }
  }