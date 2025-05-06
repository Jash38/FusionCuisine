import React, { useState } from 'react';
import foodRecipe from '../assets/foodRecipe.png';
import RecipeItems from '../components/RecipeItems';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import InputForm from '../components/InputForm';
import { useNavigate, useLoaderData } from 'react-router-dom';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate();
  const recipes = useLoaderData()

  const addRecipe = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/addRecipe");
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <Navbar onSearch={setSearchTerm} />
      <div className="overall">
        <section className="home">
          <div className="home-container">
            <div className="text-content">
              <h1>Welcome to Fusion Cuisine</h1>
              <p>
              Discover a world of flavor with Fusion Cuisine — a vibrant web platform where food lovers explore, 
            share, and celebrate authentic recipes from diverse cultures. Whether you are searching for traditional dishes, 
            fusion creations, or meals that fit specific dietary needs like vegan or allergy-friendly options, 
            our platform makes it easy to find recipes that suit your taste. Join a global community passionate about food and start your culinary journey today.
              </p>
              <button onClick={addRecipe}>Share Your Recipe</button>
            </div>
            <div className="image-content">
              <img src={foodRecipe} alt="dish" />
            </div>
          </div>
        </section>
      </div>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}

      <RecipeItems searchTerm={searchTerm} recipes={recipes} />
    </>
  );
}
