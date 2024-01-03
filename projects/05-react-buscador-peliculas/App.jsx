// import { useRef } from 'react'
import { useEffect, useState, useRef, useCallback } from 'react'
import './App.css'
import { Movies } from './src/components/Movies'
import { useMovies } from './src/hooks/useMovies'
import debounce from 'just-debounce-it'

function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)
  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una pelicula vacia')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una pelicula con un numero')
      return
    }

    if (search.length < 3) {
      setError('La busqueda tiene que tener al menos 3 caracteres')
      return
    }
    setError(null)
  }, [search])

  return { search, updateSearch, error }
}

export function App () {
  // const inputRef = useRef()
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(debounce(search => {
    console.log('search', search)
    getMovies({ search })
  }, 500), [])

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div>
      <header className='page'>
        <h1>Buscador de peliculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} name='query' placeholder='Avengers, Star Wars, The matrix ...' />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main className='main'>
        {loading
          ? <p>Cargando...</p>
          : <Movies movies={movies} />}
      </main>
    </div>
  )
}
