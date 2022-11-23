import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/utilities/authentication/account.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  isOpen: boolean = false;

  //currentUser
  Hari: any;

  @Input() currentUser: any;
  @HostListener('document:click', ['$event', '$event.target'])
  onClick(event: MouseEvent, targetElement: HTMLElement) {
    if (targetElement != null) {
      if (targetElement.innerText!.toLowerCase().indexOf('logout') > -1) {
        this.accountService.logout();
        this.router.navigate(['/login']);
      }
    }
    if (!targetElement) {
      return;
    }

    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.isOpen = false;
    }
  }

  constructor(private elementRef: ElementRef, private router: Router, private accountService: AccountService) {}

  ngOnInit() {
    this.currentUser = this.accountService.userValue;
  }

  logout() {
    this.accountService.logout();
    this.router.navigate(['/login']);
  }
}
