
// Fix: Import React to resolve 'Cannot find namespace React' errors for React.ReactNode
import React from 'react';

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Level {
  id: number;
  title: string;
  phase: string;
  description: string;
  icon: React.ReactNode;
}

export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

// --- New Academy Types ---

export type UserRole = 'student' | 'instructor' | 'admin' | 'parent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Course {
  id: string;
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
}

export interface Class {
  id: string;
  title: string;
  courseName: string;
  instructorId: string;
  studentId?: string; // For 1-on-1, or array for group
  startTime: string; // ISO Date string
  endTime: string;   // ISO Date string
  meetLink: string | null;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
}
