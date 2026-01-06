"""
MRP Router - 자재 소요량 계획 API
"""
from fastapi import APIRouter, HTTPException

from solvers.mrp_calculator import MRPCalculator

router = APIRouter(prefix="/mrp", tags=["mrp"])

# Initialize calculator
mrp_calculator = MRPCalculator()


@router.get("/products")
async def get_mrp_products():
    """완제품 목록 조회"""
    try:
        return mrp_calculator.get_products()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/items")
async def get_mrp_items(item_type: str = None):
    """품목 목록 조회"""
    try:
        return mrp_calculator.get_items(item_type)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/bom/{item_code}")
async def get_mrp_bom(item_code: str):
    """특정 품목의 BOM 조회"""
    try:
        return mrp_calculator.get_bom(item_code)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/calculate")
async def calculate_mrp(request: dict):
    """
    MRP 자재 소요량 계산
    
    Request body:
    {
        "production_plans": [
            {"item_code": "PROD-001", "quantity": 1000}
        ],
        "consider_inventory": true
    }
    """
    try:
        production_plans = request.get('production_plans', [])
        consider_inventory = request.get('consider_inventory', True)
        
        if not production_plans:
            raise HTTPException(status_code=400, detail="production_plans is required")
        
        result = mrp_calculator.calculate_mrp(production_plans, consider_inventory)
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
