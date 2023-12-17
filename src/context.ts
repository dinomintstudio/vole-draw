import { Color, Vector, vec } from "@vole-engine/core"

export interface DrawOptions {
    fill?: Color | string | CanvasGradient | CanvasPattern
    stroke?: Color | string | CanvasGradient | CanvasPattern
    lineWidth?: number
}

export class Context {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')!
    }

    size(): Vector {
        return vec(this.canvas.width, this.canvas.height)
    }

    clear(): Context {
        const s = this.size()
        this.ctx.clearRect(0, 0, s.x, s.y)
        return this
    }

    circle(center: Vector, radius: number, opts?: DrawOptions): Context {
        this.ctx.beginPath()
        this.ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI)
        this.endPath(opts)
        return this
    }

    rect(center: Vector, size: Vector, opts?: DrawOptions): Context {
        const topLeft = center.sub(size.scale(0.5))
        this.ctx.beginPath()
        this.ctx.rect(topLeft.x, topLeft.y, size.x, size.y)
        this.endPath(opts)
        return this
    }

    endPath(opts?: DrawOptions, path?: Path2D): Context {
        if (opts?.fill) {
            this.ctx.fillStyle = opts.fill ? narrowColor(opts.fill) : '#000'
            if (path) {
                this.ctx.fill(path)
            } else {
                this.ctx.fill()
            }
        }
        if (opts?.stroke) {
            this.ctx.strokeStyle = opts.stroke ? narrowColor(opts.stroke) : '#000'
            this.ctx.lineWidth = opts.lineWidth ?? 1
            if (path) {
                this.ctx.stroke(path)
            } else {
                this.ctx.stroke()
            }
        }
        return this
    }

    image(image: CanvasImageSource, center: Vector, size?: Vector): Context {
        if (size) {
            const topLeft = center.sub(size.scale(0.5))
            this.ctx.drawImage(image, topLeft.x, topLeft.y, size.x, size.y)
        } else {
            const imgSize = vec(<number>image.width, <number>image.height)
            const topLeft = center.sub(imgSize.scale(0.5))
            this.ctx.drawImage(image, topLeft.x, topLeft.y)
        }
        return this
    }

    line(start: Vector, end: Vector, opts?: DrawOptions): Context {
        const path = new Path2D()
        path.moveTo(start.x, start.y)
        path.lineTo(end.x, end.y)
        this.endPath(opts, path)
        return this
    }

    path(path: Path2D, opts?: DrawOptions): Context {
        this.endPath(opts, path)
        return this
    }

    translate(pos: Vector): Context {
        this.ctx.translate(pos.x, pos.y)
        return this
    }

    rotate(angle: number): Context {
        this.ctx.rotate(angle)
        return this
    }

    resetTransform(): Context {
        this.ctx.resetTransform()
        return this
    }

}

export const narrowColor = (color: Color | string | CanvasGradient | CanvasPattern): string | CanvasGradient | CanvasPattern => {
    if (color instanceof Color) {
        return color.toString()
    } else {
        return color
    }
}
