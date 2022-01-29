import React from 'react'

const useGenres = (selectedgenres) => {
    if(selectedgenres.length<1) return "";

    const genreids=selectedgenres.map((g)=> g.id);
    return genreids.reduce((acc,curr) => acc+","+curr);
}

export default useGenres;
