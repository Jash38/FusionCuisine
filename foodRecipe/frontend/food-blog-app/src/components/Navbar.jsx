import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import InputForm from './InputForm'
import { NavLink } from 'react-router-dom'

export default function Navbar({ onSearch }) {
  const [isOpen, setIsOpen] = useState(false)
  let token = localStorage.getItem("token")
  const [isLogin, setIsLogin] = useState(token ? false : true)
  let user = JSON.parse(localStorage.getItem("user"))
  const [searchText, setSearchText] = useState("")

  useEffect(() => {
    setIsLogin(token ? false : true)
  }, [token])

  const checkLogin = () => {
    if (token) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setIsLogin(true)
    } else {
      setIsOpen(true)
    }
  }

  useEffect(() => {
    if (onSearch) {
      onSearch(searchText)
    }
  }, [searchText])

  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Fusion Cuisine</h2>

        <input
          type="text"
          placeholder="Search recipes or tags..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: '1px solid #ccc',
            width: '300px',
            backgroundColor: '#2a2a2a',
            color: '#fff'
          }}
        />

        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li onClick={() => isLogin && setIsOpen(true)}><NavLink to={!isLogin ? "/myRecipe" : "/"}>My Recipe</NavLink></li>
          <li onClick={() => isLogin && setIsOpen(true)}><NavLink to={!isLogin ? "/favRecipe" : "/"}>Favorites</NavLink></li>
          <li onClick={checkLogin}>
            <p className='login'>{(isLogin) ? "Login" : "Logout"}{user?.email ? ` (${user?.email})` : ""}</p>
          </li>
        </ul>
      </header>
      {(isOpen) && <Modal onClose={() => setIsOpen(false)}><InputForm setIsOpen={() => setIsOpen(false)} /></Modal>}
    </>
  )
}
