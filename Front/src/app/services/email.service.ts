import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private userId: string = 'Ei2MPBIBtQzIwqbks';  // Remplacez par votre User ID

  constructor() { }

  sendEmail(to: string, subject: string, body: string): Promise<EmailJSResponseStatus> {
    const templateParams = {
      to_email: to,
      subject: subject,
      message: body
    };

    return emailjs.send(
      'service_963d1gi',  // Remplacez par votre Service ID
      'template_eszrz0s',  // Remplacez par votre Template ID
      templateParams,
      this.userId
    );
  }
}
