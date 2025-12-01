import React from 'react';
import '../styles/RecipeAddAlert.css';

function RecipeAddAlert({message}) {
    return (
        <div className = 'alert-overlay'>
            <div className = 'alert-div'>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default RecipeAddAlert;
