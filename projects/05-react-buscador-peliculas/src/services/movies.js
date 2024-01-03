export async function searchMovies ({ search }) {
  if (search === '') return null

  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=482b377f&s=${search}`)

    const json = await response.json()

    const movies = json.Search

    return movies?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      image: movie.Poster
    }))
  } catch (error) {
    throw new Error('Error searching movies')
  }
}
