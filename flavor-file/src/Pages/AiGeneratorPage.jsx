import { useState } from 'react';
import { Sparkles, Loader2, Plus, X } from 'lucide-react';
import '../styles/AiIndexPage.css';

const API_BASE_URL = 'http://localhost:8080/api/ai';

function AiGeneratorPage() {
    const [count, setCount] = useState(3);
    const [suggestions, setSuggestions] = useState('');
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    
    // Ingredients state
    const [ingredients, setIngredients] = useState([]);
    const [currentIngredient, setCurrentIngredient] = useState('');
    const [mode, setMode] = useState('ingredients'); // ingredients or existing recipes

    const addIngredient = () => {
        if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim())) {
            setIngredients([...ingredients, currentIngredient.trim()]);
            setCurrentIngredient('');
        }
    };

    const removeIngredient = (ingredientToRemove) => {
        setIngredients(ingredients.filter(i => i !== ingredientToRemove));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addIngredient();
        }
    };

    const fetchSuggestions = async () => {
        setIsLoading(true);
        setIsError(false);
        setStatus('Generating recipes...');
        setSuggestions('');

        try {
            let response;
            
            if (mode === 'ingredients' && ingredients.length > 0) {
                response = await fetch(`${API_BASE_URL}/from-ingredients`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ingredients: ingredients,
                        count: count
                    })
                });
            } else {
                response = await fetch(`${API_BASE_URL}/recommend?count=${count}`);
            }

            if (!response.ok) {
                throw new Error('Failed to get suggestions');
            }

            const data = await response.text();
            setSuggestions(data);
            setStatus('Recipes generated successfully!');
        } catch (error) {
            console.error('Error:', error);
            setIsError(true);
            setStatus(error.message || 'Failed to connect to the server.');
        } finally {
            setIsLoading(false);
        }
    };

    const formatSuggestions = (text) => {
        // Extract just the recipe text from the API response
        const match = text.match(/text=([^}]+)/);
        if (match) {
            return match[1]
                .replace(/\\n/g, '\n')
                .replace(/\\t/g, '\t')
                .replace(/^Here are/, '\nHere are');
        }
        return text
            .replace(/\[ResponseOutput\{.*text=/s, '')
            .replace(/, type=output_text.*$/s, '')
            .replace(/\\n/g, '\n')
            .replace(/\\t/g, '\t');
    };

    return (
        <div className="ai-page-wrapper">
            <div className="ai-container">
                <h1>FlavorFile AI Helper</h1>
                <p className="ai-subtitle">
                    Get personalized recipe suggestions based on ingredients you have!
                </p>

                {/* Mode Toggle */}
                <div className="mode-toggle">
                    <button 
                        className={`mode-btn ${mode === 'ingredients' ? 'active' : ''}`}
                        onClick={() => setMode('ingredients')}
                    >
                        From My Ingredients
                    </button>
                    <button 
                        className={`mode-btn ${mode === 'existing' ? 'active' : ''}`}
                        onClick={() => setMode('existing')}
                    >
                        From Existing Recipes
                    </button>
                </div>

                {/* Ingredients Input */}
                {mode === 'ingredients' && (
                    <div className="ingredients-section">
                        <label>What ingredients do you have?</label>
                        <div className="ingredient-input-row">
                            <input
                                type="text"
                                value={currentIngredient}
                                onChange={(e) => setCurrentIngredient(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type an ingredient and press Enter"
                                className="ingredient-input"
                            />
                            <button onClick={addIngredient} className="add-ingredient-btn">
                                <Plus size={20} />
                            </button>
                        </div>
                        
                        {/* Ingredient Tags */}
                        <div className="ingredient-tags">
                            {ingredients.map((ingredient, index) => (
                                <span key={index} className="ingredient-tag">
                                    {ingredient}
                                    <button 
                                        onClick={() => removeIngredient(ingredient)}
                                        className="remove-tag-btn"
                                    >
                                        <X size={14} />
                                    </button>
                                </span>
                            ))}
                        </div>
                        
                        {ingredients.length === 0 && (
                            <p className="ingredients-hint">
                                Add some ingredients to get started! (e.g., chicken, rice, broccoli)
                            </p>
                        )}
                    </div>
                )}

                {/* Count Input */}
                <div className="count-section">
                    <label>How many recipe ideas?</label>
                    <input className = "count-input"
                        type="number"
                        min="1"
                        max="10"
                        value={count}
                        onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                    />
                </div>

                {/* Generate Button */}
                <button
                    className="ai-generate-btn"
                    onClick={fetchSuggestions}
                    disabled={isLoading || (mode === 'ingredients' && ingredients.length === 0)}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="spinner" size={20} />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Sparkles size={20} />
                            Get AI Suggestions
                        </>
                    )}
                </button>

                {/* Status */}
                {status && (
                    <p className={`ai-status ${isError ? 'error' : ''}`}>
                        {status}
                    </p>
                )}

                {/* Output */}
                {suggestions && (
                    <div className="ai-output">
                        <pre>{formatSuggestions(suggestions)}</pre>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AiGeneratorPage;