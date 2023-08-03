import winston from 'winston';
export default class LoggerService {
    constructor(env) {
        this.options = {
            levels: {
              fatal: 0,
              error: 1,
              warning: 2,
              http: 3,
              info: 4,
              debug: 5,
            },
            colors: {
              fatal: 'red',
              error: 'red',
              warning: 'yellow',
              http: 'green',
              info: 'grey',
              debug: 'blue',
            },
          };
          this.logger = this.createLogger(env);
    }

    createLogger = (env) => {
        switch(env){
            case "dev"://entorno de desarrollo
                return winston.createLogger({
                    levels: this.options.levels,
                    transports: [
                        new winston.transports.Console({//logger del endpoint
                            level:"debug",
                            format: winston.format.combine(
                                winston.format.colorize({colors:this.options.colors}),
                                winston.format.simple()
                            )
                        })
                    ]
                })
            case "prod"://entorno de produccion
                return winston.createLogger({
                    levels: this.options.levels,
                    transports: [
                        new winston.transports.Console({
                            level:"info",
                            format: winston.format.combine(
                                winston.format.colorize({colors:this.options.colors}),
                                winston.format.simple()
                            )
                        }),
                        new winston.transports.File({level:"error",filename:'./errors.log'})
                    ]
                })
        }
    }
}