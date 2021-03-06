import { Action, createReducer, on } from '@ngrx/store';
import { Question } from 'src/app/core/model/Question.interface';
import { initQuestions, resetQuestion } from './question.actions';

export interface QuestionsState {
    questions: Question[];
}

export const initialState: QuestionsState = {
    questions: []
};

export const questionsReducer = createReducer(
    initialState,
    on(initQuestions, (state, { response }) => ({ /*...state,*/ questions: response.result })),
    on(resetQuestion, (state, {  }) => ({ /*...state,*/ questions:[] })),
);

export function reducer(state: QuestionsState, action: Action) {
    return questionsReducer(state, action);
}