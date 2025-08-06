from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from mcdc.mcdc import MCDCAnalyzer

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MCDCRequest(BaseModel):
    conditions: list[str]
    expression: str

@app.post("/analyze")
def analyze_mcdc(req: MCDCRequest):
    analyzer = MCDCAnalyzer(req.conditions, req.expression)
    cases = analyzer.find_mcdc_cases()
    return {"mcdc_cases": cases}

@app.get("/")
def read_root():
    return {"message": "MC/DC backend is running."}
