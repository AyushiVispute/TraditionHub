"""
CHIP Travel Planner optimizer microservice. POST /optimize -> day-by-day
itineraries computed with a real OR-Tools PCVRP solver.
"""

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List, Literal

from .solver import solve_pcvrp
from .distance import build_distance_matrix

app = FastAPI(title="CHIP Optimizer Service", version="1.0.0")


class Poi(BaseModel):
    id: str
    name: str
    lat: float
    lng: float
    prize: float = Field(ge=0, le=1)
    visit_minutes: int = 45
    must_include: bool = False


class Depot(BaseModel):
    lat: float
    lng: float


class OptimizeRequest(BaseModel):
    depot: Depot
    pois: List[Poi]
    days: int = Field(default=1, ge=1, le=14)
    max_daily_minutes: int = Field(default=480, ge=30)
    transport_mean: Literal["car", "bicycle", "foot"] = "car"
    num_alternatives: int = Field(default=1, ge=1, le=5)


class Stop(BaseModel):
    id: str
    name: str
    lat: float
    lng: float
    arrival_minute: int
    visit_minutes: int
    prize: float


class DayPlan(BaseModel):
    day: int
    stops: List[Stop]
    total_minutes: int
    total_prize: float


class Itinerary(BaseModel):
    days: List[DayPlan]
    total_prize: float


class OptimizeResponse(BaseModel):
    itineraries: List[Itinerary]


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/optimize", response_model=OptimizeResponse)
def optimize(req: OptimizeRequest):
    if not req.pois:
        raise HTTPException(status_code=400, detail="No candidate POIs supplied.")

    locations = [(req.depot.lat, req.depot.lng)] + [(p.lat, p.lng) for p in req.pois]
    distance_matrix, minutes_matrix = build_distance_matrix(locations, req.transport_mean)

    itineraries = []
    excluded_ids: set = set()

    for _ in range(req.num_alternatives):
        candidate_pois = [p for p in req.pois if p.id not in excluded_ids]
        if not candidate_pois:
            break

        sub_locations_idx = [0] + [i + 1 for i, p in enumerate(req.pois) if p.id not in excluded_ids]
        sub_minutes = [[minutes_matrix[i][j] for j in sub_locations_idx] for i in sub_locations_idx]

        plan = solve_pcvrp(
            pois=candidate_pois,
            distance_minutes=sub_minutes,
            days=req.days,
            max_daily_minutes=req.max_daily_minutes,
        )

        if plan is None or not any(day["stops"] for day in plan):
            break

        total_prize = sum(s["prize"] for day in plan for s in day["stops"])
        itineraries.append({"days": plan, "total_prize": total_prize})

        visited_ids = {
            s["id"]
            for day in plan
            for s in day["stops"]
            if not next((p.must_include for p in candidate_pois if p.id == s["id"]), False)
        }
        excluded_ids |= visited_ids

    if not itineraries:
        raise HTTPException(status_code=422, detail="No feasible itinerary found with the given constraints.")

    return {"itineraries": itineraries}