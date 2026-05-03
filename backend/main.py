from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from collections import deque, defaultdict

app = FastAPI()

# CORS — allow the React dev server and Vercel
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]


def is_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    """
    Determine if the pipeline forms a Directed Acyclic Graph
    using Kahn's Algorithm (BFS-based topological sort).
    Returns True if the graph is a DAG, False if a cycle exists.
    """
    if not nodes:
        return True

    # Collect all node IDs
    node_ids = set()
    for node in nodes:
        node_ids.add(node.get("id", ""))

    # Build adjacency list and in-degree map
    in_degree = defaultdict(int)
    adjacency = defaultdict(list)

    for nid in node_ids:
        in_degree[nid] = 0

    for edge in edges:
        src = edge.get("source", "")
        tgt = edge.get("target", "")
        adjacency[src].append(tgt)
        in_degree[tgt] += 1

    # BFS — start with all nodes that have in-degree 0
    queue = deque([nid for nid in node_ids if in_degree[nid] == 0])
    visited_count = 0

    while queue:
        current = queue.popleft()
        visited_count += 1
        for neighbor in adjacency[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # If we visited all nodes, no cycle exists → it's a DAG
    return visited_count == len(node_ids)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: PipelineData):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag = is_dag(pipeline.nodes, pipeline.edges)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": dag,
    }
