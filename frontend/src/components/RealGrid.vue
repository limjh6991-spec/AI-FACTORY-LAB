<template>
	<div :id="gridId" style="width:100%;height:100%;" ></div>
</template>

<script>

import { GridView, LocalDataProvider } from 'realgrid';
import { v4 as uuidv4 } from 'uuid';
// import '@assets/style/realgrid.css'
// import { useGlobalCountStore } from "@/stores/globalCount";

let gridInstances = {}; // 전역 객체로 동적 변수 관리

export default {
	setup(){

	},
	props: {
		uid: { type: String, default: 'grid' },
		step: { type: Number, default: 0 },
		rows: { type: Array, default: () => [] },
		fields: { type: Array, default: () => [] },
		columns: { type: Array, default: () => [] },
		options: { type: Object, default: () => ({}) },
		fitLayoutWidthEnable: { type: Boolean, default: true },
	},
	data () {
		return {					    
			target: null,
			gridId: `realgrid-${uuidv4()}`,
		}
	},
	watch: {
		rows: {
      handler(newRows) {
				console.log('🔄 rows 변경 감지:', newRows?.length, '건');
				console.log('📋 실제 데이터:', newRows);
				const instance = gridInstances[this.gridId];
				if (!instance) {
					console.error('❌ gridInstance가 없습니다:', this.gridId);
					return;
				}
				
				const { dataProvider, gridView } = instance;
        if (dataProvider) {
					console.log('✅ 데이터 설정 중...');
          dataProvider.setRows(newRows || []);
					
					// 데이터 설정 후 확인
					const rowCount = dataProvider.getRowCount();
					console.log('📊 DataProvider 행 개수:', rowCount);
					
					// 그리드 새로고침 및 너비 맞춤
					if (gridView) {
						gridView.refresh();
						console.log('🔄 GridView 새로고침 완료');
						
						// 컬럼 너비를 그리드 전체 너비에 맞춤
						if (this.fitLayoutWidthEnable) {
							setTimeout(() => {
								gridView.fitLayoutWidth();
								console.log('📐 컬럼 너비 자동 조정 완료');
							}, 100);
						}
					}
        } else {
					console.error('❌ dataProvider가 없습니다');
				}
      },
      deep: true
    }
	},
	mounted() {
		this.created();
	},
	beforeUnmount() {
		this.destroy();
	},
	methods: {
		getGridView(){
			const { gridView } = gridInstances[this.gridId];
			return gridView;
		},
		getGridDataProvider(){
			const { dataProvider } = gridInstances[this.gridId];
			return dataProvider;
		},
		created() {
			console.log('🎯 RealGrid created() 시작');
			console.log('  - fields:', this.fields);
			console.log('  - columns:', this.columns);
			console.log('  - rows:', this.rows);

			this.destroy();

			// Props에서 직접 설정 사용 (fields, columns가 있는 경우)
			if (this.fields.length > 0 && this.columns.length > 0) {
				console.log('✅ Props에서 설정 가져옴');
				this.initializeGrid(this.fields, this.columns, this.options);
				return;
			}

			// 기존 방식: 부모 컴포넌트에서 uid로 설정 찾기
			console.log('🔍 부모 컴포넌트에서 설정 검색 중... uid:', this.uid);
			const maxIterations = 50;
			let iterations = 0;
			this.target = this.$parent;		

			while (this.target && this.target[this.uid] === undefined) {
				this.target = this.target.$parent;
				iterations++;
				if(iterations >= maxIterations) {
					console.error(`❌ 최대 반복 횟수(${maxIterations})를 초과했습니다.`);
					break;
				}
				if(!this.target) {
					console.error("❌ 더 이상 상위 parent가 없습니다.");
					break;
				}
			}
			
			if (!this.target || !this.target[this.uid]) {
				console.error('❌ 부모 컴포넌트에서 설정을 찾을 수 없습니다.');
				return;
			}

			console.log('✅ 부모 컴포넌트에서 설정 찾음:', this.target[this.uid]);
			const config = this.target[this.uid];
			this.initializeGrid(config.fields, config.columns, config.options);
		},
		
		initializeGrid(fields, columns, options = {}) {
			console.log('🚀 그리드 초기화 중...');
			
			gridInstances[this.gridId] = {
        dataProvider: new LocalDataProvider(false),
        gridView: new GridView(this.gridId),
      };
      
      const { dataProvider, gridView } = gridInstances[this.gridId];

			console.log('  - DataProvider 생성 완료');
			console.log('  - GridView 생성 완료');
			
			gridView.setDataSource(dataProvider);
			dataProvider.setFields(fields);
			gridView.setColumns(columns);
			
			console.log('  - Fields 설정:', fields.length, '개');
			console.log('  - Columns 설정:', columns.length, '개');
			
			// 기본 옵션 설정
			const defaultOptions = {
				edit: { editable: false },
				display: { 
					rowHeight: 36,
					columnMovable: true,
					columnResizable: true
				},
				panel: {
					visible: true
				},
				footer: {
					visible: false
				},
				checkBar: {
					visible: true
				},
				stateBar: {
					visible: true
				}
			};
			gridView.setOptions({ ...defaultOptions, ...options });
			
			console.log('  - 옵션 설정 완료');
			
			// 초기 데이터 설정
			if (this.rows && this.rows.length > 0) {
				console.log('📊 초기 데이터 설정:', this.rows.length, '건');
				dataProvider.setRows(this.rows);
				const rowCount = dataProvider.getRowCount();
				console.log('📊 설정 후 행 개수:', rowCount);
			}
			
			console.log('✅ RealGrid 초기화 완료!');
			
			// 기존 레거시 코드 (이벤트 핸들러 등)
			if (this.target && this.target[this.uid]) {
				const targetId = this.uid.charAt(0).toUpperCase() + this.uid.slice(1);
				
				let onDataLoadComplatedFlag = true;
				Object.keys(this.target)
				.filter(item => item.startsWith('on') && item.endsWith(targetId))
				.forEach(item => {
					if(item.replace(targetId,'') == 'onDataLoadComplated'){
						onDataLoadComplatedFlag = false;
					}
					Object.keys(gridView).filter(item1 => item1 == item.replace(targetId,'')).forEach(item2 => {
						gridView[item2] = this.target[item];
					});
					Object.keys(dataProvider).filter(item1 => item1 == item.replace(targetId,'')).forEach(item2 => {
						dataProvider[item2] = this.target[item];
					});
				});

				if(onDataLoadComplatedFlag){
					gridView['onDataLoadComplated'] = this.onDataLoadComplated
				}
				Object.keys(this.target)
				.filter(item => item.startsWith('set') && item.endsWith(targetId))
				.forEach(item => {
					gridView[item.replace(targetId,'')](this.target[item]);			
				});
			} else {
				gridView['onDataLoadComplated'] = this.onDataLoadComplated;
			}
		},
		
		destroy() {
			const instance = gridInstances[this.gridId];
			if (instance) {
				instance.gridView.destroy();
				instance.dataProvider.destroy();
				delete gridInstances[this.gridId];
			}
		},

		getSaveData() {
			const { dataProvider } = gridInstances[this.gridId];			
			return this.$utils.getGridSaveData(dataProvider);
		},

		onDataLoadComplated(grid){
			//console.log("this.fitLayoutWidthEnable:::",this.fitLayoutWidthEnable)
			if(this.fitLayoutWidthEnable){
				grid.fitLayoutWidth(null);
			}
		}
	}
}
</script>
