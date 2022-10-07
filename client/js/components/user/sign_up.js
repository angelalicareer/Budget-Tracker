function renderSignUp() {
  document.querySelector('#page').innerHTML = `
  <div class="center-dialog d-flex align-items-center justify-content-center">
    <div class="card-body">
      <div class='main-logo'> 
        <img src="https://i.imgur.com/1aor9pi.png" alt="">
        <h3>Sign Up</h3>
      </div>
      <div class="sign-up-form">
        <form onSubmit="createUser(event)" class="form-control-sm">

          <div class="input-group mb-3">
            <span class="input-group-text">@</span>
            <div class="form-floating">
              <input type="text" class="form-control" id="usernameInput" placeholder="Username" name="username">
              <label for="usernameInput">Username</label>
            </div>
          </div>

          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="emailInput" placeholder="name@example.com" name="email">
            <label for="emailInput">Email address</label>
          </div>

          <div class="form-floating mb-5">
            <input type="password" class="form-control" id="passwordInput" placeholder="password" name="password">
            <label for="passwordInput">Password</label>
          </div>
          
          <button class="btn btn-primary">Sign Up</button>
        </form>
      </div>
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
