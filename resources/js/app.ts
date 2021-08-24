import '../css/app.css'
import { createInertiaApp } from '@inertiajs/inertia-svelte';

createInertiaApp({
    resolve: (name: string) => require(`./Pages/${name}.svelte`),
    setup({ el, App, props }: any) {
        new App({ target: el, props })
    },
})
