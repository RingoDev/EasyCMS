/// <reference types="vite/client" />


interface ImportMetaEnv {
    VITE_BACKEND_URL: string | undefined
    VITE_STEFFLWIRT_URL: string | undefined
    BASE_URL: string
    MODE: string
    DEV: boolean
    PROD: boolean
    SSR: boolean
}

interface ImportMeta {
    url: string

    readonly hot?: import('./hot').ViteHotContext

    readonly env: ImportMetaEnv

    glob: import('./importGlob').ImportGlobFunction
}

