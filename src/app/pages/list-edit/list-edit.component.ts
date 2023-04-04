import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.css']
})
export class ListEditComponent implements OnInit {
  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute) {

  }
  listTitle: string = '';

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      const id = params['listId'];
      console.log(id);
      if (!id) {
        this.router.navigate(["/task-view"]);
      }
      else {
        this.taskService.getListTitle(id).subscribe((list: any) => {
          this.listTitle = list.title;
        })
      }

    })
  }

  updateList(title: string) {
    let id = '';
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      id = params['listId'];
      console.log(id);
    });
    if (title.length != 0) {


      this.taskService.updateList(id, title).subscribe((response: any) => {
        console.log(response);
        this.router.navigate(['lists', id]);
      })

    }
    else {
      this.router.navigate(['lists', id]);
    }
  }



}
