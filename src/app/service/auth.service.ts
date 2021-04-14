import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {HttpClient} from "@angular/common/http";
import {Client} from "../models/Client";
import {Resultat} from "../models/resultat";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  private _refreshNeeded$ = new Subject<void>();
  public currentUser: Observable<any>;
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private helper: JwtHelperService) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
   get refreshNeeded(){
   return  this._refreshNeeded$;
}
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }
  ajoutClient(client: Client): Observable<Resultat<Client>> {
    console.log('methode du service qui ajoute un employe', client);
    return this.http.post<Resultat<Client>>(`${environment.apiUrl}/api/auth/signup`, client);
  }
  login(user: Client) {
    return this.http.post<Resultat<any>>(`${environment.apiUrl}/api/auth/signin`, user)
      .pipe(map(res => {
        localStorage.setItem('currentUser', JSON.stringify(res.body.body.accessToken));
        this.currentUserSubject.next(res.body.body.accessToken);
        this.isUserLoggedIn.next(true);
        this._refreshNeeded$.next();
        return res;
      }));
  }

  logout(): void{
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('membre');
    this.currentUserSubject.next(null);
    this.isUserLoggedIn.next(false);
    this._refreshNeeded$.next();
  }



}
