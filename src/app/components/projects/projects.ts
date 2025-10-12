import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  projectUrl: string;
  delay?: number;
}

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  standalone: true
})
export class Projects {
  projects: Project[] = [
    {
      title: 'T-Shirt Store',
      description: 'Full-featured e-commerce platform with product browsing, cart management, and secure Stripe payments. Includes admin dashboard for inventory management.',
      image: 'assets/projects/tshirt-store.jpg',
      technologies: ['MERN Stack', 'Stripe', 'Redux'],
      projectUrl: '#',
      delay: 0
    },
    {
      title: 'Face Recognition System',
      description: 'Biometric authentication system for EMR with face capture, encoding, and secure storage. Tested across various lighting conditions and users.',
      image: 'assets/projects/face-recognition.jpg',
      technologies: ['Python', 'OpenCV', 'ML'],
      projectUrl: '#',
      delay: 100
    },
    {
      title: 'Point of Sale System',
      description: 'Advanced retail management system with inventory tracking, order processing, and real-time reporting. Optimized for high-volume transactions.',
      image: 'assets/projects/pos-system.jpg',
      technologies: ['Laravel 10', 'MySQL', 'REST API'],
      projectUrl: '#',
      delay: 200
    }
  ];
}
