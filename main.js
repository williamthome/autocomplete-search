const suggestionsUrl = "./suggestions.json"

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

getSuggestions().then(fillSuggestionsList)
