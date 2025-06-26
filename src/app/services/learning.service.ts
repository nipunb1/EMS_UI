import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface LearningHours {
  empId: number;
  empName: string;
  trainingName: string;
  learningHours: number;
  trainingCategory: string;
  completionDate: string;
}

export interface CategoryData {
  hoursByCategory: any[];
  countByCategory: any[];
}

@Injectable({
  providedIn: 'root'
})
export class LearningService {
  private baseUrl = 'http://localhost:8081/api/learning';
  private useDummyData = true;

  private dummyLearningData: LearningHours[] = [
    { empId: 1, empName: 'John Smith', trainingName: 'Angular Advanced Concepts', learningHours: 40, trainingCategory: 'Technical', completionDate: '2024-01-15' },
    { empId: 2, empName: 'Sarah Johnson', trainingName: 'Leadership Excellence', learningHours: 24, trainingCategory: 'Leadership', completionDate: '2024-01-20' },
    { empId: 3, empName: 'Mike Chen', trainingName: 'Data Security Compliance', learningHours: 16, trainingCategory: 'Compliance', completionDate: '2024-02-01' },
    { empId: 4, empName: 'Emily Davis', trainingName: 'Project Management Fundamentals', learningHours: 32, trainingCategory: 'Management', completionDate: '2024-02-10' },
    { empId: 5, empName: 'David Wilson', trainingName: 'Cloud Architecture Patterns', learningHours: 48, trainingCategory: 'Technical', completionDate: '2024-02-15' },
    { empId: 6, empName: 'Lisa Brown', trainingName: 'Effective Communication', learningHours: 20, trainingCategory: 'Soft Skills', completionDate: '2024-02-20' },
    { empId: 7, empName: 'Robert Taylor', trainingName: 'Agile Methodologies', learningHours: 28, trainingCategory: 'Management', completionDate: '2024-03-01' },
    { empId: 8, empName: 'Jennifer Lee', trainingName: 'Cybersecurity Awareness', learningHours: 12, trainingCategory: 'Compliance', completionDate: '2024-03-05' },
    { empId: 9, empName: 'Mark Anderson', trainingName: 'Machine Learning Basics', learningHours: 56, trainingCategory: 'Technical', completionDate: '2024-03-10' },
    { empId: 10, empName: 'Amanda White', trainingName: 'Team Building Workshop', learningHours: 16, trainingCategory: 'Leadership', completionDate: '2024-03-15' }
  ];

  private dummyCategoryData: CategoryData = {
    hoursByCategory: [
      ['Technical', 144],
      ['Leadership', 40], 
      ['Management', 60],
      ['Compliance', 28],
      ['Soft Skills', 20]
    ],
    countByCategory: [
      ['Technical', 3],
      ['Leadership', 2],
      ['Management', 2], 
      ['Compliance', 2],
      ['Soft Skills', 1]
    ]
  };

  constructor(private http: HttpClient) { }

  getEmployeeLearningHours(empId: number): Observable<LearningHours[]> {
    if (this.useDummyData) {
      return of(this.dummyLearningData.filter(item => item.empId === empId));
    }
    return this.http.get<LearningHours[]>(`${this.baseUrl}/employees/${empId}/hours`);
  }

  getAllTrainingSummary(): Observable<LearningHours[]> {
    if (this.useDummyData) {
      return of(this.dummyLearningData);
    }
    return this.http.get<LearningHours[]>(`${this.baseUrl}/training-summary`);
  }

  getTrainingCategories(): Observable<CategoryData> {
    if (this.useDummyData) {
      return of(this.dummyCategoryData);
    }
    return this.http.get<CategoryData>(`${this.baseUrl}/categories`);
  }
}
