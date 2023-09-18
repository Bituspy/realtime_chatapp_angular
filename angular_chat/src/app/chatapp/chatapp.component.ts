
import { WebSocketService } from '../websocketservice.service';
import { Router } from '@angular/router';
import { Component,OnInit, ElementRef, ViewChild } from '@angular/core';

interface User {
  username: string;
  socketId: string;
}


@Component({
  selector: 'app-chatapp',
  templateUrl: './chatapp.component.html',
  styleUrls: ['./chatapp.component.css'],
})
export class ChatappComponent implements OnInit {
  private notificationSound = new Audio('../../assets/notification.wav');

  @ViewChild('messageScroll') messageScroll!: ElementRef;

  Visitorusername: any;
  newMessage: any;
  messages: { sender: string; text: string }[] = [];
  onlineUsers: User[] = []; // List of online users
  constructor(
    private webSocketService: WebSocketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.Visitorusername = localStorage.getItem('username');
    if (this.Visitorusername == undefined) {
      this.router.navigate(['/']);
      return;
    }
    // Initialize WebSocket connection and subscribe to messages
    this.webSocketService.connect();
    this.webSocketService.subscribeToMessages().subscribe((message: any) => {
      this.messages.push(message);
      this.notificationSound.play();
    });
    // Subscribe to the list of online users
    this.webSocketService
      .subscribeToOnlineUsers()
      .subscribe((users: User[]) => {
        this.onlineUsers = users;
      });
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.webSocketService.sendMessage({
        sender: this.Visitorusername,
        text: this.newMessage,
      });
      this.newMessage = '';
    }
    try {
      this.messageScroll.nativeElement.scrollTop =
        this.messageScroll.nativeElement.scrollHeight;
      console.log('scrolled');
    } catch (err) {
      // Handle error (if any)
    }
  }

  logout() {
    this.webSocketService.disconnect();
    localStorage.removeItem('username');
    this.router.navigate(['/']);
  }
}
