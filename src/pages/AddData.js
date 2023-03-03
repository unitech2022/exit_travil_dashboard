import React ,{useState,useEffect} from "react";
import axios from "axios";
import {useParams, useNavigate} from 'react-router-dom';



const AddData = () => {

//get data 
const { id } = useParams();

// nav  router
const navigate = useNavigate();
  const navigateHome = () => {
    // 👇️ navigate to /
    navigate('/continent');
  };


  let endpointImage = window.baseurl+"/image/upload/image";
  let endpointAdd = window.baseurl+"/Continent/add-continent";
  
  const [file, setFile] = useState(null);

  const [status, setStatus] = useState("");
  const [name, setName] = useState('');
 
  useEffect(() => {
    
  console.log(id)
    
  }, []);
  

  const addData= async(name  ,imagee)=>{

// Using Fetch API
var formdata = new FormData();
formdata.append("Name", name);
formdata.append("Image",imagee);


var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};



fetch(endpointAdd, requestOptions)
  .then(response => response.text())
  .then(result =>{
   console.log(result)
setName("");
setFile("");
navigateHome();
  })
  .catch(error => console.log('error', error));
  }




  const handleSubmit = async (event) => {
   
    setStatus(""); // Reset status
    event.preventDefault();
   try{

    const formData = new FormData();
    formData.append("file", file);
 
    const resp = await axios.post(endpointImage, formData, {
      headers: {
        "content-type": "multipart/form-data",
     
      },
    }).then((e) =>{
      console.log(e.data);
        
       
          addData(name, e.data);

    });
    setStatus("thanks");
   }catch (e){
    console.log(e);
   }
  };







  return (
    <div>
      <form onSubmit={handleSubmit} className="forms">
        <div class="form-group">
          <label for="exampleInputEmail1">اسم القارة</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder=""
            onChange={(event)=>{
              setName(event.target.value);
            }}
          />
          <small id="emailHelp" class="form-text text-muted">
           
          </small>
        </div>
        {/* <div class="form-group">
          <label for="exampleInputPassword1">تفاصيل</label>
          <textarea
            type="text"
            class="form-control"
            id="exampleInputPassword1"
            rows="4"
            placeholder=""
            onChange={(event)=>{
              setDesc(event.target.value);

            }}
          />
        </div> */}
 <div className="image">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  
                  : "./assets/photo.jpeg"
              }
              alt=""
            />
          </div>
        <div class="custom-file">
          <input type="file" class="custom-file-input" id="customFile"
         onChange={(e) => setFile(e.target.files[0]) } 
          />
          <label class="custom-file-label" for="customFile">
           {file ? "تم اختيار الصورة ":"اختار الصورة  "}
          </label>
        </div>

        <button type="submit" class="btn-submit">
          اضافة
        </button>

       
      </form>
 
    </div>
  );
};

export default AddData;
