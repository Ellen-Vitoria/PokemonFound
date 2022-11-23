//Variáveis globais
const pokemonId = document.querySelector('.poke-id');
const pokemonName = document.querySelector('.poke-name');
const pokemonImg = document.querySelector('.poke-img');

const pokemonDesc = document.querySelector('.poke-desc');
const pokemonType = document.querySelector('.poke-type');
const pokemonHeight = document.querySelector('.poke-height');
const pokemonMove = document.querySelector('.poke-move');

const formSearch = document.querySelector('.form-search');
const inputSearch = document.querySelector('.input-search');
const buttonSearch = document.querySelector('.btn-search');

//Informação do pokemon inserido
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

//Renderizar dados na tela
const renderPokemon = async (pokemon) => {
    const data = await fetchPokemon(pokemon);

    if(data) {
        pokemonImg.style.display = 'block';
        pokemonImg.src = data.sprites.versions['generation-v']['black-white']['animated']['front_default'];
        pokemonId.innerHTML = `#${data.id}`;
        pokemonName.innerHTML = data.name;
        
        pokemonDesc.style.display = 'flex';
        pokemonType.innerHTML = data.types.map(item => item.type.name).join("/");
        pokemonHeight.innerHTML = `${data.height/10} metro(s)`;
        pokemonMove.innerHTML = `${data.moves['0']['move']['name']} <br> 
                                 ${data.moves['1']['move']['name']} <br>
                                 ${data.moves['2']['move']['name']}`;
    }
    else {
        pokemonImg.style.display = 'none';
        pokemonId.innerHTML = '';
        pokemonName.innerHTML = 'Não encontrado!';
        pokemonDesc.style.display = 'none';
    }
    inputSearch.value = '';
}

//Receber pokemin via input
formSearch.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(inputSearch.value.toLowerCase());
});

//Receber pokemin via botão
buttonSearch.addEventListener('click', (event) => {
    event.preventDefault();
    renderPokemon(inputSearch.value.toLowerCase());
});

renderPokemon('1');