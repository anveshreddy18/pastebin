import React from 'react';
import { createTheme,MantineProvider, Container, Button,Textarea } from '@mantine/core';
import { ThemeProvider } from "styled-components";
import Home from './screen/HomeScreen/HomeScreen';
import Edit from './screen/EditScreen/EditScreen';
import Error from './screen/ErrorScreen/ErrorScreen';
import { BrowserRouter, Routes, Route } from "react-router-dom";




function App() {
  return (
   
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
        >

        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/:hash" element={<Edit/> }></Route>
            <Route element={<Error/>}></Route>
            <Route path='/not-found' element={<Error/>}></Route>
        </Routes>
      </BrowserRouter>
            
          </MantineProvider>

  );
}

export default App;