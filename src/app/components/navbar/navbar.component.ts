import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  isMenuMobileOn = false;
  tabSwitch = true;
  isModalActive = false;
  newEventModal = false;

  @Input() user: User;
  // @Output() userLogout = new EventEmitter();

  constructor(private route: ActivatedRoute) {
    route.queryParams.subscribe(param => {
      this.tabSwitch = param.estado === 'finalizados';
    });
  }

  ngOnInit(): void {
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    if ($navbarBurgers.length > 0) {
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
          const target = el.dataset.target;
          const $target = document.getElementById(target);
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
        });
      });
    }
  }

  toggleMobileMenu(): void {
    this.isMenuMobileOn = !this.isMenuMobileOn;
  }

  toggleModal(state: boolean): void {
    this.newEventModal = state;
    this.isModalActive = state;
  }

  updateList(e: boolean): void {
    if (e) {
      window.location.reload();
    }
    else {
      this.isModalActive = false;
    }
  }
}