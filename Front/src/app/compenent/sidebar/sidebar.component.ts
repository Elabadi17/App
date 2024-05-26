import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CanActivate, Router } from '@angular/router';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],

  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
  }
  isAdmin(): boolean {
    return this.authService.getRoles().includes('ROLE_ADMIN');
  }

  isUser(): boolean {
    return this.authService.getRoles().includes('ROLE_USER');
  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  // Fonction appelée lors du clic sur le bouton de déconnexion
  logout(): void {
    this.authService.logout(); // Appel de la fonction de déconnexion du service d'authentification
    this.router.navigate(['/login']);
  }

}
