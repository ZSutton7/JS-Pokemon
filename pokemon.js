// Define variables for the HTML elements we want to update
const pokemonList = document.getElementById('pokemon-list');
const pokemonName = document.getElementById('pokemon-name');
const pokemonType = document.getElementById('pokemon-type');
const pokemonId = document.getElementById('pokemon-id');
const pokemonImage = document.getElementById('pokemon-image');

// Fetch the list of Pokemon from the PokeAPI
fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(response => response.json())
    .then(data => {
        // Loop through the list of Pokemon and add each one to the list
        for (const pokemon of data.results) {
            const listItem = document.createElement('li');
            listItem.textContent = pokemon.name;
            pokemonList.appendChild(listItem);
            
            // Add event listener to each list item that fetches and displays details for that Pokemon
            listItem.addEventListener('click', () => {
                fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                    .then(response => response.json())
                    .then(pokemonData => {
                        pokemonName.textContent = `Name: ${pokemonData.name}`;
                        pokemonType.textContent = `Type: ${pokemonData.types.map(type => type.type.name).join(', ')}`;
                        pokemonId.textContent = `ID: ${pokemonData.id}`;
                        pokemonImage.src = pokemonData.sprites.front_default;
                    });
            });
        }
    })
    .catch(error => console.error(error));