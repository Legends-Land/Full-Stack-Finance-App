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


// UPDATE expenses

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const expenseId = Number(req.params.id);

    const updatedExpense = await prisma.expense.update({
      where: { id: expenseId },
  data: {
    name: req.body.name || "Unnamed Expense",
    amount: req.body.amount ?? 0,
    category: req.body.category || "Other",
    date: req.body.date ? new Date(req.body.date) : new Date(),
      },
    });

    res.json(updatedExpense);
  } catch (err) {
    console.error("Update failed:", err);
    res.status(500).json({ message: "Error updating expense" });
  }
});
export default router;
