import { Component } from '@angular/core';
import { RequestsService } from '../../services/requests.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  games:any
  constructor(
    private request:RequestsService
  ){}
  ngOnInit(): void {
    this.getGames()
  }
  getGames(){
   this.request.getgames().subscribe(
    (res:any)=>this.games = res
   )
  }
}
