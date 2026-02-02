import { use } from 'react';
import prisma from '../prismaClient.js'; //Import prisma client. Able to speak to the database
import express from 'express'; //Allows us to create our routes
import { verify } from 'crypto';
import verifyToken from '../middleware/authmiddleWare.js';

const router = express.Router (); //Creates small route for us to use

//GET all expenses for the logged in user
router.get ('/', verifyToken, async (req, res) => { //Handles GET request. Grabs all exp from DB for user
  const expenses = await prisma.expense.findMany({
    where: {
      userId: req.userId
    }
  })
  res.json(expenses)
})

//Create a new expense
router.post ('/', verifyToken, async (req, res)=> {
  const {name, amount, category, date} = req.body

  const expense = await prisma.expense.create({
    data: {
      name,
      amount,
      category,
      date: new Date(date),
      userId: req.userId
  
    }
  })
    res.json(expense)
})

//DELETE a expense
//Grabbing id from URL paremeters
//verifying token with verifyToken 
router.delete('/:id', verifyToken, async (req, res) => {

  //Extractimg the id from the URL
  const expenseId = Number(req.params.id);

  //Going to the DB and finding Expense table
  //Where, we are searching for the table id.
  // expenseId is holding id from URL and userId  user id associated with the users acc. 
  // User can only delete expenses from their account
  const deletedExpense = await prisma.expense.delete({
    where: {
      id: expenseId,
      userId: req.userId
    },
  });
 
  res.json({message: "Expense deleted", deletedExpense});
});

export default router;
