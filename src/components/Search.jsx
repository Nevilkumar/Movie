import React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, createMuiTheme, ThemeProvider } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import './Search.css';
import axios from 'axios';
import Custompagination from './Custompagination';
import Singlecontent from './Singlecontent.jsx';
import './Trending.css';


const Search = () => {
    const [type, settype] = useState("");
    const [page, setpage] = useState(1);
    const [searchtext, setsearchtext] = useState("");
    const [content, setcontent] = useState();
    const [numofpages, setnumofpages] = useState(0);

    const fetchsearch = async () => {
        let tvurl = `https://api.themoviedb.org/3/search/tv?api_key=3f66b57e468e104429e647efd009c6d5&language=en-US&query=${searchtext}&page=${page}`;
        let movieurl = `https://api.themoviedb.org/3/search/movie?api_key=3f66b57e468e104429e647efd009c6d5&language=en-US&query=${searchtext}&page=${page}`;
        let url;
        if(type==="")
            return 0;
        if (type === 'tv')
            url = tvurl;
        else if(type === 'movie')
            url = movieurl;
        const { data } = await axios.get(url);
        setcontent(data.results);
        setnumofpages(data.total_pages);
    };

    useEffect(() => {
        window.scroll(0, 0);
        fetchsearch();
    }, [page, type]);

    const darkTheme = createMuiTheme({
        palette: {
            type: "dark",
            primary: {
                main: "#fff",
            },
        },
    });

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <div className="Searchbar">
                    <TextField
                        style={{ width: "50%" }}
                        className="searchbox"
                        label="Search"
                        variant="filled"
                        value={searchtext}
                        onChange={(e) => setsearchtext(e.target.value)}
                    />
                    <Button variant='contained' onClick={fetchsearch} style={{ marginLeft: "15px" }}><SearchIcon /></Button>
                </div>
            </ThemeProvider>

            <div className="btn">
                <button id="b1" className="b" onClick={() => {
                    document.getElementById("b1").style.backgroundColor = "yellow";
                    document.getElementById("b2").style.backgroundColor = "orange";
                    settype("movie")}
                }>Movies</button>
                <button id="b2" className="b" onClick={() => {
                    document.getElementById("b2").style.backgroundColor = "yellow";
                    document.getElementById("b1").style.backgroundColor = "orange";
                    settype("tv")}
                }>TV Series</button>
            </div>

            <div className='trending'>
                {content && content.map((v) =>
                    <Singlecontent
                        key={v.id}
                        id={v.id}
                        poster={v.poster_path}
                        title={v.title || v.name}
                        date={v.first_air_date || v.release_date}
                        media_type={type=='tv'? "tv" : "movie"}
                        vote_average={v.vote_average}
                    />)}
            </div>

            <div className="page">
                {numofpages > 1 && (<Custompagination setpage={setpage} numofpages={numofpages} />)}
            </div>

        </>
    );
};

export default Search;