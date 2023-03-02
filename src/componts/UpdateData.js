import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate,useLocation } from "react-router-dom";

const baseImage = "http://localhost:5010/images/";

const UpdateData = () => {
    
    let endpointImage = "image/upload/image";
    let updateEndPoint = "Continent/update-continent";



  //get data


  const location = useLocation();
  const row = location.state.row;


  // nav  router
  const navigate = useNavigate();
  const navigateHome = () => {
    // 👇️ navigate to /
    navigate("/continent");
  };

 

  const [file, setFile] = useState(null);

  const [status, setStatus] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
  setName(row.name);
    // console.log(imageItem);
    console.log(row.name +" . " +file + row.id +endpointImage);
  }, []);

  const updateData = async ( image) => {
    console.log(image);

    // Using Fetch API
    var formdata = new FormData();
    formdata.append("Name", name);
    formdata.append("Image", image);
    formdata.append("Id", row.id);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(updateEndPoint, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("error", "susss")
        setName("");
        setFile("");
        navigateHome();
      })
      .catch((error) => console.log("error", error));
  };

  const handleSubmit = async (event) => {
 
    setStatus(""); 
    event.preventDefault();
   // Reset status
    if(file != null){
        try{

            const formData = new FormData();
            formData.append("file", file);
         
            const resp = await axios.post(endpointImage, formData, {
              headers: {
                "content-type": "multipart/form-data",
             
              },
            }).then((e) =>{
              console.log(e.data);
                
              updateData(e.data);
               
                
        
            });
            setStatus("thanks");
           }catch (e){
            console.log(e);
           }
    }else{
        updateData(row.image);
    }
    


    // var formdata = new FormData();
    // formdata.append("file", file, "file");
    
    // var requestOptions = {
    //   method: 'POST',
    //   body: formdata,
    //   headers: {
    //     'Accept': 'application/json'
    // },
    //   redirect: 'follow'
    // };
    // try{
    //     const response = await fetch(endpointImage,
    //     requestOptions);
    //     const json = await response.json();
    //     console.log(json);
    // }catch(e){
    //     console.log(e);
    // }
   

  
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
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <small id="emailHelp" class="form-text text-muted"></small>
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
            src={file ? URL.createObjectURL(file) : baseImage + row.image}
            alt=""
          />
        </div>
        <div class="custom-file">
          <input
            type="file"
            class="custom-file-input"
            id="customFile"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label class="custom-file-label" for="customFile">
            {file ? "تم اختيار الصورة " : "اختار الصورة  "}
          </label>
        </div>

        <button type="submit" class="btn-submit">
          اضافة
        </button>
      </form>
      {/* <h1>{nameItem ? nameItem : "noooo"}</h1> */}
    </div>
  );
};

export default UpdateData;
