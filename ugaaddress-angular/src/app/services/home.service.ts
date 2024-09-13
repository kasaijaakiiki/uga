import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  //baseUrl: string = 'https://uga-1.onrender.com/api/v1/';
  baseUrl: string = 'http://127.0.0.1:5600/api/v1/';
  constructor(private httpClient: HttpClient) { }
  getRegions(): Observable<any> {
    console.log(this.baseUrl)
    return this.httpClient.get(`${this.baseUrl}home/get_region`);
  }
  getVotingByRegion(region: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}home/get_region/${region}`);
  }
  getInfoByRegionAndFileName(region: string, fileName: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}home/get_region/${region}/${fileName}`);
  }
  searchInput(search: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}home/search/${search}`);
  }
}
