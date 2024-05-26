import React from 'react';
import { createTheme,MantineProvider, Container, Button,Textarea } from '@mantine/core';
import { ThemeProvider } from "styled-components";
import Home from './screen/HomeScreen/HomeScreen';
import { BrowserRouter, Routes, Route } from "react-router-dom";




function App() {
  return (
   
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
        >

        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />}>
          </Route>
        </Routes>
      </BrowserRouter>
            
          </MantineProvider>

  );
}

export default App;