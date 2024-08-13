import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  userName: string | null = null;
  userRole: string | null = null;
  selectedMenu: string = '';
  hoveredMenu: string = '';

  dropdownOpen: { [key: string]: boolean } = {};

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userName = this.authService.getUserName();
    this.userRole = this.authService.getRole();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Navegar a la página de login después de salir
  }

  isRole(role: string): boolean {
    return this.userRole === role;
  }

  selectMenu(menu: string): void {
    this.selectedMenu = menu;
  }

  hoverMenu(menu: string): void {
    this.hoveredMenu = menu;
  }

  // toggleDropdown(menu: string): void {
  //   this.dropdownOpen[menu] = !this.dropdownOpen[menu];
  // }
}
