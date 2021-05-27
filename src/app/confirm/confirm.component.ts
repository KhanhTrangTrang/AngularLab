import { Component, OnInit } from '@angular/core';
import { ConfirmType } from '../common';
import { EmployeesService } from '../services/employees.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  public emplyee = this.employeeService.Current;

  constructor(public employeeService: EmployeesService, private location: Location, private router: Router) { }

  ngOnInit(): void {
    if (!this.employeeService.isLogin())
      this.logout();
    this.init();
  }

  hideWarning = true;

  messages: string[] = [];

  private hideAdd = false;
  public get HideAdd(): boolean {
    return this.hideAdd;
  }
  public set HideAdd(v: boolean) {
    this.hideAdd = v;
  }

  private hideUpdate = false;
  public get HideUpdate(): boolean {
    return this.hideUpdate;
  }
  public set HideUpdate(v: boolean) {
    this.hideUpdate = v;
  }

  private hideDelete = false;
  public get HideDelete(): boolean {
    return this.hideDelete;
  }
  public set HideDelete(v: boolean) {
    this.hideDelete = v;
  }

  init(): void {
    const type = this.employeeService.Type;
    if (type === ConfirmType.Add) {
      this.hideAdd = false;
      this.hideDelete = true;
      this.hideUpdate = true;
    }
    if (type === ConfirmType.Update) {
      this.hideAdd = true;
      this.hideDelete = true;
      this.hideUpdate = false;
    }
    if (type === ConfirmType.Delete) {
      this.hideAdd = true;
      this.hideDelete = false;
      this.hideUpdate = true;
    }
  }

  goBack(): void {
    this.location.back();
  }

  OKAdd(): void {
    //Warning
    this.messages = [];
    this.hideWarning = true;
    const employee = this.employeeService.Current;

    // Check format
    if (employee.name === "") this.messages.push("Hãy nhập vào tên nhân viên");
    const nameRegex = /^\w((?!(<\S)|(\S>)).)*$/;
    if (employee.name !== "" && !nameRegex.test(employee.name)) this.messages.push("Tên không đúng format");

    const emailRegex = new RegExp("^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$");
    if (employee.email === "") this.messages.push("Hãy nhập vào email nhân viên");
    if (employee.email !== "" && !emailRegex.test(employee.email)) this.messages.push("Email không đúng format");
    // Check unique email
    if (employee.email !== "" && emailRegex.test(employee.email))
    {
      const element = this.employeeService.empoyees.find(val => val.email === employee.email)
      if (element)
      {
        this.messages.push("Email phải là duy nhất");
      }

    }

    const telRegex = /^(?=.{0,14}$)([0-9]+)[-. ]([0-9]+)[-. ]([0-9]+)/;
    if (employee.tel === "") this.messages.push("Hãy nhập vào tel nhân viên")
    if (employee.tel !== "" && !telRegex.test(employee.tel)) this.messages.push("Tel không đúng format");
    
    if (this.messages.length > 0)
    {
      this.hideWarning = false;
      return;
    }
      


    this.employeeService.Message = "Đăng kí thành công";
    this.employeeService.addEmployee().subscribe((res) => {
      console.log(res);
    },
    error=>{
      console.log(error);
      
    }
    );
    this.router.navigate(['/result']);
  }
  OKUpdate(): void {
    this.employeeService.Message = "Updat thông tin thành công";
    this.employeeService.updateEmployee().subscribe((res) => {
      console.log(res);
    },
    error=>{
      console.log(error);
      
    }
    );
    this.router.navigate(['/result']);
  }

  OKDelete(): void {
    this.employeeService.Message = "Delete thông tin thành công";
    this.employeeService.deleteEmployee().subscribe((res) => {
      console.log(res);
    },
    error=>{
      console.log(error);
      
    }
    );
    this.router.navigate(['/result']);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }


}
