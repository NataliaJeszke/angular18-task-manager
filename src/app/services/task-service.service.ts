import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Task } from '../models/task.model';

import { FiltersService } from './filters-service.service';
import { SearchService } from './search-service.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>(this.loadTasksFromLocalStorage());
  tasks$ = this.tasksSubject.asObservable();
  filteredTasks$: Observable<Task[]>;

  constructor(private filtersService: FiltersService, private searchService: SearchService) {
    this.filteredTasks$ = combineLatest([
      this.tasks$,
      this.filtersService.selectedDate$,
      this.filtersService.statusChange$,
      this.searchService.searchQuery$
    ]).pipe(
      map(([tasks, selectedDate, status, searchQuery]) => {
        return tasks.filter((task) => {
          let matchesDate = true;
          let matchesStatus = true;
          let matchesSearch = true;
    
          if (selectedDate) {
            const formattedDate = formatDate(selectedDate, 'dd-MM-yyyy', 'en-US');
            matchesDate = task.date === formattedDate;
          }
    
          if (status && status !== 'All') {
            matchesStatus = (status === 'Completed' && task.completed) ||
                            (status === 'Pending' && !task.completed);
          }

          if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            matchesSearch = task.title.toLowerCase().includes(lowerQuery) || 
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

  private loadTasksFromLocalStorage(): Task[] {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  }

  private saveTasksToLocalStorage(tasks: Task[]): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }


  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  addTask(task: Task): void {
    const currentTasks = this.tasksSubject.getValue();
    this.updateTasks([...currentTasks, task]);
  }

  removeTask(id: number): void {
    const updatedTasks = this.tasksSubject
      .getValue()
      .filter((task) => task.id !== id);
    this.updateTasks(updatedTasks);
  }

  editTask(updatedTask: Task): void {
    const tasks = this.tasksSubject
      .getValue()
      .map((task) => (task.id === updatedTask.id ? updatedTask : task));
    this.updateTasks(tasks);
  }

  completeTask(id: number): void {
    const tasks = this.tasksSubject
      .getValue()
      .map((task) => (task.id === id ? { ...task, completed: true } : task));
    this.updateTasks(tasks);
  }
}
