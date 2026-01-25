"""
Routers Package
"""
from .routing import router as routing_router
from .simulation import router as simulation_router
from .worker import router as worker_router
from .capacity import router as capacity_router
from .mrp import router as mrp_router
from .schedule import router as schedule_router
from .master import router as master_router
from .dashboard import router as dashboard_router
from .pr_detail import router as pr_detail_router
from .data_format import router as data_format_router

__all__ = [
    'routing_router', 
    'simulation_router', 
    'worker_router',
    'capacity_router',
    'mrp_router',
    'schedule_router',
    'master_router',
    'pr_detail_router',
    'data_format_router'
]


