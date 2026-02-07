package com.example.taskmanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.taskmanager.model.Task;
import com.example.taskmanager.service.TaskService;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping("/add")
    public Task addTask(@RequestBody Task task) {
        return taskService.addTask(task);
    }

    @GetMapping("/user/{userId}")
    public List<Task> getTasks(@PathVariable int userId) {
        return taskService.getTasks(userId);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteTask(@PathVariable int id) {
        taskService.deleteTask(id);
    }
    @PutMapping("/complete/{id}")
    public Task markCompleted(@PathVariable int id) {
        return taskService.markCompleted(id);
    }

}

