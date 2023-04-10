import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  toggle(){
    let nav=document.getElementsByClassName("nav-fostrap")[0];
    nav.classList.toggle("visible")
  }
}
