import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer'; 
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
    private transport: nodemailer.Transporter;

    constructor(
        private configService: ConfigService,
    ){
        this.transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: this.configService.get<string>('USER_EMAIL'),
                pass: this.configService.get<string>('USER_PASS')
            }
        })
    }

    async sendMail(to: string, subject: string, text: string, html?: string) { 
        const mailOptions = { 
            from: this.configService.get<string>('USER_EMAIL'),  
            to, 
            subject, 
            text,
            //html, 
        }; 
        return await this.transport.sendMail(mailOptions); 
    }
}