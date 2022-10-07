function renderTransactionAdd(transactionType) {
  document.querySelector('#page').innerHTML = `
    <section class='create-transaction'>
      <form onSubmit="createTransaction(event)" class="form-control-sm">
        <h2>Add ${displayTransactionType(transactionType)}</h2>
        <input type="hidden" name="userEmail" value="${state.loggedInUserEmail}">

        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="nameInput" placeholder="Transaction Title" name="name">
          <label for="nameInput">Name</label>
        </div>

        <div class="input-group mb-3">
          <input type="hidden" name="transactionType" value="${transactionType}">
          ${typeOfTransaction(transactionType)}
          <div class="form-floating">
            <input type="number" min="1" class="form-control" id="amountInput" placeholder="Transaction Amount" name="amount">
            <label for="amountInput">Amount</label>
          </div>
        </div>

        <div class="form-floating mb-3">
          <textarea class="form-control" id="descriptionInput" placeholder="Transaction Description" name="description"></textarea>
          <label for="descriptionInput">Description</label>
        </div>

        <div class="form-floating mb-3">
          <input type="date" class="form-control" id="dateInput" placeholder="10/10/2022" name="date">
          <label for="dateInput">Date</label>
        </div>

        <button class="btn btn-primary">Add ${displayTransactionType(transactionType)}</button>
      </form>
    </section>
  `
}

function typeOfTransaction(type) {
  if (type == 'income') {
    return `<span class="input-group-text input-form-symbol" id="input-form-transaciton-income">+</span>`
  } else if (type == 'expense') {
    return `<span class="input-group-text input-form-symbol" id="input-form-transaciton-expense">-</span>`
  }
}

function displayTransactionType(type) {
  if (type == 'income') {
    return `Income`
  } else if (type == 'expense') {
    return `Expense`
  }
}


function createTransaction(event) {
  event.preventDefault()
  const form = event.target
  const data = Object.fromEntries(new FormData(form))
  // console.log(data.transactionType)
  if (data.transactionType === 'income') {
    data.amount = Math.abs(data.amount)
  } else if (data.transactionType === 'expense') {
    data.amount = -(Math.abs(data.amount))
  }

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
