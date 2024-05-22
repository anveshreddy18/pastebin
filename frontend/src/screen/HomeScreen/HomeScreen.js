import { Textarea,Button } from '@mantine/core';


function Home() {
    return (
        <div>
        <Textarea
          variant="filled"
          size="xl"
          description="Paste and share your content !!!"
          placeholder="Input placeholder"
        />
        <Button variant="outline">Submit</Button>
        </div>
      );
}


export default Home;