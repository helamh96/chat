import { createLogger, format, transports } from "winston"

let logger

export default logger = createLogger({
    format: format.combine(
        format.simple(),
        format.timestamp(),
        format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    transports:[
        new transports.File({
            maxsize: 5120000,
            maxFiles:1,
            filename: `${__dirname}/../logs/user-logs.log`
        }),
        new transports.Console({
            level: "debug"
        })
    ]
})