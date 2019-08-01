import { Component, OnInit, ViewChild } from '@angular/core';
import { Tab, TabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  @ViewChild("tab",null) tab: TabsComponent;
  public modelTabs: Tab[] = [];
  public conteudos: any[] = [];
  public conteudoSelecionado: any = {};
  constructor() {
  }

  ngOnInit(){
    this.init();
  }

  addTab(){
    this.tab.addNew("Home-" + this.modelTabs.length);
  }

  async init(){
    setTimeout(() => {
      for (let index = 1; index <= 3; index++) {
        this.modelTabs.push({title: "Home-" + index, order: index, hash: index + "db", selected: index == 1});
        this.conteudos.push({conteudo: index, hash: this.modelTabs[this.modelTabs.length-1].hash});
      }
      this.conteudoSelecionado = this.conteudos[0];
    }, 2000);
  }

  evento(ev){
    console.log(this.modelTabs);
  }

  select(ev){
    this.selecionarConteudo(ev);
    console.log(this.modelTabs);
    console.log(this.conteudoSelecionado);
  }

  selecionarConteudo(hash){
    for (let index = 0; index < this.conteudos.length; index++) {
      if(this.conteudos[index].hash == hash){
        this.conteudoSelecionado = this.conteudos[index];
        return;
      }
    }
    this.conteudoSelecionado = {conteudo: "novo", hash: hash};
  }
}
