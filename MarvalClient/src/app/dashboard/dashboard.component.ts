import { Component, OnInit } from '@angular/core';
// import { EXPANSION_HELPERS } from './helpers.data';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  
 
  showReportLoader = false;
  

  constructor() { }

  ngOnInit(): void {
  }

  
}
