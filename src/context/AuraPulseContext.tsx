import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  NavigationTab,
  PatientRecord,
  BookingRecord,
  ProcedureProtocol,
  InventoryItem,
  StockAdjustmentEntry,
} from '../types';
import {
  INITIAL_PATIENTS,
  INITIAL_BOOKINGS,
  INITIAL_PROCEDURES,
  INITIAL_INVENTORY,
} from '../data/mockData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AuraPulseContextType {
  currentTab: NavigationTab;
  setCurrentTab: (tab: NavigationTab) => void;
  currentBranch: string;
  setCurrentBranch: (branch: string) => void;

  patients: PatientRecord[];
  addPatient: (patient: Omit<PatientRecord, 'id' | 'mrn'>) => void;
  updatePatient: (id: string, updates: Partial<PatientRecord>) => void;

  bookings: Record<string, BookingRecord>;
  checkInBooking: (bookingId: string) => void;
  cancelBooking: (bookingId: string) => void;
  rescheduleBooking: (bookingId: string, newTime: string) => void;
  addBooking: (booking: Omit<BookingRecord, 'id' | 'bookingNumber'>) => void;

  procedures: Record<string, ProcedureProtocol>;
  updateProcedure: (id: string, updates: Partial<ProcedureProtocol>) => void;
  addProcedure: (proc: ProcedureProtocol) => void;

  inventory: InventoryItem[];
  stockAdjustments: StockAdjustmentEntry[];
  adjustStock: (
    sku: string,
    newCount: number,
    reason: string,
    note?: string,
    supervisor?: string
  ) => void;
  addInventoryItem: (item: Omit<InventoryItem, 'id'>) => void;

  // Drawers
  activeBookingDrawerId: string | null;
  openBookingDrawer: (id: string) => void;
  closeBookingDrawer: () => void;

  activeProcedureDrawerId: string | null;
  openProcedureDrawer: (id: string) => void;
  closeProcedureDrawer: () => void;

  activeStockDrawerItem: InventoryItem | null;
  openStockDrawer: (item: InventoryItem) => void;
  closeStockDrawer: () => void;

  // Modals
  isNewPatientModalOpen: boolean;
  setIsNewPatientModalOpen: (open: boolean) => void;
  isNewBookingModalOpen: boolean;
  setIsNewBookingModalOpen: (open: boolean) => void;
  isNewTreatmentModalOpen: boolean;
  setIsNewTreatmentModalOpen: (open: boolean) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;

  // Global Toast
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  dismissToast: (id: string) => void;
}

const AuraPulseContext = createContext<AuraPulseContextType | undefined>(undefined);

