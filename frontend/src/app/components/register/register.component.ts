import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

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
    public fb: FormBuilder) {
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
      // this.apiService.createEmployee(this.employeeForm.value).subscribe(
      //   (res) => {
      //     console.log('Employee successfully created!')
      //     this.ngZone.run(() => this.router.navigateByUrl('/list-employees'))
      //   }, (error) => {
      //     console.log(error);
      //   });

      return true;
    }
  }
}
