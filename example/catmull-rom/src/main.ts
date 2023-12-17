import { vec } from '@vole-engine/core'
import { BezierPath, Context, LinePath } from '@vole-engine/draw'
import { catmullRomSpline } from '@vole-engine/draw/curve/catmull-rom'

const canvas = <HTMLCanvasElement>document.getElementById('canvas')
const canvasSize = vec(800, 600)
canvas.width = canvasSize.x
canvas.height = canvasSize.y

const ctx = new Context(canvas)

const polygonal = new LinePath([vec(100, 200), vec(250, 120), vec(300, 400), vec(100, 300)])
ctx.path(polygonal.build(), { stroke: 'blue' })
polygonal.points.forEach(p => ctx.circle(p, 10, { fill: 'green' }))

const polygonal2 = [vec(600, 200), vec(700, 200), vec(600, 400), vec(700, 400)]
polygonal2.forEach(p => ctx.circle(p, 6, { fill: 'purple' }))

const bezier = new BezierPath(catmullRomSpline(polygonal2, false))
ctx.path(bezier.build(), { stroke: 'black' })
bezier.points.forEach(([p0, p1], i) => {
    const h1 = p1
    const h2 = i > 0 ? bezier.points[i - 1][2] : p0
    ctx
        .circle(h1, 4, { fill: '#ffaa22' })
        .circle(h2, 4, { fill: '#2244aa' })
        .line(h1, h2, { stroke: '#009900' })
})
