import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  empId: number;
  empName: string;
  empProject: string;
  empDept: string;
  empSal: number;
  empExp: number;
}

export interface DepartmentAnalysis {
  averageSalaryByDepartment: any[];
  employeeCountByDepartment: any[];
}

@Injectable({
  providedIn: 'root'
})
export class SalaryService {
  private baseUrl = 'http://localhost:8082/api/salary';

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/employees`);
  }

  getDepartmentAnalysis(): Observable<DepartmentAnalysis> {
    return this.http.get<DepartmentAnalysis>(`${this.baseUrl}/department-analysis`);
  }

  getSalaryRanges(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/salary-ranges`);
  }
}
