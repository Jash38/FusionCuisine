import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddFoodRecipe() {
    const [recipeData, setRecipeData] = useState({})
    const [slideIn, setSlideIn] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        // Trigger animation after component mounts
        setTimeout(() => setSlideIn(true), 50)
    }, [])

    const onHandleChange = (e) => {
        let val = (e.target.name === "ingredients") ? e.target.value.split(",") :
            (e.target.name === "file") ? e.target.files[0] : e.target.value
        setRecipeData(pre => ({ ...pre, [e.target.name]: val }))
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:5000/recipe", recipeData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorization': 'bearer ' + localStorage.getItem("token")
            }
        }).then(() => navigate("/"))
    }

    return (
        <div className={`add-recipe-container ${slideIn ? 'slide-in' : ''}`}>
        <h2>Add New Recipe</h2>
        <form onSubmit={onHandleSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    onChange={onHandleChange}
                    placeholder="Enter recipe title"
                    required
                />
            </div>
            <div>
                <label htmlFor="time">Time</label>
                <input
                    type="text"
                    name="time"
                    onChange={onHandleChange}
                    placeholder="e.g. 30 mins"
                />
            </div>
            <div>
                <label htmlFor="ingredients">Ingredients (comma-separated)</label>
                <textarea
                    name="ingredients"
                    onChange={onHandleChange}
                    rows="4"
                    placeholder="e.g. rice, chicken, spices"
                    required
                ></textarea>
            </div>
            <div>
                <label htmlFor="instructions">Instructions</label>
                <textarea
                    name="instructions"
                    onChange={onHandleChange}
                    rows="5"
                    placeholder="Write the recipe steps here..."
                    required
                ></textarea>
            </div>
    
            {/* ✅ New Tags Field */}
            <div>
                <label>Tags</label>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {["Nut-Free", "Vegan", "Soy-Free"].map(tag => (
                        <label key={tag}>
                            <input
                                type="checkbox"
                                name="tags"
                                value={tag}
                                onChange={(e) => {
                                    const { value, checked } = e.target;
                                    setRecipeData(prev => {
                                        const tags = new Set(prev.tags || []);
                                        checked ? tags.add(value) : tags.delete(value);
                                        return { ...prev, tags: Array.from(tags) };
                                    });
                                }}
                            />
                            {' '}{tag}
                        </label>
                    ))}
                </div>
            </div>
    
            <div>
                <label htmlFor="file">Recipe Image</label>
                <input
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={onHandleChange}
                    required
                />
            </div>
            <button type="submit">Add Recipe</button>
        </form>
    </div>
    
    )
}
