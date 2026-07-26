fetch('/api/environment')

.then(response => response.json())

.then(data => {

    const container =
    document.getElementById('environmentContainer');

    container.innerHTML = "";

    data.forEach(env => {

        container.innerHTML += `

        <div class="featured-card"
             onclick="openGallery('${env.title}')">

            <img src="${env.image}" alt="${env.title}">

            <div class="featured-overlay">

                <h3>${env.title}</h3>

            </div>

        </div>

        `;
    });

});


/* =========================
   CREATE MODAL
========================= */

const modal = document.createElement('div');

modal.className = 'gallery-modal';

modal.innerHTML = `

    <span class="close-btn">&times;</span>

    <button class="nav-btn prev-btn">&#10094;</button>

    <button class="nav-btn next-btn">&#10095;</button>

    <div class="gallery-center">

        <img class="gallery-image">

    </div>

    <div class="gallery-ui">

        <div class="gallery-counter">1 / 1</div>

        <div class="gallery-help">

            Scroll = Zoom • Hold Left Click = Pan

        </div>

    </div>

`;

document.body.appendChild(modal);


/* =========================
   ELEMENTS
========================= */

const modalImg = modal.querySelector('.gallery-image');

const closeBtn = modal.querySelector('.close-btn');

const prevBtn = modal.querySelector('.prev-btn');

const nextBtn = modal.querySelector('.next-btn');

const counter = modal.querySelector('.gallery-counter');


/* =========================
   VARIABLES
========================= */

let currentImages = [];

let currentIndex = 0;

let zoomLevel = 1;

let isDragging = false;

let startX = 0;

let startY = 0;

let translateX = 0;

let translateY = 0;


/* =========================
   UPDATE TRANSFORM
========================= */

function updateTransform(){

    modalImg.style.transform =

    `translate(${translateX}px, ${translateY}px)
     scale(${zoomLevel})`;
}


/* =========================
   RESET VIEW
========================= */

function resetView(){

    zoomLevel = 1;

    translateX = 0;

    translateY = 0;

    updateTransform();
}


/* =========================
   UPDATE IMAGE
========================= */

function updateImage(){

    modalImg.src = currentImages[currentIndex];

    counter.innerHTML =

    `${currentIndex + 1} / ${currentImages.length}`;

    resetView();
}


/* =========================
   OPEN GALLERY
========================= */

function openGallery(folder){

    fetch(`/api/environment-gallery/${folder}`)

    .then(res => res.json())

    .then(images => {

        currentImages = images;

        currentIndex = 0;

        modal.style.display = 'flex';

        updateImage();

    });

}


/* =========================
   CLOSE
========================= */

closeBtn.onclick = () => {

    modal.style.display = 'none';
};


/* =========================
   NEXT
========================= */

nextBtn.onclick = (e) => {

    e.stopPropagation();

    currentIndex++;

    if(currentIndex >= currentImages.length){

        currentIndex = 0;
    }

    updateImage();
};


/* =========================
   PREVIOUS
========================= */

prevBtn.onclick = (e) => {

    e.stopPropagation();

    currentIndex--;

    if(currentIndex < 0){

        currentIndex = currentImages.length - 1;
    }

    updateImage();
};


/* =========================
   CLOSE OUTSIDE
========================= */

modal.addEventListener('click', (e) => {

    if(e.target === modal){

        modal.style.display = 'none';
    }
});


/* =========================
   CURSOR ZOOM
========================= */

modalImg.addEventListener('wheel', (e) => {

    e.preventDefault();

    const rect = modalImg.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;

    const mouseY = e.clientY - rect.top;

    const zoomSpeed = 0.15;

    let oldZoom = zoomLevel;

    if(e.deltaY < 0){

        zoomLevel += zoomSpeed;

    }else{

        zoomLevel -= zoomSpeed;
    }

    if(zoomLevel < 1){

        zoomLevel = 1;

        translateX = 0;

        translateY = 0;
    }

    if(zoomLevel > 7){

        zoomLevel = 7;
    }

    const scale = zoomLevel / oldZoom;

    translateX -=
    (mouseX - rect.width / 2) * (scale - 1);

    translateY -=
    (mouseY - rect.height / 2) * (scale - 1);

    updateTransform();

});


/* =========================
   HOLD PAN
========================= */

modalImg.addEventListener('mousedown', (e) => {

    if(zoomLevel <= 1) return;

    isDragging = true;

    startX = e.clientX - translateX;

    startY = e.clientY - translateY;

    modalImg.style.cursor = 'grabbing';

    e.preventDefault();
});


window.addEventListener('mousemove', (e) => {

    if(!isDragging) return;

    translateX = e.clientX - startX;

    translateY = e.clientY - startY;

    updateTransform();
});


window.addEventListener('mouseup', () => {

    isDragging = false;

    modalImg.style.cursor = 'grab';
});


/* =========================
   DOUBLE CLICK RESET
========================= */

modalImg.addEventListener('dblclick', () => {

    resetView();
});


/* =========================
   KEYBOARD
========================= */

document.addEventListener('keydown', (e) => {

    if(modal.style.display !== 'flex') return;

    if(e.key === 'Escape'){

        modal.style.display = 'none';
    }

    if(e.key === 'ArrowRight'){

        nextBtn.click();
    }

    if(e.key === 'ArrowLeft'){

        prevBtn.click();
    }
});