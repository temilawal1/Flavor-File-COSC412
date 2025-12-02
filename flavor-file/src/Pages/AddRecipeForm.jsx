import { useState } from 'react';
import { Plus } from 'lucide-react'
import '../styles/AddRecipeForm.css';
import RecipeAddAlert from '../components/RecipeAddAlert';

const API_BASE_URL = 'http://localhost:8080/api/v1/posts';

const ADD_RECIPE_URL = `${API_BASE_URL}/addRecipe`;

function AddRecipeForm({ username, userKey, onRecipeAdded }) {
    const [recipeName, setRecipeName] = useState('');
    const [ingredients, setIngredients] = useState(['']);
    const [prepSteps, setPrepSteps] = useState(['']);
    const [author, setAuthor] = useState('');
    const [servingSize, setServingSize] = useState('');
    const [serves, setServes] = useState('');
    const [prepTime, setPrepTime] = useState('');
    const [courses, setCourses] = useState(['']);
    const [imgLinks, setImgLinks] = useState(['']);

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleSubmit = async () => {
        if (!recipeName.trim()) {
            alert('Please enter a recipe name');
            return;
        }

        const recipeData = {
            recipeName: recipeName,
            ingredients: ingredients.filter(g => g.trim()),
            prepSteps: prepSteps.filter(p => p.trim()),
            prepTime: prepTime || 'N/A',
            servingSize: servingSize || 'N/A',
            serves: serves || 'N/A',
            author: author || 'Anonymous',
            username: username || 'guest',
            userKey: userKey || 'guest-user',
            courses: courses.filter(c => c.trim()),
            imgLinks: imgLinks.filter(i => i.trim()),
            reviewsLeft: []
        };

        try {
            const response = await fetch(ADD_RECIPE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipeData),
            });

            if (response.ok) {
                const savedRecipe = await response.json();
                if (onRecipeAdded) onRecipeAdded(savedRecipe);

                setAlertMessage('Recipe added successfully!');
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 3000);

                setRecipeName('');
                //
                setIngredients(['']);
                setPrepSteps(['']);
                setPrepTime('');
                setServingSize('');
                setServes('');
                //
                setAuthor('');
                // setUsername('');
                // setUserKey('');
                setCourses(['']);
                setImgLinks(['']);
            } else {
                const errorData = await response.json();
                setAlertMessage(`Failed to add recipe: ${errorData.message || 'Unknown error'}`);
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 3000);
            }
        } catch (error) {
            console.error('Error adding recipe:', error);
            alert('Failed to add recipe. Please make sure your backend is running.');
        }
    };

    const addCourse = () => {
        setCourses([...courses, '']);
    };


    const removeCourse = (index) => {
        if (courses.length > 1) {
            const newCourses = courses.filter((_, i) => i !== index);
            setCourses(newCourses);
        }
    };

    const addIngredients = () => {
        setIngredients([...ingredients, '']);
    };


    const removeIngredients = (index) => {
        if (ingredients.length > 1) {
            const newIngredients = ingredients.filter((_, i) => i !== index);
            setIngredients(newIngredients);
        }
    };



    const addImageLink = () => {
        setImgLinks([...imgLinks, '']);
    };

    const removeImageLink = (index) => {
        if (imgLinks.length > 1) {
            const newImgLinks = imgLinks.filter((_, i) => i !== index);
            setImgLinks(newImgLinks);
        }
    };

    const addPrepSteps = () => {
        setPrepSteps([...prepSteps, '']);
    }

    const removePrepSteps = (index) => {
        if (prepSteps.length > 1) {
            const newPrepSteps = prepSteps.filter((_, i) => i !== index);
            setPrepSteps(newPrepSteps);
        }
    };

    const updateCourse = (index, value) => {
        const newCourses = [...courses];
        newCourses[index] = value;
        setCourses(newCourses);
    };

    const updateImageLink = (index, value) => {
        const newImgLinks = [...imgLinks];
        newImgLinks[index] = value;
        setImgLinks(newImgLinks);
    };

    const updateIngredients = (index, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    };

    const updatePrepSteps = (index, value) => {
        const newPrepSteps = [...prepSteps];
        newPrepSteps[index] = value;
        setPrepSteps(newPrepSteps);
    };

    return (
        <div className="add-recipe-container">
            {showAlert && <RecipeAddAlert message={alertMessage} />}
            <div className="form-card">
                <h2 className="form-title">Add New Recipe</h2>

                <div className="form-content">
                    <div className="form-section">
                        <h3 className="section-title">Basic Information</h3>

                        <div className="form-field">
                            <label className="field-label">
                                Recipe Name <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., Spaghetti"
                                value={recipeName}
                                onChange={(e) => setRecipeName(e.target.value)}
                                className="text-input"
                                required
                            />
                        </div>


                        <div className="form-section">
                            <div className="list-header">
                                <label className="field-label">
                                    Ingredients <span className="required">*</span>
                                </label>
                                <button onClick={addIngredients} className="add-button">
                                    <Plus className="add-icon" />
                                    Add Ingredient
                                </button>
                            </div>

                            <div className="list-items">
                                {ingredients.map((ingredients, index) => (
                                    <div key={index} className="list-item-row">
                                        <input
                                            type="text"
                                            placeholder="e.g., 5 Tomatoes, 1 egg"
                                            value={ingredients}
                                            onChange={(e) => updateIngredients(index, e.target.value)}
                                            className="text-input list-item-input"
                                        />
                                        {ingredients.length > 1 && (
                                            <button
                                                onClick={() => removeIngredients(index)}
                                                className="remove-button"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>


                        <div className="form-section">
                            <div className="list-header">
                                <label className="field-label">Preparation Steps</label>
                                <button onClick={addPrepSteps} className="add-button">
                                    <Plus className="add-icon" />
                                    Add Preparation Steps
                                </button>
                            </div>

                            <div className="list-items">
                                {prepSteps.map((prepSteps, index) => (
                                    <div key={index} className="list-item-row">
                                        <input
                                            type="text"
                                            placeholder="e.g., Dice onions, Sautee vegetables for 10 minutes"
                                            value={prepSteps}
                                            onChange={(e) => updatePrepSteps(index, e.target.value)}
                                            className="text-input list-item-input"
                                        />
                                        {prepSteps.length > 1 && (
                                            <button
                                                onClick={() => removePrepSteps(index)}
                                                className="remove-button"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="form-field">
                            <label className="field-label">
                                Author
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., Gordon Ramsay"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className="text-input"
                            />
                        </div>

                        <div className="form-field">
                            <label className="field-label">
                                Serving Size
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., 56g, 16oz"
                                value={servingSize}
                                onChange={(e) => setServingSize(e.target.value)}
                                className="text-input"
                            />
                        </div>

                        <div className="form-field">
                            <label className="field-label">
                                Serves
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., Serves 4 people"
                                value={serves}
                                onChange={(e) => setServes(e.target.value)}
                                className="text-input"
                            />
                        </div>

                        <div className="form-field">
                            <label className="field-label">
                                Time to Prepare
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., 4 hours and 35 minutes"
                                value={prepTime}
                                onChange={(e) => setPrepTime(e.target.value)}
                                className="text-input"
                            />
                        </div>


                    </div>

                    <div className="form-section">
                        <div className="list-header">
                            <h3 className="section-title">Courses</h3>
                            <button onClick={addCourse} className="add-button">
                                <Plus className="add-icon" />
                                Add Course
                            </button>
                        </div>

                        <div className="list-items">
                            {courses.map((course, index) => (
                                <div key={index} className="list-item-row">
                                    <input
                                        type="text"
                                        placeholder="e.g., Italian, Main Course, Dessert"
                                        value={course}
                                        onChange={(e) => updateCourse(index, e.target.value)}
                                        className="text-input list-item-input"
                                    />
                                    {courses.length > 1 && (
                                        <button
                                            onClick={() => removeCourse(index)}
                                            className="remove-button"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-section">
                        <div className="list-header">
                            <h3 className="section-title">Image URLs</h3>
                            <button onClick={addImageLink} className="add-button">
                                <Plus className="add-icon" />
                                Add Image
                            </button>
                        </div>

                        <div className="list-items">
                            {imgLinks.map((imgLink, index) => (
                                <div key={index} className="list-item-row">
                                    <input
                                        type="url"
                                        placeholder="https://example.com/image.jpg"
                                        value={imgLink}
                                        onChange={(e) => updateImageLink(index, e.target.value)}
                                        className="text-input list-item-input"
                                    />
                                    {imgLinks.length > 1 && (
                                        <button
                                            onClick={() => removeImageLink(index)}
                                            className="remove-button"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="submit-section">
                        <button onClick={handleSubmit} className="submit-button">
                            Add Recipe
                        </button>
                        <p className="submit-hint">
                            * Required fields must be filled out
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddRecipeForm;