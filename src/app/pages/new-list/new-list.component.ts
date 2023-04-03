import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';


@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})

export class NewListComponent implements OnInit {


  constructor(private taskService: TaskService, private router: Router) {

  }

  ngOnInit() {
  }

  createNewList(title: string) {
    this.taskService.createList(title).subscribe((response: any) => {
      console.log(response);
      this.router.navigate(['lists', response['_id']]);
    })
  }
}
