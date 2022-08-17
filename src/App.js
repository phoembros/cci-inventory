import * as React from "react";
import Router from './routes';
import { BrowserRouter as Routers } from 'react-router-dom';
import { createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  useQuery,
  gql
} from "@apollo/client";
import { AuthContext } from './context/AuthContext'
import { useContext } from "react";
import { setContext } from '@apollo/client/link/context';


function App() {
    //Apollo
    const { state } = useContext(AuthContext);
    const { user } = state;

    console.log(state,'state')  

    const httpLink = createHttpLink({      
        uri: process.env.React_APP_END_POINT,
        // uri: "http://192.168.2.11:4055/graphql",
    });
    
    // 
    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: user ? user?.token : ''
        }
      }
    });
  
    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache()
    });

    
    const [prefersDarkMode,setPrefersDarkMode] = React.useState(false);
    // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');    
    const theme = React.useMemo(
        () =>
        createTheme({
            palette: {
                mode: prefersDarkMode ? 'dark' : 'light',
                background: {
                    default: prefersDarkMode ? '#121212' : "#F8F8F8",
                },
            },
        }),
        [prefersDarkMode],
    );

    return (    
        <>
          <ApolloProvider client={client}>
              <ThemeProvider theme={theme}>
                    <Routers>
                        <Router prefersDarkMode={prefersDarkMode} setPrefersDarkMode={setPrefersDarkMode}/>
                    </Routers>
                    <CssBaseline />
              </ThemeProvider>  
          </ApolloProvider> 
        </>
    );
}

export default App;