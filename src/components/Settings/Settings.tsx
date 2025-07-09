import { useEffect, useState } from 'react'

interface SettingsProps {
  onSettingsChange: (url: string, key: string) => void;
}

export function Settings({ onSettingsChange }: SettingsProps) {
  const [redmineUrl, setRedmineUrl] = useState('')
  const [apiKey, setApiKey] = useState('')

  // Load settings from Chrome Storage
  useEffect(() => {
    chrome.storage.sync.get(['redmineUrl', 'apiKey']).then((result) => {
      if (result.redmineUrl) setRedmineUrl(result.redmineUrl)
      if (result.apiKey) setApiKey(result.apiKey)
    })
  }, [])

  // Save settings to Chrome Storage
  const handleChange = (newUrl: string, newKey: string) => {
    chrome.storage.sync.set({
      redmineUrl: newUrl,
      apiKey: newKey
    }).then(() => {
      onSettingsChange(newUrl, newKey)
    })
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <h2 className="text-lg font-semibold mb-4">Settings</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="redmineUrl" className="block text-sm font-medium text-gray-700">
            Redmine URL
          </label>
          <input
            type="url"
            id="redmineUrl"
            value={redmineUrl}
            onChange={(e) => {
              setRedmineUrl(e.target.value)
              handleChange(e.target.value, apiKey)
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="https://your-redmine.example.com"
          />
        </div>
        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">
            API Key
          </label>
          <input
            type="password"
            id="apiKey"
            value={apiKey}
            onChange={(e) => {
              setApiKey(e.target.value)
              handleChange(redmineUrl, e.target.value)
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Your Redmine API Key"
          />
          <p className="mt-1 text-sm text-gray-500">
            Find your API key in Redmine under My Account ➜ API access key
          </p>
        </div>
      </div>
    </div>
  )
}
