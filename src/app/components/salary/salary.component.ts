import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SalaryService, Employee, DepartmentAnalysis } from '../../services/salary.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-salary',
    templateUrl: './salary.component.html',
    styleUrls: ['./salary.component.scss'],
    standalone: false
})
export class SalaryComponent implements OnInit {
  employees: Employee[] = [];
  deptSalaryChartData: any;
  salaryRangeChartData: any;
  chartOptions: any;
  loading = false;

  constructor(
    private salaryService: SalaryService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {
    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        }
      }
    };
  }

  ngOnInit() {
    this.loadEmployeeData();
    this.loadDepartmentAnalysis();
    this.loadSalaryRanges();
  }

  loadEmployeeData() {
    this.loading = true;
    this.salaryService.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load employee data'
        });
        this.loading = false;
      }
    });
  }

  loadDepartmentAnalysis() {
    this.salaryService.getDepartmentAnalysis().subscribe({
      next: (data: DepartmentAnalysis) => {
        this.setupDepartmentChart(data.averageSalaryByDepartment);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load department analysis'
        });
      }
    });
  }

  loadSalaryRanges() {
    this.salaryService.getSalaryRanges().subscribe({
      next: (data) => {
        this.setupSalaryRangeChart(data);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load salary ranges'
        });
      }
    });
  }

  setupDepartmentChart(data: any[]) {
    console.log('Setting up department chart with data:', data);
    const labels = data.map(item => item[0]);
    const values = data.map(item => Math.round(item[1]));

    this.deptSalaryChartData = {
      labels: labels,
      datasets: [
        {
          label: 'Average Salary by Department',
          data: values,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF'
          ]
        }
      ]
    };
    console.log('Department chart data set:', this.deptSalaryChartData);
    this.cdr.detectChanges();
  }

  setupSalaryRangeChart(data: any[]) {
    console.log('Setting up salary range chart with data:', data);
    const labels = data.map(item => item[0]);
    const values = data.map(item => item[1]);

    this.salaryRangeChartData = {
      labels: labels,
      datasets: [
        {
          label: 'Employee Count by Salary Range',
          data: values,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0'
          ]
        }
      ]
    };
    console.log('Salary range chart data set:', this.salaryRangeChartData);
    this.cdr.detectChanges();
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  }
}
