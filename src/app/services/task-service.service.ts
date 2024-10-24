import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [
    {
      id: 1,
      title: 'Finish Angular Project',
      description: 'Complete the task manager project.',
      date: '25-10-2024',
      completed: false,
    },
    {
      id: 2,
      title: 'Review PRs',
      description:
        'Go through the pull requests for the latest features in the repository.',
      date: '22-10-2024',
      completed: false,
    },
    {
      id: 3,
      title: 'Prepare for Meeting',
      description: 'Organize notes and slides for the upcoming client meeting.',
      date: '23-10-2024',
      completed: false,
    },
  ];

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Task) {
    this.tasks.push(task);
  }

  removeTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  editTask(updatedTask: Task) {
    const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
    }
  }

  completeTask(id: number) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.completed = true;
    }
  }

  // Filtering tasks //

  getTasksByDate(date: string): Task[] {
    const formattedDate = formatDate(date, 'dd-MM-yyyy', 'en-US');
    return this.tasks.filter((task) => task.date === formattedDate);
  }

  getCompletedTasks(): Task[] {
    return this.tasks.filter((task) => task.completed);
  }

  getPendingTasks(): Task[] {
    return this.tasks.filter((task) => !task.completed);
  }

  // Search query //
  getTasksBySearchQuery(query: string): Task[] {
    return this.tasks.filter((task) => {
      return (
        task.title.toLowerCase().includes(query.toLowerCase()) ||
        task.description.toLowerCase().includes(query.toLowerCase())
      );
    });
  }
}
