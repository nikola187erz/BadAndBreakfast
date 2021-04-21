import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../_classes/user';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public credentials = {
    email: null,
    password: null
  }

  public user: User = {
    email: "",
    firstname: "",
    lastname: "",
  }

  public userForm: FormGroup;

  public successMessage: any = null;
  public errorMessage: any = null;
  public submitted = false;

  public randomInt = this.generateRandomInt();
  public randomInt2 = this.generateRandomInt();

  constructor(private router: Router, private authService: AuthService, private userService: UserService, private formBuilder: FormBuilder) { 
    this.userForm = this.formBuilder.group({
      email: [
        this.credentials.email, [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],
      firstname: [
        this.user.firstname, [
          Validators.required,
          Validators.maxLength(24)
        ]
      ],
      lastname: [
        this.user.lastname, [
          Validators.required,
          Validators.maxLength(24)
        ]
      ],
      password: [
        this.credentials.password, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64)
        ]
      ], 
      result: [
        null, [
          Validators.required
        ]
      ]
    });
  }

  generateRandomInt() {
    return Math.floor(Math.random() * 1000)
  }

  get uf() { return this.userForm.controls; }

  signUp() {
    this.submitted = true;
    this.successMessage = null;
    this.errorMessage = null;
    
    if (this.userForm.invalid) {
      this.randomInt = this.generateRandomInt();
      this.randomInt2 = this.generateRandomInt();
      return;
    }

    if (this.randomInt + this.randomInt2 !== this.uf.result.value) {
      this.randomInt = this.generateRandomInt();
      this.randomInt2 = this.generateRandomInt();
      this.errorMessage = "Rechnung falsch";
      return;
    }

    this.user.email = this.uf.email.value;
    this.user.firstname = this.uf.firstname.value;
    this.user.lastname = this.uf.lastname.value;
    this.credentials.email = this.uf.email.value;
    this.credentials.password = this.uf.password.value;

    this.authService.signUp(this.credentials).then(
      (uid) => {
        this.userService.create(uid, this.user).then(
          ()=> {
            this.successMessage = "Successfuly Registered";
            this.router.navigate(["/entries"]);
          }
        ).catch(err => {
          this.errorMessage = err;
        })
      }
    ).catch(err => {
      this.errorMessage = err;
    })
  }

  ngOnInit(): void {
  }

}
