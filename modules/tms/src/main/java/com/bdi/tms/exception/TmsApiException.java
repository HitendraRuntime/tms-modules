package com.bdi.tms.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public class TmsApiException extends RuntimeException {

    private HttpStatus httpStatus;
    private String message;

}
