import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebRequestService) { }

  createList(title: string) {
    // we want to send a web request to create a list
    return this.webReqService.post('lists', { title });
  }

  getListTitle(listId: string) {
    return this.webReqService.get(`lists/${listId}`)
  }

  updateList(listId: string, title: string) {
    return this.webReqService.patch(`lists/${listId}`, { title });
  }


  createTasks(title: string, listId: string, dueDate: Date) {
    // we want to send a web request to create a list
    return this.webReqService.post(`lists/${listId}/tasks`, {
      title: title,
      _listId: listId,
      dueDate: dueDate
    });
  }
  updateTask(title: string, listId: string, dueDate: Date, taskId: string) {
    // we want to send a web request to create a list
    return this.webReqService.patch(`lists/${listId}/tasks/${taskId}`, {
      title: title,
      _listId: listId,
      dueDate: dueDate
    });
  }

  getLists() {
    return this.webReqService.get('lists');
  }

  getTasks(listId: string) {
    return this.webReqService.get(`lists/${listId}/tasks`);
  }

  getTask(listId: string, taskId: string) {
    return this.webReqService.get(`lists/${listId}/tasks/${taskId}`);
  }

  completeTask(task: any, listId: string, taskId: string) {
    return this.webReqService.patch(`lists/${listId}/tasks/${taskId}`, {
      completed: true
    });
  }
  deleteTask(listId: string, taskId: string) {
    return this.webReqService.delete(`lists/${listId}/tasks/${taskId}`);
  }

  deleteList(listId: string) {
    return this.webReqService.delete(`lists/${listId}`);
  }

}
