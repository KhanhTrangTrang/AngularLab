import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeesService } from '../services/employees.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(public sevrice: EmployeesService, private rounter: Router) { }

  ngOnInit(): void {
    if (!this.sevrice.isLogin())
      this.logout();
  }

  logout(): void {
    localStorage.removeItem('user');
    this.rounter.navigate(['/login']);
  }
}
