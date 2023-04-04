import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  constructor(private router: Router, private taskService: TaskService, private route: ActivatedRoute) {

  }
  task: any;

  id: string = '';
  selectedDate: Date = new Date();
  selectedTime: Date = new Date();
  minDate: Date = new Date();
  // configure the date picker
  bsConfig: Partial<BsDatepickerConfig> = {
    containerClass: 'theme-red',
    minDate: this.minDate
  };

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      const listId = params['listId'];
      const taskId = params['taskId'];
      this.taskService.getTask(listId, taskId).subscribe((tasks: any) => {
        console.log(tasks);
        this.task = tasks;
      })
    })

  }
  updateTask(title: string, dueDate: string) {

    const dateObj = new Date(Date.parse(dueDate));

    dateObj.setHours(this.selectedTime.getHours());
    dateObj.setMinutes(this.selectedTime.getMinutes());
    dateObj.setSeconds(this.selectedTime.getSeconds());
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      const listId = params['listId'];
      const taskId = params['taskId'];
      if (title.length == 0) {
        this.taskService.updateTask(this.task['title'], listId, dateObj, taskId).subscribe((response) => {
          console.log(response);
          this.router.navigate(['lists', listId]);
        });
      }
      else if (dueDate.length == 0) {
        this.taskService.updateTask(title, listId, this.task.dueDate, taskId).subscribe((response) => {
          console.log(response);
          this.router.navigate(['lists', listId]);
        });;
      }
      else {
        this.taskService.updateTask(title, listId, dateObj, taskId).subscribe((response) => {
          console.log(response);
          this.router.navigate(['lists', listId]);
        });;
      }
    })


  }

}
