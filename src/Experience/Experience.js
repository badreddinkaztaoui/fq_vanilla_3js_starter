import * as THREE from "three"

import Sizes from "./Utils/Sizes.js"
import Timer from "./Utils/Timer.js"
import Camera from "./Camera.js"
import Renderer from "./Renderer.js"
import World from "./World/World.js"
import Resources from "./Utils/Resources.js"
import Debug from "./Utils/Debug.js"

import sources from "./sources.js"

let instance = null

export default class Experience {
    constructor (canvas) {
        if (instance)
            return instance

        instance = this

        this.canvas = canvas

        this.debug = new Debug()
        this.sizes = new Sizes()
        this.timer = new Timer()
        this.scene = new THREE.Scene()
        
        this.resources = new Resources(sources)
        
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()

        this.sizes.on("resize", () => this.resize())
        this.timer.on("tick", () => this.update())
    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }

    destroy() {
        this.sizes.off('resize')
        this.sizes.off('tick')

        this.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose()

                for (const key in child.material) {
                    const value = child.material[key]
                    
                    if (value && typeof value.dispose === 'function')
                        value.dispose()
                }
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if (this.debug.active)
            this.debug.ui.destroy()

        window.removeEventListener("resize")
    }
}