fetch('/api/scripts')
.then(response => response.json())
.then(data => {

    const container = document.getElementById('scriptsContainer');

    container.innerHTML = "";

    data.forEach(script => {

        container.innerHTML += `

        <div class="featured-card"
             onclick="window.open('${script.youtube}','_blank')">

            <img src="${script.thumbnail}"
                 alt="${script.title}">

            <div class="featured-overlay">

                <h3>${script.title}</h3>

            </div>

        </div>

        `;

    });

});