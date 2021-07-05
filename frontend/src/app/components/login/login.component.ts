import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

  constructor(
    public fb: FormBuilder,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router) { }

  ngOnInit(): void {
  }

  // Getter to access form control
  get myForm(){
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm == null || !this.loginForm.valid) {
      return false;
    } else {
      this.authService.authenticateUse(this.loginForm.value).subscribe(data => {
        if (data.success) {
          this.authService.storeUserData(data.token, data.user);
          this.flashMessage.show(
              'You are now logged in',
              {cssClass: 'alert-success', timeout: 5000 /*5 sec*/});
          this.router.navigate(['dashboard']);
        } else {
          this.flashMessage.show(
              data.msg, {cssClass: 'alert-danger', timeout: 5000 /*5 sec*/});
          this.router.navigate(['login']);
        }
      });
      return true;
    }
  }
}
