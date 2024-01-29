import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})

export class NavComponent {

  constructor(private router: Router,
              private toast: ToastrService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.router.navigate(['home'])
  }

  logout() {
    this.router.navigate(["login"]);
    this.authService.logout();
    this.toast.info("Logout realizado com sucesso", "Logout")
  }
}
