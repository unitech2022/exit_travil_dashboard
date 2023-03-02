
import React, { useState, useEffect } from "react";
import axios from "axios";
import {  useNavigate,useLocation } from "react-router-dom";
let endpointImage = "https://webapi.exittravel.app/image/upload/image";
const baseImage = "https://webapi.exittravel.app/images/";
export default function AddCity() {

    const location = useLocation();
    // const row = location.state.row;


    var [countries, setCountries] = useState(null);
    let componentMounted = true;
    let endPointAddCity = "cities/add-city";
  
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");

    const [countryId, setCountryId] = useState("");
  
    // nav  router
    const navigate = useNavigate();
    const navigateHome = () => {
      // 👇️ navigate to /
      navigate("/cities");
    };
    //get Countries
    const getData = async () => {
      try {
        const response = await fetch("countries/get-all-countries");
        console.log(response);
        if (componentMounted) {
          const json = await response.json();
          console.log(json);
          setCountries(json);
  
          console.log(countries );
        }
  
        return () => {
          componentMounted = false;
        };
      } catch (e) {
        console.log(e + "errror");
      }
    };
  
    useEffect(() => {
      getData();
      if(location.state !=null){
        const row = location.state.row;

       setTitle(row.title);
      }
    }, []);
  
    /// add country
    const addCity = async (name, imagee) => {
        console.log("add")
      // Using Fetch API
      var formdata = new FormData();
      formdata.append("title", title);
      formdata.append("Image", imagee);
      formdata.append("status", "0");
      formdata.append("countryId", countryId);
  
      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };
  
      fetch(endPointAddCity, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
         
          setFile("");
          navigateHome();
        })
        .catch((error) => console.log("error", error));
    };


    // updateCity
    const updateCity = async (name, imagee) => {
        console.log("update")
        // Using Fetch API
        var formdata = new FormData();
        formdata.append("title", title);
        formdata.append("Image", imagee);
        formdata.append("status", "0");
        formdata.append("countryId", countryId);
        formdata.append("id", location.state.row.id);
        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };
    
        fetch("cities/update-city", requestOptions)
          .then((response) => response.text())
          .then((result) => {
            console.log(result);
           
            setFile("");
            navigateHome();
          })
          .catch((error) => console.log("error", error));
      };


  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if(location.state == null){
        try {
            const formData = new FormData();
            formData.append("file", file);
      
            const resp = await axios
              .post(endpointImage, formData, {
                headers: {
                  "content-type": "multipart/form-data",
                },
              })
              .then((e) => {
                console.log(e.data);
      
                addCity(title, e.data);
              });
          } catch (e) {
            console.log(e);
          }
      }else{
         if(file !=null){
            try {
                const formData = new FormData();
                formData.append("file", file);
          
                const resp = await axios
                  .post(endpointImage, formData, {
                    headers: {
                      "content-type": "multipart/form-data",
                    },
                  })
                  .then((e) => {
                    console.log(e.data);
          
                    updateCity(title, e.data);
                  });
              } catch (e) {
                console.log(e);
              }

         }else {
            updateCity(title, location.state.row.image);
         }
       

      }
     
    };
  
    return (
      <div>
        <form onSubmit={handleSubmit} className="forms">
          <div class="form-group">
            <label className="text-right" for="exampleInputEmail1">
              اسم القرية
            </label>
            <input
              type="text"
              className="form-control text-right"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder=""
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <small id="emailHelp" class="form-text text-muted"></small>
          </div>
         
  
          <div className="form-group">
            <label className="text-right">اختار البلد </label>
            <select
            defaultValue={countries? countries[0].name:""}
              className="custom-select "
              onChange={(event) => {
                var itemName = event.target.value;
                const item = countries.find((obj) => {
                  return obj.name === itemName;
                });
                setCountryId(item.id);
              }}
            >
               <option>اختار البلد</option>
              {countries ? (
                countries.map((item) => {
                  return <option>{item.name}</option>;
                })
              ) : (
                <option>لا توجد قارات</option>
              )}
            </select>
          </div>
  
          {/* image */}
          <div className="image">
            <img
              src={file ? URL.createObjectURL(file) :location.state?baseImage+location.state.row.image : "./assets/photo.jpeg"}
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
        
      </div> 
      );
}
