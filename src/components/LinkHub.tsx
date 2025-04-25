import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LinkHubProps {
  searchQuery: string
}

interface Link {
  id: string
  title: string
  url: string
  description: string
  category: string
}

const LinkHub = ({ searchQuery }: LinkHubProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [filteredLinks, setFilteredLinks] = useState<Link[]>([])

  useEffect(() => {
    // Simuliere Ladezeit
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const links: Link[] = [
      // Monitoring
      {
        id: "1",
        title: "Function Rollup",
        url: "https://metrics-portal.microsoft.com/reports/dataRollup?reportFormat=HTML&warehouseId=FRA7&processId=1003030&startDateWeek=2025%2F03%2F07&spanType=Month&startDateMonth=2025%2F02%2F01&maxIntradayDays=1&startDateIntraday=2025%2F03%2F10&startHourIntraday=6&startMinuteIntraday=0&endDateIntraday=2025%2F03%2F10&endHourIntraday=9&endMinuteIntraday=0",
        description: "Analyze and monitor productivity metrics",
        category: "Monitoring"
      },
      {
        id: "2",
        title: "Count Density",
        url: "https://quality-metrics.google.com/analytics/count_density",
        description: "Central tool for analyzing and monitoring SBC, CC, SRC Counts",
        category: "Monitoring"
      },
      {
        id: "3",
        title: "Time on Task",
        url: "https://time-tracking.apple.com/reports/taskTime",
        description: "Time tracking reports",
        category: "Monitoring"
      },
      {
        id: "4",
        title: "DACHS Bin Check",
        url: "https://inventory-check.meta.com/bincheck",
        description: "Research and diagnostic tool for bin locations, performing audits for specific ASINs",
        category: "Monitoring"
      },
      {
        id: "5",
        title: "Command Center",
        url: "https://dashboard.oracle.com/command-center/monitoring",
        description: "Dashboad for Andons",
        category: "Monitoring"
      },
      
      // Andon
      {
        id: "6",
        title: "Barcode Generator",
        url: "https://tools.microsoft.com/barcode-generator",
        description: "Generate barcodes for inventory items",
        category: "Andon"
      },
      {
        id: "7",
        title: "CSI",
        url: "https://inventory.apple.com/csi",
        description: "Customer Service Inventory",
        category: "Andon"
      },
      {
        id: "8",
        title: "CTI",
        url: "https://tickets.google.com/group/ISS-FRA7-INTERN",
        description: "Customer Ticket Interface",
        category: "Andon"
      },
      {
        id: "9",
        title: "DACHS",
        url: "https://inventory.meta.com/tools",
        description: "Inventory management system",
        category: "Andon"
      },
      {
        id: "10",
        title: "Dr. Sku",
        url: "https://product-tools.oracle.com/sku",
        description: "SKU management tool",
        category: "Andon"
      },
      
      // Audit
      {
        id: "11",
        title: "Apollo",
        url: "https://audit.oracle.com/apollo",
        description: "Audit management system",
        category: "Audit"
      },
      {
        id: "12",
        title: "Eagle Eye",
        url: "https://monitoring.apple.com/eagle-eye",
        description: "Monitoring and surveillance system",
        category: "Audit"
      },
      {
        id: "13",
        title: "ISS Resolver",
        url: "https://resolver.oracle.com/iss",
        description: "Issue resolution system",
        category: "Audit"
      },
      
      // Concession
      {
        id: "14",
        title: "Delete Items App",
        url: "https://inventory.apple.com/delete-items",
        description: "Delete inventory items",
        category: "Concession"
      },
      {
        id: "15",
        title: "Hub Concession",
        url: "https://analytics.google.com/hub-concession",
        description: "Concession management hub",
        category: "Concession"
      },
      {
        id: "16",
        title: "ISS Auto Resolver",
        url: "https://resolver.oracle.com/auto-resolver",
        description: "Automatic issue resolution system",
        category: "Concession"
      },
      
      // Dwelling Inventory
      {
        id: "17",
        title: "Aging",
        url: "https://inventory-fra7.apple.com/aging",
        description: "Inventory aging reports",
        category: "Dwelling Inventory"
      },
      {
        id: "18",
        title: "Approval",
        url: "https://approval.google.com/logger",
        description: "Approval management system",
        category: "Dwelling Inventory"
      },
      {
        id: "19",
        title: "Diver",
        url: "https://analytics-fra7.meta.com/diver",
        description: "Inventory analysis tool",
        category: "Dwelling Inventory"
      },
      {
        id: "20",
        title: "Dwelling Inventory Report",
        url: "https://reports-fra7.microsoft.com/dwelling-inventory",
        description: "Dwelling inventory reports",
        category: "Dwelling Inventory"
      },
      {
        id: "21",
        title: "Dwelling Inventory Misses",
        url: "https://inventory-fra7.apple.com/misses",
        description: "Inventory discrepancy reports",
        category: "Dwelling Inventory"
      },
      
      // Gatekeeping
      {
        id: "22",
        title: "Gatekeeping Dashboard",
        url: "https://gatekeeping.google.com/dashboard",
        description: "Gatekeeping management dashboard",
        category: "Gatekeeping"
      },
      
      // ISS
      {
        id: "23",
        title: "ISS Dashboard",
        url: "https://iss.microsoft.com/dashboard",
        description: "ISS management dashboard",
        category: "ISS"
      },
      
      // Receive PS
      {
        id: "24",
        title: "Receive PS Dashboard",
        url: "https://receive.google.com/dashboard",
        description: "Receive PS management dashboard",
        category: "Receive PS"
      },
      
      // Removal
      {
        id: "25",
        title: "Removal Dashboard",
        url: "https://removal.microsoft.com/dashboard",
        description: "Removal management dashboard",
        category: "Removal"
      },
      
      // Stow PS
      {
        id: "26",
        title: "Stow PS Dashboard",
        url: "https://stow.apple.com/dashboard",
        description: "Stow PS management dashboard",
        category: "Stow PS"
      },
      
      // Tickets
      {
        id: "27",
        title: "Ticket Management",
        url: "https://tickets.oracle.com/management",
        description: "Ticket management system",
        category: "Tickets"
      }
    ]

    const filtered = links.filter(link => 
      link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.category.toLowerCase().includes(searchQuery.toLowerCase())
    )

    setFilteredLinks(filtered)
  }, [searchQuery])

  const categories = [...new Set(filteredLinks.map(link => link.category))]

  const openAllLinks = () => {
    filteredLinks.forEach(link => {
      window.open(link.url, '_blank')
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <div className="w-12 h-12 border-4 border-amazon-orange border-t-transparent rounded-full animate-spin-slow" />
          <p className="mt-4 text-amazon-text-secondary">Loading links...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {categories.map((category, index) => (
              <motion.div
                key={category}
                className="card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <h2 className="text-2xl font-bold text-amazon-orange mb-6">{category}</h2>
                <div className="space-y-4">
                  {filteredLinks
                    .filter(link => link.category === category)
                    .map((link, linkIndex) => (
                      <motion.a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 bg-white/5 rounded-lg hover:bg-white/10 
                                 transition-all duration-300 transform hover:-translate-y-1"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        title={link.description}
                      >
                        <h3 className="text-lg font-semibold text-amazon-text mb-2">{link.title}</h3>
                        <p className="text-sm text-amazon-text-secondary">{link.description}</p>
                      </motion.a>
                    ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {!isLoading && filteredLinks.length > 0 && (
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
      )}
    </div>
  )
}

export default LinkHub 