import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface Skill { name: string; icon?: string; }
export interface SkillGroup { category: string; skills: Skill[]; }

export const SKILL_ICONS: Record<string, string> = {

  java: `<svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.85 17.1s-.9.52.64.7c1.87.21 2.82.18 4.88-.2 0 0 .54.34 1.3.63-4.62 1.98-10.45-.11-6.82-1.13Z" fill="#E76F00"/>
    <path d="M8.27 14.63s-1.01.75.53.91c2 .2 3.57.22 6.3-.3 0 0 .38.38.97.59-5.58 1.63-11.79.13-7.8-1.2Z" fill="#E76F00"/>
    <path d="M13.1 10.45c1.14 1.31-.3 2.49-.3 2.49s2.88-1.49 1.56-3.35c-1.24-1.74-2.2-2.6 2.97-5.57 0 0-8.11 2.03-4.23 6.43Z" fill="#E76F00"/>
    <path d="M18.73 18.87s.67.55-.73.97c-2.66.81-11.08 1.05-13.42.03-.84-.36.73-.87 1.23-.97.51-.11.8-.09.8-.09-.93-.65-5.99 1.28-2.57 1.84 9.3 1.51 16.96-.68 14.69-1.78Z" fill="#E76F00"/>
    <path d="M9.3 12.08s-4.26 1.01-1.51 1.38c1.16.15 3.47.12 5.62-.06 1.76-.15 3.52-.48 3.52-.48s-.62.27-1.07.57c-4.3 1.13-12.61.6-10.22-.55 2.02-1 3.66-.86 3.66-.86Z" fill="#E76F00"/>
    <path d="M14.05 2S16.35 4.3 11.82 7.75c-3.64 2.88-.83 4.52 0 6.39-2.13-1.92-3.69-3.61-2.64-5.18C10.73 6.67 15.12 5.55 14.05 2Z" fill="#E76F00"/>
    <path d="M9.63 21.1c4.21.27 10.68-.15 10.83-2.14 0 0-.29.76-3.48 1.36-3.61.67-8.06.59-10.7.16 0 0 .54.45 3.35.62Z" fill="#E76F00"/>
  </svg>`,

  springboot: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#6DB33F" opacity="0.15"/>
    <path d="M8.5 14.5c-.5-2 .5-4.5 3.5-5.5-1 1.5-1 3 0 4 1 1 2.5 1 3.5 0 .5-.5.8-1.2.8-2 0-3-2.5-5-5.8-5C6.2 6 3.5 9 4 12.5c.3 2 1.5 3.7 3.2 4.5-1 0-2.2-.5-3.2-1.5" stroke="#6DB33F" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  /* Spring MVC shares the Spring leaf mark */
  springmvc: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#6DB33F" opacity="0.1"/>
    <path d="M8 15c-.3-1.8.3-4 3-5.2-.8 1.4-.7 2.8.2 3.7.9.9 2.2.9 3.1.1.4-.5.7-1.1.7-1.8 0-2.7-2.2-4.5-5.2-4.5C6.5 7.3 4.2 10 4.6 13c.2 1.8 1.3 3.3 2.8 4.1-.9 0-2-.5-2.8-1.4" stroke="#6DB33F" stroke-width="1.4" stroke-linecap="round"/>
    <text x="12" y="21" text-anchor="middle" font-size="4.5" fill="#6DB33F" font-family="Inter,sans-serif" font-weight="700">MVC</text>
  </svg>`,

  hibernate: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="3" fill="#BCAE79" opacity="0.15" stroke="#BCAE79" stroke-width="1.2"/>
    <path d="M7 7v10M17 7v10M7 12h10" stroke="#BCAE79" stroke-width="1.6" stroke-linecap="round"/>
  </svg>`,

  jpa: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="6" rx="8" ry="3" stroke="#94A3B8" stroke-width="1.4"/>
    <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" stroke="#94A3B8" stroke-width="1.4"/>
    <path d="M4 12v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4" stroke="#94A3B8" stroke-width="1.2" opacity="0.5"/>
  </svg>`,

  angular: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 6.5l1.5 13L12 22l8.5-2.5L22 6.5 12 2Z" fill="#DD0031" opacity="0.9"/>
    <path d="M8.5 15.5l3.5-9 3.5 9M9.5 13h5" stroke="white" stroke-width="1.4" stroke-linecap="round"/>
  </svg>`,

  typescript: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="3" fill="#3178C6" opacity="0.9"/>
    <path d="M6 10h5M8.5 10v7" stroke="white" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M13.5 14.5c0-1.5 1-2.5 2.5-2.5S18.5 13 18.5 14.5c0 2-2.5 2.5-2.5 2.5s2.5.5 2.5 2.5" stroke="white" stroke-width="1.4" stroke-linecap="round" fill="none"/>
  </svg>`,

  javascript: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="3" fill="#F7DF1E" opacity="0.9"/>
    <path d="M7 17c.5 1 1.3 1.5 2.5 1.5 1.4 0 2.5-.8 2.5-2.5V11" stroke="#1a1a1a" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M14 16.8c.4.7 1 1.2 2 1.2 1 0 1.5-.5 1.5-1.2 0-.8-.6-1.1-1.6-1.5l-.5-.2c-1.5-.6-2.4-1.4-2.4-3 0-1.5 1.1-2.6 2.9-2.6 1.3 0 2.2.4 2.8 1.5" stroke="#1a1a1a" stroke-width="1.4" stroke-linecap="round"/>
  </svg>`,

  html5: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 2l1.5 17L12 21l6.5-2L20 2H4Z" fill="#E44D26" opacity="0.85"/>
    <path d="M12 18.5l5-1.4 1.2-13.1H12" fill="#F16529" opacity="0.6"/>
    <path d="M12 8.5H8.3l.3 3H12V8.5ZM12 13.5H9l.3 3.2 2.7.75V13.5Z" fill="white" opacity="0.9"/>
  </svg>`,

  css3: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 2l1.5 17L12 21l6.5-2L20 2H4Z" fill="#264DE4" opacity="0.85"/>
    <path d="M12 18.5l5-1.4 1.2-13.1H12" fill="#2965F1" opacity="0.6"/>
    <path d="M8 8.5h8M8.5 12h7M9 15.5h6" stroke="white" stroke-width="1.3" stroke-linecap="round" opacity="0.9"/>
  </svg>`,

  tailwind: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 6C9.6 6 8.1 7.2 7.5 9.6c.9-1.2 1.95-1.65 3.15-1.35.685.171 1.174.668 1.715 1.219C13.245 10.431 14.19 11.4 16.5 11.4c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.171-1.174-.668-1.715-1.219C15.255 6.969 14.31 6 12 6Z" fill="#38BDF8"/>
    <path d="M7.5 12.6C5.1 12.6 3.6 13.8 3 16.2c.9-1.2 1.95-1.65 3.15-1.35.685.171 1.174.668 1.715 1.219C8.745 17.031 9.69 18 12 18c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.171-1.174-.668-1.715-1.219C10.755 13.569 9.81 12.6 7.5 12.6Z" fill="#38BDF8"/>
  </svg>`,

  firebase: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 18.5L7.5 4l4 6.5L14 2l6 16.5H4Z" fill="#FFA000" opacity="0.85"/>
    <path d="M4 18.5l10-6L14 2l-2.5 8.5L4 18.5Z" fill="#F57F17" opacity="0.7"/>
    <path d="M4 18.5h16l-6-11-4 7.5L4 18.5Z" fill="#FFCA28" opacity="0.7"/>
  </svg>`,

  mysql: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="7" rx="8" ry="3" stroke="#00758F" stroke-width="1.4" fill="none"/>
    <path d="M4 7v10c0 1.66 3.58 3 8 3s8-1.34 8-3V7" stroke="#00758F" stroke-width="1.4" fill="none"/>
    <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" stroke="#F29111" stroke-width="1.2" fill="none"/>
  </svg>`,

  postgresql: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="7" rx="7" ry="3.5" stroke="#336791" stroke-width="1.4" fill="none"/>
    <path d="M5 7v10c0 1.93 3.13 3.5 7 3.5s7-1.57 7-3.5V7" stroke="#336791" stroke-width="1.4" fill="none"/>
    <path d="M5 12c0 1.93 3.13 3.5 7 3.5s7-1.57 7-3.5" stroke="#336791" stroke-width="1.1" fill="none" opacity="0.55"/>
    <path d="M19 6c1.2-.4 2.2.4 1.8 1.8s-1.4 1.8-1.8 1" stroke="#336791" stroke-width="1.2" stroke-linecap="round" fill="none"/>
  </svg>`,

  mongodb: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2c-4 5-4 10 0 13v5" stroke="#4DB33D" stroke-width="2" stroke-linecap="round"/>
    <path d="M12 2c4 5 4 10 0 13" stroke="#4DB33D" stroke-width="1.2" stroke-linecap="round" opacity="0.5"/>
  </svg>`,

  redis: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="7" rx="8" ry="3" fill="#DC382D" opacity="0.8"/>
    <path d="M4 7v4c0 1.66 3.58 3 8 3s8-1.34 8-3V7" stroke="#DC382D" stroke-width="1.3" fill="none"/>
    <path d="M4 11v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4" stroke="#DC382D" stroke-width="1.1" fill="none" opacity="0.5"/>
  </svg>`,

  azure: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.2 1.5L16.5 14.5H1.9L9.2 1.5Z" fill="#0078D4"/>
    <path d="M5.8 1.5L1 10.5l1.9 4L9.2 1.5H5.8Z" fill="#0078D4" opacity="0.55"/>
  </svg>`,

  docker: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.8 10.6c-.2-.1-1.6-.8-3.2.1-.2-1.4-1.2-2.6-2.4-3.2l-.5-.3-.3.5c-.3.5-.5 1.3-.4 2 .1.5.3 1 .6 1.4-.3.1-.9.4-1.6.4H2c-.1 1 .1 2.1.6 3 .6 1.1 1.5 1.9 2.6 2.4 1.2.5 2.5.7 3.8.7 1.7 0 3.4-.4 4.8-1.2 1.2-.6 2.2-1.6 2.9-2.7 1.3.1 2.6-.4 3.2-1.4.1-.1.2-.3.2-.4l.1-.3-.4-.1Z" fill="#2496ED" opacity="0.9"/>
    <rect x="4" y="7" width="2.5" height="2.5" rx="0.4" fill="#2496ED"/>
    <rect x="7" y="7" width="2.5" height="2.5" rx="0.4" fill="#2496ED"/>
    <rect x="10" y="7" width="2.5" height="2.5" rx="0.4" fill="#2496ED"/>
    <rect x="7" y="4.5" width="2.5" height="2.5" rx="0.4" fill="#2496ED"/>
    <rect x="10" y="4.5" width="2.5" height="2.5" rx="0.4" fill="#2496ED"/>
  </svg>`,

  /* GitHub Actions = GitHub mark */
  githubactions: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#94A3B8" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>`,

  git: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 6a3 3 0 11-6 0 3 3 0 016 0ZM6.5 18a2.5 2.5 0 110-5 2.5 2.5 0 010 5Z" stroke="#F05032" stroke-width="1.5" fill="none"/>
    <circle cx="18" cy="18" r="2.5" stroke="#F05032" stroke-width="1.5" fill="none"/>
    <path d="M12 6v6M9 18h-2.5M12 12l-5.5 5M12 12l6 5" stroke="#F05032" stroke-width="1.3" stroke-linecap="round"/>
  </svg>`,

  github: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#94A3B8" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>`,
};

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class Skills {
  readonly icons: Record<string, SafeHtml>;

  constructor(private sanitizer: DomSanitizer) {
    this.icons = Object.fromEntries(
      Object.entries(SKILL_ICONS).map(([k, v]) => [
        k, this.sanitizer.bypassSecurityTrustHtml(v)
      ])
    );
  }

  skillGroups: SkillGroup[] = [
    {
      category: 'Backend',
      skills: [
        { name: 'Java',        icon: 'java'       },
        { name: 'Spring Boot', icon: 'springboot' },
        { name: 'Spring MVC',  icon: 'springmvc'  },
        { name: 'Hibernate',   icon: 'hibernate'  },
        { name: 'JPA',         icon: 'jpa'        },
        { name: 'REST APIs' },
        { name: 'Microservices' },
      ]
    },
    {
      category: 'Frontend',
      skills: [
        { name: 'Angular',     icon: 'angular'    },
        { name: 'TypeScript',  icon: 'typescript' },
        { name: 'JavaScript',  icon: 'javascript' },
        { name: 'HTML5',       icon: 'html5'      },
        { name: 'CSS3',        icon: 'css3'       },
        { name: 'Tailwind CSS', icon: 'tailwind'  },
      ]
    },
    {
      category: 'Databases',
      skills: [
        { name: 'MySQL',      icon: 'mysql'      },
        { name: 'PostgreSQL', icon: 'postgresql' },
        { name: 'MongoDB',    icon: 'mongodb'    },
        { name: 'Redis',      icon: 'redis'      },
        { name: 'Firebase',   icon: 'firebase'   },
      ]
    },
    {
      category: 'Cloud & DevOps',
      skills: [
        { name: 'Azure (AZ-204)', icon: 'azure'         },
        { name: 'Docker',         icon: 'docker'        },
        { name: 'GitHub Actions', icon: 'githubactions' },
        { name: 'CI/CD' },
        { name: 'Azure App Service' },
      ]
    },
    {
      category: 'Tools & Practices',
      skills: [
        { name: 'Git',    icon: 'git'    },
        { name: 'GitHub', icon: 'github' },
        { name: 'TDD' },
        { name: 'Agile' },
        { name: 'OOP' },
        { name: 'RBAC' },
        { name: 'JWT' },
        { name: 'Microsoft Entra ID' },
      ]
    }
  ];
}
