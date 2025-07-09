import { useState } from 'react'
import type { RedmineTicket, RedmineSettings } from './types/redmine'
import { Settings } from './components/Settings/Settings'
import { TicketList } from './components/Tickets/TicketList'
import { fetchTickets } from './utils/redmine'
import './App.css'

function App() {
  const [settings, setSettings] = useState<RedmineSettings>({
    redmineUrl: '',
    apiKey: ''
  })
  const [tickets, setTickets] = useState<RedmineTicket[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSettingsChange = async (redmineUrl: string, apiKey: string) => {
    const newSettings = { redmineUrl, apiKey }
    setSettings(newSettings)
    await loadTickets(newSettings)
  }

  const loadTickets = async (currentSettings: RedmineSettings) => {
    if (!currentSettings.redmineUrl || !currentSettings.apiKey) {
      setTickets([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      const data = await fetchTickets(currentSettings)
      setTickets(data)
    } catch (err) {
      setError('Failed to load tickets. Please check your settings and try again.')
      setTickets([])
    } finally {
      setLoading(false)
    }
  }

  const handleTicketSelect = (ticket: RedmineTicket) => {
    // TODO: Implement time entry form
    console.log('Selected ticket:', ticket)
  }

  return (
    <div className="flex flex-col h-full p-4 overflow-hidden">
      <Settings onSettingsChange={handleSettingsChange} />

      {/* Tickets Section */}
      <div className="bg-white rounded-lg shadow-sm p-4 flex-grow overflow-auto">
        <h2 className="text-lg font-semibold mb-4">Tickets</h2>
        
        {error && (
          <div className="text-red-500 mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center text-gray-500">
            Loading tickets...
          </div>
        ) : !settings.redmineUrl || !settings.apiKey ? (
          <div className="text-center text-gray-500">
            Please configure Redmine URL and API Key to view tickets
          </div>
        ) : (
          <TicketList 
            tickets={tickets}
            onTicketSelect={handleTicketSelect}
          />
        )}
      </div>
    </div>
  )
}

export default App
