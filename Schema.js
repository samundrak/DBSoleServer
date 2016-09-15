module.exports = {
    server: {
        port: {}
    },
    default: {
        database: {
            type: 'list',
            required: true,
            choices: [
                'mysql'
            ],
            default: 'mysql',
            message: "Select Database"
        }
    },
    database: {
        mysql: {
            hostname: {
                required: true,
                default: 'localhost'
            },
            username: {
                required: true,
                default: 'root',
                message: "Enter database username"
            },
            password: {
                required: true,
                default: 'root',
                message: "Enter database password"
            },
            database: {
                required: true,
                message: "Enter database name"
            }
        }
    }
}
