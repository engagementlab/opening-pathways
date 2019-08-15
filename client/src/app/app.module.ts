import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

// Utils
import { ButtonComponent } from './utils/app-button/button.component';
import { CdnImageComponent } from './utils/cdn-image/cdn-image.component';
import { DataService } from './utils/data.service';
import { SanitizeHtmlPipe } from './utils/sanitize-html.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HomePatientComponent } from './home-patient/home-patient.component';
import { FieldComponent } from './quiz/field/field.component';
import { NarrativeComponent } from './narrative/narrative.component';
import { NarrativeIndexComponent } from './narrative/index/index.component';
import { QuizLandingComponent } from './quiz/landing/landing.component';
import { QuizComponent } from './quiz/quiz.component';
import { SubmitComponent } from './submit/submit.component';

// Cloudinary
import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { CloudinaryConfiguration, CloudinaryModule } from '@cloudinary/angular-5.x';
import cloudinaryConfiguration from './cdn.config';

// npm
import { NgxTrumbowygModule } from 'ngx-trumbowyg';

export const cloudinary = {
  Cloudinary: CloudinaryCore
};
export const config: CloudinaryConfiguration = cloudinaryConfiguration;

@NgModule({
  declarations: [
    CdnImageComponent,
    SanitizeHtmlPipe,
    AppComponent,
    ButtonComponent,
    SubmitComponent,
    QuizComponent,
    QuizLandingComponent,
    FieldComponent,
    HomeComponent,
    HomePatientComponent,
    NarrativeComponent,
    NavComponent,
    FooterComponent,
    NarrativeIndexComponent
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
