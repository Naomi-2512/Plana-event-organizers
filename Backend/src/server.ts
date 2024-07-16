import cors from 'cors';
import express, { Express, json, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv'
import userRouter from './routes/user.routes'
import bookingRouter from './routes/bookings.routes'
import eventsRouter from './routes/event.routes'

dotenv.config();

const app = express();

app.use(json());
app.use(cors());
app.use('/users',userRouter);
app.use('/bookings',bookingRouter);
app.use('events' , eventsRouter)

app.use((err:Error, req:Request,res:Response, next:NextFunction) => {
    res.json({
        message:err.message
    })
});

app.listen(3000, ()=>{
    console.log(`server is running on port 3000` )
})