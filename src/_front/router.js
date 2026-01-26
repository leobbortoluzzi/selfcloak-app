import { createRouter, createWebHistory } from 'vue-router';

import wwPage from './views/wwPage.vue';

import { initializeData, initializePlugins, onPageUnload } from '@/_common/helpers/data';

let router;
const routes = [];

function scrollBehavior(to) {
    if (to.hash) {
        return {
            el: to.hash,
            behavior: 'smooth',
        };
    } else {
        return { top: 0 };
    }
}

 
/* wwFront:start */
import pluginsSettings from '../../plugins-settings.json';

// eslint-disable-next-line no-undef
window.wwg_designInfo = {"id":"4beff381-6b43-49d8-bb3c-5539a893126d","homePageId":"8d6b7c86-3af9-46d7-a3c1-97bec4b5d21a","authPluginId":"01af5352-af71-4382-844b-2ec141ff243b","baseTag":{},"defaultTheme":"light","langs":[{"lang":"pt","default":true,"isDefaultPath":false},{"lang":"en","default":false,"isDefaultPath":false}],"background":{"backgroundColor":"var(--91a9e9bf-58f0-496e-8842-bb67fe2e1e3e,#FBFBFB)"},"workflows":[],"pages":[{"id":"cd5b928f-f80c-45a3-8c16-94b92f4d05a9","linkId":"cd5b928f-f80c-45a3-8c16-94b92f4d05a9","name":"Login","folder":null,"paths":{"pt":"login","default":"login"},"langs":["pt","en"],"cmsDataSetPath":null,"sections":[{"uid":"f0fd7772-81ff-4370-8652-5ca761eb65ae","sectionTitle":"Login","linkId":"c61a4b63-a7e1-4bfe-9027-df6f263ca1bc"}],"pageUserGroups":[],"title":{"en":"SelfCloak"},"meta":{"desc":{"en":"SelfCloak"},"keywords":{"en":"SelfCloak"},"socialDesc":{"en":"SelfCloak"},"socialTitle":{"en":"SelfCloak"},"structuredData":{}},"metaImage":""},{"id":"ba47399a-7e6a-478e-b58d-1da21b048dbf","linkId":"ba47399a-7e6a-478e-b58d-1da21b048dbf","name":"Políticas","folder":null,"paths":{"pt":"politicas","default":"politicas"},"langs":["pt","en"],"cmsDataSetPath":null,"sections":[{"uid":"aad25c28-59b1-4134-ace0-392828899be8","sectionTitle":"Page","linkId":"3dc6c69a-aa65-4a26-9e49-e02045ce52ff"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"feed6162-fd03-48aa-a4d3-4446ff90e22a","linkId":"feed6162-fd03-48aa-a4d3-4446ff90e22a","name":"Termos","folder":null,"paths":{"pt":"termos","default":"termos"},"langs":["pt","en"],"cmsDataSetPath":null,"sections":[{"uid":"6dd213e6-d7fe-4135-9c45-d13f26489817","sectionTitle":"Page","linkId":"90c1f38d-f46a-4c21-a117-df129541396f"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"8d6b7c86-3af9-46d7-a3c1-97bec4b5d21a","linkId":"8d6b7c86-3af9-46d7-a3c1-97bec4b5d21a","name":"Home","folder":null,"paths":{"pt":"home_nova","default":"home_nova"},"langs":["pt","en"],"cmsDataSetPath":null,"sections":[{"uid":"378aca56-6687-40be-b4c4-dca961bd963d","sectionTitle":"Sidebar","linkId":"f44e1c89-7f9d-4123-b293-68b74674c33f"},{"uid":"242d7c4b-3b41-4c7f-8129-577025d8fdda","sectionTitle":"Header","linkId":"ac3c6673-4827-401e-b177-3df0d0806f78"},{"uid":"c99e9d52-f47c-46d0-bd54-932bfaa4679b","sectionTitle":"Content","linkId":"994a3c09-421d-49b7-9145-5a4e5974ec97"}],"pageUserGroups":[{}],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""}],"plugins":[{"id":"f9ef41c3-1c53-4857-855b-f2f6a40b7186","name":"Supabase","namespace":"supabase"},{"id":"1c5f5c0f-5609-4031-9e57-5bb4811be7b3","name":"Youtube","namespace":"youtube"},{"id":"1fa0dd68-5069-436c-9a7d-3b54c340f1fa","name":"Supabase Auth","namespace":"supabaseAuth"},{"id":"9c40819b-4a8f-468f-9ba5-4b9699f3361f","name":"Charts","namespace":"chartjs"},{"id":"832d6f7a-42c3-43f1-a3ce-9a678272f811","name":"Date","namespace":"dayjs"},{"id":"2bd1c688-31c5-443e-ae25-59aa5b6431fb","name":"REST API","namespace":"restApi"},{"id":"01af5352-af71-4382-844b-2ec141ff243b","name":"OpenID","namespace":"openid"}]};
// eslint-disable-next-line no-undef
window.wwg_cacheVersion = 100;
// eslint-disable-next-line no-undef
window.wwg_pluginsSettings = pluginsSettings;
// eslint-disable-next-line no-undef
window.wwg_disableManifest = true;

const defaultLang = window.wwg_designInfo.langs.find(({ default: isDefault }) => isDefault) || {};

const registerRoute = (page, lang, forcedPath) => {
    const langSlug = !lang.default || lang.isDefaultPath ? `/${lang.lang}` : '';
    let path =
        forcedPath ||
        (page.id === window.wwg_designInfo.homePageId ? '/' : `/${page.paths[lang.lang] || page.paths.default}`);

    //Replace params
    path = path.replace(/{{([\w]+)\|([^/]+)?}}/g, ':$1');

    routes.push({
        path: langSlug + path,
        component: wwPage,
        name: `page-${page.id}-${lang.lang}`,
        meta: {
            pageId: page.id,
            lang,
            isPrivate: !!page.pageUserGroups?.length,
        },
        async beforeEnter(to, from) {
            if (to.name === from.name) return;
            //Set page lang
            wwLib.wwLang.defaultLang = defaultLang.lang;
            wwLib.$store.dispatch('front/setLang', lang.lang);

            //Init plugins
            await initializePlugins();

            //Check if private page
            if (page.pageUserGroups?.length) {
                // cancel navigation if no plugin
                if (!wwLib.wwAuth.plugin) {
                    return false;
                }

                await wwLib.wwAuth.init();

                // Redirect to not sign in page if not logged
                if (!wwLib.wwAuth.getIsAuthenticated()) {
                    window.location.href = `${wwLib.wwPageHelper.getPagePath(
                        wwLib.wwAuth.getUnauthenticatedPageId()
                    )}?_source=${to.path}`;

                    return null;
                }

                //Check roles are required
                if (
                    page.pageUserGroups.length > 1 &&
                    !wwLib.wwAuth.matchUserGroups(page.pageUserGroups.map(({ userGroup }) => userGroup))
                ) {
                    window.location.href = `${wwLib.wwPageHelper.getPagePath(
                        wwLib.wwAuth.getUnauthorizedPageId()
                    )}?_source=${to.path}`;

                    return null;
                }
            }

            try {
                await import(`@/pages/${page.id.split('_')[0]}.js`);
                await wwLib.wwWebsiteData.fetchPage(page.id);

                //Scroll to section or on top after page change
                if (to.hash) {
                    const targetElement = document.getElementById(to.hash.replace('#', ''));
                    if (targetElement) targetElement.scrollIntoView();
                } else {
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                }

                return;
            } catch (err) {
                wwLib.$store.dispatch('front/showPageLoadProgress', false);

                if (err.redirectUrl) {
                    return { path: err.redirectUrl || '404' };
                } else {
                    //Any other error: go to target page using window.location
                    window.location = to.fullPath;
                }
            }
        },
    });
};

for (const page of window.wwg_designInfo.pages) {
    for (const lang of window.wwg_designInfo.langs) {
        if (!page.langs.includes(lang.lang)) continue;
        registerRoute(page, lang);
    }
}

const page404 = window.wwg_designInfo.pages.find(page => page.paths.default === '404');
if (page404) {
    for (const lang of window.wwg_designInfo.langs) {
        // Create routes /:lang/:pathMatch(.*)* etc for all langs of the 404 page
        if (!page404.langs.includes(lang.lang)) continue;
        registerRoute(
            page404,
            {
                default: false,
                lang: lang.lang,
            },
            '/:pathMatch(.*)*'
        );
    }
    // Create route /:pathMatch(.*)* using default project lang
    registerRoute(page404, { default: true, isDefaultPath: false, lang: defaultLang.lang }, '/:pathMatch(.*)*');
} else {
    routes.push({
        path: '/:pathMatch(.*)*',
        async beforeEnter() {
            window.location.href = '/404';
        },
    });
}

let routerOptions = {};

const isProd =
    !window.location.host.includes(
        // TODO: add staging2 ?
        '-staging.' + (process.env.WW_ENV === 'staging' ? import.meta.env.VITE_APP_PREVIEW_URL : '')
    ) && !window.location.host.includes(import.meta.env.VITE_APP_PREVIEW_URL);

if (isProd && window.wwg_designInfo.baseTag?.href) {
    let baseTag = window.wwg_designInfo.baseTag.href;
    if (!baseTag.startsWith('/')) {
        baseTag = '/' + baseTag;
    }
    if (!baseTag.endsWith('/')) {
        baseTag += '/';
    }

    routerOptions = {
        base: baseTag,
        history: createWebHistory(baseTag),
        routes,
    };
} else {
    routerOptions = {
        history: createWebHistory(),
        routes,
    };
}

router = createRouter({
    ...routerOptions,
    scrollBehavior,
});

//Trigger on page unload
let isFirstNavigation = true;
router.beforeEach(async (to, from) => {
    if (to.name === from.name) return;
    if (!isFirstNavigation) await onPageUnload();
    isFirstNavigation = false;
    wwLib.globalVariables._navigationId++;
    return;
});

//Init page
router.afterEach((to, from, failure) => {
    wwLib.$store.dispatch('front/showPageLoadProgress', false);
    let fromPath = from.path;
    let toPath = to.path;
    if (!fromPath.endsWith('/')) fromPath = fromPath + '/';
    if (!toPath.endsWith('/')) toPath = toPath + '/';
    if (failure || (from.name && toPath === fromPath)) return;
    initializeData(to);
});
/* wwFront:end */

export default router;
