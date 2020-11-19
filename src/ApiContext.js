import React from 'react'

const ApiContext = React.createContext({
  notes: [],
  folders: [],
  addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
  handleAddFolder: () => {},
})

export default ApiContext;