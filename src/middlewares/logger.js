import LoggerService from "../services/repository/logger.service.js";
import config from "../config.js";

const logger = new LoggerService(config.logger.CASE)

const attachLogger = (req,res,next) =>{

    req.logger = logger.logger;

    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);//logger cualquier peticion

    next();
}
export default attachLogger;