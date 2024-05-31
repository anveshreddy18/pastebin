import { useEffect, useState } from "react";
import { useDisclosure } from '@mantine/hooks';
import {Container,Textarea,Button,Loader,Modal} from '@mantine/core'
import { useParams ,useNavigate} from "react-router-dom";


function Edit(){

  const navigate = useNavigate();
  const {hash} = useParams()

  console.log(hash);

  // create state objects ...
  var initValue
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);



  async function SubmitContent(body){
    if (value === initValue) {
      console.log("No changes made to content...")
    }
    else{
      try{
        setIsLoading(true);
        const res = await fetch("http://localhost:8080/submit",{
          method:"POST",
          body:JSON.stringify(body)
        });

        const respBody = await res.json()

        // assuming respBody contains hash field.
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
  }


  async function DeleteContent(){
    try{
      setIsLoading(true);
      const res = await fetch('http://localhost:8080/delete/'+hash,{
        method: "DELETE",
      })
    }
    catch(e){
      console.log("Error deleting the data:", e);
    }
    finally{
      setIsLoading(false)
      navigate("/");
    }
  }

  useEffect(()=>{
    const dofetch = async ()=>{
      try{
        const resBody =  await fetch('http://localhost:8080/'+hash,{
          method: "GET",
        })

        const res = await resBody.json();
        initValue = res
        setValue(res);
        setIsLoading(false);
      }
      catch(e){
        console.log("Error fetching the data:",e);
        setIsLoading(false);
        navigate('/not-found')
      }
    }

    dofetch();
  },[])

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
          <Button variant="filled" onClick={()=>SubmitContent(value,initValue)}>
             Submit
          </Button>
          <div>
          <Modal opened={opened} onClose={close} withCloseButton={false}>
            Do you want to delete the below paste ...
            <Button variant="Light" onClick={close}>
              No
            </Button>
            <Button variant="light" color="red" onClick={()=>{DeleteContent()}}>
               Yes
            </Button>
          </Modal>
            <Button variant="light" color="red" onClick={open}>
              Delete
            </Button>
          </div>
          
        </div>
        </div>:
        <Loader color="blue" />
        }
     </Container>
      );
}

export default Edit;