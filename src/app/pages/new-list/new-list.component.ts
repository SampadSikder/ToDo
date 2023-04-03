import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';


@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent {
  constructor(private taskService: TaskService) {

  }

  ngOnInit() {
  }

  createNewList(title: string) {
    this.taskService.createList(title).subscribe((response) => {
      console.log(response);
    })

  }
}
