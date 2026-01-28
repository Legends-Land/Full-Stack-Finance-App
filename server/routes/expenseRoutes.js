import { use } from 'react';
import prisma from '../prismaClient.js'; //Import prisma client. Able to speak to the database
import express from 'express'; //Allows us to create our routes

const router = express.Router (); //Creates small route for us to use

//GET all expenses for the logged in user
router.get ('/', async (req, res) => { //Handles GET request. Grabs all exp from DB for user
  const expenses = await prisma.expense.findMany ({
    where: {
      expenseId: req.userId
    }
  })
  res.json(expenses)
})

//Create a new expense
router.post ('/', async (req, res)=> {
  const {title, amount, category, date} = req.body

  const expense = await prisma.expense.create ({
    data: {
      title,
      amount,
      category,
      date,
      userId: req.userId
  
    }
  })
    res.json(expense)
})

export default router;
