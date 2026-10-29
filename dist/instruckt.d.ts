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
    /** Callbacks */
    onAnnotationAdd?: (annotation: Annotation) => void;
    onAnnotationResolve?: (annotation: Annotation) => void;
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
    private makeToolbarCallbacks;
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

export { type Annotation, type AnnotationIntent, type AnnotationPayload, type AnnotationSeverity, type AnnotationStatus, type FrameworkContext, Instruckt, type InstrucktConfig, type SourceFrame, init };
