package com.bdi.tms.service;

import com.bdi.tms.dto.TaskDto;

import java.util.List;

public interface TaskService {

    TaskDto createTask(TaskDto taskDto);

    List<TaskDto> getAllTasks(int page, int size);

    TaskDto getTaskById(Long id);

    void deleteTask(Long id);
}
