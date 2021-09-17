import {Component, ElementRef, OnInit} from '@angular/core';
import {Personne} from "../../models/Personne";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ClientService} from "../../service/client.service";
import {AuthService} from "../../service/auth.service";
declare const $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  personne: Personne;
  nom: string;
  premierC: string;
  private toggleButton: any;
  mobile_menu_visible: any = 0;
  private sidebarVisible: boolean;

  constructor(private router: Router,
              private helper: JwtHelperService,
              private  clientService: ClientService,
              private  authService: AuthService, private element: ElementRef) {
    this.sidebarVisible = true;
  }

  ngOnInit(): void {
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
      this.clientService.getClientById(decode.sub).subscribe(res => {
      if(res.body!=null){
        console.log('admin', res);
        this.personne = res.body;
        this.nom = this.personne.nom;
        this.premierC = this.nom.substr(0, 1);
      }

      });

    }
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    setTimeout(function(){
      toggleButton.classList.add('toggled');
    }, 500);
    body.classList.add('nav-open');
    this.sidebarVisible = true;

  }
  sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    this.toggleButton.classList.remove('toggled');
    body.classList.remove('nav-open');
  };
  logout() {
    this.authService.logout();
    document.location.reload();
    this.router.navigate(['accueil']);

  }

  openDash(id: number) {
    console.log('id dans navbar', id);
    this.router.navigate(['dashboard', id]);
  }

  openPaiement(id: number) {

  }
  navbarToggle() {

    var $toggle = document.getElementsByClassName('navbar-toggler')[0];
    const body = document.getElementsByTagName('body')[0];
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    if (this.mobile_menu_visible == 1) {
      body.classList.remove('nav-open');
      if ($layer) {
        $layer.remove();
      }
      setTimeout(function() {
        $toggle.classList.remove('toggled');
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(function() {
        $toggle.classList.add('toggled');
      }, 430);

      var $layer = document.createElement('div');
      $layer.setAttribute('class', 'close-layer');

      setTimeout(function() {
        $layer.classList.add('visible');
      }, 100);

      $layer.onclick = function() { //asign a function
        body.classList.remove('nav-open');
        this.mobile_menu_visible = 0;
        $layer.classList.remove('visible');
        setTimeout(function() {
          $layer.remove();
          $toggle.classList.remove('toggled');
        }, 400);
      }.bind(this);

      body.classList.add('nav-open');
      this.mobile_menu_visible = 1;

    }
  }

}
