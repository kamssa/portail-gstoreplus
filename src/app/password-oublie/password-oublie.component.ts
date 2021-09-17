import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {ClientService} from "../service/client.service";
import {Personne} from "../models/Personne";
import {Client} from "../models/Client";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-password-oublie',
  templateUrl: './password-oublie.component.html',
  styleUrls: ['./password-oublie.component.scss']
})
export class PasswordOublieComponent implements OnInit {
  connexionForm: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  submitted = false;
  loading = false;
  error = '';
  result: any;
  client: Personne;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  hide = false;
  constructor( private fb: FormBuilder,
               private route: ActivatedRoute,
               private router: Router,
               private snackBar: MatSnackBar,
               private authService: AuthService,
               private  clientService: ClientService,
               public dialogRef: MatDialogRef<PasswordOublieComponent>) { }

  ngOnInit(): void {
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }



// convenience getter for easy access to form fields
  get f() { return this.connexionForm.controls; }
  initForm(): void {
    this.connexionForm = this.fb.group({
      email: [''],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });

  }
  onSubmitEmail() {
    if (navigator.onLine){
      this.submitted =true;
      // stop here if form is invalid
      const email = this.connexionForm.value.email;
      this.clientService.getClientByEmail(email).subscribe(res => {
          if (res.status === 0){
            this.hide = true;
            this.client = res.body;
            console.log('Voir le retour', this.client);
          }else {
            this.error = "Compte non valide !";
          }
        });

    }else {
      this.error = 'Vérifiez votre connexion internet s\'il vous plaît';
    }

  }
  onSubmit() {
    if (navigator.onLine){
      this.submitted =true;
      // stop here if form is invalid
      this.clientService.getClientByEmail(this.client.email).subscribe(res => {
        if (res.status === 0){
          this.hide = true;
          this.client = res.body;
          console.log(this.client);
        }else {
          this.error = "Compte non valide !";
        }
      });
      if (this.connexionForm.value.password === this.connexionForm.value.confirmPassword){
        const client: Personne = {
          id:this.client.id,
          version:this.client.version,
          titre:this.client.titre,
          nom:this.client.nom,
          prenom:this.client.prenom,
          email:this.client.email,
          numCni:this.client.numCni,
          codePays:this.client.codePays,
          telephone:this.client.telephone,
          password:this.connexionForm.value.password,
          fonction:this.client.fonction,
          nomComplet:this.client.nomComplet,
          adresse: this.client.adresse,
          actived: this.client.actived,
          type: 'CL'
        };
        this.clientService.passworClientMofif(client).subscribe(result => {

          this.snackBar.open('Succès de la modification!', '', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.onClose();

        });
      }else {
        this.error =" le mot de passe doit correspondre à la confirmation"
      }



    }else {
      this.error = 'Vérifiez votre connexion internet s\'il vous plaît';
    }

  }
  onClose() {
    this.dialogRef.close();
  }
}
