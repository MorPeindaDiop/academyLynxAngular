import { Component, OnDestroy, OnInit, SimpleChange, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Candidate } from 'src/app/core/model/Candidate.interface';
import { CandidateResponse } from 'src/app/core/model/CandidateResponse.interface';
import { Question } from 'src/app/core/model/Question.interface';
import { Seniority } from 'src/app/core/model/Seniority.interface';
import { getCurrentCandidate } from 'src/app/redux/candidate';
import { selectQuestions } from 'src/app/redux/question';
import { selectSeniorities } from 'src/app/redux/seniority';
import { selectCandidatesSkill } from 'src/app/redux/candidate-skill';
import { QuestionarioService } from '../services/questionario.service';
import { Observable } from 'rxjs';
import { Skill } from 'src/app/core/model/Skill.interface';
import { selectSkills } from 'src/app/redux/skill';
import { getCurrentUser } from 'src/app/redux/login';
import { User } from 'src/app/core/model/User.interface';


@Component({
  selector: 'app-questionario',
  templateUrl: './questionario.component.html',
  styleUrls: ['./questionario.component.scss']
})
export class QuestionarioComponent implements OnInit, OnDestroy {

  rispostaForm: FormGroup;
  allQuestions = [];
  questions = [];
  candidate: Candidate;
  user:User;
  i: number = 0;
  candidateResponse: CandidateResponse[] = [];
  seniority: Seniority;
  candidateSkills: number[] = [];
  Msg: boolean=false;
  buttonText: string="AVANTI";
  
  splitted = [];

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  constructor(private store: Store, private questionarioService: QuestionarioService, private fb: FormBuilder, private router: Router, ) {
    
console.log("costruttore questionaraio")

    this.questionarioService.retrieveAllQuestions();

    setTimeout(() => {
      this.goResult()
    }, 1800000);

    this.rispostaForm = this.fb.group({
      idQuestion: ['', Validators.required],
      candidateResponse: ['', Validators.required]
    })

    this.questionarioService.retrieveAllSkills();

  }

  get skills(): Observable<Skill[]> {
    return this.store.pipe(select(selectSkills));
  }
  
  ngOnDestroy(){
    console.log("SIAMO DENTRO GG BOYS on destroy questionario")
    this.questions=[]
    this.splitted=[]
    console.log(this.questions)
   

  }
  ngOnInit() {
    
    console.log("siamo dentro all on init questionario")
    this.store.pipe(select(getCurrentCandidate)).subscribe((candidate) => { return this.candidate = candidate })
  

    this.store.pipe(select(selectSeniorities)).subscribe((seniorities) => { 
      for (let seniority of seniorities) {
        if (seniority.id == this.candidate.idSeniority) {
          return this.seniority = seniority;
        }
      }
    })

    this.store.pipe(select(selectCandidatesSkill)).subscribe((candidateSkills) => {
      for (let candidateSkill of candidateSkills) {
        if (candidateSkill.idCandidate == this.candidate.id) {
          this.candidateSkills.push(candidateSkill.idSkill)
        }
      }
    })

    

    this.store.pipe(select(selectQuestions)).subscribe((question) => {
      for (let item of question) {
        for (let idSkill of this.candidateSkills) {
          if (item.difficulty >= this.seniority.minDifficulty && item.difficulty <= this.seniority.maxDifficulty && item.idSkill == idSkill) {
            this.allQuestions.push(item)
            this.split(item);
          }
        }
      }

      this.shuffle(this.allQuestions);
      for (var i = 0; i < this.allQuestions.length; i++) {
        this.questions.push({ question: this.allQuestions[i], isHidden: (i == 0 ? false : true) })
      }
      console.log(this.questions)
      return this.questions
    })

   
  }

  split(question: Question) {

    if (question.type == 'crocette') {
      let answers = question.wrongAnswers.split(";");
      answers.push(question.correctAnswerText);
      this.shuffle(answers);
      this.splitted.push({ idQuestion: question.id, array: answers });
    }
  }

  addResponse(id: number) {
    let candidateAnswer: CandidateResponse = {
      idCandidate: this.candidate.id,
      idQuestion: id,
      candidateResponse: this.rispostaForm.value.candidateResponse != null ? this.rispostaForm.value.candidateResponse : ''
    }

    this.candidateResponse.push(candidateAnswer)
    this.rispostaForm.reset();

    // if(this.questions.length=i){
    //   this.buttonText="RISULTATO";
    // }

    // if(this.questions.length==i+1){
    //   this.router.navigateByUrl('/risultato');
    // }
    // console.log(i);
    // console.log(this.questions.length);
  }

  goResult() {
    
    console.log(this.candidateResponse)
    this.questionarioService.createCandidateAnswer(this.candidateResponse);
    this.router.navigateByUrl('/risultato');
  }

  errorMsg(){
    console.log(this.Msg);
    console.log(this.rispostaForm.value.candidateResponse);
    if(this.rispostaForm.value.candidateResponse == ""){
      this.Msg=true;
      console.log(this.Msg);
      console.log(this.rispostaForm.value.candidateResponse);
    }

  }

  

  
   
}
