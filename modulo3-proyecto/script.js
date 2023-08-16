const aguaButton = document.getElementById("aguaButton");
const electricoButton = document.getElementById("electricoButton");
const fuegoButton = document.getElementById("aguaButton");
const hadaButton = document.getElementById("hadaButton");
const plantaButton = document.getElementById("plantaButton");
const rocaButton = document.getElementById("rocaButton");
const tierraButton = document.getElementById("tierraButton");
const psiquicoButton = document.getElementById("psiquicoButton");


const pokemonCardsContainer = document.getElementById("pokemonCards");
const searchInput = document.getElementById('pokemon'); // Corregido
const searchPokemonForm = document.getElementById('form'); // Corregido


/*MOSTRAR POKEMONS DESDE EL INICIO*/

fetch("https://pokeapi.co/api/v2/pokemon")
  .then(response => response.json())
  .then(data => {
    const results = data.results;

    results.forEach(pokemonResult => {
      fetch(pokemonResult.url)
        .then(response => response.json())
        .then(pokemonData => {
          // Obtener los detalles de la especie del Pokémon
          fetch(pokemonData.species.url)
            .then(speciesResponse => speciesResponse.json())
            .then(pokemonSpeciesData => {
              const card = document.createElement("div");
              card.classList.add("card");

              const cardInner = document.createElement("div");
              cardInner.classList.add("card-inner");

              const cardFront = document.createElement("div");
              cardFront.classList.add("card-front");

              const cardBack = document.createElement("div");
              cardBack.classList.add("card-back");

              const id = document.createElement("p");
              id.textContent = `ID: ${pokemonData.id}`;

              const backInfo = document.createElement("p");
              backInfo.textContent = `Peso: ${pokemonData.weight}`;

              const additionalInfo = document.createElement("p");
              additionalInfo.textContent = `Altura: ${pokemonData.height}`;

              const stats = pokemonData.stats;
              const hp = stats.find(stat => stat.stat.name === "hp").base_stat;
              const attack = stats.find(stat => stat.stat.name === "attack").base_stat;
              const defense = stats.find(stat => stat.stat.name === "defense").base_stat;

              const HP = document.createElement("p");
              HP.textContent = `Hp: ${hp}`;

              const ataque = document.createElement("p");
              ataque.textContent = `Ataque: ${attack}`;

              const defensa = document.createElement("p");
              defensa.textContent = `Defensa: ${defense}`;

              cardBack.appendChild(id);
              cardBack.appendChild(backInfo);
              cardBack.appendChild(additionalInfo);
              cardBack.appendChild(HP);
              cardBack.appendChild(ataque);
              cardBack.appendChild(defensa);

              cardInner.appendChild(cardFront);
              cardInner.appendChild(cardBack);
              card.appendChild(cardInner);

              const bg = document.createElement("div");
              bg.classList.add("bg");

              const blob = document.createElement("div");
              blob.classList.add("blob");

              const image = document.createElement("img");
              image.src = pokemonData.sprites.front_default;
              image.alt = pokemonData.name;

              const name = document.createElement("h3");
              name.textContent = pokemonData.name;

              const types = pokemonData.types.map(type => type.type.name);
              const type = document.createElement("p");
              type.textContent = `Type: ${types.join(", ")}`;

              bg.appendChild(image);
              bg.appendChild(name);
              bg.appendChild(type);
              cardFront.appendChild(bg);
              cardFront.appendChild(blob);

              pokemonCardsContainer.appendChild(card);

              card.addEventListener("click", () => {
                card.classList.toggle("clicked");
              });
            })
            .catch(error => {
              console.error("Error fetching Pokémon species data:", error);
            });
        })
        .catch(error => {
          console.error("Error fetching Pokémon data:", error);
        });
    });
  })
  .catch(error => {
    console.error("Error fetching Pokémon list:", error);
  });

/*PARA BUSCAR EL POKEMON*/
const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");
const modalBody = document.getElementById("modalBody");

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

modalClose.addEventListener("click", closeModal);
window.addEventListener("click", event => {
  if (event.target === modal) {
    closeModal();
  }
});

const searchPokemon = event => {
  event.preventDefault();
  const { value } = event.target.pokemon;
  fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
    .then(data => data.json())
    .then(response => renderPokemonData(response))
    .catch(err => renderNotFound());
};

const renderPokemonData = data => {
  const stats = data.stats;
  const hp = stats.find(stat => stat.stat.name === "hp").base_stat;
  const attack = stats.find(stat => stat.stat.name === "attack").base_stat;
  const defense = stats.find(stat => stat.stat.name === "defense").base_stat;
  const name = data.name;
  const weight = data.weight;
  const height = data.height;
  const sprite = data.sprites.front_default;
  

  const hpElement = document.createElement("p");
  hpElement.textContent = `Hp: ${hp}`;

  const attackElement = document.createElement("p");
  attackElement.textContent = `Ataque: ${attack}`;

  const defenseElement = document.createElement("p");
  defenseElement.textContent = `Defensa: ${defense}`;

  const nameElement = document.createElement("p");
  nameElement.textContent = `Nombre: ${name}`;

  const weightElement = document.createElement("p");
  weightElement.textContent = `Peso: ${weight}`;

  const heightElement = document.createElement("p");
  heightElement.textContent = `Altura: ${height}`;

  const spriteImage = document.createElement("img");
  spriteImage.src = sprite;
  spriteImage.alt = name;

  const typeElement = document.createElement("p");
  const types = data.types.map(type => type.type.name);
  typeElement.textContent = `Tipo: ${types.join(", ")}`;

  modalBody.innerHTML = "";
  modalBody.appendChild(nameElement);
  modalBody.appendChild(typeElement); 
  modalBody.appendChild(spriteImage);
  modalBody.appendChild(weightElement);
  modalBody.appendChild(heightElement);
  modalBody.appendChild(hpElement);
  modalBody.appendChild(attackElement);
  modalBody.appendChild(defenseElement);

  openModal(); // Abre el modal para mostrar las estadísticas
};

