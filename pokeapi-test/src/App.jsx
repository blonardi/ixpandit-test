import './App.css'
import { useState, useEffect } from 'react'
import { CardPokemon } from './components/CardPokemon'

// import { useFetch } from "./services/useFetch";
export const App = () => {
  // const { data, loading, error } = useFetch(
  //   "https://pokeapi.co/api/v2/pokemon"
  // );

  const [pokemonData, setPokemonData] = useState([])
  const [pokemonList, setPokemonList] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    async function getPokemonsName () {
      try {
        const responseFetch = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=51'
        )

        if (!responseFetch.ok) {
          throw new Error('Bad response. Status code: ', responseFetch.status)
        }

        const data = await responseFetch.json()

        const updatedPokemonList = []

        // Obtener detalles de cada Pokémon individual
        for (const pokemon of data.results) {
          const pokemonData = await fetch(pokemon.url).then((response) =>
            response.json()
          )
          updatedPokemonList.push({
            id: pokemonData.id,
            name: pokemonData.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png` // URL de la imagen
          })
        }
        setPokemonData(updatedPokemonList)
        setPokemonList(updatedPokemonList)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    getPokemonsName()
  }, [])

  const handleChange = (event) => {
    const searchedPokemon = event.target.value
    console.log('searchedPokemon', searchedPokemon)
    filterPokemon(pokemonData, searchedPokemon)
  }

  const filterPokemon = (pokemonData, searchedPokemon) => {
    // console.log("searchedPoke: ", searchedPokemon);
    const filteredPokemons = pokemonData.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(searchedPokemon)
    })

    console.log('filteredPok: ', filteredPokemons)
    setPokemonList(filteredPokemons)
  }

  return (
    <div className='App'>
      <div className='container'>
        <header>
          <div className='title'>
            <h1>Lista de Pokémon</h1>
          </div>
          <div className='warningStates'>
            {error && <li>Error: {error}</li>}
            {loading && <h4>Loading </h4>}
          </div>
          <form>
            <label htmlFor='buscadorPokemons'>
              <input
                type='text'
                placeholder='Busca tu pokemon favorito..'
                onChange={handleChange}
              />
            </label>
          </form>
        </header>
        <main>
          {pokemonList?.map(({ id, name, image }) => (
            <CardPokemon key={id} name={name} url={image} />
          ))}
        </main>
      </div>
    </div>
  )
}
