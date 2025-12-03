import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import '../styles/AiIndexPage.css';

const API_BASE_URL = 'http://localhost:8080/api/v1/ai';

function AiGeneratorPage () {
    const [count, setCount] = useState(3);
    const [suggestions, setSuggestions] = useState('');
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const fetchSuggestions = async () => {
        setIsLoading(true);
        setIsError(false);
        setStatus('Asking our AI chef for ideas...');
        setSuggestions('');

        try {
            const response = await fetch(`${API_BASE_URL}/recommend?count=${count}`);

            if (!response.ok) {
                const text = await response.text();
                setStatus(`Backend error: ${response.status}`);
                setIsError(true);
                setSuggestions(text || 'No additional error details.');
                return;
            }

            const text = await response.text();
            setStatus('Here are your AI-generated recipe ideas!');
            setSuggestions(text);
        } catch (err) {
            setStatus('Failed to connect to the server.');
            setIsError(true);
            setSuggestions(String(err));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="ai-page-wrapper">
            <div className="ai-container">
                <h1>FlavorFile AI Helper</h1>
                <p className="ai-subtitle">
                    Ask our smart chef to suggest new recipe ideas based on what's already in your kitchen.
                </p>

                <div className="ai-controls">
                    <div>
                        <label htmlFor="count">How many ideas?</label>
                        <input
                            id="count"
                            type="number"
                            min="1"
                            max="10"
                            value={count}
                            onChange={(e) => setCount(parseInt(e.target.value, 10) || 1)}
                        />
                    </div>

                    <div>
                        <button
                            className="ai-generate-button"
                            onClick={fetchSuggestions}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="spinner" size={18} />
                                </>
                            ) : (
                                <>
                                    <Sparkles size={18} />
                                    Get AI Suggestions
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className={`ai-status ${isError ? 'error' : ''}`}>
                    {status}
                </div>

                <pre className="ai-output">{suggestions}</pre>
            </div>
        </div>
    );
}

export default AiGeneratorPage;