import TicketManager from "../dao/mongo/manager/TicketManagerMongo.js";

const ticketManager = new TicketManager();

const getTicketsController = async (req, res) => {
    try {
        const tickets = await ticketManager.getTickets()
        return res.sendSuccess(tickets)

    } catch (error) {
        return res.sendInternalError(error)
    }
};

const getTicketByIdController = async (req, res) => {
    const tid = req.params.tid
    try {
        const ticket = await ticketManager.getTicketByUserId(tid)
        return res.sendSuccessWithPayload(ticket)

    } catch (error) {
        return res.sendInternalError(error)
    }
};

const getTicketByUserIdController = async (req, res) => {
    try {
        const uid = req.params.user._id
        const ticket = await ticketManager.getTicketByUserId(uid)
        return res.sendSuccess(ticket)

    } catch (error) {
        return res.sendInternalError(error)
    }
};

const postTicketController = async (req, res) => {
    try {
        const uid = req.user.id
        const cid = req.params.cartID
        const ticketBody = req.body
        const ticket = {
            user: uid,
            cart : cid,
            ...ticketBody
        }
        
        
        return res.sendSuccess(ticket)

    } catch (error) {
        return res.sendInternalError(error)
    }
};

const deleteTicketController = async (req, res) => {
    try {
        const tid = req.params.tid
        const tickets = await ticketManager.deleteTicket(tid)
        return res.sendSuccess(tickets)

    } catch (error) {
        return res.sendInternalError(error)
    }
};

const updateTicketController = async (req, res) => {
    try {
        const tid = req.params.tid
        const ticket = req.params.body
        const tickets = await ticketManager.updateTicket(tid, ticket)
        return sendSuccess.send(tickets)

    } catch (error) {
        return res.sendInternalError(error)
    }
};

export default {
    getTicketsController,
    getTicketByIdController,
    getTicketByUserIdController,
    postTicketController,
    deleteTicketController,
    updateTicketController,
}