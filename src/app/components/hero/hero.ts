import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCode, faLocationDot, faPhone, faEnvelope, faProjectDiagram, faFileDownload, faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero {
  // Icons
  faCode = faCode;
  faLocationDot = faLocationDot;
  faPhone = faPhone;
  faEnvelope = faEnvelope;
  faProjectDiagram = faProjectDiagram;
  faFileDownload = faFileDownload;
  faLaptopCode = faLaptopCode;
  faLinkedin = faLinkedin;
  faGithub = faGithub;
}
