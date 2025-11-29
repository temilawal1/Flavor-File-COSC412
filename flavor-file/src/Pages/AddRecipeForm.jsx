import { useState } from 'react';
import { Plus } from 'lucide-react'
import '../styles/AddRecipeForm.css';

const API_BASE_URL = 'http://localhost:8080/api/v1';

function AddRecipeForm() {
    const [recipeName, setRecipeName] = useState('');
    const [author, setAuthor] = useState('');
    const [username, setUsername] = useState('');
    const [userKey, setUserKey] = useState('');
    const [courses, setCourses] = useState(['']);
    const [imgLinks, setImgLinks] = useState(['']);

    const handleSubmit = async () => {
        if (!recipeName.trim()) {
            alert('Please enter a recipe name');
            return;
        }

        const recipeData = {
            recipeName: recipeName,
            author: author || 'Anonymous',
            username: username,
            userKey: userKey || 'default-user',
            courses: courses.filter(c => c.trim()),
            imgLinks: imgLinks.filter(i => i.trim()),
            reviewsLeft: []
        };

        try {
            const response = await fetch(`${API_BASE_URL}/posts/addRecipe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipeData),
            });

            if (response.ok) {
                alert('Recipe added successfully!');
                setRecipeName('');
                setAuthor('');
                setUsername('');
                setUserKey('');
                setCourses(['']);
                setImgLinks(['']);
            } else {
                const errorData = await response.json();
                alert(`Failed to add recipe: ${errorData.message || 'Unknown error'}`);
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

    const addImageLink = () => {
        setImgLinks([...imgLinks, '']);
    };

    const removeImageLink = (index) => {
        if (imgLinks.length > 1) {
            const newImgLinks = imgLinks.filter((_, i) => i !== index);
            setImgLinks(newImgLinks);
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

    return (
        <div className="add-recipe-container">
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
                                Username
                            </label>
                            <input
                                type="text"
                                placeholder="Your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="text-input"
                            />
                        </div>

                        <div className="form-field">
                            <label className="field-label">
                                User Key
                            </label>
                            <input
                                type="text"
                                placeholder="Your user key"
                                value={userKey}
                                onChange={(e) => setUserKey(e.target.value)}
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