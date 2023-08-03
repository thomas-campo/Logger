import { Router } from "express";
import ticketController from "../controllers/ticket.controller.js";

const router = Router();

router.get('/', ticketController.getTicketByUserIdController)

router.get('/:tid', ticketController.getTicketByIdController)

router.post('/', ticketController.postTicketController)

router.delete('/:tid', ticketController.deleteTicketController)

router.put('/:tid', ticketController.updateTicketController)