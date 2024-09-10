import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from "./homepage/layout/layout.component";
import { HomeComponent } from './homepage/home/home.component';
import { HomeService } from './services/home.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [HttpClient, HomeService]
})
export class AppComponent {
  title = 'UGA Address';
}
