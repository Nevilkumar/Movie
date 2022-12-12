import axios from 'axios';
import React, { useEffect } from 'react';
import Chip from '@material-ui/core/Chip';


const Genres = ({ type, setpage, genres = [], selectedgenres = [], setgenres, setSelectedgenres }) => {

    let f = 0;
    const handleadd = async (genre) => {
        selectedgenres.map((g) => {
            if (g.id === genre.id)
                f = 1;
        });
        if (!f)
            setSelectedgenres([...selectedgenres, genre]);

        setgenres(genres.filter((g) => g.id !== genre.id));
        setpage(1);
    }

    const handleremove = async (genre) => {
        let f = 0;
        genres.map((g) => {
            if (g.id == genre.id)
                f = 1;
        });
        if (!f)
            setgenres([...genres, genre]);
        setSelectedgenres(selectedgenres.filter((g) => g.id !== genre.id));
        setpage(1);
    }

    const fetchgenres = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        setgenres(data.genres);
    };


    useEffect(() => {
        fetchgenres();
        return () => { setgenres({}); };
    }, [])

    return (
        <div style={{ padding: "6px 0px" }}>

            {selectedgenres.map((genre) =>
                <Chip onClick={() => handleadd(genre)}
                    label={genre.name}
                    // variant="outlined"
                    color="primary"
                    style={{ margin: "2px", fontSize: '18px', fontFamily: 'KoHo' }}
                    key={genre.id}
                    clickable
                    onDelete={() => handleremove(genre)}
                />)}

            {genres.map((genre) =>
                <Chip onClick={() => handleadd(genre)}
                    label={genre.name}
                    // variant="outlined"
                    color="secondary"
                    style={{ margin: "2px", fontSize: '18px', fontFamily: 'KoHo' }}
                    key={genre.id}
                    clickable
                    onDelete={() => handleremove(genre)}
                />)}
        </div>
    )
}

export default Genres
