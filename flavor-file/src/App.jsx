import {useState} from 'react'

function App() {
  const [activeTab, setActiveTab] = useState('browse')

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <h1>Flavor File</h1>
        <p className="tagline">User-Friendly Recipe Book</p>
      </header>

      {/* Tab Navigation */}
      <nav className="tab-nav">
        <button 
        className={`tab-button ${activeTab==='browse' ? 'active':''}`}
        onClick={() => setActiveTab('browse')}>
          Browse & Search
        </button>
        <button className={`tab-button ${activeTab==='add' ? 'active':''}`}
        onClick={() => setActiveTab('add')}>
          Add Recipe
        </button>
        <button className={`tab-button ${activeTab==='ai' ? 'active' :''}`}
        onClick={() => setActiveTab('ai')}>
          AI Generator
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab==='browse' && (
          <div className="tab-content">
            <h2>Browse & Search Recipes</h2>
            <p>Recipe cards go here</p>
          </div>
        )}

        {activeTab==='add' && (
          <div className="tab-content">
            <h2>Add New Recipe</h2>
            <p>Recipe form goes here</p>
          </div>
        )}

        {activeTab==='ai' && (
          <div className="tab-content">
            <h2>AI Recipe Generator</h2>
            <p>Ingredients go here</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
