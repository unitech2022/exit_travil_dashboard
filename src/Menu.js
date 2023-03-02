import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
export default class Menu extends Component {
    render() {
        return (
          <div>
  <aside className="main-sidebar sidebar-dark-primary elevation-4">
    {/* Brand Logo */}
   
    {/* Sidebar */}
    <div className="sidebar">
      {/* Sidebar user panel (optional) */}
      {/* <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
        </div>
        <div className="info">
          <NavLink to="#" className="d-block">Alexander Pierce</NavLink>
        </div>
      </div> */}
       <h1>Exit Travel</h1>
      {/* Sidebar Menu */}
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column"  role="menu" data-accordion="false">
          {/* Add icons to the links using the .nav-icon class
           with font-awesome or any other icon font library */}

           <li className="nav-item">
            <NavLink to="/" className="nav-link">
            <i class="bi bi-house-door-fill"></i>
              <p>
               الرئيسية
               
              </p>
            </NavLink>
          </li>


            <li className="nav-item">
            <NavLink to="/continent" className="nav-link">
            <i class="bi bi-globe-central-south-asia"></i>
              <p>
                القارات
               
              </p>
            </NavLink>
          </li>
          
          <li className="nav-item">
            <NavLink to="/Countries" className="nav-link">
              <i class="bi bi-calendar4"></i>
              <p>
                البلدان 
               
              </p>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/cities" className="nav-link">
              <i class="bi bi-fan"></i>
              <p>
                القري 
              
              </p>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/places" className="nav-link">
            <i class="bi bi-hospital-fill"></i>
              <p>
                الأماكن السياحية 
              </p>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/photos" className="nav-link">
            <i class="bi bi-image-fill"></i>
              <p>
                الصور
              </p>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/videos" className="nav-link">
            <i class="bi bi-camera-video"></i>
              <p>
                الفيديوهات
              </p>
            </NavLink>
          </li>
        </ul>
      </nav>
      {/* /.sidebar-menu */}
    </div>
    {/* /.sidebar */}
  </aside>
</div>

        )
    }
}
