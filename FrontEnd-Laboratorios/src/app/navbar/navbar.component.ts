import { Component } from '@angular/core';
import { AuthService } from '../services/login/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userName: string | null = null;
  userRole: string | null = null;

  constructor(private authService: AuthService) {
    this.userName = this.authService.getUserName();
    this.userRole = this.authService.getRole();
  }

  logout() {
    this.authService.logout();
  }
}

// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../services/login/auth.service';

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.css']
// })
// export class NavbarComponent implements OnInit {
//   userRole: string | null = null;

//   constructor(private authService: AuthService) {}

//   ngOnInit(): void {
//     this.userRole = this.authService.getRole();
//   }

//   logout(): void {
//     this.authService.logout();
//   }
// }
