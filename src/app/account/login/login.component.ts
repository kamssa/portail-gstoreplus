import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {Personne} from '../../models/Personne';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  isuAth: boolean;
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              private authenticationService: AuthService) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f()
  {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.submitted = true;
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.loading = true;
    const  membre = new Personne(
      null,
      null,
      null,
      null,
      null,
      email,
      password,
      null,
      null,
      null,
      null,
      'ME',

    );
    console.log(membre);
    this.authenticationService.login(membre).subscribe(data => {
        if (data.body){
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
        this.error = "email ou mot de passe oublié";
        this.loading = false;
      });
  }
}
