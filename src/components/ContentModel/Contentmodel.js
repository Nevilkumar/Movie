import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';
import YouTubeIcon from '@material-ui/icons/YouTube';

import '../SingleContent/Singlecontent.css';
import './Contentmodel.css';
import p from './p.jpg';
import lp from './lp.jpg';


const useStyles = makeStyles({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        color: "white",
        border: "3px solid white",
        outline: "none",
        background: "#11101d",
        padding: 30,
        borderRadius: 4,
    },
});

export default function Contentmodel({ children, media_type, id }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [content, setcontent] = useState("");
    const [video, setvideo] = useState();
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const fetchdata = async () => {
        const url = `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
        const { data } = await axios.get(url);
        setcontent(data);
    };

    const fetchvedio = async () => {
        const url = `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
        const { data } = await axios.get(url);
        setvideo(data.results[0]?.key);
    };

    useEffect(() => {
        fetchdata();
        fetchvedio();
    }, []);

    return (
        <>
            <div type="button" onClick={handleOpen} className='media'>
                {children}
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <div className='contentModel-width-class'>
                    <Fade in={open}>
                        {content && (<div className={classes.paper}>
                            <div className="contentmodel">
                                <img className='content-portrait' src={content.poster_path ? `https://image.tmdb.org/t/p/w300/${content.poster_path}` : p} alt='' />
                                <img className='content-landscape' src={content.backdrop_path ? `https://image.tmdb.org/t/p/w500/${content.backdrop_path}` : lp} alt='' />

                                <div className="content-about">

                                    <span className="content-title">
                                        {content.name || content.title}
                                        &nbsp;({(content.first_air_date || content.release_date || "----").substring(0, 4)})
                                    </span>


                                    <span className="content-description">
                                        {content.overview}
                                    </span>

                                    <div>

                                    </div>
                                    <a className="link" href={`https://www.youtube.com/watch?v=${video}`} target="_blank">
                                        <button className="ybtn">
                                            <span className="yt"><YouTubeIcon fontSize="large" /></span>
                                            Watch The Trailer
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                        )}
                    </Fade>
                </div>
            </Modal>
        </>
    );
}