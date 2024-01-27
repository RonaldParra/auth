import { Component } from '@angular/core';
import { Data, Router } from '@angular/router';
import {
  faBell,
  faInfoCircle,
  faClose,
  faAngleDown
} from '@fortawesome/free-solid-svg-icons';
import { User, DataU } from '@models/user.model';

import { AuthService } from '@services/auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}


  /*
  ngOnInit (){
    this.authService.getProfile()
    .subscribe(user => {
      this.user=user
    })
  }
  */

    logout(){
      this.authService.logout();
      this.router.navigate(['/login'])
    }

}
