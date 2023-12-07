import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  message: string = 'Vous etes deconnectez';
  name: string | undefined;
  password: string | undefined
  auth: AuthService | undefined

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.auth = this.authService;
  }

  setMessage() {
    if (this.authService.isLoggedIn) {
      this.message = 'Vous etes bien connecte!'
    } else {
      this.message = 'Identifiant ou mot de passe incorrect.'
    }
  }

  login() {
    this.message = 'Tentative de connexion en cours'
    if (this.name && this.password) {
      this.authService.login(this.name, this.password)
      .subscribe((isLoggedIn: boolean) => {
        this.setMessage()
        if (isLoggedIn) {
          this.router.navigate(['/pokemons'])
        }else{
          this.password = '';
          this.router.navigate(['/login'])
        }
      })
    }
    
  }

  logout() {
    this.authService.logout()
    this.message = 'Vous etes deconnecte'
  }

  

}
