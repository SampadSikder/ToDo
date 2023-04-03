import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent {

  lists: any;
  tasks: any;
  constructor(private taskService: TaskService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      const id = params['listId'];
      console.log(id);
      this.taskService.getTasks(id).subscribe((tasks: any) => {
        this.tasks = tasks;
      })

    })
    this.taskService.getLists().subscribe((lists: any) => {
      this.lists = lists;
      console.log(lists);
    })
  }



}
