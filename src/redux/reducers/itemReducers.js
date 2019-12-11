import { SELECT_ITEM, SELECT_SAVED_ITEM, UNSELECT_ITEM } from '../actions/itemActions'

const initialState = {
    selectedItem: "",
    savedItems: []
}

function itemReducers(state = initialState, action) {
    switch (action.type) {
        case SELECT_ITEM:
            return {
                selectedItem: action.payload.selectedItem,
                savedItems: [...state.savedItems, action.payload.selectedItem]
            }
        case SELECT_SAVED_ITEM:
            return {
                ...state,
                selectedItem: state.savedItems.filter(item => item.id === action.payload.id)[0]
            }
        case UNSELECT_ITEM:
            return {
                ...state,
                selectedItem: {}
            }
        default:
            return state;
    }
}

export default itemReducers;