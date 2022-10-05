const db = require('../db/db')

const Transaction = {
  findAll: (userId) => {
    const sql = `SELECT * FROM transactions WHERE user_id = $1 ORDER BY id`
    return db
            .query(sql, [userId])
            .then(dbRes => dbRes.rows)
  },

  addTransaction: (userId, startDate, endDate, period, amount, name, description, category) => {
    const sql = `INSERT INTO transactions (user_id, start_date, end_data, period, amount, name, description, category)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                 RETURNING *`

    return db
            .query(sql, [userId, startDate, endDate, period, amount, name, description, category])
            .then(dbRes => dbRes.rows[0])
  },

  updateTransaction: (id, startDate, endDate, period, amount, name, description, category) => {
    const sql = `UPDATE transactions SET start_date=$1, end_data=$2, period=$3, amount=$4, name=$5, description=$6, category=$7
                 WHERE id=$8
                 RETURNING *`

    return db
            .query(sql, [startDate, endDate, period, amount, name, description, category, id])
            .then(dbRes => dbRes.rows[0])
  },

  deleteTransactionById: (id) => {
    const sql = `DELETE FROM transactions WHERE id = $1`
    db.query(sql, [id])
  },

  filterTransactionByTime: (start, end) => {
    const sql = `SELECT * FROM transactions WHERE start_date >= $1 AND start_date <= $2 ORDER BY start_date DESC`
    return db
            .query(sql, [start, end])
            .then(dbRes => dbRes.rows)
  },

  filterTransactionByCategory: (category) => {
    const sql = `SELECT * FROM transactions WHERE category = $1 ORDER BY start_date DESC`
    return db
            .query(sql, [category])
            .then(dbRes => dbRes.rows)
  }
}

module.exports = Transaction
