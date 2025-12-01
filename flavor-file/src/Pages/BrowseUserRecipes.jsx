// page to browse your own recipes
import { useEffect, useState } from 'react';

const API_BASE_URL = 'http://localhost:8080/api/addRecipe';



function BrowseUserRecipes({ username }) {

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

    if (loading) return <p>Loading..</p>
    if (recipes.length === 0) return <p>No recipes</p>

    return (
        <>
            <AddRecipeForm
                username={username}
                userKey={userKey}
                onRecipeAdded={(newRecipe) => setRecipes(prev => [...prev, newRecipe])}
            />
            <div className="user-recipes">
                <ul>
                    {recipes.map((recipe) => (
                        <>
                            <h3>{recipe.recipeName}</h3>
                            <p>Ingredients: {recipe.ingredients}</p>
                            <p>Preparation Steps: {recipe.prepSteps}</p>
                            <p>Author: {recipe.author}</p>
                            <p>Serving Size: {recipe.servingSize}</p>
                            <p>Serves: {recipe.serves}</p>
                            <p>Time to PRepare: {recipe.prepTime}</p>
                            <p>Courses: {recipe.courses}</p>
                        </>
                    ))}
                </ul>
            </div></>
    )
}

export default BrowseUserRecipes