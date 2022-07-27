import { Component, OnInit } from '@angular/core';
import { User } from "../models/user";
import { Globals } from "../../globals"
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import { FunctionServicesService } from '../../services/function-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css']
})
export class AddProfileComponent implements OnInit {

  public user: User;
  public globals: any;
  public formAddProfile: FormGroup;
  public submitedUserItem: Boolean;
  public viewDocument: Boolean;
  public imgLoad: Boolean;

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private functions: FunctionServicesService,
    private router: Router
  ) {
    this.user = new User();
    this.globals = Globals;
    this.submitedUserItem = false;
    this.viewDocument = true;
    this.imgLoad = false;
    this.formAddProfile = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(1)]],
      birt: [null, [Validators.required, Validators.minLength(1)]],
      docu: [null, [Validators.required, Validators.minLength(1)]],
    });
  }

  deleteImg() {
    this.imgLoad = false;
    this.user.imgUser = Globals.imgUserB64;
  }

  changueFile(event: any) {
    const file = event.target.files[0];
    this.user.imgName = file.name;
    this.functions.getBase64(file).then((res: any) => {
      this.user.imgUser = res;
      this.imgLoad = true;
    });
  }

  changueDate() {
    this.user.age = this.functions.getAge(this.user.birthday ? this.user.birthday : '');
    if (this.user.age >= 18) {
      this.viewDocument = true;
    } else {
      this.viewDocument = false;
    }
  }

  clear() {
    this.formAddProfile.controls['name'].setValue('');
    this.formAddProfile.controls['birt'].setValue('');
    this.formAddProfile.controls['docu'].setValue('');
  }

  continue() {
    if (this.viewDocument) {
      if (this.formAddProfile.valid) {
        this.submitedUserItem = false;
        const valid = this.functions.validateIdentificationCard(this.user.document ? this.user.document : '');
        if (valid) {
          this.toast.success('Proceso realizado de manera correcta.', 'Correcto');
          this.functions.setLocalStorageData('user', this.user);
          this.router.navigate(['/select-pokemon']);
        } else {
          this.toast.error('El número de identificación es incorrecto.', 'Error');
        }
      } else {
        this.submitedUserItem = true;
      }
    } else {
      if (!this.user.name || this.user.name == '') {
        this.toast.error('Ingrese su nombre para continuar.', 'Error');
        return;
      }
      this.toast.success('Proceso realizado de manera correcta.', 'Correcto');
      this.functions.setLocalStorageData('user', this.user);
      this.router.navigate(['/select-pokemon']);
    }
  }

  ngOnInit(): void {
    this.clear();
    this.functions.getLocalStorageData('user').then((res: any) => {
      if (res) {
        this.user = JSON.parse(res);
        this.imgLoad = true;
        let edad = this.user.age ? this.user.age : 18;
        if (this.user.age == 0) {
          edad = 0;
        }
        if (edad >= 18) {
          this.viewDocument = true;
        } else {
          this.viewDocument = false;
        }
        this.router.navigate(['/select-pokemon']);
      }
    });
  }

  get fu() { return this.formAddProfile.controls; }

}
