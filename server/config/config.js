module.exports = {
    port: process.env.PORT || 3000,
    db: {
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        options:{
           dialect: process.env.DIALECT || 'sqlite',
           host: process.env.HOST || 'localhost',
           storage: './tabtracker.sqlite'
        }
    }
}