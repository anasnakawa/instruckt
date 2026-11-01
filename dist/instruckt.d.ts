type AnnotationIntent = 'fix' | 'change' | 'question' | 'approve';
type AnnotationSeverity = 'blocking' | 'important' | 'suggestion';
type AnnotationStatus = 'pending' | 'resolved' | 'dismissed';
interface SourceFrame {
    filePath: string;
    lineNumber: number | null;
    columnNumber: number | null;
    componentName: string | null;
}
interface FrameworkContext {
    framework: 'livewire' | 'vue' | 'svelte' | 'react' | 'blade';
    component: string;
    data?: Record<string, unknown>;
    source_file?: string;
    source_line?: number;
    source_column?: number;
    component_stack?: SourceFrame[];
    wire_id?: string;
    class_name?: string;
    render_line?: number;
    component_uid?: string;
}
interface BoundingBox {
    x: number;
    y: number;
    width: number;
    height: number;
}
interface Annotation {
    id: string;
    url: string;
    x: number;
    y: number;
    comment: string;
    element: string;
    elementPath: string;
    cssClasses: string;
    boundingBox: BoundingBox;
    selectedText?: string;
    nearbyText?: string;
    screenshot?: string;
    intent: AnnotationIntent;
    severity: AnnotationSeverity;
    status: AnnotationStatus;
    framework?: FrameworkContext;
    createdAt: string;
    updatedAt?: string;
    resolvedAt?: string;
    resolvedBy?: 'human' | 'agent';
}
interface MarkerColors {
    /** Default marker color. Default: '#6366f1' (indigo) */
    default?: string;
    /** Screenshot marker color. Default: '#22c55e' (green) */
    screenshot?: string;
    /** Dismissed marker color. Default: '#71717a' */
    dismissed?: string;
}
interface KeyBindings {
    /** Toggle annotate mode. Default: 'a' */
    annotate?: string;
    /** Toggle the list of all notes. Default: 'l' */
    list?: string;
    /** Region screenshot. Default: 'c' */
    screenshot?: string;
    /** Clear page annotations. Default: 'x' */
    clearPage?: string;
}
/** Set to false to hide a built-in toolbar tool. Omit or true to show. */
interface ToolsConfig {
    annotate?: boolean;
    screenshot?: boolean;
    list?: boolean;
    copy?: boolean;
    copy_clear?: boolean;
    clear_page?: boolean;
    clear_all?: boolean;
    minimize?: boolean;
}
interface InstrucktConfig {
    /** URL to POST annotations to. Default: '/instruckt' */
    endpoint: string;
    /** Framework adapters to activate. Default: auto-detect */
    adapters?: Array<'livewire' | 'vue' | 'svelte' | 'react' | 'blade'>;
    /** Theme preference. Default: 'auto' */
    theme?: 'light' | 'dark' | 'auto';
    /** Position of the toolbar. Default: 'bottom-right' */
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    /** Customize marker pin colors */
    colors?: MarkerColors;
    /** Customize keyboard shortcuts */
    keys?: KeyBindings;
    /** Show or hide built-in toolbar tools. Set to false to hide. Default: all true. */
    tools?: ToolsConfig;
    /** Path prefix for screenshots in markdown export. Default: 'storage/app/_instruckt/' */
    screenshotPath?: string;
    /** Whether MCP tools (get_screenshot, resolve) are available. Default: false */
    mcp?: boolean;
    /** Copy all open notes to the clipboard after each new note. Default: true */
    autoCopy?: boolean;
    /** Poll the backend every 3 seconds while notes are open (to see notes an agent resolved). Default: true */
    poll?: boolean;
    /**
     * Keep notes in localStorage / IndexedDB and make local-only notes when the backend fails. Default: true.
     * When false the backend is the only store: a note that fails to save keeps its popup open with an
     * error, and a failed first load shows the toolbar in an error state.
     */
    localFallback?: boolean;
    /** A text button on the toolbar and next to the round button: label and the number of open notes. Goes to href. */
    doneAction?: DoneAction;
    /** Start minimized (true) or open (false). Default: the last choice, else minimized on a small screen */
    startMinimized?: boolean;
    /** Called when a backend call fails */
    onError?: (op: 'load' | 'add' | 'update', err: unknown) => void;
    /** Callbacks */
    onAnnotationAdd?: (annotation: Annotation) => void;
    onAnnotationResolve?: (annotation: Annotation) => void;
}
interface DoneAction {
    /** Button text, e.g. 'Review and send'. The count of open notes is added: 'Review and send (3)' */
    label: string;
    /** Where the button goes (normal navigation) */
    href: string;
    /** Tooltip and accessible name. Default: label */
    title?: string;
}

