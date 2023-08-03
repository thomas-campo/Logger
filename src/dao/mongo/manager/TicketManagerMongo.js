import ticketModel from "../models/ticket.js";

export default class TicketManager {
    
    createTicket = async (ticket) => {         
        return await ticketModel.create(ticket)
    }

    getTickets = async () => {
        return await ticketModel.find()
    }

    getTicketByUserId = async (uid) => {
        return await ticketModel.find({ user: uid})
    }

    getTicketById = async (ticketId) => {
        return await ticketModel.findOne({ _id: ticketId }).lean()
    }

    deleteTicket = async (ticketId) => {
        return await ticketModel.deleteOne({ _id: ticketId })
    }

    updateTicket = async (id, ticket) => {
        return await ticketModel.findOneAndUpdate(id, { $set: ticket })
    }

};