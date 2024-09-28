import { create } from 'zustand';

//* STATE
interface State {
  isSearchOpen: boolean | null;
  isSideMenuOpen: boolean | null;
  sideMenuContent: string | null;
  isStoreDirection: boolean;



  // Definición de estado y funciones para gestionar el estado
  openSideMenu: (options?: { isSideMenuOpen?: boolean; content?: string }) => void;
  closeSideMenu: () => void;
  // * store direction
  toogleSideStore: () => void;
  // breadCrumb
}

// * MUTATION STATE
export const useUIStore = create<State>((set, get) => {
  let prevSideMenuContent: string | null = null;

  return {
    isSearchOpen: null,
    isSideMenuOpen: null,
    sideMenuContent: null,
    isStoreDirection: false,
    breadcrumbs: [],


    openSideMenu: ({ isSideMenuOpen = true, content = '' } = {}) => {
      prevSideMenuContent = content; // Almacena el valor previo antes de abrir el Side Menu
      set({ isSideMenuOpen, sideMenuContent: content });
    },

    closeSideMenu: () => {
      // Configura el estado para cerrar el Side Menu y restaurar el valor previo
      set({ isSideMenuOpen: false, sideMenuContent: prevSideMenuContent });
      prevSideMenuContent = null; // Restablece el valor previo después de cerrar el Side Menu
    },
    // * store direction
    toogleSideStore: () => {
      set((state) => ({ isStoreDirection: !state.isStoreDirection }));
    },
    // * store open Search
    toogleOpenSearch: () => {
      set((state) => ({ isSearchOpen: !state.isSearchOpen }));
    },

  };

});