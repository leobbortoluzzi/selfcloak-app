import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

const pages = {"index":{"outputDir":"./","lang":"pt","cacheVersion":81,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:site_name","content":"Selfcloak"},{"property":"og:type","content":"website"},{"name":"robots","content":"noindex, nofollow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://4beff381-6b43-49d8-bb3c-5539a893126d.weweb-preview.io/"},{"rel":"alternate","hreflang":"pt","href":"https://4beff381-6b43-49d8-bb3c-5539a893126d.weweb-preview.io/"}]},"login":{"outputDir":"./login","lang":"pt","cacheVersion":81,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:site_name","content":"Selfcloak"},{"property":"og:type","content":"website"},{"name":"robots","content":"noindex, nofollow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://4beff381-6b43-49d8-bb3c-5539a893126d.weweb-preview.io/login/"},{"rel":"alternate","hreflang":"pt","href":"https://4beff381-6b43-49d8-bb3c-5539a893126d.weweb-preview.io/login/"}]},"requests":{"outputDir":"./requests","lang":"pt","cacheVersion":81,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:site_name","content":"Selfcloak"},{"property":"og:type","content":"website"},{"name":"robots","content":"noindex, nofollow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://4beff381-6b43-49d8-bb3c-5539a893126d.weweb-preview.io/requests/"},{"rel":"alternate","hreflang":"pt","href":"https://4beff381-6b43-49d8-bb3c-5539a893126d.weweb-preview.io/requests/"}]},"pages":{"outputDir":"./pages","lang":"pt","cacheVersion":81,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:site_name","content":"Selfcloak"},{"property":"og:type","content":"website"},{"name":"robots","content":"noindex, nofollow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://4beff381-6b43-49d8-bb3c-5539a893126d.weweb-preview.io/pages/"},{"rel":"alternate","hreflang":"pt","href":"https://4beff381-6b43-49d8-bb3c-5539a893126d.weweb-preview.io/pages/"}]},"domains":{"outputDir":"./domains","lang":"pt","cacheVersion":81,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:site_name","content":"Selfcloak"},{"property":"og:type","content":"website"},{"name":"robots","content":"noindex, nofollow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://4beff381-6b43-49d8-bb3c-5539a893126d.weweb-preview.io/domains/"},{"rel":"alternate","hreflang":"pt","href":"https://4beff381-6b43-49d8-bb3c-5539a893126d.weweb-preview.io/domains/"}]},"add-page":{"outputDir":"./add-page","lang":"pt","cacheVersion":81,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:site_name","content":"Selfcloak"},{"property":"og:type","content":"website"},{"name":"robots","content":"noindex, nofollow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://4beff381-6b43-49d8-bb3c-5539a893126d.weweb-preview.io/add-page/"},{"rel":"alternate","hreflang":"pt","href":"https://4beff381-6b43-49d8-bb3c-5539a893126d.weweb-preview.io/add-page/"}]},"settings":{"outputDir":"./settings","lang":"pt","cacheVersion":81,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:site_name","content":"Selfcloak"},{"property":"og:type","content":"website"},{"name":"robots","content":"noindex, nofollow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://4beff381-6b43-49d8-bb3c-5539a893126d.weweb-preview.io/settings/"},{"rel":"alternate","hreflang":"pt","href":"https://4beff381-6b43-49d8-bb3c-5539a893126d.weweb-preview.io/settings/"}]}};

// Read the main HTML template
const template = fs.readFileSync(path.resolve(__dirname, 'template.html'), 'utf-8');
const compiledTemplate = handlebars.compile(template);

// Generate an HTML file for each page with its metadata
Object.values(pages).forEach(pageConfig => {
    // Compile the template with page metadata
    const html = compiledTemplate({
        title: pageConfig.title,
        lang: pageConfig.lang,
        meta: pageConfig.meta,
        structuredData: pageConfig.structuredData || null,
        scripts: {
            head: pageConfig.scripts.head,
            body: pageConfig.scripts.body,
        },
        alternateLinks: pageConfig.alternateLinks,
        cacheVersion: pageConfig.cacheVersion,
        baseTag: pageConfig.baseTag,
    });

    // Save output html for each page
    if (!fs.existsSync(pageConfig.outputDir)) {
        fs.mkdirSync(pageConfig.outputDir, { recursive: true });
    }
    fs.writeFileSync(`${pageConfig.outputDir}/index.html`, html);
});

const rollupOptionsInput = {};
for (const pageName in pages) {
    rollupOptionsInput[pageName] = path.resolve(__dirname, pages[pageName].outputDir, 'index.html');
}

export default defineConfig(() => {
    return {
        plugins: [nodePolyfills({ include: ['events', 'stream', 'string_decoder'] }), vue()],
        base: "/",
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                },
            },
            postcss: {
                plugins: [autoprefixer],
            },
        },
        build: {
            chunkSizeWarningLimit: 10000,
            rollupOptions: {
                input: rollupOptionsInput,
                onwarn: (entry, next) => {
                    if (entry.loc?.file && /js$/.test(entry.loc.file) && /Use of eval in/.test(entry.message)) return;
                    return next(entry);
                },
                maxParallelFileOps: 900,
            },
        },
        logLevel: 'warn',
    };
});
