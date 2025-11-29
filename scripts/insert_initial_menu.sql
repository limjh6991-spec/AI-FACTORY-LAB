-- AI Factory Lab 초기 메뉴 데이터
-- 실행: SQL Server Management Studio 또는 pymssql로 실행

USE [도우제조MES시스템TEST];
GO

-- 기존 메뉴 삭제 (선택사항)
-- DELETE FROM new_doi_sys_menu;

-- 1. 대시보드
INSERT INTO new_doi_sys_menu (menu_id, up_menu_id, menu_nm, menu_url, sort_no, use_yn, icon_cls, reg_dt)
VALUES ('M001', NULL, '대시보드', '/', 1, 'Y', 'bi-speedometer2', GETDATE());

-- 2. 원가 관리
INSERT INTO new_doi_sys_menu (menu_id, up_menu_id, menu_nm, menu_url, sort_no, use_yn, icon_cls, reg_dt)
VALUES ('M002', NULL, '원가 관리', NULL, 2, 'Y', 'bi-calculator', GETDATE());

-- 2-1. 원가 조회
INSERT INTO new_doi_sys_menu (menu_id, up_menu_id, menu_nm, menu_url, sort_no, use_yn, icon_cls, reg_dt)
VALUES ('M002-01', 'M002', '원가 조회', NULL, 1, 'Y', 'bi-search', GETDATE());

-- 2-1-1. 제품별 원가
INSERT INTO new_doi_sys_menu (menu_id, up_menu_id, menu_nm, menu_url, sort_no, use_yn, icon_cls, reg_dt)
VALUES ('M002-01-01', 'M002-01', '제품별 원가', '/standard/COST001', 1, 'Y', 'bi-box', GETDATE());

-- 2-1-2. 부서별 원가
INSERT INTO new_doi_sys_menu (menu_id, up_menu_id, menu_nm, menu_url, sort_no, use_yn, icon_cls, reg_dt)
VALUES ('M002-01-02', 'M002-01', '부서별 원가', '/standard/COST002', 2, 'Y', 'bi-building', GETDATE());

-- 3. 관리자
INSERT INTO new_doi_sys_menu (menu_id, up_menu_id, menu_nm, menu_url, sort_no, use_yn, icon_cls, reg_dt)
VALUES ('M003', NULL, '관리자', NULL, 99, 'Y', 'bi-gear-fill', GETDATE());

-- 3-1. 화면 생성기
INSERT INTO new_doi_sys_menu (menu_id, up_menu_id, menu_nm, menu_url, sort_no, use_yn, icon_cls, reg_dt)
VALUES ('M003-01', 'M003', '화면 생성기', '/admin/screen-generator', 1, 'Y', 'bi-magic', GETDATE());

-- 3-2. 메뉴 관리
INSERT INTO new_doi_sys_menu (menu_id, up_menu_id, menu_nm, menu_url, sort_no, use_yn, icon_cls, reg_dt)
VALUES ('M003-02', 'M003', '메뉴 관리', '/admin/menu-generator', 2, 'Y', 'bi-list-ul', GETDATE());

-- 결과 확인
SELECT * FROM new_doi_sys_menu ORDER BY sort_no, menu_id;
GO
