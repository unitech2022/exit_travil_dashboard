import "./App.css";
import Header from "./Header";
import Menu from "./Menu";
import Dashboard from "./pages/Dashboard";
import Footer from "./Footer";
import { Route, Routes } from "react-router-dom";
import Continents from "./pages/Continents";
import Countries from "./pages/Countries";
import Cities from "./pages/Cities";
import Places from "./pages/Places";
import AdddData from "./pages/AddData";
import AddData from "./pages/AddData";
import UpdateData from "./componts/UpdateData";
import AddCountry from "./pages/AddCountry";
import UpdateCountry from "./pages/UpdateCountry";
import AddCity from "./pages/AddCity";
import AddPlace from "./pages/AddPlace";
import Photos from "./pages/Photos";
import AddPhoto from "./pages/AddPhoto";
import Videos from "./pages/VideosPage/VideosPage";
import AddVideo from "./pages/VideosPage/AddVideo";
import MostCities from "./pages/MostCities";
import MostPlaces from "./pages/MostPlaces";
function App() {
  // https://webapi.exittravel.app
  // window.baseurl = "https://webapi.exittravel.app"
  window.baseurl = "http://localhost:5010"
 
  return (
    <div class="wrapper">
      <Header />
     
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/continent" element={<Continents />} />
          <Route path="/Countries" element={<Countries />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/places" element={<Places />} />
          <Route path="/add" element={<AddData />} />
          <Route path="/update" element={<UpdateData />} />
          <Route path="/addCountry" element={<AddCountry />} />
          <Route path="/updateCountry" element={<UpdateCountry />} />
          <Route path="/addCity" element={<AddCity />} />
          <Route path="/addPlace" element={<AddPlace />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/addPhoto" element={<AddPhoto />} />
          <Route path="/videos" element={<Videos/>} />
          <Route path="/addVideo" element={<AddVideo/>} />
          <Route path="/mostCities" element={<MostCities/>} />
          <Route path="/mostPlaces" element={<MostPlaces/>} />
          
          
        </Routes>
      </div>
      <Menu />
      {/* <Footer/> */}
    </div>
  );
}

export default App;
