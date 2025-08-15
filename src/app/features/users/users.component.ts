import { Component } from '@angular/core';
import { RequestsService } from '../../services/requests.service';
import { switchMap } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-scores',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  users:any
  scores:any
  constructor(
    private request:RequestsService
  ){}
  ngOnInit(): void {
    this.request.getUsers()
    .pipe(switchMap((res:any)=>{
      this.users = res
      return this.request.getScores()
    }))
    .subscribe(
      (res)=>{
        this.scores = res
      }
    )
  }
  getUser(id:any){
    return this.users.find((user:any) => user.id === id);

  }
}
