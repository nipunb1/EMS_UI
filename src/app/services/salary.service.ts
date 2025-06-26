import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

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
  private useDummyData = true;

  private dummyEmployees: Employee[] = [
    { empId: 1, empName: 'John Smith', empProject: 'EMS Platform', empDept: 'Engineering', empSal: 95000, empExp: 5 },
    { empId: 2, empName: 'Sarah Johnson', empProject: 'Mobile App', empDept: 'Engineering', empSal: 88000, empExp: 4 },
    { empId: 3, empName: 'Mike Chen', empProject: 'Data Analytics', empDept: 'Data Science', empSal: 102000, empExp: 6 },
    { empId: 4, empName: 'Emily Davis', empProject: 'Product Strategy', empDept: 'Product', empSal: 110000, empExp: 7 },
    { empId: 5, empName: 'David Wilson', empProject: 'Cloud Migration', empDept: 'Engineering', empSal: 98000, empExp: 5 },
    { empId: 6, empName: 'Lisa Brown', empProject: 'UX Research', empDept: 'Design', empSal: 85000, empExp: 4 },
    { empId: 7, empName: 'Robert Taylor', empProject: 'Marketing Campaign', empDept: 'Marketing', empSal: 75000, empExp: 3 },
    { empId: 8, empName: 'Jennifer Lee', empProject: 'Security Audit', empDept: 'Security', empSal: 105000, empExp: 6 },
    { empId: 9, empName: 'Mark Anderson', empProject: 'AI Integration', empDept: 'Data Science', empSal: 115000, empExp: 8 },
    { empId: 10, empName: 'Amanda White', empProject: 'HR Systems', empDept: 'HR', empSal: 70000, empExp: 3 }
  ];

  private dummyDepartmentAnalysis: DepartmentAnalysis = {
    averageSalaryByDepartment: [
      ['Engineering', 93667],
      ['Data Science', 108500],
      ['Product', 110000],
      ['Design', 85000],
      ['Marketing', 75000],
      ['Security', 105000],
      ['HR', 70000]
    ],
    employeeCountByDepartment: [
      ['Engineering', 3],
      ['Data Science', 2],
      ['Product', 1],
      ['Design', 1],
      ['Marketing', 1],
      ['Security', 1],
      ['HR', 1]
    ]
  };

  private dummySalaryRanges = [
    ['$60K-$80K', 2],
    ['$80K-$100K', 4],
    ['$100K-$120K', 4]
  ];

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<Employee[]> {
    if (this.useDummyData) {
      return of(this.dummyEmployees);
    }
    return this.http.get<Employee[]>(`${this.baseUrl}/employees`);
  }

  getDepartmentAnalysis(): Observable<DepartmentAnalysis> {
    if (this.useDummyData) {
      return of(this.dummyDepartmentAnalysis);
    }
    return this.http.get<DepartmentAnalysis>(`${this.baseUrl}/department-analysis`);
  }

  getSalaryRanges(): Observable<any[]> {
    if (this.useDummyData) {
      return of(this.dummySalaryRanges);
    }
    return this.http.get<any[]>(`${this.baseUrl}/salary-ranges`);
  }
}
