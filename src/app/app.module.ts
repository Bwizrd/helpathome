import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelpFormComponent } from './modules/help-form/help-form.component';
import { MaterialModule } from './shared/modules/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule, MatGridListModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './core/layout/full/full/full.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AssistComponent } from './modules/assist/assist.component';
import { HelpRequestService } from './shared/help-request.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment.prod';
import { FormsModule } from '@angular/forms';
// import { ToastrModule } from 'ngx-toastr';
import { MAT_SNACK_BAR_DATA } from '@angular/material';
import { SnackbarComponent } from './core/snackbar/snackbar/snackbar.component';
import { RequestDetailsComponent } from './modules/request-details/request-details.component';
import { FilterItemsPipe } from './core/pipes/filter-items.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HelpFormComponent,
    FullComponent,
    DashboardComponent,
    AssistComponent,
    SnackbarComponent,
    RequestDetailsComponent,
    FilterItemsPipe
    ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatSliderModule,
    MatGridListModule,
    MatIconModule,
    MatToolbarModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    // ToastrModule.forRoot()
  ],
  entryComponents: [SnackbarComponent],
  providers: [HelpRequestService, { provide: MAT_SNACK_BAR_DATA, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
