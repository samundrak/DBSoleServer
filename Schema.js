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
                required: true
            },
            username: {
                required: true
            },
            password: {
                required: true
            },
            database: {
                required: true
            }
        }
    }
}
