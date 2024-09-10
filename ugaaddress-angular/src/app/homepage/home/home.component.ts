
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, filter, switchMap } from 'rxjs';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  result: any = [];  // Adjust according to your data type
  myWords: any;
  regionResponse: any = [];
  clickedRegion: string = '';
  regionDetails: any = {};
  searchForm: FormGroup;
  suggestions: any[] = []; // To store the list of suggestions
  constructor(private fb: FormBuilder, private homeService: HomeService) {
    this.searchForm = this.fb.group({
      destination: [''],
    });
    // Listen for changes on the input with debounce
    // Listen for changes on the input with debounce
    this.searchForm.get('destination')?.valueChanges.pipe(
      debounceTime(300), // Wait for 300ms pause in events
      filter(value => value && value.trim() !== ''), // Only proceed if there is input
      switchMap((value) => this.homeService.searchInput(value))
    ).subscribe(
      (data) => {
        this.suggestions = data.data; // Update suggestions with the response
      },
      (error) => {
        console.error('Error fetching suggestions:', error);
      });
  }

  ngOnInit() {
    this.homeService.getRegions().subscribe(words => this.result = words.data);

  }
  filterWords(a: string) {
    this.clickedRegion = a;
    this.homeService.getVotingByRegion(a).subscribe(response => {
      this.regionResponse = response.data;
    });

  }

  findValue(response: any) {
    console.log(this.clickedRegion, response);
    this.homeService.getInfoByRegionAndFileName(this.clickedRegion, response).subscribe(data => {
      this.regionDetails = data.data[0];
      console.log(this.regionDetails)
    })
  }

  findValues(response: any, region: string) {
    console.log(region, response)
    this.homeService.getInfoByRegionAndFileName(region, response).subscribe(data => {
      this.regionDetails = data.data[0];
      console.log(this.regionDetails)
      this.suggestions = [];
    })
  }

  toggleDetails(id: any) {
    console.log(id);
    const details: HTMLElement | null = document.getElementById(id);
    if (details) {
      if (details.classList.contains("hidden")) {
        details.classList.remove("hidden");
      } else {
        details.classList.add("hidden");
      }
    }
  }
}
