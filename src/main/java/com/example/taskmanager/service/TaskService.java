package com.example.taskmanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.taskmanager.model.Task;
import com.example.taskmanager.repository.TaskRepository;
import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public Task addTask(Task task) {
        task.setStatus("PENDING");
        return taskRepository.save(task);
    }

    public List<Task> getTasks(int userId) {
        return taskRepository.findByUserId(userId);
    }
    public void deleteTask(int id) {
        taskRepository.deleteById(id);
    }
    public Task markCompleted(int id) {
        Task task = taskRepository.findById(id).orElse(null);
        if (task != null) {
            task.setStatus("COMPLETED");
            return taskRepository.save(task);
        }
        return null;
    }

}

