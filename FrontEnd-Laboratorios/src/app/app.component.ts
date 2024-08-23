import { Component } from '@angular/core';
import { AuthService } from './services/login/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontEnd-Laboratorios';

  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isAuthenticated = this.authService.isAuthenticated();
      }
    });
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }
}
