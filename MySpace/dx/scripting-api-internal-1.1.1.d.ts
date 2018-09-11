declare namespace CoBlocks {
    function suspend(action: __SuspendAction): Async;
    function delay(seconds: number): Async;
    function delayPhysics(seconds: number): Async;
    function terminate(): Async;
    /**
     * Run several asynchronous function simultaneously and wait until all of them complete.
     *
     * @param {actions} actions functions to run.
     */
    function parallel(actions: Array<() => Async>): Async;
    function fork(action: () => CoBlocks.Async): void;
    function input(props: __InputProps): __PropertyDecorator;
    function statementInput(): __PropertyDecorator;
    function fieldInput(props: __FieldInputProps): __PropertyDecorator;
    function variableField(): __PropertyDecorator;
    function enumField(entries: __EnumFieldProps): __PropertyDecorator;
    function statement(props: __BlockProps): __StatementDecorator;
    function expression(props: __ExpressionBlockProps): __ExpressionDecorator;
    function saveToString(): string;
    function loadFromString(data: string): void;
    const workspace: {
        saveToString(): string;
        loadFromString(data: string): void;
        onBlockAdded(listener: (block: Model.Block) => void): Disposable;
        onBlockRemoved(listener: (block: Model.Block) => void): Disposable;
        onFieldChanged(listener: (field: Model.FieldInput, oldValue: string) => void): Disposable;
        readonly script: Model.Script;
        createBlock(id: string): Model.Block;
        createFunctionCall(name: string): Model.FunctionCallBlock;
        filterActions(filters: Model.ActionFilters): Disposable;
        afterEvents(action: () => void): void;
        readonly debug: {
            enabled: boolean;
            visible: boolean;
        };
    };
    const runtime: {
        listen(listeners: __RuntimeListeners): Disposable;
    };
    interface __ItemProps {
        placeholder?: any;
        min?: number;
        max?: number;
    }
    interface __FieldInputProps extends __ItemProps {
        type: __FieldType;
    }
    interface __InputProps extends __ItemProps {
        type: __InputType;
        evaluated?: boolean;
    }
    type __FieldType = "int" | "number" | "angle" | "string" | "boolean" | "dx_base_item" | "dx_game_item" | "dx_group" | "dx_text_item" | "dx_physics_item" | "sound" | "image" | "scene" | "color";
    type __InputType = __FieldType | "vector3";
    interface __BlockProps {
        id: string;
        label: string | string[];
        searchLabels?: string | string[];
        category?: string;
        color?: string;
    }
    type __SimpleProps = {
        [s: string]: string;
    };
    type __PropsWithFlag = {
        items: {
            [s: string]: string;
        };
        searchable: boolean;
    };
    type __EnumFieldProps = __SimpleProps | __PropsWithFlag;
    interface __ExpressionBlockProps extends __BlockProps {
        type: Array<string> | string;
    }
    type __PropertyDecorator = (target: Object, propertyKey: string) => void;
    type __StatementDecorator = (target: (new () => Statement)) => void;
    type __ExpressionDecorator = (target: (new () => Expression<any>)) => void;
    interface Statement {
        run(): Async;
    }
    interface Expression<T> {
        evaluate(): T;
    }
    type Async = IterableIterator<null>;
    function getCategory(id: string): ToolboxCategory;
    function getRootCategory(): ToolboxCategory;
    function hideAllBlocks(): void;
    function setBlockVisible(blockId: string, visible: boolean): void;
    function addCategory(props: {
        id: string;
        title?: string;
        color?: string;
        icon?: string;
    }): ToolboxCategory;
    function removeCategory(id: string): void;
    function removeAllCategories(): void;
    namespace Model {
        const FunctionDefinition: new (name: string, parameters?: ParameterDefinition[]) => FunctionDefinition;
        const ParameterDefinition: new (name: string, type: TypeKind) => ParameterDefinition;
    }
}
declare namespace Loader {
    function register(name: string, dependencies: string[], definition: (...module: any[]) => any): void;
    function load(modulePath: string): void;
    function loadAll(): void;
}
declare namespace Cuboid {
    function create(xPos: number, yPos: number, zPos: number): Cuboid;
}
declare namespace Torus {
    function createTorus(xPos: number, yPos: number, zPos: number): Torus;
    function createSemiTorus(xPos: number, yPos: number, zPos: number): Torus;
}
declare namespace Ellipsoid {
    function createEllipsoid(xPos: number, yPos: number, zPos: number): Ellipsoid;
    function createHemiEllipsoid(xPos: number, yPos: number, zPos: number): Ellipsoid;
}
declare namespace Capsule {
    function create(xPos: number, yPos: number, zPos: number): Capsule;
}
declare namespace Application {
    type ViewMode = 'default' | 'gyro' | 'vr' | 'ar' | 'stereo';
}
interface Marker extends __PositionService {
    useForCamera: boolean;
    readonly tracked: boolean;
    onPositionChanged(handler: ((() => void))): void;
    onTrackingStateChanged(handler: (((arg0: boolean) => void))): void;
    attachToItem(item: BaseItem): void;
    itemsAlwaysVisible: boolean;
}
declare namespace AR {
    type MergeCubeSide = 'right' | 'left' | 'front' | 'back' | 'top' | 'bottom';
}
declare namespace AR {
    type RotationDirection = 'up' | 'down' | 'left' | 'right';
}
declare namespace CoBlocks {
    type __SuspendAction = (((continuation: ((() => void))) => void));
}
declare namespace CoBlocks {
    interface ToolboxCategory {
        readonly title: string;
        getId(): string;
        readonly id: string;
        addBlock(id: string): void;
        addBlocks(ids: Array<string>): void;
        removeBlock(id: string): void;
        getColor(): string;
        color: string;
        setColor(color: string): void;
        icon: string;
        getParent(): CoBlocks.ToolboxCategory;
        readonly parent: CoBlocks.ToolboxCategory;
        addSubcategory(id: string, title: string): CoBlocks.ToolboxCategory;
        addSubcategory(subcategory: CoBlocks.ToolboxCategory): void;
        addSubcategory(subcategory: CoBlocks.ToolboxCategory, index: number): void;
        isExpanded(): boolean;
        expanded: boolean;
        expand(): void;
        collapse(): void;
        contains(id: string): boolean;
        removeFromParent(): void;
        getAllSubcategories(): Array<CoBlocks.ToolboxCategory>;
        readonly allSubcategories: Array<CoBlocks.ToolboxCategory>;
        removeAllSubcategories(): void;
        hideAllSubcategories(): void;
        isVisible(): boolean;
        visible: boolean;
        setVisible(visible: boolean): void;
        isEffectivelyVisible(): boolean;
        readonly effectivelyVisible: boolean;
    }
}
interface Joystick {
    readonly position: Vector2;
    onButtonChanged(handler: ((() => void))): void;
    onButtonDown(handler: ((() => void))): void;
    onButtonUp(handler: ((() => void))): void;
    onButtonPressed(handler: ((() => void))): void;
}
declare type Side = 'left' | 'right';
interface PathTail {
    getColor(): string;
    setColor(color: string): void;
    getThickness(): number;
    setThickness(thickness: number): void;
    addFirst(x: number, y: number, z: number): void;
    addLast(x: number, y: number, z: number): void;
    updateFirst(x: number, y: number, z: number): void;
    updateLast(x: number, y: number, z: number): void;
    removeFirst(): void;
    removeLast(): void;
    removeAll(): void;
}
declare let AR: AR;
declare let Sound: __Sound;
declare let Web: __Web;
declare let Debug: __Debug;
declare let Settings: __Settings;
declare let Renderer: __Renderer;
declare let Environment: __Environment;
declare let ML: __ML;
declare let Input: __Input;
declare let RayCast: __RayCast;
declare let Application: __Application;
declare let Analytics: __Analytics;
declare let Multiplayer: __Multiplayer;
declare let GUI: __GUI;
declare let Physics: __Physics;
declare let Scene: __SceneService;
declare let Space: Space;
declare let Activity: __Activity;
declare let IDE: __IdeService;
declare let Assistant: Assistant;
declare let Time: __Time;
declare namespace CoBlocks {
    interface __RuntimeListeners {
        readonly blockStarted?: (((fiberId: number, index: number) => void));
        readonly blockEnded?: (((fiberId: number, index: number) => void));
        readonly fiberStopped?: (((fiberId: number) => void));
        readonly fiberSuspended?: (((fiberId: number) => void));
    }
}
interface Camera extends __PositionService {
    readonly focusedItem: AnimatedItem;
    getDirection(): Vector3;
    readonly direction: Vector3;
    setCameraVerticalLimits(min: number, max: number): void;
    setFocusCameraMaxDistance(d: number): void;
    setFocusCameraMoveToCameraDirection(b: boolean): void;
    setFocusCameraUpdateModelFromCamera(b: boolean): void;
    setFocusCameraUpdateCameraFromModel(b: boolean): void;
    setFocusCameraBodyTransformBlock(b: boolean): void;
    setFocusCameraTargetToCOM(b: boolean): void;
    setCameraCollisionMode(b: boolean): void;
    setJumpVelocity(v: number): void;
    setGravity(g: number): void;
    setCollideWithPhysics(b: boolean): void;
    addToCollisionFilter(item: BaseItem): void;
    removeFromCollisionFilter(item: BaseItem): void;
    setSlopeAngle(angle: number): void;
    setStayAngle(angle: number): void;
    setCollisionCapsuleHeight(height: number): void;
    setCollisionCapsuleRadius(radius: number): void;
    setMovementSpeed(speed: number): void;
    lockMousePointer(en: boolean): void;
    enableAim(en: boolean): void;
    setAimColor(color: string): void;
    setFov(fov: number): void;
}
interface IVector3 {
    readonly x: number;
    readonly y: number;
    readonly z: number;
}
interface Vector3Blockly extends IVector3 {
    readonly isGlobal: boolean;
}
declare namespace Multiplayer {
    interface Player {
        readonly id: string;
        readonly userName: string;
        readonly latency: number;
        readonly jitter: number;
        readonly email: string;
        readonly index: number;
        readonly team: number;
        readonly isHost: boolean;
        sendMessage(message: string): void;
    }
}
interface Constraint extends Disposable {
    tuneFreqDumpMass(f: number, d: number, m: number): void;
    setMaxForce(f: number): void;
}
interface CurveConstraint extends Constraint {
    setFriction(f: number): void;
}
interface DistanceConstraint extends Constraint {
    updateLocalPoints(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): void;
    updateDistance(dist: number): void;
    getDistance(): number;
    readonly distance: number;
    getUnitId1(): string;
    readonly unitId1: string;
    getUnitId2(): string;
    readonly unitId2: string;
}
interface GearConstraint extends Constraint {
}
interface HingeJointConstraint extends Constraint {
    getPosition(): Vector3;
    readonly position: Vector3;
    setLocalAnchor1(x: number, y: number, z: number): void;
    setLocalAnchor2(x: number, y: number, z: number): void;
    setLocalAxis1(x: number, y: number, z: number): void;
    setLocalAxis2(x: number, y: number, z: number): void;
    getAngle(): number;
    readonly angle: number;
    getLocalAnchor1(): Vector3;
    readonly localAnchor1: Vector3;
    getLocalAnchor2(): Vector3;
    readonly localAnchor2: Vector3;
    getLocalAxis1(): Vector3;
    readonly localAxis1: Vector3;
    getLocalAxis2(): Vector3;
    readonly localAxis2: Vector3;
    getUnitId1(): string;
    readonly unitId1: string;
    getUnitId2(): string;
    readonly unitId2: string;
}
interface JointConstraint extends Constraint {
    setClampingAngles(min: number, max: number): void;
    setAngularFriction(f: number): void;
    setLocalAnchor1(x: number, y: number, z: number): void;
    setLocalAnchor2(x: number, y: number, z: number): void;
    getLocalAnchor1(): Vector3;
    readonly localAnchor1: Vector3;
    getLocalAnchor2(): Vector3;
    readonly localAnchor2: Vector3;
    getUnitId1(): string;
    readonly unitId1: string;
    getUnitId2(): string;
    readonly unitId2: string;
}
interface MotorJointConstraint extends Constraint {
    setAngle(a: number): void;
    angle: number;
    getAngle(): number;
    rotateFromTo(fromAngle: number, toAngle: number, time: number, callback: ((() => void))): void;
    rotateLocal(angle: number, time: number, callback: ((() => void))): void;
    getPosition(): Vector3;
    readonly position: Vector3;
    getUnitId1(): string;
    readonly unitId1: string;
    getUnitId2(): string;
    readonly unitId2: string;
}
interface PlaneConstraint extends Constraint {
}
interface PositionConstraint extends Constraint {
    updateDesiredPosition(x: number, y: number, z: number): void;
    getUnitId(): string;
    readonly unitId: string;
    updateLocalPoint(x: number, y: number, z: number): void;
}
interface RotationAxisConstraint extends Constraint {
}
interface RotationConstraint extends Constraint {
}
interface SliderConstraint extends Constraint {
}
declare namespace Activity {
    interface __BuildMode {
        setInfoScenes(indexes: Array<number>): void;
        resetCompletedScenes(): void;
    }
}
interface __Activity {
    readonly BuildMode: Activity.__BuildMode;
    completeScene(index: number): void;
    setTaskText(text: string): void;
    setTaskImage(imageId: string): void;
    onPlayModeStarted(initFunction: ((() => void))): void;
}
interface __Analytics {
    sendTiming(options: Analytics.TimingOptions): void;
    actionPerformed(options: Analytics.ActionOptions): void;
    propertySet(name: string, value: string): void;
}
interface __Application {
    onModeChanged(handler: (((arg0: Application.ViewMode) => void))): void;
    startPlayMode(): void;
    finishPlayMode(): void;
    finishPlayMode(imageId: string): void;
    resetScene(): void;
    viewMode: Application.ViewMode;
    readonly isMobile: boolean;
    readonly isTablet: boolean;
    isViewModeSupported(mode: Application.ViewMode): boolean;
    readonly locale: string;
    onSceneExit(onExit: ((() => void))): void;
}
interface AR {
    getMarker(name: string): Marker;
    isMarkerTracked(name: string): boolean;
    sceneRotation: number;
    sceneScale: number;
    markerBased: boolean;
    readonly mergeCube: MergeCubeItem;
}
interface Assistant {
    listen(provider: string, onUtterance: (((data: Object) => void))): Disposable;
    listen(onUtterance: (((data: Object) => void))): Disposable;
}
interface Chart {
    buttonVisible: boolean;
    showChartButton(show: boolean): void;
    clear(): void;
    addPoint(x: number, y: number): void;
    setLineColor(r: number, g: number, b: number): void;
    lineColor: Color;
}
interface Controller {
    onButtonDown(handler: ((() => void))): void;
    onButtonDown(handler: ((() => void)), buttonString: string): void;
    onButtonUp(handler: ((() => void))): void;
    onButtonUp(handler: ((() => void)), buttonString: string): void;
    onButtonPressed(handler: ((() => void))): void;
    onButtonPressed(handler: ((() => void)), buttonString: string): void;
    getOrientation(): Quat;
    readonly orientation: Quat;
    getPosition(): Vector3;
    readonly position: Vector3;
    isTouched(): boolean;
    readonly touched: boolean;
    getTouch(): Vector3;
    readonly touch: Vector3;
    vibrate(duration: number): void;
    render(enabled: boolean): void;
    raycast(enabled: boolean): void;
    onCollisionEnter(handler: (((arg0: BaseItem) => void))): void;
    onCollisionExit(handler: (((arg0: BaseItem) => void))): void;
}
interface __Debug {
    log(s: any): void;
}
interface __Environment {
    mood: number;
    terrain: string;
    transparentBackground: boolean;
    skyBox360: string;
    dataString: string;
}
declare namespace GUI {
    interface __BuildMode {
        readonly ProgressBar: GUI.__ProgressBar;
        logoVisible: boolean;
    }
}
declare namespace GUI {
    interface __Editor {
        setActiveTab(scriptName: string): void;
        setActiveTab(scriptIndex: number): void;
        visible: boolean;
        buttonVisible: boolean;
        windowStateButtonVisible: boolean;
        coBlocksVisible: boolean;
        blocklyVisible: boolean;
        codeVisible: boolean;
        width: number;
        dragBarVisible: boolean;
    }
}
declare namespace GUI {
    interface __HUD {
        createJoystick(): Joystick;
        createCameraJoystick(): Joystick;
        createJoystick(side: Side): Joystick;
        removeJoystick(): void;
        removeJoystick(side: Side): void;
        showInfoPanel(options: {
            readonly title: string;
            readonly image?: string;
            readonly text: string;
            readonly autoRemove?: boolean;
            readonly position?: Vector3;
            readonly onHide?: ((() => void));
        }): Disposable;
        sceneNavigationVisible: boolean;
        ARButtonVisible: boolean;
        VRButtonVisible: boolean;
        VRBackButtonVisible: boolean;
        gyroscopeButtonVisible: boolean;
    }
}
declare namespace GUI {
    interface __ProgressBar {
        visible: boolean;
        interactiveOnPhone: boolean;
        buttonURL: string;
        interactive: boolean;
    }
}
interface __GUI {
    createChart(): Chart;
    toolbarColor: ColorWithAlpha;
    readonly HUD: GUI.__HUD;
    readonly Editor: GUI.__Editor;
    readonly BuildMode: GUI.__BuildMode;
    playButtonVisible: boolean;
    environmentSettingsVisible: boolean;
    createButton(options: ButtonOptions): GUI.Button;
    createPanel(options: PanelOptions): GUI.Panel;
    addView(view: GUI.View): void;
    removeView(view: GUI.View): void;
    onResize(handler: (((arg0: Vector2) => void))): void;
    readonly screenSize: Vector2;
    createWebPopup(options: {
        readonly url: string;
        readonly title: string;
        readonly confirmLabel?: string;
        readonly onClose?: ((() => void));
    }): Disposable;
    createPopup(options: {
        readonly titleLabel?: string;
        readonly titleFontSize?: number;
        readonly titleFontStyle?: 'regular' | 'medium' | 'demibold' | 'bold' | 'heavy';
        readonly bodyLabel?: string;
        readonly bodyFontSize?: number;
        readonly bodyFontStyle?: 'regular' | 'medium' | 'demibold' | 'bold' | 'heavy';
        readonly buttonLabel?: string;
        readonly backgroundColor?: ColorWithAlpha;
        readonly foregroundColor?: ColorWithAlpha;
        readonly image?: GUI.Button;
        readonly type?: 'info' | 'warning' | 'question' | 'confirmation';
        readonly onContinue?: ((() => void));
        readonly enableCloseButton?: boolean;
        readonly onCancel?: (((arg0: boolean) => void));
    }): GUI.Popup;
    showPopup(popup: GUI.Popup): void;
}
interface __IdeService {
}
interface __Input {
    onButtonDown(handler: ((() => void))): void;
    onButtonDown(handler: ((() => void)), buttonString: string): void;
    onButtonUp(handler: ((() => void))): void;
    onButtonUp(handler: ((() => void)), buttonString: string): void;
    onButtonPressed(handler: ((() => void))): void;
    onButtonPressed(handler: ((() => void)), buttonString: string): void;
    requestPlayerControl(enabled: boolean): void;
    customInputEventsConsumed: boolean;
    readonly clickDirection: Vector3;
    onExternalCommand(callback: (((command: any, source: Window) => void))): void;
    getController(): Controller;
    getController(index: number): Controller;
    onSensorRotation(handler: (((arg0: __PositionService) => void))): void;
    mouseInverted: boolean;
    reticleEnabled: boolean;
}
interface __ML {
    createLearningEnvironment(options: ML.Options): void;
}
declare namespace Multiplayer {
    interface __BuildMode {
        minPlayers: number;
        maxPlayers: number;
        joinInProgressAllowed: boolean;
        hostChangeInProgressAllowed: boolean;
        syncEnabled: boolean;
        numberOfTeams: number;
    }
}
interface __Multiplayer {
    readonly BuildMode: Multiplayer.__BuildMode;
    setGameSessionProp(key: string, value: any): void;
    getGameSessionProp(key: string): string;
    readonly me: Multiplayer.Player;
    readonly host: Multiplayer.Player;
    getPlayer(id: string): Multiplayer.Player;
    readonly players: Array<Multiplayer.Player>;
    readonly playersOnCurrentScene: Array<Multiplayer.Player>;
    getPlayersOnScene(sceneIndex: number): Array<Multiplayer.Player>;
    warningsEnabled: boolean;
    onHostStart(func: ((() => void))): void;
    onRebalance(callback: ((() => void))): void;
    onConnect(callback: (((arg0: Multiplayer.Player) => void))): void;
    onDisconnect(callback: (((arg0: Multiplayer.Player) => void))): void;
    onMessageReceived(callback: (((player: Multiplayer.Player, message: string) => void))): void;
    onPlayersLoaded(callback: ((() => void))): void;
    onPlayerSceneEnter(callback: (((arg0: Multiplayer.Player) => void)), sceneIndex: number): void;
    onPlayerSceneExit(callback: (((arg0: Multiplayer.Player) => void)), sceneIndex: number): void;
}
declare namespace Physics {
    interface __Constraints {
        createMotorJoint(first: BaseItem, second: BaseItem, v: BaseItem): MotorJointConstraint;
        createHingeJoint(first: BaseItem, second: BaseItem, v: BaseItem): HingeJointConstraint;
    }
}
interface __Physics {
    readonly constraints: Physics.__Constraints;
    addSceneItems(): void;
    removeSceneItems(): void;
    createExplosion(origin: Vector3, radius: number, power: number): void;
    deltaTime: number;
    gravityPull: number;
    gravityDirection: Vector3;
    floorHeight: number;
    realTime: boolean;
    paused: boolean;
    rotationFriction: boolean;
    sceneRadius: number;
    solverRelaxationFactor: number;
    physicsSpeed: number;
    airArchimedesPrinciple: boolean;
    setTickRate(tick: number): void;
    getTickRate(): number;
    copyToModel(): void;
}
declare namespace Renderer {
    interface __PostProcessing {
        highlightGlowInnerColor: Color;
        highlightGlowOuterColor: Color;
        highlightGlowIntensity: number;
        highlightGlowWidth: number;
        bloom: boolean;
        bloomIntensity: number;
    }
}
interface __RayCast {
    cast(origin: Vector3, direction: Vector3): RayCast.Result;
    addToFilter(item: SceneItem): void;
    removeFromFilter(item: SceneItem): void;
    shapeCast(item1: BaseItem, direction1: Vector3, item2: BaseItem, direction2: Vector3): number;
}
interface __Renderer {
    readonly PostProcessing: Renderer.__PostProcessing;
    fadeObjectToCamera: boolean;
    axes: boolean;
    boundingBoxes: boolean;
    collisionCapsules: boolean;
    collisionPoints: boolean;
    debugCurves: boolean;
    joints: boolean;
    lightItems: boolean;
    lineLabels: boolean;
    shadows: boolean;
    slot: string;
    softParticles: boolean;
    softShadows: boolean;
    boundingBoxesExt: boolean;
}
interface __SceneService {
    getItem(id: string): SceneItem;
    getItemSafe(id: string, name: string, errorMessage: string): SceneItem;
    getItemSafeByName(name: string, errorMessage: string): SceneItem;
    createDebugCube(errorMessage: string, name: string, posX: number, posY: number, posZ: number): Cuboid;
    readonly selectedItem: SceneItem;
    getItems(): Array<SceneItem>;
    getItemsWithTag(tag: string): Array<SceneItem>;
    createPerson(gender: string, age: string, posX: number, posY: number): PhongItem;
    createPerson(gender: string, age: string, posX: number, posY: number, slot: string): PhongItem;
    createItem(modelId: string, posX: number, posY: number, posZ: number): BaseItem;
    createItem(modelId: string, pos: Vector3): BaseItem;
    createItem(modelId: string, pos: Vector3, slot: string): BaseItem;
    createItem(modelId: string, posX: number, posY: number, posZ: number, slot: string): BaseItem;
    createSynchronizedItem(modelId: string, posX: number, posY: number, posZ: number, slot: string): BaseItem;
    createCuboid(posX: number, posY: number, posZ: number): Cuboid;
    createEllipsoid(posX: number, posY: number, posZ: number): Ellipsoid;
    createCapsule(posX: number, posY: number, posZ: number): Capsule;
    createHemiellipsoid(posX: number, posY: number, posZ: number): HemiEllipsoid;
    createTorus(posX: number, posY: number, posZ: number): Torus;
    createSemiTorus(posX: number, posY: number, posZ: number): AnisotropicItem;
    createParticleSystem(posX: number, posY: number, posZ: number, data: string): ParticleItem;
    createGroup(): Group;
    createCustomItem(): CustomItem;
    createChart(posX: number, posY: number, posZ: number, ax: number, ay: number, bx: number, by: number): ChartItem;
    getLineItems(): Array<LineItem>;
    createCircleSpline(x: number, y: number, z: number, r: number, flat: boolean): LineItem;
    createEllipseSpline(x: number, y: number, z: number, r0: number, r1: number, n: number, flat: boolean): LineItem;
    createSplineFromArray(x: Array<number>, y: Array<number>, z: Array<number>, ts_type: 'POLYLINE' | 'SPLINE'): LineItem;
    createFunction3D(ts_function: (((t: number) => {
        readonly x: number;
        readonly y: number;
        readonly z: number;
    })), t0: number, t1: number, div: number, ts_type: 'POLYLINE' | 'SPLINE'): LineItem;
    createPathItem(): PathItem;
    createFunction3D(ts_function: (((t: number) => {
        readonly x: number;
        readonly y: number;
        readonly z: number;
    })), t0: number, t1: number, div: number): LineItem;
    createLineItem(): LineItem;
    createLakeItem(): LakeItem;
    createRoadItem(): LineItem;
    createVector(posX: number, posY: number, posZ: number, dirX: number, dirY: number, dirZ: number): ServiceItem;
    createSpline(): LineItem;
    createPoint(posX: number, posY: number, posZ: number): ServiceItem;
    createBasis(posX: number, posY: number, posZ: number): VectorItem;
    createBasis(posX: number, posY: number, posZ: number, dirX: number, dirY: number, dirZ: number): ServiceItem;
    createMengerSponge4Item(posX: number, posY: number, posZ: number): MengerSponge4Item;
    createStairsItem(posX: number, posY: number, posZ: number): StairsItem;
    createFractalItem(posX: number, posY: number, posZ: number): FractalItem;
    createImageItem(imageId: string, posX: number, posY: number, posZ: number): GameItem;
    createTextBillboard(posX: number, posY: number, posZ: number): Cuboid;
    createText(posX: number, posY: number, posZ: number, text: string): TextItem;
    createPathTail(): PathTail;
    removeAllPathTails(): void;
    addDashedCircle(basisId: string, red: number, green: number, blue: number, alpha: number, n: number, p: number, rx: number, ry: number): boolean;
    removeAllDashedCircles(): void;
    readonly defaultTailThickness: number;
    createInterval(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number): LineItem;
    createQuadrantArcPath(x: number, y: number, z: number, r: number, t: number): LineItem;
    createCirclePath(x: number, y: number, z: number, r: number, t: number): LineItem;
    createSpiralSpline(x: number, y: number, z: number, r: number, alpha: number, dr: number, div: number, n: number, time: number): LineItem;
    createSpiralPath(x: number, y: number, z: number, r: number, alpha: number, dr: number, div: number, n: number, time: number, xTarget: number, yTarget: number): LineItem;
    createSpiralPathWithFixedOrientation(x: number, y: number, z: number, r: number, alpha: number, dr: number, div: number, n: number, time: number, qx: number, qy: number, qz: number, qw: number): LineItem;
    createLinePath(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, qx: number, qy: number, qz: number, qw: number, time: number): LineItem;
    createLinePathWithDefaultOrientation(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, time: number): LineItem;
    createLinePathWithTwoTargets(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, tx0: number, ty0: number, tz0: number, tx1: number, ty1: number, tz1: number, time: number): LineItem;
    createTriangle(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): LineItem;
    setProperty(key: string, value: any): void;
    getProperty(key: string): string;
    onPropertyChanged(id: string, handler: (((arg0: string) => void))): void;
    readonly camera: Camera;
    deleteItems(): void;
    readonly index: number;
    readonly name: string;
}
interface __Settings {
    enableFeature(permissionName: string, enabled: boolean): void;
    objectEditingAllowed: boolean;
    defaultOrigin: string;
}
interface __Sound {
    load(s: string): Sound;
    load(s: string, callback: (((arg0: Sound) => void))): void;
    stopById(soundIds: Array<string>): void;
    stopById(soundId: string): void;
    stopAll(): void;
    createSpeechSynthesis(handler: (((arg0: TextToSpeech) => void))): void;
}
interface Sound {
    play(): void;
    play(onFinish: ((() => void))): void;
    play(loop: boolean): void;
    stop(): void;
    pause(): void;
    resume(): void;
    setVolume(volume: number): void;
    setCurrentPosition(position: number): void;
    volume(): number;
    duration(): number;
    currentPosition(): number;
}
interface Space {
    goToScene(sceneId: string): void;
    goToScene(sceneIndex: number): void;
    goToNextScene(): void;
    goToPreviousScene(): void;
    createScene(name: string): string;
    deleteScene(sceneId: string): void;
    setProperty(key: string, value: string): void;
    getProperty(key: string): string;
    setGlobalProperty(key: string, value: string): void;
    copyScript(scriptName: string, fromId: string, toId: string): void;
}
interface __Time {
    schedule(func: ((() => void)), delay: number): Disposable;
    scheduleRepeating(func: ((() => void)), period: number): Disposable;
    schedulePhysics(func: ((() => void)), delay: number): Disposable;
    scheduleRepeatingPhysics(func: ((() => void)), period: number): Disposable;
    readonly currentTime: number;
    readonly currentPhysicsTime: number;
}
interface __Web {
    httpGet(path: string, callback: (((arg0: string) => void))): void;
    loadLibrary(baseUrl: string, callback: ((() => void))): void;
}
declare namespace GUI {
    interface Button extends GUI.View {
        setIconId(icon: string): void;
        setIconId(icon: string, state: 'normal' | 'hovered' | 'selected' | 'pressed' | 'disabled'): void;
        iconSize: Vector2;
        blendMode: boolean;
    }
}
declare namespace GUI {
    interface Panel extends GUI.View {
        leftButton: GUI.Button;
        rightButton: GUI.Button;
        gap: number;
    }
}
declare namespace GUI {
    interface Popup {
        type: 'info' | 'warning' | 'question' | 'confirmation';
        titleLabel: string;
        titleFontSize: number;
        titleFontStyle: 'regular' | 'medium' | 'demibold' | 'bold' | 'heavy';
        bodyLabel: string;
        bodyFontSize: number;
        bodyFontStyle: 'regular' | 'medium' | 'demibold' | 'bold' | 'heavy';
        buttonLabel: string;
        image: GUI.Button;
        onContinue: ((() => void));
        enableCloseButton: boolean;
        onCancel: (((arg0: boolean) => void));
        backgroundColor: ColorWithAlpha;
        foregroundColor: ColorWithAlpha;
        show(): void;
        hide(): void;
    }
}
declare namespace GUI {
    interface View {
        label: string;
        fontSize: number;
        setBackgroundColor(color: ColorWithAlpha): void;
        setBackgroundColor(color: ColorWithAlpha, state: 'normal' | 'hovered' | 'selected' | 'pressed' | 'disabled'): void;
        setForegroundColor(color: ColorWithAlpha): void;
        setForegroundColor(color: ColorWithAlpha, state: 'normal' | 'hovered' | 'selected' | 'pressed' | 'disabled'): void;
        setBorderColor(color: ColorWithAlpha): void;
        setBorderColor(color: ColorWithAlpha, state: 'normal' | 'hovered' | 'selected' | 'pressed' | 'disabled'): void;
        borderWidth: number;
        cornerRadius: number;
        position: Vector2;
        width: number;
        margin: number;
        onHover(handler: (((arg0: boolean) => void))): void;
        onClick(handler: ((() => void))): void;
        adjustPosition(callback: (((size: Vector2) => Vector2))): void;
        enabled: boolean;
        show(): void;
        hide(): void;
    }
}
declare namespace Analytics {
    interface ActionOptions {
        readonly category: string;
        readonly action: string;
        readonly label: string;
        readonly value?: number;
    }
}
declare namespace Analytics {
    interface TimingOptions {
        readonly category: string;
        readonly value: string;
        readonly label: string;
        readonly time: number;
    }
}
interface ButtonOptions extends ViewOptions {
    readonly icon?: string;
    readonly iconSize?: Vector2;
    readonly blendMode?: boolean;
}
declare namespace CoBlocks {
    namespace Model {
        interface ActionFilters {
            readonly drag?: (((block: CoBlocks.Model.Block) => boolean));
            readonly remove?: (((block: CoBlocks.Model.Block) => boolean));
            readonly edit?: (((field: CoBlocks.Model.FieldInput) => boolean));
            readonly addStatement?: (((block: CoBlocks.Model.StatementLikeBlock, target: CoBlocks.Model.StatementBlockContainer) => boolean));
            readonly addInput?: (((block: CoBlocks.Model.InputBlock, target: CoBlocks.Model.BlockInput) => boolean));
            readonly removeFunction?: (((ts_function: CoBlocks.Model.FunctionDefinition) => boolean));
            readonly editFunction?: (((ts_function: CoBlocks.Model.FunctionDefinition) => boolean));
        }
    }
}
declare namespace ML {
    interface Options {
        readonly stateSpaceSize: number;
        readonly actionSpaceSize: number;
        readonly action: (((action: Array<number>) => void));
        readonly getResponse: ((() => Array<number>));
        readonly reset: ((() => Array<number>));
    }
}
interface PanelOptions extends ViewOptions {
    readonly leftButton?: GUI.Button;
    readonly rightButton?: GUI.Button;
    readonly gap?: number;
}
declare namespace RayCast {
    interface Result {
        readonly item: BaseItem;
        readonly distance: number;
        readonly point: Vector3;
    }
}
declare class Color {
    readonly red: number;
    readonly green: number;
    readonly blue: number;
    constructor(red: number, green: number, blue: number);
    constructor(hex: string);
}
declare class ColorWithAlpha extends Color {
    readonly alpha: number;
    readonly red: number;
    readonly green: number;
    readonly blue: number;
    constructor(red: number, green: number, blue: number, alpha: number);
    constructor(hex: string);
}
interface ViewOptions {
    readonly label?: string;
    readonly fontSize?: number;
    readonly fontStyle?: 'regular' | 'medium' | 'demibold' | 'bold' | 'heavy';
    readonly backgroundColor?: ColorWithAlpha;
    readonly foregroundColor?: ColorWithAlpha;
    readonly borderColor?: ColorWithAlpha;
    readonly borderWidth?: number;
    readonly cornerRadius?: number;
    readonly position?: Vector2;
    readonly width?: number;
    readonly margin?: number;
    readonly onHover?: (((arg0: boolean) => void));
    readonly onClick?: ((() => void));
    readonly adjustPosition?: (((size: Vector2) => Vector2));
}
interface Disposable {
    dispose(): void;
}
declare class Quat {
    x: number;
    y: number;
    z: number;
    w: number;
    set(x: number, y: number, z: number, w: number): Quat;
    normalize(): Quat;
    setLerp(a: Quat, wa: number, b: Quat, wb: number): Quat;
    toMatrix(tm: Array<Vector3>): Array<Vector3>;
    getY(oY: Vector3): Vector3;
    getZ(oZ: Vector3): Vector3;
    toString(): string;
    copyFrom(quat: Quat): Quat;
    copy(): Quat;
    getAngle(): number;
    makeRotation(axis: Vector3, angle: number): Quat;
    constructor(qx: number, qy: number, qz: number, qw: number);
    static mulScalar(quat: Quat, m: number): Quat;
    static mul(a: Quat, b: Quat): Quat;
    static dot(a: Quat, b: Quat): number;
}
declare class Vector2 {
    x: number;
    y: number;
    constructor();
    constructor(x: number, y: number);
}
declare class Vector3 {
    x: number;
    y: number;
    z: number;
    set0(): Vector3;
    angle(other: Vector3): number;
    dot(other: Vector3): number;
    cross(other: Vector3): Vector3;
    project(other: Vector3): Vector3;
    projectOnPlane(normal: Vector3): Vector3;
    length(): number;
    length2(): number;
    dist(other: Vector3): number;
    normalize(): Vector3;
    limitLength(l: number): Vector3;
    equals(v: Vector3): boolean;
    min(other: Vector3): Vector3;
    max(other: Vector3): Vector3;
    toString(): string;
    copyFrom(v: Vector3): Vector3;
    set(x: number, y: number, z: number): Vector3;
    add(a: Vector3): Vector3;
    mult(s: number): Vector3;
    div(s: number): Vector3;
    sub(a: Vector3): Vector3;
    copy(): Vector3;
    toArray(): Array<number>;
    constructor(x: number, y: number, z: number);
    static mult(v: Vector3, a: number): Vector3;
    static add(a: Vector3, b: Vector3): Vector3;
    static sub(a: Vector3, b: Vector3): Vector3;
    static angle(a: Vector3, b: Vector3): number;
    static cos(a: Vector3, b: Vector3): number;
    static dot(a: Vector3, b: Vector3): number;
    static cross(a: Vector3, b: Vector3): Vector3;
    static project(a: Vector3, b: Vector3): Vector3;
    static projectOnPlane(v: Vector3, normal: Vector3): Vector3;
    static norm2(v: Vector3): number;
    static dist(a: Vector3, b: Vector3): number;
    static distance2(a: Vector3, b: Vector3): number;
    static equals(a: Vector3, b: Vector3): boolean;
    static equalsNullable(a: Vector3, b: Vector3): boolean;
    static min(a: Vector3, b: Vector3): Vector3;
    static max(a: Vector3, b: Vector3): Vector3;
    static div(a: Vector3, s: number): Vector3;
    static triple(a: Vector3, b: Vector3, c: Vector3): number;
}
declare namespace CoBlocks {
    namespace Model {
        interface Block extends CoBlocks.Model.InputContainer {
            readonly id: string;
            copy(): CoBlocks.Model.Block;
            readonly inputName: string;
            removeFromContainer(): void;
            readonly kind: CoBlocks.Model.BlockKind;
            disabled: boolean;
            readonly actuallyDisabled: boolean;
        }
    }
}
declare namespace CoBlocks {
    namespace Model {
        interface BlockInput extends CoBlocks.Model.Input {
            readonly shadow: CoBlocks.Model.InputBlock;
            block: CoBlocks.Model.InputBlock;
            readonly visibleBlock: CoBlocks.Model.InputBlock;
        }
    }
}
declare namespace CoBlocks {
    namespace Model {
        type BlockKind = 'statement' | 'function_call' | 'input';
    }
}
declare namespace CoBlocks {
    namespace Model {
        interface Script extends CoBlocks.Model.StatementBlockContainer {
            readonly functions: Array<CoBlocks.Model.FunctionDefinition>;
            addFunction(ts_function: CoBlocks.Model.FunctionDefinition): void;
        }
    }
}
declare namespace CoBlocks {
    namespace Model {
        class Type {
            readonly kind: CoBlocks.Model.TypeKind;
            readonly typeArguments: Array<CoBlocks.Model.Type>;
            constructor(kind: CoBlocks.Model.TypeKind);
        }
    }
}
declare namespace CoBlocks {
    namespace Model {
        type TypeKind = 'int' | 'number' | 'string' | 'boolean' | 'dx_item' | 'dx_group' | 'dx_game_item' | 'dx_text_item' | 'list' | 'angle' | 'color' | 'vec3' | 'any';
    }
}
declare namespace CoBlocks {
    namespace Model {
        interface FieldInput extends CoBlocks.Model.Input {
            text: string;
        }
    }
}
declare namespace CoBlocks {
    namespace Model {
        interface Fragment extends CoBlocks.Model.InputContainer {
            readonly container: CoBlocks.Model.FragmentInput;
        }
    }
}
declare namespace CoBlocks {
    namespace Model {
        interface FragmentInput extends CoBlocks.Model.Input {
            addFragment(fragment: CoBlocks.Model.Fragment): void;
            addFragment(fragment: CoBlocks.Model.Fragment, index: number): void;
            removeFragment(fragment: CoBlocks.Model.Fragment): void;
            removeFragment(index: number): void;
            indexOfFragment(fragment: CoBlocks.Model.Fragment): number;
            readonly fragments: Array<CoBlocks.Model.Fragment>;
        }
    }
}
declare namespace CoBlocks {
    namespace Model {
        interface FunctionCallBlock extends CoBlocks.Model.StatementLikeBlock {
        }
    }
}
declare namespace CoBlocks {
    namespace Model {
        interface FunctionDefinition extends CoBlocks.Model.StatementBlockContainer {
            readonly name: string;
            readonly parameters: Array<CoBlocks.Model.ParameterDefinition>;
            addParameter(parameter: CoBlocks.Model.ParameterDefinition): void;
            delete(): void;
            getContainer(): CoBlocks.Model.Script;
            disabled: boolean;
        }
    }
}
declare namespace CoBlocks {
    namespace Model {
        interface Input {
            readonly name: string;
            readonly parent: CoBlocks.Model.InputContainer;
            readonly kind: CoBlocks.Model.InputKind;
        }
    }
}
declare namespace CoBlocks {
    namespace Model {
        interface InputBlock extends CoBlocks.Model.Block {
            readonly container: CoBlocks.Model.BlockInput;
            readonly parentStatement: CoBlocks.Model.StatementLikeBlock;
            readonly isShadow: boolean;
        }
    }
}
declare namespace CoBlocks {
    namespace Model {
        interface InputContainer {
            getInputs(): Array<CoBlocks.Model.Input>;
            getInput(name: string): CoBlocks.Model.Input;
            readonly parent: CoBlocks.Model.InputContainer;
        }
    }
}
declare namespace CoBlocks {
    namespace Model {
        type InputKind = 'statement' | 'fragments' | 'block' | 'field';
    }
}
declare namespace CoBlocks {
    namespace Model {
        interface ParameterDefinition {
            readonly name: string;
            readonly type: CoBlocks.Model.Type;
            readonly function: CoBlocks.Model.FunctionDefinition;
            delete(): void;
        }
    }
}
declare namespace CoBlocks {
    namespace Model {
        interface StatementBlock extends CoBlocks.Model.StatementLikeBlock {
        }
    }
}
declare namespace CoBlocks {
    namespace Model {
        interface StatementBlockContainer {
            readonly parent: CoBlocks.Model.InputContainer;
            readonly statements: Array<CoBlocks.Model.StatementLikeBlock>;
            addStatement(statement: CoBlocks.Model.StatementLikeBlock): void;
            addStatement(statement: CoBlocks.Model.StatementLikeBlock, index: number): void;
            remove(statement: CoBlocks.Model.StatementLikeBlock): void;
            remove(index: number): void;
            indexOf(statement: CoBlocks.Model.StatementLikeBlock): number;
            get(index: number): CoBlocks.Model.StatementLikeBlock;
            set(index: number, statement: CoBlocks.Model.StatementLikeBlock): void;
            readonly size: number;
            clear(): void;
            readonly containerKind: StatementBlockContainerKind;
        }
    }
}
declare type StatementBlockContainerKind = 'statement_input' | 'script' | 'function';
declare namespace CoBlocks {
    namespace Model {
        interface StatementInput extends CoBlocks.Model.Input, CoBlocks.Model.StatementBlockContainer {
            readonly parent: CoBlocks.Model.InputContainer;
        }
    }
}
declare namespace CoBlocks {
    namespace Model {
        interface StatementLikeBlock extends CoBlocks.Model.Block {
            removeFromContainer(): void;
            readonly isRootBlock: boolean;
            readonly indexInContainer: number;
            readonly container: CoBlocks.Model.StatementBlockContainer;
        }
    }
}
interface AnisotropicBaseItem extends AnisotropicPhongItem, ComposableItem {
}
interface AnisotropicItem extends AnisotropicBaseItem {
}
interface AnisotropicPhongItem extends FigureItem {
    setTexture(id: string, ch: number): void;
    setTextureIds(ids: Array<string>): void;
    setTextureBlend(b: boolean): void;
    setBlendColors(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number): void;
}
interface BaseItem extends SceneItem, __PositionService {
    getColor(): Array<number>;
    setColor(red: number, green: number, blue: number): void;
    setColorFromString(color: string): void;
    setHighlightColor(red: number, green: number, blue: number): void;
    addTag(tag: string): void;
    removeTag(tag: string): void;
    hasTag(tag: string): boolean;
    onCollisionEnter(handler: (((arg0: BaseItem) => void))): void;
    onCollisionExit(handler: (((arg0: BaseItem) => void))): void;
    shapeCast(vx: number, vy: number, vz: number): number;
    onButtonDown(handler: ((() => void))): void;
    onButtonUp(handler: ((() => void))): void;
    onActivate(handler: ((() => void))): void;
    onHover(handler: (((arg0: boolean) => void))): void;
    showInfoPanel(title: string, image: string, text: string, autoRemove: boolean): Disposable;
    focusOn(instant: boolean): Disposable;
    focusOff(instant: boolean): void;
    removeFromParent(): void;
    getCenter(): Vector3;
    readonly center: Vector3;
    getSlotPosition(slot: string): Vector3;
    getSlotPositionBlockly(slot: string): Vector3Blockly;
    getSlotTransform(slot: string): __PositionService;
    add(obj: BaseItem): void;
    adjustToItem(slot: string, obj: BaseItem, objSlot: string): boolean;
    attachToItem(slot: string, obj: BaseItem, objSlot: string): void;
    getChildrenCount(): number;
    readonly childrenCount: number;
    getChild(index: number): BaseItem;
    deleteChildren(): void;
    setScale(scale: number): void;
    setScale(scale: number, slot: string): void;
    scale(): number;
    createCustomItem(basis: __PositionService, script: string): BaseItem;
    say(phrase: any): void;
    think(phrase: any): void;
    log(): void;
    showName(show: boolean): void;
    isAnimated(): boolean;
    readonly animated: boolean;
    setRandomColor(): void;
    makeSynchronized(): void;
    requestAuthority(): void;
    copy(): BaseItem;
    addMoveOnPlaneInteraction(cx: number, cy: number, cz: number, vx: number, vy: number, vz: number, ux: number, uy: number, uz: number): void;
    addMoveOnPlaneInteraction(cx: number, cy: number, cz: number, vx: number, vy: number, vz: number, ux: number, uy: number, uz: number, callback: ((() => void))): void;
    addMoveOnSphereInteraction(): void;
    addMoveOnSphereInteraction(callback: ((() => void))): void;
    addRotationAxisInteraction(ox: number, oy: number, oz: number, nx: number, ny: number, nz: number): void;
    addRotationAxisInteraction(ox: number, oy: number, oz: number, nx: number, ny: number, nz: number, callback: ((() => void))): void;
    addRotation3dInteraction(): void;
    addRotation3dInteraction(callback: ((() => void))): void;
    addConstantRotationInteraction(ox: number, oy: number, oz: number, dx: number, dy: number, dz: number, speed: number): void;
    addConstantRotationInteraction(ox: number, oy: number, oz: number, dx: number, dy: number, dz: number, speed: number, callback: ((() => void))): void;
    addMoveCollisionInteraction(): void;
    addMoveCollisionInteraction(callback: ((() => void))): void;
    addMoveCollisionConstraintInteraction(obj: BaseItem): void;
    addMoveCollisionConstraintInteraction(obj: BaseItem, callback: ((() => void))): void;
    addMoveOnItemInteraction(obj: BaseItem): void;
    addMoveOnItemInteraction(obj: BaseItem, callback: ((() => void))): void;
    removeInteraction(): void;
    move(dx: number, dy: number): void;
    move(dx: number, dy: number, dz: number): void;
    move(dx: number, dy: number, dz: number, callback: ((() => void))): void;
    moveTo(x: number, y: number): void;
    moveTo(x: number, y: number, z: number): void;
    moveTo(x: number, y: number, z: number, callback: ((() => void))): void;
    faceTo(obj: __PositionService): void;
    faceToPosition(x: number, y: number, z: number): void;
    moveToItem(obj: BaseItem, distance: number): void;
    moveToItem(obj: BaseItem, distance: number, callback: ((() => void))): void;
    moveBezierTo(x: number, y: number, z: number, time: number): void;
    moveBezierTo(x: number, y: number, z: number, time: number, callback: ((() => void))): void;
    moveBezierToObj(obj: BaseItem, slot: string, time: number): void;
    moveBezierToObj(obj: BaseItem, slot: string, time: number, callback: ((() => void))): void;
    getActorsLinearVelocity(): Vector3;
    moveLinear(x: number, y: number, z: number, t: number): void;
    moveLinearTo(x: number, y: number, z: number, t: number): void;
    moveLinear(x: number, y: number, z: number, t: number, callback: ((() => void))): void;
    moveLinearTo(x: number, y: number, z: number, t: number, callback: ((() => void))): void;
    moveLinearToBlockly(v: Vector3Blockly, t: number, callback: ((() => void))): void;
    moveLinearLocal(x: number, y: number, z: number, t: number, callback: ((() => void))): void;
    moveAccelerateLocal(x: number, y: number, z: number, v0: number, v1: number, callback: ((() => void))): void;
    movePath(path: LineItem, t: number, tEnd: number, time: number, repeat: boolean, reverse: boolean, callback: ((() => void))): void;
    moveBezierPath(path: LineItem, repeat: boolean): void;
    rotateLocalAroundOrigin(dirX: number, dirY: number, dirZ: number, radians: number, time: number): void;
    rotateLocal(dirX: number, dirY: number, dirZ: number, radians: number, time: number): void;
    rotateLocal(dirX: number, dirY: number, dirZ: number, radians: number, time: number, callback: ((() => void))): void;
    rotateLocal(originX: number, originY: number, originZ: number, dirX: number, dirY: number, dirZ: number, radians: number, time: number): void;
    rotateLocalAroundOrigin(dirX: number, dirY: number, dirZ: number, radians: number, time: number, callback: ((() => void))): void;
    rotateLocal(originX: number, originY: number, originZ: number, dirX: number, dirY: number, dirZ: number, radians: number, time: number, callback: ((() => void))): void;
    rotateBlockly(origin: Vector3Blockly, dir: Vector3Blockly, radians: number, time: number, callback: ((() => void))): void;
    rotate(originX: number, originY: number, originZ: number, origGlobal: boolean, dirX: number, dirY: number, dirZ: number, dirGlobal: boolean, radians: number, time: number, callback: ((() => void))): void;
    turn(r: number, angle: number, time: number, clockwise: boolean): void;
    turn(r: number, angle: number, time: number, clockwise: boolean, callback: ((() => void))): void;
    rotateAs(obj: BaseItem, time: number): void;
    rotateAs(obj: BaseItem, time: number, callback: ((() => void))): void;
    velocity(): Vector3;
    setPosition(x: number, y: number, z: number): void;
    setPosition(pos: Vector3): void;
    position: Vector3;
    setPosition(x: number, y: number, z: number, slot: string): void;
    setPosition(x: number, y: number, z: number, discrete: boolean): void;
    setPositionQuat(x: number, y: number, z: number, qx: number, qy: number, qz: number, qw: number): void;
    setPositionAngle(x: number, y: number, z: number, axisX: number, axisY: number, axisZ: number, angle: number): void;
    setHorizontalDirection(dirX: number, dirY: number): void;
    setHorizontalDirection(dirX: number, dirY: number, discrete: boolean): void;
    setDirection(dirX: number, dirY: number, dirZ: number): void;
    addRotation(originX: number, originY: number, originZ: number, dirX: number, dirY: number, dirZ: number, radians: number): void;
    addLocalRotationAround(dirX: number, dirY: number, dirZ: number, radians: number): void;
    addLocalRotationAround(dirX: number, dirY: number, dirZ: number, radians: number, slot: string): void;
    addLocalRotation(originX: number, originY: number, originZ: number, dirX: number, dirY: number, dirZ: number, radians: number): void;
    addLocalPosition(dx: number, dy: number, dz: number): void;
    setRelativeToCamera(x: number, y: number, z: number, qx: number, qy: number, qz: number, qw: number): void;
    shiftPhysicsPosition(x: number, y: number, z: number): void;
    setPhysicsPosition(x: number, y: number, z: number): void;
    shiftPhysicsPositionLocal(x: number, y: number, z: number): void;
    setPhysicsGroupPosition(x: number, y: number, z: number): void;
    shiftPhysicsGroupPositionLocal(x: number, y: number, z: number): void;
    getPhysicsPosition(): Vector3;
    readonly physicsPosition: Vector3;
    getPhysicsGroupPosition(): Vector3;
    readonly physicsGroupPosition: Vector3;
    rotatePhysicsBodyLocal(axisX: number, axisY: number, axisZ: number, angle: number): void;
    getVelocity(): Vector3;
    setVelocity(x: number, y: number, z: number): void;
    getVelocityLocal(): Vector3;
    velocityLocal: Vector3;
    setVelocityLocal(x: number, y: number, z: number): void;
    getGroupVelocityLocal(): Vector3;
    groupVelocityLocal: Vector3;
    setGroupVelocityLocal(x: number, y: number, z: number): void;
    getAngularVelocity(): Vector3;
    angularVelocity: Vector3;
    setAngularVelocity(x: number, y: number, z: number): void;
    getAngularVelocityLocal(): Vector3;
    angularVelocityLocal: Vector3;
    setAngularVelocityLocal(x: number, y: number, z: number): void;
    getGroupAngularVelocityLocal(): Vector3;
    groupAngularVelocityLocal: Vector3;
    setGroupAngularVelocityLocal(x: number, y: number, z: number): void;
    getDensity(): number;
    density: number;
    setDensity(density: number): void;
    setGroupDensity(density: number): void;
    getMass(): number;
    mass: number;
    setMass(m: number): void;
    getModelMass(): number;
    modelMass: number;
    setModelMass(m: number): void;
    setModelDensity(density: number): void;
    getGroupMass(): number;
    groupMass: number;
    setGroupMass(m: number): void;
    isStatic(): boolean;
    setStatic(): void;
    setStatic(enabled: boolean): void;
    setModelStatic(enabled: boolean): void;
    isCCD: boolean;
    setCCD(enabled: boolean): void;
    layer: number;
    setLayer(layer: number): void;
    setGroupLayer(layer: number): void;
    setFriction(friction: number): void;
    setSoftness(s: number): void;
    setModelFriction(friction: number): void;
    setGroupFriction(friction: number): void;
    setRestitution(r: number): void;
    setModelRestitution(r: number): void;
    setGroupRestitution(r: number): void;
    restrictMovementAxis(x: boolean, y: boolean, z: boolean): void;
    restrictRotationAxis(x: boolean, y: boolean, z: boolean): void;
    setPhysicsPositionCorrection(x: number, y: number, z: number): void;
    removePhysicsBody(): void;
    removePhysicsGroup(): void;
    removeFromPhysicsGroup(): void;
    addToPhysics(): void;
    setModelPreciseCollision(precise: boolean): void;
    setPreciseCollision(precise: boolean): void;
    addToPhysicsCollisionFilter(item: BaseItem): void;
    removeFromPhysicsCollisionFilter(item: BaseItem): void;
    convertToLocalVector(x: number, y: number, z: number): Vector3;
    distanceConstraint(item: BaseItem, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, dist: number): DistanceConstraint;
    attractorConstraint(item: BaseItem, strength: number, maxRad: number): Disposable;
    positionConstraint(x: number, y: number, z: number): PositionConstraint;
    rotationConstraint(qx: number, qy: number, qz: number, qw: number): RotationConstraint;
    jointToItem(other: BaseItem, x: number, y: number, z: number): JointConstraint;
    hingeJointToItem(other: BaseItem, localAnchorAx: number, localAnchorAy: number, localAnchorAz: number, localAnchorBx: number, localAnchorBy: number, localAnchorBz: number, localAxisAx: number, localAxisAy: number, localAxisAz: number, localAxisBx: number, localAxisBy: number, localAxisBz: number): HingeJointConstraint;
    motorJointToItem(other: BaseItem, localAnchorAx: number, localAnchorAy: number, localAnchorAz: number, localAnchorBx: number, localAnchorBy: number, localAnchorBz: number, localAxisAx: number, localAxisAy: number, localAxisAz: number, localAxisBx: number, localAxisBy: number, localAxisBz: number): MotorJointConstraint;
    jointToGround(x: number, y: number, z: number): JointConstraint;
    planeConstraint(axisX: number, axisY: number, axisZ: number): PlaneConstraint;
    sliderConstraint(axisX: number, axisY: number, axisZ: number): SliderConstraint;
    rotationAxisConstraint(axisX: number, axisY: number, axisZ: number): RotationAxisConstraint;
    gearConstraint(other: BaseItem, localAxisAx: number, localAxisAy: number, localAxisAz: number, localAxisBx: number, localAxisBy: number, localAxisBz: number, gearRatio: number): GearConstraint;
    curveHandlerConstraint(curveHandler: (((x: number, y: number, z: number) => {
        readonly x: number;
        readonly y: number;
        readonly z: number;
    })), curveRadius: number, bodyRadius: number): CurveConstraint;
    curveConstraint(curve: LineItem, curveRadius: number, bodyRadius: number): CurveConstraint;
    removeFromConstraints(): void;
    applyImpulse(x: number, y: number, z: number, impX: number, impY: number, impZ: number): void;
    applyImpulseLocal(x: number, y: number, z: number, impX: number, impY: number, impZ: number): void;
    applyForce(x: number, y: number, z: number): void;
    setForce(x: number, y: number, z: number): void;
    setGroupForce(x: number, y: number, z: number): void;
    onPhysicsCollisionEnter(handler: (((arg0: BaseItem) => void))): Disposable;
    onPhysicsCollisionExit(handler: (((arg0: BaseItem) => void))): Disposable;
    onPhysicsCollision(handlerEnter: (((arg0: BaseItem) => void)), handlerExit: (((arg0: BaseItem) => void))): Disposable;
    clearCollisionHandlers(): void;
    isInGroup(): boolean;
    readonly inGroup: boolean;
    setVisible(visible: boolean): void;
    visible: boolean;
    setHighlighted(highlighted: boolean): void;
    setHighlighted(headlight: boolean, glow: boolean): void;
    isHighlighted(): boolean;
    isHighlightedWithHeadlight(): boolean;
    isHighlightedWithGlow(): boolean;
    setHighlightIntensity(intensity: number): void;
    setHighlightAmbient(ambient: number): void;
    setHighlightFrequency(frequency: number): void;
    setHighlightAmplitude(amplitude: number): void;
    getParent(): BaseItem;
    readonly parent: BaseItem;
    setShadowPower(value: number): void;
    getSlots(): Array<string>;
    readonly slots: Array<string>;
    setPhysicsEnabled(added: boolean): void;
    hasPhysicsBody(): boolean;
    stop(): void;
    getPart(key: string): BaseItem;
    setPartName(name: string): void;
}
interface BasisItem extends ServiceItem {
}
interface CameraItem extends AnimatedItem {
    setMovement(movementType: string): void;
    create360Photo(): void;
}
interface Capsule extends AnisotropicItem {
    setSize(radius: number, height: number): void;
    radius(): number;
    height(): number;
    setRadius(r: number): void;
    setHeight(h: number): void;
}
interface ChartItem extends UnitItem {
    attachFunction(fx: (((x: number) => number)), fy: (((x: number) => number)), fz: (((x: number) => number)), t0: number, t1: number, div: number): LineItem;
    attachFunction(fx: (((x: number) => number)), fy: (((x: number) => number)), fz: (((x: number) => number)), t0: number, t1: number, div: number, spline: boolean): LineItem;
    addCubicPoly2D(c0: number, v0: number, a0: number, w0: number, c1: number, v1: number, a1: number, w1: number): void;
    addCubicPoly(c: number, v: number, a: number, w: number, x0: number, x1: number): void;
    addCubicPolyFromTimeInfo(item: LineItem): void;
}
interface ConeFrustum extends AnisotropicItem {
    setSize(radiusBottom: number, radiusTop: number, height: number): void;
    setBottomRadius(bottomRadius: number): void;
    setTopRadius(topRadius: number): void;
    setHeight(height: number): void;
    bottomRadius(): number;
    topRadius(): number;
    height(): number;
}
interface Cone extends AnisotropicItem {
    setSize(radius: number, height: number): void;
    setRadius(radius: number): void;
    setHeight(height: number): void;
    radius(): number;
    height(): number;
}
interface CustomItem extends BaseItem {
}
interface Cylinder extends AnisotropicItem {
    setSize(radiusX: number, radiusY: number, height: number): void;
    setRadiusX(radiusX: number): void;
    setRadiusY(radiusY: number): void;
    setHeight(height: number): void;
    radiusX(): number;
    radiusY(): number;
    height(): number;
}
interface DirLightItem extends LightItem {
    shadowMapWidth: number;
}
interface SceneItem {
    name(): string;
    setName(name: string): void;
    id(): string;
    isLocal(): boolean;
    deleteFromScene(): void;
    setProperty(key: string, value: any): void;
    getProperty(key: string): string;
    onPropertyChanged(id: string, handler: (((arg0: string) => void))): void;
    opacity(): number;
    setOpacity(opacity: number): void;
}
interface Ellipsoid extends EllipsoidItemBase {
}
interface EllipsoidItemBase extends AnisotropicItem {
    setSize(rx: number, ry: number, rz: number): void;
    setRadiusX(r: number): void;
    setRadiusY(r: number): void;
    setRadiusZ(r: number): void;
    radiusX(): number;
    radiusY(): number;
    radiusZ(): number;
}
interface FigureItem extends UnitItem {
    setPhongParameters(dLevel: number, dPower: number, sLevel: number, sPower: number): void;
    modelId(): string;
    setMasking(isMask: boolean): void;
    isMasking(): boolean;
    setInverseMasking(isMask: boolean, layer: number): void;
    setInverseMasking(b: boolean): void;
    addToInverseMask(layer: number): void;
    removeFromInverseMask(): void;
}
interface Cuboid extends AnisotropicItem {
    setLength(length: number): void;
    setWidth(width: number): void;
    setHeight(height: number): void;
    setText(text: any): void;
    text(): string;
    setTextColor(red: number, green: number, blue: number): void;
    setFontSize(value: number): void;
    length(): number;
    width(): number;
    height(): number;
    setSize(sx: number, sy: number, sz: number): void;
}
interface FractalItem extends GameItem {
    setGrowth(growth: number): void;
    setOrder(order: number): void;
    setTextureType(ts_type: number): void;
    setType(ts_type: number): void;
    setSeed(seed: number): void;
    setColorType(colorType: number): void;
    setLimbsColor(red: number, green: number, blue: number): void;
    setLeafsColor(red: number, green: number, blue: number): void;
}
interface Frustum4Item extends AnisotropicItem {
    setSize(botX: number, botY: number, topX: number, topY: number, h: number): void;
    height(): number;
    setHeight(height: number): void;
    bottomLength(): number;
    bottomWidth(): number;
    topLength(): number;
    topWidth(): number;
}
interface Frustum extends AnisotropicBaseItem {
    setSize(bottomRadiusX: number, topRadiusX: number, ratio: number, height: number): void;
    bottomRadiusX(): number;
    bottomRadiusY(): number;
    topRadiusX(): number;
    topRadiusY(): number;
    ratio(): number;
    vertices(): number;
    setHeight(height: number): void;
    height(): number;
    setVertices(v: number): void;
}
interface GameItem extends BaseItem {
}
interface Group extends BaseItem {
    setOrientationFrom(obj: BaseItem): void;
    ungroup(): void;
    setPivot(obj: BaseItem, slot: string): void;
}
interface HelicopterItem extends PhongItem {
    startHelicopter(): void;
    stopHelicopter(): void;
}
interface HemiEllipsoid extends EllipsoidItemBase {
}
interface LakeItem extends LineItem {
    setShoreColor(red: number, green: number, blue: number): void;
}
interface LightItem extends ServiceItem {
    intensity: number;
    shadowStrength: number;
    shadow: boolean;
    shadowType: 'TAP_1' | 'PCF_2x2' | 'PCF_4x4' | 'PCF_6x6';
    shadowResolution: number;
    addToLightReceiveFilter(item: BaseItem): boolean;
    removeFromLightReceiveFilter(item: BaseItem): boolean;
    addToShadowCastFilter(item: BaseItem): void;
    removeFromShadowCastFilter(item: BaseItem): void;
}
interface LineItem extends SceneItem {
    setTimesAndQuatsEvenly(time: number): void;
    setTimesAndQuatsUniformAcceleration(time: number): void;
    getNearestPoint(other: BaseItem): number;
    getPointTangent(t: number): Vector3;
    getPointPosition(t: number): Vector3;
    getPointByLength(length: number): number;
    length(): number;
    addVertexPos(x: number, y: number, z: number): ServiceItem;
    setLastVertexPos(x: number, y: number, z: number): void;
    addVertexIdx(idx: number, id: string): void;
    setVertexTime(idx: number, time: number): void;
    addQuat(obj: BaseItem, time: number): void;
    clear(): void;
    setSigmoidQuatInterpolation(b: boolean): void;
    setPositionSmoothing(b: boolean): void;
    shift(): LineItem;
    copy(): LineItem;
    copyWithoutNewVertices(): LineItem;
    move(x: number, y: number, z: number): void;
    split(t: number): void;
    updateFromArray(x: Array<number>, y: Array<number>, z: Array<number>): void;
    setColor(red: number, green: number, blue: number): void;
    attachToItem(obj: BaseItem): void;
    makeCircle(): void;
    addVertex(item: VectorItem): void;
    getVertex(index: number): VectorItem;
    setHeight(height: number): void;
    setTimesEvenly(time: number): void;
    setTimesUniformAcceleration(time: number): void;
    isSpline(): boolean;
    isVisible(): boolean;
    isDotted(): boolean;
    setType(ts_type: number): void;
    setVisible(b: boolean): void;
    setSpline(b: boolean): void;
    setSplineInterval(index: number, b: boolean): void;
    setDotted(b: boolean): void;
    setThickness(thickness: number): void;
    setDimension(index: number, value: number): void;
    addRotation(dirX: number, dirY: number, dirZ: number, radians: number): void;
    log(): void;
}
interface MengerSponge4Item extends GameItem {
    setLevel(level: number): void;
    getLevel(): number;
}
interface MergeCubeItem extends PhongItem {
    setInsideVisible(inside: boolean): void;
    readonly visibleSide: AR.MergeCubeSide;
    onRotationGesture(handler: ((() => void)), direction: AR.RotationDirection): void;
}
interface ParticleItem extends BaseItem {
    setEmitRate(rate: number): void;
    pause(): void;
    start(): void;
    clear(): void;
    reset(): void;
    isEmitting(): boolean;
    setSize1(s1: number): void;
    setSize2(s2: number): void;
    setFireRadius(r: number): void;
}
interface PathItem extends LineItem {
}
interface PhongItem extends AnimatedItem {
}
interface PlanetItem extends PhongItem {
    setToSunDir(x: number, y: number, z: number): void;
    setToSunDir(dir: Vector3): void;
}
interface PointLightItem extends LightItem {
}
interface RoadItem extends TexturedLine {
    setStandardMarkUp(lineIndex: number, lines: number, dotted: boolean, adjust: number, thick: number, dimX: number, dimY: number, dimZ: number, r: number, g: number, b: number): void;
    setDottedMarkUp(index: number, lineIndex: number, thick: number, dimX: number, dimY: number): void;
    setDoubleMarkUp(index: number, lineIndex: number, thick: number, adjust: number, dimZ: number): void;
    setMarkUp(index: number, lineIndex: number, lines: number, dotted: boolean, adjust: number, thick: number, dimX: number, dimY: number, dimZ: number): void;
}
interface SemiTorus extends TorusItemBase {
}
interface ServiceItem extends GameItem {
}
interface AnimatedItem extends FigureItem {
    playAnimation(track: string): void;
    playAnimation(track: string, startTime: number, endTime: number): void;
    playAnimationNT(track: string, startTime: number, endTime: number): void;
    playAnimationQueued(track: string): void;
    playAnimationQueued(track: string, startTime: number, endTime: number): void;
    playAnimationQueuedNT(track: string, startTime: number, endTime: number): void;
    playLoopingAnimation(track: string): void;
    playLoopingAnimation(track: string, startTime: number, endTime: number): void;
    playLoopingAnimationNT(track: string, startTime: number, endTime: number): void;
    playLoopingAnimationPingpong(track: string): void;
    playLoopingAnimationPingpong(track: string, startTime: number, endTime: number): void;
    playLoopingAnimationPingpongNT(track: string, startTime: number, endTime: number): void;
    animateToState(state: string): void;
    animateToState(state: string, trackTime: number): void;
    animateToStateNT(state: string, trackTime: number): void;
    setAnimationState(state: string): void;
    setAnimationState(state: string, trackTime: number): void;
    setAnimationStateNT(state: string, trackTime: number): void;
    stopAnimation(): void;
    setAnimationSpeed(speed: number): void;
    onAnimationTime(time: number, callback: ((() => void))): void;
    onAnimationNT(time: number, callback: ((() => void))): void;
    isAnimationPlaying(): boolean;
    getAnimationTime(): number;
    readonly animationTime: number;
    getAnimationNT(): number;
    readonly animationNT: number;
    getAnimationName(): string;
    readonly animationName: string;
    getAnimationLength(): number;
    readonly animationLength: number;
    onFinishAnimation(callback: ((() => void))): void;
    setModelId(modelId: string): void;
    setTextureMapping(mapping: Array<number>): void;
    getTextureMapping(): Array<number>;
    setTextureIds(ids: Array<string>): void;
    getTextureIds(): Array<string>;
    getTextureId(idx: number): string;
    setTextureId(idx: number, value: string): void;
    setVisibleParts(visibleList: Array<string>): void;
    getDefaultVisibleParts(): Array<string>;
    readonly defaultVisibleParts: Array<string>;
    getAllParts(): Array<string>;
    readonly allParts: Array<string>;
}
interface SpotLightItem extends LightItem {
    fov: number;
}
interface StairsItem extends AnisotropicPhongItem {
    getVertex(index: number): VectorItem;
}
interface TexturedLine extends LineItem {
}
interface Torus extends TorusItemBase {
}
interface TorusItemBase extends AnisotropicItem {
    arc(): number;
    setArc(angle: number): void;
    setSize(radius: number, tubeRadiusX: number, tubeRadiusZ: number, radians: number): void;
    setRadius(radius: number): void;
    setTubeRadiusX(radius: number): void;
    setTubeRadiusZ(radius: number): void;
    radius(): number;
    tubeRadiusX(): number;
    tubeRadiusZ(): number;
}
interface __PositionService {
    getPosition(): Vector3;
    readonly position: Vector3;
    getAxisX(): Vector3;
    readonly axisX: Vector3;
    getAxisY(): Vector3;
    readonly axisY: Vector3;
    getAxisZ(): Vector3;
    readonly axisZ: Vector3;
    getOrientationQuat(): Quat;
    readonly orientationQuat: Quat;
    distanceToItem(other: BaseItem): number;
    distanceToPoint(x: number, y: number, z: number): number;
}
interface TubeItem extends AnisotropicItem {
    setSize(outerRadius: number, innerRadius: number, height: number): void;
    setSize(outerRadius: number, innerRadius: number, height: number, arc: number): void;
    setArc(angle: number): void;
    getArc(): number;
    getHeight(): number;
    setHeight(h: number): void;
    getOuterRadius(): number;
    getInnerRadius(): number;
    setOuterRadius(s: number): void;
    setInnerRadius(s: number): void;
}
interface UnitItem extends GameItem {
}
interface VectorItem extends ServiceItem {
    orient(dirX: number, dirY: number, dirZ: number): void;
}
interface ComposableItem {
    union(other: ComposableItem): CsgItem;
    difference(other: ComposableItem): CsgItem;
    intersection(other: ComposableItem): CsgItem;
    split(): Array<ComposableItem>;
}
interface CsgItem extends UnitItem, ComposableItem {
}
interface DrawingItem extends RenderOrderItem {
    setSize(x: number, y: number): void;
}
interface ImageItem extends MediaItem {
    setImageId(imageId: string): void;
    imageId(): string;
}
interface MediaItem extends DrawingItem {
}
interface RenderOrderItem extends UnitItem {
}
interface TextItem extends DrawingItem {
    setText(text: any): void;
    text(): string;
    setFontSize(value: number): void;
}
interface Video extends MediaItem {
    play(): void;
    pause(): void;
    stopVideo(): void;
    setLooping(looping: boolean): void;
    isPlaying(): boolean;
    setVolume(volume: number): void;
    volume(): number;
    setCurrentPosition(position: number): void;
    currentPosition(): number;
    duration(): number;
}
interface TextToSpeech extends Disposable {
    say(utterance: Utterance, callback: (((eventType: 'stop' | 'cancel' | 'error') => void))): void;
    say(utterance: Utterance): void;
    getVoices(): Array<Voice>;
    stop(): void;
    createUtterance(text: string): Utterance;
}
interface Utterance {
    setVoice(voice: Voice): void;
    setRate(rate: number): void;
    rate(): number;
}
interface Voice {
    name(): string;
    lang(): string;
    variant(): string;
    needsConnection(): boolean;
}
