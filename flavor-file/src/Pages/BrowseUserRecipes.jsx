// page to browse your own recipes
import { useEffect, useState } from 'react';
import { BookOpen, ChefHat } from 'lucide-react';
import RecipeTile from '../components/RecipeTile';
import '../styles/RecipeTile.css';
import '../styles/BrowseUserRecipes.css';

const API_BASE_URL = 'http://localhost:8080/api/v1/addRecipe';



function BrowseUserRecipes({ username, userKey }) {

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/posts');

                if (response.ok) {
                    const data = await response.json();
                    const userRecipes = data.filter(recipe => recipe.username === username);
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
    }, [username]);

    if (loading) {
        return (
            <div className="user-loading-state">
                <div className="loading-spinner"></div>
                <p>Loading your recipes...</p>
            </div>
        );
    }

    if (recipes.length === 0) {
        return (
            <div className="browse-user-recipes">
                <div className="user-empty-state">
                    <div className="user-empty-state-icon">
                        <ChefHat />
                    </div>
                    <h3>No Recipes Yet</h3>
                    <p>You haven't added any recipes yet. Start building your collection!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="browse-user-recipes">
            <div className="user-recipes-header">
                <div className="user-recipes-header-left">
                    <h2 className="user-recipes-title">My Recipes</h2>
                    <p className="user-recipes-subtitle">Your recipe collection</p>
                </div>
                <div className="recipe-count-badge">
                    <BookOpen />
                    {recipes.length} Recipe{recipes.length !== 1 ? 's' : ''}
                </div>

                <div className="recipes-grid">
                    {recipes.map((recipe) => (
                        <RecipeTile key={recipe.id?.$oid || String(recipe.id) || index} recipe={recipe} />
                    ))}
                </div>
            </div>
        </div>
    );     
}

export default BrowseUserRecipes;