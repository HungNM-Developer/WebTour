import { Component, OnInit } from '@angular/core';
declare var createPieChart:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'App';
  constructor(){}
  ngOnInit(){
    new createPieChart();
  }
}

