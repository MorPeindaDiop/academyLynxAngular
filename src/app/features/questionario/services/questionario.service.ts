import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CandidateAnswer } from 'src/app/core/model/CandidateAnswer.interface';
import { CandidateResponse } from 'src/app/core/model/CandidateResponse.interface';
import { createCandidateAnswer } from 'src/app/redux/candidate-answer/candidate-answer.actions';
import { retrieveAllQuestions } from 'src/app/redux/question/question.actions';

@Injectable({
  providedIn: 'root'
})
export class QuestionarioService {

  constructor(private store: Store) { }

  retrieveAllQuestions() {
    this.store.dispatch(retrieveAllQuestions())
  }

  createCandidateAnswer(idCandidate: number, candidateResponse: CandidateResponse[]) {
    this.store.dispatch(createCandidateAnswer({idCandidate, candidateResponse}))//aggiunta graffe che potrebbero dare errore
  }

}
