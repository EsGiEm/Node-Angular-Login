import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { SpinnerComponent } from "../../shared/spinner/spinner.component";
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../interfaces/user';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ErrorsService } from '../../services/errors.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, SpinnerComponent, NgIf, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = "";
  password: string = "";

  loading: boolean = false;

  constructor(private toastr: ToastrService, private userService: UserService, private router: Router, private errorService: ErrorsService) { }
  ngOnInit(): void { }

  
  login() {
    if (
      this.email == '' ||
      this.password == '') {
        this.toastr.error("Hay campos vacíos", "Error");
      return
    }

    // User es de interface/user.ts
    // Le paso this.name, this.lastname... que son los que me traigo del formulario
    const user: User = {
      email: this.email,
      password: this.password

    }

    this.loading = true;
    
        this.userService.logIn(user).subscribe({
          next: (response: any) => {      // Desde el backend me manda un res.json({token})
            this.loading = false
            const token = response.token
            console.log(token)
            this.toastr.success(``,`WELLCOME`)
            this.router.navigate(["/dashboard"])
            localStorage.setItem("myToken", token)
            
          },
          error: (e: HttpErrorResponse) => {
            this.loading = false;
            this.errorService.messageError(e)
          },
          complete: () => console.info('complete')
    
        })
    
        

  }

}
