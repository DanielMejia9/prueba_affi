import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    private users;
    validateUser(email: string, pass: string): Promise<{
        id: number;
        email: string;
    }>;
    login(email: string, password: string): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
        };
    }>;
}
