import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employees';
import { EmployeesService } from '../services/employees.service';
import { Location } from '@angular/common';
import { ConfirmType } from '../common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  employee: Employee = {
    id: 0,
    name: '',
    email: '',
    tel: ''
  };
  hideWarning = true;

  messages: string[] = [];
  constructor(private rounte: ActivatedRoute, 
    private employeeService: EmployeesService,
    private location: Location,
    private rounter: Router) { }

  ngOnInit(): void {
    if (!this.employeeService.isLogin())
      this.logout();
    this.setEmployeeDetails();
  }

  // Lấy thông tin nhân viên từ data base
  setEmployeeDetails(): void
  {

    const id = this.rounte.snapshot.paramMap.get('id');
    if(id)
    {
      const idNumber: number = +id;
      this.employeeService.getEmployeeById(idNumber).subscribe(
        data => 
        this.employee = data);
    }
    
  }
  // Chọn update thông tin nhân viên
  updateEmployee(): void
  {
    //Warning
    this.messages = [];
    this.hideWarning = true;

    // Check format
    if (this.employee.name === "") this.messages.push("Hãy nhập vào tên nhân viên");
    const nameRegex = /^\w((?!(<\S)|(\S>)).)*$/;
    if (this.employee.name !== "" && !nameRegex.test(this.employee.name)) this.messages.push("Tên không đúng format");

    const emailRegex = new RegExp("^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$");
    if (this.employee.email === "") this.messages.push("Hãy nhập vào email nhân viên");
    if (this.employee.email !== "" && !emailRegex.test(this.employee.email)) this.messages.push("Email không đúng format");
    // Check unique email
    if (this.employee.email !== "" && emailRegex.test(this.employee.email))
    {
      const element = this.employeeService.empoyees.find(val => val.email === this.employee.email && val.id !== this.employee.id)
      if (element)
      {
        this.messages.push("Email phải là duy nhất");
      }

    }

    const telRegex = /^(?=.{0,14}$)([0-9]+)[-. ]([0-9]+)[-. ]([0-9]+)/;
    if (this.employee.tel === "") this.messages.push("Hãy nhập vào tel nhân viên")
    if (this.employee.tel !== "" && !telRegex.test(this.employee.tel)) this.messages.push("Tel không đúng format");
    
    if (this.messages.length > 0)
    {
      this.hideWarning = false;
      return;
    }

    const type: ConfirmType = ConfirmType.Update;
    this.employeeService.Type = type;
    this.employeeService.Current = this.employee;
    this.rounter.navigate(['/update']);
  }
  // Chọn delete thông tin nhân viên
  deleteEmployee(): void
  {
    const type: ConfirmType = ConfirmType.Delete;
    this.employeeService.Type = type;
    this.employeeService.Current = this.employee;
    this.rounter.navigate(['/delete']);
  }
  // Trở lại trang quản lí thông tin nhân viên
  goBack(): void {
    this.location.back();
  }
  //Thoát khỏi ứng dụng
  logout(): void {
    localStorage.removeItem('user');
    this.rounter.navigate(['/login']);
  }

}
