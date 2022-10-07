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

            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="nameInput" placeholder="Transaction Title" name="name" value="${transaction.name}">
              <label for="nameInput">Name</label>
            </div>
    
            <div class="form-floating mb-3">
              <input type="number" class="form-control" id="amountInput" placeholder="Transaction Amount" name="amount" value="${transaction.amount}">
              <label for="amountInput">Amount</label>
            </div>
    
            <div class="form-floating mb-3">
              <textarea class="form-control" id="descriptionInput" placeholder="Transaction Description" name="description">${transaction.description}</textarea>
              <label for="descriptionInput">Description</label>
            </div>
    
            <div class="form-floating mb-3">
              <input type="date" class="form-control" id="dateInput" placeholder="10/10/2022" name="date" value="${dateToUpdate.toISOString().slice(0, 10)}">
              <label for="dateInput">Date</label>
            </div>

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