const express = require('express')
const router = express.Router()

// models
const Transaction = require('../models/transaction')

// routes
// read
router.get('/', (req, res) => {
  Transaction
    .findAll()
    .then(transactions => res.json(transactions))
})

// create
router.post('/', (req, res) => {
  const {name, category, amount, description, period, starDate, endDate} = req.body


  Transaction
    .create(name, category, amount, description, period, starDate, endDate)
    .then(transaction => res.json(transaction))
})

// update
// router.put('/', (req, res) => {
//   const transactionId = req.params.id
router.get('/:id', (req, res) => {
  const transactionId = req.params.id

  Transaction
    .find(transactionId)
    .then(() => res.json({message: `grabbed ${transactionId}`}))
})

router.put('/:id', (req, res) => {
  const {name, category, amount, description, period, starDate, endDate} = req.body

  Transaction
    .update(req.params.id, name, category, amount, description, period, starDate, endDate)

})

// delete
router.delete('/:id', (req, res) => {
  const transactionId = req.params.id

  Transaction
    .delete(transactionId)
    .then(() => res.json({message: 'deleted successfully'}))
})

module.exports = router
