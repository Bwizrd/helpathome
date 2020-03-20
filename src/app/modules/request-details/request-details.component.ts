import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HelpRequestService } from 'src/app/shared/help-request.service';
import { HelpRequest } from 'src/app/shared/help-request.model';
import { NgForm } from '@angular/forms';
import { SnackbarComponent } from 'src/app/core/snackbar/snackbar/snackbar.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss']
})
export class RequestDetailsComponent implements OnInit {
id;
request;
message = 'Updated Succesfully 👍';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: HelpRequestService,
    private firestore: AngularFirestore,
    public snackBar: MatSnackBar,
    ) { }

  ngOnInit() {
    // Get id from url
    this.id = this.route.snapshot.params.id;
    // Get client
    this.service.getHelpRequest(this.id).subscribe(item => {
        this.request = item.payload.data();
      //   return {
      //     id: item.payload.id,
      //     address: item.payload.data.address;
      //     ...item.payload.data()
      // } as HelpRequest;

    }
    );
    // console.log(this.request);
  }

  onSubmit(form: NgForm) {
  if (form.controls.completed.value === 'true') {
    this.request.completed = true;
  }
  const data = this.request;
  console.log(data);

  this.firestore.doc('helpRequests/' + this.id).update(data);
  this.openSnackBar(this.message, 'success-snackBar');
  this.router.navigateByUrl('/assist');
  }

  openSnackBar(message: string, panelClass: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      panelClass,
      duration: 10000,
      verticalPosition: 'top', // 'top' | 'bottom'
      horizontalPosition: 'right',

    });
  }

}
