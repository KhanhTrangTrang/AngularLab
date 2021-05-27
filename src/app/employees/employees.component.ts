import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmType } from '../common';
import { Employee } from '../employees';
import { EmployeesService } from '../services/employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  searching: string = '';
  hideWarningSearching = true;

  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [3, 6, 9];

  constructor(private employeesService: EmployeesService, private router: Router) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  employees: Employee[] = [];
  // Khởi tạo thông tin nhân viên, chỉ số trang hiện tại
  setEmployees(employees: Employee[]): void {
    this.hideWarningSearching = true;
    this.employeesService.empoyees = employees;
    if (this.searching === '')
      this.employees = employees;
    else {
      this.employees = employees.filter(x => x.name.includes(this.searching));
      if (this.employees.length === 0)
        this.hideWarningSearching = false;
    }
    this.count = this.employees.length;
    this.pageSize = 5;

  }
  // Lấy ra tất cả nhân viên đã lưu vào data base
  getEmployees(): void {
    if (!this.employeesService.isLogin())
      this.logout();
    this.employeesService.getEmployees().subscribe(val => this.setEmployees(val));
  }

  // getFullEmployees(): void {
  //   this.employees = this.employeesService.empoyees;
  //   this.page = 1;
  //   this.searching = '';
  //   this.hideWarningSearching = true;
  // }
  // Lựa chọn để thêm nhân viên mới
  addEmployee(): void {
    this.employeesService.Type = ConfirmType.Add;
    const employee: Employee = {
      id: 0,
      name: '',
      email: '',
      tel: ''
    }
    this.employeesService.Current = employee;
    this.router.navigate(['/add']);
  }
  //Thoát khỏi ứng dụng
  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  // Xử lí việc thay đổi trang
  handlePageChange(event: any): void {
    this.page = event;
  }
}
