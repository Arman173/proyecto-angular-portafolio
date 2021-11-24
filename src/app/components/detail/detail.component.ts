import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Global } from 'src/app/services/global';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {
  public url:string;
  public project:Project = new Project('','','','',0,'','');
  public confirm:boolean;

  constructor(
    private _projectService:ProjectService,
    private _router:Router,
    private _route: ActivatedRoute
  ) {
    this.url = Global.url;
    this.confirm = false;
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

  setConfirm( confirm:boolean ) {
    this.confirm = confirm;
  }

  deleteProject( id:string ) {
    this._projectService.deleteProject( id ).subscribe(
      response => {
        if( response.project ) {
          this._router.navigate(['/proyectos']);
        }
      },
      err => {
        console.log( <any>err );
      }
    );
  }

}
