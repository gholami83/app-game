import { Routes } from '@angular/router';
import { MenuComponent } from './features/menu/menu.component';
import { SubmitScoreComponent } from './features/submit-score/submit-score.component';
import { ScoresComponent } from './features/scores/scores.component';

export const routes: Routes = [
    {path:'',component:MenuComponent},
    {path:'scores',component:ScoresComponent},
    {path:'scores/submit',component:SubmitScoreComponent},
];