type AnnotationPayload = Omit<Annotation, 'id' | 'status' | 'thread' | 'createdAt'>;

declare class Instruckt {
    private config;
    private api;
    private toolbar;
    private highlight;
    private popup;
    private markers;
    private listPanel;
    private touchAim;
    /** The kind of pointer behind the last press; a touch tap aims before it opens a note */
    private lastPointerType;
    private annotations;
    private isAnnotating;
    private rafId;
    private pendingMouseTarget;
    private highlightLocked;
    private pollTimer;
    private initialLoadDone;
    private hasBackend;
    private boundKeydown;
    private boundReposition;
    constructor(config: InstrucktConfig);
    private init;
    private makeTouchAim;
    private makeToolbarCallbacks;
    private toolbarOptions;
    /** Whether notes may live in the browser (localStorage / IndexedDB, local-only notes) */
    private get local();
    private makeListPanel;
    private setListOpen;
    /** Bring an annotation into view: scroll to it on this page, or open its page. */
    private goTo;
    private reattach;
    private onMinimize;
    private static get STORAGE_KEY();
    private loadAnnotations;
    private saveToStorage;
    private loadFromStorage;
    private static readonly IDB_NAME;
    private static readonly IDB_STORE;
    private openIdb;
    private saveScreenshotsToIdb;
    private loadScreenshotsFromIdb;
    /** Start or stop polling based on whether there are active annotations */
    private updatePolling;
    /** Poll API for status changes (e.g. agent resolved via MCP) */
    private pollForChanges;
    private syncMarkers;
    private annotationPageKey;
    private pageAnnotations;
    private activeAnnotations;
    private totalActiveCount;
    private setAnnotating;
    private boundMouseMove;
    private boundMouseLeave;
    /** Block mousedown/pointerdown in annotation mode so SPA frameworks can't navigate */
    private boundAnnotateBlock;
    private boundClick;
    private openNoteFor;
    private showAnnotationPopup;
    private attachAnnotateListeners;
    private detachAnnotateListeners;
    private isInstruckt;
    private startRegionCapture;
    /**
     * Use element-source as the primary resolver for React/Vue/Svelte,
     * then layer our adapters on top for props/state/framework-specific metadata.
     * Livewire and Blade are handled by our adapters only (element-source doesn't support them).
     */
    private detectFramework;
    /** Save a new note; false when it was not saved (only with localFallback off) */
    private submitAnnotation;
    private onMarkerClick;
    private saveComment;
    private onAnnotationUpdated;
    /** Dismiss on the backend (best effort) and drop locally. */
    private deleteAnnotations;
    private clearPage;
    private clearEverything;
    /** Copy every open annotation, and clear them only if the copy worked. */
    private copyAndClear;
    private onKeydown;
    /** Copy annotations as markdown. With fallback=true, uses execCommand for non-secure contexts (user-initiated only). */
    private copyAnnotations;
    exportMarkdown(list?: Annotation[]): string;
    getAnnotations(): Annotation[];
    /** Load the notes from the backend again, e.g. after the host app changed them elsewhere. No timer: call it when needed. */
    reload(): Promise<void>;
    /** Tell the toolbar the page changed without a reload (client-side routing that fires no popstate): shows this page's markers */
    pageChanged(): void;
    destroy(): void;
}

/**
 * Initialize instruckt.
 *
 * @example
 * instruckt.init({ endpoint: '/instruckt' })
 *
 * @example CDN
 * <script src="instruckt.iife.js"></script>
 * <script>Instruckt.init({ endpoint: '/instruckt' })</script>
 */
declare function init(config: InstrucktConfig): Instruckt;

export { type Annotation, type AnnotationIntent, type AnnotationPayload, type AnnotationSeverity, type AnnotationStatus, type DoneAction, type FrameworkContext, Instruckt, type InstrucktConfig, type SourceFrame, init };
