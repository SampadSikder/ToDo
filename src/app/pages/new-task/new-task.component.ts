import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  constructor(private router: Router, private taskService: TaskService, private route: ActivatedRoute) {

  }

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
      this.id = params['listId'];
      console.log(this.id)
    });


  }

  createNewTask(title: string, dueDate: string) {
    const dateObj = new Date(dueDate);
    this.taskService.createTasks(title, this.id, dateObj).subscribe((response: any) => {
      this.router.navigate(['lists', response['_listId']]);
    })

  }
}
