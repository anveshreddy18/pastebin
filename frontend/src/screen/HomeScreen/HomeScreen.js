import { Textarea,Button,Container,Loader } from '@mantine/core';
import { useState } from 'react';
import { useNavigate,useLocation } from "react-router-dom";
import styled from "styled-components";


// how to make the page loading while posting this record....
// so, okay do this way make the page loading for 10 sec when clicked on submit ..
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


function Home() {
  // use state object to maintain the state to the text area.
  const [value,setValue] = useState('') ;
  const [isLoading, setIsLoading] = useState(false);

  // capture location ..
  const {pathname} = useLocation();
  const navigate = useNavigate();

  // TODO: validate the body before making the api-call like:
  // 1. Atleast some content should be present over there ..

  async function SubmitContent(body){

    try{

      setIsLoading(true)
      const res = await fetch("http://localhost:8080/submit",{
        method:"POST",
        body:JSON.stringify(body)
      });

      const respBody = await res.json()

      // assuming respBody contains hash field.
      // get the hash from respBody ..
      // route to the edit page /:hash ... 
      const hash =respBody.hash;
      navigate("/"+hash);

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