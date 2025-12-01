import { useState } from "react";

function Card({ recipe }) {
    const [showAlert, setShowAlert] = useState(false);

    function FavoriteOnClick() {
        setShowAlert(true);

        // auto-hide after 1.5 seconds
        setTimeout(() => setShowAlert(false), 1500);
    }

    return (
        <div className="recipe-card">

            {/* Custom popup */}
            {showAlert && (
                <div className="recipe-added-alert">
                    Added to favorites!
                </div>
            )}

            <div className="recipe-poster">
                <img src={recipe.url} alt={recipe.title}/>
                <div className="recipe-overlay">
                    <button className="favoriteRecipe" onClick={FavoriteOnClick}>
                        ♡
                    </button>
                </div>
            </div>

            <div className="recipe-info">
                <h3>{recipe.title}</h3>
                <p>{recipe.creation_date}</p>
            </div>
        </div>
    );
}

export default Card;