import { EventEmitter } from 'events'
import { rAF } from 'grid/AnimationFrame'
import { SITE_URL_PATH } from '../data/Config'

export class Url extends EventEmitter {
    constructor() {
        super()

        this.currentURL = window.location.pathname
        //check for changes in the URL, notify when there is
        rAF(() => {
            if (window.location.pathname !== this.currentURL) {
                this.currentURL = window.location.pathname
                //parse the ID
                this.notifyChange()
            }
        })

        //check initially
        if (this.currentURL.includes('/song/')) {
            setTimeout(() => {
                this.notifyChange()
            }, 10)
        }
    }

    notifyChange() {
        if (window.location.pathname.includes('/song/')) {
            const pathSplit = window.location.pathname.split('/')
            const id = pathSplit[pathSplit.length - 1]
            this.emit('change', id)
        }
        if (window.location.pathname === '/') {
            window.location = '/'
        }
    }
    setId(id) {
        this.currentURL = `${SITE_URL_PATH}/song/${id}`
        window.history.pushState({}, `Song ${id}`, this.currentURL)
    }
    clear() {
        this.currentURL = `${SITE_URL_PATH}/`
        window.history.pushState({}, `Meta Music`, this.currentURL)
    }
}
