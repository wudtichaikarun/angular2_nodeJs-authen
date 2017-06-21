import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {

  authToken: any;
  user: any;

  constructor(private http: Http ) { }

  // Register Sent data to routes/users.js method post('/register', ....) like postMan
  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
    .map(res => res.json());
  }

  // Authentication
  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
    .map(res => res.json());
  }

  // Profile get data
  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/users/profile',{headers: headers})
    .map(res => res.json());
  }

  // Set local storage
  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  // Log out
  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}