const pokedex = document.getElementById('pokedex')

const fetchPokemon = () => {
  const promises = [];
  for (let i = 1; i < 152; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((response) => response.json()));
  }

  Promise.all(promises).then((results) => {
    const pokemon = results.map((data) => ({
      id: data.id,
      name: data.name,
      image: data.sprites["front_default"],
      type: data.types.map((type) => type.type.name).join(", "),
    }));
    displayPokemon(pokemon);
  });
};

const displayPokemon = (pokemon) => {
  console.log(pokemon);
  const pokemonHTMLString = pokemon.map (pokeman => `
  <div class="bg-gray-100 py-8 px-8 items-center text-center">
    <img class="mx-auto hover:animate-bounce" src="${pokeman.image}"/>
    <p class="uppercase text-[16px] font-normal">0${pokeman.id}. ${pokeman.name}</p>
    <p class="font-extralight text-[#656] text-[13px]" >Type: ${pokeman.type}</p>
  </div>
  `).join('');
  pokedex.innerHTML = pokemonHTMLString;

};

fetchPokemon();
