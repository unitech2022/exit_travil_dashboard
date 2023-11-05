import React ,{useEffect , useState} from 'react';
import Loading from '../componts/Loading';

export default function Dashboard() {

  var [data, setData] = useState(null);
 
  const [loading, setLoading] = useState(false);

  let componentMounted = true;
  let endpoint = window.baseurl+"/home/get-home-dash";
  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');








  const getData = async () => {
    setLoading(true);
    try{

      const response = await fetch(endpoint,{ 
        mode:"cors",
        headers: headers});
      console.log(response);
      if (componentMounted) {
       const json=await response.json();
       console.log(json);
        setData(json);
        setLoading(false);
        console.log(data+"تننتؤرتنؤ");
        
       
      }
  
      return () => {
        componentMounted = false;
      };


    }catch(e){
console.log(e+"errror");
    }
   
  };


  useEffect(() => {
     
      getData();
    }, []);



  return (
    <div>
    <div>
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">Dashboard</h1>
            </div>{/* /.col */}
           
          </div>{/* /.row */}
        </div>{/* /.container-fluid */}
      </div>
      {/* /.content-header */}
      {/* Main content */}
      <section className="content">
       {data ?  <div className="container-fluid">
          {/* Small boxes (Stat box) */}
          <div className="row">
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>{data.continents}</h3>
                  <p> القارات</p>
                </div>
                <div className="icon">
                  <i className="ion ion-bag" />
                </div>
              
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>{data.countries}<sup style={{fontSize: 20}}></sup></h3>
                  <p>الدول</p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars" />
                </div>
                
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>{data.cities}</h3>
                  <p>المدن</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add" />
                </div>
                
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>{data.places}</h3>
                  <p>الأماكن السياحية</p>
                </div>
                <div className="icon">
                  <i className="ion ion-pie-graph" />
                </div>
                
              </div>
            </div>
            {/* ./col */}
          </div>
          {/* /.row */}
          {/* Main row */}
         
          {/* /.row (main row) */}
        </div>:<Loading/>}
      </section>
      {/* /.content */}
    </div> 

    
  </div>
  
  )
}

