import React from 'react';
import { createTheme,MantineProvider, Container, Button,Textarea } from '@mantine/core';
import { ThemeProvider } from "styled-components";
import Home from './screen/HomeScreen/HomeScreen';



function App() {
  return (
   
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
        >
                <Container>
                  <h1>Hurray !! Pastebin here :)</h1>
                    <Home/>
                </Container>
          </MantineProvider>

  );
}

export default App;