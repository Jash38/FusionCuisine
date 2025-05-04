import React, { useState } from 'react';
import foodRecipe from '../assets/foodRecipe.png';
import RecipeItems from '../components/RecipeItems';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import InputForm from '../components/InputForm';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

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
    <div classname = "overall">
      <section className="home">
        <div className="home-container">
          <div className="text-content">
            <h1>Welcome to Fusion Cuisine</h1>
            <p>
              Discover and share unique recipes from around the world. Whether you're
              looking for comfort food or cultural specialties, Fusion Cuisine connects
              you with global flavors.
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

      <RecipeItems />
  
    </>
  );
}
