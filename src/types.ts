export type NavigationTab =
  | 'overview'
  | 'appointments'
  | 'patients'
  | 'treatments'
  | 'inventory'
  | 'invoicing'
  | 'reports'
  | 'settings';

export type ClientTier =
  | 'VIP BLACK'
  | 'PLATINUM'
  | 'SIGNATURE'
  | 'GOLD'
  | 'FOUNDER'
  | 'ACTIVE'
  | 'NEW PATIENT';

export interface ClinicalAlert {
  type: 'allergy' | 'skin-type' | 'warning' | 'info';
  label: string;
}

export interface PatientRecord {
  id: string;
  mrn: string;
  name: string;
  initials: string;
  tier: ClientTier;
  visitsCount: number;
  phone: string;
  email: string;
  age: number;
  gender: string;
  pronouns?: string;
  cardOnFile: string;
  clinicalAlerts: ClinicalAlert[];
  lastVisitDate: string;
  clinician: string;
  consentsCount: number;
  consentsValid: boolean;
  pendingRenewals?: number;
  currentBookingId?: string;
  notes?: string;
  avatarBg?: string;
}

export type BookingStatus =
  | 'confirmed'
  | 'checked-in'
  | 'in-procedure'
  | 'in-progress'
  | 'conflict'
  | 'completed'
  | 'scheduled';

export type ProcedureCategory =
  | 'Laser & Energy'
  | 'Injectables'
  | 'Facials & Peels'
  | 'Body Contouring'
  | 'IV Wellness'
  | 'laser-light'
  | 'facials'
  | 'body-contouring';

export interface BookingRecord {
  id: string;
  bookingNumber: string;
  patientId: string;
  patientName: string;
  tier: ClientTier;
  initials: string;
  phone: string;
  email: string;
  visits: string;
  cardOnFile: string;
  treatment: string;
  treatmentAddon: string;
  specialist: string;
  suite: string;
  schedule: string;
  duration: string;
  fee: string;
  deposit: string;
  depositSecured: boolean;
  status: BookingStatus;
  smsStatus: string;
  smsDetail: string;
  notes: string;
  date: string;
  startTimeMinutes: number; // minutes from 8:00 AM (0 to 600)
  durationMinutes: number;
  providerId: 'sterling' | 'vance' | 'jenkins' | 'dubois';
  avatarBg?: string;
}

export interface BranchFeeOverride {
  name: string;
  fee: string;
}

export interface DepletedConsumable {
  name: string;
  price: string;
}

export interface ProcedureProtocol {
  id: string;
  title: string;
  cpt: string;
  modality: string;
  category: ProcedureCategory;
  fee: string;
  duration: string;
  prepTime: string;
  downtime: string;
  eligibility: string;
  credentialNote: string;
  status: 'active' | 'draft' | 'archived';
  branches: BranchFeeOverride[];
  consumablesCount: number;
  consumablesCogs: string;
  consumables: DepletedConsumable[];
  safeguards: string[];
  proceduresCountMonthly?: number;
  volumeShare?: string;
}

export type InventoryCategory =
  | 'Neurotoxin'
  | 'Dermal Filler'
  | 'Clinical Disposable'
  | 'Post-Care RX'
  | 'Topical Anesthetic'
  | 'Skincare';

export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: InventoryCategory;
  lotNumber: string;
  unitPkg: string;
  currentStock: number;
  minThreshold: number;
  stockStatus: StockStatus;
  unitCost: number;
  supplier: string;
  supplierContract: string;
  storageLocation: string;
  coldChainRequired: boolean;
  tempRange?: string;
  unitsDispensedMonthly?: number;
}

export interface StockAdjustmentEntry {
  sku: string;
  productName: string;
  previousCount: number;
  newCount: number;
  reason: string;
  note?: string;
  verifiedBy: string;
  timestamp: string;
}
