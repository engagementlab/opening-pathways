import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Cloudinary
import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { CloudinaryConfiguration, CloudinaryModule } from '@cloudinary/angular-5.x';
import cloudinaryConfiguration from './cdn.config';
import { SubmitComponent } from './submit/submit.component';

// npm
import { NgxTrumbowygModule } from 'ngx-trumbowyg';
import { DataService } from './utils/data.service';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

export const cloudinary = {
  Cloudinary: CloudinaryCore
};
export const config: CloudinaryConfiguration = cloudinaryConfiguration;

@NgModule({
  declarations: [
    AppComponent,
    SubmitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxTrumbowygModule.withConfig({
      svgPath: '/assets/icons.svg',
      removeformatPasted: true,
      autogrow: true,
      btns: [
          ['formatting'],
          ['strong', 'em'],
          ['link'],
      ],
      btnsDef: {
        formatting: {
          dropdown: ['quote'],
          ico: 'quote'
      }
    }}),
    HttpClientModule,
    HttpClientJsonpModule,
    CloudinaryModule.forRoot(cloudinary, config),
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
