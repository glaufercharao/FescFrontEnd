import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Produto } from './shared/produto';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit{
 
  constructor(private tok: AuthenticationService, private http: HttpClient){

  }

  ngOnInit(){
    
  }

  public buscarProdutos():Observable<any>{
    return this.http.get("http://localhost:8080/produtos");
  }

  public salvarProduto(produto:Produto){
    const headers = new HttpHeaders({'Content-Type':'application/json'})
   return this.http.post("http://localhost:8080/produtos", produto, {'headers':headers})
    
  }

  renovaToken(){
    this.tok.token()
  }
}
