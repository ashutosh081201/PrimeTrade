
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // A deep blue
    },
    secondary: {
      main: '#009688', // A vibrant teal for accents
    },
    background: {
      default: '#f5f5f5', // A light gray background
      paper: '#ffffff',   // White for paper elements like cards
    },
  },
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
        fontSize: '2rem',
        fontWeight: 600,
    },
    h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
  },
});

export default theme;
