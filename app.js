const container = document.querySelector(".cards-container");
const searchBar = document.querySelector(".search-bar");
const filterBar = document.querySelector(".filterbar");

let countries = [];
filterBar.addEventListener('change', () => {
    const searchString = filterBar.value.toLowerCase();
    
    if (searchString === "") {
        displayCountries(countries); 
    } else {
        const filteredCountries = countries.filter((country) => {
            return country.region.toLowerCase().includes(searchString);
        });
        displayCountries(filteredCountries);
    }
});

searchBar.addEventListener('keyup', () => {
    const searchString = searchBar.value.toLowerCase();
    const filteredCountries = countries.filter(country => 
        country.name.toLowerCase().includes(searchString)
    );
    displayCountries(filteredCountries);
});


fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data => {
        countries = data.map(element => ({
            name: element.name.common,
            imageSrc: element.flags.png,
            population: element.population,
            region: element.region,
            capital: element.capital ? element.capital[0] : "N/A"
        }));
        displayCountries(countries); 
    })
    .catch(error => console.error('Error fetching data:', error));


function displayCountries(countryList) {
    container.innerHTML = ""; 
    countryList.forEach(country => {
        const card = document.createElement("div");
        card.classList.add("flag-card");
        card.innerHTML = `
            <div class="image_desc">
                <img src="${country.imageSrc}" alt="${country.name} flag">
            </div>
            <div class="description">
                <h3 class="name"> ${country.name}</h3>
                <p class="population">Population: ${country.population.toLocaleString()}</p>
                <p class="region">Region: ${country.region}</p>
                <p class="capital">Capital: ${country.capital}</p>
            </div>
        `;
        container.appendChild(card);
    });
}
