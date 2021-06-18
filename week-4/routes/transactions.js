const { Router } = require("express");
const router = Router({ mergeParams: true });

const transactionDAO = require('../daos/transaction');
const userDAO = require('../daos/user');

// Create
router.post("/", async (req, res, next) => {
  const userId = req.params.userId;
  const transaction = req.body;
  transaction.userId = userId;
  if (!transaction || JSON.stringify(transaction) === '{}' ) {
    res.status(400).send('transaction is required');
  } else {
    try {
      const savedtransaction = await transactionDAO.create(transaction);
      res.json(savedtransaction); 
    } catch(e) {
      res.status(500).send(e.message);
    }
  }
});

// Read - single transaction
router.get("/:id", async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const transaction = await transactionDAO.getById(userId, req.params.id);
    // TODO populate user field in response with actual user data
    if (transaction) {
      res.json(transaction);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Read - all transactions
router.get("/", async (req, res, next) => {
  const userId = req.params.userId;
  let { page, perPage } = req.query;
  page = page ? Number(page) : 0;
  perPage = perPage ? Number(perPage) : 10;
  const transactions = await transactionDAO.getAll(userId, page, perPage);
  res.json(transactions);
});

// Update
router.put("/:id", async (req, res, next) => {
  const userId = req.params.userId;
  const transactionId = req.params.id;
  const transaction = req.body;
  transaction.userId = userId;
  if (!transaction || JSON.stringify(transaction) === '{}' ) {
    res.status(400).send('transaction is required"');
  } else {
    try {
      const updatedtransaction = await transactionDAO.updateById(userId, transactionId, transaction);
      res.json(updatedtransaction);
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
});

// Delete
router.delete("/:id", async (req, res, next) => {
  const userId = req.params.userId;
  const transactionId = req.params.id;
  try {
    await transactionDAO.deleteById(userId, transactionId);
    res.sendStatus(200);
  } catch(e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
