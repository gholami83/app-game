import { Component } from '@angular/core';
import { quizes } from './quiz.list';
import { TestCardComponent } from '../../shared/components/test-card/test-card.component';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { RequestsService } from '../../services/requests.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    TestCardComponent,
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {
  questionCreated = false
  questionSubmit = false
  users:any
  formGroup = new FormGroup({
    userId: new FormControl([Validators.required])
  })
  randomQuizList: any;
  userAnswers: Record<string, number> = {}; // { quizId: selectedAnswerId }
  quizes = quizes;
  score = 0;
  currentSlide = 0;
  constructor(
    private toastService:ToastrService,
    private requestService:RequestsService
  ){}
  ngOnInit(): void {
    this.getUsers()
  }
  createQuestion(){
    if(this.formGroup.valid){
      this.randomQuizList = this.getRandomTest();
      this.questionCreated = true
    }
    else{
      this.toastService.info('','بازیکن رو انتخاب کن!')
    }
  }

  getRandomTest(count: number = 20) {
    const selected: any[] = [];
    const usedIds = new Set<string>();

    while (selected.length < count && usedIds.size < this.quizes.length) {
      const randomIndex = Math.floor(Math.random() * this.quizes.length);
      const quiz = this.quizes[randomIndex];
      if (!usedIds.has(quiz.id)) {
        usedIds.add(quiz.id);
        selected.push(quiz);
      }
    }
    
    return selected;
  }

  onAnswerSelected(event: { quizId: string, selectedId: number }) {
    this.userAnswers[event.quizId] = event.selectedId;
  }

  calculateScore() {
    if (this.checkQuiz()){
      let correctCount = 0;
      for (let quiz of this.randomQuizList) {
        if (this.userAnswers[quiz.id] === quiz.true_answer) {
          correctCount++;
        }
      }
      this.score = correctCount;
      let score = {
        "user_id": this.formGroup.value['userId'],
        "game_name":"Speed & General Questions" ,
        "score": correctCount*20
      }
      this.requestService.addScore(score).subscribe(
        (res)=>{
          this.questionSubmit = true
        }
      )
    }
    else{
      this.toastService.error('','سوالات رو تکمیل کن!')
    }
  }

checkQuiz() {
  const hasUnanswered = this.randomQuizList.some((item: any) => {
    return this.userAnswers[item.id] === undefined;
  });  
  return !hasUnanswered; // Returns true if ALL are answered
}

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.randomQuizList.length) % this.randomQuizList.length;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.randomQuizList.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
  getUsers(){
   this.requestService.getUsers().subscribe(
    (res)=>this.users = res
   )
  }
}
