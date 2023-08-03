export default class TicketService {
    constructor(dao){
        this.dao = dao;
    }
    getTickets = () => {
        return this.dao.getTickets();
    }
    getTicketById = (TicketId) => {
        return this.dao.getTicketById(TicketId);
    }
    getTicketByUserId = (userId) => {
        return this.dao.getTicketByUserId(userId)
    }
    createTicket = (Ticket) => {
        return this.dao.createTicket(Ticket)
    }
    deleteTicket = (tid) => {
        return this.dao.deleteTicket(tid)
    }
    updateTicket = (tid) => {
        return this.dao.updateTicket(tid)
    }
}