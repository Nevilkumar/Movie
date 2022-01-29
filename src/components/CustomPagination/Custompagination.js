import React from 'react'
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  ul: {
    "& .MuiPaginationItem-root": {
      color: "white",
      fontSize: '20px',
      fontFamily: 'Klee One'
    }
  }
}));

const Custompagination = ({ setpage, numofpages = 10 }) => {
  const handlepagechange = (page) => {
    setpage(page);
    window.scroll(0, 0);
  };
  const classes = useStyles();
  return (
    <>
      <Pagination hidePrevButton hideNextButton classes={{ ul: classes.ul }} backgroundColor="secondary" color="primary" count={numofpages} onChange={(e) => handlepagechange(e.target.textContent)} />
    </>
  );
}

export default Custompagination;
