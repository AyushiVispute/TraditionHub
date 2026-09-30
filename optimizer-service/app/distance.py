"""
Builds the travel-time graph between the depot and candidate POIs.
Uses haversine distance by default; switches to real OpenRouteService
road/foot/bike distances automatically if ORS_API_KEY is set.
"""

import math
import os
from typing import List, Tuple

AVG_SPEED_KMH = {"car": 40, "bicycle": 15, "foot": 4.5}

ORS_API_KEY = os.environ.get("ORS_API_KEY")
ORS_PROFILE = {"car": "driving-car", "bicycle": "cycling-regular", "foot": "foot-walking"}


def _haversine_km(a: Tuple[float, float], b: Tuple[float, float]) -> float:
    lat1, lon1 = a
    lat2, lon2 = b
    R = 6371.0
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlambda = math.radians(lon2 - lon1)
    h = math.sin(dphi / 2) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(dlambda / 2) ** 2
    return 2 * R * math.asin(math.sqrt(h))


def _haversine_matrix(locations: List[Tuple[float, float]], transport_mean: str):
    n = len(locations)
    speed = AVG_SPEED_KMH.get(transport_mean, AVG_SPEED_KMH["car"])
    dist_km = [[0.0] * n for _ in range(n)]
    minutes = [[0] * n for _ in range(n)]
    for i in range(n):
        for j in range(n):
            if i == j:
                continue
            km = _haversine_km(locations[i], locations[j])
            dist_km[i][j] = km
            minutes[i][j] = round((km / speed) * 60)
    return dist_km, minutes


def _ors_matrix(locations: List[Tuple[float, float]], transport_mean: str):
    import requests

    profile = ORS_PROFILE.get(transport_mean, "driving-car")
    url = f"https://api.openrouteservice.org/v2/matrix/{profile}"
    coords = [[lng, lat] for lat, lng in locations]

    resp = requests.post(
        url,
        json={"locations": coords, "metrics": ["distance", "duration"]},
        headers={"Authorization": ORS_API_KEY, "Content-Type": "application/json"},
        timeout=15,
    )
    resp.raise_for_status()
    data = resp.json()
    durations_sec = data["durations"]
    distances_m = data["distances"]

    n = len(locations)
    minutes = [[round(durations_sec[i][j] / 60) for j in range(n)] for i in range(n)]
    dist_km = [[distances_m[i][j] / 1000 for j in range(n)] for i in range(n)]
    return dist_km, minutes


def build_distance_matrix(locations: List[Tuple[float, float]], transport_mean: str):
    if ORS_API_KEY:
        try:
            return _ors_matrix(locations, transport_mean)
        except Exception:
            pass
    return _haversine_matrix(locations, transport_mean)