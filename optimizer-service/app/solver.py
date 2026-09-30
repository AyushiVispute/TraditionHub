"""
Prize-Collecting Vehicle Routing Problem (PCVRP) solver using Google OR-Tools.
Each day = one vehicle, each POI = a customer with a prize; guided local
search escapes local minima, with a bounded time limit for real-time use.
"""

from typing import List, Dict, Optional
from ortools.constraint_solver import routing_enums_pb2
from ortools.constraint_solver import pywrapcp

SEARCH_TIME_LIMIT_SECONDS = 8
PRIZE_SCALE = 1000


def solve_pcvrp(pois: List, distance_minutes: List[List[int]], days: int, max_daily_minutes: int) -> Optional[List[Dict]]:
    n_pois = len(pois)
    n_nodes = n_pois + 1
    manager = pywrapcp.RoutingIndexManager(n_nodes, days, 0)
    routing = pywrapcp.RoutingModel(manager)

    visit_minutes = [0] + [p.visit_minutes for p in pois]

    def time_callback(from_index, to_index):
        from_node = manager.IndexToNode(from_index)
        to_node = manager.IndexToNode(to_index)
        return distance_minutes[from_node][to_node] + visit_minutes[to_node]

    transit_callback_index = routing.RegisterTransitCallback(time_callback)
    routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)

    routing.AddDimension(transit_callback_index, 0, max_daily_minutes, True, "Time")

    for i, poi in enumerate(pois):
        node_index = manager.NodeToIndex(i + 1)
        if poi.must_include:
            continue
        penalty = int(poi.prize * PRIZE_SCALE) + 1
        routing.AddDisjunction([node_index], penalty)

    search_parameters = pywrapcp.DefaultRoutingSearchParameters()
    search_parameters.first_solution_strategy = routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC
    search_parameters.local_search_metaheuristic = routing_enums_pb2.LocalSearchMetaheuristic.GUIDED_LOCAL_SEARCH
    search_parameters.time_limit.FromSeconds(SEARCH_TIME_LIMIT_SECONDS)

    solution = routing.SolveWithParameters(search_parameters)
    if solution is None:
        return None

    result = []
    for vehicle_id in range(days):
        index = routing.Start(vehicle_id)
        stops = []
        elapsed = 0
        prev_node = 0
        while not routing.IsEnd(index):
            node = manager.IndexToNode(index)
            if node != 0:
                poi = pois[node - 1]
                travel = distance_minutes[prev_node][node]
                elapsed += travel
                stops.append(
                    {
                        "id": poi.id,
                        "name": poi.name,
                        "lat": poi.lat,
                        "lng": poi.lng,
                        "arrival_minute": elapsed,
                        "visit_minutes": poi.visit_minutes,
                        "prize": poi.prize,
                    }
                )
                elapsed += poi.visit_minutes
                prev_node = node
            index = solution.Value(routing.NextVar(index))

        total_prize = sum(s["prize"] for s in stops)
        result.append({"day": vehicle_id + 1, "stops": stops, "total_minutes": elapsed, "total_prize": total_prize})

    return result