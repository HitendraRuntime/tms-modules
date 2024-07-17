package com.bdi.tms.service;

import com.bdi.tms.dto.TaskDto;
import com.bdi.tms.exception.ResourceNotFoundException;
import com.bdi.tms.model.Task;
import com.bdi.tms.repository.TaskRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public TaskDto createTask(TaskDto taskDto) {
        Task task = null;
        if (taskDto.getId() != null) {
            task = taskRepository.findById(taskDto.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Task not found with id:" + taskDto.getId()));
        } else {
            task = new Task();
        }
        task = modelMapper.map(taskDto, Task.class);
        task = taskRepository.save(task);
        taskDto.setId(task.getId());

        return taskDto;
    }

    @Override
    public List<TaskDto> getAllTasks(int page, int size) {
        List<TaskDto> taskDtoList = taskRepository.filterAllTask(page, size).stream()
                .map(task -> modelMapper.map(task, TaskDto.class))
                .toList();
        return taskDtoList;
    }

    @Override
    public TaskDto getTaskById(Long id) {
        TaskDto taskDto = taskRepository.findById(id)
                .map(task -> modelMapper.map(task, TaskDto.class))
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id:" + id));
        return taskDto;
    }

    @Override
    public void deleteTask(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id:" + id));
        taskRepository.delete(task);
    }

}
