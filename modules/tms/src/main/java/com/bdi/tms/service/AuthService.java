package com.bdi.tms.service;

import com.bdi.tms.dto.LoginDto;
import com.bdi.tms.dto.RegisterDto;

public interface AuthService {

    String register(RegisterDto registerDto);

    String login(LoginDto loginDto);

}
