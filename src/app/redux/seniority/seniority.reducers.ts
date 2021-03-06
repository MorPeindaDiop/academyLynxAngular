import { Action, createReducer, on } from '@ngrx/store';
import { Seniority } from 'src/app/core/model/Seniority.interface';
import { initSeniorities } from './seniority.actions';


export interface SenioritiesState {
    seniorities: Seniority[];
}

export const initialState: SenioritiesState = {
    seniorities: []
};

export const senioritiesReducer = createReducer(
    initialState,
    on(initSeniorities, (state, { response }) => ( { ...state, seniorities: response.result } )),
    );

export function reducer(state: SenioritiesState , action: Action) {
    return senioritiesReducer(state, action);
}