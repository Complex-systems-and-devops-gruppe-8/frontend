import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [darkMode, setDarkMode] = useState(false)

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <div className="max-w-screen-xl mx-auto p-8 text-center bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="flex justify-between items-center mb-8">
        <div className="flex space-x-4">
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="w-24 p-6 transition-filter duration-300 hover:drop-shadow-[0_0_2em_rgba(100,108,255,0.67)]" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="w-24 p-6 transition-filter duration-300 hover:drop-shadow-[0_0_2em_rgba(97,218,251,0.67)]" alt="React logo" />
          </a>
        </div>
        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white py-2 px-4 rounded-lg focus:outline-none"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">Vite + React</h1>
      <div className="card bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p className="text-gray-700 dark:text-gray-300">
          Edit <code className="bg-gray-100 dark:bg-gray-700 p-1 rounded">src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-gray-500 dark:text-gray-400 mt-8">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
