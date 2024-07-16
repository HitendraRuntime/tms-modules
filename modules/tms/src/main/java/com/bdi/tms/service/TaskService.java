package com.bdi.tms.service;

import com.bdi.tms.dto.TaskDto;
import com.bdi.tms.model.Task;

import java.util.List;
import java.util.Optional;

public interface TaskService {

    Task createTask(TaskDto taskDto);

    Task updateTask(Long id, Task taskDetails);

    List<Task> getAllTasks();

    Optional<Task> getTaskById(Long id);

    void deleteTask(Long id);
}
