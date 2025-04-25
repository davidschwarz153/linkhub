import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const InfoSheet = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-secondary flex items-center space-x-2"
      >
        <span>Info</span>
        <svg 
          className={`h-5 w-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
            clipRule="evenodd" 
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-80 card"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-amazon-orange">Welcome to  LinkHub</h3>
              <div className="space-y-2 text-amazon-text-secondary">
                <p>This hub provides quick access to all essential ICQA tools and resources.</p>
                <p>Use the search bar to quickly find specific tools or browse through categories.</p>
                <p>Click on any link to open it in a new tab.</p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <h4 className="font-semibold text-amazon-text mb-2">Quick Tips:</h4>
                <ul className="list-disc list-inside space-y-1 text-amazon-text-secondary">
                  <li>Use the search bar for quick access</li>
                  <li>Browse categories for organized access</li>
                  <li>Click "Open All Links" to open everything</li>
                  <li>Give feedback to help improve the hub</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default InfoSheet 