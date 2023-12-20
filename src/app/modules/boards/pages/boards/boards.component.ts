// https://www.npmjs.com/package/@bugsplat/ngx-animated-counter?activeTab=readme
import { Component, NgModule } from '@angular/core';
import { faBox, faWaveSquare, faClock, faStar, faAngleUp, faAngleDown, faHeart, faBorderAll, faUsers, faGear } from '@fortawesome/free-solid-svg-icons';
import { faTrello } from '@fortawesome/free-brands-svg-icons';
import { NgxAnimatedCounterModule, NgxAnimatedCounterParams } from '@bugsplat/ngx-animated-counter';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html'
})
export class BoardsComponent {

  public params: NgxAnimatedCounterParams = { start: 0, end: 100, interval: 10, increment: 1 };

  @NgModule({
    imports: [
      NgxAnimatedCounterModule
    ],
  })


  faTrello = faTrello;
  faBox = faBox;
  faWaveSquare = faWaveSquare;
  faClock = faClock;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faHeart = faHeart;
  faBorderAll = faBorderAll;
  faUsers = faUsers;
  faGear = faGear;
  faStar = faStar;

  constructor() { }

}
