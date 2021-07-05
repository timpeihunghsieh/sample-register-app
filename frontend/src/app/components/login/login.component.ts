import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

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
    public fb: FormBuilder) { }

  ngOnInit(): void {
  }

  // Getter to access form control
  get myForm(){
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm == null || !this.loginForm.valid) {

      console.log("invalid form");

      return false;
    } else {
      // // Register user
      // this.authService.registerUser(this.userForm.value).subscribe(data => {
      //   if (data.success) {
      //     this.flashMessage.show(
      //       "You are now registered and can log in",
      //       {cssClass: 'alert-success', timeout: 3000 /* 3 seconds */});
      //     this.router.navigate(['/login']);
      //   } else {
      //     this.flashMessage.show(
      //       "Something went wrong",
      //       {cssClass: 'alert-danger', timeout: 3000 /* 3 seconds */});
      //     this.router.navigate(['/register']);
      //   }
      // });

      console.log("valid form");

      return true;
    }
  }
}
