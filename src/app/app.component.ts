import { Component } from '@angular/core';
import {Personne} from "./models/Personne";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ClientService} from "./service/client.service";
import {AuthService} from "./service/auth.service";

interface OnInit {
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'projectboris';
  personne: Personne;
  nom: string;
  premierC: string;
  constructor(private router: Router,
              private helper: JwtHelperService,
              private  clientService: ClientService,
              private  authService: AuthService) {
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
      this.clientService.getClientById(decode.sub).subscribe(res => {
        if (res.body != null){
          this.personne = res.body;
          this.nom = this.personne.nom;
          this.premierC = this.nom.substr(0, 1);
        }

      });

    }
  }
  logout() {
    this.authService.logout();
    document.location.reload();
    this.router.navigate(['#']);

  }

  openDash(id: number) {
    console.log('id dans navbar', id);
    this.router.navigate(['dashboard', id]);
  }

  openPaiement(id: number) {

  }
}
