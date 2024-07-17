package com.bdi.tms.dto;

import com.bdi.tms.enums.TaskStatus;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TaskPageDto {

    private Long id;

    private String title;

    private String description;

    private LocalDate dueDate;

    private TaskStatus status;

}
