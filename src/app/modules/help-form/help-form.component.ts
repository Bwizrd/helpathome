import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HelpRequestService } from 'src/app/shared/help-request.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from "src/app/core/snackbar/snackbar/snackbar.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-help-form',
  templateUrl: './help-form.component.html',
  styleUrls: ['./help-form.component.scss']
})
export class HelpFormComponent implements OnInit {
  message = 'Submitted Succesfully 👍';
  constructor(public service: HelpRequestService,
              private firestore: AngularFirestore,
              // private toastr: ToastrService,
              public snackBar: MatSnackBar,
              public router: Router) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = {
      id: null,
      firstName: '',
      secondName: '',
      address: '',
      postCode: '',
      gender: '',
      age: null,
      // urgencyLevel: 0,
      phoneNumber: '',
      needs: '',
      completed: false,
      notes: ''
    };
  }
  onSubmit(form: NgForm) {
    const data = Object.assign({}, form.value);
    delete data.id;
    if (form.value.id == null) {
      this.firestore.collection('helpRequests').add(data);
    } else {
    this.firestore.doc('helpRequests/' + form.value.id).update(data);
    }
    this.resetForm(form);
    // this.toastr.success('Submitted Succesfully', 'Thanks');
    this.openSnackBar(this.message, 'success-snackBar');
    this.router.navigateByUrl('/dashboard');
  }

  openSnackBar(message: string, panelClass: string) {
  this.snackBar.openFromComponent(SnackbarComponent, {
    data: message,
    panelClass: panelClass,
    duration: 10000,
    verticalPosition: 'top', // 'top' | 'bottom'
    horizontalPosition: 'right',

  });
}

}
