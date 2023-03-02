import React, { useState, useEffect } from "react";
import Title from "../componts/title";
import Loading from "../componts/Loading";
import AlertDialogDemo from "../componts/AlertDemo";
import {  Link, useNavigate } from "react-router-dom";


const baseImage="http://localhost:5010/images/";
export default function Continents() {




  
  const navigate = useNavigate();
  const openProfile = (item) => {
    navigate(`/update/${item.id}/${item.name}/${item.image}`);
  };


//delete item 
const deleteItem=async(couponId)=>{

  var formdata = new FormData();
formdata.append("couponId", couponId);

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch("Continent/delete-continent", requestOptions)
  .then(response => response.text())
  .then(result => {
    console.log(result);
    getData(currentPage);

  })
  .catch(error => console.log('error', error));
}




  var [data, setData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  let componentMounted = true;
  let endpointAdd = "https://webapi.exittravel.app/Continent/get-Continents";


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


    // nav
    
  const getData = async (page) => {
    setLoading(true);
 
    try {
        
      const response = await fetch(endpointAdd+"?page="+`${page}`);
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
        <Title route={"/add"} text={"القارات"} />

        {data ? (
          <div className="orders">
            <table className="responsive-table">
              <thead>
                <td>#ID</td>
                <td>اسم القارة </td>
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
                      <td>{item.name}</td>
                      <td>{item.status}</td>
                      <td>
                        <img src={baseImage+item.image} alt="" />
                      </td>
                      <td>
                      

                         
                        <button 
                         className="btn-desc"> <Link className="link"
                         to={"/update"}
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



      {/* dialog */}

      </div>
    
  );
}
