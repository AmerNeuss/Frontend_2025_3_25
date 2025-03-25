/* eslint-disable @typescript-eslint/no-explicit-any */
export type Devices = {
  id: string;
  enabled: boolean;
  name: string;
  type: string;
  description?: string;
  property: {
    address: string;
    method: string;
    format: string;
    ip: string;
    port: number;
    host: number;
    SQLAlchemyURL: string;
    slot: number;
    rack: number;
    username: string;
    password: string;
    DSN: string;
    databaseType: string;
  };
  polling: number;
  lastConnected: string;
};
export type SelectType = {
  id: number;
  title: string;
  value: string;
};

export type SelectPolling = {
  id: number;
  title: string;
  value: number;
};

export type Dashboard = {
  id: string;
  name: string;
  description: string | null;
  projectId: string;
  width: number;
  height: number;
  size: string;
  backgroundColor: string;
  margin: number;
  align: string;
  gridType: string;
  type: string;
  variables: any | null;
  createdAt: string;
  updatedAt: string;
};
export type SelectGridType = {
  id: number;
  title: string;
  value: number;
};

export type databaseType = {
  property: {
    databaseType: string;
    host: number;
    port: number;
    DSN: string;
    username: string;
    password: string;
  };
};

export type Group = {
  id: string;
  name: string;
};

export type Projects = {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
  // alarms: any[];
  devices: Devices[];
  // reports: any[];
  // scripts: any[];
  // texts: any[];
  // events: any[];
  dashboards: Dashboard[];
};

export type UpdateProjectPayload = {
  data: {
    name: string;
    description: string;
  };
};

export type S7 = {
  property: {
    slot: number;
    port: number;
    ip: string;
    rack: number;
  };
};

export type User = {
  id: string;
  username: string;
  name: string;
  email: string;
  status: string;
  info: string | null;
  password: string;
  createdAt: string;
  updatedAt: string;
  groups: Group[];
};

export type SelectUserForm = {
  id: number;
  title: string;
  value: string;
};

export type WebAPI = {
  property: {
    method: string;
    format: string;
    address: string;
  };
};

export type DeviceDB = {
  id: number;
  name: string;
  dbType: string;
  host: string;
  port: number;
  databaseName: string;
  username: string;
  password: string;
  additionalOptions: string | null;
  isActive: boolean;
};

export type ChartItem = {
  id: number;
  name: string;
  chartId:number;
  width:string;
  backgroundColor:string;
  description:string;
  // أضف الحقول الأخرى إن وجدت
};
export type Dataset = {
  id: number;
  name: string;
  tableName: string;
  query: string;
  schemaName: string;
  fieldsAndTypes: {
    Id: string;
    StationBayId: string;
    VehicleId: string;
    EntryDate:string ;
    ExistDate: string;
    CreationDate: string;
    LastUpdatedDate: string;
    Action: string;
    CameraDetection: string;
    Status: string;
    Current_Discharged_Value: string;
    PH: string;
    CONDUCTIVITY: string;
    Waiting_Account_Number: string;
    Last_PH: string;
    Last_CONDUCTIVITY: string;
  };
  dbConnectionId: number;
  createdAt: string;
  updatedAt: string;
};

export type DatasetTable = {
  id: string;
  name: string;
  email: string;
  emailVerified: string | null;
  image: string | null;
  password: string;
  role: string;
  phone: string;
  isTwoFactorEnabled: boolean;
  passwordResetRequired: boolean;
  [key: string]: any;
};

export type Chart = {
  id: string;
  title: string;
  visualizationType: string;
  data: {
    Id_Count: string;
  };
};
export type Database = {
  id: string;
  name: string;
  email: string;
  dbType: string | null;
  host: string | null;
  port: number;
  databaseName: string;
  username: string;
  password: string;
  additionalOptions: string;
  isActive: boolean;
  projectId: number;
  createdAt: string;
  updatedAt: string;
};