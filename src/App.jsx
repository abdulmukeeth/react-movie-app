import "./css/App.css"
// import MovieCard from './components/MovieCard'
import Home from './pages/Home'
import Favourites from './pages/Favourites'
import Navbar from './components/Navbar'
import {Routes, Route} from 'react-router-dom'
import { MovieProvider} from './contexts/MovieContext'

function App() {

  // const movieNumber = 1
  return (
    <>
      {/* Example of Conditional Rendering */}
      {/* {movieNumber === 1? (
        <MovieCard  movie={{title: "My First Film", release_date: "2024"}}/>
      ) : (<MovieCard  movie={{title: "My Second Film", release_date: "2025"}}/>)
      } */}

      {/* Example of Short Circuiting */}
      {/* {movieNumber === 1 && <MovieCard  movie={{title: "My First Film", release_date: "2024"}}/>
      } */}

      {/* Displaying list of movies */}
      {/* <Home/> */}
    <MovieProvider>
      <Navbar/>
      <main className="main-content">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/favourites' element={<Favourites/>} />
        </Routes>
      </main>
    </MovieProvider>
    </>
  )
}

export default App
