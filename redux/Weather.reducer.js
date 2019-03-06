import { createAction } from 'redux-actions';
import typeToReducer from 'type-to-reducer';

// ------------------------------------
// Constants Setup
// ------------------------------------
const SET_SELECTED_CARD = 'WEATHER/SET_SELECTED_CARD';
const SAVE_WEATHERS = 'WEATHER/SAVE_WEATHERS';
const SET_CITY = "WEATHER/SET_CITY";

// ------------------------------------
// Actions
// ------------------------------------

const setSelectedCard = createAction(SET_SELECTED_CARD);
const saveWeathers = createAction(SAVE_WEATHERS);
const setCity = createAction(SET_CITY);

export const actions = {
    setSelectedCard,
    saveWeathers,
    setCity
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
    weathers: [],
    data: {},
    city: ''
};

const selectCardHandler = (state, action) => ({
    ...state,
    data: action.payload
});

const saveWeatherHandler = (state, action) => ({
    ...state,
    weathers: action.payload
});

const setCityHandlers = (state, action) => ({
    ...state,
    city: action.payload
});

export default typeToReducer({
[SET_SELECTED_CARD]: selectCardHandler,
[SAVE_WEATHERS]: saveWeatherHandler,
[SET_CITY]: setCityHandlers
}, initialState);
