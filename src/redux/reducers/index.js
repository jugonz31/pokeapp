import { combineReducers } from 'redux'
import pokemonReducers from './pokemonReducers'
import itemReducers from './itemReducers'

export default combineReducers({
  pokemonReducers,
  itemReducers
})