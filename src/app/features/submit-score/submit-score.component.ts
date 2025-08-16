import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RequestsService } from '../../services/requests.service';
import { SharedModule } from '../../shared/shared.module';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-submit-score',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SharedModule,
  ],
  templateUrl: './submit-score.component.html',
  styleUrl: './submit-score.component.scss'
})
export class SubmitScoreComponent {
  formgroup!:FormGroup
  users:any
  games:any
  gameType:'ping_pong' | 'farm_battle' | 'speed_maze' = 'ping_pong'
  defualtImage = 'business-analytics-vector-concept-illustration_92926-80.avif'
  game:any
  constructor(
    private request:RequestsService,
    private toastr: ToastrService,
    private router:Router,
    private activatedRouter:ActivatedRoute,
  ){}
  
  ngOnInit(): void {
    this.getUsers()
    this.getGames()
    this.formgroup = new FormGroup({
      name: new FormControl(),
      phone: new FormControl(),
      game: new FormControl(),
      score: new FormControl(),
    })
  }
  getGame(){
    this.activatedRouter.queryParams.subscribe(
      (res:any)=>{
        if(Object.keys(res).length !== 0){
          this.gameType = res.g
          this.game = this.games?.find((m:any)=>m.fragment == this.gameType)
          this.formgroup.controls['game'].setValue(this.game?.name_en)
        }
        else{
        }
      },
      (err)=>{
      }
    )
  }
  getUsers(){
   this.request.getUsers().subscribe(
    (res)=>this.users = res
   )
  }
  getGames(){
   this.request.getgames().subscribe(
    (res)=>{
      this.games = res
      this.getGame()
    }
   )
  }
  submit(){
    if(this.formgroup.valid)
      this.request.addScore({
      "user_id":this.formgroup.value.name,
      "game_name":this.formgroup.value.game,
      "score":this.formgroup.value.score
    }).subscribe((res)=>{
      this.toastr.success('','امتیازت ثبت شد!')
      this.router.navigate(['/scores'])
    })
    else{
      this.toastr.error('','فرم رو کامل کن!')
    }
  }
}
