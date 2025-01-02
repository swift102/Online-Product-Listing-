import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private dataService: DataService) {}

  login() {
    this.dataService.login(this.email, this.password).subscribe(
      response => {
        this.router.navigate(['/product']); // Navigate to product route upon successful login
      },
      error => {
        alert('Login failed. Please check your credentials and try again.');
      }
    );
  }
}
