

export const EnvConfiguration = () => ({

    enviroment : process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGODB,
    puerto: process.env.PUERTO  || 3001,
    limitedefecto: process.env.LIMITEDEFECTO || 4

})