import { Action, createReducer, on } from '@ngrx/store';
import { CandidateAnswer } from '../../core/model/CandidateAnswer.interface';

export interface CandidateAnswersState {
    candidateAnswers: CandidateAnswer[];
    currentCandidateAnswer: CandidateAnswer[];
    error: String;
}

export const initialState: CandidateAnswersState = {
    candidateAnswers: [],
    currentCandidateAnswer: [],
    error: ""
};

export const candidateAnswersReducer = createReducer(
    initialState,
    //on(initCandidateSkills, (state, { response }) => ( { ...state, candidateSkills: response.result, error: response.error } )),
    //on(createCandidateSuccess, (state, { response }) => ( { ...state, currentCandidateSkill: response.result } )),
    );

export function reducer(state: CandidateAnswersState , action: Action) {
    return candidateAnswersReducer(state, action);
}