import { Vector } from "@vole-engine/core";

export class LinePath {

    points: Vector[]

    constructor(points: Vector[]) {
        this.points = points
    }

    build(): Path2D {
        if (this.points.length === 0) return new Path2D()
        const path = new Path2D()
        const start = this.points[0]
        path.moveTo(start.x, start.y)
        for (const p of this.points.slice(1)) {
            path.lineTo(p.x, p.y)
        }
        return path
    }
}
