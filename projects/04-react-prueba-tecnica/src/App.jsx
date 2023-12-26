import { useCatImage } from './hooks/useCatImage'
import { useCatFact } from './hooks/useCatFacts'

// const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export function App () {
  const { fact, refreshFact } = useCatFact()
  const { imageUrl } = useCatImage({ fact })

  const handleClick = async () => { refreshFact() }

  return (
    <main>
      <h1>App de gatitos</h1>
      <button onClick={handleClick}>Cambiar hecho</button>
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}/${imageUrl}`} alt='imagen traida de catass' />}
    </main>
  )
}
