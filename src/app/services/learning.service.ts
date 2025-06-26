import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient) { }

  getEmployeeLearningHours(empId: number): Observable<LearningHours[]> {
    return this.http.get<LearningHours[]>(`${this.baseUrl}/employees/${empId}/hours`);
  }

  getAllTrainingSummary(): Observable<LearningHours[]> {
    return this.http.get<LearningHours[]>(`${this.baseUrl}/training-summary`);
  }

  getTrainingCategories(): Observable<CategoryData> {
    return this.http.get<CategoryData>(`${this.baseUrl}/categories`);
  }
}
