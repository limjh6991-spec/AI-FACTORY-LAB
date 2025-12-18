const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient({
    datasourceUrl: 'postgresql://postgres:postgres@localhost:5432/binary?schema=spacepro',
});

async function main() {
    console.log('🌱 Seeding menu data...');

    // 기존 메뉴 삭제
    await prisma.menu.deleteMany();

    // 대시보드 그룹
    const dashboard = await prisma.menu.create({
        data: {
            menuCode: 'DASHBOARD',
            menuName: '대시보드',
            menuNameEn: 'Dashboard',
            menuPath: '/',
            menuIcon: 'LayoutDashboard',
            menuLevel: 1,
            sortOrder: 1,
            menuType: 'MENU',
        },
    });

    // 프로젝트
    await prisma.menu.create({
        data: {
            menuCode: 'PROJECTS',
            menuName: '프로젝트',
            menuNameEn: 'Projects',
            menuPath: '/projects',
            menuIcon: 'FolderKanban',
            menuLevel: 1,
            sortOrder: 2,
            menuType: 'MENU',
        },
    });

    // 킥오프 미팅 그룹
    const kickoff = await prisma.menu.create({
        data: {
            menuCode: 'KICKOFF',
            menuName: '킥오프 미팅',
            menuNameEn: 'Kickoff Meeting',
            menuPath: '/kickoff',
            menuIcon: 'Rocket',
            menuLevel: 1,
            sortOrder: 3,
            menuType: 'GROUP',
        },
    });

    // 킥오프 하위 메뉴
    const kickoffChildren = [
        { code: 'KICKOFF_SURVEY', name: '현장 실사', path: '/kickoff/site-survey', icon: 'CheckSquare' },
        { code: 'KICKOFF_DATA', name: '데이터 요청', path: '/kickoff/data-request', icon: 'Database' },
        { code: 'KICKOFF_INTERVIEW', name: '인터뷰', path: '/kickoff/interview', icon: 'MessageSquare' },
        { code: 'KICKOFF_AGENDA', name: '아젠다', path: '/kickoff/agenda', icon: 'Target' },
        { code: 'KICKOFF_DELIVERABLES', name: '산출물', path: '/kickoff/deliverables', icon: 'FileCheck' },
    ];

    for (let i = 0; i < kickoffChildren.length; i++) {
        await prisma.menu.create({
            data: {
                menuCode: kickoffChildren[i].code,
                menuName: kickoffChildren[i].name,
                menuPath: kickoffChildren[i].path,
                menuIcon: kickoffChildren[i].icon,
                parentId: kickoff.id,
                menuLevel: 2,
                sortOrder: i + 1,
                menuType: 'MENU',
            },
        });
    }

    // 제안서 그룹
    const proposal = await prisma.menu.create({
        data: {
            menuCode: 'PROPOSAL',
            menuName: '제안서',
            menuNameEn: 'Proposal',
            menuPath: '/proposal',
            menuIcon: 'FileText',
            menuLevel: 1,
            sortOrder: 4,
            menuType: 'GROUP',
        },
    });

    // 제안서 하위 메뉴
    const proposalChildren = [
        { code: 'PROPOSAL_OVERVIEW', name: '제안 개요', path: '/proposal/overview', icon: 'Target' },
        { code: 'PROPOSAL_SOLUTION', name: '제안 내용', path: '/proposal/solution', icon: 'Layers' },
        { code: 'PROPOSAL_TIMELINE', name: '수행계획', path: '/proposal/timeline', icon: 'Calendar' },
        { code: 'PROPOSAL_ARCH', name: '시스템 구성', path: '/proposal/architecture', icon: 'Server' },
    ];

    for (let i = 0; i < proposalChildren.length; i++) {
        await prisma.menu.create({
            data: {
                menuCode: proposalChildren[i].code,
                menuName: proposalChildren[i].name,
                menuPath: proposalChildren[i].path,
                menuIcon: proposalChildren[i].icon,
                parentId: proposal.id,
                menuLevel: 2,
                sortOrder: i + 1,
                menuType: 'MENU',
            },
        });
    }

    // 기준정보 그룹
    const master = await prisma.menu.create({
        data: {
            menuCode: 'MASTER',
            menuName: '기준정보',
            menuNameEn: 'Master Data',
            menuPath: '/master',
            menuIcon: 'Database',
            menuLevel: 1,
            sortOrder: 5,
            menuType: 'GROUP',
        },
    });

    // 기준정보 하위 메뉴
    const masterChildren = [
        { code: 'MASTER_ITEM', name: '품목 관리', path: '/master/item', icon: 'Package' },
        { code: 'MASTER_BOM', name: 'BOM 관리', path: '/master/bom', icon: 'GitBranch' },
        { code: 'MASTER_PROCESS', name: '공정 관리', path: '/master/process', icon: 'Workflow' },
        { code: 'MASTER_MACHINE', name: '설비 관리', path: '/master/machine', icon: 'Cpu' },
        { code: 'MASTER_WORKER', name: '작업자 관리', path: '/master/worker', icon: 'Users' },
    ];

    for (let i = 0; i < masterChildren.length; i++) {
        await prisma.menu.create({
            data: {
                menuCode: masterChildren[i].code,
                menuName: masterChildren[i].name,
                menuPath: masterChildren[i].path,
                menuIcon: masterChildren[i].icon,
                parentId: master.id,
                menuLevel: 2,
                sortOrder: i + 1,
                menuType: 'MENU',
            },
        });
    }

    // 생산계획 그룹
    const plan = await prisma.menu.create({
        data: {
            menuCode: 'PLAN',
            menuName: '생산계획',
            menuNameEn: 'Production Planning',
            menuPath: '/plan',
            menuIcon: 'Calendar',
            menuLevel: 1,
            sortOrder: 6,
            menuType: 'GROUP',
        },
    });

    // 생산계획 하위 메뉴
    const planChildren = [
        { code: 'PLAN_MONTHLY', name: '월별 계획', path: '/plan/monthly', icon: 'CalendarDays' },
        { code: 'PLAN_WEEKLY', name: '주별 계획', path: '/plan/weekly', icon: 'CalendarRange' },
        { code: 'PLAN_DAILY', name: '일별 계획', path: '/plan/daily', icon: 'CalendarCheck' },
        { code: 'PLAN_ALLOCATION', name: '설비 배분', path: '/plan/allocation', icon: 'GitMerge' },
    ];

    for (let i = 0; i < planChildren.length; i++) {
        await prisma.menu.create({
            data: {
                menuCode: planChildren[i].code,
                menuName: planChildren[i].name,
                menuPath: planChildren[i].path,
                menuIcon: planChildren[i].icon,
                parentId: plan.id,
                menuLevel: 2,
                sortOrder: i + 1,
                menuType: 'MENU',
            },
        });
    }

    // 생산관리 그룹
    const production = await prisma.menu.create({
        data: {
            menuCode: 'PRODUCTION',
            menuName: '생산관리',
            menuNameEn: 'Production Management',
            menuPath: '/production',
            menuIcon: 'Factory',
            menuLevel: 1,
            sortOrder: 7,
            menuType: 'GROUP',
        },
    });

    // 생산관리 하위 메뉴
    const productionChildren = [
        { code: 'PROD_ORDER', name: '작업지시', path: '/production/order', icon: 'ClipboardList' },
        { code: 'PROD_TRACKING', name: 'Track In/Out', path: '/production/tracking', icon: 'ScanLine' },
        { code: 'PROD_PROGRESS', name: '공정 진척', path: '/production/progress', icon: 'TrendingUp' },
        { code: 'PROD_RESULT', name: '생산 실적', path: '/production/result', icon: 'BarChart3' },
    ];

    for (let i = 0; i < productionChildren.length; i++) {
        await prisma.menu.create({
            data: {
                menuCode: productionChildren[i].code,
                menuName: productionChildren[i].name,
                menuPath: productionChildren[i].path,
                menuIcon: productionChildren[i].icon,
                parentId: production.id,
                menuLevel: 2,
                sortOrder: i + 1,
                menuType: 'MENU',
            },
        });
    }

    // 자재관리 그룹
    const material = await prisma.menu.create({
        data: {
            menuCode: 'MATERIAL',
            menuName: '자재관리',
            menuNameEn: 'Material Management',
            menuPath: '/material',
            menuIcon: 'Package',
            menuLevel: 1,
            sortOrder: 8,
            menuType: 'GROUP',
        },
    });

    // 자재관리 하위 메뉴
    const materialChildren = [
        { code: 'MAT_INVENTORY', name: '재고 현황', path: '/material/inventory', icon: 'Boxes' },
        { code: 'MAT_INOUT', name: '반입/반출', path: '/material/in-out', icon: 'ArrowLeftRight' },
        { code: 'MAT_SHORTAGE', name: '부족 알람', path: '/material/shortage', icon: 'AlertTriangle' },
    ];

    for (let i = 0; i < materialChildren.length; i++) {
        await prisma.menu.create({
            data: {
                menuCode: materialChildren[i].code,
                menuName: materialChildren[i].name,
                menuPath: materialChildren[i].path,
                menuIcon: materialChildren[i].icon,
                parentId: material.id,
                menuLevel: 2,
                sortOrder: i + 1,
                menuType: 'MENU',
            },
        });
    }

    // 금형관리 그룹
    const mold = await prisma.menu.create({
        data: {
            menuCode: 'MOLD',
            menuName: '금형관리',
            menuNameEn: 'Mold Management',
            menuPath: '/mold',
            menuIcon: 'Wrench',
            menuLevel: 1,
            sortOrder: 9,
            menuType: 'GROUP',
        },
    });

    // 금형관리 하위 메뉴
    const moldChildren = [
        { code: 'MOLD_LOCATION', name: '위치 관리', path: '/mold/location', icon: 'MapPin' },
        { code: 'MOLD_MOVEMENT', name: '이동 이력', path: '/mold/movement', icon: 'History' },
    ];

    for (let i = 0; i < moldChildren.length; i++) {
        await prisma.menu.create({
            data: {
                menuCode: moldChildren[i].code,
                menuName: moldChildren[i].name,
                menuPath: moldChildren[i].path,
                menuIcon: moldChildren[i].icon,
                parentId: mold.id,
                menuLevel: 2,
                sortOrder: i + 1,
                menuType: 'MENU',
            },
        });
    }

    // 분석/리포트 그룹
    const report = await prisma.menu.create({
        data: {
            menuCode: 'REPORT',
            menuName: '분석/리포트',
            menuNameEn: 'Analytics & Report',
            menuPath: '/report',
            menuIcon: 'BarChart3',
            menuLevel: 1,
            sortOrder: 10,
            menuType: 'GROUP',
        },
    });

    // 리포트 하위 메뉴
    const reportChildren = [
        { code: 'RPT_PRODUCTION', name: '생산 분석', path: '/report/production', icon: 'LineChart' },
        { code: 'RPT_QUALITY', name: '품질 현황', path: '/report/quality', icon: 'CheckCircle' },
        { code: 'RPT_EQUIPMENT', name: '설비 가동률', path: '/report/equipment', icon: 'Activity' },
    ];

    for (let i = 0; i < reportChildren.length; i++) {
        await prisma.menu.create({
            data: {
                menuCode: reportChildren[i].code,
                menuName: reportChildren[i].name,
                menuPath: reportChildren[i].path,
                menuIcon: reportChildren[i].icon,
                parentId: report.id,
                menuLevel: 2,
                sortOrder: i + 1,
                menuType: 'MENU',
            },
        });
    }

    console.log('✅ Menu seeding completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
