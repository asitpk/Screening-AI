// import { Roboto } from '@next/font/google';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';


// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: 'rgb(4, 14, 54)',
        },
        secondary: {
            main: '#fff',
        },
        error: {
            main: red.A400,
        },
        text: {
            primary: '#b0b5bb',
        },
        background: {
            default:  'rgb(4, 14, 54)',
        }
    },
    typography: {
        fontFamily: "'Epilogue', sans-serif",
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 800,
        h1: {
            fontWeight: 800,
            fontSize: 64,
            letterSpacing: "-0.24px",
        },
        h2: {
            fontWeight: 800,
            fontSize: 53,
            letterSpacing: "-0.24px",
        },
        h3: {
            fontWeight: 800,
            fontSize: 43,
            letterSpacing: "1.50px",
        },
        h4: {
            fontWeight: 800,
            fontSize: 34,
            letterSpacing: "-0.06px",
        },
        h5: {
            fontWeight: 600,
            fontSize: 28,
            letterSpacing: "-0.05px",
        },
        h6: {
            fontWeight: 700,
            fontSize: 24,
            letterSpacing: "-0.05px",
        },
        overline: {
            fontWeight: 500,
        },
        subtitle1: {
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "20px",
            letterSpacing: "0.5px",
        },
        subtitle2: {
            fontWeight: 500,
            fontSize: "12px",
            lineHeight: "14.71px",
            letterSpacing: "0.4px",
        },
        body1: {
            fontWeight: 500,
            fontSize: "1rem",
            lineHeight: 1.5,
            letterSpacing: "0.00938em",
        },
        body2: {
            fontWeight: 500,
            fontSize: "0.875rem",
            lineHeight: 1.43,
            letterSpacing: "0.01071em",
        },
        button: {
            fontWeight: 500,
            textTransform: "capitalize",
        },
    },
});

export default theme;