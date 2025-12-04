
## 화면: C0001004 - 원가기준정보 (C0001004)
메뉴경로: 기준정보 > 원가기준정보 (C0001004)
탭: TAB010001, TAB010002, TAB010003, TAB010005
설명: 계정코드, 부서코드, 자재코드, 면적기준정보

### 관련 쿼리

#### selectTab1GridData (select)
- 테이블: doi_acct
- 컬럼: YYYYMM, SEL_CODE, SITE, CASE, ACCT_CLASS, 계정과목내부코드, 전표기표여부, ACCT, ACCT_NAME, 차대...
- SQL: select YYYYMM, SEL_CODE, SITE as SITE_ORG, CASE WHEN SITE='HQ' Then '본사' WHEN SITE='VN' then 'VINA' else site end as SITE, ACCT_CLASS as ACCT_CLASS_ORG, CASE WHEN ACCT_CLASS='AA' Then '가공비' WHEN ACCT_...


#### checkTab1DuplicateOrgList (select)
- 테이블: doi_acct
- 컬럼: 
- SQL: DROP TABLE IF EXISTS #TempTable1; CREATE TABLE #TempTable1 ( YYYYMM varchar(20) COLLATE Korean_Wansung_CI_AS NOT NULL, SEL_CODE varchar(10) COLLATE Korean_Wansung_CI_AS NOT NULL, SITE varchar(4) COLLA...


#### countTab1ByYyyymmAndSite (select)
- 테이블: doi_acct
- 컬럼: 
- SQL: SELECT COUNT(*) AS cnt FROM DOI_ACCT WHERE yyyymm = ? AND site = ?...


#### selectTab1ByYyyymmAndSite (select)
- 테이블: doi_acct
- 컬럼: YYYYMM, SEL_CODE, SITE, ACCT_CLASS, 계정과목내부코드, 전표기표여부, ACCT, ACCT_NAME, 차대, 계정대분류...
- SQL: SELECT YYYYMM, SEL_CODE, SITE, ACCT_CLASS, 계정과목내부코드, 전표기표여부, ACCT, ACCT_NAME, 차대, 계정대분류, 관리항목유형, 계정과목Lev, 상위계정과목, 경영계획과목, 상위계정과목내부코드, 소분류, 중분류, 대분류, EXPEN_SEL, EXPEN_SEL명, 특이사항 FROM DOI_ACCT WHERE yyy...


#### selectTab2GridData (select)
- 테이블: doi_dept
- 컬럼: YYYYMM, SEL_CODE, SITE, CASE, DEPT, DEPT_NAME, EXPEN_AREA, COST_DIST
- SQL: select YYYYMM, SEL_CODE, SITE as SITE_ORG, CASE WHEN SITE='HQ' Then '본사' WHEN SITE='VN' then 'VINA' else site end as SITE, DEPT, DEPT_NAME, EXPEN_AREA, COST_DIST FROM doi_dept where 1=1 order BY dept ...


#### checkTab2DuplicateOrgList (select)
- 테이블: doi_dept
- 컬럼: 
- SQL: DROP TABLE IF EXISTS #TempTable1; CREATE TABLE #TempTable1 ( YYYYMM varchar(10) COLLATE Korean_Wansung_CI_AS NOT NULL, SEL_CODE varchar(10) COLLATE Korean_Wansung_CI_AS NOT NULL, SITE varchar(4) COLLA...


#### countTab2ByYyyymmAndSite (select)
- 테이블: doi_dept
- 컬럼: 
- SQL: SELECT COUNT(*) AS cnt FROM DOI_DEPT WHERE yyyymm = ? AND site = ?...


#### selectTab2ByYyyymmAndSite (select)
- 테이블: doi_dept
- 컬럼: YYYYMM, SEL_CODE, SITE, DEPT, DEPT_NAME, EXPEN_AREA, COST_DIST
- SQL: SELECT YYYYMM, SEL_CODE, SITE, DEPT, DEPT_NAME, EXPEN_AREA, COST_DIST FROM DOI_DEPT WHERE yyyymm = ? AND site = ?...


#### selectTab3GridData (select)
- 테이블: doi_bom_mast
- 컬럼: YYYYMM, SITE, CASE, 제품명, 제품번호, 품목자산분류, 품목대분류, 품목중분류, 품목소분류, 공정차수...
- SQL: SELECT YYYYMM, SITE as SITE_ORG, CASE WHEN SITE='HQ' Then '본사' WHEN SITE='VN' then 'VINA' else site end as SITE, 제품명, 제품번호, 품목자산분류, 품목대분류, 품목중분류, 품목소분류, 공정차수, 공정, 공정품명, 공정품번호, 자재명, 자재번호, 자재자산분류, 자재대분류...


#### checkTab3DuplicateOrgList (select)
- 테이블: doi_bom_mast
- 컬럼: 
- SQL: DROP TABLE IF EXISTS #TempTable1; CREATE TABLE #TempTable1 ( YYYYMM varchar(6) COLLATE Korean_Wansung_CI_AS NULL, SITE varchar(5) COLLATE Korean_Wansung_CI_AS NULL, 제품명 nvarchar(25) COLLATE Korean_Wan...


#### countTab3ByYyyymmAndSite (select)
- 테이블: doi_bom_mast
- 컬럼: 
- SQL: SELECT COUNT(*) AS cnt FROM DOI_BOM_MAST WHERE yyyymm = ? AND site = ?...


#### selectTab3ByYyyymmAndSite (select)
- 테이블: doi_bom_mast
- 컬럼: YYYYMM, SITE, 제품명, 제품번호, 품목자산분류, 품목대분류, 품목중분류, 품목소분류, 공정차수, 공정...
- SQL: SELECT YYYYMM, SITE, 제품명, 제품번호, 품목자산분류, 품목대분류, 품목중분류, 품목소분류, 공정차수, 공정, 공정품명, 공정품번호, 자재명, 자재번호, 자재자산분류, 자재대분류, 자재중분류, 자재소분류, 투입단위, 소요량, 내부Loss율, 외부Loss율, 조립위치, 특이사항, 최초작성일, 최초작성자, 최종수정일, 최종수정자 FROM DOI...


#### selectTab5GridData (select)
- 테이블: doi_model_mast
- 컬럼: YYYYMM, SEL_CODE, SITE, CASE, MODEL, SPEC, INCH, GLASS_THICK, SHEET, BLOCK...
- SQL: select YYYYMM, SEL_CODE, SITE as SITE_ORG, CASE WHEN SITE='HQ' Then '본사' WHEN SITE='VN' then 'VINA' else site end as SITE, MODEL, SPEC, INCH, GLASS_THICK, SHEET, BLOCK, CELL, RUN_SIZE, X, Y, XY from D...


#### checkTab5DuplicateOrgList (select)
- 테이블: doi_model_mast
- 컬럼: 
- SQL: DROP TABLE IF EXISTS #TempTable1; CREATE TABLE #TempTable1 ( YYYYMM varchar(10) COLLATE Korean_Wansung_CI_AS NOT NULL, SEL_CODE varchar(10) COLLATE Korean_Wansung_CI_AS NOT NULL, SITE varchar(4) COLLA...


#### insertTab1Data (insert)
- 테이블: doi_acct
- 컬럼: 
- SQL: INSERT INTO DOI_ACCT ( YYYYMM,SEL_CODE,SITE,ACCT_CLASS,계정과목내부코드,전표기표여부,ACCT,ACCT_NAME,차대,계정대분류,관리항목유형,계정과목Lev,상위계정과목,경영계획과목,상위계정과목내부코드,소분류,중분류,대분류,expen_sel,expen_sel명,특이사항 ) VALUES ( ? , ? , CASE WHE...


#### tab1UploadExcel (insert)
- 테이블: doi_acct
- 컬럼: YYYYMM, SEL_CODE, SITE, ACCT_CLASS, 계정과목내부코드, 전표기표여부, ACCT, ACCT_NAME, 차대, 계정대분류...
- SQL: CREATE TABLE #TempTable ( seq_no INT IDENTITY (1, 1) NOT NULL, YYYYMM varchar(20) COLLATE Korean_Wansung_CI_AS NOT NULL, SEL_CODE varchar(10) COLLATE Korean_Wansung_CI_AS NOT NULL, SITE varchar(4) COL...


#### insertTab2Data (insert)
- 테이블: doi_dept
- 컬럼: 
- SQL: INSERT INTO DOI_DEPT ( YYYYMM , SEL_CODE , SITE , DEPT , DEPT_NAME , EXPEN_AREA , COST_DIST ) VALUES ( ? , ? , CASE WHEN ?='본사' Then 'HQ' WHEN ?='VINA' then 'VN' else left(?,2) end , ? , ? , ? , ? );...


#### tab2UploadExcel (insert)
- 테이블: doi_dept
- 컬럼: YYYYMM, SEL_CODE, SITE, DEPT, DEPT_NAME, EXPEN_AREA
- SQL: CREATE TABLE #TempTable ( seq_no INT IDENTITY (1, 1) NOT NULL, YYYYMM varchar(10) COLLATE Korean_Wansung_CI_AS NOT NULL, SEL_CODE varchar(10) COLLATE Korean_Wansung_CI_AS NOT NULL, SITE varchar(4) COL...


#### insertTab3Data (insert)
- 테이블: doi_bom_mast
- 컬럼: 
- SQL: INSERT INTO DOI_BOM_MAST ( YYYYMM , SITE , 제품명 , 제품번호 , 품목자산분류 , 품목대분류 , 품목중분류 , 품목소분류 , 공정차수 , 공정 , 공정품명 , 공정품번호 , 자재명 , 자재번호 , 자재자산분류 , 자재대분류 , 자재중분류 , 자재소분류 , 투입단위 , 소요량 , 내부Loss율 , 외부Loss율 , 조립위치 ...


#### tab3UploadExcel (insert)
- 테이블: doi_bom_mast
- 컬럼: YYYYMM, SITE, 제품명, 제품번호, 품목자산분류, 품목대분류, 품목중분류, 품목소분류, 공정차수, 공정...
- SQL: CREATE TABLE #TempTable ( seq_no INT IDENTITY (1, 1) NOT NULL, YYYYMM varchar(6) COLLATE Korean_Wansung_CI_AS NULL, SITE varchar(5) COLLATE Korean_Wansung_CI_AS NULL, 제품명 nvarchar(25) COLLATE Korean_W...


#### insertTab5Data (insert)
- 테이블: doi_model_mast
- 컬럼: 
- SQL: INSERT INTO DOI_MODEL_MAST ( YYYYMM , SEL_CODE , SITE , MODEL , SPEC , INCH , GLASS_THICK , SHEET , BLOCK , CELL , RUN_SIZE , X , Y , XY ) VALUES ( ? , ? , CASE WHEN ?='본사' Then 'HQ' WHEN ?='VINA' the...


#### tab5UploadExcel (insert)
- 테이블: doi_model_mast
- 컬럼: YYYYMM, SEL_CODE, SITE, MODEL, SPEC, INCH, GLASS_THICK, SHEET, BLOCK, CELL...
- SQL: CREATE TABLE #TempTable ( seq_no INT IDENTITY (1, 1) NOT NULL, YYYYMM varchar(10) COLLATE Korean_Wansung_CI_AS NOT NULL, SEL_CODE varchar(10) COLLATE Korean_Wansung_CI_AS NOT NULL, SITE varchar(4) COL...


#### updateTab1Data (update)
- 테이블: doi_acct
- 컬럼: 
- SQL: UPDATE DOI_ACCT SET SEL_CODE = ? ,ACCT_CLASS = CASE WHEN ?='가공비' Then 'AA' WHEN ?='개발비' then 'BB' WHEN ?='판매관리비' then 'CC' else left(?,2) end ,계정과목내부코드 = #{계정과목내부코드} ,전표기표여부 = #{전표기표여부} ,ACCT_NAME = ?...


#### updateTab2Data (update)
- 테이블: doi_dept
- 컬럼: 
- SQL: UPDATE DOI_DEPT SET DEPT_NAME = ? ,EXPEN_AREA = ? WHERE 1=1 and yyyymm = ? and site = ? and dept = ? ;...


#### updateTab3Data (update)
- 테이블: doi_bom_mast
- 컬럼: 
- SQL: UPDATE DOI_BOM_MAST SET 제품명 = #{제품명} ,품목자산분류 = #{품목자산분류} ,품목대분류 = #{품목대분류} ,품목중분류 = #{품목중분류} ,품목소분류 = #{품목소분류} ,공정차수 = #{공정차수} ,공정품명 = #{공정품명} ,공정품번호 = #{공정품번호} ,자재명 = #{자재명} ,자재자산분류 = #{자재자산분류} ,자재대분...


#### updateTab5Data (update)
- 테이블: doi_model_mast
- 컬럼: 
- SQL: UPDATE DOI_MODEL_MAST SET SEL_CODE = ? ,MODEL = ? ,SPEC = ? ,INCH = ? ,GLASS_THICK = ? ,SHEET = ? ,BLOCK = ? ,CELL = ? ,RUN_SIZE = ? ,X = ? ,Y = ? ,XY = ? WHERE 1=1 and yyyymm = ? and site = ? and mod...


#### deleteTab1Data (delete)
- 테이블: doi_acct
- 컬럼: 
- SQL: DELETE FROM DOI_ACCT WHERE 1=1 and yyyymm = ? and sel_code = ? and site = ? and acct_class = ? and acct = ?...


#### deleteTab2Data (delete)
- 테이블: doi_dept
- 컬럼: 
- SQL: DELETE FROM DOI_DEPT WHERE 1=1 and yyyymm = ? and site = ? and dept = ?...


#### deleteTab3Data (delete)
- 테이블: doi_bom_mast
- 컬럼: 
- SQL: DELETE FROM DOI_BOM_MAST WHERE yyyymm = ? AND site = ? AND 제품번호 = #{제품번호} AND 공정 = #{공정} AND ISNULL(자재번호, '') = ISNULL(#{자재번호}, '')...


#### deleteTab5Data (delete)
- 테이블: doi_model_mast
- 컬럼: 
- SQL: DELETE FROM DOI_MODEL_MAST WHERE 1=1 and yyyymm = ? and sel_code = ? and site = ? and model = ?...


---

## 화면: C0001007 - C0001007
메뉴경로: 



### 관련 쿼리

#### getGrid1Data (select)
- 테이블: doi_maj_code
- 컬럼: maj_code_name, maj_code
- SQL: select maj_code_name,maj_code from doi_maj_code order by case when isnumeric(maj_code) = 1 then cast(maj_code as int) else null end, maj_code...


#### getGrid2Data (select)
- 테이블: doi_common_code
- 컬럼: maj_code, code, code_name, tray_cell, create_date, use_yn, sort_order, etc1, etc2
- SQL: select maj_code,code,code as code_org,code_name,tray_cell,create_date,use_yn,sort_order,etc1,etc2 from doi_common_code where maj_code = ? order by sort_order,code...


#### insertData1 (insert)
- 테이블: doi_maj_code
- 컬럼: 
- SQL: INSERT INTO doi_maj_code ( maj_code_name, maj_code ) VALUES ( ?, ? );...


#### insertData2 (insert)
- 테이블: doi_common_code
- 컬럼: 
- SQL: INSERT INTO doi_common_code ( maj_code, code, code_name, tray_cell, create_date, use_yn, sort_order, etc1, etc2 ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ? );...


#### updateData1 (update)
- 테이블: doi_maj_code
- 컬럼: 
- SQL: UPDATE doi_maj_code SET maj_code_name=? WHERE maj_code = ?...


#### updateData2 (update)
- 테이블: doi_common_code
- 컬럼: 
- SQL: UPDATE doi_common_code SET code = ?, code_name=?, tray_cell=?, create_date=?, use_yn=?, sort_order=?, etc1=?, etc2=? WHERE maj_code=? AND code=?;...


---

## 화면: C0001009 - Tab 0 사용자 관리  #tab-content-#{DOI_CM_SYS_RESOURCE.sys_resource_id}
메뉴경로: Tab 0 사용자 관리  #tab-content-#{DOI_CM_SYS_RESOURCE.sys_resource_id}
탭: TAB012000, TAB013000, TAB014000
설명: 사용자 관리  #tab-content-#{DOI_CM_SYS_RESOURCE.sys_resource_id}, 메뉴관리, 사용자메뉴 권한관리

### 관련 쿼리

#### selectMenuTabList (select)
- 테이블: doi_cm_sys_resource, mt
- 컬럼: a.prod_category, a.sys_resource_id, a.upper_sys_resource_id, a.description, a.SYS_RESOURCE_NAME, a.seq, 1, a.sys_resource_type_code_id, 'D4')as, a.url...
- SQL: with mt as ( select a.prod_category ,a.sys_resource_id ,a.upper_sys_resource_id ,a.description ,cast(a.SYS_RESOURCE_NAME as nvarchar(max)) as full_path ,a.SYS_RESOURCE_NAME ,a.seq ,1 as level ,a.sys_r...


#### selectRoleList (select)
- 테이블: doi_cm_role
- 컬럼: ROLE_ID, ROLE_NAME, DESCRIPTION, INIT_DT, INIT_USER, MODI_DT, MODI_USER
- SQL: select ROLE_ID ,ROLE_NAME ,DESCRIPTION ,INIT_DT ,INIT_USER ,MODI_DT ,MODI_USER from DOI_CM_ROLE where del_yn = 'N' order by role_name...


#### selectUserList (select)
- 테이블: doi_cm_user
- 컬럼: USER_ID, password, user_name, dept_name, dept_code, position_name, position_code, UTG, ITG, INIT_DT...
- SQL: select USER_ID ,password ,user_name ,dept_name ,dept_code ,position_name ,position_code ,UTG ,ITG ,INIT_DT ,INIT_USER ,MODI_DT ,MODI_USER ,DEL_YN from doi_cm_user where DEL_YN = 'N' order by dept_name...


#### selectRoleMenuTabList (select)
- 테이블: doi_cm_role, doi_cm_role_sys_resource, doi_cm_sys_resource, mt, role_sys_resc
- 컬럼: b.UPPER_SYS_RESOURCE_ID, b.SYS_RESOURCE_ID
- SQL: with role_sys_resc as ( select b.UPPER_SYS_RESOURCE_ID ,b.SYS_RESOURCE_ID from DOI_CM_ROLE a left outer join doi_cm_role_sys_resource b on (a.ROLE_ID = b.ROLE_ID) where a.role_id = ? and a.del_yn = 'N...


#### selectRoleUserList (select)
- 테이블: doi_cm_user_role, doi_cm_user
- 컬럼: a.role_id, a.user_id, b.dept_name, b.user_name, b.position_name, b.position_code
- SQL: select a.role_id ,a.user_id ,b.dept_name ,b.user_name ,b.position_name ,b.position_code from doi_cm_user_ROLE a left outer join doi_cm_user b on (a.USER_ID = b.USER_ID) where a.ROLE_ID = ?...


#### checkRoleId (select)
- 테이블: doi_cm_role
- 컬럼: case
- SQL: select case when count(1) > 0 then ? + '는 사용 할 수 없는 Role Id 입니다.' else 'OK' end from DOI_CM_ROLE where role_id = ?...


#### insertRoleSysResc (insert)
- 테이블: doi_cm_role_sys_resource
- 컬럼: 
- SQL: INSERT INTO doi_cm_role_sys_resource ( ROLE_ID ,PROD_CATEGORY ,UPPER_SYS_RESOURCE_ID ,SYS_RESOURCE_ID ,SYS_RESOURCE_TYPE_CODE_ID ,INIT_DT ,INIT_USER ) VALUES ( ? ,? ,? ,? ,? ,GETDATE() ,? )...


#### insertCmUser (insert)
- 테이블: doi_cm_user
- 컬럼: 
- SQL: INSERT INTO doi_cm_user ( USER_ID ,user_name ,password ,dept_name ,dept_code ,position_name ,position_code ,UTG ,ITG ,INIT_DT ,INIT_USER ,MODI_DT ,MODI_USER ,DEL_YN ) VALUES ( ? ,? ,? ,? ,? ,? ,? ,? ,...


#### insertCmSysResource (insert)
- 테이블: doi_cm_sys_resource
- 컬럼: 
- SQL: INSERT INTO DOI_CM_SYS_RESOURCE ( prod_category , SYS_RESOURCE_ID , SYS_RESOURCE_NAME , UPPER_SYS_RESOURCE_ID , SYS_RESOURCE_TYPE_CODE_ID , DESCRIPTION , SEQ , URL , INIT_DT , INIT_USER , DEL_YN ) VAL...


#### insertUserRole (insert)
- 테이블: doi_cm_user_role
- 컬럼: 
- SQL: INSERT INTO doi_cm_user_ROLE ( USER_ID,ROLE_ID,ROLE_NAME,INIT_DT,INIT_USER ) VALUES ( ?,?,?,getdate(),? )...


#### insertRole (insert)
- 테이블: doi_cm_role
- 컬럼: 
- SQL: INSERT INTO DOI_CM_ROLE ( ROLE_ID, ROLE_NAME, DESCRIPTION, INIT_DT, INIT_USER, MODI_DT, MODI_USER, DEL_YN ) VALUES ( ?, ?, ?, getdate(), ?, NULL, NULL, 'N' )...


#### updateCmUser (update)
- 테이블: doi_cm_user
- 컬럼: 
- SQL: UPDATE doi_cm_user SET user_name=? , password=? , dept_name=? , dept_code=? , position_name=? , position_code=? , UTG=? , ITG=? , MODI_DT=getdate() , MODI_USER=? WHERE USER_ID=?...


#### deleteCmUser (update)
- 테이블: doi_cm_user
- 컬럼: 
- SQL: UPDATE doi_cm_user SET DEL_YN = 'Y' WHERE USER_ID=?...


#### updateCmSysResource (update)
- 테이블: doi_cm_sys_resource
- 컬럼: 
- SQL: UPDATE DOI_CM_SYS_RESOURCE SET SYS_RESOURCE_ID = ? ,SYS_RESOURCE_NAME=? , SYS_RESOURCE_TYPE_CODE_ID=? , DESCRIPTION=? , SEQ=? , URL=? , MODI_DT=getdate() , MODI_USER=? where prod_category = ? and SYS_...


#### deleteCmSysResource (update)
- 테이블: doi_cm_sys_resource
- 컬럼: 
- SQL: UPDATE DOI_CM_SYS_RESOURCE SET DEL_YN = 'Y' , MODI_DT=getdate() , MODI_USER=? where prod_category = ? and SYS_RESOURCE_ID = ? and UPPER_SYS_RESOURCE_ID = ?...


#### deleteRole (update)
- 테이블: doi_cm_role
- 컬럼: 
- SQL: UPDATE DOI_CM_ROLE SET DEL_YN = 'Y' ,MODI_USER = ? ,MODI_DT = GETDATE() WHERE ROLE_ID = ?...


#### updateRole (update)
- 테이블: doi_cm_role
- 컬럼: 
- SQL: UPDATE DOI_CM_ROLE SET ROLE_NAME = ? ,DESCRIPTION = ? ,MODI_DT = getdate() ,MODI_USER = ? WHERE ROLE_ID = ?...


#### deleteRoleSysResc (delete)
- 테이블: doi_cm_role_sys_resource
- 컬럼: 
- SQL: delete from doi_cm_role_sys_resource where role_id = ? and PROD_CATEGORY = ?...


#### deleteUserRole (delete)
- 테이블: doi_cm_user_role
- 컬럼: 
- SQL: DELETE FROM doi_cm_user_ROLE WHERE ROLE_ID = ? AND USER_ID = ?...


---

## 화면: C0003010 - 제품수불 체크
메뉴경로: 제조매출원가 > 제품수불 체크



### 관련 쿼리

#### selectST001Detail (select)
- 테이블: doi_stock
- 컬럼: TOP, STOCK, BOH, [INPUT], [OUT], EOH
- SQL: SELECT TOP 100 MODEL, STOCK, BOH, [INPUT], [OUT], EOH, (BOH + [INPUT] - [OUT]) AS CALC_EOH, EOH - (BOH + [INPUT] - [OUT]) AS DIFF FROM DOI_STOCK WHERE 1=1 <!-- 임시로 주석: 실제 데이터가 있는지 확인 --> <!-- AND ABS(...


#### selectST001Summary (select)
- 테이블: doi_stock
- 컬럼: 
- SQL: SELECT COUNT(*) AS TOTAL_COUNT, SUM(CASE WHEN ABS(EOH - (BOH + [INPUT] - [OUT])) &lt;= 0.01 THEN 1 ELSE 0 END) AS NORMAL_COUNT, SUM(CASE WHEN ABS(EOH - (BOH + [INPUT] - [OUT])) &gt; 0.01 THEN 1 ELSE 0...


#### selectST002Detail (select)
- 테이블: 
- 컬럼: 
- SQL: SELECT '임시' AS MODEL, '임시' AS GUBUN, '임시' AS EXPEN_SEL, '' AS EXPEN_SEL_NAME, 0 AS FAB_OUT_AMT, 0 AS STOCK_IN_AMT, 0 AS DIFF_AMT, '구현 예정' AS ERROR_TYPE WHERE 1=0...


#### selectST002Summary (select)
- 테이블: 
- 컬럼: 
- SQL: SELECT 0 AS TOTAL_COUNT, 0 AS NORMAL_COUNT, 0 AS ERROR_COUNT...


#### selectST003Detail (select)
- 테이블: doi_stco
- 컬럼: TOP, 구분, EXPEN_SEL, BOH_AMT, IN_AMT, EOH_AMT, OUT_AMT
- SQL: SELECT TOP 100 MODEL, 구분 AS GUBUN, EXPEN_SEL, BOH_AMT, IN_AMT, EOH_AMT, OUT_AMT, (BOH_AMT + IN_AMT - EOH_AMT) AS CALC_OUT_AMT, OUT_AMT - (BOH_AMT + IN_AMT - EOH_AMT) AS DIFF FROM DOI_STCO WHERE 1=1 <!...


#### selectST003Summary (select)
- 테이블: doi_stco
- 컬럼: 
- SQL: SELECT COUNT(*) AS TOTAL_COUNT, SUM(CASE WHEN ABS(OUT_AMT - (BOH_AMT + IN_AMT - EOH_AMT)) &lt;= 0.01 THEN 1 ELSE 0 END) AS NORMAL_COUNT, SUM(CASE WHEN ABS(OUT_AMT - (BOH_AMT + IN_AMT - EOH_AMT)) &gt; ...


#### selectST004Detail (select)
- 테이블: 
- 컬럼: 
- SQL: SELECT '임시' AS TABLE_NAME, '임시' AS MODEL, '임시' AS GUBUN, 'NULL' AS EXPEN_SEL, '구현 예정' AS ERROR_TYPE, '구현 예정' AS REMARK WHERE 1=0...


#### selectST004Summary (select)
- 테이블: 
- 컬럼: 
- SQL: SELECT 0 AS TOTAL_COUNT, 0 AS NORMAL_COUNT, 0 AS ERROR_COUNT...


#### selectST005Detail (select)
- 테이블: doi_stock
- 컬럼: TOP, STOCK, BOH, EOH, CASE
- SQL: SELECT TOP 100 MODEL, STOCK, BOH, EOH, CASE WHEN BOH &lt; 0 AND EOH &lt; 0 THEN '둘 다 음수' WHEN BOH &lt; 0 THEN 'BOH 음수' WHEN EOH &lt; 0 THEN 'EOH 음수' ELSE '정상' END AS ERROR_TYPE, CASE WHEN BOH &lt; 0 A...


#### selectST005Summary (select)
- 테이블: doi_stock
- 컬럼: 
- SQL: SELECT COUNT(*) AS TOTAL_COUNT, SUM(CASE WHEN BOH &gt;= 0 AND EOH &gt;= 0 THEN 1 ELSE 0 END) AS NORMAL_COUNT, SUM(CASE WHEN BOH &lt; 0 OR EOH &lt; 0 THEN 1 ELSE 0 END) AS ERROR_COUNT FROM DOI_STOCK WH...


---

## 화면: C0007001 - 부서별, 계정별 비용
메뉴경로: 타시스템 > 부서별, 계정별 비용



### 관련 쿼리

#### C0007001_Sch1 (select)
- 테이블: doi_dept_cost
- 컬럼: YYYYMM, SEL_CODE, SITE, CASE, 코스트센터, 코스트센터분류, 코스트센터유형, 계정코드, 계정과목, 비용구분...
- SQL: select YYYYMM, SEL_CODE, SITE as SITE_ORG, CASE WHEN SITE='HQ' then '본사' WHEN site='VN' then 'VINA' end as SITE, 코스트센터, 코스트센터분류, 코스트센터유형, 계정코드, 계정과목, 비용구분, 차변금액, 대변금액 from DOI_DEPT_COST where 1=1 orde...


#### checkduplicateOrgList (select)
- 테이블: doi_dept_cost
- 컬럼: 
- SQL: DROP TABLE IF EXISTS #TempTable1; CREATE TABLE #TempTable1 ( yyyymm varchar(6) COLLATE Korean_Wansung_CI_AS NOT NULL, sel_code varchar(6) COLLATE Korean_Wansung_CI_AS NOT NULL, site varchar(4) COLLATE...


#### uploadExcel (insert)
- 테이블: doi_dept_cost
- 컬럼: yyyymm, sel_code, site, 코스트센터, 코스트센터분류, 코스트센터유형, 계정코드, 계정과목, 비용구분, 차변금액...
- SQL: CREATE TABLE #TempTable ( seq_no INT IDENTITY (1, 1) NOT NULL, yyyymm varchar(6) COLLATE Korean_Wansung_CI_AS NOT NULL, sel_code varchar(6) COLLATE Korean_Wansung_CI_AS NOT NULL, site varchar(4) COLLA...


#### C0007001_Insert1 (insert)
- 테이블: doi_dept_cost
- 컬럼: 
- SQL: INSERT INTO DOI_DEPT_COST ( YYYYMM , SEL_CODE , SITE , 코스트센터 , 코스트센터분류 , 코스트센터유형 , 계정코드 , 계정과목 , 비용구분 , 차변금액 , 대변금액 ) VALUES ( ? , ? , CASE WHEN ?='본사' Then 'HQ' WHEN ?='VINA' then 'VN' else left(?,2)...


#### C0007001_Update1 (update)
- 테이블: doi_dept_cost
- 컬럼: 
- SQL: UPDATE DOI_DEPT_COST SET 코스트센터분류 = #{코스트센터분류} , 코스트센터유형 = #{코스트센터유형} , 계정과목 = #{계정과목} , 비용구분 = #{비용구분} , 차변금액 = #{차변금액} , 대변금액 = #{대변금액} WHERE 1=1 and yyyymm = ? and SEL_CODE = ? and site = ? and 코스트센...


#### C0007001_Delete1 (delete)
- 테이블: doi_dept_cost
- 컬럼: 
- SQL: DELETE FROM DOI_DEPT_COST WHERE 1=1 and yyyymm = ? and sel_code = ? and site = ? and 코스트센터 = #{코스트센터} and 계정코드 = #{계정코드}...


---

## 화면: C0007002 - 자재투입정보
메뉴경로: 타시스템 > 자재투입정보



### 관련 쿼리

#### C0007002_Sch1 (select)
- 테이블: doi_material_resc
- 컬럼: YYYYMM, SEL_CODE, SITE, CASE, MAT_CODE, MAT_DESC, [SIZE], IN_QTY, UNIT_COST, IN_AMT...
- SQL: select YYYYMM, SEL_CODE, SITE AS SITE_ORG, CASE WHEN SITE='HQ' then '본사' WHEN site='VN' then 'VINA' end as SITE, MAT_CODE, MAT_DESC, [SIZE], IN_QTY, UNIT_COST, IN_AMT, COST_GUBUN, MAT_GUBUN, MAT_CLASS...


#### checkduplicateOrgList (select)
- 테이블: doi_material_resc
- 컬럼: 
- SQL: DROP TABLE IF EXISTS #TempTable1; CREATE TABLE #TempTable1 ( YYYYMM varchar(6) COLLATE Korean_Wansung_CI_AS NULL, SEL_CODE varchar(6) COLLATE Korean_Wansung_CI_AS NULL, SITE varchar(4) COLLATE Korean_...


#### uploadExcel (insert)
- 테이블: doi_material_resc
- 컬럼: YYYYMM, SEL_CODE, SITE, MAT_CODE, MAT_DESC, [SIZE], IN_QTY, UNIT_COST, IN_AMT, COST_GUBUN...
- SQL: CREATE TABLE #TempTable ( seq_no INT IDENTITY (1, 1) NOT NULL, YYYYMM varchar(6) COLLATE Korean_Wansung_CI_AS NULL, SEL_CODE varchar(6) COLLATE Korean_Wansung_CI_AS NULL, SITE varchar(4) COLLATE Korea...


#### C0007002_Insert1 (insert)
- 테이블: doi_material_resc
- 컬럼: 
- SQL: INSERT INTO DOI_MATERIAL_RESC ( YYYYMM,SEL_CODE,SITE,MAT_CODE,MAT_DESC,[SIZE],IN_QTY,UNIT_COST,IN_AMT,COST_GUBUN,MAT_GUBUN,MAT_CLASS,MODEL,MODEL_N_TYPE ) VALUES ( ? , ? , CASE WHEN ?='본사' Then 'HQ' WH...


#### C0007002_Update1 (update)
- 테이블: doi_material_resc
- 컬럼: 
- SQL: UPDATE DOI_MATERIAL_RESC SET MAT_DESC = ? ,[SIZE] = ? ,IN_QTY = ? ,UNIT_COST = ? ,IN_AMT = ? ,COST_GUBUN = ? ,MAT_GUBUN = ? ,MAT_CLASS = ? WHERE 1=1 and YYYYMM = ? and SEL_CODE = ? and SITE = ? and MA...


#### C0007002_Delete1 (delete)
- 테이블: doi_material_resc
- 컬럼: 
- SQL: DELETE FROM DOI_MATERIAL_RESC WHERE 1=1 and YYYYMM = ? and SEL_CODE = ? and SITE = ? and MAT_CODE = ? and MODEL = ? and MODEL_N_TYPE = ?...


---

## 화면: C0007003 - Tab 0 생산수불
메뉴경로: Tab 0 생산수불
탭: TAB070001, TAB070002
설명: 생산수불, 연구개발 수불

### 관련 쿼리

#### C0007003_Sch1 (select)
- 테이블: doi_prod_subul
- 컬럼: YYYYMM, SEL_CODE, DW_SITE, CASE, 구분, 구분_ord, 도우코드, MODEL_N_TYPE, 도우모델, 작업구분...
- SQL: select YYYYMM,SEL_CODE, DW_SITE as DW_SITE_ORG, CASE WHEN DW_SITE='HQ' then '본사' WHEN DW_SITE='VN' then 'VINA' end as DW_SITE, 구분,구분_ord,도우코드,MODEL_N_TYPE,도우모델,작업구분,org작업구분,model,Inch,Site,BOH_MONTH,I...


#### C0007003_Sch2 (select)
- 테이블: doi_rnd_subul
- 컬럼: YYYYMM, SEL_CODE, DW_SITE, CASE, 구분, 구분_ord, 도우코드, MODEL_N_TYPE, 도우모델, 작업구분...
- SQL: select YYYYMM,SEL_CODE, DW_SITE as DW_SITE_ORG, CASE WHEN DW_SITE='HQ' then '본사' WHEN DW_SITE='VN' then 'VINA' end as DW_SITE, 구분,구분_ord,도우코드,MODEL_N_TYPE,도우모델,작업구분,org작업구분,model,Inch,Site,BOH_MONTH,I...


#### uploadProdSubul (select)
- 테이블: 
- 컬럼: 
- SQL: EXEC UP_DOI_PROD_SUBUL ?, ?;...


#### checkduplicateOrgList (select)
- 테이블: doi_prod_subul
- 컬럼: 
- SQL: DROP TABLE IF EXISTS #TempTable1; CREATE TABLE #TempTable1 ( YYYYMM varchar(6) COLLATE Korean_Wansung_CI_AS NOT NULL, SEL_CODE varchar(10) COLLATE Korean_Wansung_CI_AS NOT NULL, DW_SITE varchar(5) COL...


#### uploadExcel (insert)
- 테이블: doi_prod_subul
- 컬럼: YYYYMM, SEL_CODE, site, GUBUN, GUBUN_ORD, DW_CODE, MODEL_N_TYPE, DW_MODEL, WORK_GUBUN, ORG_WORK_GUBUN...
- SQL: CREATE TABLE #TempTable ( YYYYMM varchar(6) COLLATE Korean_Wansung_CI_AS NOT NULL, SEL_CODE varchar(10) COLLATE Korean_Wansung_CI_AS NOT NULL, DW_SITE varchar(5) COLLATE Korean_Wansung_CI_AS NOT NULL,...


#### insertTab1Data (insert)
- 테이블: doi_prod_subul
- 컬럼: 
- SQL: INSERT INTO DOI_PROD_SUBUL ( YYYYMM, SEL_CODE, 구분 AS GUBUN, 구분_ord AS GUBUN_ORD, 도우코드 AS DW_CODE, MODEL_N_TYPE, 도우모델 AS DW_MODEL, 작업구분 AS WORK_GUBUN, org작업구분 AS ORG_WORK_GUBUN, MODEL, INCH, SITE AS OU...


#### updateTab1Data (update)
- 테이블: doi_prod_subul
- 컬럼: 
- SQL: UPDATE DOI_PROD_SUBUL SET SEL_CODE = ? ,구분 = ? ,구분_ord = ? ,도우코드 = ? ,MODEL_N_TYPE = ? ,도우모델 = ? ,작업구분 = ? ,org작업구분 = ? ,INCH = ? ,OUT_SITE = ? ,BOH_MONTH = ? ,IN_MONTH = ? ,BONUS_MONTH = ? ,EOH_MONTH...


#### deleteTab1Data (delete)
- 테이블: doi_prod_subul
- 컬럼: 
- SQL: DELETE FROM DOI_PROD_SUBUL WHERE 1=1 and yyyymm = ? and sel_code = ? and site = ? and dw_model = ?...


---

## 화면: C0007004 - 제품정보
메뉴경로: * 타시스템 > 제품정보



### 관련 쿼리

#### C0007004_Sch1 (select)
- 테이블: doi_stock
- 컬럼: YYYYMM, SEL_CODE, SITE, CASE, MODEL, MODEL_TYPE, STOCK, BOH, [INPUT], [OUT]...
- SQL: select YYYYMM, SEL_CODE, SITE as SITE_ORG, CASE WHEN SITE='HQ' then '본사' WHEN SITE='VN' then 'VINA' end as SITE, MODEL, MODEL_TYPE, STOCK, BOH, [INPUT], [OUT], EOH, INPUT_ETC, INPUT_MOVING, INPUT_PROD...


#### checkduplicateOrgList (select)
- 테이블: doi_stock
- 컬럼: 
- SQL: DROP TABLE IF EXISTS #TempTable1; CREATE TABLE #TempTable1 ( YYYYMM varchar(10) COLLATE Korean_Wansung_CI_AS NOT NULL, SEL_CODE varchar(10) COLLATE Korean_Wansung_CI_AS NOT NULL, SITE varchar(4) COLLA...


#### uploadExcel (insert)
- 테이블: doi_stock
- 컬럼: YYYYMM, SEL_CODE, SITE, MODEL, MODEL_TYPE, STOCK, BOH, [INPUT], [OUT], EOH...
- SQL: CREATE TABLE #TempTable ( seq_no INT IDENTITY (1, 1) NOT NULL, YYYYMM varchar(10) COLLATE Korean_Wansung_CI_AS NOT NULL, SEL_CODE varchar(10) COLLATE Korean_Wansung_CI_AS NOT NULL, SITE varchar(4) COL...


#### C0007004_Insert1 (insert)
- 테이블: doi_stock
- 컬럼: 
- SQL: INSERT INTO DOI_STOCK ( YYYYMM,SEL_CODE,SITE,MODEL,MODEL_TYPE,STOCK,BOH,[INPUT],[OUT],EOH,INPUT_ETC,INPUT_MOVING,INPUT_PROD,OUT_SHEET,OUT_RETURN,OUT_INVOICE,OUT_ETC,OUT_MOVING ) VALUES ( ? , ? , CASE ...


#### C0007004_Update1 (update)
- 테이블: doi_stock
- 컬럼: 
- SQL: UPDATE DOI_STOCK SET BOH = ? ,[INPUT] = ? ,[OUT] = ? ,EOH = ? ,INPUT_ETC = ? ,INPUT_MOVING = ? ,INPUT_PROD = ? ,OUT_SHEET = ? ,OUT_RETURN = ? ,OUT_INVOICE = ? ,OUT_ETC = ? ,OUT_MOVING = ? WHERE 1=1 an...


#### C0007004_Delete1 (delete)
- 테이블: doi_stock
- 컬럼: 
- SQL: DELETE FROM DOI_STOCK WHERE 1=1 and yyyymm = ? and sel_code = ? and site = ? and model = ? and MODEL_TYPE = ? and STOCK = ?...


---

## 화면: C0007005 - Tab 0 세금계산서
메뉴경로: Tab 0 세금계산서
탭: TAB070003, TAB070004
설명: 세금계산서, 수출신고필증

### 관련 쿼리

#### C0007005_Sch1 (select)
- 테이블: doi_sale_resc
- 컬럼: 
- SQL: select * FROM doi_sale_resc where 1=1 order by 1,2,3,4,5,6,7,8,9;...


#### C0007005_Sch2 (select)
- 테이블: doi_invoice_resc
- 컬럼: 
- SQL: select * FROM DOI_INVOICE_RESC where 1=1 order by 1,2,3,4,5,6,7,8,9;...


#### checkduplicateOrgList (select)
- 테이블: doi_sale_resc
- 컬럼: 
- SQL: DROP TABLE IF EXISTS #TempTable1; CREATE TABLE #TempTable1 ( YYYYMM varchar(10) COLLATE Korean_Wansung_CI_AS NOT NULL, SEL_CODE varchar(10) COLLATE Korean_Wansung_CI_AS NOT NULL, SITE varchar(4) COLLA...


#### uploadExcel (insert)
- 테이블: doi_sale_resc
- 컬럼: YYYYMM, SEL_CODE, SITE, 선택, 출고처리, 사업단위, 거래명세서번호, 거래명세서일, Local구분, 출고구분...
- SQL: CREATE TABLE #TempTable ( seq_no INT IDENTITY (1, 1) NOT NULL, YYYYMM varchar(10) COLLATE Korean_Wansung_CI_AS NOT NULL, SEL_CODE varchar(10) COLLATE Korean_Wansung_CI_AS NOT NULL, SITE varchar(4) COL...


#### C0007005_Insert1 (insert)
- 테이블: doi_sale_resc
- 컬럼: 
- SQL: INSERT INTO doi_sale_resc ( YYYYMM,SEL_CODE,SITE,선택,출고처리,사업단위,거래명세서번호,거래명세서일,Local구분,출고구분 ,부서,담당자,청구처,거래처,유통구조,거래처번호,중개인,납품장소,인도조건,판매후보관 ,위탁,납품거래처,납기일,품명,품번,규격,판매단위,판매기준가,수량,부가세포함 ,통화,환율,판매단가,판매금액,부가세...


#### C0007005_Update1 (update)
- 테이블: doi_sale_resc
- 컬럼: 
- SQL: UPDATE doi_sale_resc SET 선택=#{선택} ,출고처리=#{출고처리} ,사업단위=#{사업단위} ,거래명세서일=#{거래명세서일} ,Local구분=#{local구분} ,출고구분 =#{출고구분} ,부서=#{부서} ,담당자=#{담당자} ,청구처=#{청구처} ,거래처=#{거래처} ,유통구조=#{유통구조} ,거래처번호=#{거래처번호} ,중개인=#{중개...


#### C0007005_Delete1 (delete)
- 테이블: doi_sale_resc
- 컬럼: 
- SQL: DELETE FROM doi_sale_resc WHERE 1=1 AND YYYYMM = ? AND SEL_CODE= ? AND SITE= ? and 거래명세서번호 = #{거래명세서번호}...


---

## 화면: C0007006 - 생산수불 자체 체크
메뉴경로: 타시스템 > 생산수불 자체 체크



### 관련 쿼리

#### selectBalanceCheck (select)
- 테이블: doi_prod_subul
- 컬럼: --, SEL_CODE, DW_SITE, 구분, 구분_ORD, 도우코드, MODEL_N_TYPE, [도우모델], 작업구분, ORG작업구분...
- SQL: SELECT -- 테이블 전체 컬럼 YYYYMM, SEL_CODE, DW_SITE, 구분, 구분_ORD, 도우코드, MODEL_N_TYPE, [도우모델], 작업구분, ORG작업구분, [model], [Inch], SITE, -- 수량 컬럼 ISNULL(BOH_MONTH, 0) AS BOH_MONTH, ISNULL(IN_MONTH, 0) AS IN_MONTH...


#### selectContinuityCheck (select)
- 테이블: doi_prod_subul, uniondata
- 컬럼: 1, 'yyyyMM'), SEL_CODE, DW_SITE, 구분, 구분_ORD, 도우코드, MODEL_N_TYPE, [도우모델], 작업구분...
- SQL: WITH UnionData AS ( -- 전월 기말 (EOH) SELECT FORMAT(DATEADD(MONTH, 1, CAST(YYYYMM + '01' AS DATE)), 'yyyyMM') AS YYYYMM, SEL_CODE, DW_SITE, 구분, 구분_ORD, 도우코드, MODEL_N_TYPE, [도우모델], 작업구분, ORG작업구분, [model],...


#### selectSummary (select)
- 테이블: doi_prod_subul
- 컬럼: 0), 0)), 0))), 0
- SQL: SELECT COUNT(*) AS TOTAL_COUNT, SUM(CASE WHEN ABS((ISNULL(BOH_MONTH, 0) + ISNULL(IN_MONTH, 0) + ISNULL(BONUS_MONTH, 0)) - (ISNULL(EOH_MONTH, 0) + ISNULL(OUT_MONTH, 0) + ISNULL(LOSS_MONTH, 0))) &lt;= 0...


#### selectSummary2 (select)
- 테이블: doi_prod_subul, uniondata, continuitydata
- 컬럼: 1, 'yyyyMM'), DW_SITE, 구분, [도우모델], 0, 0)
- SQL: WITH UnionData AS ( -- 전월 기말 (EOH) SELECT FORMAT(DATEADD(MONTH, 1, CAST(YYYYMM + '01' AS DATE)), 'yyyyMM') AS YYYYMM, DW_SITE, 구분, [도우모델], 0 AS BOH_MONTH, ISNULL(EOH_MONTH, 0) AS EOH_MONTH FROM DOI_PR...


---

## 화면: C0007007 - 입고수불 자체 체크
메뉴경로: 타시스템 > 입고수불 자체 체크



### 관련 쿼리

#### selectBalanceCheck (select)
- 테이블: doi_stock
- 컬럼: --, SEL_CODE, SITE, MODEL, MODEL_TYPE, STOCK, 0), 0)), 0)))
- SQL: SELECT -- 테이블 전체 컬럼 YYYYMM, SEL_CODE, SITE, MODEL, MODEL_TYPE, STOCK, -- 수량 컬럼 ISNULL(BOH, 0) AS BOH, ISNULL([INPUT], 0) AS INPUT_QTY, ISNULL([OUT], 0) AS OUT_QTY, ISNULL(EOH, 0) AS EOH, ISNULL(INPUT_...


#### selectContinuityCheck (select)
- 테이블: doi_stock, uniondata
- 컬럼: 1, 'yyyyMM'), SEL_CODE, SITE, MODEL, MODEL_TYPE, STOCK, 0, 0)
- SQL: WITH UnionData AS ( -- 전월 기말 (EOH) SELECT FORMAT(DATEADD(MONTH, 1, CAST(YYYYMM + '01' AS DATE)), 'yyyyMM') AS YYYYMM, SEL_CODE, SITE, MODEL, MODEL_TYPE, STOCK, 0 AS BOH, ISNULL(EOH, 0) AS EOH FROM DOI...


#### selectSummary (select)
- 테이블: doi_stock
- 컬럼: 0), 0)), 0))), 0
- SQL: SELECT COUNT(*) AS TOTAL_COUNT, SUM(CASE WHEN ABS((ISNULL(BOH, 0) + ISNULL([INPUT], 0)) - (ISNULL([OUT], 0) + ISNULL(EOH, 0))) &lt;= 0.01 THEN 1 ELSE 0 END) AS NORMAL_COUNT, SUM(CASE WHEN ABS((ISNULL(...


#### selectSummary2 (select)
- 테이블: doi_stock, uniondata, continuitydata
- 컬럼: 1, 'yyyyMM'), SITE, MODEL, MODEL_TYPE, STOCK, 0, 0)
- SQL: WITH UnionData AS ( -- 전월 기말 (EOH) SELECT FORMAT(DATEADD(MONTH, 1, CAST(YYYYMM + '01' AS DATE)), 'yyyyMM') AS YYYYMM, SITE, MODEL, MODEL_TYPE, STOCK, 0 AS BOH, ISNULL(EOH, 0) AS EOH FROM DOI_STOCK WHE...


---

## 화면: C0007008 - 생산/입고/판매 체크
메뉴경로: 타시스템 > 생산/입고/판매 체크



### 관련 쿼리

#### selectProdToStock (select)
- 테이블: doi_prod_subul, doi_stock
- 컬럼: S.YYYYMM), S.SEL_CODE), S.SITE), S.MODEL), S.MODEL_TYPE), 0), CASE
- SQL: SELECT COALESCE(P.YYYYMM, S.YYYYMM) AS YYYYMM, COALESCE(P.SEL_CODE, S.SEL_CODE) AS SEL_CODE, COALESCE(P.SITE, S.SITE) AS SITE, COALESCE(P.MODEL, S.MODEL) AS MODEL, COALESCE(P.MODEL_TYPE, S.MODEL_TYPE)...


#### selectStockToSale (select)
- 테이블: doi_stock, doi_sale_resc
- 컬럼: SL.YYYYMM), SL.SEL_CODE), SL.SITE), SL.품번), S.MODEL_TYPE, 0), CASE
- SQL: SELECT COALESCE(S.YYYYMM, SL.YYYYMM) AS YYYYMM, COALESCE(S.SEL_CODE, SL.SEL_CODE) AS SEL_CODE, COALESCE(S.SITE, SL.SITE) AS SITE, COALESCE(S.MODEL, SL.품번) AS MODEL, S.MODEL_TYPE, ISNULL(S.OUT_INVOICE,...


#### selectSummary1 (select)
- 테이블: doi_prod_subul, doi_stock, data_check
- 컬럼: CASE, 0)
- SQL: WITH DATA_CHECK AS ( SELECT CASE WHEN ISNULL(P.OUT_QTY, 0) - ISNULL(S.INPUT_PROD, 0) = 0 THEN '일치' WHEN P.OUT_QTY IS NULL THEN '생산 데이터 없음' WHEN S.INPUT_PROD IS NULL THEN '입고 데이터 없음' ELSE '불일치' END AS ...


#### selectSummary2 (select)
- 테이블: doi_stock, doi_sale_resc, data_check
- 컬럼: CASE, 0)
- SQL: WITH DATA_CHECK AS ( SELECT CASE WHEN ISNULL(S.OUT_INVOICE, 0) - ISNULL(SL.판매수량, 0) = 0 THEN '일치' WHEN S.OUT_INVOICE IS NULL THEN '입고 데이터 없음' WHEN SL.판매수량 IS NULL THEN '판매 데이터 없음' ELSE '불일치' END AS ST...


---

## 화면: C0007009 - 불량반품
메뉴경로: 타시스템 > 불량반품



### 관련 쿼리

#### selectRmaData (select)
- 테이블: doi_rma_inout
- 컬럼: SEL_CODE, SITE, 모델명, YYYYMM, CASE, RMA_IN, RMA_OUT, 생성자, 생성시각
- SQL: SELECT ROW_NUMBER() OVER ( PARTITION BY YYYYMM, SEL_CODE, SITE, 모델명 ORDER BY 생성시각 ) AS ROW_SEQ, YYYYMM, SEL_CODE, SITE AS SITE_ORG, CASE WHEN SITE = 'HQ' THEN '본사' WHEN SITE = 'VN' THEN 'VINA' END AS ...


#### selectModelPopup (select)
- 테이블: doi_model_mast
- 컬럼: MODEL, SPEC, INCH
- SQL: SELECT MODEL, SPEC, INCH FROM DOI_MODEL_MAST WHERE 1=1 AND YYYYMM = '202507' ORDER BY MODEL...


#### insertRmaData (insert)
- 테이블: doi_rma_inout
- 컬럼: 
- SQL: INSERT INTO DOI_RMA_INOUT ( YYYYMM, SEL_CODE, SITE, 모델명, RMA_IN, RMA_OUT, 생성자, 생성시각 ) VALUES ( ?, ?, CASE WHEN ? = '본사' THEN 'HQ' WHEN ? = '베트남' THEN 'VN' ELSE LEFT(?, 2) END, #{모델명}, ?, ?, #{생성자}, SY...


#### updateRmaData (update)
- 테이블: doi_rma_inout, t
- 컬럼: SEL_CODE, SITE, 모델명
- SQL: ;WITH T AS ( SELECT ROW_NUMBER() OVER ( PARTITION BY YYYYMM, SEL_CODE, SITE, 모델명 ORDER BY 생성시각 ) AS ROW_SEQ, * FROM DOI_RMA_INOUT WHERE YYYYMM = ? AND SEL_CODE = ? AND SITE = ? AND 모델명 = #{모델명} ) UPDA...


#### deleteRmaData (delete)
- 테이블: doi_rma_inout, t
- 컬럼: SEL_CODE, SITE, 모델명
- SQL: ;WITH T AS ( SELECT ROW_NUMBER() OVER ( PARTITION BY YYYYMM, SEL_CODE, SITE, 모델명 ORDER BY 생성시각 ) AS ROW_SEQ, * FROM DOI_RMA_INOUT WHERE YYYYMM = ? AND SEL_CODE = ? AND SITE = ? AND 모델명 = #{모델명} ) DELE...


---

## 화면: M0001001 - Tab 0 공정입고
메뉴경로: Tab 0 공정입고
탭: TAB001101, TAB001201, TAB001301, TAB001401, TAB001501
설명: 공정입고, 공정출고, 재고실사, 재고현황, 원장정보

### 관련 쿼리

#### dupGlassId (select)
- 테이블: dw_raw_mat_proc_in
- 컬럼: 
- SQL: SELECT count(1) FROM dw_raw_mat_proc_in WHERE glass_id = ? and in_date = ?...


#### getGlassInfo (select)
- 테이블: dw_glass_mast
- 컬럼: glass_material, glass_size, glass_thickness
- SQL: SELECT glass_material , glass_size , glass_thickness FROM dw_glass_mast WHERE glass_code = ?...


#### getCutDateInfo (select)
- 테이블: dw_date_code
- 컬럼: '20'
- SQL: SELECT '20' + (SELECT chg_date FROM dw_date_code WHERE date_code = ?) + (SELECT chg_date FROM dw_date_code WHERE date_code = ?) + (SELECT chg_date FROM dw_date_code WHERE date_code = ?) AS cut_date...


#### getUnitInfo (select)
- 테이블: dw_mat_category
- 컬럼: unit
- SQL: SELECT unit FROM dw_mat_category WHERE mat_category_code = '10'...


#### getRawMatInList (select)
- 테이블: dw_raw_mat_proc_in, dw_mat_close_info, dw_raw_mat_proc_out
- 컬럼: a.glass_id, a.in_date, a.in_time, a.use_category, a.box_num, a.in_qty, a.use_qty, a.remain_qty, a.unit, a.use_yn...
- SQL: SELECT a.glass_id , a.in_date , a.in_time , a.use_category , a.box_num , a.in_qty , a.in_qty as org_in_qty , a.use_qty , a.remain_qty , a.unit , a.use_yn , a.worker_id , a.worker_name , a.glass_materi...


#### checkDupGlassId (select)
- 테이블: dw_raw_mat_proc_in
- 컬럼: glass_id, in_date
- SQL: SELECT glass_id, in_date FROM dw_raw_mat_proc_in WHERE glass_id+in_date IN <foreach item="item" collection="vo" open="(" separator="," close=")" > ?+ ? </foreach>...


#### checkUseInData (select)
- 테이블: dw_raw_mat_proc_in
- 컬럼: '/'), 'NoData')
- SQL: select COALESCE(STRING_AGG(glass_id, '/'), 'NoData') AS glassId from dw_raw_mat_proc_in a where upper(a.glass_id)+in_date in <foreach item="item" collection="vo" open="(" separator="," close=")" > upp...


#### getRawMatInInfo (select)
- 테이블: dw_raw_mat_proc_in, dw_common_code
- 컬럼: top, a.in_date, A.use_category, B.code_name, A.glass_thickness, A.glass_material, A.unit, a.remain_qty, a.use_yn, a.comments
- SQL: SELECT top 1 A.glass_id , a.in_date , A.use_category , B.code_name AS use_category_nm , A.glass_thickness , A.glass_material , A.unit ,a.remain_qty as stock_qty ,a.use_yn ,a.comments as in_comments FR...


#### getRawMatOutList (select)
- 테이블: dw_raw_mat_proc_out, dw_raw_mat_proc_in, dw_common_code, dw_mat_close_info
- 컬럼: A.out_no, A.work_date, A.shift_code, A.out_seq, A.out_date, A.out_time, A.glass_id, A.in_date, A.batch_no, A.worker_name...
- SQL: SELECT A.out_no , A.work_date , A.shift_code , A.out_seq , A.out_date , A.out_time , A.glass_id , A.in_date , A.batch_no , A.worker_name , A.line , A.step_code , A.step_nm , A.equip_no , A.equip_nm , ...


#### checkRemainQty (select)
- 테이블: dw_raw_mat_proc_in
- 컬럼: glass_id
- SQL: SELECT glass_id FROM dw_raw_mat_proc_in WHERE glass_id = ? and in_date = ? AND remain_qty - ? <![CDATA[<]]> 0...


#### checkRemainDiffQty (select)
- 테이블: dw_raw_mat_proc_in
- 컬럼: glass_id
- SQL: select glass_id from dw_raw_mat_proc_in a where upper(a.glass_id) = upper(?) and a.in_date = ? and remain_qty - ( ? - ? )<![CDATA[ < 0 ]]>...


#### selectEquipListPop (select)
- 테이블: dw_equipment_mast, dw_step_mast
- 컬럼: 'DFB1', '999', '수동', '010', '적층', '09', 'Front', '', a.설비번호, a.설비명...
- SQL: SELECT 'DFB1' AS line , '999' AS 설비번호 , '수동' AS 설비명 , '수동' AS 설비약명 , '010' AS 공정코드 , '적층' AS 공정명 , '09' AS area_code , 'Front' AS area , '' AS 비고 UNION ALL SELECT a.line , a.설비번호 , a.설비명 , a.설비약명 , a....


#### selectGlassMaterialList (select)
- 테이블: dw_glass_mast
- 컬럼: distinct, glass_thickness
- SQL: SELECT distinct glass_material, glass_thickness FROM dw_glass_mast ORDER BY glass_material, glass_thickness...


#### selectMaxStockDate (select)
- 테이블: dw_raw_mat_proc_id_stock
- 컬럼: 9, 112)), 112)
- SQL: SELECT CONVERT(VARCHAR(8), ISNULL(max(stock_date), CONVERT(VARCHAR(8), DATEADD(HOUR, 9, GETUTCDATE()), 112)), 112) AS stockDate FROM dw_raw_mat_proc_id_stock...


#### selectStockStatus (select)
- 테이블: dw_mat_close_info
- 컬럼: status
- SQL: select status from dw_mat_close_info a where a.stock_date = ? and a.mat_category_code = ? and a.mat_type_code = ?...


#### selectPreStockStatus (select)
- 테이블: dw_mat_close_info
- 컬럼: status
- SQL: select status from dw_mat_close_info a where a.stock_date = CONVERT(VARCHAR(8), DATEADD(DAY, -1, ? ), 112) and a.mat_category_code = ? and a.mat_type_code = ?...


#### selectConfirmN (select)
- 테이블: dw_raw_mat_proc_id_stock
- 컬럼: 
- SQL: select count(1) as cnt from dw_raw_mat_proc_id_stock where stock_date = ? and confirm_yn = 'N'...


#### selectRawMatIdStock (select)
- 테이블: dw_raw_mat_proc_id_stock, dw_common_code, dw_mat_close_info
- 컬럼: a.stock_date, a.glass_id, a.use_category, b.code_name, a.glass_material, a.glass_thickness, a.unit, a.prev_stock_qty, a.prev_real_stock_qty, a.in_qty...
- SQL: SELECT a.stock_date, a.glass_id, a.use_category, b.code_name as use_category_name, a.glass_material, a.glass_thickness, a.unit, a.prev_stock_qty, a.prev_real_stock_qty, a.in_qty, a.out_qty, a.good_qty...


#### createTempMatStockTable (select)
- 테이블: dw_raw_mat_proc_id_stock
- 컬럼: 
- SQL: SELECT * INTO ? FROM dw_raw_mat_proc_id_stock WHERE stock_date = ?...


#### selectRawMatMonthReport (select)
- 테이블: dw_raw_mat_proc_stock, basedata
- 컬럼: glass_material, glass_thickness, use_category, stock_date, sort_order, gubun, CASE, qty
- SQL: WITH BaseData AS ( SELECT glass_material, glass_thickness, use_category, stock_date, sort_order, gubun, CASE WHEN gubun = 'in_qty' THEN '1' WHEN gubun = 'out_qty' THEN '2' WHEN gubun = 'good_qty' THEN...


#### getDateCodeList (select)
- 테이블: dw_date_code
- 컬럼: date_code, chg_date
- SQL: SELECT date_code, chg_date FROM dw_date_code ORDER BY date_code...


#### getGlassMstList (select)
- 테이블: dw_glass_mast
- 컬럼: glass_code, glass_material, glass_size, glass_thickness
- SQL: SELECT glass_code , glass_material , glass_size , glass_thickness FROM dw_glass_mast ORDER BY glass_code...


#### checkDupGlassMst (select)
- 테이블: dw_glass_mast
- 컬럼: '/'), 'NoData')
- SQL: SELECT COALESCE(STRING_AGG(glass_code, '/'), 'NoData') AS glassCode FROM dw_glass_mast WHERE glass_code IN <foreach item="item" collection="vo" open="(" separator="," close=")" > ? </foreach>...


#### insertRawMatIn (insert)
- 테이블: dw_raw_mat_proc_in
- 컬럼: 
- SQL: INSERT INTO dw_raw_mat_proc_in ( glass_id , in_date , in_time , use_category , box_num , in_qty , use_qty , remain_qty , unit , use_yn , worker_id , worker_name , glass_material , glass_thickness , gl...


#### insertRawMatOut (insert)
- 테이블: dw_raw_mat_proc_out
- 컬럼: case, ''), 12, 14), 3)
- SQL: INSERT INTO dw_raw_mat_proc_out ( out_no , work_date , shift_code , out_seq , out_date , out_time , glass_id , in_date , batch_no , use_category , glass_material , glass_thickness , worker_name , line...


#### insertRawMatIdStock (insert)
- 테이블: dw_raw_mat_proc_id_stock, dw_raw_mat_proc_in, dw_raw_mat_proc_out, dw_mat_close_info
- 컬럼: a.stock_date, a.glass_id, a.use_category, a.glass_material, a.glass_thickness, a.unit, a.prev_stock_qty, a.prev_real_stock_qty, a.in_qty, a.out_qty...
- SQL: INSERT INTO dw_raw_mat_proc_id_stock ( stock_date, glass_id, use_category, glass_material, glass_thickness, unit, prev_stock_qty, prev_real_stock_qty, in_qty, out_qty, good_qty, error_qty, stock_qty, ...


#### insertRawMatStock (insert)
- 테이블: dw_raw_mat_proc_stock, dw_raw_mat_proc_id_stock
- 컬럼: stock_date, use_category, glass_material, glass_thickness, unit, #{workerId}
- SQL: INSERT INTO dw_raw_mat_proc_stock ( stock_date, use_category, glass_material, glass_thickness, unit, prev_stock_qty, prev_real_stock_qty, in_qty, out_qty, good_qty, error_qty, stock_qty, real_stock_qt...


#### insertMatCloseInfo (insert)
- 테이블: dw_mat_close_info, set
- 컬럼: 
- SQL: MERGE INTO dw_mat_close_info AS target USING ( SELECT ? AS stock_date, ? AS mat_category_code, ? AS mat_type_code ) AS source ON target.stock_date = source.stock_date AND target.mat_category_code = so...


#### insertGlassMst (insert)
- 테이블: dw_glass_mast
- 컬럼: 
- SQL: INSERT INTO dw_glass_mast ( glass_code , glass_material , glass_size , glass_thickness ) VALUES ( ? , ? , ? , ? )...


#### updateRawMatIn (update)
- 테이블: dw_raw_mat_proc_in
- 컬럼: 
- SQL: UPDATE dw_raw_mat_proc_in SET worker_name = ?, in_qty = isnull(?,0), remain_qty = remain_qty + ( isnull(?,0) - isnull(?,0)), comments = ? WHERE glass_id = ? and in_date = ?...


#### updateRemainQtyMinus (update)
- 테이블: dw_raw_mat_proc_in
- 컬럼: 
- SQL: UPDATE dw_raw_mat_proc_in SET use_qty = use_qty + ? , remain_qty = remain_qty - ? , use_yn = 'Y' WHERE glass_id = ? and in_date = ?...


#### updateRemainQtyPlus (update)
- 테이블: dw_raw_mat_proc_in
- 컬럼: 
- SQL: UPDATE dw_raw_mat_proc_in SET use_qty = use_qty - ? , remain_qty = remain_qty + ? , use_yn = case when ( use_qty - ? ) <![CDATA[ <=0 ]]> then 'N' else 'Y' end WHERE glass_id = ? and in_date = ?...


#### updateRemainDiffQty (update)
- 테이블: dw_raw_mat_proc_in
- 컬럼: 
- SQL: UPDATE dw_raw_mat_proc_in SET use_qty = use_qty + ( ? - ? ), remain_qty = remain_qty - ( ? - ? ), use_yn = case when ( use_qty + ( ? - ? ) ) <![CDATA[ <=0 ]]> then 'N' else 'Y' end WHERE glass_id = ? ...


#### updateRawMatOut (update)
- 테이블: dw_raw_mat_proc_out
- 컬럼: 
- SQL: UPDATE dw_raw_mat_proc_out SET worker_name = ? , line = ? , step_code = ? , step_nm = ? , equip_no = ? , equip_nm = ? , out_qty = isnull(?,0) , good_qty = isnull(?,0) - ( isnull(?,0) + isnull(?,0) + i...


#### updateRawMatIdStock (update)
- 테이블: dw_raw_mat_proc_id_stock
- 컬럼: 
- SQL: update dw_raw_mat_proc_id_stock set charger_name = ?, real_stock_qty = isnull(?,0), diff_qty = isnull(?,0) - stock_qty, confirm_yn = ?, comments = ? where stock_date = ? and glass_id = ?...


#### updatetMatCloseInfo (update)
- 테이블: dw_mat_close_info
- 컬럼: 
- SQL: update dw_mat_close_info set status = ?, update_date = getdate(), update_user = ? where stock_date = ? and mat_category_code = ? and mat_type_code = ?...


#### updateGlassMst (update)
- 테이블: dw_glass_mast
- 컬럼: 
- SQL: UPDATE dw_glass_mast SET glass_material = ? , glass_size = ? , glass_thickness = ? WHERE glass_code = ?...


#### deleteRawMatIn (delete)
- 테이블: dw_raw_mat_proc_in
- 컬럼: 
- SQL: DELETE FROM dw_raw_mat_proc_in WHERE glass_id = ? and in_date = ?...


#### deleteRawMatOut (delete)
- 테이블: dw_raw_mat_proc_out
- 컬럼: 
- SQL: DELETE FROM dw_raw_mat_proc_out WHERE out_no = ?...


#### dropTempMatStockTable (delete)
- 테이블: 
- 컬럼: 
- SQL: DROP TABLE ?...


#### deleteRawMatIdStock (delete)
- 테이블: dw_raw_mat_proc_id_stock
- 컬럼: 
- SQL: delete from dw_raw_mat_proc_id_stock where stock_date = ?...


#### deleteRawMatStock (delete)
- 테이블: dw_raw_mat_proc_stock
- 컬럼: 
- SQL: delete from dw_raw_mat_proc_stock where stock_date = ?...


#### deletetMatCloseInfo (delete)
- 테이블: dw_mat_close_info
- 컬럼: 
- SQL: delete from dw_mat_close_info where stock_date = ? and mat_category_code = ? and mat_type_code = ?...


#### deleteGlassMst (delete)
- 테이블: dw_glass_mast
- 컬럼: 
- SQL: DELETE FROM dw_glass_mast WHERE glass_code = ?...


---

## 화면: M0001002 - Tab 0 공정입고
메뉴경로: Tab 0 공정입고
탭: TAB001102, TAB001202, TAB001302, TAB001402
설명: 공정입고, 공정출고, 재고실사, 재고현황

### 관련 쿼리

#### getResinInfo (select)
- 테이블: dw_common_code
- 컬럼: code, code_name, etc1, etc2
- SQL: SELECT code , code_name , etc1 , etc2 FROM dw_common_code WHERE maj_code = '78' order by sort_order...


#### dupMaterialId (select)
- 테이블: dw_sub_mat_resin_in
- 컬럼: 
- SQL: SELECT count(1) FROM dw_sub_mat_resin_in WHERE material_id = ?...


#### getUnitInfo (select)
- 테이블: dw_mat_category
- 컬럼: unit_code, unit
- SQL: SELECT unit_code , unit FROM dw_mat_category WHERE mat_category_code = '30' AND mat_type_code = 'RESIN'...


#### checkDupResinId (select)
- 테이블: dw_sub_mat_resin_in
- 컬럼: material_id
- SQL: SELECT material_id FROM dw_sub_mat_resin_in WHERE material_id IN <foreach item="item" collection="vo" open="(" separator="," close=")" > ? </foreach>...


#### checkUseInData (select)
- 테이블: dw_sub_mat_resin_in
- 컬럼: '/'), 'NoData')
- SQL: select COALESCE(STRING_AGG(material_id, '/'), 'NoData') AS materialId from dw_sub_mat_resin_in a where upper(a.material_id) in <foreach item="item" collection="vo" open="(" separator="," close=")" > u...


#### getSubMatResinInList (select)
- 테이블: dw_sub_mat_resin_in, dw_sub_mat_resin_out, dw_mat_close_info
- 컬럼: material_id, mat_type_code, sub_mat_type_code, in_date, in_time, unit, in_qty, use_qty, remain_qty, use_yn...
- SQL: select material_id , mat_type_code , sub_mat_type_code , in_date , in_time , unit , in_qty , use_qty , remain_qty , use_yn , worker_id , worker_name , make_date , make_elapse_days , store_valid_days ,...


#### getSubMatResinInInfo (select)
- 테이블: dw_sub_mat_resin_in, dw_common_code
- 컬럼: material_id, sub_mat_type_code, b.code_name, unit, remain_qty, store_valid_days, in_date+', 2), in_date, 9...
- SQL: SELECT material_id , sub_mat_type_code , b.code_name as sub_mat_type_name , unit , remain_qty , store_valid_days , RIGHT('00' + CAST(DATEDIFF(HOUR, in_date+' '+in_time, GETDATE()) AS VARCHAR), 2) +':'...


#### getSubMatResinOutList (select)
- 테이블: dw_sub_mat_resin_out, dw_sub_mat_resin_in, dw_mat_close_info
- 컬럼: O.material_id, O.mat_type_code, O.sub_mat_type_code, O.work_date, O.shift_code, O.out_seq, O.out_date, O.out_time, O.worker_name, O.line...
- SQL: SELECT O.material_id , O.mat_type_code , O.sub_mat_type_code , O.work_date , O.shift_code , O.out_seq , O.out_date , O.out_time , O.worker_name , O.line , O.step_code , O.step_nm , O.equip_no , O.equi...


#### checkRemainQty (select)
- 테이블: dw_sub_mat_resin_in
- 컬럼: material_id
- SQL: select material_id from dw_sub_mat_resin_in a where upper(a.material_id) = upper(?) and remain_qty - ? <![CDATA[ < 0 ]]>...


#### selectMaxStockDate (select)
- 테이블: dw_sub_mat_resin_id_stock
- 컬럼: 9, 112)), 112)
- SQL: SELECT CONVERT(VARCHAR(8), ISNULL(max(stock_date), CONVERT(VARCHAR(8), DATEADD(HOUR, 9, GETUTCDATE()), 112)), 112) AS stockDate FROM dw_sub_mat_resin_id_stock...


#### selectConfirmN (select)
- 테이블: dw_sub_mat_resin_id_stock
- 컬럼: 
- SQL: select count(1) as cnt from dw_sub_mat_resin_id_stock where stock_date = ? and confirm_yn = 'N'...


#### selectSubMatResinIdStock (select)
- 테이블: dw_sub_mat_resin_id_stock, dw_common_code, dw_mat_close_info, dw_sub_mat_resin_in
- 컬럼: a.stock_date, a.material_id, a.mat_type_code, a.sub_mat_type_code, a.sub_mat_type_name, a.store_days, a.unit, a.prev_stock_qty, a.prev_real_stock_qty, a.in_qty...
- SQL: select a.stock_date, a.material_id, a.mat_type_code, a.sub_mat_type_code, a.sub_mat_type_name, a.store_days, a.unit, a.prev_stock_qty, a.prev_real_stock_qty, a.in_qty, a.out_qty, a.stock_qty, a.real_s...


#### createTempMatStockTable (select)
- 테이블: dw_sub_mat_resin_id_stock
- 컬럼: 
- SQL: SELECT * INTO ? FROM dw_sub_mat_resin_id_stock WHERE stock_date = ?...


#### selectSubMatResinMonthReport (select)
- 테이블: dw_sub_mat_resin_stock, dw_sub_mat_resin_equip_out, dw_sub_mat_resin_in, basedata, outdata, validdata, dw_common_code
- 컬럼: sub_mat_type_code, stock_date, sort_order, gubun, CASE, qty
- SQL: WITH BaseData AS ( SELECT sub_mat_type_code, stock_date, sort_order, gubun, CASE WHEN gubun = 'in_qty' THEN '10' WHEN gubun = 'out_qty' THEN '20' WHEN gubun = 'stock_qty' THEN '42' WHEN gubun = 'real_...


#### insertSubMatResinIn (insert)
- 테이블: dw_sub_mat_resin_in
- 컬럼: 
- SQL: INSERT INTO dw_sub_mat_resin_in ( material_id , mat_type_code , sub_mat_type_code , in_date , in_time , unit , in_qty , use_qty , remain_qty , use_yn , worker_id , worker_name , make_date , make_elaps...


#### insertSubMatResinOut (insert)
- 테이블: dw_sub_mat_resin_out, dw_sub_mat_resin_in
- 컬럼: #{materialId}, #{matTypeCode}, #{subMatTypeCode}, #{workDate}, #{shiftCode}, 0)+1
- SQL: INSERT INTO dw_sub_mat_resin_out ( material_id , mat_type_code , sub_mat_type_code , work_date , shift_code , out_seq , out_date , out_time , worker_name , line , step_code , step_nm , equip_no , equi...


#### insertSubMatResinIdStock (insert)
- 테이블: dw_sub_mat_resin_id_stock, dw_sub_mat_resin_in, dw_sub_mat_resin_out, dw_mat_close_info
- 컬럼: a.stock_date, a.material_id, a.mat_type_code, a.sub_mat_type_code, a.unit, a.prev_stock_qty, a.prev_real_stock_qty, a.in_qty, a.out_qty, case...
- SQL: INSERT INTO dw_sub_mat_resin_id_stock ( stock_date, material_id, mat_type_code, sub_mat_type_code, unit, prev_stock_qty, prev_real_stock_qty, in_qty, out_qty, stock_qty, real_stock_qty, diff_qty, conf...


#### insertSubMatResinStock (insert)
- 테이블: dw_sub_mat_resin_stock, dw_sub_mat_resin_id_stock
- 컬럼: stock_date, mat_type_code, sub_mat_type_code, unit, #{workerId}
- SQL: INSERT INTO dw_sub_mat_resin_stock ( stock_date, mat_type_code, sub_mat_type_code, unit, prev_stock_qty, prev_real_stock_qty, in_qty, out_qty, stock_qty, real_stock_qty, diff_qty, valid_days_past_qty,...


#### insertSubMatResinEquipOut (insert)
- 테이블: dw_sub_mat_resin_equip_out, dw_sub_mat_resin_out
- 컬럼: work_date, mat_type_code, sub_mat_type_code, equip_no, equip_nm, #{workerId}
- SQL: INSERT INTO dw_sub_mat_resin_equip_out ( stock_date, mat_type_code, sub_mat_type_code, equip_no, equip_nm, out_qty, create_date, create_user ) select work_date, mat_type_code, sub_mat_type_code, equip...


#### updateSubMatResinIn (update)
- 테이블: dw_sub_mat_resin_in
- 컬럼: 
- SQL: UPDATE dw_sub_mat_resin_in SET worker_name = ?, comments = ? WHERE material_id = ?...


#### updateRemainQtyMinus (update)
- 테이블: dw_sub_mat_resin_in
- 컬럼: 
- SQL: UPDATE dw_sub_mat_resin_in SET use_qty = use_qty + ? , remain_qty = remain_qty - ? , use_yn = 'Y' WHERE material_id = ?...


#### updateRemainQtyPlus (update)
- 테이블: dw_sub_mat_resin_in
- 컬럼: 
- SQL: UPDATE dw_sub_mat_resin_in SET use_qty = use_qty - ? , remain_qty = remain_qty + ? , use_yn = case when ( use_qty - ? ) <![CDATA[ <=0 ]]> then 'N' else 'Y' end WHERE material_id = ?...


#### updateSubMatResinOut (update)
- 테이블: dw_sub_mat_resin_out
- 컬럼: 
- SQL: UPDATE dw_sub_mat_resin_out SET worker_name = ? , line = ? , step_code = ? , step_nm = ? , equip_no = ? , equip_nm = ? , tank = ? , comments = ? WHERE material_id = ?...


#### updateSubMatResinIdStock (update)
- 테이블: dw_sub_mat_resin_id_stock
- 컬럼: 
- SQL: update dw_sub_mat_resin_id_stock set charger_name = ?, real_stock_qty = isnull(?,0), diff_qty = isnull(?,0) - stock_qty, confirm_yn = ?, comments = ? where stock_date = ? and material_id = ?...


#### deleteSubMatResinIn (delete)
- 테이블: dw_sub_mat_resin_in
- 컬럼: 
- SQL: DELETE FROM dw_sub_mat_resin_in WHERE material_id = ?...


#### deleteSubMatResinOut (delete)
- 테이블: dw_sub_mat_resin_out
- 컬럼: 
- SQL: DELETE FROM dw_sub_mat_resin_out WHERE material_id = ?...


#### dropTempMatStockTable (delete)
- 테이블: 
- 컬럼: 
- SQL: DROP TABLE ?...


#### deleteSubMatResinIdStock (delete)
- 테이블: dw_sub_mat_resin_id_stock
- 컬럼: 
- SQL: delete from dw_sub_mat_resin_id_stock where stock_date = ?...


#### deleteSubMatResinStock (delete)
- 테이블: dw_sub_mat_resin_stock
- 컬럼: 
- SQL: delete from dw_sub_mat_resin_stock where stock_date = ?...


#### deleteSubMatResinEquipOut (delete)
- 테이블: dw_sub_mat_resin_equip_out
- 컬럼: 
- SQL: delete from dw_sub_mat_resin_equip_out where stock_date = ?...


---

## 화면: M0001003 - Tab 0 공정전 입고
메뉴경로: Tab 0 공정전 입고
탭: TAB001103, TAB001203, TAB001303, TAB001403
설명: 공정전 입고, 공정출고, 재고실사, 재고현황

### 관련 쿼리

#### selectMatUnit (select)
- 테이블: dw_mat_category
- 컬럼: mat_type_name, unit
- SQL: SELECT mat_type_name, unit FROM dw_mat_category WHERE mat_category_code = ? AND mat_type_code = ?...


#### selectMatToolIn (select)
- 테이블: dw_sub_mat_tool_in, dw_sub_mat_tool_out, dw_mat_close_info
- 컬럼: a.material_id, a.mat_type_code, a.sub_mat_type_code, a.in_date, a.in_time, a.unit, a.in_qty, a.use_qty, a.remain_qty, a.use_yn...
- SQL: SELECT a.material_id, a.mat_type_code, a.sub_mat_type_code, a.in_date, a.in_time, a.unit, a.in_qty, a.use_qty, a.remain_qty, a.use_yn, a.worker_id, a.worker_name, a.comments, b.comments as out_comment...


#### selectBarcodeDupYn (select)
- 테이블: dw_sub_mat_tool_in
- 컬럼: CASE
- SQL: SELECT CASE WHEN count(1) <![CDATA[ > ]]> 0 THEN 'Y' ELSE 'N' END AS dupYn FROM DW_SUB_MAT_TOOL_IN a WHERE a.material_id = ?...


#### checkUseInData (select)
- 테이블: dw_sub_mat_tool_in
- 컬럼: '/'), 'NoData')
- SQL: select COALESCE(STRING_AGG(material_id, '/'), 'NoData') AS materialId from DW_SUB_MAT_TOOL_IN a where upper(a.material_id) in <foreach item="item" collection="vo" open="(" separator="," close=")" > up...


#### checkInsertInData (select)
- 테이블: dw_sub_mat_tool_in
- 컬럼: '/'), 'NoData')
- SQL: select COALESCE(STRING_AGG(material_id, '/'), 'NoData') AS materialId from DW_SUB_MAT_TOOL_IN a where upper(a.material_id) in <foreach item="item" collection="vo" open="(" separator="," close=")" > up...


#### selectMatToolOut (select)
- 테이블: dw_sub_mat_tool_out, dw_common_code, dw_sub_mat_tool_in, dw_mat_close_info
- 컬럼: a.material_id, a.mat_type_code, a.sub_mat_type_code, b.code_name, a.work_date, a.shift_code, a.out_seq, a.out_date, a.out_time, a.worker_name...
- SQL: SELECT a.material_id, a.mat_type_code, a.sub_mat_type_code, b.code_name as sub_mat_type_name, a.work_date, a.shift_code, a.out_seq, a.out_date, a.out_time, a.worker_name, a.use_category, a.line, a.ste...


#### selectBarcodeInfo (select)
- 테이블: dw_sub_mat_tool_in, dw_common_code
- 컬럼: a.material_id, a.sub_mat_type_code, b.code_name, a.remain_qty, a.use_yn, case, b.etc1, 0, 'N', a.comments
- SQL: select a.material_id, a.sub_mat_type_code, b.code_name as sub_mat_type_name, a.remain_qty, a.use_yn, case when a.sub_mat_type_code = 'FGRIND' then '정삭' else b.code_name end as '사용구분', b.etc1 as 최대사용횟수...


#### checkRemainQty (select)
- 테이블: dw_sub_mat_tool_in
- 컬럼: material_id
- SQL: select material_id from dw_sub_mat_tool_in a where upper(a.material_id) = upper(?) and remain_qty - ? <![CDATA[ < 0 ]]>...


#### checkEquipTool (select)
- 테이블: dw_sub_mat_tool_out
- 컬럼: 
- SQL: select count(*) as use_count from dw_sub_mat_tool_out where line = ? and equip_no = ? and 사용구분 = #{사용구분} and 사용완료여부 = 'N' and 폐기여부 = 'N'...


#### selectMaxStockDate (select)
- 테이블: dw_sub_mat_tool_id_stock
- 컬럼: 9, 112)), 112)
- SQL: SELECT CONVERT(VARCHAR(8), ISNULL(max(stock_date), CONVERT(VARCHAR(8), DATEADD(HOUR, 9, GETUTCDATE()), 112)), 112) AS stockDate FROM dw_sub_mat_tool_id_stock...


#### selectConfirmN (select)
- 테이블: dw_sub_mat_tool_id_stock
- 컬럼: 
- SQL: select count(1) as cnt from dw_sub_mat_tool_id_stock where stock_date = ? and confirm_yn = 'N'...


#### selectSubMatToolIdStock (select)
- 테이블: dw_sub_mat_tool_id_stock, dw_common_code, dw_mat_close_info
- 컬럼: a.stock_date, a.material_id, a.mat_type_code, a.sub_mat_type_code, b.code_name, a.unit, a.prev_stock_qty, a.prev_real_stock_qty, a.in_qty, a.out_qty...
- SQL: SELECT a.stock_date, a.material_id, a.mat_type_code, a.sub_mat_type_code, b.code_name as sub_mat_type_name, a.unit, a.prev_stock_qty, a.prev_real_stock_qty, a.in_qty, a.out_qty, a.error_work_qty, a.er...


#### createTempMatStockTable (select)
- 테이블: dw_sub_mat_tool_id_stock
- 컬럼: 
- SQL: SELECT * INTO ? FROM dw_sub_mat_tool_id_stock WHERE stock_date = ?...


#### selectSubMatToolMonthReport (select)
- 테이블: dw_sub_mat_tool_stock, basedata, dw_common_code
- 컬럼: sub_mat_type_code, stock_date, sort_order, gubun, CASE, qty
- SQL: WITH BaseData AS ( SELECT sub_mat_type_code, stock_date, sort_order, gubun, CASE WHEN gubun = 'in_qty' THEN '1' WHEN gubun = 'out_qty' THEN '2' WHEN gubun = 'loss_qty' THEN '3' WHEN gubun = 'stock_qty...


#### insertInData (insert)
- 테이블: dw_sub_mat_tool_in
- 컬럼: 
- SQL: INSERT INTO dw_sub_mat_tool_in ( material_id, mat_type_code, sub_mat_type_code, in_date, in_time, unit, in_qty, use_qty, remain_qty, use_yn, worker_id, worker_name, comments, create_date, create_user ...


#### insertOutData (insert)
- 테이블: dw_sub_mat_tool_out
- 컬럼: 0)+1
- SQL: INSERT INTO dw_sub_mat_tool_out ( material_id, mat_type_code, sub_mat_type_code, work_date, shift_code, out_seq, out_date, out_time, worker_name, use_category, line, step_code, step_nm, equip_no, equi...


#### insertSubMatToolIdStock (insert)
- 테이블: dw_sub_mat_tool_id_stock, dw_sub_mat_tool_in, dw_sub_mat_tool_out, dw_mat_close_info
- 컬럼: a.stock_date, a.material_id, a.mat_type_code, a.sub_mat_type_code, a.unit, a.prev_stock_qty, a.prev_real_stock_qty, a.in_qty, a.out_qty, a.error_work_qty...
- SQL: INSERT INTO dw_sub_mat_tool_id_stock ( stock_date, material_id, mat_type_code, sub_mat_type_code, unit, prev_stock_qty, prev_real_stock_qty, in_qty, out_qty, error_work_qty, error_mat_qty, stock_qty, ...


#### insertSubMatToolStock (insert)
- 테이블: dw_sub_mat_tool_stock, dw_sub_mat_tool_id_stock
- 컬럼: stock_date, mat_type_code, sub_mat_type_code, unit, #{workerId}
- SQL: INSERT INTO dw_sub_mat_tool_stock ( stock_date, mat_type_code, sub_mat_type_code, unit, prev_stock_qty, prev_real_stock_qty, in_qty, out_qty, error_work_qty, error_mat_qty, stock_qty, real_stock_qty, ...


#### updateInData (update)
- 테이블: dw_sub_mat_tool_in
- 컬럼: 
- SQL: UPDATE dw_sub_mat_tool_in SET sub_mat_type_code = ?, worker_name = ?, comments = ? WHERE material_id = ?...


#### updateRemainQtyMinus (update)
- 테이블: dw_sub_mat_tool_in
- 컬럼: 
- SQL: UPDATE dw_sub_mat_tool_in SET use_qty = use_qty + ?, remain_qty = remain_qty - ?, use_yn = 'Y' WHERE material_id = ?...


#### updateRemainQtyPlus (update)
- 테이블: dw_sub_mat_tool_in
- 컬럼: 
- SQL: UPDATE dw_sub_mat_tool_in SET use_qty = use_qty - ?, remain_qty = remain_qty + ?, use_yn = case when ( use_qty - ? ) <![CDATA[ <=0 ]]> then 'N' else 'Y' end WHERE material_id = ?...


#### updateOutData (update)
- 테이블: dw_sub_mat_tool_out
- 컬럼: 
- SQL: UPDATE dw_sub_mat_tool_out SET worker_name = ?, use_category = ?, line = ?, step_code = ?, step_nm = ?, equip_no = ?, equip_nm = ?, error_work_qty = ?, error_mat_qty = ?, 사용구분 = #{사용구분}, 최대사용횟수 = #{최대...


#### updateSubMatToolIdStock (update)
- 테이블: dw_sub_mat_tool_id_stock
- 컬럼: 
- SQL: update dw_sub_mat_tool_id_stock set charger_name = ?, real_stock_qty = isnull(?,0), diff_qty = isnull(?,0) - stock_qty, confirm_yn = ?, comments = ? where stock_date = ? and material_id = ?...


#### deleteInData (delete)
- 테이블: dw_sub_mat_tool_in
- 컬럼: 
- SQL: DELETE FROM dw_sub_mat_tool_in WHERE material_id = ?...


#### deleteOutData (delete)
- 테이블: dw_sub_mat_tool_out
- 컬럼: 
- SQL: DELETE FROM dw_sub_mat_tool_out WHERE material_id = ?...


#### dropTempMatStockTable (delete)
- 테이블: 
- 컬럼: 
- SQL: DROP TABLE ?...


#### deleteSubMatToolIdStock (delete)
- 테이블: dw_sub_mat_tool_id_stock
- 컬럼: 
- SQL: delete from dw_sub_mat_tool_id_stock where stock_date = ?...


#### deleteSubMatToolStock (delete)
- 테이블: dw_sub_mat_tool_stock
- 컬럼: 
- SQL: delete from dw_sub_mat_tool_stock where stock_date = ?...


---

## 화면: M0001004 - Tab 0 공정전 입고
메뉴경로: Tab 0 공정전 입고
탭: TAB001104, TAB001204, TAB001504, TAB001304, TAB001404, TAB001604
설명: 공정전 입고, 공정출고, 불량발생, 재고실사, 재고현황, Model별 필름정보

### 관련 쿼리

#### selectMatFilmIn (select)
- 테이블: dw_sub_mat_film_in, dw_sub_mat_film_out, dw_mat_close_info
- 컬럼: a.material_id, a.mat_type_code, a.sub_mat_type_code, a.in_date, a.in_time, a.prod_category, a.model_code, a.film_name, a.unit, a.in_qty...
- SQL: SELECT a.material_id, a.mat_type_code, a.sub_mat_type_code, a.in_date, a.in_time, a.prod_category, a.model_code, a.film_name, a.unit, a.in_qty, a.use_qty, a.remain_qty, a.use_yn, a.worker_id, a.worker...


#### selectBarcodeModelInfo (select)
- 테이블: dw_sub_mat_film_in, dw_model_code_info, dw_common_code
- 컬럼: a.dup_yn, #{materialId}, ''), b.division, b.sdc_code, b.sub_mat_type_code, c.code_name
- SQL: select a.dup_yn, ? as material_id, COALESCE(b.model_code,'') as model_code, b.division, b.sdc_code, b.sub_mat_type_code, c.code_name as film_name from ( SELECT CASE WHEN count(1) <![CDATA[ > ]]> 0 THE...


#### checkUseInData (select)
- 테이블: dw_sub_mat_film_in
- 컬럼: '/'), 'NoData')
- SQL: select COALESCE(STRING_AGG(material_id, '/'), 'NoData') AS materialId from dw_sub_mat_film_in a where upper(a.material_id) in <foreach item="item" collection="vo" open="(" separator="," close=")" > up...


#### checkInsertInData (select)
- 테이블: dw_sub_mat_film_in
- 컬럼: '/'), 'NoData')
- SQL: select COALESCE(STRING_AGG(material_id, '/'), 'NoData') AS materialId from dw_sub_mat_film_in a where upper(a.material_id) in <foreach item="item" collection="vo" open="(" separator="," close=")" > up...


#### selectMatFilmOut (select)
- 테이블: d88_pfl, dw_sub_mat_film_out, dw_sub_mat_film_in, dw_common_code, dw_mat_close_info, pfl_log
- 컬럼: sub_mat_type_code, material_id, work_date, 설비호기
- SQL: WITH pfl_log AS ( select sub_mat_type_code, material_id, work_date, 설비호기, count(distinct cell_id) log_qty from ( select sub_mat_type_code, material_id, start_yyyymmdd, start_hhmmss, <![CDATA[ case whe...


#### selectBarcodeInfo (select)
- 테이블: d88_pfl, dw_sub_mat_film_in, dw_common_code
- 컬럼: a.material_id, a.sub_mat_type_code, a.film_name, a.prod_category, c.code_name, a.model_code, a.use_qty, a.remain_qty, a.use_yn, a.comments...
- SQL: select a.material_id, a.sub_mat_type_code, a.film_name, a.prod_category, c.code_name as prod_category_name, a.model_code, a.use_qty, a.remain_qty, a.remain_qty as stock_qty, a.use_yn, a.comments as in...


#### selectOutLogQty (select)
- 테이블: d88_pfl
- 컬럼: 
- SQL: select count(distinct cell_id) as log_qty from d88_PFL공정LOG파일 a where a.설비호기 = ? and ( ?='FRONT' AND a.film_id_하부 = ? or ?='BACK' AND a.film_id_상부 = ? ) AND ( ? = 'D' and START_TIME BETWEEN ?+' 080000...


#### checkRemainQty (select)
- 테이블: dw_sub_mat_film_in
- 컬럼: material_id
- SQL: select material_id from dw_sub_mat_film_in a where upper(a.material_id) = upper(?) and remain_qty - ? <![CDATA[ < 0 ]]>...


#### checkRemainDiffQty (select)
- 테이블: dw_sub_mat_film_in
- 컬럼: material_id
- SQL: select material_id from dw_sub_mat_film_in a where upper(a.material_id) = upper(?) and remain_qty - ( ? - ? )<![CDATA[ < 0 ]]>...


#### selectMatFilmError (select)
- 테이블: dw_sub_mat_film_out, dw_common_code, dw_sub_mat_film_error
- 컬럼: a.work_date, a.shift_code, c.code_name, a.prod_category, d.code_name, a.model_code, a.line, a.step_code, a.step_nm, a.equip_no...
- SQL: select a.work_date, a.shift_code, c.code_name as shift_name, a.prod_category, d.code_name as prod_category_name, a.model_code, a.line, a.step_code, a.step_nm, a.equip_no, a.equip_nm, a.unit, a.worker_...


#### selectMaxStockDate (select)
- 테이블: dw_sub_mat_film_id_stock
- 컬럼: 9, 112)), 112)
- SQL: SELECT CONVERT(VARCHAR(8), ISNULL(max(stock_date), CONVERT(VARCHAR(8), DATEADD(HOUR, 9, GETUTCDATE()), 112)), 112) AS stockDate FROM dw_sub_mat_film_id_stock...


#### selectConfirmN (select)
- 테이블: dw_sub_mat_film_id_stock
- 컬럼: 
- SQL: select count(1) as cnt from dw_sub_mat_film_id_stock where stock_date = ? and confirm_yn = 'N'...


#### selectSubMatFilmIdStock (select)
- 테이블: dw_sub_mat_film_id_stock, dw_common_code, dw_mat_close_info
- 컬럼: a.stock_date, a.material_id, a.mat_type_code, a.sub_mat_type_code, a.prod_category, b.code_name, a.model_code, a.film_name, a.unit, a.prev_stock_qty...
- SQL: SELECT a.stock_date, a.material_id, a.mat_type_code, a.sub_mat_type_code, a.prod_category, b.code_name as prod_category_name, a.model_code, a.film_name, a.unit, a.prev_stock_qty, a.prev_real_stock_qty...


#### createTempMatStockTable (select)
- 테이블: dw_sub_mat_film_id_stock
- 컬럼: 
- SQL: SELECT * INTO ? FROM dw_sub_mat_film_id_stock WHERE stock_date = ?...


#### selectSubMatFilmMonthReport (select)
- 테이블: dw_sub_mat_film_stock, basedata, dw_common_code
- 컬럼: prod_category, model_code, sub_mat_type_code, film_name, stock_date, sort_order, gubun, CASE, qty
- SQL: WITH BaseData AS ( SELECT prod_category, model_code, sub_mat_type_code, film_name, stock_date, sort_order, gubun, CASE WHEN gubun = 'in_qty' THEN '1' WHEN gubun = 'out_qty' THEN '2' WHEN gubun = 'loss...


#### selectModelCodeInfo (select)
- 테이블: dw_model_code_info
- 컬럼: model_code, division, sdc_code, film_front_code, film_back_code
- SQL: SELECT model_code, division, sdc_code, film_front_code, film_back_code FROM dw_model_code_info a where 1 = 1 order by model_code, division, sdc_code, film_front_code, film_back_code...


#### checkModelData (select)
- 테이블: dw_model_code_info
- 컬럼: '/'), 'NoData')
- SQL: select COALESCE(STRING_AGG(model_code+'-'+division, '/'), 'NoData') AS model from dw_model_code_info a where upper(a.model_code) + '-' + a.division in <foreach item="item" collection="vo" open="(" sep...


#### insertInData (insert)
- 테이블: dw_sub_mat_film_in
- 컬럼: 
- SQL: INSERT INTO dw_sub_mat_film_in ( material_id, mat_type_code, sub_mat_type_code, in_date, in_time, prod_category, model_code, film_name, unit, in_qty, use_qty, remain_qty, use_yn, worker_id, worker_nam...


#### insertOutData (insert)
- 테이블: dw_sub_mat_film_out
- 컬럼: case, ''), 12, 14), 3)
- SQL: INSERT INTO dw_sub_mat_film_out ( out_no, mat_type_code, sub_mat_type_code, work_date, shift_code, out_seq, out_date, out_time, material_id, prod_category, model_code, film_name, worker_name, line, st...


#### insertSubMatFilmIdStock (insert)
- 테이블: dw_sub_mat_film_id_stock, dw_sub_mat_film_in, dw_sub_mat_film_out, dw_mat_close_info
- 컬럼: a.stock_date, a.material_id, a.mat_type_code, a.sub_mat_type_code, a.prod_category, a.model_code, a.film_name, a.unit, a.prev_stock_qty, a.prev_real_stock_qty...
- SQL: INSERT INTO dw_sub_mat_film_id_stock ( stock_date, material_id, mat_type_code, sub_mat_type_code, prod_category, model_code, film_name, unit, prev_stock_qty, prev_real_stock_qty, in_qty, out_qty, stoc...


#### insertSubMatFilmStock (insert)
- 테이블: dw_sub_mat_film_stock, dw_sub_mat_film_id_stock, dw_sub_mat_film_error
- 컬럼: a.stock_date, a.mat_type_code, a.sub_mat_type_code, a.prod_category, a.model_code, a.film_name, a.unit, 0), #{workerId}
- SQL: INSERT INTO dw_sub_mat_film_stock ( stock_date, mat_type_code, sub_mat_type_code, prod_category, model_code, film_name, unit, prev_stock_qty, prev_real_stock_qty, in_qty, out_qty, error_qty, error_pm_...


#### updateInData (update)
- 테이블: dw_sub_mat_film_in
- 컬럼: 
- SQL: UPDATE dw_sub_mat_film_in SET sub_mat_type_code = ?, worker_name = ?, in_qty = ?, remain_qty = ?, comments = ? WHERE material_id = ?...


#### updateRemainQtyMinus (update)
- 테이블: dw_sub_mat_film_in
- 컬럼: 
- SQL: UPDATE dw_sub_mat_film_in SET use_qty = use_qty + ?, remain_qty = remain_qty - ?, use_yn = 'Y' WHERE material_id = ?...


#### updateRemainQtyPlus (update)
- 테이블: dw_sub_mat_film_in
- 컬럼: 
- SQL: UPDATE dw_sub_mat_film_in SET use_qty = use_qty - ?, remain_qty = remain_qty + ?, use_yn = case when ( use_qty - ? ) <![CDATA[ <=0 ]]> then 'N' else 'Y' end WHERE material_id = ?...


#### updateRemainDiffQty (update)
- 테이블: dw_sub_mat_film_in
- 컬럼: 
- SQL: UPDATE dw_sub_mat_film_in SET use_qty = use_qty + ( ? - ? ), remain_qty = remain_qty - ( ? - ? ), use_yn = case when ( use_qty + ( ? - ? ) ) <![CDATA[ <=0 ]]> then 'N' else 'Y' end WHERE material_id =...


#### updateOutData (update)
- 테이블: dw_sub_mat_film_out
- 컬럼: 
- SQL: UPDATE dw_sub_mat_film_out SET worker_name = ?, line = ?, step_code = ?, step_nm = ?, equip_no = ?, equip_nm = ?, out_qty = isnull(?,0), good_qty = isnull(?,0) - ( isnull(?,0) + isnull(?,0) + isnull(?...


#### updateMatFilmError (update)
- 테이블: dw_sub_mat_film_error, set
- 컬럼: 
- SQL: MERGE INTO dw_sub_mat_film_error AS target USING ( VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) ) AS source ( work_date, shift_code, prod_category, model_...


#### updateSubMatFilmIdStock (update)
- 테이블: dw_sub_mat_film_id_stock
- 컬럼: 
- SQL: update dw_sub_mat_film_id_stock set charger_name = ?, real_stock_qty = isnull(?,0), diff_qty = isnull(?,0) - stock_qty, confirm_yn = ?, comments = ? where stock_date = ? and material_id = ?...


#### updateModelCodeInfo (update)
- 테이블: dw_model_code_info
- 컬럼: 
- SQL: UPDATE dw_model_code_info SET division = ?, sdc_code = ?, film_front_code = ?, film_back_code = ? WHERE model_code = ?...


#### deleteInData (delete)
- 테이블: dw_sub_mat_film_in
- 컬럼: 
- SQL: DELETE FROM dw_sub_mat_film_in WHERE material_id = ?...


#### deleteOutData (delete)
- 테이블: dw_sub_mat_film_out
- 컬럼: 
- SQL: DELETE FROM dw_sub_mat_film_out WHERE out_no = ?...


#### dropTempMatStockTable (delete)
- 테이블: 
- 컬럼: 
- SQL: DROP TABLE ?...


#### deleteSubMatFilmIdStock (delete)
- 테이블: dw_sub_mat_film_id_stock
- 컬럼: 
- SQL: delete from dw_sub_mat_film_id_stock where stock_date = ?...


#### deleteSubMatFilmStock (delete)
- 테이블: dw_sub_mat_film_stock
- 컬럼: 
- SQL: delete from dw_sub_mat_film_stock where stock_date = ?...


#### deleteModelCodeInfo (delete)
- 테이블: dw_model_code_info
- 컬럼: 
- SQL: delete from dw_model_code_info where model_code = ?...


---

## 화면: M0001005 - Tab 0 공정전 입고
메뉴경로: Tab 0 공정전 입고
탭: TAB001105, TAB001205, TAB001305, TAB001405, TAB001505
설명: 공정전 입고, 공정출고, 재고실사, 재고현황, Tray코드별 모델정보

### 관련 쿼리

#### selectMatTrayIn (select)
- 테이블: dw_sub_mat_tray_in, dw_sub_mat_tray_out, dw_mat_close_info
- 컬럼: a.material_id, a.mat_type_code, a.sub_mat_type_code, a.in_date, a.in_time, a.model, a.tray_code, a.unit, a.in_qty, a.use_qty...
- SQL: SELECT a.material_id, a.mat_type_code, a.sub_mat_type_code, a.in_date, a.in_time, a.model, a.tray_code, a.unit, a.in_qty, a.use_qty, a.remain_qty, a.use_yn, a.worker_id, a.worker_name, a.comments, b.o...


#### selectBarcodeModelInfo (select)
- 테이블: dw_sub_mat_tray_in, dw_tray_code_info
- 컬럼: a.dup_yn, #{materialId}, #{trayCode}, ''), CASE, 29, 2)), 2)
- SQL: select a.dup_yn, ? as material_id, ? as tray_code, COALESCE(b.model,'') as model, CASE WHEN ISNUMERIC(SUBSTRING(?, 29,2)) = 1 THEN CAST(SUBSTRING(?, 29,2) AS INT) ELSE 0 END AS in_qty from ( SELECT CA...


#### checkUseInData (select)
- 테이블: dw_sub_mat_tray_in
- 컬럼: '/'), 'NoData')
- SQL: select COALESCE(STRING_AGG(material_id, '/'), 'NoData') AS materialId from dw_sub_mat_tray_in a where upper(a.material_id)+in_date in <foreach item="item" collection="vo" open="(" separator="," close=...


#### checkInsertInData (select)
- 테이블: dw_sub_mat_tray_in
- 컬럼: '/'), 'NoData')
- SQL: select COALESCE(STRING_AGG(material_id, '/'), 'NoData') AS materialId from dw_sub_mat_tray_in a where upper(a.material_id)+in_date in <foreach item="item" collection="vo" open="(" separator="," close=...


#### selectUseEquipList (select)
- 테이블: dw_equipment_mast, dw_step_mast
- 컬럼: a.line, a.설비번호, a.설비명, a.설비약명, a.chamber, a.공정코드, b.공정약어, a.공정구분, a.area, a.비고
- SQL: SELECT a.line , a.설비번호 , a.설비명 , a.설비약명 , a.chamber , a.공정코드 , b.공정약어 as 공정명 , a.공정구분 as area_code , a.area , a.비고 FROM dw_equipment_mast a LEFT OUTER JOIN dw_step_mast b ON ( a.line = b.line and a.공정...


#### selectMatTrayOut (select)
- 테이블: dw_sub_mat_tray_out, dw_sub_mat_tray_in, dw_common_code, dw_mat_close_info
- 컬럼: a.out_no, a.mat_type_code, a.sub_mat_type_code, c.code_name, a.work_date, a.shift_code, a.out_seq, a.out_date, a.out_time, a.material_id...
- SQL: SELECT a.out_no, a.mat_type_code, a.sub_mat_type_code, c.code_name as sub_mat_type_name, a.work_date, a.shift_code, a.out_seq, a.out_date, a.out_time, a.material_id, a.in_date, a.model, a.worker_name,...


#### selectBarcodeInfo (select)
- 테이블: dw_sub_mat_tray_in, dw_common_code
- 컬럼: top, a.in_date, a.sub_mat_type_code, b.code_name, a.model, a.tray_code, a.use_qty, a.remain_qty, a.use_yn, a.comments
- SQL: select top 1 a.material_id, a.in_date, a.sub_mat_type_code, b.code_name as sub_mat_type_name, a.model, a.tray_code, a.use_qty, a.remain_qty, a.remain_qty as stock_qty, a.use_yn, a.comments as in_comme...


#### checkRemainQty (select)
- 테이블: dw_sub_mat_tray_in
- 컬럼: material_id
- SQL: select material_id from dw_sub_mat_tray_in a where upper(a.material_id) = upper(?) and in_date = ? and remain_qty - ? <![CDATA[ < 0 ]]>...


#### checkRemainDiffQty (select)
- 테이블: dw_sub_mat_tray_in
- 컬럼: material_id
- SQL: select material_id from dw_sub_mat_tray_in a where upper(a.material_id) = upper(?) and in_date = ? and remain_qty - ( ? - ? )<![CDATA[ < 0 ]]>...


#### selectMaxStockDate (select)
- 테이블: dw_sub_mat_tray_id_stock
- 컬럼: 9, 112)), 112)
- SQL: SELECT CONVERT(VARCHAR(8), ISNULL(max(stock_date), CONVERT(VARCHAR(8), DATEADD(HOUR, 9, GETUTCDATE()), 112)), 112) AS stockDate FROM dw_sub_mat_tray_id_stock...


#### selectConfirmN (select)
- 테이블: dw_sub_mat_tray_id_stock
- 컬럼: 
- SQL: select count(1) as cnt from dw_sub_mat_tray_id_stock where stock_date = ? and confirm_yn = 'N'...


#### selectSubMatTrayIdStock (select)
- 테이블: dw_sub_mat_tray_id_stock, dw_common_code, dw_mat_close_info
- 컬럼: a.stock_date, a.material_id, a.mat_type_code, a.sub_mat_type_code, b.code_name, a.model, a.unit, a.prev_stock_qty, a.prev_real_stock_qty, a.in_qty...
- SQL: SELECT a.stock_date, a.material_id, a.mat_type_code, a.sub_mat_type_code, b.code_name as sub_mat_type_name, a.model, a.unit, a.prev_stock_qty, a.prev_real_stock_qty, a.in_qty, a.out_qty, a.use_qty, a....


#### createTempMatStockTable (select)
- 테이블: dw_sub_mat_tray_id_stock
- 컬럼: 
- SQL: SELECT * INTO ? FROM dw_sub_mat_tray_id_stock WHERE stock_date = ?...


#### selectSubMatTrayMonthReport (select)
- 테이블: dw_sub_mat_tray_stock, basedata
- 컬럼: model, stock_date, sort_order, gubun, CASE, qty
- SQL: WITH BaseData AS ( SELECT model, stock_date, sort_order, gubun, CASE WHEN gubun = 'in_qty' THEN '1' WHEN gubun = 'out_qty' THEN '2' WHEN gubun = 'loss_qty' THEN '3' WHEN gubun = 'use_qty' THEN '4' WHE...


#### selectTrayCodeInfo (select)
- 테이블: dw_tray_code_info
- 컬럼: tray_code, model
- SQL: SELECT tray_code, model FROM dw_tray_code_info a where 1 = 1 order by tray_code, model...


#### checkTrayCodeData (select)
- 테이블: dw_tray_code_info
- 컬럼: '/'), 'NoData')
- SQL: select COALESCE(STRING_AGG(tray_code, '/'), 'NoData') AS trayCode from dw_tray_code_info a where upper(a.tray_code) in <foreach item="item" collection="vo" open="(" separator="," close=")" > upper(?) ...


#### insertInData (insert)
- 테이블: dw_sub_mat_tray_in
- 컬럼: 
- SQL: INSERT INTO dw_sub_mat_tray_in ( material_id, mat_type_code, sub_mat_type_code, in_date, in_time, model, tray_code, unit, in_qty, use_qty, remain_qty, use_yn, worker_id, worker_name, comments, create_...


#### insertOutData (insert)
- 테이블: dw_sub_mat_tray_out
- 컬럼: case, ''), 12, 14), 3)
- SQL: INSERT INTO dw_sub_mat_tray_out ( a.out_no, a.mat_type_code, a.sub_mat_type_code, a.work_date, a.shift_code, a.out_seq, a.out_date, a.out_time, a.material_id, a.in_date, a.model, a.worker_name, a.line...


#### insertSubMatTrayIdStock (insert)
- 테이블: dw_sub_mat_tray_id_stock, dw_sub_mat_tray_in, dw_sub_mat_tray_out, dw_mat_close_info
- 컬럼: a.stock_date, a.material_id, a.mat_type_code, a.sub_mat_type_code, a.model, a.unit, a.prev_stock_qty, a.prev_real_stock_qty, a.in_qty, a.out_qty...
- SQL: INSERT INTO dw_sub_mat_tray_id_stock ( stock_date, material_id, mat_type_code, sub_mat_type_code, model, unit, prev_stock_qty, prev_real_stock_qty, in_qty, out_qty, use_qty, error_qty, stock_qty, real...


#### insertSubMatTrayStock (insert)
- 테이블: dw_sub_mat_tray_stock, dw_sub_mat_tray_id_stock
- 컬럼: a.stock_date, a.mat_type_code, a.sub_mat_type_code, a.model, a.unit, 0), #{workerId}
- SQL: INSERT INTO dw_sub_mat_tray_stock ( stock_date, mat_type_code, sub_mat_type_code, model, unit, prev_stock_qty, prev_real_stock_qty, in_qty, out_qty, use_qty, error_qty, stock_qty, real_stock_qty, diff...


#### updateInData (update)
- 테이블: dw_sub_mat_tray_in
- 컬럼: 
- SQL: UPDATE dw_sub_mat_tray_in SET sub_mat_type_code = ?, worker_name = ?, in_qty = ?, remain_qty = ?, comments = ? WHERE material_id = ? and in_date = ?...


#### updateRemainQtyMinus (update)
- 테이블: dw_sub_mat_tray_in
- 컬럼: 
- SQL: UPDATE dw_sub_mat_tray_in SET use_qty = use_qty + ?, remain_qty = remain_qty - ?, use_yn = 'Y' WHERE material_id = ? and in_date = ?...


#### updateRemainQtyPlus (update)
- 테이블: dw_sub_mat_tray_in
- 컬럼: 
- SQL: UPDATE dw_sub_mat_tray_in SET use_qty = use_qty - ?, remain_qty = remain_qty + ?, use_yn = case when ( use_qty - ? ) <![CDATA[ <=0 ]]> then 'N' else 'Y' end WHERE material_id = ? and in_date = ?...


#### updateRemainDiffQty (update)
- 테이블: dw_sub_mat_tray_in
- 컬럼: 
- SQL: UPDATE dw_sub_mat_tray_in SET use_qty = use_qty + ( ? - ? ), remain_qty = remain_qty - ( ? - ? ), use_yn = case when ( use_qty + ( ? - ? ) ) <![CDATA[ <=0 ]]> then 'N' else 'Y' end WHERE material_id =...


#### updateOutData (update)
- 테이블: dw_sub_mat_tray_out
- 컬럼: 
- SQL: UPDATE dw_sub_mat_tray_out SET worker_name = ?, line = ?, step_code = ?, step_nm = ?, equip_no = ?, equip_nm = ?, out_qty = isnull(?,0) + isnull(?,0), use_qty = ?, error_qty = ?, comments = ? WHERE ou...


#### updateSubMatTrayIdStock (update)
- 테이블: dw_sub_mat_tray_id_stock
- 컬럼: 
- SQL: update dw_sub_mat_tray_id_stock set charger_name = ?, real_stock_qty = isnull(?,0), diff_qty = isnull(?,0) - stock_qty, confirm_yn = ?, comments = ? where stock_date = ? and material_id = ?...


#### updateTrayCodeInfo (update)
- 테이블: dw_tray_code_info
- 컬럼: 
- SQL: UPDATE dw_tray_code_info SET model = ? WHERE tray_code = ?...


#### deleteInData (delete)
- 테이블: dw_sub_mat_tray_in
- 컬럼: 
- SQL: DELETE FROM dw_sub_mat_tray_in WHERE material_id = ? and in_date = ?...


#### deleteOutData (delete)
- 테이블: dw_sub_mat_tray_out
- 컬럼: 
- SQL: DELETE FROM dw_sub_mat_tray_out WHERE out_no = ?...


#### dropTempMatStockTable (delete)
- 테이블: 
- 컬럼: 
- SQL: DROP TABLE ?...


#### deleteSubMatTrayIdStock (delete)
- 테이블: dw_sub_mat_tray_id_stock
- 컬럼: 
- SQL: delete from dw_sub_mat_tray_id_stock where stock_date = ?...


#### deleteSubMatTrayStock (delete)
- 테이블: dw_sub_mat_tray_stock
- 컬럼: 
- SQL: delete from dw_sub_mat_tray_stock where stock_date = ?...


#### deleteTrayCodeInfo (delete)
- 테이블: dw_tray_code_info
- 컬럼: 
- SQL: delete from dw_tray_code_info where tray_code = ?...


---

## 화면: M0001006 - Tab 0 공정전 입고
메뉴경로: Tab 0 공정전 입고
탭: TAB001106, TAB001206, TAB001506, TAB001306, TAB001406
설명: 공정전 입고, 공정투입, 공정창고 반납, 재고실사, 재고현황

### 관련 쿼리

#### selectMatChemicalIn (select)
- 테이블: dw_sub_mat_chemical_in, dw_sub_mat_chemical_out, dw_mat_close_info
- 컬럼: a.material_id, a.mat_type_code, a.sub_mat_type_code, a.in_date, a.in_time, a.chemical_name, a.unit, a.in_qty, a.use_qty, a.remain_qty...
- SQL: SELECT a.material_id, a.mat_type_code, a.sub_mat_type_code, a.in_date, a.in_time, a.chemical_name, a.unit, a.in_qty, a.use_qty, a.remain_qty, a.use_yn, a.worker_id, a.worker_name, a.comments, b.out_co...


#### selectBarcodeChemicalInfo (select)
- 테이블: dw_sub_mat_chemical_in, dw_common_code
- 컬럼: a.dup_yn, #{materialId}, #{subMatTypeCode}, '')
- SQL: select a.dup_yn, ? as material_id, ? as sub_mat_type_code, COALESCE(b.code_name,'') as chemical_name from ( SELECT CASE WHEN count(1) > 0 THEN 'Y' ELSE 'N' END AS dup_yn FROM dw_sub_mat_chemical_in a ...


#### checkUseInData (select)
- 테이블: dw_sub_mat_chemical_in
- 컬럼: '/'), 'NoData')
- SQL: select COALESCE(STRING_AGG(material_id, '/'), 'NoData') AS materialId from dw_sub_mat_chemical_in a where upper(a.material_id) in <foreach item="item" collection="vo" open="(" separator="," close=")" ...


#### checkInsertInData (select)
- 테이블: dw_sub_mat_chemical_in
- 컬럼: '/'), 'NoData')
- SQL: select COALESCE(STRING_AGG(material_id, '/'), 'NoData') AS materialId from dw_sub_mat_chemical_in a where upper(a.material_id) in <foreach item="item" collection="vo" open="(" separator="," close=")" ...


#### selectMatChemicalOut (select)
- 테이블: dw_sub_mat_chemical_out, dw_sub_mat_chemical_in, dw_sub_mat_chemical_return, dw_mat_close_info
- 컬럼: a.out_no, a.mat_type_code, a.sub_mat_type_code, a.work_date, a.shift_code, a.out_seq, a.out_date, a.out_time, a.material_id, a.chemical_name...
- SQL: SELECT a.out_no, a.mat_type_code, a.sub_mat_type_code, a.work_date, a.shift_code, a.out_seq, a.out_date, a.out_time, a.material_id, a.chemical_name, a.worker_name, a.line, a.step_code, a.step_nm, a.eq...


#### selectUseEquipList (select)
- 테이블: dw_equipment_mast
- 컬럼: 
- SQL: select * from ( SELECT distinct a.line , a.설비약명 FROM dw_equipment_mast a where 1 = 1 and a.사용여부 = '1' ) a order by line, 설비약명...


#### selectBarcodeInfo (select)
- 테이블: dw_sub_mat_chemical_in, dw_sub_mat_chemical_return
- 컬럼: a.material_id, a.sub_mat_type_code, a.chemical_name, a.use_qty, a.remain_qty, a.use_yn, a.comments, b.return_no
- SQL: select a.material_id, a.sub_mat_type_code, a.chemical_name, a.use_qty, a.remain_qty, a.remain_qty as stock_qty, a.use_yn, a.comments as in_comments, b.return_no from dw_sub_mat_chemical_in a left oute...


#### checkRemainQty (select)
- 테이블: dw_sub_mat_chemical_in, dw_sub_mat_chemical_return
- 컬럼: 'LACK_QTY', material_id
- SQL: select 'LACK_QTY' as check_code, material_id from dw_sub_mat_chemical_in a where upper(a.material_id) = upper(?) and remain_qty - ? <![CDATA[ < 0 ]]> union all select 'RETURN_CONFIRM' as check_code, m...


#### checkRemainDiffQty (select)
- 테이블: dw_sub_mat_chemical_in
- 컬럼: material_id
- SQL: select material_id from dw_sub_mat_chemical_in a where upper(a.material_id) = upper(?) and remain_qty - ( ? - ? )<![CDATA[ < 0 ]]>...


#### selectMatChemicalReturn (select)
- 테이블: dw_sub_mat_chemical_return, dw_sub_mat_chemical_out, dw_common_code, dw_sub_mat_chemical_in, dw_mat_close_info
- 컬럼: a.return_no, a.mat_type_code, a.sub_mat_type_code, a.work_date, a.shift_code, c.code_name, a.out_no, b.out_seq, b.out_date, b.out_time...
- SQL: SELECT a.return_no, a.mat_type_code, a.sub_mat_type_code, a.work_date, a.shift_code, c.code_name as shift_name, a.out_no, b.out_seq, b.out_date, b.out_time, a.material_id, a.chemical_name, b.worker_na...


#### selectBarcodeOutInfo (select)
- 테이블: dw_sub_mat_chemical_out, dw_common_code, dw_sub_mat_chemical_return
- 컬럼: a.out_no, a.mat_type_code, a.sub_mat_type_code, a.work_date, a.shift_code, a.shift_name, a.out_seq, a.out_date, a.out_time, a.material_id...
- SQL: select a.out_no, a.mat_type_code, a.sub_mat_type_code, a.work_date, a.shift_code, a.shift_name, a.out_seq, a.out_date, a.out_time, a.material_id, a.chemical_name, a.out_worker_name, a.line, a.step_cod...


#### checkExistsReturnData (select)
- 테이블: dw_sub_mat_chemical_return
- 컬럼: return_no, return_date, return_time, worker_name
- SQL: select return_no, return_date, return_time, worker_name from dw_sub_mat_chemical_return a where a.out_no = ?...


#### checkOrgReturnQty (select)
- 테이블: dw_sub_mat_chemical_return
- 컬럼: return_qty
- SQL: select return_qty from dw_sub_mat_chemical_return a where a.return_no = ?...


#### selectMaxStockDate (select)
- 테이블: dw_sub_mat_chemical_id_stock
- 컬럼: 9, 112)), 112)
- SQL: SELECT CONVERT(VARCHAR(8), ISNULL(max(stock_date), CONVERT(VARCHAR(8), DATEADD(HOUR, 9, GETUTCDATE()), 112)), 112) AS stockDate FROM dw_sub_mat_chemical_id_stock...


#### selectConfirmN (select)
- 테이블: dw_sub_mat_chemical_id_stock
- 컬럼: 
- SQL: select count(1) as cnt from dw_sub_mat_chemical_id_stock where stock_date = ? and confirm_yn = 'N'...


#### selectSubMatChemicalIdStock (select)
- 테이블: dw_sub_mat_chemical_id_stock, dw_mat_close_info
- 컬럼: a.stock_date, a.material_id, a.mat_type_code, a.sub_mat_type_code, a.chemical_name, a.unit, a.prev_stock_qty, a.prev_real_stock_qty, a.in_qty, a.out_qty...
- SQL: SELECT a.stock_date, a.material_id, a.mat_type_code, a.sub_mat_type_code, a.chemical_name, a.unit, a.prev_stock_qty, a.prev_real_stock_qty, a.in_qty, a.out_qty, a.return_qty, a.use_qty, a.stock_qty, a...


#### createTempMatStockTable (select)
- 테이블: dw_sub_mat_chemical_id_stock
- 컬럼: 
- SQL: SELECT * INTO ? FROM dw_sub_mat_chemical_id_stock WHERE stock_date = ?...


#### selectSubMatChemicalMonthReport (select)
- 테이블: dw_sub_mat_chemical_stock, basedata
- 컬럼: sub_mat_type_code, chemical_name, stock_date, sort_order, gubun, CASE, qty
- SQL: WITH BaseData AS ( SELECT sub_mat_type_code, chemical_name, stock_date, sort_order, gubun, CASE WHEN gubun = 'in_qty' THEN '1' WHEN gubun = 'out_qty' THEN '2' WHEN gubun = 'return_qty' THEN '3' WHEN g...


#### insertInData (insert)
- 테이블: dw_sub_mat_chemical_in
- 컬럼: 
- SQL: INSERT INTO dw_sub_mat_chemical_in ( material_id, mat_type_code, sub_mat_type_code, in_date, in_time, chemical_name, unit, in_qty, use_qty, remain_qty, use_yn, worker_id, worker_name, comments, create...


#### insertOutData (insert)
- 테이블: dw_sub_mat_chemical_out
- 컬럼: case, ''), 12, 14), 3)
- SQL: INSERT INTO dw_sub_mat_chemical_out ( out_no, mat_type_code, sub_mat_type_code, work_date, shift_code, out_seq, out_date, out_time, material_id, chemical_name, worker_name, line, step_code, step_nm, e...


#### insertReturnData (insert)
- 테이블: dw_sub_mat_chemical_return
- 컬럼: 
- SQL: INSERT INTO dw_sub_mat_chemical_return ( return_no, mat_type_code, sub_mat_type_code, work_date, shift_code, out_no, material_id, chemical_name, return_date, return_time, worker_name, unit, return_qty...


#### insertSubMatChemicalIdStock (insert)
- 테이블: dw_sub_mat_chemical_id_stock, dw_sub_mat_chemical_in, dw_sub_mat_chemical_out, dw_mat_close_info
- 컬럼: a.stock_date, a.material_id, a.mat_type_code, a.sub_mat_type_code, a.chemical_name, a.unit, a.prev_stock_qty, a.prev_real_stock_qty, a.in_qty, a.out_qty...
- SQL: INSERT INTO dw_sub_mat_chemical_id_stock ( stock_date, material_id, mat_type_code, sub_mat_type_code, chemical_name, unit, prev_stock_qty, prev_real_stock_qty, in_qty, out_qty, return_qty, use_qty, st...


#### insertSubMatChemicalStock (insert)
- 테이블: dw_sub_mat_chemical_stock, dw_sub_mat_chemical_id_stock
- 컬럼: a.stock_date, a.mat_type_code, a.sub_mat_type_code, a.chemical_name, a.unit, 0), #{workerId}
- SQL: INSERT INTO dw_sub_mat_chemical_stock ( stock_date, mat_type_code, sub_mat_type_code, chemical_name, unit, prev_stock_qty, prev_real_stock_qty, in_qty, out_qty, return_qty, use_qty, stock_qty, real_st...


#### updateInData (update)
- 테이블: dw_sub_mat_chemical_in
- 컬럼: 
- SQL: UPDATE dw_sub_mat_chemical_in SET worker_name = ?, in_qty = ?, remain_qty = ?, comments = ? WHERE material_id = ?...


#### updateRemainQtyMinus (update)
- 테이블: dw_sub_mat_chemical_in
- 컬럼: 
- SQL: UPDATE dw_sub_mat_chemical_in SET use_qty = use_qty + ?, remain_qty = remain_qty - ?, use_yn = 'Y' WHERE material_id = ?...


#### updateRemainQtyPlus (update)
- 테이블: dw_sub_mat_chemical_in
- 컬럼: 
- SQL: UPDATE dw_sub_mat_chemical_in SET use_qty = use_qty - ?, remain_qty = remain_qty + ?, use_yn = case when ( use_qty - ? ) <![CDATA[ <=0 ]]> then 'N' else 'Y' end WHERE material_id = ?...


#### updateRemainDiffQty (update)
- 테이블: dw_sub_mat_chemical_in
- 컬럼: 
- SQL: UPDATE dw_sub_mat_chemical_in SET use_qty = use_qty + ( ? - ? ), remain_qty = remain_qty - ( ? - ? ), use_yn = case when ( use_qty + ( ? - ? ) ) <![CDATA[ <=0 ]]> then 'N' else 'Y' end WHERE material_...


#### updateOutData (update)
- 테이블: dw_sub_mat_chemical_out
- 컬럼: 
- SQL: UPDATE dw_sub_mat_chemical_out SET worker_name = ?, line = ?, step_code = ?, step_nm = ?, equip_no = ?, equip_nm = ?, out_qty = isnull(?,0), comments = ? WHERE out_no = ?...


#### updateReturnData (update)
- 테이블: dw_sub_mat_chemical_return
- 컬럼: 
- SQL: UPDATE dw_sub_mat_chemical_return SET worker_name = ?, return_qty = isnull(?,0), confirm_yn = ?, comments = ? WHERE return_no = ?...


#### updateReturnQtyForOuData (update)
- 테이블: dw_sub_mat_chemical_out
- 컬럼: 
- SQL: UPDATE dw_sub_mat_chemical_out SET return_qty = ? WHERE out_no = ?...


#### updateReturnQtyZeroForOuData (update)
- 테이블: dw_sub_mat_chemical_out
- 컬럼: 
- SQL: UPDATE dw_sub_mat_chemical_out SET return_qty = 0 WHERE out_no = ?...


#### updateRemainQtyMinusForReturn (update)
- 테이블: dw_sub_mat_chemical_in
- 컬럼: 
- SQL: UPDATE dw_sub_mat_chemical_in SET use_qty = use_qty + ?, remain_qty = remain_qty - ? WHERE material_id = ?...


#### updateRemainQtyPlusForReturn (update)
- 테이블: dw_sub_mat_chemical_in
- 컬럼: 
- SQL: UPDATE dw_sub_mat_chemical_in SET use_qty = use_qty - ?, remain_qty = remain_qty + ? WHERE material_id = ?...


#### updateRemainDiffQtyForReturn (update)
- 테이블: dw_sub_mat_chemical_in
- 컬럼: 
- SQL: UPDATE dw_sub_mat_chemical_in SET use_qty = use_qty - ( ? - ? ), remain_qty = remain_qty + ( ? - ? ) WHERE material_id = ?...


#### updateSubMatChemicalIdStock (update)
- 테이블: dw_sub_mat_chemical_id_stock
- 컬럼: 
- SQL: update dw_sub_mat_chemical_id_stock set charger_name = ?, real_stock_qty = isnull(?,0), diff_qty = isnull(?,0) - stock_qty, confirm_yn = ?, comments = ? where stock_date = ? and material_id = ?...


#### deleteInData (delete)
- 테이블: dw_sub_mat_chemical_in
- 컬럼: 
- SQL: DELETE FROM dw_sub_mat_chemical_in WHERE material_id = ?...


#### deleteOutData (delete)
- 테이블: dw_sub_mat_chemical_out
- 컬럼: 
- SQL: DELETE FROM dw_sub_mat_chemical_out WHERE out_no = ?...


#### deleteReturnData (delete)
- 테이블: dw_sub_mat_chemical_return
- 컬럼: 
- SQL: DELETE FROM dw_sub_mat_chemical_return WHERE return_no = ?...


#### dropTempMatStockTable (delete)
- 테이블: 
- 컬럼: 
- SQL: DROP TABLE ?...


#### deleteSubMatChemicalIdStock (delete)
- 테이블: dw_sub_mat_chemical_id_stock
- 컬럼: 
- SQL: delete from dw_sub_mat_chemical_id_stock where stock_date = ?...


#### deleteSubMatChemicalStock (delete)
- 테이블: dw_sub_mat_chemical_stock
- 컬럼: 
- SQL: delete from dw_sub_mat_chemical_stock where stock_date = ?...


---

## 화면: M0001007 - Tab 0 공정전 입고
메뉴경로: Tab 0 공정전 입고
탭: TAB001107, TAB001207, TAB001307, TAB001407
설명: 공정전 입고, 공정투입, 재고실사, 재고현황

### 관련 쿼리

#### selectMatFilterIn (select)
- 테이블: dw_sub_mat_filter_in, dw_mat_close_info
- 컬럼: a.in_no, a.mat_type_code, a.sub_mat_type_code, a.in_date, a.in_time, a.filter_name, a.unit, a.in_qty, a.use_qty, a.remain_qty...
- SQL: SELECT a.in_no, a.mat_type_code, a.sub_mat_type_code, a.in_date, a.in_time, a.filter_name, a.unit, a.in_qty, a.use_qty, a.remain_qty, a.use_yn, a.worker_id, a.worker_name, a.comments, a.create_date, a...


#### checkUseInData (select)
- 테이블: dw_sub_mat_filter_in
- 컬럼: '/'), 'NoData')
- SQL: select COALESCE(STRING_AGG(in_no, '/'), 'NoData') AS inNo from dw_sub_mat_filter_in a where upper(a.in_no) in <foreach item="item" collection="vo" open="(" separator="," close=")" > upper(?) </foreach...


#### selectMatFilterOut (select)
- 테이블: dw_sub_mat_filter_out, dw_sub_mat_filter_in, dw_mat_close_info
- 컬럼: a.out_no, a.mat_type_code, a.sub_mat_type_code, a.work_date, a.shift_code, a.out_seq, a.out_date, a.out_time, a.filter_name, a.worker_name...
- SQL: SELECT a.out_no, a.mat_type_code, a.sub_mat_type_code, a.work_date, a.shift_code, a.out_seq, a.out_date, a.out_time, a.filter_name, a.worker_name, a.line, a.step_code, a.step_nm, a.equip_no, a.equip_n...


#### selectFilterInfo (select)
- 테이블: dw_sub_mat_filter_in
- 컬럼: sub_mat_type_code, filter_name
- SQL: select sub_mat_type_code , filter_name, sum(remain_qty) as remain_qty from dw_sub_mat_filter_in where sub_mat_type_code = ? and remain_qty > 0 group by sub_mat_type_code, filter_name...


#### insertOutData (select)
- 테이블: dw_sub_mat_filter_out
- 컬럼: case, ''), 12, 14), 3)
- SQL: INSERT INTO dw_sub_mat_filter_out ( out_no, mat_type_code, sub_mat_type_code, work_date, shift_code, out_seq, out_date, out_time, filter_name, worker_name, line, step_code, step_nm, equip_no, equip_nm...


#### selectMaxStockDate (select)
- 테이블: dw_sub_mat_filter_stock
- 컬럼: 9, 112)), 112)
- SQL: SELECT CONVERT(VARCHAR(8), ISNULL(max(stock_date), CONVERT(VARCHAR(8), DATEADD(HOUR, 9, GETUTCDATE()), 112)), 112) AS stockDate FROM dw_sub_mat_filter_stock...


#### selectConfirmN (select)
- 테이블: dw_sub_mat_filter_stock
- 컬럼: 
- SQL: select count(1) as cnt from dw_sub_mat_filter_stock where stock_date = ? and confirm_yn = 'N'...


#### selectSubMatFilterStock (select)
- 테이블: dw_sub_mat_filter_stock, dw_mat_close_info
- 컬럼: a.stock_date, a.mat_type_code, a.sub_mat_type_code, a.filter_name, a.unit, a.prev_stock_qty, a.prev_real_stock_qty, a.in_qty, a.out_qty, a.stock_qty...
- SQL: SELECT a.stock_date, a.mat_type_code, a.sub_mat_type_code, a.filter_name, a.unit, a.prev_stock_qty, a.prev_real_stock_qty, a.in_qty, a.out_qty, a.stock_qty, a.real_stock_qty, a.diff_qty, a.confirm_yn,...


#### createTempMatStockTable (select)
- 테이블: dw_sub_mat_filter_stock
- 컬럼: 
- SQL: SELECT * INTO ? FROM dw_sub_mat_filter_stock WHERE stock_date = ?...


#### selectSubMatFilterMonthReport (select)
- 테이블: dw_sub_mat_filter_stock, dw_sub_mat_filter_equip_out, basedata, equipdata
- 컬럼: sub_mat_type_code, filter_name, 'Total', '', stock_date, sort_order, gubun, CASE, qty
- SQL: WITH BaseData AS ( SELECT sub_mat_type_code, filter_name, 'Total' as step, '' as equip, stock_date, sort_order, gubun, CASE WHEN gubun = 'in_qty' THEN '1' WHEN gubun = 'out_qty' THEN '2' WHEN gubun = ...


#### insertInData (insert)
- 테이블: dw_sub_mat_filter_in, dw_common_code
- 컬럼: case, ''), 11, 13), 3)
- SQL: INSERT INTO dw_sub_mat_filter_in ( in_no, mat_type_code, sub_mat_type_code, in_date, in_time, filter_name, unit, in_qty, use_qty, remain_qty, use_yn, worker_id, worker_name, comments, create_date, cre...


#### insertOutDetailData (insert)
- 테이블: dw_sub_mat_filter_in, dw_sub_mat_filter_out_detail, fifo
- 컬럼: in_no, remain_qty
- SQL: WITH fifo AS ( SELECT in_no, remain_qty, SUM(remain_qty) OVER (ORDER BY in_no) AS cumulative_qty FROM dw_sub_mat_filter_in WHERE sub_mat_type_code = ? and remain_qty <![CDATA[ > ]]> 0 ) INSERT INTO dw...


#### insertSubMatFilterStock (insert)
- 테이블: dw_sub_mat_filter_stock, dw_sub_mat_filter_in, dw_sub_mat_filter_out, dw_mat_close_info
- 컬럼: a.stock_date, a.mat_type_code, a.sub_mat_type_code, a.filter_name, a.unit, a.prev_stock_qty, a.prev_real_stock_qty, a.in_qty, a.out_qty, case...
- SQL: INSERT INTO dw_sub_mat_filter_stock ( stock_date, mat_type_code, sub_mat_type_code, filter_name, unit, prev_stock_qty, prev_real_stock_qty, in_qty, out_qty, stock_qty, real_stock_qty, diff_qty, confir...


#### insertSubMatFilterEquipOut (insert)
- 테이블: dw_sub_mat_filter_equip_out, dw_sub_mat_filter_out
- 컬럼: work_date, mat_type_code, sub_mat_type_code, filter_name, line, step_code, step_nm, equip_no, equip_nm, #{workerId}
- SQL: INSERT INTO dw_sub_mat_filter_equip_out ( stock_date, mat_type_code, sub_mat_type_code, filter_name, line, step_code, step_nm, equip_no, equip_nm, out_qty, create_date, create_user ) select work_date,...


#### updateInData (update)
- 테이블: dw_sub_mat_filter_in
- 컬럼: 
- SQL: UPDATE dw_sub_mat_filter_in SET sub_mat_type_code = ?, filter_name = ?, worker_name = ?, in_qty = ?, remain_qty = ?, comments = ? WHERE in_no = ?...


#### updateRemainQtyMinus (update)
- 테이블: a, dw_sub_mat_filter_in, dw_sub_mat_filter_out_detail
- 컬럼: 
- SQL: UPDATE a SET use_qty = a.use_qty + b.use_qty, remain_qty = a.remain_qty - b.use_qty, use_yn = 'Y' from dw_sub_mat_filter_in a join dw_sub_mat_filter_out_detail b on ( a.in_no = b.in_no ) WHERE b.out_n...


#### updateRemainQtyPlus (update)
- 테이블: a, dw_sub_mat_filter_in, dw_sub_mat_filter_out_detail
- 컬럼: 
- SQL: UPDATE a SET use_qty = a.use_qty - b.use_qty, remain_qty = a.remain_qty + b.use_qty, use_yn = case when (a.use_qty - b.use_qty) <![CDATA[ <=0 ]]> then 'N' else 'Y' end from dw_sub_mat_filter_in a join...


#### updateOutData (update)
- 테이블: dw_sub_mat_filter_out
- 컬럼: 
- SQL: UPDATE dw_sub_mat_filter_out SET worker_name = ?, line = ?, step_code = ?, step_nm = ?, equip_no = ?, equip_nm = ?, out_qty = isnull(?,0), comments = ? WHERE out_no = ?...


#### updateSubMatFilterStock (update)
- 테이블: dw_sub_mat_filter_stock
- 컬럼: 
- SQL: update dw_sub_mat_filter_stock set charger_name = ?, real_stock_qty = isnull(?,0), diff_qty = isnull(?,0) - stock_qty, confirm_yn = ?, comments = ? where stock_date = ? and mat_type_code = ? and sub_m...


#### deleteInData (delete)
- 테이블: dw_sub_mat_filter_in
- 컬럼: 
- SQL: DELETE FROM dw_sub_mat_filter_in WHERE in_no = ?...


#### deleteOutDetailData (delete)
- 테이블: dw_sub_mat_filter_out_detail
- 컬럼: 
- SQL: DELETE FROM dw_sub_mat_filter_out_detail WHERE out_no = ?...


#### deleteOutData (delete)
- 테이블: dw_sub_mat_filter_out
- 컬럼: 
- SQL: DELETE FROM dw_sub_mat_filter_out WHERE out_no = ?...


#### dropTempMatStockTable (delete)
- 테이블: 
- 컬럼: 
- SQL: DROP TABLE ?...


#### deleteSubMatFilterStock (delete)
- 테이블: dw_sub_mat_filter_stock
- 컬럼: 
- SQL: delete from dw_sub_mat_filter_stock where stock_date = ?...


#### deleteSubMatFilterEquipOut (delete)
- 테이블: dw_sub_mat_filter_equip_out
- 컬럼: 
- SQL: delete from dw_sub_mat_filter_equip_out where stock_date = ?...


---

## 화면: M0001008 - Tab 0 공정전 입고
메뉴경로: Tab 0 공정전 입고
탭: TAB001108, TAB001208, TAB001308, TAB001408
설명: 공정전 입고, 공정투입, 재고실사, 재고현황

### 관련 쿼리

#### selectMatDummyIn (select)
- 테이블: dw_sub_mat_dummy_in, dw_sub_mat_dummy_out, dw_mat_close_info
- 컬럼: a.material_id, a.mat_type_code, a.sub_mat_type_code, a.in_date, a.in_time, a.size, a.unit, a.in_qty, a.use_qty, a.remain_qty...
- SQL: SELECT a.material_id, a.mat_type_code, a.sub_mat_type_code, a.in_date, a.in_time, a.size, a.unit, a.in_qty, a.use_qty, a.remain_qty, a.use_yn, a.worker_id, a.worker_name, a.comments, b.out_comments, a...


#### selectBarcodeDupYn (select)
- 테이블: dw_sub_mat_dummy_in
- 컬럼: CASE
- SQL: SELECT CASE WHEN count(1) <![CDATA[ > ]]> 0 THEN 'Y' ELSE 'N' END AS dupYn FROM dw_sub_mat_dummy_in a WHERE a.material_id = ?...


#### checkUseInData (select)
- 테이블: dw_sub_mat_dummy_in
- 컬럼: '/'), 'NoData')
- SQL: select COALESCE(STRING_AGG(material_id, '/'), 'NoData') AS materialId from dw_sub_mat_dummy_in a where upper(a.material_id) in <foreach item="item" collection="vo" open="(" separator="," close=")" > u...


#### checkInsertInData (select)
- 테이블: dw_sub_mat_dummy_in
- 컬럼: '/'), 'NoData')
- SQL: select COALESCE(STRING_AGG(material_id, '/'), 'NoData') AS materialId from dw_sub_mat_dummy_in a where upper(a.material_id) in <foreach item="item" collection="vo" open="(" separator="," close=")" > u...


#### selectMatDummyOut (select)
- 테이블: dw_sub_mat_dummy_out, dw_sub_mat_dummy_in, dw_common_code, dw_mat_close_info
- 컬럼: a.out_no, a.mat_type_code, a.sub_mat_type_code, a.work_date, a.shift_code, a.out_seq, a.out_date, a.out_time, a.material_id, c.code_name...
- SQL: SELECT a.out_no, a.mat_type_code, a.sub_mat_type_code, a.work_date, a.shift_code, a.out_seq, a.out_date, a.out_time, a.material_id, c.code_name as size, a.worker_name, a.use_category, a.line, a.step_c...


#### selectBarcodeInfo (select)
- 테이블: dw_sub_mat_dummy_in
- 컬럼: a.material_id, a.sub_mat_type_code, a.size, a.unit, a.use_qty, a.remain_qty, a.use_yn, a.comments
- SQL: select a.material_id, a.sub_mat_type_code, a.size, a.unit, a.use_qty, a.remain_qty, a.remain_qty as stock_qty, a.use_yn, a.comments as in_comments from dw_sub_mat_dummy_in a where material_id = ?...


#### checkRemainQty (select)
- 테이블: dw_sub_mat_dummy_in
- 컬럼: material_id
- SQL: select material_id from dw_sub_mat_dummy_in a where upper(a.material_id) = upper(?) and remain_qty - ? <![CDATA[ < 0 ]]>...


#### checkRemainDiffQty (select)
- 테이블: dw_sub_mat_dummy_in
- 컬럼: material_id
- SQL: select material_id from dw_sub_mat_dummy_in a where upper(a.material_id) = upper(?) and remain_qty - ( ? - ? )<![CDATA[ < 0 ]]>...


#### insertOutData (select)
- 테이블: dw_sub_mat_dummy_out, dw_common_code
- 컬럼: case, ''), 12, 14), 3)
- SQL: INSERT INTO dw_sub_mat_dummy_out ( out_no, mat_type_code, sub_mat_type_code, work_date, shift_code, out_seq, out_date, out_time, material_id, worker_name, use_category, line, step_code, step_nm, equip...


#### selectMaxStockDate (select)
- 테이블: dw_sub_mat_dummy_id_stock
- 컬럼: 9, 112)), 112)
- SQL: SELECT CONVERT(VARCHAR(8), ISNULL(max(stock_date), CONVERT(VARCHAR(8), DATEADD(HOUR, 9, GETUTCDATE()), 112)), 112) AS stockDate FROM dw_sub_mat_dummy_id_stock...


#### selectConfirmN (select)
- 테이블: dw_sub_mat_dummy_id_stock
- 컬럼: 
- SQL: select count(1) as cnt from dw_sub_mat_dummy_id_stock where stock_date = ? and confirm_yn = 'N'...


#### selectSubMatDummyIdStock (select)
- 테이블: dw_sub_mat_dummy_id_stock, dw_common_code, dw_mat_close_info
- 컬럼: a.stock_date, a.material_id, a.mat_type_code, a.sub_mat_type_code, b.code_name, a.unit, a.prev_stock_qty, a.prev_real_stock_qty, a.in_qty, a.out_qty...
- SQL: SELECT a.stock_date, a.material_id, a.mat_type_code, a.sub_mat_type_code, b.code_name as size, a.unit, a.prev_stock_qty, a.prev_real_stock_qty, a.in_qty, a.out_qty, a.error_work_qty, a.error_mat_qty, ...


#### createTempMatStockTable (select)
- 테이블: dw_sub_mat_dummy_id_stock
- 컬럼: 
- SQL: SELECT * INTO ? FROM dw_sub_mat_dummy_id_stock WHERE stock_date = ?...


#### selectSubMatDummyMonthReport (select)
- 테이블: dw_sub_mat_dummy_stock, dw_sub_mat_dummy_out, outdata, dw_common_code, basedata, outsumdata, dw_sub_mat_tool_stock
- 컬럼: sub_mat_type_code, stock_date, sort_order, gubun, CASE, qty
- SQL: WITH BaseData AS ( SELECT sub_mat_type_code, stock_date, sort_order, gubun, CASE WHEN gubun = 'in_qty' THEN 10 WHEN gubun = 'out_qty' THEN 20 WHEN gubun = 'loss_qty' THEN 30 WHEN gubun = 'real_stock_q...


#### insertInData (insert)
- 테이블: dw_sub_mat_dummy_in, dw_common_code
- 컬럼: code_name
- SQL: INSERT INTO dw_sub_mat_dummy_in ( material_id, mat_type_code, sub_mat_type_code, in_date, in_time, size, unit, in_qty, use_qty, remain_qty, use_yn, worker_id, worker_name, comments, create_date, creat...


#### insertSubMatDummyIdStock (insert)
- 테이블: dw_sub_mat_dummy_id_stock, dw_sub_mat_dummy_in, dw_sub_mat_dummy_out, dw_mat_close_info
- 컬럼: a.stock_date, a.material_id, a.mat_type_code, a.sub_mat_type_code, a.unit, a.prev_stock_qty, a.prev_real_stock_qty, a.in_qty, a.out_qty, a.error_work_qty...
- SQL: INSERT INTO dw_sub_mat_dummy_id_stock ( stock_date, material_id, mat_type_code, sub_mat_type_code, unit, prev_stock_qty, prev_real_stock_qty, in_qty, out_qty, error_work_qty, error_mat_qty, stock_qty,...


#### insertSubMatDummyStock (insert)
- 테이블: dw_sub_mat_dummy_stock, dw_sub_mat_dummy_id_stock
- 컬럼: stock_date, mat_type_code, sub_mat_type_code, unit, #{workerId}
- SQL: INSERT INTO dw_sub_mat_dummy_stock ( stock_date, mat_type_code, sub_mat_type_code, unit, prev_stock_qty, prev_real_stock_qty, in_qty, out_qty, error_work_qty, error_mat_qty, stock_qty, real_stock_qty,...


#### updateInData (update)
- 테이블: dw_sub_mat_dummy_in, dw_common_code
- 컬럼: code_name
- SQL: UPDATE dw_sub_mat_dummy_in SET sub_mat_type_code = ?, size = ( select code_name from dw_common_code where maj_code='92' and code=?), worker_name = ?, in_qty = ?, remain_qty = ?, comments = ? WHERE mat...


#### updateRemainQtyMinus (update)
- 테이블: dw_sub_mat_dummy_in
- 컬럼: 
- SQL: UPDATE dw_sub_mat_dummy_in SET use_qty = use_qty + ?, remain_qty = remain_qty - ?, use_yn = 'Y' WHERE material_id = ?...


#### updateRemainQtyPlus (update)
- 테이블: dw_sub_mat_dummy_in
- 컬럼: 
- SQL: UPDATE dw_sub_mat_dummy_in SET use_qty = use_qty - ?, remain_qty = remain_qty + ?, use_yn = case when ( use_qty - ? ) <![CDATA[ <=0 ]]> then 'N' else 'Y' end WHERE material_id = ?...


#### updateRemainDiffQty (update)
- 테이블: dw_sub_mat_dummy_in
- 컬럼: 
- SQL: UPDATE dw_sub_mat_dummy_in SET use_qty = use_qty + ( ? - ? ), remain_qty = remain_qty - ( ? - ? ), use_yn = case when ( use_qty + ( ? - ? ) ) <![CDATA[ <=0 ]]> then 'N' else 'Y' end WHERE material_id ...


#### updateOutData (update)
- 테이블: dw_sub_mat_dummy_out, dw_common_code
- 컬럼: code_name
- SQL: UPDATE dw_sub_mat_dummy_out SET worker_name = ?, line = ?, step_code = ?, step_nm = ?, equip_no = case when ? = 'E' then ? else ? end, equip_nm = case when ? = 'E' then ( select code_name from dw_comm...


#### updateSubMatDummyIdStock (update)
- 테이블: dw_sub_mat_dummy_id_stock
- 컬럼: 
- SQL: update dw_sub_mat_dummy_id_stock set charger_name = ?, real_stock_qty = isnull(?,0), diff_qty = isnull(?,0) - stock_qty, confirm_yn = ?, comments = ? where stock_date = ? and material_id = ?...


#### deleteInData (delete)
- 테이블: dw_sub_mat_dummy_in
- 컬럼: 
- SQL: DELETE FROM dw_sub_mat_dummy_in WHERE material_id = ?...


#### deleteOutData (delete)
- 테이블: dw_sub_mat_dummy_out
- 컬럼: 
- SQL: DELETE FROM dw_sub_mat_dummy_out WHERE out_no = ?...


#### dropTempMatStockTable (delete)
- 테이블: 
- 컬럼: 
- SQL: DROP TABLE ?...


#### deleteSubMatDummyIdStock (delete)
- 테이블: dw_sub_mat_dummy_id_stock
- 컬럼: 
- SQL: delete from dw_sub_mat_dummy_id_stock where stock_date = ?...


#### deleteSubMatDummyStock (delete)
- 테이블: dw_sub_mat_dummy_stock
- 컬럼: 
- SQL: delete from dw_sub_mat_dummy_stock where stock_date = ?...


---

## 화면: M0001009 - Tab 0 공정전 입고
메뉴경로: Tab 0 공정전 입고
탭: TAB001109, TAB001209, TAB001309, TAB001409, TAB001509
설명: 공정전 입고, 공정투입, 재고실사, 재고현황, 품목관리

### 관련 쿼리

#### selectMatEtcIn (select)
- 테이블: dw_sub_mat_etc_in, dw_mat_category, dw_mat_close_info
- 컬럼: a.in_no, a.mat_category_code, b.mat_category_name, a.mat_type_code, b.mat_type_name, a.in_date, a.in_time, a.unit, a.in_qty, a.use_qty...
- SQL: SELECT a.in_no, a.mat_category_code, b.mat_category_name, a.mat_type_code, b.mat_type_name, a.in_date, a.in_time, a.unit, a.in_qty, a.use_qty, a.remain_qty, a.use_yn, a.worker_id, a.worker_name, a.com...


#### checkUseInData (select)
- 테이블: dw_sub_mat_etc_in
- 컬럼: '/'), 'NoData')
- SQL: select COALESCE(STRING_AGG(in_no, '/'), 'NoData') AS inNo from dw_sub_mat_etc_in a where upper(a.in_no) in <foreach item="item" collection="vo" open="(" separator="," close=")" > upper(?) </foreach> a...


#### selectMatEtcOut (select)
- 테이블: dw_sub_mat_etc_out, dw_sub_mat_etc_in, dw_mat_category, dw_mat_close_info
- 컬럼: a.out_no, a.mat_category_code, c.mat_category_name, a.mat_type_code, c.mat_type_name, a.work_date, a.shift_code, a.out_seq, a.out_date, a.out_time...
- SQL: SELECT a.out_no, a.mat_category_code, c.mat_category_name, a.mat_type_code, c.mat_type_name, a.work_date, a.shift_code, a.out_seq, a.out_date, a.out_time, a.worker_name, a.line, a.step_code, a.step_nm...


#### selectEtcInfo (select)
- 테이블: dw_sub_mat_etc_in, dw_mat_category
- 컬럼: a.mat_category_code, b.mat_category_name, a.mat_type_code, b.mat_type_name
- SQL: select a.mat_category_code, b.mat_category_name, a.mat_type_code, b.mat_type_name, sum(remain_qty) as remain_qty from dw_sub_mat_etc_in a join dw_mat_category b on ( a.mat_category_code = b.mat_catego...


#### insertOutData (select)
- 테이블: dw_sub_mat_etc_out
- 컬럼: case, ''), 23, 25), 3)
- SQL: INSERT INTO dw_sub_mat_etc_out ( out_no, mat_category_code, mat_type_code, work_date, shift_code, out_seq, out_date, out_time, worker_name, line, step_code, step_nm, equip_no, equip_nm, unit, out_qty,...


#### selectStockStatus (select)
- 테이블: dw_mat_close_info, dw_mat_category
- 컬럼: top
- SQL: select top 1 a.status from dw_mat_close_info a left outer join dw_mat_category b on ( a.mat_category_code = b.mat_category_code and a.mat_type_code = b.mat_type_code ) where b.etc_yn = 'Y' and a.stock...


#### selectPreStockStatus (select)
- 테이블: dw_mat_close_info, dw_mat_category
- 컬럼: top
- SQL: select top 1 status from dw_mat_close_info a left outer join dw_mat_category b on ( a.mat_category_code = b.mat_category_code and a.mat_type_code = b.mat_type_code ) where b.etc_yn = 'Y' and a.stock_d...


#### selectMaxStockDate (select)
- 테이블: dw_sub_mat_etc_stock
- 컬럼: 9, 112)), 112)
- SQL: SELECT CONVERT(VARCHAR(8), ISNULL(max(stock_date), CONVERT(VARCHAR(8), DATEADD(HOUR, 9, GETUTCDATE()), 112)), 112) AS stockDate FROM dw_sub_mat_etc_stock...


#### selectConfirmN (select)
- 테이블: dw_sub_mat_etc_stock, dw_mat_category
- 컬럼: a.mat_category_code, b.mat_category_name, a.mat_type_code, b.mat_type_name
- SQL: select a.mat_category_code, b.mat_category_name, a.mat_type_code, b.mat_type_name, count(1) as cnt from dw_sub_mat_etc_stock a join dw_mat_category b on ( a.mat_category_code = b.mat_category_code and...


#### selectSubMatEtcStock (select)
- 테이블: dw_sub_mat_etc_stock, dw_mat_category, dw_mat_close_info
- 컬럼: a.stock_date, a.mat_category_code, b.mat_category_name, a.mat_type_code, b.mat_type_name, a.unit, a.prev_stock_qty, a.prev_real_stock_qty, a.in_qty, a.out_qty...
- SQL: SELECT a.stock_date, a.mat_category_code, b.mat_category_name, a.mat_type_code, b.mat_type_name, a.unit, a.prev_stock_qty, a.prev_real_stock_qty, a.in_qty, a.out_qty, a.stock_qty, a.real_stock_qty, a....


#### createTempMatStockTable (select)
- 테이블: dw_sub_mat_etc_stock
- 컬럼: 
- SQL: SELECT * INTO ? FROM dw_sub_mat_etc_stock WHERE stock_date = ?...


#### selectSubMatEtcMonthReport (select)
- 테이블: dw_sub_mat_etc_stock, basedata, dw_mat_category
- 컬럼: mat_category_code, mat_type_code, stock_date, sort_order, gubun, CASE, qty
- SQL: WITH BaseData AS ( SELECT mat_category_code, mat_type_code, stock_date, sort_order, gubun, CASE WHEN gubun = 'in_qty' THEN '1' WHEN gubun = 'out_qty' THEN '2' WHEN gubun = 'stock_qty' THEN '4' WHEN gu...


#### selectMatCategoryList (select)
- 테이블: dw_sub_mat_etc_in, dw_mat_category
- 컬럼: a.mat_category_code, a.mat_type_code, a.mat_category_name, a.mat_type_name, a.unit_code, a.unit, a.etc_yn, CASE
- SQL: SELECT a.mat_category_code, a.mat_type_code, a.mat_category_name, a.mat_type_name, a.unit_code, a.unit, a.etc_yn, CASE WHEN EXISTS ( SELECT 1 FROM dw_sub_mat_etc_in b WHERE b.mat_category_code = a.mat...


#### selectMatCategoryStatusList (select)
- 테이블: dw_mat_category
- 컬럼: a.mat_category_code, a.mat_type_code, a.mat_category_name, a.mat_type_name, a.etc_yn
- SQL: SELECT a.mat_category_code, a.mat_type_code, a.mat_category_name, a.mat_type_name, a.etc_yn FROM dw_mat_category a where etc_yn = 'N' union all SELECT 'ETC', '', '포장재/기타자재', '전체', 'Y' etc_yn...


#### checkUsedInMatCategoryData (select)
- 테이블: dw_sub_mat_etc_in
- 컬럼: '/'), 'NoData')
- SQL: select COALESCE(STRING_AGG(a.mat_category_code + ' ' + a.mat_type_code, '/'), 'NoData') AS matCategory from dw_sub_mat_etc_in a where ( upper(a.mat_category_code) + upper(a.mat_type_code) ) in <foreac...


#### checkMatCategoryData (select)
- 테이블: dw_mat_category
- 컬럼: '/'), 'NoData')
- SQL: select COALESCE(STRING_AGG(a.mat_category_code + ' ' + a.mat_type_code, '/'), 'NoData') AS matCategory from dw_mat_category a where ( upper(a.mat_category_code) + upper(a.mat_type_code) ) in <foreach ...


#### selectEtcYnList (select)
- 테이블: dw_common_code
- 컬럼: code, code_name
- SQL: SELECT code item_value, code_name item_text FROM dw_common_code WHERE maj_code = ? and use_yn = 1 and etc1 = 'Y' order by sort_order,code...


#### insertInData (insert)
- 테이블: dw_sub_mat_etc_in
- 컬럼: case, ''), 20, 22), 3)
- SQL: INSERT INTO dw_sub_mat_etc_in ( in_no, mat_category_code, mat_type_code, in_date, in_time, unit, in_qty, use_qty, remain_qty, use_yn, worker_id, worker_name, comments, create_date, create_user ) VALUE...


#### insertOutDetailData (insert)
- 테이블: dw_sub_mat_etc_in, dw_sub_mat_etc_out_detail, fifo
- 컬럼: in_no, remain_qty
- SQL: WITH fifo AS ( SELECT in_no, remain_qty, SUM(remain_qty) OVER (ORDER BY in_no) AS cumulative_qty FROM dw_sub_mat_etc_in WHERE mat_category_code = ? and mat_type_code = ? and remain_qty <![CDATA[ > ]]>...


#### insertMatCloseInfo (insert)
- 테이블: dw_mat_close_info, dw_mat_category, set
- 컬럼: #{stockDate}, a.mat_category_code, a.mat_type_code
- SQL: MERGE INTO dw_mat_close_info AS target USING ( SELECT ? AS stock_date, a.mat_category_code, a.mat_type_code from dw_mat_category a where a.etc_yn = 'Y' ) AS source ON target.stock_date = source.stock_...


#### insertSubMatEtcStock (insert)
- 테이블: dw_sub_mat_etc_stock, dw_sub_mat_etc_in, dw_sub_mat_etc_out, dw_mat_close_info, dw_mat_category
- 컬럼: a.stock_date, a.mat_category_code, a.mat_type_code, a.unit, a.prev_stock_qty, a.prev_real_stock_qty, a.in_qty, a.out_qty, case, #{workerId}
- SQL: INSERT INTO dw_sub_mat_etc_stock ( stock_date, mat_category_code, mat_type_code, unit, prev_stock_qty, prev_real_stock_qty, in_qty, out_qty, stock_qty, real_stock_qty, diff_qty, confirm_yn, charger_id...


#### updateInData (update)
- 테이블: dw_sub_mat_etc_in
- 컬럼: 
- SQL: UPDATE dw_sub_mat_etc_in SET worker_name = ?, in_qty = ?, remain_qty = ?, comments = ? WHERE in_no = ?...


#### updateRemainQtyMinus (update)
- 테이블: a, dw_sub_mat_etc_in, dw_sub_mat_etc_out_detail
- 컬럼: 
- SQL: UPDATE a SET use_qty = a.use_qty + b.use_qty, remain_qty = a.remain_qty - b.use_qty, use_yn = 'Y' from dw_sub_mat_etc_in a join dw_sub_mat_etc_out_detail b on ( a.in_no = b.in_no ) WHERE b.out_no = ?...


#### updateRemainQtyPlus (update)
- 테이블: a, dw_sub_mat_etc_in, dw_sub_mat_etc_out_detail
- 컬럼: 
- SQL: UPDATE a SET use_qty = a.use_qty - b.use_qty, remain_qty = a.remain_qty + b.use_qty, use_yn = case when (a.use_qty - b.use_qty) <![CDATA[ <=0 ]]> then 'N' else 'Y' end from dw_sub_mat_etc_in a join dw...


#### updateOutData (update)
- 테이블: dw_sub_mat_etc_out
- 컬럼: 
- SQL: UPDATE dw_sub_mat_etc_out SET worker_name = ?, line = ?, step_code = ?, step_nm = ?, equip_no = ?, equip_nm = ?, out_qty = isnull(?,0), comments = ? WHERE out_no = ?...


#### updatetMatCloseInfo (update)
- 테이블: dw_mat_close_info, dw_mat_category
- 컬럼: 1
- SQL: update dw_mat_close_info set status = ?, update_date = getdate(), update_user = ? where stock_date = ? and exists ( select 1 from dw_mat_category b where b.etc_yn = 'Y' and dw_mat_close_info.mat_categ...


#### updateSubMatEtcStock (update)
- 테이블: dw_sub_mat_etc_stock
- 컬럼: 
- SQL: update dw_sub_mat_etc_stock set charger_name = ?, real_stock_qty = isnull(?,0), diff_qty = isnull(?,0) - stock_qty, confirm_yn = ?, comments = ? where stock_date = ? and mat_category_code = ? and mat_...


#### updateMatCategory (update)
- 테이블: dw_mat_category
- 컬럼: 
- SQL: UPDATE dw_mat_category SET mat_type_code = ?, mat_type_name = ?, unit_code = ?, unit = ? WHERE mat_category_code = ? and mat_type_code = ?...


#### deleteInData (delete)
- 테이블: dw_sub_mat_etc_in
- 컬럼: 
- SQL: DELETE FROM dw_sub_mat_etc_in WHERE in_no = ?...


#### deleteOutDetailData (delete)
- 테이블: dw_sub_mat_etc_out_detail
- 컬럼: 
- SQL: DELETE FROM dw_sub_mat_etc_out_detail WHERE out_no = ?...


#### deleteOutData (delete)
- 테이블: dw_sub_mat_etc_out
- 컬럼: 
- SQL: DELETE FROM dw_sub_mat_etc_out WHERE out_no = ?...


#### deletetMatCloseInfo (delete)
- 테이블: dw_mat_close_info, dw_mat_category
- 컬럼: 1
- SQL: delete from dw_mat_close_info where stock_date = ? and exists ( select 1 from dw_mat_category b where b.etc_yn = 'Y' and dw_mat_close_info.mat_category_code = b.mat_category_code and dw_mat_close_info...


#### dropTempMatStockTable (delete)
- 테이블: 
- 컬럼: 
- SQL: DROP TABLE ?...


#### deleteSubMatEtcStock (delete)
- 테이블: dw_sub_mat_etc_stock
- 컬럼: 
- SQL: delete from dw_sub_mat_etc_stock where stock_date = ?...


#### deleteMatCategory (delete)
- 테이블: dw_mat_category
- 컬럼: 
- SQL: delete from dw_mat_category WHERE mat_category_code = ? and mat_type_code = ?...


---

## 화면: M0001010 - Tab 0 자재 마스터
메뉴경로: Tab 0 자재 마스터
탭: TAB001701
설명: 자재 마스터

### 관련 쿼리

#### M0001010_Sch1 (select)
- 테이블: d04_
- 컬럼: 
- SQL: select * from d04_자재마스터파일 order by 자재코드,호환코드,자재품명...


#### M0001010_Insert1 (insert)
- 테이블: d04_
- 컬럼: 
- SQL: INSERT INTO d04_자재마스터파일 ( 자재코드,호환코드,자재품명,P_CODE,자재재질,자재두께,자재규격,자재단위,단가,공급단위,사용량_cell,사용처,납기,매입처,비고,사용여부 ) VALUES ( #{자재코드}, #{호환코드}, #{자재품명}, ?, #{자재재질}, #{자재두께}, #{자재규격}, #{자재단위}, #{단가}, #{공급단위}, #{사...


#### M0001010_Update1 (update)
- 테이블: d04_
- 컬럼: 
- SQL: UPDATE d04_자재마스터파일 SET 호환코드 = #{호환코드} ,자재품명 = #{자재품명} ,P_CODE = ? ,자재재질 = #{자재재질} ,자재두께 = #{자재두께} ,자재규격 = #{자재규격} ,자재단위 = #{자재단위} ,단가 = #{단가} ,공급단위 = #{공급단위} ,사용량_cell = #{사용량Cell} ,사용처 = #{사용처} ,납기 =...


#### M0001010_Delete1 (delete)
- 테이블: d04_
- 컬럼: 
- SQL: delete from d04_자재마스터파일 where 1=1 and 자재코드 = #{자재코드} and 자재코드 is not null...


---

## 화면: M0002001 - Tab 0 라인/AREA 마스터
메뉴경로: Tab 0 라인/AREA 마스터
탭: TAB007000, TAB008000, TAB020002, TAB020003, TAB020008
설명: 라인/AREA 마스터, 설비 마스터, 설비현황, 설비로그관리

### 관련 쿼리

#### selectLineList (select)
- 테이블: dw_line_mast
- 컬럼: line, line_decs, site, use_yn, create_date, create_name
- SQL: SELECT line, line_decs, site, use_yn, create_date, create_name FROM dw_line_mast...


#### selectAreaList (select)
- 테이블: dw_area_mast
- 컬럼: LINE, AREA, 공정구분, AREA_ORD, use_yn, create_date, create_name
- SQL: SELECT LINE, AREA, 공정구분, AREA_ORD, use_yn, create_date, create_name FROM dw_area_mast WHERE 1 = 1 order by line, AREA_ORD...


#### checkDeleteArea (select)
- 테이블: dw_area_mast, dw_step_mast
- 컬럼: '/'), 'NoData')
- SQL: select COALESCE(STRING_AGG(공정구분+'-'+area, '/'), 'NoData') AS area from dw_area_mast a where (line + '-' + 공정구분 ) in <foreach item="item" collection="vo" open="(" separator="," close=")" > ? + '-' + #{...


#### checkInsertArea (select)
- 테이블: dw_area_mast
- 컬럼: '/'), 'NoData')
- SQL: select COALESCE(STRING_AGG(line+'-'+공정구분, '/'), 'NoData') AS area from dw_area_mast a where (line + '-' + 공정구분 ) in <foreach item="item" collection="vo" open="(" separator="," close=")" > ? + '-' + #{...


#### selectEquipList (select)
- 테이블: dw_equipment_mast, dw_step_mast
- 컬럼: a.line, a.설비번호, a.설비명, a.설비약명, a.chamber, a.공정코드, b.공정명, a.공정구분, a.area, case...
- SQL: SELECT a.line, a.설비번호, a.설비명, a.설비약명, a.chamber, a.공정코드, b.공정명, a.공정구분 as area_code, a.area, case when a.사용여부 = 1 then 'Y' else 'N' end as 사용여부, a.비고, a.생성일, a.생성자 FROM dw_equipment_mast a left outer ...


#### checkInsertEquip (select)
- 테이블: dw_equipment_mast
- 컬럼: '/'), 'NoData')
- SQL: select COALESCE(STRING_AGG(line+'-'+설비번호, '/'), 'NoData') AS equip from dw_equipment_mast a where (line + '-' + 설비번호 ) in <foreach item="item" collection="vo" open="(" separator="," close=")" > ? + '-...


#### selectEquipPmVsAct (select)
- 테이블: dw_, dw_copy
- 컬럼: case, 날짜, 112)
- SQL: select a.* <foreach item="day" collection="days" index="index" open="" separator="" close="" > ,case when CONVERT(VARCHAR(8), 날짜, 112) = ? then 'Y' else null end as day${index + 1} </foreach> from ( s...


#### updateLine (update)
- 테이블: dw_line_mast
- 컬럼: 
- SQL: UPDATE dw_line_mast SET line = ?, line_decs = ?, site = ?, use_yn = ? WHERE line = ?...


#### updateArea (update)
- 테이블: dw_area_mast
- 컬럼: 
- SQL: UPDATE dw_area_mast SET AREA = ?, AREA_ORD = ?, use_yn = ? WHERE LINE = ? AND 공정구분 = #{공정구분}...


#### updateEquip (update)
- 테이블: dw_equipment_mast
- 컬럼: 
- SQL: UPDATE dw_equipment_mast SET 설비명 = #{설비명}, 설비약명 = #{설비약명}, chamber = ?, 공정코드 = #{공정코드}, 공정구분 = ?, area = ?, 사용여부 = case when #{사용여부} = 'Y' then 1 else 0 end, 비고 = #{비고} WHERE line = ? AND 설비번호 = #{설비번...


#### updateEquipPmVsAct (update)
- 테이블: dw_, set
- 컬럼: 
- SQL: MERGE INTO dw_설비관리_PM계획실적내역 tg USING ( select #{공장코드} as 공장코드 ,? as seqNo ,#{공정} as 공정 ,#{설비명} as 설비명 ,#{pm기준} as pm_기준 ,#{누적실적} as 누적실적 ,#{pm최근실행일} as pm_최근실행일 ) AS src ON tg.공장코드 = src.공장코드 and tg.공...


#### updateEquipCumulPerf (update)
- 테이블: dw_
- 컬럼: 
- SQL: update dw_설비관리_PM계획실적 set 누적실적 = #{누적실적} where 공장코드 = #{공장코드} and 공정 = #{공정} and 설비명 = #{설비명}; update dw_설비관리_PM계획실적내역 set 누적실적 = #{누적실적} where 공장코드 = #{공장코드} and 공정 = #{공정} and 설비명 = #{설비명};...


#### deleteLine (delete)
- 테이블: dw_line_mast
- 컬럼: 
- SQL: DELETE FROM dw_line_mast WHERE line = ?...


#### deleteArea (delete)
- 테이블: dw_area_mast
- 컬럼: 
- SQL: DELETE FROM dw_area_mast WHERE LINE = ? AND 공정구분 = #{공정구분}...


#### deleteEquip (delete)
- 테이블: dw_equipment_mast
- 컬럼: 
- SQL: DELETE FROM dw_equipment_mast WHERE line = ? AND 설비번호 = #{설비번호}...


---

## 화면: M0002002 - Tab 0 모델마스터
메뉴경로: Tab 0 모델마스터
탭: TAB009000, TAB010000, TAB020001, TAB020004, TAB020005
설명: 모델마스터, 제품마스터, 제품개발이력관리, 모델기본정보, 모델별 모니터링

### 관련 쿼리

#### selectModelList (select)
- 테이블: dw_model_mast, dw_model_image
- 컬럼: a.MODEL, a.code, description, Tray_Cell, use_yn, create_date, create_name, case
- SQL: SELECT a.MODEL, a.code, description, Tray_Cell, use_yn, create_date, create_name, case when image_data is NULL THEN 0 ELSE 1 END image_exist FROM dw_model_mast a left outer join dw_model_image b on a....


#### checkDeleteModel (select)
- 테이블: dw_model_mast, dw_product_mast
- 컬럼: '/'), 'NoData')
- SQL: select COALESCE(STRING_AGG(model, '/'), 'NoData') AS model from dw_model_mast a where a.model in <foreach item="item" collection="vo" open="(" separator="," close=")" > ? </foreach> and exists ( selec...


#### checkInsertModel (select)
- 테이블: dw_model_mast
- 컬럼: '/'), 'NoData')
- SQL: select COALESCE(STRING_AGG(model, '/'), 'NoData') AS model from dw_model_mast a where upper(a.model) in <foreach item="item" collection="vo" open="(" separator="," close=")" > upper(?) </foreach>...


#### checkInsertModelCode (select)
- 테이블: dw_model_mast
- 컬럼: '/'), 'NoData')
- SQL: select COALESCE(STRING_AGG(code, '/'), 'NoData') AS code from dw_model_mast a where upper(a.code) in <foreach item="item" collection="vo" open="(" separator="," close=")" > upper(?) </foreach>...


#### selectProductList (select)
- 테이블: dw_product_mast, dw_model_mast
- 컬럼: a.line, a.Prod_code, a.Model, b.description, a.Inch, a.Glass_thick, a.Version, a.spec, a.Unit, a.Unit_code...
- SQL: SELECT a.line, a.Prod_code, a.Model, b.description as model_name, a.Inch, a.Glass_thick, a.Version, a.spec, a.Unit, a.Unit_code, a.customer_name, a.customer_code, a.Sheet, a.Block, a.Cell, a.RUN_SIZE,...


#### checkDeleteProduct (select)
- 테이블: dw_product_mast, dw_product_process
- 컬럼: '/'), 'NoData')
- SQL: select COALESCE(STRING_AGG(line+'-'+Prod_code, '/'), 'NoData') AS prodCode from dw_product_mast a where (line + '-' + Prod_code ) in <foreach item="item" collection="vo" open="(" separator="," close="...


#### checkInsertProduct (select)
- 테이블: dw_product_mast
- 컬럼: '/'), 'NoData')
- SQL: select COALESCE(STRING_AGG(line+'-'+Prod_code, '/'), 'NoData') AS prodCode from dw_product_mast a where (line + '-' + upper(Prod_code) ) in <foreach item="item" collection="vo" open="(" separator="," ...


#### insertModel (insert)
- 테이블: dw_model_mast_input
- 컬럼: 
- SQL: INSERT INTO dw_model_mast_input ( MODEL, code, description, Tray_Cell, use_yn, create_date, create_name ) VALUES ( ?, ?, ?, ?, ?, GETDATE(), ? )...


#### insertProduct (insert)
- 테이블: dw_product_mast_input
- 컬럼: 
- SQL: INSERT INTO dw_product_mast_input ( line, Prod_code, Model, Inch, Glass_thick, Version, Spec, Unit, Unit_code, customer_name, customer_code, Sheet, Block, Cell, Run_Size, Mass_Prod, Note, create_date,...


#### updateModel (update)
- 테이블: dw_model_mast_input
- 컬럼: 
- SQL: UPDATE dw_model_mast_input SET code = ?, description = ?, Tray_Cell = ?, use_yn = ? WHERE MODEL = ?...


#### updateProduct (update)
- 테이블: dw_product_mast_input
- 컬럼: 
- SQL: UPDATE dw_product_mast_input SET Model = ?, Inch = ISNULL(?,0), Glass_thick = ?, Version = ?, Spec = ?, Unit = ?, Unit_code = ?, customer_name = ?, customer_code = ?, Sheet = ISNULL(?,0), Block = ISNU...


#### uploadFilmImage (update)
- 테이블: set
- 컬럼: 
- SQL: MERGE dw_model_image AS tg USING (select ? model) AS src ON tg.model = src.model WHEN MATCHED THEN UPDATE SET image_data = ?,upload_date = getdate() WHEN NOT MATCHED THEN INSERT (model, code, image_da...


#### deleteModel (delete)
- 테이블: dw_model_mast_input
- 컬럼: 
- SQL: DELETE FROM dw_model_mast_input WHERE MODEL = ?...


#### deleteProduct (delete)
- 테이블: dw_product_mast_input
- 컬럼: 
- SQL: DELETE FROM dw_product_mast_input WHERE line = ? and Prod_code = ?...


---

## 화면: M0002003 - Tab 0 제품 공정 마스터
메뉴경로: Tab 0 제품 공정 마스터
탭: TAB011000, TAB012000, TAB013000, TAB014000, TAB020006, TAB020007
설명: 제품 공정 마스터, 공정 마스터, 공정 스텝 마스터, 스텝 마스터, 공정별 모니터링, 공정별 불량코드

### 관련 쿼리

#### selectProdProcList (select)
- 테이블: dw_product_process, dw_product_mast, dw_model_mast
- 컬럼: a.line, a.prod_code, a.model, c.description, b.inch, b.Glass_thick, b.Version, b.Sheet, b.Block, b.RUN_SIZE...
- SQL: SELECT a.line, a.prod_code, a.model, c.description as model_name, b.inch, b.Glass_thick , b.Version as prod_version, b.Sheet, b.Block, b.RUN_SIZE, b.spec, a.process_id, a.version, a.create_date, a.cre...


#### checkInsertProdProc (select)
- 테이블: dw_product_process
- 컬럼: '/'), 'NoData')
- SQL: select COALESCE(STRING_AGG(line+'-'+Prod_code+'-'+process_id, '/'), 'NoData') AS prodProcess from dw_product_process a where (line + '-' + upper(Prod_code) + '-' + upper(process_id) ) in <foreach item...


#### selectProcessList (select)
- 테이블: dw_process_mast
- 컬럼: line, process_id, description, version, create_date, create_name
- SQL: SELECT line, process_id, description, version, create_date, create_name FROM dw_process_mast...


#### selectProcess (select)
- 테이블: dw_process_mast
- 컬럼: line, description
- SQL: select line + '-' + process_id + '-' + 'v' + cast(version as varchar) as process, description from dw_process_mast...


#### checkDeleteProcess (select)
- 테이블: dw_process_mast, dw_product_process
- 컬럼: '/'), 'NoData')
- SQL: select COALESCE(STRING_AGG(line+'-'+process_id, '/'), 'NoData') AS process from dw_process_mast a where (line + '-' + process_id ) in <foreach item="item" collection="vo" open="(" separator="," close=...


#### checkInsertProcess (select)
- 테이블: dw_process_mast
- 컬럼: '/'), 'NoData')
- SQL: select COALESCE(STRING_AGG(line+'-'+process_id, '/'), 'NoData') AS process from dw_process_mast a where (line + '-' + upper(process_id) ) in <foreach item="item" collection="vo" open="(" separator=","...


#### selectProcessPlanList (select)
- 테이블: dw_process_plan, splitnextprocess, dw_step_mast, nextprocessnames, aggregatedresults
- 컬럼: p.line, p.process_id, p.version, p.공정코드, p.공정명, p.공정약어, p.다음공정, p.Area, p.공정구분, p.use_yn...
- SQL: WITH SplitNextProcess AS ( SELECT p.line, p.process_id, p.version, p.공정코드, p.공정명, p.공정약어, p.다음공정, p.Area, p.공정구분, p.use_yn, p.등록일, p.등록자, LTRIM(RTRIM(s.value)) AS 다음공정코드 FROM dw_process_plan p CROSS A...


#### checkDeleteProcessPlan (select)
- 테이블: dw_process_mast, dw_prod_proc_mast
- 컬럼: '/'), 'NoData')
- SQL: select COALESCE(STRING_AGG(line+'-'+process_id, '/'), 'NoData') AS process from dw_process_mast a where (line + '-' + process_id ) in <foreach item="item" collection="vo" open="(" separator="," close=...


#### checkInsertProcessPlan (select)
- 테이블: dw_process_plan
- 컬럼: '/'), 'NoData')
- SQL: select COALESCE(STRING_AGG(line+'-'+process_id+'-'+cast(version as varchar)+'-'+공정코드, '/'), 'NoData') AS processPlan from dw_process_plan a where (line + '-' + upper(process_id) + '-' + cast(version a...


#### selectStepList (select)
- 테이블: dw_step_mast
- 컬럼: a.line, a.공정코드, a.공정명, a.공정약어, a.공정구분, a.area, case, a.작업순서, a.목표치, a.remark...
- SQL: SELECT a.line, a.공정코드, a.공정명, a.공정약어, a.공정구분 as area_code, a.area, case when a.치수관리 = '1' then 'Y' else 'N' end as 치수관리, a.작업순서, a.목표치, case when a.작업여부 = '1' then 'Y' else 'N' end as 작업여부, a.remark, ...


#### checkDeleteStep (select)
- 테이블: dw_step_mast, dw_process_plan
- 컬럼: '/'), 'NoData')
- SQL: select COALESCE(STRING_AGG(공정코드, '/'), 'NoData') AS 공정코드 from dw_step_mast a where (공정코드) in <foreach item="item" collection="vo" open="(" separator="," close=")" > #{item.공정코드} </foreach> and exists ...


#### checkInsertStep (select)
- 테이블: dw_step_mast
- 컬럼: '/'), 'NoData')
- SQL: select COALESCE(STRING_AGG(공정코드, '/'), 'NoData') AS step from dw_step_mast a where (upper(공정코드)) in <foreach item="item" collection="vo" open="(" separator="," close=")" > upper(#{item.공정코드}) </foreac...


#### selectSourceProcess (select)
- 테이블: dw_process_mast
- 컬럼: line, process_id, description
- SQL: select line,process_id,description 공정설명 from dw_process_mast;...


#### selectTargetProcess (select)
- 테이블: dw_process_mast, dw_process_plan
- 컬럼: line, process_id, description
- SQL: select line,process_id,description 공정설명 from dw_process_mast a where not exists (select 1 from dw_process_plan b where a.process_id=b.process_id);...


#### saveNewProdProcess (select)
- 테이블: 
- 컬럼: 
- SQL: exec Set_신규제품_공정마스터 @yyyymmdd = ?;...


#### updateProdProc (update)
- 테이블: dw_product_process
- 컬럼: 
- SQL: UPDATE dw_product_process SET process_id = ?, version = ? WHERE line = ? AND prod_code = ?...


#### updateProcess (update)
- 테이블: dw_process_mast
- 컬럼: 
- SQL: UPDATE dw_process_mast SET description = ?, version = ?, create_date = GETDATE(), create_name = ? WHERE line = ? AND process_id = ?...


#### updateProcessPlan (update)
- 테이블: dw_process_plan
- 컬럼: 
- SQL: UPDATE dw_process_plan SET 다음공정 = #{다음공정코드}, use_yn = case when ? = 'Y' then '1' else '0' end WHERE line = ? AND process_id = ? and version = ? AND 공정코드 = #{공정코드}...


#### updateStep (update)
- 테이블: dw_step_mast
- 컬럼: 
- SQL: UPDATE dw_step_mast SET 공정명 = #{공정명}, 공정약어 = #{공정약어}, area = ?, 공정구분 = ?, 치수관리 = CASE WHEN #{치수관리} = 'Y' THEN 1 ELSE 0 END, 작업순서 = ISNULL(#{작업순서},0), 목표치 = ISNULL(#{목표치},0.0), 작업여부 = CASE WHEN #{작업여부}...


#### deleteProdProc (delete)
- 테이블: dw_product_process
- 컬럼: 
- SQL: DELETE FROM dw_product_process WHERE line = ? AND prod_code = ? and process_id = ?...


#### deleteProcess (delete)
- 테이블: dw_process_mast
- 컬럼: 
- SQL: DELETE FROM dw_process_mast WHERE line = ? AND process_id = ?...


#### deleteProcessPlan (delete)
- 테이블: dw_process_plan
- 컬럼: 
- SQL: DELETE FROM dw_process_plan WHERE line = ? AND process_id = ? and version = ? AND 공정코드 = #{공정코드}...


#### deleteStep (delete)
- 테이블: dw_step_mast
- 컬럼: 
- SQL: DELETE FROM dw_step_mast WHERE line = ? and 공정코드 = #{공정코드}...


---

## 화면: M0003001 - Tab 0 생산 실적 입력
메뉴경로: Tab 0 생산 실적 입력
탭: TAB031000, TAB023000, TAB024000
설명: 생산 실적 입력, 작업 이력 조회, 설비 로그 조회

### 관련 쿼리

#### selectBack1ProdStat (select)
- 테이블: d22_run, d03_, d05_, d04_
- 컬럼: b.거래처명, a.제품코드, c.제품모델, c.제품Inch, c.제품버젼, d.자재품명, c.제품규격, a.입고일자, 112), a.CELL수...
- SQL: select /*Back#1 - 제품현황*/ a.거래처코드 ,b.거래처명 ,a.제품코드 ,c.제품모델 ,c.제품Inch ,c.제품버젼 ,d.자재품명 --Glass ,c.제품규격 --Cell size ,convert(date, a.입고일자, 112) as 입고일자 ,a.CELL수 ,convert(date, e.작업종료, 112) as 작업종료 ,e.양품수량 ...


#### selectRunProdVLR (select)
- 테이블: d22_run, dw_equipment_mast
- 컬럼: a.RUN_NO, a.공정코드, 레시피, a.LOT_NO, a.LOT_등분, a.작업시작, a.시작시각, a.작업종료, a.종료시각, a.작업일자...
- SQL: select /*selectRunProdVLR*/ a.공장코드 ,a.RUN_NO ,a.공정코드 ,레시피 ,a.LOT_NO ,a.LOT_등분 ,a.작업시작 ,a.시작시각 ,a.작업종료 ,a.종료시각 ,a.작업일자 ,a.작업자 ,a.작업조 ,a.Machine_Code ,b.설비약명 ,a.SHIFT ,a.책임자 ,a.책임자시작 ,a.책임자종료 ,a.선임자 ,a....


#### selectProcessLog022 (select)
- 테이블: getrework
- 컬럼: a.공장코드, a.run_no, '022', a.차수, '00'), a.bef_공정코드, a.NXT_공정코드, a.박리작업구분, a.작업자, a.작업조...
- SQL: /*rework - 022 작업시작 한번도 안했다면*/ select a.공장코드 ,a.run_no ,'022' as 공정코드 ,a.차수 ,FORMAT(row_number() over (order by a.f_cstno),'00') as SEQ ,a.bef_공정코드 ,a.NXT_공정코드 ,a.박리작업구분 ,a.작업자 ,a.작업조 ,a.작업시작 ,a.시작시각 ...


#### selectProcess022 (select)
- 테이블: d22_run
- 컬럼: 공장코드, RUN_NO, 공정코드, SEQ, LOT_NO, BEF_공정코드, NXT_공정코드, 박리작업구분, 작업자, 작업조...
- SQL: /*rework - 022 - 카세트 정보 있다면*/ select 공장코드, RUN_NO, 공정코드, SEQ, LOT_NO, BEF_공정코드, NXT_공정코드, 박리작업구분, 작업자, 작업조, 작업시작, 시작시각, SHIFT, F_CSTNO, F_수량, F_불량수량, 작업종료, 종료시각, 투입수량, Machine_Code, 배출구, T_RUNNO, IN_C...


#### selectProcessLog023 (select)
- 테이블: get
- 컬럼: a.작업종료, a.종료시각, a.f_cstno), '00'), 설비cell수량, a.lot_no+'|'+
- SQL: /*back#1 - 박리(023) 작업시작 한번도 안했다면*/ select a.* ,FORMAT(row_number() over (order by a.zone,a.작업종료,a.종료시각,a.f_cstno),'00') as SEQ ,count(t_수량) over(partition by t_cstno) as t_cnt ,설비cell수량 as t_org수량 ,a....


#### selectProcessM023 (select)
- 테이블: get
- 컬럼: '2', run_no, #{process}, lot_no), '00'), lot_no, lot기준_총Cell수량, 보정_Lot기준_설비처리총Cell수량, 설비cell수량, null...
- SQL: /*back#1 - 박리(023) 수동*/ select '2' as 공장코드 ,run_no ,? as 공정코드 ,FORMAT(row_number() over (order by 설비cell수량 desc, lot_no),'00') as SEQ ,lot_no ,lot기준_총Cell수량 as cell ,보정_Lot기준_설비처리총Cell수량 as adj_cell ,...


#### selectProcess023 (select)
- 테이블: get, d22_run, d21_, log_list, dw_equipment_mast
- 컬럼: 
- SQL: /*back#1 - 박리(023) 카세트가 있다면*/ with log_list as( select * from Get자동박리카세트리스트(?) ) select 공장코드,RUN_NO,a.공정코드,seq,작업자,작업조,a.lot_no,cell,F_CSTNO,F_수량,F_불량수량 ,시작시각,종료시각,a.T_CSTNO,특이사항 ,a.MACHINE_CODE,투입수량 ...


#### selectProcess (select)
- 테이블: d22_run
- 컬럼: 공장코드, RUN_NO, 공정코드, SEQ, LOT_NO, BEF_공정코드, NXT_공정코드, 박리작업구분, 작업자, 작업조...
- SQL: /*back#1 - 작업시작 한번 작업완료 했다면*/ select 공장코드, RUN_NO, 공정코드, SEQ, LOT_NO, BEF_공정코드, NXT_공정코드, 박리작업구분, 작업자, 작업조, 작업시작, 시작시각, SHIFT, F_CSTNO, F_수량, F_불량수량, 작업종료, 종료시각, 투입수량, Machine_Code, 배출구, T_RUNNO, IN_C...


#### selectProcessTrans (select)
- 테이블: d22_run, get, dw_equipment_mast
- 컬럼: 공장코드, RUN_NO, a.공정코드, SEQ, LOT_NO, BEF_공정코드, NXT_공정코드, 박리작업구분, 작업자, 작업조...
- SQL: /*back#1 - (전,후 환적) 저장된 카세트 있다면*/ select 공장코드, RUN_NO, a.공정코드, SEQ, LOT_NO, BEF_공정코드, NXT_공정코드, 박리작업구분, 작업자, 작업조, 작업시작, 시작시각, SHIFT, F_CSTNO, F_수량, F_불량수량, 작업종료, 종료시각, 투입수량, a.Machine_Code, d.설비약명 as ...


#### selectProcessLog027 (select)
- 테이블: d22_run, cst
- 컬럼: T_CSTNO, '027', '023', '033', 0
- SQL: /*back#1 - 박리 후 세정(027) 작업시작 한번도 안했다면*/ with cst as ( select max(공장코드) as 공장코드 ,max(RUN_NO) as RUN_NO ,max(lot_no) as lot_no ,T_CSTNO as F_CSTNO ,sum(T_수량) as F_수량 ,'027' as 공정코드 ,max(SEQ) as seq ,'02...


#### selectProcessLog033 (select)
- 테이블: d22_run, cst
- 컬럼: T_CSTNO, '033', '027', '035', 0
- SQL: /*back#1 - bTP(033) 저장된 카세트가 없다면*/ with cst as ( select max(공장코드) as 공장코드 ,max(RUN_NO) as RUN_NO ,max(lot_no) as lot_no ,T_CSTNO as F_CSTNO ,sum(T_수량) as F_수량 ,'033' as 공정코드 ,max(seq) as SEQ ,'027' as...


#### selectProcessLog035 (select)
- 테이블: d22_run, cst
- 컬럼: T_CSTNO, '035', '033', '037', 0
- SQL: /*back#1 - 재세정(035) 작업시작 한번도 안했다면*/ with cst as ( select max(공장코드) as 공장코드 ,max(RUN_NO) as RUN_NO ,max(lot_no) as lot_no ,T_CSTNO as F_CSTNO ,sum(T_수량) as F_수량 ,'035' as 공정코드 ,max(seq) as SEQ ,'033' a...


#### selectProcessLog059 (select)
- 테이블: d22_run, d42_, cst, bad
- 컬럼: T_CSTNO, '059', '00'), '022', '056', 0
- SQL: /*Rework 재세정(059) 작업시작 한번도 안했다면*/ with cst as ( select max(공장코드) as 공장코드 ,max(RUN_NO) as RUN_NO ,max(lot_no) as lot_no ,T_CSTNO as F_CSTNO ,sum(T_수량) as F_수량 ,'059' as 공정코드 ,FORMAT(row_number() over (...


#### selectProcessLog037 (select)
- 테이블: get, dw_equipment_mast
- 컬럼: t_수량
- SQL: /*back#1 - 전환적(037) 저당된 카세트 없다면*/ select a.* ,count(t_수량) over(partition by t_cstno) as t_cnt ,sum(t_수량) over(partition by t_cstno) as t_수량 ,t_수량 as t_org수량 from ( select 공장코드 ,RUN_NO ,a.공정코드 ,FORMAT(...


#### selectProcessM037 (select)
- 테이블: d22_run
- 컬럼: 공장코드, RUN_NO, 공정코드, seq, lot_no, '035', '040', 박리작업구분, null, t_cstno...
- SQL: /*back#1 - 전환적(037) 수동*/ select 공장코드 ,RUN_NO ,공정코드 ,seq ,lot_no ,'035' as BEF_공정코드 ,'040' as NXT_공정코드 ,박리작업구분 ,null as 작업자 ,null as 작업조 ,null as 작업시작 ,null as 시작시각 ,null as SHIFT ,t_cstno as F_CSTNO ,...


#### selectProcessLog040 (select)
- 테이블: d22_run, cst
- 컬럼: T_CSTNO, '040', '037', '043', 0
- SQL: /*back#1 - 강화(040) 카세트가 저장되어 있지 않다면*/ with cst as ( select max(공장코드) as 공장코드 ,max(RUN_NO) as RUN_NO ,max(lot_no) as lot_no ,T_CSTNO as F_CSTNO ,sum(T_수량) as F_수량 ,'040' as 공정코드 ,max(seq) as SEQ ,'037'...


#### selectProcessLog043 (select)
- 테이블: get, dw_equipment_mast
- 컬럼: t_수량
- SQL: /*back#1 - 후환적(043) 작업시작 한번도 안했다면*/ select a.* , count(t_수량) over(partition by t_cstno) as t_cnt , sum(t_수량) over(partition by t_cstno) as t_수량 , t_수량 as t_org수량 from ( select 공장코드 ,RUN_NO ,a.공정코드 ,FO...


#### selectProcessM043 (select)
- 테이블: d22_run
- 컬럼: 공장코드, RUN_NO, 공정코드, seq, lot_no, '040', '047', 박리작업구분, null, t_cstno...
- SQL: /*back#1 - 수동 후환적(043)*/ select 공장코드 ,RUN_NO ,공정코드 ,seq ,lot_no ,'040' as BEF_공정코드 ,'047' as NXT_공정코드 ,박리작업구분 ,null as 작업자 ,null as 작업조 ,null as 작업시작 ,null as 시작시각 ,null as SHIFT ,t_cstno as F_CSTNO ,...


#### selectProcessLog047 (select)
- 테이블: d22_run, cst
- 컬럼: T_CSTNO, '047', '043', '052', 0
- SQL: /*back#1 - 강화 후 세정(047) 작업시작 한번도 안했다면*/ with cst as ( select max(공장코드) as 공장코드 ,max(RUN_NO) as RUN_NO ,max(lot_no) as lot_no ,T_CSTNO as F_CSTNO ,sum(T_수량) as F_수량 ,'047' as 공정코드 ,max(seq) as SEQ ,'04...


#### selectProcessLog050 (select)
- 테이블: d22_run, cst
- 컬럼: T_CSTNO, '050', '047', 0
- SQL: /*back#1 - aPT(050) 작업시작 한번도 안했다면*/ with cst as ( select max(공장코드) as 공장코드 ,max(RUN_NO) as RUN_NO ,max(lot_no) as lot_no ,T_CSTNO as F_CSTNO ,sum(T_수량) as F_수량 ,'050' as 공정코드 ,max(seq) as SEQ ,'047' a...


#### saveBadCnt (select)
- 테이블: d42_, d29_
- 컬럼: distinct
- SQL: /*삭제 후 추가*/ delete from d42_검사불량사유파일 where 공장코드 = '2' and 공정코드 = ? and LOTRUN_ID = case when ? = '-' then ? else ? end and CST_NO in (?,?) and 불량코드 = ( select distinct 불량코드 from d29_공정별불량파일 where 공정코드...


#### checkExistCst (select)
- 테이블: d22_run
- 컬럼: top
- SQL: select top 1 run_no from d22_RUN카세트파일 a WITH (NOLOCK) inner join ( select max(차수) as 차수 from d22_RUN제조VLR where run_no = ? and 공정코드 = ? ) b on (a.차수 = b.차수) where 공장코드 = 2 and run_no = ? and 공정코드 = ?...


#### selectBack1McList (select)
- 테이블: dw_equipment_mast
- 컬럼: 설비약명
- SQL: select /*selectBack1McList*/ 설비번호 as value ,설비약명 as text from dw_equipment_mast where 공정코드 = ? and 사용여부 = 1 order by 설비번호...


#### selectProcessesStatus (select)
- 테이블: doi_cm_sys_resource, d22_run
- 컬럼: SYS_RESOURCE_NAME, seq, b.투입수량, b.양품수량, b.불량수량, 0), case, '')
- SQL: select /*공정별 상태 조회*/ SYS_RESOURCE_ID ,SYS_RESOURCE_NAME ,seq ,b.투입수량 ,b.양품수량 ,b.불량수량 ,b.양품수량 / NULLIF(b.투입수량,0) * 100 as yield ,case when nullif(b.작업시작,'') is null and nullif(b.작업종료,'') is null then '...


#### selectLotCell (select)
- 테이블: d22_run, d42_
- 컬럼: a.공정코드, a.run_no, a.차수, a.Machine_Code, a.lot_no, a.cst_no, a.cst_cell, a.f_불량수량, 0), pkey...
- SQL: select a.공정코드, a.run_no, a.차수, a.Machine_Code,a.lot_no, a.cst_no, a.cst_cell, a.f_불량수량, isnull(b.불량수량,0) as 불량수량, pkey ,seq,a.t_cstno from ( select 공정코드, run_no, a.차수, a.Machine_Code,a.lot_no, f_cstno...


#### selectInCstCell (select)
- 테이블: d22_run, d42_
- 컬럼: a.공정코드, a.run_no, a.차수, a.Machine_Code, a.cst_no, a.cst_cell, a.f_불량수량, 0), pkey, t_cstno
- SQL: select a.공정코드, a.run_no, a.차수, a.Machine_Code, a.cst_no, a.cst_cell, a.f_불량수량, isnull(b.불량수량,0) as 불량수량, pkey,t_cstno from ( select 공정코드, run_no, a.차수, a.Machine_Code, f_cstno cst_no, sum(f_수량) cst_ce...


#### selectVerInCstCell (select)
- 테이블: d22_run, d42_
- 컬럼: a.공정코드, a.run_no, a.차수, a.Machine_Code, a.cst_no, a.cst_cell, a.f_불량수량, b.불량수량, pkey, t_cstno
- SQL: select a.공정코드, a.run_no, a.차수, a.Machine_Code, a.cst_no, a.cst_cell, a.f_불량수량, b.불량수량, pkey,t_cstno from ( select 공정코드, run_no, a.차수, a.Machine_Code, f_cstno cst_no, sum(f_수량) cst_cell, sum(f_불량수량) f_...


#### selectNextProcess (select)
- 테이블: dw_process_plan
- 컬럼: rslt.Value, b.공정명
- SQL: SELECT rslt.Value AS value ,b.공정명 as text FROM dw_process_plan a CROSS APPLY dbo.SplitString(a.다음공정, ',') AS rslt left outer join ( select 공정코드 ,공정명 from dw_process_plan where line = 'DFB1' and proces...


#### selectProdStatusInfoBack1 (select)
- 테이블: d22_run, d05_, d04_, dw_common_code, dw_product_process, dw_process_plan, dw_equipment_mast
- 컬럼: 
- SQL: /*selectProdStatusInfoBack1*/ select * from ( select e.code_name as 투입구분 ,d.자재재질 as 사양 ,d.자재두께 as 두께 ,c.제품모델 as model ,c.제품Inch as inch ,a.적층수 as 층수 from d22_RUN제조MST a WITH (NOLOCK) left outer join d...


#### selectProdStatusInfoBack2 (select)
- 테이블: d22_run, d05_, d04_, dw_common_code, dw_run_cell_data, dw_product_process, dw_process_plan, dw_equipment_mast
- 컬럼: 
- SQL: /*selectProdStatusInfoBack2*/ select * from ( select e.code_name as 투입구분 ,d.자재재질 as 사양 ,d.자재두께 as 두께 ,c.제품모델 as model ,c.제품Inch as inch ,a.적층수 as 층수 from d22_RUN제조MST a WITH (NOLOCK) left outer join d...


#### selectLotNoByRunNo (select)
- 테이블: d21_
- 컬럼: lot_no
- SQL: select lot_no from d21_제조지시MST WITH (NOLOCK) where run_no1 = ? or run_no2 = ?...


#### selectProdStatusInfoFront (select)
- 테이블: d21_, d05_, d04_, dw_common_code, dw_product_process, dw_process_plan, dw_equipment_mast
- 컬럼: 
- SQL: /*selectProdStatusInfoFront*/ select * from ( select a.lot_no ,e.code_name as 투입구분 ,d.자재재질 as 사양 ,d.자재두께 as 두께 ,c.제품모델 as model ,c.제품Inch as inch ,a.적층수 as 층수 from d21_제조지시MST a WITH (NOLOCK) left out...


#### selectProcess023CellEqQty (select)
- 테이블: get
- 컬럼: lot_no, t_cstno, 설비cell수량
- SQL: /*박리 - 설비셀수량 보여주기 위해 가져오기*/ select lot_no ,t_cstno ,설비cell수량 as CELL_EQ_QTY from Get자동박리카세트리스트(?) where t_cstno like '%add%'...


#### execQipFromPPB (select)
- 테이블: 
- 컬럼: 
- SQL: exec Gen품질검사대기From제조실적bareCell '431',?,?,?;...


#### selectPreProcNoInpuCst (select)
- 테이블: check
- 컬럼: F_cstno
- SQL: select F_cstno as cst_no from Check전공정미투입카세트(?,?)...


#### execCstChangeSt (select)
- 테이블: 
- 컬럼: 
- SQL: exec Cassette상태변경_제조실적입력 ?,?...


#### checkReCleaning (select)
- 테이블: checkvalidation_
- 컬럼: 
- SQL: select * from CheckValidation_전환적전재세정_DateTimeCheck(?,?);...


#### checkForceWaitTime (select)
- 테이블: checkvalidation_
- 컬럼: 
- SQL: select * from CheckValidation_강화투입대기시간(?)...


#### checkCstValidation (select)
- 테이블: checkvalidation_
- 컬럼: 
- SQL: select * from CheckValidation_투입카세트(?,?)...


#### selectProdStatusInfoRework (select)
- 테이블: d22_run, d05_, d04_, dw_common_code, getmrun, dw_process_plan
- 컬럼: e.code_name, d.자재재질, d.자재두께, c.제품모델, c.제품Inch, a.적층수, g.공정명, '', f.작업종료, f.종료시각...
- SQL: /*selectProdStatusInfoRework*/ select e.code_name as 투입구분 ,d.자재재질 as 사양 ,d.자재두께 as 두께 ,c.제품모델 as model ,c.제품Inch as inch ,a.적층수 as 층수 ,g.공정명 ,'' as mc ,f.작업종료 ,f.종료시각 ,f.시료수량 ,f.특이사항 from d22_RUN제조MST...


#### checkValidationOutCst (select)
- 테이블: checkvalidation_
- 컬럼: cst_no, message
- SQL: select cst_no ,message from CheckValidation_출하카세트(?,?)...


#### selectInCstCellInMbox (select)
- 테이블: d22_run, d42_
- 컬럼: a.공장코드, a.run_no, '022', a.차수, a.seq, a.lot_no, a.bef_공정코드, a.NXT_공정코드, a.박리작업구분, a.작업자...
- SQL: /*selectInCstCellInMbox*/ select a.공장코드 ,a.run_no ,'022' as 공정코드 ,a.차수 ,a.seq ,a.lot_no ,a.bef_공정코드 ,a.NXT_공정코드 ,a.박리작업구분 ,a.작업자 ,a.작업조 ,a.작업시작 ,a.시작시각 ,a.shift ,a.f_cstno as CST_NO ,a.f_수량 as CST_CEL...


#### selectNextRunProdVLR (select)
- 테이블: d22_run
- 컬럼: a.RUN_NO, a.공정코드, a.LOT_NO, a.LOT_등분, a.작업시작, a.시작시각, a.작업종료, a.종료시각, a.작업일자, a.작업자...
- SQL: select /*selectNextRunProdVLR*/ a.공장코드 ,a.RUN_NO ,a.공정코드 ,a.LOT_NO ,a.LOT_등분 ,a.작업시작 ,a.시작시각 ,a.작업종료 ,a.종료시각 ,a.작업일자 ,a.작업자 ,a.작업조 ,a.Machine_Code ,a.SHIFT ,a.책임자 ,a.책임자시작 ,a.책임자종료 ,a.선임자 ,a.P_CODE ,a...


#### selectPreProcessCstInfo (select)
- 테이블: d22_run
- 컬럼: a.공정코드, a.seq, a.t_cstno, a.t_수량
- SQL: /*selectPreProcessCstInfo - 이전(완료)공정 카세트정보*/ select a.공정코드 ,a.seq ,a.t_cstno ,a.t_수량 from d22_RUN카세트파일 a WITH (NOLOCK) inner join ( select top 1 a.공장코드 ,a.run_no ,a.공정코드 ,a.차수 from d22_RUN제조VLR a WITH...


#### selectStartJobAlbe (select)
- 테이블: get_
- 컬럼: 
- SQL: select isnull((select top 1 진행가능여부 from Get_이전공정정보_RunNo_공정코드(?,?)),'진행불가')...


#### insertSpecialNote (insert)
- 테이블: d39_
- 컬럼: 
- SQL: /*2025.3.4 추가*/ INSERT INTO d39_공정별특이사항파일 ( 공장코드 , 공정코드 , 관리번호 , CST_NO , 의뢰일자 , 특이사항 , 차수 ) VALUES ( '2' , ? , ? , ? , FORMAT(GETDATE(), 'yyyyMMdd HHmmss') , #{특이사항} , #{차수} );...


#### updateStartJobVLR (update)
- 테이블: d22_run, get
- 컬럼: Shift
- SQL: /*d22_RUN제조VLR - 작업시작*/ UPDATE d22_RUN제조VLR SET 작업자 = ? ,작업조 = (select Shift from Get주간야간구분()) ,SHIFT = ? ,MACHINE_CODE = ? ,작업시작 = #{작업시작} ,시작시각 = #{시작시각} ,작업종료 = null ,종료시각 = null ,투입수량 = #{투입수량} ,검...


#### updateEndJobVLR (update)
- 테이블: d22_run, get
- 컬럼: Shift
- SQL: update d22_RUN제조VLR set /*updateEndJobVLR*/ 작업종료 = #{작업종료} ,종료시각 = #{종료시각} ,투입수량 = #{투입수량} ,검사수량 = #{검사수량} ,불량수량 = case when #{불량수량} is null then 0 else #{불량수량} end ,양품수량 = case when #{양품수량} is null t...


#### updateTempSaveVLR (update)
- 테이블: d22_run
- 컬럼: 
- SQL: update d22_RUN제조VLR set /*updateTempSaveVLR*/ 투입수량 = #{투입수량} ,검사수량 = #{검사수량} ,불량수량 = case when #{불량수량} is null then 0 else #{불량수량} end ,양품수량 = case when #{양품수량} is null then 0 else #{양품수량} end where r...


#### mergeRunCst (update)
- 테이블: d22_run, set, get
- 컬럼: '2', #{runNo}, #{process}, #{seq}, '')), #{차수}, T_CSTNO, F_수량, F_불량수량, T_수량...
- SQL: MERGE INTO d22_RUN카세트파일 AS tg USING ( select '2' as 공장코드 ,? as RUN_NO ,? as 공정코드 ,? as SEQ ,isnull(?,CONVERT(VARBINARY, '')) as f_Cstno ,#{차수} as 차수 ) AS src ON tg.공장코드 = src.공장코드 and tg.RUN_NO = src....


#### updateCstJobEndDateTime (update)
- 테이블: d22_run
- 컬럼: 
- SQL: update d22_RUN카세트파일 set 작업종료 = #{작업종료} ,종료시각 = #{종료시각} where run_no = ? and 공정코드 = ? and 차수 = #{차수}...


#### deleteCstList (delete)
- 테이블: d22_run
- 컬럼: 
- SQL: DELETE FROM D22_RUN카세트파일 WHERE RUN_NO = ? AND 공정코드 = ?...


---

## 화면: M0003002 - Tab 0 생산 실적 입력
메뉴경로: Tab 0 생산 실적 입력
탭: TAB032000, TAB033000, TAB034000
설명: 생산 실적 입력, 설비 로그 조회, 설비 로그 조회

### 관련 쿼리

#### M0003002_Sch1 (select)
- 테이블: get_, dw_process_plan
- 컬럼: b.공정코드, b.공정명
- SQL: select b.공정코드, b.공정명 from Get_다음공정정보_RunNo_공정코드_다음공정코드_지정(?,#{공정코드},null) a left join dw_process_plan b on (a.process_id = b.process_id and a.공정코드 = b.공정코드) order by b.공정코드...


#### M0003002_Sch2 (select)
- 테이블: get, d22_run, d03_, d04_, d05_, dw_equipment_mast, get_, dw_common_code, dw_
- 컬럼: c.거래처명, e.제품모델, e.제품inch, e.제품버젼, e.제품규격, a.입고일자, a.작업일자, 특기사항, 승인자, b.machine_code...
- SQL: ...


#### M0003002_LogChk (select)
- 테이블: getism, getagb, get, getpfl
- 컬럼: 
- SQL: ...


#### M0003002_Sch4 (select)
- 테이블: d22_run
- 컬럼: seq, run_no, 공정코드, lot_no, f_cstno, 작업자, 작업조, shift, nxt_공정코드, 작업시작...
- SQL: ...


#### M0003002_Sch5 (select)
- 테이블: d29_
- 컬럼: 불량코드, 불량명, 사용여부
- SQL: select 불량코드, 불량명, 사용여부 from d29_공정별불량파일 where 공정코드 = #{공정코드} order by 적용순서...


#### M0003002_Sch8 (select)
- 테이블: d42_
- 컬럼: 공정코드, lotrun_id, machine_code, cst_no, 불량위치, 불량코드, 검사시각, 불량수량, 'none', 차수
- SQL: select 공정코드, lotrun_id, machine_code, cst_no, 불량위치, 불량코드, 검사시각, 불량수량, 'none' state, 차수 from d42_검사불량사유파일_cell where 공장코드 = '2' and 공정코드 = #{공정코드} and lotrun_id = ? and cst_no = ? and 불량코드 = #{불량코드} an...


#### M0003002_Sch14 (select)
- 테이블: get
- 컬럼: a.공정코드, a.불량코드, a.불량명, case
- SQL: select a.공정코드, a.불량코드, a.불량명, case when a.공정코드 = '061' and a.불량코드 = '400' then '271' when a.공정코드 = '061' and a.불량코드 = '401' then '441' end 불량유형코드 from Get공정별불량파일(?, #{공정코드}, #{자동여부}) a where a.비고 = '2...


#### M0003002_Sch10 (select)
- 테이블: d22_run
- 컬럼: run_no, 공정코드, lot_no, f_cstno, 작업자, 작업조, shift, nxt_공정코드, 작업시작, 시작시각...
- SQL: ...


#### M0003002_Sch15 (select)
- 테이블: dw_run_cell_data, d22_run, sample
- 컬럼: a.cst_no
- SQL: WITH sample AS ( select a.cst_no, sum(qty) qty from ( select a.cst_no, a.cell_id, a.신뢰성시료유형, case when nullif(a.신뢰성시료유형, '') is not null then 1 else 0 end qty from ( select a.* from dw_run_cell_data a...


#### M0003002_Sch16 (select)
- 테이블: dw_run_cell_data, d22_run
- 컬럼: run_id, 공정코드, cst_no, cell_id, 시료일자, 신뢰성작업확인, 신뢰성시료유형, a.차수
- SQL: select run_id, 공정코드, cst_no, cell_id, 시료일자, 신뢰성작업확인, 신뢰성시료유형, a.차수 from dw_run_cell_data a join (select isNull(max(차수), 1) 차수 from d22_run제조vlr where run_no = ? and 공정코드= #{공정코드}) h on (h.차수 = a.차수) w...


#### M0003002_Sch11 (select)
- 테이블: d88_pfl, d84_dpfbfl_cell
- 컬럼: distinct, cell_id, start_time, end_time, film_id_상부, film_id_하부, mcr_write
- SQL: ...


#### M0003002_Sch12 (select)
- 테이블: dw_run_cell_data, d22_run
- 컬럼: run_id, cst_no, cell_id, a.차수, a.신뢰성시료유형, a.result
- SQL: select run_id, cst_no, cell_id, a.차수, a.신뢰성시료유형, a.result from dw_run_cell_data a join (select isNull(max(차수), 1) 차수 from d22_run제조vlr where run_no = ? and 공정코드= #{공정코드}) h on (h.차수 = a.차수) where 공장코드...


#### M0003002_Sch17 (select)
- 테이블: get
- 컬럼: 불량코드, 불량명
- SQL: select 불량코드, 불량명 from Get공정별불량파일(?, #{공정코드}, #{자동여부}) where 공정코드 = #{공정코드} and 비고 = '2' order by 적용순서...


#### M0003002_Sch18 (select)
- 테이블: get, dw_run_cell_data, d22_run, sample
- 컬럼: a.신뢰성시료유형, b.불량코드
- SQL: WITH sample AS ( select a.신뢰성시료유형, b.불량코드, sum(qty) qty from Get공정별불량파일(?, #{공정코드}, #{자동여부}) b left join ( ) a on (a.신뢰성시료유형 = b.불량명) where b.비고 = '2' and nullif(a.신뢰성시료유형, '') is not null group by a....


#### M0003002_Sch19 (select)
- 테이블: check
- 컬럼: F_cstno
- SQL: select F_cstno as cst_no from Check전공정미투입카세트(?,#{공정코드})...


#### M0003002_Sch20 (select)
- 테이블: d42_, get
- 컬럼: a.불량위치, b.불량명
- SQL: with 불량집계 as ( select a.불량위치, b.불량명, sum(a.불량수량) 불량수량 from d42_검사불량사유파일_cell a left join Get공정별불량파일(?, #{공정코드}, #{자동여부}) b on a.공정코드 = b.공정코드 and a.불량코드 = b.불량코드 where a.공장코드 = '2' and a.공정코드 = #{공정코드...


#### M0003002_Sch21 (select)
- 테이블: get, d42_
- 컬럼: a.공정코드, a.불량코드, a.불량명, a.적용순서, 0), 'none'
- SQL: select a.공정코드, a.불량코드, a.불량명, a.적용순서, isNull(sum(b.불량수량), 0) 불량수량, 'none' state from Get공정별불량파일(?, #{공정코드}, #{자동여부}) a left join d42_검사불량사유파일_cell b on (b.공장코드 = '2' and a.공정코드 = b.공정코드 and a.불량코드 = b...


#### M0003002_RERUNChk (select)
- 테이블: d88_pfl, d84_dpfbfl_cell
- 컬럼: 
- SQL: ...


#### M0003002_LogStartChk (select)
- 테이블: get_
- 컬럼: 진행가능여부
- SQL: select 진행가능여부 from Get_전공정정보_RunNo_공정코드(?,#{공정코드})...


#### M0003002_HoldChk (select)
- 테이블: get_runno
- 컬럼: HOLD여부
- SQL: select HOLD여부 from Get_RunNo상태가져오기(?)...


#### M0003002_ValidationPFLChk (select)
- 테이블: checkvalidation_pfl
- 컬럼: 상태
- SQL: select 상태 from CheckValidation_PFL전재세정(?)...


#### M0003002_AGBForBareCell (select)
- 테이블: d22_run, d42_, dw_common_code
- 컬럼: run_no, 수량, 불량수량
- SQL: select run_no, 수량, 불량수량 from ( select a.run_no, a.투입수량, c.수량, case when substring(a.run_no,11,1) = 'M' then 3 else 2 end rate, CASE WHEN a.투입수량 = 0 THEN 0 ELSE CAST(b.불량수량 AS FLOAT) / a.투입수량 * 100 END...


#### M0003002_Exec_AGBForBareCell (select)
- 테이블: 
- 컬럼: 
- SQL: exec Gen품질검사대기From제조실적AGBForBareCell '271',?,?,#{수량};...


#### M0003002_CompQrInfo (select)
- 테이블: d22_run, d05_, dw_cm_qr_info
- 컬럼: e.제품모델, b.shift, b.machine_code, b.작업종료, case, '')
- SQL: select e.제품모델, b.shift, b.machine_code, b.작업종료, case when b.공정코드 = '056' then (case when nullif(b.작업시작, '') is null and nullif(b.작업종료, '') is null and h.chk = 1 then g.qr else (case when nullif(b.작업시작...


#### M0003002_Sch13 (select)
- 테이블: get, d22_run, d03_, d04_, d05_, dw_equipment_mast
- 컬럼: c.거래처명, e.제품모델, e.제품inch, e.제품버젼, e.제품규격, a.입고일자, a.작업일자, 특기사항, 승인자, b.machine_code...
- SQL: ...


#### M0003002_Sch22 (select)
- 테이블: d22_run
- 컬럼: run_no, 공정코드, lot_no, f_cstno, 작업자, 작업조, shift, nxt_공정코드, 작업시작, 시작시각...
- SQL: ...


#### M0003002_Sch23 (select)
- 테이블: d22_run
- 컬럼: run_no, 공정코드, lot_no, f_cstno, 작업자, 작업조, shift, nxt_공정코드, 작업시작, 시작시각...
- SQL: ...


#### M0003002_Sch24 (select)
- 테이블: dw_run_cell_data, d22_run, sample
- 컬럼: a.cst_no
- SQL: WITH sample AS ( select a.cst_no, sum(qty) qty from ( select a.cst_no, a.cell_id, a.신뢰성시료유형, case when nullif(a.신뢰성시료유형, '') is not null then 1 else 0 end qty from ( select a.* from dw_run_cell_data a...


#### M0003002_Sch25 (select)
- 테이블: get, dw_run_cell_data, sample
- 컬럼: a.신뢰성시료유형, b.불량코드
- SQL: WITH sample AS ( select a.신뢰성시료유형, b.불량코드, sum(qty) qty from Get공정별불량파일(?, #{공정코드}, #{자동여부}) b left join ( ) a on (a.신뢰성시료유형 = b.불량명) where b.비고 = '2' and nullif(a.신뢰성시료유형, '') is not null group by a....


#### M0003002_Sch26 (select)
- 테이블: d88_pfl, dw_equipment_mast, d25_pfl
- 컬럼: 
- SQL: select x.* from ( select 공장코드, '061' 공정코드, run_id, cst_no, cell_id, ROW_NUMBER() over (partition by run_id, cell_id order by end_time desc) 차수, f.설비약명 as 설비호기, 근무조, 작업자, start_time, end_time, '양품' res...


#### M0003002_Sch27 (select)
- 테이블: d84_dpfbfl_cell, dw_equipment_mast, d25_pfl
- 컬럼: 
- SQL: select x.* from ( select 공장코드, a.공정코드, run_no AS run_id, cst_no, cell_no AS cell_id, case when cell_no = 'EMPTY' then 1 else ROW_NUMBER() over (partition by run_no, cell_no order by 종료시각 desc) end 차수,...


#### M0003002_Insert1 (insert)
- 테이블: d42_
- 컬럼: 
- SQL: insert into d42_검사불량사유파일_cell(공장코드,공정코드,lotrun_id,cst_no,machine_code,불량위치,불량코드,불량수량,검사시각,차수) values ('2', #{공정코드}, ?, ?, ?, #{불량위치}, #{불량코드}, #{불량수량}, #{검사시각},#{차수})...


#### M0003002_RunStart (update)
- 테이블: d22_run, d42_, get
- 컬럼: 공장코드, run_no, 공정코드, seq, lot_no, bef_공정코드, NXT_공정코드, 박리작업구분, 작업자
- SQL: delete from d22_run카세트파일 where 공장코드 = '2' and run_no = ? and 공정코드 = #{공정코드} and 차수 = #{차수}; delete from d42_검사불량사유파일 where 공장코드 = '2' and 공정코드 = #{공정코드} and lotrun_id = ? and 차수 = #{차수}; delete from d...


#### M0003002_RunEnd (update)
- 테이블: d22_run
- 컬럼: 
- SQL: update d22_run제조vlr set 책임자종료 = 1, 작업종료 = #{작업종료}, 종료시각 = #{종료시각} where run_no = ? and 공정코드 = #{공정코드} and 차수 = #{차수}; update d22_run카세트파일 set NXT_공정코드 = coalesce(#{nxt공정코드}, '-') where run_no = ? and ...


#### M0003002_EndCassetteStatus (update)
- 테이블: 
- 컬럼: 
- SQL: exec Cassette상태변경_제조실적입력 ?,#{공정코드};...


#### M0003002_Start (update)
- 테이블: d22_run, get, start_date
- 컬럼: 0, 9), #{작업시작}), 9, 13), #{시작시각})
- SQL: ...


#### M0003002_End (update)
- 테이블: d22_run, end_date
- 컬럼: 0, 9), 9, 13)
- SQL: ...


#### M0003002_Log (update)
- 테이블: d22_run, d42_, getism, get, start_date, summeddata, d84_ism, set, getagb, d85_agb, getpfl, dw_run_cell_data, d88_pfl, d84_dpfbfl_cell, error_cnt, sample
- 컬럼: 공장코드, run_no, 공정코드, seq, lot_no, bef_공정코드, NXT_공정코드, 박리작업구분, 작업자, 작업조...
- SQL: with error_cnt as ( select cst_no, isNull(sum(b.불량수량), 0) 불량수량 from Get공정별불량파일(?, #{공정코드}, #{자동여부}) a left join d42_검사불량사유파일 b on (b.공장코드 = '2' and a.공정코드 = b.공정코드 and a.불량코드 = b.불량코드 and lotrun_id = ...


#### M0003002_RunTemp (update)
- 테이블: d22_run
- 컬럼: 
- SQL: ...


#### M0003002_Temp (update)
- 테이블: d22_run
- 컬럼: 
- SQL: ...


#### M0003002_Update3 (update)
- 테이블: d42_
- 컬럼: 
- SQL: update d42_검사불량사유파일_cell set 불량수량 = #{불량수량} where 공장코드 = '2' and 공정코드 = #{공정코드} and lotrun_id = ? and cst_no = ? and 불량위치 = #{불량위치} and 불량코드 = #{불량코드} and 차수 = #{차수}...


#### M0003002_Update4 (update)
- 테이블: d22_run, d42_
- 컬럼: 
- SQL: update d22_run카세트파일 set t_불량수량 = isnull((select sum(불량수량) from d42_검사불량사유파일_cell where 공장코드 = '2' and 공정코드 = #{공정코드} and lotrun_id = ? and cst_no = ? and 차수 = #{차수}), 0), t_수량 = isnull((f_수량 - (select...


#### M0003002_Update11 (update)
- 테이블: d22_run, d42_
- 컬럼: 
- SQL: update d22_run카세트파일 set f_불량수량 = isNull((select sum(불량수량) from d42_검사불량사유파일_cell where 공장코드 = '2' and 공정코드 = #{공정코드} and lotrun_id = ? and cst_no = ? and 차수 = #{차수}), 0) where run_no = ? and 공정코드 = #{...


#### M0003002_Update019 (update)
- 테이블: dw_run_cell_data
- 컬럼: 
- SQL: update dw_run_cell_data set 시료일자= #{시료일자}, 신뢰성작업확인= #{신뢰성작업확인}, 신뢰성시료유형= #{신뢰성시료유형}, 불량코드= #{불량코드} where 공장코드 = '2' and 공정코드 = #{공정코드} and run_id = ? and cell_id = ? and 차수 = #{차수}...


#### M0003002_Update20 (update)
- 테이블: d42_, set
- 컬럼: 공정코드, lotrun_id, 불량코드, 불량수량, 검사시각, #{cstNo}, #{차수}
- SQL: delete from d42_검사불량사유파일 where 공장코드 = '2' and 공정코드 = #{공정코드} and lotrun_id = ? and cst_no = ? and 차수 = #{차수}; merge into d42_검사불량사유파일 as t using ( select 공정코드, lotrun_id, 불량코드, 불량수량, 검사시각, ? f_cst_no,...


#### M0003002_Sample (update)
- 테이블: d22_run, dw_run_cell_data, set, sample
- 컬럼: a.cst_no
- SQL: ...


#### M0003002_Update020 (update)
- 테이블: dw_run_cell_data
- 컬럼: 
- SQL: update dw_run_cell_data set 시료일자= null, 신뢰성작업확인= null, 신뢰성시료유형= null, 불량코드= null where 공장코드 = '2' and 공정코드 = #{공정코드} and run_id = ? and cell_id = ? and 차수 = #{차수}...


#### M0003002_RERUN (update)
- 테이블: d22_run
- 컬럼: 공장코드, RUN_NO, 공정코드, 레시피, LOT_NO, LOT_등분, null, 작업일자, 0, ''...
- SQL: insert into d22_run제조vlr(공장코드,RUN_NO,공정코드,레시피,LOT_NO,LOT_등분,작업시작,시작시각,작업종료,종료시각,작업일자,작업자,작업조,Machine_Code,SHIFT,책임자,책임자시작,책임자종료,선임자,P_CODE,작업구분,투입수량,검사수량,불량수량,양품수량,확인자,특이사항,차수) select 공장코드,RUN_NO,공정코드...


#### M0003002_Update021 (update)
- 테이블: 
- 컬럼: 
- SQL: {CALL Gen품질검사대기From제조실적(#{신뢰성시료유형, jdbcType=VARCHAR}, #{신뢰성작업확인, jdbcType=VARCHAR}, #{cellIds, jdbcType=VARCHAR})}...


#### M0003002_Update022 (update)
- 테이블: dw_run_cell_data
- 컬럼: 
- SQL: update dw_run_cell_data set 특이사항 = #{특이사항} where 공장코드 = '2' and 공정코드 = #{공정코드} and run_id = ? and cell_id = ? and 차수 = #{차수}...


#### M0003002_cancel (update)
- 테이블: d22_run, d42_, dw_run_cell_data
- 컬럼: 
- SQL: ...


#### M0003002_Update12 (update)
- 테이블: d22_run
- 컬럼: 
- SQL: ...


#### M0003002_remove (update)
- 테이블: d22_run, d42_, dw_run_cell_data
- 컬럼: 
- SQL: ...


#### M0003002_Update13 (update)
- 테이블: d22_run
- 컬럼: 
- SQL: update d22_run카세트파일 set IN_CSTNO = ? ,T_CSTNO = ? where run_no = ? and 공정코드 = #{공정코드} and 차수 = #{차수} and seq = ?...


#### M0003002_Update14 (update)
- 테이블: d42_
- 컬럼: 
- SQL: update d42_검사불량사유파일 set cst_no = ? where 공장코드 = '2' and lotrun_id = ? and 공정코드 = #{공정코드} and 차수 = #{차수} and cst_no = ?; update d42_검사불량사유파일_cell set cst_no = ? from d42_검사불량사유파일_cell where 공장코드 = '2' ...


#### M0003002_Delete1 (delete)
- 테이블: d42_
- 컬럼: 
- SQL: delete from d42_검사불량사유파일_cell where 공장코드 = '2' and 공정코드 = #{공정코드} and lotrun_id = ? and cst_no = ? and 불량위치 = #{불량위치} and 불량코드 = #{불량코드} and 차수 = #{차수}...


---

## 화면: M0003003 - Tab 0 생산 실적 입력
메뉴경로: Tab 0 생산 실적 입력
탭: TAB039000, TAB040000, TAB041000
설명: 생산 실적 입력, 작업 이력 조회, 설비 로그 조회

### 관련 쿼리

#### M0003003_Sch1 (select)
- 테이블: get_, dw_process_plan
- 컬럼: b.공정코드, b.공정명
- SQL: select b.공정코드, b.공정명 from Get_다음공정정보_RunNo_공정코드_다음공정코드_지정(?,#{공정코드},null) a left join dw_process_plan b on (a.process_id = b.process_id and a.공정코드 = b.공정코드) order by b.공정코드...


#### M0003003_Sch2 (select)
- 테이블: get, d22_run, d03_, d04_, d05_, dw_equipment_mast, get_, d24_edge, dw_run_cell_data
- 컬럼: c.거래처명, e.제품모델, e.제품inch, e.제품버젼, e.제품규격, a.입고일자, a.작업일자, 특기사항, 승인자, b.machine_code...
- SQL: ...


#### M0003003_Sch3 (select)
- 테이블: dw_run_cell_data, d22_run
- 컬럼: run_id, cst_no, cell_id, t.차수, 설비호기, 근무조, 작업자, start_time, end_time
- SQL: select run_id, cst_no, cell_id, t.차수, 설비호기, 근무조, 작업자, start_time, end_time from dw_run_cell_data t with (nolock) join (select isNull(max(차수), 1) 차수 from d22_run제조vlr with (nolock) where run_no = ? and...


#### M0003003_Sch4 (select)
- 테이블: dw_run_cell_data
- 컬럼: run_id, cst_no, cell_id, 차수, 설비호기, 근무조, 작업자, start_time, end_time, 불량코드...
- SQL: select run_id, cst_no, cell_id, 차수, 설비호기, 근무조, 작업자, start_time, end_time, 불량코드, scrap, 특이사항 from dw_run_cell_data t where 공장코드 = '2' and run_id = ? and 공정코드 = #{공정코드} and 차수 = #{차수} and result = ? and...


#### M0003003_LogChk (select)
- 테이블: d24_edge, dw_equipment_mast, get_
- 컬럼: 
- SQL: ...


#### M0003003_Sch5 (select)
- 테이블: get
- 컬럼: 불량코드, 불량명, 사용여부
- SQL: select 불량코드, 불량명, 사용여부 from Get공정별불량파일(?, #{공정코드}, #{자동여부}) a where 공정코드 = #{공정코드} and 비고 != 2 order by 적용순서...


#### M0003003_Sch6 (select)
- 테이블: get, d42_, defectdata1
- 컬럼: a.불량코드, a.불량수량
- SQL: WITH DefectData1 AS ( select a.불량코드, a.불량수량 from ( select a.불량코드, sum(b.불량수량) 불량수량 from Get공정별불량파일(?, #{공정코드}, #{자동여부}) a left join d42_검사불량사유파일 b on (a.공정코드 = b.공정코드 and a.불량코드 = b.불량코드 and b.lotrun_...


#### M0003003_Sch7 (select)
- 테이블: d42_
- 컬럼: 불량위치
- SQL: select 불량위치 from d42_검사불량사유파일_cell where 공장코드 = '2' and 공정코드 = #{공정코드} and lotrun_id = ? and cst_no = ? and cell_id = ? and 불량코드 = #{불량코드} and 차수 = #{차수}...


#### M0003003_Sch8 (select)
- 테이블: d22_run, d05_, dw_common_code, dw_
- 컬럼: k.film_배면색_2), k.film_배면색_1), k.film_배면색_4), k.film_배면색_3)
- SQL: select coalesce(k.film_전면색_1, k.film_배면색_2) e1, coalesce(k.film_전면색_2, k.film_배면색_1) e2, coalesce(k.film_전면색_3, k.film_배면색_4) e3, coalesce(k.film_전면색_4, k.film_배면색_3) e4 from d22_run제조mst a left join ...


#### M0003003_Sch9 (select)
- 테이블: dw_run_cell_data, dw_equipment_mast
- 컬럼: x.공장코드, x.공정코드, x.run_id, x.cst_no, x.cell_id, x.차수, x.설비호기, x.근무조, x.작업자, x.start_time...
- SQL: select x.공장코드,x.공정코드,x.run_id,x.cst_no,x.cell_id,x.차수,x.설비호기,x.근무조,x.작업자,x.start_time,x.end_time, case when x.result = '양품' then '양품' else null end result1, case when x.result = '불량' then '불량' else nu...


#### searchProcLogGrid1ECI (select)
- 테이블: get_eci
- 컬럼: 작업일자), eqp_id, model, run_id, 12, 0, ':'), 15, 120), 'yyyy-MM-dd...
- SQL: select CONVERT(DATE,작업일자) 작업일자, eqp_id, model, run_id, FORMAT(CONVERT(datetime, STUFF(STUFF(start_time, 12, 0, ':'), 15, 0, ':'), 120),'yyyy-MM-dd HH:mm:ss') start_time, FORMAT(CONVERT(datetime, STUFF...


#### searchProcLogGrid1VRS (select)
- 테이블: get_vrs
- 컬럼: 작업일자), eqp_id, model, run_id, 12, 0, ':'), 15, 120), 'yyyy-MM-dd...
- SQL: select CONVERT(DATE,작업일자) 작업일자, eqp_id, model, run_id, FORMAT(CONVERT(datetime, STUFF(STUFF(start_time, 12, 0, ':'), 15, 0, ':'), 120),'yyyy-MM-dd HH:mm:ss') start_time, FORMAT(CONVERT(datetime, STUFF...


#### searchProcLogGrid2ECI (select)
- 테이블: get_eci
- 컬럼: 
- SQL: select A.*,rank() over (partition by cell_id order by end_time2 desc) rank FROM ( select CONVERT(DATE,작업일자) 작업일자, eqp_id, 근무조, 검사자, run_id, cell_id, FORMAT(CONVERT(datetime, STUFF(STUFF(시작시각, 12, 0, '...


#### searchProcLogGrid2VRS (select)
- 테이블: get_vrs
- 컬럼: 
- SQL: select A.*,rank() over (partition by cell_id order by end_time2 desc) rank FROM ( select CONVERT(DATE,작업일자) 작업일자, eqp_id, 근무조, 검사자, run_id, cell_id, FORMAT(CONVERT(datetime, STUFF(STUFF(시작시각, 12, 0, '...


#### M0003003_Sch16 (select)
- 테이블: dw_run_cell_data
- 컬럼: run_id, 공정코드, cst_no, cell_id, 시료일자, 신뢰성작업확인, 신뢰성시료유형
- SQL: select run_id, 공정코드, cst_no, cell_id, 시료일자, 신뢰성작업확인, 신뢰성시료유형 from dw_run_cell_data where 공장코드 = '2' and 공정코드 = #{공정코드} and run_id = ? and 차수 = #{차수} and nullif(신뢰성시료유형, '') is not null...


#### M0003003_Sch17 (select)
- 테이블: dw_common_code
- 컬럼: code_name
- SQL: select code_name from dw_common_code where maj_code = ? and code like ? + '%' and use_yn = 1...


#### M0003003_Sch18 (select)
- 테이블: d22_run
- 컬럼: b.양품수량
- SQL: select b.양품수량 from d22_run제조mst a left join d22_run제조vlr b on (a.run_no = b.run_no and b.공정코드= '068') join (select isNull(max(차수), 1) 차수 from d22_run제조vlr where run_no = ? and 공정코드= '068') h on (h.차수 ...


#### M0003003_PFLRunHold (select)
- 테이블: d22_run, d42_, dw_common_code
- 컬럼: a.run_no, a.투입수량, CASE
- SQL: select a.run_no, a.투입수량, CASE WHEN a.투입수량 = 0 THEN 0 ELSE CAST(b.불량수량 AS FLOAT) / a.투입수량 END AS 불량률1, CASE WHEN a.투입수량 = 0 THEN 0 ELSE CAST(c.불량수량 AS FLOAT) / a.투입수량 END AS 불량률2, CASE WHEN a.투입수량 = 0 ...


#### M0003003_Exec_PFLRunHold (select)
- 테이블: 
- 컬럼: 
- SQL: exec Set_PFL필름포장검사_RunHold설정 ?,#{불량명};...


#### M0003003_Sch19 (select)
- 테이블: get_eci_
- 컬럼: 
- SQL: select * from Get_ECI_장면_개수_단면_개수(#{제품모델})...


#### M0003003_Sch20 (select)
- 테이블: get
- 컬럼: a.공정코드, a.불량코드, a.불량명
- SQL: select a.공정코드, a.불량코드, a.불량명 from Get공정별불량파일(?, #{공정코드}, #{자동여부}) a where a.비고 != '2' order by 적용순서...


#### M0003003_Sch21 (select)
- 테이블: dw_run_cell_data
- 컬럼: run_id, cst_no, cell_id, a.차수, a.불량코드, a.신뢰성시료유형
- SQL: select run_id, cst_no, cell_id, a.차수, a.불량코드, a.신뢰성시료유형 from dw_run_cell_data a where 공장코드 = '2' and 공정코드 = #{공정코드} and run_id = ? and cell_id = ? and 차수 = #{차수}...


#### M0003003_Sch10 (select)
- 테이블: get, d22_run, d03_, d04_, d05_, dw_equipment_mast, get_, d24_edge, dw_run_cell_data
- 컬럼: c.거래처명, e.제품모델, e.제품inch, e.제품버젼, e.제품규격, a.입고일자, a.작업일자, 특기사항, 승인자, b.machine_code...
- SQL: ...


#### M0003003_Sch22 (select)
- 테이블: d22_run
- 컬럼: run_no, 작업종료
- SQL: select run_no, 작업종료 from d22_run제조vlr a join (select isNull(max(차수), 1) 차수 from d22_run제조vlr where 공장코드 = '2' and run_no = ? and 공정코드 = '072') b on (a.차수 = b.차수) where 공장코드 = '2' and run_no = ? and 공정...


#### M0003003_Sch23 (select)
- 테이블: dw_run_cell_data, d22_run, dw_equipment_mast, d25_pfl
- 컬럼: t.cst_no, t.cell_id, f.설비약명, t.근무조, t.작업자, t.start_time, t.end_time, t.result, t.scrap
- SQL: select t.cst_no, t.cell_id, f.설비약명 as 설비호기, t.근무조, t.작업자, t.start_time, t.end_time, t.result, t.scrap from dw_run_cell_data t join (select isNull(max(차수), 1) 차수 from d22_run제조vlr where run_no = ? and ...


#### M0003003_Sch24 (select)
- 테이블: dw_run_cell_data, dw_equipment_mast, d25_pfl
- 컬럼: t.cst_no, t.cell_id, f.설비약명, t.근무조, t.작업자, t.start_time, t.end_time, t.result, t.scrap
- SQL: select t.cst_no, t.cell_id, f.설비약명 as 설비호기, t.근무조, t.작업자, t.start_time, t.end_time, t.result, t.scrap from dw_run_cell_data t left join dw_equipment_mast f on (f.line= 'DFB1' and f.공정코드 = t.공정코드 and t...


#### M0003003_Sch25 (select)
- 테이블: dw_run_cell_data
- 컬럼: '')
- SQL: select sum(case when 공정코드 = '072' and result = '양품' and nullif(신뢰성시료유형,'') is null then 1 else 0 end) as 양품수량, sum(case when 공정코드 = '072' and result = '불량' and nullif(신뢰성시료유형,'') is null then 1 else 0...


#### M0003003_Sch26 (select)
- 테이블: dw_run_cell_data, d22_run
- 컬럼: run_id, cst_no, cell_id, t.차수, 설비호기, 근무조, 작업자, start_time, end_time
- SQL: select run_id, cst_no, cell_id, t.차수, 설비호기, 근무조, 작업자, start_time, end_time from dw_run_cell_data t join (select isNull(max(차수), 1) 차수 from d22_run제조vlr where run_no = ? and 공정코드 = '070') h on (h.차수 = ...


#### M0003003_Sch27 (select)
- 테이블: dw_run_cell_data, d22_run, get_
- 컬럼: t.공장코드, t.공정코드, t.run_id, t.cst_no, t.cell_id, #{차수}, t.설비호기, t.근무조, t.작업자, t.start_time...
- SQL: select t.공장코드, t.공정코드, t.run_id, t.cst_no, t.cell_id, #{차수} 차수, t.설비호기, t.근무조, t.작업자, t.start_time, t.end_time, t.result, t.불량코드, t.scrap, t.시료일자, t.신뢰성작업확인, t.신뢰성시료유형, t.맵핑유무, t.특이사항 from dw_run_cell...


#### M0003003_Sch28 (select)
- 테이블: d22_run
- 컬럼: 특이사항
- SQL: select 특이사항 from d22_run제조vlr where run_no = ? and 공정코드= #{공정코드} and 차수 = #{차수}...


#### M0003003_Sch29 (select)
- 테이블: dw_run_cell_data
- 컬럼: 특이사항
- SQL: select 특이사항 from dw_run_cell_data where 공장코드 = '2' and 공정코드 = #{공정코드} and run_id = ? and cell_id = ? and 차수 = #{차수};...


#### M0003003_Start (update)
- 테이블: dw_run_cell_data, d22_run, d25_pfl, d42_, get, max_
- 컬럼: 1)
- SQL: ...


#### M0003003_End (update)
- 테이블: d22_run, dw_run_cell_data, d24_edge, max_, d25_pfl, set
- 컬럼: 1
- SQL: ...


#### M0003003_Log (update)
- 테이블: dw_run_cell_data, d24_edge, dw_equipment_mast, set, d22_run, get, d42_, get_, target, d26_jobissue
- 컬럼: 공장코드, 공정코드, run_id, cst_no, cell_id, 차수, c.설비번호, 근무조, 작업자, start_time...
- SQL: ...


#### M0003003_Temp (update)
- 테이블: d22_run, dw_run_cell_data, max_, set
- 컬럼: 1)
- SQL: with max_차수 as ( select isnull(max(차수), 1) as max_차수 from d22_run제조vlr where run_no = ? and 공정코드 = #{pre공정코드} ) merge into d22_run제조vlr as target using ( select ? as run_no, #{공정코드} as 공정코드, sum(case ...


#### M0003003_Update1 (update)
- 테이블: dw_run_cell_data, d22_run, set, max_
- 컬럼: 공장코드, #{공정코드}, run_id, cst_no, cell_id, #{차수}, '-', #{근무조}, #{작업자}, #{작업시간}...
- SQL: merge into dw_run_cell_data as target using ( select 공장코드, #{공정코드} 공정코드, run_id, cst_no, cell_id, #{차수} 차수, '-' 설비호기, #{근무조} 근무조, #{작업자} 작업자, #{작업시간} start_time, #{작업시간} end_time, ? result, #{불량코드} 불량...


#### M0003003_Update2 (update)
- 테이블: d42_, dw_run_cell_data, set
- 컬럼: 공장코드, 공정코드, run_id, cst_no, 불량코드
- SQL: merge into d42_검사불량사유파일 as t using ( select 공장코드, 공정코드, run_id lotrun_id, cst_no, 불량코드, count(*) 불량수량 from dw_run_cell_data where 공장코드 = '2' and run_id = ? and 공정코드 = #{공정코드} and result = '불량' and 불량코...


#### M0003003_Update3 (update)
- 테이블: d42_, set
- 컬럼: 
- SQL: merge into d42_검사불량사유파일_cell as t using (values (#{공정코드}, ?, #{불량코드}, ?, ?, #{불량위치}, #{불량수량}, #{검사시각}, #{차수})) as s (공정코드, lotrun_id, 불량코드, cst_no, cell_id, 불량위치, 불량수량, 검사시각, 차수) on t.공장코드 = '2' and t...


#### M0003003_Update6 (update)
- 테이블: dw_run_cell_data, d25_pfl
- 컬럼: 
- SQL: update dw_run_cell_data set 특이사항 = #{특이사항} where 공장코드 = '2' and 공정코드 = #{공정코드} and run_id = ? and cell_id = ? and 차수 = #{차수}; update d25_PFL외관검사파일 set 특이사항 = #{특이사항} where 1=1 and run_id = ? and cell_...


#### M0003003_Update9 (update)
- 테이블: d42_, dw_run_cell_data, set, d22_run, max_
- 컬럼: 공장코드, 공정코드, run_id, cst_no, 불량코드, 차수
- SQL: delete from d42_검사불량사유파일 where 공장코드 = '2' and lotrun_id = ? and 공정코드 = #{공정코드} and 차수 = #{차수}; merge into d42_검사불량사유파일 as t using ( select 공장코드, 공정코드, run_id lotrun_id, cst_no, 불량코드, 차수, count(*) 불량수량...


#### M0003003_Update10 (update)
- 테이블: dw_run_cell_data
- 컬럼: 
- SQL: update dw_run_cell_data set result = ? ,불량코드 = #{불량코드} ,scrap = ? ,시료일자 = null ,신뢰성작업확인 = null ,신뢰성시료유형 = null ,맵핑유무 = null where 공장코드 = '2' and run_id = ? and 공정코드 = #{공정코드} and cell_id = ? and 차수 = ...


#### M0003003_cancel (update)
- 테이블: dw_run_cell_data, d42_, d22_run, d25_pfl
- 컬럼: 
- SQL: ...


#### M0003003_RERUN (update)
- 테이블: d22_run
- 컬럼: 공장코드, RUN_NO, 공정코드, 레시피, LOT_NO, LOT_등분, null, 작업일자, 0, ''...
- SQL: insert into d22_run제조vlr(공장코드,RUN_NO,공정코드,레시피,LOT_NO,LOT_등분,작업시작,시작시각,작업종료,종료시각,작업일자,작업자,작업조,Machine_Code,SHIFT,책임자,책임자시작,책임자종료,선임자,P_CODE,작업구분,투입수량,검사수량,불량수량,양품수량,확인자,특이사항,차수) select 공장코드,RUN_NO,공정코드...


#### M0003003_Update4 (update)
- 테이블: dw_run_cell_data
- 컬럼: 
- SQL: update dw_run_cell_data set result = ?, 불량코드 = #{불량코드}, scrap = #{불량명} where 공장코드 = '2' and 공정코드 = #{공정코드} and run_id = ? and cell_id = ? and 차수 = #{차수}...


#### M0003003_ResultMerge (update)
- 테이블: d42_, get, dw_run_cell_data, set, d22_run
- 컬럼: b.공정코드, b.run_id, a.불량코드, b.불량수량, b.검사시각, b.cst_no, #{차수}
- SQL: delete from d42_검사불량사유파일 where 공장코드 = '2' and 공정코드 = #{공정코드} and lotrun_id = ?; merge into d42_검사불량사유파일 as t using ( select b.공정코드, b.run_id lotrun_id, a.불량코드, b.불량수량, b.검사시각, b.cst_no, #{차수} 차수 from ...


#### M0003003_remove (update)
- 테이블: dw_run_cell_data, d42_, d22_run, d25_pfl
- 컬럼: 
- SQL: ...


#### M0003003_Update5 (update)
- 테이블: dw_run_cell_data, d22_run, get_
- 컬럼: t.공장코드, '073', t.run_id, '-', t.cell_id, #{차수}, c.설비호기, c.근무조, c.작업자, c.start_time...
- SQL: merge into dw_run_cell_data as target using ( select t.공장코드, '073' 공정코드, t.run_id, '-' cst_no, t.cell_id, #{차수} 차수, c.설비호기, c.근무조, c.작업자, c.start_time, c.end_time, t.result, null 불량코드, null scrap, nul...


#### M0003003_Update7 (update)
- 테이블: d22_run
- 컬럼: 
- SQL: update d22_run제조vlr set 특이사항 = #{특이사항} where run_no = ? and 공정코드= #{공정코드} and 차수 = #{차수}...


#### M0003003_Delete1 (delete)
- 테이블: d42_
- 컬럼: 
- SQL: delete from d42_검사불량사유파일_cell where 공장코드 = '2' and 공정코드 = #{공정코드} and lotrun_id = ? and cst_no = ? and cell_id = ? and 차수 = #{차수}...


#### M0003003_Delete2 (delete)
- 테이블: dw_run_cell_data
- 컬럼: 
- SQL: delete from dw_run_cell_data where 공장코드 = '2' and 공정코드 = #{공정코드} and run_id = ? and cell_id = ? and 차수 = #{차수}...


---

## 화면: M0003005 - Tab 0 생산 실적 입력
메뉴경로: Tab 0 생산 실적 입력
탭: TAB018000, TAB019000, TAB020000
설명: 생산 실적 입력, 작업 이력 조회, 설비 로그 조회

### 관련 쿼리

#### M0003005_Sch1 (select)
- 테이블: get, d21_, d03_, d04_, d05_, dw_equipment_mast, d21_tool, d22_run
- 컬럼: a.lot_no, b.공정코드, b.p_code, c.거래처명, e.제품모델, a.제품_inch, e.제품버젼, d.자재품명, e.제품규격, a.입고일자...
- SQL: select a.lot_no, b.공정코드, b.p_code, c.거래처명, e.제품모델, a.제품_inch, e.제품버젼, d.자재품명, e.제품규격, a.입고일자, a.sheet, a.block수, a.cell수, a.작업일자, a.생성수량, a.작업지시일자, 발행자, a.승인일자, 승인자, a.panel_id, a.특기사항, a.시작온도, a.종료온도...


#### M0003005_Sch5 (select)
- 테이블: dw_equipment_mast
- 컬럼: a.설비번호, a.설비명, a.설비약명, a.chamber
- SQL: select a.설비번호,a.설비명, a.설비약명 +' '+ a.chamber 설비약명, a.chamber from dw_equipment_mast a where a.line= 'DFB1' and a.공정코드 = #{공정코드} order by a.설비번호...


#### M0003005_Sch6 (select)
- 테이블: d21_, dw_process_plan
- 컬럼: c.공정명, b.특이사항
- SQL: select c.공정명, b.특이사항 from d21_제조지시mst a left join d21_제조지시vlr b on (a.lot_no = b.lot_no) left join dw_process_plan c on (c.line = 'DFB1' and c.process_id = 'D1UT' and b.공정코드 = c.공정코드) where 1=1 and a....


#### M0003005_Sch16 (select)
- 테이블: d21_, dw_process_plan
- 컬럼: lot_no, 공정명, 특이사항
- SQL: select lot_no, 공정명, 특이사항 from ( select 1 as no, a.lot_no, b.공정코드, c.공정명, b.특이사항 from d21_제조지시mst a left join d21_제조지시vlr b on (a.lot_no = b.lot_no) left join dw_process_plan c on (c.line = 'DFB1' and ...


#### M0003005_Sch8 (select)
- 테이블: d21_, countdata, recursivecte, generatedrows, get, d42_, defectdata1, defectdata2, defectdata3, defectdata4, d21_tool
- 컬럼: block수
- SQL: WITH CountData AS ( SELECT block수 AS TotalCount FROM d21_제조지시mst WHERE lot_no = ? ), RecursiveCTE AS ( SELECT 1 AS RowNumber FROM CountData WHERE TotalCount > 0 UNION ALL SELECT RowNumber + 1 FROM Rec...


#### M0003005_Sch9 (select)
- 테이블: d21_, countdata, recursivecte, generatedrows, get, d42_, d05_, defectdata1, defectdata2
- 컬럼: block수
- SQL: WITH CountData AS ( SELECT block수 AS TotalCount FROM d21_제조지시mst WHERE lot_no = ? ), RecursiveCTE AS ( SELECT 1 AS RowNumber FROM CountData WHERE TotalCount > 0 UNION ALL SELECT RowNumber + 1 FROM Rec...


#### M0003005_Sch10 (select)
- 테이블: get
- 컬럼: 불량코드, 불량명
- SQL: select 불량코드, 불량명 from Get공정별불량파일(?, #{공정코드}, #{자동여부}) where 공정코드 = #{공정코드} and 비고 != '2' order by 적용순서...


#### M0003005_Sch12 (select)
- 테이블: dw_sub_mat_tool_out
- 컬럼: material_id, 사용횟수, 최대사용횟수, 사용구분, line, step_code, equip_no
- SQL: select material_id 툴번호, 사용횟수, 최대사용횟수, 사용구분, line, step_code, equip_no from dw_sub_mat_tool_out where line = 'DFB1' and step_code = #{공정코드} and 사용구분 in ('커팅','중삭','정삭') and equip_no = ? and 폐기여부 = 'N' ...


#### M0003005_Sch3 (select)
- 테이블: dw_sub_mat_tool_out
- 컬럼: material_id
- SQL: select material_id 툴번호 from dw_sub_mat_tool_out where line = 'DFB1' and step_code = #{공정코드} and 사용구분 = #{사용구분} and equip_no = ? and 폐기여부 = 'N' and 사용완료여부 = 'N' order by material_id...


#### M0003005_Sch13 (select)
- 테이블: d42_
- 컬럼: 공정코드, lotrun_id, bl_no, machine_code, 불량구분, 불량위치, 불량코드, 검사시각, 'none'
- SQL: select 공정코드, lotrun_id, bl_no, machine_code, 불량구분, 불량위치, 불량코드, 검사시각, 'none' state from d42_검사불량사유파일_block where 공장코드 = '2' and 공정코드 = #{공정코드} and lotrun_id = ? and 불량구분 = #{불량구분} and bl_no = ? and 불량코...


#### M0003005_Sch14 (select)
- 테이블: get, d42_, d22_run, defectdata1
- 컬럼: a.공정코드, a.불량코드, a.불량명, 0)
- SQL: WITH DefectData1 AS ( </otherwise> </choose> ) select from DefectData1 d...


#### M0003005_Sch15 (select)
- 테이블: d21_, countdata, recursivecte, generatedrows, get, d42_, defectdata1, defectdata2, defectdata3, defectdata4
- 컬럼: block수
- SQL: WITH CountData AS ( SELECT block수 AS TotalCount FROM d21_제조지시mst WHERE lot_no = ? ), RecursiveCTE AS ( SELECT 1 AS RowNumber FROM CountData WHERE TotalCount > 0 UNION ALL SELECT RowNumber + 1 FROM Rec...


#### M0003005_Sch17 (select)
- 테이블: checkpanelid, get_, dw_equipment_mast
- 컬럼: panel_id, 근무조, 작업자, 설비호기, 설비약명, start_time), start_time)), end_time), end_time)), tank_no...
- SQL: select panel_id, 근무조, 작업자, 설비호기, 설비약명, LEFT(start_time, CHARINDEX(' ', start_time) - 1) AS 작업시작, RIGHT(start_time, LEN(start_time) - CHARINDEX(' ', start_time)) AS 시작시각, LEFT(end_time, CHARINDEX(' ', ...


#### M0003005_Sch2 (select)
- 테이블: d21_, dw_equipment_mast
- 컬럼: a.lot_no
- SQL: select a.lot_no from ( select a.lot_no, a.machine_code from d21_제조지시vlr a where a.lot_no = ? and a.공정코드 = #{공정코드} union select a.lot_no, a.machine_code from d21_제조지시vlr a left join dw_equipment_mast c...


#### M0003005_Sch7 (select)
- 테이블: get, d21_, d03_, d04_, d05_, dw_equipment_mast, d21_tool, d22_run
- 컬럼: a.lot_no, b.공정코드, b.p_code, c.거래처명, e.제품모델, a.제품_inch, e.제품버젼, d.자재품명, e.제품규격, a.입고일자...
- SQL: select a.lot_no, b.공정코드, b.p_code, c.거래처명, e.제품모델, a.제품_inch, e.제품버젼, d.자재품명, e.제품규격, a.입고일자, a.sheet, a.block수, a.cell수, a.작업일자, a.생성수량, a.작업지시일자, 발행자, a.승인일자, 승인자, a.panel_id, a.특기사항, a.시작온도, a.종료온도...


#### selectWipHeaderList (select)
- 테이블: dw_
- 컬럼: 공정코드, 공정명, HEADER, seq
- SQL: select 공정코드 ,공정명 ,HEADER ,seq from dw_재공재고Report순서 where 공정별_작업이력요약 != 'X' order by seq...


#### selectWipDataList (select)
- 테이블: dw_, pivotdata
- 컬럼: @columns, ', ')
- SQL: DECLARE @columns NVARCHAR(MAX); DECLARE @sql NVARCHAR(MAX); -- 동적으로 컬럼 목록 생성 SELECT @columns = STRING_AGG(QUOTENAME(공정코드+'seq'+seq), ',') FROM (SELECT DISTINCT 공정코드,seq FROM dw_재공재고Report순서 where 공정별_...


#### selectWipDateTimeList (select)
- 테이블: dw_
- 컬럼: 집계일자, 4), 3, 0, ':')
- SQL: /*selectWipDateTimeList - 집계일의 타임리스트 가져오기*/ select 집계일자 as value ,STUFF(RIGHT(집계일자, 4), 3, 0, ':') as text from dw_재공재고집계 WITH (NOLOCK) where 집계일자 like ? + '%' group by 집계일자 order by 집계일자 desc...


#### selectWipDtlFrontW (select)
- 테이블: dw_
- 컬럼: distinct, area, 공정코드, lot_no, 수량, 종료시간, 대기시간, 상태, 특이사항
- SQL: select distinct 집계일시, area, 공정코드, lot_no OBJ_NO, 수량, 종료시간, 대기시간, 상태, 특이사항, lot_no from DW_재공재고_FRONT_작업대기 where 1=1 and 집계일시 = ? and 공정코드 = ? order by lot_no...


#### selectWipDtlFrontI (select)
- 테이블: dw_
- 컬럼: distinct, 공정코드, lot_no, 수량, 설비약명, 작업자, 시작시간, 상태
- SQL: select distinct area, 공정코드, lot_no OBJ_NO, 수량, 설비약명, 작업자, 시작시간, 상태, lot_no from DW_재공재고_FRONT_작업중 where 1=1 and 집계일시 = ? and 공정코드 = ? order by lot_no...


#### selectWipDtlBackW (select)
- 테이블: dw_
- 컬럼: distinct, area, 공정코드, run_no, 수량, 종료시간, 대기시간, 상태, 상태)
- SQL: select distinct 집계일시, area, 공정코드, run_no OBJ_NO, 수량, 종료시간, 대기시간, 상태, max(특이사항) over (partition by 집계일시, area, 공정코드, run_no, 수량, 종료시간, 대기시간, 상태) 특이사항, run_no from dw_재공재고_BACK_작업대기 where 1=1 and 집계일시 =...


#### selectWipDtlBackI (select)
- 테이블: dw_
- 컬럼: distinct, 공정코드, run_no, 수량, 설비약명, 작업자, 시작시간, 상태
- SQL: select distinct area, 공정코드, run_no OBJ_NO, 수량, 설비약명, 작업자, 시작시간, 상태, run_no from dw_재공재고_BACK_작업중 a where 1=1 and 집계일시 = ? and 공정코드 = ? order by run_no...


#### selectWipDtlLotCardW (select)
- 테이블: dw_
- 컬럼: distinct, area, 공정코드, lot_no, 수량, 종료시간, 대기시간, 상태, 특이사항
- SQL: select distinct 집계일시, area, 공정코드, lot_no OBJ_NO, 수량, 종료시간, 대기시간, 상태, 특이사항, lot_no from DW_재공재고_FRONT_작업대기 where 1=1 and 집계일시 = ? and 공정코드 = ? order by lot_no...


#### selectWipDtlRunCardW (select)
- 테이블: dw_
- 컬럼: distinct, area, 공정코드, lot_no, 수량, 종료시간, 대기시간, 상태, 특이사항
- SQL: select distinct 집계일시, area, 공정코드, lot_no obj_no, 수량, 종료시간, 대기시간, 상태, 특이사항, lot_no from DW_재공재고_FRONT_작업대기 where 1=1 and 집계일시 = ? and 공정코드 = ? order by lot_no...


#### execCalcWipNow (select)
- 테이블: 
- 컬럼: 
- SQL: exec Get_재공재고_집계 ?;...


#### execCalcDprNow (select)
- 테이블: 
- 컬럼: 
- SQL: exec Get_dw_일별_공정별_생산집계 ?,?,null,'ACTUAL';...


#### selectWorkEndByFac1 (select)
- 테이블: get_
- 컬럼: 설비명
- SQL: select * --설비약명, 설비명 from Get_설비별_작업완료_요약(?,?,?);...


#### selectWorkEndByFac2 (select)
- 테이블: get_
- 컬럼: 설비명
- SQL: select * --설비약명, 설비명 from Get_설비별_작업완료_모델별(?,?,?);...


#### selectWorkEndByFac3 (select)
- 테이블: get_
- 컬럼: 설비명
- SQL: select * --설비약명, 설비명 from Get_설비별_작업완료_lot_run_no(?,?,?);...


#### selectWorkIngByFac1 (select)
- 테이블: get_
- 컬럼: 설비명
- SQL: select * --설비약명, 설비명 from Get_설비별_작업중_요약(?,?,?)...


#### selectWorkIngByFac2 (select)
- 테이블: get_
- 컬럼: 설비명
- SQL: select * --설비약명, 설비명 from Get_설비별_작업중_모델별(?,?,?)...


#### selectWorkIngByFac3 (select)
- 테이블: get_
- 컬럼: 설비명
- SQL: select * --설비약명, 설비명 from Get_설비별_작업중_lot_run_no(?,?,?)...


#### M0003005_Sch4 (select)
- 테이블: get, d21_, d03_, d04_, d05_, dw_equipment_mast, d21_tool, d22_run
- 컬럼: a.lot_no, b.공정코드, b.p_code, c.거래처명, e.제품모델, a.제품_inch, e.제품버젼, d.자재품명, e.제품규격, a.입고일자...
- SQL: select a.lot_no, b.공정코드, b.p_code, c.거래처명, e.제품모델, a.제품_inch, e.제품버젼, d.자재품명, e.제품규격, a.입고일자, a.sheet, a.block수, a.cell수, a.작업일자, a.생성수량, a.작업지시일자, 발행자, a.승인일자, 승인자, a.panel_id, a.특기사항, a.시작온도, a.종료온도...


#### M0003005_Sch11 (select)
- 테이블: d21_, dw_equipment_mast
- 컬럼: a.lot_no
- SQL: select a.lot_no from d21_제조지시mst a join d21_제조지시vlr b on (a.lot_no = b.lot_no and b.공정코드= #{공정코드}) left join dw_equipment_mast f on (f.line= 'DFB1' and b.공정코드 = f.공정코드 and b.machine_code = f.설비번호) whe...


#### M0003005_Sch18 (select)
- 테이블: d21_, dw_equipment_mast
- 컬럼: a.lot_no
- SQL: select a.lot_no from d21_제조지시mst a join d21_제조지시vlr b on (a.lot_no = b.lot_no and b.공정코드= #{공정코드}) left join dw_equipment_mast f on (f.line= 'DFB1' and b.공정코드 = f.공정코드 and b.machine_code = f.설비번호) whe...


#### M0003005_Sch19 (select)
- 테이블: get, d21_, d03_, d04_, d05_, dw_equipment_mast, d21_tool, d22_run
- 컬럼: a.lot_no, b.공정코드, b.p_code, c.거래처명, e.제품모델, a.제품_inch, e.제품버젼, d.자재품명, e.제품규격, a.입고일자...
- SQL: select a.lot_no, b.공정코드, b.p_code, c.거래처명, e.제품모델, a.제품_inch, e.제품버젼, d.자재품명, e.제품규격, a.입고일자, a.sheet, a.block수, a.cell수, a.작업일자, a.생성수량, a.작업지시일자, 발행자, a.승인일자, 승인자, a.panel_id, a.특기사항, a.시작온도, a.종료온도...


#### M0003005_Sch20 (select)
- 테이블: get, d42_, d22_run, defectdata1
- 컬럼: a.공정코드, a.불량코드, a.불량명, 0)
- SQL: WITH DefectData1 AS ( </otherwise> </choose> ) select from DefectData1 d...


#### M0003005_Sch21 (select)
- 테이블: get
- 컬럼: 불량코드, 불량명
- SQL: select 불량코드, 불량명 from Get공정별불량파일(?, #{공정코드}, #{자동여부}) where 공정코드 = #{공정코드} and 비고 = '2' order by 적용순서...


#### selectPackShip074 (select)
- 테이블: get_
- 컬럼: 
- SQL: select * from Get_포장출하_출하검사대기(null) where 공정코드 = '074'...


#### selectPackShip077Wait (select)
- 테이블: get_
- 컬럼: 
- SQL: select * from Get_포장출하_출하검사_작업대기(null) where 공정코드 = '077'...


#### selectPackShip077 (select)
- 테이블: get_
- 컬럼: 
- SQL: select * from Get_포장출하_출하검사_작업중(null) where 공정코드 = '077'...


#### selectPackShip080 (select)
- 테이블: get_
- 컬럼: 
- SQL: select * from Get_포장출하_반출대기(null) where 공정코드 = '080'...


#### selectPackShip081 (select)
- 테이블: get_
- 컬럼: 
- SQL: select * from Get_포장출하_소포장반출(null) where 공정코드 = '081'...


#### selectPackShip082 (select)
- 테이블: get_
- 컬럼: 
- SQL: select * from Get_포장출하_출하대기(null) where 1=1...


#### selectPackShip002 (select)
- 테이블: get_rework_mbox
- 컬럼: 
- SQL: select * from Get_Rework_MBox대기(null,null,null) WHERE...


#### selectPackShip003 (select)
- 테이블: get_rework_mrun
- 컬럼: 
- SQL: select * from Get_Rework_MRUN대기(null,null,null,null) WHERE...


#### selectPackShip022 (select)
- 테이블: get_rework_
- 컬럼: 
- SQL: select * from Get_Rework_필름박리대기(null,null,null,null) WHERE...


#### selectPackShipIng022 (select)
- 테이블: dw_
- 컬럼: distinct, 공정코드, run_no, 수량, 설비약명, 작업자, 시작시간, 상태
- SQL: select distinct area, 공정코드, run_no OBJ_NO, 수량, 설비약명, 작업자, 시작시간, 상태, run_no from dw_재공재고_BACK_작업중 a where 집계일시 = ? and substring(run_no, 1,4) + substring(run_no, 11,1) = ? and 공정코드 = '022' order by run...


#### selectDprHeaderList (select)
- 테이블: get_
- 컬럼: 
- SQL: /*selectDprHeaderList*/ select * from Get_모델별_생산일보_기간조회(?)...


#### selectDprList (select)
- 테이블: get_
- 컬럼: 
- SQL: /*selectDprList*/ select * from Get_모델별_생산일보(?) order by 구분_ord, 도우코드, 도우모델, 작업구분, org작업구분...


#### M0003005_Insert1 (insert)
- 테이블: d42_
- 컬럼: 
- SQL: insert into d42_검사불량사유파일_block(공장코드,공정코드,lotrun_id,machine_code,불량구분,BL_NO,불량위치,불량코드,불량수량,검사시각) values ('2', #{공정코드}, ?, coalesce(?, '-'), #{불량구분}, ?, #{불량위치}, #{불량코드}, 1, #{검사시각})...


#### M0003005_Start (update)
- 테이블: d42_, d21_, d21_tool, mst, get
- 컬럼: sheet, cell수
- SQL: delete from d42_검사불량사유파일 where 공장코드 = '2' and 공정코드 = #{공정코드} and lotrun_id = ?; delete from d42_검사불량사유파일_cell where 공장코드 = '2' and 공정코드 = #{공정코드} and lotrun_id = ?; delete from d42_검사불량사유파일_block wher...


#### M0003005_TempMst (update)
- 테이블: d21_
- 컬럼: 
- SQL: update d21_제조지시mst set where lot_no = ?...


#### M0003005_TempVlr (update)
- 테이블: d21_, d42_
- 컬럼: 
- SQL: update d21_제조지시vlr set 작업자=#{작업자} ,shift=? ,machine_code = ? ,p_code = coalesce(?,'') ,공정_비고 = #{공정비고} ,특이사항 = #{특이사항} where lot_no = ? and 공정코드= #{공정코드}; update d42_검사불량사유파일 set machine_code = coales...


#### M0003005_End (update)
- 테이블: d21_, mst
- 컬럼: block수
- SQL: update d21_제조지시vlr set 작업종료=#{작업종료} ,종료시각=#{종료시각} ,양품수량 = isnull((투입수량 - 불량수량), 0) ,검사수량 = 투입수량 ,cell수량 = isnull(((select mst수량 from mst) * (투입수량 - 불량수량)), 0) ,bef_공정코드 = (case when #{공정코드} = '010' th...


#### M0003005_Error (update)
- 테이블: get, d42_, d21_, error_cnt, mst, d29_
- 컬럼: 0))
- SQL: ...


#### M0003005_Update6 (update)
- 테이블: d21_, set
- 컬럼: 
- SQL: merge into d21_치수측정파일 as t using (values (?, #{공정코드}, ?, #{offSet추천값}, #{offSet전}, #{offSet후}, #{판정Control}, #{판정Space}, #{편차단축}, #{편차장축}, #{두께수치}, #{단측수치1}, #{단측수치2}, #{단측수치3}, #{장측수치1}, #{장측수치2}, #{...


#### M0003005_Update1 (update)
- 테이블: dw_sub_mat_tool_out
- 컬럼: 
- SQL: update dw_sub_mat_tool_out set 폐기여부 = 'Y' where line = ? and step_code = ? and 사용구분 = #{사용구분} and equip_no = ? and material_id = #{툴번호}...


#### M0003005_Update7 (update)
- 테이블: dw_sub_mat_tool_out, d21_tool, set
- 컬럼: 사용횟수
- SQL: begin transaction; commit;...


#### M0003005_Update8 (update)
- 테이블: d42_
- 컬럼: 
- SQL: update d42_검사불량사유파일_BLOCK set cell별불량수량 = isNull(#{cell별불량수량}, 0) where 공장코드 = '2' and 공정코드 = #{공정코드} and lotrun_id = ? and bl_no = ?...


#### M0003005_Update9 (update)
- 테이블: d42_, set
- 컬럼: 공정코드, lotrun_id, 불량코드
- SQL: delete from d42_검사불량사유파일 where 공장코드 = '2' and 공정코드 = #{공정코드} and lotrun_id = ?; merge into d42_검사불량사유파일 as t using ( select 공정코드, lotrun_id, 불량코드, sum(불량수량) 불량수량, max(검사시각) 검사시작 from ( select 공정코드, lo...


#### M0003005_AutoPanelId (update)
- 테이블: d21_, get, d42_
- 컬럼: shift
- SQL: update d21_제조지시mst set panel_id = ? where lot_no = ?; update d21_제조지시vlr set 작업자=#{작업자} ,shift=#{근무조} ,작업조=(SELECT shift FROM Get주간야간구분1(#{시작시각})) ,작업시작=#{작업시작} ,시작시각=#{시작시각} ,작업종료=#{작업종료} ,종료시각=#{종료시...


#### M0003005_AUTOPANEL (update)
- 테이블: d42_, d21_, d21_tool, mst, get
- 컬럼: sheet, cell수
- SQL: delete from d42_검사불량사유파일 where 공장코드 = '2' and 공정코드 = #{공정코드} and lotrun_id = ?; delete from d42_검사불량사유파일_cell where 공장코드 = '2' and 공정코드 = #{공정코드} and lotrun_id = ?; delete from d42_검사불량사유파일_block wher...


#### M0003005_cancel (update)
- 테이블: dw_sub_mat_tool_out, d42_, d21_, d21_tool
- 컬럼: 
- SQL: delete from d42_검사불량사유파일 where 공장코드 = '2' and 공정코드 = #{공정코드} and lotrun_id = ?; delete from d42_검사불량사유파일_cell where 공장코드 = '2' and 공정코드 = #{공정코드} and lotrun_id = ?; delete from d42_검사불량사유파일_block wher...


#### M0003005_Delete2 (delete)
- 테이블: d21_
- 컬럼: 
- SQL: delete from d21_치수측정파일 where 공장코드 = '2' and lot_no = ? and 공정코드 = #{공정코드}...


#### M0003005_Delete1 (delete)
- 테이블: d42_
- 컬럼: 
- SQL: delete from d42_검사불량사유파일_block where 공장코드 = '2' and 공정코드 = #{공정코드} and lotrun_id = ? and bl_no = ? and 불량구분 = #{불량구분}...


---

## 화면: M0003007 - Tab 0 Lot Card 발행
메뉴경로: Tab 0 Lot Card 발행
탭: TAB015000, TAB016000, TAB017000
설명: Lot Card 발행, Run Card #1 발행

### 관련 쿼리

#### getModels (select)
- 테이블: dw_common_code
- 컬럼: code_name, code
- SQL: select code_name 제품유형,code 코드 from dw_common_code where maj_code='36' order by code_name...


#### getWorkTypes (select)
- 테이블: d02_
- 컬럼: 내용, 코드
- SQL: select 내용 작업구분, 코드 from d02_일반코드파일 where 대분류='31' order by 내용...


#### getStackEquip (select)
- 테이블: dw_equipment_mast
- 컬럼: 설비번호, 설비약명
- SQL: select 설비번호,설비약명 from dw_equipment_mast where 공정코드='010';...


#### getProcEquip (select)
- 테이블: dw_equipment_mast
- 컬럼: 설비번호, 설비약명+'
- SQL: select 설비번호,설비약명+' '+chamber 설비약명 from dw_equipment_mast where 공정코드='013';...


#### getPoStatus (select)
- 테이블: d21_, d33_
- 컬럼: PO_NO, 수주일자), 'yyyy-MM-dd'), 거래처코드, 제품코드, 수주수량, 0)
- SQL: select PO_NO,FORMAT(convert(date,수주일자),'yyyy-MM-dd') PO_DATE, 거래처코드,제품코드, 수주수량 총수량,수주수량-(select ISNULL(SUM(CELL수),0) from d21_제조지시MST where po_no=?) 잔량 from d33_제품수주서파일 a where po_no like ? --PO_NO...


#### getLotSize (select)
- 테이블: d33_, dw_product_mast
- 컬럼: b.Block, b.Sheet
- SQL: select b.Sheet*b.Block Cell,b.Block,b.Sheet from d33_제품수주서파일 a left join dw_product_mast b on(a.제품코드=b.Prod_code) where po_no like ? --선택된 PO_NO...


#### getProdStatus (select)
- 테이블: d33_, dw_product_mast, dw_vendor_mast
- 컬럼: c.name, b.Model, b.Inch, b.Version, b.Spec
- SQL: select c.name,b.Model 모델,b.Inch,b.Version 제품버젼 ,b.Spec 규격 --select c.* from d33_제품수주서파일 a left join dw_product_mast b on(a.제품코드=b.Prod_code) left join dw_vendor_mast c on (a.거래처코드 = c.code and trade_c...


#### getLotStartLabel (select)
- 테이블: d21_
- 컬럼: lot_no, 10)+2, 4)), 0), '0000')
- SQL: select ?+FORMAT(CAST(COALESCE(max(substring(lot_no,CHARINDEX('-',lot_no,10)+2,4)),0) as INT)+1,'0000') lot_start_label from d21_제조지시MST where lot_no like ?+'F'+substring(CONVERT(VARCHAR(10), GETDATE()...


#### getLotInfo (select)
- 테이블: d02_, d21_, dw_product_mast, d04_, d33_, d03_, dw_common_code
- 컬럼: a.PO_NO, f.수주일자), 'yyyy-MM-dd'), f.수주수량, a.당일투입량, 시작LOT_NO, 생성수량, 잔여량, a.작업지시일자, a.작업구분...
- SQL: SELECT a.PO_NO, FORMAT(convert(date,f.수주일자),'yyyy-MM-dd') po_date, f.수주수량 총수량, f.수주수량-SUM(a.cell수) OVER (PARTITION BY a.po_no) 잔량, a.당일투입량 today_input, 시작LOT_NO start_label, 생성수량 create_qty, 잔여량 remai...


#### getCreatedLotInfo (select)
- 테이블: d33_, d05_, generateseries
- 컬럼: 제품코드
- SQL: BEGIN DECLARE @PO_NO varchar(20) = ?; DECLARE @지시일자 DATE = CAST(FORMAT(GETDATE(), 'yyyy-MM-dd') AS DATE); DECLARE @제품코드 VARCHAR(6) = (select 제품코드 from d33_제품수주서파일 where po_no =@PO_NO); DECLARE @제품품명 v...


#### saveLotInfo (select)
- 테이블: 
- 컬럼: 
- SQL: EXEC dbo.Lot_Create @MODEL = ?, @PO_NO = ?, @WORK_CODE = ?, --작업구분 @거래처코드 = ?, @당일투입량 = ?, @Lot_시작 = ?, @생성수 = ?, @제품코드 = ?, @자재코드 = ?, @발행자 = ?, @승인자 = ?, @승인일자 = ?, @입고일자 = ?, --FAB_IN_DATE @입고시각 = ...


#### deleteLotInfo (select)
- 테이블: 
- 컬럼: 
- SQL: EXEC dbo.Lot_delete @lot_no = ?...


#### getRunCards (select)
- 테이블: d22_run, d21_, lot_run, sort_run_lot
- 컬럼: a.작업지시일자, a.run_no, a.특기사항, b.lot_no, a.block수, b.run_cell1, case
- SQL: BEGIN DECLARE @제품유형 varchar(2) = ?; DECLARE @작업구분 varchar(2) = ?; --(P) Production Run_정규 DECLARE @시작일 varchar(8) = ? ; DECLARE @종료일 varchar(8) = ?; declare @적층설비 VARCHAR(3) = NULL; --'008'; --RL#A 가 ...


#### getLotInfoByRun (select)
- 테이블: d22_run, d21_, d29_
- 컬럼: b.lot_no, b.Sheet, b.BLOCK수, b.CELL수, a.run_no, case, b.run_no2, 0), 5, 0...
- SQL: select b.lot_no, b.Sheet, b.BLOCK수 Block, b.CELL수 cell, a.run_no run_no1, case when a.run_no = b.run_no1 then b.run_cell1 else b.run_cell2 end run_cell1, b.run_no2, coalesce(b.run_cell2,0) run_cell2, ...


#### getLotInfoByRunAll (select)
- 테이블: d22_run, d21_, d29_
- 컬럼: b.lot_no, b.Sheet, b.BLOCK수, b.CELL수, b.run_no1, b.run_cell1, b.run_no2, b.run_cell2, 5, 0...
- SQL: select b.lot_no, b.Sheet, b.BLOCK수 Block, b.CELL수 cell, b.run_no1, b.run_cell1, b.run_no2, b.run_cell2, CAST(a.입고일자 AS DATE) 입고일자, STUFF(STUFF(a.입고시각, 5, 0, ':'), 3, 0, ':') 입고시각, CAST(nullif(a.작업일자,'...


#### cancelRunCard (select)
- 테이블: 
- 컬럼: 
- SQL: EXEC dbo.RUN_Cancel @RUN_NO = ?;...


#### getLotInfoForRunCreate (select)
- 테이블: d21_, dw_equipment_mast, d22_run
- 컬럼: a.작업지시일자, a.lot_no, a.Sheet, a.BLOCK수, b.양품수량, run_no1, run_cell1, run_no2, run_cell2, g.입고일자)...
- SQL: begin declare @제품유형 varchar(2) = ?; --7073 declare @작업구분 varchar (2) = ?; --(D) Development Run_개발 declare @시작일자 varchar (8) = ?; declare @종료일자 varchar (8) = ?; declare @적층설비 varchar(3) = ?; --RL#1 미선...


#### getRunNo (select)
- 테이블: d22_run
- 컬럼: @제품모델, 6, 4), run_no, 10)+, 4)), 0), '0000')
- SQL: begin declare @제품모델 varchar(4) = ?; --MODEL 7073 declare @작업타입 varchar (1) = ?; --(D) Development Run_개발 D declare @LAST_LOT_NO varchar (24) = ?; --조회결과 마지막 LOT_NO '7073F2305-D0030' select @제품모델 + 'B'...


#### getProcessPlan (select)
- 테이블: d21_, dw_product_process, dw_process_plan
- 컬럼: C.공정코드, C.공정명
- SQL: SELECT C.공정코드, C.공정명 FROM d21_제조지시MST A INNER JOIN dw_product_process B ON (A.제품코드 = B.PROD_CODE) INNER JOIN DW_PROCESS_PLAN C ON (B.PROCESS_ID = C.PROCESS_ID AND C.공정구분 = '11') WHERE LOT_NO = ? ORDER...


#### runLotGenerate (select)
- 테이블: 
- 컬럼: 
- SQL: EXEC Run_Lot_cell @LOT_LIST = ?, @run_size=?;...


#### getRunCreatePreview (select)
- 테이블: d21_, dw_equipment_mast, string_split
- 컬럼: a.작업지시일자, a.lot_no, a.Sheet, a.BLOCK수, b.양품수량, CASE, #{fabInDate}, #{fabOutDate}, #{publisher}, #{approver}...
- SQL: begin DECLARE @LOT_LIST VARCHAR(5000) = ?; DECLARE @TMP_RUN_CELL TABLE ( RUN_NO varchar(40), lot_no varchar(26), run_no1 varchar(7), in_cell real, cell real, cum_cell real ); INSERT INTO @TMP_RUN_CELL...


#### getRunCreateList (select)
- 테이블: 
- 컬럼: 
- SQL: begin DECLARE @LOT_LIST VARCHAR(5000) = ?; DECLARE @TMP_RUN_CELL TABLE ( RUN_NO varchar(40), lot_no varchar(26), run_no1 varchar(7), in_cell real, cell real, cum_cell real ); INSERT INTO @TMP_RUN_CELL...


#### runLotUpdate (select)
- 테이블: 
- 컬럼: 
- SQL: EXEC Run_lot_gen_update @RUN_LIST = ?;...


#### saveRunCard (select)
- 테이블: 
- 컬럼: 
- SQL: EXEC dbo.Run_Create @LOT_LIST = ?, @발행자 = ?, @발행자서명 = 1, @승인자 = ?, @승인자서명 = 1, @입고일자 = ?, @입고시각 = ?, @작업일자 = ?, @작업시각 = ?, @RUN_SIZE = ?;...


#### getPrintRunCard1Info1 (select)
- 테이블: d22_run, d02_, d03_, d05_, d04_, dw_common_code
- 컬럼: 작업지시일자), 'yyyy-MM-dd'), run_no, b.내용, 거래처명, 제품Inch, 자재재질, 자재두께, a.특기사항, '000')+
- SQL: select FORMAT(convert(date,작업지시일자),'yyyy-MM-dd') 작업지시일자,run_no,b.내용 작업구분,거래처명,제품Inch,자재재질,자재두께,a.특기사항, FORMAT(cast(자재두께 as INT), '000')+ '-' + f.code as 'Glass BCR' FROM d22_RUN제조MST a left join d02_일...


#### getPrintRunCard1Info2 (select)
- 테이블: d21_
- 컬럼: lot_no, run_cell2, cell수, '#2'
- SQL: select lot_no,run_cell2 as run_cell, run_cell2/(cell수/block수) block, cell수 lot_cell,'#2' run_part FROM d21_제조지시MST where run_no2 = ? union all select lot_no,run_cell1 as run_cell, run_cell1/(cell수/blo...


#### getPrintRunCard2Info (select)
- 테이블: d22_run, d04_, dw_common_code, dw_product_mast, dw_
- 컬럼: A.RUN_NO, a.CELL수, e.code_name, d.customer_name, b.자재두께, b.자재재질, '000')+, 5, 0, '-')...
- SQL: SELECT A.RUN_NO,a.CELL수, e.code_name 작업구분, d.customer_name 고객명, CAST(d.Inch as varchar) 모델명, b.자재두께 두께, b.자재재질 Glass재질, FORMAT(cast(b.자재두께 as INT), '000')+ '-' + c.code as 'Glass BCR', STUFF(STUFF(작업지...


#### getRunSize (select)
- 테이블: 
- 컬럼: 
- SQL: select dbo.MODEL_RunSize(?) as run_size;...


#### getFilmImage (select)
- 테이블: dw_model_image
- 컬럼: image_data
- SQL: select image_data FROM dw_model_image where model = ?...


#### saveRemarks (update)
- 테이블: d21_
- 컬럼: 
- SQL: UPDATE d21_제조지시mst SET 특기사항 = ? WHERE lot_no = ?...


#### updatePrintCount (update)
- 테이블: d21_
- 컬럼: 
- SQL: UPDATE d21_제조지시MST SET 출력횟수 = 1 WHERE lot_no = ?...


#### saveRunRemarks (update)
- 테이블: d22_run
- 컬럼: 
- SQL: UPDATE d22_RUN제조MST SET 특기사항=#{특이사항} WHERE run_no = ?...


---

## 화면: M0003008 - Tab 0 MBOX 대기 관리
메뉴경로: Tab 0 MBOX 대기 관리
탭: TAB046000, TAB046001, TAB047000, TAB048000, TAB049100
설명: MBOX 대기 관리, MBOX 관리, MRUN 발행, 생산 실적 입력, 설비 로그 조회

### 관련 쿼리

#### selectModelList (select)
- 테이블: dw_model_mast
- 컬럼: model
- SQL: select model as text ,model as value from dw_model_mast...


#### selectMboxSummary (select)
- 테이블: getreworkwaitcell
- 컬럼: 
- SQL: SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED; select * from GetReworkWaitCell(?,?,?,?,?) Order by 공정순서...


#### selectMboxList (select)
- 테이블: getreworkwaitcell_list
- 컬럼: 
- SQL: select * from GetReworkWaitCell_List(?,?,?,?,?) --Order by rw,1,2...


#### selectFQCList (select)
- 테이블: 
- 컬럼: 
- SQL: EXEC GetFQCWaitCell_List ?,?,?,?,?...


#### selectEciList (select)
- 테이블: geteciwaitcell_list
- 컬럼: 
- SQL: SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED; select * from GetEciWaitCell_List(?,?,?,?,?) --Order by rw,1,2;...


#### selectPaclList (select)
- 테이블: get
- 컬럼: 
- SQL: select * from Get이물제거WaitCell_List(?,?,?,?,?) Order by rw,1,2...


#### selectMboxSumList (select)
- 테이블: getreworkwaitrun_list
- 컬럼: 
- SQL: select * from GetReworkWaitRun_List(?,?,?,?,?,?,?) where 공정순서=? order by 공정순서,1...


#### selectFQCSumList (select)
- 테이블: getfqcwaitrun_list
- 컬럼: 
- SQL: select * from GetFQCWaitRun_List(?,?,?,?,?,?,?) where 공정순서=? order by 공정순서,1...


#### selectEciSumList (select)
- 테이블: geteciwaitrun_list
- 컬럼: 
- SQL: SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED; select * from GetEciWaitRun_List(?,?,?,?,?,?,?) where 공정순서=? order by 공정순서,1...


#### selectPaclSumList (select)
- 테이블: get
- 컬럼: 
- SQL: select * from Get이물제거WaitRun_List(?,?,?,?,?,?,?) where 공정순서=? order by 공정순서,1...


#### selectEciWaitCellList (select)
- 테이블: processeciwaitcell
- 컬럼: 
- SQL: select * from ProcessEciWaitCell(?,?,?,?)...


#### selectMboxWaitCellList (select)
- 테이블: processmboxwaitcell
- 컬럼: 
- SQL: select * from ProcessMboxWaitCell(?,?,?,?)...


#### selectFmrWaitCellList (select)
- 테이블: process
- 컬럼: 
- SQL: select * from Process이물제거WaitCell(?,?,?,?)...


#### selectFQCWaitCellList (select)
- 테이블: processfqcwaitcell
- 컬럼: 
- SQL: select * from ProcessFQCWaitCell(?,?,?,?,?) order by Bare_Cell...


#### selectMboxGenCount (select)
- 테이블: mbox_gencount
- 컬럼: 
- SQL: select * from MBOX_GenCount(?,?,?,?,?);...


#### selectMboxGenList (select)
- 테이블: mbox_genlist
- 컬럼: 
- SQL: select * from MBOX_GenList(?,?,?,UPPER(?),?,?)...


#### selectMboxGenSum (select)
- 테이블: mbox_gensum
- 컬럼: 
- SQL: select * from MBOX_GenSum(?,?,?,?,UPPER(?),?,?)...


#### selectMboxNoGenList (select)
- 테이블: mbox_nogenlist
- 컬럼: 
- SQL: select * from MBOX_NoGenList(?,?,?,?,UPPER(?),?,?) order by 상태 desc,mbox_no,before,cell_no...


#### selectMboxNoGenSum (select)
- 테이블: mbox_nogensum
- 컬럼: 
- SQL: select * from MBOX_NoGenSum(?,?,?,?,UPPER(?),?,?);...


#### selectMrunbox (select)
- 테이블: d23_mrunbox
- 컬럼: 'M-BOX', 1, 13), 5, 0, '-'), 8, 14, ':')), MBOX_NO...
- SQL: select 'M-BOX' as 상태, MIN(STUFF(STUFF(STUFF(substring(Start_Time, 1, 13),5,0,'-'),8,0,'-'),14,0,':')) as 등록일시, MBOX_NO, SUM(수량) as 수량, ''AFT_RUNNO, MAX(등록자) 등록자, MAX(승인자) 승인자, MAX(특이사항) 특이사항 from d23_...


#### selectMrunboxInfo (select)
- 테이블: mrun_mbox_info
- 컬럼: 
- SQL: select * from MRUN_MBOX_Info(?,?,?,?,?) order by 입고일자 desc,입고시각 desc...


#### execCheckMboxWaitCell (select)
- 테이블: 
- 컬럼: 
- SQL: exec Control_MBOXWaitCell ?,?,?;...


#### execSaveBareCell (select)
- 테이블: 
- 컬럼: 
- SQL: exec Save_BareCell ?,?,?,?,?,?;...


#### execSaveMboxWaitCell (select)
- 테이블: 
- 컬럼: 
- SQL: exec Save_MboxwaitCell ?,?,?,?;...


#### selectMboxInfo (select)
- 테이블: 
- 컬럼: 
- SQL: EXEC MBOX_Info ?,?,? ,?;...


#### selectMboxCellList (select)
- 테이블: d23_mrunbox
- 컬럼: CELL_NO, CASE, BEF_RUNNO, AGB_호기명, PFL_설비명, PFL_STAGE, 이물_LINE, 특이사항, AFT_RUNNO, BEF_차수
- SQL: select CELL_NO ,CASE WHEN org투입구분='P' then '양산' WHEN org투입구분='D' then '개발' WHEN org투입구분='M' then 'Rework' WHEN org투입구분='T' then '공정검사' WHEN org투입구분='Q' then '승인' WHEN org투입구분='C' then '검증' ELSE '기타' E...


#### selectMboxCellList1 (select)
- 테이블: d23_mrunbox
- 컬럼: CELL_NO, BEF_RUNNO, AGB_호기명, PFL_설비명, PFL_STAGE, 이물_LINE, 특이사항, AFT_RUNNO
- SQL: select CELL_NO ,BEF_RUNNO as RUN_NO ,AGB_호기명 ,PFL_설비명 ,PFL_STAGE as STAGE ,이물_LINE ,특이사항 ,AFT_RUNNO as MRUN_NO from d23_MRUNBOX파일 where mbox_no=(select mbox_No from d23_MRUNBOX파일 where cell_no=?)...


#### selecNewMboxNo (select)
- 테이블: mbox_newno
- 컬럼: 
- SQL: select * from MBOX_NewNo(?,?,? ,?)...


#### execSaveMboxCell (select)
- 테이블: 
- 컬럼: 
- SQL: EXEC Save_MboxBoxCell ?,?,?,?,?,?,?;...


#### getProcessPlan (select)
- 테이블: dw_process_plan
- 컬럼: 공정코드, 공정명
- SQL: select 공정코드,공정명 from dw_process_plan where line='DFB1' and process_id='D1RW'...


#### execMrunGenerate (select)
- 테이블: 
- 컬럼: 
- SQL: EXEC MRUN_Generate ?,?;...


#### execMrunSave (select)
- 테이블: 
- 컬럼: 
- SQL: EXEC MRUN_Save ?, ?, ?;...


#### execMrunDelete (select)
- 테이블: 
- 컬럼: 
- SQL: EXEC MRUN_Delete ?;...


#### execCancelMboxBoxCell (select)
- 테이블: 
- 컬럼: 
- SQL: EXEC Cancel_MboxBoxCell ?,?;...


#### selectMrunStatus (select)
- 테이블: mrun_status
- 컬럼: 
- SQL: select * from MRUN_Status(?)...


#### selectMrunMboxList (select)
- 테이블: getrework, d42_
- 컬럼: a.공장코드, a.run_no, a.공정코드, a.차수, a.seq, a.lot_no, a.bef_공정코드, a.NXT_공정코드, a.박리작업구분, a.작업자...
- SQL: /*selectMrunMboxList*/ select a.공장코드 ,a.run_no ,a.공정코드 ,a.차수 ,a.seq ,a.lot_no ,a.bef_공정코드 ,a.NXT_공정코드 ,a.박리작업구분 ,a.작업자 ,a.작업조 ,a.작업시작 ,a.시작시각 ,a.shift ,a.f_cstno as CST_NO ,a.f_수량 as CST_CELL ,a.f_불량수...


#### selectDpfFailInfo (select)
- 테이블: getrework
- 컬럼: a.공장코드, a.run_no, a.공정코드, a.차수, a.seq, a.lot_no, a.bef_공정코드, a.NXT_공정코드, a.박리작업구분, a.작업자...
- SQL: /*selectDpfFailInfo*/ select a.공장코드 ,a.run_no ,a.공정코드 ,a.차수 ,a.seq ,a.lot_no ,a.bef_공정코드 ,a.NXT_공정코드 ,a.박리작업구분 ,a.작업자 ,a.작업조 ,a.작업시작 ,a.시작시각 ,a.shift ,a.f_cstno ,a.f_수량 ,a.f_불량수량 ,a.작업종료 ,a.종료시각 ,a.투입...


#### selectReworkMcList (select)
- 테이블: dw_equipment_mast
- 컬럼: 설비번호, '['+설비번호+'], 설비약명, Chamber
- SQL: select 설비번호 as value ,'['+설비번호+'] '+설비약명 as text ,설비약명 ,Chamber as LINE_축 from dw_equipment_mast where 설비번호 in ('412','506') and 사용여부=1...


#### selectPrintMRunCardInfo (select)
- 테이블: d22_run, d04_, dw_common_code, dw_product_mast, dw_
- 컬럼: A.RUN_NO, e.code_name, d.customer_name, d.Inch, b.자재두께, b.자재재질, '000')+, 5, 0, '-')...
- SQL: SELECT A.RUN_NO, e.code_name 작업구분, d.customer_name 고객명, d.Inch 모델명, b.자재두께 두께, b.자재재질 Glass재질, FORMAT(cast(b.자재두께 as INT), '000')+ '-' + c.code as 'Glass BCR', STUFF(STUFF(작업지시일자,5, 0, '-'), 8, 0, '-'...


#### insertReworkBadCnt (select)
- 테이블: d42_, d29_
- 컬럼: distinct
- SQL: /*삭제 후 추가*/ delete from d42_검사불량사유파일 where 공장코드 = '2' and 공정코드 = ? and LOTRUN_ID = ? and CST_NO in (?,?) and 불량코드 = ( select distinct 불량코드 from d29_공정별불량파일 where 공정코드 = ? and 사용여부 = 1 and 불량명 = ? );...


#### selectBareCellProcess (select)
- 테이블: dw_step_mast
- 컬럼: 공정약어, 공정코드
- SQL: select 공정약어 as text ,공정코드 as value from dw_step_mast where line='DFB1' and 공정코드 in ('054','055')...


#### selectBareCellRw (select)
- 테이블: dw_common_code_input
- 컬럼: code, code_name
- SQL: select code as value ,code_name as text from dw_common_code_input where maj_code ='73' and code in ('31','9','6','250') and use_yn = 1 order by sort_order,code...


#### runCheckBareCell (select)
- 테이블: 
- 컬럼: 
- SQL: exec Run_Check_BareCell ?,?;...


#### selectBareCellList (select)
- 테이블: d23_mrun, generateseries
- 컬럼: @START_CELL_NO, @RUN_ID+'-', ''), 0)+1
- SQL: BEGIN DECLARE @RUN_ID VARCHAR(27) = ?, @가능수량 INT = ?, @담당자 varchar(15) = ?, @공정 varchar(4) = ?, @START_CELL_NO INT; select @START_CELL_NO = coalesce(max(cast(replace(cell_id,@RUN_ID+'-','') as int)),0...


#### deleteBareCellList (select)
- 테이블: 
- 컬럼: 
- SQL: exec Delete_BareCell ?...


#### execMboxDisassembly (select)
- 테이블: 
- 컬럼: 
- SQL: exec MboxDisassembly ?...


#### execMboxPaidSales (select)
- 테이블: 
- 컬럼: 
- SQL: exec Mbox_유상판매 ?, ?...


#### selectAgbList (select)
- 테이블: dw_equipment_mast
- 컬럼: 설비약명
- SQL: select 설비약명 from dw_equipment_mast WHERE 공정코드 = '056' and 사용여부 = 1...


#### insertReworkCst (insert)
- 테이블: d22_run
- 컬럼: 
- SQL: INSERT INTO d22_RUN카세트파일 ( 공장코드 ,RUN_NO ,공정코드 ,SEQ ,LOT_NO ,BEF_공정코드 ,NXT_공정코드 ,박리작업구분 ,작업자 ,작업조 ,작업시작 ,시작시각 ,SHIFT ,F_CSTNO ,F_수량,F_불량수량,작업종료,종료시각,투입수량,Machine_Code ,IN_CSTNO,T_CSTNO,T_수량 ,T_수량2,T_불량...


#### insertMcstMrunbox (insert)
- 테이블: d23_mrunbox
- 컬럼: 2, #{mboxNo}, '-'
- SQL: /*cst 단건 입력 쿼리 예시*/ insert into d23_MRUNBOX파일 (공장코드,MBOX_NO,CELL_NO, CST_NO, 수량, BEF_RUNNO, 등록자, 등록여부, 승인자, 승인여부, start_time, end_time, AGB_호기명, SCRAP_Code, 특이사항, 저장여부, 재공적용_여부) select 2 as 공장코드 ,? as...


#### saveRemarks (update)
- 테이블: d23_mrun
- 컬럼: 
- SQL: UPDATE d23_MRUN대기파일 SET 특이사항 = ? WHERE CELL_ID = ?...


#### reworkStartJob (update)
- 테이블: d22_run
- 컬럼: 
- SQL: update d22_RUN제조VLR set 작업시작 = #{작업시작} ,시작시각 = #{시작시각} ,작업자 = ? ,Machine_Code = ? ,SHIFT = ? ,투입수량 = #{투입수량} where run_no = ? and 공정코드 = ?...


#### updateEndJobVLR (update)
- 테이블: d22_run
- 컬럼: 
- SQL: update d22_RUN제조VLR set 작업종료 = #{작업종료} ,종료시각 = #{종료시각} ,불량수량 = #{불량수량} ,양품수량 = #{양품수량} where run_no = ? and 공정코드 = ?...


#### deleteMrunWaitCell (delete)
- 테이블: d23_mrun
- 컬럼: 
- SQL: delete from d23_MRUN대기파일 where cell_id=? and 공정코드=?...


#### deleteMrunCell (delete)
- 테이블: d23_mrunbox
- 컬럼: 
- SQL: delete from d23_MRUNBOX파일 where cell_id=?...


---

## 화면: M0003009 - Tab 0 생산 실적 입력
메뉴경로: Tab 0 생산 실적 입력
탭: TAB043000, TAB044000, 074, 077, 080, 082, 087, TAB045600
설명: 생산 실적 입력, 내포장 실적, 출하 검사 대기, 출하 검사 의뢰, 출하 검사, 출하 대기, 출하, 재고 현황

### 관련 쿼리

#### M0003009_Sch1 (select)
- 테이블: get_
- 컬럼: 
- SQL: select * from Get_내포장실적_설비이물제거Manual(?,?,?) where 1=1 order by RUN_NO, ORIGIN_NO, PACK_NO, 작업일자 desc;...


#### M0003009_Sch2 (select)
- 테이블: get_
- 컬럼: 
- SQL: select * from Get_내포장실적_설비이물제거Manual_Pack관리(?,?,?,?) where 1=1 order by 생성시각 desc, PACK_QRNO, 대포장_QRNO;...


#### M0003009_Sch3 (select)
- 테이블: get_
- 컬럼: 
- SQL: select * from Get_내포장실적_설비이물제거Auto(?,?,?,?) where 1=1 order by 작업일자 desc, PACK_NO, RUN_NO;...


#### M0003009_Sch3_1 (select)
- 테이블: get_
- 컬럼: 
- SQL: select * from Get_내포장실적_설비이물제거Auto_미생성(?,?) where 1=1 order by RUN_NO, PACK_NO, 작업일자 desc ;...


#### M0003009_Sch4 (select)
- 테이블: get_
- 컬럼: 
- SQL: select * from Get_내포장실적_설비이물제거Auto_Pack관리(?,?,?,?) where 1=1 order by 생성시각 desc, PACK_QRNO;...


#### M0003009_Sch5 (select)
- 테이블: get_
- 컬럼: 
- SQL: select * from ( select 'AUTO' 작업구분,구분,run_no,''origin_no,pack_no,cell수량,작업일자,작업자,설비,shift,svi,agb,pfl,처리시각,발행자,발행자서명,승인자,승인자서명,특이사항,PACK상태 from Get_내포장실적_설비이물제거Auto(?,?,?,NULL) union all select 'MANUA...


#### M0003009_Sch5_1 (select)
- 테이블: get_
- 컬럼: 
- SQL: select * from ( select 'AUTO' 작업구분,구분,run_no,''origin_no,pack_no,cell수량,format(작업일자,'yyyyMMdd HHmmss') 작업일자, 작업자,설비,shift,svi,agb,pfl,처리시각,발행자,발행자서명,승인자,승인자서명,특이사항,PACK상태 from Get_내포장실적_설비이물제거Auto_미생성...


#### M0003009_Sch6 (select)
- 테이블: get_
- 컬럼: 
- SQL: SELECT * from Get_내포장실적_설비이물제거_통합PackSummaryCell수량조회(?,?, null) where 1=1 order by 구분 desc;...


#### M0003009_Sch7 (select)
- 테이블: 
- 컬럼: 
- SQL: BEGIN IF ? IS NULL BEGIN RETURN; END EXEC Get_내포장실적_설비이물제거_통합Pack상세조회 ?,?,? END...


#### M0003009_Sch8 (select)
- 테이블: 
- 컬럼: 
- SQL: EXEC Get_내포장실적_설비이물제거_통합PackCell조회 ?,?,?...


#### M0003009_Sch11 (select)
- 테이블: get_palletlist
- 컬럼: 
- SQL: select * from Get_PalletList() where 1=1 order by pallet_no desc...


#### M0003009_Sch12 (select)
- 테이블: get_palletboxlist
- 컬럼: 
- SQL: select * from Get_PalletBoxList(?) order by 대포장_QRNO...


#### M0003009_Sch13 (select)
- 테이블: get_palletboxinfo
- 컬럼: 
- SQL: select * from Get_PalletBoxInfo(?) order by 대포장_QRNO...


#### M0003009_ExecRemove (select)
- 테이블: 
- 컬럼: 
- SQL: EXEC Pallet_Box제거 @pallet_no = ?, @BoxNoList = ?...


#### M0003009_ExecAdd (select)
- 테이블: 
- 컬럼: 
- SQL: EXEC Pallet_Box추가 @pallet_no = ?, @대기발행자 = ?, @대기승인자 = ?, @BoxNoList = ?...


#### M0003009_ExecDismantle (select)
- 테이블: 
- 컬럼: 
- SQL: EXEC dbo.Pallet해체 @palletNoList = ?...


#### M0003009_Sch21_Col (select)
- 테이블: d27_
- 컬럼: DISTINCT, 1, 4)
- SQL: SELECT DISTINCT substring(run_id,1,4) model FROM d27_내포장MST WHERE PACK상태 in ('소포장 반출','창고 재고') and ((폐기시각 BETWEEN ?+' 000000' AND ?+' 235959' AND pack상태 = '폐기') OR (출하작업시각 BETWEEN ?+' 000000' AND ?+' ...


#### M0003009_Sch21 (select)
- 테이블: 
- 컬럼: 
- SQL: exec Get_from_소포장반출_to_출하대기List ?, ?...


#### M0003009_Sch22 (select)
- 테이블: get_packnonboxno
- 컬럼: 
- SQL: select * from Get_PackNonBoxNo검증(?, ?);...


#### M0003009_Sch23 (select)
- 테이블: get_packnonboxnoinfo
- 컬럼: 
- SQL: select * from Get_PackNonBoxNoInfo(?, ?);...


#### M0003009_Sch11_Storage (select)
- 테이블: get_palletlist
- 컬럼: 
- SQL: select * from Get_PalletList() where 1=1 and 보관구역 is not null and 보관구역 != '' order by pallet_no desc...


#### M0003009_Sch24 (select)
- 테이블: get_nextpalletno
- 컬럼: 
- SQL: select * from Get_NextPalletNo(?);...


#### M0003009_ExecBox (select)
- 테이블: 
- 컬럼: 
- SQL: EXEC dbo.Pallet_Box구성 @pallet_no = ?, @대기발행자 = ?, @대기승인자 = ?, @BoxNoList = ?...


#### M0003009_Sch31_Col (select)
- 테이블: d27_
- 컬럼: MODEL
- SQL: SELECT MODEL FROM ( (SELECT '합계' as MODEL union all SELECT DISTINCT substring(run_id,1,4) model from d27_내포장MST where PACK상태 in ('SI 의뢰','SI 대기') and ( (SI_의뢰시각 BETWEEN ? + ' 000000' AND ? + ' 235959'...


#### M0003009_Sch31 (select)
- 테이블: 
- 컬럼: 
- SQL: exec Get_출하검사대기의뢰 ?, ?...


#### M0003009_ExeInspectionInfo (select)
- 테이블: 
- 컬럼: 
- SQL: exec Get_출하검사의뢰_Cell ?, ?, ?;...


#### M0003009_RequestInspection (select)
- 테이블: 
- 컬럼: 
- SQL: exec Req_출하검사의뢰 ?, ?;...


#### M0003009_ExecCancel (select)
- 테이블: 
- 컬럼: 
- SQL: exec Cancel_출하검사의뢰 ?, ?, ?;...


#### M0003009_ExecRemovePack (select)
- 테이블: 
- 컬럼: 
- SQL: exec Remove_출하검사의뢰Pack ?, ?, ?, ?;...


#### M0003009_ExecAddPack (select)
- 테이블: 
- 컬럼: 
- SQL: exec Add_출하검사의뢰Pack ?, ?, ?, ?;...


#### M0003009_ExeInspectionPack (select)
- 테이블: get_
- 컬럼: 
- SQL: select * from Get_출하검사대기_Pack(?, ?, ?);...


#### M0003009_ExeReqPack (select)
- 테이블: get_
- 컬럼: 
- SQL: select * from Get_출하검사의뢰_Pack(?, ?, ?);...


#### M0003009_Sch41_Col (select)
- 테이블: d27_
- 컬럼: DISTINCT, 1, 4)
- SQL: SELECT DISTINCT substring(run_id,1,4) model from d27_내포장MST where PACK상태 in ('SI 의뢰') and SI_의뢰시각 BETWEEN ?+' 000000' and ?+ ' 235959' order by 1...


#### M0003009_Sch41 (select)
- 테이블: 
- 컬럼: 
- SQL: exec Get_출하검사의뢰 ?, ?...


#### M0003009_Sch42 (select)
- 테이블: 
- 컬럼: 
- SQL: exec Get_출하검사의뢰_List ?, ?, ?...


#### M0003009_ExeReqDateSeq (select)
- 테이블: get_
- 컬럼: 
- SQL: select * from Get_출하검사의뢰_일자차수(?, ?)...


#### M0003009_ExeRequestPack (select)
- 테이블: 
- 컬럼: 
- SQL: exec Req_출하검사PACK요청 ?, ?;...


#### M0003009_ExeRequestRun (select)
- 테이블: 
- 컬럼: 
- SQL: exec Req_출하검사RUN요청 ?, ?, ?, ?, ?;...


#### M0003009_Sch43_Col (select)
- 테이블: d27_
- 컬럼: DISTINCT, 1, 4)
- SQL: SELECT DISTINCT substring(run_id,1,4) model from d27_내포장MST where PACK상태 in ('SI 의뢰' ) and SI_의뢰시각 BETWEEN ?+' 000000' and ?+ ' 235959' order by 1...


#### M0003009_Sch43 (select)
- 테이블: 
- 컬럼: 
- SQL: exec Get_출하검사SAMPLE ?, ?...


#### M0003009_Sch44 (select)
- 테이블: 
- 컬럼: 
- SQL: exec Get_샘플의뢰PACK_List ?, ?, ?...


#### M0003009_Sch45 (select)
- 테이블: get_
- 컬럼: 
- SQL: ...


#### M0003009_GetHoldRunList (select)
- 테이블: 
- 컬럼: 
- SQL: exec Get_출하검사RunHold ?, ?, ?...


#### M0003009_SetHoldRunList (select)
- 테이블: 
- 컬럼: 
- SQL: exec Set_출하검사RunHold설정 ?...


#### M0003009_Sch46 (select)
- 테이블: d27_
- 컬럼: 
- SQL: select * from d27_출하검사 where 1=1 and SI진행단계 = '검사 완료'...


#### M0003009_ExecDonePack (select)
- 테이블: 
- 컬럼: 
- SQL: exec Done_PACK인계 ?, ?;...


#### M0003009_ExecGetPackLabel (select)
- 테이블: 
- 컬럼: 
- SQL: exec get_pack_label ?;...


#### M0003009_ManualQty_Sch1 (select)
- 테이블: d26_
- 컬럼: CELL_ID
- SQL: Select CELL_ID From d26_이물제거파일 Where 1=1 and RUN_ID + '-' + ORIGIN_NO = ? and SCRAP <![CDATA[<>]]> '삭제' Order By CELL_ID;...


#### M0003009_ManualQty_Sch2 (select)
- 테이블: d26_
- 컬럼: CELL_ID, 특이사항
- SQL: Select CELL_ID, 특이사항 as Remark From d26_이물제거파일 Where 1=1 and RUN_ID + '-' + ORIGIN_NO = ? and SCRAP = '삭제' Order By CELL_ID;...


#### M0003009_ManualQty_Sch3 (select)
- 테이블: d26_
- 컬럼: RUN_ID, ORIGIN_NO
- SQL: Select RUN_ID, ORIGIN_NO, sum(생산수량) as qty, sum(정상수) remain_qty, sum(삭제수) delete_qty From( Select RUN_ID, ORIGIN_NO, SCRAP, 1 as 생산수량 , case when SCRAP = '삭제' then 0 else 1 end as 정상수 , case when SCRA...


#### M0003009_ManualQty_Cancel (select)
- 테이블: 
- 컬럼: 
- SQL: exec S라인_cell_불량처리_CanCel ?, ?;...


#### M0003009_ExeCreation (select)
- 테이블: 
- 컬럼: 
- SQL: exec GEN_이물제거_S라인_PACKNO ?, ?, ?;...


#### M0003009_ExeDispose (select)
- 테이블: 
- 컬럼: 
- SQL: exec 폐기_S라인_PACK ?, ?;...


#### M0003009_ExeSignificant (select)
- 테이블: 
- 컬럼: 
- SQL: exec 특이사항_S라인_PACK ?, ?;...


#### M0003009_ExeCreationAuto (select)
- 테이블: 
- 컬럼: 
- SQL: exec Gen_이물제거_AUTO_BoxNo ?, ?, ?;...


#### M0003009_ExeDisposeAuto (select)
- 테이블: 
- 컬럼: 
- SQL: exec 폐기_AUTO_PACK ?, ?;...


#### M0003009_ExeSignificantAuto (select)
- 테이블: 
- 컬럼: 
- SQL: exec 특이사항_AUTO_PACK ?, ?;...


#### M0003009_Sch51_Col (select)
- 테이블: d27_pallet
- 컬럼: DISTINCT, 1, 4)
- SQL: SELECT DISTINCT substring(run_id,1,4) model FROM d27_PALLET수불파일 WHERE 1=1 AND ((대기처리시각 BETWEEN ? + ' 000000' AND ? + ' 235959' and pack상태 = '창고 재고') OR (출하처리시각 BETWEEN ? + ' 000000' AND ? + ' 235959' ...


#### M0003009_Sch51 (select)
- 테이블: 
- 컬럼: 
- SQL: exec Get_출하대기List ?, ?...


#### M0003009_GetShipmentPalletInfo (select)
- 테이블: get_
- 컬럼: 
- SQL: select * from Get_출하PalletInfo(?);...


#### M0003009_ShipmentTempSave (select)
- 테이블: 
- 컬럼: 
- SQL: exec 출하Pallet임시저장 ?, #{생산계획번호};...


#### M0003009_Shipment (select)
- 테이블: 
- 컬럼: 
- SQL: exec Pallet출하처리 ?, #{생산계획번호};...


#### M0003009_ShipmentCancel (select)
- 테이블: 
- 컬럼: 
- SQL: exec Pallet출하취소처리 ?;...


#### M0003009_ShipmentList (select)
- 테이블: get_
- 컬럼: 
- SQL: SELECT * FROM Get_출하완료_Pallet(?, ?,?);...


#### M0003009_Sch61_Col (select)
- 테이블: d27_, d27_pallet
- 컬럼: DISTINCT, 1, 4)
- SQL: SELECT DISTINCT substring(run_id,1,4) model FROM d27_내포장MST WHERE PACK상태 in ('HOLD','SI 대기','SI 의뢰','SI LIST','창고 재고','소포장 반출') AND ( (폐기시각 BETWEEN ? + ' 000000' AND ? + ' 235959' AND pack상태 = '폐기') O...


#### M0003009_Sch6S (select)
- 테이블: 
- 컬럼: 
- SQL: EXEC Get_포장출하_재고현황 ?, ?...


#### M0003009_Sch61 (select)
- 테이블: 
- 컬럼: 
- SQL: EXEC Get_출하검사대기_List ?, ?,?...


#### M0003009_Sch62 (select)
- 테이블: get_
- 컬럼: 
- SQL: SELECT * FROM Get_출하대기_PackList(?, ?,?)...


#### M0003009_Sch63 (select)
- 테이블: 
- 컬럼: 
- SQL: EXEC Get_소포장반출_List ?, ?,?...


#### M0003009_ShipWait (select)
- 테이블: 
- 컬럼: 
- SQL: EXEC 샘플재작업_PACK확인 ?...


#### M0003009_PackOut (select)
- 테이블: 
- 컬럼: 
- SQL: exec 샘플재작업후_출하대기 ?, ?, ?;...


#### M0003009_WaitShipment (insert)
- 테이블: 
- 컬럼: 
- SQL: exec SI대기_To_출하대기 ?, ?, ?;...


#### M0003009_ManualQty_Update (insert)
- 테이블: 
- 컬럼: 
- SQL: exec S라인_cell_불량처리 ?, ?, ?, ?, ?;...


#### M0003009_Update_Storage (update)
- 테이블: d27_pallet
- 컬럼: 
- SQL: UPDATE d27_PALLET수불파일 SET 보관구역 = #{보관구역} WHERE PALLET_NO = ? and pack상태 != '출하 완료'...


#### M0003009_Update_Inspection (update)
- 테이블: d27_
- 컬럼: 
- SQL: <!-- 첫 번째 업데이트: 검사 결과 업데이트 --> --UPDATE d27_출하검사 SET exec PACK_출하검사결과 @SI진행단계 = #{si진행단계}, @SI의뢰일 = #{si의뢰일}, @SI검사일 = #{si검사일}, @SI검사자 = #{si검사자}, @외관 = #{외관}, @엣지 = #{엣지}, @포장이물 = #{포장이물}, @Curl = ?...


---

## 화면: M0004002 - Tab 1 Lot 변경이력 조회
메뉴경로: Tab 1 Lot 변경이력 조회
탭: TAB040003, TAB040004, TAB040005
설명: Lot 변경이력 조회, Lot 변경, Lot 변경 상세 보기

### 관련 쿼리

#### getModels (select)
- 테이블: dw_common_code
- 컬럼: code_name, code
- SQL: select code_name 제품유형,code 코드 from dw_common_code where maj_code='36' order by code_name...


#### getWorkTypes (select)
- 테이블: d02_
- 컬럼: 내용, 코드
- SQL: select 내용 작업구분, 코드 from d02_일반코드파일 where 대분류='31' order by 내용...


#### getProcess (select)
- 테이블: dw_
- 컬럼: 공정코드, 공정명
- SQL: select 공정코드, 공정명 from dw_재공재고Report순서 where 1=1 and 공정구분 = '9' and 공정코드 between '010' and '020' order by 공정코드...


#### searchLotChangeList (select)
- 테이블: d21_lotno
- 컬럼: 공장코드, 변경일자), 구LOT_NO, 신LOT_NO, 처리수량, 담당자, 변환사유, 처리여부
- SQL: SELECT 공장코드, CONVERT(DATE,변경일자) 변경일자, 구LOT_NO, 신LOT_NO, 처리수량, 담당자, 변환사유, 처리여부 FROM d21_LOTNO변경이력파일 where 1=1 ;...


#### searchDetailLotChangeList (select)
- 테이블: dw_lot
- 컬럼: 
- SQL: SELECT * FROM dw_lot변경상세이력 where 1=1 ;...


#### getLotProcCount (select)
- 테이블: d21_
- 컬럼: 지시수량
- SQL: select 지시수량 FROM d21_제조지시MST WHERE lot_no = ?;...


#### execLotChange (select)
- 테이블: 
- 컬럼: 
- SQL: EXEC dbo.lot_change @공장코드 = '2', @old_lot = #{구lotNo}, @new_lot= #{신lotNo}, @po_no= ?, @담당자= #{담당자}, @변환사유= #{변환사유};...


#### checkLotNo (select)
- 테이블: d21_
- 컬럼: lot_no, cell수
- SQL: select lot_no,cell수 FROM d21_제조지시MST WHERE lot_no in <foreach collection="lotList" item="no" open="(" separator="," close=")"> ? </foreach>...


#### getOldLotNoList (select)
- 테이블: get_lot
- 컬럼: lot_no, 공정코드
- SQL: select lot_no, 공정코드 from Get_Lot변경_모델별_공정별_Lot리스트(?, ?);...


#### getNewLotNoList (select)
- 테이블: 
- 컬럼: 
- SQL: exec Get_Lot변경_신규Lot리스트 ?, ?;...


#### checkLotChangable (select)
- 테이블: get_lot
- 컬럼: 
- SQL: select * from Get_Lot변경체크로직(?, ?, ?);...


---

## 화면: M0004003 - Tab 1 Hold 설정
메뉴경로: Tab 1 Hold 설정
탭: TAB040001, TAB040002
설명: Hold 설정, Hold 해제

### 관련 쿼리

#### searchHoldStatus (select)
- 테이블: dw_hold_
- 컬럼: 
- SQL: select * from dw_HOLD_설정해제내역...


#### getRunNoStatus (select)
- 테이블: get_runno
- 컬럼: 
- SQL: select * from Get_RunNo상태가져오기(?);...


#### getHoldInfo (select)
- 테이블: get_hold
- 컬럼: 
- SQL: select * from Get_Hold기준정보(null);...


#### setHoldStatus (select)
- 테이블: 
- 컬럼: 
- SQL: exec Set_Hold설정 @RunNo = ?, @HOLD코드 = #{hold코드}, @HOLD사유= #{hold사유}, @담당자= #{담당자}, @비고 = #{비고}...


#### cancelHoldStatus (select)
- 테이블: 
- 컬럼: 
- SQL: exec Set_Hold해제 @RunNo = ?, @HOLD일시 = #{hold일시}, @HOLD해제처리자 = #{hold해제처리자}, @HOLD해제조치내역 = #{hold해제조치내역}...


---

## 화면: M0005003 - Tab 1 UTG 작업 이력 조회
메뉴경로: Tab 1 UTG 작업 이력 조회
탭: TAB051000, TAB052000, TAB053000, TAB054000, TAB055000
설명: UTG 작업 이력 조회, 제품 진행 현황 조회, CELL 작업 이력 조회(개별), CELL 작업 이력 조회(대량), PACK 작업 이력 조회

### 관련 쿼리

#### getCellTrackingInfo (select)
- 테이블: getcelltrackinginfofrompflnew
- 컬럼: 
- SQL: select * FROM ( select * from GetCellTrackingInfoFromPFLNew(?) ) A WHERE cell_id IS NOT NULL order by cell_id,seq...


---

## 화면: M0006001 - 제품유형 제목과 드랍다운
메뉴경로: 제품유형 제목과 드랍다운



### 관련 쿼리

#### getModels (select)
- 테이블: dw_common_code
- 컬럼: code_name, code
- SQL: select code_name 제품유형,code 코드 from dw_common_code where maj_code='36' order by code_name...


#### getWorkTypes (select)
- 테이블: dw_common_code
- 컬럼: code_name, code
- SQL: select code_name 작업구분,code 코드 from dw_common_code where maj_code='31' order by code_name...


#### getPoNo (select)
- 테이블: d33_
- 컬럼: '')+'-'+, po_no, 14)+1, 3))+1, 1), '00')
- SQL: select coalesce(?,'')+'-'+FORMAT(getdate(),'yyMMdd')+'-'+coalesce(?,'')+'-'+ ( select FORMAT(COALESCE(max(substring(po_no,CHARINDEX('-',po_no,14)+1,3))+1,1),'00') from d33_제품수주서파일 where po_no like '%'...


#### getPurchaseOrders (select)
- 테이블: d33_, dw_vendor_mast, dw_common_code, dw_product_mast, d21_
- 컬럼: a.수주일자), a.수주번호, c.code_name, a.제품유형, d.code_name, a.작업구분, b.name, b.code, e.model+', e.Inch)+'...
- SQL: select CONVERT(DATE,a.수주일자) 수주일자,a.수주번호,c.code_name 제품유형라벨,a.제품유형,d.code_name 작업구분라벨,a.작업구분,b.name 거래처명,b.code 거래처코드, e.model+' '+convert(varchar,e.Inch)+' '+convert(varchar,e.Glass_thick)+' '+e.Versi...


#### checkPoNoDeletable (select)
- 테이블: d21_
- 컬럼: CASE
- SQL: SELECT CASE WHEN EXISTS (SELECT 1 FROM d21_제조지시MST WHERE po_no = ?) THEN 0 ELSE 1 END AS result...


#### insertPurchaseOrder (insert)
- 테이블: d33_
- 컬럼: '2', #{수주일자}), 'yyyyMMdd'), 0)+1, '0000')
- SQL: INSERT INTO d33_제품수주서파일 ( 공장코드, 수주일자, 수주번호, 거래처코드, 제품코드, PO_NO, 수주수량, 수주단위, 수율, 필요자재량, 제품유형, 작업구분, 수주구분, 납품요망일, 비고, 입력시각, 입력자, 수주단가, 수주금액, 수주부가세, 외화금액, 발행여부, 취소여부, 생산지시여부, 생산완료여부, 납품완료여부, 입금완료여부, 입금금액...


#### deletePurchaseOrder (delete)
- 테이블: d33_
- 컬럼: 
- SQL: DELETE FROM d33_제품수주서파일 where po_no=? -- 체크된 PO_NO...


---

## 화면: M0006002 - M0006002
메뉴경로: 



### 관련 쿼리

#### getGrid1Data (select)
- 테이블: dw_maj_code
- 컬럼: maj_code_name, maj_code
- SQL: select maj_code_name,maj_code from dw_maj_code order by case when isnumeric(maj_code) = 1 then cast(maj_code as int) else null end, maj_code...


#### getGrid2Data (select)
- 테이블: dw_common_code
- 컬럼: maj_code, code, code_name, tray_cell, create_date, use_yn, sort_order, etc1, etc2
- SQL: select maj_code,code,code as code_org,code_name,tray_cell,create_date,use_yn,sort_order,etc1,etc2 from dw_common_code where maj_code = ? order by sort_order,code...


#### insertData1 (insert)
- 테이블: dw_maj_code_input
- 컬럼: 
- SQL: INSERT INTO dw_maj_code_input ( maj_code_name, maj_code ) VALUES ( ?, ? );...


#### insertData2 (insert)
- 테이블: dw_common_code_input
- 컬럼: 
- SQL: INSERT INTO dw_common_code_input ( maj_code, code, code_name, tray_cell, create_date, use_yn, sort_order, etc1, etc2 ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ? );...


#### updateData1 (update)
- 테이블: dw_maj_code_input
- 컬럼: 
- SQL: UPDATE dw_maj_code_input SET maj_code_name=? WHERE maj_code = ?...


#### updateData2 (update)
- 테이블: dw_common_code_input
- 컬럼: 
- SQL: UPDATE dw_common_code_input SET code = ?, code_name=?, tray_cell=?, create_date=?, use_yn=?, sort_order=?, etc1=?, etc2=? WHERE maj_code=? AND code=?;...


---

## 화면: M0006003 - M0006003
메뉴경로: 



### 관련 쿼리

#### getVendorMstList (select)
- 테이블: d03_
- 컬럼: 거래처코드, 거래처명, 거래처약명, 대표자, 사업자등록번호, 전화번호, 팩스번호, 우편번호, 주소, 메일주소...
- SQL: SELECT 거래처코드 , 거래처명 , 거래처약명 , 대표자 , 사업자등록번호 , 전화번호 , 팩스번호 , 우편번호 , 주소 , 메일주소 , 담당자 , 담당자연락처 , 업태 , 종목 , 거래처분류 , 개업일자 , 거래여부 , 거래개시일자 , 비고 , 부가세적용여부 , 금액표기여부 FROM d03_거래처마스터파일 WHERE 1 = 1 ORDER BY 거래처코...


#### checkInsertVendorMst (select)
- 테이블: d03_
- 컬럼: 거래처코드
- SQL: SELECT 거래처코드 FROM d03_거래처마스터파일 WHERE 거래처코드 IN <foreach item="item" collection="vo" open="(" separator="," close=")" > #{item.거래처코드} </foreach>...


#### insertVendorMst (insert)
- 테이블: d03_
- 컬럼: 
- SQL: INSERT INTO d03_거래처마스터파일 ( 거래처코드 , 거래처명 , 거래처약명 , 대표자 , 사업자등록번호 , 전화번호 , 팩스번호 , 우편번호 , 주소 , 메일주소 , 담당자 , 담당자연락처 , 업태 , 종목 , 거래처분류 , 개업일자 , 거래여부 , 거래개시일자 , 비고 , 부가세적용여부 , 금액표기여부 ) VALUES ( #{거래처코드} , #...


#### updateVendorMst (update)
- 테이블: d03_
- 컬럼: 
- SQL: UPDATE d03_거래처마스터파일 SET 거래처명 = #{거래처명} , 거래처약명 = #{거래처약명} , 대표자 = #{대표자} , 사업자등록번호 = #{사업자등록번호} , 전화번호 = #{전화번호} , 팩스번호 = #{팩스번호} , 우편번호 = #{우편번호} , 주소 = #{주소} , 메일주소 = #{메일주소} , 담당자 = #{담당자} , 담당자연락처...


#### deleteVendorMst (delete)
- 테이블: d03_
- 컬럼: 
- SQL: DELETE FROM d03_거래처마스터파일 WHERE 거래처코드 = #{거래처코드}...


---

## 화면: M0006005 - M0006005
메뉴경로: 



### 관련 쿼리

#### getDefectCdList (select)
- 테이블: d14_
- 컬럼: 불량코드, 불량명, 불량약명, 검사불량, 일반불량, 사용여부, 특기사항
- SQL: SELECT 불량코드 , 불량명 , 불량약명 , 검사불량 , 일반불량 , 사용여부 , 특기사항 FROM d14_불량사유코드파일 WHERE 1 = 1 ORDER BY 불량코드...


#### checkInsertDefectCd (select)
- 테이블: d14_
- 컬럼: 불량코드
- SQL: SELECT 불량코드 FROM d14_불량사유코드파일 WHERE 불량코드 IN <foreach item="item" collection="vo" open="(" separator="," close=")" > #{item.불량코드} </foreach>...


#### insertDefectCd (insert)
- 테이블: d14_
- 컬럼: 
- SQL: INSERT INTO d14_불량사유코드파일 ( 불량코드 , 불량명 , 불량약명 , 검사불량 , 일반불량 , 사용여부 , 특기사항 ) VALUES ( #{불량코드} , #{불량명} , #{불량약명} , #{검사불량} , #{일반불량} , #{사용여부} , #{특기사항} )...


#### updateDefectCd (update)
- 테이블: d14_
- 컬럼: 
- SQL: UPDATE d14_불량사유코드파일 SET 불량명 = #{불량명} , 불량약명 = #{불량약명} , 검사불량 = #{검사불량} , 일반불량 = #{일반불량} , 사용여부 = #{사용여부} , 특기사항 = #{특기사항} WHERE 불량코드 = #{불량코드}...


#### deleteDefectCd (delete)
- 테이블: d14_
- 컬럼: 
- SQL: DELETE FROM d14_불량사유코드파일 WHERE 불량코드 = #{불량코드}...


---

## 화면: M0006007 - M0006007
메뉴경로: 



### 관련 쿼리

#### getGrid1Data (select)
- 테이블: dw_step_mast
- 컬럼: 공정코드, 공정명, area, remark
- SQL: select 공정코드,공정명,area as 공정구분,remark as 비고 FROM dw_step_mast order by 1,2,4...


#### getGrid2Data (select)
- 테이블: d29_
- 컬럼: line, 공정코드, 불량명, 불량코드, 적용구분, 비고, 적용순서, rw_적용, 사용여부, 0)
- SQL: select line,공정코드,불량명,불량코드, 적용구분,비고,적용순서,rw_적용, 사용여부, ISNULL(신뢰성인계여부,0) 신뢰성인계여부, ISNULL(수율불량제외여부,0) 수율불량제외여부, ISNULL(Rework진행여부,0) Rework진행여부 FROM d29_공정별불량파일 where 공정코드 = #{공정코드} order by 적용순서...


#### insertData (insert)
- 테이블: d29_
- 컬럼: 
- SQL: INSERT INTO d29_공정별불량파일 ( line, 공정코드, 불량코드, 적용구분, 불량명, RW_적용, Excel_Col, 적용순서, 사용여부, 비고, 신뢰성인계여부, 수율불량제외여부, Rework진행여부 ) VALUES ( ? #{공정코드}, #{불량코드}, #{적용구분}, #{불량명}, #{rw적용}, 0, #{적용순서}, #{사용여부}, #{비...


#### insertDataAll (insert)
- 테이블: d29_
- 컬럼: 
- SQL: INSERT INTO d29_공정별불량파일 ( line, 공정코드, 불량코드, 적용구분, 불량명, RW_적용, Excel_Col, 적용순서, 사용여부, 비고, 신뢰성인계여부, 수율불량제외여부, Rework진행여부 ) VALUES <foreach item="item" collection="insert" separator="," > ( ?, #{item.공정코...


#### updateData (update)
- 테이블: d29_
- 컬럼: 
- SQL: UPDATE d29_공정별불량파일 SET 불량명=#{불량명}, RW_적용=#{rw적용}, 적용순서=#{적용순서}, 사용여부=#{사용여부}, 비고=#{비고}, 신뢰성인계여부=#{신뢰성인계여부}, 수율불량제외여부=#{수율불량제외여부}, Rework진행여부=#{rework진행여부} WHERE 공정코드 = #{공정코드} AND 불량코드 = #{불량코드} AND 적...


#### deleteDataAll (delete)
- 테이블: d29_
- 컬럼: 
- SQL: DELETE FROM d29_공정별불량파일 WHERE 공정코드 = #{공정코드}...


#### deleteData (delete)
- 테이블: d29_
- 컬럼: 
- SQL: DELETE FROM d29_공정별불량파일 WHERE 공정코드 = #{공정코드} AND 불량코드 = #{불량코드} AND 적용구분 = #{적용구분} AND line = ?...


---

## 화면: M0006009 - Tab 0 사용자 관리  #tab-content-#{DOI_CM_SYS_RESOURCE.sys_resource_id}
메뉴경로: Tab 0 사용자 관리  #tab-content-#{DOI_CM_SYS_RESOURCE.sys_resource_id}
탭: TAB062000, TAB063000, TAB064000
설명: 사용자 관리  #tab-content-#{DOI_CM_SYS_RESOURCE.sys_resource_id}, 메뉴관리, 사용자메뉴 권한관리

### 관련 쿼리

#### selectMenuTabList (select)
- 테이블: doi_cm_sys_resource, mt
- 컬럼: a.prod_category, a.sys_resource_id, a.upper_sys_resource_id, a.description, a.SYS_RESOURCE_NAME, a.seq, 1, a.sys_resource_type_code_id, 'D4')as, a.url...
- SQL: with mt as ( select a.prod_category ,a.sys_resource_id ,a.upper_sys_resource_id ,a.description ,cast(a.SYS_RESOURCE_NAME as nvarchar(max)) as full_path ,a.SYS_RESOURCE_NAME ,a.seq ,1 as level ,a.sys_r...


#### selectRoleList (select)
- 테이블: doi_cm_role
- 컬럼: ROLE_ID, ROLE_NAME, DESCRIPTION, INIT_DT, INIT_USER, MODI_DT, MODI_USER
- SQL: select ROLE_ID ,ROLE_NAME ,DESCRIPTION ,INIT_DT ,INIT_USER ,MODI_DT ,MODI_USER from DOI_CM_ROLE where del_yn = 'N' order by role_name...


#### selectUserList (select)
- 테이블: doi_cm_user
- 컬럼: USER_ID, password, user_name, dept_name, dept_code, position_name, position_code, UTG, ITG, INIT_DT...
- SQL: select USER_ID ,password ,user_name ,dept_name ,dept_code ,position_name ,position_code ,UTG ,ITG ,INIT_DT ,INIT_USER ,MODI_DT ,MODI_USER ,DEL_YN from doi_cm_user where DEL_YN = 'N' order by dept_name...


#### selectRoleMenuTabList (select)
- 테이블: doi_cm_role, doi_cm_role_sys_resource, doi_cm_sys_resource, mt, role_sys_resc
- 컬럼: b.UPPER_SYS_RESOURCE_ID, b.SYS_RESOURCE_ID
- SQL: with role_sys_resc as ( select b.UPPER_SYS_RESOURCE_ID ,b.SYS_RESOURCE_ID from DOI_CM_ROLE a left outer join doi_cm_role_sys_resource b on (a.ROLE_ID = b.ROLE_ID) where a.role_id = ? and a.del_yn = 'N...


#### selectRoleUserList (select)
- 테이블: doi_cm_user_role, doi_cm_user
- 컬럼: a.role_id, a.user_id, b.dept_name, b.user_name, b.position_name, b.position_code
- SQL: select a.role_id ,a.user_id ,b.dept_name ,b.user_name ,b.position_name ,b.position_code from doi_cm_user_ROLE a left outer join doi_cm_user b on (a.USER_ID = b.USER_ID) where a.ROLE_ID = ?...


#### checkRoleId (select)
- 테이블: doi_cm_role
- 컬럼: case
- SQL: select case when count(1) > 0 then ? + '는 사용 할 수 없는 Role Id 입니다.' else 'OK' end from DOI_CM_ROLE where role_id = ?...


#### insertRoleSysResc (insert)
- 테이블: doi_cm_role_sys_resource
- 컬럼: 
- SQL: INSERT INTO doi_cm_role_sys_resource ( ROLE_ID ,PROD_CATEGORY ,UPPER_SYS_RESOURCE_ID ,SYS_RESOURCE_ID ,SYS_RESOURCE_TYPE_CODE_ID ,INIT_DT ,INIT_USER ) VALUES ( ? ,? ,? ,? ,? ,GETDATE() ,? )...


#### insertCmUser (insert)
- 테이블: doi_cm_user
- 컬럼: 
- SQL: INSERT INTO doi_cm_user ( USER_ID ,user_name ,password ,dept_name ,dept_code ,position_name ,position_code ,UTG ,ITG ,INIT_DT ,INIT_USER ,MODI_DT ,MODI_USER ,DEL_YN ) VALUES ( ? ,? ,? ,? ,? ,? ,? ,? ,...


#### insertCmSysResource (insert)
- 테이블: doi_cm_sys_resource
- 컬럼: 
- SQL: INSERT INTO DOI_CM_SYS_RESOURCE ( prod_category , SYS_RESOURCE_ID , SYS_RESOURCE_NAME , UPPER_SYS_RESOURCE_ID , SYS_RESOURCE_TYPE_CODE_ID , DESCRIPTION , SEQ , URL , INIT_DT , INIT_USER , DEL_YN ) VAL...


#### insertUserRole (insert)
- 테이블: doi_cm_user_role
- 컬럼: 
- SQL: INSERT INTO doi_cm_user_ROLE ( USER_ID,ROLE_ID,ROLE_NAME,INIT_DT,INIT_USER ) VALUES ( ?,?,?,getdate(),? )...


#### insertRole (insert)
- 테이블: doi_cm_role
- 컬럼: 
- SQL: INSERT INTO DOI_CM_ROLE ( ROLE_ID, ROLE_NAME, DESCRIPTION, INIT_DT, INIT_USER, MODI_DT, MODI_USER, DEL_YN ) VALUES ( ?, ?, ?, getdate(), ?, NULL, NULL, 'N' )...


#### updateCmUser (update)
- 테이블: doi_cm_user
- 컬럼: 
- SQL: UPDATE doi_cm_user SET user_name=? , password=? , dept_name=? , dept_code=? , position_name=? , position_code=? , UTG=? , ITG=? , MODI_DT=getdate() , MODI_USER=? WHERE USER_ID=?...


#### deleteCmUser (update)
- 테이블: doi_cm_user
- 컬럼: 
- SQL: UPDATE doi_cm_user SET DEL_YN = 'Y' WHERE USER_ID=?...


#### updateCmSysResource (update)
- 테이블: doi_cm_sys_resource
- 컬럼: 
- SQL: UPDATE DOI_CM_SYS_RESOURCE SET SYS_RESOURCE_ID = ? ,SYS_RESOURCE_NAME=? , SYS_RESOURCE_TYPE_CODE_ID=? , DESCRIPTION=? , SEQ=? , URL=? , MODI_DT=getdate() , MODI_USER=? where prod_category = ? and SYS_...


#### deleteCmSysResource (update)
- 테이블: doi_cm_sys_resource
- 컬럼: 
- SQL: UPDATE DOI_CM_SYS_RESOURCE SET DEL_YN = 'Y' , MODI_DT=getdate() , MODI_USER=? where prod_category = ? and SYS_RESOURCE_ID = ? and UPPER_SYS_RESOURCE_ID = ?...


#### deleteRole (update)
- 테이블: doi_cm_role
- 컬럼: 
- SQL: UPDATE DOI_CM_ROLE SET DEL_YN = 'Y' ,MODI_USER = ? ,MODI_DT = GETDATE() WHERE ROLE_ID = ?...


#### updateRole (update)
- 테이블: doi_cm_role
- 컬럼: 
- SQL: UPDATE DOI_CM_ROLE SET ROLE_NAME = ? ,DESCRIPTION = ? ,MODI_DT = getdate() ,MODI_USER = ? WHERE ROLE_ID = ?...


#### deleteRoleSysResc (delete)
- 테이블: doi_cm_role_sys_resource
- 컬럼: 
- SQL: delete from doi_cm_role_sys_resource where role_id = ? and PROD_CATEGORY = ?...


#### deleteUserRole (delete)
- 테이블: doi_cm_user_role
- 컬럼: 
- SQL: DELETE FROM doi_cm_user_ROLE WHERE ROLE_ID = ? AND USER_ID = ?...


---

## 화면: M0006010 - M0006010
메뉴경로: 



### 관련 쿼리

#### checkProdCode (select)
- 테이블: d05_
- 컬럼: 
- SQL: select count(1) count FROM d05_제품개발이력마스터 where 제품코드 = #{제품코드}...


#### getCodeList1 (select)
- 테이블: dw_common_code
- 컬럼: code, code_name
- SQL: select code as value,code_name as text FROM dw_common_code where maj_code = 86 and use_yn = '1' order by sort_order...


#### getCodeList2 (select)
- 테이블: dw_common_code
- 컬럼: code, code_name
- SQL: select code as value,code_name as text FROM dw_common_code where maj_code = 87 and use_yn = '1' order by sort_order...


#### getCodeList3 (select)
- 테이블: dw_common_code
- 컬럼: code, code_name
- SQL: select code as value,code_name as text FROM dw_common_code where maj_code = 88 and use_yn = '1' order by sort_order...


#### getCodeList4 (select)
- 테이블: dw_common_code
- 컬럼: code, code_name
- SQL: select code as value,code_name as text FROM dw_common_code where maj_code = 89 and use_yn = '1' order by sort_order...


#### getGridData (select)
- 테이블: d05_
- 컬럼: seq_id, 구분, 모델, 제품코드, Rev_No, Lot_Rev_No, Run_Rev_No, 양산이관_구분, 양산이관_CODE, 주요변경사항...
- SQL: SELECT seq_id, 구분, 모델, 제품코드, Rev_No, Lot_Rev_No, Run_Rev_No, 양산이관_구분, 양산이관_CODE, 주요변경사항, Lot_No, Run_No, 변경접수일, 비고, 고객사, 고객사_Model, 고객사_CODE, 고객사_Part_CodeE, Glass정보_제조사, Glass정보_모델, Glass정보_Size_대각_i...


#### insertData (insert)
- 테이블: d05_
- 컬럼: 
- SQL: INSERT INTO d05_제품개발이력마스터 ( 구분, 모델, 제품코드, Rev_No, Lot_Rev_No, Run_Rev_No, 양산이관_구분, 양산이관_CODE, 주요변경사항, Lot_No, Run_No, 변경접수일, 비고, 고객사, 고객사_Model, 고객사_CODE, 고객사_Part_CodeE, Glass정보_제조사, Glass정보_모델, Glas...


#### updateData (update)
- 테이블: d05_
- 컬럼: 
- SQL: UPDATE d05_제품개발이력마스터 SET 구분 = #{구분}, 모델 = #{모델}, 제품코드 = #{제품코드}, Rev_No = ?, Lot_Rev_No = ?, Run_Rev_No = ?, 양산이관_구분 = #{양산이관구분}, 양산이관_CODE = #{양산이관Code}, 주요변경사항 = #{주요변경사항}, Lot_No = ?, Run_No = ?, 변...


#### deleteData (delete)
- 테이블: d05_
- 컬럼: 
- SQL: DELETE FROM d05_제품개발이력마스터 WHERE seq_id = ?...


---

## 화면: M0006011 - Tab 1 설비현황
메뉴경로: Tab 1 설비현황
탭: TAB065000, TAB066000
설명: 설비현황, 설비로그관리

### 관련 쿼리

#### getGridData1 (select)
- 테이블: dw_
- 컬럼: 공장코드, seq_no, 공정, 설비명, 제어_Base, PLC_Base, 여유슬롯, PLC_CPU_MAKER, PLC_CPU_모델, HMI_TOUCH...
- SQL: SELECT 공장코드, seq_no, 공정, 설비명, 제어_Base, PLC_Base, 여유슬롯, PLC_CPU_MAKER, PLC_CPU_모델, HMI_TOUCH, HMI_SCADA, SCADA, Windows_Version, PLC_Comment, 외산설비_Lock_유무, 비고 FROM dw_설비현황 order by seq_no...


#### getGridData2 (select)
- 테이블: dw_
- 컬럼: 공장코드, seq_no, 설비유형, 설비호기, 이력관리여부, DB연계여부, DB테이블유무, 업체명, 관리IP, 비고
- SQL: SELECT 공장코드, seq_no, 설비유형, 설비호기, 이력관리여부, DB연계여부, DB테이블유무, 업체명, 관리IP, 비고 FROM dw_설비호기이력관리내역 order by seq_no...


#### insertData1 (insert)
- 테이블: dw_
- 컬럼: 
- SQL: INSERT INTO dw_설비현황 ( 공장코드, seq_no, 공정, 설비명, 제어_Base, PLC_Base, 여유슬롯, PLC_CPU_MAKER, PLC_CPU_모델, HMI_TOUCH, HMI_SCADA, SCADA, Windows_Version, PLC_Comment, 외산설비_Lock_유무, 비고 ) VALUES ( #{공장코드}, ?, #{공정...


#### insertData2 (insert)
- 테이블: dw_
- 컬럼: 
- SQL: INSERT INTO dw_설비호기이력관리내역 ( 공장코드, seq_no, 설비유형, 설비호기, 이력관리여부, DB연계여부, DB테이블유무, 업체명, 관리IP, 비고 ) VALUES ( #{공장코드}, ?, #{설비유형}, #{설비호기}, #{이력관리여부}, #{db연계여부}, #{db테이블유무}, #{업체명}, #{관리ip}, #{비고} );...


#### updateData1 (update)
- 테이블: dw_
- 컬럼: 
- SQL: UPDATE dw_설비현황 SET 제어_Base = #{제어Base}, PLC_Base = ?, 여유슬롯 = #{여유슬롯}, PLC_CPU_MAKER = ?, PLC_CPU_모델 = #{plcCpu모델}, HMI_TOUCH = ?, HMI_SCADA = ?, SCADA = ?, Windows_Version = ?, PLC_Comment = ?, 외산설비_L...


#### updateData2 (update)
- 테이블: dw_
- 컬럼: 
- SQL: UPDATE dw_설비호기이력관리내역 SET 이력관리여부 = #{이력관리여부}, DB연계여부 = #{db연계여부}, DB테이블유무 = #{db테이블유무}, 업체명 = #{업체명}, 관리IP = #{관리ip}, 비고 = #{비고} WHERE 공장코드 = #{공장코드} AND seq_no = ? AND 설비유형 = #{설비유형} AND 설비호기 = #{설비호기...


#### deleteData1 (delete)
- 테이블: dw_
- 컬럼: 
- SQL: DELETE FROM dw_설비현황 WHERE 공장코드 = #{공장코드} AND seq_no = ? AND 공정 = #{공정} AND 설비명 = #{설비명}...


#### deleteData2 (delete)
- 테이블: dw_
- 컬럼: 
- SQL: DELETE FROM dw_설비호기이력관리내역 WHERE 공장코드 = #{공장코드} AND seq_no = ? AND 설비유형 = #{설비유형} AND 설비호기 = #{설비호기}...


---

## 화면: M0006012 - Tab 1 모델기본정보
메뉴경로: Tab 1 모델기본정보
탭: TAB067000, TAB068000, TAB069000
설명: 모델기본정보, 모델별_모니터링, 공정별_모니터링

### 관련 쿼리

#### selectTab1GridData (select)
- 테이블: dw_
- 컬럼: 구분, MODEL, 적재매수, 원장_두께, 원장구분, UTG_Version, SDC모델명, 고객사, 대각인치, MODEL_NAME...
- SQL: SELECT 구분, MODEL, 적재매수, 원장_두께, 원장구분, UTG_Version, SDC모델명, 고객사, 대각인치, MODEL_NAME, MODEL_CODE, 카세트_최대_적재수량, UTG_가공_SIZE_장면, UTG_가공_SIZE_단면, UTG_가공_SIZE_두께, UTG_출하_SIZE_장면, UTG_출하_SIZE_단면, UTG_출하_SIZE_두께...


#### selectTab2GridData (select)
- 테이블: dw_
- 컬럼: 구분, MODEL, 적재매수, UTG_원장_두께, UTG_원장구분, UTG_Version, SDC모델명, 고객사, 대각인치, MODEL_NAME...
- SQL: SELECT 구분, MODEL, 적재매수, UTG_원장_두께, UTG_원장구분, UTG_Version, SDC모델명, 고객사, 대각인치, MODEL_NAME, MODEL_CODE, 가공_치수_장변_기준, 가공_치수_장변_편차, 가공_치수_단변_기준, 가공_치수_단변_편차, WP_C길이_기준, WP_C길이_편차, WP_ER_기준, WP_ER_편차, 박리_CS...


#### selectTab3GridData (select)
- 테이블: dw_
- 컬럼: LINE, PROCESS_ID, 공정코드, 공정명, 모니터링구분, 모니터링항목, 등급및수량, 검증부서, 순서, 설비유형_수동_대수...
- SQL: SELECT LINE, PROCESS_ID, 공정코드, 공정명, 모니터링구분, 모니터링항목, 등급및수량, 검증부서, 순서, 설비유형_수동_대수, 설비유형_자동_대수 FROM dw_공정별_모니터링항목 order by 1,2 ;...


#### insertTab1Data (insert)
- 테이블: dw_
- 컬럼: 
- SQL: INSERT INTO dw_모델기본정보 ( 구분, 적재매수, 원장_두께, 원장구분, UTG_Version, MODEL, SDC모델명, 고객사, 대각인치, MODEL_NAME, MODEL_CODE, 카세트_최대_적재수량, UTG_가공_SIZE_장면, UTG_가공_SIZE_단면, UTG_가공_SIZE_두께, UTG_출하_SIZE_장면, UTG_출하_SIZE_단...


#### insertTab2Data (insert)
- 테이블: dwisdevdb
- 컬럼: 
- SQL: INSERT INTO dwisDevDb.dbo.dw_모델별_모니터링_기준정보 ( 구분, 적재매수, UTG_원장_두께, UTG_원장구분, UTG_Version, MODEL, SDC모델명, 고객사, 대각인치, MODEL_NAME, MODEL_CODE, 가공_치수_장변_기준, 가공_치수_장변_편차, 가공_치수_단변_기준, 가공_치수_단변_편차, WP_C길이_기준...


#### insertTab3Data (insert)
- 테이블: dwisdevdb
- 컬럼: 
- SQL: INSERT INTO dwisDevDb.dbo.dw_공정별_모니터링항목 ( LINE, PROCESS_ID, 공정코드, 공정명, 모니터링구분, 모니터링항목, 등급및수량, 검증부서, 순서, 설비유형_수동_대수, 설비유형_자동_대수 ) VALUES( ?, ?, #{공정코드}, #{공정명}, #{모니터링구분}, #{모니터링항목}, #{등급및수량}, #{검증부서},...


#### updateTab1Data (update)
- 테이블: dw_
- 컬럼: 
- SQL: UPDATE dw_모델기본정보 SET 적재매수 = #{적재매수}, 원장_두께 = #{원장두께}, 원장구분 = #{원장구분}, UTG_Version = ?, SDC모델명 = #{sdc모델명}, 고객사 = #{고객사}, 대각인치 = #{대각인치}, MODEL_NAME = ?, MODEL_CODE = ?, 카세트_최대_적재수량 = #{카세트최대적재수량}, UTG...


#### updateTab2Data (update)
- 테이블: dw_
- 컬럼: 
- SQL: UPDATE dw_모델별_모니터링_기준정보 SET 구분 = #{구분}, 적재매수 = #{적재매수}, UTG_원장_두께 = #{utg원장두께}, UTG_원장구분 = #{utg원장구분}, UTG_Version = ?, SDC모델명 = #{sdc모델명}, 고객사 = #{고객사}, 대각인치 = #{대각인치}, MODEL_NAME = ?, MODEL_CODE = ?...


#### updateTab3Data (update)
- 테이블: dw_
- 컬럼: 
- SQL: UPDATE dw_공정별_모니터링항목 SET 공정명 = #{공정명}, 등급및수량 = #{등급및수량}, 검증부서 = #{검증부서}, 순서 = #{순서}, 설비유형_수동_대수 = #{설비유형수동대수}, 설비유형_자동_대수 = #{설비유형자동대수} WHERE LINE=? AND PROCESS_ID=? AND 공정코드=#{공정코드} AND 모니터링구분=#{모니터링...


#### deleteTab1Data (delete)
- 테이블: dw_
- 컬럼: 
- SQL: DELETE FROM dw_모델기본정보 WHERE MODEL=? and 구분=#{구분};...


#### deleteTab2Data (delete)
- 테이블: dw_
- 컬럼: 
- SQL: DELETE FROM dw_모델별_모니터링_기준정보 WHERE MODEL=?;...


#### deleteTab3Data (delete)
- 테이블: dw_
- 컬럼: 
- SQL: DELETE FROM dw_공정별_모니터링항목 WHERE LINE=? AND PROCESS_ID=? AND 공정코드=#{공정코드} AND 모니터링구분=#{모니터링구분} AND 모니터링항목=#{모니터링항목} ;...


---

## 화면: M0006013 - M0006013
메뉴경로: 



### 관련 쿼리

#### M0006013_Sch1 (select)
- 테이블: vw_process_plan
- 컬럼: area, 공정코드, 공정명
- SQL: select area, 공정코드, 공정명 from vw_process_plan where line = 'DFB1' and process_id = 'D1UT' order by 공정순서...


#### M0006013_Sch2 (select)
- 테이블: dw_equipment_mast
- 컬럼: area, 설비번호, 설비명, 설비약명
- SQL: select area, 설비번호, 설비명, 설비약명 from dw_equipment_mast where line = 'DFB1' and 공정코드 = #{공정코드}...


#### M0006013_Sch3 (select)
- 테이블: dw_model_mast
- 컬럼: model, code, description, tray_cell, use_yn
- SQL: select model, code, description, tray_cell, use_yn from dw_model_mast where 1 = 1...


#### M0006013_Sch4 (select)
- 테이블: dw_cm_qr_info, vw_process_plan, dw_equipment_mast, doi_cm_user
- 컬럼: a.seq_id, a.line, a.process_id, a.공정코드, b.공정명, a.설비번호, c.설비명, c.설비약명, a.model_code, a.shift...
- SQL: select a.seq_id, a.line, a.process_id, a.공정코드, b.공정명, a.설비번호, c.설비명, c.설비약명, a.model_code, a.shift, a.code, a.qr, format(a.init_dt, 'yyyy-MM-dd HH:mm') init_dt, a.init_user, isNull(d.user_name, a.init...


#### M0006013_Insert1 (insert)
- 테이블: dw_cm_qr_info
- 컬럼: 
- SQL: insert into dw_cm_qr_info(line,process_id,공정코드,설비번호,model_code,shift,code,qr,init_dt,init_user) values (?, ?, #{공정코드}, #{설비번호}, ?, ?, ?, ?, GETDATE(),?)...


#### M0006013_Update1 (update)
- 테이블: dw_cm_qr_info
- 컬럼: 
- SQL: update dw_cm_qr_info set code = ? ,qr = ? ,modi_dt = GETDATE() ,modi_user = ? where seq_id = ?...


#### M0006013_Delete1 (delete)
- 테이블: dw_cm_qr_info
- 컬럼: 
- SQL: delete from dw_cm_qr_info where seq_id = ?...


---

## 화면: M0007001 - Tab 0 세정 카세트
메뉴경로: Tab 0 세정 카세트
탭: TAB071000, TAB071000_1
설명: 세정 카세트, 강화 카세트

### 관련 쿼리

#### M0007001_Sch1 (select)
- 테이블: d04_
- 컬럼: 
- SQL: select * from d04_카세트_불출처리_마스터 where 1=1 and 종류 = ? and 카세트_상태 in ('불출대기', '검사대기') and CST_NO NOT IN ( SELECT CST_NO FROM d04_카세트마스터 WHERE 위치 = '공정' ) order by 공장코드, 불출대기일자, seq_no, 타입, 모델, CST_NO, 카세...


#### M0007001_Sch2 (select)
- 테이블: d04_
- 컬럼: 
- SQL: select * from d04_카세트_불출처리_마스터 where 1=1 and 종류 = ? and 카세트_상태 in ('검사대기') and CST_NO NOT IN ( SELECT CST_NO FROM d04_카세트마스터 WHERE 위치 = '공정' ) order by 공장코드, 불출대기일자, seq_no, 타입, 모델, CST_NO, 카세트팀_담당자, ...


#### M0007001_Sch3 (select)
- 테이블: d04_
- 컬럼: 
- SQL: select * from d04_카세트_불출처리_마스터 where 1=1 and 종류 = ? and 카세트_상태 in ('검사완료', '대기') and CST_NO NOT IN ( SELECT CST_NO FROM d04_카세트마스터 WHERE 위치 = '공정' ) order by 공장코드, 불출대기일자, seq_no, 타입, 모델, CST_NO, 카세트팀...


#### checkDuplicate (select)
- 테이블: d04_
- 컬럼: 
- SQL: select count(*) from d04_카세트_불출처리_마스터 where 1=1 and 불출대기일자 = ? <!-- and seq_no = ?--> and 종류 = ? and 타입 = ? and 모델 = ? and CST_NO = ?...


#### checkDuplicateMasterList (select)
- 테이블: d04_
- 컬럼: 
- SQL: DROP TABLE IF EXISTS #TempTable1; CREATE TABLE #TempTable1 ( 불출대기일자 NVARCHAR(8) COLLATE Korean_Wansung_CI_AS NULL, seq_no INT, 종류 NVARCHAR(30) COLLATE Korean_Wansung_CI_AS NULL, 타입 NVARCHAR(30) COLLAT...


#### uploadExcel (insert)
- 테이블: d04_
- 컬럼: 불출대기일자, 종류, 타입, 모델, CST_NO
- SQL: CREATE TABLE #TempTable ( 불출대기일자 NVARCHAR(8) COLLATE Korean_Wansung_CI_AS NULL, seq_no INT, 종류 NVARCHAR(30) COLLATE Korean_Wansung_CI_AS NULL, 타입 NVARCHAR(30) COLLATE Korean_Wansung_CI_AS NULL, 모델 NVA...


#### M0007001_Update1 (update)
- 테이블: d04_
- 컬럼: 
- SQL: UPDATE d04_카세트_불출처리_마스터 SET 공장코드 = #{공장코드} ,seq_no = ? ,열 = #{열} ,행 = #{행} ,카세트팀_담당자 = #{카세트팀담당자} where 1=1 and 불출대기일자 = #{불출대기일자} and 종류 = #{종류} and 타입 = #{타입} and 모델 = #{모델} and CST_NO = ?...


#### M0007001_Update2 (update)
- 테이블: d04_
- 컬럼: 
- SQL: UPDATE d04_카세트_불출처리_마스터 SET 검사부서 = #{검사부서} ,검사자 = #{검사자} ,검사일자 = #{검사일자} ,검사시간 = #{검사시간} ,검사결과 = #{검사결과} WHERE 공장코드 = #{공장코드} and 불출대기일자 = #{불출대기일자} and 종류 = #{종류} and seq_no = ? and 타입 = #{타입} and 모델...


#### M0007001_Update3 (update)
- 테이블: d04_
- 컬럼: 
- SQL: UPDATE d04_카세트_불출처리_마스터 SET 불출부서 = #{불출부서} ,불출담당자 = #{불출담당자} ,불출일자 = #{불출일자} ,불출시간 = #{불출시간} ,비고 = #{비고} WHERE 공장코드 = #{공장코드} and 불출대기일자 = #{불출대기일자} and 종류 = #{종류} and seq_no = ? and 타입 = #{타입} and 모델...


#### M0007001_U_Inspection1 (update)
- 테이블: d04_
- 컬럼: 
- SQL: UPDATE d04_카세트_불출처리_마스터 SET 카세트_상태 = '검사대기' WHERE 공장코드 = #{공장코드} and 불출대기일자 = #{불출대기일자} and 종류 = #{종류} and seq_no = ? and 타입 = #{타입} and 모델 = #{모델} and CST_NO = ? and 카세트_상태 = '불출대기'...


#### M0007001_U_Inspection2 (update)
- 테이블: d04_
- 컬럼: 
- SQL: UPDATE d04_카세트_불출처리_마스터 SET 카세트_상태 = case when upper(검사결과) = 'OK' then '검사완료' when upper(검사결과) = 'NG' then '불출대기' else '검사대기' end WHERE 공장코드 = #{공장코드} and 불출대기일자 = #{불출대기일자} and 종류 = #{종류} and seq_no ...


#### M0007001_U_Inspection3 (update)
- 테이블: d04_, a
- 컬럼: 공장코드, 종류, 타입, 모델, CST_NO, 열, 행, '공정', 카세트_상태, '정상'...
- SQL: UPDATE d04_카세트_불출처리_마스터 SET 카세트_상태 = '대기' WHERE 공장코드 = #{공장코드} and 불출대기일자 = #{불출대기일자} and 종류 = #{종류} and seq_no = ? and 타입 = #{타입} and 모델 = #{모델} and CST_NO = ? and 카세트_상태 = '검사완료'; update A set 열 = B...


#### deleteDuplicate (delete)
- 테이블: d04_
- 컬럼: 
- SQL: delete from d04_카세트_불출처리_마스터 where 1=1 and 불출대기일자 = ? <!-- and seq_no = ?--> and 종류 = ? and 타입 = ? and 모델 = ? and CST_NO = ?...


#### M0007001_Delete1 (delete)
- 테이블: d04_
- 컬럼: 
- SQL: delete from d04_카세트_불출처리_마스터 where 1=1 and 공장코드 = #{공장코드} and 불출대기일자 = #{불출대기일자} and seq_no = ? and 종류 = #{종류} and 타입 = #{타입} and 모델 = #{모델} and CST_NO = ?...


---

## 화면: M0007002 - Tab 0 세정 카세트
메뉴경로: Tab 0 세정 카세트
탭: TAB072000, TAB072000_1
설명: 세정 카세트, 강화 카세트

### 관련 쿼리

#### M0007002_Sch1 (select)
- 테이블: d04_
- 컬럼: B.세정_외관, B.세정_Bar위치, B.세정_평탄도_바닥과_CST, B.세정_평탄도_앞면_옆면, B.세정_평탄도_뒷면_옆면, B.점검자, B.시작일자, B.시작시간, B.종료일자, B.종료시간...
- SQL: select A.*, B.세정_외관,B.세정_Bar위치,B.세정_평탄도_바닥과_CST,B.세정_평탄도_앞면_옆면,B.세정_평탄도_뒷면_옆면,B.점검자,B.시작일자,B.시작시간,B.종료일자,B.종료시간,B.점검결과 from ( select 공장코드,종류,타입,모델,CST_NO,열,행,위치,카세트상태,카세트상태값,최근점검시작일,최근점검시작시간,최근점검종료일,최...


#### M0007002_Sch2 (select)
- 테이블: d04_
- 컬럼: B.강화_브라켓_지그일치유무, B.강화_슬롯상태, B.강화_MESH올상태, B.강화_Mesh들뜸, B.강화_볼트체결, B.강화_외관, B.점검자, B.시작일자, B.시작시간, B.종료일자...
- SQL: select A.*, B.강화_브라켓_지그일치유무,B.강화_슬롯상태,B.강화_MESH올상태,B.강화_Mesh들뜸,B.강화_볼트체결,B.강화_외관,B.점검자,B.시작일자,B.시작시간,B.종료일자,B.종료시간,B.점검결과 from ( select 공장코드,종류,타입,모델,CST_NO,열,행,위치,카세트상태,카세트상태값,최근점검시작일,최근점검시작시간,최근점검종료...


#### M0007002_Sch1_Qr (select)
- 테이블: d04_
- 컬럼: B.세정_외관, B.세정_Bar위치, B.세정_평탄도_바닥과_CST, B.세정_평탄도_앞면_옆면, B.세정_평탄도_뒷면_옆면, B.점검자, B.시작일자, B.시작시간, B.종료일자, B.종료시간...
- SQL: select A.*, B.세정_외관,B.세정_Bar위치,B.세정_평탄도_바닥과_CST,B.세정_평탄도_앞면_옆면,B.세정_평탄도_뒷면_옆면,B.점검자,B.시작일자,B.시작시간,B.종료일자,B.종료시간,B.점검결과 from ( select 공장코드,종류,타입,모델,CST_NO,열,행,위치,카세트상태,카세트상태값,최근점검시작일,최근점검시작시간,최근점검종료일,최...


#### M0007002_Sch2_Qr (select)
- 테이블: d04_
- 컬럼: B.강화_브라켓_지그일치유무, B.강화_슬롯상태, B.강화_MESH올상태, B.강화_Mesh들뜸, B.강화_볼트체결, B.강화_외관, B.점검자, B.시작일자, B.시작시간, B.종료일자...
- SQL: select A.*, B.강화_브라켓_지그일치유무,B.강화_슬롯상태,B.강화_MESH올상태,B.강화_Mesh들뜸,B.강화_볼트체결,B.강화_외관,B.점검자,B.시작일자,B.시작시간,B.종료일자,B.종료시간,B.점검결과 from ( select 공장코드,종류,타입,모델,CST_NO,열,행,위치,카세트상태,카세트상태값,최근점검시작일,최근점검시작시간,최근점검종료...


#### M0007002_TempSave1 (insert)
- 테이블: d04_
- 컬럼: 
- SQL: insert into d04_카세트점검이력 (공장코드,종류,타입,모델,CST_NO,위치,카세트상태,카세트상태값,시작일자,시작시간,종료일자,종료시간,점검자,점검결과,점검항목,비고) values (#{공장코드},#{종류},#{타입},#{모델},?,#{위치},'점검',#{점검결과},#{시작일자},#{시작시간},#{종료일자},#{종료시간},#{점검자},#{점검결과...


#### M0007002_TempSave2 (insert)
- 테이블: d04_
- 컬럼: 
- SQL: insert into d04_카세트점검이력 (공장코드,종류,타입,모델,CST_NO,위치,카세트상태,카세트상태값,시작일자,시작시간,종료일자,종료시간,점검자,점검결과,점검항목,비고) values (#{공장코드},#{종류},#{타입},#{모델},?,#{위치},'점검',#{점검결과},#{시작일자},#{시작시간},#{종료일자},#{종료시간},#{점검자},#{점검결과...


#### M0007002_U_Inspection1 (update)
- 테이블: d04_
- 컬럼: 공장코드, 종류, 타입, 모델, CST_NO, 위치, 카세트상태, 카세트상태값, 최근점검시작일, 최근점검시작시간...
- SQL: ...


#### M0007002_TempDelete1 (delete)
- 테이블: d04_
- 컬럼: 
- SQL: delete from d04_카세트점검이력 where 1=1 and 공장코드 = #{공장코드} and 종류 = #{종류} and 타입 = #{타입} and 모델 = #{모델} and CST_NO = ? and 위치 = #{위치} and 시작일자 = #{시작일자} and 시작시간 = #{시작시간}...


---

## 화면: M0007003 - Tab 0 세정 카세트
메뉴경로: Tab 0 세정 카세트
탭: TAB073000, TAB073000_1
설명: 세정 카세트, 강화 카세트

### 관련 쿼리

#### getFacility (select)
- 테이블: dw_
- 컬럼: 설비약명, 설비번호
- SQL: select 설비약명, 설비번호 from dw_기타설비 where 1=1 and 설비구분 = '카세트세척' and 구분자 = ? and upper(사용여부) = 'Y' order by 설비번호...


#### M0007003_Sch1 (select)
- 테이블: d04_, dw_
- 컬럼: B.설비약명
- SQL: select A.*,B.설비약명 from ( select 공장코드,종류,타입,모델,CST_NO,열,행,위치,카세트상태,카세트상태값,최근세척시작일,최근세척시작시간,최근세척종료일,최근세척종료시간,세척작업자,최근점검시작일,최근점검시작시간,최근점검종료일,최근점검종료시간,점검작업자,점검결과, 세척설비 from d04_카세트마스터 where 1=1 and 종류 = ?...


#### M0007003_Sch1_Qr (select)
- 테이블: d04_, dw_
- 컬럼: B.설비약명
- SQL: select A.*,B.설비약명 from ( select 공장코드,종류,타입,모델,CST_NO,열,행,위치,카세트상태,카세트상태값,최근세척시작일,최근세척시작시간,최근세척종료일,최근세척종료시간,세척작업자,최근점검시작일,최근점검시작시간,최근점검종료일,최근점검종료시간,점검작업자,점검결과, 세척설비 from d04_카세트마스터 where 1=1 and 종류 = ?...


#### M0007003_TempSave1 (update)
- 테이블: d04_
- 컬럼: 
- SQL: update d04_카세트마스터 set 카세트상태 = #{카세트상태} ,최근세척시작일 = #{최근세척시작일} ,최근세척시작시간 = #{최근세척시작시간} ,세척작업자 = #{세척작업자} ,세척설비 = #{세척설비} ,최근세척종료일 = #{최근세척종료일} ,최근세척종료시간 = #{최근세척종료시간} WHERE 1=1 and 공장코드 = #{공장코드} and 종류...


#### M0007003_Save1 (update)
- 테이블: d04_
- 컬럼: 공장코드, 종류, 타입, 모델, CST_NO, 위치, 카세트상태, 카세트상태값, 최근세척시작일, 최근세척시작시간...
- SQL: update d04_카세트마스터 set 카세트상태 = '대기' ,카세트상태값 = '정상' ,최근세척종료일 = #{최근세척종료일} ,최근세척종료시간 = #{최근세척종료시간} WHERE 1=1 and 공장코드 = #{공장코드} and 종류 = #{종류} and 타입 = #{타입} and 모델 = #{모델} and CST_NO = ?; insert into d0...


---

## 화면: M0007004 - Tab 0 반출신청
메뉴경로: Tab 0 반출신청
탭: TAB074001, TAB074002
설명: 반출신청, 회수처리

### 관련 쿼리

#### M0007004_Sch1 (select)
- 테이블: d04_
- 컬럼: 공장코드, 종류, 타입, 모델, CST_NO, 열, 행, 위치, 카세트상태, 카세트상태값...
- SQL: select 공장코드,종류,타입,모델,CST_NO,열,행,위치,카세트상태,카세트상태값,반입일자,반입시간,반입자,반출일,반출시간,반출부서,반출자,반출사유 from d04_카세트마스터 where 1=1 and 카세트상태값 = '부적합' and 카세트상태 in ('대기','반입','세척','점검','반출대기') order by 공장코드,종류,타입,모델,CST_N...


#### M0007004_Sch2 (select)
- 테이블: d04_
- 컬럼: 공장코드, 종류, 타입, 모델, CST_NO, 열, 행, 위치, 카세트상태, 카세트상태값...
- SQL: select 공장코드,종류,타입,모델,CST_NO,열,행,위치,카세트상태,카세트상태값,반출일,반출시간,반출부서,반출자,반출사유,회수일,회수시간,회수자부서,회수자 from d04_카세트마스터 where 1=1 and 카세트상태 in ('반출대기') order by 공장코드,종류,타입,모델,CST_NO,열,행,위치,카세트상태,카세트상태값,반출일,반출시간,반출부...


#### M0007004_U_Inspection1 (update)
- 테이블: d04_
- 컬럼: 공장코드, 종류, 타입, 모델, CST_NO, 위치, 카세트상태, 카세트상태값, 반출일, 반출시간...
- SQL: update d04_카세트마스터 set 카세트상태 = '반출대기' ,반출일 = #{반출일} ,반출시간 = #{반출시간} ,반출부서 = #{반출부서} ,반출자 = #{반출자} ,반출사유 = #{반출사유} WHERE 1=1 and 공장코드 = #{공장코드} and 종류 = #{종류} and 타입 = #{타입} and 모델 = #{모델} and CST_NO = ...


#### M0007004_U_Inspection2 (update)
- 테이블: d04_
- 컬럼: 공장코드, 종류, 타입, 모델, CST_NO, 위치, 카세트상태, 카세트상태값, 회수일, 회수시간...
- SQL: update d04_카세트마스터 set 카세트상태 = '반출' ,위치 = '카세트팀' ,회수일 = #{회수일} ,회수시간 = #{회수시간} ,회수자부서 = #{회수자부서} ,회수자 = #{회수자} WHERE 1=1 and 공장코드 = #{공장코드} and 종류 = #{종류} and 타입 = #{타입} and 모델 = #{모델} and CST_NO = ?; ...


---

## 화면: M0007004 - Tab 0 카세트 마스터
메뉴경로: Tab 0 카세트 마스터
탭: TAB075001, TAB075002, TAB075003, TAB075004
설명: 카세트 마스터, 카세트 이력, 카세트 점검 이력, 카세트 세척 이력

### 관련 쿼리

#### M0007004_Sch1 (select)
- 테이블: d04_
- 컬럼: 공장코드, 종류, 타입, 모델, CST_NO, 열, 행, 위치, 카세트상태, 카세트상태값...
- SQL: select 공장코드,종류,타입,모델,CST_NO,열,행,위치,카세트상태,카세트상태값,반입일자,반입시간,반입자,반출일,반출시간,반출부서,반출자,반출사유 from d04_카세트마스터 where 1=1 and 카세트상태값 = '부적합' and 카세트상태 in ('대기','반입','세척','점검','반출대기') order by 공장코드,종류,타입,모델,CST_N...


#### M0007004_Sch2 (select)
- 테이블: d04_
- 컬럼: 공장코드, 종류, 타입, 모델, CST_NO, 열, 행, 위치, 카세트상태, 카세트상태값...
- SQL: select 공장코드,종류,타입,모델,CST_NO,열,행,위치,카세트상태,카세트상태값,반출일,반출시간,반출부서,반출자,반출사유,회수일,회수시간,회수자부서,회수자 from d04_카세트마스터 where 1=1 and 카세트상태 in ('반출대기') order by 공장코드,종류,타입,모델,CST_NO,열,행,위치,카세트상태,카세트상태값,반출일,반출시간,반출부...


#### M0007004_U_Inspection1 (update)
- 테이블: d04_
- 컬럼: 공장코드, 종류, 타입, 모델, CST_NO, 위치, 카세트상태, 카세트상태값, 반출일, 반출시간...
- SQL: update d04_카세트마스터 set 카세트상태 = '반출대기' ,반출일 = #{반출일} ,반출시간 = #{반출시간} ,반출부서 = #{반출부서} ,반출자 = #{반출자} ,반출사유 = #{반출사유} WHERE 1=1 and 공장코드 = #{공장코드} and 종류 = #{종류} and 타입 = #{타입} and 모델 = #{모델} and CST_NO = ...


#### M0007004_U_Inspection2 (update)
- 테이블: d04_
- 컬럼: 공장코드, 종류, 타입, 모델, CST_NO, 위치, 카세트상태, 카세트상태값, 회수일, 회수시간...
- SQL: update d04_카세트마스터 set 카세트상태 = '반출' ,위치 = '카세트팀' ,회수일 = #{회수일} ,회수시간 = #{회수시간} ,회수자부서 = #{회수자부서} ,회수자 = #{회수자} WHERE 1=1 and 공장코드 = #{공장코드} and 종류 = #{종류} and 타입 = #{타입} and 모델 = #{모델} and CST_NO = ?; ...


---

## 화면: M0008001 - Tab 1 검사의뢰(제조)
메뉴경로: Tab 1 검사의뢰(제조)
탭: TAB080001, TAB080002, TAB080003
설명: 검사의뢰(제조), 검사진행(품질), 검사결과확정(제조,품질)

### 관련 쿼리

#### getInspectionItems (select)
- 테이블: dw_
- 컬럼: 대분류코드, 대분류명, 중분류코드, 중분류명
- SQL: select 대분류코드, 대분류명, 중분류코드, 중분류명, MIN(주기) 주기 from dw_품질검사 where 공장코드 = '2' and 대분류코드 = '200' group by 대분류코드, 대분류명, 중분류코드, 중분류명 order by 중분류코드...


#### getInspectionSubItems (select)
- 테이블: dw_
- 컬럼: distinct, 소분류명
- SQL: select distinct 소분류코드, 소분류명 from dw_품질검사 where 공장코드 = '2' and 대분류코드 = '200' and 중분류코드 = ? order by 소분류코드...


#### getUtmList (select)
- 테이블: dw_common_code
- 컬럼: code, code_name
- SQL: select code,code_name from dw_common_code where maj_code = '91' order by code...


#### getCellTrackingInfo (select)
- 테이블: getcelltrackinginfobyruncell
- 컬럼: 
- SQL: select * from GetCellTrackingInfobyRunCell(?, ?) order by end_time...


#### M0008001_Sch1 (select)
- 테이블: dw_
- 컬럼: 
- SQL: select * from dw_품질검사내역 where 1=1 and 진행상태 in ('검사대기', '검사의뢰') order by 의뢰일자, cell_id, 차수...


#### M0008001_Get1 (select)
- 테이블: get
- 컬럼: 
- SQL: select * from Get품질검사대기(?,?,?,?);...


#### M0008001_Get2 (select)
- 테이블: get
- 컬럼: 
- SQL: select * from Get품질검사대기_소분류(?,?,?,?,?);...


#### M0008001_Sch2 (select)
- 테이블: dw_
- 컬럼: 
- SQL: select * from dw_품질검사내역 where 1=1 and 진행상태 in ('검사의뢰', '검사중', '재검사의뢰', '검사완료') order by 의뢰일자, cell_id, 차수...


#### M0008001_Sch3 (select)
- 테이블: dw_
- 컬럼: 
- SQL: select * from dw_품질검사내역 where 1=1 and 진행상태 in ('검사완료', '검사확정') order by 의뢰일자, cell_id, 차수...


#### M0008001_Insert1 (insert)
- 테이블: dw_
- 컬럼: 
- SQL: INSERT INTO dw_품질검사내역 ( 의뢰일자, 차수, 대분류코드, 중분류코드, 검사측정항목코드, 검사측정항목, 의뢰자, model, run_no, cell_id, 진행상태 ) VALUES ( #{의뢰일자}, #{차수}, #{대분류코드}, #{중분류코드}, #{검사측정항목코드}, #{검사측정항목}, #{의뢰자}, ?, ?, ?, #{진행상태} )...


#### M0008001_U_Inspection1 (update)
- 테이블: dw_
- 컬럼: 
- SQL: UPDATE dw_품질검사내역 SET 진행상태 = '검사의뢰' WHERE 1=1 and 공장코드 = #{공장코드} and 의뢰일자 = #{의뢰일자} and 차수 = #{차수} and 대분류코드 = #{대분류코드} and 중분류코드 = #{중분류코드} and 검사측정항목코드 = #{검사측정항목코드} and run_no = ? and cell_id = ? an...


#### M0008001_Update1 (update)
- 테이블: dw_
- 컬럼: 
- SQL: UPDATE dw_품질검사내역 SET 판정1 = #{판정1} ,판정2 = #{판정2} ,특이사항 = #{특이사항} where 1=1 and 공장코드 = #{공장코드} and 의뢰일자 = #{의뢰일자} and 차수 = #{차수} and 대분류코드 = #{대분류코드} and 중분류코드 = #{중분류코드} and 검사측정항목코드 = #{검사측정항목코드} and ...


#### M0008001_Update2 (update)
- 테이블: dw_
- 컬럼: 
- SQL: UPDATE dw_품질검사내역 SET 진행상태 = #{진행상태} ,검사자 = #{검사자} ,검사시작 = #{검사시작} ,UTM호기 = #{utm호기} where 1=1 and 공장코드 = #{공장코드} and 의뢰일자 = #{의뢰일자} and 차수 = #{차수} and 대분류코드 = #{대분류코드} and 중분류코드 = #{중분류코드} and 검사측정항목코...


#### M0008001_Update3 (update)
- 테이블: dw_
- 컬럼: 
- SQL: UPDATE dw_품질검사내역 SET 진행상태 = #{진행상태} ,검사종료 = #{검사종료} ,판정1 = #{판정1} ,판정2 = #{판정2} ,특이사항 = #{특이사항} where 1=1 and 공장코드 = #{공장코드} and 의뢰일자 = #{의뢰일자} and 차수 = #{차수} and 대분류코드 = #{대분류코드} and 중분류코드 = #{중분류코드}...


#### M0008001_U_Inspection2 (update)
- 테이블: dw_
- 컬럼: 
- SQL: UPDATE dw_품질검사내역 SET 진행상태 = '재검사의뢰' ,검사결과_확인 = #{검사결과확인} ,검사결과_확인일시 = #{검사결과확인일시} WHERE 1=1 and 공장코드 = #{공장코드} and 의뢰일자 = #{의뢰일자} and 차수 = #{차수} and 대분류코드 = #{대분류코드} and 중분류코드 = #{중분류코드} and 검사측정항목코드 ...


#### M0008001_U_Inspection3 (update)
- 테이블: dw_
- 컬럼: 
- SQL: UPDATE dw_품질검사내역 SET 진행상태 = '검사확정' ,검사결과_확인 = #{검사결과확인} ,검사결과_확인일시 = #{검사결과확인일시} WHERE 1=1 and 공장코드 = #{공장코드} and 의뢰일자 = #{의뢰일자} and 차수 = #{차수} and 대분류코드 = #{대분류코드} and 중분류코드 = #{중분류코드} and 검사측정항목코드 =...


#### M0008001_Delete1 (delete)
- 테이블: dw_
- 컬럼: 
- SQL: delete from dw_품질검사내역 where 1=1 and 공장코드 = #{공장코드} and 의뢰일자 = #{의뢰일자} and 차수 = #{차수} and 대분류코드 = #{대분류코드} and 중분류코드 = #{중분류코드} and 검사측정항목코드 = #{검사측정항목코드} and run_no = ? and cell_id = ? and 진행상태 = #{진행...


---

## 화면: M0008002 - Tab 1 검사의뢰(제조)
메뉴경로: Tab 1 검사의뢰(제조)
탭: TAB080004, TAB080005, TAB080006
설명: 검사의뢰(제조), 검사진행(품질), 검사결과확정(제조,품질)

### 관련 쿼리

#### getInspectionItems (select)
- 테이블: dw_
- 컬럼: 대분류코드, 대분류명, 중분류코드, 중분류명
- SQL: select 대분류코드, 대분류명, 중분류코드, 중분류명, MIN(주기) 주기 from dw_품질검사 where 공장코드 = '2' and 대분류코드 = '300' group by 대분류코드, 대분류명, 중분류코드, 중분류명 order by 중분류코드...


#### getInspectionSubItems (select)
- 테이블: dw_
- 컬럼: distinct, 소분류명
- SQL: select distinct 소분류코드, 소분류명 from dw_품질검사 where 공장코드 = '2' and 대분류코드 = '300' and 중분류코드 = ? order by 소분류코드...


#### getUtmList (select)
- 테이블: dw_common_code
- 컬럼: code, code_name
- SQL: select code,code_name from dw_common_code where maj_code = '91' order by code...


#### getCellTrackingInfo (select)
- 테이블: getcelltrackinginfobyruncell
- 컬럼: 
- SQL: select * from GetCellTrackingInfobyRunCell(?, ?) order by end_time...


#### M0008002_Sch1 (select)
- 테이블: dw_
- 컬럼: 
- SQL: select * from dw_품질검사내역 where 1=1 and 진행상태 in ('검사대기', '검사의뢰') order by 의뢰일자, cell_id, 차수...


#### M0008002_Get1 (select)
- 테이블: get
- 컬럼: 
- SQL: select * from Get품질검사대기(?,?,?,?);...


#### M0008002_Get2 (select)
- 테이블: get
- 컬럼: 
- SQL: select * from Get품질검사대기_소분류(?,?,?,?,?);...


#### M0008002_Sch2 (select)
- 테이블: dw_
- 컬럼: 
- SQL: select * from dw_품질검사내역 where 1=1 and 진행상태 in ('검사의뢰', '검사중', '재검사의뢰', '검사완료') order by 의뢰일자, cell_id, 차수...


#### M0008002_Sch3 (select)
- 테이블: dw_
- 컬럼: 
- SQL: select * from dw_품질검사내역 where 1=1 and 진행상태 in ('검사완료', '검사확정') order by 의뢰일자, cell_id, 차수...


#### M0008002_Insert1 (insert)
- 테이블: dw_
- 컬럼: 
- SQL: INSERT INTO dw_품질검사내역 ( 의뢰일자, 차수, 대분류코드, 중분류코드, 검사측정항목코드, 검사측정항목, 의뢰자, model, run_no, cell_id, 진행상태 ) VALUES ( #{의뢰일자}, #{차수}, #{대분류코드}, #{중분류코드}, #{검사측정항목코드}, #{검사측정항목}, #{의뢰자}, ?, ?, ?, #{진행상태} )...


#### M0008002_U_Inspection1 (update)
- 테이블: dw_
- 컬럼: 
- SQL: UPDATE dw_품질검사내역 SET 진행상태 = '검사의뢰' WHERE 1=1 and 공장코드 = #{공장코드} and 의뢰일자 = #{의뢰일자} and 차수 = #{차수} and 대분류코드 = #{대분류코드} and 중분류코드 = #{중분류코드} and 검사측정항목코드 = #{검사측정항목코드} and run_no = ? and cell_id = ? an...


#### M0008002_Update1 (update)
- 테이블: dw_
- 컬럼: 
- SQL: UPDATE dw_품질검사내역 SET 판정1 = #{판정1} ,판정2 = #{판정2} ,특이사항 = #{특이사항} where 1=1 and 공장코드 = #{공장코드} and 의뢰일자 = #{의뢰일자} and 차수 = #{차수} and 대분류코드 = #{대분류코드} and 중분류코드 = #{중분류코드} and 검사측정항목코드 = #{검사측정항목코드} and ...


#### M0008002_Update2 (update)
- 테이블: dw_
- 컬럼: 
- SQL: UPDATE dw_품질검사내역 SET 진행상태 = #{진행상태} ,검사자 = #{검사자} ,검사시작 = #{검사시작} ,UTM호기 = #{utm호기} where 1=1 and 공장코드 = #{공장코드} and 의뢰일자 = #{의뢰일자} and 차수 = #{차수} and 대분류코드 = #{대분류코드} and 중분류코드 = #{중분류코드} and 검사측정항목코...


#### M0008002_Update3 (update)
- 테이블: dw_
- 컬럼: 
- SQL: UPDATE dw_품질검사내역 SET 진행상태 = #{진행상태} ,검사종료 = #{검사종료} ,판정1 = #{판정1} ,판정2 = #{판정2} ,특이사항 = #{특이사항} where 1=1 and 공장코드 = #{공장코드} and 의뢰일자 = #{의뢰일자} and 차수 = #{차수} and 대분류코드 = #{대분류코드} and 중분류코드 = #{중분류코드}...


#### M0008002_U_Inspection2 (update)
- 테이블: dw_
- 컬럼: 
- SQL: UPDATE dw_품질검사내역 SET 진행상태 = '재검사의뢰' ,검사결과_확인 = #{검사결과확인} ,검사결과_확인일시 = #{검사결과확인일시} WHERE 1=1 and 공장코드 = #{공장코드} and 의뢰일자 = #{의뢰일자} and 차수 = #{차수} and 대분류코드 = #{대분류코드} and 중분류코드 = #{중분류코드} and 검사측정항목코드 ...


#### M0008002_U_Inspection3 (update)
- 테이블: dw_
- 컬럼: 
- SQL: UPDATE dw_품질검사내역 SET 진행상태 = '검사확정' ,검사결과_확인 = #{검사결과확인} ,검사결과_확인일시 = #{검사결과확인일시} WHERE 1=1 and 공장코드 = #{공장코드} and 의뢰일자 = #{의뢰일자} and 차수 = #{차수} and 대분류코드 = #{대분류코드} and 중분류코드 = #{중분류코드} and 검사측정항목코드 =...


#### M0008002_Delete1 (delete)
- 테이블: dw_
- 컬럼: 
- SQL: delete from dw_품질검사내역 where 1=1 and 공장코드 = #{공장코드} and 의뢰일자 = #{의뢰일자} and 차수 = #{차수} and 대분류코드 = #{대분류코드} and 중분류코드 = #{중분류코드} and 검사측정항목코드 = #{검사측정항목코드} and run_no = ? and cell_id = ? and 진행상태 = #{진행...


---

## 화면: M0008003 - Tab 1 검사의뢰(제조)
메뉴경로: Tab 1 검사의뢰(제조)
탭: TAB080007, TAB080008, TAB080009
설명: 검사의뢰(제조), 검사진행(품질), 검사결과확정(제조,품질)

### 관련 쿼리

#### getInspectionItems (select)
- 테이블: dw_
- 컬럼: 대분류코드, 대분류명, 중분류코드, 중분류명
- SQL: select 대분류코드, 대분류명, 중분류코드, 중분류명, MIN(주기) 주기 from dw_품질검사 where 공장코드 = '2' and 대분류코드 = '100' group by 대분류코드, 대분류명, 중분류코드, 중분류명 order by 중분류코드...


#### getInspectionSubItems (select)
- 테이블: dw_
- 컬럼: distinct, 소분류명
- SQL: select distinct 소분류코드, 소분류명 from dw_품질검사 where 공장코드 = '2' and 대분류코드 = '100' and 중분류코드 = ? order by 소분류코드...


#### getUtmList (select)
- 테이블: dw_common_code
- 컬럼: code, code_name
- SQL: select code,code_name from dw_common_code where maj_code = '91' order by code...


#### getCellTrackingInfo (select)
- 테이블: getcelltrackinginfobyruncell
- 컬럼: 
- SQL: select * from GetCellTrackingInfobyRunCell(?, ?) order by end_time...


#### M0008003_Sch1 (select)
- 테이블: dw_
- 컬럼: 
- SQL: select * from dw_품질검사내역 where 1=1 and 진행상태 in ('검사대기', '검사의뢰') order by 의뢰일자, cell_id, 차수...


#### M0008003_Get1 (select)
- 테이블: get
- 컬럼: 
- SQL: select * from Get품질검사대기(?,?,?,?);...


#### M0008003_Get2 (select)
- 테이블: get
- 컬럼: 
- SQL: select * from Get품질검사대기_소분류(?,?,?,?,?);...


#### M0008003_Sch2 (select)
- 테이블: dw_
- 컬럼: 
- SQL: select * from dw_품질검사내역 where 1=1 and 진행상태 in ('검사의뢰', '검사중', '재검사의뢰', '검사완료') order by 의뢰일자, cell_id, 차수...


#### M0008003_Sch3 (select)
- 테이블: dw_
- 컬럼: 
- SQL: select * from dw_품질검사내역 where 1=1 and 진행상태 in ('검사완료', '검사확정') order by 의뢰일자, cell_id, 차수...


#### M0008003_Insert1 (insert)
- 테이블: dw_
- 컬럼: 
- SQL: INSERT INTO dw_품질검사내역 ( 의뢰일자, 차수, 대분류코드, 중분류코드, 검사측정항목코드, 검사측정항목, 의뢰자, model, PackNo, run_no, cell_id, 진행상태 ) VALUES ( #{의뢰일자}, #{차수}, #{대분류코드}, #{중분류코드}, #{검사측정항목코드}, #{검사측정항목}, #{의뢰자}, ?, ?, ?, ?, #...


#### M0008003_U_Inspection1 (update)
- 테이블: dw_
- 컬럼: 
- SQL: UPDATE dw_품질검사내역 SET 진행상태 = '검사의뢰' WHERE 1=1 and 공장코드 = #{공장코드} and 의뢰일자 = #{의뢰일자} and 차수 = #{차수} and 대분류코드 = #{대분류코드} and 중분류코드 = #{중분류코드} and 검사측정항목코드 = #{검사측정항목코드} <!-- and PackNo = ?--> and run_no...


#### M0008003_Update1 (update)
- 테이블: dw_
- 컬럼: 
- SQL: UPDATE dw_품질검사내역 SET 판정1 = #{판정1} ,판정2 = #{판정2} ,특이사항 = #{특이사항} where 1=1 and 공장코드 = #{공장코드} and 의뢰일자 = #{의뢰일자} and 차수 = #{차수} and 대분류코드 = #{대분류코드} and 중분류코드 = #{중분류코드} and 검사측정항목코드 = #{검사측정항목코드} <!--...


#### M0008003_Update2 (update)
- 테이블: dw_
- 컬럼: 
- SQL: UPDATE dw_품질검사내역 SET 진행상태 = #{진행상태} ,검사자 = #{검사자} ,검사시작 = #{검사시작} ,UTM호기 = #{utm호기} where 1=1 and 공장코드 = #{공장코드} and 의뢰일자 = #{의뢰일자} and 차수 = #{차수} and 대분류코드 = #{대분류코드} and 중분류코드 = #{중분류코드} and 검사측정항목코...


#### M0008003_Update3 (update)
- 테이블: dw_
- 컬럼: 
- SQL: UPDATE dw_품질검사내역 SET 진행상태 = #{진행상태} ,검사종료 = #{검사종료} ,판정1 = #{판정1} ,판정2 = #{판정2} ,특이사항 = #{특이사항} where 1=1 and 공장코드 = #{공장코드} and 의뢰일자 = #{의뢰일자} and 차수 = #{차수} and 대분류코드 = #{대분류코드} and 중분류코드 = #{중분류코드}...


#### M0008003_U_Inspection2 (update)
- 테이블: dw_
- 컬럼: 
- SQL: UPDATE dw_품질검사내역 SET 진행상태 = '재검사의뢰' ,검사결과_확인 = #{검사결과확인} ,검사결과_확인일시 = #{검사결과확인일시} WHERE 1=1 and 공장코드 = #{공장코드} and 의뢰일자 = #{의뢰일자} and 차수 = #{차수} and 대분류코드 = #{대분류코드} and 중분류코드 = #{중분류코드} and 검사측정항목코드 ...


#### M0008003_U_Inspection3 (update)
- 테이블: dw_
- 컬럼: 
- SQL: UPDATE dw_품질검사내역 SET 진행상태 = '검사확정' ,검사결과_확인 = #{검사결과확인} ,검사결과_확인일시 = #{검사결과확인일시} WHERE 1=1 and 공장코드 = #{공장코드} and 의뢰일자 = #{의뢰일자} and 차수 = #{차수} and 대분류코드 = #{대분류코드} and 중분류코드 = #{중분류코드} and 검사측정항목코드 =...


#### M0008003_Delete1 (delete)
- 테이블: dw_
- 컬럼: 
- SQL: delete from dw_품질검사내역 where 1=1 and 공장코드 = #{공장코드} and 의뢰일자 = #{의뢰일자} and 차수 = #{차수} and 대분류코드 = #{대분류코드} and 중분류코드 = #{중분류코드} and 검사측정항목코드 = #{검사측정항목코드} <!-- and PackNo = ?--> and run_no = ? and cell...


---

## 화면: M0009001 - Tab 0 설비별 MST 정보
메뉴경로: Tab 0 설비별 MST 정보
탭: TAB090101, TAB090102
설명: 설비별 MST 정보, 비가동 항목 관리

### 관련 쿼리

#### selectEquipListInSteps (select)
- 테이블: dw_equipment_mast, dw_step_mast
- 컬럼: distinct, case, a.설비약명, a.공정코드, b.공정약어
- SQL: SELECT distinct a.line , case when a.chamber is not null and trim(a.chamber) != '' then '*' else a.설비번호 end as 설비번호 , a.설비약명 , a.공정코드 , b.공정약어 as 공정명 FROM dw_equipment_mast a LEFT OUTER JOIN dw_step_m...


#### selectModelList (select)
- 테이블: dw_product_mast
- 컬럼: line, model, inch, glass_thick, spec
- SQL: select line, model, inch, glass_thick, spec from ( select line, model, inch, glass_thick, spec, row_number() over (partition by model order by version desc ) rnk from dw_product_mast a where 1 = 1 and...


#### selectEquipProdBaseList (select)
- 테이블: dw_equip_prod_base
- 컬럼: line, step_code, equip_no, equip_name, apply_date, step_name, use_category, model, mst, worker_name...
- SQL: SELECT line, step_code, equip_no, equip_name, apply_date, step_name, use_category, model, mst, worker_name, comments, create_date, create_user, update_date, update_user, 'Y' as editable FROM dw_equip_...


#### checkApplyDate (select)
- 테이블: dw_equip_prod_base
- 컬럼: b.line, b.step_code, b.equip_no, b.equip_name, b.model, b.apply_date
- SQL: select b.line, b.step_code, b.equip_no, b.equip_name, b.model, b.apply_date from ( <foreach item="item" collection="vo" open="" separator="union all" close="" > select ? as line, ? as step_code, ? as ...


#### checkApplyDateForUpdate (select)
- 테이블: dw_equip_prod_base
- 컬럼: a.line, a.step_code, a.equip_no, a.version, a.equip_name, a.apply_date
- SQL: select a.line, a.step_code, a.equip_no, a.version, a.equip_name,a.apply_date from dw_equip_prod_base a where a.line = ? and a.step_code = ? and a.equip_no = ? and a.equip_name = ? and ( ( a.version <!...


#### selectSubCategoryList (select)
- 테이블: dw_common_code_input
- 컬럼: a.code, a.code_name, b.code, b.code_name
- SQL: select a.code as off_category_code, a.code_name as off_category_name, b.code as sub_category_code, b.code_name as sub_category_name from dw_common_code_input a left outer join ( select code, code_name...


#### selectEquipOffCodeList (select)
- 테이블: dw_equip_off_code, dw_common_code
- 컬럼: a.off_category_code, b.code_name, a.sub_category_code, d.code_name, a.off_code, a.off_name, a.off_gubun_code, c.code_name, a.item_order, a.use_yn...
- SQL: SELECT a.off_category_code as display_off_category_code, a.off_category_code, b.code_name as off_category_name, a.sub_category_code as display_sub_category_code, a.sub_category_code, d.code_name as su...


#### checkExistsOffCode (select)
- 테이블: dw_equip_off_code
- 컬럼: '/'), 'NoData')
- SQL: select COALESCE(STRING_AGG(a.off_code, '/'), 'NoData') AS off_code from dw_equip_off_code a where ( upper(a.off_code) ) in <foreach item="item" collection="vo" open="(" separator="," close=")" > upper...


#### checkUsedOffCode (select)
- 테이블: dw_equip_off_log
- 컬럼: '/'), 'NoData')
- SQL: select COALESCE(STRING_AGG(a.off_code, '/'), 'NoData') AS off_code from dw_equip_off_log a where ( upper(a.off_code) ) in <foreach item="item" collection="vo" open="(" separator="," close=")" > upper(...


#### updateEquipProdBase (update)
- 테이블: dw_equip_prod_base
- 컬럼: 
- SQL: UPDATE dw_equip_prod_base SET use_category = ?, mst = ?, worker_name = ?, comments = ?, update_date = getdate(), update_user = ? WHERE line = ? AND step_code = ? AND equip_no = ? AND equip_name = ? AN...


#### updateEquipOffCode (update)
- 테이블: dw_equip_off_code
- 컬럼: 
- SQL: UPDATE dw_equip_off_code SET off_name = ?, off_gubun_code = ?, item_order = ?, use_yn = ?, comments = ?, update_date = getdate(), update_user = ? WHERE off_category_code = ? and sub_category_code = ? ...


#### deleteEquipProdBase (delete)
- 테이블: dw_equip_prod_base
- 컬럼: 
- SQL: DELETE FROM dw_equip_prod_base WHERE line = ? AND step_code = ? AND equip_no = ? AND equip_name = ? AND apply_date = ? AND model = ?...


#### deleteEquipOffCode (delete)
- 테이블: dw_equip_off_code
- 컬럼: 
- SQL: DELETE FROM dw_equip_off_code WHERE off_category_code = ? and sub_category_code = ? AND off_code = ?...


---

## 화면: M0009002 - M0009002
메뉴경로: 



### 관련 쿼리

#### selectEquipOffLogList (select)
- 테이블: dw_equip_off_log, dw_step_mast, dw_equip_off_code, dw_common_code
- 컬럼: a.line, a.step_code, a.equip_no, a.equip_name, a.off_start_time, a.off_end_time, a.off_time, a.finish_yn, a.off_category_code, d.off_category_name...
- SQL: SELECT a.line, a.step_code, a.equip_no, a.equip_name, a.off_start_time, a.off_end_time, a.off_time, a.finish_yn, a.off_category_code, d.off_category_name, a.sub_category_code, d.sub_category_name, a.o...


#### selectEquipOffProdBaseList (select)
- 테이블: dw_equip_prod_base, dw_common_code
- 컬럼: b.line, b.step_code, b.equip_no, b.equip_name, b.apply_date, b.step_name, b.use_category, c.code_name, b.model, b.mst...
- SQL: select b.line, b.step_code, b.equip_no, b.equip_name, b.apply_date, b.step_name, b.use_category, c.code_name as use_category_name, b.model, b.mst, b.worker_name, b.comments from ( select line, step_co...


#### checkEndOffDate (select)
- 테이블: dw_equip_off_log, dw_equip_off_code
- 컬럼: a.equip_name, c.off_name, a.off_start_time, a.off_end_time
- SQL: SELECT a.equip_name, c.off_name, a.off_start_time, a.off_end_time from dw_equip_off_log a LEFT OUTER JOIN dw_equip_off_code c ON ( a.off_category_code = c.off_category_code and a.off_code = c.off_code...


#### checkDupOffDate (select)
- 테이블: dw_equip_off_log, dw_equip_off_code
- 컬럼: a.equip_name, c.off_name, a.off_start_time, a.off_end_time
- SQL: SELECT a.equip_name, c.off_name, a.off_start_time, a.off_end_time from dw_equip_off_log a LEFT OUTER JOIN dw_equip_off_code c ON ( a.off_category_code = c.off_category_code and a.sub_category_code = c...


#### checkDupOffDateForUpdate (select)
- 테이블: dw_equip_off_log, dw_equip_off_code
- 컬럼: a.equip_name, c.off_name, a.off_start_time, a.off_end_time
- SQL: SELECT a.equip_name, c.off_name, a.off_start_time, a.off_end_time from dw_equip_off_log a LEFT OUTER JOIN dw_equip_off_code c ON ( a.off_category_code = c.off_category_code and a.sub_category_code = c...


#### updateEquipOffLog (update)
- 테이블: dw_equip_off_log
- 컬럼: 
- SQL: UPDATE dw_equip_off_log SET off_end_time = ?, off_time = ?, finish_yn = case when ? is null or ? = '' then 'N' else 'Y' end, off_category_code = ?, sub_category_code = ?, off_code = ?, worker_name = ?...


#### deleteEquipOffLog (delete)
- 테이블: dw_equip_off_log
- 컬럼: 
- SQL: DELETE FROM dw_equip_off_log WHERE line = ? AND step_code = ? AND equip_no = ? AND equip_name = ? AND off_start_time = ?...


---

## 화면: M0009003 - M0009003
메뉴경로: 



### 관련 쿼리

#### selectCheckMstInform (select)
- 테이블: fn_get_, dw_equip_prod_base
- 컬럼: distinct, a.equip_name, a.model
- SQL: select distinct a.equip_no, a.equip_name, a.model from ( select 설비번호 equip_no, 설비약명 equip_name, model, substring(집계일자,1,4) + '-' + substring(집계일자,5,2) + '-' + substring(집계일자,7,2) as work_date, 생산수 as ...


#### selectEquipEffDailyReport (select)
- 테이블: base_dates, dw_equipment_mast, dw_step_mast, fn_get_, dw_equip_prod_base, dw_equip_off_log, off_log, off_data, equip, prod_log, off_time, dw_equip_off_code, base_data
- 컬럼: 
- SQL: WITH BASE_DATES AS ( SELECT CAST(? AS DATE) AS base_date UNION ALL SELECT DATEADD(DAY, 1, base_date) FROM BASE_DATES WHERE base_date <![CDATA[ < ]]> ? ), EQUIP as ( select a.base_date, b.line, b.step_...

