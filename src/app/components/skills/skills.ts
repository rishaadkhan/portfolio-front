import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faJava, faPython, faAngular, faReact, faLaravel, faDocker, faGitAlt } from '@fortawesome/free-brands-svg-icons';
import { faDatabase, faCode, faCloud, faGears, faServer } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class Skills {
  // Programming Icons
  faJava = faJava;
  faPython = faPython;
  faCode = faCode; // For C#

  // Web & Frameworks Icons
  faAngular = faAngular;
  faReact = faReact;
  faLaravel = faLaravel;
  faServer = faServer; // For .NET

  // Database Icons
  faDatabase = faDatabase;

  // Tools & Cloud Icons
  faCloud = faCloud; // For Azure
  faDocker = faDocker;
  faGitAlt = faGitAlt;
  faGears = faGears; // For other tools

  skills = {
    programming: [
      { name: 'Java', icon: this.faJava },
      { name: 'Python', icon: this.faPython },
      { name: 'C#', icon: this.faCode }
    ],
    webFrameworks: [
      { name: 'Angular', icon: this.faAngular },
      { name: 'React', icon: this.faReact },
      { name: 'Laravel', icon: this.faLaravel },
      { name: '.NET', icon: this.faServer }
    ],
    databases: [
      { name: 'MySQL', icon: this.faDatabase },
      { name: 'MongoDB', icon: this.faDatabase },
      { name: 'Firebase', icon: this.faDatabase }
    ],
    tools: [
      { name: 'Azure', icon: this.faCloud },
      { name: 'Docker', icon: this.faDocker },
      { name: 'Git', icon: this.faGitAlt }
    ]
  };
}
