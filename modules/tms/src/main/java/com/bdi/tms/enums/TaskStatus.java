package com.bdi.tms.enums;

public enum TaskStatus {

    PENDING(1),
    IN_PROGRESS(2),
    COMPLETED(3);

    private int value;

    TaskStatus(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }
}