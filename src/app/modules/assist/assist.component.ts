import { Component, OnInit } from '@angular/core';
import { HelpRequest } from 'src/app/shared/help-request.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { HelpRequestService } from 'src/app/shared/help-request.service';
import { Sort, MatSnackBar } from '@angular/material';
import { SnackbarComponent } from 'src/app/core/snackbar/snackbar/snackbar.component';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-assist',
  templateUrl: './assist.component.html',
  styleUrls: ['./assist.component.scss']
})
export class AssistComponent implements OnInit {
  message = 'Updated Succesfully 👍';
  list: HelpRequest[];
  sortedData: HelpRequest[];
  searchTerm: string;


  constructor(private firestore: AngularFirestore,
              private service: HelpRequestService,
              public snackBar: MatSnackBar,
              public router: Router) {
              }

  ngOnInit() {
    this.service.getHelpRequests().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        console.log(item);
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
      } as HelpRequest;
    });
      this.sortedData = this.list.slice();
      const obj = this.sortedData;

      const arr = Object.keys(obj).reduce((res, v) => {
        return res.concat(obj[v]);
        }, []);
      console.log(arr);
  });

}

sortData(sort: Sort) {
  console.log(sort);
  const data = this.list.slice();
  if (!sort.active || sort.direction === '') {
    this.sortedData = data;
    return;
  }
  console.log(data);

  this.sortedData = data.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'firstName': return compare(a.firstName, b.firstName, isAsc);
      case 'secondName': return compare(a.secondName, b.secondName, isAsc);
      case 'address': return compare(a.address, b.address, isAsc);
      case 'postCode': return compare(a.postCode, b.postCode, isAsc);
      case 'gender': return compare(a.gender, b.gender, isAsc);
      case 'age': return compare(a.age, b.age, isAsc);
      case 'phoneNumber': return compare(a.phoneNumber, b.phoneNumber, isAsc);
      default: return 0;
    }
  });
}

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


