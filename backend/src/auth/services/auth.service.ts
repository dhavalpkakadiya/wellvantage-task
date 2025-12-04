import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OAuth2Client } from 'google-auth-library';
import { User } from '../../users/entities/user.entity';
import { GymsService } from '../../gyms/services/gyms.service';

@Injectable()
export class AuthService {
  private client: OAuth2Client;
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private gymsService: GymsService,
    private jwtService: JwtService, 
  ) {
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async verifyToken(token: string) {
    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload?.email) {
      throw new Error('Google token does not contain an email');
    }

    let user = await this.usersRepo.findOne({
      where: { email: payload.email },
      relations: ['gym'],
    });

    if (!user) {
      user = this.usersRepo.create({
        email: payload.email,
        name: payload.name,
        googleId: payload.sub,
        profilePic: payload.picture,
      });
      await this.usersRepo.save(user);
    } else {
      let shouldSave = false;
      if (!user.googleId && payload.sub) {
        user.googleId = payload.sub;
        shouldSave = true;
      }
      if (payload.picture && user.profilePic !== payload.picture) {
        user.profilePic = payload.picture;
        shouldSave = true;
      }
      if (shouldSave) {
        await this.usersRepo.save(user);
      }
    }

    const gym = await this.gymsService.createInitialGym(user.id);
    const hasRealGymData =
      gym &&
      (gym.gymName ||
        gym.ownerFirstName ||
        gym.ownerLastName ||
        gym.addressLine1 ||
        gym.addressLine2 ||
        gym.city ||
        gym.state ||
        gym.country ||
        gym.phoneNumber);

    // Generate JWT token
    const jwtPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };
    const accessToken = this.jwtService.sign(jwtPayload);

    return {
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      email_verified: payload.email_verified,
      sub: payload.sub,
      userId: user.id,
      hasGym: !!hasRealGymData,
      gym: gym || null,
      accessToken,
    };
  }

  async validateUser(userId: string) {
    const user = await this.usersRepo.findOne({
      where: { id: userId },
      relations: ['gym'],
    });
    return user;
  }
}
