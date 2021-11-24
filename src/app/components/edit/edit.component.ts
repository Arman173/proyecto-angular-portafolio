import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';

import { Global } from 'src/app/services/global';
import { Project } from 'src/app/models/project';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {

  public title:string;
  public url:string;
  public project:Project;
  public saveProject:any;
  public status:string = '';
  public filesToUpload: Array<File> = [];

  constructor(
    private _projectService:ProjectService,
    private _uploadService:UploadService,
    private _route:ActivatedRoute
  ) {
    this.title = "Editar Projecto";
    this.project = new Project('','','','',2021,'','');
    this.saveProject = new Project('','','','',2021,'','');
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe( params => {
      const id = params.id;

      this.getProject( id );
    });
  }

  getProject( id:string ) {
    this._projectService.getProject( id ).subscribe(
      response => {
        this.project = response.project;
      },
      err => {
        console.log( <any>err );
      }
    );
  }

  onSubmit( form:NgForm ) {
    this._projectService.updateProject(this.project).subscribe(
      response => {
        //console.log( response );
        if( response.project ) {

          // si hay imagenes para subir, se actualizara la imagen del proyecto
          if( this.filesToUpload[0] ) {
            console.log( 'update image!' );
            this._uploadService.makeFileRequest(Global.url+'upload-image/'+response.project._id, [], this.filesToUpload, 'image').then( ( result:any ) => {
            
              this.saveProject = result.project;
              this.status = 'success';
              this.getProject( this.project._id );
              console.log( result.project );
            });

            // si no se dejara la misma imagen
          } else {
            console.log( 'dont update image!' );
            this.saveProject = response.project;
            this.status = 'success';
            console.log( response.project );
          }

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
