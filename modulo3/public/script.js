const pokemonContainer = document.getElementById("pokemon-container");
const searchInput = document.getElementById("search-input");

async function fetchPokemonInfo(name) {
  try {
    const response = await fetch(`/api/pokemon/${name}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener información del Pokémon', error);
    return null;
  }
}

async function createPokemonCard(pokemon) {
  const card = document.createElement('div');
  card.classList.add('card');

  const pokemonInfo = await fetchPokemonInfo(pokemon.name);
  if (pokemonInfo) {
    card.innerHTML = `
      <h3>${pokemon.name}</h3>
      <p>Type: ${pokemonInfo.types[0].type.name}</p>
    `;
  } else {
    card.innerHTML = `
      <h3>${pokemon.name}</h3>
      <p>Type: Unknown</p>
    `;
  }

  pokemonContainer.appendChild(card);
}


