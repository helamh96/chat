import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#181c4d',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });

export default theme