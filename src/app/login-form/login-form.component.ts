import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from '../services/employees.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  returnUrl: string = ''; checkoutForm = this.formBuilder.group({
    user: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  submitted = false;
  // Hiển thị cảnh báo khi nhập vào thông tin đăng nhập sai
  hideWaring = true;
  //Thực hiện login
  onSubmit(): void {
    this.submitted = true; 

    if (this.checkoutForm.invalid) {
      return;
    }
    if (this.checkoutForm.controls.user.value !== 'Admin' || this.checkoutForm.controls.password.value !== '123')
    {
      this.hideWaring = false;
      return;
    }
      
    
    const user = {
      ...this.checkoutForm.value,
      token: 'fake-login-token'
    }
    // Lưu thông tin đăng nhập người dùng vào để kiểm tra quyền đã login hay chưa
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['/employees']);
    this.checkoutForm.reset();
  }

}
