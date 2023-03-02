import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Title({text ,route }) {
  return (
    <div className="title">
       <h4>{text}</h4>
       <NavLink to={route} className="btn-add">
       <i className="fas fa-solid fa-plus"></i>
        <h3>اضافة</h3>
       </NavLink>
  </div>
  )
}
