import { SELECT_NEW_POKEMON, SELECT_SAVED_POKEMON, UNSELECT_POKEMON, COMPARE_POKEMON } from "../actions/actions"

const initialState = {
    selectedPokemon: {},
    comparison: {},
    savedPokemons: []
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case SELECT_NEW_POKEMON:
            return {
                ...state,
                selectedPokemon: action.payload.selectedPokemon,
                savedPokemons: [...state.savedPokemons, action.payload.selectedPokemon]
            }
        case SELECT_SAVED_POKEMON:
            return {
                ...state,
                selectedPokemon: state.savedPokemons.filter(pokemon => pokemon.id === action.payload.id)[0]
            }
        case UNSELECT_POKEMON:
            return { ...state, selectedPokemon: {} }
        case COMPARE_POKEMON:
            return {
                ...state,
                comparison: action.payload.selectedPokemon
            }
        default:
            return state;
    }
}

export default reducer;