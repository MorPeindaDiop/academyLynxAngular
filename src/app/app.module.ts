import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CoreModule } from './core/core.module';

import { StoreModule } from '@ngrx/store';
import { reducers } from './redux';

import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { CountdownModule } from 'ngx-countdown';

import { EffectsModule } from '@ngrx/effects';
import { SkillsEffects } from './redux/skill/skill.effects';
import { LoginEffects } from './redux/login/login.effects';
import { SenioritiesEffects } from './redux/seniority/seniority.effects';
import { CandidatesEffects } from './redux/candidate/candidate.effects';
import { CandidateSkillsEffects } from './redux/candidate-skill/candidate-skill.effects';
import { QuestionsEffects } from './redux/question/question.effects';
import { CandidateAnswersEffects } from './redux/candidate-answer/candidate-answer.effects';
import { FieldsEffects } from './redux/field/field.effects';
import { MailEffects } from './redux/mail/mail.effects';
import { TestsEffects } from './redux/test-question/test-question.effects';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    CountdownModule,
    NgMultiSelectDropDownModule.forRoot(),
    CoreModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      SkillsEffects,
      SenioritiesEffects,
      CandidatesEffects,
      CandidateSkillsEffects,
      QuestionsEffects,
      CandidateAnswersEffects,
      FieldsEffects,
      LoginEffects,
      MailEffects,
      TestsEffects,
    ]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    BrowserAnimationsModule,
    BackButtonDisableModule.forRoot({
      preserveScrollPosition: true
    })


  ],
  exports: [MatFormFieldModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
