import { Version } from "./generated/graphql";

export const PRIMARY_COLORS = {
  bgColor: '#FFFFFF',
  statusBarBgColor: '#F3F3F3',
};

enum STAGE {
  APLHA = 'APLHA',
  BETA = 'BETA',
  STABLE = 'STABLE'
}

enum SEVERITY {
  NORMAL = 'NORMAL',
  EMERGENCY = 'EMERGENCY'
}

export const CURRENT_APP_VERSION_INFO: Version = {
  code: 2,
  versionName: 'a2.0.1',
  severity: SEVERITY.NORMAL,
  developmentStage: STAGE.APLHA,
  releaseDate: new Date('12/29/2021'),
  // FORMAT: MM/DD/YYYY - MONTH/DAY/YEAR
  notes: 'This is second release for 2 alpha stage.',
}