import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaSocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  onReservaCambiada(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('reservaCambiada', data => {
        observer.next(data);
      });
    });
  }

  emitReservaCambiada(data: any): void {
    this.socket.emit('reservaCambiada', data);
  }
}
