import type { App } from 'vue';
import { FontAwesomeIcon,FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
import { Library, library } from '@fortawesome/fontawesome-svg-core';
import { faGuitar, faHouse } from '@fortawesome/free-solid-svg-icons'
import { faWeixin, faQq, faGithub } from '@fortawesome/free-brands-svg-icons'

library.add(faWeixin, faQq, faGithub, faGuitar, faHouse)
export function setupComponents(app: App<Element>) {
    app.component('font-awesome-icon', FontAwesomeIcon)
    app.component('font-awesome-layers', FontAwesomeLayers)
    app.component('font-awesome-layers-text', FontAwesomeLayersText)
}

export default FontAwesomeIcon