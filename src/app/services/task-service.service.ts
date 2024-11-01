import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { TaskDto as Task } from '../generated-api/model/taskDto';

import { FiltersService } from './filters-service.service';
import { SearchService } from './search-service.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly apiUrl = 'http://localhost:3000/tasks';
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();
  filteredTasks$: Observable<Task[]>;

  constructor(
    private filtersService: FiltersService,
    private searchService: SearchService,
    private http: HttpClient
  ) {
    this.fetchTasks();
    this.filteredTasks$ = combineLatest([
      this.tasks$,
      this.filtersService.selectedDate$,
      this.filtersService.statusChange$,
      this.searchService.searchQuery$,
    ]).pipe(
      map(([tasks, selectedDate, status, searchQuery]) => {
        return tasks.filter((task) => {
          let matchesDate = true;
          let matchesStatus = true;
          let matchesSearch = true;

          if (selectedDate) {
            const formattedDate = formatDate(
              selectedDate,
              'dd-MM-yyyy',
              'en-US'
            );
            matchesDate = task.date === formattedDate;
          }

          if (status && status !== 'All') {
            matchesStatus =
              (status === 'Completed' && task.completed) ||
              (status === 'Pending' && !task.completed);
          }

          if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            matchesSearch =
              task.title.toLowerCase().includes(lowerQuery) ||
              task.description.toLowerCase().includes(lowerQuery);
          }

          return matchesDate && matchesStatus && matchesSearch;
        });
      })
    );
  }

  private updateTasks(tasks: Task[]): void {
    this.tasksSubject.next(tasks);
    this.saveTasksToLocalStorage(tasks);
  }

  private fetchTasks(): void {
    this.http.get<Task[]>(this.apiUrl).subscribe((tasks) => {
      this.tasksSubject.next(tasks);
    });
  }

  private saveTasksToLocalStorage(tasks: Task[]): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

 refreshTaskList(): Observable<Task[]> {
    return this.filteredTasks$;
  }

  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  addTask(task: Task): void {
    this.http.post<Task>(this.apiUrl, task).subscribe((newTask) => {
      const currentTasks = this.tasksSubject.getValue();
      this.tasksSubject.next([...currentTasks, newTask]);
    });
    this.refreshTaskList();
  }

  removeTask(id: number): void {
    this.http.delete<void>(`${this.apiUrl}/${id}`).subscribe(() => {
      const updatedTasks = this.tasksSubject.getValue().filter((task) => task.id !== id);
      this.tasksSubject.next(updatedTasks);
    });
    this.refreshTaskList();
  }

  editTask(updatedTask: Task): void {
    this.http.put<Task>(`${this.apiUrl}/${updatedTask.id}`, updatedTask).subscribe(() => {
      const tasks = this.tasksSubject
        .getValue()
        .map((task) => (task.id === updatedTask.id ? updatedTask : task));
      this.tasksSubject.next(tasks);
    });
    this.refreshTaskList();
  }

  completeTask(id: number): void {
    const task = this.tasksSubject.getValue().find((t) => t.id === id);
    if (task) {
      const updatedTask = { ...task, completed: true };
      this.editTask(updatedTask);
    }
  }
}
