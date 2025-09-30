import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // ⚠️ Ejemplo con usuario en memoria (en producción deberías usar BD)
  private users = [
    { id: 1, email: 'test@correo.com', password: bcrypt.hashSync('123456', 10) },
  ];

  async validateUser(email: string, pass: string) {
    const user = this.users.find((u) => u.email === email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
//prueba
  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
