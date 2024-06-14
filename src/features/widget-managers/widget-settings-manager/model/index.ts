import { createEffect, createEvent, createStore, guard } from 'effector';

export const $webfontList = createStore<string[]>([]);

export const getWebfontListFx = createEffect(() => {
    return [
        'Manrope',
        'Open Sans',
        'Montserrat',
        'Oswald',
        'Roboto Mono',
        'Raleway',
        'Nunito',
        'Roboto Slab',
        'Inter',
        'Rubik',
        'Fira Sans',
        'Mulish',
        'IBM Plex Sans',
        'Bitter',
        'Source Code Pro',
        'Comfortaa',
        'Exo 2',
        'Yanone Kaffeesatz',
        'Overpass',
        'IBM Plex Serif',
    ];
});

export const webfontListRequested = createEvent();

$webfontList.on(getWebfontListFx.doneData, (_, webfontList) => webfontList);

guard({
    clock: webfontListRequested,
    filter: $webfontList.map(({ length }) => !length),
    target: getWebfontListFx,
});
