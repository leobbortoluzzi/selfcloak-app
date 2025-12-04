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
window.wwg_designInfo = {"id":"4beff381-6b43-49d8-bb3c-5539a893126d","homePageId":"cd8d8240-5f02-43ca-b25b-5ed6b83c268e","authPluginId":"1fa0dd68-5069-436c-9a7d-3b54c340f1fa","baseTag":{},"defaultTheme":"light","langs":[{"lang":"pt","default":true,"isDefaultPath":false}],"background":{"backgroundColor":"var(--91a9e9bf-58f0-496e-8842-bb67fe2e1e3e,#f5f5f5)"},"workflows":[],"pages":[{"id":"cd8d8240-5f02-43ca-b25b-5ed6b83c268e","linkId":"cd8d8240-5f02-43ca-b25b-5ed6b83c268e","name":"Home","folder":null,"paths":{"pt":"home","default":"home"},"langs":["pt"],"cmsDataSetPath":null,"sections":[{"uid":"29ab425d-cd8d-448a-8daf-1c5715bcf33c","sectionTitle":"nav","linkId":"00eafa08-2978-44da-be9e-5878e3e25ae1"},{"uid":"f78cbd1b-2755-48d8-902a-4af18c333dd4","sectionTitle":"content","linkId":"cde19576-3520-4ce0-a9d4-7b81edd4d634"}],"pageUserGroups":[{}],"title":{"en":"SelfCloak"},"meta":{"desc":{"en":"SelfCloak"},"keywords":{"en":"SelfCloak"},"socialDesc":{"en":"SelfCloak"},"socialTitle":{"en":"SelfCloak"},"structuredData":{}},"metaImage":""},{"id":"b008100a-0041-4468-a230-b6deb9365211","linkId":"b008100a-0041-4468-a230-b6deb9365211","name":"Login","folder":null,"paths":{"pt":"login","default":"login"},"langs":["pt"],"cmsDataSetPath":null,"sections":[{"uid":"4bb1c47e-f3c1-47aa-811b-68a7a1befa1d","sectionTitle":"login","linkId":"07af7569-a6b2-44b4-b8db-9d1304182bfe"}],"pageUserGroups":[],"title":{"en":"SelfCloak"},"meta":{"desc":{"en":"SelfCloak"},"keywords":{"en":"SelfCloak"},"socialDesc":{"en":"SelfCloak"},"socialTitle":{"en":"SelfCloak"},"structuredData":{}},"metaImage":""},{"id":"f94c7361-1fcf-464c-b8ea-218117f66ccf","linkId":"f94c7361-1fcf-464c-b8ea-218117f66ccf","name":"Requests","folder":null,"paths":{"pt":"requests","default":"requests"},"langs":["pt"],"cmsDataSetPath":null,"sections":[{"uid":"29ab425d-cd8d-448a-8daf-1c5715bcf33c","sectionTitle":"nav","linkId":"00eafa08-2978-44da-be9e-5878e3e25ae1"},{"uid":"59ad0b40-4104-4c44-96f5-e624597fef3b","sectionTitle":"content","linkId":"ed8d575f-8d25-4292-922d-0773f41c662a"}],"pageUserGroups":[{}],"title":{"en":"SelfCloak"},"meta":{"desc":{"en":"SelfCloak"},"keywords":{"en":"SelfCloak"},"socialDesc":{"en":"SelfCloak"},"socialTitle":{"en":"SelfCloak"},"structuredData":{}},"metaImage":""},{"id":"78e6710e-d68e-4382-8798-411c4e2408d1","linkId":"78e6710e-d68e-4382-8798-411c4e2408d1","name":"Pages","folder":null,"paths":{"pt":"pages","default":"pages"},"langs":["pt"],"cmsDataSetPath":null,"sections":[{"uid":"29ab425d-cd8d-448a-8daf-1c5715bcf33c","sectionTitle":"nav","linkId":"00eafa08-2978-44da-be9e-5878e3e25ae1"},{"uid":"4a546d2f-faf9-40d3-a120-e131eda8ec24","sectionTitle":"content","linkId":"76c72ab6-d32e-4e3a-81cf-3ba0098ce457"}],"pageUserGroups":[{}],"title":{"en":"SelfCloak"},"meta":{"desc":{"en":"SelfCloak"},"keywords":{"en":"SelfCloak"},"socialDesc":{"en":"SelfCloak"},"socialTitle":{"en":"SelfCloak"},"structuredData":{}},"metaImage":""},{"id":"c007f252-e7e6-4002-a9f7-8fb258291a49","linkId":"c007f252-e7e6-4002-a9f7-8fb258291a49","name":"Domains","folder":null,"paths":{"pt":"domains","default":"domains"},"langs":["pt"],"cmsDataSetPath":null,"sections":[{"uid":"29ab425d-cd8d-448a-8daf-1c5715bcf33c","sectionTitle":"nav","linkId":"00eafa08-2978-44da-be9e-5878e3e25ae1"},{"uid":"f6f7c8ef-4a5f-4d3a-95b3-8ad235251cc1","sectionTitle":"content","linkId":"24f0f0dc-eb4a-4258-8f65-5467631d3af7"}],"pageUserGroups":[{}],"title":{"en":"SelfCloak"},"meta":{"desc":{"en":"SelfCloak"},"keywords":{"en":"SelfCloak"},"socialDesc":{"en":"SelfCloak"},"socialTitle":{"en":"SelfCloak"},"structuredData":{}},"metaImage":""},{"id":"2e6f8c55-f869-45a9-935f-85c19881f135","linkId":"2e6f8c55-f869-45a9-935f-85c19881f135","name":"Add Page","folder":null,"paths":{"pt":"add-page","default":"add-page"},"langs":["pt"],"cmsDataSetPath":null,"sections":[{"uid":"29ab425d-cd8d-448a-8daf-1c5715bcf33c","sectionTitle":"nav","linkId":"00eafa08-2978-44da-be9e-5878e3e25ae1"},{"uid":"7d5b9447-47b8-4a19-8c09-9169b9781c2b","sectionTitle":"content","linkId":"a09487ea-0401-4cc3-8adc-9caf82d086b6"}],"pageUserGroups":[{}],"title":{"en":"SelfCloak"},"meta":{"desc":{"en":"SelfCloak"},"keywords":{"en":"SelfCloak"},"socialDesc":{"en":"SelfCloak"},"socialTitle":{"en":"SelfCloak"},"structuredData":{}},"metaImage":""},{"id":"1a6cd7f7-a74b-4fa0-9bb0-1f1b232ffaf8","linkId":"1a6cd7f7-a74b-4fa0-9bb0-1f1b232ffaf8","name":"Settings","folder":null,"paths":{"pt":"settings","default":"settings"},"langs":["pt"],"cmsDataSetPath":null,"sections":[{"uid":"29ab425d-cd8d-448a-8daf-1c5715bcf33c","sectionTitle":"nav","linkId":"00eafa08-2978-44da-be9e-5878e3e25ae1"},{"uid":"8bb4f0fc-0234-400e-af13-d83719787c0e","sectionTitle":"content","linkId":"404de2f9-954c-4954-ab80-272aacaf6991"}],"pageUserGroups":[{}],"title":{"en":"SelfCloak"},"meta":{"desc":{"en":"SelfCloak"},"keywords":{"en":"SelfCloak"},"socialDesc":{"en":"SelfCloak"},"socialTitle":{"en":"SelfCloak"},"structuredData":{}},"metaImage":""}],"plugins":[{"id":"f9ef41c3-1c53-4857-855b-f2f6a40b7186","name":"Supabase","namespace":"supabase"},{"id":"66a79c98-70e7-4bc4-8859-20776b024ec2","name":"PWA","namespace":"pwa"},{"id":"1fa0dd68-5069-436c-9a7d-3b54c340f1fa","name":"Supabase Auth","namespace":"supabaseAuth"},{"id":"9c40819b-4a8f-468f-9ba5-4b9699f3361f","name":"Charts","namespace":"chartjs"},{"id":"832d6f7a-42c3-43f1-a3ce-9a678272f811","name":"Date","namespace":"dayjs"},{"id":"2bd1c688-31c5-443e-ae25-59aa5b6431fb","name":"REST API","namespace":"restApi"}]};
// eslint-disable-next-line no-undef
window.wwg_cacheVersion = 79;
// eslint-disable-next-line no-undef
window.wwg_pluginsSettings = pluginsSettings;
// eslint-disable-next-line no-undef
window.wwg_disableManifest = false;

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
