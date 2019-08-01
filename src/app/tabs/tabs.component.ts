import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface Tab {
  title: string;
  order: number;
}

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})

export class TabsComponent implements OnInit {

  @Input() tabs: Tab[] = [];
  @Output() eventAlteredModel = new EventEmitter();

  private onDragOrder: number;
  private dragOrder: number;

  constructor() {
  }

  ngOnInit() {
  }

  onDrop(event) {
    event.preventDefault();
    if(!this.dragOrder || !event.target.hasAttribute("order")) return;
    this.onDragOrder = event.target.getAttribute("order");

    if(this.dragOrder == this.onDragOrder) return;


    let indexFirst: number;
    let indexSecond: number;
    for (let index = 0; index < this.tabs.length; index++) {
      if (this.dragOrder == this.tabs[index].order) {
        indexFirst = index;
      } 
      else if (this.onDragOrder == this.tabs[index].order) {
        indexSecond = index;
      }
    }

    let tmpFirst = JSON.parse(JSON.stringify(this.tabs[indexFirst]));
    let tmpOrderSecond = this.tabs[indexSecond].order;
    this.tabs[indexFirst] = this.tabs[indexSecond];
    this.tabs[indexFirst].order = tmpFirst.order;
    this.tabs[indexSecond] = tmpFirst;
    this.tabs[indexSecond].order = tmpOrderSecond;
    this.eventAlteredModel.emit(null);
    this.dragOrder = null;
    this.onDragOrder = null;
  }
  onDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  drag(event) {
    if(event.target.hasAttribute("order"))
      this.dragOrder = event.target.getAttribute("order");
  }

  addNew() {
    this.tabs.push({ title: "new - " + this.tabs.length, order: this.tabs.length });
    this.eventAlteredModel.emit(null);
  }
}