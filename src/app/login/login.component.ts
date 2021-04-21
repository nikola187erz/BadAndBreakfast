import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public credentials = {
    email: null,
    password: null
  }

  public userForm: FormGroup;

  public successMessage: any = null;
  public errorMessage: any = null;
  public submitted = false;

  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder) { 
    this.userForm = this.formBuilder.group({
      email: [
        this.credentials.email, [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],
      password: [
        this.credentials.password, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64)
        ]
      ]
    });
  }

  get uf() { return this.userForm.controls; }

  signIn() {
    this.submitted = true;
    this.successMessage = null;
    this.errorMessage = null;
    
    if (this.userForm.invalid) {
      return;
    }

    this.credentials.email = this.uf.email.value;
    this.credentials.password = this.uf.password.value;

    this.authService.signIn(this.credentials).then(
      () => {
        this.successMessage = "Logged in";
        this.router.navigate(["/entries"]);
      }
    ).catch(err => {
      this.errorMessage = err;
    })
  }

  ngOnInit(): void {
  }

}
