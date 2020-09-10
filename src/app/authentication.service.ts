import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  
  constructor(private http: HttpClient) {
    this.carregarToke();
   }
  
  token(){
   const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded', 'Authorization':'Basic ZmVzYzpmI3Nj'})
    let user = 'admin';
    let password = 'admin';
    return this.http.post('http://localhost:8080/oauth/token', `username=${user}&password=${password}&grant_type=password`, {'headers':headers}).toPromise()
    .then((r: any)=>{
      console.log()
      this.armazenarToken(r['access_token']);
    }).catch((data)=>{
      console.log(data)
    })
      
      
  }

  private armazenarToken(token: string){
    localStorage.setItem('token', token);
  }

  private carregarToke(){
    const token = localStorage.getItem('token');

    if(token){
      this.armazenarToken(token)
    }
  }

}
