const suggestionsUrl = "./suggestions.json"

/**
 *
 * @returns {Promise<string[]|undefined>}
 */
async function getSuggestions() {
  try {
    const response = await fetch(suggestionsUrl)
    if (!response.ok) throw response

    const { suggestions } = await response.json()
    return suggestions
  } catch (reason) {
    console.error(reason)
    return undefined
  }
}

const suggestionsList = document.getElementById("suggestionsList")

function clearSuggestionsList() {
  while (suggestionsList.lastChild) {
    suggestionsList.removeChild(suggestionsList.lastChild)
  }
}

function fillSuggestionsList(suggestions) {
  clearSuggestionsList()

  const suggestionsFragment = document.createDocumentFragment()

  for (const suggestion of suggestions) {
    const suggestionAsListItem = document.createElement("li")
    suggestionAsListItem.innerText = suggestion

    suggestionsFragment.appendChild(suggestionAsListItem)
  }

  suggestionsList.appendChild(suggestionsFragment)
}

const searchField = document.getElementById("searchField")

function onSuggestionsScroll(e) {
  /** @type {HTMLElement} */
  const suggestionsElem = e.target
  const { scrollTop } = suggestionsElem

  const searchFieldFloatClassName = "search__nav"
  const isSearchFieldFloating = searchField.classList.contains(searchFieldFloatClassName)

  scrollTop === 0 && isSearchFieldFloating && searchField.classList.remove(searchFieldFloatClassName)
  scrollTop > 0 && !isSearchFieldFloating && searchField.classList.add(searchFieldFloatClassName)
}

async function onUserSearch(e) {
  const suggestions = await getSuggestions()
  if (!suggestions) {
    alert("Some error occured. Press F12 and check the console.")
    return
  }

  /** @type {HTMLInputElement} */
  const searchElem = e.target
  const userSearchValue = searchElem.value.toLowerCase()

  const matchResult = suggestions
    .map(s => s.toLowerCase())
    .filter(s => s.includes(userSearchValue))

  fillSuggestionsList(matchResult)
}