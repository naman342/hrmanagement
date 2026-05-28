const app = require('./app');

const { testConnection } =
    require('./src/config/mysql.connection');

const PORT = process.env.PORT || 3000;

async function startServer() {

    try {

        await testConnection();

        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });

    } catch (error) {

        console.error(
            'Failed to start server:',
            error.message
        );

    }
}

startServer();