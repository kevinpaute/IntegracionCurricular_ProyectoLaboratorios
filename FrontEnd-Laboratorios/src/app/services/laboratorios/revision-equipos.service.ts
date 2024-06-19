import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RevisionEquiposService {

  private apiUrl = 'http://localhost:3000/api/revisiones';

  constructor(private http: HttpClient) {}

  getRevisiones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getRevisionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createRevision(revision: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, revision);
  }

  updateRevision(id: number, revision: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, revision);
  }

  deleteRevision(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  createManyRevisiones(revisiones: any[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/many`, revisiones);
  }
}