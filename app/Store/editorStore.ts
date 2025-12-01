// import { create } from "zustand";

// export type Transform = {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
//   rotation?: number;
//   opacity?: number;
//   zIndex?: number;
// };

// export type Border = {
//   stroke?: string;
//   strokeWidth?: number;
//   BorderborderRadius?: number;
// };

// export type Shadow = {
//   offsetX?: number;
//   offsetY?: number;
//   Shadowblur?: number;
//   color?: string;
// };

// export type TextData = Transform & Border & Shadow & {

//   type: "text";

//   text: string;
//   fontSize?: number;
//   fontFamily?: string;
//   fontWeight?: number | string;
//   textcolor?: string;

//   textAlign?: "left" | "center" | "right";
//   textColor?: string;
//   textTransform?: string;
//   textDecorationLine?: string;

//   isDragging?: boolean;

//   align?: "left" | "center" | "right";
//   lineHeight?: number;
//   letterSpacing?: number;

//   textDecoration?: "underline" | "line-through" | "none";
//   fontStyle?: "normal" | "italic";

//   animation?: {
//     in: {
//       type: "None" | "Fade" | "Zoom" | "Slide" | "Rotate" | "Custom";
//       duration: number;
//       slideDistanceX?: number;
//       slideDistanceY?: number;
//       degrees?: number;
//     };
//     out: {
//       type: "None" | "Fade" | "Zoom" | "Slide" | "Rotate" | "Custom";
//       duration: number;
//       slideDistanceX?: number;
//       slideDistanceY?: number;
//       degrees?: number;
//     };
//   };
// };


// export type ImageData = Transform & Border & Shadow & {
//   type: "image";

//   src: string;
//   alt?: string;

//   fit?: "cover" | "contain";

//   maxWidth?: number;
//   maxHeight?: number;
//   objectFit?: string;

//   /** Filters */
//   contrast?: number;
//   hueRotate?: number;
//   saturate?: number;
//   blur?: number;
//   grayscale?: number;
//   sepia?: number;
//   brightness?: number;
//   borderRadius?: string;
//   transform?: string;
//   isDragging?: boolean;
//   animationType?: string;

//   animation?: {
//     in: {
//       type: "None" | "Fade" | "Zoom" | "Slide" | "Rotate" | "Custom";
//       duration: number;
//       slideDistanceX?: number;
//       slideDistanceY?: number;
//       degrees?: number;
//     };
//     out: {
//       type: "None" | "Fade" | "Zoom" | "Slide" | "Rotate" | "Custom";
//       duration: number;
//       slideDistanceX?: number;
//       slideDistanceY?: number;
//       degrees?: number;
//     };
//   };
// };



// export type ShapeData = Transform & Border & Shadow & {
//   type: "shape";
//   shape: "rect" | "circle" | "triangle";
//   fill: string;
// };

// export type SVGData = Transform & Shadow & {
//   type: "svg";
//   svg: string;
//   fill?: string;
// };

// export type ElementData = TextData | ImageData | ShapeData | SVGData;

// export type ElementType = {
//   id: string;
//   data: ElementData;
// };



// export type SlideType = {
//   id: string;
//   elements: ElementType[];
//   background?: string;
// };
// export type SlideTemplate = {
//   background?: string;
//   elements: {
//     id: string;
//     data: ElementData;
//   }[];
// };

// interface EditorStore {
//   slides: SlideType[];
//   activeSlide: number;
//   applyFullTemplate: (slides: SlideType[]) => void;

//   // new right panel state
//   activeRightPanel: string | null;
//   setActiveRightPanel: (p: string | null) => void;


//   activeElementId: string | null;
//   setActiveElementId: (id: string | null) => void;


//   addSlide: () => void;
//   addElement: (el: ElementData) => void;
//   updateElement: (elementId: string, patch: Partial<ElementData>) => void;
//   setActiveSlide: (index: number) => void;


//   deleteSlide: (slideId: string) => void;
//   deleteElement: (elementId: string) => void;
// }

// const useEditorStore = create<EditorStore>((set) => ({
//   slides: [{ id: "1", elements: [] }],
//   activeSlide: 0,


//   activeElementId: null,
//   setActiveElementId: (id) => set({ activeElementId: id }),


//   activeRightPanel: null,
//   setActiveRightPanel: (p) => set({ activeRightPanel: p }),


//   addSlide: () =>
//     set((state) => ({
//       slides: [...state.slides, { id: Date.now().toString(), elements: [] }],
//     })),

