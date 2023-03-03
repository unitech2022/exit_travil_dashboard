import React ,{useState,useEffect} from "react";
import axios from "axios";
import {useParams, useNavigate} from 'react-router-dom';

const AddPhoto = () => {

  var [places, setPlaces] = useState(null);
  let componentMounted = true;
  var [cities, setCities] = useState(null);
    let endpointImage = window.baseurl+"/image/upload/image";
    let endpointAdd = window.baseurl+"/photos/add-Photo";
    
    const [file, setFile] = useState(null);
    const [placeId, setPlaceId] = useState("");
    const [cityId, setCityId] = useState("");
    const [status, setStatus] = useState("");


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
            
           
              addData(e.data);
    
        });
        setStatus("thanks");
       }catch (e){
        console.log(e);
       }
      };
      const navigate = useNavigate();
      const navigateHome = () => {
        // 👇️ navigate to /
        navigate('/photos');
      };
    
      useEffect(() => {
        getCities();
        
      }, []);
      const getCities = async () => {
        try {
          const response = await fetch( window.baseurl+"/cities/get-all-cities");
          console.log(response);
          if (componentMounted) {
            const json = await response.json();
            console.log(json);
            setCities(json);
    
            console.log(cities);
          }
    
          return () => {
            componentMounted = false;
          };
        } catch (e) {
          console.log(e + "errror");
        }
      };
    
      const getPlaces = async (catId) => {
        setPlaces([])
        try {
          const response = await fetch(
            window.baseurl+"/places/git-places-by-city-Id-admin" + "?cityId=" + `${catId}`
          );
          console.log(response);
          if (componentMounted) {
            const json = await response.json();
            console.log(json);
            setPlaces(json);
    
            console.log(places);
          }
    
          return () => {
            componentMounted = false;
          };
        } catch (e) {
          console.log(e + "errror");
        }
      };

      const addData= async( imagee)=>{

        // Using Fetch API
        var formdata = new FormData();
        formdata.append("Image", imagee);
        formdata.append("cityId", cityId);
        formdata.append("type", "0");
        formdata.append("placeId", placeId);
        
        
        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };
        
        
        
        fetch(endpointAdd, requestOptions)
          .then(response => response.text())
          .then(result =>{
           console.log(result)
       
        setFile("");
        navigateHome();
          })
          .catch(error => console.log('error', error));
          }
    return (
        <div>
             <div>
      <form onSubmit={handleSubmit} className="forms">

        {/* countries */}
        <div className="form-group">
            <label className="text-right">اختار القرية  </label>
            <select
              defaultValue={cities ? cities[0].title : ""}
              className="custom-select "
              onChange={(event) => {
                var itemName = event.target.value;
                const item = cities.find((obj) => {
                  return obj.title === itemName;
                });
                console.log(item.id+"countryId")
                setCityId(item.id);
                getPlaces(item.id);
              }}
            >
              <option>اختار القرية</option>
              {cities ? (
                cities.map((item) => {
                  return <option>{item.title}</option>;
                })
              ) : (
                <option>لا توجد قرى</option>
              )}
            </select>
          </div>
          {/* places */}
          <div className="form-group">
            <label className="text-right">اختار المكان </label>
            <select
              defaultValue={"اختار المكان"}
              className="custom-select "
              onChange={(event) => {
                var itemName = event.target.value;
                const item = places.find((obj) => {
                  return obj.title === itemName;
                });
                setPlaceId(item.id);
                console.log(item.id+"cityId")
              }}
            >
              <option>اختار المكان</option>
              {places ? (
                places.map((e) => {
                  return <option>{e.title}</option>;
                })
              ) : (
                <option>لا توجد اماكن</option>
              )}
            </select>
          </div>
    
 {/* image */}
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
        <div className="custom-file">
          <input type="file" className="custom-file-input" id="customFile"
         onChange={(e) => setFile(e.target.files[0]) } 
          />
          <label className="custom-file-label" for="customFile">
           {file ? "تم اختيار الصورة ":"اختار الصورة  "}
          </label>
        </div>

        <button type="submit" className="btn-submit">
          اضافة
        </button>

       
      </form>
 
    </div>
        </div>
    );
}

export default AddPhoto;
