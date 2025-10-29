import { Vector } from "@vole-engine/core/vector"

/**
 * Create Catmull-Rom spline segments from an array of points.
 *
 * @returns 4-tuple of [start, control1, control2, end] cubic Bezier positions
 */
export const catmullRomSpline = (
    points: Vector[],
    enclosed: boolean = true,
    k: number = 1
): [Vector, Vector, Vector, Vector][] => {
    let path: [Vector, Vector, Vector, Vector][] = []
    const ps = enclosed
        ? [...points, points[0], points[1], points[2]]
        : points = [points[0], ...points, points[points.length - 1]]

    for (let i = 0; i < ps.length - 3; i++) {
        const v0 = ps[i]
        const v1 = ps[i + 1]
        const v2 = ps[i + 2]
        const v3 = ps[i + 3]
        const cp1 = v1.add(v2.sub(v0).scale(k / 6))
        const cp2 = v2.sub(v3.sub(v1).scale(k / 6))

        path.push([v1, cp1, cp2, v2])
    }

    return path
}

