import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';

import { Global } from 'src/app/services/global';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {

  public projects:Project[] = [];
  public url:string;

  constructor(
    private _projectService:ProjectService
  ) {
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this._projectService.getProjects().subscribe(
      response => {
        console.log( response );
        if( response.projects ) {
          this.projects = response.projects;
        }
      },
      err => {
        console.log( err );
      }
    );
  }

}
