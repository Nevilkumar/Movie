import axios from 'axios';
import React, { useState, useEffect } from 'react';


import Custompagination from '../CustomPagination/Custompagination';
import Singlecontent from '../SingleContent/Singlecontent';
import './Trending.css';

const Trending = () => {
    const [content, setcontent] = useState([]);
    const [page, setpage] = useState(1);
    const main_url = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`;

    const fetchtrending = async () => {
        const { data } = await axios.get(main_url);
        setcontent(data.results);
    }
    useEffect(() => {
        fetchtrending();
        window.scroll(0, 0);
    }, [page]);

    return (
        <>
            <span className='pagetitle'>Trending</span>
            <div className='trending'>
                {content && content.map((v) =>
                    <Singlecontent
                        key={v.id}
                        id={v.id}
                        poster={v.poster_path}
                        title={v.title || v.name}
                        date={v.first_air_date || v.release_date}
                        media_type={v.media_type}
                        vote_average={v.vote_average}
                    />)}
            </div>

            <div className="page">
                <Custompagination setpage={setpage} />
            </div>
        </>
    );
};

export default Trending;