const renderNotFound = () => {
  modalBody.innerHTML = `<p>No encontrado</p>`;
  openModal();
};

searchPokemonForm.addEventListener("submit", searchPokemon);

/*PARA FILTRAR LOS POKEMONS (AUN NO SIRVE PERRE)*/
  function filterAndDisplayPokemons(selectedType) {
    pokemonCardsContainer.innerHTML = "";
  
    fetch(`https://pokeapi.co/api/v2/type/${selectedType}`)
      .then(response => response.json())
      .then(data => {
        const pokemonUrls = data.pokemon.map(pokemon => pokemon.pokemon.url);
        const pokemonPromises = pokemonUrls.map(pokemonUrl =>
          fetch(pokemonUrl).then(response => response.json())
        );
  
        Promise.all(pokemonPromises)
          .then(pokemonDataArray => {
            pokemonDataArray.forEach(pokemonData => {
              fetch(pokemonData.species.url)
                .then(speciesResponse => speciesResponse.json())
                .then(pokemonSpeciesData => {
                  const pokemonTypes = pokemonSpeciesData.types.map(type => type.type.name);
                  if (pokemonTypes.includes(selectedType)) {
                    fetch(pokemonData.url)
                      .then(statsResponse => statsResponse.json())
                      .then(statsData => {
                        const card = document.createElement("div");
                        card.classList.add("card");
  
                        const cardInner = document.createElement("div");
                        cardInner.classList.add("card-inner");
  
                        const cardFront = document.createElement("div");
                        cardFront.classList.add("card-front");
  
                        const cardBack = document.createElement("div");
                        cardBack.classList.add("card-back");
  
                        const id = document.createElement("p");
                        id.textContent = `ID: ${pokemonData.id}`;
  
                        const backInfo = document.createElement("p");
                        backInfo.textContent = `Peso: ${pokemonData.weight}`;
  
                        const additionalInfo = document.createElement("p");
                        additionalInfo.textContent = `Altura: ${pokemonData.height}`;
  
                        const hp = statsData.stats.find(stat => stat.stat.name === "hp").base_stat;
                        const attack = statsData.stats.find(stat => stat.stat.name === "attack").base_stat;
                        const defense = statsData.stats.find(stat => stat.stat.name === "defense").base_stat;
  
                        const HP = document.createElement("p");
                        HP.textContent = `Hp: ${hp}`;
  
                        const ataque = document.createElement("p");
                        ataque.textContent = `Ataque: ${attack}`;
  
                        const defensa = document.createElement("p");
                        defensa.textContent = `Defensa: ${defense}`;
  
                        cardBack.appendChild(id);
                        cardBack.appendChild(backInfo);
                        cardBack.appendChild(additionalInfo);
                        cardBack.appendChild(HP);
                        cardBack.appendChild(ataque);
                        cardBack.appendChild(defensa);
  
                        cardInner.appendChild(cardFront);
                        cardInner.appendChild(cardBack);
                        card.appendChild(cardInner);
  
                        const bg = document.createElement("div");
                        bg.classList.add("bg");
  
                        const blob = document.createElement("div");
                        blob.classList.add("blob");
  
                        const image = document.createElement("img");
                        image.src = pokemonData.sprites.front_default;
                        image.alt = pokemonData.name;
  
                        const name = document.createElement("h3");
                        name.textContent = pokemonData.name;
  
                        const types = pokemonData.types.map(type => type.type.name);
                        const type = document.createElement("p");
                        type.textContent = `Type: ${types.join(", ")}`;
  
                        bg.appendChild(image);
                        bg.appendChild(name);
                        bg.appendChild(type);
                        cardFront.appendChild(bg);
                        cardFront.appendChild(blob);
  
                        pokemonCardsContainer.appendChild(card);
  
                        card.addEventListener("click", () => {
                          card.classList.toggle("clicked");
                        });
                      })
                      .catch(error => {
                        console.error("Error fetching Pokémon stats data:", error);
                      });
                  }
                })
                .catch(error => {
                  console.error("Error fetching Pokémon species data:", error);
                });
            });
          })
          .catch(error => {
            console.error("Error fetching Pokémon data:", error);
          });
      })
      .catch(error => {
        console.error("Error fetching Pokémon by type:", error);
      });
  }
  aguaButton.addEventListener("click", () => {
    filterAndDisplayPokemons("water");
  });
  
  electricoButton.addEventListener("click", () => {
    filterAndDisplayPokemons("electric");
  });
  
  fuegoButton.addEventListener("click", () => {
    filterAndDisplayPokemons("fire");
  });
  
  hadaButton.addEventListener("click", () => {
    filterAndDisplayPokemons("fairy");
  });
  
  plantaButton.addEventListener("click", () => {
    filterAndDisplayPokemons("grass");
  });
  
  rocaButton.addEventListener("click", () => {
    filterAndDisplayPokemons("rock");
  });
  
  tierraButton.addEventListener("click", () => {
    filterAndDisplayPokemons("ground");
  });
  
  psiquicoButton.addEventListener("click", () => {
    filterAndDisplayPokemons("psychic");
  });
  
  

