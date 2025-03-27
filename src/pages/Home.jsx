import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react"
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css"

function Home(){
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([])
    // Whenever you are loading something from API always set up 2 variables or states
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        const loadPopularMovies = async() =>{
            try{
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            }
            catch(err){
                console.log(err)
                setError("Failed to Load the Moviess...")
            }
            finally{
                setLoading(false)
            }
        }
        loadPopularMovies()
    }, [])

    // const movies = [
    //     {id:1, title: "John Wick", release_date: "2021"},
    //     {id:2, title: "Terminator", release_date: "2022"},
    //     {id:3, title: "The Matrix", release_date: "2023"},
    //     {id:4, title: "Gravity", release_date: "2024"}
    // ]

    const handleSearch = async (e)=>{
        // To ensure that whatever we type is not cleared when you hit submit button we use preventDefault on the event object (e)
        e.preventDefault()
        // setSearchQuery('Changing the Search Value')
        if (!searchQuery.trim()) return
        if(loading) return

        setLoading(true)
        try{
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        }catch(err){
            console.log(err)
            setError("Failed to search Movies..")
        }finally{
            setLoading(false)
        }
        // setSearchQuery("");
    }

    // useEffect(() => {
    //     const debounceTimeout = setTimeout(async () => {
    //       if (!searchQuery.trim()) {
    //         // Reset to popular movies if search query is empty
    //         try {
    //           const popularMovies = await getPopularMovies();
    //           setMovies(popularMovies);
    //         } catch (err) {
    //           console.log(err);
    //           setError("Failed to Load the Movies...");
    //         } finally {
    //           setLoading(false);
    //         }
    //         return;
    //       }
    
    //       if (loading) return;
    
    //       setLoading(true);
    //       try {
    //         const searchResults = await searchMovies(searchQuery);
    //         setMovies(searchResults);
    //         setError(null);
    //       } catch (err) {
    //         console.log(err);
    //         setError("Failed to search Movies..");
    //       } finally {
    //         setLoading(false);
    //       }
    //     }, 500); // Debounce delay in milliseconds
    
    //     return () => clearTimeout(debounceTimeout);
    //   }, [searchQuery, loading]);

    return (
        <>
            <div className="home">
                <form 
                onSubmit={handleSearch} 
                className="search-form">
                    <input type="text" placeholder="Search for movies..." className="search-input" 
                    // setting value to searchQuery to connect both together
                    value={searchQuery}
                    // Updating the state on Change
                    // e.target refers to the DOM element that triggered the event (in this case, the input field)
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="search-button">Search</button>
                </form>

                {error && <div className="error-message">{error}</div>}
                {loading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    <div className="movies-grid">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} key={movie.id} />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default Home;