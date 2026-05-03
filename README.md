# VectorShift Frontend Technical Assessment

**Submitted by:** Yash Shukla

This repository contains the complete solution for the VectorShift Technical Assessment, featuring a dynamic, node-based frontend application and a robust backend API for graph validation. 

## 🌟 Project Overview

**What is this project?**
This application is a visual **Node-Based Workflow Builder** (similar to tools like Zapier, Make, or LangFlow). It enables users to visually construct and design pipelines—such as Large Language Model (LLM) execution chains or data processing workflows—by connecting various interactive nodes on a 2D canvas. 

The core objective of this application is to provide an intuitive canvas where users can build these complex workflows by dragging, dropping, and connecting various types of nodes. The system mathematically represents these workflows as a Directed Acyclic Graph (DAG). When submitted, this graph is dynamically validated by the backend to ensure there are no cyclical dependencies (infinite loops), verifying that the pipeline can be safely executed from start to finish.

### Key Architecture Components
- **Frontend:** Built with React and `react-flow-renderer`. It focuses on modularity through a custom `BaseNode` abstraction that simplifies the creation of diverse node types.
- **Backend:** A lightweight Python/FastAPI service dedicated to receiving graph payloads (nodes and edges) and determining if the structure forms a valid DAG.

---

## ✨ Features Implemented

- **Extensible Node Abstraction:** Designed a highly scalable `BaseNode` architecture. Instead of hardcoding 9 separate node components, a single abstraction dynamically renders distinct nodes (Input, Output, LLM, Text, API, Conditional, Merge, Filter, Logger) based on configurations.
- **Intelligent Text Nodes:** Text nodes automatically detect and extract variables wrapped in `{{ }}` brackets, rendering dynamic handlebars (input points) on the fly.
- **Dynamic Resizing:** Text Nodes seamlessly resize according to the volume of content typed, maintaining a clean UI.
- **Premium Dark Mode UI:** Implemented a modern, visually stunning dark mode featuring glassmorphism, gradient accents, and subtle micro-animations for an elevated user experience.
- **Real-time DAG Validation:** Seamless integration between the React frontend and FastAPI backend. The 'Submit' button packages the current canvas state and validates it against cyclical logic.

---

## 🛠️ Tech Stack

- **Frontend:** React, React Flow, CSS3 (Custom Styling)
- **Backend:** Python, FastAPI, Uvicorn
- **Development Tools:** Node.js, npm, pip

---

## 🚀 Getting Started

Follow these instructions to get both the frontend and backend running locally on your machine.

### Prerequisites
- **Node.js**: v14 or higher recommended
- **Python**: v3.8 or higher recommended

### 1. Setting up the Backend (FastAPI)

The backend handles the Directed Acyclic Graph (DAG) validation logic.

1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. *(Optional but recommended)* Create and activate a virtual environment:
   ```bash
   python -m venv venv
   
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install the required dependencies:
   ```bash
   pip install fastapi uvicorn pydantic
   ```
4. Start the backend development server:
   ```bash
   uvicorn main:app --reload
   ```
   *The backend will now be running at `http://localhost:8000` (or `http://127.0.0.1:8000`).*

---

### 2. Setting up the Frontend (React)

The frontend is built with React and leverages React Flow for the interactive node-based canvas.

1. Open a **new** terminal window and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the necessary NPM dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   *The frontend application will automatically open in your default browser at `http://localhost:3000`.*

---

## 📝 Notes for the Evaluator

- **Full Functionality Testing:** Please ensure **both** the FastAPI backend (`uvicorn`) and the React frontend (`npm start`) servers are running concurrently. 
- **Graph Submission:** When you click the `Submit` button on the canvas, the frontend sends the current nodes and edges to the backend to calculate the number of nodes, edges, and whether the graph is a valid DAG. The result will be displayed in an alert.
- **Code Structure:** Pay special attention to the `BaseNode` implementation in the frontend, as it demonstrates a scalable pattern for managing complex UI states and diverse component variants without code duplication.

---
*Developed by Yash Shukla for the VectorShift Technical Assessment.*
