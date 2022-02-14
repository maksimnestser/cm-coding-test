import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  palette: {
    text: {
      primary: "#4b4b4b",
      secondary: "#555555",
    },
    primary: {
      main: "#2a7bab",
      dark: "#01619b",
    },
  },
});

export const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />;
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
