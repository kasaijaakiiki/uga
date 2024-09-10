import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from '../services/home.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [HomeService, HttpClient, HttpClientModule]
})
export class HomepageModule { }
