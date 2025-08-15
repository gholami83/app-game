import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RequestsService } from '../../services/requests.service';
import { SharedModule } from '../../shared/shared.module';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submit-score',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SharedModule,
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {
  formgroup!:FormGroup
  grades = [
    {
    id:1,
    name:'یک'
  },
  {
    id:2,
    name:'دو'
  },
  {
    id:3,
    name:'سه'
  },
]
  constructor(
    private request:RequestsService,
    private toastr: ToastrService,
    private router:Router
  ){}
  
  ngOnInit(): void {
    this.formgroup = new FormGroup({
      name: new FormControl(),
      phone: new FormControl(),
      game: new FormControl(),
      grade: new FormControl(),
    })
  }
  submit(){
    if(this.formgroup.valid)
      this.request.addUser({
      "name":this.formgroup.value.name,
      "grade":this.formgroup.value.grade,
      "phone":this.formgroup.value.phone,
      "games":[],
    }).subscribe((res)=>{
      this.toastr.success(`${res.name} عزیز`,'اسمت ثبت شد!')
      this.router.navigate(['/users'])
    })
    else{
      this.toastr.error('','فرم رو کامل کن!')
    }
  }
}
