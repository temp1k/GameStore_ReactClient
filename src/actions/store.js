import {applyMiddleware, compose, legacy_createStore as createStore} from 'redux';
import {thunk} from 'redux-thunk';
import { reducers } from '../reducers'

export const store = createStore(
    reducers,
    compose(
        applyMiddleware(thunk)
    )
)

