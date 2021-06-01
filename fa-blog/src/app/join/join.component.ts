import {Component, HostBinding, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.less']
})
export class JoinComponent implements OnInit {
  @HostBinding('class.app-join')
  public hostClass = true;

  public joinForm: FormGroup;
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

    this.joinForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  public get form(): { [key: string]: AbstractControl; } {
    return this.joinForm.controls;
  }

  public onSubmit(): void {
    this.submitted = true;

    const form = this.form;
    if (this.joinForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.join(form.login.value, form.password.value, form.email.value)
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
