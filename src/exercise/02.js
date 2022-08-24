// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'

function useLocalStoragetState(key, defaultValue = '') {
  const value = window.localStorage.getItem(key)
  const [state, setState] = useState(() => value || defaultValue)

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStoragetState('name', initialName)

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
