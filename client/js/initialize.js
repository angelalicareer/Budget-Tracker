let metaTagsURL5 = document.getElementsByClassName('add-url-meta-tags')
for (let tag = 0; tag < metaTagsURL5.length; tag++) {
  if (!metaTagsURL5[tag].content.includes(document.URL)) {
    metaTagsURL5[tag].content = document.URL + metaTagsURL5[tag].content
  }  
}

const state = {
  userTransactions: [],
  loggedInUserEmail: null,
  currentDate: new Date(),
  loggedInUsername: null
}

fetch('/api/sessions', {
  method: 'GET'
})
.then(res => res.json())
.then(userData => {
  if (typeof userData.email === 'string') {
    state.loggedInUserEmail = userData.email
    state.loggedInUsername = userData.username
    console.log("logged in, loading session data")

    renderNav()
    renderMobileNavMenu()

    let data = `{ "userEmail" : "${userData.email}" }`

    fetch('/api/transactions/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data
    })
      .then(res => res.json())
      .then(transactions => {
        state.userTransactions = transactions
        renderTransactionOverview()
        console.log("logged in, loading user's transaction data")
      })
  }
})

function renderError(errorMessage, domLocation) {
  const page = document.querySelector(domLocation)
  page.innerHTML = `
    <div class="alert alert-danger alert-dismissible d-flex align-items-center" role="alert">
      <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
      </svg>
      <h2>${errorMessage}</h2>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  ` + page.innerHTML
}
