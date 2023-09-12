import './App.css'
import { useState, useEffect } from 'react'
import { CardPokemon } from './components/CardPokemon'

// import { useFetch } from "./services/useFetch";
export const App = () => {
  // const { data, loading, error } = useFetch(
  //   "https://pokeapi.co/api/v2/pokemon"
  // );

  const [allPokemons, setAllPokemons] = useState([])

  const [pokemonData, setPokemonData] = useState([])
  const [pokemonList, setPokemonList] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    const getAllPokemons = async () => {
      try {
        const responseFetch = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=51'
        )
        if (!responseFetch.ok) {
          throw new Error('Bad response. Status code: ', responseFetch.status)
        }
        const { results } = await responseFetch.json()
        setAllPokemons(results)

        // Obtener detalles de cada Pokémon individual
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    getAllPokemons()
  }, [])

  useEffect(() => {
    if (!allPokemons) return

    const getPokemonData = async () => {
      try {
        const updatedPokemonList = []
        for (const pokemon of allPokemons) {
          const pokemonData = await fetch(pokemon.url).then((response) =>
            response.json()
          )
          const pokemonToPush = {
            id: pokemonData.id,
            name: pokemonData.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png` // URL de la imagen
          }
          // console.log(pokemonData)
          updatedPokemonList.push(pokemonToPush)
        }
        setPokemonList(updatedPokemonList)
        setPokemonData(updatedPokemonList)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    getPokemonData()
  }, [allPokemons])

  const handleChange = (event) => {
    const searchedPokemon = event.target.value
    filterPokemon(pokemonData, searchedPokemon)
  }

  const filterPokemon = (pokemonData, searchedPokemon) => {
    const filteredPokemons = pokemonData.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(searchedPokemon)
    })

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
            {error && <h4>Error: {error}</h4>}
            {loading && <h4>Loading..</h4>}
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
