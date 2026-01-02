/**
 * 생산 케파 시뮬레이션 상수
 */

export const colors = {
    primary: '#3699FF',
    success: '#1BC5BD',
    warning: '#FFA800',
    danger: '#F64E60',
    info: '#8950FC',
    dark: '#181C32',
    gray100: '#F5F8FA',
    gray200: '#EFF2F5',
    gray300: '#E4E6EF',
    gray400: '#B5B5C3',
    gray500: '#A1A5B7',
    gray600: '#7E8299',
    gray700: '#5E6278',
    gray800: '#3F4254',
    gray900: '#181C32',
};

export const statusColors: Record<string, string> = {
    'OK': colors.success,
    'WARNING': colors.warning,
    'OVERLOAD': colors.danger,
    'CRITICAL': colors.danger,
};
