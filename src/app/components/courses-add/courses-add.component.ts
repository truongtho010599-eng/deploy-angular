import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoursesService } from './../../services/courses.service';
import { Subscription } from 'rxjs';
import { Course } from './../../models/courses.models';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-courses-add',
  templateUrl: './courses-add.component.html',
  styleUrls: ['./courses-add.component.css']
})
export class CoursesAddComponent implements OnInit, OnDestroy {
	public course: Course;
	public subscription: Subscription;

  urls = ['./../assets'];

  constructor(
    public coursesService: CoursesService,
    public routerService: Router,
    public httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.course = new Course();
  }

  ngOnDestroy() {
    if (Subscription) {
      this.subscription.unsubscribe();
    }
  }

  onAddCourse() {
    this.subscription = this.coursesService.addCourse(this.course).subscribe(data => {
      if (data && data.id) {
        this.routerService.navigate(['courses'])
      }
    })
  }

  public selectedFile;
  public event1;
  imgURL: any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;

  onsonFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };
  }

  onUpload() {

    const uploadData = new FormData();
    uploadData.append('myFile', this.selectedFile, this.selectedFile.name);

    this.httpClient.post('http://localhost:8080/check/upload', uploadData).subscribe(
      res => {
        console.log(res);
        this.receivedImageData = res;
        this.base64Data = this.receivedImageData.pic;
        this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data;
      },
      err => console.log('Error Occured duringng saving: ' + err)
    );
  }

}


