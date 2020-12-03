import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Question } from 'src/app/core/model/Question.interface';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  questionForm: FormGroup;


  constructor(private fb: FormBuilder, private questionService: QuestionService, private router: Router) {
    
    this.questionForm = this.fb.group({
      id: ['', Validators.required],
      type: ['', Validators.required],
      questionText: ['', Validators.required],
      difficulty: ['', Validators.required],
      correctAnswerBoolean: ['', Validators.required],
      correctAnswerText: ['', Validators.required],
      imgUrl: ['', Validators.required],
      wrongAnswers: this.fb.group({ 
        answer1: ['', Validators.required],
        answer2: ['', Validators.required],
        answer3: ['', Validators.required],
      }),
    })
    
  }
  
  ngOnInit(): void {
  }

  url: string | ArrayBuffer;

    onSelectFile(event) { // called each time file input changes
        if (event.target.files && event.target.files[0]) {
          var reader = new FileReader();

          reader.readAsDataURL(event.target.files[0]); // read file as data url

          reader.onload = (event) => { // called once readAsDataURL is completed
            this.url = event.target.result;
          }
        }
    }
  
  save() {
    console.log("oook")
    console.log(this.questionForm.value)
    console.log("QUESTO URL ",this.url);
    console.log("IF-> " , this.questionForm.value.type=='immagine')
    let question: Question = {
      id: this.questionForm.value.id,
      type: this.questionForm.value.type,
      questionText: this.questionForm.value.questionText,
      difficulty: this.questionForm.value.difficulty,
      correctAnswerBoolean: (this.questionForm.value.type == 'vf' ? this.questionForm.value.correctAnswerBoolean: null),
      imgUrl: this.questionForm.value.type=='immagine'? this.url: null,
      correctAnswerText: (this.questionForm.value.type == 'vf' ? null:  this.questionForm.value.correctAnswerText),
      wrongAnswers: (this.questionForm.value.type == 'crocette' ? this.questionForm.value.wrongAnswers.answer1 + ";" + this.questionForm.value.wrongAnswers.answer2 + ";" + this.questionForm.value.wrongAnswers.answer3 : null)
    }
    this.questionService.createQuestion(question);
    this.router.navigateByUrl('/admin/question');
  }

}
