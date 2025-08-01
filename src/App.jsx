import React, { useState } from 'react'
import Home from './pages/Home'
import IngredientDemo from './pages/IngredientDemo'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'ingredient-demo':
        return <IngredientDemo navigateTo={(page) => setCurrentPage(page)} />
      default:
        return <Home navigateTo={(page) => setCurrentPage(page)} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Top nav removed */}
      {renderPage()}
    </div>
  )
}

export default App
