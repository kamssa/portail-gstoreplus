import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demande-devid',
  templateUrl: './demande-devid.component.html',
  styleUrls: ['./demande-devid.component.scss']
})
export class DemandeDevidComponent implements OnInit {
  selected: any;
  categories: any;


  constructor() { }

  ngOnInit(): void {
  }


  greetCat(event) {

  }
}
