import { Component, OnInit } from '@angular/core';
import { ValueaddService, ValueAdd, IdeaCategories } from '../../services/valueadd.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-valueadd',
  templateUrl: './valueadd.component.html',
  styleUrls: ['./valueadd.component.scss']
})
export class ValueaddComponent implements OnInit {
  ideas: ValueAdd[] = [];
  impactChartData: any;
  categoryChartData: any;
  chartOptions: any;
  loading = false;

  constructor(
    private valueaddService: ValueaddService,
    private messageService: MessageService
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
    this.loadIdeasData();
    this.loadCategoryData();
  }

  loadIdeasData() {
    this.loading = true;
    this.valueaddService.getAllIdeas().subscribe({
      next: (data) => {
        this.ideas = data;
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load ideas data'
        });
        this.loading = false;
      }
    });
  }

  loadCategoryData() {
    this.valueaddService.getIdeaCategories().subscribe({
      next: (data: IdeaCategories) => {
        this.setupImpactChart(data.countByImpactLevel);
        this.setupCategoryChart(data.countByCategory);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load category data'
        });
      }
    });
  }

  setupImpactChart(data: any[]) {
    const labels = data.map(item => item[0]);
    const values = data.map(item => item[1]);

    this.impactChartData = {
      labels: labels,
      datasets: [
        {
          label: 'Ideas by Impact Level',
          data: values,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ]
        }
      ]
    };
  }

  setupCategoryChart(data: any[]) {
    const labels = data.map(item => item[0]);
    const values = data.map(item => item[1]);

    this.categoryChartData = {
      labels: labels,
      datasets: [
        {
          label: 'Ideas by Category',
          data: values,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40'
          ]
        }
      ]
    };
  }

  getStatusSeverity(status: string): string {
    switch (status) {
      case 'Implemented': return 'success';
      case 'Approved': return 'info';
      case 'Under Review': return 'warning';
      default: return 'secondary';
    }
  }

  getImpactSeverity(impact: string): string {
    switch (impact) {
      case 'High': return 'danger';
      case 'Medium': return 'warning';
      case 'Low': return 'info';
      default: return 'secondary';
    }
  }
}
