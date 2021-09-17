import { Component, OnInit } from '@angular/core';
import {Personne} from "../models/Personne";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {ClientService} from "../service/client.service";
import {PasswordOublieComponent} from "../password-oublie/password-oublie.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  connexionForm: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  submitted = false;
  loading = false;
  error = '';
  result: any;
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  isuAth: boolean;
  hide = true;
  client: Personne;
  constructor( private fb: FormBuilder,
               private route: ActivatedRoute,
               private router: Router,
               private snackBar: MatSnackBar,
               private authService: AuthService,
               public dialog: MatDialog,
               private  clientService: ClientService) { }

  ngOnInit(): void {
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }



// convenience getter for easy access to form fields
  get f() { return this.connexionForm.controls; }
  initForm(): void {
    this.connexionForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

  }

  onSubmit() {
    if (navigator.onLine){
      this.submitted = true;
      // stop here if form is invalid
      const email = this.connexionForm.get('email').value;
      const password = this.connexionForm.get('password').value;
      this.clientService.getClientByEmail(email).subscribe(res => {
        if (res.status === 0){
          this.loading = true;

          const  client = new Personne(
            null,
            null,
            null,
            null,
            null,
            email,
            null,
            null,
            null,
            password,
            null,
            null,
            null,
            null,
            'CL'

          );
          this.authService.login(client).subscribe(data => {
              if (data.status === 0 ){
                this.snackBar.open('Succès de la connexion!', '', {
                  duration: 3000,
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                });
              }else {
                this.isuAth = false;
              }
              this.router.navigate(['accueil']);
            },
            error => {
              this.loading = false;
              this.error = "E-mail ou mot de passe oublié! Réessayez svp";
            });
        }else {
          this.error = "Email ou mot de passe oublié !";
        }
      });
    }else {
      this.error = 'Vérifiez votre connexion internet s\'il vous plaît';
    }

  }

  passeOublie() {
    let dialogRef = this.dialog.open(PasswordOublieComponent, {
      width: '650px',
    });
  }
}
