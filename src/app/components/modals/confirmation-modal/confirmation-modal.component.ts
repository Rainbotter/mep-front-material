import { Component, OnInit } from '@angular/core';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'mep-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {

  public faExclamationCircle = faExclamationCircle;

  constructor() { }

  ngOnInit() {
  }

}
