import { Textarea,Button,Container,Loader } from '@mantine/core';
import { useState } from 'react';
import styled from "styled-components";


// how to make the page loading while posting this record....

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


// so, okay do this way make the page loading for 10 sec when clicked on submit ..
function Home() {
  // use state object to maintain the state to the text area.
  const [value,setValue] = useState('') ;
  const [isLoading, setIsLoading] = useState(false);


  async function SubmitContent(body){

    try{
      setIsLoading(true)
      const res = await fetch("http://localhost:8080/submit",{
        method:"POST",
        body:JSON.stringify(body)
      });
      
    }
    catch(err){
        console.log(err);
    }
    finally{
      setIsLoading(false)
    }
    
  }

  // console.log(value)
    return (
        <Container>
          <h1>Hurray !! Pastebin here :)</h1>
          {!isLoading ? 
                    <div>
                    <Textarea
                      variant="filled"
                      size="xl"
                      description="Paste and share your content !!!"
                      placeholder="Write your content here"
                      value={value}
                      onChange={event=>setValue(event.currentTarget.value)}
                    />
                  <div>
                    <Button variant="filled" onClick={()=>SubmitContent(value)}>
                       Submit
                    </Button>
                  </div>
                  </div>: 
                  <Loader color="blue" />
        }
        </Container>
      );
}

export default Home;