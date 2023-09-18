import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';

  constructor(private router: Router) {
  
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.username = storedUsername;
    }
  }

  login(): void {
   
    if (this.username.trim() !== '') {
    
      localStorage.setItem('username', this.username);

      
      this.router.navigate(['/chat']);
    } else {
      alert('Please enter a username');
    }
  }
}
