function renderTransactionEdit(itemId) {
  fetch(`/api/transactions/${itemId}/edit`)
    .then(res => res.json())
    .then(transaction => {
      let dateToUpdate = new Date(transaction.date)

      document.querySelector('#page').innerHTML = `
        <main class="edit_add">
          <form onSubmit="updateTransaction(event)">
            <h2>Edit Transaction</h2>
            <input type="hidden" name="id" value="${transaction.id}">
            <fieldset>
              <label for="name">Name: </label>
              <input type="text" name="name" value="${transaction.name}">
            </fieldset>

            <fieldset>
              <label for="description">Description: </label>
              <input type="text" name="description" value="${transaction.description}">
            </fieldset>

            <fieldset>
              <label for="amount">Amount: </label>
              <input type="text" name="amount" value="${transaction.amount}">
            </fieldset>

            <fieldset>
              <label for="date">Date: </label>
              <input type="date" name="date" value="${dateToUpdate.toISOString().slice(0, 10)}">
            </fieldset>

            <button class="btn btn-primary">Save</button>
          </form>
        </main>
      `
    })
}

function updateTransaction(event) {
  event.preventDefault()
  const form = event.target
  const data = Object.fromEntries(new FormData(form))

  fetch(`/api/transactions/${data.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        renderError(res.error)
      } else {
        state.userTransactions = state.userTransactions
        .map(transaction => {
          // console.log(`${transaction.id} vs ${updatedTransaction.id}`)
          if (transaction.id === res.id) {
            return res
          } else {
            return transaction
          }
        })
      }
      renderTransactionManager()
    })
}

function renderError(errorMessage) {
  const page = document.querySelector('#page')
  page.innerHTML = `
    <div class="alert alert-danger" role="alert">
      ${errorMessage}
    </div>` + page.innerHTML
}