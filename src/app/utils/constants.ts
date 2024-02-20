import { TaskPriority, TaskStatus } from './enums';
import { Task } from './types';


export const INITIAL_TASKS: Task[] = [
  new Task(
    'Update Angular Routing',
    "Implement necessary updates to the Angular routing system. Ensure that the routing configuration aligns with the project's requirements and supports seamless navigation within the application. Verify that the routing logic is well-structured and efficiently handles different components and views.",
    TaskStatus.PENDING,
    TaskPriority.LOW
  ),
  new Task(
    'Integrate Chart.js Library',
    'Successfully integrate the Chart.js library into the project. This involves incorporating the necessary dependencies, configuring the library to meet project specifications, and ensuring proper visualization of data through various chart types. Verify that the integration enhances the overall data presentation within the application.',
    TaskStatus.COMPLETED,
    TaskPriority.MEDIUM
  ),
  new Task(
    'Add Rich Text Editor Support',
    'Enhance the application by adding support for a rich text editor. This includes integrating a suitable rich text editor library, configuring its features, and ensuring smooth integration with existing components. Verify that the rich text editor enhances the user experience and functionality of text input.',
    TaskStatus.COMPLETED,
    TaskPriority.HIGH
  ),
  new Task(
    'Refactor Subscription Logic',
    'Review and refactor the subscription logic within the application. Ensure that subscriptions are handled efficiently, with proper error handling and resource management. Aim to improve the overall performance and reliability of subscription-related functionalities.',
    TaskStatus.COMPLETED,
    TaskPriority.LOW
  ),
  new Task(
    'Add New Task Options',
    'Extend the functionality of the application by adding new task options. This includes creating UI elements, implementing backend logic if necessary, and ensuring proper integration with the existing task management system. Verify that the new options enhance the overall user experience.',
    TaskStatus.COMPLETED,
    TaskPriority.MEDIUM
  ),
];
