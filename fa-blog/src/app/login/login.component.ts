import {Component, HostBinding, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  @HostBinding('class.app-login')
  public hostClass = true;

  public loginForm: FormGroup;
  public submitted = false;
  public loading = false;
  public reject = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.userService.authenticated) {
      this.router.navigateByUrl('/packages');
    }

    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public get form(): { [key: string]: AbstractControl; } {
    return this.loginForm.controls;
  }

  public onSubmit(): void {
    this.submitted = true;

    const form = this.form;
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.login(form.login.value, form.password.value)
      .subscribe(
        _ => {
          this.router.navigateByUrl('/');
          this.loading = false;
        },
        _ => {
          this.reject = true;
          this.loading = false;
        });
  }
}
