import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Toast, ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { SpinnerComponent } from "../../shared/spinner/spinner.component";
import { of } from 'rxjs';
import { ErrorsService } from '../../services/errors.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterModule, FormsModule, SpinnerComponent, NgIf],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  name: string = "";
  lastname: string = "";
  credential: string = "";
  email: string = "";
  password: string = "";
  repeatPassword: string = "";

  loading: boolean = false;

  constructor(private toastr: ToastrService, private userService: UserService, private router: Router, private errorService: ErrorsService ) { }
  ngOnInit(): void { }

  addUser() {
    if (this.name == '' ||
      this.lastname == '' ||
      this.credential == '' ||
      this.email == '' ||
      this.password == '' ||
      this.repeatPassword == '') {
        this.toastr.error("Hay campos vacíos", "Error");
      return
    }


    if (this.password != this.repeatPassword) {
      this.toastr.warning("Los passwords no coinciden", "Warning");
      return
    }

    // CREAR OBJETO

    // User es de interface/user.ts
    // Le paso this.name, this.lastname... que son los que me traigo del formulario
    const user: User = {
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      credential: this.credential
    }

    this.loading = true;

    this.userService.signIn(user).subscribe({
      next: (v) => {
        this.loading = false
        this.toastr.success(`Cuenta de ${this.name} ${this.lastname} creada con éxito `)
        this.router.navigate([""])
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this.errorService.messageError(e)
      },
      complete: () => console.info('complete')

    })

  }
}

/*

    this.userService.signIn(user).subscribe(data=>{
      this.loading = false; 
      this.toastr.success(`Cuenta de ${this.name} ${this.lastname} creada con éxito `);
      this.router.navigate([""])
    }, (event: HttpErrorResponse)=>{
      this.loading = false;
      if(event.error.msg){
        console.log(event.error.msg);
        this.toastr.error(event.error.msg, "Error")
      }else{
        this.toastr.error("Existe un error en el servidor", "Error")
      }
    })



next: (v) => console.log(v),
    error: (e) => console.error(e),
    complete: () => console.info('complete') */