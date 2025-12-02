import { useState } from 'react';
import '../styles/RecipeTile.css';
import { ChevronDown, ChevronUp, Clock, Users, UtensilsCrossed } from 'lucide-react';

function RecipeTile({ recipe }) {
    const [isExpanded, setIsExpanded] = useState(false);

    //Get the first image or use as a placeholder
    const imageUrl = recipe.imgLinks && recipe.imgLinks.length > 0 && recipe.imgLinks[0]
        ? recipe.imgLinks[0] 
        : 'https://via.placeholder.com/300x200?text=No+Image';

    return (
        <div className="recipe-tile">
            <div className="recipe-tile-image">
                <img
                    src={imageUrl}
                    alt={recipe.recipeName || 'Recipe'}
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                    }}
                />
            </div>

            <div className="recipe-tile-content">
                <h3 className="recipe-tile-title">
                    {recipe.recipeName || 'Untitled Recipe'}
                </h3>

                <div className="recipe-tile-meta">
                    <span className="meta-item">
                        <Clock size={16} />
                        {recipe.prepTime || 'N/A'}
                    </span>
                    {recipe.serves && recipe.serves !== 'N/A' && (
                        <span classNae="meta-item">
                            <Users size={16} />
                            {recipe.serves}
                        </span>
                    )}
                    
                </div>

                <button
                    className="recipe-tile-toggle"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? (
                        <>
                            <span>Hide Details</span>
                            <ChevronUp size={20} />
                        </>
                    ) : (
                        <>
                            <span>Show Details</span>
                            <ChevronDown size={20} />
                        </>
                    )}
                </button>

                {isExpanded && (
                    <div className="recipe-tile-details">
                        <div className="detail-section">
                            <h4>Author</h4>
                            <p>{recipe.author || 'Unknown'}</p>
                        </div>

                        {recipe.servingSize && recipe.servingSize !== 'N/A' && (
                            <div className="detail-section">
                                <h4>Serving Size</h4>
                                <p>{recipe.servingSize}</p>
                            </div>
                        )}

                        {recipe.courses && recipe.courses.length > 0 && (
                            <div className="detail-section">
                                <h4>Courses</h4>
                                <div className="tags">
                                    {recipe.courses.filter(c => c).map((course, index) => (
                                        <span key={index} className="tag">{course}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {recipe.ingredients && recipe.ingredients.length > 0 && (
                            <div className="detail-section">
                                <h4>Ingredients</h4>
                                <ul className="ingredients-list">
                                    {recipe.ingredients.filter(i => i).map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {recipe.prepSteps && recipe.prepSteps.length > 0 && (
                            <div className="detail-section">
                                <h4>Preparation Steps</h4>
                                <ol className="prep-steps-list">
                                    {recipe.prepSteps.filter(s => s).map((step, index) => (
                                        <li key={index}>{step}</li>
                                    ))}
                                </ol>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default RecipeTile;