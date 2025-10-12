import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';
import { Projects } from './components/projects/projects';
import { Skills } from './components/skills/skills';
import { Services } from './components/services/services';
import { Education } from './components/education/education';
import { Experience } from './components/experience/experience';

@Component({
  selector: 'app-root',
  imports: [Header, Hero, About,Experience, Education, Skills, Projects, Services, Contact, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('portfolio-front');
}
