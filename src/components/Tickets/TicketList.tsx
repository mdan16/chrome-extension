import type { RedmineTicket } from '../../types/redmine';

interface TicketListProps {
  tickets: RedmineTicket[];
  onTicketSelect: (ticket: RedmineTicket) => void;
}

export function TicketList({ tickets, onTicketSelect }: TicketListProps) {
  if (tickets.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No tickets found
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          className="border rounded p-3 hover:bg-gray-50 cursor-pointer"
          onClick={() => onTicketSelect(ticket)}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">#{ticket.id}</span>
                <span className="text-sm font-medium">{ticket.project.name}</span>
              </div>
              <h3 className="text-sm font-medium mt-1">{ticket.subject}</h3>
            </div>
            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
              {ticket.status.name}
            </span>
          </div>
          {ticket.assigned_to && (
            <div className="mt-2 text-sm text-gray-500">
              Assigned to: {ticket.assigned_to.name}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
