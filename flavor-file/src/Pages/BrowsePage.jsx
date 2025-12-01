// page to browse your own recipes
import { useEffect, useState } from 'react';
import AddRecipeForm from './AddRecipeForm';

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

    if (loading) return <p>Loading..</p>
    if (recipes.length === 0) return <p>No recipes</p>

    return (
        <>
            <AddRecipeForm
                onRecipeAdded={(newRecipe) => setRecipes(prev => [...prev, newRecipe])}
            />
            <div className="user-recipes">
                {recipes.map((recipe) => (
                    <div key={recipe.id}>
                        <h3>{recipe.recipeName || 'Untitled Recipe'}</h3>
                        <p>Ingredients: {(recipe.ingredients || []).join(',  ') || 'None listed'}</p>
                        <p>Preparation Steps: {(recipe.prepSteps || []).join(',  ') || 'None listed'}</p>
                        <p>Author: {recipe.author || 'Unknown'}</p>
                        <p>Serving Size: {recipe.servingSize || 'Not specified'}</p>
                        <p>Serves: {recipe.serves || 'Not specified'}</p>
                        <p>Time to PRepare: {recipe.prepTime || 'Not specified'}</p>
                        <p>Courses: {(recipe.courses || []).join(', ') || 'None listed'}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default BrowsePage