import dotenv from 'dotenv';

dotenv.config();

export default {
    app:{
        PORT:process.env.PORT||8080
    },
    mongo:{
        URL:process.env.MONGO_URL||'localhost:27017'
    },
    admin:{
        EMAIL:process.env.ADMIN_EMAIL,
        PASSWORD:process.env.ADMIN_PASSWORD
    },
    logger:{
        CASE:process.env.CASE_LOGGER
    }
}