import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
export class AppController {}
