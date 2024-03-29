import Title from '../componts/title'
import React, { useState, useEffect } from "react";
import {  Link, NavLink, useNavigate } from "react-router-dom";
import Loading from "../componts/Loading";
import AlertDialogDemo from "../componts/AlertDemo";


import * as AlertDialog from '@radix-ui/react-alert-dialog';
import '../AlertStyle.css';

const baseImage= window.baseurl + "/images/";
export default function Photos() {

    var [data, setData] = useState(null);
    let componentMounted = true;
    let endpointGitPhotos = window.baseurl + "/photos/get-photos";
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
  
    // nav
      
    const getData = async (page) => {
        setLoading(true);
     
        try {
            
          const response = await fetch(endpointGitPhotos+"?page="+`${page}`);
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
    

      // open image
      const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank')
        if (newWindow) newWindow.opener = null
    }
      
      useEffect(() => {
        getData(1);
      }, []);
    
  //delete item 
  const deleteItem=async(couponId)=>{
  
    var formdata = new FormData();
  formdata.append("couponId", couponId);
  
  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };
  
  fetch(window.baseurl + "/photos/delete-Photo", requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result);
      getData(currentPage);
  
    })
    .catch(error => console.log('error', error));
  }
  return (
    <div>

<Title route={"/addPhoto"} text={"الصور"}/>

<div className="card-body">
  <div className="row">
    
   {data? data.items.map((item) =>{
     return (
        <>
         <div className="col-sm-2">
      {/* <a
        to={item.image} 
        data-toggle="lightbox"
        data-title="sample 1 - white"
        data-gallery="gallery"
      > */}
      <div className="image-style"
      
      >

<AlertDialog.Root>
    <AlertDialog.Trigger asChild>
    <i className="bi bi-x"
      ></i>
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="AlertDialogOverlay" />
      <AlertDialog.Content className="AlertDialogContent">
        <AlertDialog.Title className="AlertDialogTitle">هل أنت متأكد أنك تريد حذف هذه الصورة؟?</AlertDialog.Title>
        {/* <AlertDialog.Description className="AlertDialogDescription">
          This action cannot be undone. This will permanently delete your account and remove your
          data from our servers.
        </AlertDialog.Description> */}
        <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
          <AlertDialog.Cancel asChild>
            <button className="Button mauve">الغــاء</button>
          </AlertDialog.Cancel>
          <AlertDialog.Action onClick={()=>{
            deleteItem(item.id)
          }} asChild>
            <button className="Button red">نعم , أريد </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>

      
      <img
          src={baseImage+item.image}
          className="img-fluid mb-2 "
          alt="white sample"
          onClick={()=>openInNewTab(baseImage+item.image)}
        />

      </div>
     
      
    </div>
   
        </>
       
     )
   }):<Loading/>}

   
  </div>
</div>

{data ? 
   
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
                        
                          console.log(e );
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
        </nav>:<span></span>}
  
    </div>
  )
}
