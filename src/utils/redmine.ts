import type { RedmineSettings, RedmineTicket, RedmineTimeEntry } from '../types/redmine';

export async function fetchTickets(settings: RedmineSettings): Promise<RedmineTicket[]> {
  if (!settings.redmineUrl || !settings.apiKey) {
    return [];
  }

  try {
    const response = await fetch(`${settings.redmineUrl}/issues.json?status_id=open`, {
      headers: {
        'X-Redmine-API-Key': settings.apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.issues;
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
}

export async function createTimeEntry(settings: RedmineSettings, timeEntry: RedmineTimeEntry): Promise<void> {
  if (!settings.redmineUrl || !settings.apiKey) {
    throw new Error('Redmine URL and API Key are required');
  }

  try {
    const response = await fetch(`${settings.redmineUrl}/time_entries.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Redmine-API-Key': settings.apiKey,
      },
      body: JSON.stringify({ time_entry: timeEntry }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error creating time entry:', error);
    throw error;
  }
}
