import Home from "./screen/HomeSceen/HomeScreen";
import { MantineProvider,createTheme } from '@mantine/core';


const theme = createTheme({

  colors: {
      // Define your custom colors here
      primary: '#007bff',
      // Add more color definitions as needed
  },
});

function App() {
  return (
    <MantineProvider 
      withGlobalClasses
      theme={{
        
      }}
    >
          <div >
            <h1>PasteBin</h1>
            <Home/>
          </div>
    </MantineProvider>

  );
}

export default App;
