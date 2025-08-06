# MC/DC Scenario Analyzer

A full-stack application to analyze Modified Condition/Decision Coverage (MC/DC) for Boolean expressions and scenarios.

## Project Structure

```
mcdc_usecase/
├── backend/         # Python FastAPI backend
│   ├── main.py      # API server and MC/DC logic endpoint
│   ├── mcdc/        # MC/DC logic module
│   │   ├── mcdc.py  # MC/DC test case generator
│   │   └── __init__.py
│   └── requirements.txt
├── frontend/        # React frontend UI
│   ├── src/
│   │   ├── App.js   # Main React component
│   │   └── index.js # React entry point
│   ├── public/
│   │   └── index.html
│   └── package.json
└── README.md        # Project overview and instructions
```

## Features
- Input Boolean conditions and expressions
- Generate MC/DC test cases automatically
- Intuitive, visually appealing React UI
- FastAPI backend with CORS enabled

## Setup Instructions

### 1. Backend (Python FastAPI)

```sh
cd backend
# (Optional) Create and activate a virtual environment
# python3 -m venv .venv
# source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 2. Frontend (React)

```sh
cd frontend
npm install
npm start
```

### 3. Usage
- Open the React app in your browser (usually at http://localhost:3000)
- Enter conditions (comma separated) and a Boolean expression
- Click "Analyze MC/DC" to view generated test cases

## Technologies Used
- Python 3.9+
- FastAPI
- React
- JavaScript

## License
MIT
