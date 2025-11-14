// // Create a mock-auth controller
// import { Controller, Post, Body, Res } from '@nestjs/common';
// import { Response } from 'express';

// @Post('login')
// login(@Body('role') role: string) {
//   const validRole = role === 'admin' ? 'admin' : 'user';
//   const token = jwt.sign({ roles: [validRole] }, 'your-secret-key');
//   return { token };
// }
