function renderEditTransaction() {
  document.querySelector('#page').innerHTML = `
  <main>
  <form onSubmit="editTransaction(event)">
    <h2>
      Edit Transaction
    </h2>
    <section>
      <label for="">Name: </label>
      <input type="text" name="name">
    </section>
    <section>
      <label for="">Amount: </label>
      <input type="text" name="email">
    </section>
    <section>
      <label for="">Description: </label>
      <input type="text" name="description">
    </section>
    <button>Sign Up</button>
    </form>
   </main>
  `
}

function editTransaction(event) {
  event.preventDefault()
  const form = event.target
  const data = Object.fromEntries(new FormData(form))

  fetch(`/api/transactions/${data.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(userName => {
      state.loggedInUserName = userName
      renderTransactionHistory()
    })
}