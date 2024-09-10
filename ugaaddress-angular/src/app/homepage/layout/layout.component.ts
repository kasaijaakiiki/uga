import { Component } from '@angular/core';
import { HomeComponent } from "../home/home.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterOutlet } from '@angular/router';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HomeComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {


  constructor(private homeService: HomeService) { }
  ngOnInit(): void {

  }


}
