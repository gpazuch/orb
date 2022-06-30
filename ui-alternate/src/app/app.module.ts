import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServicesModule } from './services/services.module';
import { ComponentsModule } from './components/components.module';
import { TokenService } from './auth/token.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServicesModule,
    ComponentsModule,
    PipesModule
  ],
  providers: [
    TokenService,
    AuthService,
    AuthGuard,
    {provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: {disabled:true}},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
