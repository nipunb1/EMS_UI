import { Component, OnInit } from '@angular/core';
import { LearningService, LearningHours, CategoryData } from '../../services/learning.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-learning',
    templateUrl: './learning.component.html',
    styleUrls: ['./learning.component.scss'],
    standalone: false
})
export class LearningComponent implements OnInit {
  learningData: LearningHours[] = [];
  categoryChartData: any;
  countChartData: any;
  chartOptions: any;
  loading = false;

  constructor(
    private learningService: LearningService,
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
    this.loadLearningData();
    this.loadCategoryData();
  }

  loadLearningData() {
    this.loading = true;
    this.learningService.getAllTrainingSummary().subscribe({
      next: (data) => {
        this.learningData = data;
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load learning data'
        });
        this.loading = false;
      }
    });
  }

  loadCategoryData() {
    this.learningService.getTrainingCategories().subscribe({
      next: (data: CategoryData) => {
        this.setupCategoryChart(data.hoursByCategory);
        this.setupCountChart(data.countByCategory);
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

  setupCategoryChart(data: any[]) {
    const labels = data.map(item => item[0]);
    const values = data.map(item => item[1]);

    this.categoryChartData = {
      labels: labels,
      datasets: [
        {
          label: 'Learning Hours by Category',
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

  setupCountChart(data: any[]) {
    const labels = data.map(item => item[0]);
    const values = data.map(item => item[1]);

    this.countChartData = {
      labels: labels,
      datasets: [
        {
          label: 'Training Count by Category',
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
}
