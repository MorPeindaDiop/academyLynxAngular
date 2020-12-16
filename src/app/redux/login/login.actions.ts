import { createAction, props } from '@ngrx/store';
import { Response } from 'src/app/core/model/Response.interface';
import { User } from 'src/app/core/model/User.interface';

export const retrieveAllUsers = createAction('[User] Users');

export const loginUser = createAction('[User] login', props<{username: string, password: string}>());
export const loginUserCandidate = createAction('[User] login canidate', props<{username: string, password: string, idCandidate: string}>());
export const initUser = createAction('[UserInit] init', props<{user: User}>());
export const loginUserSuccess = createAction('[User] Login Success', props<{user: User}>());
export const loginUserCandidateSuccess = createAction('[User] Login Success', props<{user: User}>());
export const loginUserFailure = createAction('[User] Login Failure', props<{error: string}>());
