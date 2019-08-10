export default {
  Navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '6vh',
  },
  Logo: {
    marginRight: '15px',
    padding: '0 13px',
    backgroundColor: '#eceff1',
    fontFamily: "'Roboto', sans-serif",
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    '& a': {
      textDecoration: 'none',
      color: 'black',
    },
  },
  Slider: {
    width: '340px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    '& *': {
      flex: '0 0 auto',
      margin: '0 10px',
    },
    '& .rc-slider-rail': {
      height: '8px',
    },
    '& .rc-slider-track': {
      backgroundColor: 'transparent',
    },
    '& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:hover, .rc-slider-handle:focus': {
      backgroundColor: 'green',
      outline: 'none',
      border: '2px solid green',
      boxShadow: 'none',
      width: '13px',
      height: '13px',
      marginLeft: '-7px',
      marginTop: '-2px',
    },
  },
  Select: {
    marginLeft: 'auto',
    marginRight: '1rem',
  },
};
