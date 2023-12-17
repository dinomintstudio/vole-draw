import { Vector } from "@vole-engine/core";

export class BezierPath {

    points: [Vector, Vector, Vector, Vector][]

    constructor(points: [Vector, Vector, Vector, Vector][]) {
        this.points = points
    }

    build(): Path2D {
        if (this.points.length === 0) return new Path2D()
        const path = new Path2D()
        const start = this.points[0][0]
        path.moveTo(start.x, start.y)
        for (const [, p1, p2, p3] of this.points) {
            path.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y)
        }
        return path
    }
}
