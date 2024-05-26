import { Textarea,Button,Container } from '@mantine/core';
import { useState } from 'react';
import styled from "styled-components";


async function SubmitContent(body){

  try{
    const res = await fetch("http://localhost:8080/submit",{
      method:"POST",
      body:JSON.stringify(body)
    });
  }
  catch(err){
      console.log(err);
  }
  
}

function Home() {
  // use state object to maintain the state to the text area.
  const [value,setValue] = useState('') ;
  // console.log(value)
    return (
        <Container>
          <h1>Hurray !! Pastebin here :)</h1>
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
        </div>
        </Container>
      );
}

export default Home;