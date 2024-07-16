package com.bdi.tms.dto;

import com.bdi.tms.enums.TaskStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TaskDto {

    private String title;

    private String description;

    private LocalDate dueDate;

    private TaskStatus status;

}
