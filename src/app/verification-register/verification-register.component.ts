import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,  Router} from "@angular/router";
import {MembreService} from "../service/membre.service";
import {Membre} from "../models/Membre";
import {LocalStorage} from "@ngx-pwa/local-storage";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-verification-register',
  templateUrl: './verification-register.component.html',
  styleUrls: ['./verification-register.component.scss']
})
export class VerificationRegisterComponent implements OnInit {
membre: Membre;
  login: string;
  code: number;
  values = '';
  email: string;
  constructor(private route: ActivatedRoute,
              private  router: Router,
              private  membreService: MembreService,
              private  authService: AuthService,
              private localStorage: LocalStorage) { }

  ngOnInit(): void {
    console.log('Called Constructor');
    this.email = localStorage.getItem("email");

  }
  onKey(event: any) { // without type info
    this.code = event.target.value;
    console.log(this.code);
  }
  onClick() {
    console.log('voir ce qui se passe');
    this.membreService.registractionConfirm(this.email, this.code).subscribe(res => {
    console.log(res);
    this.membre = res.body;
    let membre: Membre = {
      email: this.membre.email,
      password: localStorage.getItem('password'),
      type:'ME'
    };
    console.log(membre);
    if(res.body){
     this.authService.login(membre).subscribe(data => {
       localStorage.removeItem('password');
       localStorage.removeItem('email');
       console.log('auth ok');
       if (data){
         this.router.navigate(['accueil']);

       }
     });
    }
});
  }


}
