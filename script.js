const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photosArray = [];
let numberOfLoaded = 0;
let isValid = false;
function imageLoaded(){
    console.log('image loaded!')
    let totalImage = photosArray.length;
    numberOfLoaded++;
    console.log(numberOfLoaded)
    if(numberOfLoaded%totalImage == 0 ){
        console.log(loader.style.display)
        isValid = true;
        loader.setAttribute('hidden',true);
    }
    console.log(isValid)
}

function displayPhotos(){
    photosArray.forEach((photo)=>{
        const anchorItem = document.createElement('a');
        anchorItem.setAttribute('href', photo.links.html);
        anchorItem.setAttribute('target', '_blank');
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);
        img.addEventListener('load',imageLoaded); 
        anchorItem.appendChild(img);
        imageContainer.appendChild(anchorItem);
    });
}
// API 
const count = 5;
const apiKey = 'hDxMsLJCCRJrRX_SnIkR6DgOKKdPU5pj5yJVJsa8usU';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();
    } catch (error) {
        
    }
}
document.addEventListener('scroll', ()=>{
    // console.log(window.innerHeight);
    // console.log(window.scrollY);
    // console.log(window.innerHeight + window.scrollY)
    // console.log(document.body.offsetHeight);
    if(window.innerHeight + window.scrollY > document.body.offsetHeight && isValid){
        isValid = false;
        getPhotos();
    }
});

// On Load
getPhotos();