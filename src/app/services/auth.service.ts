import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  headerOptions: any = null;

  constructor( private _http: HttpClient ){}

  getUser() {
    return this.user;
  }

  setUser(user: User){
    this.user = user;
  }

  doRegister(data: User){
  //  return new Promise<any>((resolve, reject) => {
  //    firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
  //    .then(
  //      res => resolve(res),
  //      err => reject(err))
  //  })
  }

  doLogin(data: User){
    console.log(data);
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

        return this._http.post(`${environment.apiUrl}/appusers`, { emailAddress: data.emailAddress, password: data.password }, { headers:headers, observe: 'response' });
  }

	doLogout(){
    // return new Promise((resolve, reject) => {
    //   this.afAuth.auth.signOut()
    //   .then(() => {
    //     //this.firebaseService.unsubscribeOnLogOut();
    //     resolve();
    //   }).catch((error) => {
    //     reject();
    //   });
    // })
  }
}
