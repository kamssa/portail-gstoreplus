import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {Personne} from "../models/Personne";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {ClientService} from "../service/client.service";
import {AuthService} from "../service/auth.service";
import 'intl-tel-input';
import 'intl-tel-input/build/js/utils';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  registryForm: FormGroup;
  checkbox = false;
  client: Personne;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  submitted = false;
  loading = false;
  error = '';
  code: any;
  @Input('ng2TelInputOptions') ng2TelInputOptions: any;
  @Output('ng2TelOutput') ng2TelOutput: EventEmitter<any> = new EventEmitter();
  @Output('intlTelInputObject') intlTelInputObject: EventEmitter<any> = new
  EventEmitter();    ngTelInput: any;
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private clientService: ClientService,
              private authService: AuthService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.registryForm = this.fb.group({
      nom: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      telephone: new FormControl('', [Validators.required]),
    });

  }

  get f() {
    return this.registryForm.controls;
  }
  onSubmit() {
    if(this.registryForm.value.password === this.registryForm.value.password){
      if (navigator.onLine){


        if (this.code === null || this.code===undefined){
          this.submitted = true;
          let client: Personne = {
            nom: this.registryForm.value.nom,
            prenom: this.registryForm.value.prenom,
            email: this.registryForm.value.email,
            codePays: '225',
            telephone: this.registryForm.value.telephone,
            password: this.registryForm.value.password,
            type: 'CL'
          };
          localStorage.setItem('client', JSON.stringify(client));
          localStorage.setItem('email', this.registryForm.value.email);
          localStorage.setItem('password', this.registryForm.value.password);
          this.clientService.getClientByEmail(client.email).subscribe(data => {
            if (data.status !== 0) {
              this.clientService.registraction(client).subscribe(resultat => {
                  if (resultat) {
                    this.client = resultat.body;
                    this.snackBar.open(' Merci pour votre inscription!', '', {
                      duration: 5000,
                      horizontalPosition: this.horizontalPosition,
                      verticalPosition: this.verticalPosition,
                    });
                    this.client = JSON.parse(localStorage.getItem('client'));
                    this.authService.login(this.client).subscribe(res => {
                      if (res){
                        localStorage.removeItem('client');
                        localStorage.removeItem('email');
                        localStorage.removeItem('password');
                      }
                    });
                  }
                }, err => {
                  this.loading = false;
                }
              );

              this.router.navigate(['accueil']);
            }else {
              this.error = "Ce Compte existe deja !";
            }

          });
        }else {
          this.submitted = true;
          let client: Personne = {
            nom: this.registryForm.value.nom,
            prenom: this.registryForm.value.prenom,
            email: this.registryForm.value.email,
            codePays: this.code,
            telephone: this.registryForm.value.telephone,
            password: this.registryForm.value.password,
            type: 'CL'
          };

          localStorage.setItem('client', JSON.stringify(client));
          localStorage.setItem('email', this.registryForm.value.email);
          localStorage.setItem('password', this.registryForm.value.password);

          this.clientService.getClientByEmail(client.email).subscribe(data => {
            if (data.status !== 0) {
              this.clientService.registraction(client).subscribe(resultat => {
                  if (resultat) {
                    this.client = resultat.body;
                    this.snackBar.open(' Merci pour votre inscription !', '', {
                      duration: 5000,
                      horizontalPosition: this.horizontalPosition,
                      verticalPosition: this.verticalPosition,
                    });
                    this.client = JSON.parse(localStorage.getItem('client'));
                    this.authService.login(this.client).subscribe(res => {
                      if (res){
                        localStorage.removeItem('client');
                        localStorage.removeItem('email');
                        localStorage.removeItem('password');
                      }
                    });
                  }
                }, err => {
                  this.loading = false;
                }
              );

              this.router.navigate(['accueil']);
            }else {
              this.error = "Ce compte existe déjà !";
            }

          });
        }


      } else {
        this.error = 'Vérifiez votre connexion internet s\'il vous plaît';
      }

    }else {
      this.error = "Le mot de passe doit correspondre à la confirmation !";

    }

  }
  onCountryChange(event: any) {
    console.log(event);
    this.code = event.dialCode;
    console.log(this.code);
  }

  fieldsChange(ev) {
    console.log(ev.currentTarget.checked);
    this.checkbox = ev.currentTarget.checked;
  }

  getNumber(event) {

  }

  telInputObject(obj): void{
    console.log(obj);
    obj.setCountry('in');
  }
  @HostListener('blur') onBlur() {
   /* let isInputValid: boolean = this.isInputValid();
    if (isInputValid) {
      let telOutput = this.ngTelInput.intlTelInput("getNumber");
      this.ng2TelOutput.emit(telOutput);
    } else
    {
      console.log('erreur');
    }*/
  }

  isInputValid(): boolean {
    return this.ngTelInput.intlTelInput('invalidInput') ? true : false;
  }
}
