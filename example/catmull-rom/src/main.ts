import { vec } from '@vole-engine/core'
import { BezierPath, Context, LinePath } from '@vole-engine/draw'
import { catmullRomSpline } from '@vole-engine/draw/curve/catmull-rom'

const drawBezier = (path: BezierPath) => {
    ctx.path(path.build(), pathOpts)
    path.points.forEach(([p0, p1, , p3], i) => {
        const h1 = p1
        const h2 = i > 0 ? path.points[i - 1][2] : p0
        ctx
            .circle(h1, 4, { fill: '#ffaa22' })
            .circle(h2, 4, { fill: '#2244aa' })
            .line(h1, h2, { stroke: '#009900' })
            .circle(p0, 6, pointOpts)
            .circle(p3, 6, pointOpts)
    })
}

const canvas = <HTMLCanvasElement>document.getElementById('canvas')
const canvasSize = vec(800, 600)
canvas.width = canvasSize.x
canvas.height = canvasSize.y

const ctx = new Context(canvas)
ctx.rect(canvasSize.scale(0.5), canvasSize, { fill: '#222222' })

const pathOpts = { stroke: 'white', lineWidth: 2 }
const pointOpts = { fill: '#aa22aa' }

const path = [vec(0, 0), vec(100, 0), vec(0, 200), vec(100, 200)]

const line = new LinePath(path.map(p => p.add(vec(100, 200))))
ctx.path(line.build(), pathOpts)
line.points.forEach(p => ctx.circle(p, 6, pointOpts))

const bezierOpen = new BezierPath(catmullRomSpline(path.map(p => p.add(vec(350, 200))), false))
drawBezier(bezierOpen)

const bezierClosed = new BezierPath(catmullRomSpline(path.map(p => p.add(vec(600, 200))), true))
drawBezier(bezierClosed)
