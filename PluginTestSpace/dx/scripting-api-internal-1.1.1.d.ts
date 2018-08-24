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
declare namespace Physics {
    function motorJoint(b1: BaseItem, b2: BaseItem, v: BaseItem): MotorJointConstraint;
    function hingeJoint(b1: BaseItem, b2: BaseItem, v: BaseItem): HingeJointConstraint;
}
interface Marker {
    useForCamera: boolean;
    readonly transform: __PositionService;
    readonly tracked: boolean;
    onPositionChanged(handler: ((() => void))): void;
    onTrackingStateChanged(handler: (((arg0: boolean) => void))): void;
    attachToItem(item: BaseItem): void;
    itemsAlwaysVisible: boolean;
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
declare let Scene: __SceneService;
declare let Space: Space;
declare let Activity: __ActivityService;
declare let IDE: __IdeService;
declare let Assistant: Assistant;
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
interface __ActivityService {
    showCodeEditor(show: boolean): void;
    showCodeEditorButton(show: boolean): void;
    showCodeEditorWindowState(show: boolean): void;
    showCoBlocksEditor(show: boolean): void;
    setProgressBarVisible(value: boolean, onPhone: boolean): void;
    setProgressBarButtonURL(value: string): void;
    setProgressBarInteractive(value: boolean): void;
    showCoSpacesLogo(value: boolean): void;
    setInfoScenes(indexes: Array<number>): void;
    setMarkerBasedAR(value: boolean): void;
    setSceneCompleted(index: number): void;
    resetCompletedScenes(): void;
    setTaskText(text: string): void;
    setTaskImage(imageId: string): void;
    setToolbarColor(r: number, g: number, b: number, a: number): void;
    setBlocklyLoadDefaultToolbox(loadDefault: boolean): void;
    setBlocklyCodeGenerationModel(sync: boolean): void;
    setBlocklyToolbox(toolbox: string): void;
    addFunction(name: string, func: Function): void;
    createChart(): Chart;
    getFunction(name: string): Function;
    getFunctions(name: string): Array<Function>;
    sendTiming(category: string, value: string, label: string, time: number): void;
    actionPerformed(category: string, action: string, label: string): void;
    actionPerformed(category: string, action: string, label: string, value: number): void;
    propertySet(name: string, value: string): void;
    log(message: any): void;
    onPlayModeStarted(initFunction: ((() => void))): void;
}
interface Assistant {
    listen(provider: string, onUtterance: (((data: Object) => void))): Disposable;
    listen(onUtterance: (((data: Object) => void))): Disposable;
}
interface Chart {
    showChartButton(show: boolean): void;
    clear(): void;
    addPoint(x: number, y: number): void;
    setLineColor(r: number, g: number, b: number): void;
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
interface __IdeService {
    showEnvironmentSettings(show: boolean): void;
    allowEditObjects(show: boolean): void;
    showObjectLibrary(show: boolean): void;
    showPlayButton(show: boolean): void;
    showVRButton(show: boolean): void;
    showARButton(show: boolean): void;
    showVRBackButton(show: boolean): void;
    showGyroscopeButton(show: boolean): void;
    showScripts(show: boolean): void;
    setScriptTab(scriptName: string): void;
    setScriptTabByIndex(scriptIndex: number): void;
    setToolbarColor(r: number, g: number, b: number, a: number): void;
    setPermissionEnabled(permissionName: string, enabled: boolean): void;
}
interface __SceneService {
    getItem(id: string): SceneItem;
    getItemSafe(id: string, name: string, errorMessage: string): SceneItem;
    getItemSafeByName(name: string, errorMessage: string): SceneItem;
    createDebugCube(errorMessage: string, name: string, posX: number, posY: number, posZ: number): Cuboid;
    getSelected(): SceneItem;
    readonly selectedItem: SceneItem;
    getItems(): Array<SceneItem>;
    getItemsWithTag(tag: string): Array<SceneItem>;
    createPerson(gender: string, age: string, posX: number, posY: number): PhongItem;
    createPerson(gender: string, age: string, posX: number, posY: number, slot: string): PhongItem;
    createItem(modelId: string, posX: number, posY: number, posZ: number): BaseItem;
    createItem(modelId: string, posX: number, posY: number, posZ: number, slot: string): BaseItem;
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
    createRoadItem(): LineItem;
    createVector(posX: number, posY: number, posZ: number, dirX: number, dirY: number, dirZ: number): ServiceItem;
    createSpline(): LineItem;
    createPoint(posX: number, posY: number, posZ: number): ServiceItem;
    createBasis(posX: number, posY: number, posZ: number): VectorItem;
    createBasis(posX: number, posY: number, posZ: number, dirX: number, dirY: number, dirZ: number): ServiceItem;
    createMengerSponge4Item(posX: number, posY: number, posZ: number): MengerSponge4Item;
    createFractalItem(posX: number, posY: number, posZ: number): FractalItem;
    createImageItem(imageId: string, posX: number, posY: number, posZ: number): GameItem;
    createTextBillboard(posX: number, posY: number, posZ: number): Cuboid;
    createText(posX: number, posY: number, posZ: number, text: string): TextItem;
    createPathTail(): PathTail;
    removeAllPathTails(): void;
    addDashedCircle(basisId: string, red: number, green: number, blue: number, alpha: number, n: number, p: number, rx: number, ry: number): boolean;
    removeAllDashedCircles(): void;
    getDefaultTailThickness(): number;
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
    copyItem(item: BaseItem): BaseItem;
    setMinPlayers(amount: number): void;
    setMaxPlayers(amount: number): void;
    enableJoinInProgress(): void;
    enableHostChangeInProgress(): void;
    printChatLine(line: string): void;
    setNumberOfTeams(numberOfTeams: number): void;
    setAllowedTeamDisbalance(allowedDisbalance: number): void;
    disableSync(): void;
    setGameSessionProp(key: string, value: any): void;
    getGameSessionProp(key: string): string;
    setAccountProperty(value: string): void;
    getAccountProperty(): string;
    getPlayerId(): string;
    getPlayerData(): {
        readonly playerId: string;
        readonly username: string;
        readonly email: string;
    };
    getPlayers(): Array<string>;
    getPlayersOnCurrentScene(): Array<string>;
    getPlayersOnScene(sceneIndex: number): Array<string>;
    onPlayerSceneEnter(callback: (((arg0: string) => void)), sceneIndex: number): void;
    onPlayerSceneExit(callback: (((arg0: string) => void)), sceneIndex: number): void;
    onHostStart(func: ((() => void))): void;
    onRebalance(callback: ((() => void))): void;
    onConnect(func: (((arg0: {
        readonly playerId: string;
        readonly username: string;
        readonly email: string;
    }) => void))): void;
    onDisconnect(func: (((arg0: {
        readonly playerId: string;
        readonly username: string;
        readonly email: string;
    }) => void))): void;
    onClientReceived(func: (((id: string, message: string) => void))): void;
    onHostReceived(func: (((id: string, message: string) => void))): void;
    sendToClient(client: string, message: string): void;
    sendToHost(message: string): void;
    isHost(): boolean;
    setMultiplayerWarningsEnabled(enabled: boolean): void;
    setProperty(key: string, value: any): void;
    getProperty(key: string): string;
    onPropertyChanged(id: string, handler: (((arg0: string) => void))): void;
    getCamera(): Camera;
    readonly camera: Camera;
    schedule(func: ((() => void)), delay: number): Disposable;
    scheduleRepeating(func: ((() => void)), period: number): Disposable;
    schedulePhysics(func: ((() => void)), delay: number): Disposable;
    scheduleRepeatingPhysics(func: ((() => void)), period: number): Disposable;
    currentTime(): number;
    currentPhysicsTime(): number;
    loadLibrary(baseUrl: string, callback: ((() => void))): void;
    setEnvironmentDataString(env: string): void;
    environmentDataString: string;
    getEnvironmentDataString(): string;
    requestPlayerControl(enabled: boolean): void;
    onButtonDown(handler: ((() => void))): void;
    onButtonDown(handler: ((() => void)), buttonString: string): void;
    onButtonUp(handler: ((() => void))): void;
    onButtonUp(handler: ((() => void)), buttonString: string): void;
    onButtonPressed(handler: ((() => void))): void;
    onButtonPressed(handler: ((() => void)), buttonString: string): void;
    consumeCustomInputEvents(consume: boolean): void;
    renderSoftParticles(enabled: boolean): void;
    renderBloom(enabled: boolean): void;
    setBloomIntensity(intensity: number): void;
    setPhysicsSolverRelaxationFactor(relaxationFactor: number): void;
    renderCollisionPoints(b: boolean): void;
    renderJoints(b: boolean): void;
    renderCollisionCapsules(b: boolean): void;
    explosion(x: number, y: number, z: number, radius: number, power: number): void;
    pausePhysics(b: boolean): void;
    setPhysicsDT(dt: number): void;
    setPhysicsRealTime(b: boolean): void;
    setPhysicsSpeedFactor(s: number): void;
    setPhysicsRotationFriction(enabled: boolean): void;
    setPhysicsGravity(g: number): void;
    setGravityVector(x: number, y: number, z: number): void;
    setPhysicsSceneRadius(r: number): void;
    setPhysicsFloorZ(z: number): void;
    setAirArchimedesPrinciple(enabled: boolean): void;
    addItemsToPhysics(): void;
    removeItemsFromPhysics(): void;
    onExternalCommand(callback: (((command: any, source: Window) => void))): void;
    getController(index: number): Controller;
    onSensorRotation(handler: (((arg0: __PositionService) => void))): void;
    loadSound(s: string): Sound;
    loadSound(s: string, callback: (((arg0: Sound) => void))): void;
    stopSound(soundIds: Array<string>): void;
    stopSound(soundId: string): void;
    stopSound(): void;
    setHighlightGlowInnerColor(red: number, green: number, blue: number): void;
    setHighlightGlowOuterColor(red: number, green: number, blue: number): void;
    setHighlightGlowIntensity(intensity: number): void;
    setHighlightGlowWidth(pixels: number): void;
    setMood(value: number): void;
    setTerrain(terrain: string): void;
    setSkyBox360(imageId: string): void;
    setSkyBox360(imageId: string, removeTerrain: boolean): void;
    setTransparentBackground(transparent: boolean): void;
    renderAxes(b: boolean): void;
    renderBoundingBoxes(b: boolean): void;
    renderSlot(b: boolean, slot: string): void;
    renderLineLabels(b: boolean): void;
    renderDebugCurves(b: boolean): void;
    renderShadows(b: boolean): void;
    renderSoftShadows(b: boolean): void;
    clear(): void;
    createSpeechSynthesis(handler: (((arg0: TextToSpeech) => void))): void;
    getInputDirection(): Vector3;
    readonly inputDirection: Vector3;
    traceUnits(x: number, y: number, z: number, dirX: number, dirY: number, dirZ: number): string;
    addToTraceFilter(item: SceneItem): void;
    removeFromTraceFilter(item: SceneItem): void;
    shapeCast(item1: BaseItem, x1: number, y1: number, z1: number, item2: BaseItem, x2: number, y2: number, z2: number): number;
    setInvertMouse(invertMouse: boolean): void;
    getLastTracePoint(): Vector3;
    setFadeObjectToCamera(b: boolean): void;
    isGyroMode(): boolean;
    isVRMode(): boolean;
    isARMode(): boolean;
    isARModeSupported(): boolean;
    getARSceneScale(): number;
    setARSceneScale(scale: number): void;
    getARSceneRotation(): number;
    setARSceneRotation(rotation: number): void;
    getMarkerPosition(name: string): __PositionService;
    isMarkerTracked(name: string): boolean;
    getMarker(name: string): Marker;
    setGyroMode(): void;
    setVRMode(): void;
    setARMode(): void;
    setDefaultMode(): void;
    onVRModeChanged(handler: (((arg0: boolean) => void))): void;
    isMobile(): boolean;
    isTablet(): boolean;
    setDefaultOrigin(slot: string): void;
    showWebViewPopup(url: string, title: string): Disposable;
    showWebViewPopup(url: string, title: string, confirmLabel: string): Disposable;
    showWebViewPopup(url: string, title: string, confirmLabel: string, onClose: ((() => void))): Disposable;
    setReticleInput(reticleInput: boolean): void;
    createJoystick(): Joystick;
    createCameraJoystick(): Joystick;
    createJoystick(side: Side): Joystick;
    removeJoystick(): void;
    removeJoystick(side: Side): void;
    onExit(onExit: ((() => void))): void;
    createLearningEnvironment(stateSpaceSize: number, actionSpaceSize: number, doAction: (((action: Array<number>) => void)), doGetResponse: ((() => Array<number>)), doReset: ((() => Array<number>))): void;
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
    getPlayers(): Array<string>;
    onHostStart(func: ((() => void))): void;
    onConnect(func: (((arg0: {
        readonly playerId: string;
        readonly username: string;
        readonly email: string;
    }) => void))): void;
    onDisconnect(func: (((arg0: {
        readonly playerId: string;
        readonly username: string;
        readonly email: string;
    }) => void))): void;
    onHostReceived(func: (((id: string, message: string) => void))): void;
    sendToHost(message: string): void;
    isHost(): boolean;
    goTo(sceneId: string): void;
    goToScene(sceneId: string): void;
    goToSceneIndex(sceneIndex: number): void;
    goToNextScene(): void;
    goToPreviousScene(): void;
    createScene(name: string): string;
    deleteScene(sceneId: string): void;
    getSceneIndex(): number;
    readonly sceneIndex: number;
    getSceneName(): string;
    readonly sceneName: string;
    getLocale(): string;
    readonly locale: string;
    finishPlayMode(): void;
    finishPlayMode(imageId: string): void;
    startPlayMode(): void;
    showSceneNavigation(show: boolean): void;
    log(s: string): void;
    setProperty(key: string, value: string): void;
    getProperty(key: string): string;
    setGlobalProperty(key: string, value: string): void;
    setPhysicsTickRate(tick: number): void;
    getPhysicsTickRate(): number;
    copyPhysicsToModel(): void;
    copyScript(scriptName: string, fromId: string, toId: string): void;
    httpGet(path: string, callback: (((arg0: string) => void))): void;
    resetCurrentScene(): void;
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
interface Vector2 {
    x: number;
    y: number;
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
    constructor(_x: number, _y: number, _z: number);
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
declare namespace CoBlocksInternal {
    interface Types {
    }
    namespace Types {
        const VOID: Array<string>;
        const NUMBER: Array<string>;
        const INT: Array<string>;
        const LIST: Array<string>;
        const ANGLE: Array<string>;
        const COLOR: Array<string>;
        const DX_GAME_ITEM: Array<string>;
        const DX_TEXT_ITEM: Array<string>;
        const DX_BASE_ITEM: Array<string>;
        const DX_GROUP: Array<string>;
        const DX_PHYSICS_ITEM: Array<string>;
        const BOOLEAN: Array<string>;
        const OBJECT: Array<string>;
        const STRING: Array<string>;
        const SCENE: Array<string>;
        const VEC3: Array<string>;
        const ANY: Array<string>;
    }
}
declare namespace CoBlocks {
    namespace Model {
        interface Block {
            readonly id: string;
            getInputs(): Array<CoBlocks.Model.Input>;
            getInput(name: string): CoBlocks.Model.Input;
            copy(): CoBlocks.Model.Block;
            readonly parent: CoBlocks.Model.Block;
            readonly inputName: string;
            removeFromContainer(): void;
            readonly kind: CoBlocks.Model.BlockKind;
            disabled: boolean;
            readonly actuallyDisabled: boolean;
        }
    }
}
declare namespace CoBlocksInternal {
    interface BlockIds {
    }
    namespace BlockIds {
        const INT_OUTPUT: string;
        const ANGLE_OUTPUT: string;
        const TEXT_OUTPUT: string;
        const ITEM_OUTPUT: string;
        const ON_ACTIVATE: string;
        const COPY: string;
        const FUNCTIONS: string;
        const MATH_FRACTION: string;
        const MATH_ROOT: string;
        const MATH_SQUARE_ROOT: string;
        const MATH_CUBE_ROOT: string;
        const MATH_EXPONENT: string;
        const MATH_SQUARE: string;
        const MATH_CUBE: string;
        const MATH_PLUS: string;
        const MATH_MINUS: string;
        const MATH_TIMES: string;
        const MATH_LOG: string;
        const IGNORE_EXPRESSION: string;
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
declare namespace CoBlocksInternal {
    interface FieldIds {
    }
    namespace FieldIds {
        const IMAGE_ASSETS: string;
        const SOUND_ASSETS: string;
        const SCENE: string;
        const INT: string;
        const NUMBER: string;
        const TEXT: string;
        const GAME_ITEM: string;
        const TEXT_ITEM: string;
        const GROUP: string;
        const PHYSICS_ITEM: string;
        const ANGLE: string;
        const COLOR: string;
        const BOOLEAN: string;
        const VEC3: string;
        const VARIABLE_USAGE: string;
        const VARIABLE_DEFINITION: string;
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
            readonly parent: CoBlocks.Model.Block;
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
        type InputKind = 'statement' | 'block' | 'field';
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
            readonly parent: CoBlocks.Model.StatementLikeBlock;
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
            readonly parent: CoBlocks.Model.StatementLikeBlock;
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
interface AnisotropicItemBase extends FigureItem, ComposableItem {
    setTexture(id: string, ch: number): void;
    setTextureIds(ids: Array<string>): void;
    setTextureBlend(b: boolean): void;
    setBlendColors(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number): void;
}
interface AnisotropicItem extends AnisotropicItemBase {
}
interface BaseItem extends SceneItem, __PositionService {
    getColor(): Array<number>;
    setColor(red: number, green: number, blue: number): void;
    setColorFromString(color: string): void;
    setHighlightColor(red: number, green: number, blue: number): void;
    setHighlightIntensity(intensity: number): void;
    setHighlightFrequency(f: number): void;
    setHighlightAmplitude(a: number): void;
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
    showInfoPanel(title: string, image: string, text: string, autoRemove: boolean, onHide: ((() => void))): Disposable;
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
    setPositionQuat(x: number, y: number, z: number, qx: number, qy: number, qz: number, qw: number): void;
    setPositionAngle(x: number, y: number, z: number, axisX: number, axisY: number, axisZ: number, angle: number): void;
    setHorizontalDirection(dirX: number, dirY: number): void;
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
    enableMultiplayerPhysics(): void;
    setMpVelocity(x: number, y: number, z: number): void;
    restrictMpRotation(x: boolean, y: boolean, z: boolean): void;
    setMpPhysicsPosition(x: number, y: number, z: number): void;
    setVisible(visible: boolean): void;
    setHighlighted(highlighted: boolean): void;
    isHighlighted(): boolean;
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
interface SceneItem {
    name(): string;
    setName(name: string): void;
    id(): string;
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
    setSize(length: number, width: number, height: number): void;
    setLength(length: number): void;
    setWidth(width: number): void;
    setHeight(height: number): void;
    length(): number;
    width(): number;
    height(): number;
    setText(text: any): void;
    text(): string;
    setTextColor(red: number, green: number, blue: number): void;
    setFontSize(value: number): void;
}
interface FractalItem extends GameItem {
    setGrowth(growth: number): void;
    setOrder(order: number): void;
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
interface Frustum extends AnisotropicItemBase {
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
