import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast-alert',
  standalone: false,
  
  templateUrl: './toast-alert.component.html',
  styleUrl: './toast-alert.component.css'
})
export class ToastAlertComponent {
  @Input() type: string | null = null;
  @Input() message: string | null = null;
  @Input() link: string | null = null;
  @Input() linkText: string | null = null;
  @Input() closeAble: boolean | null = null;

  closeAlert() {
    this.message = null;
    this.type = null;
    this.link = null;
    this.linkText = null;
  }

  ngOnInit() {
    if (this.closeAble) {
      setTimeout(() => {
        this.closeAlert();
      }, 5000);
    }
  }
}
