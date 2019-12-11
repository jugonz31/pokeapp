import { createStore, combineReducers } from "redux";
import pokemonReducers from './redux/reducers/pokemonReducers';
import itemReducers from './redux/reducers/itemReducers'

const rootReducer = combineReducers({
    pokemonReducers,
    itemReducers
})

const store = createStore(rootReducer,
window.__REDUX_DEVTOOLS_EXTENSION__ && 
window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
