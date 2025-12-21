-- 메뉴 시스템 정리 SQL 스크립트 (UPDATE 방식)
-- 실행: PGPASSWORD=postgres psql -h localhost -U postgres -d ai_factory_db -f scripts/update_menu.sql

BEGIN;

-- 기존 구조 확인:
-- MNU940 (시스템 설정) 을 '화면 생성'으로 변경
-- MNU941-944는 화면 생성 하위 메뉴

-- 1. MNU940을 '화면 생성'으로 변경
UPDATE "binary".sys_menu SET 
  menu_name = '화면 생성',
  menu_path = NULL,
  menu_icon = 'FileText'
WHERE menu_id = 'MNU940';

-- 2. MNU941 (화면 생성기) 유지
UPDATE "binary".sys_menu SET 
  parent_id = 'MNU940',
  menu_level = 3,
  sort_order = 941,
  menu_name = '화면 생성기',
  menu_path = '/settings/screen-generator'
WHERE menu_id = 'MNU941';

-- 3. MNU942 (공통옵션 테스트) - level 3으로
UPDATE "binary".sys_menu SET 
  parent_id = 'MNU940',
  menu_level = 3,
  sort_order = 942,
  menu_name = '공통옵션 테스트',
  menu_path = '/test/options'
WHERE menu_id = 'MNU942';

-- 4. MNU943 (RealGrid 화면생성기)
UPDATE "binary".sys_menu SET 
  parent_id = 'MNU940',
  menu_level = 3,
  sort_order = 943,
  menu_name = 'RealGrid 화면생성기',
  menu_path = '/settings/screen-generator-realgrid'
WHERE menu_id = 'MNU943';

-- 5. MNU944 (RealGrid 메뉴관리) - 시스템 직속으로 변경
UPDATE "binary".sys_menu SET 
  parent_id = 'MNU900',
  menu_level = 2,
  sort_order = 945,
  menu_name = 'RealGrid 메뉴관리',
  menu_path = '/settings/menu-realgrid'
WHERE menu_id = 'MNU944';

COMMIT;

-- 확인
SELECT menu_id, parent_id, menu_level, sort_order, menu_name, menu_path 
FROM "binary".sys_menu 
WHERE menu_id LIKE 'MNU9%' 
ORDER BY sort_order;
