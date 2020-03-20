import { Injectable } from '@angular/core';
import { HelpRequest } from './help-request.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class HelpRequestService {

  formData: HelpRequest;
  constructor(private firestore: AngularFirestore) { }


  getHelpRequests() {
    return this.firestore.collection('helpRequests').snapshotChanges();
  }

  getHelpRequest(id: string) {
    return this.firestore.doc(`helpRequests/${id}`).snapshotChanges();
  }
}
