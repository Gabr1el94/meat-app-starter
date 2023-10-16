import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mt-orderr-summary',
  templateUrl: './orderr-summary.component.html',
  styleUrls: ['./orderr-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  rated : boolean;

  constructor() { }

  ngOnInit() {
  }

  rate(){
    this.rated = true;
  }

}
