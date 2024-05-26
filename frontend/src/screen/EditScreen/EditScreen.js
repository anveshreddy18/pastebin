import { useEffect, useState } from "react";


function Edit(){
  const hashId = match.params.hash;

  console.log(hashId);

  // create state objects ...
  var initValue
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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
        
      }
      catch(err){
          console.log(err);
      }
      finally{
        setIsLoading(false)
      }
    }  
  }

  useEffect(()=>{
    dofetch = async ()=>{
      try{
        const resBody =  await fetch('http://localhost:8080/${hashId}',{
          method: "Get",
        })

        const res = await resBody.json();
        initValue = res
        setValue(res);
        setIsLoading(false);
      }
      catch(e){
        console.log("Error fetching the data:",e);
        setIsLoading(false);
      }
    }

    dofetch();
  },[])

    return (
      <div>
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
        </div>
        </div>:
        <Loader color="blue" />
        }
      </div>
      );
}

export default Edit