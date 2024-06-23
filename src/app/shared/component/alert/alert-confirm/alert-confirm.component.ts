import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-alert-confirm',
  templateUrl: './alert-confirm.component.html',
  styleUrls: ['./alert-confirm.component.scss']
})
export class AlertConfirmComponent implements OnChanges {

  @Output() eventConfirmAlert = new EventEmitter<number>();


  @Input() visible: boolean = false;

  constructor(private messageService: MessageService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['visible'] !== undefined){
      if (this.visible) {
        this.messageService.add({ key: 'confirm', sticky: true, severity: 'info', summary: '¿Seguro de guardar?', detail: 'Confirmar' });
      }
    }
  }

  onConfirm() {
      this.messageService.clear('confirm');
      this.eventConfirmAlert.emit(1);
  }

  onReject() {
      this.messageService.clear('confirm');
      this.eventConfirmAlert.emit(2);
  }
}
