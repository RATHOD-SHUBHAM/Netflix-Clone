import React from 'react'
import {useState , useEffect} from 'react';
import axios from './axios';
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original" ;


function Row({ title, fetchUrl, isLargeRow }) {

    const [movies, setMovies] = useState([]);

    const [trailerUrl, setTrailerUrl] = useState("");


    // Need a snippet of code which runs based on a specific condition/variable.
    useEffect(() => {
        // if []. run once when the row loads, but dont run again and again.
        async function fetchData() {
            const request = await axios.get(fetchUrl);

            // https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US
            // console.log(request);
            // console.log(request.data.results);
            setMovies(request.data.results);
            return request;

        }

        fetchData();

    }, [fetchUrl]);


    // console.log(movies);
    // console.table(movies);

    // obtained from react-youtube documentation
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
    };

    const handleClick = (movie) => {
        // console.table(movie?.title)
        // if already open and again we click on the movie. it should close the video
        if (trailerUrl) {
          setTrailerUrl('');
        } 
        else {
          movieTrailer(movie?.name || movie?.original_name || movie?.title || "")
            .then(url => {
              const urlParams = new URLSearchParams(new URL(url).search);
            //   https://www.youtube.com/watch?v=jamNVtr9CL0&list=RDjamNVtr9CL0&start_radio=1
            // the video id is given to letter v by youtube
              setTrailerUrl(urlParams.get('v'));
            })
            .catch(
                (error) => console.log(error)
                );
        }
    }


    return (
        <div className = "row">
            {/* Title */}
            <h2>{title}</h2>

            <div className = "row_posters">

                {movies.map(movie => (
                    // poster_path = "/gFZriCkpJYsApPZEF3jhxL4yLzG.jpg"
                    <img
                     key = {movie.id}
                     // onclick for each movie for youtube trailer
                     onClick={() => handleClick(movie)}
                     className = {`row_poster ${isLargeRow && "row_posterLarge"}`}
                    //  src = {`${base_url}${movie.poster_path}`} alt={movie.name}
                    // since we are using isLargeRow in app.js to show netflix original look bigger
                    // we will not use poster path instead we will use backdrop_path
                     src = {`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name}/>
                ))}


            </div>

            {/* container -> Posters */}
            {/* This will pass show video under every row */}
            {/* <YouTube videoId = '2g811Eo7K8U' opts={opts}/> */}

            {/*  when we have a trailer URL show the youtube video */}
            <div style={{ padding: "40px" }}>
                {trailerUrl && <YouTube videoId = {trailerUrl} opts={opts}/>}
            </div>
                

        </div>
    )
}

export default Row
