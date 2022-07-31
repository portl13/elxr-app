export const ToolbarStyle = {
  options: ['blockType', 'inline', 'list', 'textAlign', 'history', 'link'],
  inline: {
    inDropdown: false,
    options: ['bold', 'italic', 'underline'],
  },
  list: {
    inDropdown: false,
    options: ['unordered', 'ordered'],
  },
  link: {
    inDropdown: false,
    options: ['link'],
    linkCallback: undefined,
  },
  textAlign: {
    inDropdown: true,
  },
}

export const convertToPlain = (html) => {
  if (!document) return false
  // Create a new div element
  let tempDivElement = document.createElement('div')
  // Set the HTML content with the given value
  tempDivElement.innerHTML = html
  // Retrieve the text property of the element
  return tempDivElement.textContent || tempDivElement.innerText || ''
}
