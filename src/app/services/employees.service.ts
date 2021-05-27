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

  empoyees: Employee[] = [];
  private current: Employee = {
    id: 0,
    name: '',
    email: '',
    tel: ''
  } 
  private message = '';
  set Message(message: string) {this.message = message}
  get Message() { return this.message; }
  private type: ConfirmType = ConfirmType.Add

  constructor(private http: HttpClient) { }
  set Current(employee: Employee) {this.current = employee}
  get Current() { return this.current; }
  set Type(type: ConfirmType) {this.type = type}
  get Type() { return this.type; }
  getEmployees()
  {
      return this.http.get<Employee[]>(this.url);
  }
  getEmployeeById(id: number)
  {
    return this.http.get<Employee>(`${this.url}/${id}`);
  }
  updateEmployee()
  {
    return this.http.put<Employee>(`${this.url}/${this.Current.id}`, JSON.stringify(this.current), this.httpOptions);
  }
  deleteEmployee()
  {
    return this.http.delete<Employee>(`${this.url}/${this.Current.id}`,this.httpOptions);
  }
  addEmployee()
  {
    return this.http.post<Employee>(`${this.url}`, JSON.stringify(this.current), this.httpOptions);
  }

  isLogin(): boolean
  {
    const item = localStorage.getItem('user');
    if (item)
      return true;
    return false;
  }
 
}
