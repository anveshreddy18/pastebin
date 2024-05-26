import { useEffect, useState } from "react";


function SubmitContent(value,initValue) {
    if (value === initValue) {
      return ;
    }
    else{
      SubmitContent(body)
    }
}

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

function Edit(){
  const hashId = match.params.hash;

  console.log(hashId);

  // create state objects ...
  var initValue
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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
  })

  
    return (
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
        </div>
      );
}

export default Edit