import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {
  
  public title:string;
  public project:Project;
  public saveProject:any;
  public status:string = '';
  public filesToUpload: Array<File> = [];

  constructor(
    private _projectService:ProjectService,
    private _uploadService:UploadService
  ) {
    this.title = "Crear Projecto";
    this.project = new Project('','','','',2021,'','');
    this.saveProject = new Project('','','','',2021,'','');
    // public _id:string,
    // public name:string,
    // public description:string,
    // public category:string,
    // public year:number,
    // public langs:string,
    // public image:string
  }

  ngOnInit(): void {
  }

  onSubmit( form:NgForm ) {
    //console.log( this.project );
    // Guardar datos basicos
    this._projectService.saveProject(this.project).subscribe(
      response => {
        //console.log( response );
        if( response.project ) {

          // Subir la imagen
          this._uploadService.makeFileRequest(Global.url+'upload-image/'+response.project._id, [], this.filesToUpload, 'image').then( ( result:any ) => {
            
            this.saveProject = result.project;
            
            this.status = 'success';
            form.reset();
            console.log( result.project );
          });

        } else {
          this.status = 'failed';
        }
      },
      err => {
        console.log( <any>err );
      }
    );
  }

  fileChangeEvent( fileInput:any ) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log( this.filesToUpload );
  }

}
