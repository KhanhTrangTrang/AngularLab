import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../employees';
import { filter, map, take } from 'rxjs/operators';
import { ConfirmType } from '../common';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private url = 'http://localhost:8098/api/employees';
  // Lưu lại tất cả nhân viên sau khi lấy từ server
  empoyees: Employee[] = [];
  // Thông tin user hiện tại dùng trong việc thêm sửa xóa nhân viên
  private current: Employee = {
    id: 0,
    name: '',
    email: '',
    tel: ''
  } 
  // Message sử dụng cho trang Result để thông báo kết quả.
  private message = '';
  set Message(message: string) {this.message = message}
  get Message() { return this.message; }
  

  constructor(private http: HttpClient) { }
  set Current(employee: Employee) {this.current = employee}
  get Current() { return this.current; }
  // Để xác định trang confirm thuộc hiện thị form nào: Thêm, sửa, xóa
  private type: ConfirmType = ConfirmType.Add
  set Type(type: ConfirmType) {this.type = type}
  get Type() { return this.type; }
  // Lấy thông tin tất cả nhân viên từ server
  async getEmployees()
  {
      this.empoyees =  await this.http.get<Employee[]>(this.url).toPromise();
  }
  getEmployeeById(id: number)
  {
    return this.http.get<Employee>(`${this.url}/${id}`);
  }
  // Gửi đi yêu cầu update thông tin nhân viên
  updateEmployee()
  {
    return this.http.put<Employee>(`${this.url}/${this.Current.id}`, JSON.stringify(this.current), this.httpOptions);
  }
  // Gửi đi yêu cầu xóa nhân viên lên server
  deleteEmployee()
  {
    return this.http.delete<Employee>(`${this.url}/${this.Current.id}`,this.httpOptions);
  }
  // Gửi đi yêu cầu thêm nhân viên lên server
  addEmployee()
  {
    return this.http.post<Employee>(`${this.url}`, JSON.stringify(this.current), this.httpOptions);
  }
  // Kiểm tra xem đã login chưa
  isLogin(): boolean
  {
    const item = localStorage.getItem('user');
    if (item)
      return true;
    return false;
  }
 
}
