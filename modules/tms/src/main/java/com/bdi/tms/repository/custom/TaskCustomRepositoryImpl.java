package com.bdi.tms.repository.custom;

import com.bdi.tms.model.Task;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class TaskCustomRepositoryImpl implements TaskCustomRepository {

    @Autowired
    private EntityManager entityManager;

    @Override
    public List<Task> filterAllTask(int page, int size) {
        StringBuilder projectionBuilder = new StringBuilder("SELECT ");
        projectionBuilder.append("t ");
        projectionBuilder.append("FROM Task t ");

        StringBuilder orderByBuilder = new StringBuilder("ORDER BY t.id DESC");

        String searchQuery = projectionBuilder.append(orderByBuilder).toString();
        Query searchResultQuery = entityManager.createQuery(searchQuery);

        return searchResultQuery
                .setFirstResult(page)
                .setMaxResults(size)
                .getResultList();
    }

}
