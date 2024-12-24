import * as THREE from "three"
import EventEmitter from "./EventEmitter";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

export default class Resources extends EventEmitter {
    constructor(sources)
    {
        super()

        this.sources = sources

        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
    }

    setLoaders() {
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
    }

    startLoading() {
        for (const source of this.sources) {
            switch (source.type) {
                case "gltfModel":
                    this.loaders.gltfLoader.load(
                        source.path,
                        (file) => {
                            this.sourceLoaded(source, file)
                        }
                    )
                case "texture":
                    this.loaders.textureLoader.load(
                        source.path,
                        (file) => {
                            this.sourceLoaded(source, file)
                        }
                    )
                case "cubeTexture":
                    this.loaders.cubeTextureLoader.load(
                        source.path,
                        (file) => {
                            this.sourceLoaded(source, file)
                        }
                    )
            }
        }
    }

    sourceLoaded(source, file) {
        this.items[source.name] = file
        
        this.loaded += 1

        if (this.loaded === this.toLoad)
            this.trigger('ready')
    }
}