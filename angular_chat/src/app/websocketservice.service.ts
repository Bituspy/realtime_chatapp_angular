import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';


@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: any;
  private serverUrl = 'http://localhost:3000';

  constructor() {}

  sendMessage(message: any): void {
    this.socket.emit('message', message);
  }

  // WebSocketService
  connect(): void {
    this.socket = io('http://localhost:3000');
    console.log('CONNECTED');

    this.socket.on('connect', () => {
      const userData = {
        username: localStorage.getItem('username'),
        socketId: this.socket.id,
      };

      this.socket.emit('user-online', userData);
    });
  }

  //disconnect websocket
  disconnect(): void {
    this.socket.disconnect();
  }

  subscribeToMessages(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('message', (message: any) => {
        observer.next(message);
      });
    });
  }
  // Subscribe to the list of online users
  subscribeToOnlineUsers(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('online-users', (users: string[]) => {
        observer.next(users);
      });
    });
  }
}
