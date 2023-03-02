import Title from '../componts/title'
import React, { useState, useEffect } from "react";
import {  Link, NavLink, useNavigate } from "react-router-dom";
import Loading from "../componts/Loading";
import AlertDialogDemo from "../componts/AlertDemo";
const baseImage="https://webapi.exittravel.app/images/";



export default function Places() {

    var [data, setData] = useState(null);
    let componentMounted = true;
    let endpointGitPlaces = "https://webapi.exittravel.app/places/get-places";
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
  
  fetch("https://webapi.exittravel.app/places/delete-place", requestOptions)
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
          
        const response = await fetch(endpointGitPlaces+"?page="+`${page}`);
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
 
    <Title route={"/addPlace"} text={"الأماكن السياجية"}/>

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
                {data.items.map((item) => {
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
            <ul className='pagination justify-content-center'>
                <li className="page-item">
                    <button className="page-link" 
                        onClick={prevPage} 
                        href='#'>
                        
                        Previous
                    </button>
                </li>
                {Array.from({length: data.totalPages}, (_, index) => index + 1).map((e)=> {
                    
                  return  (
                    <li key ={e} 
                        className= {`page-item ${currentPage == e  ? 'active' : ''} `} >

                        <button onClick={() =>{
                         
                       
                         setCurrentPage(e)
                        
                          console.log(e + " / " +currentPage);
                           getData(e)
                       
                       
                         

                        }}  
                            className='page-link' 
                            href='#'>
                            
                            {e}
                        </button>
                    </li>
                )})}
                <li className="page-item">
                    <button className="page-link" 
                        onClick={()=>{nextPage(data.totalPages)}}
                        href='#'>
                        
                        Next
                    </button>
                </li>
            </ul>
        </nav>
          </div>
        ) : (
          <Loading />
        )}
   
 
 </div>
  )
}

