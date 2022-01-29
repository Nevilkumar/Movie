import React from 'react';
import './Singlecontent.css';
import Badge from '@material-ui/core/Badge';
import { makeStyles } from "@material-ui/core/styles";
import p from "../ContentModel/p.jpg";
import Contentmodel from '../ContentModel/Contentmodel';

const useStyles = makeStyles((theme) => ({
    badge: {
      fontSize: 15,
      fontWeight: 'bold',
      width: 35,
      height: 35,
      fontFamily: 'Klee One',
      display: 'flex',
      justifyContent:'center',
      alignItems: 'center',
      borderRadius: '50%'
    }
}));

const Singlecontent = ({id, poster, title, date, media_type, vote_average }) => {
    const img_300 = 'https://image.tmdb.org/t/p/w300';
    const classes = useStyles();
    return (
        <>
            <Contentmodel media_type={media_type} id={id}>
                <Badge classes={{ badge: classes.badge }} badgeContent={vote_average} color={"primary"} />
                <img className="poster" src={poster? img_300+poster : p} alt=''/>
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
