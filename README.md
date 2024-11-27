# Task Creation Automation

## Overview

The **Task Creation Automation** project automates the process of dividing a project into tasks, assigning employees based on their expertise, and displaying those tasks in a user-friendly interface. The goal is to streamline task management and employee allocation within an organization.

### Key Steps in the Process:
1. **Project Upload & Task Division**: The admin uploads a project PDF containing project details. The system automatically extracts the project data and divides it into tasks.
2. **Employee Resource Assignment**: The admin assigns employees to the extracted tasks based on their skills, tech stack, and experience.
3. **Model-Based Task Assignment**: The **Gemini-1.5-Flash-002** model is used to evaluate employee profiles and automatically assign employees to tasks that best match their expertise.
4. **Task Visibility for Employees**: Employees can log in to the system to view the tasks assigned to them.

## Features

- **Project File Upload**: Admins can upload a project file (PDF) containing project details.
- **Task Extraction**: The system extracts tasks from the uploaded PDF file and divides them into manageable tasks.
- **Employee Assignment**: Admins assign employees to tasks based on their skills and roles.
- **AI-Powered Task Matching**: Using the **Gemini-1.5-Flash-002** model, the system assigns tasks to employees based on their tech stack and experience.
- **Employee Dashboard**: Employees can log in to view their assigned tasks.

## Tech Stack

- **Frontend & Backend**: Next.js
- **Database**: MongoDB (for storing tasks and employee data)
- **AI Model**: **Gemini-1.5-Flash-002** (for matching employees to tasks based on their skills and experience)
- **Authentication**: JWT-based authentication for employees

## Setup & Installation

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v14 or above)
- **MongoDB** (or a cloud-based MongoDB service like MongoDB Atlas)
- **npm** (Node Package Manager)

### Clone the Repository

```bash
git clone https://github.com/yourusername/task-creation-automation.git
cd task-creation-automation
