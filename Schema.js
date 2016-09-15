module.exports = {
    server: {
        port: {
            required: true,
            default: 9393
        }
    },
    default: {
        database: {
            type: 'list',
            required: true,
            choices: [
                'mysql'
            ],
            default: 'mysql'
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
                default: 'root'
            },
            password: {
                required: true,
                default: 'root'
            },
            database: {
                required: true
            }
        }
    }
}
