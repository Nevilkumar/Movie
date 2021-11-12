import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import './Singlecontent.css';
import './Contentmodel.css';
import axios from 'axios';
import p from './p.jpg';
import Button from '@material-ui/core/Button';
import YouTubeIcon from '@material-ui/icons/YouTube';
import lp from './lp.jpg';



const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: "80%",
        height: "77%",
        color: "white",
        border:"3px solid white",
        backgroundColor: "black",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

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
        const url = `https://api.themoviedb.org/3/${media_type}/${id}?api_key=3f66b57e468e104429e647efd009c6d5&language=en-US`;
        const { data } = await axios.get(url);
        console.log(data);
        setcontent(data);
    };

    const fetchvedio = async () => {
        const url = `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=3f66b57e468e104429e647efd009c6d5&language=en-US`;
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
            <Fade in={open}>
                {content && (<div className={classes.paper}>
                    <div className="contentmodel">
                        <img className='content-portrait' src={content.poster_path?`https://image.tmdb.org/t/p/w300/${content.poster_path}`:p }/>
                        <img className='content-landscape' src={content.backdrop_path ? `https://image.tmdb.org/t/p/w500/${content.backdrop_path}` : lp} />

                            <div className="content-about">

                                <span className="content-title">
                                    {content.name || content.title}
                                    &nbsp;({(content.first_air_date || content.release_date ||"----").substring(0, 4)})
                                </span>


                                    <span className="content-description">
                                        {content.overview}
                                    </span>

                                    <div>

                                    </div>
                                    <a className="link" href={`https://www.youtube.com/watch?v=${video}`} target="_blank">
                                        <button className="ybtn">
                                            <span className="yt"><YouTubeIcon fontSize="large"/></span>
                                            Watch The Trailer
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </Fade>
            </Modal>
        </>
    );
}