import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
let endpointImage = "image/upload/image";
const baseImage = "https://webapi.exittravel.app/images/";
const languages = ["English", "Arabic", "France", "Span", "Protogale"];

export default function UpdateCountry() {

 //get data


 const location = useLocation();
 const row = location.state.row;

    var [continents, setContinents] = useState(null);
    let componentMounted = true;
    let endPointUpdateCountry = window.baseurl+"/countries/update-country";
  
    const [file, setFile] = useState(null);
    const [name, setName] = useState("");
    const [currency, setCurrency] = useState("");
    const [language, setLanguage] = useState("");
    const [capital, setCapital] = useState("");
    const [continentId, setContinentId] = useState("");
  
    // nav  router
    const navigate = useNavigate();
    const navigateHome = () => {
      // 👇️ navigate to /
      navigate("/Countries");
    };
    //get Countries
    const getData = async (page) => {
      try {
        const response = await fetch("Continent/get-Continents-all");
        console.log(response);
        if (componentMounted) {
          const json = await response.json();
          console.log(json);
          setContinents(json);
  
          console.log(continents);
        }
  
        return () => {
          componentMounted = false;
        };
      } catch (e) {
        console.log(e + "errror");
      }
    };
  
    useEffect(() => {
        console.log(row.image+"datatat");
        setName(row.name);
        setCurrency(row.currency);
        setCapital(row.capital);
        setLanguage(row.language);
      
       
      getData();
      
    }, []);
  
    /// add country
    const updateCountry = async (name, imagee) => {
      // Using Fetch API
      var formdata = new FormData();
      formdata.append("Name", name);
      formdata.append("Image", imagee);
      formdata.append("status", "0");
      formdata.append("currency", currency);
      formdata.append("capital", capital);
      formdata.append("language", language);
      formdata.append("continentId", continentId);
      formdata.append("id",row.id);


      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };
  
      fetch(endPointUpdateCountry, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          setName("");
          setFile("");
          navigateHome();
        })
        .catch((error) => console.log("error", error));
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
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
  
            updateCountry(name, e.data);
          });
      } catch (e) {
        console.log(e); 
      }
}else {

    updateCountry(name, row.image);
}

     
    };
  
    return (
      <div>
        <form onSubmit={handleSubmit} className="forms">
          <div class="form-group">
            <label className="text-right" for="exampleInputEmail1">
              اسم البلد
            </label>
            <input
              type="text"
              className="form-control text-right"
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
          {/* currency */}
          <div class="form-group">
            <label className="text-right" for="exampleInputEmail1 ">
              العملة{" "}
            </label>
            <input
              type="text"
              className="form-control text-right"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={currency}
              placeholder=""
              onChange={(event) => {
                setCurrency(event.target.value);
              }}
            />
            <small id="emailHelp" class="form-text text-muted"></small>
          </div>
  

    {/* capital */}
    <div class="form-group">
            <label className="text-right" for="exampleInputEmail1 ">
              العاصمة{" "}
            </label>
            <input
              type="text"
              className="form-control text-right"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={capital}
              placeholder=""
              onChange={(event) => {
                setCapital(event.target.value);
              }}
            />
            <small id="emailHelp" class="form-text text-muted"></small>
          </div>
          {/* lang */}
  
            {/* lang */}
{/* 
        <div className="form-group">
          <label className="text-right">اختاراللغة </label>
          <select
            className="custom-select "
           
            onChange={(event) => {
              var lang = event.target.value;

              setLanguage(lang);
            }}
          >
             <option>اختار اللغة</option>
            {languages.map((item) => {
              return <option>{item}</option>;
            })}
          </select>
        </div> */}
      <div class="form-group">
          <label className="text-right" for="exampleInputEmail1 ">
          اللغة{" "}
          </label>
          <input
            type="text"
            value={language}
            className="form-control text-right"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder=""
            onChange={(event) => {
              setLanguage(event.target.value);
            }}
          />
          <small id="emailHelp" class="form-text text-muted"></small>
        </div>
  
          <div className="form-group">
            <label className="text-right">اختار القارة </label>
            <select
            defaultValue={continents?continents[0].name:"أفريقيا"}
              className="custom-select "
              onChange={(event) => {
                var itemName = event.target.value;
                const item = continents.find((obj) => {
                  return obj.name === itemName;
                });
                setContinentId(item.id);
              }}
            >
               <option>اختار القارة</option>
              {continents ? (
                continents.map((item) => {
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
              src={file ? URL.createObjectURL(file) : baseImage+row.image}
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
  )
}
