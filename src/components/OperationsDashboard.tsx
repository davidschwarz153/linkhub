import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BackgroundVideo from './BackgroundVideo'
import { useLinks } from '../hooks/useLinks'
import { Link } from '../types/Link'

export const OperationsDashboard = () => {
  const { links } = useLinks();
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId)
    const element = document.getElementById(categoryId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const openAllLinks = () => {
    Object.values(links).flat().forEach(link => {
      window.open(link.url, '_blank')
    })
  }

  const tools: Record<string, Link[]> = {
    monitoring: [
      {
        id: "Function Rollup",
        title: "Function Rollup",
        url: "https://metrics-portal.microsoft.com/reports/dataRollup",
        description: "Analyze and monitor productivity metrics",
        category: "monitoring"
      },
      {
        id: "Count Density",
        title: "Count Density",
        url: "https://quality-metrics.google.com/analytics/count_density",
        description: "Central tool for analyzing and monitoring SBC, CC, SRC Counts",
        category: "monitoring"
      },
      {
        id: "Time on Task",
        title: "Time on Task",
        url: "https://time-tracking.apple.com/reports/taskTime",
        description: "Time tracking reports",
        category: "monitoring"
      },
      {
        id: "DACHS Bin Check",
        title: "DACHS Bin Check",
        url: "https://inventory-check.meta.com/bincheck",
        description: "Research and diagnostic tool for bin locations",
        category: "monitoring"
      },
      {
        id: "Command Center",
        title: "Command Center",
        url: "https://dashboard.oracle.com/command-center/monitoring",
        description: "Dashboard for Andons",
        category: "monitoring"
      }
    ],
    andon: [
      {
        id: "Barcode Generator",
        title: "Barcode Generator",
        url: "https://tools.microsoft.com/barcode-generator",
        description: "Generate barcodes for inventory items",
        category: "andon"
      },
      {
        id: "CSI",
        title: "CSI",
        url: "https://inventory.apple.com/csi",
        description: "Customer Service Inventory",
        category: "andon"
      },
      {
        id: "CTI",
        title: "CTI",
        url: "https://tickets.google.com/group/ISS-FRA7-INTERN",
        description: "Customer Ticket Interface",
        category: "andon"
      },
      {
        id: "DACHS",
        title: "DACHS",
        url: "https://inventory.meta.com/tools",
        description: "Inventory management system",
        category: "andon"
      },
      {
        id: "Dr. Sku",
        title: "Dr. Sku",
        url: "https://product-tools.oracle.com/sku",
        description: "SKU management tool",
        category: "andon"
      }
    ],
    audit: [
      {
        id: "Apollo",
        title: "Apollo",
        url: "https://audit.oracle.com/apollo",
        description: "Audit management system",
        category: "audit"
      },
      {
        id: "Eagle Eye",
        title: "Eagle Eye",
        url: "https://monitoring.apple.com/eagle-eye",
        description: "Monitoring and surveillance system",
        category: "audit"
      },
      {
        id: "ISS Resolver",
        title: "ISS Resolver",
        url: "https://resolver.oracle.com/iss",
        description: "Issue resolution system",
        category: "audit"
      }
    ],
    concession: [
      {
        id: "Delete Items App",
        title: "Delete Items App",
        url: "https://inventory.apple.com/delete-items",
        description: "Delete inventory items",
        category: "concession"
      },
      {
        id: "Hub Concession",
        title: "Hub Concession",
        url: "https://analytics.google.com/hub-concession",
        description: "Concession management hub",
        category: "concession"
      },
      {
        id: "ISS Auto Resolver",
        title: "ISS Auto Resolver",
        url: "https://resolver.oracle.com/auto-resolver",
        description: "Automatic issue resolution system",
        category: "concession"
      }
    ],
    dwelling: [
      {
        id: "Aging",
        title: "Aging",
        url: "https://inventory-fra7.apple.com/aging",
        description: "Inventory aging reports",
        category: "dwelling"
      },
      {
        id: "Approval",
        title: "Approval",
        url: "https://approval.google.com/logger",
        description: "Approval management system",
        category: "dwelling"
      },
      {
        id: "Diver",
        title: "Diver",
        url: "https://analytics-fra7.meta.com/diver",
        description: "Inventory analysis tool",
        category: "dwelling"
      },
      {
        id: "Dwelling Inventory Report",
        title: "Dwelling Inventory Report",
        url: "https://reports-fra7.microsoft.com/dwelling-inventory",
        description: "Dwelling inventory reports",
        category: "dwelling"
      },
      {
        id: "Dwelling Inventory Misses",
        title: "Dwelling Inventory Misses",
        url: "https://inventory-fra7.apple.com/misses",
        description: "Inventory discrepancy reports",
        category: "dwelling"
      }
    ],
    gatekeeping: [
      {
        id: "Gatekeeping Dashboard",
        title: "Gatekeeping Dashboard",
        url: "https://gatekeeping.google.com/dashboard",
        description: "Gatekeeping management dashboard",
        category: "gatekeeping"
      }
    ],
    iss: [
      {
        id: "ISS Dashboard",
        title: "ISS Dashboard",
        url: "https://iss.microsoft.com/dashboard",
        description: "ISS management dashboard",
        category: "iss"
      }
    ],
    receive: [
      {
        id: "Receive PS Dashboard",
        title: "Receive PS Dashboard",
        url: "https://receive.google.com/dashboard",
        description: "Receive PS management dashboard",
        category: "receive"
      }
    ],
    removal: [
      {
        id: "Removal Dashboard",
        title: "Removal Dashboard",
        url: "https://removal.microsoft.com/dashboard",
        description: "Removal management dashboard",
        category: "removal"
      }
    ],
    stow: [
      {
        id: "Stow PS Dashboard",
        title: "Stow PS Dashboard",
        url: "https://stow.apple.com/dashboard",
        description: "Stow PS management dashboard",
        category: "stow"
      }
    ],
    tickets: [
      {
        id: "Ticket Management",
        title: "Ticket Management",
        url: "https://tickets.oracle.com/management",
        description: "Ticket management system",
        category: "tickets"
      }
    ]
  }

  const categories = [
    { id: "monitoring", name: "Monitoring" },
    { id: "andon", name: "Andon" },
    { id: "audit", name: "Audit" },
    { id: "concession", name: "Concession" },
    { id: "dwelling", name: "Dwelling Inventory" },
    { id: "gatekeeping", name: "Gatekeeping" },
    { id: "iss", name: "ISS" },
    { id: "receive", name: "Receive PS" },
    { id: "removal", name: "Removal" },
    { id: "stow", name: "Stow PS" },
    { id: "tickets", name: "Tickets" }
  ]

  return (
    <div className="min-h-screen relative">
      <BackgroundVideo />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      <div className="relative z-10">
        <header className="bg-amazon-dark/80 backdrop-blur-sm border-b border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <motion.h1 
                onClick={() => setActiveCategory(null)}
                className="text-2xl font-bold text-amazon-orange cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Operations Dashboard
              </motion.h1>
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
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[250px,1fr] gap-8">
            <nav className="card h-fit">
              <h3 className="text-xl font-semibold text-amazon-orange mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.map(category => (
                  <li key={category.id}>
                    <button
                      onClick={() => handleCategoryClick(category.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300
                        ${activeCategory === category.id 
                          ? 'bg-amazon-orange text-amazon-dark' 
                          : 'text-amazon-text-secondary hover:bg-white/10'}`}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <main className="space-y-8">
              <AnimatePresence mode="wait">
                {activeCategory ? (
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="card"
                  >
                    <h2 className="text-2xl font-bold text-amazon-orange mb-6">
                      {categories.find(c => c.id === activeCategory)?.name}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {tools[activeCategory]?.map((tool, index) => (
                        <motion.a
                          key={index}
                          href={tool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-4 bg-white/5 rounded-lg hover:bg-white/10 
                                   transition-all duration-300 transform hover:-translate-y-1"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <h3 className="text-lg font-semibold text-amazon-text mb-2">{tool.title}</h3>
                          <p className="text-sm text-amazon-text-secondary">{tool.description}</p>
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="card text-center py-12"
                  >
                    <h2 className="text-2xl font-bold text-amazon-orange mb-4">Welcome to Operations Dashboard</h2>
                    <p className="text-amazon-text-secondary">
                      Select a category from the sidebar to view available tools and resources.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
          </div>
        </div>

        <footer className="container mx-auto px-4 py-8">
          <div className="card">
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
          </div>
        </footer>
      </div>
    </div>
  )
}

export default OperationsDashboard 