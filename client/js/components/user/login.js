function renderLogin() {
  document.querySelector('#page').innerHTML = `
  <div class="center-dialog d-flex align-items-center justify-content-center">
    <div class="card-body">
      <section class='main-logo'> 
      <img src="https://i.imgur.com/1aor9pi.png" alt="">
      <h3>Login</h3>
      </section>
      <form onSubmit="login(event)">
        <input type="text" placeholder="Email" name="email" />
        <input type="password" placeholder="Password" name="password" />
        <button class="btn btn-primary">Log in</button>
      </form>
      <i onClick="renderLandingPage()" class="material-icons">arrow_back</i>
    </div>
  </div>
  `
}

function login(event) {
  event.preventDefault()
  const form = event.target
  
  // takes data from the form html tag and converts it into an object literal.
  const data = Object.fromEntries(new FormData(form))

  fetch('/api/sessions', { //talking to server
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }, //sending json data to server
    body: JSON.stringify(data) // converts json to string
  })
    .then(res => res.json()) // get response from server
    .then(res => {
      if (res.error) {
        renderLogin()
        renderError(res.error)
      } else {
        state.loggedInUserEmail = res.email
        state.loggedInUsername = res.username
        let data = `{ "userEmail" : "${state.loggedInUserEmail}" }`

        fetch('/api/transactions/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: data
        })
          .then(res => res.json())
          .then(res => {
            if (res.error) {
              renderError(res.error)
            } else {
              state.userTransactions = res
            }

            renderNav()
            renderMobileNavMenu()
            renderTransactionOverview()
            console.log('logged in')
          })
      }
    })
}

function renderError(errorMessage) {
  const page = document.querySelector('#page')
  page.innerHTML = `
    <div class="alert alert-danger" role="alert">
      ${errorMessage}
    </div>` + page.innerHTML
}