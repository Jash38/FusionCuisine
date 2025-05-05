import React from 'react'
import profileImg from '../assets/profile.png'
import { useLoaderData } from 'react-router-dom'

export default function RecipeDetails() {
  const recipe = useLoaderData()

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      marginTop: '6rem',
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: '#1e1e1e',
        padding: '2rem',
        borderRadius: '12px',
        maxWidth: '800px',
        width: '100%',
        color: '#fff',
        boxShadow: '0 0 12px rgba(255, 94, 0, 0.2)'
      }}>
        {/* Profile and Email */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <img src={profileImg} width="50px" height="50px" alt="profile" style={{ borderRadius: '50%' }} />
          <h5 style={{ marginLeft: '1rem', color: '#ccc' }}>{recipe.email}</h5>
        </div>

        {/* Title and Image */}
        <h2 style={{ color: '#ff5e00', marginBottom: '1rem' }}>{recipe.title}</h2>
        <img
          src={`http://localhost:5000/images/${recipe.coverImage}`}
          alt={recipe.title}
          style={{
            width: '100%',
            maxWidth: '300px',
            height: '300px',
            objectFit: 'cover',
            borderRadius: '10px',
            marginBottom: '1.5rem'
          }}
        />

        {/* Ingredients */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#ff5e00', marginBottom: '0.5rem' }}>Ingredients</h3>
          <ul style={{ paddingLeft: '1.2rem' }}>
            {recipe.ingredients.map((item, idx) => (
              <li key={idx} style={{ lineHeight: '1.8' }}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div>
          <h3 style={{ color: '#ff5e00', marginBottom: '0.5rem' }}>Instructions</h3>
          <p style={{ lineHeight: '1.6', color: '#ddd' }}>{recipe.instructions}</p>
        </div>
      </div>
    </div>
  )
}