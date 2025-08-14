import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CardComponent,
    CommonModule,
    HttpClientModule
  ],
  exports:[
    CardComponent,
    HttpClientModule
  ]
})
export class SharedModule { }
