import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/login/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  role: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.role = this.authService.getRole();
  }

  isRole(role: string): boolean {
    return this.role === role;
  }
}
