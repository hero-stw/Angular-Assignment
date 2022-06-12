import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-status-switch',
  templateUrl: './status-switch.component.html',
  styleUrls: ['./status-switch.component.css']
})
export class StatusSwitchComponent implements OnInit {
  @Input() objectId : string;
  @Output() status:EventEmitter<number> = new EventEmitter<number>();
  @Input() type: string;
  @Input() currentStatus: number;
  constructor() {
    this.objectId = '';
    this.type = '';
    this.currentStatus = 0;
  }
  
  getStatus(event: any ) {
    this.status.emit(event.target.value); 
  }

  ngOnInit(): void {
  }

}
