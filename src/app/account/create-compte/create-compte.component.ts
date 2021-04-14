import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MediaObserver} from "@angular/flex-layout";
import {MembreService} from "../../service/membre.service";
import {Membre} from "../../models/Membre";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-create-compte',
  templateUrl: './create-compte.component.html',
  styleUrls: ['./create-compte.component.scss']
})
export class CreateCompteComponent implements OnInit {
  value = 'Clear me';
  private mediaSub: Subscription;
  edit = false;
  hide = true;
  membreForm: FormGroup;
  private dialogConfig;
  membre: Membre;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  signin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required ]),
    password: new FormControl('', [Validators.required, Validators.min(3) ])
  });
  constructor(private route: ActivatedRoute,
              private  router: Router,
              private cdRef: ChangeDetectorRef,
              private mediaObserver: MediaObserver,
              private fb: FormBuilder,
              private membreService: MembreService,
              private authService: AuthService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    };
    this.membreForm = this.fb.group({
      nom: '',
      prenom: '',
      email: '',
      password: '',
      adresse: this.fb.group({
        telephone: ''
      })
    });

  }
  get emailInput() { return this.signin.get('email'); }
  get passwordInput() {
    return this.signin.get('password');
  }
  onSubmit(membreFormValue) {

    console.log(this.membreForm.value);
    let  membre: Membre = {
      nom: membreFormValue.nom,
      prenom: membreFormValue.prenom,
      email: membreFormValue.email,
      password: membreFormValue.password,
      adresse: membreFormValue.adresse,
      type:'ME'
    };
    console.log('voir membre', membre);
    localStorage.setItem('password', this.membreForm.value.password);
    this.membreService.registraction(membre, 'Register').subscribe(resultat => {
      if (resultat) {
        this.membre = resultat.body;
        this.snackBar.open(' Merci pour votre inscription! verifiez votre boite mail ', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,

        });
      }

    });
    this.router.navigate(['accueil']);

  }

}
