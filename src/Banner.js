import React, {useState, useEffect} from 'react'
import axios from './axios'
import requests from './requests';
import './Banner.css'

function Banner() {

    const [movie, setMovie] = useState([]); // responsible for what ever movie gets selected


    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            //https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_network=123
            // randomly select one movie
            // Math.floor(Math.random() * request.data.results.length - 1)
            setMovie(request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
            ]);
            return request;
        }

        fetchData();

    }, [])


    // console.log(movie);

    // Add the 3 button when there is lot of text.
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
      }

    return (
        // This header will have abackground image
        <header className = "banner"

            style={{
                backgroundSize: "cover", // use all the size of screen
                backgroundImage: `url(
                "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                )`, // ?. is saying if there is no movie at times it wont crash
                backgroundPosition: "center center" // keep the image at center
            }} 
        > 
            <div className = "banner_contents">

                {/* title */}
                <h1 className="banner_title" >
                    {/* the api might return title or name or original name */}
                    { movie?.title || movie?.name || movie?.original_name }

                </h1>

                {/* div > 2 buttons > play and my list */}
                <div className = "banner_buttons">

                    <button className = "banner_button">Play</button>
                    <button className = "banner_button">My List</button>
 
                </div>

                {/* description */}
                <h1 className = "banner_description">{truncate(movie?.overview, 150)}</h1>
                
            </div>

            {/* add empty div so as to give dimming effect while scrolling through the page  */}
            <div className = "banner--fadeBottom"></div>
        </header>
    )
}

export default Banner
