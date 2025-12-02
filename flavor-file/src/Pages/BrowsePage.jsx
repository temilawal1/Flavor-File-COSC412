// page to browse your own recipes
import { useEffect, useState } from 'react';
import RecipeTile from '../components/RecipeTile';
import '../styles/RecipeTile.css';
import '../styles/BrowsePage.css';


const API_BASE_URL = 'http://localhost:8080/api/v1/posts';

function BrowsePage({ }) {

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch(API_BASE_URL);

                if (response.ok) {
                    const data = await response.json();
                    setRecipes(data);
                } else {
                    console.error('failed to fetch');
                }

            } catch (error) {
                console.error('error fetching:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    if (loading) { 
        return ( 
            <div className="loading-container">
                <p>Loading recipes...</p>
            </div>
        );
    }
    if (recipes.length === 0) {
        return (
            <div className="empty-container">
                <p>No recipes found. Be the first to add one!</p>
            </div>
        );
    }

    return (
        <div className="browse-page">
            <h2 className="page-title">Browse Recipes</h2>
            <div className="recipes.grid">
                {recipes.map((recipe) => (
                    <RecipeTile key={recipe.id?.$oid || String(recipe.id) || index} recipe={recipe} />
                ))}
            </div>
        </div>
    );
}

export default BrowsePage;