function renderSignUp() {
  document.querySelector('#page').innerHTML = `
  <div class="center-dialog d-flex align-items-center justify-content-center">
    <div class="card-body">
      <section class='main-logo'> 
      <img src="https://i.imgur.com/1aor9pi.png" alt="">
      <h3>Sign Up</h3>
      </section>
      <form onSubmit="createUser(event)">
        <input type="text" placeholder="Name" name="username" />
        <input type="text" placeholder="Email" name="email" />
        <input type="password" placeholder="Password" name="password" />
        <button class="btn btn-primary">Sign Up</button>
      </form>

       <i onClick="renderLandingPage()" class="material-icons">arrow_back</i>
    </div>
  </div>
  `
}

function createUser(event){
  event.preventDefault()
  const form = event.target
  const data = Object.fromEntries(new FormData(form))

  fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        renderError(res.error)
      } else {
        renderLogin()
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