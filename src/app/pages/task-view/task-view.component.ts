import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {

  lists: any;
  tasks: any;
  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    try {
      this.route.params.subscribe((params: Params) => {
        console.log(params);
        const id = params['listId'];
        console.log(id);
        if (!id) {
          this.router.navigate(["/task-view"]);
        }
        else {
          this.taskService.getTasks(id).subscribe((tasks: any) => {
            this.tasks = tasks;
          })
        }

      })
    } catch (err) {
      this.router.navigate(["/task-view"]);
    }

    this.taskService.getLists().subscribe((lists: any) => {
      this.lists = lists;
      console.log(lists);
    })
  }

  selectedListId(): string {
    let id: string = '';
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      id = params['listId'];
    });
    return id;
  }

  onTaskClick(task: any) {
    let id: string = '';
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      id = params['listId'];
    });
    this.taskService.completeTask(task, id, task['_id']).subscribe((response) => {
      console.log(response);
    });

    setTimeout(() => {
      this.reloadComponent();
    }, 100);

  }

  onTaskDelete(task: any) {
    let id: string = '';
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      id = params['listId'];
    });
    this.taskService.deleteTask(id, task['_id']).subscribe((response) => {
      console.log(response);
    });

    setTimeout(() => {
      this.reloadComponent();
    }, 100);




  }

  onListDelete() {
    let id: string = '';
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      id = params['listId'];
    });
    this.taskService.deleteList(id).subscribe((response) => {
      console.log(response);
    });

    setTimeout(() => {
      this.router.navigate(['/task-view']);
    }, 100);
  }

  reloadComponent() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });


  }
}

