import mssql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

export const sqlConfig = {
    user : process.env.USER_NAME as string,
    password:process.env.USER_PWD as string,
    database: process.env.DB_NAME as string,
    server: process.env.MY_SERVER as string,
    pool:{
        max:10,
        min:0,
        idleTimeoutMillis: 30000
    },
    options:{
        encrypt:false,
        trustServerCertificate:true
    }
}
console.log('NEXT TO TEST CONNECTIONS');

async function testConnection (){
    try {
        
        let pool = await mssql.connect(sqlConfig);

        if (pool.connected) {
            console.log("connected to the database");    
        }
        else{
            console.log('Error connecting to the database');
            
        }
    } catch (error) {
       console.log(error);
        
    }
}
testConnection();