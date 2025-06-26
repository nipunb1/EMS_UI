import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ValueAdd {
  ideaId: number;
  projId: number;
  projName: string;
  ideaTitle: string;
  ideaDescription: string;
  ideaCategory: string;
  submissionDate: string;
  impactLevel: string;
  status: string;
}

export interface IdeaCategories {
  countByImpactLevel: any[];
  countByCategory: any[];
  countByStatus: any[];
}

@Injectable({
  providedIn: 'root'
})
export class ValueaddService {
  private baseUrl = 'http://localhost:8083/api/valueadd';

  constructor(private http: HttpClient) { }

  getProjectIdeas(projId: number): Observable<ValueAdd[]> {
    return this.http.get<ValueAdd[]>(`${this.baseUrl}/projects/${projId}/ideas`);
  }

  getAllIdeas(): Observable<ValueAdd[]> {
    return this.http.get<ValueAdd[]>(`${this.baseUrl}/impact-summary`);
  }

  getIdeaCategories(): Observable<IdeaCategories> {
    return this.http.get<IdeaCategories>(`${this.baseUrl}/categories`);
  }
}
