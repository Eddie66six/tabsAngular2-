import { Component, OnInit } from '@angular/core';
import { Tab } from '../tabs/tabs.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public modelTabs: Tab[] = [];
  constructor() {
  }

  ngOnInit(){
    this.init();
  }

  addTab(){
    this.modelTabs.push({title: "Home-" + this.modelTabs.length, order: this.modelTabs.length});
    console.log(this.modelTabs);
  }

  async init(){
    setTimeout(() => {
      for (let index = 0; index < 3; index++) {
        this.modelTabs.push({title: "Home-" + index, order: index});
      }
    }, 2000);
  }

  evento(ev){
    console.log(this.modelTabs);
  }
}
