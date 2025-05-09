const {EveryMonthAvg,CurrentWeekAvg, CurrentWeekPerDay} = require('../controllers/monthlyavghours');
const express=require('express');
const monthlyRouter=express.Router();

monthlyRouter.get('/monthly/:id',EveryMonthAvg);  //  http://localhost:3000/api/avg/monthly/:id
monthlyRouter.get('/weekly/:id',CurrentWeekAvg);   //  http://localhost:3000/api/avg/weekly/:id
monthlyRouter.get('/weekavg/:id', CurrentWeekPerDay )
 
module.exports = monthlyRouter;