//   addElement: (el) =>
//     set((state) => {
//       const s = [...state.slides];
//       s[state.activeSlide].elements.push({
//         id: Date.now().toString(),
//         data: el,
//       });
//       return { slides: s };
//     }),

//   updateElement: (elementId, patch) =>
//     set((state) => {
//       const s = [...state.slides];
//       const slide = s[state.activeSlide];
//       slide.elements = slide.elements.map((el) =>
//         el.id === elementId
//           ? { ...el, data: { ...el.data, ...patch } as ElementData }
//           : el
//       );
//       console.log("Updated element:", elementId, patch);
//       return { slides: s };
//     }),

//   setActiveSlide: (index) => set({ activeSlide: index }),

//   applyFullTemplate: (templateSlides: SlideType[]) =>
//     set(() => {
//       const newSlides = templateSlides.map((sl) => ({
//         id: Date.now().toString() + Math.random(),
//         background: sl.background,
//         elements: sl.elements.map((el) => ({
//           id: Date.now().toString() + Math.random(),
//           data: JSON.parse(JSON.stringify(el.data)) // deep clone FIX
//         }))
//       }));

//       return {
//         slides: newSlides,
//         activeSlide: 0,
//         activeElementId: null
//       };
//     }),

//   deleteSlide: (slideId: string) =>
//     set((state) => {
//       let slides = state.slides.filter((s) => s.id !== slideId);

//       if (slides.length === 0) {
//         slides = [{ id: Date.now().toString(), elements: [] }];
//       }

//       return {
//         slides,
//         activeSlide: 0,
//         activeElementId: null,
//       };
//     }),

//   deleteElement: (elementId: string) =>
//     set((state) => {
//       const slides = [...state.slides];
//       const slide = slides[state.activeSlide];
//       slide.elements = slide.elements.filter((el) => el.id !== elementId);

//       return {
//         slides,
//         activeElementId: null,
//       };
//     }),

// }));

// export default useEditorStore;
import { create } from "zustand";
export type Transform = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  opacity?: number;
  zIndex?: number;
};

export type Border = {
  stroke?: string;
  strokeWidth?: number;
  BorderborderRadius?: number;
};

export type Shadow = {
  offsetX?: number;
  offsetY?: number;
  Shadowblur?: number;
  color?: string;
};

export type TextData = Transform & Border & Shadow & {

  type: "text";

  text: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: number | string;
  textcolor?: string;

  textAlign?: "left" | "center" | "right";
  textColor?: string;
  textTransform?: string;
  textDecorationLine?: string;

  isDragging?: boolean;

  align?: "left" | "center" | "right";
  lineHeight?: number;
  letterSpacing?: number;

  textDecoration?: "underline" | "line-through" | "none";
  fontStyle?: "normal" | "italic";

  animation?: {
    in: {
      type: "None" | "Fade" | "Zoom" | "Slide" | "Rotate" | "Custom";
      duration: number;
      slideDistanceX?: number;
      slideDistanceY?: number;
      degrees?: number;
    };
    out: {
      type: "None" | "Fade" | "Zoom" | "Slide" | "Rotate" | "Custom";
      duration: number;
      slideDistanceX?: number;
      slideDistanceY?: number;
      degrees?: number;
    };
  };
};


export type ImageData = Transform & Border & Shadow & {
  type: "image";

  src: string;
  alt?: string;

  fit?: "cover" | "contain";

  maxWidth?: number;
  maxHeight?: number;
  objectFit?: string;

  /** Filters */
  contrast?: number;
  hueRotate?: number;
  saturate?: number;
  blur?: number;
  grayscale?: number;
  sepia?: number;
  brightness?: number;
  borderRadius?: string;
  transform?: string;
  isDragging?: boolean;
  animationType?: string;

  animation?: {
    in: {
      type: "None" | "Fade" | "Zoom" | "Slide" | "Rotate" | "Custom";
      duration: number;
      slideDistanceX?: number;
      slideDistanceY?: number;
      degrees?: number;
    };
    out: {
      type: "None" | "Fade" | "Zoom" | "Slide" | "Rotate" | "Custom";
      duration: number;
      slideDistanceX?: number;
      slideDistanceY?: number;
      degrees?: number;
    };
  };
};



export type ShapeData = Transform & Border & Shadow & {
  type: "shape";
  shape: "rect" | "circle" | "triangle";
  fill: string;
};

export type SVGData = Transform & Shadow & {
  type: "svg";
  svg: string;
  fill?: string;
};

export type ElementData = TextData | ImageData | ShapeData | SVGData;

export type ElementType = {
  id: string;
  data: ElementData;
};



