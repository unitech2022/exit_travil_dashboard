import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { OnInput, baseUrl, onInputInvalid } from "../Constans";
let endpointImage = baseUrl+"/image/upload/image";
const baseImage = baseUrl+"/images/";

const AddPlace = () => {
  const location = useLocation();
  // const row = location.state.row;

  var [countries, setCountries] = useState(null);
  var [cities, setCities] = useState(null);
  let componentMounted = true;
  let endPointAddPlace =baseUrl + "/places/add-place";

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [order, setOrder] = useState("");
  const [latLng, setLatLng] = useState();

  const [address, setAddress] = useState();
  const [cityId, setCityId] = useState("");
  const [countryId, setCountryId] = useState("");
  const [checked, setChecked] = React.useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };

  // nav  router
  const navigate = useNavigate();
  const navigateHome = () => {
    // 👇️ navigate to /
    navigate("/places");
  };
  //get Countries
  const getCountries = async () => {
    try {
      const response = await fetch(window.baseurl+"/countries/get-all-countries");
      console.log(response);
      if (componentMounted) {
        const json = await response.json();
        console.log(json);
        setCountries(json);

        console.log(countries);
      }

      return () => {
        componentMounted = false;
      };
    } catch (e) {
      console.log(e + "errror");
    }
  };

  const getCities = async (catId) => {
    setCities([])
    try {
      const response = await fetch(
        window.baseurl+ "/cities/git-cities-byCountryId-admin" + "?continentId=" + `${catId}`
      );
      console.log(response);
      if (componentMounted) {
        const json = await response.json();
        console.log(json);
        setCities(json);

        console.log(countries);
      }

      return () => {
        componentMounted = false;
      };
    } catch (e) {
      console.log(e + "errror");
    }
  };

  useEffect(() => {
    getCountries();
    if (location.state != null) {
      const row = location.state.row;

      setTitle(row.title);
      setDesc(row.desc);
      setOrder(row.order);
      setAddress(row.addressName);
      setLatLng(row.latLng);
      setChecked(row.isMostPopular);
    }
  }, []);

  /// add country
  const addPlace = async (name, imagee) => {
    console.log("add");
    // Using Fetch API
    var formdata = new FormData();
    formdata.append("title", title);
    formdata.append("Image", imagee);
    formdata.append("status", "0");
    formdata.append("LatLng", latLng);
   
    formdata.append("AddressName", address);
    formdata.append("isMostPopular", checked);
    formdata.append("Desc", desc);
    formdata.append("order", order);
    formdata.append("CountryId", countryId);
    formdata.append("CityId", cityId);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(endPointAddPlace, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);

        setFile("");
        navigateHome();
      })
      .catch((error) => console.log("error", error));
  };

  // updateCity
  const updatePlace = async (name, imagee) => {
    console.log("update");
    // Using Fetch API
    var formdata = new FormData();
    formdata.append("title", title);
    formdata.append("Image", imagee);
    formdata.append("status", "0");
    formdata.append("Desc", desc);
    formdata.append("LatLng", latLng);
    formdata.append("isMostPopular", checked);
    formdata.append("AddressName", address);
    formdata.append("order", order);
    formdata.append("CountryId", countryId);
     formdata.append("CityId", cityId);
    formdata.append("id", location.state.row.id);
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(window.baseurl+"/places/update-place", requestOptions)
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
    if (location.state == null) {
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

            addPlace(title, e.data);
          });
      } catch (e) {
        console.log(e+"djdjdjdjdjd");
      }
    } else {
      if (file != null) {
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

             updatePlace(title, e.data);
            });
        } catch (e) {
          console.log(e);
        }
      } else {
         updatePlace(title, location.state.row.image);
      }
    }
  };

  return (
    <div >
      <div className="d-flex justify-content-center m-3" >
        <form onSubmit={handleSubmit} >
          <div>
            <label className="text-right" for="exampleInputEmail1">
              اسم المكان
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

          {/* desc */}
         
            {/* textarea */}
            <div>
              <label className="text-right">تفاصيل المكان</label>
              <textarea
                className="form-control text-right"
                value={desc}
                onChange={(event)=>{
                    setDesc(event.target.value);
                }}
                rows={3}
                placeholder="اكتب التغاصيل "
                defaultValue={""}
              />
            </div>
            <br />
            {/* address */}
            <div>
                 <label className="form-label text-right"> العنوان</label>
                  <input onInvalid={onInputInvalid}
                  value={address}
                  onChange={(event)=>{
                    setAddress(event.target.value);
                }}
                    onInput={OnInput} required autoComplete="off" name="Name" type="text" className="form-control" />
                  <span asp-validation-for="Name" className="text-danger" />
                 </div>
                 <br />
                 <div>
                 <label className="form-label text-right">(Latitude)خط العرض , (Longitude)خط الطول</label>
                 
                  <input onInvalid={onInputInvalid}
                  value={latLng}
                  
                  onChange={(event)=>{
                    setLatLng(event.target.value);
                }}
                    onInput={OnInput} required autoComplete="off" name="Name" type="text" className="form-control" />
                  <span asp-validation-for="Name" className="text-danger" />
                 </div>
               
        

                
      
          {/* countries */}
          <div className="form-group">
            <label className="text-right">اختار البلد </label>
            <select
              defaultValue={countries ? countries[0].name : ""}
              className="custom-select "
              onChange={(event) => {
                var itemName = event.target.value;
                const item = countries.find((obj) => {
                  return obj.name === itemName;
                });
                console.log(item.id+"countryId")
                setCountryId(item.id);
                getCities(item.id);
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
          {/* cities */}
          <div className="form-group">
            <label className="text-right">اختار القرية </label>
            <select
              defaultValue={countries ? countries[0].name : ""}
              className="custom-select "
              onChange={(event) => {
                var itemName = event.target.value;
                const item = cities.find((obj) => {
                  return obj.title === itemName;
                });
                setCityId(item.id);
                console.log(item.id+"cityId")
              }}
            >
              <option>اختار القرية</option>
              {cities ? (
                cities.map((item) => {
                  return <option>{item.title}</option>;
                })
              ) : (
                <option>لا توجد قارات</option>
              )}
            </select>
          </div>

          <div className="form-group">
              <label className="text-right">ترتيب المكان</label>
              <input
              type="number"
                className="form-control text-right"
                value={order}
                onChange={(event)=>{
                    setOrder(event.target.value);
                }}
                rows={3}
                placeholder="اختار الترتيب"
                defaultValue={""}
              />
            </div>
         
            <div>
      <label>
        <input className="m-2"
          type="checkbox"
          width={100}
          height={100}
          checked={checked}
          onChange={handleChange}
        />
        تصنيف ضمن الأكثر زيارة
      </label>

    
    </div>

          {/* image */}
          <div className="image text-center m-1">
            <img
            width={100}
            height={100}
              src={
                file
                  ? URL.createObjectURL(file)
                  : location.state
                  ? baseImage + location.state.row.image
                  : "./assets/photo.jpeg"
              }
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
    </div>
  );
};

export default AddPlace;
