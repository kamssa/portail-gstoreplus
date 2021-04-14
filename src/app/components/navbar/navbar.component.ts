import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {JwtHelperService} from "@auth0/angular-jwt";
import {MembreService} from "../../service/membre.service";
import {Personne} from "../../models/Personne";
import {AuthService} from "../../service/auth.service";
declare interface RouteInfo {
  path: string;
  title: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/accueil', title: 'Accueil'},
  { path: '/apropos', title: 'A propos'},
  { path: 'devis', title: 'Demande de dévis'},
  { path: '/blog', title: 'Blog'},
  { path: '/investissement', title: 'Investissement'},
  { path: '/contact', title: 'Contact'}
  ];
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  menuItems: RouteInfo[];
  personne: Personne;
  nom: string;
  premierC: string;
  constructor(private router: Router,
              private helper: JwtHelperService,
              private  membreService: MembreService,
              private  authService: AuthService) { }

  ngOnInit(): void {
    //window.addEventListener('scroll', this.myFunction);
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    console.log(this.menuItems);
    //console.log(this.authService.isUserLoggedIn.value);

    this.authService.refreshNeeded.subscribe(() =>{
    this.getCurrentUser();

    });
    this.getCurrentUser();
  }
  getCurrentUser(){
    if (localStorage.getItem('currentUser')) {
      let token = localStorage.getItem('currentUser');
      let decode = this.helper.decodeToken(token);
      console.log(' Dans la navbar', decode);
      this.membreService.getMembreById(decode.sub).subscribe(res => {
        console.log('admin', res.body);
        this.personne = res.body;
        this.nom = this.personne.nom;
        this.premierC = this.nom.substr(0, 1);
      });

    }
  }
/*   myFunction() {
    var navbar = document.getElementById("navbar");
    var sticky = navbar.offsetTop;
    if (window.pageYOffset > sticky) {
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }
  } */


  ngAfterViewInit() {
    var a = document.getElementById('premier').children;
    for (let index = 0; index < this.menuItems.length; index++) {
      if (this.router.url === this.menuItems[index].path) {
        a[index].classList.add('active');
      }
    }
  }
  active(t: number) {
    var a = document.getElementById('premier').children;
    for (let i =0; i <a.length; i++) {
      a[i].classList.remove('active');
      if (t==i) {
        a[t].classList.add('active');
      }
    }
  }

  logout() {
    this.authService.logout();
    document.location.reload();

  }

  openDash(id: number) {
    console.log('id dans navbar', id);
    this.router.navigate(['dashboard', id]);
  }
}
