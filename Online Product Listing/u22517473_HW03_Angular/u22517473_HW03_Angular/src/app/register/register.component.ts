import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../Services/data.service';
import { HttpClient } from '@angular/common/http';
import { RegisterUser } from '../shared/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      emailaddress: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.dataService.register(this.registerForm.value).subscribe(
      response => {
        if (response.success) {
          this.successMessage = 'Registration successful!';
          this.router.navigate(['/login']);
          this.errorMessage = '';
        } else {
          this.errorMessage = 'Registration failed.';
          this.successMessage = '';
        }
      },
      error => {
        if (error.status === 409) {
          this.errorMessage = 'User already exists.';
        } else {
          this.errorMessage = 'Registration failed. Please try again.';
        }
        this.successMessage = '';
      }
    );
  }
}