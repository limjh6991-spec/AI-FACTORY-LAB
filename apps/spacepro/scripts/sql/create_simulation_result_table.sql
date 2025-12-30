-- ============================================================
-- Phase 5: 시뮬레이션 결과 버전 관리 테이블
-- Schema: spacepro (PostgreSQL)
-- Created: 2025-12-30
-- ============================================================

DROP TABLE IF EXISTS spacepro.sp_simulation_result CASCADE;

CREATE TABLE spacepro.sp_simulation_result (
    id SERIAL PRIMARY KEY,
    version_name VARCHAR(100) NOT NULL,
    plan_month VARCHAR(7) NOT NULL,  -- YYYY-MM
    created_at TIMESTAMP DEFAULT NOW(),
    created_by VARCHAR(50) DEFAULT 'system',
    
    -- 입력값 (JSON)
    demands JSONB NOT NULL,           -- 수요 목록
    advanced_params JSONB,            -- 고급 파라미터
    
    -- 결과값 (JSON)
    summary JSONB NOT NULL,           -- 시뮬레이션 요약
    workcenters JSONB NOT NULL,       -- 작업장별 결과
    bottlenecks JSONB,                -- 병목 정보
    
    -- 메타
    remark TEXT,
    is_baseline BOOLEAN DEFAULT FALSE -- 기준 버전 여부
);

COMMENT ON TABLE spacepro.sp_simulation_result IS '시뮬레이션 결과 버전 관리';
COMMENT ON COLUMN spacepro.sp_simulation_result.version_name IS '버전명 (사용자 정의)';
COMMENT ON COLUMN spacepro.sp_simulation_result.demands IS '입력된 수요 목록 (JSON)';
COMMENT ON COLUMN spacepro.sp_simulation_result.advanced_params IS '고급 시뮬레이션 파라미터 (JSON)';
COMMENT ON COLUMN spacepro.sp_simulation_result.summary IS '시뮬레이션 요약 결과 (JSON)';
COMMENT ON COLUMN spacepro.sp_simulation_result.workcenters IS '작업장별 상세 결과 (JSON)';

-- 인덱스
CREATE INDEX idx_simulation_result_month ON spacepro.sp_simulation_result(plan_month);
CREATE INDEX idx_simulation_result_created ON spacepro.sp_simulation_result(created_at DESC);

SELECT 'sp_simulation_result table created successfully!' AS result;
