import axios from "axios";

// base url to make requests to the movie database
const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
});

export default instance;

// if we had to send /foo-bar then axios will append https://api.themoviedb.org/3 and will send https://api.themoviedb.org/3/foo-bar
// instance.get('/foo-bar');
// https://api.themoviedb.org/3/foo-bar