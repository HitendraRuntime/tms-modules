package com.bdi.tms.repository.custom;

import com.bdi.tms.model.Task;

import java.util.List;

public interface TaskCustomRepository {

    List<Task> filterAllTask(int page, int size);

}
