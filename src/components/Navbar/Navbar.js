import React ,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import WhatshotIcon from '@material-ui/icons/Whatshot';
import MovieIcon from '@material-ui/icons/Movie';
import SearchIcon from '@material-ui/icons/Search';
import TvIcon from '@material-ui/icons/Tv';
import { useHistory } from 'react-router';
const useStyles = makeStyles({
    root: {
        width: '100%',
        height:'70px',
        position: 'fixed',
        bottom: 0,
        background: '#1d1b31',
        borderTop:'2px solid white',
        borderColor:'white',
        zIndex: 100,
        fontFamily: 'Klee One',
    },
});

export default function SimpleBottomNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const history = useHistory();
    useEffect(() => {
        if(value===0)
            history.push('/');
        else if(value===1)
            history.push('/movies');
        else if(value===2)
            history.push('/tvseries');
        else
            history.push('/search');
    }, [value,history]);
    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction style={{ color: 'white' }} label="TRENDING" icon={<WhatshotIcon fontSize='medium' />} />
            <BottomNavigationAction style={{ color: 'white' }} label="MOVIES" icon={<MovieIcon fontSize='medium' />} />
            <BottomNavigationAction style={{ color: 'white' }} label="TV SERIES" icon={<TvIcon fontSize='medium' />} />
            <BottomNavigationAction style={{ color: 'white' }} label="SEARCH" icon={<SearchIcon fontSize='medium' />} />
        </BottomNavigation>
    );
}