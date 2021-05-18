import axios from 'axios';
import React, { useEffect } from 'react';
import Chip from '@material-ui/core/Chip';
const Genres = ({ type, setpage, genres=[], selectedgenres=[], setgenres, setSelectedgenres }) => {

    let f=0;
    const handleadd = async (genre) => {
        selectedgenres.map((g) => {
            if(g.id===genre.id)
                f=1;
        });
        if(!f)
            setSelectedgenres([...selectedgenres, genre]);

        setgenres(genres.filter((g) => g.id !== genre.id));
        setpage(1);
    }

    const handleremove = async (genre) => {
        let f=0;
        genres.map((g) => {
            if(g.id==genre.id)
                f=1;
        });
        if(!f)
            setgenres([...genres, genre]);
        setSelectedgenres(selectedgenres.filter((g) => g.id !== genre.id));
        setpage(1);
    }

    const fetchgenres = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=3f66b57e468e104429e647efd009c6d5&language=en-US`);
        setgenres(data.genres);
        console.log("fdsf");
        console.log(data);
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
                    size="small"
                    color="primary"
                    style={{ margin: "2px" }}
                    key={genre.id}
                    clickable
                    onDelete={() => handleremove(genre)}    
                />)}

{genres.map((genre) =>
                <Chip onClick={() => handleadd(genre)} 
                    label={genre.name} 
                    // variant="outlined"
                    size="small"
                    color="secondary"
                    style={{ margin: "2px" }}
                    key={genre.id}
                    clickable
                    onDelete={() => handleremove(genre)}
                />)}
        </div>
    )
}

export default Genres
