import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})

export class NavComponent {

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.navigate(['tecnicos'])
  }

}
