import axios from 'axios';
import React, { useState, useEffect } from 'react';


import Custompagination from '../CustomPagination/Custompagination';
import Singlecontent from '../SingleContent/Singlecontent';
import '../Trending/Trending.css';
import Genres from '../Genres/Genres';
import useGenres from '../Genres/useGenres';

const TVSeries = ()=>{
    const [content,setcontent]=useState([]);
    const [page, setpage] = useState(1);
    const [numofpages, setnumofpages] = useState(0);

    const [selectedgenres, setSelectedgenres] = useState([]);
    const [genres, setgenres] = useState([]);
    const genreforurl=useGenres(selectedgenres);

    const main_url=`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforurl}`;
    
    const fetchtrending = async ()=>{
        const {data} = await axios.get(main_url);
        setcontent(data.results);
        setnumofpages(data.total_pages);
    }
    useEffect(() => {
        fetchtrending();
        window.scroll(0, 0);
    },[page,genreforurl]);

    return(
        <>
            <span className='pagetitle'>TV Series</span>
            
            <Genres type='tv' setpage={setpage} genres={genres} selectedgenres={selectedgenres} setgenres={setgenres} setSelectedgenres={setSelectedgenres}/>       

            <div className='trending'>
                {content && content.map((v) => 
                    <Singlecontent 
                        key={v.id} 
                        id={v.id} 
                        poster={v.poster_path}
                        title={v.title || v.name}
                        date={v.first_air_date || v.release_date}
                        media_type="tv"
                        vote_average={v.vote_average}
                    />)}
            </div>
            
            <div className="page">
            {numofpages>1 && (<Custompagination setpage={setpage} numofpages={numofpages}/>)}
            </div>
        </>
    );
};

export default TVSeries;