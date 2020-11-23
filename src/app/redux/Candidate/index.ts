import { Params } from '@angular/router';
import { createSelector } from '@ngrx/store';
import { AppState } from '..';
import { CandidatesState } from './candidate.reducers';

export const selectCandidatesState = (state: AppState) => state.candidatesState;

export const selectCandidates = createSelector(
    selectCandidatesState,
    (state: CandidatesState) => state.candidates
);

// export const getCurrentNavigatedProduct = createSelector(
//     selectSkillsState,
//     selectRouteParams,
//     (state: ProductsState, params: Params) => state.products.find(item => item.id === Number(params['id']))
// );