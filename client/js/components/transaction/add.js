function renderTransactionAdd() {
  document.querySelector('#page').innerHTML = `
    <section class='create-transaction'>
      <form onSubmit="createTransaction(event)">
        <h2>Add transaction</h2>
        <input type="hidden" name="userEmail" value="${state.loggedInUserEmail}">

        <fieldset>
          <label for="">Name: </label>
          <input type="text" name="name">
        </fieldset>
        
        <fieldset>
          <label for="">Amount: </label>
          <input type="number" name="amount" value="0">
        </fieldset>

        <fieldset>
          <label for="">Description: </label>
          <input type="text" name="description">
        </fieldset>

        <fieldset>
          <label for="">Date paid: </label>
          <input type="date" name="date" value="${state.currentDate.toISOString().slice(0, 10)}">
        </fieldset>

        <button class="btn btn-primary">Add Transaction</button>
      </form>
    </section>
  `
}

function createTransaction(event) {
  event.preventDefault()
  const form = event.target
  const data = Object.fromEntries(new FormData(form))

  fetch('/api/transactions', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        renderError(res.error)
      } else {
        state.userTransactions.push(res)
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
