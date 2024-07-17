package com.bdi.tms.repository;

import com.bdi.tms.model.Task;
import com.bdi.tms.repository.custom.TaskCustomRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long>, TaskCustomRepository {
}
