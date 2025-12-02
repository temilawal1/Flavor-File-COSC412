// page to browse your own recipes
import { useEffect, useState } from 'react';
import RecipeTile from '../components/RecipeTile';
import '../styles/RecipeTile.css';
import '../styles/BrowsePage.css';


const API_BASE_URL = 'http://localhost:8080/api/v1/posts';

const DEMO_RECIPES = [
    {
        id: "demo-1",
        recipeName: "Chicken Alfredo",
        ingredients: [
            "1 lb fettucine pasta",
            "2 chicken breasts",
            "2 cups heavy cream",
            "1 cup parmesan cheese",
            "4 cloves garlic, minced"
        ],
        prepSteps: [
            "Cook fettucine according to package directions",
            "Season and cook chicken until golden",
            "Make cream sauce with butter, garlic, cream, and parmesan",
            "Combine pasta, sauce, and sliced chicken"
        ],
        prepTime: "33 mins",
        serves: "6",
        author: "Max",
        username: "m_fadley",
        courses: ["Italian", "Dinner"],
        imgLinks: ["https://www.simplejoy.com/wp-content/uploads/2023/09/chicken-fettuccine-alfredo.jpg"]
    },
    {
        id: "demo-2",
        recipeName: "Temi's Pasta",
        ingredients: [
            "1 cup roasted garlic pasta sauce",
            "56g penne pasta",
            "1/2 cup sliced smoked sausage",
            "1/2 cup sliced onions",
            "4 1/2 cups of water",
            "Canola oil",
            "Salt",
            "Chicken Boullion",
            "Garlic Powder",
            "Curry Powder",
            "Itallian seasoning"
        ],
        prepSteps: [
            "Salt and boil water",
            "Add pasta and stir occasionally till soft to your liking",
            "Once soft, season with chicken boullion, garlic powder, curry powder, and itallian seasoning, continue to boil",
            "Strain pasta and save 1/4 - 1.2 cup of pasta water",
            "In the same pot, turn heat to medium and pour 1 tbs canola oil, 1/2 cup sliced onions, and 1/2 cup sliced smoked sausage. Let simmer",
            "Slowly turn heat to up until high, and stir occasionally. Add 1 cup roasted garlic pasta sauce and pasta water to pot. Cover and let simmer",
            "Add pasta and cook for 5 minutes",
            "Plate and enjoy!"
        ],
        prepTime: "1 hour",
        serves: "2",
        author: "Temi",
        username: "tlawal1",
        courses: ["Lunch, Dinner"],
        imgLinks: ["https://media.discordapp.net/attachments/1318679392024657960/1445534203365163233/IMG_6284.jpg?ex=6930b222&is=692f60a2&hm=a2294e556fd8a39fb13c807fb58533e367092e4e52d979150512f4e2184c6324&=&format=webp&width=554&height=739"],
    }
];

function BrowsePage({ }) {

    // const recipes = DEMO_RECIPES;

    
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
            <div className="recipes-grid">
                {recipes.map((recipe, index) => (
                    <RecipeTile key={recipe.id?.$oid || String(recipe.id) || index} recipe={recipe} />
                ))}
            </div>
        </div>
    );
}

export default BrowsePage;