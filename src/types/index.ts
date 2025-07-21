export interface ShapeType {
    id: string;
    type: 'circle' | 'square' | 'triangle';
    x: number;
    y: number;
    width: number;
    height: number;
    color?: string;
}

export interface Shape {
    id: string;
    type: ShapeType;
    x: number;
    y: number;
}

export interface CanvasState {
    shapes: Shape[];
}

export interface PaintingData {
    name: string;
    shapes: ShapeType[];
}