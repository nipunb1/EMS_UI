import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

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
  private useDummyData = true;

  private dummyIdeas: ValueAdd[] = [
    { ideaId: 1, projId: 101, projName: 'EMS Platform', ideaTitle: 'Automated Report Generation', ideaDescription: 'Implement automated monthly reports to save 20 hours/week', ideaCategory: 'Automation', submissionDate: '2024-01-10', impactLevel: 'High', status: 'Implemented' },
    { ideaId: 2, projId: 102, projName: 'Mobile App', ideaTitle: 'Offline Data Sync', ideaDescription: 'Enable offline functionality for field workers', ideaCategory: 'Performance', submissionDate: '2024-01-15', impactLevel: 'High', status: 'Approved' },
    { ideaId: 3, projId: 103, projName: 'Data Analytics', ideaTitle: 'Real-time Dashboard', ideaDescription: 'Create live dashboard for key metrics monitoring', ideaCategory: 'Analytics', submissionDate: '2024-01-20', impactLevel: 'Medium', status: 'Under Review' },
    { ideaId: 4, projId: 104, projName: 'Product Strategy', ideaTitle: 'User Feedback Integration', ideaDescription: 'Integrate customer feedback directly into product planning', ideaCategory: 'User Experience', submissionDate: '2024-01-25', impactLevel: 'Medium', status: 'Approved' },
    { ideaId: 5, projId: 105, projName: 'Cloud Migration', ideaTitle: 'Cost Optimization Tool', ideaDescription: 'Develop tool to monitor and optimize cloud spending', ideaCategory: 'Cost Reduction', submissionDate: '2024-02-01', impactLevel: 'High', status: 'Implemented' },
    { ideaId: 6, projId: 106, projName: 'UX Research', ideaTitle: 'A/B Testing Framework', ideaDescription: 'Build framework for continuous UX testing', ideaCategory: 'User Experience', submissionDate: '2024-02-05', impactLevel: 'Medium', status: 'Under Review' },
    { ideaId: 7, projId: 107, projName: 'Marketing Campaign', ideaTitle: 'Social Media Automation', ideaDescription: 'Automate social media posting and engagement tracking', ideaCategory: 'Automation', submissionDate: '2024-02-10', impactLevel: 'Low', status: 'Approved' },
    { ideaId: 8, projId: 108, projName: 'Security Audit', ideaTitle: 'Vulnerability Scanner', ideaDescription: 'Implement automated security vulnerability scanning', ideaCategory: 'Security', submissionDate: '2024-02-15', impactLevel: 'High', status: 'Implemented' },
    { ideaId: 9, projId: 109, projName: 'AI Integration', ideaTitle: 'Predictive Analytics', ideaDescription: 'Use ML to predict project risks and outcomes', ideaCategory: 'Analytics', submissionDate: '2024-02-20', impactLevel: 'Medium', status: 'Under Review' },
    { ideaId: 10, projId: 110, projName: 'HR Systems', ideaTitle: 'Employee Skill Matching', ideaDescription: 'Match employees to projects based on skills and availability', ideaCategory: 'Process Improvement', submissionDate: '2024-02-25', impactLevel: 'Low', status: 'Approved' }
  ];

  private dummyIdeaCategories: IdeaCategories = {
    countByImpactLevel: [
      ['High', 4],
      ['Medium', 4],
      ['Low', 2]
    ],
    countByCategory: [
      ['Automation', 2],
      ['Performance', 1],
      ['Analytics', 2],
      ['User Experience', 2],
      ['Cost Reduction', 1],
      ['Security', 1],
      ['Process Improvement', 1]
    ],
    countByStatus: [
      ['Implemented', 3],
      ['Approved', 4],
      ['Under Review', 3]
    ]
  };

  constructor(private http: HttpClient) { }

  getProjectIdeas(projId: number): Observable<ValueAdd[]> {
    if (this.useDummyData) {
      return of(this.dummyIdeas.filter(idea => idea.projId === projId));
    }
    return this.http.get<ValueAdd[]>(`${this.baseUrl}/projects/${projId}/ideas`);
  }

  getAllIdeas(): Observable<ValueAdd[]> {
    if (this.useDummyData) {
      return of(this.dummyIdeas);
    }
    return this.http.get<ValueAdd[]>(`${this.baseUrl}/impact-summary`);
  }

  getIdeaCategories(): Observable<IdeaCategories> {
    if (this.useDummyData) {
      return of(this.dummyIdeaCategories);
    }
    return this.http.get<IdeaCategories>(`${this.baseUrl}/categories`);
  }
}
