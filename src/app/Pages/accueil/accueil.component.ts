import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
  activeCategorie(t: number) {
    var a = document.getElementById('deuxieme').children;
    for (let i =0; i<a.length; i++) {
      a[i].classList.remove('active');
      if (t==i) {
        a[t].classList.add('active');
      }
    }
  }

}
