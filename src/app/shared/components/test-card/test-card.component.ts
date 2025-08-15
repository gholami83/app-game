import { Component, EventEmitter, input, Input, Output } from '@angular/core';

@Component({
  selector: 'app-test-card',
  standalone: true,
  imports: [],
  templateUrl: './test-card.component.html',
  styleUrl: './test-card.component.scss'
})
export class TestCardComponent {
  @Input() quiz:any
  @Input() index:any
  @Output() answerSelected = new EventEmitter<{ quizId: string, selectedId: number }>();

  onAnswerSelect(selectedId: number) {
    this.answerSelected.emit({
      quizId: this.quiz.id,
      selectedId
    });
  }
}
