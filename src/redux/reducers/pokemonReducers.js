import {
    SELECT_POKEMON, SELECT_SAVED_POKEMON, UNSELECT_POKEMONS,
    COMPARE_POKEMON, SAVE_POKEMON
} from "../actions/pokemonActions"

const initialState = {
    selectedPokemon: {},
    comparison: {},
    savedPokemons: []
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case SELECT_POKEMON:
            return {
                ...state,
                selectedPokemon: action.payload.selectedPokemon,
            }
        case SELECT_SAVED_POKEMON:
            return {
                ...state,
                selectedPokemon: state.savedPokemons.filter(pokemon => pokemon.id === action.payload.id)[0]
            }
        case UNSELECT_POKEMONS:
            return {
                ...state, selectedPokemon: {}, comparison: {
                }
            }
        case COMPARE_POKEMON:
            return {
                ...state,
                comparison: action.payload.selectedPokemon
            }
        case SAVE_POKEMON:
            return {
                ...state,
                savedPokemons: [...state.savedPokemons, action.payload.selectedPokemon]
            }
        default:
            return state;
    }
}

export default reducer;