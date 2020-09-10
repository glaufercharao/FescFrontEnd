import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { Produto } from '../shared/produto'
import { ApiService } from '../api.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  formProduto: FormGroup;
  produtos:Produto[]
  constructor(private formBuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.listarProduto()
    this.criarForm(new Produto());
    this.formProduto.reset();
  }

  criarForm(produto: Produto){

      this.formProduto = new FormGroup({
        
        descricao: new FormControl('produto.descricao'),
        tipoProduto: new FormControl('produto.tipoProduto'),
        valorFornecedor: new FormControl('produto.valorFornecedor'),
        quantidadeEstoque: new FormControl('produto.quantidadeEstoque')
      })
  }

  onSubmit(){
    console.log(this.formProduto.value)

    this.api.salvarProduto(this.formProduto.value)
    .subscribe(
      data => console.log(data),
      err => console.log(err)
    );
    this.formProduto.reset();
  }

  listarProduto(){
   this.api.buscarProdutos().subscribe(
      data => this.produtos = data,
      err => { 
        localStorage.removeItem('token');
        this.api.renovaToken()})

  }

}
