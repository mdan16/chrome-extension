export interface RedmineTicket {
  id: number;
  subject: string;
  project: {
    id: number;
    name: string;
  };
  status: {
    id: number;
    name: string;
  };
  assigned_to?: {
    id: number;
    name: string;
  };
}

export interface RedmineTimeEntry {
  issue_id: number;
  hours: number;
  activity_id: number;
  comments: string;
  spent_on: string;
}

export interface RedmineSettings {
  redmineUrl: string;
  apiKey: string;
}
