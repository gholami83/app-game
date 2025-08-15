import { Routes } from '@angular/router';
import { MenuComponent } from './features/menu/menu.component';
import { SubmitScoreComponent } from './features/submit-score/submit-score.component';
import { ScoresComponent } from './features/scores/scores.component';
import { QuizComponent } from './features/quiz/quiz.component';
import { UsersComponent } from './features/users/users.component';
import { CreateUserComponent } from './features/create-user/create-user.component';

export const routes: Routes = [
    {path:'',component:MenuComponent},
    {path:'quiz',component:QuizComponent},

    {path:'scores',component:ScoresComponent},
    {path:'scores/submit',component:SubmitScoreComponent},

    {path:'users',component:UsersComponent},
    {path:'users/create',component:CreateUserComponent},
];