export type SlideType = {
  id: string;
  height?: 600;
  width?: 1000;
  elements: ElementType[];
  background?: string;
};
export type SlideTemplate = {
  background?: string;
  elements: {
    id: string;
    data: ElementData;
  }[];
}


interface EditorStore {
  slides: SlideType[];
  activeSlide: number;
  activeElementId: string | null;
  activeRightPanel: string | null;

  past: SlideType[][];
  future: SlideType[][];

  undo: () => void;
  redo: () => void;

  pushToHistory: () => void;

  addSlide: () => void;
  deleteSlide: (slideId: string) => void;

  addElement: (el: ElementData) => void;
  updateElement: (elementId: string, patch: Partial<ElementData>) => void;
  deleteElement: (elementId: string) => void;

  setActiveSlide: (index: number) => void;
  setActiveElementId: (id: string | null) => void;
  setActiveRightPanel: (p: string | null) => void;

  applyFullTemplate: (slides: SlideType[]) => void;
}

/* ---------------------------- STORE ---------------------------- */

const useEditorStore = create<EditorStore>((set, get) => ({
  slides: [{ id: "1", elements: [] }],
  activeSlide: 0,
  activeElementId: null,
  activeRightPanel: null,

  past: [],
  future: [],

  /* ------------------- HISTORY SYSTEM ------------------- */
  pushToHistory: () => {
    const { slides } = get();
    set((state) => ({
      past: [...state.past, JSON.parse(JSON.stringify(slides))],
      future: [],
    }));
  },

  undo: () => {
    set((state) => {
      if (state.past.length === 0) return state;

      const previous = state.past[state.past.length - 1];
      const newPast = state.past.slice(0, -1);

      return {
        slides: JSON.parse(JSON.stringify(previous)),
        past: newPast,
        future: [
          JSON.parse(JSON.stringify(state.slides)),
          ...state.future,
        ],
      };
    });
  },

  redo: () => {
    set((state) => {
      if (state.future.length === 0) return state;

      const next = state.future[0];
      const newFuture = state.future.slice(1);

      return {
        slides: JSON.parse(JSON.stringify(next)),
        future: newFuture,
        past: [
          ...state.past,
          JSON.parse(JSON.stringify(state.slides)),
        ],
      };
    });
  },

  /* ------------------- SLIDE OPS ------------------- */
  addSlide: () => {
    get().pushToHistory();
    set((state) => ({
      slides: [
        ...state.slides,
        { id: Date.now().toString(), elements: [] },
      ],
    }));
  },

  deleteSlide: (slideId) => {
    get().pushToHistory();
    set((state) => {
      const newSlides = state.slides.filter((s) => s.id !== slideId);

      return {
        slides: newSlides.length ? newSlides : [{ id: "1", elements: [] }],
        activeSlide: 0,
        activeElementId: null,
      };
    });
  },

  /* ------------------- ELEMENT OPS ------------------- */
  addElement: (el) => {
    get().pushToHistory();
    set((state) => {
      const slides = [...state.slides];
      slides[state.activeSlide].elements.push({
        id: Date.now().toString(),
        data: el,
      });
      return { slides };
    });
  },

  updateElement: (elementId, patch) => {
    get().pushToHistory();

    set((state) => {
      const slides = JSON.parse(JSON.stringify(state.slides));
      const slide = slides[state.activeSlide];

      slide.elements = slide.elements.map((el:ElementType) =>
        el.id === elementId
          ? {
              ...el,
              data: { ...el.data, ...patch } as ElementData,
            }
          : el
      );

      return { slides };
    });
  },

  deleteElement: (elementId) => {
    get().pushToHistory();
    set((state) => {
      const slides = JSON.parse(JSON.stringify(state.slides));
      const slide = slides[state.activeSlide];

      slide.elements = slide.elements.filter((el:ElementType) => el.id !== elementId);

      return {
        slides,
        activeElementId: null,
      };
    });
  },

  /* ------------------- SETTERS ------------------- */
  setActiveSlide: (index) => set({ activeSlide: index }),
  setActiveElementId: (id) => set({ activeElementId: id }),
  setActiveRightPanel: (p) => set({ activeRightPanel: p }),

  /* ------------------- TEMPLATE ------------------- */
  applyFullTemplate: (templateSlides) =>
    set(() => ({
      slides: templateSlides.map((sl) => ({
        id: Date.now().toString(),
        background: sl.background,
        elements: sl.elements.map((el) => ({
          id: Date.now().toString(),
          data: JSON.parse(JSON.stringify(el.data)),
        })),
      })),
      activeSlide: 0,
      activeElementId: null,
    })),
}));

export default useEditorStore;
