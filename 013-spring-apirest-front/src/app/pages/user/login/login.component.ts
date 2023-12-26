import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
//Variables
  loginForm: FormGroup;
  fieldTouched = false;
  isUserNameEmpty: boolean = false;
  formularioEnviado = false;
  userName: string;
  user:any;

  constructor(private formBuilder: FormBuilder, private route: Router,){}

  ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
        userName: ["", Validators.required],
        password: ["", Validators.required]
      })
  }
}
