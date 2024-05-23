import { Textarea,Button,Container } from '@mantine/core';
import styled from "styled-components";


function Home() {
    return (
        <div>
          <Textarea
            variant="filled"
            size="xl"
            description="Paste and share your content !!!"
            placeholder="Write your content here"
          />
        <div>
          <Button variant="filled" >
             Submit
          </Button>
        </div>
        </div>
      );
}

export default Home;