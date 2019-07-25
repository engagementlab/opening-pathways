import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './utils/app-button/button.component';

import { HomeComponent } from './home/home.component';
import { FieldComponent } from './quiz/field/field.component';
import { NarrativeComponent } from './narrative/narrative.component';
import { QuizComponent } from './quiz/quiz.component';
import { SubmitComponent } from './submit/submit.component';

// Cloudinary
import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { CloudinaryConfiguration, CloudinaryModule } from '@cloudinary/angular-5.x';
import cloudinaryConfiguration from './cdn.config';

import { DataService } from './utils/data.service';
import { SanitizeHtmlPipe } from './utils/sanitize-html.pipe';

// npm
import { NgxTrumbowygModule } from 'ngx-trumbowyg';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

export const cloudinary = {
  Cloudinary: CloudinaryCore
};
export const config: CloudinaryConfiguration = cloudinaryConfiguration;

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    SubmitComponent,
    QuizComponent,
    FieldComponent,
    HomeComponent,
    SanitizeHtmlPipe,
    NarrativeComponent
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
