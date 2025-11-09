package in.ss.main.repository;

import in.ss.main.dtos.AuthResponse;
import in.ss.main.dtos.LoginRequest;
import in.ss.main.dtos.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}
