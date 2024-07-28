import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Contato from 'src/app/model/entities/Contato';
import { ContatoService } from 'src/app/model/services/contato.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  contato : Contato
  nome: string
  telefone: string
  email: string
  genero: number
  edicao: boolean = false
  constructor(/* private actRoute: ActivatedRoute, */  
    private firebaseService: FirebaseService,
    private router: Router){}
  

  ngOnInit() {
    /* this.actRoute.params.subscribe((parametros) => {
      if(parametros["indice"]){
        this.indice = parametros["indice"]
        this.contato = this.contatoService.obterPorIndice(parametros["indice"])
      }
    }) */
    this.contato = history.state.contato;
    if(this.contato){
      console.log(this.contato);
      this.nome = this.contato.nome
      this.telefone = this.contato.telefone
      this.email = this.contato.email
      this.genero = this.contato.genero
    } 
  }

  habilitar(){
    if(!this.edicao){
      this.edicao = true
    }else{
      this.edicao = false
    }
  }

  excluir(){
    // fazer confirmação
    this.firebaseService.excluir(this.contato).then(()=>{}).catch((error)=>{console.log(error)})
    this.router.navigate(['/home'])
  }
  salvar(){
    // fazer validacao
    let novo : Contato = new Contato(this.nome, this.telefone)
    novo.email = this.email
    novo.genero = this.genero
    this.firebaseService.editar(this.contato.id, novo).then(()=>{}).catch((error)=>{console.log(error)})
    this.router.navigate(['/home'])
  }
}
