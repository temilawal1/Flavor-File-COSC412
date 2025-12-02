import {useState, useEffect} from 'react'
import { Search, Plus, Sparkles, ChefHat, LogOut } from 'lucide-react';
import AddRecipeForm from './Pages/AddRecipeForm';
import LoginPage from './Pages/UserLogin';
import BrowsePage from './Pages/BrowsePage';
import AiGeneratorPage from './Pages/AiGeneratorPage';
import BrowseUserRecipes from './Pages/BrowseUserRecipes';
import RecipeAddAlert from './components/RecipeAddAlert';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('browse');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  if (!user) {
    return (
      <div className="app-container">
        <header className="header">
          <div className="header-content">
            <ChefHat className="header-icon" />
            <div>
              <h1 className="header-title">Flavor File</h1>
              <p className="header-tagline">Your smart cooking companion</p>
            </div>
          </div>
        </header>
        <LoginPage onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <ChefHat className="header-icon" />
          <div>
            <h1 className="header-title">Flavor File</h1>
            <p className="header-tagline">Your smart cooking companion</p>
          </div>
          <div className="user-info">
              <span>Welcome, {user.userName}!</span>
            
            <button className="logout-button" onClick={handleLogout}>
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <nav className="tab-nav">
        <div className="tab-nav-content">
          <button
            onClick={() => setActiveTab('browse')}
            className={`tab-button ${activeTab === 'browse' ? 'active' : ''}`}
          >
            <Search className="tab-icon" />
            Browse
          </button>
          <button
            onClick={() => setActiveTab('user_recipes')}
            className={`tab-button ${activeTab === 'user_recipes' ? 'active' : ''}`}
          >
            <Search className="tab-icon" />
            My Recipes
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`tab-button ${activeTab === 'add' ? 'active' : ''}`}
          >
            <Plus className="tab-icon" />
            Add Recipe
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`tab-button ${activeTab === 'ai' ? 'active' : ''}`}
          >
            <Sparkles className="tab-icon" />
            AI Generator
          </button>
        </div>
      </nav>

      <main className="main-content">
        {activeTab === 'browse' && <BrowsePage />}
        {activeTab === 'add' && <AddRecipeForm username = {user.userName} userKey = {user.userKey} />}
        {activeTab === 'ai' && <AiGeneratorPage />}
        {activeTab === 'user_recipes' && <BrowseUserRecipes username = {user.userName} userKey = {user.userKey} setActiveTab = {setActiveTab}/>}
      </main>
    </div>
  );
}

export default App
