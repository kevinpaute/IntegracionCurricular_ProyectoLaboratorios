import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userIdSubject: BehaviorSubject<number | null>;

  constructor() {
    const storedUserId = sessionStorage.getItem('userId');
    this.userIdSubject = new BehaviorSubject<number | null>(storedUserId ? parseInt(storedUserId, 10) : null);
  }

  setUserId(userId: number): void {
    this.userIdSubject.next(userId);
    sessionStorage.setItem('userId', userId.toString());
  }

  getUserId(): Observable<number | null> {
    return this.userIdSubject.asObservable();
  }

  clearUserId(): void {
    this.userIdSubject.next(null);
    sessionStorage.removeItem('userId');
  }
}
