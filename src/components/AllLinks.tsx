import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import BackgroundVideo from './BackgroundVideo'

interface Link {
  id: string
  title: string
  url: string
  description: string
  category: string
}

const AllLinks = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [allLinks, setAllLinks] = useState<Record<string, Link[]>>({})

  useEffect(() => {
    // Scroll to section if hash is in URL
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      setActiveSection(hash)
      const element = document.getElementById(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    
    // Simuliere Ladezeit für bessere UX
    const timer = setTimeout(() => {
      setIsLoading(false)
      
      // Setze die Links
      setAllLinks({
        "Andon": [
          {
            id: "1",
            title: "Barcode Generator",
            url: "https://tools.microsoft.com/barcode-generator",
            description: "Generate barcodes for inventory items",
            category: "Andon"
          },
          {
            id: "2",
            title: "CSI",
            url: "https://inventory.apple.com/csi",
            description: "Customer Service Inventory",
            category: "Andon"
          },
          {
            id: "3",
            title: "CTI",
            url: "https://tickets.google.com/group/ISS-FRA7-INTERN",
            description: "Customer Ticket Interface",
            category: "Andon"
          },
          {
            id: "4",
            title: "DACHS",
            url: "https://inventory.meta.com/tools",
            description: "Inventory management system",
            category: "Andon"
          },
          {
            id: "5",
            title: "Dr. Sku",
            url: "https://product-tools.oracle.com/sku",
            description: "SKU management tool",
            category: "Andon"
          }
        ],
        "Tools": [
          {
            id: "6",
            title: "Edit Items App",
            url: "https://inventory.microsoft.com/edit-items",
            description: "Edit inventory items",
            category: "Tools"
          },
          {
            id: "7",
            title: "FC Research",
            url: "https://research.apple.com/warehouse",
            description: "Research warehouse data",
            category: "Tools"
          },
          {
            id: "8",
            title: "FC Sku Flip",
            url: "https://inventory.google.com/sku-flip",
            description: "SKU flip tool",
            category: "Tools"
          }
        ]
      })
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const openAllLinks = () => {
    Object.values(allLinks).flat().forEach(link => {
      window.open(link.url, '_blank')
    })
  }

  const categories = [
    'ICQA Tools',
    'ICQA Resources',
    'ICQA Training',
    'ICQA Reports',
    'ICQA Support'
  ]

  return (
    <div className="min-h-screen relative">
      <BackgroundVideo />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      <button 
        onClick={() => window.history.back()}
        className="fixed top-4 left-4 z-50 btn-primary"
      >
        ⬅ Return Home
      </button>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center text-amazon-orange mb-8"
        >
          All Links
        </motion.h1>

        <motion.img 
          src="/Amazon Smile.png" 
          alt="Logo" 
          className="w-48 md:w-64 mx-auto mb-12 animate-float"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <div className="w-12 h-12 border-4 border-amazon-orange border-t-transparent rounded-full animate-spin-slow" />
            <p className="mt-4 text-amazon-text-secondary">Loading links...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[250px,1fr] gap-8">
            <div className="card sticky top-4 h-fit">
              <h3 className="text-xl font-semibold text-amazon-orange mb-4">List of Contents</h3>
              <ul className="space-y-2">
                {categories.map(category => (
                  <li key={category}>
                    <button
                      onClick={() => handleSectionClick(category)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300
                        ${activeSection === category 
                          ? 'bg-amazon-orange text-amazon-dark' 
                          : 'text-amazon-text-secondary hover:bg-white/10'}`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              {categories.map(category => (
                <motion.div
                  key={category}
                  id={category}
                  className="card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-amazon-orange mb-6">{category}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allLinks[category]?.map((link, index) => (
                      <motion.a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 bg-white/5 rounded-lg hover:bg-white/10 
                                 transition-all duration-300 transform hover:-translate-y-1"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {link.title}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={openAllLinks}
            className="btn-primary flex items-center space-x-2"
          >
            <span>Open All Links</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </button>
        </div>

        <footer className="mt-12 card">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <a 
              href="https://employees.microsoft.com/users/jsmith" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amazon-text-secondary hover:text-amazon-orange transition-colors duration-300"
            >
              created by <strong>jsmith</strong>
            </a>
            <a 
              href="mailto:jsmith@microsoft.com?subject=Feedback%20for%20ICQA%20Link%20Hub"
              className="btn-secondary"
            >
              📩 Give Feedback
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default AllLinks 