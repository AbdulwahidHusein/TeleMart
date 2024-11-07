'use client'

import { useContext } from 'react'
import { Sun, Moon } from 'lucide-react'
import { DarkModeContext } from '../contexts/DarkModeContext'

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext)

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}