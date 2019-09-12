import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { HomeHeaderComponent } from './home/header/header.component';
import { HomePatientComponent } from './home-patient/home-patient.component';
import { FieldComponent } from './quiz/field/field.component';
import { NarrativeComponent } from './narrative/narrative.component';
import { NarrativeIndexComponent } from './narrative/index/index.component';
import { PathwayGridComponent } from './pathways/grid/grid.component';
import { GridIconComponent } from './pathways/grid/icon/icon.component';
import { PathwayComponent } from './pathways/pathway/pathway.component';
import { PathwayStoryComponent } from './pathways/pathway/story/story.component';
import { QuizLandingComponent } from './quiz/landing/landing.component';
import { QuizResultsComponent } from './quiz/results/results.component';
import { QuizComponent } from './quiz/quiz.component';
import { SubmitComponent } from './submit/submit.component';
import { SubmitPatientComponent } from './submit-patient/submit-patient.component';
import { ResourcesComponent } from './resources/resources.component';

// Cloudinary
import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { CloudinaryConfiguration, CloudinaryModule } from '@cloudinary/angular-5.x';
import cloudinaryConfiguration from './cdn.config';

// npm
import { QuillModule } from 'ngx-quill';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TermsComponent } from './terms/terms.component';

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
    QuizResultsComponent,
    QuizLandingComponent,
    FieldComponent,
    HomeComponent,
    HomePatientComponent,
    NarrativeComponent,
    NavComponent,
    FooterComponent,
    NarrativeIndexComponent,
    ResourcesComponent,
    PathwayGridComponent,
    PathwayComponent,
    HomeHeaderComponent,
    GridIconComponent,
    PathwayStoryComponent,
    SubmitPatientComponent,
    TermsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    CloudinaryModule.forRoot(cloudinary, config),
    CarouselModule,
    QuillModule.forRoot()
  
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
