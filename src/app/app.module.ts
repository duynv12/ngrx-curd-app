import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {userReducer} from './store/user/user.reducers';
import {UpdateComponent} from './components/user/update/update.component';
import {CreateComponent} from './components/user/create/create.component';
import {ListComponent} from './components/user/list/list.component';
import {HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';
import {UserEffects} from './store/user/user.effects';

const routes: Routes = [
  {path: '', component: ListComponent},
  {path: 'user/create', component: CreateComponent},
  {path: 'user/edit/:id', component: UpdateComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    UpdateComponent,
    CreateComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({userReducers: userReducer}),
    EffectsModule.forRoot([UserEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
