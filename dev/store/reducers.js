import {
    ADD_TODO,
    TOGGLE_TODO,
    SET_VISIBILITY_FILTER,
    VisibilityFilters,
} from './actions';
import {combineReducers} from 'redux';

// receive todos as state
function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO: {
            return [
                ...state,
                {
                    text: action.text,
                    completed: false,
                },
            ];
        }
        case TOGGLE_TODO: {
            return state.todos.map((todo, index) => {
                if (index === action.index) {
                    return {
                        ...todo,
                        completed: !todo.completed,
                    };
                }

                return todo;
            });
        }
        default: {
            return state;
        }
    }
}

function visibilityFilter(state = VisibilityFilters.SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER: {
            return action.filter;
        }
        default: {
            return state;
        }
    }
}

const todoApp = combineReducers({
    visibilityFilter,
    todos,
});

export default todoApp;
