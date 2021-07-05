import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitted = false;
  userForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required,
              Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      nickname: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });

  constructor(
    public fb: FormBuilder,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  // Getter to access form control
  get myForm(){
    return this.userForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm == null || !this.userForm.valid) {
      return false;
    } else {
      // Register user
      this.authService.registerUser(this.userForm.value).subscribe(data => {
        if (data.success) {
          this.flashMessage.show(
            "You are now registered and can log in",
            {cssClass: 'alert-success', timeout: 3000 /* 3 seconds */});
          this.router.navigate(['/login']);
        } else {
          this.flashMessage.show(
            "Something went wrong",
            {cssClass: 'alert-danger', timeout: 3000 /* 3 seconds */});
          this.router.navigate(['/register']);
        }
      });

      return true;
    }
  }
}
