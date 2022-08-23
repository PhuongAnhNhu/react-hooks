// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {useEffect} from 'react'

function Greeting({initialName = ''}) {
  const localStorageName = window.localStorage.getItem('name')
  // lazy initialization to avoid a performance bottleneck of reading into localStorage on every render.
  const [name, setName] = React.useState(() => localStorageName || initialName)

  useEffect(() => {
    window.localStorage.setItem('name', name)
    console.log(window.localStorage.getItem('name'))
  }, [name])

  function handleChange(event) {
    setName(() => event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
