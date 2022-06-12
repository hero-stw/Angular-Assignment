import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-validate-noti',
  templateUrl: './validate-noti.component.html',
  styleUrls: ['./validate-noti.component.css']
})
export class ValidateNotiComponent implements OnInit {

  @Input() field: any;
  @Input() key: string;
  constructor() {
    this.key = '';
  }

  ngOnInit(): void {
  }

}
