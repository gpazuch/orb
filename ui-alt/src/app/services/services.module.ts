import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentService } from './agent.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../auth/token.interceptor';
import { GroupService } from './group.service';
import { DatasetService } from './dataset.service';
import { PolicyService } from './policy.service';
import { SinkService } from './sink.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    AgentService,
    DatasetService,
    GroupService,
    PolicyService,
    SinkService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ]
})
export class ServicesModule { }
