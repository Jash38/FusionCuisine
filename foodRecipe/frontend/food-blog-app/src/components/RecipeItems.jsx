import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsStopwatchFill } from "react-icons/bs"
import { FaHeart } from "react-icons/fa6"
import { FaEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import axios from 'axios'

export default function RecipeItems({ searchTerm, recipes }) {
  const [allRecipes, setAllRecipes] = useState()
  const path = window.location.pathname === "/myRecipe"
  let favItems = JSON.parse(localStorage.getItem("fav")) ?? []
  const [isFavRecipe, setIsFavRecipe] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setAllRecipes(recipes)
  }, [recipes])

  const onDelete = async (id) => {
    await axios.delete(`http://localhost:5000/recipe/${id}`)
    setAllRecipes(recipes => recipes.filter(recipe => recipe._id !== id))
    let filterItem = favItems.filter(recipe => recipe._id !== id)
    localStorage.setItem("fav", JSON.stringify(filterItem))
  }

  const favRecipe = (item) => {
    let filterItem = favItems.filter(recipe => recipe._id !== item._id)
    favItems = favItems.filter(recipe => recipe._id === item._id).length === 0 ? [...favItems, item] : filterItem
    localStorage.setItem("fav", JSON.stringify(favItems))
    setIsFavRecipe(pre => !pre)
  }

  const filteredRecipes = allRecipes?.filter(item => {
    const text = searchTerm?.toLowerCase() || "";
    return (
      item.title.toLowerCase().includes(text) ||
      item.tags?.some(tag => tag.toLowerCase().includes(text))
    )
  })

  return (
    <div className='card-container'>
      {
        filteredRecipes?.map((item, index) => (
          <div
            key={index}
            className='card'
            onDoubleClick={() => navigate(`/recipe/${item._id}`)}
            style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}
          >
            <img
              src={`http://localhost:5000/images/${item.coverImage}`}
              width="200px"
              height="200px"
              alt={item.title}
              style={{ borderRadius: '10px', objectFit: 'cover' }}
            />

            <div className='card-body' style={{ flex: 1 }}>
              <div className='title'>{item.title}</div>
              <div className='timer'><BsStopwatchFill /> {item.time}</div>

              <div style={{ marginTop: '0.5rem' }}>
                <strong style={{ color: '#ff5e00' }}>Ingredients:</strong>
                <ul style={{ marginLeft: '1rem' }}>
                  {item.ingredients.map((ing, i) => (
                    <li key={i} style={{ fontSize: '0.85rem', color: '#ccc' }}>{ing}</li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: '0.5rem' }}>
                <strong style={{ color: '#ff5e00' }}>Instructions:</strong>
                <p style={{ fontSize: '0.85rem', color: '#ccc', marginTop: '0.3rem' }}>{item.instructions}</p>
              </div>

              <div style={{ marginTop: '0.5rem' }}>
                <strong style={{ color: '#ff5e00' }}>Tags:</strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.3rem' }}>
                  {item.tags?.map((tag, idx) => (
                    <span key={idx} style={{
                      fontSize: '0.75rem',
                      background: '#333',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '5px',
                      color: '#fff'
                    }}>{tag}</span>
                  ))}
                </div>
              </div>

              <div className='icons' style={{ marginTop: '1rem' }}>
                {!path ? (
                  <FaHeart
                    onClick={() => favRecipe(item)}
                    style={{ color: (favItems.some(res => res._id === item._id)) ? "red" : "", cursor: 'pointer' }}
                  />
                ) : (
                  <div className='action'>
                    <Link to={`/editRecipe/${item._id}`} className="editIcon"><FaEdit /></Link>
                    <MdDelete onClick={() => onDelete(item._id)} className='deleteIcon' style={{ cursor: 'pointer' }} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}
