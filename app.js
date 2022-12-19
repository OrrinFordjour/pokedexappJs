const pokedex = document.getElementById("pokedex");
const pokeCache = {};

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
  const pokemonHTMLString = pokemon
    .map(
      (pokeman) => `
  <div class="bg-gray-100 py-8 px-8 items-center text-center" onclick="selectPokemon(${pokeman.id})">
    <img class="mx-auto hover:animate-bounce" src="${pokeman.image}"/>
    <p class="uppercase text-[16px] font-normal">0${pokeman.id}. ${pokeman.name}</p>
    <p class="font-extralight text-[#656] text-[13px] capitalize" >Type: ${pokeman.type}</p>
  </div>
  `
    )
    .join("");
  pokedex.innerHTML = pokemonHTMLString;
};

const selectPokemon = async (id) => {
  if (!pokeCache[id]) {

    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokeman = await res.json();
    pokeCache[id] = pokeman
    console.log(pokeman)
    displayPopUp(pokeman);
  }
  displayPopUp(pokeCache[id]);
};

const displayPopUp = (pokeman) => {
  const type = pokeman.types.map((type) => type.type.name).join(", ");
  const abilitie = pokeman.abilities.map((abilitie) => abilitie.ability.name).join(", ");
  const image = pokeman.sprites["front_default"];
  const HtmlString = `
  <div class="popup fixed top-0 left-0 h-screen w-screen flex justify-center bg-slate-50 items-center text-center">
    <button class="absolute top-5 right-5 inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onclick="closePopup()">Close</button>
    <div class="py-8 px-8" onclick="selectPokemon(${pokeman.id})">
      <img class="mx-auto" src="${image}"/>
      <p class="uppercase text-[16px] font-normal">0${pokeman.id}. ${pokeman.name}</p>
      <div class="flex justify-start gap-4 ">
        <div class="font-extralight text-[#656] text-[13px] capitalize text-left" >
          <p>Type:</p>
          <p>base experience</p>
          <p>Height:</p>
          <p>Weight:</p>
          <p>Abilities:</p>
        </div>
        <div  class="font-extralight text-[#656] text-[13px] capitalize text-right" >
          <p>${type}</p>
          <p>${pokeman.base_experience}</p>
          <p>${pokeman.height / 10} m</p>
          <p>${pokeman.weight / 10} kg</p>
          <p>${abilitie}</p>
        </div>
      </div>
    </div>
  </div>

  `;
  console.log(pokeman);
  pokedex.innerHTML = HtmlString + pokedex.innerHTML;
};

const closePopup = () => {
  const popup = document.querySelector(".popup");
  popup.parentElement.removeChild(popup);
};

fetchPokemon();
