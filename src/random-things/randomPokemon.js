

async function getPokemon() {
    const result = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then(res => res.json())
    const theRandomlyChosenPokemon = getRandomItem(result.results)

    const pokemonResult = await fetch(theRandomlyChosenPokemon.url)
    .then(res => res.json())

    return {
        name: theRandomlyChosenPokemon.name,
        image: pokemonResult.sprites.front_default
    }
}

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = getPokemon