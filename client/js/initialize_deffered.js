
if (state.loggedInUserEmail === null)
{
  renderLandingPage()
} else {
  setTimeout(renderNav(), 200)
  setTimeout(renderMobileNavMenu(), 200)
  setTimeout(renderTransactionOverview(), 500)
}

// console.log(state.loggedInUserEmail)