import React from 'react';
import './Singlecontent.css';
import Badge from '@material-ui/core/Badge';
import p from "./p.jpg";
import Contentmodel from './Contentmodel';
const Singlecontent = ({id, poster, title, date, media_type, vote_average }) => {
    const img_300 = 'https://image.tmdb.org/t/p/w300';
    return (
        <>
            <Contentmodel media_type={media_type} id={id}>
                <Badge badgeContent={vote_average} color={vote_average > 7 ? "primary" : "secondary"} />
                <img className="poster" src={poster? img_300+poster : p} />
                <b className="title">{title}</b>
                <div className="details">
                    <span className="subtitle">
                        <span>{media_type === "tv" ? "TV Series" : "Movie"}</span>
                        <span>{date}</span>
                    </span>
                </div>
            </Contentmodel>

        </>
    );
};

export default Singlecontent;
