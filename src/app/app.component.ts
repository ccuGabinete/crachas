import { MongoService } from './services/mongo/mongo.service';
import { SccaService } from './services/scca/scca.service';
import { Autorizado } from './models/autorizado/autorizado';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
const go = console.log;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  disabled = true;
  duplicado = false;
  ausente = false;
  registros = 0;

  constructor(
    public autorizado: Autorizado,
    private sccaservice: SccaService,
    private mongoservice: MongoService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.autorizado = new Autorizado();
    this.onContar();
  }

  onBlurMatricula() {
    if (typeof this.autorizado.matricula !== 'undefined') {
      this.mongoservice.conferirAutorizado(this.autorizado.matricula).subscribe(data => {
        if (data.body.total > 0) {
          this.duplicado = true;
        } else {
          // tslint:disable-next-line: no-shadowed-variable
          this.sccaservice.buscarAutorizado(this.autorizado.matricula).subscribe(data => {
            this.autorizado.nome = data.body.nome;
            this.autorizado.cpf = data.body.cpf;
            this.disabled = false;
          }, error => {
            this.ausente = true;
          });
        }
      });
    }
  }

  onFocusMatricula() {
    this.onClear();
  }

  onClear() {
    this.autorizado = new Autorizado();
    this.ausente = false;
    this.duplicado = false;
    this.disabled = true;
  }

  onContar() {
    this.mongoservice.contarAutorizado().subscribe(data => {
      this.registros = data.body.total;
    });
  }

  refresh(): void {
    window.location.reload();
  }

  onSubmit() {
    this.mongoservice.salvarAutorizado(this.autorizado).subscribe(data => {
      this.onContar();
      this.onClear();
    });
    this.refresh();
  }

}
