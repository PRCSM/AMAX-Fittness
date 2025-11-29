
import { Exercise, Workout } from './types';

export const MOCK_EXERCISES: Exercise[] = [
  {
    id: 'pushups',
    name: 'Push-Ups',
    category: 'Strength',
    duration: '60s',
    reps: '10-15',
    sets: 3,
    difficulty: 'Beginner',
    muscles: ['Chest', 'Triceps', 'Core'],
    equipment: 'None',
    // Pexels: Man doing pushups
    videoUrl: 'https://videos.pexels.com/video-files/4761426/4761426-sd_640_360_25fps.mp4',
    instructions: [
      'Start in a high plank position.',
      'Lower your body until chest nearly touches floor.',
      'Push back up to starting position.'
    ]
  },
  {
    id: 'squats',
    name: 'Squats',
    category: 'Strength',
    duration: '60s',
    reps: '12-15',
    sets: 3,
    difficulty: 'Beginner',
    muscles: ['Quads', 'Glutes', 'Hamstrings'],
    equipment: 'None',
    // Pexels: Woman doing squats
    videoUrl: 'https://videos.pexels.com/video-files/4259059/4259059-sd_640_360_25fps.mp4',
    instructions: [
      'Stand with feet shoulder-width apart.',
      'Lower hips back and down as if sitting in a chair.',
      'Keep chest up and back straight.',
      'Return to standing position.'
    ]
  },
  {
    id: 'plank',
    name: 'Plank',
    category: 'Core',
    duration: '45s',
    reps: '1',
    sets: 3,
    difficulty: 'Intermediate',
    muscles: ['Core', 'Shoulders'],
    equipment: 'None',
    // Pexels: Woman doing plank
    videoUrl: 'https://videos.pexels.com/video-files/3076127/3076127-sd_640_360_25fps.mp4',
    instructions: [
      'Start on forearms and toes.',
      'Keep body in straight line from head to heels.',
      'Hold position engaging core muscles.'
    ]
  }
];

export const MOCK_WORKOUTS: Workout[] = [
  {
    id: 'w1',
    title: 'Upper Body Strength',
    duration: 45,
    calories: 382,
    difficulty: 'Advanced',
    category: 'Strength',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop',
    exercises: [MOCK_EXERCISES[0], MOCK_EXERCISES[2]]
  },
  {
    id: 'w2',
    title: 'HIIT Cardio Blast',
    duration: 20,
    calories: 250,
    difficulty: 'Intermediate',
    category: 'Cardio',
    image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=1925&auto=format&fit=crop',
    exercises: [MOCK_EXERCISES[1], MOCK_EXERCISES[0]]
  },
  {
    id: 'w3',
    title: 'Leg Day Power',
    duration: 40,
    calories: 410,
    difficulty: 'Advanced',
    category: 'Strength',
    image: 'https://images.unsplash.com/photo-1434608519344-49d77a699ded?q=80&w=2074&auto=format&fit=crop',
    exercises: [MOCK_EXERCISES[1]]
  },
  {
    id: 'w4',
    title: 'Yoga Flow',
    duration: 30,
    calories: 180,
    difficulty: 'Beginner',
    category: 'Flexibility',
    image: 'https://images.unsplash.com/photo-1544367563-12123d895951?q=80&w=2070&auto=format&fit=crop',
    exercises: [MOCK_EXERCISES[2]]
  }
];