export const AuraPulseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('patients');
  const [currentBranch, setCurrentBranch] = useState<string>('Main Clinic - Branch A');

  // Patients state
  const [patients, setPatients] = useState<PatientRecord[]>(() => {
    const saved = localStorage.getItem('aurapulse_patients');
    return saved ? JSON.parse(saved) : INITIAL_PATIENTS;
  });

  // Bookings state
  const [bookings, setBookings] = useState<Record<string, BookingRecord>>(() => {
    const saved = localStorage.getItem('aurapulse_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  // Procedures state
  const [procedures, setProcedures] = useState<Record<string, ProcedureProtocol>>(() => {
    const saved = localStorage.getItem('aurapulse_procedures');
    return saved ? JSON.parse(saved) : INITIAL_PROCEDURES;
  });

  // Inventory state
  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem('aurapulse_inventory');
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });

  const [stockAdjustments, setStockAdjustments] = useState<StockAdjustmentEntry[]>(() => {
    const saved = localStorage.getItem('aurapulse_stock_adj');
    return saved ? JSON.parse(saved) : [];
  });

  // Drawers
  const [activeBookingDrawerId, setActiveBookingDrawerId] = useState<string | null>(null);
  const [activeProcedureDrawerId, setActiveProcedureDrawerId] = useState<string | null>(null);
  const [activeStockDrawerItem, setActiveStockDrawerItem] = useState<InventoryItem | null>(null);

  // Modals
  const [isNewPatientModalOpen, setIsNewPatientModalOpen] = useState(false);
  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState(false);
  const [isNewTreatmentModalOpen, setIsNewTreatmentModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('aurapulse_patients', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem('aurapulse_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('aurapulse_procedures', JSON.stringify(procedures));
  }, [procedures]);

  useEffect(() => {
    localStorage.setItem('aurapulse_inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('aurapulse_stock_adj', JSON.stringify(stockAdjustments));
  }, [stockAdjustments]);

  // Global hotkey: ⌘K or Ctrl+K for command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setActiveBookingDrawerId(null);
        setActiveProcedureDrawerId(null);
        setActiveStockDrawerItem(null);
        setIsNewPatientModalOpen(false);
        setIsNewBookingModalOpen(false);
        setIsNewTreatmentModalOpen(false);
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (
    message: string,
    type: 'success' | 'info' | 'warning' | 'error' = 'success'
  ) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addPatient = (newP: Omit<PatientRecord, 'id' | 'mrn'>) => {
    const id = `p${Date.now()}`;
    const mrn = `MRN-${Math.floor(10000 + Math.random() * 90000)}`;
    const created: PatientRecord = {
      ...newP,
      id,
      mrn,
    };
    setPatients((prev) => [created, ...prev]);
    showToast(`Patient ${created.name} registered successfully with #${created.mrn}`);
  };

  const updatePatient = (id: string, updates: Partial<PatientRecord>) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Patient record updated');
  };

  const checkInBooking = (bookingId: string) => {
    setBookings((prev) => {
      const b = prev[bookingId];
      if (!b) return prev;
      return {
        ...prev,
        [bookingId]: {
          ...b,
          status: 'checked-in',
          smsStatus: `Checked-In at Reception ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          smsDetail: 'Patient welcomed and relaxing in VIP clinical lounge',
        },
      };
    });
    showToast('Patient successfully checked in! Treatment suite notified.');
  };

  const cancelBooking = (bookingId: string) => {
    setBookings((prev) => {
      const b = prev[bookingId];
      if (!b) return prev;
      return {
        ...prev,
        [bookingId]: {
          ...b,
          status: 'conflict',
          smsStatus: 'Appointment Cancelled',
          smsDetail: 'Cancelled by staff; slot marked open for rescheduling',
        },
      };
    });
    showToast('Booking cancelled & slot released.', 'warning');
    setActiveBookingDrawerId(null);
  };

  const rescheduleBooking = (bookingId: string, newTime: string) => {
    setBookings((prev) => {
      const b = prev[bookingId];
      if (!b) return prev;
      return {
        ...prev,
        [bookingId]: {
          ...b,
          schedule: newTime,
          smsStatus: 'Reschedule Confirmation Sent',
          smsDetail: `Patient notified via two-way SMS for ${newTime}`,
        },
      };
    });
    showToast(`Appointment rescheduled to ${newTime}`);
  };

  const addBooking = (newB: Omit<BookingRecord, 'id' | 'bookingNumber'>) => {
    const id = `${Math.floor(1050 + Math.random() * 900)}`;
    const bookingNumber = `BOOKING #${id}`;
    const created: BookingRecord = {
      ...newB,
      id,
      bookingNumber,
    };
    setBookings((prev) => ({
      [id]: created,
      ...prev,
    }));
    showToast(`New appointment ${bookingNumber} booked for ${created.patientName}`);
  };

  const updateProcedure = (id: string, updates: Partial<ProcedureProtocol>) => {
    setProcedures((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: { ...prev[id], ...updates },
      };
    });
    showToast(`Protocol #${id} saved & synced across 3 branch EHRs`);
  };

  const addProcedure = (proc: ProcedureProtocol) => {
    setProcedures((prev) => ({
      ...prev,
      [proc.id]: proc,
    }));
    showToast(`Protocol ${proc.id} - ${proc.title} added to clinical catalog`);
  };

  const adjustStock = (
    sku: string,
    newCount: number,
    reason: string,
    note?: string,
    supervisor: string = 'Dr. Claire Sterling, MD'
  ) => {
    let itemTitle = sku;
    setInventory((prev) =>
      prev.map((item) => {
        if (item.sku === sku) {
          itemTitle = item.name;
          const prevCount = item.currentStock;
          const diff = newCount - prevCount;
          const stockStatus =
            newCount === 0
              ? 'out-of-stock'
              : newCount < item.minThreshold
              ? 'low-stock'
              : 'in-stock';
          return {
            ...item,
            currentStock: newCount,
            stockStatus,
          };
        }
        return item;
      })
    );

    const adjustment: StockAdjustmentEntry = {
      sku,
      productName: itemTitle,
      previousCount: inventory.find((i) => i.sku === sku)?.currentStock || 0,
      newCount,
      reason,
      note,
      verifiedBy: supervisor,
      timestamp: new Date().toISOString(),
    };

    setStockAdjustments((prev) => [adjustment, ...prev]);
    showToast(
      `Inventory adjusted for ${itemTitle}: ${newCount} units on hand. Audit logged.`
    );
    setActiveStockDrawerItem(null);
  };

  const addInventoryItem = (item: Omit<InventoryItem, 'id'>) => {
    const id = `inv-${Date.now()}`;
    const created: InventoryItem = {
      ...item,
      id,
    };
    setInventory((prev) => [created, ...prev]);
    showToast(`Product ${created.name} added to inventory`);
  };

  const openBookingDrawer = (id: string) => {
    setActiveBookingDrawerId(id);
    setActiveProcedureDrawerId(null);
    setActiveStockDrawerItem(null);
  };

  const closeBookingDrawer = () => {
    setActiveBookingDrawerId(null);
  };

  const openProcedureDrawer = (id: string) => {
    setActiveProcedureDrawerId(id);
    setActiveBookingDrawerId(null);
    setActiveStockDrawerItem(null);
  };

  const closeProcedureDrawer = () => {
    setActiveProcedureDrawerId(null);
  };

  const openStockDrawer = (item: InventoryItem) => {
    setActiveStockDrawerItem(item);
    setActiveBookingDrawerId(null);
    setActiveProcedureDrawerId(null);
  };

  const closeStockDrawer = () => {
    setActiveStockDrawerItem(null);
  };

  return (
    <AuraPulseContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        currentBranch,
        setCurrentBranch,

        patients,
        addPatient,
        updatePatient,

        bookings,
        checkInBooking,
        cancelBooking,
        rescheduleBooking,
        addBooking,

        procedures,
        updateProcedure,
        addProcedure,

        inventory,
        stockAdjustments,
        adjustStock,
        addInventoryItem,

        activeBookingDrawerId,
        openBookingDrawer,
        closeBookingDrawer,

        activeProcedureDrawerId,
        openProcedureDrawer,
        closeProcedureDrawer,

        activeStockDrawerItem,
        openStockDrawer,
        closeStockDrawer,

        isNewPatientModalOpen,
        setIsNewPatientModalOpen,
        isNewBookingModalOpen,
        setIsNewBookingModalOpen,
        isNewTreatmentModalOpen,
        setIsNewTreatmentModalOpen,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,

        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AuraPulseContext.Provider>
  );
};

export const useAuraPulse = () => {
  const context = useContext(AuraPulseContext);
  if (!context) {
    throw new Error('useAuraPulse must be used within an AuraPulseProvider');
  }
  return context;
};
