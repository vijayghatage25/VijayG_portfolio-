/* =========================
   VARIABLES
========================= */

let images = [];
let current = 0;


/* =========================
   LOAD CREDITS
========================= */

fetch("/api/credits")
.then(res => res.json())
.then(data => {

    const container = document.getElementById("creditsContainer");

    if (!container) {
        console.error("creditsContainer not found.");
        return;
    }

    container.innerHTML = "";

    images = data;

    data.forEach((item, index) => {

        const title = item.title || "Untitled";

        container.innerHTML += `

        <div class="featured-card" onclick="openImage(${index})">

            <img
                src="${item.image}"
                alt="${title}"
                loading="lazy"
            >

            <div class="featured-overlay">

                <h3>${title}</h3>

            </div>

        </div>

        `;

    });

})
.catch(error => {

    console.error(error);

});


/* =========================
   CREATE MODAL
========================= */

const modal = document.createElement("div");

modal.className = "gallery-modal";

modal.innerHTML = `

<span class="close-btn">&times;</span>

<button class="nav-btn prev-btn">&#10094;</button>

<button class="nav-btn next-btn">&#10095;</button>

<div class="gallery-center">

    <img class="gallery-image">

</div>

`;

document.body.appendChild(modal);


/* =========================
   ELEMENTS
========================= */

const modalImg = modal.querySelector(".gallery-image");
const closeBtn = modal.querySelector(".close-btn");
const prevBtn = modal.querySelector(".prev-btn");
const nextBtn = modal.querySelector(".next-btn");


/* =========================
   UPDATE IMAGE
========================= */

function updateImage(){

    if(images.length===0) return;

    modalImg.src = images[current].image;

}


/* =========================
   OPEN IMAGE
========================= */

function openImage(index){

    current = index;

    modal.style.display = "flex";

    updateImage();

}


/* =========================
   CLOSE
========================= */

closeBtn.addEventListener("click",()=>{

    modal.style.display="none";

});


/* =========================
   NEXT
========================= */

nextBtn.addEventListener("click",(e)=>{

    e.stopPropagation();

    current++;

    if(current>=images.length){

        current=0;

    }

    updateImage();

});


/* =========================
   PREVIOUS
========================= */

prevBtn.addEventListener("click",(e)=>{

    e.stopPropagation();

    current--;

    if(current<0){

        current=images.length-1;

    }

    updateImage();

});


/* =========================
   CLICK OUTSIDE
========================= */

modal.addEventListener("click",(e)=>{

    if(e.target===modal){

        modal.style.display="none";

    }

});


/* =========================
   KEYBOARD
========================= */

document.addEventListener("keydown",(e)=>{

    if(modal.style.display!=="flex") return;

    if(e.key==="Escape"){

        modal.style.display="none";

    }

    if(e.key==="ArrowRight"){

        nextBtn.click();

    }

    if(e.key==="ArrowLeft"){

        prevBtn.click();

    }

});