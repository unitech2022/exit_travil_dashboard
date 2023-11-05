
import Title from '../componts/title'
import React, { useState, useEffect } from "react";
import {  Link, NavLink, useNavigate } from "react-router-dom";
import Loading from "../componts/Loading";
import AlertDialogDemo from "../componts/AlertDemo";
import { baseUrl } from '../Constans';
const baseImage= baseUrl+"/images/";
const MostPlaces = () => {
    var [data, setData] = useState(null);
    let componentMounted = true;
    let endpointGitPlaces =  window.baseurl+"/places/git-places-most-popular";
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
  
  
  
  
  
    
    const navigate = useNavigate();
  
    const nextPage = (nPages ) => {
        if(currentPage !== nPages) {
           var page= currentPage + 1;
            getData(page)
            setCurrentPage(currentPage+1);
        }
}
const prevPage = () => {
    if(currentPage !== 1) {
        var page= currentPage - 1;
        getData(page)
        setCurrentPage(currentPage-1);

      
    }
}
  
  //delete item 
  //delete item 
  const deleteItem=async(couponId)=>{
  
    var formdata = new FormData();
  formdata.append("couponId", couponId);
  
  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };
  
  fetch(window.baseurl+"/places/delete-place", requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result);
      getData(currentPage);
  
    })
    .catch(error => console.log('error', error));
  }
  
  
  
  
  
  
  
  
   
  
      // nav
      
    const getData = async (page) => {
      setLoading(true);
   
      try {
          
        const response = await fetch(endpointGitPlaces);
        console.log(response);
        if (componentMounted) {
          const json = await response.json();
          console.log(json);
          setData(json);
          
          setLoading(false);
          console.log(data + "تننتؤرتنؤ");
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
    }, []);
  


  return (
    <div className="continent">
 
    <Title route={"/addPlace"} text={"الأماكن السياحية الأكثر زيارة"}/>

    {data ? (
          <div className="orders">
            <table className="responsive-table">
              <thead>
                <td>#ID</td>
                <td>اسم المكان </td>
                <td>الحالة</td>
                <td>الصورة</td>
                <td>التعديل</td>
                <td>الحذف</td>
              </thead>
              <tbody>
                {data.map((item) => {
                  return (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.status}</td>
                      <td>
                        <img src={baseImage+item.image} alt="" />
                      </td>
                      <td>
                      

                         
                        <button 
                         className="btn-desc"> <Link className="link"
                         to={"/addPlace"}
                          state={{
                          row: item,
                        }}>تعديل</Link></button>
                      </td>
                      <td>
                      <AlertDialogDemo 
                      onConfirm={()=>{
                        deleteItem(item.id);
                      }}
                      />
                      </td>


                      
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <nav>
      
        </nav>
          </div>
        ) : (
          <Loading />
        )}
   
 
 </div>
  )
}
 
export default MostPlaces;