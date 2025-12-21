module.exports = [
"[project]/.next-internal/server/app/api/trpc/[trpc]/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/env.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "env",
    ()=>env
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$t3$2d$oss$2f$env$2d$nextjs$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@t3-oss/env-nextjs/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
;
;
const env = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$t3$2d$oss$2f$env$2d$nextjs$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createEnv"])({
    /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */ server: {
        DATABASE_URL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url(),
        NODE_ENV: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
            "development",
            "test",
            "production"
        ]).default("development")
    },
    /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */ client: {
    },
    /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */ runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
        NODE_ENV: ("TURBOPACK compile-time value", "development")
    },
    /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */ skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */ emptyStringAsUndefined: true
});
}),
"[externals]/node:os [external] (node:os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:os", () => require("node:os"));

module.exports = mod;
}),
"[externals]/node:tty [external] (node:tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:tty", () => require("node:tty"));

module.exports = mod;
}),
"[externals]/node:fs [external] (node:fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs", () => require("node:fs"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/node:child_process [external] (node:child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:child_process", () => require("node:child_process"));

module.exports = mod;
}),
"[externals]/node:fs/promises [external] (node:fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs/promises", () => require("node:fs/promises"));

module.exports = mod;
}),
"[externals]/node:util [external] (node:util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:util", () => require("node:util"));

module.exports = mod;
}),
"[externals]/node:process [external] (node:process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:process", () => require("node:process"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[externals]/node:events [external] (node:events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:events", () => require("node:events"));

module.exports = mod;
}),
"[project]/generated/prisma/runtime/library.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* !!! This is code generated by Prisma. Do not edit directly. !!!
/* eslint-disable */ // biome-ignore-all lint: generated file
var yu = Object.create;
var jt = Object.defineProperty;
var bu = Object.getOwnPropertyDescriptor;
var Eu = Object.getOwnPropertyNames;
var wu = Object.getPrototypeOf, xu = Object.prototype.hasOwnProperty;
var Do = (e, r)=>()=>(e && (r = e(e = 0)), r);
var ue = (e, r)=>()=>(r || e((r = {
            exports: {}
        }).exports, r), r.exports), tr = (e, r)=>{
    for(var t in r)jt(e, t, {
        get: r[t],
        enumerable: !0
    });
}, Oo = (e, r, t, n)=>{
    if (r && typeof r == "object" || typeof r == "function") for (let i of Eu(r))!xu.call(e, i) && i !== t && jt(e, i, {
        get: ()=>r[i],
        enumerable: !(n = bu(r, i)) || n.enumerable
    });
    return e;
};
var O = (e, r, t)=>(t = e != null ? yu(wu(e)) : {}, Oo(r || !e || !e.__esModule ? jt(t, "default", {
        value: e,
        enumerable: !0
    }) : t, e)), vu = (e)=>Oo(jt({}, "__esModule", {
        value: !0
    }), e);
var hi = ue((_g, is)=>{
    "use strict";
    is.exports = (e, r = process.argv)=>{
        let t = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", n = r.indexOf(t + e), i = r.indexOf("--");
        return n !== -1 && (i === -1 || n < i);
    };
});
var as = ue((Ng, ss)=>{
    "use strict";
    var Fc = __turbopack_context__.r("[externals]/node:os [external] (node:os, cjs)"), os = __turbopack_context__.r("[externals]/node:tty [external] (node:tty, cjs)"), de = hi(), { env: G } = process, Qe;
    de("no-color") || de("no-colors") || de("color=false") || de("color=never") ? Qe = 0 : (de("color") || de("colors") || de("color=true") || de("color=always")) && (Qe = 1);
    "FORCE_COLOR" in G && (G.FORCE_COLOR === "true" ? Qe = 1 : G.FORCE_COLOR === "false" ? Qe = 0 : Qe = G.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(G.FORCE_COLOR, 10), 3));
    function yi(e) {
        return e === 0 ? !1 : {
            level: e,
            hasBasic: !0,
            has256: e >= 2,
            has16m: e >= 3
        };
    }
    function bi(e, r) {
        if (Qe === 0) return 0;
        if (de("color=16m") || de("color=full") || de("color=truecolor")) return 3;
        if (de("color=256")) return 2;
        if (e && !r && Qe === void 0) return 0;
        let t = Qe || 0;
        if (G.TERM === "dumb") return t;
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        if ("CI" in G) return [
            "TRAVIS",
            "CIRCLECI",
            "APPVEYOR",
            "GITLAB_CI",
            "GITHUB_ACTIONS",
            "BUILDKITE"
        ].some((n)=>n in G) || G.CI_NAME === "codeship" ? 1 : t;
        if ("TEAMCITY_VERSION" in G) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(G.TEAMCITY_VERSION) ? 1 : 0;
        if (G.COLORTERM === "truecolor") return 3;
        if ("TERM_PROGRAM" in G) {
            let n = parseInt((G.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
            switch(G.TERM_PROGRAM){
                case "iTerm.app":
                    return n >= 3 ? 3 : 2;
                case "Apple_Terminal":
                    return 2;
            }
        }
        return /-256(color)?$/i.test(G.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(G.TERM) || "COLORTERM" in G ? 1 : t;
    }
    function Mc(e) {
        let r = bi(e, e && e.isTTY);
        return yi(r);
    }
    ss.exports = {
        supportsColor: Mc,
        stdout: yi(bi(!0, os.isatty(1))),
        stderr: yi(bi(!0, os.isatty(2)))
    };
});
var cs = ue((Lg, us)=>{
    "use strict";
    var $c = as(), br = hi();
    function ls(e) {
        if (/^\d{3,4}$/.test(e)) {
            let t = /(\d{1,2})(\d{2})/.exec(e) || [];
            return {
                major: 0,
                minor: parseInt(t[1], 10),
                patch: parseInt(t[2], 10)
            };
        }
        let r = (e || "").split(".").map((t)=>parseInt(t, 10));
        return {
            major: r[0],
            minor: r[1],
            patch: r[2]
        };
    }
    function Ei(e) {
        let { CI: r, FORCE_HYPERLINK: t, NETLIFY: n, TEAMCITY_VERSION: i, TERM_PROGRAM: o, TERM_PROGRAM_VERSION: s, VTE_VERSION: a, TERM: l } = process.env;
        if (t) return !(t.length > 0 && parseInt(t, 10) === 0);
        if (br("no-hyperlink") || br("no-hyperlinks") || br("hyperlink=false") || br("hyperlink=never")) return !1;
        if (br("hyperlink=true") || br("hyperlink=always") || n) return !0;
        if (!$c.supportsColor(e) || e && !e.isTTY) return !1;
        if ("WT_SESSION" in process.env) return !0;
        if (process.platform === "win32" || r || i) return !1;
        if (o) {
            let u = ls(s || "");
            switch(o){
                case "iTerm.app":
                    return u.major === 3 ? u.minor >= 1 : u.major > 3;
                case "WezTerm":
                    return u.major >= 20200620;
                case "vscode":
                    return u.major > 1 || u.major === 1 && u.minor >= 72;
                case "ghostty":
                    return !0;
            }
        }
        if (a) {
            if (a === "0.50.0") return !1;
            let u = ls(a);
            return u.major > 0 || u.minor >= 50;
        }
        switch(l){
            case "alacritty":
                return !0;
        }
        return !1;
    }
    us.exports = {
        supportsHyperlink: Ei,
        stdout: Ei(process.stdout),
        stderr: Ei(process.stderr)
    };
});
var ps = ue((Kg, qc)=>{
    qc.exports = {
        name: "@prisma/internals",
        version: "6.19.0",
        description: "This package is intended for Prisma's internal use",
        main: "dist/index.js",
        types: "dist/index.d.ts",
        repository: {
            type: "git",
            url: "https://github.com/prisma/prisma.git",
            directory: "packages/internals"
        },
        homepage: "https://www.prisma.io",
        author: "Tim Suchanek <suchanek@prisma.io>",
        bugs: "https://github.com/prisma/prisma/issues",
        license: "Apache-2.0",
        scripts: {
            dev: "DEV=true tsx helpers/build.ts",
            build: "tsx helpers/build.ts",
            test: "dotenv -e ../../.db.env -- jest --silent",
            prepublishOnly: "pnpm run build"
        },
        files: [
            "README.md",
            "dist",
            "!**/libquery_engine*",
            "!dist/get-generators/engines/*",
            "scripts"
        ],
        devDependencies: {
            "@babel/helper-validator-identifier": "7.25.9",
            "@opentelemetry/api": "1.9.0",
            "@swc/core": "1.11.5",
            "@swc/jest": "0.2.37",
            "@types/babel__helper-validator-identifier": "7.15.2",
            "@types/jest": "29.5.14",
            "@types/node": "18.19.76",
            "@types/resolve": "1.20.6",
            archiver: "6.0.2",
            "checkpoint-client": "1.1.33",
            "cli-truncate": "4.0.0",
            dotenv: "16.5.0",
            empathic: "2.0.0",
            "escape-string-regexp": "5.0.0",
            execa: "8.0.1",
            "fast-glob": "3.3.3",
            "find-up": "7.0.0",
            "fp-ts": "2.16.9",
            "fs-extra": "11.3.0",
            "global-directory": "4.0.0",
            globby: "11.1.0",
            "identifier-regex": "1.0.0",
            "indent-string": "4.0.0",
            "is-windows": "1.0.2",
            "is-wsl": "3.1.0",
            jest: "29.7.0",
            "jest-junit": "16.0.0",
            kleur: "4.1.5",
            "mock-stdin": "1.0.0",
            "new-github-issue-url": "0.2.1",
            "node-fetch": "3.3.2",
            "npm-packlist": "5.1.3",
            open: "7.4.2",
            "p-map": "4.0.0",
            resolve: "1.22.10",
            "string-width": "7.2.0",
            "strip-indent": "4.0.0",
            "temp-dir": "2.0.0",
            tempy: "1.0.1",
            "terminal-link": "4.0.0",
            tmp: "0.2.3",
            "ts-pattern": "5.6.2",
            "ts-toolbelt": "9.6.0",
            typescript: "5.4.5",
            yarn: "1.22.22"
        },
        dependencies: {
            "@prisma/config": "workspace:*",
            "@prisma/debug": "workspace:*",
            "@prisma/dmmf": "workspace:*",
            "@prisma/driver-adapter-utils": "workspace:*",
            "@prisma/engines": "workspace:*",
            "@prisma/fetch-engine": "workspace:*",
            "@prisma/generator": "workspace:*",
            "@prisma/generator-helper": "workspace:*",
            "@prisma/get-platform": "workspace:*",
            "@prisma/prisma-schema-wasm": "6.19.0-26.2ba551f319ab1df4bc874a89965d8b3641056773",
            "@prisma/schema-engine-wasm": "6.19.0-26.2ba551f319ab1df4bc874a89965d8b3641056773",
            "@prisma/schema-files-loader": "workspace:*",
            arg: "5.0.2",
            prompts: "2.4.2"
        },
        peerDependencies: {
            typescript: ">=5.1.0"
        },
        peerDependenciesMeta: {
            typescript: {
                optional: !0
            }
        },
        sideEffects: !1
    };
});
var Ti = ue((gh, Qc)=>{
    Qc.exports = {
        name: "@prisma/engines-version",
        version: "6.19.0-26.2ba551f319ab1df4bc874a89965d8b3641056773",
        main: "index.js",
        types: "index.d.ts",
        license: "Apache-2.0",
        author: "Tim Suchanek <suchanek@prisma.io>",
        prisma: {
            enginesVersion: "2ba551f319ab1df4bc874a89965d8b3641056773"
        },
        repository: {
            type: "git",
            url: "https://github.com/prisma/engines-wrapper.git",
            directory: "packages/engines-version"
        },
        devDependencies: {
            "@types/node": "18.19.76",
            typescript: "4.9.5"
        },
        files: [
            "index.js",
            "index.d.ts"
        ],
        scripts: {
            build: "tsc -d"
        }
    };
});
var on = ue((nn)=>{
    "use strict";
    Object.defineProperty(nn, "__esModule", {
        value: !0
    });
    nn.enginesVersion = void 0;
    nn.enginesVersion = Ti().prisma.enginesVersion;
});
var hs = ue((Ih, gs)=>{
    "use strict";
    gs.exports = (e)=>{
        let r = e.match(/^[ \t]*(?=\S)/gm);
        return r ? r.reduce((t, n)=>Math.min(t, n.length), 1 / 0) : 0;
    };
});
var Di = ue((kh, Es)=>{
    "use strict";
    Es.exports = (e, r = 1, t)=>{
        if (t = {
            indent: " ",
            includeEmptyLines: !1,
            ...t
        }, typeof e != "string") throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof e}\``);
        if (typeof r != "number") throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof r}\``);
        if (typeof t.indent != "string") throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof t.indent}\``);
        if (r === 0) return e;
        let n = t.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
        return e.replace(n, t.indent.repeat(r));
    };
});
var vs = ue((jh, tp)=>{
    tp.exports = {
        name: "dotenv",
        version: "16.5.0",
        description: "Loads environment variables from .env file",
        main: "lib/main.js",
        types: "lib/main.d.ts",
        exports: {
            ".": {
                types: "./lib/main.d.ts",
                require: "./lib/main.js",
                default: "./lib/main.js"
            },
            "./config": "./config.js",
            "./config.js": "./config.js",
            "./lib/env-options": "./lib/env-options.js",
            "./lib/env-options.js": "./lib/env-options.js",
            "./lib/cli-options": "./lib/cli-options.js",
            "./lib/cli-options.js": "./lib/cli-options.js",
            "./package.json": "./package.json"
        },
        scripts: {
            "dts-check": "tsc --project tests/types/tsconfig.json",
            lint: "standard",
            pretest: "npm run lint && npm run dts-check",
            test: "tap run --allow-empty-coverage --disable-coverage --timeout=60000",
            "test:coverage": "tap run --show-full-coverage --timeout=60000 --coverage-report=lcov",
            prerelease: "npm test",
            release: "standard-version"
        },
        repository: {
            type: "git",
            url: "git://github.com/motdotla/dotenv.git"
        },
        homepage: "https://github.com/motdotla/dotenv#readme",
        funding: "https://dotenvx.com",
        keywords: [
            "dotenv",
            "env",
            ".env",
            "environment",
            "variables",
            "config",
            "settings"
        ],
        readmeFilename: "README.md",
        license: "BSD-2-Clause",
        devDependencies: {
            "@types/node": "^18.11.3",
            decache: "^4.6.2",
            sinon: "^14.0.1",
            standard: "^17.0.0",
            "standard-version": "^9.5.0",
            tap: "^19.2.0",
            typescript: "^4.8.4"
        },
        engines: {
            node: ">=12"
        },
        browser: {
            fs: !1
        }
    };
});
var As = ue((Bh, _e)=>{
    "use strict";
    var Fi = __turbopack_context__.r("[externals]/node:fs [external] (node:fs, cjs)"), Mi = __turbopack_context__.r("[externals]/node:path [external] (node:path, cjs)"), np = __turbopack_context__.r("[externals]/node:os [external] (node:os, cjs)"), ip = __turbopack_context__.r("[externals]/node:crypto [external] (node:crypto, cjs)"), op = vs(), Ts = op.version, sp = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function ap(e) {
        let r = {}, t = e.toString();
        t = t.replace(/\r\n?/mg, `
`);
        let n;
        for(; (n = sp.exec(t)) != null;){
            let i = n[1], o = n[2] || "";
            o = o.trim();
            let s = o[0];
            o = o.replace(/^(['"`])([\s\S]*)\1$/mg, "$2"), s === '"' && (o = o.replace(/\\n/g, `
`), o = o.replace(/\\r/g, "\r")), r[i] = o;
        }
        return r;
    }
    function lp(e) {
        let r = Rs(e), t = B.configDotenv({
            path: r
        });
        if (!t.parsed) {
            let s = new Error(`MISSING_DATA: Cannot parse ${r} for an unknown reason`);
            throw s.code = "MISSING_DATA", s;
        }
        let n = Ss(e).split(","), i = n.length, o;
        for(let s = 0; s < i; s++)try {
            let a = n[s].trim(), l = cp(t, a);
            o = B.decrypt(l.ciphertext, l.key);
            break;
        } catch (a) {
            if (s + 1 >= i) throw a;
        }
        return B.parse(o);
    }
    function up(e) {
        console.log(`[dotenv@${Ts}][WARN] ${e}`);
    }
    function ot(e) {
        console.log(`[dotenv@${Ts}][DEBUG] ${e}`);
    }
    function Ss(e) {
        return e && e.DOTENV_KEY && e.DOTENV_KEY.length > 0 ? e.DOTENV_KEY : process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0 ? process.env.DOTENV_KEY : "";
    }
    function cp(e, r) {
        let t;
        try {
            t = new URL(r);
        } catch (a) {
            if (a.code === "ERR_INVALID_URL") {
                let l = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
                throw l.code = "INVALID_DOTENV_KEY", l;
            }
            throw a;
        }
        let n = t.password;
        if (!n) {
            let a = new Error("INVALID_DOTENV_KEY: Missing key part");
            throw a.code = "INVALID_DOTENV_KEY", a;
        }
        let i = t.searchParams.get("environment");
        if (!i) {
            let a = new Error("INVALID_DOTENV_KEY: Missing environment part");
            throw a.code = "INVALID_DOTENV_KEY", a;
        }
        let o = `DOTENV_VAULT_${i.toUpperCase()}`, s = e.parsed[o];
        if (!s) {
            let a = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${o} in your .env.vault file.`);
            throw a.code = "NOT_FOUND_DOTENV_ENVIRONMENT", a;
        }
        return {
            ciphertext: s,
            key: n
        };
    }
    function Rs(e) {
        let r = null;
        if (e && e.path && e.path.length > 0) if (Array.isArray(e.path)) for (let t of e.path)Fi.existsSync(t) && (r = t.endsWith(".vault") ? t : `${t}.vault`);
        else r = e.path.endsWith(".vault") ? e.path : `${e.path}.vault`;
        else r = Mi.resolve(process.cwd(), ".env.vault");
        return Fi.existsSync(r) ? r : null;
    }
    function Ps(e) {
        return e[0] === "~" ? Mi.join(np.homedir(), e.slice(1)) : e;
    }
    function pp(e) {
        !!(e && e.debug) && ot("Loading env from encrypted .env.vault");
        let t = B._parseVault(e), n = process.env;
        return e && e.processEnv != null && (n = e.processEnv), B.populate(n, t, e), {
            parsed: t
        };
    }
    function dp(e) {
        let r = Mi.resolve(process.cwd(), ".env"), t = "utf8", n = !!(e && e.debug);
        e && e.encoding ? t = e.encoding : n && ot("No encoding is specified. UTF-8 is used by default");
        let i = [
            r
        ];
        if (e && e.path) if (!Array.isArray(e.path)) i = [
            Ps(e.path)
        ];
        else {
            i = [];
            for (let l of e.path)i.push(Ps(l));
        }
        let o, s = {};
        for (let l of i)try {
            let u = B.parse(Fi.readFileSync(l, {
                encoding: t
            }));
            B.populate(s, u, e);
        } catch (u) {
            n && ot(`Failed to load ${l} ${u.message}`), o = u;
        }
        let a = process.env;
        return e && e.processEnv != null && (a = e.processEnv), B.populate(a, s, e), o ? {
            parsed: s,
            error: o
        } : {
            parsed: s
        };
    }
    function mp(e) {
        if (Ss(e).length === 0) return B.configDotenv(e);
        let r = Rs(e);
        return r ? B._configVault(e) : (up(`You set DOTENV_KEY but you are missing a .env.vault file at ${r}. Did you forget to build it?`), B.configDotenv(e));
    }
    function fp(e, r) {
        let t = Buffer.from(r.slice(-64), "hex"), n = Buffer.from(e, "base64"), i = n.subarray(0, 12), o = n.subarray(-16);
        n = n.subarray(12, -16);
        try {
            let s = ip.createDecipheriv("aes-256-gcm", t, i);
            return s.setAuthTag(o), `${s.update(n)}${s.final()}`;
        } catch (s) {
            let a = s instanceof RangeError, l = s.message === "Invalid key length", u = s.message === "Unsupported state or unable to authenticate data";
            if (a || l) {
                let c = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
                throw c.code = "INVALID_DOTENV_KEY", c;
            } else if (u) {
                let c = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
                throw c.code = "DECRYPTION_FAILED", c;
            } else throw s;
        }
    }
    function gp(e, r, t = {}) {
        let n = !!(t && t.debug), i = !!(t && t.override);
        if (typeof r != "object") {
            let o = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
            throw o.code = "OBJECT_REQUIRED", o;
        }
        for (let o of Object.keys(r))Object.prototype.hasOwnProperty.call(e, o) ? (i === !0 && (e[o] = r[o]), n && ot(i === !0 ? `"${o}" is already defined and WAS overwritten` : `"${o}" is already defined and was NOT overwritten`)) : e[o] = r[o];
    }
    var B = {
        configDotenv: dp,
        _configVault: pp,
        _parseVault: lp,
        config: mp,
        decrypt: fp,
        parse: ap,
        populate: gp
    };
    _e.exports.configDotenv = B.configDotenv;
    _e.exports._configVault = B._configVault;
    _e.exports._parseVault = B._parseVault;
    _e.exports.config = B.config;
    _e.exports.decrypt = B.decrypt;
    _e.exports.parse = B.parse;
    _e.exports.populate = B.populate;
    _e.exports = B;
});
var Os = ue((Kh, cn)=>{
    "use strict";
    cn.exports = (e = {})=>{
        let r;
        if (e.repoUrl) r = e.repoUrl;
        else if (e.user && e.repo) r = `https://github.com/${e.user}/${e.repo}`;
        else throw new Error("You need to specify either the `repoUrl` option or both the `user` and `repo` options");
        let t = new URL(`${r}/issues/new`), n = [
            "body",
            "title",
            "labels",
            "template",
            "milestone",
            "assignee",
            "projects"
        ];
        for (let i of n){
            let o = e[i];
            if (o !== void 0) {
                if (i === "labels" || i === "projects") {
                    if (!Array.isArray(o)) throw new TypeError(`The \`${i}\` option should be an array`);
                    o = o.join(",");
                }
                t.searchParams.set(i, o);
            }
        }
        return t.toString();
    };
    cn.exports.default = cn.exports;
});
var Ki = ue((vb, ea)=>{
    "use strict";
    ea.exports = function() {
        function e(r, t, n, i, o) {
            return r < t || n < t ? r > n ? n + 1 : r + 1 : i === o ? t : t + 1;
        }
        return function(r, t) {
            if (r === t) return 0;
            if (r.length > t.length) {
                var n = r;
                r = t, t = n;
            }
            for(var i = r.length, o = t.length; i > 0 && r.charCodeAt(i - 1) === t.charCodeAt(o - 1);)i--, o--;
            for(var s = 0; s < i && r.charCodeAt(s) === t.charCodeAt(s);)s++;
            if (i -= s, o -= s, i === 0 || o < 3) return o;
            var a = 0, l, u, c, p, d, f, h, g, I, T, S, b, D = [];
            for(l = 0; l < i; l++)D.push(l + 1), D.push(r.charCodeAt(s + l));
            for(var me = D.length - 1; a < o - 3;)for(I = t.charCodeAt(s + (u = a)), T = t.charCodeAt(s + (c = a + 1)), S = t.charCodeAt(s + (p = a + 2)), b = t.charCodeAt(s + (d = a + 3)), f = a += 4, l = 0; l < me; l += 2)h = D[l], g = D[l + 1], u = e(h, u, c, I, g), c = e(u, c, p, T, g), p = e(c, p, d, S, g), f = e(p, d, f, b, g), D[l] = f, d = p, p = c, c = u, u = h;
            for(; a < o;)for(I = t.charCodeAt(s + (u = a)), f = ++a, l = 0; l < me; l += 2)h = D[l], D[l] = f = e(h, u, f, I, D[l + 1]), u = h;
            return f;
        };
    }();
});
var oa = Do(()=>{
    "use strict";
});
var sa = Do(()=>{
    "use strict";
});
var jf = {};
tr(jf, {
    DMMF: ()=>ct,
    Debug: ()=>N,
    Decimal: ()=>Fe,
    Extensions: ()=>ni,
    MetricsClient: ()=>Lr,
    PrismaClientInitializationError: ()=>P,
    PrismaClientKnownRequestError: ()=>z,
    PrismaClientRustPanicError: ()=>ae,
    PrismaClientUnknownRequestError: ()=>V,
    PrismaClientValidationError: ()=>Z,
    Public: ()=>ii,
    Sql: ()=>ie,
    createParam: ()=>va,
    defineDmmfProperty: ()=>Ca,
    deserializeJsonResponse: ()=>Vr,
    deserializeRawResult: ()=>Xn,
    dmmfToRuntimeDataModel: ()=>Ns,
    empty: ()=>Oa,
    getPrismaClient: ()=>fu,
    getRuntime: ()=>Kn,
    join: ()=>Da,
    makeStrictEnum: ()=>gu,
    makeTypedQueryFactory: ()=>Ia,
    objectEnumValues: ()=>On,
    raw: ()=>no,
    serializeJsonQuery: ()=>$n,
    skip: ()=>Mn,
    sqltag: ()=>io,
    warnEnvConflicts: ()=>hu,
    warnOnce: ()=>at
});
module.exports = vu(jf);
var ni = {};
tr(ni, {
    defineExtension: ()=>ko,
    getExtensionContext: ()=>_o
});
function ko(e) {
    return typeof e == "function" ? e : (r)=>r.$extends(e);
}
function _o(e) {
    return e;
}
var ii = {};
tr(ii, {
    validator: ()=>No
});
function No(...e) {
    return (r)=>r;
}
var Bt = {};
tr(Bt, {
    $: ()=>qo,
    bgBlack: ()=>ku,
    bgBlue: ()=>Fu,
    bgCyan: ()=>$u,
    bgGreen: ()=>Nu,
    bgMagenta: ()=>Mu,
    bgRed: ()=>_u,
    bgWhite: ()=>qu,
    bgYellow: ()=>Lu,
    black: ()=>Cu,
    blue: ()=>nr,
    bold: ()=>W,
    cyan: ()=>De,
    dim: ()=>Ce,
    gray: ()=>Hr,
    green: ()=>qe,
    grey: ()=>Ou,
    hidden: ()=>Ru,
    inverse: ()=>Su,
    italic: ()=>Tu,
    magenta: ()=>Iu,
    red: ()=>ce,
    reset: ()=>Pu,
    strikethrough: ()=>Au,
    underline: ()=>Y,
    white: ()=>Du,
    yellow: ()=>Ie
});
var oi, Lo, Fo, Mo, $o = !0;
typeof process < "u" && ({ FORCE_COLOR: oi, NODE_DISABLE_COLORS: Lo, NO_COLOR: Fo, TERM: Mo } = process.env || {}, $o = process.stdout && process.stdout.isTTY);
var qo = {
    enabled: !Lo && Fo == null && Mo !== "dumb" && (oi != null && oi !== "0" || $o)
};
function F(e, r) {
    let t = new RegExp(`\\x1b\\[${r}m`, "g"), n = `\x1B[${e}m`, i = `\x1B[${r}m`;
    return function(o) {
        return !qo.enabled || o == null ? o : n + (~("" + o).indexOf(i) ? o.replace(t, i + n) : o) + i;
    };
}
var Pu = F(0, 0), W = F(1, 22), Ce = F(2, 22), Tu = F(3, 23), Y = F(4, 24), Su = F(7, 27), Ru = F(8, 28), Au = F(9, 29), Cu = F(30, 39), ce = F(31, 39), qe = F(32, 39), Ie = F(33, 39), nr = F(34, 39), Iu = F(35, 39), De = F(36, 39), Du = F(37, 39), Hr = F(90, 39), Ou = F(90, 39), ku = F(40, 49), _u = F(41, 49), Nu = F(42, 49), Lu = F(43, 49), Fu = F(44, 49), Mu = F(45, 49), $u = F(46, 49), qu = F(47, 49);
var Vu = 100, Vo = [
    "green",
    "yellow",
    "blue",
    "magenta",
    "cyan",
    "red"
], Yr = [], jo = Date.now(), ju = 0, si = typeof process < "u" ? process.env : {};
globalThis.DEBUG ??= si.DEBUG ?? "";
globalThis.DEBUG_COLORS ??= si.DEBUG_COLORS ? si.DEBUG_COLORS === "true" : !0;
var zr = {
    enable (e) {
        typeof e == "string" && (globalThis.DEBUG = e);
    },
    disable () {
        let e = globalThis.DEBUG;
        return globalThis.DEBUG = "", e;
    },
    enabled (e) {
        let r = globalThis.DEBUG.split(",").map((i)=>i.replace(/[.+?^${}()|[\]\\]/g, "\\$&")), t = r.some((i)=>i === "" || i[0] === "-" ? !1 : e.match(RegExp(i.split("*").join(".*") + "$"))), n = r.some((i)=>i === "" || i[0] !== "-" ? !1 : e.match(RegExp(i.slice(1).split("*").join(".*") + "$")));
        return t && !n;
    },
    log: (...e)=>{
        let [r, t, ...n] = e;
        (console.warn ?? console.log)(`${r} ${t}`, ...n);
    },
    formatters: {}
};
function Bu(e) {
    let r = {
        color: Vo[ju++ % Vo.length],
        enabled: zr.enabled(e),
        namespace: e,
        log: zr.log,
        extend: ()=>{}
    }, t = (...n)=>{
        let { enabled: i, namespace: o, color: s, log: a } = r;
        if (n.length !== 0 && Yr.push([
            o,
            ...n
        ]), Yr.length > Vu && Yr.shift(), zr.enabled(o) || i) {
            let l = n.map((c)=>typeof c == "string" ? c : Uu(c)), u = `+${Date.now() - jo}ms`;
            jo = Date.now(), globalThis.DEBUG_COLORS ? a(Bt[s](W(o)), ...l, Bt[s](u)) : a(o, ...l, u);
        }
    };
    return new Proxy(t, {
        get: (n, i)=>r[i],
        set: (n, i, o)=>r[i] = o
    });
}
var N = new Proxy(Bu, {
    get: (e, r)=>zr[r],
    set: (e, r, t)=>zr[r] = t
});
function Uu(e, r = 2) {
    let t = new Set;
    return JSON.stringify(e, (n, i)=>{
        if (typeof i == "object" && i !== null) {
            if (t.has(i)) return "[Circular *]";
            t.add(i);
        } else if (typeof i == "bigint") return i.toString();
        return i;
    }, r);
}
function Bo(e = 7500) {
    let r = Yr.map(([t, ...n])=>`${t} ${n.map((i)=>typeof i == "string" ? i : JSON.stringify(i)).join(" ")}`).join(`
`);
    return r.length < e ? r : r.slice(-e);
}
function Uo() {
    Yr.length = 0;
}
var gr = N;
var Go = O(__turbopack_context__.r("[externals]/node:fs [external] (node:fs, cjs)"));
function ai() {
    let e = process.env.PRISMA_QUERY_ENGINE_LIBRARY;
    if (!(e && Go.default.existsSync(e)) && process.arch === "ia32") //TURBOPACK unreachable
    ;
}
var li = [
    "darwin",
    "darwin-arm64",
    "debian-openssl-1.0.x",
    "debian-openssl-1.1.x",
    "debian-openssl-3.0.x",
    "rhel-openssl-1.0.x",
    "rhel-openssl-1.1.x",
    "rhel-openssl-3.0.x",
    "linux-arm64-openssl-1.1.x",
    "linux-arm64-openssl-1.0.x",
    "linux-arm64-openssl-3.0.x",
    "linux-arm-openssl-1.1.x",
    "linux-arm-openssl-1.0.x",
    "linux-arm-openssl-3.0.x",
    "linux-musl",
    "linux-musl-openssl-3.0.x",
    "linux-musl-arm64-openssl-1.1.x",
    "linux-musl-arm64-openssl-3.0.x",
    "linux-nixos",
    "linux-static-x64",
    "linux-static-arm64",
    "windows",
    "freebsd11",
    "freebsd12",
    "freebsd13",
    "freebsd14",
    "freebsd15",
    "openbsd",
    "netbsd",
    "arm"
];
var Ut = "libquery_engine";
function Gt(e, r) {
    let t = r === "url";
    return e.includes("windows") ? t ? "query_engine.dll.node" : `query_engine-${e}.dll.node` : e.includes("darwin") ? t ? `${Ut}.dylib.node` : `${Ut}-${e}.dylib.node` : t ? `${Ut}.so.node` : `${Ut}-${e}.so.node`;
}
var Ko = O(__turbopack_context__.r("[externals]/node:child_process [external] (node:child_process, cjs)")), mi = O(__turbopack_context__.r("[externals]/node:fs/promises [external] (node:fs/promises, cjs)")), Ht = O(__turbopack_context__.r("[externals]/node:os [external] (node:os, cjs)"));
var Oe = Symbol.for("@ts-pattern/matcher"), Gu = Symbol.for("@ts-pattern/isVariadic"), Wt = "@ts-pattern/anonymous-select-key", ui = (e)=>!!(e && typeof e == "object"), Qt = (e)=>e && !!e[Oe], Ee = (e, r, t)=>{
    if (Qt(e)) {
        let n = e[Oe](), { matched: i, selections: o } = n.match(r);
        return i && o && Object.keys(o).forEach((s)=>t(s, o[s])), i;
    }
    if (ui(e)) {
        if (!ui(r)) return !1;
        if (Array.isArray(e)) {
            if (!Array.isArray(r)) return !1;
            let n = [], i = [], o = [];
            for (let s of e.keys()){
                let a = e[s];
                Qt(a) && a[Gu] ? o.push(a) : o.length ? i.push(a) : n.push(a);
            }
            if (o.length) {
                if (o.length > 1) throw new Error("Pattern error: Using `...P.array(...)` several times in a single pattern is not allowed.");
                if (r.length < n.length + i.length) return !1;
                let s = r.slice(0, n.length), a = i.length === 0 ? [] : r.slice(-i.length), l = r.slice(n.length, i.length === 0 ? 1 / 0 : -i.length);
                return n.every((u, c)=>Ee(u, s[c], t)) && i.every((u, c)=>Ee(u, a[c], t)) && (o.length === 0 || Ee(o[0], l, t));
            }
            return e.length === r.length && e.every((s, a)=>Ee(s, r[a], t));
        }
        return Reflect.ownKeys(e).every((n)=>{
            let i = e[n];
            return (n in r || Qt(o = i) && o[Oe]().matcherType === "optional") && Ee(i, r[n], t);
            //TURBOPACK unreachable
            ;
            var o;
        });
    }
    return Object.is(r, e);
}, Ge = (e)=>{
    var r, t, n;
    return ui(e) ? Qt(e) ? (r = (t = (n = e[Oe]()).getSelectionKeys) == null ? void 0 : t.call(n)) != null ? r : [] : Array.isArray(e) ? Zr(e, Ge) : Zr(Object.values(e), Ge) : [];
}, Zr = (e, r)=>e.reduce((t, n)=>t.concat(r(n)), []);
function pe(e) {
    return Object.assign(e, {
        optional: ()=>Qu(e),
        and: (r)=>q(e, r),
        or: (r)=>Wu(e, r),
        select: (r)=>r === void 0 ? Qo(e) : Qo(r, e)
    });
}
function Qu(e) {
    return pe({
        [Oe]: ()=>({
                match: (r)=>{
                    let t = {}, n = (i, o)=>{
                        t[i] = o;
                    };
                    return r === void 0 ? (Ge(e).forEach((i)=>n(i, void 0)), {
                        matched: !0,
                        selections: t
                    }) : {
                        matched: Ee(e, r, n),
                        selections: t
                    };
                },
                getSelectionKeys: ()=>Ge(e),
                matcherType: "optional"
            })
    });
}
function q(...e) {
    return pe({
        [Oe]: ()=>({
                match: (r)=>{
                    let t = {}, n = (i, o)=>{
                        t[i] = o;
                    };
                    return {
                        matched: e.every((i)=>Ee(i, r, n)),
                        selections: t
                    };
                },
                getSelectionKeys: ()=>Zr(e, Ge),
                matcherType: "and"
            })
    });
}
function Wu(...e) {
    return pe({
        [Oe]: ()=>({
                match: (r)=>{
                    let t = {}, n = (i, o)=>{
                        t[i] = o;
                    };
                    return Zr(e, Ge).forEach((i)=>n(i, void 0)), {
                        matched: e.some((i)=>Ee(i, r, n)),
                        selections: t
                    };
                },
                getSelectionKeys: ()=>Zr(e, Ge),
                matcherType: "or"
            })
    });
}
function A(e) {
    return {
        [Oe]: ()=>({
                match: (r)=>({
                        matched: !!e(r)
                    })
            })
    };
}
function Qo(...e) {
    let r = typeof e[0] == "string" ? e[0] : void 0, t = e.length === 2 ? e[1] : typeof e[0] == "string" ? void 0 : e[0];
    return pe({
        [Oe]: ()=>({
                match: (n)=>{
                    let i = {
                        [r ?? Wt]: n
                    };
                    return {
                        matched: t === void 0 || Ee(t, n, (o, s)=>{
                            i[o] = s;
                        }),
                        selections: i
                    };
                },
                getSelectionKeys: ()=>[
                        r ?? Wt
                    ].concat(t === void 0 ? [] : Ge(t))
            })
    });
}
function ye(e) {
    return typeof e == "number";
}
function Ve(e) {
    return typeof e == "string";
}
function je(e) {
    return typeof e == "bigint";
}
var eg = pe(A(function(e) {
    return !0;
}));
var Be = (e)=>Object.assign(pe(e), {
        startsWith: (r)=>{
            return Be(q(e, (t = r, A((n)=>Ve(n) && n.startsWith(t)))));
            //TURBOPACK unreachable
            ;
            var t;
        },
        endsWith: (r)=>{
            return Be(q(e, (t = r, A((n)=>Ve(n) && n.endsWith(t)))));
            //TURBOPACK unreachable
            ;
            var t;
        },
        minLength: (r)=>Be(q(e, ((t)=>A((n)=>Ve(n) && n.length >= t))(r))),
        length: (r)=>Be(q(e, ((t)=>A((n)=>Ve(n) && n.length === t))(r))),
        maxLength: (r)=>Be(q(e, ((t)=>A((n)=>Ve(n) && n.length <= t))(r))),
        includes: (r)=>{
            return Be(q(e, (t = r, A((n)=>Ve(n) && n.includes(t)))));
            //TURBOPACK unreachable
            ;
            var t;
        },
        regex: (r)=>{
            return Be(q(e, (t = r, A((n)=>Ve(n) && !!n.match(t)))));
            //TURBOPACK unreachable
            ;
            var t;
        }
    }), rg = Be(A(Ve)), be = (e)=>Object.assign(pe(e), {
        between: (r, t)=>be(q(e, ((n, i)=>A((o)=>ye(o) && n <= o && i >= o))(r, t))),
        lt: (r)=>be(q(e, ((t)=>A((n)=>ye(n) && n < t))(r))),
        gt: (r)=>be(q(e, ((t)=>A((n)=>ye(n) && n > t))(r))),
        lte: (r)=>be(q(e, ((t)=>A((n)=>ye(n) && n <= t))(r))),
        gte: (r)=>be(q(e, ((t)=>A((n)=>ye(n) && n >= t))(r))),
        int: ()=>be(q(e, A((r)=>ye(r) && Number.isInteger(r)))),
        finite: ()=>be(q(e, A((r)=>ye(r) && Number.isFinite(r)))),
        positive: ()=>be(q(e, A((r)=>ye(r) && r > 0))),
        negative: ()=>be(q(e, A((r)=>ye(r) && r < 0)))
    }), tg = be(A(ye)), Ue = (e)=>Object.assign(pe(e), {
        between: (r, t)=>Ue(q(e, ((n, i)=>A((o)=>je(o) && n <= o && i >= o))(r, t))),
        lt: (r)=>Ue(q(e, ((t)=>A((n)=>je(n) && n < t))(r))),
        gt: (r)=>Ue(q(e, ((t)=>A((n)=>je(n) && n > t))(r))),
        lte: (r)=>Ue(q(e, ((t)=>A((n)=>je(n) && n <= t))(r))),
        gte: (r)=>Ue(q(e, ((t)=>A((n)=>je(n) && n >= t))(r))),
        positive: ()=>Ue(q(e, A((r)=>je(r) && r > 0))),
        negative: ()=>Ue(q(e, A((r)=>je(r) && r < 0)))
    }), ng = Ue(A(je)), ig = pe(A(function(e) {
    return typeof e == "boolean";
})), og = pe(A(function(e) {
    return typeof e == "symbol";
})), sg = pe(A(function(e) {
    return e == null;
})), ag = pe(A(function(e) {
    return e != null;
}));
var ci = class extends Error {
    constructor(r){
        let t;
        try {
            t = JSON.stringify(r);
        } catch  {
            t = r;
        }
        super(`Pattern matching error: no pattern matches value ${t}`), this.input = void 0, this.input = r;
    }
}, pi = {
    matched: !1,
    value: void 0
};
function hr(e) {
    return new di(e, pi);
}
var di = class e {
    constructor(r, t){
        this.input = void 0, this.state = void 0, this.input = r, this.state = t;
    }
    with(...r) {
        if (this.state.matched) return this;
        let t = r[r.length - 1], n = [
            r[0]
        ], i;
        r.length === 3 && typeof r[1] == "function" ? i = r[1] : r.length > 2 && n.push(...r.slice(1, r.length - 1));
        let o = !1, s = {}, a = (u, c)=>{
            o = !0, s[u] = c;
        }, l = !n.some((u)=>Ee(u, this.input, a)) || i && !i(this.input) ? pi : {
            matched: !0,
            value: t(o ? Wt in s ? s[Wt] : s : this.input, this.input)
        };
        return new e(this.input, l);
    }
    when(r, t) {
        if (this.state.matched) return this;
        let n = !!r(this.input);
        return new e(this.input, n ? {
            matched: !0,
            value: t(this.input, this.input)
        } : pi);
    }
    otherwise(r) {
        return this.state.matched ? this.state.value : r(this.input);
    }
    exhaustive() {
        if (this.state.matched) return this.state.value;
        throw new ci(this.input);
    }
    run() {
        return this.exhaustive();
    }
    returnType() {
        return this;
    }
};
var Ho = __turbopack_context__.r("[externals]/node:util [external] (node:util, cjs)");
var Ju = {
    warn: Ie("prisma:warn")
}, Ku = {
    warn: ()=>!process.env.PRISMA_DISABLE_WARNINGS
};
function Jt(e, ...r) {
    Ku.warn() && console.warn(`${Ju.warn} ${e}`, ...r);
}
var Hu = (0, Ho.promisify)(Ko.default.exec), ee = gr("prisma:get-platform"), Yu = [
    "1.0.x",
    "1.1.x",
    "3.0.x"
];
async function Yo() {
    let e = Ht.default.platform(), r = process.arch;
    if (e === "freebsd") {
        let s = await Yt("freebsd-version");
        if (s && s.trim().length > 0) {
            let l = /^(\d+)\.?/.exec(s);
            if (l) return {
                platform: "freebsd",
                targetDistro: `freebsd${l[1]}`,
                arch: r
            };
        }
    }
    if (e !== "linux") return {
        platform: e,
        arch: r
    };
    let t = await Zu(), n = await sc(), i = ec({
        arch: r,
        archFromUname: n,
        familyDistro: t.familyDistro
    }), { libssl: o } = await rc(i);
    return {
        platform: "linux",
        libssl: o,
        arch: r,
        archFromUname: n,
        ...t
    };
}
function zu(e) {
    let r = /^ID="?([^"\n]*)"?$/im, t = /^ID_LIKE="?([^"\n]*)"?$/im, n = r.exec(e), i = n && n[1] && n[1].toLowerCase() || "", o = t.exec(e), s = o && o[1] && o[1].toLowerCase() || "", a = hr({
        id: i,
        idLike: s
    }).with({
        id: "alpine"
    }, ({ id: l })=>({
            targetDistro: "musl",
            familyDistro: l,
            originalDistro: l
        })).with({
        id: "raspbian"
    }, ({ id: l })=>({
            targetDistro: "arm",
            familyDistro: "debian",
            originalDistro: l
        })).with({
        id: "nixos"
    }, ({ id: l })=>({
            targetDistro: "nixos",
            originalDistro: l,
            familyDistro: "nixos"
        })).with({
        id: "debian"
    }, {
        id: "ubuntu"
    }, ({ id: l })=>({
            targetDistro: "debian",
            familyDistro: "debian",
            originalDistro: l
        })).with({
        id: "rhel"
    }, {
        id: "centos"
    }, {
        id: "fedora"
    }, ({ id: l })=>({
            targetDistro: "rhel",
            familyDistro: "rhel",
            originalDistro: l
        })).when(({ idLike: l })=>l.includes("debian") || l.includes("ubuntu"), ({ id: l })=>({
            targetDistro: "debian",
            familyDistro: "debian",
            originalDistro: l
        })).when(({ idLike: l })=>i === "arch" || l.includes("arch"), ({ id: l })=>({
            targetDistro: "debian",
            familyDistro: "arch",
            originalDistro: l
        })).when(({ idLike: l })=>l.includes("centos") || l.includes("fedora") || l.includes("rhel") || l.includes("suse"), ({ id: l })=>({
            targetDistro: "rhel",
            familyDistro: "rhel",
            originalDistro: l
        })).otherwise(({ id: l })=>({
            targetDistro: void 0,
            familyDistro: void 0,
            originalDistro: l
        }));
    return ee(`Found distro info:
${JSON.stringify(a, null, 2)}`), a;
}
async function Zu() {
    let e = "/etc/os-release";
    try {
        let r = await mi.default.readFile(e, {
            encoding: "utf-8"
        });
        return zu(r);
    } catch  {
        return {
            targetDistro: void 0,
            familyDistro: void 0,
            originalDistro: void 0
        };
    }
}
function Xu(e) {
    let r = /^OpenSSL\s(\d+\.\d+)\.\d+/.exec(e);
    if (r) {
        let t = `${r[1]}.x`;
        return zo(t);
    }
}
function Wo(e) {
    let r = /libssl\.so\.(\d)(\.\d)?/.exec(e);
    if (r) {
        let t = `${r[1]}${r[2] ?? ".0"}.x`;
        return zo(t);
    }
}
function zo(e) {
    let r = (()=>{
        if (Xo(e)) return e;
        let t = e.split(".");
        return t[1] = "0", t.join(".");
    })();
    if (Yu.includes(r)) return r;
}
function ec(e) {
    return hr(e).with({
        familyDistro: "musl"
    }, ()=>(ee('Trying platform-specific paths for "alpine"'), [
            "/lib",
            "/usr/lib"
        ])).with({
        familyDistro: "debian"
    }, ({ archFromUname: r })=>(ee('Trying platform-specific paths for "debian" (and "ubuntu")'), [
            `/usr/lib/${r}-linux-gnu`,
            `/lib/${r}-linux-gnu`
        ])).with({
        familyDistro: "rhel"
    }, ()=>(ee('Trying platform-specific paths for "rhel"'), [
            "/lib64",
            "/usr/lib64"
        ])).otherwise(({ familyDistro: r, arch: t, archFromUname: n })=>(ee(`Don't know any platform-specific paths for "${r}" on ${t} (${n})`), []));
}
async function rc(e) {
    let r = 'grep -v "libssl.so.0"', t = await Jo(e);
    if (t) {
        ee(`Found libssl.so file using platform-specific paths: ${t}`);
        let o = Wo(t);
        if (ee(`The parsed libssl version is: ${o}`), o) return {
            libssl: o,
            strategy: "libssl-specific-path"
        };
    }
    ee('Falling back to "ldconfig" and other generic paths');
    let n = await Yt(`ldconfig -p | sed "s/.*=>s*//" | sed "s|.*/||" | grep libssl | sort | ${r}`);
    if (n || (n = await Jo([
        "/lib64",
        "/usr/lib64",
        "/lib",
        "/usr/lib"
    ])), n) {
        ee(`Found libssl.so file using "ldconfig" or other generic paths: ${n}`);
        let o = Wo(n);
        if (ee(`The parsed libssl version is: ${o}`), o) return {
            libssl: o,
            strategy: "ldconfig"
        };
    }
    let i = await Yt("openssl version -v");
    if (i) {
        ee(`Found openssl binary with version: ${i}`);
        let o = Xu(i);
        if (ee(`The parsed openssl version is: ${o}`), o) return {
            libssl: o,
            strategy: "openssl-binary"
        };
    }
    return ee("Couldn't find any version of libssl or OpenSSL in the system"), {};
}
async function Jo(e) {
    for (let r of e){
        let t = await tc(r);
        if (t) return t;
    }
}
async function tc(e) {
    try {
        return (await mi.default.readdir(e)).find((t)=>t.startsWith("libssl.so.") && !t.startsWith("libssl.so.0"));
    } catch (r) {
        if (r.code === "ENOENT") return;
        throw r;
    }
}
async function ir() {
    let { binaryTarget: e } = await Zo();
    return e;
}
function nc(e) {
    return e.binaryTarget !== void 0;
}
async function fi() {
    let { memoized: e, ...r } = await Zo();
    return r;
}
var Kt = {};
async function Zo() {
    if (nc(Kt)) return Promise.resolve({
        ...Kt,
        memoized: !0
    });
    let e = await Yo(), r = ic(e);
    return Kt = {
        ...e,
        binaryTarget: r
    }, {
        ...Kt,
        memoized: !1
    };
}
function ic(e) {
    let { platform: r, arch: t, archFromUname: n, libssl: i, targetDistro: o, familyDistro: s, originalDistro: a } = e;
    r === "linux" && ![
        "x64",
        "arm64"
    ].includes(t) && Jt(`Prisma only officially supports Linux on amd64 (x86_64) and arm64 (aarch64) system architectures (detected "${t}" instead). If you are using your own custom Prisma engines, you can ignore this warning, as long as you've compiled the engines for your system architecture "${n}".`);
    let l = "1.1.x";
    if (r === "linux" && i === void 0) {
        let c = hr({
            familyDistro: s
        }).with({
            familyDistro: "debian"
        }, ()=>"Please manually install OpenSSL via `apt-get update -y && apt-get install -y openssl` and try installing Prisma again. If you're running Prisma on Docker, add this command to your Dockerfile, or switch to an image that already has OpenSSL installed.").otherwise(()=>"Please manually install OpenSSL and try installing Prisma again.");
        Jt(`Prisma failed to detect the libssl/openssl version to use, and may not work as expected. Defaulting to "openssl-${l}".
${c}`);
    }
    let u = "debian";
    if (r === "linux" && o === void 0 && ee(`Distro is "${a}". Falling back to Prisma engines built for "${u}".`), r === "darwin" && t === "arm64") return "darwin-arm64";
    if (r === "darwin") return "darwin";
    if (r === "win32") return "windows";
    if (r === "freebsd") return o;
    if (r === "openbsd") return "openbsd";
    if (r === "netbsd") return "netbsd";
    if (r === "linux" && o === "nixos") return "linux-nixos";
    if (r === "linux" && t === "arm64") return `${o === "musl" ? "linux-musl-arm64" : "linux-arm64"}-openssl-${i || l}`;
    if (r === "linux" && t === "arm") return `linux-arm-openssl-${i || l}`;
    if (r === "linux" && o === "musl") {
        let c = "linux-musl";
        return !i || Xo(i) ? c : `${c}-openssl-${i}`;
    }
    return r === "linux" && o && i ? `${o}-openssl-${i}` : (r !== "linux" && Jt(`Prisma detected unknown OS "${r}" and may not work as expected. Defaulting to "linux".`), i ? `${u}-openssl-${i}` : o ? `${o}-openssl-${l}` : `${u}-openssl-${l}`);
}
async function oc(e) {
    try {
        return await e();
    } catch  {
        return;
    }
}
function Yt(e) {
    return oc(async ()=>{
        let r = await Hu(e);
        return ee(`Command "${e}" successfully returned "${r.stdout}"`), r.stdout;
    });
}
async function sc() {
    return typeof Ht.default.machine == "function" ? Ht.default.machine() : (await Yt("uname -m"))?.trim();
}
function Xo(e) {
    return e.startsWith("1.");
}
var Xt = {};
tr(Xt, {
    beep: ()=>kc,
    clearScreen: ()=>Cc,
    clearTerminal: ()=>Ic,
    cursorBackward: ()=>mc,
    cursorDown: ()=>pc,
    cursorForward: ()=>dc,
    cursorGetPosition: ()=>hc,
    cursorHide: ()=>Ec,
    cursorLeft: ()=>ts,
    cursorMove: ()=>cc,
    cursorNextLine: ()=>yc,
    cursorPrevLine: ()=>bc,
    cursorRestorePosition: ()=>gc,
    cursorSavePosition: ()=>fc,
    cursorShow: ()=>wc,
    cursorTo: ()=>uc,
    cursorUp: ()=>rs,
    enterAlternativeScreen: ()=>Dc,
    eraseDown: ()=>Tc,
    eraseEndLine: ()=>vc,
    eraseLine: ()=>ns,
    eraseLines: ()=>xc,
    eraseScreen: ()=>gi,
    eraseStartLine: ()=>Pc,
    eraseUp: ()=>Sc,
    exitAlternativeScreen: ()=>Oc,
    iTerm: ()=>Lc,
    image: ()=>Nc,
    link: ()=>_c,
    scrollDown: ()=>Ac,
    scrollUp: ()=>Rc
});
var Zt = O(__turbopack_context__.r("[externals]/node:process [external] (node:process, cjs)"), 1);
var zt = globalThis.window?.document !== void 0, gg = globalThis.process?.versions?.node !== void 0, hg = globalThis.process?.versions?.bun !== void 0, yg = globalThis.Deno?.version?.deno !== void 0, bg = globalThis.process?.versions?.electron !== void 0, Eg = globalThis.navigator?.userAgent?.includes("jsdom") === !0, wg = typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope, xg = typeof DedicatedWorkerGlobalScope < "u" && globalThis instanceof DedicatedWorkerGlobalScope, vg = typeof SharedWorkerGlobalScope < "u" && globalThis instanceof SharedWorkerGlobalScope, Pg = typeof ServiceWorkerGlobalScope < "u" && globalThis instanceof ServiceWorkerGlobalScope, Xr = globalThis.navigator?.userAgentData?.platform, Tg = Xr === "macOS" || globalThis.navigator?.platform === "MacIntel" || globalThis.navigator?.userAgent?.includes(" Mac ") === !0 || globalThis.process?.platform === "darwin", Sg = Xr === "Windows" || globalThis.navigator?.platform === "Win32" || globalThis.process?.platform === "win32", Rg = Xr === "Linux" || globalThis.navigator?.platform?.startsWith("Linux") === !0 || globalThis.navigator?.userAgent?.includes(" Linux ") === !0 || globalThis.process?.platform === "linux", Ag = Xr === "iOS" || globalThis.navigator?.platform === "MacIntel" && globalThis.navigator?.maxTouchPoints > 1 || /iPad|iPhone|iPod/.test(globalThis.navigator?.platform), Cg = Xr === "Android" || globalThis.navigator?.platform === "Android" || globalThis.navigator?.userAgent?.includes(" Android ") === !0 || globalThis.process?.platform === "android";
var C = "\x1B[", rt = "\x1B]", yr = "\x07", et = ";", es = !zt && Zt.default.env.TERM_PROGRAM === "Apple_Terminal", ac = !zt && Zt.default.platform === "win32", lc = zt ? ()=>{
    throw new Error("`process.cwd()` only works in Node.js, not the browser.");
} : Zt.default.cwd, uc = (e, r)=>{
    if (typeof e != "number") throw new TypeError("The `x` argument is required");
    return typeof r != "number" ? C + (e + 1) + "G" : C + (r + 1) + et + (e + 1) + "H";
}, cc = (e, r)=>{
    if (typeof e != "number") throw new TypeError("The `x` argument is required");
    let t = "";
    return e < 0 ? t += C + -e + "D" : e > 0 && (t += C + e + "C"), r < 0 ? t += C + -r + "A" : r > 0 && (t += C + r + "B"), t;
}, rs = (e = 1)=>C + e + "A", pc = (e = 1)=>C + e + "B", dc = (e = 1)=>C + e + "C", mc = (e = 1)=>C + e + "D", ts = C + "G", fc = es ? "\x1B7" : C + "s", gc = es ? "\x1B8" : C + "u", hc = C + "6n", yc = C + "E", bc = C + "F", Ec = C + "?25l", wc = C + "?25h", xc = (e)=>{
    let r = "";
    for(let t = 0; t < e; t++)r += ns + (t < e - 1 ? rs() : "");
    return e && (r += ts), r;
}, vc = C + "K", Pc = C + "1K", ns = C + "2K", Tc = C + "J", Sc = C + "1J", gi = C + "2J", Rc = C + "S", Ac = C + "T", Cc = "\x1Bc", Ic = ac ? `${gi}${C}0f` : `${gi}${C}3J${C}H`, Dc = C + "?1049h", Oc = C + "?1049l", kc = yr, _c = (e, r)=>[
        rt,
        "8",
        et,
        et,
        r,
        yr,
        e,
        rt,
        "8",
        et,
        et,
        yr
    ].join(""), Nc = (e, r = {})=>{
    let t = `${rt}1337;File=inline=1`;
    return r.width && (t += `;width=${r.width}`), r.height && (t += `;height=${r.height}`), r.preserveAspectRatio === !1 && (t += ";preserveAspectRatio=0"), t + ":" + Buffer.from(e).toString("base64") + yr;
}, Lc = {
    setCwd: (e = lc())=>`${rt}50;CurrentDir=${e}${yr}`,
    annotation (e, r = {}) {
        let t = `${rt}1337;`, n = r.x !== void 0, i = r.y !== void 0;
        if ((n || i) && !(n && i && r.length !== void 0)) throw new Error("`x`, `y` and `length` must be defined when `x` or `y` is defined");
        return e = e.replaceAll("|", ""), t += r.isHidden ? "AddHiddenAnnotation=" : "AddAnnotation=", r.length > 0 ? t += (n ? [
            e,
            r.length,
            r.x,
            r.y
        ] : [
            r.length,
            e
        ]).join("|") : t += e, t + yr;
    }
};
var en = O(cs(), 1);
function or(e, r, { target: t = "stdout", ...n } = {}) {
    return en.default[t] ? Xt.link(e, r) : n.fallback === !1 ? e : typeof n.fallback == "function" ? n.fallback(e, r) : `${e} (\u200B${r}\u200B)`;
}
or.isSupported = en.default.stdout;
or.stderr = (e, r, t = {})=>or(e, r, {
        target: "stderr",
        ...t
    });
or.stderr.isSupported = en.default.stderr;
function wi(e) {
    return or(e, e, {
        fallback: Y
    });
}
var Vc = ps(), xi = Vc.version;
function Er(e) {
    let r = jc();
    return r || (e?.config.engineType === "library" ? "library" : e?.config.engineType === "binary" ? "binary" : e?.config.engineType === "client" ? "client" : Bc());
}
function jc() {
    let e = process.env.PRISMA_CLIENT_ENGINE_TYPE;
    return e === "library" ? "library" : e === "binary" ? "binary" : e === "client" ? "client" : void 0;
}
function Bc() {
    return "library";
}
function vi(e) {
    return e.name === "DriverAdapterError" && typeof e.cause == "object";
}
function rn(e) {
    return {
        ok: !0,
        value: e,
        map (r) {
            return rn(r(e));
        },
        flatMap (r) {
            return r(e);
        }
    };
}
function sr(e) {
    return {
        ok: !1,
        error: e,
        map () {
            return sr(e);
        },
        flatMap () {
            return sr(e);
        }
    };
}
var ds = N("driver-adapter-utils"), Pi = class {
    registeredErrors = [];
    consumeError(r) {
        return this.registeredErrors[r];
    }
    registerNewError(r) {
        let t = 0;
        for(; this.registeredErrors[t] !== void 0;)t++;
        return this.registeredErrors[t] = {
            error: r
        }, t;
    }
};
var tn = (e, r = new Pi)=>{
    let t = {
        adapterName: e.adapterName,
        errorRegistry: r,
        queryRaw: ke(r, e.queryRaw.bind(e)),
        executeRaw: ke(r, e.executeRaw.bind(e)),
        executeScript: ke(r, e.executeScript.bind(e)),
        dispose: ke(r, e.dispose.bind(e)),
        provider: e.provider,
        startTransaction: async (...n)=>(await ke(r, e.startTransaction.bind(e))(...n)).map((o)=>Uc(r, o))
    };
    return e.getConnectionInfo && (t.getConnectionInfo = Gc(r, e.getConnectionInfo.bind(e))), t;
}, Uc = (e, r)=>({
        adapterName: r.adapterName,
        provider: r.provider,
        options: r.options,
        queryRaw: ke(e, r.queryRaw.bind(r)),
        executeRaw: ke(e, r.executeRaw.bind(r)),
        commit: ke(e, r.commit.bind(r)),
        rollback: ke(e, r.rollback.bind(r))
    });
function ke(e, r) {
    return async (...t)=>{
        try {
            return rn(await r(...t));
        } catch (n) {
            if (ds("[error@wrapAsync]", n), vi(n)) return sr(n.cause);
            let i = e.registerNewError(n);
            return sr({
                kind: "GenericJs",
                id: i
            });
        }
    };
}
function Gc(e, r) {
    return (...t)=>{
        try {
            return rn(r(...t));
        } catch (n) {
            if (ds("[error@wrapSync]", n), vi(n)) return sr(n.cause);
            let i = e.registerNewError(n);
            return sr({
                kind: "GenericJs",
                id: i
            });
        }
    };
}
var Wc = O(on());
var M = O(__turbopack_context__.r("[externals]/node:path [external] (node:path, cjs)")), Jc = O(on()), wh = N("prisma:engines");
function ms() {
    return M.default.join(("TURBOPACK compile-time value", "/ROOT/generated/prisma/runtime"), "../");
}
var xh = "libquery-engine";
M.default.join(("TURBOPACK compile-time value", "/ROOT/generated/prisma/runtime"), "../query-engine-darwin");
M.default.join(("TURBOPACK compile-time value", "/ROOT/generated/prisma/runtime"), "../query-engine-darwin-arm64");
M.default.join(("TURBOPACK compile-time value", "/ROOT/generated/prisma/runtime"), "../query-engine-debian-openssl-1.0.x");
M.default.join(("TURBOPACK compile-time value", "/ROOT/generated/prisma/runtime"), "../query-engine-debian-openssl-1.1.x");
M.default.join(("TURBOPACK compile-time value", "/ROOT/generated/prisma/runtime"), "../query-engine-debian-openssl-3.0.x");
M.default.join(("TURBOPACK compile-time value", "/ROOT/generated/prisma/runtime"), "../query-engine-linux-static-x64");
M.default.join(("TURBOPACK compile-time value", "/ROOT/generated/prisma/runtime"), "../query-engine-linux-static-arm64");
M.default.join(("TURBOPACK compile-time value", "/ROOT/generated/prisma/runtime"), "../query-engine-rhel-openssl-1.0.x");
M.default.join(("TURBOPACK compile-time value", "/ROOT/generated/prisma/runtime"), "../query-engine-rhel-openssl-1.1.x");
M.default.join(("TURBOPACK compile-time value", "/ROOT/generated/prisma/runtime"), "../query-engine-rhel-openssl-3.0.x");
M.default.join(("TURBOPACK compile-time value", "/ROOT/generated/prisma/runtime"), "../libquery_engine-darwin.dylib.node");
M.default.join(("TURBOPACK compile-time value", "/ROOT/generated/prisma/runtime"), "../libquery_engine-darwin-arm64.dylib.node");
M.default.join(("TURBOPACK compile-time value", "/ROOT/generated/prisma/runtime"), "../libquery_engine-debian-openssl-1.0.x.so.node");
M.default.join(("TURBOPACK compile-time value", "/ROOT/generated/prisma/runtime"), "../libquery_engine-debian-openssl-1.1.x.so.node");
M.default.join(("TURBOPACK compile-time value", "/ROOT/generated/prisma/runtime"), "../libquery_engine-debian-openssl-3.0.x.so.node");
M.default.join(("TURBOPACK compile-time value", "/ROOT/generated/prisma/runtime"), "../libquery_engine-linux-arm64-openssl-1.0.x.so.node");
M.default.join(("TURBOPACK compile-time value", "/ROOT/generated/prisma/runtime"), "../libquery_engine-linux-arm64-openssl-1.1.x.so.node");
M.default.join(("TURBOPACK compile-time value", "/ROOT/generated/prisma/runtime"), "../libquery_engine-linux-arm64-openssl-3.0.x.so.node");
M.default.join(("TURBOPACK compile-time value", "/ROOT/generated/prisma/runtime"), "../libquery_engine-linux-musl.so.node");
M.default.join(("TURBOPACK compile-time value", "/ROOT/generated/prisma/runtime"), "../libquery_engine-linux-musl-openssl-3.0.x.so.node");
M.default.join(("TURBOPACK compile-time value", "/ROOT/generated/prisma/runtime"), "../libquery_engine-rhel-openssl-1.0.x.so.node");
M.default.join(("TURBOPACK compile-time value", "/ROOT/generated/prisma/runtime"), "../libquery_engine-rhel-openssl-1.1.x.so.node");
M.default.join(("TURBOPACK compile-time value", "/ROOT/generated/prisma/runtime"), "../libquery_engine-rhel-openssl-3.0.x.so.node");
M.default.join(("TURBOPACK compile-time value", "/ROOT/generated/prisma/runtime"), "../query_engine-windows.dll.node");
var Si = O(__turbopack_context__.r("[externals]/node:fs [external] (node:fs, cjs)")), fs = gr("chmodPlusX");
function Ri(e) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    let r = Si.default.statSync(e), t = r.mode | 64 | 8 | 1;
    if (r.mode === t) {
        fs(`Execution permissions of ${e} are fine`);
        return;
    }
    let n = t.toString(8).slice(-3);
    fs(`Have to call chmodPlusX on ${e}`), Si.default.chmodSync(e, n);
}
function Ai(e) {
    let r = e.e, t = (a)=>`Prisma cannot find the required \`${a}\` system library in your system`, n = r.message.includes("cannot open shared object file"), i = `Please refer to the documentation about Prisma's system requirements: ${wi("https://pris.ly/d/system-requirements")}`, o = `Unable to require(\`${Ce(e.id)}\`).`, s = hr({
        message: r.message,
        code: r.code
    }).with({
        code: "ENOENT"
    }, ()=>"File does not exist.").when(({ message: a })=>n && a.includes("libz"), ()=>`${t("libz")}. Please install it and try again.`).when(({ message: a })=>n && a.includes("libgcc_s"), ()=>`${t("libgcc_s")}. Please install it and try again.`).when(({ message: a })=>n && a.includes("libssl"), ()=>{
        let a = e.platformInfo.libssl ? `openssl-${e.platformInfo.libssl}` : "openssl";
        return `${t("libssl")}. Please install ${a} and try again.`;
    }).when(({ message: a })=>a.includes("GLIBC"), ()=>`Prisma has detected an incompatible version of the \`glibc\` C standard library installed in your system. This probably means your system may be too old to run Prisma. ${i}`).when(({ message: a })=>e.platformInfo.platform === "linux" && a.includes("symbol not found"), ()=>`The Prisma engines are not compatible with your system ${e.platformInfo.originalDistro} on (${e.platformInfo.archFromUname}) which uses the \`${e.platformInfo.binaryTarget}\` binaryTarget by default. ${i}`).otherwise(()=>`The Prisma engines do not seem to be compatible with your system. ${i}`);
    return `${o}
${s}

Details: ${r.message}`;
}
var ys = O(hs(), 1);
function Ci(e) {
    let r = (0, ys.default)(e);
    if (r === 0) return e;
    let t = new RegExp(`^[ \\t]{${r}}`, "gm");
    return e.replace(t, "");
}
var bs = "prisma+postgres", sn = `${bs}:`;
function an(e) {
    return e?.toString().startsWith(`${sn}//`) ?? !1;
}
function Ii(e) {
    if (!an(e)) return !1;
    let { host: r } = new URL(e);
    return r.includes("localhost") || r.includes("127.0.0.1") || r.includes("[::1]");
}
var ws = O(Di());
function ki(e) {
    return String(new Oi(e));
}
var Oi = class {
    constructor(r){
        this.config = r;
    }
    toString() {
        let { config: r } = this, t = r.provider.fromEnvVar ? `env("${r.provider.fromEnvVar}")` : r.provider.value, n = JSON.parse(JSON.stringify({
            provider: t,
            binaryTargets: Kc(r.binaryTargets)
        }));
        return `generator ${r.name} {
${(0, ws.default)(Hc(n), 2)}
}`;
    }
};
function Kc(e) {
    let r;
    if (e.length > 0) {
        let t = e.find((n)=>n.fromEnvVar !== null);
        t ? r = `env("${t.fromEnvVar}")` : r = e.map((n)=>n.native ? "native" : n.value);
    } else r = void 0;
    return r;
}
function Hc(e) {
    let r = Object.keys(e).reduce((t, n)=>Math.max(t, n.length), 0);
    return Object.entries(e).map(([t, n])=>`${t.padEnd(r)} = ${Yc(n)}`).join(`
`);
}
function Yc(e) {
    return JSON.parse(JSON.stringify(e, (r, t)=>Array.isArray(t) ? `[${t.map((n)=>JSON.stringify(n)).join(", ")}]` : JSON.stringify(t)));
}
var nt = {};
tr(nt, {
    error: ()=>Xc,
    info: ()=>Zc,
    log: ()=>zc,
    query: ()=>ep,
    should: ()=>xs,
    tags: ()=>tt,
    warn: ()=>_i
});
var tt = {
    error: ce("prisma:error"),
    warn: Ie("prisma:warn"),
    info: De("prisma:info"),
    query: nr("prisma:query")
}, xs = {
    warn: ()=>!process.env.PRISMA_DISABLE_WARNINGS
};
function zc(...e) {
    console.log(...e);
}
function _i(e, ...r) {
    xs.warn() && console.warn(`${tt.warn} ${e}`, ...r);
}
function Zc(e, ...r) {
    console.info(`${tt.info} ${e}`, ...r);
}
function Xc(e, ...r) {
    console.error(`${tt.error} ${e}`, ...r);
}
function ep(e, ...r) {
    console.log(`${tt.query} ${e}`, ...r);
}
function ln(e, r) {
    if (!e) throw new Error(`${r}. This should never happen. If you see this error, please, open an issue at https://pris.ly/prisma-prisma-bug-report`);
}
function ar(e, r) {
    throw new Error(r);
}
function Ni({ onlyFirst: e = !1 } = {}) {
    let t = [
        "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?(?:\\u0007|\\u001B\\u005C|\\u009C))",
        "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"
    ].join("|");
    return new RegExp(t, e ? void 0 : "g");
}
var rp = Ni();
function wr(e) {
    if (typeof e != "string") throw new TypeError(`Expected a \`string\`, got \`${typeof e}\``);
    return e.replace(rp, "");
}
var it = O(__turbopack_context__.r("[externals]/node:path [external] (node:path, cjs)"));
function Li(e) {
    return it.default.sep === it.default.posix.sep ? e : e.split(it.default.sep).join(it.default.posix.sep);
}
var qi = O(As()), un = O(__turbopack_context__.r("[externals]/node:fs [external] (node:fs, cjs)"));
var xr = O(__turbopack_context__.r("[externals]/node:path [external] (node:path, cjs)"));
function Cs(e) {
    let r = e.ignoreProcessEnv ? {} : process.env, t = (n)=>n.match(/(.?\${(?:[a-zA-Z0-9_]+)?})/g)?.reduce(function(o, s) {
            let a = /(.?)\${([a-zA-Z0-9_]+)?}/g.exec(s);
            if (!a) return o;
            let l = a[1], u, c;
            if (l === "\\") c = a[0], u = c.replace("\\$", "$");
            else {
                let p = a[2];
                c = a[0].substring(l.length), u = Object.hasOwnProperty.call(r, p) ? r[p] : e.parsed[p] || "", u = t(u);
            }
            return o.replace(c, u);
        }, n) ?? n;
    for(let n in e.parsed){
        let i = Object.hasOwnProperty.call(r, n) ? r[n] : e.parsed[n];
        e.parsed[n] = t(i);
    }
    for(let n in e.parsed)r[n] = e.parsed[n];
    return e;
}
var $i = gr("prisma:tryLoadEnv");
function st({ rootEnvPath: e, schemaEnvPath: r }, t = {
    conflictCheck: "none"
}) {
    let n = Is(e);
    t.conflictCheck !== "none" && hp(n, r, t.conflictCheck);
    let i = null;
    return Ds(n?.path, r) || (i = Is(r)), !n && !i && $i("No Environment variables loaded"), i?.dotenvResult.error ? console.error(ce(W("Schema Env Error: ")) + i.dotenvResult.error) : {
        message: [
            n?.message,
            i?.message
        ].filter(Boolean).join(`
`),
        parsed: {
            ...n?.dotenvResult?.parsed,
            ...i?.dotenvResult?.parsed
        }
    };
}
function hp(e, r, t) {
    let n = e?.dotenvResult.parsed, i = !Ds(e?.path, r);
    if (n && r && i && un.default.existsSync(r)) {
        let o = qi.default.parse(un.default.readFileSync(r)), s = [];
        for(let a in o)n[a] === o[a] && s.push(a);
        if (s.length > 0) {
            let a = xr.default.relative(process.cwd(), e.path), l = xr.default.relative(process.cwd(), r);
            if (t === "error") {
                let u = `There is a conflict between env var${s.length > 1 ? "s" : ""} in ${Y(a)} and ${Y(l)}
Conflicting env vars:
${s.map((c)=>`  ${W(c)}`).join(`
`)}

We suggest to move the contents of ${Y(l)} to ${Y(a)} to consolidate your env vars.
`;
                throw new Error(u);
            } else if (t === "warn") {
                let u = `Conflict for env var${s.length > 1 ? "s" : ""} ${s.map((c)=>W(c)).join(", ")} in ${Y(a)} and ${Y(l)}
Env vars from ${Y(l)} overwrite the ones from ${Y(a)}
      `;
                console.warn(`${Ie("warn(prisma)")} ${u}`);
            }
        }
    }
}
function Is(e) {
    if (yp(e)) {
        $i(`Environment variables loaded from ${e}`);
        let r = qi.default.config({
            path: e,
            debug: process.env.DOTENV_CONFIG_DEBUG ? !0 : void 0
        });
        return {
            dotenvResult: Cs(r),
            message: Ce(`Environment variables loaded from ${xr.default.relative(process.cwd(), e)}`),
            path: e
        };
    } else $i(`Environment variables not found at ${e}`);
    return null;
}
function Ds(e, r) {
    return e && r && xr.default.resolve(e) === xr.default.resolve(r);
}
function yp(e) {
    return !!(e && un.default.existsSync(e));
}
function Vi(e, r) {
    return Object.prototype.hasOwnProperty.call(e, r);
}
function pn(e, r) {
    let t = {};
    for (let n of Object.keys(e))t[n] = r(e[n], n);
    return t;
}
function ji(e, r) {
    if (e.length === 0) return;
    let t = e[0];
    for(let n = 1; n < e.length; n++)r(t, e[n]) < 0 && (t = e[n]);
    return t;
}
function x(e, r) {
    Object.defineProperty(e, "name", {
        value: r,
        configurable: !0
    });
}
var ks = new Set, at = (e, r, ...t)=>{
    ks.has(e) || (ks.add(e), _i(r, ...t));
};
var P = class e extends Error {
    clientVersion;
    errorCode;
    retryable;
    constructor(r, t, n){
        super(r), this.name = "PrismaClientInitializationError", this.clientVersion = t, this.errorCode = n, Error.captureStackTrace(e);
    }
    get [Symbol.toStringTag]() {
        return "PrismaClientInitializationError";
    }
};
x(P, "PrismaClientInitializationError");
var z = class extends Error {
    code;
    meta;
    clientVersion;
    batchRequestIdx;
    constructor(r, { code: t, clientVersion: n, meta: i, batchRequestIdx: o }){
        super(r), this.name = "PrismaClientKnownRequestError", this.code = t, this.clientVersion = n, this.meta = i, Object.defineProperty(this, "batchRequestIdx", {
            value: o,
            enumerable: !1,
            writable: !0
        });
    }
    get [Symbol.toStringTag]() {
        return "PrismaClientKnownRequestError";
    }
};
x(z, "PrismaClientKnownRequestError");
var ae = class extends Error {
    clientVersion;
    constructor(r, t){
        super(r), this.name = "PrismaClientRustPanicError", this.clientVersion = t;
    }
    get [Symbol.toStringTag]() {
        return "PrismaClientRustPanicError";
    }
};
x(ae, "PrismaClientRustPanicError");
var V = class extends Error {
    clientVersion;
    batchRequestIdx;
    constructor(r, { clientVersion: t, batchRequestIdx: n }){
        super(r), this.name = "PrismaClientUnknownRequestError", this.clientVersion = t, Object.defineProperty(this, "batchRequestIdx", {
            value: n,
            writable: !0,
            enumerable: !1
        });
    }
    get [Symbol.toStringTag]() {
        return "PrismaClientUnknownRequestError";
    }
};
x(V, "PrismaClientUnknownRequestError");
var Z = class extends Error {
    name = "PrismaClientValidationError";
    clientVersion;
    constructor(r, { clientVersion: t }){
        super(r), this.clientVersion = t;
    }
    get [Symbol.toStringTag]() {
        return "PrismaClientValidationError";
    }
};
x(Z, "PrismaClientValidationError");
var we = class {
    _map = new Map;
    get(r) {
        return this._map.get(r)?.value;
    }
    set(r, t) {
        this._map.set(r, {
            value: t
        });
    }
    getOrCreate(r, t) {
        let n = this._map.get(r);
        if (n) return n.value;
        let i = t();
        return this.set(r, i), i;
    }
};
function We(e) {
    return e.substring(0, 1).toLowerCase() + e.substring(1);
}
function _s(e, r) {
    let t = {};
    for (let n of e){
        let i = n[r];
        t[i] = n;
    }
    return t;
}
function lt(e) {
    let r;
    return {
        get () {
            return r || (r = {
                value: e()
            }), r.value;
        }
    };
}
function Ns(e) {
    return {
        models: Bi(e.models),
        enums: Bi(e.enums),
        types: Bi(e.types)
    };
}
function Bi(e) {
    let r = {};
    for (let { name: t, ...n } of e)r[t] = n;
    return r;
}
function vr(e) {
    return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
}
function mn(e) {
    return e.toString() !== "Invalid Date";
}
var Pr = 9e15, Ye = 1e9, Ui = "0123456789abcdef", hn = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058", yn = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789", Gi = {
    precision: 20,
    rounding: 4,
    modulo: 1,
    toExpNeg: -7,
    toExpPos: 21,
    minE: -Pr,
    maxE: Pr,
    crypto: !1
}, $s, Ne, w = !0, En = "[DecimalError] ", He = En + "Invalid argument: ", qs = En + "Precision limit exceeded", Vs = En + "crypto unavailable", js = "[object Decimal]", X = Math.floor, U = Math.pow, bp = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i, Ep = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i, wp = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i, Bs = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, fe = 1e7, E = 7, xp = 9007199254740991, vp = hn.length - 1, Qi = yn.length - 1, m = {
    toStringTag: js
};
m.absoluteValue = m.abs = function() {
    var e = new this.constructor(this);
    return e.s < 0 && (e.s = 1), y(e);
};
m.ceil = function() {
    return y(new this.constructor(this), this.e + 1, 2);
};
m.clampedTo = m.clamp = function(e, r) {
    var t, n = this, i = n.constructor;
    if (e = new i(e), r = new i(r), !e.s || !r.s) return new i(NaN);
    if (e.gt(r)) throw Error(He + r);
    return t = n.cmp(e), t < 0 ? e : n.cmp(r) > 0 ? r : new i(n);
};
m.comparedTo = m.cmp = function(e) {
    var r, t, n, i, o = this, s = o.d, a = (e = new o.constructor(e)).d, l = o.s, u = e.s;
    if (!s || !a) return !l || !u ? NaN : l !== u ? l : s === a ? 0 : !s ^ l < 0 ? 1 : -1;
    if (!s[0] || !a[0]) return s[0] ? l : a[0] ? -u : 0;
    if (l !== u) return l;
    if (o.e !== e.e) return o.e > e.e ^ l < 0 ? 1 : -1;
    for(n = s.length, i = a.length, r = 0, t = n < i ? n : i; r < t; ++r)if (s[r] !== a[r]) return s[r] > a[r] ^ l < 0 ? 1 : -1;
    return n === i ? 0 : n > i ^ l < 0 ? 1 : -1;
};
m.cosine = m.cos = function() {
    var e, r, t = this, n = t.constructor;
    return t.d ? t.d[0] ? (e = n.precision, r = n.rounding, n.precision = e + Math.max(t.e, t.sd()) + E, n.rounding = 1, t = Pp(n, Js(n, t)), n.precision = e, n.rounding = r, y(Ne == 2 || Ne == 3 ? t.neg() : t, e, r, !0)) : new n(1) : new n(NaN);
};
m.cubeRoot = m.cbrt = function() {
    var e, r, t, n, i, o, s, a, l, u, c = this, p = c.constructor;
    if (!c.isFinite() || c.isZero()) return new p(c);
    for(w = !1, o = c.s * U(c.s * c, 1 / 3), !o || Math.abs(o) == 1 / 0 ? (t = J(c.d), e = c.e, (o = (e - t.length + 1) % 3) && (t += o == 1 || o == -2 ? "0" : "00"), o = U(t, 1 / 3), e = X((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2)), o == 1 / 0 ? t = "5e" + e : (t = o.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), n = new p(t), n.s = c.s) : n = new p(o.toString()), s = (e = p.precision) + 3;;)if (a = n, l = a.times(a).times(a), u = l.plus(c), n = L(u.plus(c).times(a), u.plus(l), s + 2, 1), J(a.d).slice(0, s) === (t = J(n.d)).slice(0, s)) if (t = t.slice(s - 3, s + 1), t == "9999" || !i && t == "4999") {
        if (!i && (y(a, e + 1, 0), a.times(a).times(a).eq(c))) {
            n = a;
            break;
        }
        s += 4, i = 1;
    } else {
        (!+t || !+t.slice(1) && t.charAt(0) == "5") && (y(n, e + 1, 1), r = !n.times(n).times(n).eq(c));
        break;
    }
    return w = !0, y(n, e, p.rounding, r);
};
m.decimalPlaces = m.dp = function() {
    var e, r = this.d, t = NaN;
    if (r) {
        if (e = r.length - 1, t = (e - X(this.e / E)) * E, e = r[e], e) for(; e % 10 == 0; e /= 10)t--;
        t < 0 && (t = 0);
    }
    return t;
};
m.dividedBy = m.div = function(e) {
    return L(this, new this.constructor(e));
};
m.dividedToIntegerBy = m.divToInt = function(e) {
    var r = this, t = r.constructor;
    return y(L(r, new t(e), 0, 1, 1), t.precision, t.rounding);
};
m.equals = m.eq = function(e) {
    return this.cmp(e) === 0;
};
m.floor = function() {
    return y(new this.constructor(this), this.e + 1, 3);
};
m.greaterThan = m.gt = function(e) {
    return this.cmp(e) > 0;
};
m.greaterThanOrEqualTo = m.gte = function(e) {
    var r = this.cmp(e);
    return r == 1 || r === 0;
};
m.hyperbolicCosine = m.cosh = function() {
    var e, r, t, n, i, o = this, s = o.constructor, a = new s(1);
    if (!o.isFinite()) return new s(o.s ? 1 / 0 : NaN);
    if (o.isZero()) return a;
    t = s.precision, n = s.rounding, s.precision = t + Math.max(o.e, o.sd()) + 4, s.rounding = 1, i = o.d.length, i < 32 ? (e = Math.ceil(i / 3), r = (1 / xn(4, e)).toString()) : (e = 16, r = "2.3283064365386962890625e-10"), o = Tr(s, 1, o.times(r), new s(1), !0);
    for(var l, u = e, c = new s(8); u--;)l = o.times(o), o = a.minus(l.times(c.minus(l.times(c))));
    return y(o, s.precision = t, s.rounding = n, !0);
};
m.hyperbolicSine = m.sinh = function() {
    var e, r, t, n, i = this, o = i.constructor;
    if (!i.isFinite() || i.isZero()) return new o(i);
    if (r = o.precision, t = o.rounding, o.precision = r + Math.max(i.e, i.sd()) + 4, o.rounding = 1, n = i.d.length, n < 3) i = Tr(o, 2, i, i, !0);
    else {
        e = 1.4 * Math.sqrt(n), e = e > 16 ? 16 : e | 0, i = i.times(1 / xn(5, e)), i = Tr(o, 2, i, i, !0);
        for(var s, a = new o(5), l = new o(16), u = new o(20); e--;)s = i.times(i), i = i.times(a.plus(s.times(l.times(s).plus(u))));
    }
    return o.precision = r, o.rounding = t, y(i, r, t, !0);
};
m.hyperbolicTangent = m.tanh = function() {
    var e, r, t = this, n = t.constructor;
    return t.isFinite() ? t.isZero() ? new n(t) : (e = n.precision, r = n.rounding, n.precision = e + 7, n.rounding = 1, L(t.sinh(), t.cosh(), n.precision = e, n.rounding = r)) : new n(t.s);
};
m.inverseCosine = m.acos = function() {
    var e = this, r = e.constructor, t = e.abs().cmp(1), n = r.precision, i = r.rounding;
    return t !== -1 ? t === 0 ? e.isNeg() ? xe(r, n, i) : new r(0) : new r(NaN) : e.isZero() ? xe(r, n + 4, i).times(.5) : (r.precision = n + 6, r.rounding = 1, e = new r(1).minus(e).div(e.plus(1)).sqrt().atan(), r.precision = n, r.rounding = i, e.times(2));
};
m.inverseHyperbolicCosine = m.acosh = function() {
    var e, r, t = this, n = t.constructor;
    return t.lte(1) ? new n(t.eq(1) ? 0 : NaN) : t.isFinite() ? (e = n.precision, r = n.rounding, n.precision = e + Math.max(Math.abs(t.e), t.sd()) + 4, n.rounding = 1, w = !1, t = t.times(t).minus(1).sqrt().plus(t), w = !0, n.precision = e, n.rounding = r, t.ln()) : new n(t);
};
m.inverseHyperbolicSine = m.asinh = function() {
    var e, r, t = this, n = t.constructor;
    return !t.isFinite() || t.isZero() ? new n(t) : (e = n.precision, r = n.rounding, n.precision = e + 2 * Math.max(Math.abs(t.e), t.sd()) + 6, n.rounding = 1, w = !1, t = t.times(t).plus(1).sqrt().plus(t), w = !0, n.precision = e, n.rounding = r, t.ln());
};
m.inverseHyperbolicTangent = m.atanh = function() {
    var e, r, t, n, i = this, o = i.constructor;
    return i.isFinite() ? i.e >= 0 ? new o(i.abs().eq(1) ? i.s / 0 : i.isZero() ? i : NaN) : (e = o.precision, r = o.rounding, n = i.sd(), Math.max(n, e) < 2 * -i.e - 1 ? y(new o(i), e, r, !0) : (o.precision = t = n - i.e, i = L(i.plus(1), new o(1).minus(i), t + e, 1), o.precision = e + 4, o.rounding = 1, i = i.ln(), o.precision = e, o.rounding = r, i.times(.5))) : new o(NaN);
};
m.inverseSine = m.asin = function() {
    var e, r, t, n, i = this, o = i.constructor;
    return i.isZero() ? new o(i) : (r = i.abs().cmp(1), t = o.precision, n = o.rounding, r !== -1 ? r === 0 ? (e = xe(o, t + 4, n).times(.5), e.s = i.s, e) : new o(NaN) : (o.precision = t + 6, o.rounding = 1, i = i.div(new o(1).minus(i.times(i)).sqrt().plus(1)).atan(), o.precision = t, o.rounding = n, i.times(2)));
};
m.inverseTangent = m.atan = function() {
    var e, r, t, n, i, o, s, a, l, u = this, c = u.constructor, p = c.precision, d = c.rounding;
    if (u.isFinite()) {
        if (u.isZero()) return new c(u);
        if (u.abs().eq(1) && p + 4 <= Qi) return s = xe(c, p + 4, d).times(.25), s.s = u.s, s;
    } else {
        if (!u.s) return new c(NaN);
        if (p + 4 <= Qi) return s = xe(c, p + 4, d).times(.5), s.s = u.s, s;
    }
    for(c.precision = a = p + 10, c.rounding = 1, t = Math.min(28, a / E + 2 | 0), e = t; e; --e)u = u.div(u.times(u).plus(1).sqrt().plus(1));
    for(w = !1, r = Math.ceil(a / E), n = 1, l = u.times(u), s = new c(u), i = u; e !== -1;)if (i = i.times(l), o = s.minus(i.div(n += 2)), i = i.times(l), s = o.plus(i.div(n += 2)), s.d[r] !== void 0) for(e = r; s.d[e] === o.d[e] && e--;);
    return t && (s = s.times(2 << t - 1)), w = !0, y(s, c.precision = p, c.rounding = d, !0);
};
m.isFinite = function() {
    return !!this.d;
};
m.isInteger = m.isInt = function() {
    return !!this.d && X(this.e / E) > this.d.length - 2;
};
m.isNaN = function() {
    return !this.s;
};
m.isNegative = m.isNeg = function() {
    return this.s < 0;
};
m.isPositive = m.isPos = function() {
    return this.s > 0;
};
m.isZero = function() {
    return !!this.d && this.d[0] === 0;
};
m.lessThan = m.lt = function(e) {
    return this.cmp(e) < 0;
};
m.lessThanOrEqualTo = m.lte = function(e) {
    return this.cmp(e) < 1;
};
m.logarithm = m.log = function(e) {
    var r, t, n, i, o, s, a, l, u = this, c = u.constructor, p = c.precision, d = c.rounding, f = 5;
    if (e == null) e = new c(10), r = !0;
    else {
        if (e = new c(e), t = e.d, e.s < 0 || !t || !t[0] || e.eq(1)) return new c(NaN);
        r = e.eq(10);
    }
    if (t = u.d, u.s < 0 || !t || !t[0] || u.eq(1)) return new c(t && !t[0] ? -1 / 0 : u.s != 1 ? NaN : t ? 0 : 1 / 0);
    if (r) if (t.length > 1) o = !0;
    else {
        for(i = t[0]; i % 10 === 0;)i /= 10;
        o = i !== 1;
    }
    if (w = !1, a = p + f, s = Ke(u, a), n = r ? bn(c, a + 10) : Ke(e, a), l = L(s, n, a, 1), ut(l.d, i = p, d)) do if (a += 10, s = Ke(u, a), n = r ? bn(c, a + 10) : Ke(e, a), l = L(s, n, a, 1), !o) {
        +J(l.d).slice(i + 1, i + 15) + 1 == 1e14 && (l = y(l, p + 1, 0));
        break;
    }
    while (ut(l.d, i += 10, d))
    return w = !0, y(l, p, d);
};
m.minus = m.sub = function(e) {
    var r, t, n, i, o, s, a, l, u, c, p, d, f = this, h = f.constructor;
    if (e = new h(e), !f.d || !e.d) return !f.s || !e.s ? e = new h(NaN) : f.d ? e.s = -e.s : e = new h(e.d || f.s !== e.s ? f : NaN), e;
    if (f.s != e.s) return e.s = -e.s, f.plus(e);
    if (u = f.d, d = e.d, a = h.precision, l = h.rounding, !u[0] || !d[0]) {
        if (d[0]) e.s = -e.s;
        else if (u[0]) e = new h(f);
        else return new h(l === 3 ? -0 : 0);
        return w ? y(e, a, l) : e;
    }
    if (t = X(e.e / E), c = X(f.e / E), u = u.slice(), o = c - t, o) {
        for(p = o < 0, p ? (r = u, o = -o, s = d.length) : (r = d, t = c, s = u.length), n = Math.max(Math.ceil(a / E), s) + 2, o > n && (o = n, r.length = 1), r.reverse(), n = o; n--;)r.push(0);
        r.reverse();
    } else {
        for(n = u.length, s = d.length, p = n < s, p && (s = n), n = 0; n < s; n++)if (u[n] != d[n]) {
            p = u[n] < d[n];
            break;
        }
        o = 0;
    }
    for(p && (r = u, u = d, d = r, e.s = -e.s), s = u.length, n = d.length - s; n > 0; --n)u[s++] = 0;
    for(n = d.length; n > o;){
        if (u[--n] < d[n]) {
            for(i = n; i && u[--i] === 0;)u[i] = fe - 1;
            --u[i], u[n] += fe;
        }
        u[n] -= d[n];
    }
    for(; u[--s] === 0;)u.pop();
    for(; u[0] === 0; u.shift())--t;
    return u[0] ? (e.d = u, e.e = wn(u, t), w ? y(e, a, l) : e) : new h(l === 3 ? -0 : 0);
};
m.modulo = m.mod = function(e) {
    var r, t = this, n = t.constructor;
    return e = new n(e), !t.d || !e.s || e.d && !e.d[0] ? new n(NaN) : !e.d || t.d && !t.d[0] ? y(new n(t), n.precision, n.rounding) : (w = !1, n.modulo == 9 ? (r = L(t, e.abs(), 0, 3, 1), r.s *= e.s) : r = L(t, e, 0, n.modulo, 1), r = r.times(e), w = !0, t.minus(r));
};
m.naturalExponential = m.exp = function() {
    return Wi(this);
};
m.naturalLogarithm = m.ln = function() {
    return Ke(this);
};
m.negated = m.neg = function() {
    var e = new this.constructor(this);
    return e.s = -e.s, y(e);
};
m.plus = m.add = function(e) {
    var r, t, n, i, o, s, a, l, u, c, p = this, d = p.constructor;
    if (e = new d(e), !p.d || !e.d) return !p.s || !e.s ? e = new d(NaN) : p.d || (e = new d(e.d || p.s === e.s ? p : NaN)), e;
    if (p.s != e.s) return e.s = -e.s, p.minus(e);
    if (u = p.d, c = e.d, a = d.precision, l = d.rounding, !u[0] || !c[0]) return c[0] || (e = new d(p)), w ? y(e, a, l) : e;
    if (o = X(p.e / E), n = X(e.e / E), u = u.slice(), i = o - n, i) {
        for(i < 0 ? (t = u, i = -i, s = c.length) : (t = c, n = o, s = u.length), o = Math.ceil(a / E), s = o > s ? o + 1 : s + 1, i > s && (i = s, t.length = 1), t.reverse(); i--;)t.push(0);
        t.reverse();
    }
    for(s = u.length, i = c.length, s - i < 0 && (i = s, t = c, c = u, u = t), r = 0; i;)r = (u[--i] = u[i] + c[i] + r) / fe | 0, u[i] %= fe;
    for(r && (u.unshift(r), ++n), s = u.length; u[--s] == 0;)u.pop();
    return e.d = u, e.e = wn(u, n), w ? y(e, a, l) : e;
};
m.precision = m.sd = function(e) {
    var r, t = this;
    if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(He + e);
    return t.d ? (r = Us(t.d), e && t.e + 1 > r && (r = t.e + 1)) : r = NaN, r;
};
m.round = function() {
    var e = this, r = e.constructor;
    return y(new r(e), e.e + 1, r.rounding);
};
m.sine = m.sin = function() {
    var e, r, t = this, n = t.constructor;
    return t.isFinite() ? t.isZero() ? new n(t) : (e = n.precision, r = n.rounding, n.precision = e + Math.max(t.e, t.sd()) + E, n.rounding = 1, t = Sp(n, Js(n, t)), n.precision = e, n.rounding = r, y(Ne > 2 ? t.neg() : t, e, r, !0)) : new n(NaN);
};
m.squareRoot = m.sqrt = function() {
    var e, r, t, n, i, o, s = this, a = s.d, l = s.e, u = s.s, c = s.constructor;
    if (u !== 1 || !a || !a[0]) return new c(!u || u < 0 && (!a || a[0]) ? NaN : a ? s : 1 / 0);
    for(w = !1, u = Math.sqrt(+s), u == 0 || u == 1 / 0 ? (r = J(a), (r.length + l) % 2 == 0 && (r += "0"), u = Math.sqrt(r), l = X((l + 1) / 2) - (l < 0 || l % 2), u == 1 / 0 ? r = "5e" + l : (r = u.toExponential(), r = r.slice(0, r.indexOf("e") + 1) + l), n = new c(r)) : n = new c(u.toString()), t = (l = c.precision) + 3;;)if (o = n, n = o.plus(L(s, o, t + 2, 1)).times(.5), J(o.d).slice(0, t) === (r = J(n.d)).slice(0, t)) if (r = r.slice(t - 3, t + 1), r == "9999" || !i && r == "4999") {
        if (!i && (y(o, l + 1, 0), o.times(o).eq(s))) {
            n = o;
            break;
        }
        t += 4, i = 1;
    } else {
        (!+r || !+r.slice(1) && r.charAt(0) == "5") && (y(n, l + 1, 1), e = !n.times(n).eq(s));
        break;
    }
    return w = !0, y(n, l, c.rounding, e);
};
m.tangent = m.tan = function() {
    var e, r, t = this, n = t.constructor;
    return t.isFinite() ? t.isZero() ? new n(t) : (e = n.precision, r = n.rounding, n.precision = e + 10, n.rounding = 1, t = t.sin(), t.s = 1, t = L(t, new n(1).minus(t.times(t)).sqrt(), e + 10, 0), n.precision = e, n.rounding = r, y(Ne == 2 || Ne == 4 ? t.neg() : t, e, r, !0)) : new n(NaN);
};
m.times = m.mul = function(e) {
    var r, t, n, i, o, s, a, l, u, c = this, p = c.constructor, d = c.d, f = (e = new p(e)).d;
    if (e.s *= c.s, !d || !d[0] || !f || !f[0]) return new p(!e.s || d && !d[0] && !f || f && !f[0] && !d ? NaN : !d || !f ? e.s / 0 : e.s * 0);
    for(t = X(c.e / E) + X(e.e / E), l = d.length, u = f.length, l < u && (o = d, d = f, f = o, s = l, l = u, u = s), o = [], s = l + u, n = s; n--;)o.push(0);
    for(n = u; --n >= 0;){
        for(r = 0, i = l + n; i > n;)a = o[i] + f[n] * d[i - n - 1] + r, o[i--] = a % fe | 0, r = a / fe | 0;
        o[i] = (o[i] + r) % fe | 0;
    }
    for(; !o[--s];)o.pop();
    return r ? ++t : o.shift(), e.d = o, e.e = wn(o, t), w ? y(e, p.precision, p.rounding) : e;
};
m.toBinary = function(e, r) {
    return Ji(this, 2, e, r);
};
m.toDecimalPlaces = m.toDP = function(e, r) {
    var t = this, n = t.constructor;
    return t = new n(t), e === void 0 ? t : (ne(e, 0, Ye), r === void 0 ? r = n.rounding : ne(r, 0, 8), y(t, e + t.e + 1, r));
};
m.toExponential = function(e, r) {
    var t, n = this, i = n.constructor;
    return e === void 0 ? t = ve(n, !0) : (ne(e, 0, Ye), r === void 0 ? r = i.rounding : ne(r, 0, 8), n = y(new i(n), e + 1, r), t = ve(n, !0, e + 1)), n.isNeg() && !n.isZero() ? "-" + t : t;
};
m.toFixed = function(e, r) {
    var t, n, i = this, o = i.constructor;
    return e === void 0 ? t = ve(i) : (ne(e, 0, Ye), r === void 0 ? r = o.rounding : ne(r, 0, 8), n = y(new o(i), e + i.e + 1, r), t = ve(n, !1, e + n.e + 1)), i.isNeg() && !i.isZero() ? "-" + t : t;
};
m.toFraction = function(e) {
    var r, t, n, i, o, s, a, l, u, c, p, d, f = this, h = f.d, g = f.constructor;
    if (!h) return new g(f);
    if (u = t = new g(1), n = l = new g(0), r = new g(n), o = r.e = Us(h) - f.e - 1, s = o % E, r.d[0] = U(10, s < 0 ? E + s : s), e == null) e = o > 0 ? r : u;
    else {
        if (a = new g(e), !a.isInt() || a.lt(u)) throw Error(He + a);
        e = a.gt(r) ? o > 0 ? r : u : a;
    }
    for(w = !1, a = new g(J(h)), c = g.precision, g.precision = o = h.length * E * 2; p = L(a, r, 0, 1, 1), i = t.plus(p.times(n)), i.cmp(e) != 1;)t = n, n = i, i = u, u = l.plus(p.times(i)), l = i, i = r, r = a.minus(p.times(i)), a = i;
    return i = L(e.minus(t), n, 0, 1, 1), l = l.plus(i.times(u)), t = t.plus(i.times(n)), l.s = u.s = f.s, d = L(u, n, o, 1).minus(f).abs().cmp(L(l, t, o, 1).minus(f).abs()) < 1 ? [
        u,
        n
    ] : [
        l,
        t
    ], g.precision = c, w = !0, d;
};
m.toHexadecimal = m.toHex = function(e, r) {
    return Ji(this, 16, e, r);
};
m.toNearest = function(e, r) {
    var t = this, n = t.constructor;
    if (t = new n(t), e == null) {
        if (!t.d) return t;
        e = new n(1), r = n.rounding;
    } else {
        if (e = new n(e), r === void 0 ? r = n.rounding : ne(r, 0, 8), !t.d) return e.s ? t : e;
        if (!e.d) return e.s && (e.s = t.s), e;
    }
    return e.d[0] ? (w = !1, t = L(t, e, 0, r, 1).times(e), w = !0, y(t)) : (e.s = t.s, t = e), t;
};
m.toNumber = function() {
    return +this;
};
m.toOctal = function(e, r) {
    return Ji(this, 8, e, r);
};
m.toPower = m.pow = function(e) {
    var r, t, n, i, o, s, a = this, l = a.constructor, u = +(e = new l(e));
    if (!a.d || !e.d || !a.d[0] || !e.d[0]) return new l(U(+a, u));
    if (a = new l(a), a.eq(1)) return a;
    if (n = l.precision, o = l.rounding, e.eq(1)) return y(a, n, o);
    if (r = X(e.e / E), r >= e.d.length - 1 && (t = u < 0 ? -u : u) <= xp) return i = Gs(l, a, t, n), e.s < 0 ? new l(1).div(i) : y(i, n, o);
    if (s = a.s, s < 0) {
        if (r < e.d.length - 1) return new l(NaN);
        if ((e.d[r] & 1) == 0 && (s = 1), a.e == 0 && a.d[0] == 1 && a.d.length == 1) return a.s = s, a;
    }
    return t = U(+a, u), r = t == 0 || !isFinite(t) ? X(u * (Math.log("0." + J(a.d)) / Math.LN10 + a.e + 1)) : new l(t + "").e, r > l.maxE + 1 || r < l.minE - 1 ? new l(r > 0 ? s / 0 : 0) : (w = !1, l.rounding = a.s = 1, t = Math.min(12, (r + "").length), i = Wi(e.times(Ke(a, n + t)), n), i.d && (i = y(i, n + 5, 1), ut(i.d, n, o) && (r = n + 10, i = y(Wi(e.times(Ke(a, r + t)), r), r + 5, 1), +J(i.d).slice(n + 1, n + 15) + 1 == 1e14 && (i = y(i, n + 1, 0)))), i.s = s, w = !0, l.rounding = o, y(i, n, o));
};
m.toPrecision = function(e, r) {
    var t, n = this, i = n.constructor;
    return e === void 0 ? t = ve(n, n.e <= i.toExpNeg || n.e >= i.toExpPos) : (ne(e, 1, Ye), r === void 0 ? r = i.rounding : ne(r, 0, 8), n = y(new i(n), e, r), t = ve(n, e <= n.e || n.e <= i.toExpNeg, e)), n.isNeg() && !n.isZero() ? "-" + t : t;
};
m.toSignificantDigits = m.toSD = function(e, r) {
    var t = this, n = t.constructor;
    return e === void 0 ? (e = n.precision, r = n.rounding) : (ne(e, 1, Ye), r === void 0 ? r = n.rounding : ne(r, 0, 8)), y(new n(t), e, r);
};
m.toString = function() {
    var e = this, r = e.constructor, t = ve(e, e.e <= r.toExpNeg || e.e >= r.toExpPos);
    return e.isNeg() && !e.isZero() ? "-" + t : t;
};
m.truncated = m.trunc = function() {
    return y(new this.constructor(this), this.e + 1, 1);
};
m.valueOf = m.toJSON = function() {
    var e = this, r = e.constructor, t = ve(e, e.e <= r.toExpNeg || e.e >= r.toExpPos);
    return e.isNeg() ? "-" + t : t;
};
function J(e) {
    var r, t, n, i = e.length - 1, o = "", s = e[0];
    if (i > 0) {
        for(o += s, r = 1; r < i; r++)n = e[r] + "", t = E - n.length, t && (o += Je(t)), o += n;
        s = e[r], n = s + "", t = E - n.length, t && (o += Je(t));
    } else if (s === 0) return "0";
    for(; s % 10 === 0;)s /= 10;
    return o + s;
}
function ne(e, r, t) {
    if (e !== ~~e || e < r || e > t) throw Error(He + e);
}
function ut(e, r, t, n) {
    var i, o, s, a;
    for(o = e[0]; o >= 10; o /= 10)--r;
    return --r < 0 ? (r += E, i = 0) : (i = Math.ceil((r + 1) / E), r %= E), o = U(10, E - r), a = e[i] % o | 0, n == null ? r < 3 ? (r == 0 ? a = a / 100 | 0 : r == 1 && (a = a / 10 | 0), s = t < 4 && a == 99999 || t > 3 && a == 49999 || a == 5e4 || a == 0) : s = (t < 4 && a + 1 == o || t > 3 && a + 1 == o / 2) && (e[i + 1] / o / 100 | 0) == U(10, r - 2) - 1 || (a == o / 2 || a == 0) && (e[i + 1] / o / 100 | 0) == 0 : r < 4 ? (r == 0 ? a = a / 1e3 | 0 : r == 1 ? a = a / 100 | 0 : r == 2 && (a = a / 10 | 0), s = (n || t < 4) && a == 9999 || !n && t > 3 && a == 4999) : s = ((n || t < 4) && a + 1 == o || !n && t > 3 && a + 1 == o / 2) && (e[i + 1] / o / 1e3 | 0) == U(10, r - 3) - 1, s;
}
function fn(e, r, t) {
    for(var n, i = [
        0
    ], o, s = 0, a = e.length; s < a;){
        for(o = i.length; o--;)i[o] *= r;
        for(i[0] += Ui.indexOf(e.charAt(s++)), n = 0; n < i.length; n++)i[n] > t - 1 && (i[n + 1] === void 0 && (i[n + 1] = 0), i[n + 1] += i[n] / t | 0, i[n] %= t);
    }
    return i.reverse();
}
function Pp(e, r) {
    var t, n, i;
    if (r.isZero()) return r;
    n = r.d.length, n < 32 ? (t = Math.ceil(n / 3), i = (1 / xn(4, t)).toString()) : (t = 16, i = "2.3283064365386962890625e-10"), e.precision += t, r = Tr(e, 1, r.times(i), new e(1));
    for(var o = t; o--;){
        var s = r.times(r);
        r = s.times(s).minus(s).times(8).plus(1);
    }
    return e.precision -= t, r;
}
var L = function() {
    function e(n, i, o) {
        var s, a = 0, l = n.length;
        for(n = n.slice(); l--;)s = n[l] * i + a, n[l] = s % o | 0, a = s / o | 0;
        return a && n.unshift(a), n;
    }
    function r(n, i, o, s) {
        var a, l;
        if (o != s) l = o > s ? 1 : -1;
        else for(a = l = 0; a < o; a++)if (n[a] != i[a]) {
            l = n[a] > i[a] ? 1 : -1;
            break;
        }
        return l;
    }
    function t(n, i, o, s) {
        for(var a = 0; o--;)n[o] -= a, a = n[o] < i[o] ? 1 : 0, n[o] = a * s + n[o] - i[o];
        for(; !n[0] && n.length > 1;)n.shift();
    }
    return function(n, i, o, s, a, l) {
        var u, c, p, d, f, h, g, I, T, S, b, D, me, se, Kr, j, te, Ae, K, fr, Vt = n.constructor, ti = n.s == i.s ? 1 : -1, H = n.d, k = i.d;
        if (!H || !H[0] || !k || !k[0]) return new Vt(!n.s || !i.s || (H ? k && H[0] == k[0] : !k) ? NaN : H && H[0] == 0 || !k ? ti * 0 : ti / 0);
        for(l ? (f = 1, c = n.e - i.e) : (l = fe, f = E, c = X(n.e / f) - X(i.e / f)), K = k.length, te = H.length, T = new Vt(ti), S = T.d = [], p = 0; k[p] == (H[p] || 0); p++);
        if (k[p] > (H[p] || 0) && c--, o == null ? (se = o = Vt.precision, s = Vt.rounding) : a ? se = o + (n.e - i.e) + 1 : se = o, se < 0) S.push(1), h = !0;
        else {
            if (se = se / f + 2 | 0, p = 0, K == 1) {
                for(d = 0, k = k[0], se++; (p < te || d) && se--; p++)Kr = d * l + (H[p] || 0), S[p] = Kr / k | 0, d = Kr % k | 0;
                h = d || p < te;
            } else {
                for(d = l / (k[0] + 1) | 0, d > 1 && (k = e(k, d, l), H = e(H, d, l), K = k.length, te = H.length), j = K, b = H.slice(0, K), D = b.length; D < K;)b[D++] = 0;
                fr = k.slice(), fr.unshift(0), Ae = k[0], k[1] >= l / 2 && ++Ae;
                do d = 0, u = r(k, b, K, D), u < 0 ? (me = b[0], K != D && (me = me * l + (b[1] || 0)), d = me / Ae | 0, d > 1 ? (d >= l && (d = l - 1), g = e(k, d, l), I = g.length, D = b.length, u = r(g, b, I, D), u == 1 && (d--, t(g, K < I ? fr : k, I, l))) : (d == 0 && (u = d = 1), g = k.slice()), I = g.length, I < D && g.unshift(0), t(b, g, D, l), u == -1 && (D = b.length, u = r(k, b, K, D), u < 1 && (d++, t(b, K < D ? fr : k, D, l))), D = b.length) : u === 0 && (d++, b = [
                    0
                ]), S[p++] = d, u && b[0] ? b[D++] = H[j] || 0 : (b = [
                    H[j]
                ], D = 1);
                while ((j++ < te || b[0] !== void 0) && se--)
                h = b[0] !== void 0;
            }
            S[0] || S.shift();
        }
        if (f == 1) T.e = c, $s = h;
        else {
            for(p = 1, d = S[0]; d >= 10; d /= 10)p++;
            T.e = p + c * f - 1, y(T, a ? o + T.e + 1 : o, s, h);
        }
        return T;
    };
}();
function y(e, r, t, n) {
    var i, o, s, a, l, u, c, p, d, f = e.constructor;
    e: if (r != null) {
        if (p = e.d, !p) return e;
        for(i = 1, a = p[0]; a >= 10; a /= 10)i++;
        if (o = r - i, o < 0) o += E, s = r, c = p[d = 0], l = c / U(10, i - s - 1) % 10 | 0;
        else if (d = Math.ceil((o + 1) / E), a = p.length, d >= a) if (n) {
            for(; a++ <= d;)p.push(0);
            c = l = 0, i = 1, o %= E, s = o - E + 1;
        } else break e;
        else {
            for(c = a = p[d], i = 1; a >= 10; a /= 10)i++;
            o %= E, s = o - E + i, l = s < 0 ? 0 : c / U(10, i - s - 1) % 10 | 0;
        }
        if (n = n || r < 0 || p[d + 1] !== void 0 || (s < 0 ? c : c % U(10, i - s - 1)), u = t < 4 ? (l || n) && (t == 0 || t == (e.s < 0 ? 3 : 2)) : l > 5 || l == 5 && (t == 4 || n || t == 6 && (o > 0 ? s > 0 ? c / U(10, i - s) : 0 : p[d - 1]) % 10 & 1 || t == (e.s < 0 ? 8 : 7)), r < 1 || !p[0]) return p.length = 0, u ? (r -= e.e + 1, p[0] = U(10, (E - r % E) % E), e.e = -r || 0) : p[0] = e.e = 0, e;
        if (o == 0 ? (p.length = d, a = 1, d--) : (p.length = d + 1, a = U(10, E - o), p[d] = s > 0 ? (c / U(10, i - s) % U(10, s) | 0) * a : 0), u) for(;;)if (d == 0) {
            for(o = 1, s = p[0]; s >= 10; s /= 10)o++;
            for(s = p[0] += a, a = 1; s >= 10; s /= 10)a++;
            o != a && (e.e++, p[0] == fe && (p[0] = 1));
            break;
        } else {
            if (p[d] += a, p[d] != fe) break;
            p[d--] = 0, a = 1;
        }
        for(o = p.length; p[--o] === 0;)p.pop();
    }
    return w && (e.e > f.maxE ? (e.d = null, e.e = NaN) : e.e < f.minE && (e.e = 0, e.d = [
        0
    ])), e;
}
function ve(e, r, t) {
    if (!e.isFinite()) return Ws(e);
    var n, i = e.e, o = J(e.d), s = o.length;
    return r ? (t && (n = t - s) > 0 ? o = o.charAt(0) + "." + o.slice(1) + Je(n) : s > 1 && (o = o.charAt(0) + "." + o.slice(1)), o = o + (e.e < 0 ? "e" : "e+") + e.e) : i < 0 ? (o = "0." + Je(-i - 1) + o, t && (n = t - s) > 0 && (o += Je(n))) : i >= s ? (o += Je(i + 1 - s), t && (n = t - i - 1) > 0 && (o = o + "." + Je(n))) : ((n = i + 1) < s && (o = o.slice(0, n) + "." + o.slice(n)), t && (n = t - s) > 0 && (i + 1 === s && (o += "."), o += Je(n))), o;
}
function wn(e, r) {
    var t = e[0];
    for(r *= E; t >= 10; t /= 10)r++;
    return r;
}
function bn(e, r, t) {
    if (r > vp) throw w = !0, t && (e.precision = t), Error(qs);
    return y(new e(hn), r, 1, !0);
}
function xe(e, r, t) {
    if (r > Qi) throw Error(qs);
    return y(new e(yn), r, t, !0);
}
function Us(e) {
    var r = e.length - 1, t = r * E + 1;
    if (r = e[r], r) {
        for(; r % 10 == 0; r /= 10)t--;
        for(r = e[0]; r >= 10; r /= 10)t++;
    }
    return t;
}
function Je(e) {
    for(var r = ""; e--;)r += "0";
    return r;
}
function Gs(e, r, t, n) {
    var i, o = new e(1), s = Math.ceil(n / E + 4);
    for(w = !1;;){
        if (t % 2 && (o = o.times(r), Fs(o.d, s) && (i = !0)), t = X(t / 2), t === 0) {
            t = o.d.length - 1, i && o.d[t] === 0 && ++o.d[t];
            break;
        }
        r = r.times(r), Fs(r.d, s);
    }
    return w = !0, o;
}
function Ls(e) {
    return e.d[e.d.length - 1] & 1;
}
function Qs(e, r, t) {
    for(var n, i, o = new e(r[0]), s = 0; ++s < r.length;){
        if (i = new e(r[s]), !i.s) {
            o = i;
            break;
        }
        n = o.cmp(i), (n === t || n === 0 && o.s === t) && (o = i);
    }
    return o;
}
function Wi(e, r) {
    var t, n, i, o, s, a, l, u = 0, c = 0, p = 0, d = e.constructor, f = d.rounding, h = d.precision;
    if (!e.d || !e.d[0] || e.e > 17) return new d(e.d ? e.d[0] ? e.s < 0 ? 0 : 1 / 0 : 1 : e.s ? e.s < 0 ? 0 : e : NaN);
    for(r == null ? (w = !1, l = h) : l = r, a = new d(.03125); e.e > -2;)e = e.times(a), p += 5;
    for(n = Math.log(U(2, p)) / Math.LN10 * 2 + 5 | 0, l += n, t = o = s = new d(1), d.precision = l;;){
        if (o = y(o.times(e), l, 1), t = t.times(++c), a = s.plus(L(o, t, l, 1)), J(a.d).slice(0, l) === J(s.d).slice(0, l)) {
            for(i = p; i--;)s = y(s.times(s), l, 1);
            if (r == null) if (u < 3 && ut(s.d, l - n, f, u)) d.precision = l += 10, t = o = a = new d(1), c = 0, u++;
            else return y(s, d.precision = h, f, w = !0);
            else return d.precision = h, s;
        }
        s = a;
    }
}
function Ke(e, r) {
    var t, n, i, o, s, a, l, u, c, p, d, f = 1, h = 10, g = e, I = g.d, T = g.constructor, S = T.rounding, b = T.precision;
    if (g.s < 0 || !I || !I[0] || !g.e && I[0] == 1 && I.length == 1) return new T(I && !I[0] ? -1 / 0 : g.s != 1 ? NaN : I ? 0 : g);
    if (r == null ? (w = !1, c = b) : c = r, T.precision = c += h, t = J(I), n = t.charAt(0), Math.abs(o = g.e) < 15e14) {
        for(; n < 7 && n != 1 || n == 1 && t.charAt(1) > 3;)g = g.times(e), t = J(g.d), n = t.charAt(0), f++;
        o = g.e, n > 1 ? (g = new T("0." + t), o++) : g = new T(n + "." + t.slice(1));
    } else return u = bn(T, c + 2, b).times(o + ""), g = Ke(new T(n + "." + t.slice(1)), c - h).plus(u), T.precision = b, r == null ? y(g, b, S, w = !0) : g;
    for(p = g, l = s = g = L(g.minus(1), g.plus(1), c, 1), d = y(g.times(g), c, 1), i = 3;;){
        if (s = y(s.times(d), c, 1), u = l.plus(L(s, new T(i), c, 1)), J(u.d).slice(0, c) === J(l.d).slice(0, c)) if (l = l.times(2), o !== 0 && (l = l.plus(bn(T, c + 2, b).times(o + ""))), l = L(l, new T(f), c, 1), r == null) if (ut(l.d, c - h, S, a)) T.precision = c += h, u = s = g = L(p.minus(1), p.plus(1), c, 1), d = y(g.times(g), c, 1), i = a = 1;
        else return y(l, T.precision = b, S, w = !0);
        else return T.precision = b, l;
        l = u, i += 2;
    }
}
function Ws(e) {
    return String(e.s * e.s / 0);
}
function gn(e, r) {
    var t, n, i;
    for((t = r.indexOf(".")) > -1 && (r = r.replace(".", "")), (n = r.search(/e/i)) > 0 ? (t < 0 && (t = n), t += +r.slice(n + 1), r = r.substring(0, n)) : t < 0 && (t = r.length), n = 0; r.charCodeAt(n) === 48; n++);
    for(i = r.length; r.charCodeAt(i - 1) === 48; --i);
    if (r = r.slice(n, i), r) {
        if (i -= n, e.e = t = t - n - 1, e.d = [], n = (t + 1) % E, t < 0 && (n += E), n < i) {
            for(n && e.d.push(+r.slice(0, n)), i -= E; n < i;)e.d.push(+r.slice(n, n += E));
            r = r.slice(n), n = E - r.length;
        } else n -= i;
        for(; n--;)r += "0";
        e.d.push(+r), w && (e.e > e.constructor.maxE ? (e.d = null, e.e = NaN) : e.e < e.constructor.minE && (e.e = 0, e.d = [
            0
        ]));
    } else e.e = 0, e.d = [
        0
    ];
    return e;
}
function Tp(e, r) {
    var t, n, i, o, s, a, l, u, c;
    if (r.indexOf("_") > -1) {
        if (r = r.replace(/(\d)_(?=\d)/g, "$1"), Bs.test(r)) return gn(e, r);
    } else if (r === "Infinity" || r === "NaN") return +r || (e.s = NaN), e.e = NaN, e.d = null, e;
    if (Ep.test(r)) t = 16, r = r.toLowerCase();
    else if (bp.test(r)) t = 2;
    else if (wp.test(r)) t = 8;
    else throw Error(He + r);
    for(o = r.search(/p/i), o > 0 ? (l = +r.slice(o + 1), r = r.substring(2, o)) : r = r.slice(2), o = r.indexOf("."), s = o >= 0, n = e.constructor, s && (r = r.replace(".", ""), a = r.length, o = a - o, i = Gs(n, new n(t), o, o * 2)), u = fn(r, t, fe), c = u.length - 1, o = c; u[o] === 0; --o)u.pop();
    return o < 0 ? new n(e.s * 0) : (e.e = wn(u, c), e.d = u, w = !1, s && (e = L(e, i, a * 4)), l && (e = e.times(Math.abs(l) < 54 ? U(2, l) : Le.pow(2, l))), w = !0, e);
}
function Sp(e, r) {
    var t, n = r.d.length;
    if (n < 3) return r.isZero() ? r : Tr(e, 2, r, r);
    t = 1.4 * Math.sqrt(n), t = t > 16 ? 16 : t | 0, r = r.times(1 / xn(5, t)), r = Tr(e, 2, r, r);
    for(var i, o = new e(5), s = new e(16), a = new e(20); t--;)i = r.times(r), r = r.times(o.plus(i.times(s.times(i).minus(a))));
    return r;
}
function Tr(e, r, t, n, i) {
    var o, s, a, l, u = 1, c = e.precision, p = Math.ceil(c / E);
    for(w = !1, l = t.times(t), a = new e(n);;){
        if (s = L(a.times(l), new e(r++ * r++), c, 1), a = i ? n.plus(s) : n.minus(s), n = L(s.times(l), new e(r++ * r++), c, 1), s = a.plus(n), s.d[p] !== void 0) {
            for(o = p; s.d[o] === a.d[o] && o--;);
            if (o == -1) break;
        }
        o = a, a = n, n = s, s = o, u++;
    }
    return w = !0, s.d.length = p + 1, s;
}
function xn(e, r) {
    for(var t = e; --r;)t *= e;
    return t;
}
function Js(e, r) {
    var t, n = r.s < 0, i = xe(e, e.precision, 1), o = i.times(.5);
    if (r = r.abs(), r.lte(o)) return Ne = n ? 4 : 1, r;
    if (t = r.divToInt(i), t.isZero()) Ne = n ? 3 : 2;
    else {
        if (r = r.minus(t.times(i)), r.lte(o)) return Ne = Ls(t) ? n ? 2 : 3 : n ? 4 : 1, r;
        Ne = Ls(t) ? n ? 1 : 4 : n ? 3 : 2;
    }
    return r.minus(i).abs();
}
function Ji(e, r, t, n) {
    var i, o, s, a, l, u, c, p, d, f = e.constructor, h = t !== void 0;
    if (h ? (ne(t, 1, Ye), n === void 0 ? n = f.rounding : ne(n, 0, 8)) : (t = f.precision, n = f.rounding), !e.isFinite()) c = Ws(e);
    else {
        for(c = ve(e), s = c.indexOf("."), h ? (i = 2, r == 16 ? t = t * 4 - 3 : r == 8 && (t = t * 3 - 2)) : i = r, s >= 0 && (c = c.replace(".", ""), d = new f(1), d.e = c.length - s, d.d = fn(ve(d), 10, i), d.e = d.d.length), p = fn(c, 10, i), o = l = p.length; p[--l] == 0;)p.pop();
        if (!p[0]) c = h ? "0p+0" : "0";
        else {
            if (s < 0 ? o-- : (e = new f(e), e.d = p, e.e = o, e = L(e, d, t, n, 0, i), p = e.d, o = e.e, u = $s), s = p[t], a = i / 2, u = u || p[t + 1] !== void 0, u = n < 4 ? (s !== void 0 || u) && (n === 0 || n === (e.s < 0 ? 3 : 2)) : s > a || s === a && (n === 4 || u || n === 6 && p[t - 1] & 1 || n === (e.s < 0 ? 8 : 7)), p.length = t, u) for(; ++p[--t] > i - 1;)p[t] = 0, t || (++o, p.unshift(1));
            for(l = p.length; !p[l - 1]; --l);
            for(s = 0, c = ""; s < l; s++)c += Ui.charAt(p[s]);
            if (h) {
                if (l > 1) if (r == 16 || r == 8) {
                    for(s = r == 16 ? 4 : 3, --l; l % s; l++)c += "0";
                    for(p = fn(c, i, r), l = p.length; !p[l - 1]; --l);
                    for(s = 1, c = "1."; s < l; s++)c += Ui.charAt(p[s]);
                } else c = c.charAt(0) + "." + c.slice(1);
                c = c + (o < 0 ? "p" : "p+") + o;
            } else if (o < 0) {
                for(; ++o;)c = "0" + c;
                c = "0." + c;
            } else if (++o > l) for(o -= l; o--;)c += "0";
            else o < l && (c = c.slice(0, o) + "." + c.slice(o));
        }
        c = (r == 16 ? "0x" : r == 2 ? "0b" : r == 8 ? "0o" : "") + c;
    }
    return e.s < 0 ? "-" + c : c;
}
function Fs(e, r) {
    if (e.length > r) return e.length = r, !0;
}
function Rp(e) {
    return new this(e).abs();
}
function Ap(e) {
    return new this(e).acos();
}
function Cp(e) {
    return new this(e).acosh();
}
function Ip(e, r) {
    return new this(e).plus(r);
}
function Dp(e) {
    return new this(e).asin();
}
function Op(e) {
    return new this(e).asinh();
}
function kp(e) {
    return new this(e).atan();
}
function _p(e) {
    return new this(e).atanh();
}
function Np(e, r) {
    e = new this(e), r = new this(r);
    var t, n = this.precision, i = this.rounding, o = n + 4;
    return !e.s || !r.s ? t = new this(NaN) : !e.d && !r.d ? (t = xe(this, o, 1).times(r.s > 0 ? .25 : .75), t.s = e.s) : !r.d || e.isZero() ? (t = r.s < 0 ? xe(this, n, i) : new this(0), t.s = e.s) : !e.d || r.isZero() ? (t = xe(this, o, 1).times(.5), t.s = e.s) : r.s < 0 ? (this.precision = o, this.rounding = 1, t = this.atan(L(e, r, o, 1)), r = xe(this, o, 1), this.precision = n, this.rounding = i, t = e.s < 0 ? t.minus(r) : t.plus(r)) : t = this.atan(L(e, r, o, 1)), t;
}
function Lp(e) {
    return new this(e).cbrt();
}
function Fp(e) {
    return y(e = new this(e), e.e + 1, 2);
}
function Mp(e, r, t) {
    return new this(e).clamp(r, t);
}
function $p(e) {
    if (!e || typeof e != "object") throw Error(En + "Object expected");
    var r, t, n, i = e.defaults === !0, o = [
        "precision",
        1,
        Ye,
        "rounding",
        0,
        8,
        "toExpNeg",
        -Pr,
        0,
        "toExpPos",
        0,
        Pr,
        "maxE",
        0,
        Pr,
        "minE",
        -Pr,
        0,
        "modulo",
        0,
        9
    ];
    for(r = 0; r < o.length; r += 3)if (t = o[r], i && (this[t] = Gi[t]), (n = e[t]) !== void 0) if (X(n) === n && n >= o[r + 1] && n <= o[r + 2]) this[t] = n;
    else throw Error(He + t + ": " + n);
    if (t = "crypto", i && (this[t] = Gi[t]), (n = e[t]) !== void 0) if (n === !0 || n === !1 || n === 0 || n === 1) if (n) if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes)) this[t] = !0;
    else throw Error(Vs);
    else this[t] = !1;
    else throw Error(He + t + ": " + n);
    return this;
}
function qp(e) {
    return new this(e).cos();
}
function Vp(e) {
    return new this(e).cosh();
}
function Ks(e) {
    var r, t, n;
    function i(o) {
        var s, a, l, u = this;
        if (!(u instanceof i)) return new i(o);
        if (u.constructor = i, Ms(o)) {
            u.s = o.s, w ? !o.d || o.e > i.maxE ? (u.e = NaN, u.d = null) : o.e < i.minE ? (u.e = 0, u.d = [
                0
            ]) : (u.e = o.e, u.d = o.d.slice()) : (u.e = o.e, u.d = o.d ? o.d.slice() : o.d);
            return;
        }
        if (l = typeof o, l === "number") {
            if (o === 0) {
                u.s = 1 / o < 0 ? -1 : 1, u.e = 0, u.d = [
                    0
                ];
                return;
            }
            if (o < 0 ? (o = -o, u.s = -1) : u.s = 1, o === ~~o && o < 1e7) {
                for(s = 0, a = o; a >= 10; a /= 10)s++;
                w ? s > i.maxE ? (u.e = NaN, u.d = null) : s < i.minE ? (u.e = 0, u.d = [
                    0
                ]) : (u.e = s, u.d = [
                    o
                ]) : (u.e = s, u.d = [
                    o
                ]);
                return;
            }
            if (o * 0 !== 0) {
                o || (u.s = NaN), u.e = NaN, u.d = null;
                return;
            }
            return gn(u, o.toString());
        }
        if (l === "string") return (a = o.charCodeAt(0)) === 45 ? (o = o.slice(1), u.s = -1) : (a === 43 && (o = o.slice(1)), u.s = 1), Bs.test(o) ? gn(u, o) : Tp(u, o);
        if (l === "bigint") return o < 0 ? (o = -o, u.s = -1) : u.s = 1, gn(u, o.toString());
        throw Error(He + o);
    }
    if (i.prototype = m, i.ROUND_UP = 0, i.ROUND_DOWN = 1, i.ROUND_CEIL = 2, i.ROUND_FLOOR = 3, i.ROUND_HALF_UP = 4, i.ROUND_HALF_DOWN = 5, i.ROUND_HALF_EVEN = 6, i.ROUND_HALF_CEIL = 7, i.ROUND_HALF_FLOOR = 8, i.EUCLID = 9, i.config = i.set = $p, i.clone = Ks, i.isDecimal = Ms, i.abs = Rp, i.acos = Ap, i.acosh = Cp, i.add = Ip, i.asin = Dp, i.asinh = Op, i.atan = kp, i.atanh = _p, i.atan2 = Np, i.cbrt = Lp, i.ceil = Fp, i.clamp = Mp, i.cos = qp, i.cosh = Vp, i.div = jp, i.exp = Bp, i.floor = Up, i.hypot = Gp, i.ln = Qp, i.log = Wp, i.log10 = Kp, i.log2 = Jp, i.max = Hp, i.min = Yp, i.mod = zp, i.mul = Zp, i.pow = Xp, i.random = ed, i.round = rd, i.sign = td, i.sin = nd, i.sinh = id, i.sqrt = od, i.sub = sd, i.sum = ad, i.tan = ld, i.tanh = ud, i.trunc = cd, e === void 0 && (e = {}), e && e.defaults !== !0) for(n = [
        "precision",
        "rounding",
        "toExpNeg",
        "toExpPos",
        "maxE",
        "minE",
        "modulo",
        "crypto"
    ], r = 0; r < n.length;)e.hasOwnProperty(t = n[r++]) || (e[t] = this[t]);
    return i.config(e), i;
}
function jp(e, r) {
    return new this(e).div(r);
}
function Bp(e) {
    return new this(e).exp();
}
function Up(e) {
    return y(e = new this(e), e.e + 1, 3);
}
function Gp() {
    var e, r, t = new this(0);
    for(w = !1, e = 0; e < arguments.length;)if (r = new this(arguments[e++]), r.d) t.d && (t = t.plus(r.times(r)));
    else {
        if (r.s) return w = !0, new this(1 / 0);
        t = r;
    }
    return w = !0, t.sqrt();
}
function Ms(e) {
    return e instanceof Le || e && e.toStringTag === js || !1;
}
function Qp(e) {
    return new this(e).ln();
}
function Wp(e, r) {
    return new this(e).log(r);
}
function Jp(e) {
    return new this(e).log(2);
}
function Kp(e) {
    return new this(e).log(10);
}
function Hp() {
    return Qs(this, arguments, -1);
}
function Yp() {
    return Qs(this, arguments, 1);
}
function zp(e, r) {
    return new this(e).mod(r);
}
function Zp(e, r) {
    return new this(e).mul(r);
}
function Xp(e, r) {
    return new this(e).pow(r);
}
function ed(e) {
    var r, t, n, i, o = 0, s = new this(1), a = [];
    if (e === void 0 ? e = this.precision : ne(e, 1, Ye), n = Math.ceil(e / E), this.crypto) if (crypto.getRandomValues) for(r = crypto.getRandomValues(new Uint32Array(n)); o < n;)i = r[o], i >= 429e7 ? r[o] = crypto.getRandomValues(new Uint32Array(1))[0] : a[o++] = i % 1e7;
    else if (crypto.randomBytes) {
        for(r = crypto.randomBytes(n *= 4); o < n;)i = r[o] + (r[o + 1] << 8) + (r[o + 2] << 16) + ((r[o + 3] & 127) << 24), i >= 214e7 ? crypto.randomBytes(4).copy(r, o) : (a.push(i % 1e7), o += 4);
        o = n / 4;
    } else throw Error(Vs);
    else for(; o < n;)a[o++] = Math.random() * 1e7 | 0;
    for(n = a[--o], e %= E, n && e && (i = U(10, E - e), a[o] = (n / i | 0) * i); a[o] === 0; o--)a.pop();
    if (o < 0) t = 0, a = [
        0
    ];
    else {
        for(t = -1; a[0] === 0; t -= E)a.shift();
        for(n = 1, i = a[0]; i >= 10; i /= 10)n++;
        n < E && (t -= E - n);
    }
    return s.e = t, s.d = a, s;
}
function rd(e) {
    return y(e = new this(e), e.e + 1, this.rounding);
}
function td(e) {
    return e = new this(e), e.d ? e.d[0] ? e.s : 0 * e.s : e.s || NaN;
}
function nd(e) {
    return new this(e).sin();
}
function id(e) {
    return new this(e).sinh();
}
function od(e) {
    return new this(e).sqrt();
}
function sd(e, r) {
    return new this(e).sub(r);
}
function ad() {
    var e = 0, r = arguments, t = new this(r[e]);
    for(w = !1; t.s && ++e < r.length;)t = t.plus(r[e]);
    return w = !0, y(t, this.precision, this.rounding);
}
function ld(e) {
    return new this(e).tan();
}
function ud(e) {
    return new this(e).tanh();
}
function cd(e) {
    return y(e = new this(e), e.e + 1, 1);
}
m[Symbol.for("nodejs.util.inspect.custom")] = m.toString;
m[Symbol.toStringTag] = "Decimal";
var Le = m.constructor = Ks(Gi);
hn = new Le(hn);
yn = new Le(yn);
var Fe = Le;
function Sr(e) {
    return Le.isDecimal(e) ? !0 : e !== null && typeof e == "object" && typeof e.s == "number" && typeof e.e == "number" && typeof e.toFixed == "function" && Array.isArray(e.d);
}
var ct = {};
tr(ct, {
    ModelAction: ()=>Rr,
    datamodelEnumToSchemaEnum: ()=>pd
});
function pd(e) {
    return {
        name: e.name,
        values: e.values.map((r)=>r.name)
    };
}
var Rr = ((b)=>(b.findUnique = "findUnique", b.findUniqueOrThrow = "findUniqueOrThrow", b.findFirst = "findFirst", b.findFirstOrThrow = "findFirstOrThrow", b.findMany = "findMany", b.create = "create", b.createMany = "createMany", b.createManyAndReturn = "createManyAndReturn", b.update = "update", b.updateMany = "updateMany", b.updateManyAndReturn = "updateManyAndReturn", b.upsert = "upsert", b.delete = "delete", b.deleteMany = "deleteMany", b.groupBy = "groupBy", b.count = "count", b.aggregate = "aggregate", b.findRaw = "findRaw", b.aggregateRaw = "aggregateRaw", b))(Rr || {});
var Xs = O(Di());
var Zs = O(__turbopack_context__.r("[externals]/node:fs [external] (node:fs, cjs)"));
var Hs = {
    keyword: De,
    entity: De,
    value: (e)=>W(nr(e)),
    punctuation: nr,
    directive: De,
    function: De,
    variable: (e)=>W(nr(e)),
    string: (e)=>W(qe(e)),
    boolean: Ie,
    number: De,
    comment: Hr
};
var dd = (e)=>e, vn = {}, md = 0, v = {
    manual: vn.Prism && vn.Prism.manual,
    disableWorkerMessageHandler: vn.Prism && vn.Prism.disableWorkerMessageHandler,
    util: {
        encode: function(e) {
            if (e instanceof ge) {
                let r = e;
                return new ge(r.type, v.util.encode(r.content), r.alias);
            } else return Array.isArray(e) ? e.map(v.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
        },
        type: function(e) {
            return Object.prototype.toString.call(e).slice(8, -1);
        },
        objId: function(e) {
            return e.__id || Object.defineProperty(e, "__id", {
                value: ++md
            }), e.__id;
        },
        clone: function e(r, t) {
            let n, i, o = v.util.type(r);
            switch(t = t || {}, o){
                case "Object":
                    if (i = v.util.objId(r), t[i]) return t[i];
                    n = {}, t[i] = n;
                    for(let s in r)r.hasOwnProperty(s) && (n[s] = e(r[s], t));
                    return n;
                case "Array":
                    return i = v.util.objId(r), t[i] ? t[i] : (n = [], t[i] = n, r.forEach(function(s, a) {
                        n[a] = e(s, t);
                    }), n);
                default:
                    return r;
            }
        }
    },
    languages: {
        extend: function(e, r) {
            let t = v.util.clone(v.languages[e]);
            for(let n in r)t[n] = r[n];
            return t;
        },
        insertBefore: function(e, r, t, n) {
            n = n || v.languages;
            let i = n[e], o = {};
            for(let a in i)if (i.hasOwnProperty(a)) {
                if (a == r) for(let l in t)t.hasOwnProperty(l) && (o[l] = t[l]);
                t.hasOwnProperty(a) || (o[a] = i[a]);
            }
            let s = n[e];
            return n[e] = o, v.languages.DFS(v.languages, function(a, l) {
                l === s && a != e && (this[a] = o);
            }), o;
        },
        DFS: function e(r, t, n, i) {
            i = i || {};
            let o = v.util.objId;
            for(let s in r)if (r.hasOwnProperty(s)) {
                t.call(r, s, r[s], n || s);
                let a = r[s], l = v.util.type(a);
                l === "Object" && !i[o(a)] ? (i[o(a)] = !0, e(a, t, null, i)) : l === "Array" && !i[o(a)] && (i[o(a)] = !0, e(a, t, s, i));
            }
        }
    },
    plugins: {},
    highlight: function(e, r, t) {
        let n = {
            code: e,
            grammar: r,
            language: t
        };
        return v.hooks.run("before-tokenize", n), n.tokens = v.tokenize(n.code, n.grammar), v.hooks.run("after-tokenize", n), ge.stringify(v.util.encode(n.tokens), n.language);
    },
    matchGrammar: function(e, r, t, n, i, o, s) {
        for(let g in t){
            if (!t.hasOwnProperty(g) || !t[g]) continue;
            if (g == s) return;
            let I = t[g];
            I = v.util.type(I) === "Array" ? I : [
                I
            ];
            for(let T = 0; T < I.length; ++T){
                let S = I[T], b = S.inside, D = !!S.lookbehind, me = !!S.greedy, se = 0, Kr = S.alias;
                if (me && !S.pattern.global) {
                    let j = S.pattern.toString().match(/[imuy]*$/)[0];
                    S.pattern = RegExp(S.pattern.source, j + "g");
                }
                S = S.pattern || S;
                for(let j = n, te = i; j < r.length; te += r[j].length, ++j){
                    let Ae = r[j];
                    if (r.length > e.length) return;
                    if (Ae instanceof ge) continue;
                    if (me && j != r.length - 1) {
                        S.lastIndex = te;
                        var p = S.exec(e);
                        if (!p) break;
                        var c = p.index + (D ? p[1].length : 0), d = p.index + p[0].length, a = j, l = te;
                        for(let k = r.length; a < k && (l < d || !r[a].type && !r[a - 1].greedy); ++a)l += r[a].length, c >= l && (++j, te = l);
                        if (r[j] instanceof ge) continue;
                        u = a - j, Ae = e.slice(te, l), p.index -= te;
                    } else {
                        S.lastIndex = 0;
                        var p = S.exec(Ae), u = 1;
                    }
                    if (!p) {
                        if (o) break;
                        continue;
                    }
                    D && (se = p[1] ? p[1].length : 0);
                    var c = p.index + se, p = p[0].slice(se), d = c + p.length, f = Ae.slice(0, c), h = Ae.slice(d);
                    let K = [
                        j,
                        u
                    ];
                    f && (++j, te += f.length, K.push(f));
                    let fr = new ge(g, b ? v.tokenize(p, b) : p, Kr, p, me);
                    if (K.push(fr), h && K.push(h), Array.prototype.splice.apply(r, K), u != 1 && v.matchGrammar(e, r, t, j, te, !0, g), o) break;
                }
            }
        }
    },
    tokenize: function(e, r) {
        let t = [
            e
        ], n = r.rest;
        if (n) {
            for(let i in n)r[i] = n[i];
            delete r.rest;
        }
        return v.matchGrammar(e, t, r, 0, 0, !1), t;
    },
    hooks: {
        all: {},
        add: function(e, r) {
            let t = v.hooks.all;
            t[e] = t[e] || [], t[e].push(r);
        },
        run: function(e, r) {
            let t = v.hooks.all[e];
            if (!(!t || !t.length)) for(var n = 0, i; i = t[n++];)i(r);
        }
    },
    Token: ge
};
v.languages.clike = {
    comment: [
        {
            pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
            lookbehind: !0
        },
        {
            pattern: /(^|[^\\:])\/\/.*/,
            lookbehind: !0,
            greedy: !0
        }
    ],
    string: {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0
    },
    "class-name": {
        pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
        lookbehind: !0,
        inside: {
            punctuation: /[.\\]/
        }
    },
    keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
    boolean: /\b(?:true|false)\b/,
    function: /\w+(?=\()/,
    number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
    operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
    punctuation: /[{}[\];(),.:]/
};
v.languages.javascript = v.languages.extend("clike", {
    "class-name": [
        v.languages.clike["class-name"],
        {
            pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
            lookbehind: !0
        }
    ],
    keyword: [
        {
            pattern: /((?:^|})\s*)(?:catch|finally)\b/,
            lookbehind: !0
        },
        {
            pattern: /(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
            lookbehind: !0
        }
    ],
    number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
    function: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
});
v.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/;
v.languages.insertBefore("javascript", "keyword", {
    regex: {
        pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=\s*($|[\r\n,.;})\]]))/,
        lookbehind: !0,
        greedy: !0
    },
    "function-variable": {
        pattern: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
        alias: "function"
    },
    parameter: [
        {
            pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
            lookbehind: !0,
            inside: v.languages.javascript
        },
        {
            pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
            inside: v.languages.javascript
        },
        {
            pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
            lookbehind: !0,
            inside: v.languages.javascript
        },
        {
            pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
            lookbehind: !0,
            inside: v.languages.javascript
        }
    ],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
});
v.languages.markup && v.languages.markup.tag.addInlined("script", "javascript");
v.languages.js = v.languages.javascript;
v.languages.typescript = v.languages.extend("javascript", {
    keyword: /\b(?:abstract|as|async|await|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|is|keyof|let|module|namespace|new|null|of|package|private|protected|public|readonly|return|require|set|static|super|switch|this|throw|try|type|typeof|var|void|while|with|yield)\b/,
    builtin: /\b(?:string|Function|any|number|boolean|Array|symbol|console|Promise|unknown|never)\b/
});
v.languages.ts = v.languages.typescript;
function ge(e, r, t, n, i) {
    this.type = e, this.content = r, this.alias = t, this.length = (n || "").length | 0, this.greedy = !!i;
}
ge.stringify = function(e, r) {
    return typeof e == "string" ? e : Array.isArray(e) ? e.map(function(t) {
        return ge.stringify(t, r);
    }).join("") : fd(e.type)(e.content);
};
function fd(e) {
    return Hs[e] || dd;
}
function Ys(e) {
    return gd(e, v.languages.javascript);
}
function gd(e, r) {
    return v.tokenize(e, r).map((n)=>ge.stringify(n)).join("");
}
function zs(e) {
    return Ci(e);
}
var Pn = class e {
    firstLineNumber;
    lines;
    static read(r) {
        let t;
        try {
            t = Zs.default.readFileSync(r, "utf-8");
        } catch  {
            return null;
        }
        return e.fromContent(t);
    }
    static fromContent(r) {
        let t = r.split(/\r?\n/);
        return new e(1, t);
    }
    constructor(r, t){
        this.firstLineNumber = r, this.lines = t;
    }
    get lastLineNumber() {
        return this.firstLineNumber + this.lines.length - 1;
    }
    mapLineAt(r, t) {
        if (r < this.firstLineNumber || r > this.lines.length + this.firstLineNumber) return this;
        let n = r - this.firstLineNumber, i = [
            ...this.lines
        ];
        return i[n] = t(i[n]), new e(this.firstLineNumber, i);
    }
    mapLines(r) {
        return new e(this.firstLineNumber, this.lines.map((t, n)=>r(t, this.firstLineNumber + n)));
    }
    lineAt(r) {
        return this.lines[r - this.firstLineNumber];
    }
    prependSymbolAt(r, t) {
        return this.mapLines((n, i)=>i === r ? `${t} ${n}` : `  ${n}`);
    }
    slice(r, t) {
        let n = this.lines.slice(r - 1, t).join(`
`);
        return new e(r, zs(n).split(`
`));
    }
    highlight() {
        let r = Ys(this.toString());
        return new e(this.firstLineNumber, r.split(`
`));
    }
    toString() {
        return this.lines.join(`
`);
    }
};
var hd = {
    red: ce,
    gray: Hr,
    dim: Ce,
    bold: W,
    underline: Y,
    highlightSource: (e)=>e.highlight()
}, yd = {
    red: (e)=>e,
    gray: (e)=>e,
    dim: (e)=>e,
    bold: (e)=>e,
    underline: (e)=>e,
    highlightSource: (e)=>e
};
function bd({ message: e, originalMethod: r, isPanic: t, callArguments: n }) {
    return {
        functionName: `prisma.${r}()`,
        message: e,
        isPanic: t ?? !1,
        callArguments: n
    };
}
function Ed({ callsite: e, message: r, originalMethod: t, isPanic: n, callArguments: i }, o) {
    let s = bd({
        message: r,
        originalMethod: t,
        isPanic: n,
        callArguments: i
    });
    if (!e || "undefined" < "u" || ("TURBOPACK compile-time value", "development") === "production") return s;
    let a = e.getLocation();
    if (!a || !a.lineNumber || !a.columnNumber) return s;
    let l = Math.max(1, a.lineNumber - 3), u = Pn.read(a.fileName)?.slice(l, a.lineNumber), c = u?.lineAt(a.lineNumber);
    if (u && c) {
        let p = xd(c), d = wd(c);
        if (!d) return s;
        s.functionName = `${d.code})`, s.location = a, n || (u = u.mapLineAt(a.lineNumber, (h)=>h.slice(0, d.openingBraceIndex))), u = o.highlightSource(u);
        let f = String(u.lastLineNumber).length;
        if (s.contextLines = u.mapLines((h, g)=>o.gray(String(g).padStart(f)) + " " + h).mapLines((h)=>o.dim(h)).prependSymbolAt(a.lineNumber, o.bold(o.red("\u2192"))), i) {
            let h = p + f + 1;
            h += 2, s.callArguments = (0, Xs.default)(i, h).slice(h);
        }
    }
    return s;
}
function wd(e) {
    let r = Object.keys(Rr).join("|"), n = new RegExp(String.raw`\.(${r})\(`).exec(e);
    if (n) {
        let i = n.index + n[0].length, o = e.lastIndexOf(" ", n.index) + 1;
        return {
            code: e.slice(o, i),
            openingBraceIndex: i
        };
    }
    return null;
}
function xd(e) {
    let r = 0;
    for(let t = 0; t < e.length; t++){
        if (e.charAt(t) !== " ") return r;
        r++;
    }
    return r;
}
function vd({ functionName: e, location: r, message: t, isPanic: n, contextLines: i, callArguments: o }, s) {
    let a = [
        ""
    ], l = r ? " in" : ":";
    if (n ? (a.push(s.red(`Oops, an unknown error occurred! This is ${s.bold("on us")}, you did nothing wrong.`)), a.push(s.red(`It occurred in the ${s.bold(`\`${e}\``)} invocation${l}`))) : a.push(s.red(`Invalid ${s.bold(`\`${e}\``)} invocation${l}`)), r && a.push(s.underline(Pd(r))), i) {
        a.push("");
        let u = [
            i.toString()
        ];
        o && (u.push(o), u.push(s.dim(")"))), a.push(u.join("")), o && a.push("");
    } else a.push(""), o && a.push(o), a.push("");
    return a.push(t), a.join(`
`);
}
function Pd(e) {
    let r = [
        e.fileName
    ];
    return e.lineNumber && r.push(String(e.lineNumber)), e.columnNumber && r.push(String(e.columnNumber)), r.join(":");
}
function Tn(e) {
    let r = e.showColors ? hd : yd, t;
    return t = Ed(e, r), vd(t, r);
}
var la = O(Ki());
function na(e, r, t) {
    let n = ia(e), i = Td(n), o = Rd(i);
    o ? Sn(o, r, t) : r.addErrorMessage(()=>"Unknown error");
}
function ia(e) {
    return e.errors.flatMap((r)=>r.kind === "Union" ? ia(r) : [
            r
        ]);
}
function Td(e) {
    let r = new Map, t = [];
    for (let n of e){
        if (n.kind !== "InvalidArgumentType") {
            t.push(n);
            continue;
        }
        let i = `${n.selectionPath.join(".")}:${n.argumentPath.join(".")}`, o = r.get(i);
        o ? r.set(i, {
            ...n,
            argument: {
                ...n.argument,
                typeNames: Sd(o.argument.typeNames, n.argument.typeNames)
            }
        }) : r.set(i, n);
    }
    return t.push(...r.values()), t;
}
function Sd(e, r) {
    return [
        ...new Set(e.concat(r))
    ];
}
function Rd(e) {
    return ji(e, (r, t)=>{
        let n = ra(r), i = ra(t);
        return n !== i ? n - i : ta(r) - ta(t);
    });
}
function ra(e) {
    let r = 0;
    return Array.isArray(e.selectionPath) && (r += e.selectionPath.length), Array.isArray(e.argumentPath) && (r += e.argumentPath.length), r;
}
function ta(e) {
    switch(e.kind){
        case "InvalidArgumentValue":
        case "ValueTooLarge":
            return 20;
        case "InvalidArgumentType":
            return 10;
        case "RequiredArgumentMissing":
            return -10;
        default:
            return 0;
    }
}
var le = class {
    constructor(r, t){
        this.name = r;
        this.value = t;
    }
    isRequired = !1;
    makeRequired() {
        return this.isRequired = !0, this;
    }
    write(r) {
        let { colors: { green: t } } = r.context;
        r.addMarginSymbol(t(this.isRequired ? "+" : "?")), r.write(t(this.name)), this.isRequired || r.write(t("?")), r.write(t(": ")), typeof this.value == "string" ? r.write(t(this.value)) : r.write(this.value);
    }
};
sa();
var Ar = class {
    constructor(r = 0, t){
        this.context = t;
        this.currentIndent = r;
    }
    lines = [];
    currentLine = "";
    currentIndent = 0;
    marginSymbol;
    afterNextNewLineCallback;
    write(r) {
        return typeof r == "string" ? this.currentLine += r : r.write(this), this;
    }
    writeJoined(r, t, n = (i, o)=>o.write(i)) {
        let i = t.length - 1;
        for(let o = 0; o < t.length; o++)n(t[o], this), o !== i && this.write(r);
        return this;
    }
    writeLine(r) {
        return this.write(r).newLine();
    }
    newLine() {
        this.lines.push(this.indentedCurrentLine()), this.currentLine = "", this.marginSymbol = void 0;
        let r = this.afterNextNewLineCallback;
        return this.afterNextNewLineCallback = void 0, r?.(), this;
    }
    withIndent(r) {
        return this.indent(), r(this), this.unindent(), this;
    }
    afterNextNewline(r) {
        return this.afterNextNewLineCallback = r, this;
    }
    indent() {
        return this.currentIndent++, this;
    }
    unindent() {
        return this.currentIndent > 0 && this.currentIndent--, this;
    }
    addMarginSymbol(r) {
        return this.marginSymbol = r, this;
    }
    toString() {
        return this.lines.concat(this.indentedCurrentLine()).join(`
`);
    }
    getCurrentLineLength() {
        return this.currentLine.length;
    }
    indentedCurrentLine() {
        let r = this.currentLine.padStart(this.currentLine.length + 2 * this.currentIndent);
        return this.marginSymbol ? this.marginSymbol + r.slice(1) : r;
    }
};
oa();
var Rn = class {
    constructor(r){
        this.value = r;
    }
    write(r) {
        r.write(this.value);
    }
    markAsError() {
        this.value.markAsError();
    }
};
var An = (e)=>e, Cn = {
    bold: An,
    red: An,
    green: An,
    dim: An,
    enabled: !1
}, aa = {
    bold: W,
    red: ce,
    green: qe,
    dim: Ce,
    enabled: !0
}, Cr = {
    write (e) {
        e.writeLine(",");
    }
};
var Pe = class {
    constructor(r){
        this.contents = r;
    }
    isUnderlined = !1;
    color = (r)=>r;
    underline() {
        return this.isUnderlined = !0, this;
    }
    setColor(r) {
        return this.color = r, this;
    }
    write(r) {
        let t = r.getCurrentLineLength();
        r.write(this.color(this.contents)), this.isUnderlined && r.afterNextNewline(()=>{
            r.write(" ".repeat(t)).writeLine(this.color("~".repeat(this.contents.length)));
        });
    }
};
var ze = class {
    hasError = !1;
    markAsError() {
        return this.hasError = !0, this;
    }
};
var Ir = class extends ze {
    items = [];
    addItem(r) {
        return this.items.push(new Rn(r)), this;
    }
    getField(r) {
        return this.items[r];
    }
    getPrintWidth() {
        return this.items.length === 0 ? 2 : Math.max(...this.items.map((t)=>t.value.getPrintWidth())) + 2;
    }
    write(r) {
        if (this.items.length === 0) {
            this.writeEmpty(r);
            return;
        }
        this.writeWithItems(r);
    }
    writeEmpty(r) {
        let t = new Pe("[]");
        this.hasError && t.setColor(r.context.colors.red).underline(), r.write(t);
    }
    writeWithItems(r) {
        let { colors: t } = r.context;
        r.writeLine("[").withIndent(()=>r.writeJoined(Cr, this.items).newLine()).write("]"), this.hasError && r.afterNextNewline(()=>{
            r.writeLine(t.red("~".repeat(this.getPrintWidth())));
        });
    }
    asObject() {}
};
var Dr = class e extends ze {
    fields = {};
    suggestions = [];
    addField(r) {
        this.fields[r.name] = r;
    }
    addSuggestion(r) {
        this.suggestions.push(r);
    }
    getField(r) {
        return this.fields[r];
    }
    getDeepField(r) {
        let [t, ...n] = r, i = this.getField(t);
        if (!i) return;
        let o = i;
        for (let s of n){
            let a;
            if (o.value instanceof e ? a = o.value.getField(s) : o.value instanceof Ir && (a = o.value.getField(Number(s))), !a) return;
            o = a;
        }
        return o;
    }
    getDeepFieldValue(r) {
        return r.length === 0 ? this : this.getDeepField(r)?.value;
    }
    hasField(r) {
        return !!this.getField(r);
    }
    removeAllFields() {
        this.fields = {};
    }
    removeField(r) {
        delete this.fields[r];
    }
    getFields() {
        return this.fields;
    }
    isEmpty() {
        return Object.keys(this.fields).length === 0;
    }
    getFieldValue(r) {
        return this.getField(r)?.value;
    }
    getDeepSubSelectionValue(r) {
        let t = this;
        for (let n of r){
            if (!(t instanceof e)) return;
            let i = t.getSubSelectionValue(n);
            if (!i) return;
            t = i;
        }
        return t;
    }
    getDeepSelectionParent(r) {
        let t = this.getSelectionParent();
        if (!t) return;
        let n = t;
        for (let i of r){
            let o = n.value.getFieldValue(i);
            if (!o || !(o instanceof e)) return;
            let s = o.getSelectionParent();
            if (!s) return;
            n = s;
        }
        return n;
    }
    getSelectionParent() {
        let r = this.getField("select")?.value.asObject();
        if (r) return {
            kind: "select",
            value: r
        };
        let t = this.getField("include")?.value.asObject();
        if (t) return {
            kind: "include",
            value: t
        };
    }
    getSubSelectionValue(r) {
        return this.getSelectionParent()?.value.fields[r].value;
    }
    getPrintWidth() {
        let r = Object.values(this.fields);
        return r.length == 0 ? 2 : Math.max(...r.map((n)=>n.getPrintWidth())) + 2;
    }
    write(r) {
        let t = Object.values(this.fields);
        if (t.length === 0 && this.suggestions.length === 0) {
            this.writeEmpty(r);
            return;
        }
        this.writeWithContents(r, t);
    }
    asObject() {
        return this;
    }
    writeEmpty(r) {
        let t = new Pe("{}");
        this.hasError && t.setColor(r.context.colors.red).underline(), r.write(t);
    }
    writeWithContents(r, t) {
        r.writeLine("{").withIndent(()=>{
            r.writeJoined(Cr, [
                ...t,
                ...this.suggestions
            ]).newLine();
        }), r.write("}"), this.hasError && r.afterNextNewline(()=>{
            r.writeLine(r.context.colors.red("~".repeat(this.getPrintWidth())));
        });
    }
};
var Q = class extends ze {
    constructor(t){
        super();
        this.text = t;
    }
    getPrintWidth() {
        return this.text.length;
    }
    write(t) {
        let n = new Pe(this.text);
        this.hasError && n.underline().setColor(t.context.colors.red), t.write(n);
    }
    asObject() {}
};
var pt = class {
    fields = [];
    addField(r, t) {
        return this.fields.push({
            write (n) {
                let { green: i, dim: o } = n.context.colors;
                n.write(i(o(`${r}: ${t}`))).addMarginSymbol(i(o("+")));
            }
        }), this;
    }
    write(r) {
        let { colors: { green: t } } = r.context;
        r.writeLine(t("{")).withIndent(()=>{
            r.writeJoined(Cr, this.fields).newLine();
        }).write(t("}")).addMarginSymbol(t("+"));
    }
};
function Sn(e, r, t) {
    switch(e.kind){
        case "MutuallyExclusiveFields":
            Ad(e, r);
            break;
        case "IncludeOnScalar":
            Cd(e, r);
            break;
        case "EmptySelection":
            Id(e, r, t);
            break;
        case "UnknownSelectionField":
            _d(e, r);
            break;
        case "InvalidSelectionValue":
            Nd(e, r);
            break;
        case "UnknownArgument":
            Ld(e, r);
            break;
        case "UnknownInputField":
            Fd(e, r);
            break;
        case "RequiredArgumentMissing":
            Md(e, r);
            break;
        case "InvalidArgumentType":
            $d(e, r);
            break;
        case "InvalidArgumentValue":
            qd(e, r);
            break;
        case "ValueTooLarge":
            Vd(e, r);
            break;
        case "SomeFieldsMissing":
            jd(e, r);
            break;
        case "TooManyFieldsGiven":
            Bd(e, r);
            break;
        case "Union":
            na(e, r, t);
            break;
        default:
            throw new Error("not implemented: " + e.kind);
    }
}
function Ad(e, r) {
    let t = r.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
    t && (t.getField(e.firstField)?.markAsError(), t.getField(e.secondField)?.markAsError()), r.addErrorMessage((n)=>`Please ${n.bold("either")} use ${n.green(`\`${e.firstField}\``)} or ${n.green(`\`${e.secondField}\``)}, but ${n.red("not both")} at the same time.`);
}
function Cd(e, r) {
    let [t, n] = Or(e.selectionPath), i = e.outputType, o = r.arguments.getDeepSelectionParent(t)?.value;
    if (o && (o.getField(n)?.markAsError(), i)) for (let s of i.fields)s.isRelation && o.addSuggestion(new le(s.name, "true"));
    r.addErrorMessage((s)=>{
        let a = `Invalid scalar field ${s.red(`\`${n}\``)} for ${s.bold("include")} statement`;
        return i ? a += ` on model ${s.bold(i.name)}. ${dt(s)}` : a += ".", a += `
Note that ${s.bold("include")} statements only accept relation fields.`, a;
    });
}
function Id(e, r, t) {
    let n = r.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
    if (n) {
        let i = n.getField("omit")?.value.asObject();
        if (i) {
            Dd(e, r, i);
            return;
        }
        if (n.hasField("select")) {
            Od(e, r);
            return;
        }
    }
    if (t?.[We(e.outputType.name)]) {
        kd(e, r);
        return;
    }
    r.addErrorMessage(()=>`Unknown field at "${e.selectionPath.join(".")} selection"`);
}
function Dd(e, r, t) {
    t.removeAllFields();
    for (let n of e.outputType.fields)t.addSuggestion(new le(n.name, "false"));
    r.addErrorMessage((n)=>`The ${n.red("omit")} statement includes every field of the model ${n.bold(e.outputType.name)}. At least one field must be included in the result`);
}
function Od(e, r) {
    let t = e.outputType, n = r.arguments.getDeepSelectionParent(e.selectionPath)?.value, i = n?.isEmpty() ?? !1;
    n && (n.removeAllFields(), pa(n, t)), r.addErrorMessage((o)=>i ? `The ${o.red("`select`")} statement for type ${o.bold(t.name)} must not be empty. ${dt(o)}` : `The ${o.red("`select`")} statement for type ${o.bold(t.name)} needs ${o.bold("at least one truthy value")}.`);
}
function kd(e, r) {
    let t = new pt;
    for (let i of e.outputType.fields)i.isRelation || t.addField(i.name, "false");
    let n = new le("omit", t).makeRequired();
    if (e.selectionPath.length === 0) r.arguments.addSuggestion(n);
    else {
        let [i, o] = Or(e.selectionPath), a = r.arguments.getDeepSelectionParent(i)?.value.asObject()?.getField(o);
        if (a) {
            let l = a?.value.asObject() ?? new Dr;
            l.addSuggestion(n), a.value = l;
        }
    }
    r.addErrorMessage((i)=>`The global ${i.red("omit")} configuration excludes every field of the model ${i.bold(e.outputType.name)}. At least one field must be included in the result`);
}
function _d(e, r) {
    let t = da(e.selectionPath, r);
    if (t.parentKind !== "unknown") {
        t.field.markAsError();
        let n = t.parent;
        switch(t.parentKind){
            case "select":
                pa(n, e.outputType);
                break;
            case "include":
                Ud(n, e.outputType);
                break;
            case "omit":
                Gd(n, e.outputType);
                break;
        }
    }
    r.addErrorMessage((n)=>{
        let i = [
            `Unknown field ${n.red(`\`${t.fieldName}\``)}`
        ];
        return t.parentKind !== "unknown" && i.push(`for ${n.bold(t.parentKind)} statement`), i.push(`on model ${n.bold(`\`${e.outputType.name}\``)}.`), i.push(dt(n)), i.join(" ");
    });
}
function Nd(e, r) {
    let t = da(e.selectionPath, r);
    t.parentKind !== "unknown" && t.field.value.markAsError(), r.addErrorMessage((n)=>`Invalid value for selection field \`${n.red(t.fieldName)}\`: ${e.underlyingError}`);
}
function Ld(e, r) {
    let t = e.argumentPath[0], n = r.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
    n && (n.getField(t)?.markAsError(), Qd(n, e.arguments)), r.addErrorMessage((i)=>ua(i, t, e.arguments.map((o)=>o.name)));
}
function Fd(e, r) {
    let [t, n] = Or(e.argumentPath), i = r.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
    if (i) {
        i.getDeepField(e.argumentPath)?.markAsError();
        let o = i.getDeepFieldValue(t)?.asObject();
        o && ma(o, e.inputType);
    }
    r.addErrorMessage((o)=>ua(o, n, e.inputType.fields.map((s)=>s.name)));
}
function ua(e, r, t) {
    let n = [
        `Unknown argument \`${e.red(r)}\`.`
    ], i = Jd(r, t);
    return i && n.push(`Did you mean \`${e.green(i)}\`?`), t.length > 0 && n.push(dt(e)), n.join(" ");
}
function Md(e, r) {
    let t;
    r.addErrorMessage((l)=>t?.value instanceof Q && t.value.text === "null" ? `Argument \`${l.green(o)}\` must not be ${l.red("null")}.` : `Argument \`${l.green(o)}\` is missing.`);
    let n = r.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
    if (!n) return;
    let [i, o] = Or(e.argumentPath), s = new pt, a = n.getDeepFieldValue(i)?.asObject();
    if (a) {
        if (t = a.getField(o), t && a.removeField(o), e.inputTypes.length === 1 && e.inputTypes[0].kind === "object") {
            for (let l of e.inputTypes[0].fields)s.addField(l.name, l.typeNames.join(" | "));
            a.addSuggestion(new le(o, s).makeRequired());
        } else {
            let l = e.inputTypes.map(ca).join(" | ");
            a.addSuggestion(new le(o, l).makeRequired());
        }
        if (e.dependentArgumentPath) {
            n.getDeepField(e.dependentArgumentPath)?.markAsError();
            let [, l] = Or(e.dependentArgumentPath);
            r.addErrorMessage((u)=>`Argument \`${u.green(o)}\` is required because argument \`${u.green(l)}\` was provided.`);
        }
    }
}
function ca(e) {
    return e.kind === "list" ? `${ca(e.elementType)}[]` : e.name;
}
function $d(e, r) {
    let t = e.argument.name, n = r.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
    n && n.getDeepFieldValue(e.argumentPath)?.markAsError(), r.addErrorMessage((i)=>{
        let o = In("or", e.argument.typeNames.map((s)=>i.green(s)));
        return `Argument \`${i.bold(t)}\`: Invalid value provided. Expected ${o}, provided ${i.red(e.inferredType)}.`;
    });
}
function qd(e, r) {
    let t = e.argument.name, n = r.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
    n && n.getDeepFieldValue(e.argumentPath)?.markAsError(), r.addErrorMessage((i)=>{
        let o = [
            `Invalid value for argument \`${i.bold(t)}\``
        ];
        if (e.underlyingError && o.push(`: ${e.underlyingError}`), o.push("."), e.argument.typeNames.length > 0) {
            let s = In("or", e.argument.typeNames.map((a)=>i.green(a)));
            o.push(` Expected ${s}.`);
        }
        return o.join("");
    });
}
function Vd(e, r) {
    let t = e.argument.name, n = r.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject(), i;
    if (n) {
        let s = n.getDeepField(e.argumentPath)?.value;
        s?.markAsError(), s instanceof Q && (i = s.text);
    }
    r.addErrorMessage((o)=>{
        let s = [
            "Unable to fit value"
        ];
        return i && s.push(o.red(i)), s.push(`into a 64-bit signed integer for field \`${o.bold(t)}\``), s.join(" ");
    });
}
function jd(e, r) {
    let t = e.argumentPath[e.argumentPath.length - 1], n = r.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
    if (n) {
        let i = n.getDeepFieldValue(e.argumentPath)?.asObject();
        i && ma(i, e.inputType);
    }
    r.addErrorMessage((i)=>{
        let o = [
            `Argument \`${i.bold(t)}\` of type ${i.bold(e.inputType.name)} needs`
        ];
        return e.constraints.minFieldCount === 1 ? e.constraints.requiredFields ? o.push(`${i.green("at least one of")} ${In("or", e.constraints.requiredFields.map((s)=>`\`${i.bold(s)}\``))} arguments.`) : o.push(`${i.green("at least one")} argument.`) : o.push(`${i.green(`at least ${e.constraints.minFieldCount}`)} arguments.`), o.push(dt(i)), o.join(" ");
    });
}
function Bd(e, r) {
    let t = e.argumentPath[e.argumentPath.length - 1], n = r.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject(), i = [];
    if (n) {
        let o = n.getDeepFieldValue(e.argumentPath)?.asObject();
        o && (o.markAsError(), i = Object.keys(o.getFields()));
    }
    r.addErrorMessage((o)=>{
        let s = [
            `Argument \`${o.bold(t)}\` of type ${o.bold(e.inputType.name)} needs`
        ];
        return e.constraints.minFieldCount === 1 && e.constraints.maxFieldCount == 1 ? s.push(`${o.green("exactly one")} argument,`) : e.constraints.maxFieldCount == 1 ? s.push(`${o.green("at most one")} argument,`) : s.push(`${o.green(`at most ${e.constraints.maxFieldCount}`)} arguments,`), s.push(`but you provided ${In("and", i.map((a)=>o.red(a)))}. Please choose`), e.constraints.maxFieldCount === 1 ? s.push("one.") : s.push(`${e.constraints.maxFieldCount}.`), s.join(" ");
    });
}
function pa(e, r) {
    for (let t of r.fields)e.hasField(t.name) || e.addSuggestion(new le(t.name, "true"));
}
function Ud(e, r) {
    for (let t of r.fields)t.isRelation && !e.hasField(t.name) && e.addSuggestion(new le(t.name, "true"));
}
function Gd(e, r) {
    for (let t of r.fields)!e.hasField(t.name) && !t.isRelation && e.addSuggestion(new le(t.name, "true"));
}
function Qd(e, r) {
    for (let t of r)e.hasField(t.name) || e.addSuggestion(new le(t.name, t.typeNames.join(" | ")));
}
function da(e, r) {
    let [t, n] = Or(e), i = r.arguments.getDeepSubSelectionValue(t)?.asObject();
    if (!i) return {
        parentKind: "unknown",
        fieldName: n
    };
    let o = i.getFieldValue("select")?.asObject(), s = i.getFieldValue("include")?.asObject(), a = i.getFieldValue("omit")?.asObject(), l = o?.getField(n);
    return o && l ? {
        parentKind: "select",
        parent: o,
        field: l,
        fieldName: n
    } : (l = s?.getField(n), s && l ? {
        parentKind: "include",
        field: l,
        parent: s,
        fieldName: n
    } : (l = a?.getField(n), a && l ? {
        parentKind: "omit",
        field: l,
        parent: a,
        fieldName: n
    } : {
        parentKind: "unknown",
        fieldName: n
    }));
}
function ma(e, r) {
    if (r.kind === "object") for (let t of r.fields)e.hasField(t.name) || e.addSuggestion(new le(t.name, t.typeNames.join(" | ")));
}
function Or(e) {
    let r = [
        ...e
    ], t = r.pop();
    if (!t) throw new Error("unexpected empty path");
    return [
        r,
        t
    ];
}
function dt({ green: e, enabled: r }) {
    return "Available options are " + (r ? `listed in ${e("green")}` : "marked with ?") + ".";
}
function In(e, r) {
    if (r.length === 1) return r[0];
    let t = [
        ...r
    ], n = t.pop();
    return `${t.join(", ")} ${e} ${n}`;
}
var Wd = 3;
function Jd(e, r) {
    let t = 1 / 0, n;
    for (let i of r){
        let o = (0, la.default)(e, i);
        o > Wd || o < t && (t = o, n = i);
    }
    return n;
}
var mt = class {
    modelName;
    name;
    typeName;
    isList;
    isEnum;
    constructor(r, t, n, i, o){
        this.modelName = r, this.name = t, this.typeName = n, this.isList = i, this.isEnum = o;
    }
    _toGraphQLInputType() {
        let r = this.isList ? "List" : "", t = this.isEnum ? "Enum" : "";
        return `${r}${t}${this.typeName}FieldRefInput<${this.modelName}>`;
    }
};
function kr(e) {
    return e instanceof mt;
}
var Dn = Symbol(), Yi = new WeakMap, Me = class {
    constructor(r){
        r === Dn ? Yi.set(this, `Prisma.${this._getName()}`) : Yi.set(this, `new Prisma.${this._getNamespace()}.${this._getName()}()`);
    }
    _getName() {
        return this.constructor.name;
    }
    toString() {
        return Yi.get(this);
    }
}, ft = class extends Me {
    _getNamespace() {
        return "NullTypes";
    }
}, gt = class extends ft {
    #e;
};
zi(gt, "DbNull");
var ht = class extends ft {
    #e;
};
zi(ht, "JsonNull");
var yt = class extends ft {
    #e;
};
zi(yt, "AnyNull");
var On = {
    classes: {
        DbNull: gt,
        JsonNull: ht,
        AnyNull: yt
    },
    instances: {
        DbNull: new gt(Dn),
        JsonNull: new ht(Dn),
        AnyNull: new yt(Dn)
    }
};
function zi(e, r) {
    Object.defineProperty(e, "name", {
        value: r,
        configurable: !0
    });
}
var fa = ": ", kn = class {
    constructor(r, t){
        this.name = r;
        this.value = t;
    }
    hasError = !1;
    markAsError() {
        this.hasError = !0;
    }
    getPrintWidth() {
        return this.name.length + this.value.getPrintWidth() + fa.length;
    }
    write(r) {
        let t = new Pe(this.name);
        this.hasError && t.underline().setColor(r.context.colors.red), r.write(t).write(fa).write(this.value);
    }
};
var Zi = class {
    arguments;
    errorMessages = [];
    constructor(r){
        this.arguments = r;
    }
    write(r) {
        r.write(this.arguments);
    }
    addErrorMessage(r) {
        this.errorMessages.push(r);
    }
    renderAllMessages(r) {
        return this.errorMessages.map((t)=>t(r)).join(`
`);
    }
};
function _r(e) {
    return new Zi(ga(e));
}
function ga(e) {
    let r = new Dr;
    for (let [t, n] of Object.entries(e)){
        let i = new kn(t, ha(n));
        r.addField(i);
    }
    return r;
}
function ha(e) {
    if (typeof e == "string") return new Q(JSON.stringify(e));
    if (typeof e == "number" || typeof e == "boolean") return new Q(String(e));
    if (typeof e == "bigint") return new Q(`${e}n`);
    if (e === null) return new Q("null");
    if (e === void 0) return new Q("undefined");
    if (Sr(e)) return new Q(`new Prisma.Decimal("${e.toFixed()}")`);
    if (e instanceof Uint8Array) return Buffer.isBuffer(e) ? new Q(`Buffer.alloc(${e.byteLength})`) : new Q(`new Uint8Array(${e.byteLength})`);
    if (e instanceof Date) {
        let r = mn(e) ? e.toISOString() : "Invalid Date";
        return new Q(`new Date("${r}")`);
    }
    return e instanceof Me ? new Q(`Prisma.${e._getName()}`) : kr(e) ? new Q(`prisma.${We(e.modelName)}.$fields.${e.name}`) : Array.isArray(e) ? Kd(e) : typeof e == "object" ? ga(e) : new Q(Object.prototype.toString.call(e));
}
function Kd(e) {
    let r = new Ir;
    for (let t of e)r.addItem(ha(t));
    return r;
}
function _n(e, r) {
    let t = r === "pretty" ? aa : Cn, n = e.renderAllMessages(t), i = new Ar(0, {
        colors: t
    }).write(e).toString();
    return {
        message: n,
        args: i
    };
}
function Nn({ args: e, errors: r, errorFormat: t, callsite: n, originalMethod: i, clientVersion: o, globalOmit: s }) {
    let a = _r(e);
    for (let p of r)Sn(p, a, s);
    let { message: l, args: u } = _n(a, t), c = Tn({
        message: l,
        callsite: n,
        originalMethod: i,
        showColors: t === "pretty",
        callArguments: u
    });
    throw new Z(c, {
        clientVersion: o
    });
}
function Te(e) {
    return e.replace(/^./, (r)=>r.toLowerCase());
}
function ba(e, r, t) {
    let n = Te(t);
    return !r.result || !(r.result.$allModels || r.result[n]) ? e : Hd({
        ...e,
        ...ya(r.name, e, r.result.$allModels),
        ...ya(r.name, e, r.result[n])
    });
}
function Hd(e) {
    let r = new we, t = (n, i)=>r.getOrCreate(n, ()=>i.has(n) ? [
                n
            ] : (i.add(n), e[n] ? e[n].needs.flatMap((o)=>t(o, i)) : [
                n
            ]));
    return pn(e, (n)=>({
            ...n,
            needs: t(n.name, new Set)
        }));
}
function ya(e, r, t) {
    return t ? pn(t, ({ needs: n, compute: i }, o)=>({
            name: o,
            needs: n ? Object.keys(n).filter((s)=>n[s]) : [],
            compute: Yd(r, o, i)
        })) : {};
}
function Yd(e, r, t) {
    let n = e?.[r]?.compute;
    return n ? (i)=>t({
            ...i,
            [r]: n(i)
        }) : t;
}
function Ea(e, r) {
    if (!r) return e;
    let t = {
        ...e
    };
    for (let n of Object.values(r))if (e[n.name]) for (let i of n.needs)t[i] = !0;
    return t;
}
function wa(e, r) {
    if (!r) return e;
    let t = {
        ...e
    };
    for (let n of Object.values(r))if (!e[n.name]) for (let i of n.needs)delete t[i];
    return t;
}
var Ln = class {
    constructor(r, t){
        this.extension = r;
        this.previous = t;
    }
    computedFieldsCache = new we;
    modelExtensionsCache = new we;
    queryCallbacksCache = new we;
    clientExtensions = lt(()=>this.extension.client ? {
            ...this.previous?.getAllClientExtensions(),
            ...this.extension.client
        } : this.previous?.getAllClientExtensions());
    batchCallbacks = lt(()=>{
        let r = this.previous?.getAllBatchQueryCallbacks() ?? [], t = this.extension.query?.$__internalBatch;
        return t ? r.concat(t) : r;
    });
    getAllComputedFields(r) {
        return this.computedFieldsCache.getOrCreate(r, ()=>ba(this.previous?.getAllComputedFields(r), this.extension, r));
    }
    getAllClientExtensions() {
        return this.clientExtensions.get();
    }
    getAllModelExtensions(r) {
        return this.modelExtensionsCache.getOrCreate(r, ()=>{
            let t = Te(r);
            return !this.extension.model || !(this.extension.model[t] || this.extension.model.$allModels) ? this.previous?.getAllModelExtensions(r) : {
                ...this.previous?.getAllModelExtensions(r),
                ...this.extension.model.$allModels,
                ...this.extension.model[t]
            };
        });
    }
    getAllQueryCallbacks(r, t) {
        return this.queryCallbacksCache.getOrCreate(`${r}:${t}`, ()=>{
            let n = this.previous?.getAllQueryCallbacks(r, t) ?? [], i = [], o = this.extension.query;
            return !o || !(o[r] || o.$allModels || o[t] || o.$allOperations) ? n : (o[r] !== void 0 && (o[r][t] !== void 0 && i.push(o[r][t]), o[r].$allOperations !== void 0 && i.push(o[r].$allOperations)), r !== "$none" && o.$allModels !== void 0 && (o.$allModels[t] !== void 0 && i.push(o.$allModels[t]), o.$allModels.$allOperations !== void 0 && i.push(o.$allModels.$allOperations)), o[t] !== void 0 && i.push(o[t]), o.$allOperations !== void 0 && i.push(o.$allOperations), n.concat(i));
        });
    }
    getAllBatchQueryCallbacks() {
        return this.batchCallbacks.get();
    }
}, Nr = class e {
    constructor(r){
        this.head = r;
    }
    static empty() {
        return new e;
    }
    static single(r) {
        return new e(new Ln(r));
    }
    isEmpty() {
        return this.head === void 0;
    }
    append(r) {
        return new e(new Ln(r, this.head));
    }
    getAllComputedFields(r) {
        return this.head?.getAllComputedFields(r);
    }
    getAllClientExtensions() {
        return this.head?.getAllClientExtensions();
    }
    getAllModelExtensions(r) {
        return this.head?.getAllModelExtensions(r);
    }
    getAllQueryCallbacks(r, t) {
        return this.head?.getAllQueryCallbacks(r, t) ?? [];
    }
    getAllBatchQueryCallbacks() {
        return this.head?.getAllBatchQueryCallbacks() ?? [];
    }
};
var Fn = class {
    constructor(r){
        this.name = r;
    }
};
function xa(e) {
    return e instanceof Fn;
}
function va(e) {
    return new Fn(e);
}
var Pa = Symbol(), bt = class {
    constructor(r){
        if (r !== Pa) throw new Error("Skip instance can not be constructed directly");
    }
    ifUndefined(r) {
        return r === void 0 ? Mn : r;
    }
}, Mn = new bt(Pa);
function Se(e) {
    return e instanceof bt;
}
var zd = {
    findUnique: "findUnique",
    findUniqueOrThrow: "findUniqueOrThrow",
    findFirst: "findFirst",
    findFirstOrThrow: "findFirstOrThrow",
    findMany: "findMany",
    count: "aggregate",
    create: "createOne",
    createMany: "createMany",
    createManyAndReturn: "createManyAndReturn",
    update: "updateOne",
    updateMany: "updateMany",
    updateManyAndReturn: "updateManyAndReturn",
    upsert: "upsertOne",
    delete: "deleteOne",
    deleteMany: "deleteMany",
    executeRaw: "executeRaw",
    queryRaw: "queryRaw",
    aggregate: "aggregate",
    groupBy: "groupBy",
    runCommandRaw: "runCommandRaw",
    findRaw: "findRaw",
    aggregateRaw: "aggregateRaw"
}, Ta = "explicitly `undefined` values are not allowed";
function $n({ modelName: e, action: r, args: t, runtimeDataModel: n, extensions: i = Nr.empty(), callsite: o, clientMethod: s, errorFormat: a, clientVersion: l, previewFeatures: u, globalOmit: c }) {
    let p = new Xi({
        runtimeDataModel: n,
        modelName: e,
        action: r,
        rootArgs: t,
        callsite: o,
        extensions: i,
        selectionPath: [],
        argumentPath: [],
        originalMethod: s,
        errorFormat: a,
        clientVersion: l,
        previewFeatures: u,
        globalOmit: c
    });
    return {
        modelName: e,
        action: zd[r],
        query: Et(t, p)
    };
}
function Et({ select: e, include: r, ...t } = {}, n) {
    let i = t.omit;
    return delete t.omit, {
        arguments: Ra(t, n),
        selection: Zd(e, r, i, n)
    };
}
function Zd(e, r, t, n) {
    return e ? (r ? n.throwValidationError({
        kind: "MutuallyExclusiveFields",
        firstField: "include",
        secondField: "select",
        selectionPath: n.getSelectionPath()
    }) : t && n.throwValidationError({
        kind: "MutuallyExclusiveFields",
        firstField: "omit",
        secondField: "select",
        selectionPath: n.getSelectionPath()
    }), tm(e, n)) : Xd(n, r, t);
}
function Xd(e, r, t) {
    let n = {};
    return e.modelOrType && !e.isRawAction() && (n.$composites = !0, n.$scalars = !0), r && em(n, r, e), rm(n, t, e), n;
}
function em(e, r, t) {
    for (let [n, i] of Object.entries(r)){
        if (Se(i)) continue;
        let o = t.nestSelection(n);
        if (eo(i, o), i === !1 || i === void 0) {
            e[n] = !1;
            continue;
        }
        let s = t.findField(n);
        if (s && s.kind !== "object" && t.throwValidationError({
            kind: "IncludeOnScalar",
            selectionPath: t.getSelectionPath().concat(n),
            outputType: t.getOutputTypeDescription()
        }), s) {
            e[n] = Et(i === !0 ? {} : i, o);
            continue;
        }
        if (i === !0) {
            e[n] = !0;
            continue;
        }
        e[n] = Et(i, o);
    }
}
function rm(e, r, t) {
    let n = t.getComputedFields(), i = {
        ...t.getGlobalOmit(),
        ...r
    }, o = wa(i, n);
    for (let [s, a] of Object.entries(o)){
        if (Se(a)) continue;
        eo(a, t.nestSelection(s));
        let l = t.findField(s);
        n?.[s] && !l || (e[s] = !a);
    }
}
function tm(e, r) {
    let t = {}, n = r.getComputedFields(), i = Ea(e, n);
    for (let [o, s] of Object.entries(i)){
        if (Se(s)) continue;
        let a = r.nestSelection(o);
        eo(s, a);
        let l = r.findField(o);
        if (!(n?.[o] && !l)) {
            if (s === !1 || s === void 0 || Se(s)) {
                t[o] = !1;
                continue;
            }
            if (s === !0) {
                l?.kind === "object" ? t[o] = Et({}, a) : t[o] = !0;
                continue;
            }
            t[o] = Et(s, a);
        }
    }
    return t;
}
function Sa(e, r) {
    if (e === null) return null;
    if (typeof e == "string" || typeof e == "number" || typeof e == "boolean") return e;
    if (typeof e == "bigint") return {
        $type: "BigInt",
        value: String(e)
    };
    if (vr(e)) {
        if (mn(e)) return {
            $type: "DateTime",
            value: e.toISOString()
        };
        r.throwValidationError({
            kind: "InvalidArgumentValue",
            selectionPath: r.getSelectionPath(),
            argumentPath: r.getArgumentPath(),
            argument: {
                name: r.getArgumentName(),
                typeNames: [
                    "Date"
                ]
            },
            underlyingError: "Provided Date object is invalid"
        });
    }
    if (xa(e)) return {
        $type: "Param",
        value: e.name
    };
    if (kr(e)) return {
        $type: "FieldRef",
        value: {
            _ref: e.name,
            _container: e.modelName
        }
    };
    if (Array.isArray(e)) return nm(e, r);
    if (ArrayBuffer.isView(e)) {
        let { buffer: t, byteOffset: n, byteLength: i } = e;
        return {
            $type: "Bytes",
            value: Buffer.from(t, n, i).toString("base64")
        };
    }
    if (im(e)) return e.values;
    if (Sr(e)) return {
        $type: "Decimal",
        value: e.toFixed()
    };
    if (e instanceof Me) {
        if (e !== On.instances[e._getName()]) throw new Error("Invalid ObjectEnumValue");
        return {
            $type: "Enum",
            value: e._getName()
        };
    }
    if (om(e)) return e.toJSON();
    if (typeof e == "object") return Ra(e, r);
    r.throwValidationError({
        kind: "InvalidArgumentValue",
        selectionPath: r.getSelectionPath(),
        argumentPath: r.getArgumentPath(),
        argument: {
            name: r.getArgumentName(),
            typeNames: []
        },
        underlyingError: `We could not serialize ${Object.prototype.toString.call(e)} value. Serialize the object to JSON or implement a ".toJSON()" method on it`
    });
}
function Ra(e, r) {
    if (e.$type) return {
        $type: "Raw",
        value: e
    };
    let t = {};
    for(let n in e){
        let i = e[n], o = r.nestArgument(n);
        Se(i) || (i !== void 0 ? t[n] = Sa(i, o) : r.isPreviewFeatureOn("strictUndefinedChecks") && r.throwValidationError({
            kind: "InvalidArgumentValue",
            argumentPath: o.getArgumentPath(),
            selectionPath: r.getSelectionPath(),
            argument: {
                name: r.getArgumentName(),
                typeNames: []
            },
            underlyingError: Ta
        }));
    }
    return t;
}
function nm(e, r) {
    let t = [];
    for(let n = 0; n < e.length; n++){
        let i = r.nestArgument(String(n)), o = e[n];
        if (o === void 0 || Se(o)) {
            let s = o === void 0 ? "undefined" : "Prisma.skip";
            r.throwValidationError({
                kind: "InvalidArgumentValue",
                selectionPath: i.getSelectionPath(),
                argumentPath: i.getArgumentPath(),
                argument: {
                    name: `${r.getArgumentName()}[${n}]`,
                    typeNames: []
                },
                underlyingError: `Can not use \`${s}\` value within array. Use \`null\` or filter out \`${s}\` values`
            });
        }
        t.push(Sa(o, i));
    }
    return t;
}
function im(e) {
    return typeof e == "object" && e !== null && e.__prismaRawParameters__ === !0;
}
function om(e) {
    return typeof e == "object" && e !== null && typeof e.toJSON == "function";
}
function eo(e, r) {
    e === void 0 && r.isPreviewFeatureOn("strictUndefinedChecks") && r.throwValidationError({
        kind: "InvalidSelectionValue",
        selectionPath: r.getSelectionPath(),
        underlyingError: Ta
    });
}
var Xi = class e {
    constructor(r){
        this.params = r;
        this.params.modelName && (this.modelOrType = this.params.runtimeDataModel.models[this.params.modelName] ?? this.params.runtimeDataModel.types[this.params.modelName]);
    }
    modelOrType;
    throwValidationError(r) {
        Nn({
            errors: [
                r
            ],
            originalMethod: this.params.originalMethod,
            args: this.params.rootArgs ?? {},
            callsite: this.params.callsite,
            errorFormat: this.params.errorFormat,
            clientVersion: this.params.clientVersion,
            globalOmit: this.params.globalOmit
        });
    }
    getSelectionPath() {
        return this.params.selectionPath;
    }
    getArgumentPath() {
        return this.params.argumentPath;
    }
    getArgumentName() {
        return this.params.argumentPath[this.params.argumentPath.length - 1];
    }
    getOutputTypeDescription() {
        if (!(!this.params.modelName || !this.modelOrType)) return {
            name: this.params.modelName,
            fields: this.modelOrType.fields.map((r)=>({
                    name: r.name,
                    typeName: "boolean",
                    isRelation: r.kind === "object"
                }))
        };
    }
    isRawAction() {
        return [
            "executeRaw",
            "queryRaw",
            "runCommandRaw",
            "findRaw",
            "aggregateRaw"
        ].includes(this.params.action);
    }
    isPreviewFeatureOn(r) {
        return this.params.previewFeatures.includes(r);
    }
    getComputedFields() {
        if (this.params.modelName) return this.params.extensions.getAllComputedFields(this.params.modelName);
    }
    findField(r) {
        return this.modelOrType?.fields.find((t)=>t.name === r);
    }
    nestSelection(r) {
        let t = this.findField(r), n = t?.kind === "object" ? t.type : void 0;
        return new e({
            ...this.params,
            modelName: n,
            selectionPath: this.params.selectionPath.concat(r)
        });
    }
    getGlobalOmit() {
        return this.params.modelName && this.shouldApplyGlobalOmit() ? this.params.globalOmit?.[We(this.params.modelName)] ?? {} : {};
    }
    shouldApplyGlobalOmit() {
        switch(this.params.action){
            case "findFirst":
            case "findFirstOrThrow":
            case "findUniqueOrThrow":
            case "findMany":
            case "upsert":
            case "findUnique":
            case "createManyAndReturn":
            case "create":
            case "update":
            case "updateManyAndReturn":
            case "delete":
                return !0;
            case "executeRaw":
            case "aggregateRaw":
            case "runCommandRaw":
            case "findRaw":
            case "createMany":
            case "deleteMany":
            case "groupBy":
            case "updateMany":
            case "count":
            case "aggregate":
            case "queryRaw":
                return !1;
            default:
                ar(this.params.action, "Unknown action");
        }
    }
    nestArgument(r) {
        return new e({
            ...this.params,
            argumentPath: this.params.argumentPath.concat(r)
        });
    }
};
function Aa(e) {
    if (!e._hasPreviewFlag("metrics")) throw new Z("`metrics` preview feature must be enabled in order to access metrics API", {
        clientVersion: e._clientVersion
    });
}
var Lr = class {
    _client;
    constructor(r){
        this._client = r;
    }
    prometheus(r) {
        return Aa(this._client), this._client._engine.metrics({
            format: "prometheus",
            ...r
        });
    }
    json(r) {
        return Aa(this._client), this._client._engine.metrics({
            format: "json",
            ...r
        });
    }
};
function Ca(e, r) {
    let t = lt(()=>sm(r));
    Object.defineProperty(e, "dmmf", {
        get: ()=>t.get()
    });
}
function sm(e) {
    return {
        datamodel: {
            models: ro(e.models),
            enums: ro(e.enums),
            types: ro(e.types)
        }
    };
}
function ro(e) {
    return Object.entries(e).map(([r, t])=>({
            name: r,
            ...t
        }));
}
var to = new WeakMap, qn = "$$PrismaTypedSql", wt = class {
    constructor(r, t){
        to.set(this, {
            sql: r,
            values: t
        }), Object.defineProperty(this, qn, {
            value: qn
        });
    }
    get sql() {
        return to.get(this).sql;
    }
    get values() {
        return to.get(this).values;
    }
};
function Ia(e) {
    return (...r)=>new wt(e, r);
}
function Vn(e) {
    return e != null && e[qn] === qn;
}
var cu = O(Ti());
var pu = __turbopack_context__.r("[externals]/node:async_hooks [external] (node:async_hooks, cjs)"), du = __turbopack_context__.r("[externals]/node:events [external] (node:events, cjs)"), mu = O(__turbopack_context__.r("[externals]/node:fs [external] (node:fs, cjs)")), ri = O(__turbopack_context__.r("[externals]/node:path [external] (node:path, cjs)"));
var ie = class e {
    constructor(r, t){
        if (r.length - 1 !== t.length) throw r.length === 0 ? new TypeError("Expected at least 1 string") : new TypeError(`Expected ${r.length} strings to have ${r.length - 1} values`);
        let n = t.reduce((s, a)=>s + (a instanceof e ? a.values.length : 1), 0);
        this.values = new Array(n), this.strings = new Array(n + 1), this.strings[0] = r[0];
        let i = 0, o = 0;
        for(; i < t.length;){
            let s = t[i++], a = r[i];
            if (s instanceof e) {
                this.strings[o] += s.strings[0];
                let l = 0;
                for(; l < s.values.length;)this.values[o++] = s.values[l++], this.strings[o] = s.strings[l];
                this.strings[o] += a;
            } else this.values[o++] = s, this.strings[o] = a;
        }
    }
    get sql() {
        let r = this.strings.length, t = 1, n = this.strings[0];
        for(; t < r;)n += `?${this.strings[t++]}`;
        return n;
    }
    get statement() {
        let r = this.strings.length, t = 1, n = this.strings[0];
        for(; t < r;)n += `:${t}${this.strings[t++]}`;
        return n;
    }
    get text() {
        let r = this.strings.length, t = 1, n = this.strings[0];
        for(; t < r;)n += `$${t}${this.strings[t++]}`;
        return n;
    }
    inspect() {
        return {
            sql: this.sql,
            statement: this.statement,
            text: this.text,
            values: this.values
        };
    }
};
function Da(e, r = ",", t = "", n = "") {
    if (e.length === 0) throw new TypeError("Expected `join([])` to be called with an array of multiple elements, but got an empty array");
    return new ie([
        t,
        ...Array(e.length - 1).fill(r),
        n
    ], e);
}
function no(e) {
    return new ie([
        e
    ], []);
}
var Oa = no("");
function io(e, ...r) {
    return new ie(e, r);
}
function xt(e) {
    return {
        getKeys () {
            return Object.keys(e);
        },
        getPropertyValue (r) {
            return e[r];
        }
    };
}
function re(e, r) {
    return {
        getKeys () {
            return [
                e
            ];
        },
        getPropertyValue () {
            return r();
        }
    };
}
function lr(e) {
    let r = new we;
    return {
        getKeys () {
            return e.getKeys();
        },
        getPropertyValue (t) {
            return r.getOrCreate(t, ()=>e.getPropertyValue(t));
        },
        getPropertyDescriptor (t) {
            return e.getPropertyDescriptor?.(t);
        }
    };
}
var jn = {
    enumerable: !0,
    configurable: !0,
    writable: !0
};
function Bn(e) {
    let r = new Set(e);
    return {
        getPrototypeOf: ()=>Object.prototype,
        getOwnPropertyDescriptor: ()=>jn,
        has: (t, n)=>r.has(n),
        set: (t, n, i)=>r.add(n) && Reflect.set(t, n, i),
        ownKeys: ()=>[
                ...r
            ]
    };
}
var ka = Symbol.for("nodejs.util.inspect.custom");
function he(e, r) {
    let t = am(r), n = new Set, i = new Proxy(e, {
        get (o, s) {
            if (n.has(s)) return o[s];
            let a = t.get(s);
            return a ? a.getPropertyValue(s) : o[s];
        },
        has (o, s) {
            if (n.has(s)) return !0;
            let a = t.get(s);
            return a ? a.has?.(s) ?? !0 : Reflect.has(o, s);
        },
        ownKeys (o) {
            let s = _a(Reflect.ownKeys(o), t), a = _a(Array.from(t.keys()), t);
            return [
                ...new Set([
                    ...s,
                    ...a,
                    ...n
                ])
            ];
        },
        set (o, s, a) {
            return t.get(s)?.getPropertyDescriptor?.(s)?.writable === !1 ? !1 : (n.add(s), Reflect.set(o, s, a));
        },
        getOwnPropertyDescriptor (o, s) {
            let a = Reflect.getOwnPropertyDescriptor(o, s);
            if (a && !a.configurable) return a;
            let l = t.get(s);
            return l ? l.getPropertyDescriptor ? {
                ...jn,
                ...l?.getPropertyDescriptor(s)
            } : jn : a;
        },
        defineProperty (o, s, a) {
            return n.add(s), Reflect.defineProperty(o, s, a);
        },
        getPrototypeOf: ()=>Object.prototype
    });
    return i[ka] = function() {
        let o = {
            ...this
        };
        return delete o[ka], o;
    }, i;
}
function am(e) {
    let r = new Map;
    for (let t of e){
        let n = t.getKeys();
        for (let i of n)r.set(i, t);
    }
    return r;
}
function _a(e, r) {
    return e.filter((t)=>r.get(t)?.has?.(t) ?? !0);
}
function Fr(e) {
    return {
        getKeys () {
            return e;
        },
        has () {
            return !1;
        },
        getPropertyValue () {}
    };
}
function Mr(e, r) {
    return {
        batch: e,
        transaction: r?.kind === "batch" ? {
            isolationLevel: r.options.isolationLevel
        } : void 0
    };
}
function Na(e) {
    if (e === void 0) return "";
    let r = _r(e);
    return new Ar(0, {
        colors: Cn
    }).write(r).toString();
}
var lm = "P2037";
function $r({ error: e, user_facing_error: r }, t, n) {
    return r.error_code ? new z(um(r, n), {
        code: r.error_code,
        clientVersion: t,
        meta: r.meta,
        batchRequestIdx: r.batch_request_idx
    }) : new V(e, {
        clientVersion: t,
        batchRequestIdx: r.batch_request_idx
    });
}
function um(e, r) {
    let t = e.message;
    return (r === "postgresql" || r === "postgres" || r === "mysql") && e.error_code === lm && (t += `
Prisma Accelerate has built-in connection pooling to prevent such errors: https://pris.ly/client/error-accelerate`), t;
}
var vt = "<unknown>";
function La(e) {
    var r = e.split(`
`);
    return r.reduce(function(t, n) {
        var i = dm(n) || fm(n) || ym(n) || xm(n) || Em(n);
        return i && t.push(i), t;
    }, []);
}
var cm = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|rsc|<anonymous>|\/|[a-z]:\\|\\\\).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, pm = /\((\S*)(?::(\d+))(?::(\d+))\)/;
function dm(e) {
    var r = cm.exec(e);
    if (!r) return null;
    var t = r[2] && r[2].indexOf("native") === 0, n = r[2] && r[2].indexOf("eval") === 0, i = pm.exec(r[2]);
    return n && i != null && (r[2] = i[1], r[3] = i[2], r[4] = i[3]), {
        file: t ? null : r[2],
        methodName: r[1] || vt,
        arguments: t ? [
            r[2]
        ] : [],
        lineNumber: r[3] ? +r[3] : null,
        column: r[4] ? +r[4] : null
    };
}
var mm = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|rsc|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
function fm(e) {
    var r = mm.exec(e);
    return r ? {
        file: r[2],
        methodName: r[1] || vt,
        arguments: [],
        lineNumber: +r[3],
        column: r[4] ? +r[4] : null
    } : null;
}
var gm = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|rsc|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i, hm = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
function ym(e) {
    var r = gm.exec(e);
    if (!r) return null;
    var t = r[3] && r[3].indexOf(" > eval") > -1, n = hm.exec(r[3]);
    return t && n != null && (r[3] = n[1], r[4] = n[2], r[5] = null), {
        file: r[3],
        methodName: r[1] || vt,
        arguments: r[2] ? r[2].split(",") : [],
        lineNumber: r[4] ? +r[4] : null,
        column: r[5] ? +r[5] : null
    };
}
var bm = /^\s*(?:([^@]*)(?:\((.*?)\))?@)?(\S.*?):(\d+)(?::(\d+))?\s*$/i;
function Em(e) {
    var r = bm.exec(e);
    return r ? {
        file: r[3],
        methodName: r[1] || vt,
        arguments: [],
        lineNumber: +r[4],
        column: r[5] ? +r[5] : null
    } : null;
}
var wm = /^\s*at (?:((?:\[object object\])?[^\\/]+(?: \[as \S+\])?) )?\(?(.*?):(\d+)(?::(\d+))?\)?\s*$/i;
function xm(e) {
    var r = wm.exec(e);
    return r ? {
        file: r[2],
        methodName: r[1] || vt,
        arguments: [],
        lineNumber: +r[3],
        column: r[4] ? +r[4] : null
    } : null;
}
var oo = class {
    getLocation() {
        return null;
    }
}, so = class {
    _error;
    constructor(){
        this._error = new Error;
    }
    getLocation() {
        let r = this._error.stack;
        if (!r) return null;
        let n = La(r).find((i)=>{
            if (!i.file) return !1;
            let o = Li(i.file);
            return o !== "<anonymous>" && !o.includes("@prisma") && !o.includes("/packages/client/src/runtime/") && !o.endsWith("/runtime/binary.js") && !o.endsWith("/runtime/library.js") && !o.endsWith("/runtime/edge.js") && !o.endsWith("/runtime/edge-esm.js") && !o.startsWith("internal/") && !i.methodName.includes("new ") && !i.methodName.includes("getCallSite") && !i.methodName.includes("Proxy.") && i.methodName.split(".").length < 4;
        });
        return !n || !n.file ? null : {
            fileName: n.file,
            lineNumber: n.lineNumber,
            columnNumber: n.column
        };
    }
};
function Ze(e) {
    return e === "minimal" ? typeof $EnabledCallSite == "function" && e !== "minimal" ? new $EnabledCallSite : new oo : new so;
}
var Fa = {
    _avg: !0,
    _count: !0,
    _sum: !0,
    _min: !0,
    _max: !0
};
function qr(e = {}) {
    let r = Pm(e);
    return Object.entries(r).reduce((n, [i, o])=>(Fa[i] !== void 0 ? n.select[i] = {
            select: o
        } : n[i] = o, n), {
        select: {}
    });
}
function Pm(e = {}) {
    return typeof e._count == "boolean" ? {
        ...e,
        _count: {
            _all: e._count
        }
    } : e;
}
function Un(e = {}) {
    return (r)=>(typeof e._count == "boolean" && (r._count = r._count._all), r);
}
function Ma(e, r) {
    let t = Un(e);
    return r({
        action: "aggregate",
        unpacker: t,
        argsMapper: qr
    })(e);
}
function Tm(e = {}) {
    let { select: r, ...t } = e;
    return typeof r == "object" ? qr({
        ...t,
        _count: r
    }) : qr({
        ...t,
        _count: {
            _all: !0
        }
    });
}
function Sm(e = {}) {
    return typeof e.select == "object" ? (r)=>Un(e)(r)._count : (r)=>Un(e)(r)._count._all;
}
function $a(e, r) {
    return r({
        action: "count",
        unpacker: Sm(e),
        argsMapper: Tm
    })(e);
}
function Rm(e = {}) {
    let r = qr(e);
    if (Array.isArray(r.by)) for (let t of r.by)typeof t == "string" && (r.select[t] = !0);
    else typeof r.by == "string" && (r.select[r.by] = !0);
    return r;
}
function Am(e = {}) {
    return (r)=>(typeof e?._count == "boolean" && r.forEach((t)=>{
            t._count = t._count._all;
        }), r);
}
function qa(e, r) {
    return r({
        action: "groupBy",
        unpacker: Am(e),
        argsMapper: Rm
    })(e);
}
function Va(e, r, t) {
    if (r === "aggregate") return (n)=>Ma(n, t);
    if (r === "count") return (n)=>$a(n, t);
    if (r === "groupBy") return (n)=>qa(n, t);
}
function ja(e, r) {
    let t = r.fields.filter((i)=>!i.relationName), n = _s(t, "name");
    return new Proxy({}, {
        get (i, o) {
            if (o in i || typeof o == "symbol") return i[o];
            let s = n[o];
            if (s) return new mt(e, o, s.type, s.isList, s.kind === "enum");
        },
        ...Bn(Object.keys(n))
    });
}
var Ba = (e)=>Array.isArray(e) ? e : e.split("."), ao = (e, r)=>Ba(r).reduce((t, n)=>t && t[n], e), Ua = (e, r, t)=>Ba(r).reduceRight((n, i, o, s)=>Object.assign({}, ao(e, s.slice(0, o)), {
            [i]: n
        }), t);
function Cm(e, r) {
    return e === void 0 || r === void 0 ? [] : [
        ...r,
        "select",
        e
    ];
}
function Im(e, r, t) {
    return r === void 0 ? e ?? {} : Ua(r, t, e || !0);
}
function lo(e, r, t, n, i, o) {
    let a = e._runtimeDataModel.models[r].fields.reduce((l, u)=>({
            ...l,
            [u.name]: u
        }), {});
    return (l)=>{
        let u = Ze(e._errorFormat), c = Cm(n, i), p = Im(l, o, c), d = t({
            dataPath: c,
            callsite: u
        })(p), f = Dm(e, r);
        return new Proxy(d, {
            get (h, g) {
                if (!f.includes(g)) return h[g];
                let T = [
                    a[g].type,
                    t,
                    g
                ], S = [
                    c,
                    p
                ];
                return lo(e, ...T, ...S);
            },
            ...Bn([
                ...f,
                ...Object.getOwnPropertyNames(d)
            ])
        });
    };
}
function Dm(e, r) {
    return e._runtimeDataModel.models[r].fields.filter((t)=>t.kind === "object").map((t)=>t.name);
}
var Om = [
    "findUnique",
    "findUniqueOrThrow",
    "findFirst",
    "findFirstOrThrow",
    "create",
    "update",
    "upsert",
    "delete"
], km = [
    "aggregate",
    "count",
    "groupBy"
];
function uo(e, r) {
    let t = e._extensions.getAllModelExtensions(r) ?? {}, n = [
        _m(e, r),
        Lm(e, r),
        xt(t),
        re("name", ()=>r),
        re("$name", ()=>r),
        re("$parent", ()=>e._appliedParent)
    ];
    return he({}, n);
}
function _m(e, r) {
    let t = Te(r), n = Object.keys(Rr).concat("count");
    return {
        getKeys () {
            return n;
        },
        getPropertyValue (i) {
            let o = i, s = (a)=>(l)=>{
                    let u = Ze(e._errorFormat);
                    return e._createPrismaPromise((c)=>{
                        let p = {
                            args: l,
                            dataPath: [],
                            action: o,
                            model: r,
                            clientMethod: `${t}.${i}`,
                            jsModelName: t,
                            transaction: c,
                            callsite: u
                        };
                        return e._request({
                            ...p,
                            ...a
                        });
                    }, {
                        action: o,
                        args: l,
                        model: r
                    });
                };
            return Om.includes(o) ? lo(e, r, s) : Nm(i) ? Va(e, i, s) : s({});
        }
    };
}
function Nm(e) {
    return km.includes(e);
}
function Lm(e, r) {
    return lr(re("fields", ()=>{
        let t = e._runtimeDataModel.models[r];
        return ja(r, t);
    }));
}
function Ga(e) {
    return e.replace(/^./, (r)=>r.toUpperCase());
}
var co = Symbol();
function Pt(e) {
    let r = [
        Fm(e),
        Mm(e),
        re(co, ()=>e),
        re("$parent", ()=>e._appliedParent)
    ], t = e._extensions.getAllClientExtensions();
    return t && r.push(xt(t)), he(e, r);
}
function Fm(e) {
    let r = Object.getPrototypeOf(e._originalClient), t = [
        ...new Set(Object.getOwnPropertyNames(r))
    ];
    return {
        getKeys () {
            return t;
        },
        getPropertyValue (n) {
            return e[n];
        }
    };
}
function Mm(e) {
    let r = Object.keys(e._runtimeDataModel.models), t = r.map(Te), n = [
        ...new Set(r.concat(t))
    ];
    return lr({
        getKeys () {
            return n;
        },
        getPropertyValue (i) {
            let o = Ga(i);
            if (e._runtimeDataModel.models[o] !== void 0) return uo(e, o);
            if (e._runtimeDataModel.models[i] !== void 0) return uo(e, i);
        },
        getPropertyDescriptor (i) {
            if (!t.includes(i)) return {
                enumerable: !1
            };
        }
    });
}
function Qa(e) {
    return e[co] ? e[co] : e;
}
function Wa(e) {
    if (typeof e == "function") return e(this);
    if (e.client?.__AccelerateEngine) {
        let t = e.client.__AccelerateEngine;
        this._originalClient._engine = new t(this._originalClient._accelerateEngineConfig);
    }
    let r = Object.create(this._originalClient, {
        _extensions: {
            value: this._extensions.append(e)
        },
        _appliedParent: {
            value: this,
            configurable: !0
        },
        $on: {
            value: void 0
        }
    });
    return Pt(r);
}
function Ja({ result: e, modelName: r, select: t, omit: n, extensions: i }) {
    let o = i.getAllComputedFields(r);
    if (!o) return e;
    let s = [], a = [];
    for (let l of Object.values(o)){
        if (n) {
            if (n[l.name]) continue;
            let u = l.needs.filter((c)=>n[c]);
            u.length > 0 && a.push(Fr(u));
        } else if (t) {
            if (!t[l.name]) continue;
            let u = l.needs.filter((c)=>!t[c]);
            u.length > 0 && a.push(Fr(u));
        }
        $m(e, l.needs) && s.push(qm(l, he(e, s)));
    }
    return s.length > 0 || a.length > 0 ? he(e, [
        ...s,
        ...a
    ]) : e;
}
function $m(e, r) {
    return r.every((t)=>Vi(e, t));
}
function qm(e, r) {
    return lr(re(e.name, ()=>e.compute(r)));
}
function Gn({ visitor: e, result: r, args: t, runtimeDataModel: n, modelName: i }) {
    if (Array.isArray(r)) {
        for(let s = 0; s < r.length; s++)r[s] = Gn({
            result: r[s],
            args: t,
            modelName: i,
            runtimeDataModel: n,
            visitor: e
        });
        return r;
    }
    let o = e(r, i, t) ?? r;
    return t.include && Ka({
        includeOrSelect: t.include,
        result: o,
        parentModelName: i,
        runtimeDataModel: n,
        visitor: e
    }), t.select && Ka({
        includeOrSelect: t.select,
        result: o,
        parentModelName: i,
        runtimeDataModel: n,
        visitor: e
    }), o;
}
function Ka({ includeOrSelect: e, result: r, parentModelName: t, runtimeDataModel: n, visitor: i }) {
    for (let [o, s] of Object.entries(e)){
        if (!s || r[o] == null || Se(s)) continue;
        let l = n.models[t].fields.find((c)=>c.name === o);
        if (!l || l.kind !== "object" || !l.relationName) continue;
        let u = typeof s == "object" ? s : {};
        r[o] = Gn({
            visitor: i,
            result: r[o],
            args: u,
            modelName: l.type,
            runtimeDataModel: n
        });
    }
}
function Ha({ result: e, modelName: r, args: t, extensions: n, runtimeDataModel: i, globalOmit: o }) {
    return n.isEmpty() || e == null || typeof e != "object" || !i.models[r] ? e : Gn({
        result: e,
        args: t ?? {},
        modelName: r,
        runtimeDataModel: i,
        visitor: (a, l, u)=>{
            let c = Te(l);
            return Ja({
                result: a,
                modelName: c,
                select: u.select,
                omit: u.select ? void 0 : {
                    ...o?.[c],
                    ...u.omit
                },
                extensions: n
            });
        }
    });
}
var Vm = [
    "$connect",
    "$disconnect",
    "$on",
    "$transaction",
    "$extends"
], Ya = Vm;
function za(e) {
    if (e instanceof ie) return jm(e);
    if (Vn(e)) return Bm(e);
    if (Array.isArray(e)) {
        let t = [
            e[0]
        ];
        for(let n = 1; n < e.length; n++)t[n] = Tt(e[n]);
        return t;
    }
    let r = {};
    for(let t in e)r[t] = Tt(e[t]);
    return r;
}
function jm(e) {
    return new ie(e.strings, e.values);
}
function Bm(e) {
    return new wt(e.sql, e.values);
}
function Tt(e) {
    if (typeof e != "object" || e == null || e instanceof Me || kr(e)) return e;
    if (Sr(e)) return new Fe(e.toFixed());
    if (vr(e)) return new Date(+e);
    if (ArrayBuffer.isView(e)) return e.slice(0);
    if (Array.isArray(e)) {
        let r = e.length, t;
        for(t = Array(r); r--;)t[r] = Tt(e[r]);
        return t;
    }
    if (typeof e == "object") {
        let r = {};
        for(let t in e)t === "__proto__" ? Object.defineProperty(r, t, {
            value: Tt(e[t]),
            configurable: !0,
            enumerable: !0,
            writable: !0
        }) : r[t] = Tt(e[t]);
        return r;
    }
    ar(e, "Unknown value");
}
function Xa(e, r, t, n = 0) {
    return e._createPrismaPromise((i)=>{
        let o = r.customDataProxyFetch;
        return "transaction" in r && i !== void 0 && (r.transaction?.kind === "batch" && r.transaction.lock.then(), r.transaction = i), n === t.length ? e._executeRequest(r) : t[n]({
            model: r.model,
            operation: r.model ? r.action : r.clientMethod,
            args: za(r.args ?? {}),
            __internalParams: r,
            query: (s, a = r)=>{
                let l = a.customDataProxyFetch;
                return a.customDataProxyFetch = nl(o, l), a.args = s, Xa(e, a, t, n + 1);
            }
        });
    });
}
function el(e, r) {
    let { jsModelName: t, action: n, clientMethod: i } = r, o = t ? n : i;
    if (e._extensions.isEmpty()) return e._executeRequest(r);
    let s = e._extensions.getAllQueryCallbacks(t ?? "$none", o);
    return Xa(e, r, s);
}
function rl(e) {
    return (r)=>{
        let t = {
            requests: r
        }, n = r[0].extensions.getAllBatchQueryCallbacks();
        return n.length ? tl(t, n, 0, e) : e(t);
    };
}
function tl(e, r, t, n) {
    if (t === r.length) return n(e);
    let i = e.customDataProxyFetch, o = e.requests[0].transaction;
    return r[t]({
        args: {
            queries: e.requests.map((s)=>({
                    model: s.modelName,
                    operation: s.action,
                    args: s.args
                })),
            transaction: o ? {
                isolationLevel: o.kind === "batch" ? o.isolationLevel : void 0
            } : void 0
        },
        __internalParams: e,
        query (s, a = e) {
            let l = a.customDataProxyFetch;
            return a.customDataProxyFetch = nl(i, l), tl(a, r, t + 1, n);
        }
    });
}
var Za = (e)=>e;
function nl(e = Za, r = Za) {
    return (t)=>e(r(t));
}
var il = N("prisma:client"), ol = {
    Vercel: "vercel",
    "Netlify CI": "netlify"
};
function sl({ postinstall: e, ciName: r, clientVersion: t, generator: n }) {
    if (il("checkPlatformCaching:postinstall", e), il("checkPlatformCaching:ciName", r), e === !0 && !(n?.output && typeof (n.output.fromEnvVar ?? n.output.value) == "string") && r && r in ol) {
        let i = `Prisma has detected that this project was built on ${r}, which caches dependencies. This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered. To fix this, make sure to run the \`prisma generate\` command during the build process.

Learn how: https://pris.ly/d/${ol[r]}-build`;
        throw console.error(i), new P(i, t);
    }
}
function al(e, r) {
    return e ? e.datasources ? e.datasources : e.datasourceUrl ? {
        [r[0]]: {
            url: e.datasourceUrl
        }
    } : {} : {};
}
var dl = O(__turbopack_context__.r("[externals]/node:fs [external] (node:fs, cjs)")), St = O(__turbopack_context__.r("[externals]/node:path [external] (node:path, cjs)"));
function Qn(e) {
    let { runtimeBinaryTarget: r } = e;
    return `Add "${r}" to \`binaryTargets\` in the "schema.prisma" file and run \`prisma generate\` after saving it:

${Um(e)}`;
}
function Um(e) {
    let { generator: r, generatorBinaryTargets: t, runtimeBinaryTarget: n } = e, i = {
        fromEnvVar: null,
        value: n
    }, o = [
        ...t,
        i
    ];
    return ki({
        ...r,
        binaryTargets: o
    });
}
function Xe(e) {
    let { runtimeBinaryTarget: r } = e;
    return `Prisma Client could not locate the Query Engine for runtime "${r}".`;
}
function er(e) {
    let { searchedLocations: r } = e;
    return `The following locations have been searched:
${[
        ...new Set(r)
    ].map((i)=>`  ${i}`).join(`
`)}`;
}
function ll(e) {
    let { runtimeBinaryTarget: r } = e;
    return `${Xe(e)}

This happened because \`binaryTargets\` have been pinned, but the actual deployment also required "${r}".
${Qn(e)}

${er(e)}`;
}
function Wn(e) {
    return `We would appreciate if you could take the time to share some information with us.
Please help us by answering a few questions: https://pris.ly/${e}`;
}
function Jn(e) {
    let { errorStack: r } = e;
    return r?.match(/\/\.next|\/next@|\/next\//) ? `

We detected that you are using Next.js, learn how to fix this: https://pris.ly/d/engine-not-found-nextjs.` : "";
}
function ul(e) {
    let { queryEngineName: r } = e;
    return `${Xe(e)}${Jn(e)}

This is likely caused by a bundler that has not copied "${r}" next to the resulting bundle.
Ensure that "${r}" has been copied next to the bundle or in "${e.expectedLocation}".

${Wn("engine-not-found-bundler-investigation")}

${er(e)}`;
}
function cl(e) {
    let { runtimeBinaryTarget: r, generatorBinaryTargets: t } = e, n = t.find((i)=>i.native);
    return `${Xe(e)}

This happened because Prisma Client was generated for "${n?.value ?? "unknown"}", but the actual deployment required "${r}".
${Qn(e)}

${er(e)}`;
}
function pl(e) {
    let { queryEngineName: r } = e;
    return `${Xe(e)}${Jn(e)}

This is likely caused by tooling that has not copied "${r}" to the deployment folder.
Ensure that you ran \`prisma generate\` and that "${r}" has been copied to "${e.expectedLocation}".

${Wn("engine-not-found-tooling-investigation")}

${er(e)}`;
}
var Gm = N("prisma:client:engines:resolveEnginePath"), Qm = ()=>new RegExp("runtime[\\\\/]library\\.m?js$");
async function ml(e, r) {
    let t = {
        binary: process.env.PRISMA_QUERY_ENGINE_BINARY,
        library: process.env.PRISMA_QUERY_ENGINE_LIBRARY
    }[e] ?? r.prismaPath;
    if (t !== void 0) return t;
    let { enginePath: n, searchedLocations: i } = await Wm(e, r);
    if (Gm("enginePath", n), n !== void 0 && e === "binary" && Ri(n), n !== void 0) return r.prismaPath = n;
    let o = await ir(), s = r.generator?.binaryTargets ?? [], a = s.some((d)=>d.native), l = !s.some((d)=>d.value === o), u = ("TURBOPACK compile-time value", "/ROOT/generated/prisma/runtime/library.js").match(Qm()) === null, c = {
        searchedLocations: i,
        generatorBinaryTargets: s,
        generator: r.generator,
        runtimeBinaryTarget: o,
        queryEngineName: fl(e, o),
        expectedLocation: St.default.relative(process.cwd(), r.dirname),
        errorStack: new Error().stack
    }, p;
    throw a && l ? p = cl(c) : l ? p = ll(c) : u ? p = ul(c) : p = pl(c), new P(p, r.clientVersion);
}
async function Wm(e, r) {
    let t = await ir(), n = [], i = [
        r.dirname,
        St.default.resolve(("TURBOPACK compile-time value", "/ROOT/generated/prisma/runtime"), ".."),
        r.generator?.output?.value ?? ("TURBOPACK compile-time value", "/ROOT/generated/prisma/runtime"),
        St.default.resolve(("TURBOPACK compile-time value", "/ROOT/generated/prisma/runtime"), "../../../.prisma/client"),
        "/tmp/prisma-engines",
        r.cwd
    ];
    ("TURBOPACK compile-time value", "/ROOT/generated/prisma/runtime/library.js").includes("resolveEnginePath") && i.push(ms());
    for (let o of i){
        let s = fl(e, t), a = St.default.join(o, s);
        if (n.push(o), dl.default.existsSync(a)) return {
            enginePath: a,
            searchedLocations: n
        };
    }
    return {
        enginePath: void 0,
        searchedLocations: n
    };
}
function fl(e, r) {
    return e === "library" ? Gt(r, "fs") : `query-engine-${r}${r === "windows" ? ".exe" : ""}`;
}
function gl(e) {
    return e ? e.replace(/".*"/g, '"X"').replace(/[\s:\[]([+-]?([0-9]*[.])?[0-9]+)/g, (r)=>`${r[0]}5`) : "";
}
function hl(e) {
    return e.split(`
`).map((r)=>r.replace(/^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)\s*/, "").replace(/\+\d+\s*ms$/, "")).join(`
`);
}
var yl = O(Os());
function bl({ title: e, user: r = "prisma", repo: t = "prisma", template: n = "bug_report.yml", body: i }) {
    return (0, yl.default)({
        user: r,
        repo: t,
        template: n,
        title: e,
        body: i
    });
}
function El({ version: e, binaryTarget: r, title: t, description: n, engineVersion: i, database: o, query: s }) {
    let a = Bo(6e3 - (s?.length ?? 0)), l = hl(wr(a)), u = n ? `# Description
\`\`\`
${n}
\`\`\`` : "", c = wr(`Hi Prisma Team! My Prisma Client just crashed. This is the report:
## Versions

| Name            | Version            |
|-----------------|--------------------|
| Node            | ${process.version?.padEnd(19)}| 
| OS              | ${r?.padEnd(19)}|
| Prisma Client   | ${e?.padEnd(19)}|
| Query Engine    | ${i?.padEnd(19)}|
| Database        | ${o?.padEnd(19)}|

${u}

## Logs
\`\`\`
${l}
\`\`\`

## Client Snippet
\`\`\`ts
// PLEASE FILL YOUR CODE SNIPPET HERE
\`\`\`

## Schema
\`\`\`prisma
// PLEASE ADD YOUR SCHEMA HERE IF POSSIBLE
\`\`\`

## Prisma Engine Query
\`\`\`
${s ? gl(s) : ""}
\`\`\`
`), p = bl({
        title: t,
        body: c
    });
    return `${t}

This is a non-recoverable error which probably happens when the Prisma Query Engine has a panic.

${Y(p)}

If you want the Prisma team to look into it, please open the link above \u{1F64F}
To increase the chance of success, please post your schema and a snippet of
how you used Prisma Client in the issue. 
`;
}
function wl(e, r) {
    throw new Error(r);
}
function Jm(e) {
    return e !== null && typeof e == "object" && typeof e.$type == "string";
}
function Km(e, r) {
    let t = {};
    for (let n of Object.keys(e))t[n] = r(e[n], n);
    return t;
}
function Vr(e) {
    return e === null ? e : Array.isArray(e) ? e.map(Vr) : typeof e == "object" ? Jm(e) ? Hm(e) : e.constructor !== null && e.constructor.name !== "Object" ? e : Km(e, Vr) : e;
}
function Hm({ $type: e, value: r }) {
    switch(e){
        case "BigInt":
            return BigInt(r);
        case "Bytes":
            {
                let { buffer: t, byteOffset: n, byteLength: i } = Buffer.from(r, "base64");
                return new Uint8Array(t, n, i);
            }
        case "DateTime":
            return new Date(r);
        case "Decimal":
            return new Le(r);
        case "Json":
            return JSON.parse(r);
        default:
            wl(r, "Unknown tagged value");
    }
}
var xl = "6.19.0";
var zm = ()=>globalThis.process?.release?.name === "node", Zm = ()=>!!globalThis.Bun || !!globalThis.process?.versions?.bun, Xm = ()=>!!globalThis.Deno, ef = ()=>typeof globalThis.Netlify == "object", rf = ()=>typeof globalThis.EdgeRuntime == "object", tf = ()=>globalThis.navigator?.userAgent === "Cloudflare-Workers";
function nf() {
    return [
        [
            ef,
            "netlify"
        ],
        [
            rf,
            "edge-light"
        ],
        [
            tf,
            "workerd"
        ],
        [
            Xm,
            "deno"
        ],
        [
            Zm,
            "bun"
        ],
        [
            zm,
            "node"
        ]
    ].flatMap((t)=>t[0]() ? [
            t[1]
        ] : []).at(0) ?? "";
}
var of = {
    node: "Node.js",
    workerd: "Cloudflare Workers",
    deno: "Deno and Deno Deploy",
    netlify: "Netlify Edge Functions",
    "edge-light": "Edge Runtime (Vercel Edge Functions, Vercel Edge Middleware, Next.js (Pages Router) Edge API Routes, Next.js (App Router) Edge Route Handlers or Next.js Middleware)"
};
function Kn() {
    let e = nf();
    return {
        id: e,
        prettyName: of[e] || e,
        isEdge: [
            "workerd",
            "deno",
            "netlify",
            "edge-light"
        ].includes(e)
    };
}
function jr({ inlineDatasources: e, overrideDatasources: r, env: t, clientVersion: n }) {
    let i, o = Object.keys(e)[0], s = e[o]?.url, a = r[o]?.url;
    if (o === void 0 ? i = void 0 : a ? i = a : s?.value ? i = s.value : s?.fromEnvVar && (i = t[s.fromEnvVar]), s?.fromEnvVar !== void 0 && i === void 0) throw new P(`error: Environment variable not found: ${s.fromEnvVar}.`, n);
    if (i === void 0) throw new P("error: Missing URL environment variable, value, or override.", n);
    return i;
}
var Hn = class extends Error {
    clientVersion;
    cause;
    constructor(r, t){
        super(r), this.clientVersion = t.clientVersion, this.cause = t.cause;
    }
    get [Symbol.toStringTag]() {
        return this.name;
    }
};
var oe = class extends Hn {
    isRetryable;
    constructor(r, t){
        super(r, t), this.isRetryable = t.isRetryable ?? !0;
    }
};
function R(e, r) {
    return {
        ...e,
        isRetryable: r
    };
}
var ur = class extends oe {
    name = "InvalidDatasourceError";
    code = "P6001";
    constructor(r, t){
        super(r, R(t, !1));
    }
};
x(ur, "InvalidDatasourceError");
function vl(e) {
    let r = {
        clientVersion: e.clientVersion
    }, t = Object.keys(e.inlineDatasources)[0], n = jr({
        inlineDatasources: e.inlineDatasources,
        overrideDatasources: e.overrideDatasources,
        clientVersion: e.clientVersion,
        env: {
            ...e.env,
            ...typeof process < "u" ? process.env : {}
        }
    }), i;
    try {
        i = new URL(n);
    } catch  {
        throw new ur(`Error validating datasource \`${t}\`: the URL must start with the protocol \`prisma://\``, r);
    }
    let { protocol: o, searchParams: s } = i;
    if (o !== "prisma:" && o !== sn) throw new ur(`Error validating datasource \`${t}\`: the URL must start with the protocol \`prisma://\` or \`prisma+postgres://\``, r);
    let a = s.get("api_key");
    if (a === null || a.length < 1) throw new ur(`Error validating datasource \`${t}\`: the URL must contain a valid API key`, r);
    let l = Ii(i) ? "http:" : "https:";
    process.env.TEST_CLIENT_ENGINE_REMOTE_EXECUTOR && i.searchParams.has("use_http") && (l = "http:");
    let u = new URL(i.href.replace(o, l));
    return {
        apiKey: a,
        url: u
    };
}
var Pl = O(on()), Yn = class {
    apiKey;
    tracingHelper;
    logLevel;
    logQueries;
    engineHash;
    constructor({ apiKey: r, tracingHelper: t, logLevel: n, logQueries: i, engineHash: o }){
        this.apiKey = r, this.tracingHelper = t, this.logLevel = n, this.logQueries = i, this.engineHash = o;
    }
    build({ traceparent: r, transactionId: t } = {}) {
        let n = {
            Accept: "application/json",
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
            "Prisma-Engine-Hash": this.engineHash,
            "Prisma-Engine-Version": Pl.enginesVersion
        };
        this.tracingHelper.isEnabled() && (n.traceparent = r ?? this.tracingHelper.getTraceParent()), t && (n["X-Transaction-Id"] = t);
        let i = this.#e();
        return i.length > 0 && (n["X-Capture-Telemetry"] = i.join(", ")), n;
    }
    #e() {
        let r = [];
        return this.tracingHelper.isEnabled() && r.push("tracing"), this.logLevel && r.push(this.logLevel), this.logQueries && r.push("query"), r;
    }
};
function sf(e) {
    return e[0] * 1e3 + e[1] / 1e6;
}
function po(e) {
    return new Date(sf(e));
}
var Br = class extends oe {
    name = "ForcedRetryError";
    code = "P5001";
    constructor(r){
        super("This request must be retried", R(r, !0));
    }
};
x(Br, "ForcedRetryError");
var cr = class extends oe {
    name = "NotImplementedYetError";
    code = "P5004";
    constructor(r, t){
        super(r, R(t, !1));
    }
};
x(cr, "NotImplementedYetError");
var $ = class extends oe {
    response;
    constructor(r, t){
        super(r, t), this.response = t.response;
        let n = this.response.headers.get("prisma-request-id");
        if (n) {
            let i = `(The request id was: ${n})`;
            this.message = this.message + " " + i;
        }
    }
};
var pr = class extends $ {
    name = "SchemaMissingError";
    code = "P5005";
    constructor(r){
        super("Schema needs to be uploaded", R(r, !0));
    }
};
x(pr, "SchemaMissingError");
var mo = "This request could not be understood by the server", Rt = class extends $ {
    name = "BadRequestError";
    code = "P5000";
    constructor(r, t, n){
        super(t || mo, R(r, !1)), n && (this.code = n);
    }
};
x(Rt, "BadRequestError");
var At = class extends $ {
    name = "HealthcheckTimeoutError";
    code = "P5013";
    logs;
    constructor(r, t){
        super("Engine not started: healthcheck timeout", R(r, !0)), this.logs = t;
    }
};
x(At, "HealthcheckTimeoutError");
var Ct = class extends $ {
    name = "EngineStartupError";
    code = "P5014";
    logs;
    constructor(r, t, n){
        super(t, R(r, !0)), this.logs = n;
    }
};
x(Ct, "EngineStartupError");
var It = class extends $ {
    name = "EngineVersionNotSupportedError";
    code = "P5012";
    constructor(r){
        super("Engine version is not supported", R(r, !1));
    }
};
x(It, "EngineVersionNotSupportedError");
var fo = "Request timed out", Dt = class extends $ {
    name = "GatewayTimeoutError";
    code = "P5009";
    constructor(r, t = fo){
        super(t, R(r, !1));
    }
};
x(Dt, "GatewayTimeoutError");
var af = "Interactive transaction error", Ot = class extends $ {
    name = "InteractiveTransactionError";
    code = "P5015";
    constructor(r, t = af){
        super(t, R(r, !1));
    }
};
x(Ot, "InteractiveTransactionError");
var lf = "Request parameters are invalid", kt = class extends $ {
    name = "InvalidRequestError";
    code = "P5011";
    constructor(r, t = lf){
        super(t, R(r, !1));
    }
};
x(kt, "InvalidRequestError");
var go = "Requested resource does not exist", _t = class extends $ {
    name = "NotFoundError";
    code = "P5003";
    constructor(r, t = go){
        super(t, R(r, !1));
    }
};
x(_t, "NotFoundError");
var ho = "Unknown server error", Ur = class extends $ {
    name = "ServerError";
    code = "P5006";
    logs;
    constructor(r, t, n){
        super(t || ho, R(r, !0)), this.logs = n;
    }
};
x(Ur, "ServerError");
var yo = "Unauthorized, check your connection string", Nt = class extends $ {
    name = "UnauthorizedError";
    code = "P5007";
    constructor(r, t = yo){
        super(t, R(r, !1));
    }
};
x(Nt, "UnauthorizedError");
var bo = "Usage exceeded, retry again later", Lt = class extends $ {
    name = "UsageExceededError";
    code = "P5008";
    constructor(r, t = bo){
        super(t, R(r, !0));
    }
};
x(Lt, "UsageExceededError");
async function uf(e) {
    let r;
    try {
        r = await e.text();
    } catch  {
        return {
            type: "EmptyError"
        };
    }
    try {
        let t = JSON.parse(r);
        if (typeof t == "string") switch(t){
            case "InternalDataProxyError":
                return {
                    type: "DataProxyError",
                    body: t
                };
            default:
                return {
                    type: "UnknownTextError",
                    body: t
                };
        }
        if (typeof t == "object" && t !== null) {
            if ("is_panic" in t && "message" in t && "error_code" in t) return {
                type: "QueryEngineError",
                body: t
            };
            if ("EngineNotStarted" in t || "InteractiveTransactionMisrouted" in t || "InvalidRequestError" in t) {
                let n = Object.values(t)[0].reason;
                return typeof n == "string" && ![
                    "SchemaMissing",
                    "EngineVersionNotSupported"
                ].includes(n) ? {
                    type: "UnknownJsonError",
                    body: t
                } : {
                    type: "DataProxyError",
                    body: t
                };
            }
        }
        return {
            type: "UnknownJsonError",
            body: t
        };
    } catch  {
        return r === "" ? {
            type: "EmptyError"
        } : {
            type: "UnknownTextError",
            body: r
        };
    }
}
async function Ft(e, r) {
    if (e.ok) return;
    let t = {
        clientVersion: r,
        response: e
    }, n = await uf(e);
    if (n.type === "QueryEngineError") throw new z(n.body.message, {
        code: n.body.error_code,
        clientVersion: r
    });
    if (n.type === "DataProxyError") {
        if (n.body === "InternalDataProxyError") throw new Ur(t, "Internal Data Proxy error");
        if ("EngineNotStarted" in n.body) {
            if (n.body.EngineNotStarted.reason === "SchemaMissing") return new pr(t);
            if (n.body.EngineNotStarted.reason === "EngineVersionNotSupported") throw new It(t);
            if ("EngineStartupError" in n.body.EngineNotStarted.reason) {
                let { msg: i, logs: o } = n.body.EngineNotStarted.reason.EngineStartupError;
                throw new Ct(t, i, o);
            }
            if ("KnownEngineStartupError" in n.body.EngineNotStarted.reason) {
                let { msg: i, error_code: o } = n.body.EngineNotStarted.reason.KnownEngineStartupError;
                throw new P(i, r, o);
            }
            if ("HealthcheckTimeout" in n.body.EngineNotStarted.reason) {
                let { logs: i } = n.body.EngineNotStarted.reason.HealthcheckTimeout;
                throw new At(t, i);
            }
        }
        if ("InteractiveTransactionMisrouted" in n.body) {
            let i = {
                IDParseError: "Could not parse interactive transaction ID",
                NoQueryEngineFoundError: "Could not find Query Engine for the specified host and transaction ID",
                TransactionStartError: "Could not start interactive transaction"
            };
            throw new Ot(t, i[n.body.InteractiveTransactionMisrouted.reason]);
        }
        if ("InvalidRequestError" in n.body) throw new kt(t, n.body.InvalidRequestError.reason);
    }
    if (e.status === 401 || e.status === 403) throw new Nt(t, Gr(yo, n));
    if (e.status === 404) return new _t(t, Gr(go, n));
    if (e.status === 429) throw new Lt(t, Gr(bo, n));
    if (e.status === 504) throw new Dt(t, Gr(fo, n));
    if (e.status >= 500) throw new Ur(t, Gr(ho, n));
    if (e.status >= 400) throw new Rt(t, Gr(mo, n));
}
function Gr(e, r) {
    return r.type === "EmptyError" ? e : `${e}: ${JSON.stringify(r)}`;
}
function Tl(e) {
    let r = Math.pow(2, e) * 50, t = Math.ceil(Math.random() * r) - Math.ceil(r / 2), n = r + t;
    return new Promise((i)=>setTimeout(()=>i(n), n));
}
var $e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function Sl(e) {
    let r = new TextEncoder().encode(e), t = "", n = r.byteLength, i = n % 3, o = n - i, s, a, l, u, c;
    for(let p = 0; p < o; p = p + 3)c = r[p] << 16 | r[p + 1] << 8 | r[p + 2], s = (c & 16515072) >> 18, a = (c & 258048) >> 12, l = (c & 4032) >> 6, u = c & 63, t += $e[s] + $e[a] + $e[l] + $e[u];
    return i == 1 ? (c = r[o], s = (c & 252) >> 2, a = (c & 3) << 4, t += $e[s] + $e[a] + "==") : i == 2 && (c = r[o] << 8 | r[o + 1], s = (c & 64512) >> 10, a = (c & 1008) >> 4, l = (c & 15) << 2, t += $e[s] + $e[a] + $e[l] + "="), t;
}
function Rl(e) {
    if (!!e.generator?.previewFeatures.some((t)=>t.toLowerCase().includes("metrics"))) throw new P("The `metrics` preview feature is not yet available with Accelerate.\nPlease remove `metrics` from the `previewFeatures` in your schema.\n\nMore information about Accelerate: https://pris.ly/d/accelerate", e.clientVersion);
}
var Al = {
    "@prisma/debug": "workspace:*",
    "@prisma/engines-version": "6.19.0-26.2ba551f319ab1df4bc874a89965d8b3641056773",
    "@prisma/fetch-engine": "workspace:*",
    "@prisma/get-platform": "workspace:*"
};
var Mt = class extends oe {
    name = "RequestError";
    code = "P5010";
    constructor(r, t){
        super(`Cannot fetch data from service:
${r}`, R(t, !0));
    }
};
x(Mt, "RequestError");
async function dr(e, r, t = (n)=>n) {
    let { clientVersion: n, ...i } = r, o = t(fetch);
    try {
        return await o(e, i);
    } catch (s) {
        let a = s.message ?? "Unknown error";
        throw new Mt(a, {
            clientVersion: n,
            cause: s
        });
    }
}
var pf = /^[1-9][0-9]*\.[0-9]+\.[0-9]+$/, Cl = N("prisma:client:dataproxyEngine");
async function df(e, r) {
    let t = Al["@prisma/engines-version"], n = r.clientVersion ?? "unknown";
    if (process.env.PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION || globalThis.PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION) return process.env.PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION || globalThis.PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION;
    if (e.includes("accelerate") && n !== "0.0.0" && n !== "in-memory") return n;
    let [i, o] = n?.split("-") ?? [];
    if (o === void 0 && pf.test(i)) return i;
    if (o !== void 0 || n === "0.0.0" || n === "in-memory") {
        let [s] = t.split("-") ?? [], [a, l, u] = s.split("."), c = mf(`<=${a}.${l}.${u}`), p = await dr(c, {
            clientVersion: n
        });
        if (!p.ok) throw new Error(`Failed to fetch stable Prisma version, unpkg.com status ${p.status} ${p.statusText}, response body: ${await p.text() || "<empty body>"}`);
        let d = await p.text();
        Cl("length of body fetched from unpkg.com", d.length);
        let f;
        try {
            f = JSON.parse(d);
        } catch (h) {
            throw console.error("JSON.parse error: body fetched from unpkg.com: ", d), h;
        }
        return f.version;
    }
    throw new cr("Only `major.minor.patch` versions are supported by Accelerate.", {
        clientVersion: n
    });
}
async function Il(e, r) {
    let t = await df(e, r);
    return Cl("version", t), t;
}
function mf(e) {
    return encodeURI(`https://unpkg.com/prisma@${e}/package.json`);
}
var Dl = 3, $t = N("prisma:client:dataproxyEngine"), qt = class {
    name = "DataProxyEngine";
    inlineSchema;
    inlineSchemaHash;
    inlineDatasources;
    config;
    logEmitter;
    env;
    clientVersion;
    engineHash;
    tracingHelper;
    remoteClientVersion;
    host;
    headerBuilder;
    startPromise;
    protocol;
    constructor(r){
        Rl(r), this.config = r, this.env = r.env, this.inlineSchema = Sl(r.inlineSchema), this.inlineDatasources = r.inlineDatasources, this.inlineSchemaHash = r.inlineSchemaHash, this.clientVersion = r.clientVersion, this.engineHash = r.engineVersion, this.logEmitter = r.logEmitter, this.tracingHelper = r.tracingHelper;
    }
    apiKey() {
        return this.headerBuilder.apiKey;
    }
    version() {
        return this.engineHash;
    }
    async start() {
        this.startPromise !== void 0 && await this.startPromise, this.startPromise = (async ()=>{
            let { apiKey: r, url: t } = this.getURLAndAPIKey();
            this.host = t.host, this.protocol = t.protocol, this.headerBuilder = new Yn({
                apiKey: r,
                tracingHelper: this.tracingHelper,
                logLevel: this.config.logLevel ?? "error",
                logQueries: this.config.logQueries,
                engineHash: this.engineHash
            }), this.remoteClientVersion = await Il(this.host, this.config), $t("host", this.host), $t("protocol", this.protocol);
        })(), await this.startPromise;
    }
    async stop() {}
    propagateResponseExtensions(r) {
        r?.logs?.length && r.logs.forEach((t)=>{
            switch(t.level){
                case "debug":
                case "trace":
                    $t(t);
                    break;
                case "error":
                case "warn":
                case "info":
                    {
                        this.logEmitter.emit(t.level, {
                            timestamp: po(t.timestamp),
                            message: t.attributes.message ?? "",
                            target: t.target ?? "BinaryEngine"
                        });
                        break;
                    }
                case "query":
                    {
                        this.logEmitter.emit("query", {
                            query: t.attributes.query ?? "",
                            timestamp: po(t.timestamp),
                            duration: t.attributes.duration_ms ?? 0,
                            params: t.attributes.params ?? "",
                            target: t.target ?? "BinaryEngine"
                        });
                        break;
                    }
                default:
                    t.level;
            }
        }), r?.traces?.length && this.tracingHelper.dispatchEngineSpans(r.traces);
    }
    onBeforeExit() {
        throw new Error('"beforeExit" hook is not applicable to the remote query engine');
    }
    async url(r) {
        return await this.start(), `${this.protocol}//${this.host}/${this.remoteClientVersion}/${this.inlineSchemaHash}/${r}`;
    }
    async uploadSchema() {
        let r = {
            name: "schemaUpload",
            internal: !0
        };
        return this.tracingHelper.runInChildSpan(r, async ()=>{
            let t = await dr(await this.url("schema"), {
                method: "PUT",
                headers: this.headerBuilder.build(),
                body: this.inlineSchema,
                clientVersion: this.clientVersion
            });
            t.ok || $t("schema response status", t.status);
            let n = await Ft(t, this.clientVersion);
            if (n) throw this.logEmitter.emit("warn", {
                message: `Error while uploading schema: ${n.message}`,
                timestamp: new Date,
                target: ""
            }), n;
            this.logEmitter.emit("info", {
                message: `Schema (re)uploaded (hash: ${this.inlineSchemaHash})`,
                timestamp: new Date,
                target: ""
            });
        });
    }
    request(r, { traceparent: t, interactiveTransaction: n, customDataProxyFetch: i }) {
        return this.requestInternal({
            body: r,
            traceparent: t,
            interactiveTransaction: n,
            customDataProxyFetch: i
        });
    }
    async requestBatch(r, { traceparent: t, transaction: n, customDataProxyFetch: i }) {
        let o = n?.kind === "itx" ? n.options : void 0, s = Mr(r, n);
        return (await this.requestInternal({
            body: s,
            customDataProxyFetch: i,
            interactiveTransaction: o,
            traceparent: t
        })).map((l)=>(l.extensions && this.propagateResponseExtensions(l.extensions), "errors" in l ? this.convertProtocolErrorsToClientError(l.errors) : l));
    }
    requestInternal({ body: r, traceparent: t, customDataProxyFetch: n, interactiveTransaction: i }) {
        return this.withRetry({
            actionGerund: "querying",
            callback: async ({ logHttpCall: o })=>{
                let s = i ? `${i.payload.endpoint}/graphql` : await this.url("graphql");
                o(s);
                let a = await dr(s, {
                    method: "POST",
                    headers: this.headerBuilder.build({
                        traceparent: t,
                        transactionId: i?.id
                    }),
                    body: JSON.stringify(r),
                    clientVersion: this.clientVersion
                }, n);
                a.ok || $t("graphql response status", a.status), await this.handleError(await Ft(a, this.clientVersion));
                let l = await a.json();
                if (l.extensions && this.propagateResponseExtensions(l.extensions), "errors" in l) throw this.convertProtocolErrorsToClientError(l.errors);
                return "batchResult" in l ? l.batchResult : l;
            }
        });
    }
    async transaction(r, t, n) {
        let i = {
            start: "starting",
            commit: "committing",
            rollback: "rolling back"
        };
        return this.withRetry({
            actionGerund: `${i[r]} transaction`,
            callback: async ({ logHttpCall: o })=>{
                if (r === "start") {
                    let s = JSON.stringify({
                        max_wait: n.maxWait,
                        timeout: n.timeout,
                        isolation_level: n.isolationLevel
                    }), a = await this.url("transaction/start");
                    o(a);
                    let l = await dr(a, {
                        method: "POST",
                        headers: this.headerBuilder.build({
                            traceparent: t.traceparent
                        }),
                        body: s,
                        clientVersion: this.clientVersion
                    });
                    await this.handleError(await Ft(l, this.clientVersion));
                    let u = await l.json(), { extensions: c } = u;
                    c && this.propagateResponseExtensions(c);
                    let p = u.id, d = u["data-proxy"].endpoint;
                    return {
                        id: p,
                        payload: {
                            endpoint: d
                        }
                    };
                } else {
                    let s = `${n.payload.endpoint}/${r}`;
                    o(s);
                    let a = await dr(s, {
                        method: "POST",
                        headers: this.headerBuilder.build({
                            traceparent: t.traceparent
                        }),
                        clientVersion: this.clientVersion
                    });
                    await this.handleError(await Ft(a, this.clientVersion));
                    let l = await a.json(), { extensions: u } = l;
                    u && this.propagateResponseExtensions(u);
                    return;
                }
            }
        });
    }
    getURLAndAPIKey() {
        return vl({
            clientVersion: this.clientVersion,
            env: this.env,
            inlineDatasources: this.inlineDatasources,
            overrideDatasources: this.config.overrideDatasources
        });
    }
    metrics() {
        throw new cr("Metrics are not yet supported for Accelerate", {
            clientVersion: this.clientVersion
        });
    }
    async withRetry(r) {
        for(let t = 0;; t++){
            let n = (i)=>{
                this.logEmitter.emit("info", {
                    message: `Calling ${i} (n=${t})`,
                    timestamp: new Date,
                    target: ""
                });
            };
            try {
                return await r.callback({
                    logHttpCall: n
                });
            } catch (i) {
                if (!(i instanceof oe) || !i.isRetryable) throw i;
                if (t >= Dl) throw i instanceof Br ? i.cause : i;
                this.logEmitter.emit("warn", {
                    message: `Attempt ${t + 1}/${Dl} failed for ${r.actionGerund}: ${i.message ?? "(unknown)"}`,
                    timestamp: new Date,
                    target: ""
                });
                let o = await Tl(t);
                this.logEmitter.emit("warn", {
                    message: `Retrying after ${o}ms`,
                    timestamp: new Date,
                    target: ""
                });
            }
        }
    }
    async handleError(r) {
        if (r instanceof pr) throw await this.uploadSchema(), new Br({
            clientVersion: this.clientVersion,
            cause: r
        });
        if (r) throw r;
    }
    convertProtocolErrorsToClientError(r) {
        return r.length === 1 ? $r(r[0], this.config.clientVersion, this.config.activeProvider) : new V(JSON.stringify(r), {
            clientVersion: this.config.clientVersion
        });
    }
    applyPendingMigrations() {
        throw new Error("Method not implemented.");
    }
};
function Ol(e) {
    if (e?.kind === "itx") return e.options.id;
}
var wo = O(__turbopack_context__.r("[externals]/node:os [external] (node:os, cjs)")), kl = O(__turbopack_context__.r("[externals]/node:path [external] (node:path, cjs)"));
var Eo = Symbol("PrismaLibraryEngineCache");
function ff() {
    let e = globalThis;
    return e[Eo] === void 0 && (e[Eo] = {}), e[Eo];
}
function gf(e) {
    let r = ff();
    if (r[e] !== void 0) return r[e];
    let t = kl.default.toNamespacedPath(e), n = {
        exports: {}
    }, i = 0;
    return process.platform !== "win32" && (i = wo.default.constants.dlopen.RTLD_LAZY | wo.default.constants.dlopen.RTLD_DEEPBIND), process.dlopen(n, t, i), r[e] = n.exports, n.exports;
}
var _l = {
    async loadLibrary (e) {
        let r = await fi(), t = await ml("library", e);
        try {
            return e.tracingHelper.runInChildSpan({
                name: "loadLibrary",
                internal: !0
            }, ()=>gf(t));
        } catch (n) {
            let i = Ai({
                e: n,
                platformInfo: r,
                id: t
            });
            throw new P(i, e.clientVersion);
        }
    }
};
var xo, Nl = {
    async loadLibrary (e) {
        let { clientVersion: r, adapter: t, engineWasm: n } = e;
        if (t === void 0) throw new P(`The \`adapter\` option for \`PrismaClient\` is required in this context (${Kn().prettyName})`, r);
        if (n === void 0) throw new P("WASM engine was unexpectedly `undefined`", r);
        xo === void 0 && (xo = (async ()=>{
            let o = await n.getRuntime(), s = await n.getQueryEngineWasmModule();
            if (s == null) throw new P("The loaded wasm module was unexpectedly `undefined` or `null` once loaded", r);
            let a = {
                "./query_engine_bg.js": o
            }, l = new WebAssembly.Instance(s, a), u = l.exports.__wbindgen_start;
            return o.__wbg_set_wasm(l.exports), u(), o.QueryEngine;
        })());
        let i = await xo;
        return {
            debugPanic () {
                return Promise.reject("{}");
            },
            dmmf () {
                return Promise.resolve("{}");
            },
            version () {
                return {
                    commit: "unknown",
                    version: "unknown"
                };
            },
            QueryEngine: i
        };
    }
};
var hf = "P2036", Re = N("prisma:client:libraryEngine");
function yf(e) {
    return e.item_type === "query" && "query" in e;
}
function bf(e) {
    return "level" in e ? e.level === "error" && e.message === "PANIC" : !1;
}
var Ll = [
    ...li,
    "native"
], Ef = 0xffffffffffffffffn, vo = 1n;
function wf() {
    let e = vo++;
    return vo > Ef && (vo = 1n), e;
}
var Qr = class {
    name = "LibraryEngine";
    engine;
    libraryInstantiationPromise;
    libraryStartingPromise;
    libraryStoppingPromise;
    libraryStarted;
    executingQueryPromise;
    config;
    QueryEngineConstructor;
    libraryLoader;
    library;
    logEmitter;
    libQueryEnginePath;
    binaryTarget;
    datasourceOverrides;
    datamodel;
    logQueries;
    logLevel;
    lastQuery;
    loggerRustPanic;
    tracingHelper;
    adapterPromise;
    versionInfo;
    constructor(r, t){
        this.libraryLoader = t ?? _l, r.engineWasm !== void 0 && (this.libraryLoader = t ?? Nl), this.config = r, this.libraryStarted = !1, this.logQueries = r.logQueries ?? !1, this.logLevel = r.logLevel ?? "error", this.logEmitter = r.logEmitter, this.datamodel = r.inlineSchema, this.tracingHelper = r.tracingHelper, r.enableDebugLogs && (this.logLevel = "debug");
        let n = Object.keys(r.overrideDatasources)[0], i = r.overrideDatasources[n]?.url;
        n !== void 0 && i !== void 0 && (this.datasourceOverrides = {
            [n]: i
        }), this.libraryInstantiationPromise = this.instantiateLibrary();
    }
    wrapEngine(r) {
        return {
            applyPendingMigrations: r.applyPendingMigrations?.bind(r),
            commitTransaction: this.withRequestId(r.commitTransaction.bind(r)),
            connect: this.withRequestId(r.connect.bind(r)),
            disconnect: this.withRequestId(r.disconnect.bind(r)),
            metrics: r.metrics?.bind(r),
            query: this.withRequestId(r.query.bind(r)),
            rollbackTransaction: this.withRequestId(r.rollbackTransaction.bind(r)),
            sdlSchema: r.sdlSchema?.bind(r),
            startTransaction: this.withRequestId(r.startTransaction.bind(r)),
            trace: r.trace.bind(r),
            free: r.free?.bind(r)
        };
    }
    withRequestId(r) {
        return async (...t)=>{
            let n = wf().toString();
            try {
                return await r(...t, n);
            } finally{
                if (this.tracingHelper.isEnabled()) {
                    let i = await this.engine?.trace(n);
                    if (i) {
                        let o = JSON.parse(i);
                        this.tracingHelper.dispatchEngineSpans(o.spans);
                    }
                }
            }
        };
    }
    async applyPendingMigrations() {
        throw new Error("Cannot call this method from this type of engine instance");
    }
    async transaction(r, t, n) {
        await this.start();
        let i = await this.adapterPromise, o = JSON.stringify(t), s;
        if (r === "start") {
            let l = JSON.stringify({
                max_wait: n.maxWait,
                timeout: n.timeout,
                isolation_level: n.isolationLevel
            });
            s = await this.engine?.startTransaction(l, o);
        } else r === "commit" ? s = await this.engine?.commitTransaction(n.id, o) : r === "rollback" && (s = await this.engine?.rollbackTransaction(n.id, o));
        let a = this.parseEngineResponse(s);
        if (xf(a)) {
            let l = this.getExternalAdapterError(a, i?.errorRegistry);
            throw l ? l.error : new z(a.message, {
                code: a.error_code,
                clientVersion: this.config.clientVersion,
                meta: a.meta
            });
        } else if (typeof a.message == "string") throw new V(a.message, {
            clientVersion: this.config.clientVersion
        });
        return a;
    }
    async instantiateLibrary() {
        if (Re("internalSetup"), this.libraryInstantiationPromise) return this.libraryInstantiationPromise;
        ai(), this.binaryTarget = await this.getCurrentBinaryTarget(), await this.tracingHelper.runInChildSpan("load_engine", ()=>this.loadEngine()), this.version();
    }
    async getCurrentBinaryTarget() {
        {
            if (this.binaryTarget) return this.binaryTarget;
            let r = await this.tracingHelper.runInChildSpan("detect_platform", ()=>ir());
            if (!Ll.includes(r)) throw new P(`Unknown ${ce("PRISMA_QUERY_ENGINE_LIBRARY")} ${ce(W(r))}. Possible binaryTargets: ${qe(Ll.join(", "))} or a path to the query engine library.
You may have to run ${qe("prisma generate")} for your changes to take effect.`, this.config.clientVersion);
            return r;
        }
    }
    parseEngineResponse(r) {
        if (!r) throw new V("Response from the Engine was empty", {
            clientVersion: this.config.clientVersion
        });
        try {
            return JSON.parse(r);
        } catch  {
            throw new V("Unable to JSON.parse response from engine", {
                clientVersion: this.config.clientVersion
            });
        }
    }
    async loadEngine() {
        if (!this.engine) {
            this.QueryEngineConstructor || (this.library = await this.libraryLoader.loadLibrary(this.config), this.QueryEngineConstructor = this.library.QueryEngine);
            try {
                let r = new WeakRef(this);
                this.adapterPromise || (this.adapterPromise = this.config.adapter?.connect()?.then(tn));
                let t = await this.adapterPromise;
                t && Re("Using driver adapter: %O", t), this.engine = this.wrapEngine(new this.QueryEngineConstructor({
                    datamodel: this.datamodel,
                    env: process.env,
                    logQueries: this.config.logQueries ?? !1,
                    ignoreEnvVarErrors: !0,
                    datasourceOverrides: this.datasourceOverrides ?? {},
                    logLevel: this.logLevel,
                    configDir: this.config.cwd,
                    engineProtocol: "json",
                    enableTracing: this.tracingHelper.isEnabled()
                }, (n)=>{
                    r.deref()?.logger(n);
                }, t));
            } catch (r) {
                let t = r, n = this.parseInitError(t.message);
                throw typeof n == "string" ? t : new P(n.message, this.config.clientVersion, n.error_code);
            }
        }
    }
    logger(r) {
        let t = this.parseEngineResponse(r);
        t && (t.level = t?.level.toLowerCase() ?? "unknown", yf(t) ? this.logEmitter.emit("query", {
            timestamp: new Date,
            query: t.query,
            params: t.params,
            duration: Number(t.duration_ms),
            target: t.module_path
        }) : bf(t) ? this.loggerRustPanic = new ae(Po(this, `${t.message}: ${t.reason} in ${t.file}:${t.line}:${t.column}`), this.config.clientVersion) : this.logEmitter.emit(t.level, {
            timestamp: new Date,
            message: t.message,
            target: t.module_path
        }));
    }
    parseInitError(r) {
        try {
            return JSON.parse(r);
        } catch  {}
        return r;
    }
    parseRequestError(r) {
        try {
            return JSON.parse(r);
        } catch  {}
        return r;
    }
    onBeforeExit() {
        throw new Error('"beforeExit" hook is not applicable to the library engine since Prisma 5.0.0, it is only relevant and implemented for the binary engine. Please add your event listener to the `process` object directly instead.');
    }
    async start() {
        if (this.libraryInstantiationPromise || (this.libraryInstantiationPromise = this.instantiateLibrary()), await this.libraryInstantiationPromise, await this.libraryStoppingPromise, this.libraryStartingPromise) return Re(`library already starting, this.libraryStarted: ${this.libraryStarted}`), this.libraryStartingPromise;
        if (this.libraryStarted) return;
        let r = async ()=>{
            Re("library starting");
            try {
                let t = {
                    traceparent: this.tracingHelper.getTraceParent()
                };
                await this.engine?.connect(JSON.stringify(t)), this.libraryStarted = !0, this.adapterPromise || (this.adapterPromise = this.config.adapter?.connect()?.then(tn)), await this.adapterPromise, Re("library started");
            } catch (t) {
                let n = this.parseInitError(t.message);
                throw typeof n == "string" ? t : new P(n.message, this.config.clientVersion, n.error_code);
            } finally{
                this.libraryStartingPromise = void 0;
            }
        };
        return this.libraryStartingPromise = this.tracingHelper.runInChildSpan("connect", r), this.libraryStartingPromise;
    }
    async stop() {
        if (await this.libraryInstantiationPromise, await this.libraryStartingPromise, await this.executingQueryPromise, this.libraryStoppingPromise) return Re("library is already stopping"), this.libraryStoppingPromise;
        if (!this.libraryStarted) {
            await (await this.adapterPromise)?.dispose(), this.adapterPromise = void 0;
            return;
        }
        let r = async ()=>{
            await new Promise((n)=>setImmediate(n)), Re("library stopping");
            let t = {
                traceparent: this.tracingHelper.getTraceParent()
            };
            await this.engine?.disconnect(JSON.stringify(t)), this.engine?.free && this.engine.free(), this.engine = void 0, this.libraryStarted = !1, this.libraryStoppingPromise = void 0, this.libraryInstantiationPromise = void 0, await (await this.adapterPromise)?.dispose(), this.adapterPromise = void 0, Re("library stopped");
        };
        return this.libraryStoppingPromise = this.tracingHelper.runInChildSpan("disconnect", r), this.libraryStoppingPromise;
    }
    version() {
        return this.versionInfo = this.library?.version(), this.versionInfo?.version ?? "unknown";
    }
    debugPanic(r) {
        return this.library?.debugPanic(r);
    }
    async request(r, { traceparent: t, interactiveTransaction: n }) {
        Re(`sending request, this.libraryStarted: ${this.libraryStarted}`);
        let i = JSON.stringify({
            traceparent: t
        }), o = JSON.stringify(r);
        try {
            await this.start();
            let s = await this.adapterPromise;
            this.executingQueryPromise = this.engine?.query(o, i, n?.id), this.lastQuery = o;
            let a = this.parseEngineResponse(await this.executingQueryPromise);
            if (a.errors) throw a.errors.length === 1 ? this.buildQueryError(a.errors[0], s?.errorRegistry) : new V(JSON.stringify(a.errors), {
                clientVersion: this.config.clientVersion
            });
            if (this.loggerRustPanic) throw this.loggerRustPanic;
            return {
                data: a
            };
        } catch (s) {
            if (s instanceof P) throw s;
            if (s.code === "GenericFailure" && s.message?.startsWith("PANIC:")) throw new ae(Po(this, s.message), this.config.clientVersion);
            let a = this.parseRequestError(s.message);
            throw typeof a == "string" ? s : new V(`${a.message}
${a.backtrace}`, {
                clientVersion: this.config.clientVersion
            });
        }
    }
    async requestBatch(r, { transaction: t, traceparent: n }) {
        Re("requestBatch");
        let i = Mr(r, t);
        await this.start();
        let o = await this.adapterPromise;
        this.lastQuery = JSON.stringify(i), this.executingQueryPromise = this.engine?.query(this.lastQuery, JSON.stringify({
            traceparent: n
        }), Ol(t));
        let s = await this.executingQueryPromise, a = this.parseEngineResponse(s);
        if (a.errors) throw a.errors.length === 1 ? this.buildQueryError(a.errors[0], o?.errorRegistry) : new V(JSON.stringify(a.errors), {
            clientVersion: this.config.clientVersion
        });
        let { batchResult: l, errors: u } = a;
        if (Array.isArray(l)) return l.map((c)=>c.errors && c.errors.length > 0 ? this.loggerRustPanic ?? this.buildQueryError(c.errors[0], o?.errorRegistry) : {
                data: c
            });
        throw u && u.length === 1 ? new Error(u[0].error) : new Error(JSON.stringify(a));
    }
    buildQueryError(r, t) {
        if (r.user_facing_error.is_panic) return new ae(Po(this, r.user_facing_error.message), this.config.clientVersion);
        let n = this.getExternalAdapterError(r.user_facing_error, t);
        return n ? n.error : $r(r, this.config.clientVersion, this.config.activeProvider);
    }
    getExternalAdapterError(r, t) {
        if (r.error_code === hf && t) {
            let n = r.meta?.id;
            ln(typeof n == "number", "Malformed external JS error received from the engine");
            let i = t.consumeError(n);
            return ln(i, "External error with reported id was not registered"), i;
        }
    }
    async metrics(r) {
        await this.start();
        let t = await this.engine.metrics(JSON.stringify(r));
        return r.format === "prometheus" ? t : this.parseEngineResponse(t);
    }
};
function xf(e) {
    return typeof e == "object" && e !== null && e.error_code !== void 0;
}
function Po(e, r) {
    return El({
        binaryTarget: e.binaryTarget,
        title: r,
        version: e.config.clientVersion,
        engineVersion: e.versionInfo?.commit,
        database: e.config.activeProvider,
        query: e.lastQuery
    });
}
function Fl({ url: e, adapter: r, copyEngine: t, targetBuildType: n }) {
    let i = [], o = [], s = (g)=>{
        i.push({
            _tag: "warning",
            value: g
        });
    }, a = (g)=>{
        let I = g.join(`
`);
        o.push({
            _tag: "error",
            value: I
        });
    }, l = !!e?.startsWith("prisma://"), u = an(e), c = !!r, p = l || u;
    !c && t && p && n !== "client" && n !== "wasm-compiler-edge" && s([
        "recommend--no-engine",
        "In production, we recommend using `prisma generate --no-engine` (See: `prisma generate --help`)"
    ]);
    let d = p || !t;
    c && (d || n === "edge") && (n === "edge" ? a([
        "Prisma Client was configured to use the `adapter` option but it was imported via its `/edge` endpoint.",
        "Please either remove the `/edge` endpoint or remove the `adapter` from the Prisma Client constructor."
    ]) : p ? a([
        "You've provided both a driver adapter and an Accelerate database URL. Driver adapters currently cannot connect to Accelerate.",
        "Please provide either a driver adapter with a direct database URL or an Accelerate URL and no driver adapter."
    ]) : t || a([
        "Prisma Client was configured to use the `adapter` option but `prisma generate` was run with `--no-engine`.",
        "Please run `prisma generate` without `--no-engine` to be able to use Prisma Client with the adapter."
    ]));
    let f = {
        accelerate: d,
        ppg: u,
        driverAdapters: c
    };
    function h(g) {
        return g.length > 0;
    }
    return h(o) ? {
        ok: !1,
        diagnostics: {
            warnings: i,
            errors: o
        },
        isUsing: f
    } : {
        ok: !0,
        diagnostics: {
            warnings: i
        },
        isUsing: f
    };
}
function Ml({ copyEngine: e = !0 }, r) {
    let t;
    try {
        t = jr({
            inlineDatasources: r.inlineDatasources,
            overrideDatasources: r.overrideDatasources,
            env: {
                ...r.env,
                ...process.env
            },
            clientVersion: r.clientVersion
        });
    } catch  {}
    let { ok: n, isUsing: i, diagnostics: o } = Fl({
        url: t,
        adapter: r.adapter,
        copyEngine: e,
        targetBuildType: "library"
    });
    for (let p of o.warnings)at(...p.value);
    if (!n) {
        let p = o.errors[0];
        throw new Z(p.value, {
            clientVersion: r.clientVersion
        });
    }
    let s = Er(r.generator), a = s === "library", l = s === "binary", u = s === "client", c = (i.accelerate || i.ppg) && !i.driverAdapters;
    return i.accelerate ? new qt(r) : (i.driverAdapters, a ? new Qr(r) : (i.accelerate, new Qr(r)));
}
function $l({ generator: e }) {
    return e?.previewFeatures ?? [];
}
var ql = (e)=>({
        command: e
    });
var Vl = (e)=>e.strings.reduce((r, t, n)=>`${r}@P${n}${t}`);
function Wr(e) {
    try {
        return jl(e, "fast");
    } catch  {
        return jl(e, "slow");
    }
}
function jl(e, r) {
    return JSON.stringify(e.map((t)=>Ul(t, r)));
}
function Ul(e, r) {
    if (Array.isArray(e)) return e.map((t)=>Ul(t, r));
    if (typeof e == "bigint") return {
        prisma__type: "bigint",
        prisma__value: e.toString()
    };
    if (vr(e)) return {
        prisma__type: "date",
        prisma__value: e.toJSON()
    };
    if (Fe.isDecimal(e)) return {
        prisma__type: "decimal",
        prisma__value: e.toJSON()
    };
    if (Buffer.isBuffer(e)) return {
        prisma__type: "bytes",
        prisma__value: e.toString("base64")
    };
    if (vf(e)) return {
        prisma__type: "bytes",
        prisma__value: Buffer.from(e).toString("base64")
    };
    if (ArrayBuffer.isView(e)) {
        let { buffer: t, byteOffset: n, byteLength: i } = e;
        return {
            prisma__type: "bytes",
            prisma__value: Buffer.from(t, n, i).toString("base64")
        };
    }
    return typeof e == "object" && r === "slow" ? Gl(e) : e;
}
function vf(e) {
    return e instanceof ArrayBuffer || e instanceof SharedArrayBuffer ? !0 : typeof e == "object" && e !== null ? e[Symbol.toStringTag] === "ArrayBuffer" || e[Symbol.toStringTag] === "SharedArrayBuffer" : !1;
}
function Gl(e) {
    if (typeof e != "object" || e === null) return e;
    if (typeof e.toJSON == "function") return e.toJSON();
    if (Array.isArray(e)) return e.map(Bl);
    let r = {};
    for (let t of Object.keys(e))r[t] = Bl(e[t]);
    return r;
}
function Bl(e) {
    return typeof e == "bigint" ? e.toString() : Gl(e);
}
var Pf = /^(\s*alter\s)/i, Ql = N("prisma:client");
function To(e, r, t, n) {
    if (!(e !== "postgresql" && e !== "cockroachdb") && t.length > 0 && Pf.exec(r)) throw new Error(`Running ALTER using ${n} is not supported
Using the example below you can still execute your query with Prisma, but please note that it is vulnerable to SQL injection attacks and requires you to take care of input sanitization.

Example:
  await prisma.$executeRawUnsafe(\`ALTER USER prisma WITH PASSWORD '\${password}'\`)

More Information: https://pris.ly/d/execute-raw
`);
}
var So = ({ clientMethod: e, activeProvider: r })=>(t)=>{
        let n = "", i;
        if (Vn(t)) n = t.sql, i = {
            values: Wr(t.values),
            __prismaRawParameters__: !0
        };
        else if (Array.isArray(t)) {
            let [o, ...s] = t;
            n = o, i = {
                values: Wr(s || []),
                __prismaRawParameters__: !0
            };
        } else switch(r){
            case "sqlite":
            case "mysql":
                {
                    n = t.sql, i = {
                        values: Wr(t.values),
                        __prismaRawParameters__: !0
                    };
                    break;
                }
            case "cockroachdb":
            case "postgresql":
            case "postgres":
                {
                    n = t.text, i = {
                        values: Wr(t.values),
                        __prismaRawParameters__: !0
                    };
                    break;
                }
            case "sqlserver":
                {
                    n = Vl(t), i = {
                        values: Wr(t.values),
                        __prismaRawParameters__: !0
                    };
                    break;
                }
            default:
                throw new Error(`The ${r} provider does not support ${e}`);
        }
        return i?.values ? Ql(`prisma.${e}(${n}, ${i.values})`) : Ql(`prisma.${e}(${n})`), {
            query: n,
            parameters: i
        };
    }, Wl = {
    requestArgsToMiddlewareArgs (e) {
        return [
            e.strings,
            ...e.values
        ];
    },
    middlewareArgsToRequestArgs (e) {
        let [r, ...t] = e;
        return new ie(r, t);
    }
}, Jl = {
    requestArgsToMiddlewareArgs (e) {
        return [
            e
        ];
    },
    middlewareArgsToRequestArgs (e) {
        return e[0];
    }
};
function Ro(e) {
    return function(t, n) {
        let i, o = (s = e)=>{
            try {
                return s === void 0 || s?.kind === "itx" ? i ??= Kl(t(s)) : Kl(t(s));
            } catch (a) {
                return Promise.reject(a);
            }
        };
        return {
            get spec () {
                return n;
            },
            then (s, a) {
                return o().then(s, a);
            },
            catch (s) {
                return o().catch(s);
            },
            finally (s) {
                return o().finally(s);
            },
            requestTransaction (s) {
                let a = o(s);
                return a.requestTransaction ? a.requestTransaction(s) : a;
            },
            [Symbol.toStringTag]: "PrismaPromise"
        };
    };
}
function Kl(e) {
    return typeof e.then == "function" ? e : Promise.resolve(e);
}
var Tf = xi.split(".")[0], Sf = {
    isEnabled () {
        return !1;
    },
    getTraceParent () {
        return "00-10-10-00";
    },
    dispatchEngineSpans () {},
    getActiveContext () {},
    runInChildSpan (e, r) {
        return r();
    }
}, Ao = class {
    isEnabled() {
        return this.getGlobalTracingHelper().isEnabled();
    }
    getTraceParent(r) {
        return this.getGlobalTracingHelper().getTraceParent(r);
    }
    dispatchEngineSpans(r) {
        return this.getGlobalTracingHelper().dispatchEngineSpans(r);
    }
    getActiveContext() {
        return this.getGlobalTracingHelper().getActiveContext();
    }
    runInChildSpan(r, t) {
        return this.getGlobalTracingHelper().runInChildSpan(r, t);
    }
    getGlobalTracingHelper() {
        let r = globalThis[`V${Tf}_PRISMA_INSTRUMENTATION`], t = globalThis.PRISMA_INSTRUMENTATION;
        return r?.helper ?? t?.helper ?? Sf;
    }
};
function Hl() {
    return new Ao;
}
function Yl(e, r = ()=>{}) {
    let t, n = new Promise((i)=>t = i);
    return {
        then (i) {
            return --e === 0 && t(r()), i?.(n);
        }
    };
}
function zl(e) {
    return typeof e == "string" ? e : e.reduce((r, t)=>{
        let n = typeof t == "string" ? t : t.level;
        return n === "query" ? r : r && (t === "info" || r === "info") ? "info" : n;
    }, void 0);
}
function zn(e) {
    return typeof e.batchRequestIdx == "number";
}
function Zl(e) {
    if (e.action !== "findUnique" && e.action !== "findUniqueOrThrow") return;
    let r = [];
    return e.modelName && r.push(e.modelName), e.query.arguments && r.push(Co(e.query.arguments)), r.push(Co(e.query.selection)), r.join("");
}
function Co(e) {
    return `(${Object.keys(e).sort().map((t)=>{
        let n = e[t];
        return typeof n == "object" && n !== null ? `(${t} ${Co(n)})` : t;
    }).join(" ")})`;
}
var Rf = {
    aggregate: !1,
    aggregateRaw: !1,
    createMany: !0,
    createManyAndReturn: !0,
    createOne: !0,
    deleteMany: !0,
    deleteOne: !0,
    executeRaw: !0,
    findFirst: !1,
    findFirstOrThrow: !1,
    findMany: !1,
    findRaw: !1,
    findUnique: !1,
    findUniqueOrThrow: !1,
    groupBy: !1,
    queryRaw: !1,
    runCommandRaw: !0,
    updateMany: !0,
    updateManyAndReturn: !0,
    updateOne: !0,
    upsertOne: !0
};
function Io(e) {
    return Rf[e];
}
var Zn = class {
    constructor(r){
        this.options = r;
        this.batches = {};
    }
    batches;
    tickActive = !1;
    request(r) {
        let t = this.options.batchBy(r);
        return t ? (this.batches[t] || (this.batches[t] = [], this.tickActive || (this.tickActive = !0, process.nextTick(()=>{
            this.dispatchBatches(), this.tickActive = !1;
        }))), new Promise((n, i)=>{
            this.batches[t].push({
                request: r,
                resolve: n,
                reject: i
            });
        })) : this.options.singleLoader(r);
    }
    dispatchBatches() {
        for(let r in this.batches){
            let t = this.batches[r];
            delete this.batches[r], t.length === 1 ? this.options.singleLoader(t[0].request).then((n)=>{
                n instanceof Error ? t[0].reject(n) : t[0].resolve(n);
            }).catch((n)=>{
                t[0].reject(n);
            }) : (t.sort((n, i)=>this.options.batchOrder(n.request, i.request)), this.options.batchLoader(t.map((n)=>n.request)).then((n)=>{
                if (n instanceof Error) for(let i = 0; i < t.length; i++)t[i].reject(n);
                else for(let i = 0; i < t.length; i++){
                    let o = n[i];
                    o instanceof Error ? t[i].reject(o) : t[i].resolve(o);
                }
            }).catch((n)=>{
                for(let i = 0; i < t.length; i++)t[i].reject(n);
            }));
        }
    }
    get [Symbol.toStringTag]() {
        return "DataLoader";
    }
};
function mr(e, r) {
    if (r === null) return r;
    switch(e){
        case "bigint":
            return BigInt(r);
        case "bytes":
            {
                let { buffer: t, byteOffset: n, byteLength: i } = Buffer.from(r, "base64");
                return new Uint8Array(t, n, i);
            }
        case "decimal":
            return new Fe(r);
        case "datetime":
        case "date":
            return new Date(r);
        case "time":
            return new Date(`1970-01-01T${r}Z`);
        case "bigint-array":
            return r.map((t)=>mr("bigint", t));
        case "bytes-array":
            return r.map((t)=>mr("bytes", t));
        case "decimal-array":
            return r.map((t)=>mr("decimal", t));
        case "datetime-array":
            return r.map((t)=>mr("datetime", t));
        case "date-array":
            return r.map((t)=>mr("date", t));
        case "time-array":
            return r.map((t)=>mr("time", t));
        default:
            return r;
    }
}
function Xn(e) {
    let r = [], t = Af(e);
    for(let n = 0; n < e.rows.length; n++){
        let i = e.rows[n], o = {
            ...t
        };
        for(let s = 0; s < i.length; s++)o[e.columns[s]] = mr(e.types[s], i[s]);
        r.push(o);
    }
    return r;
}
function Af(e) {
    let r = {};
    for(let t = 0; t < e.columns.length; t++)r[e.columns[t]] = null;
    return r;
}
var Cf = N("prisma:client:request_handler"), ei = class {
    client;
    dataloader;
    logEmitter;
    constructor(r, t){
        this.logEmitter = t, this.client = r, this.dataloader = new Zn({
            batchLoader: rl(async ({ requests: n, customDataProxyFetch: i })=>{
                let { transaction: o, otelParentCtx: s } = n[0], a = n.map((p)=>p.protocolQuery), l = this.client._tracingHelper.getTraceParent(s), u = n.some((p)=>Io(p.protocolQuery.action));
                return (await this.client._engine.requestBatch(a, {
                    traceparent: l,
                    transaction: If(o),
                    containsWrite: u,
                    customDataProxyFetch: i
                })).map((p, d)=>{
                    if (p instanceof Error) return p;
                    try {
                        return this.mapQueryEngineResult(n[d], p);
                    } catch (f) {
                        return f;
                    }
                });
            }),
            singleLoader: async (n)=>{
                let i = n.transaction?.kind === "itx" ? Xl(n.transaction) : void 0, o = await this.client._engine.request(n.protocolQuery, {
                    traceparent: this.client._tracingHelper.getTraceParent(),
                    interactiveTransaction: i,
                    isWrite: Io(n.protocolQuery.action),
                    customDataProxyFetch: n.customDataProxyFetch
                });
                return this.mapQueryEngineResult(n, o);
            },
            batchBy: (n)=>n.transaction?.id ? `transaction-${n.transaction.id}` : Zl(n.protocolQuery),
            batchOrder (n, i) {
                return n.transaction?.kind === "batch" && i.transaction?.kind === "batch" ? n.transaction.index - i.transaction.index : 0;
            }
        });
    }
    async request(r) {
        try {
            return await this.dataloader.request(r);
        } catch (t) {
            let { clientMethod: n, callsite: i, transaction: o, args: s, modelName: a } = r;
            this.handleAndLogRequestError({
                error: t,
                clientMethod: n,
                callsite: i,
                transaction: o,
                args: s,
                modelName: a,
                globalOmit: r.globalOmit
            });
        }
    }
    mapQueryEngineResult({ dataPath: r, unpacker: t }, n) {
        let i = n?.data, o = this.unpack(i, r, t);
        return process.env.PRISMA_CLIENT_GET_TIME ? {
            data: o
        } : o;
    }
    handleAndLogRequestError(r) {
        try {
            this.handleRequestError(r);
        } catch (t) {
            throw this.logEmitter && this.logEmitter.emit("error", {
                message: t.message,
                target: r.clientMethod,
                timestamp: new Date
            }), t;
        }
    }
    handleRequestError({ error: r, clientMethod: t, callsite: n, transaction: i, args: o, modelName: s, globalOmit: a }) {
        if (Cf(r), Df(r, i)) throw r;
        if (r instanceof z && Of(r)) {
            let u = eu(r.meta);
            Nn({
                args: o,
                errors: [
                    u
                ],
                callsite: n,
                errorFormat: this.client._errorFormat,
                originalMethod: t,
                clientVersion: this.client._clientVersion,
                globalOmit: a
            });
        }
        let l = r.message;
        if (n && (l = Tn({
            callsite: n,
            originalMethod: t,
            isPanic: r.isPanic,
            showColors: this.client._errorFormat === "pretty",
            message: l
        })), l = this.sanitizeMessage(l), r.code) {
            let u = s ? {
                modelName: s,
                ...r.meta
            } : r.meta;
            throw new z(l, {
                code: r.code,
                clientVersion: this.client._clientVersion,
                meta: u,
                batchRequestIdx: r.batchRequestIdx
            });
        } else {
            if (r.isPanic) throw new ae(l, this.client._clientVersion);
            if (r instanceof V) throw new V(l, {
                clientVersion: this.client._clientVersion,
                batchRequestIdx: r.batchRequestIdx
            });
            if (r instanceof P) throw new P(l, this.client._clientVersion);
            if (r instanceof ae) throw new ae(l, this.client._clientVersion);
        }
        throw r.clientVersion = this.client._clientVersion, r;
    }
    sanitizeMessage(r) {
        return this.client._errorFormat && this.client._errorFormat !== "pretty" ? wr(r) : r;
    }
    unpack(r, t, n) {
        if (!r || (r.data && (r = r.data), !r)) return r;
        let i = Object.keys(r)[0], o = Object.values(r)[0], s = t.filter((u)=>u !== "select" && u !== "include"), a = ao(o, s), l = i === "queryRaw" ? Xn(a) : Vr(a);
        return n ? n(l) : l;
    }
    get [Symbol.toStringTag]() {
        return "RequestHandler";
    }
};
function If(e) {
    if (e) {
        if (e.kind === "batch") return {
            kind: "batch",
            options: {
                isolationLevel: e.isolationLevel
            }
        };
        if (e.kind === "itx") return {
            kind: "itx",
            options: Xl(e)
        };
        ar(e, "Unknown transaction kind");
    }
}
function Xl(e) {
    return {
        id: e.id,
        payload: e.payload
    };
}
function Df(e, r) {
    return zn(e) && r?.kind === "batch" && e.batchRequestIdx !== r.index;
}
function Of(e) {
    return e.code === "P2009" || e.code === "P2012";
}
function eu(e) {
    if (e.kind === "Union") return {
        kind: "Union",
        errors: e.errors.map(eu)
    };
    if (Array.isArray(e.selectionPath)) {
        let [, ...r] = e.selectionPath;
        return {
            ...e,
            selectionPath: r
        };
    }
    return e;
}
var ru = xl;
var su = O(Ki());
var _ = class extends Error {
    constructor(r){
        super(r + `
Read more at https://pris.ly/d/client-constructor`), this.name = "PrismaClientConstructorValidationError";
    }
    get [Symbol.toStringTag]() {
        return "PrismaClientConstructorValidationError";
    }
};
x(_, "PrismaClientConstructorValidationError");
var tu = [
    "datasources",
    "datasourceUrl",
    "errorFormat",
    "adapter",
    "log",
    "transactionOptions",
    "omit",
    "__internal"
], nu = [
    "pretty",
    "colorless",
    "minimal"
], iu = [
    "info",
    "query",
    "warn",
    "error"
], kf = {
    datasources: (e, { datasourceNames: r })=>{
        if (e) {
            if (typeof e != "object" || Array.isArray(e)) throw new _(`Invalid value ${JSON.stringify(e)} for "datasources" provided to PrismaClient constructor`);
            for (let [t, n] of Object.entries(e)){
                if (!r.includes(t)) {
                    let i = Jr(t, r) || ` Available datasources: ${r.join(", ")}`;
                    throw new _(`Unknown datasource ${t} provided to PrismaClient constructor.${i}`);
                }
                if (typeof n != "object" || Array.isArray(n)) throw new _(`Invalid value ${JSON.stringify(e)} for datasource "${t}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
                if (n && typeof n == "object") for (let [i, o] of Object.entries(n)){
                    if (i !== "url") throw new _(`Invalid value ${JSON.stringify(e)} for datasource "${t}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
                    if (typeof o != "string") throw new _(`Invalid value ${JSON.stringify(o)} for datasource "${t}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
                }
            }
        }
    },
    adapter: (e, r)=>{
        if (!e && Er(r.generator) === "client") throw new _('Using engine type "client" requires a driver adapter to be provided to PrismaClient constructor.');
        if (e !== null) {
            if (e === void 0) throw new _('"adapter" property must not be undefined, use null to conditionally disable driver adapters.');
            if (Er(r.generator) === "binary") throw new _('Cannot use a driver adapter with the "binary" Query Engine. Please use the "library" Query Engine.');
        }
    },
    datasourceUrl: (e)=>{
        if (typeof e < "u" && typeof e != "string") throw new _(`Invalid value ${JSON.stringify(e)} for "datasourceUrl" provided to PrismaClient constructor.
Expected string or undefined.`);
    },
    errorFormat: (e)=>{
        if (e) {
            if (typeof e != "string") throw new _(`Invalid value ${JSON.stringify(e)} for "errorFormat" provided to PrismaClient constructor.`);
            if (!nu.includes(e)) {
                let r = Jr(e, nu);
                throw new _(`Invalid errorFormat ${e} provided to PrismaClient constructor.${r}`);
            }
        }
    },
    log: (e)=>{
        if (!e) return;
        if (!Array.isArray(e)) throw new _(`Invalid value ${JSON.stringify(e)} for "log" provided to PrismaClient constructor.`);
        function r(t) {
            if (typeof t == "string" && !iu.includes(t)) {
                let n = Jr(t, iu);
                throw new _(`Invalid log level "${t}" provided to PrismaClient constructor.${n}`);
            }
        }
        for (let t of e){
            r(t);
            let n = {
                level: r,
                emit: (i)=>{
                    let o = [
                        "stdout",
                        "event"
                    ];
                    if (!o.includes(i)) {
                        let s = Jr(i, o);
                        throw new _(`Invalid value ${JSON.stringify(i)} for "emit" in logLevel provided to PrismaClient constructor.${s}`);
                    }
                }
            };
            if (t && typeof t == "object") for (let [i, o] of Object.entries(t))if (n[i]) n[i](o);
            else throw new _(`Invalid property ${i} for "log" provided to PrismaClient constructor`);
        }
    },
    transactionOptions: (e)=>{
        if (!e) return;
        let r = e.maxWait;
        if (r != null && r <= 0) throw new _(`Invalid value ${r} for maxWait in "transactionOptions" provided to PrismaClient constructor. maxWait needs to be greater than 0`);
        let t = e.timeout;
        if (t != null && t <= 0) throw new _(`Invalid value ${t} for timeout in "transactionOptions" provided to PrismaClient constructor. timeout needs to be greater than 0`);
    },
    omit: (e, r)=>{
        if (typeof e != "object") throw new _('"omit" option is expected to be an object.');
        if (e === null) throw new _('"omit" option can not be `null`');
        let t = [];
        for (let [n, i] of Object.entries(e)){
            let o = Nf(n, r.runtimeDataModel);
            if (!o) {
                t.push({
                    kind: "UnknownModel",
                    modelKey: n
                });
                continue;
            }
            for (let [s, a] of Object.entries(i)){
                let l = o.fields.find((u)=>u.name === s);
                if (!l) {
                    t.push({
                        kind: "UnknownField",
                        modelKey: n,
                        fieldName: s
                    });
                    continue;
                }
                if (l.relationName) {
                    t.push({
                        kind: "RelationInOmit",
                        modelKey: n,
                        fieldName: s
                    });
                    continue;
                }
                typeof a != "boolean" && t.push({
                    kind: "InvalidFieldValue",
                    modelKey: n,
                    fieldName: s
                });
            }
        }
        if (t.length > 0) throw new _(Lf(e, t));
    },
    __internal: (e)=>{
        if (!e) return;
        let r = [
            "debug",
            "engine",
            "configOverride"
        ];
        if (typeof e != "object") throw new _(`Invalid value ${JSON.stringify(e)} for "__internal" to PrismaClient constructor`);
        for (let [t] of Object.entries(e))if (!r.includes(t)) {
            let n = Jr(t, r);
            throw new _(`Invalid property ${JSON.stringify(t)} for "__internal" provided to PrismaClient constructor.${n}`);
        }
    }
};
function au(e, r) {
    for (let [t, n] of Object.entries(e)){
        if (!tu.includes(t)) {
            let i = Jr(t, tu);
            throw new _(`Unknown property ${t} provided to PrismaClient constructor.${i}`);
        }
        kf[t](n, r);
    }
    if (e.datasourceUrl && e.datasources) throw new _('Can not use "datasourceUrl" and "datasources" options at the same time. Pick one of them');
}
function Jr(e, r) {
    if (r.length === 0 || typeof e != "string") return "";
    let t = _f(e, r);
    return t ? ` Did you mean "${t}"?` : "";
}
function _f(e, r) {
    if (r.length === 0) return null;
    let t = r.map((i)=>({
            value: i,
            distance: (0, su.default)(e, i)
        }));
    t.sort((i, o)=>i.distance < o.distance ? -1 : 1);
    let n = t[0];
    return n.distance < 3 ? n.value : null;
}
function Nf(e, r) {
    return ou(r.models, e) ?? ou(r.types, e);
}
function ou(e, r) {
    let t = Object.keys(e).find((n)=>We(n) === r);
    if (t) return e[t];
}
function Lf(e, r) {
    let t = _r(e);
    for (let o of r)switch(o.kind){
        case "UnknownModel":
            t.arguments.getField(o.modelKey)?.markAsError(), t.addErrorMessage(()=>`Unknown model name: ${o.modelKey}.`);
            break;
        case "UnknownField":
            t.arguments.getDeepField([
                o.modelKey,
                o.fieldName
            ])?.markAsError(), t.addErrorMessage(()=>`Model "${o.modelKey}" does not have a field named "${o.fieldName}".`);
            break;
        case "RelationInOmit":
            t.arguments.getDeepField([
                o.modelKey,
                o.fieldName
            ])?.markAsError(), t.addErrorMessage(()=>'Relations are already excluded by default and can not be specified in "omit".');
            break;
        case "InvalidFieldValue":
            t.arguments.getDeepFieldValue([
                o.modelKey,
                o.fieldName
            ])?.markAsError(), t.addErrorMessage(()=>"Omit field option value must be a boolean.");
            break;
    }
    let { message: n, args: i } = _n(t, "colorless");
    return `Error validating "omit" option:

${i}

${n}`;
}
function lu(e) {
    return e.length === 0 ? Promise.resolve([]) : new Promise((r, t)=>{
        let n = new Array(e.length), i = null, o = !1, s = 0, a = ()=>{
            o || (s++, s === e.length && (o = !0, i ? t(i) : r(n)));
        }, l = (u)=>{
            o || (o = !0, t(u));
        };
        for(let u = 0; u < e.length; u++)e[u].then((c)=>{
            n[u] = c, a();
        }, (c)=>{
            if (!zn(c)) {
                l(c);
                return;
            }
            c.batchRequestIdx === u ? l(c) : (i || (i = c), a());
        });
    });
}
var rr = N("prisma:client");
typeof globalThis == "object" && (globalThis.NODE_CLIENT = !0);
var Ff = {
    requestArgsToMiddlewareArgs: (e)=>e,
    middlewareArgsToRequestArgs: (e)=>e
}, Mf = Symbol.for("prisma.client.transaction.id"), $f = {
    id: 0,
    nextId () {
        return ++this.id;
    }
};
function fu(e) {
    class r {
        _originalClient = this;
        _runtimeDataModel;
        _requestHandler;
        _connectionPromise;
        _disconnectionPromise;
        _engineConfig;
        _accelerateEngineConfig;
        _clientVersion;
        _errorFormat;
        _tracingHelper;
        _previewFeatures;
        _activeProvider;
        _globalOmit;
        _extensions;
        _engine;
        _appliedParent;
        _createPrismaPromise = Ro();
        constructor(n){
            e = n?.__internal?.configOverride?.(e) ?? e, sl(e), n && au(n, e);
            let i = new du.EventEmitter().on("error", ()=>{});
            this._extensions = Nr.empty(), this._previewFeatures = $l(e), this._clientVersion = e.clientVersion ?? ru, this._activeProvider = e.activeProvider, this._globalOmit = n?.omit, this._tracingHelper = Hl();
            let o = e.relativeEnvPaths && {
                rootEnvPath: e.relativeEnvPaths.rootEnvPath && ri.default.resolve(e.dirname, e.relativeEnvPaths.rootEnvPath),
                schemaEnvPath: e.relativeEnvPaths.schemaEnvPath && ri.default.resolve(e.dirname, e.relativeEnvPaths.schemaEnvPath)
            }, s;
            if (n?.adapter) {
                s = n.adapter;
                let l = e.activeProvider === "postgresql" || e.activeProvider === "cockroachdb" ? "postgres" : e.activeProvider;
                if (s.provider !== l) throw new P(`The Driver Adapter \`${s.adapterName}\`, based on \`${s.provider}\`, is not compatible with the provider \`${l}\` specified in the Prisma schema.`, this._clientVersion);
                if (n.datasources || n.datasourceUrl !== void 0) throw new P("Custom datasource configuration is not compatible with Prisma Driver Adapters. Please define the database connection string directly in the Driver Adapter configuration.", this._clientVersion);
            }
            let a = !s && o && st(o, {
                conflictCheck: "none"
            }) || e.injectableEdgeEnv?.();
            try {
                let l = n ?? {}, u = l.__internal ?? {}, c = u.debug === !0;
                c && N.enable("prisma:client");
                let p = ri.default.resolve(e.dirname, e.relativePath);
                mu.default.existsSync(p) || (p = e.dirname), rr("dirname", e.dirname), rr("relativePath", e.relativePath), rr("cwd", p);
                let d = u.engine || {};
                if (l.errorFormat ? this._errorFormat = l.errorFormat : ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : process.env.NO_COLOR ? this._errorFormat = "colorless" : this._errorFormat = "colorless", this._runtimeDataModel = e.runtimeDataModel, this._engineConfig = {
                    cwd: p,
                    dirname: e.dirname,
                    enableDebugLogs: c,
                    allowTriggerPanic: d.allowTriggerPanic,
                    prismaPath: d.binaryPath ?? void 0,
                    engineEndpoint: d.endpoint,
                    generator: e.generator,
                    showColors: this._errorFormat === "pretty",
                    logLevel: l.log && zl(l.log),
                    logQueries: l.log && !!(typeof l.log == "string" ? l.log === "query" : l.log.find((f)=>typeof f == "string" ? f === "query" : f.level === "query")),
                    env: a?.parsed ?? {},
                    flags: [],
                    engineWasm: e.engineWasm,
                    compilerWasm: e.compilerWasm,
                    clientVersion: e.clientVersion,
                    engineVersion: e.engineVersion,
                    previewFeatures: this._previewFeatures,
                    activeProvider: e.activeProvider,
                    inlineSchema: e.inlineSchema,
                    overrideDatasources: al(l, e.datasourceNames),
                    inlineDatasources: e.inlineDatasources,
                    inlineSchemaHash: e.inlineSchemaHash,
                    tracingHelper: this._tracingHelper,
                    transactionOptions: {
                        maxWait: l.transactionOptions?.maxWait ?? 2e3,
                        timeout: l.transactionOptions?.timeout ?? 5e3,
                        isolationLevel: l.transactionOptions?.isolationLevel
                    },
                    logEmitter: i,
                    isBundled: e.isBundled,
                    adapter: s
                }, this._accelerateEngineConfig = {
                    ...this._engineConfig,
                    accelerateUtils: {
                        resolveDatasourceUrl: jr,
                        getBatchRequestPayload: Mr,
                        prismaGraphQLToJSError: $r,
                        PrismaClientUnknownRequestError: V,
                        PrismaClientInitializationError: P,
                        PrismaClientKnownRequestError: z,
                        debug: N("prisma:client:accelerateEngine"),
                        engineVersion: cu.version,
                        clientVersion: e.clientVersion
                    }
                }, rr("clientVersion", e.clientVersion), this._engine = Ml(e, this._engineConfig), this._requestHandler = new ei(this, i), l.log) for (let f of l.log){
                    let h = typeof f == "string" ? f : f.emit === "stdout" ? f.level : null;
                    h && this.$on(h, (g)=>{
                        nt.log(`${nt.tags[h] ?? ""}`, g.message || g.query);
                    });
                }
            } catch (l) {
                throw l.clientVersion = this._clientVersion, l;
            }
            return this._appliedParent = Pt(this);
        }
        get [Symbol.toStringTag]() {
            return "PrismaClient";
        }
        $on(n, i) {
            return n === "beforeExit" ? this._engine.onBeforeExit(i) : n && this._engineConfig.logEmitter.on(n, i), this;
        }
        $connect() {
            try {
                return this._engine.start();
            } catch (n) {
                throw n.clientVersion = this._clientVersion, n;
            }
        }
        async $disconnect() {
            try {
                await this._engine.stop();
            } catch (n) {
                throw n.clientVersion = this._clientVersion, n;
            } finally{
                Uo();
            }
        }
        $executeRawInternal(n, i, o, s) {
            let a = this._activeProvider;
            return this._request({
                action: "executeRaw",
                args: o,
                transaction: n,
                clientMethod: i,
                argsMapper: So({
                    clientMethod: i,
                    activeProvider: a
                }),
                callsite: Ze(this._errorFormat),
                dataPath: [],
                middlewareArgsMapper: s
            });
        }
        $executeRaw(n, ...i) {
            return this._createPrismaPromise((o)=>{
                if (n.raw !== void 0 || n.sql !== void 0) {
                    let [s, a] = uu(n, i);
                    return To(this._activeProvider, s.text, s.values, Array.isArray(n) ? "prisma.$executeRaw`<SQL>`" : "prisma.$executeRaw(sql`<SQL>`)"), this.$executeRawInternal(o, "$executeRaw", s, a);
                }
                throw new Z("`$executeRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#executeraw\n", {
                    clientVersion: this._clientVersion
                });
            });
        }
        $executeRawUnsafe(n, ...i) {
            return this._createPrismaPromise((o)=>(To(this._activeProvider, n, i, "prisma.$executeRawUnsafe(<SQL>, [...values])"), this.$executeRawInternal(o, "$executeRawUnsafe", [
                    n,
                    ...i
                ])));
        }
        $runCommandRaw(n) {
            if (e.activeProvider !== "mongodb") throw new Z(`The ${e.activeProvider} provider does not support $runCommandRaw. Use the mongodb provider.`, {
                clientVersion: this._clientVersion
            });
            return this._createPrismaPromise((i)=>this._request({
                    args: n,
                    clientMethod: "$runCommandRaw",
                    dataPath: [],
                    action: "runCommandRaw",
                    argsMapper: ql,
                    callsite: Ze(this._errorFormat),
                    transaction: i
                }));
        }
        async $queryRawInternal(n, i, o, s) {
            let a = this._activeProvider;
            return this._request({
                action: "queryRaw",
                args: o,
                transaction: n,
                clientMethod: i,
                argsMapper: So({
                    clientMethod: i,
                    activeProvider: a
                }),
                callsite: Ze(this._errorFormat),
                dataPath: [],
                middlewareArgsMapper: s
            });
        }
        $queryRaw(n, ...i) {
            return this._createPrismaPromise((o)=>{
                if (n.raw !== void 0 || n.sql !== void 0) return this.$queryRawInternal(o, "$queryRaw", ...uu(n, i));
                throw new Z("`$queryRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#queryraw\n", {
                    clientVersion: this._clientVersion
                });
            });
        }
        $queryRawTyped(n) {
            return this._createPrismaPromise((i)=>{
                if (!this._hasPreviewFlag("typedSql")) throw new Z("`typedSql` preview feature must be enabled in order to access $queryRawTyped API", {
                    clientVersion: this._clientVersion
                });
                return this.$queryRawInternal(i, "$queryRawTyped", n);
            });
        }
        $queryRawUnsafe(n, ...i) {
            return this._createPrismaPromise((o)=>this.$queryRawInternal(o, "$queryRawUnsafe", [
                    n,
                    ...i
                ]));
        }
        _transactionWithArray({ promises: n, options: i }) {
            let o = $f.nextId(), s = Yl(n.length), a = n.map((l, u)=>{
                if (l?.[Symbol.toStringTag] !== "PrismaPromise") throw new Error("All elements of the array need to be Prisma Client promises. Hint: Please make sure you are not awaiting the Prisma client calls you intended to pass in the $transaction function.");
                let c = i?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel, p = {
                    kind: "batch",
                    id: o,
                    index: u,
                    isolationLevel: c,
                    lock: s
                };
                return l.requestTransaction?.(p) ?? l;
            });
            return lu(a);
        }
        async _transactionWithCallback({ callback: n, options: i }) {
            let o = {
                traceparent: this._tracingHelper.getTraceParent()
            }, s = {
                maxWait: i?.maxWait ?? this._engineConfig.transactionOptions.maxWait,
                timeout: i?.timeout ?? this._engineConfig.transactionOptions.timeout,
                isolationLevel: i?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel
            }, a = await this._engine.transaction("start", o, s), l;
            try {
                let u = {
                    kind: "itx",
                    ...a
                };
                l = await n(this._createItxClient(u)), await this._engine.transaction("commit", o, a);
            } catch (u) {
                throw await this._engine.transaction("rollback", o, a).catch(()=>{}), u;
            }
            return l;
        }
        _createItxClient(n) {
            return he(Pt(he(Qa(this), [
                re("_appliedParent", ()=>this._appliedParent._createItxClient(n)),
                re("_createPrismaPromise", ()=>Ro(n)),
                re(Mf, ()=>n.id)
            ])), [
                Fr(Ya)
            ]);
        }
        $transaction(n, i) {
            let o;
            typeof n == "function" ? this._engineConfig.adapter?.adapterName === "@prisma/adapter-d1" ? o = ()=>{
                throw new Error("Cloudflare D1 does not support interactive transactions. We recommend you to refactor your queries with that limitation in mind, and use batch transactions with `prisma.$transactions([])` where applicable.");
            } : o = ()=>this._transactionWithCallback({
                    callback: n,
                    options: i
                }) : o = ()=>this._transactionWithArray({
                    promises: n,
                    options: i
                });
            let s = {
                name: "transaction",
                attributes: {
                    method: "$transaction"
                }
            };
            return this._tracingHelper.runInChildSpan(s, o);
        }
        _request(n) {
            n.otelParentCtx = this._tracingHelper.getActiveContext();
            let i = n.middlewareArgsMapper ?? Ff, o = {
                args: i.requestArgsToMiddlewareArgs(n.args),
                dataPath: n.dataPath,
                runInTransaction: !!n.transaction,
                action: n.action,
                model: n.model
            }, s = {
                operation: {
                    name: "operation",
                    attributes: {
                        method: o.action,
                        model: o.model,
                        name: o.model ? `${o.model}.${o.action}` : o.action
                    }
                }
            }, a = async (l)=>{
                let { runInTransaction: u, args: c, ...p } = l, d = {
                    ...n,
                    ...p
                };
                c && (d.args = i.middlewareArgsToRequestArgs(c)), n.transaction !== void 0 && u === !1 && delete d.transaction;
                let f = await el(this, d);
                return d.model ? Ha({
                    result: f,
                    modelName: d.model,
                    args: d.args,
                    extensions: this._extensions,
                    runtimeDataModel: this._runtimeDataModel,
                    globalOmit: this._globalOmit
                }) : f;
            };
            return this._tracingHelper.runInChildSpan(s.operation, ()=>new pu.AsyncResource("prisma-client-request").runInAsyncScope(()=>a(o)));
        }
        async _executeRequest({ args: n, clientMethod: i, dataPath: o, callsite: s, action: a, model: l, argsMapper: u, transaction: c, unpacker: p, otelParentCtx: d, customDataProxyFetch: f }) {
            try {
                n = u ? u(n) : n;
                let h = {
                    name: "serialize"
                }, g = this._tracingHelper.runInChildSpan(h, ()=>$n({
                        modelName: l,
                        runtimeDataModel: this._runtimeDataModel,
                        action: a,
                        args: n,
                        clientMethod: i,
                        callsite: s,
                        extensions: this._extensions,
                        errorFormat: this._errorFormat,
                        clientVersion: this._clientVersion,
                        previewFeatures: this._previewFeatures,
                        globalOmit: this._globalOmit
                    }));
                return N.enabled("prisma:client") && (rr("Prisma Client call:"), rr(`prisma.${i}(${Na(n)})`), rr("Generated request:"), rr(JSON.stringify(g, null, 2) + `
`)), c?.kind === "batch" && await c.lock, this._requestHandler.request({
                    protocolQuery: g,
                    modelName: l,
                    action: a,
                    clientMethod: i,
                    dataPath: o,
                    callsite: s,
                    args: n,
                    extensions: this._extensions,
                    transaction: c,
                    unpacker: p,
                    otelParentCtx: d,
                    otelChildCtx: this._tracingHelper.getActiveContext(),
                    globalOmit: this._globalOmit,
                    customDataProxyFetch: f
                });
            } catch (h) {
                throw h.clientVersion = this._clientVersion, h;
            }
        }
        $metrics = new Lr(this);
        _hasPreviewFlag(n) {
            return !!this._engineConfig.previewFeatures?.includes(n);
        }
        $applyPendingMigrations() {
            return this._engine.applyPendingMigrations();
        }
        $extends = Wa;
    }
    return r;
}
function uu(e, r) {
    return qf(e) ? [
        new ie(e, r),
        Wl
    ] : [
        e,
        Jl
    ];
}
function qf(e) {
    return Array.isArray(e) && Array.isArray(e.raw);
}
var Vf = new Set([
    "toJSON",
    "$$typeof",
    "asymmetricMatch",
    Symbol.iterator,
    Symbol.toStringTag,
    Symbol.isConcatSpreadable,
    Symbol.toPrimitive
]);
function gu(e) {
    return new Proxy(e, {
        get (r, t) {
            if (t in r) return r[t];
            if (!Vf.has(t)) throw new TypeError(`Invalid enum value: ${String(t)}`);
        }
    });
}
function hu(e) {
    st(e, {
        conflictCheck: "warn"
    });
}
0 && (module.exports = {
    DMMF,
    Debug,
    Decimal,
    Extensions,
    MetricsClient,
    PrismaClientInitializationError,
    PrismaClientKnownRequestError,
    PrismaClientRustPanicError,
    PrismaClientUnknownRequestError,
    PrismaClientValidationError,
    Public,
    Sql,
    createParam,
    defineDmmfProperty,
    deserializeJsonResponse,
    deserializeRawResult,
    dmmfToRuntimeDataModel,
    empty,
    getPrismaClient,
    getRuntime,
    join,
    makeStrictEnum,
    makeTypedQueryFactory,
    objectEnumValues,
    raw,
    serializeJsonQuery,
    skip,
    sqltag,
    warnEnvConflicts,
    warnOnce
}); /*! Bundled license information:

decimal.js/decimal.mjs:
  (*!
   *  decimal.js v10.5.0
   *  An arbitrary-precision Decimal type for JavaScript.
   *  https://github.com/MikeMcl/decimal.js
   *  Copyright (c) 2025 Michael Mclaughlin <M8ch88l@gmail.com>
   *  MIT Licence
   *)
*/  //# sourceMappingURL=library.js.map
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[project]/generated/prisma/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/* !!! This is code generated by Prisma. Do not edit directly. !!!
/* eslint-disable */ // biome-ignore-all lint: generated file
Object.defineProperty(exports, "__esModule", {
    value: true
});
const { PrismaClientKnownRequestError, PrismaClientUnknownRequestError, PrismaClientRustPanicError, PrismaClientInitializationError, PrismaClientValidationError, getPrismaClient, sqltag, empty, join, raw, skip, Decimal, Debug, objectEnumValues, makeStrictEnum, Extensions, warnOnce, defineDmmfProperty, Public, getRuntime, createParam } = __turbopack_context__.r("[project]/generated/prisma/runtime/library.js [app-route] (ecmascript)");
const Prisma = {};
exports.Prisma = Prisma;
exports.$Enums = {};
/**
 * Prisma Client JS version: 6.19.0
 * Query Engine version: 2ba551f319ab1df4bc874a89965d8b3641056773
 */ Prisma.prismaVersion = {
    client: "6.19.0",
    engine: "2ba551f319ab1df4bc874a89965d8b3641056773"
};
Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError;
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError;
Prisma.PrismaClientInitializationError = PrismaClientInitializationError;
Prisma.PrismaClientValidationError = PrismaClientValidationError;
Prisma.Decimal = Decimal;
/**
 * Re-export of sql-template-tag
 */ Prisma.sql = sqltag;
Prisma.empty = empty;
Prisma.join = join;
Prisma.raw = raw;
Prisma.validator = Public.validator;
/**
* Extensions
*/ Prisma.getExtensionContext = Extensions.getExtensionContext;
Prisma.defineExtension = Extensions.defineExtension;
/**
 * Shorthand utilities for JSON filtering
 */ Prisma.DbNull = objectEnumValues.instances.DbNull;
Prisma.JsonNull = objectEnumValues.instances.JsonNull;
Prisma.AnyNull = objectEnumValues.instances.AnyNull;
Prisma.NullTypes = {
    DbNull: objectEnumValues.classes.DbNull,
    JsonNull: objectEnumValues.classes.JsonNull,
    AnyNull: objectEnumValues.classes.AnyNull
};
const path = __turbopack_context__.r("[externals]/path [external] (path, cjs)");
/**
 * Enums
 */ exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.Prisma.ProductScalarFieldEnum = {
    id: 'id',
    productCode: 'productCode',
    productName: 'productName',
    category: 'category',
    price: 'price',
    stock: 'stock',
    description: 'description',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdBy: 'createdBy',
    updatedBy: 'updatedBy'
};
exports.Prisma.PostScalarFieldEnum = {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.Prisma.ProductScalarFieldEnum = {
    id: 'id',
    productCode: 'productCode',
    productName: 'productName',
    category: 'category',
    price: 'price',
    stock: 'stock',
    description: 'description',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdBy: 'createdBy',
    updatedBy: 'updatedBy'
};
exports.Prisma.Sys_menuScalarFieldEnum = {
    menu_id: 'menu_id',
    parent_id: 'parent_id',
    menu_level: 'menu_level',
    sort_order: 'sort_order',
    menu_name: 'menu_name',
    menu_name_en: 'menu_name_en',
    menu_path: 'menu_path',
    menu_icon: 'menu_icon',
    screen_id: 'screen_id',
    screen_type: 'screen_type',
    is_active: 'is_active',
    is_visible: 'is_visible',
    badge_text: 'badge_text',
    badge_type: 'badge_type',
    created_by: 'created_by',
    created_at: 'created_at',
    updated_by: 'updated_by',
    updated_at: 'updated_at'
};
exports.Prisma.Sys_roleScalarFieldEnum = {
    role_id: 'role_id',
    role_name: 'role_name',
    role_desc: 'role_desc',
    is_active: 'is_active',
    created_at: 'created_at'
};
exports.Prisma.Sys_menu_roleScalarFieldEnum = {
    id: 'id',
    menu_id: 'menu_id',
    role_id: 'role_id',
    can_read: 'can_read',
    can_create: 'can_create',
    can_update: 'can_update',
    can_delete: 'can_delete',
    can_export: 'can_export',
    can_print: 'can_print',
    created_at: 'created_at'
};
exports.Prisma.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.Prisma.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.Prisma.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.Prisma.ModelName = {
    Product: 'Product',
    post: 'post',
    product: 'product',
    sys_menu: 'sys_menu',
    sys_role: 'sys_role',
    sys_menu_role: 'sys_menu_role'
};
/**
 * Create the Client
 */ const config = {
    "generator": {
        "name": "client",
        "provider": {
            "fromEnvVar": null,
            "value": "prisma-client-js"
        },
        "output": {
            "value": "/home/roarm_m3/ai-factory-lab/generated/prisma",
            "fromEnvVar": null
        },
        "config": {
            "engineType": "library"
        },
        "binaryTargets": [
            {
                "fromEnvVar": null,
                "value": "debian-openssl-3.0.x",
                "native": true
            }
        ],
        "previewFeatures": [],
        "sourceFilePath": "/home/roarm_m3/ai-factory-lab/prisma/schema.prisma",
        "isCustomOutput": true
    },
    "relativeEnvPaths": {
        "rootEnvPath": "../../.env",
        "schemaEnvPath": "../../.env"
    },
    "relativePath": "../../prisma",
    "clientVersion": "6.19.0",
    "engineVersion": "2ba551f319ab1df4bc874a89965d8b3641056773",
    "datasourceNames": [
        "db"
    ],
    "activeProvider": "postgresql",
    "postinstall": false,
    "inlineDatasources": {
        "db": {
            "url": {
                "fromEnvVar": "DATABASE_URL",
                "value": null
            }
        }
    },
    "inlineSchema": "generator client {\n  provider = \"prisma-client-js\"\n  output   = \"../generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nmodel Product {\n  id          Int      @id(map: \"Product_pkey1\") @default(autoincrement())\n  productCode String   @unique(map: \"Product_productCode_key1\") @db.VarChar(50)\n  productName String   @db.VarChar(200)\n  category    String   @db.VarChar(100)\n  price       Decimal  @db.Decimal(10, 2)\n  stock       Int      @default(0)\n  description String?\n  isActive    Boolean  @default(true)\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @default(now())\n  createdBy   String?  @db.VarChar(100)\n  updatedBy   String?  @db.VarChar(100)\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_acct {\n  yyyymm     String  @db.VarChar(20)\n  sel_code   String  @db.VarChar(10)\n  site       String  @db.VarChar(4)\n  acct_class String  @db.VarChar(20)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 계정과목내부코드 Int? @map(\"계정과목내부코드\")\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 전표기표여부 Int? @map(\"전표기표여부\")\n  acct       String  @db.VarChar(8)\n  acct_name  String? @db.VarChar(25)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 차대 String? @map(\"차대\") @db.VarChar(2)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 계정대분류 String? @map(\"계정대분류\") @db.VarChar(4)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 관리항목유형 String? @map(\"관리항목유형\") @db.VarChar(28)\n  lev        Int?    @map(\"계정과목lev\")\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 상위계정과목 String? @map(\"상위계정과목\") @db.VarChar(15)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 경영계획과목 String? @map(\"경영계획과목\") @db.VarChar(20)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 상위계정과목내부코드 Int? @map(\"상위계정과목내부코드\")\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 소분류 String? @map(\"소분류\") @db.VarChar(18)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 중분류 String? @map(\"중분류\") @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 대분류 String? @map(\"대분류\") @db.VarChar(10)\n  expen_sel  String? @db.VarChar(4)\n  expen_sel_ String? @map(\"expen_sel명\") @db.VarChar(30)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 특이사항 String? @map(\"특이사항\") @db.VarChar(150)\n  disp_seq   Int?\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_acct_1106 {\n  yyyy       String  @db.VarChar(10)\n  sel_code   String  @db.VarChar(10)\n  site       String  @db.VarChar(4)\n  acct_class String  @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 계정과목내부코드 Int? @map(\"계정과목내부코드\")\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 전표기표여부 Int? @map(\"전표기표여부\")\n  acct       String  @db.VarChar(8)\n  acct_name  String? @db.VarChar(25)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 차대 String? @map(\"차대\") @db.VarChar(2)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 계정대분류 String? @map(\"계정대분류\") @db.VarChar(4)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 관리항목유형 String? @map(\"관리항목유형\") @db.VarChar(18)\n  lev        Int?    @map(\"계정과목lev\")\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 상위계정과목 String? @map(\"상위계정과목\") @db.VarChar(12)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 상위계정과목내부코드 Int? @map(\"상위계정과목내부코드\")\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 소분류 String? @map(\"소분류\") @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 중분류 String? @map(\"중분류\") @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 대분류 String? @map(\"대분류\") @db.VarChar(10)\n  expen_sel  String? @db.VarChar(4)\n  expen_sel_ String? @map(\"expen_sel명\") @db.VarChar(10)\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_acct_1109 {\n  yyyy       String  @db.VarChar(20)\n  sel_code   String  @db.VarChar(10)\n  site       String  @db.VarChar(4)\n  acct_class String  @db.VarChar(20)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 계정과목내부코드 Int? @map(\"계정과목내부코드\")\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 전표기표여부 Int? @map(\"전표기표여부\")\n  acct       String  @db.VarChar(8)\n  acct_name  String? @db.VarChar(25)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 차대 String? @map(\"차대\") @db.VarChar(2)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 계정대분류 String? @map(\"계정대분류\") @db.VarChar(4)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 관리항목유형 String? @map(\"관리항목유형\") @db.VarChar(28)\n  lev        Int?    @map(\"계정과목lev\")\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 상위계정과목 String? @map(\"상위계정과목\") @db.VarChar(12)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 상위계정과목내부코드 Int? @map(\"상위계정과목내부코드\")\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 소분류 String? @map(\"소분류\") @db.VarChar(18)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 중분류 String? @map(\"중분류\") @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 대분류 String? @map(\"대분류\") @db.VarChar(10)\n  expen_sel  String? @db.VarChar(4)\n  expen_sel_ String? @map(\"expen_sel명\") @db.VarChar(15)\n\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 특이사항 String? @map(\"특이사항\") @db.VarChar(150)\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_acct_expen {\n  yyyymm     String  @db.VarChar(6)\n  sel_code   String  @db.VarChar(6)\n  site       String  @db.VarChar(4)\n  acct_class String? @db.VarChar(8)\n  dept       String? @db.VarChar(10)\n  acct       String  @db.VarChar(10)\n  acct_name  String? @db.VarChar(30)\n  item_name  String? @db.VarChar(18)\n  acct_amt   BigInt?\n  expen_sel  String? @db.VarChar(4)\n  expen_sel_ String? @map(\"expen_sel명\") @db.VarChar(30)\n  disp_seq   Int?\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_acct_expen_old {\n  yyyymm     String? @db.VarChar(10)\n  sel_code   String? @db.VarChar(10)\n  site       String? @db.VarChar(4)\n  acct_class String? @db.VarChar(4)\n  dept       String? @db.VarChar(10)\n  acct       String? @db.VarChar(50)\n  sub_name   String? @db.VarChar(50)\n  item_name  String? @db.VarChar(50)\n  acct_amt   Float?  @db.Real\n  expen_sel  String? @db.VarChar(6)\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_bom_mast {\n  yyyymm             String?  @db.VarChar(6)\n  site               String?  @db.VarChar(5)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 제품명 String? @map(\"제품명\") @db.VarChar(25)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 제품번호 String? @map(\"제품번호\") @db.VarChar(26)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 품목자산분류 String? @map(\"품목자산분류\") @db.VarChar(16)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 품목대분류 String? @map(\"품목대분류\") @db.VarChar(15)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 품목중분류 String? @map(\"품목중분류\") @db.VarChar(18)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 품목소분류 String? @map(\"품목소분류\") @db.VarChar(26)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 공정차수 String? @map(\"공정차수\") @db.VarChar(2)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 공정 String? @map(\"공정\") @db.VarChar(25)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 공정품명 String? @map(\"공정품명\") @db.VarChar(25)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 공정품번호 String? @map(\"공정품번호\") @db.VarChar(26)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 자재명 String? @map(\"자재명\") @db.VarChar(37)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 자재번호 String? @map(\"자재번호\") @db.VarChar(34)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 자재자산분류 String? @map(\"자재자산분류\") @db.VarChar(14)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 자재대분류 String? @map(\"자재대분류\") @db.VarChar(17)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 자재중분류 String? @map(\"자재중분류\") @db.VarChar(16)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 자재소분류 String? @map(\"자재소분류\") @db.VarChar(37)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 투입단위 String? @map(\"투입단위\") @db.VarChar(7)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 소요량 Decimal? @map(\"소요량\") @db.Decimal\n  internal_loss_rate Decimal? @map(\"내부loss율\") @db.Decimal\n  external_loss_rate Decimal? @map(\"외부loss율\") @db.Decimal\n\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 조립위치 String? @map(\"조립위치\") @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 특이사항 String? @map(\"특이사항\") @db.VarChar(30)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 최초작성일 DateTime? @map(\"최초작성일\") @db.Date\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 최초작성자 String? @map(\"최초작성자\") @db.VarChar(13)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 최종수정일 DateTime? @map(\"최종수정일\") @db.Date\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 최종수정자 String? @map(\"최종수정자\") @db.VarChar(13)\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_caset {\n  yyyymm         String  @db.VarChar(6)\n  sel_code       String  @db.VarChar(6)\n  site           String  @db.VarChar(4)\n  from_dept_code String  @db.VarChar(10)\n  from_dept_name String? @db.VarChar(50)\n  from_acct_code String  @db.VarChar(10)\n  from_acct_name String? @db.VarChar(50)\n  expen_sel      String? @db.VarChar(4)\n  expen_sel_name String? @db.VarChar(30)\n  acct_amt       BigInt?\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_cassette_resc {\n  yyyymm        String    @db.VarChar(10)\n  sel_code      String    @db.VarChar(10)\n  site          String    @db.VarChar(4)\n  cst_no        String    @db.VarChar(30)\n  cst_name      String    @db.VarChar(30)\n  cst_class     String    @db.VarChar(50)\n  spec          String?   @db.VarChar(30)\n  unit          String?   @db.VarChar(10)\n  in_qty        Int?\n  in_date       DateTime? @db.Date\n  in_dept       String?   @db.VarChar(10)\n  dept_code     Int?\n  in_person     String?   @db.VarChar(10)\n  last_datetime DateTime? @db.Timestamp(6)\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_cm_role {\n  role_id     String    @db.VarChar(35)\n  role_name   String?   @db.VarChar(500)\n  description String?   @db.VarChar(2000)\n  init_dt     DateTime? @db.Timestamp(6)\n  init_user   String?   @db.VarChar(35)\n  modi_dt     DateTime? @db.Timestamp(6)\n  modi_user   String?   @db.VarChar(35)\n  del_yn      String?   @db.VarChar(1)\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_cm_role_sys_resource {\n  role_id                   String    @db.VarChar(35)\n  prod_category             String    @db.VarChar(5)\n  upper_sys_resource_id     String    @db.VarChar(35)\n  sys_resource_id           String    @db.VarChar(35)\n  sys_resource_type_code_id String    @db.VarChar(35)\n  init_dt                   DateTime? @db.Timestamp(6)\n  init_user                 String?   @db.VarChar(35)\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_cm_role_sys_resource_1106 {\n  role_id                   String    @db.VarChar(35)\n  prod_category             String    @db.VarChar(5)\n  upper_sys_resource_id     String    @db.VarChar(35)\n  sys_resource_id           String    @db.VarChar(35)\n  sys_resource_type_code_id String    @db.VarChar(35)\n  init_dt                   DateTime? @db.Timestamp(6)\n  init_user                 String?   @db.VarChar(35)\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_cm_sys_resource {\n  prod_category             String?   @db.VarChar(5)\n  sys_resource_id           String?   @db.VarChar(35)\n  sys_resource_name         String?   @db.VarChar(500)\n  upper_sys_resource_id     String?   @db.VarChar(35)\n  sys_resource_type_code_id String?   @db.VarChar(35)\n  description               String?   @db.VarChar(2000)\n  seq                       Int?\n  url                       String?   @db.VarChar(1000)\n  init_dt                   DateTime? @db.Timestamp(6)\n  init_user                 String?   @db.VarChar(35)\n  modi_dt                   DateTime? @db.Timestamp(6)\n  modi_user                 String?   @db.VarChar(35)\n  del_yn                    String?   @db.Char(1)\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_cm_user {\n  user_id       String    @db.VarChar(35)\n  user_name     String?   @db.VarChar(50)\n  password      String?   @db.VarChar(20)\n  dept_name     String?   @db.VarChar(100)\n  dept_code     String?   @db.VarChar(35)\n  position_name String?   @db.VarChar(14)\n  position_code String?   @db.VarChar(2)\n  utg           String?   @db.VarChar(1)\n  itg           String?   @db.VarChar(1)\n  init_dt       DateTime? @db.Timestamp(6)\n  init_user     String?   @db.VarChar(35)\n  modi_dt       DateTime? @db.Timestamp(6)\n  modi_user     String?   @db.VarChar(35)\n  del_yn        String?   @db.Char(1)\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_cm_user_role {\n  user_id     String    @db.VarChar(35)\n  role_id     String    @db.VarChar(35)\n  role_name   String?   @db.VarChar(500)\n  description String?   @db.VarChar(2000)\n  init_dt     DateTime? @db.Timestamp(6)\n  init_user   String?   @db.VarChar(35)\n  modi_dt     DateTime? @db.Timestamp(6)\n  modi_user   String?   @db.VarChar(35)\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_common_code {\n  maj_code    String?   @db.VarChar(3)\n  code        String?   @db.VarChar(10)\n  code_name   String?   @db.VarChar(50)\n  tray_cell   String?   @db.VarChar(3)\n  create_date DateTime? @db.Date\n  use_yn      String?   @db.VarChar(1)\n  sort_order  Int?\n  etc1        String?   @db.VarChar(30)\n  etc2        String?   @db.VarChar(30)\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_cost {\n  yyyymm       String   @db.VarChar(10)\n  sel_code     String   @db.VarChar(10)\n  site         String   @db.VarChar(4)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 구분 String @map(\"구분\") @db.VarChar(2)\n  model        String   @db.VarChar(10)\n  expen_sel_   String?  @map(\"expen_sel명\") @db.VarChar(30)\n  acct_name    String   @db.VarChar(50)\n  item_name    String?  @db.VarChar(50)\n  expen_sel    String   @db.VarChar(6)\n  boh_qty      Int?\n  in_qty       Int?\n  eoh_qty      Int?\n  out_qty      Int?\n  loss_qty     Int?\n  bad_qty      Int?\n  transfer_qty Int?\n  unit_cost    Decimal? @db.Decimal\n  boh          Decimal? @db.Decimal\n  in           Decimal? @db.Decimal\n  eoh          Decimal? @db.Decimal\n  out___       Decimal? @map(\"out_단가\") @db.Decimal\n  out          Decimal? @db.Decimal\n  loss         Decimal? @db.Decimal\n  bad          Decimal? @db.Decimal\n  transfer     Decimal? @db.Decimal\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_cst_bom {\n  yyyymm            String  @db.VarChar(20)\n  sel_code          String  @db.VarChar(10)\n  site              String  @db.VarChar(4)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 제품명 String? @map(\"제품명\") @db.VarChar(24)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 제품번호 String @map(\"제품번호\") @db.VarChar(8)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 제품규격 String? @map(\"제품규격\") @db.VarChar(10)\n  product_bom_level String? @map(\"제품bom차수\") @db.VarChar(2)\n  bom_level         String? @map(\"bom레벨\") @db.VarChar(4)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 자재명 String? @map(\"자재명\") @db.VarChar(25)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 자재번호 String @map(\"자재번호\") @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 자재규격 String? @map(\"자재규격\") @db.VarChar(37)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 투입단위 String? @map(\"투입단위\") @db.VarChar(2)\n  sub_bom_level     String? @map(\"하위bom차수\") @db.VarChar(2)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 총소요량 Decimal? @map(\"총소요량\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 품목자산분류 String? @map(\"품목자산분류\") @db.VarChar(16)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 품목대분류 String? @map(\"품목대분류\") @db.VarChar(17)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 품목중분류 String? @map(\"품목중분류\") @db.VarChar(18)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 품목소분류 String? @map(\"품목소분류\") @db.VarChar(16)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 외주배부 Boolean? @map(\"외주배부\")\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 비고 String? @map(\"비고\") @db.VarChar(19)\n  column21          Float?  @db.Real\n  column22          Float?  @db.Real\n  column23          String? @db.VarChar(50)\n  column24          String? @db.VarChar(50)\n  column25          String? @db.VarChar(50)\n  column26          String? @db.VarChar(50)\n  column27          String? @db.VarChar(50)\n  column28          String? @db.VarChar(50)\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_cst_rate {\n  yyyymm   String   @db.VarChar(10)\n  sel_code String   @db.VarChar(10)\n  site     String   @db.VarChar(4)\n  utg      Decimal? @db.Decimal\n  vina_cst Decimal? @db.Decimal\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_cust_mast {\n  yyyy       String  @db.VarChar(8)\n  sel_code   String  @db.VarChar(8)\n  site       String  @db.VarChar(4)\n  cust_code  String  @db.VarChar(4)\n  cust_desc  String? @db.VarChar(50)\n  cust_state String? @db.VarChar(10)\n  dom_sale   String? @db.VarChar(10)\n  exp_sale   String? @db.VarChar(10)\n  dom_purc   String? @db.VarChar(10)\n  over_purc  String? @db.VarChar(10)\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_dept {\n  yyyymm         String   @db.VarChar(10)\n  sel_code       String   @db.VarChar(10)\n  site           String   @db.VarChar(4)\n  dept           String   @db.VarChar(10)\n  dept_name      String?  @db.VarChar(50)\n  expen_area     String?  @db.VarChar(10)\n  rnd_yn         String?  @db.VarChar(1)\n  cost_dist      String   @db.VarChar(50)\n  cost_dist_rate Decimal? @db.Decimal\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_dept_1127 {\n  yyyymm         String   @db.VarChar(10)\n  sel_code       String   @db.VarChar(10)\n  site           String   @db.VarChar(4)\n  dept           String   @db.VarChar(10)\n  dept_name      String?  @db.VarChar(50)\n  expen_area     String?  @db.VarChar(10)\n  rnd_yn         String?  @db.VarChar(1)\n  cost_dist      String   @db.VarChar(50)\n  cost_dist_rate Decimal? @db.Decimal\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_dept_cost {\n  yyyymm   String @db.VarChar(6)\n  sel_code String @db.VarChar(6)\n  site     String @db.VarChar(4)\n\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 코스트센터 String @map(\"코스트센터\") @db.VarChar(15)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 코스트센터분류 String? @map(\"코스트센터분류\") @db.VarChar(12)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 코스트센터유형 String? @map(\"코스트센터유형\") @db.VarChar(12)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 계정코드 String @map(\"계정코드\") @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 계정과목 String? @map(\"계정과목\") @db.VarChar(30)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 비용구분 String? @map(\"비용구분\") @db.VarChar(8)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 차변금액 BigInt? @map(\"차변금액\")\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 대변금액 BigInt? @map(\"대변금액\")\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_dept_cost_1124 {\n  yyyymm   String @db.VarChar(6)\n  sel_code String @db.VarChar(6)\n  site     String @db.VarChar(4)\n\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 코스트센터 String @map(\"코스트센터\") @db.VarChar(15)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 코스트센터분류 String? @map(\"코스트센터분류\") @db.VarChar(12)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 코스트센터유형 String? @map(\"코스트센터유형\") @db.VarChar(12)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 계정코드 String @map(\"계정코드\") @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 계정과목 String? @map(\"계정과목\") @db.VarChar(30)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 비용구분 String? @map(\"비용구분\") @db.VarChar(8)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 차변금액 BigInt? @map(\"차변금액\")\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 대변금액 BigInt? @map(\"대변금액\")\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_dept_old {\n  yyyymm         String   @db.VarChar(10)\n  sel_code       String   @db.VarChar(10)\n  site           String   @db.VarChar(4)\n  dept           String   @db.VarChar(10)\n  dept_name      String?  @db.VarChar(50)\n  expen_area     String?  @db.VarChar(10)\n  rnd_yn         String?  @db.VarChar(1)\n  cost_dist      String?  @db.VarChar(50)\n  cost_dist_rate Decimal? @db.Decimal\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_expen_matl {\n  yyyymm       String   @db.VarChar(10)\n  sel_code     String   @db.VarChar(6)\n  site         String   @db.VarChar(4)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 구분 String @map(\"구분\") @db.VarChar(4)\n  model        String   @db.VarChar(8)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 면적 Decimal? @map(\"면적\") @db.Decimal\n  dist_rate    Float?\n  dist_in      Float?\n  sub_name     String?  @db.VarChar(30)\n  item_name    String?  @db.VarChar(18)\n  expen_sel    String   @db.VarChar(4)\n  expen_sel_   String?  @map(\"expen_sel명\") @db.VarChar(30)\n  adj_qty      Int?\n  boh_qty      Float?\n  in_qty       Int?\n  eoh_qty      Float?\n  out_qty      Int?\n  loss_qty     Int?\n  bad_qty      Int?\n  transfer_qty Int?\n  unit_cost    Float?\n  boh          Float?\n  in           Float?\n  disp_seq     Int?\n  in_ori       Decimal? @db.Decimal\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_expen_matl_old {\n  yyyymm       String   @db.VarChar(10)\n  sel_code     String   @db.VarChar(10)\n  site         String   @db.VarChar(4)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 구분 String @map(\"구분\") @db.VarChar(2)\n  model        String   @db.VarChar(10)\n  dist_rate    Decimal? @db.Decimal\n  acct_name    String?  @db.VarChar(30)\n  sub_name     String?  @db.VarChar(50)\n  item_name    String?  @db.VarChar(50)\n  expen_sel    String   @db.VarChar(6)\n  boh_qty      Int?\n  in_qty       Int?\n  eoh_qty      Int?\n  out_qty      Int?\n  loss_qty     Int?\n  bad_qty      Int?\n  transfer_qty Int?\n  unit_cost    Float?\n  boh          Decimal? @db.Decimal\n  in           Decimal? @db.Decimal\n  eoh          Decimal? @db.Decimal\n  out___       Float?   @map(\"out_단가\")\n  out          Decimal? @db.Decimal\n  out1         Decimal? @db.Decimal\n  loss         Decimal? @db.Decimal\n  bad          Decimal? @db.Decimal\n  transfer     Decimal? @db.Decimal\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_expen_sel {\n  yyyy       String  @db.VarChar(6)\n  sel_code   String  @db.VarChar(10)\n  site       String  @db.VarChar(5)\n  expen_sel  String  @db.VarChar(5)\n  expen_sel_ String? @map(\"expen_sel명\") @db.VarChar(30)\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_invoice_raw {\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 선택 Boolean? @map(\"선택\")\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 출고처리 Boolean? @map(\"출고처리\")\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 사업단위 String? @map(\"사업단위\") @db.VarChar(5)\n  invoice_no   String? @db.VarChar(17)\n  invoice____  String? @map(\"invoice관리번호\") @db.VarChar(15)\n  invoice_date String? @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 수출구분 String? @map(\"수출구분\") @db.VarChar(8)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 출고구분 String? @map(\"출고구분\") @db.VarChar(8)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 가격조건 String? @map(\"가격조건\") @db.VarChar(5)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 부서 String? @map(\"부서\") @db.VarChar(15)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 담당자 String? @map(\"담당자\") @db.VarChar(13)\n  buyer        String? @db.VarChar(29)\n  agent        String? @db.VarChar(29)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 통화 String? @map(\"통화\") @db.VarChar(3)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 환율 Decimal? @map(\"환율\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 품명 String? @map(\"품명\") @db.VarChar(24)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 품번 String? @map(\"품번\") @db.VarChar(15)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 규격 String? @map(\"규격\") @db.VarChar(30)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 단위 String? @map(\"단위\") @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 판매기준가 Decimal? @map(\"판매기준가\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 판매단가 Decimal? @map(\"판매단가\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 수량 BigInt? @map(\"수량\")\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 판매금액 Decimal? @map(\"판매금액\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 원화판매금액 Decimal? @map(\"원화판매금액\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 창고 String? @map(\"창고\") @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 납기일 String? @map(\"납기일\") @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 기타출고구분 String? @map(\"기타출고구분\") @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 진행상태 String? @map(\"진행상태\") @db.VarChar(5)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 매출진행상태 String? @map(\"매출진행상태\") @db.VarChar(5)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 매출대상 Boolean? @map(\"매출대상\")\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 매출금액계 Decimal? @map(\"매출금액계\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 미매출금액 Decimal? @map(\"미매출금액\") @db.Decimal\n  remarks      String? @db.VarChar(100)\n\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 특이사항 String? @map(\"특이사항\") @db.VarChar(100)\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_invoice_resc {\n  yyyymm       String? @db.VarChar(6)\n  actual       String? @db.VarChar(10)\n  site         String? @db.VarChar(4)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 선택 Boolean? @map(\"선택\")\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 출고처리 Boolean? @map(\"출고처리\")\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 사업단위 String? @map(\"사업단위\") @db.VarChar(5)\n  invoice_no   String? @db.VarChar(17)\n  invoice____  String? @map(\"invoice관리번호\") @db.VarChar(15)\n  invoice_date String? @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 수출구분 String? @map(\"수출구분\") @db.VarChar(8)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 출고구분 String? @map(\"출고구분\") @db.VarChar(8)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 가격조건 String? @map(\"가격조건\") @db.VarChar(5)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 부서 String? @map(\"부서\") @db.VarChar(15)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 담당자 String? @map(\"담당자\") @db.VarChar(13)\n  buyer        String? @db.VarChar(29)\n  agent        String? @db.VarChar(29)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 통화 String? @map(\"통화\") @db.VarChar(3)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 환율 Decimal? @map(\"환율\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 품명 String? @map(\"품명\") @db.VarChar(24)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 품번 String? @map(\"품번\") @db.VarChar(15)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 규격 String? @map(\"규격\") @db.VarChar(30)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 단위 String? @map(\"단위\") @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 판매기준가 Decimal? @map(\"판매기준가\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 판매단가 Decimal? @map(\"판매단가\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 수량 BigInt? @map(\"수량\")\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 판매금액 Decimal? @map(\"판매금액\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 원화판매금액 Decimal? @map(\"원화판매금액\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 창고 String? @map(\"창고\") @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 납기일 String? @map(\"납기일\") @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 기타출고구분 String? @map(\"기타출고구분\") @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 진행상태 String? @map(\"진행상태\") @db.VarChar(5)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 매출진행상태 String? @map(\"매출진행상태\") @db.VarChar(5)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 매출대상 Boolean? @map(\"매출대상\")\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 매출금액계 Decimal? @map(\"매출금액계\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 미매출금액 Decimal? @map(\"미매출금액\") @db.Decimal\n  remarks      String? @db.VarChar(100)\n\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 특이사항 String? @map(\"특이사항\") @db.VarChar(100)\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_maj_code {\n  maj_code_name String? @db.VarChar(20)\n  maj_code      String? @db.VarChar(3)\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_mat_amt {\n  yyyymm        String? @db.VarChar(6)\n  sel_code      String? @db.VarChar(6)\n  site          String? @db.VarChar(4)\n  mat_code      String? @db.VarChar(24)\n  in_qty        Float?\n  mat_unit_cost Float?\n  in_amt        Float?\n  cost_gubun    String? @db.VarChar(15)\n  mat_gubun     String? @db.VarChar(10)\n  mat_class     String? @db.VarChar(10)\n\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 자재대분류 String? @map(\"자재대분류\") @db.VarChar(17)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 소요량 Decimal? @map(\"소요량\") @db.Decimal\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_mat_amt_bak1118 {\n  yyyymm        String? @db.VarChar(6)\n  sel_code      String? @db.VarChar(6)\n  site          String? @db.VarChar(4)\n  mat_code      String? @db.VarChar(24)\n  in_qty        Float?\n  mat_unit_cost Float?\n  in_amt        Float?\n  cost_gubun    String? @db.VarChar(15)\n  mat_class     String? @db.VarChar(10)\n\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 자재대분류 String? @map(\"자재대분류\") @db.VarChar(17)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 소요량 Decimal? @map(\"소요량\") @db.Decimal\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_mat_cost {\n  yyyymm    String  @db.VarChar(6)\n  sel_code  String  @db.VarChar(10)\n  site      String  @db.VarChar(5)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 구분 String @map(\"구분\") @db.VarChar(4)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 도우모델 String? @map(\"도우모델\") @db.VarChar(8)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 자재번호 String? @map(\"자재번호\") @db.VarChar(34)\n  mat_class String? @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 자재대분류 String? @map(\"자재대분류\") @db.VarChar(17)\n  in_amt    Float?\n  in_qty    Int?\n\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 환산량 Decimal? @map(\"환산량\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 소요량 Decimal? @map(\"소요량\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 배부율 Decimal? @map(\"배부율\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 배부금액 Float? @map(\"배부금액\")\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 사용량 Decimal? @map(\"사용량\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 배부방식 String @map(\"배부방식\") @db.VarChar(4)\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_mat_cost_bak1201 {\n  yyyymm    String  @db.VarChar(6)\n  sel_code  String  @db.VarChar(10)\n  site      String  @db.VarChar(5)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 도우모델 String? @map(\"도우모델\") @db.VarChar(8)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 자재번호 String? @map(\"자재번호\") @db.VarChar(34)\n  mat_class String? @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 자재대분류 String? @map(\"자재대분류\") @db.VarChar(17)\n  in_amt    Float?\n  in_qty    Int?\n\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 환산량 Int? @map(\"환산량\")\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 소요량 Decimal? @map(\"소요량\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 배부율 Decimal? @map(\"배부율\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 배부금액 Decimal? @map(\"배부금액\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 사용량 Decimal? @map(\"사용량\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 배부방식 String? @map(\"배부방식\") @db.VarChar(10)\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_material_mast {\n  yyyy      String  @db.VarChar(10)\n  sel_code  String  @db.VarChar(10)\n  site      String  @db.VarChar(4)\n  mat_code  String  @db.VarChar(24)\n  mat_desc  String? @db.VarChar(50)\n  expen_sel String? @db.VarChar(10)\n  size      String? @db.VarChar(40)\n  unit      String? @db.VarChar(10)\n  mat_class String? @db.VarChar(10)\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_material_resc {\n  yyyymm       String   @db.VarChar(6)\n  sel_code     String   @db.VarChar(6)\n  site         String   @db.VarChar(4)\n  mat_code     String   @db.VarChar(24)\n  mat_desc     String?  @db.VarChar(50)\n  size         String?  @db.VarChar(40)\n  in_qty       Float?   @db.Real\n  unit_cost    Float?   @db.Real\n  in_amt       Decimal? @db.Decimal\n  cost_gubun   String?  @db.VarChar(15)\n  mat_gubun    String?  @db.VarChar(10)\n  mat_class    String?  @db.VarChar(10)\n  model        String   @db.VarChar(15)\n  model_n_type String   @db.VarChar(15)\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_material_resc_bak1118 {\n  yyyymm       String? @db.VarChar(6)\n  sel_code     String? @db.VarChar(6)\n  site         String? @db.VarChar(4)\n  mat_code     String? @db.VarChar(24)\n  mat_desc     String? @db.VarChar(50)\n  size         String? @db.VarChar(40)\n  in_qty       Float?  @db.Real\n  unit_cost    Float?  @db.Real\n  in_amt       Float?  @db.Real\n  cost_gubun   String? @db.VarChar(15)\n  mat_class    String? @db.VarChar(10)\n  model        String? @db.VarChar(15)\n  model_n_type String? @db.VarChar(15)\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_mfg_exp {\n  yyyymm         String  @db.VarChar(6)\n  sel_code       String  @db.VarChar(6)\n  site           String  @db.VarChar(4)\n  from_dept_code String  @db.VarChar(10)\n  from_dept_name String? @db.VarChar(50)\n  from_acct_code String  @db.VarChar(10)\n  from_acct_name String? @db.VarChar(50)\n  expen_sel      String? @db.VarChar(4)\n  expen_sel_name String? @db.VarChar(30)\n  acct_amt       BigInt?\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_model_mast {\n  yyyymm      String   @db.VarChar(10)\n  sel_code    String   @db.VarChar(10)\n  site        String   @db.VarChar(4)\n  model       String   @db.VarChar(10)\n  spec        String   @db.VarChar(76)\n  inch        Float?   @db.Real\n  glass_thick Float?   @db.Real\n  sheet       Float?   @db.Real\n  block       Float?   @db.Real\n  cell        Float?   @db.Real\n  run_size    Float?   @db.Real\n  x           Float?   @db.Real\n  y           Float?   @db.Real\n  xy          Decimal? @db.Decimal\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_okw_boh_test {\n  doi_yyyymm String   @db.VarChar(10)\n  doi_site   String   @db.VarChar(4)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 구분 String @map(\"구분\") @db.VarChar(2)\n  model      String   @db.VarChar(50)\n  model_type String   @db.VarChar(50)\n  stock      String   @db.VarChar(10)\n  boh        Int?\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 단가 Decimal? @map(\"단가\") @db.Decimal\n  boh_amt    Decimal? @db.Decimal\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_okw_stco_amt_test_new {\n  doi_yyyymm String   @db.VarChar(10)\n  doi_site   String   @db.VarChar(4)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 구분 String @map(\"구분\") @db.VarChar(2)\n  model      String   @db.VarChar(50)\n  model_type String   @db.VarChar(50)\n  boh        Int?\n  input      Int?\n  out        Int?\n  eoh        Int?\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 단가 Decimal? @map(\"단가\") @db.Decimal\n  boh_amt    Decimal? @db.Decimal\n  input_amt  Decimal? @db.Decimal\n  out_amt    Decimal? @db.Decimal\n  eoh_amt    Decimal? @db.Decimal\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_okw_test {\n  doi_yyyymm    String   @db.VarChar(10)\n  doi_site      String   @db.VarChar(4)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 구분 String @map(\"구분\") @db.VarChar(2)\n  model         String   @db.VarChar(10)\n  dist_rate     Decimal? @db.Decimal\n  doi_acct_name String?  @db.VarChar(30)\n  doi_sub_name  String?  @db.VarChar(50)\n  doi_item_name String?  @db.VarChar(50)\n  doi_expen_sel String   @db.VarChar(6)\n  boh_qty       Int?\n  in_qty        Int?\n  eoh_qty       Int?\n  out_qty       Int?\n  loss_qty      Int?\n  bad_qty       Int?\n  transfer_qty  Int?\n  unit_cost     Float?\n  boh           Decimal? @db.Decimal\n  in            Decimal? @db.Decimal\n  eoh           Decimal? @db.Decimal\n  out___        Float?   @map(\"out_단가\")\n  out           Decimal? @db.Decimal\n  out1          Decimal? @db.Decimal\n  loss          Decimal? @db.Decimal\n  bad           Decimal? @db.Decimal\n  transfer      Decimal? @db.Decimal\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_prod_in_menu {\n  prod_category String    @db.VarChar(5)\n  process_id    String    @db.VarChar(5)\n  revision      Int\n  create_date   DateTime? @db.Date\n  create_user   String?   @db.VarChar(13)\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_prod_lotrun {\n  yyyymm                String  @db.VarChar(6)\n  site                  String  @db.VarChar(2)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 구분 String @map(\"구분\") @db.VarChar(4)\n  ord                   String  @map(\"구분_ord\") @db.VarChar(1)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 도우코드 String @map(\"도우코드\") @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 도우모델 String? @map(\"도우모델\") @db.VarChar(8)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 작업구분 String? @map(\"작업구분\") @db.VarChar(2)\n  org____               String? @map(\"org작업구분\") @db.VarChar(10)\n  lotrun_no             String  @db.VarChar(30)\n  model                 String  @db.VarChar(30)\n  inch                  String  @db.VarChar(30)\n  site_n                String  @db.VarChar(50)\n  boh_month             Int?\n  in_month              Int?\n  bonus_month           Int\n  eoh_month             Int?\n  out_month             Int?\n  loss_month            Int?\n  ng_month              Int?\n  month                 Int?    @map(\"수율제외_month\")\n  rework___month        Int?    @map(\"rework진행_month\")\n  shipping_plan_month   Int\n  shipping_actual_month Int\n  material_loss         Int\n  recall_loss           Int\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_prod_subul {\n  yyyymm                String  @db.VarChar(6)\n  sel_code              String  @db.VarChar(10)\n  dw_site               String  @db.VarChar(5)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 구분 String @map(\"구분\") @db.VarChar(4)\n  ord                   String  @map(\"구분_ord\") @db.VarChar(1)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 도우코드 String @map(\"도우코드\") @db.VarChar(10)\n  model_n_type          String  @db.VarChar(18)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 도우모델 String? @map(\"도우모델\") @db.VarChar(8)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 작업구분 String? @map(\"작업구분\") @db.VarChar(2)\n  org____               String? @map(\"org작업구분\") @db.VarChar(10)\n  model                 String  @db.VarChar(30)\n  inch                  String  @db.VarChar(30)\n  site                  String  @db.VarChar(50)\n  boh_month             Float?\n  in_month              Int?\n  bonus_month           Int\n  eoh_month             Float?\n  out_month             Int?\n  loss_month            Int?\n  ng_month              Int?\n  month                 Int?    @map(\"수율제외_month\")\n  rework___month        Int?    @map(\"rework진행_month\")\n  shipping_plan_month   Int\n  shipping_actual_month Int\n  material_loss         Int\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_prod_subul_202510 {\n  yyyymm                String  @db.VarChar(6)\n  sel_code              String  @db.VarChar(10)\n  dw_site               String  @db.VarChar(5)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 구분 String @map(\"구분\") @db.VarChar(4)\n  ord                   String  @map(\"구분_ord\") @db.VarChar(1)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 도우코드 String @map(\"도우코드\") @db.VarChar(10)\n  model_n_type          String  @db.VarChar(18)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 도우모델 String? @map(\"도우모델\") @db.VarChar(8)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 작업구분 String? @map(\"작업구분\") @db.VarChar(2)\n  org____               String? @map(\"org작업구분\") @db.VarChar(10)\n  model                 String  @db.VarChar(30)\n  inch                  String  @db.VarChar(30)\n  site                  String  @db.VarChar(50)\n  boh_month             Float?\n  in_month              Int?\n  bonus_month           Int\n  eoh_month             Float?\n  out_month             Int?\n  loss_month            Int?\n  ng_month              Int?\n  month                 Int?    @map(\"수율제외_month\")\n  rework___month        Int?    @map(\"rework진행_month\")\n  shipping_plan_month   Int\n  shipping_actual_month Int\n  material_loss         Int\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_prod_subul_old {\n  yyyymm                String  @db.VarChar(8)\n  sel_code              String  @db.VarChar(8)\n  site                  String  @db.VarChar(8)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 구분 String? @map(\"구분\") @db.VarChar(2)\n  ord                   String? @map(\"구분_ord\") @db.VarChar(2)\n  model_n_type          String  @db.VarChar(12)\n  model                 String  @db.VarChar(10)\n  worktype              String  @db.VarChar(2)\n  model_name            String? @db.VarChar(20)\n  inch                  String? @db.VarChar(8)\n  sale_site             String? @db.VarChar(18)\n  boh_month             Float?  @db.Real\n  in_month              Float?  @db.Real\n  bonus_month           Float?  @db.Real\n  eoh_month             Float?  @db.Real\n  out_month             Float?  @db.Real\n  loss_month            Float?  @db.Real\n  ng_month              Float?  @db.Real\n  month                 Float?  @map(\"수율제외_month\") @db.Real\n  rework___month        Float?  @map(\"rework진행_month\") @db.Real\n  shipping_plan_month   Float?  @db.Real\n  shipping_actual_month Float?  @db.Real\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_rma_inout {\n  yyyymm   String? @db.VarChar(10)\n  sel_code String  @db.VarChar(10)\n  site     String  @db.VarChar(4)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 모델명 String @map(\"모델명\") @db.VarChar(10)\n  rma_in   Int?\n  rma_out  Int?\n\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 생성자 String? @map(\"생성자\") @db.VarChar(20)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 생성시각 DateTime? @map(\"생성시각\") @db.Timestamp(6)\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_rnd {\n  yyyymm         String  @db.VarChar(6)\n  sel_code       String  @db.VarChar(6)\n  site           String  @db.VarChar(4)\n  from_dept_code String  @db.VarChar(10)\n  from_dept_name String? @db.VarChar(50)\n  from_acct_code String  @db.VarChar(10)\n  from_acct_name String? @db.VarChar(50)\n  expen_sel      String? @db.VarChar(4)\n  expen_sel_name String? @db.VarChar(30)\n  acct_amt       BigInt?\n  cost_type      String? @db.VarChar(20)\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_rnd_subul {\n  yyyymm                String  @db.VarChar(6)\n  sel_code              String  @db.VarChar(10)\n  dw_site               String  @db.VarChar(5)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 구분 String @map(\"구분\") @db.VarChar(4)\n  ord                   String  @map(\"구분_ord\") @db.VarChar(1)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 도우코드 String @map(\"도우코드\") @db.VarChar(10)\n  model_n_type          String  @db.VarChar(18)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 도우모델 String? @map(\"도우모델\") @db.VarChar(8)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 작업구분 String? @map(\"작업구분\") @db.VarChar(2)\n  org____               String? @map(\"org작업구분\") @db.VarChar(10)\n  model                 String  @db.VarChar(30)\n  inch                  String  @db.VarChar(30)\n  site                  String  @db.VarChar(50)\n  boh_month             Float?\n  in_month              Int?\n  bonus_month           Int\n  eoh_month             Float?\n  out_month             Int?\n  loss_month            Int?\n  ng_month              Int?\n  month                 Int?    @map(\"수율제외_month\")\n  rework___month        Int?    @map(\"rework진행_month\")\n  shipping_plan_month   Int\n  shipping_actual_month Int\n  material_loss         Int\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_sale_raw {\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 선택 String? @map(\"선택\") @db.VarChar(1)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 출고처리 String? @map(\"출고처리\") @db.VarChar(1)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 사업단위 String? @map(\"사업단위\") @db.VarChar(5)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 거래명세서번호 String? @map(\"거래명세서번호\") @db.VarChar(12)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 거래명세서일 String? @map(\"거래명세서일\") @db.VarChar(10)\n  local__ String? @map(\"local구분\") @db.VarChar(20)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 출고구분 String? @map(\"출고구분\") @db.VarChar(8)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 부서 String? @map(\"부서\") @db.VarChar(14)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 담당자 String? @map(\"담당자\") @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 청구처 String? @map(\"청구처\") @db.VarChar(18)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 거래처 String? @map(\"거래처\") @db.VarChar(18)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 유통구조 String? @map(\"유통구조\") @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 거래처번호 String? @map(\"거래처번호\") @db.VarChar(11)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 중개인 String? @map(\"중개인\") @db.VarChar(12)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 납품장소 String? @map(\"납품장소\") @db.VarChar(13)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 인도조건 String? @map(\"인도조건\") @db.VarChar(14)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 판매후보관 String? @map(\"판매후보관\") @db.VarChar(15)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 위탁 String? @map(\"위탁\") @db.VarChar(16)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 납품거래처 String? @map(\"납품거래처\") @db.VarChar(17)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 납기일 String? @map(\"납기일\") @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 품명 String? @map(\"품명\") @db.VarChar(5)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 품번 String? @map(\"품번\") @db.VarChar(6)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 규격 String? @map(\"규격\") @db.VarChar(25)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 판매단위 String? @map(\"판매단위\") @db.VarChar(4)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 판매기준가 Decimal? @map(\"판매기준가\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 수량 Int? @map(\"수량\")\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 부가세포함 String? @map(\"부가세포함\") @db.VarChar(1)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 통화 String? @map(\"통화\") @db.VarChar(5)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 환율 Decimal? @map(\"환율\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 판매단가 Decimal? @map(\"판매단가\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 판매금액 Decimal? @map(\"판매금액\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 부가세액 Decimal? @map(\"부가세액\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 판매금액계 Decimal? @map(\"판매금액계\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 원화판매금액 Decimal? @map(\"원화판매금액\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 원화부가세액 Decimal? @map(\"원화부가세액\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 원화판매금액계 Decimal? @map(\"원화판매금액계\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 창고 String? @map(\"창고\") @db.VarChar(16)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 보관위치 String? @map(\"보관위치\") @db.VarChar(15)\n  lot_no  String? @db.VarChar(30)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 세금계산서_진행상태 String? @map(\"세금계산서_진행상태\") @db.VarChar(5)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 배송상태 String? @map(\"배송상태\") @db.VarChar(5)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 품목특이사항 String? @map(\"품목특이사항\") @db.VarChar(145)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 매출시점 String? @map(\"매출시점\") @db.VarChar(17)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 진행조회 String? @map(\"진행조회\") @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 원천조회 String? @map(\"원천조회\") @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 원천관리번호 String? @map(\"원천관리번호\") @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 원천번호 String? @map(\"원천번호\") @db.VarChar(10)\n  po_no   String? @db.VarChar(10)\n\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 반품 String? @map(\"반품\") @db.VarChar(1)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 매출수량 Int? @map(\"매출수량\")\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 매출금액계 Decimal? @map(\"매출금액계\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 미매출금액 Decimal? @map(\"미매출금액\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 세금계산서금액계 Decimal? @map(\"세금계산서금액계\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 계산서미발행액 Decimal? @map(\"계산서미발행액\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 계산서미발행수량 Int? @map(\"계산서미발행수량\")\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 기타출고구분 String? @map(\"기타출고구분\") @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 품목자산분류 String? @map(\"품목자산분류\") @db.VarChar(12)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 단가소급여부 String? @map(\"단가소급여부\") @db.VarChar(1)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 수량(단가소급) Int? @map(\"수량(단가소급)\")\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 유상사급여부 String? @map(\"유상사급여부\") @db.VarChar(1)\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_sale_resc {\n  yyyymm   String  @db.VarChar(10)\n  sel_code String  @db.VarChar(10)\n  site     String  @db.VarChar(4)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 선택 String? @map(\"선택\") @db.VarChar(1)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 출고처리 String? @map(\"출고처리\") @db.VarChar(1)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 사업단위 String? @map(\"사업단위\") @db.VarChar(5)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 거래명세서번호 String @map(\"거래명세서번호\") @db.VarChar(12)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 거래명세서일 String? @map(\"거래명세서일\") @db.VarChar(10)\n  local__  String? @map(\"local구분\") @db.VarChar(20)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 출고구분 String? @map(\"출고구분\") @db.VarChar(8)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 부서 String? @map(\"부서\") @db.VarChar(14)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 담당자 String? @map(\"담당자\") @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 청구처 String? @map(\"청구처\") @db.VarChar(18)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 거래처 String? @map(\"거래처\") @db.VarChar(18)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 유통구조 String? @map(\"유통구조\") @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 거래처번호 String? @map(\"거래처번호\") @db.VarChar(11)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 중개인 String? @map(\"중개인\") @db.VarChar(12)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 납품장소 String? @map(\"납품장소\") @db.VarChar(13)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 인도조건 String? @map(\"인도조건\") @db.VarChar(14)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 판매후보관 String? @map(\"판매후보관\") @db.VarChar(15)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 위탁 String? @map(\"위탁\") @db.VarChar(16)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 납품거래처 String? @map(\"납품거래처\") @db.VarChar(17)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 납기일 String? @map(\"납기일\") @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 품명 String? @map(\"품명\") @db.VarChar(5)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 품번 String? @map(\"품번\") @db.VarChar(6)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 규격 String? @map(\"규격\") @db.VarChar(25)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 판매단위 String? @map(\"판매단위\") @db.VarChar(4)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 판매기준가 Decimal? @map(\"판매기준가\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 수량 Int? @map(\"수량\")\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 부가세포함 String? @map(\"부가세포함\") @db.VarChar(1)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 통화 String? @map(\"통화\") @db.VarChar(5)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 환율 Decimal? @map(\"환율\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 판매단가 Decimal? @map(\"판매단가\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 판매금액 Decimal? @map(\"판매금액\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 부가세액 Decimal? @map(\"부가세액\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 판매금액계 Decimal? @map(\"판매금액계\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 원화판매금액 Decimal? @map(\"원화판매금액\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 원화부가세액 Decimal? @map(\"원화부가세액\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 원화판매금액계 Decimal? @map(\"원화판매금액계\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 창고 String? @map(\"창고\") @db.VarChar(16)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 보관위치 String? @map(\"보관위치\") @db.VarChar(15)\n  lot_no   String? @db.VarChar(30)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 세금계산서_진행상태 String? @map(\"세금계산서_진행상태\") @db.VarChar(5)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 배송상태 String? @map(\"배송상태\") @db.VarChar(5)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 품목특이사항 String? @map(\"품목특이사항\") @db.VarChar(145)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 매출시점 String? @map(\"매출시점\") @db.VarChar(17)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 진행조회 String? @map(\"진행조회\") @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 원천조회 String? @map(\"원천조회\") @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 원천관리번호 String? @map(\"원천관리번호\") @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 원천번호 String? @map(\"원천번호\") @db.VarChar(10)\n  po_no    String? @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 반품 String? @map(\"반품\") @db.VarChar(1)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 매출수량 Int? @map(\"매출수량\")\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 매출금액계 Decimal? @map(\"매출금액계\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 미매출금액 Decimal? @map(\"미매출금액\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 세금계산서금액계 Decimal? @map(\"세금계산서금액계\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 계산서미발행액 Decimal? @map(\"계산서미발행액\") @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 계산서미발행수량 Int? @map(\"계산서미발행수량\")\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 기타출고구분 String? @map(\"기타출고구분\") @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 품목자산분류 String? @map(\"품목자산분류\") @db.VarChar(12)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 단가소급여부 String? @map(\"단가소급여부\") @db.VarChar(1)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 수량(단가소급) Int? @map(\"수량(단가소급)\")\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 유상사급여부 String? @map(\"유상사급여부\") @db.VarChar(1)\n  seq_no   BigInt\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_sga {\n  yyyymm         String  @db.VarChar(6)\n  sel_code       String  @db.VarChar(6)\n  site           String  @db.VarChar(4)\n  from_dept_code String  @db.VarChar(10)\n  from_dept_name String? @db.VarChar(50)\n  from_acct_code String  @db.VarChar(10)\n  from_acct_name String? @db.VarChar(50)\n  expen_sel      String? @db.VarChar(4)\n  expen_sel_name String? @db.VarChar(30)\n  acct_amt       BigInt?\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_slco {\n  yyyymm     String   @db.VarChar(10)\n  site       String   @db.VarChar(4)\n  sel_code   String   @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 구분 String @map(\"구분\") @db.VarChar(4)\n  model      String   @db.VarChar(50)\n  expen_sel  String   @db.VarChar(6)\n  expen_sel_ String?  @map(\"expen_sel명\") @db.VarChar(30)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 거래처 String @map(\"거래처\") @db.VarChar(28)\n  out_qty    Decimal? @db.Decimal\n  out_amt    Decimal? @db.Decimal\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_smce_cost {\n  yyyymm       String   @db.VarChar(6)\n  sel_code     String   @db.VarChar(6)\n  site         String   @db.VarChar(4)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 구분 String @map(\"구분\") @db.VarChar(4)\n  model        String?  @db.VarChar(15)\n  expen_sel_   String?  @map(\"expen_sel명\") @db.VarChar(30)\n  sub_name     String?  @db.VarChar(30)\n  item_name    String?  @db.VarChar(18)\n  expen_sel    String?  @db.VarChar(4)\n  tot_acct     Int?\n  sale_amt     Decimal? @db.Decimal\n  tot_amt      Decimal? @db.Decimal\n  tot_smce     Int?\n  dist_rate    Decimal? @db.Decimal\n  dist_amt     Decimal? @db.Decimal\n  dist_amt_ori Float?   @db.Real\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_stco {\n  yyyymm     String   @db.VarChar(10)\n  site       String   @db.VarChar(4)\n  sel_code   String   @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 구분 String @map(\"구분\") @db.VarChar(4)\n  model      String   @db.VarChar(50)\n  expen_sel  String   @db.VarChar(6)\n  expen_sel_ String?  @map(\"expen_sel명\") @db.VarChar(30)\n  boh        Int?\n  input      Int?\n  out        Int?\n  eoh        Int?\n  boh_amt    Decimal? @db.Decimal\n  in_amt     Decimal? @db.Decimal\n  eoh_amt    Decimal? @db.Decimal\n  out_amt    Decimal? @db.Decimal\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_stock {\n  yyyymm       String @db.VarChar(10)\n  sel_code     String @db.VarChar(10)\n  site         String @db.VarChar(4)\n  model        String @db.VarChar(50)\n  model_type   String @db.VarChar(50)\n  stock        String @db.VarChar(10)\n  boh          Int?\n  input        Int?\n  out          Int?\n  eoh          Int?\n  input_etc    Int?\n  input_moving Int?\n  input_prod   Int?\n  out_sheet    Int?\n  out_return   Int?\n  out_invoice  Int?\n  out_etc      Int?\n  out_moving   Int?\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_stock_boh {\n  yyyymm     String   @db.VarChar(10)\n  site       String   @db.VarChar(4)\n  sel_code   String   @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 구분 String @map(\"구분\") @db.VarChar(4)\n  model      String   @db.VarChar(50)\n  model_type String   @db.VarChar(50)\n  expen_sel  String?  @db.VarChar(6)\n  expen_sel_ String?  @map(\"expen_sel명\") @db.VarChar(30)\n  stock      String   @db.VarChar(10)\n  boh_amt    Decimal? @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 조건 String @map(\"조건\") @db.VarChar(7)\n  inch       Float?   @db.Real\n  boh        Int?\n  out___     Decimal? @map(\"out_단가\") @db.Decimal\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_stock_boh_old_1110 {\n  yyyymm     String   @db.VarChar(10)\n  site       String   @db.VarChar(4)\n  sel_code   String   @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 구분 String @map(\"구분\") @db.VarChar(4)\n  model      String   @db.VarChar(50)\n  model_type String   @db.VarChar(50)\n  stock      String   @db.VarChar(10)\n  boh_amt    Decimal? @db.Decimal\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 조건 String @map(\"조건\") @db.VarChar(7)\n  inch       Float?   @db.Real\n  boh        Int?\n  out___     Decimal? @map(\"out_단가\") @db.Decimal\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_stock_cost_old {\n  yyyymm   String   @db.VarChar(10)\n  site     String   @db.VarChar(4)\n  sel_code String   @db.VarChar(10)\n  /// This field was commented out because of an invalid name. Please provide a valid one that matches [a-zA-Z][a-zA-Z0-9_]*\n  // 구분 String @map(\"구분\") @db.VarChar(4)\n  model    String   @db.VarChar(50)\n  boh      Int?\n  input    Int?\n  out      Int?\n  eoh      Int?\n  boh_amt  Decimal? @db.Decimal\n  in_amt   Decimal? @db.Decimal\n  eoh_amt  Decimal? @db.Decimal\n  out_amt  Decimal? @db.Decimal\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel doi_vncst_rate {\n  yyyymm   String   @db.VarChar(10)\n  sel_code String   @db.VarChar(10)\n  site     String   @db.VarChar(4)\n  cst_no   String   @db.VarChar(10)\n  rate     Decimal? @db.Decimal\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel new_doi_cost_monthly_dept_cost {\n  base_ym         String    @db.VarChar(6)\n  dept_code       String    @db.VarChar(20)\n  account_code    String    @db.VarChar(20)\n  current_amount  Decimal?  @db.Decimal\n  previous_amount Decimal?  @db.Decimal\n  variance_amount Decimal?  @db.Decimal\n  variance_rate   Decimal?  @db.Decimal\n  reg_dt          DateTime? @db.Timestamp(6)\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel new_doi_demo_employee {\n  emp_id       Int\n  dept_name    String    @db.VarChar(50)\n  dept_name_en String?   @db.VarChar(50)\n  emp_name     String    @db.VarChar(50)\n  position     String?   @db.VarChar(20)\n  hire_date    DateTime? @db.Date\n  salary       Int?\n  created_at   DateTime? @db.Timestamp(6)\n  updated_at   DateTime? @db.Timestamp(6)\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel new_doi_demo_orders {\n  order_id     Int\n  order_no     String    @db.VarChar(20)\n  customer_id  String    @db.VarChar(20)\n  country      String?   @db.VarChar(50)\n  company_name String?   @db.VarChar(100)\n  employee_id  String?   @db.VarChar(20)\n  order_date   DateTime? @db.Date\n  phone        String?   @db.VarChar(20)\n  created_at   DateTime? @db.Timestamp(6)\n  updated_at   DateTime? @db.Timestamp(6)\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel new_doi_demo_sales {\n  sales_id         Int\n  year             String    @db.VarChar(10)\n  quarter          String    @db.VarChar(10)\n  month            String    @db.VarChar(10)\n  region           String    @db.VarChar(50)\n  category         String?   @db.VarChar(50)\n  target_amount    BigInt?\n  actual_amount    BigInt?\n  achievement_rate Decimal?  @db.Decimal\n  created_at       DateTime? @db.Timestamp(6)\n  updated_at       DateTime? @db.Timestamp(6)\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel new_doi_prd_result {\n  result_id      String    @db.VarChar(20)\n  prd_date       DateTime  @db.Date\n  factory_cd     String    @db.VarChar(10)\n  line_cd        String    @db.VarChar(10)\n  shift_cd       String?   @db.VarChar(2)\n  item_cd        String    @db.VarChar(20)\n  item_nm        String?   @db.VarChar(100)\n  spec           String?   @db.VarChar(100)\n  unit           String?   @db.VarChar(10)\n  plan_qty       Decimal?  @db.Decimal\n  prod_qty       Decimal?  @db.Decimal\n  good_qty       Decimal?  @db.Decimal\n  defect_qty     Decimal?  @db.Decimal\n  defect_type    String?   @db.VarChar(50)\n  defect_reason  String?   @db.VarChar(200)\n  start_time     DateTime? @db.Timestamp(6)\n  end_time       DateTime? @db.Timestamp(6)\n  work_time      Int?\n  stop_time      Int?\n  worker_id      String?   @db.VarChar(20)\n  worker_nm      String?   @db.VarChar(50)\n  team_cd        String?   @db.VarChar(10)\n  inspect_yn     String?   @db.Char(1)\n  inspect_result String?   @db.VarChar(10)\n  inspector_id   String?   @db.VarChar(20)\n  remark         String?   @db.VarChar(500)\n  status         String?   @db.VarChar(10)\n  confirm_yn     String?   @db.Char(1)\n  reg_id         String?   @db.VarChar(20)\n  reg_dt         DateTime? @db.Timestamp(6)\n  upd_id         String?   @db.VarChar(20)\n  upd_dt         DateTime? @db.Timestamp(6)\n\n  @@ignore\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel new_doi_sys_menu {\n  menu_id    String    @db.VarChar(20)\n  up_menu_id String?   @db.VarChar(20)\n  menu_nm    String    @db.VarChar(100)\n  menu_url   String?   @db.VarChar(200)\n  sort_no    Int?\n  use_yn     String?   @db.Char(1)\n  icon_cls   String?   @db.VarChar(50)\n  reg_dt     DateTime? @db.Timestamp(6)\n\n  @@ignore\n}\n\nmodel post {\n  id        Int      @id(map: \"Post_pkey\") @default(autoincrement())\n  name      String\n  createdAt DateTime @default(now())\n  updatedAt DateTime\n\n  @@index([name], map: \"Post_name_idx\")\n}\n\nmodel product {\n  id          Int      @id(map: \"Product_pkey\") @default(autoincrement())\n  productCode String   @unique(map: \"Product_productCode_key\") @db.VarChar(50)\n  productName String   @db.VarChar(200)\n  category    String   @db.VarChar(100)\n  price       Decimal  @db.Decimal(18, 2)\n  stock       Int      @default(0)\n  description String?\n  isActive    Boolean  @default(true)\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime\n  createdBy   String?  @db.VarChar(50)\n  updatedBy   String?  @db.VarChar(50)\n\n  @@index([category], map: \"Product_category_idx\")\n  @@index([isActive], map: \"Product_isActive_idx\")\n  @@index([productCode], map: \"Product_productCode_idx\")\n}\n\n// ============================================================\n// 시스템 메뉴 테이블\n// ============================================================\nmodel sys_menu {\n  menu_id      String   @id @db.VarChar(20)\n  parent_id    String?  @db.VarChar(20)\n  menu_level   Int      @default(1) @db.SmallInt\n  sort_order   Int      @default(0)\n  menu_name    String   @db.VarChar(100)\n  menu_name_en String?  @db.VarChar(100)\n  menu_path    String?  @db.VarChar(200)\n  menu_icon    String?  @db.VarChar(50)\n  screen_id    String?  @db.VarChar(20)\n  screen_type  String   @default(\"list\") @db.VarChar(20)\n  is_active    Boolean  @default(true)\n  is_visible   Boolean  @default(true)\n  badge_text   String?  @db.VarChar(20)\n  badge_type   String?  @db.VarChar(20)\n  created_by   String?  @db.VarChar(50)\n  created_at   DateTime @default(now())\n  updated_by   String?  @db.VarChar(50)\n  updated_at   DateTime @default(now()) @updatedAt\n\n  // Self-relation for parent-child\n  parent   sys_menu?  @relation(\"MenuHierarchy\", fields: [parent_id], references: [menu_id])\n  children sys_menu[] @relation(\"MenuHierarchy\")\n\n  // Relation to menu_role\n  menu_roles sys_menu_role[]\n\n  @@index([parent_id], map: \"idx_menu_parent\")\n  @@index([menu_level], map: \"idx_menu_level\")\n  @@index([menu_path], map: \"idx_menu_path\")\n  @@index([sort_order], map: \"idx_menu_sort\")\n}\n\n// ============================================================\n// 역할(권한 그룹) 테이블\n// ============================================================\nmodel sys_role {\n  role_id    String   @id @db.VarChar(20)\n  role_name  String   @db.VarChar(50)\n  role_desc  String?  @db.VarChar(200)\n  is_active  Boolean  @default(true)\n  created_at DateTime @default(now())\n\n  // Relation to menu_role\n  menu_roles sys_menu_role[]\n}\n\n// ============================================================\n// 메뉴-역할 매핑 테이블 (권한 관리)\n// ============================================================\nmodel sys_menu_role {\n  id         Int      @id @default(autoincrement())\n  menu_id    String   @db.VarChar(20)\n  role_id    String   @db.VarChar(20)\n  can_read   Boolean  @default(true)\n  can_create Boolean  @default(false)\n  can_update Boolean  @default(false)\n  can_delete Boolean  @default(false)\n  can_export Boolean  @default(false)\n  can_print  Boolean  @default(false)\n  created_at DateTime @default(now())\n\n  // Relations\n  menu sys_menu @relation(fields: [menu_id], references: [menu_id])\n  role sys_role @relation(fields: [role_id], references: [role_id])\n\n  @@unique([menu_id, role_id], map: \"uk_menu_role\")\n  @@index([menu_id], map: \"idx_menu_role_menu\")\n  @@index([role_id], map: \"idx_menu_role_role\")\n}\n",
    "inlineSchemaHash": "f11f7ac873d04367bd76985cdebfafe0b6cd8974c8f37165e4b2c49b4a00a5d1",
    "copyEngine": true
};
const fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
config.dirname = ("TURBOPACK compile-time value", "/ROOT/generated/prisma");
if (!fs.existsSync(path.join(("TURBOPACK compile-time value", "/ROOT/generated/prisma"), 'schema.prisma'))) {
    const alternativePaths = [
        "generated/prisma",
        "prisma"
    ];
    const alternativePath = alternativePaths.find((altPath)=>{
        return fs.existsSync(path.join(process.cwd(), altPath, 'schema.prisma'));
    }) ?? alternativePaths[0];
    config.dirname = path.join(process.cwd(), alternativePath);
    config.isBundled = true;
}
config.runtimeDataModel = JSON.parse("{\"models\":{\"Product\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"productCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"productName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"200\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"category\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"price\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"10\",\"2\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"stock\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isActive\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdBy\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedBy\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"post\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"product\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"productCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"productName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"200\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"category\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"price\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"18\",\"2\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"stock\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isActive\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdBy\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedBy\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"sys_menu\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"menu_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"20\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"parent_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"20\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"menu_level\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":[\"SmallInt\",[]],\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sort_order\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"menu_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"menu_name_en\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"menu_path\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"200\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"menu_icon\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"screen_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"20\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"screen_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"20\"]],\"default\":\"list\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"is_active\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"is_visible\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"badge_text\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"20\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"badge_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"20\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_by\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_by\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"parent\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"sys_menu\",\"nativeType\":null,\"relationName\":\"MenuHierarchy\",\"relationFromFields\":[\"parent_id\"],\"relationToFields\":[\"menu_id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"children\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"sys_menu\",\"nativeType\":null,\"relationName\":\"MenuHierarchy\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"menu_roles\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"sys_menu_role\",\"nativeType\":null,\"relationName\":\"sys_menuTosys_menu_role\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"sys_role\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"role_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"20\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role_desc\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"200\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"is_active\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"menu_roles\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"sys_menu_role\",\"nativeType\":null,\"relationName\":\"sys_menu_roleTosys_role\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"sys_menu_role\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"menu_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"20\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"20\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"can_read\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"can_create\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"can_update\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"can_delete\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"can_export\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"can_print\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"menu\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"sys_menu\",\"nativeType\":null,\"relationName\":\"sys_menuTosys_menu_role\",\"relationFromFields\":[\"menu_id\"],\"relationToFields\":[\"menu_id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"sys_role\",\"nativeType\":null,\"relationName\":\"sys_menu_roleTosys_role\",\"relationFromFields\":[\"role_id\"],\"relationToFields\":[\"role_id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"menu_id\",\"role_id\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"menu_id\",\"role_id\"]}],\"isGenerated\":false}},\"enums\":{},\"types\":{}}");
defineDmmfProperty(exports.Prisma, config.runtimeDataModel);
config.engineWasm = undefined;
config.compilerWasm = undefined;
const { warnEnvConflicts } = __turbopack_context__.r("[project]/generated/prisma/runtime/library.js [app-route] (ecmascript)");
warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.schemaEnvPath)
});
const PrismaClient = getPrismaClient(config);
exports.PrismaClient = PrismaClient;
Object.assign(exports, Prisma);
// file annotations for bundling tools to include these files
path.join(("TURBOPACK compile-time value", "/ROOT/generated/prisma"), "libquery_engine-debian-openssl-3.0.x.so.node");
path.join(process.cwd(), "generated/prisma/libquery_engine-debian-openssl-3.0.x.so.node");
// file annotations for bundling tools to include these files
path.join(("TURBOPACK compile-time value", "/ROOT/generated/prisma"), "schema.prisma");
path.join(process.cwd(), "generated/prisma/schema.prisma");
}),
"[project]/src/server/utils/queryLogger.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createQueryTimer",
    ()=>createQueryTimer,
    "default",
    ()=>__TURBOPACK__default__export__,
    "logMessage",
    ()=>logMessage,
    "logQuery",
    ()=>logQuery
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
/**
 * DB Query Logger
 * 
 * 일별 쿼리 로그 파일 생성
 * 형식: /logs/query-YYYY-MM-DD.log
 */ const LOG_DIR = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](process.cwd(), 'logs');
// 로그 디렉토리 생성
function ensureLogDir() {
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["existsSync"](LOG_DIR)) {
        __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["mkdirSync"](LOG_DIR, {
            recursive: true
        });
    }
}
// 오늘 날짜 문자열 (YYYY-MM-DD)
function getDateString() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
// 현재 시간 문자열 (HH:mm:ss.SSS)
function getTimeString() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ms = String(now.getMilliseconds()).padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${ms}`;
}
// 로그 파일 경로
function getLogFilePath() {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](LOG_DIR, `query-${getDateString()}.log`);
}
// 로그 쓰기
function writeLog(content) {
    ensureLogDir();
    const logPath = getLogFilePath();
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["appendFileSync"](logPath, content + '\n', 'utf-8');
}
// 쿼리 포맷팅 (가독성을 위해)
function formatQuery(query) {
    return query.replace(/\s+/g, ' ').trim();
}
// 파라미터 포맷팅
function formatParams(params) {
    if (!params) return '';
    try {
        if (Array.isArray(params) && params.length === 0) return '';
        return JSON.stringify(params, null, 2);
    } catch  {
        return String(params);
    }
}
function logQuery(query, params, durationMs, error) {
    const timestamp = `[${getDateString()} ${getTimeString()}]`;
    const duration = durationMs !== undefined ? `[${durationMs}ms]` : '';
    const status = error ? '[ERROR]' : '[OK]';
    let logEntry = `${'='.repeat(80)}\n`;
    logEntry += `${timestamp} ${status} ${duration}\n`;
    logEntry += `${'─'.repeat(80)}\n`;
    logEntry += `QUERY:\n${formatQuery(query)}\n`;
    const formattedParams = formatParams(params);
    if (formattedParams) {
        logEntry += `${'─'.repeat(40)}\n`;
        logEntry += `PARAMS:\n${formattedParams}\n`;
    }
    if (error) {
        logEntry += `${'─'.repeat(40)}\n`;
        logEntry += `ERROR:\n${error.message}\n`;
        if (error.stack) {
            logEntry += `STACK:\n${error.stack}\n`;
        }
    }
    writeLog(logEntry);
}
function logMessage(level, message) {
    const timestamp = `[${getDateString()} ${getTimeString()}]`;
    const logEntry = `${timestamp} [${level}] ${message}`;
    writeLog(logEntry);
}
function createQueryTimer() {
    const startTime = Date.now();
    return {
        getElapsed: ()=>Date.now() - startTime
    };
}
const __TURBOPACK__default__export__ = {
    logQuery,
    logMessage,
    createQueryTimer
};
}),
"[project]/src/server/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "db",
    ()=>db,
    "ensureSearchPath",
    ()=>ensureSearchPath
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$env$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/env.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$generated$2f$prisma$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/generated/prisma/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$utils$2f$queryLogger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/utils/queryLogger.ts [app-route] (ecmascript)");
;
;
;
const createPrismaClient = ()=>{
    const prisma = new __TURBOPACK__imported__module__$5b$project$5d2f$generated$2f$prisma$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrismaClient"]({
        log: [
            {
                level: 'query',
                emit: 'event'
            },
            {
                level: 'error',
                emit: 'event'
            },
            {
                level: 'warn',
                emit: 'event'
            },
            {
                level: 'info',
                emit: 'event'
            }
        ]
    });
    // 쿼리 이벤트 로깅
    prisma.$on('query', (e)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$utils$2f$queryLogger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logQuery"])(e.query, e.params, Number(e.duration));
    });
    // 에러 이벤트 로깅
    prisma.$on('error', (e)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$utils$2f$queryLogger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logMessage"])('ERROR', e.message);
    });
    // 경고 이벤트 로깅
    prisma.$on('warn', (e)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$utils$2f$queryLogger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logMessage"])('WARN', e.message);
    });
    // 정보 이벤트 로깅
    prisma.$on('info', (e)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$utils$2f$queryLogger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logMessage"])('INFO', e.message);
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$utils$2f$queryLogger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logMessage"])('INFO', 'Prisma client initialized with query logging');
    return prisma;
};
const globalForPrisma = globalThis;
const db = globalForPrisma.prisma ?? createPrismaClient();
async function ensureSearchPath() {
    if (!globalForPrisma.searchPathSet) {
        try {
            await db.$executeRawUnsafe("SET search_path TO public, binary");
            globalForPrisma.searchPathSet = true;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$utils$2f$queryLogger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logMessage"])('INFO', 'search_path set to: public, binary');
        } catch (error) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$utils$2f$queryLogger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logMessage"])('ERROR', `Failed to set search_path: ${error}`);
        }
    }
}
if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$env$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].NODE_ENV !== "production") globalForPrisma.prisma = db;
}),
"[project]/src/server/api/trpc.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */ __turbopack_context__.s([
    "createCallerFactory",
    ()=>createCallerFactory,
    "createTRPCContext",
    ()=>createTRPCContext,
    "createTRPCRouter",
    ()=>createTRPCRouter,
    "publicProcedure",
    ()=>publicProcedure
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$initTRPC$2d$DGaJyg8t$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@trpc/server/dist/initTRPC-DGaJyg8t.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superjson$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/superjson/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$ZodError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/ZodError.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/db.ts [app-route] (ecmascript)");
;
;
;
;
const createTRPCContext = async (opts)=>{
    return {
        db: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"],
        ...opts
    };
};
/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */ const t = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$initTRPC$2d$DGaJyg8t$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["initTRPC"].context().create({
    transformer: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superjson$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"],
    errorFormatter ({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError: error.cause instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$ZodError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodError"] ? error.cause.flatten() : null
            }
        };
    }
});
const createCallerFactory = t.createCallerFactory;
const createTRPCRouter = t.router;
/**
 * Middleware for timing procedure execution and adding an artificial delay in development.
 *
 * You can remove this if you don't like it, but it can help catch unwanted waterfalls by simulating
 * network latency that would occur in production but not in local development.
 */ const timingMiddleware = t.middleware(async ({ next, path })=>{
    const start = Date.now();
    if (t._config.isDev) {
        // artificial delay in dev
        const waitMs = Math.floor(Math.random() * 400) + 100;
        await new Promise((resolve)=>setTimeout(resolve, waitMs));
    }
    const result = await next();
    const end = Date.now();
    console.log(`[TRPC] ${path} took ${end - start}ms to execute`);
    return result;
});
const publicProcedure = t.procedure.use(timingMiddleware);
}),
"[project]/src/server/api/routers/post.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "postRouter",
    ()=>postRouter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/trpc.ts [app-route] (ecmascript)");
;
;
const postRouter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createTRPCRouter"])({
    hello: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        text: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })).query(({ input })=>{
        return {
            greeting: `Hello ${input.text}`
        };
    }),
    create: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1)
    })).mutation(async ({ ctx, input })=>{
        return ctx.db.post.create({
            data: {
                name: input.name,
                updatedAt: new Date()
            }
        });
    }),
    getLatest: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].query(async ({ ctx })=>{
        const post = await ctx.db.post.findFirst({
            orderBy: {
                createdAt: "desc"
            }
        });
        return post ?? null;
    })
});
}),
"[project]/src/server/api/routers/product.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "productRouter",
    ()=>productRouter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/trpc.ts [app-route] (ecmascript)");
;
;
const productRouter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createTRPCRouter"])({
    // 전체 목록 조회
    list: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        page: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().default(1),
        pageSize: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().default(50),
        searchTerm: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        category: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
    })).query(async ({ ctx, input })=>{
        const skip = (input.page - 1) * input.pageSize;
        const where = {
            AND: [
                input.searchTerm ? {
                    OR: [
                        {
                            productName: {
                                contains: input.searchTerm,
                                mode: "insensitive"
                            }
                        },
                        {
                            productCode: {
                                contains: input.searchTerm,
                                mode: "insensitive"
                            }
                        }
                    ]
                } : {},
                input.category ? {
                    category: input.category
                } : {}
            ]
        };
        const [products, total] = await Promise.all([
            ctx.db.product.findMany({
                where,
                skip,
                take: input.pageSize,
                orderBy: {
                    createdAt: "desc"
                }
            }),
            ctx.db.product.count({
                where
            })
        ]);
        return {
            products,
            total,
            page: input.page,
            pageSize: input.pageSize,
            totalPages: Math.ceil(total / input.pageSize)
        };
    }),
    // ID로 단일 조회
    getById: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number()).query(async ({ ctx, input })=>{
        return await ctx.db.product.findUnique({
            where: {
                id: input
            }
        });
    }),
    // 생성
    create: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        productCode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).max(50),
        productName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).max(200),
        category: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).max(100),
        price: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().positive(),
        stock: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(0).default(0),
        description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        isActive: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(true),
        createdBy: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
    })).mutation(async ({ ctx, input })=>{
        return await ctx.db.product.create({
            data: input
        });
    }),
    // 수정
    update: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
        productCode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).max(50).optional(),
        productName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).max(200).optional(),
        category: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).max(100).optional(),
        price: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().positive().optional(),
        stock: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(0).optional(),
        description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        isActive: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional(),
        updatedBy: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
    })).mutation(async ({ ctx, input })=>{
        const { id, ...data } = input;
        return await ctx.db.product.update({
            where: {
                id
            },
            data
        });
    }),
    // 삭제
    delete: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number()).mutation(async ({ ctx, input })=>{
        return await ctx.db.product.delete({
            where: {
                id: input
            }
        });
    }),
    // 카테고리 목록 조회
    getCategories: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].query(async ({ ctx })=>{
        const categories = await ctx.db.product.findMany({
            select: {
                category: true
            },
            distinct: [
                "category"
            ],
            orderBy: {
                category: "asc"
            }
        });
        return categories.map((c)=>c.category);
    })
});
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/src/application/services/agent-mapper.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * 🤖 AGENT MAPPER - Gemini 기반 Excel→DB 자동 매핑
 * 
 * Purpose: Agent(Gemini)가 RAG 기반으로 Excel 컬럼을 DB 컬럼에 매핑
 * Architecture: Vector Search → Few-Shot Learning → Agent 추론
 * 
 * Created: 2025-12-03
 * Role: JARVIS = 인프라 제공, AGENT = 실제 추론
 */ __turbopack_context__.s([
    "AgentMapper",
    ()=>AgentMapper,
    "mapWithAgent",
    ()=>mapWithAgent,
    "saveMappingFeedback",
    ()=>saveMappingFeedback
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dotenv$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dotenv/config.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chromadb$2f$dist$2f$chromadb$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/chromadb/dist/chromadb.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@google/generative-ai/dist/index.mjs [app-route] (ecmascript)");
;
;
;
// ============================================================================
// 설정
// ============================================================================
const CHROMA_URL = process.env.CHROMA_URL || 'http://localhost:8000';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const COLLECTION_NAME = 'db_metadata';
class AgentMapper {
    client;
    collection = null;
    genAI;
    constructor(){
        this.client = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chromadb$2f$dist$2f$chromadb$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ChromaClient"]({
            path: CHROMA_URL
        });
        this.genAI = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GoogleGenerativeAI"](GEMINI_API_KEY);
    }
    /**
   * 초기화
   */ async initialize() {
        try {
            this.collection = await this.client.getCollection({
                name: COLLECTION_NAME
            });
        } catch (error) {
            throw new Error('DB 메타데이터 컬렉션을 찾을 수 없습니다. embed_db_metadata.ts를 먼저 실행하세요.');
        }
    }
    /**
   * 텍스트 임베딩
   */ async embedText(text) {
        const model = this.genAI.getGenerativeModel({
            model: 'text-embedding-004'
        });
        const result = await model.embedContent(text);
        return result.embedding.values;
    }
    /**
   * Vector DB에서 유사 사례 검색 (RAG)
   */ async findSimilarCases(excelColumn, topK = 3) {
        if (!this.collection) {
            throw new Error('초기화되지 않았습니다.');
        }
        const embedding = await this.embedText(excelColumn);
        const results = await this.collection.query({
            queryEmbeddings: [
                embedding
            ],
            nResults: topK,
            where: {
                type: 'column_group'
            }
        });
        if (!results.documents?.[0] || !results.metadatas?.[0] || !results.distances?.[0]) {
            return [];
        }
        return results.documents[0].map((doc, idx)=>({
                tableName: results.metadatas[0][idx]?.tableName || '',
                document: doc || '',
                distance: results.distances[0][idx] || 1
            }));
    }
    /**
   * Few-Shot Learning Prompt 생성
   */ buildFewShotPrompt(examples) {
        if (examples.length === 0) return '';
        let prompt = '\n## 📚 학습 사례 (Few-Shot Examples)\n\n';
        prompt += '다음은 과거에 성공적으로 매핑된 사례들입니다:\n\n';
        examples.forEach((ex, idx)=>{
            prompt += `### 사례 ${idx + 1}\n`;
            prompt += `- Excel 컬럼: "${ex.excelColumn}"\n`;
            prompt += `- 매핑 결과: ${ex.dbTable}.${ex.dbColumn}\n`;
            prompt += `- 이유: ${ex.reason}\n\n`;
        });
        return prompt;
    }
    /**
   * Agent에게 매핑 추론 요청
   */ async askAgent(excelColumn, similarCases, fewShotExamples = []) {
        const model = this.genAI.getGenerativeModel({
            model: 'gemini-2.0-flash'
        });
        // RAG 컨텍스트 구성
        let ragContext = '## 🔍 검색된 유사 DB 정보 (RAG Context)\n\n';
        similarCases.forEach((case_, idx)=>{
            const similarity = Math.round((1 - case_.distance) * 100);
            ragContext += `### 후보 ${idx + 1}: ${case_.tableName} (유사도: ${similarity}%)\n`;
            ragContext += `\`\`\`\n${case_.document}\n\`\`\`\n\n`;
        });
        // Few-Shot Prompt
        const fewShotPrompt = this.buildFewShotPrompt(fewShotExamples);
        // 최종 Prompt
        const prompt = `
당신은 Excel 데이터를 PostgreSQL DB 스키마에 자동으로 매핑하는 전문가입니다.

## 🎯 목표
Excel 컬럼명 "${excelColumn}"을(를) 가장 적합한 DB 테이블과 컬럼에 매핑하세요.

${ragContext}

${fewShotPrompt}

## 📋 작업 지침
1. 위의 RAG Context를 참고하여 가장 적합한 테이블과 컬럼을 선택하세요
2. Few-Shot 사례가 있다면 비슷한 패턴을 학습하세요
3. 신뢰도 점수를 0-100 사이로 제시하세요 (정확한 매칭: 90-100, 유사 매칭: 70-89, 추측: 50-69, 불확실: 0-49)
4. 매핑 근거를 명확히 설명하세요

## 📤 응답 형식 (JSON)
\`\`\`json
{
  "tableName": "테이블명",
  "columnName": "컬럼명",
  "confidence": 85,
  "reasoning": "왜 이 컬럼을 선택했는지 설명",
  "thinking": "사고 과정 (선택사항)"
}
\`\`\`

**중요**: 반드시 위 JSON 형식으로만 응답하세요. 다른 텍스트는 포함하지 마세요.
`;
        try {
            const result = await model.generateContent(prompt);
            const responseText = result.response.text();
            // JSON 추출
            const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/) || responseText.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('Agent가 JSON 형식으로 응답하지 않았습니다.');
            }
            const jsonText = jsonMatch[1] || jsonMatch[0];
            const agentResponse = JSON.parse(jsonText);
            return {
                excelColumn,
                suggestedTable: agentResponse.tableName || 'unknown',
                suggestedColumn: agentResponse.columnName || 'unknown',
                confidence: agentResponse.confidence || 0,
                reasoning: agentResponse.reasoning || 'Agent가 근거를 제공하지 않았습니다.',
                agentThinking: agentResponse.thinking
            };
        } catch (error) {
            console.error('Agent 추론 실패:', error);
            // Fallback: 가장 유사한 케이스 사용
            if (similarCases.length > 0) {
                const topCase = similarCases[0];
                const confidence = Math.round((1 - topCase.distance) * 100);
                return {
                    excelColumn,
                    suggestedTable: topCase.tableName,
                    suggestedColumn: 'unknown',
                    confidence,
                    reasoning: `Agent 추론 실패. Vector 검색 결과 사용 (신뢰도: ${confidence}%)`,
                    agentThinking: error instanceof Error ? error.message : '알 수 없는 오류'
                };
            }
            return {
                excelColumn,
                suggestedTable: 'unknown',
                suggestedColumn: 'unknown',
                confidence: 0,
                reasoning: 'Agent 추론 실패 및 유사 사례 없음',
                agentThinking: error instanceof Error ? error.message : '알 수 없는 오류'
            };
        }
    }
    /**
   * Excel 컬럼 목록을 DB에 매핑 (Agent 기반)
   */ async mapColumns(excelColumns, fewShotExamples = []) {
        if (!this.collection) {
            throw new Error('초기화되지 않았습니다. initialize()를 먼저 호출하세요.');
        }
        const results = [];
        for (const column of excelColumns){
            console.log(`\n🤖 Agent 추론 중: "${column}"`);
            // 1. RAG: Vector DB에서 유사 사례 검색
            const similarCases = await this.findSimilarCases(column, 3);
            console.log(`   ✓ 유사 사례 ${similarCases.length}개 검색 완료`);
            // 2. Agent 추론
            const mapping = await this.askAgent(column, similarCases, fewShotExamples);
            console.log(`   ✓ Agent 추론 완료: ${mapping.suggestedTable}.${mapping.suggestedColumn} (신뢰도: ${mapping.confidence}%)`);
            results.push(mapping);
        }
        return results;
    }
    /**
   * 사용자 피드백 저장 (강화학습용)
   */ async saveFeedback(excelColumn, correctTable, correctColumn, reasoning) {
        if (!this.collection) {
            throw new Error('초기화되지 않았습니다.');
        }
        const feedbackDoc = `
사용자 피드백 (강화학습)

Excel 컬럼: ${excelColumn}
정답 테이블: ${correctTable}
정답 컬럼: ${correctColumn}
이유: ${reasoning}
날짜: ${new Date().toISOString()}
`;
        const embedding = await this.embedText(feedbackDoc);
        const feedbackId = `feedback_${Date.now()}_${excelColumn.replace(/\s+/g, '_')}`;
        await this.collection.add({
            ids: [
                feedbackId
            ],
            documents: [
                feedbackDoc
            ],
            embeddings: [
                embedding
            ],
            metadatas: [
                {
                    type: 'user_feedback',
                    excelColumn,
                    correctTable,
                    correctColumn,
                    timestamp: Date.now()
                }
            ]
        });
        console.log(`✓ 사용자 피드백 저장 완료: ${feedbackId}`);
    }
}
async function mapWithAgent(excelColumns, fewShotExamples = []) {
    const mapper = new AgentMapper();
    await mapper.initialize();
    return mapper.mapColumns(excelColumns, fewShotExamples);
}
async function saveMappingFeedback(excelColumn, correctTable, correctColumn, reasoning) {
    const mapper = new AgentMapper();
    await mapper.initialize();
    await mapper.saveFeedback(excelColumn, correctTable, correctColumn, reasoning);
}
}),
"[project]/src/application/services/agent-excel-generator.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * 🤖 AGENT EXCEL GENERATOR - Gemini 기반 Excel 보고서 자동 생성
 * 
 * Purpose: Agent(Gemini)가 RAG 기반으로 DB 스키마를 분석하여 Excel 보고서 생성
 * Architecture: Vector Search → Agent 추론 → SQL 생성 → 데이터 조회 → Excel 생성
 * 
 * Created: 2025-12-03
 * Role: JARVIS = 인프라 제공, AGENT = 보고서 설계 및 SQL 생성
 */ __turbopack_context__.s([
    "AgentExcelGenerator",
    ()=>AgentExcelGenerator,
    "createExcelFromData",
    ()=>createExcelFromData,
    "designReport",
    ()=>designReport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dotenv$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dotenv/config.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chromadb$2f$dist$2f$chromadb$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/chromadb/dist/chromadb.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@google/generative-ai/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/xlsx/xlsx.mjs [app-route] (ecmascript)");
;
;
;
;
// ============================================================================
// 설정
// ============================================================================
const CHROMA_URL = process.env.CHROMA_URL || 'http://localhost:8000';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const COLLECTION_NAME = 'db_metadata';
class AgentExcelGenerator {
    client;
    collection = null;
    genAI;
    constructor(){
        this.client = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chromadb$2f$dist$2f$chromadb$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ChromaClient"]({
            path: CHROMA_URL
        });
        this.genAI = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GoogleGenerativeAI"](GEMINI_API_KEY);
    }
    /**
   * 초기화
   */ async initialize() {
        try {
            this.collection = await this.client.getCollection({
                name: COLLECTION_NAME
            });
        } catch (error) {
            throw new Error('DB 메타데이터 컬렉션을 찾을 수 없습니다. embed_db_metadata.ts를 먼저 실행하세요.');
        }
    }
    /**
   * 텍스트 임베딩
   */ async embedText(text) {
        const model = this.genAI.getGenerativeModel({
            model: 'text-embedding-004'
        });
        const result = await model.embedContent(text);
        return result.embedding.values;
    }
    /**
   * Vector DB에서 관련 테이블 검색
   */ async searchRelevantTables(reportDescription, topK = 5) {
        if (!this.collection) {
            throw new Error('초기화되지 않았습니다.');
        }
        const embedding = await this.embedText(reportDescription);
        const results = await this.collection.query({
            queryEmbeddings: [
                embedding
            ],
            nResults: topK,
            where: {
                type: 'table'
            } // 테이블 정보만 검색
        });
        if (!results.documents?.[0] || !results.metadatas?.[0] || !results.distances?.[0]) {
            return [];
        }
        return results.documents[0].map((doc, idx)=>({
                tableName: results.metadatas[0][idx]?.tableName || '',
                document: doc || '',
                distance: results.distances[0][idx] || 1
            }));
    }
    /**
   * Vector DB에서 관련 컬럼 검색
   */ async searchRelevantColumns(reportDescription, topK = 10) {
        if (!this.collection) {
            throw new Error('초기화되지 않았습니다.');
        }
        const embedding = await this.embedText(reportDescription);
        const results = await this.collection.query({
            queryEmbeddings: [
                embedding
            ],
            nResults: topK,
            where: {
                type: 'column_group'
            } // 컬럼 그룹만 검색
        });
        if (!results.documents?.[0] || !results.metadatas?.[0] || !results.distances?.[0]) {
            return [];
        }
        return results.documents[0].map((doc, idx)=>({
                tableName: results.metadatas[0][idx]?.tableName || '',
                document: doc || '',
                distance: results.distances[0][idx] || 1
            }));
    }
    /**
   * Agent에게 보고서 설계 요청
   */ async askAgentToDesignReport(request, relevantTables, relevantColumns) {
        const model = this.genAI.getGenerativeModel({
            model: 'gemini-2.0-flash'
        });
        // RAG 컨텍스트 구성
        let tableContext = '## 🗂️ 관련 테이블 정보\n\n';
        relevantTables.forEach((table, idx)=>{
            const similarity = Math.round((1 - table.distance) * 100);
            tableContext += `### ${idx + 1}. ${table.tableName} (관련도: ${similarity}%)\n`;
            tableContext += `\`\`\`\n${table.document}\n\`\`\`\n\n`;
        });
        let columnContext = '## 📊 관련 컬럼 정보\n\n';
        relevantColumns.forEach((col, idx)=>{
            const similarity = Math.round((1 - col.distance) * 100);
            columnContext += `### ${idx + 1}. ${col.tableName} 테이블 (관련도: ${similarity}%)\n`;
            columnContext += `\`\`\`\n${col.document}\n\`\`\`\n\n`;
        });
        // Prompt 구성
        const prompt = `
당신은 데이터베이스 전문가이자 보고서 설계 전문가입니다.

## 🎯 목표
사용자가 요청한 "${request.reportName}" 보고서를 설계하고 PostgreSQL 쿼리를 생성하세요.

${request.description ? `## 📝 보고서 설명\n${request.description}\n` : ''}

${tableContext}

${columnContext}

## 📋 작업 지침
1. **⚠️ 필수**: 위의 RAG Context에 명시된 테이블과 컬럼**만** 사용하세요
   - RAG Context에 없는 컬럼명은 절대 사용 금지!
   - 추측하거나 만들어내지 마세요!
2. 보고서에 포함될 컬럼들을 설계하세요 (한글명, 영문 컬럼명, 설명)
3. PostgreSQL SELECT 쿼리를 작성하세요
4. JOIN이 필요하면 적절한 JOIN 조건을 추가하세요
5. 가독성을 위해 컬럼에 별칭(alias)을 사용하세요 (AS "한글명")
6. LIMIT은 100으로 제한하세요 (샘플 데이터)
7. 설계 근거를 명확히 설명하세요

## ⚠️ PostgreSQL 중요 규칙
- **모든 테이블명과 컬럼명을 큰따옴표("")로 감싸야 합니다**
- **RAG Context에 제공된 정확한 컬럼명(대소문자 포함)을 사용하세요**
  - 영문 컬럼은 대부분 소문자입니다 (예: yyyymm, sel_code, site)
  - 한글 컬럼은 그대로 사용합니다 (예: 코스트센터, 차변금액)
- PostgreSQL은 대소문자를 엄격하게 구분합니다
- 예시: SELECT "yyyymm", "sel_code" FROM "doi_dept_cost" ✅
- 잘못된 예: SELECT "YYYYMM", "SEL_CODE" FROM "doi_dept_cost" ❌ (에러 발생!)
- 올바른 예: SELECT "yyyymm" AS "년월", "sel_code" AS "SEL코드" FROM "doi_dept_cost" ✅

## 📤 응답 형식 (JSON)
\`\`\`json
{
  "reportName": "보고서명",
  "columns": [
    {
      "columnName": "한글 컬럼명",
      "description": "컬럼 설명",
      "dataType": "데이터 타입 (string, number, date 등)"
    }
  ],
  "tables": ["사용된 테이블명1", "테이블명2"],
  "sqlQuery": "SELECT ... FROM ... WHERE ... LIMIT 100",
  "reasoning": "왜 이 테이블과 컬럼을 선택했는지 설명",
  "thinking": "사고 과정 (선택사항)"
}
\`\`\`

**중요**: 
- 반드시 위 JSON 형식으로만 응답하세요
- sqlQuery는 실행 가능한 완전한 PostgreSQL 쿼리여야 합니다
- **모든 테이블명과 컬럼명을 반드시 큰따옴표("")로 감싸세요**
- 컬럼 별칭은 AS "한글명" 형식을 사용하세요
- 예시: SELECT "YYYYMM" AS "년월", "SEL_CODE" AS "코드" FROM "doi_dept_cost" LIMIT 100
- 테이블명과 컬럼명은 실제 DB 스키마와 정확히 일치해야 합니다
`;
        try {
            const result = await model.generateContent(prompt);
            const responseText = result.response.text();
            // JSON 추출
            const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/) || responseText.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('Agent가 JSON 형식으로 응답하지 않았습니다.');
            }
            const jsonText = jsonMatch[1] || jsonMatch[0];
            const agentResponse = JSON.parse(jsonText);
            return {
                reportName: agentResponse.reportName || request.reportName,
                columns: agentResponse.columns || [],
                tables: agentResponse.tables || [],
                sqlQuery: agentResponse.sqlQuery || '',
                reasoning: agentResponse.reasoning || 'Agent가 근거를 제공하지 않았습니다.',
                agentThinking: agentResponse.thinking
            };
        } catch (error) {
            console.error('Agent 보고서 설계 실패:', error);
            throw new Error(`보고서 설계 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
        }
    }
    /**
   * SQL 쿼리 실행 및 데이터 조회
   * 
   * Note: 실제 DB 연결이 필요하므로 이 부분은 tRPC 라우터에서 처리
   */ async generateReportDesign(request) {
        if (!this.collection) {
            throw new Error('초기화되지 않았습니다. initialize()를 먼저 호출하세요.');
        }
        console.log(`\n🤖 Agent가 "${request.reportName}" 보고서 설계 중...`);
        // 1. RAG: 관련 테이블 검색
        const searchQuery = request.description ? `${request.reportName} ${request.description}` : request.reportName;
        const relevantTables = await this.searchRelevantTables(searchQuery, 5);
        console.log(`   ✓ 관련 테이블 ${relevantTables.length}개 검색 완료`);
        // 2. RAG: 관련 컬럼 검색
        const relevantColumns = await this.searchRelevantColumns(searchQuery, 10);
        console.log(`   ✓ 관련 컬럼 그룹 ${relevantColumns.length}개 검색 완료`);
        // 3. Agent 추론: 보고서 설계
        const design = await this.askAgentToDesignReport(request, relevantTables, relevantColumns);
        console.log(`   ✓ 보고서 설계 완료: ${design.columns.length}개 컬럼, ${design.tables.length}개 테이블 사용`);
        return design;
    }
    /**
   * 데이터를 Excel 파일로 변환
   */ createExcelBuffer(reportDesign, data) {
        // 워크북 생성
        const workbook = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["utils"].book_new();
        // 워크시트 생성
        const worksheet = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["utils"].json_to_sheet(data);
        // 워크시트를 워크북에 추가
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["utils"].book_append_sheet(workbook, worksheet, reportDesign.reportName);
        // 메타데이터 시트 추가
        const metadata = [
            {
                항목: '보고서명',
                값: reportDesign.reportName
            },
            {
                항목: '생성일시',
                값: new Date().toISOString()
            },
            {
                항목: '데이터 수',
                값: data.length
            },
            {
                항목: '사용 테이블',
                값: reportDesign.tables.join(', ')
            },
            {
                항목: '설계 근거',
                값: reportDesign.reasoning
            }
        ];
        const metaSheet = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["utils"].json_to_sheet(metadata);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["utils"].book_append_sheet(workbook, metaSheet, '보고서 정보');
        // Buffer로 변환
        const buffer = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["write"](workbook, {
            type: 'buffer',
            bookType: 'xlsx'
        });
        return buffer;
    }
}
async function designReport(request) {
    const generator = new AgentExcelGenerator();
    await generator.initialize();
    return generator.generateReportDesign(request);
}
function createExcelFromData(reportDesign, data) {
    const generator = new AgentExcelGenerator();
    return generator.createExcelBuffer(reportDesign, data);
}
}),
"[project]/src/server/api/routers/excel.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "excelRouter",
    ()=>excelRouter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/trpc.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/xlsx/xlsx.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$application$2f$services$2f$agent$2d$mapper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/application/services/agent-mapper.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$application$2f$services$2f$agent$2d$excel$2d$generator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/application/services/agent-excel-generator.ts [app-route] (ecmascript)");
;
;
;
;
;
const excelRouter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createTRPCRouter"])({
    /**
   * Excel 파일의 컬럼 분석
   */ analyzeColumns: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        fileData: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        fileName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })).mutation(async ({ input })=>{
        try {
            // base64 디코딩
            const buffer = Buffer.from(input.fileData, 'base64');
            // Excel 파일 읽기
            const workbook = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["read"](buffer, {
                type: 'buffer'
            });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0] || ''];
            if (!firstSheet) {
                throw new Error('시트를 찾을 수 없습니다.');
            }
            // 첫 번째 행(헤더)만 추출
            const data = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["utils"].sheet_to_json(firstSheet, {
                header: 1,
                defval: ''
            });
            const firstRow = data[0];
            const columns = Array.isArray(firstRow) ? firstRow.map(String).filter(Boolean) : [];
            return {
                columns,
                fileName: input.fileName,
                rowCount: data.length - 1
            };
        } catch (error) {
            console.error('Excel 분석 실패:', error);
            throw new Error('Excel 파일을 분석할 수 없습니다.');
        }
    }),
    /**
   * DB 컬럼 매핑 추천 (Agent 기반)
   */ suggestMappings: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        columns: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()),
        context: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        fewShotExamples: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            excelColumn: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
            dbTable: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
            dbColumn: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
            reason: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
        })).optional()
    })).mutation(async ({ input })=>{
        try {
            // Agent 기반 매핑 (RAG + Few-Shot Learning)
            const mappings = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$application$2f$services$2f$agent$2d$mapper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mapWithAgent"])(input.columns, input.fewShotExamples);
            return {
                mappings,
                totalColumns: input.columns.length,
                highConfidence: mappings.filter((m)=>m.confidence >= 80).length,
                mediumConfidence: mappings.filter((m)=>m.confidence >= 50 && m.confidence < 80).length,
                lowConfidence: mappings.filter((m)=>m.confidence < 50).length,
                systemType: 'agent-based',
                ragEnabled: true,
                fewShotEnabled: (input.fewShotExamples?.length ?? 0) > 0
            };
        } catch (error) {
            console.error('Agent 매핑 실패:', error);
            throw new Error('컬럼 매핑을 생성할 수 없습니다.');
        }
    }),
    /**
   * 모든 DB 테이블과 컬럼 정보 가져오기
   */ getAllTablesAndColumns: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].query(async ({ ctx })=>{
        try {
            // information_schema에서 테이블과 컬럼 정보 조회
            const result = await ctx.db.$queryRaw`
          SELECT 
            c.table_name,
            c.column_name,
            c.data_type,
            pgd.description as column_comment
          FROM information_schema.columns c
          LEFT JOIN pg_catalog.pg_statio_all_tables st 
            ON c.table_schema = st.schemaname 
            AND c.table_name = st.relname
          LEFT JOIN pg_catalog.pg_description pgd 
            ON pgd.objoid = st.relid 
            AND pgd.objsubid = c.ordinal_position
          WHERE c.table_schema = 'public'
          ORDER BY c.table_name, c.ordinal_position
        `;
            // 테이블별로 그룹화
            const tableMap = new Map();
            result.forEach((row)=>{
                const columns = tableMap.get(row.table_name) || [];
                columns.push({
                    columnName: row.column_name,
                    dataType: row.data_type,
                    comment: row.column_comment
                });
                tableMap.set(row.table_name, columns);
            });
            // 배열로 변환
            const tables = Array.from(tableMap.entries()).map(([tableName, columns])=>({
                    tableName,
                    columns
                }));
            return {
                tables,
                totalTables: tables.length,
                totalColumns: result.length
            };
        } catch (error) {
            console.error('DB 메타데이터 조회 실패:', error);
            throw new Error('데이터베이스 정보를 가져올 수 없습니다.');
        }
    }),
    /**
   * 사용자 피드백 저장 (강화학습)
   */ saveFeedback: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        excelColumn: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        correctTable: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        correctColumn: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        reasoning: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
    })).mutation(async ({ input })=>{
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$application$2f$services$2f$agent$2d$mapper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["saveMappingFeedback"])(input.excelColumn, input.correctTable, input.correctColumn, input.reasoning || '사용자가 직접 수정한 매핑');
            return {
                success: true,
                message: '피드백이 저장되어 다음 추론에 활용됩니다.'
            };
        } catch (error) {
            console.error('피드백 저장 실패:', error);
            throw new Error('피드백을 저장할 수 없습니다.');
        }
    }),
    /**
   * Agent 기반 Excel 보고서 생성
   */ generateReport: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        reportName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
    })).mutation(async ({ input, ctx })=>{
        try {
            console.log(`🤖 "${input.reportName}" 보고서 생성 시작...`);
            // 1. Agent가 보고서 설계
            const reportDesign = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$application$2f$services$2f$agent$2d$excel$2d$generator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["designReport"])({
                reportName: input.reportName,
                description: input.description
            });
            console.log('✓ Agent 보고서 설계 완료');
            console.log(`  - 컬럼 수: ${reportDesign.columns.length}`);
            console.log(`  - 사용 테이블: ${reportDesign.tables.join(', ')}`);
            console.log(`  - SQL: ${reportDesign.sqlQuery.substring(0, 100)}...`);
            // 2. SQL 실행 및 데이터 조회
            let data = [];
            try {
                data = await ctx.db.$queryRawUnsafe(reportDesign.sqlQuery);
                console.log(`✓ 데이터 조회 완료: ${data.length}행`);
            } catch (sqlError) {
                console.error('SQL 실행 실패:', sqlError);
                throw new Error(`SQL 실행 실패: ${sqlError instanceof Error ? sqlError.message : '알 수 없는 오류'}`);
            }
            // 3. Excel 파일 생성
            const excelBuffer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$application$2f$services$2f$agent$2d$excel$2d$generator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createExcelFromData"])(reportDesign, data);
            console.log('✓ Excel 파일 생성 완료');
            // 4. Base64로 인코딩하여 반환
            const base64Data = excelBuffer.toString('base64');
            return {
                success: true,
                reportDesign: {
                    reportName: reportDesign.reportName,
                    columns: reportDesign.columns,
                    tables: reportDesign.tables,
                    reasoning: reportDesign.reasoning,
                    agentThinking: reportDesign.agentThinking
                },
                data: base64Data,
                rowCount: data.length,
                fileName: `${reportDesign.reportName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`
            };
        } catch (error) {
            console.error('보고서 생성 실패:', error);
            throw new Error(`보고서 생성 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
        }
    })
});
}),
"[project]/src/server/api/routers/screen982157.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "screen982157Router",
    ()=>screen982157Router
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/trpc.ts [app-route] (ecmascript)");
;
;
const screen982157Router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createTRPCRouter"])({
    getData: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        yearMonth: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(6, "기준년월을 입력해주세요 (YYYYMM)"),
        site: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
    })).query(async ({ ctx, input })=>{
        const sql = `
        SELECT 
            CASE 
                WHEN a.acct_name IS NOT NULL THEN a.acct_name
                ELSE '합계'
            END AS "구분_부서별",
            COALESCE(SUM(ae.acct_amt), 0) AS "계획",
            COALESCE(SUM(ae.acct_amt), 0) AS "합계",
            COALESCE(SUM(CASE WHEN d.dept_name = '전사' THEN ae.acct_amt ELSE 0 END), 0) AS "전사",
            COALESCE(SUM(CASE WHEN d.dept_name = '장애인운동선수' THEN ae.acct_amt ELSE 0 END), 0) AS "장애인운동선수",
            COALESCE(SUM(CASE WHEN d.dept_name = '판매공통' THEN ae.acct_amt ELSE 0 END), 0) AS "판매공통",
            COALESCE(SUM(CASE WHEN d.dept_name = '경영지원실' THEN ae.acct_amt ELSE 0 END), 0) AS "경영지원실",
            COALESCE(SUM(CASE WHEN d.dept_name = '지원팀' THEN ae.acct_amt ELSE 0 END), 0) AS "지원팀",
            COALESCE(SUM(CASE WHEN d.dept_name = '자금그룹' THEN ae.acct_amt ELSE 0 END), 0) AS "자금그룹",
            COALESCE(SUM(CASE WHEN d.dept_name = '회계그룹' THEN ae.acct_amt ELSE 0 END), 0) AS "회계그룹",
            COALESCE(SUM(CASE WHEN d.dept_name = '인사총무그룹' THEN ae.acct_amt ELSE 0 END), 0) AS "인사총무그룹",
            COALESCE(SUM(CASE WHEN d.dept_name = '시스템지원그룹' THEN ae.acct_amt ELSE 0 END), 0) AS "시스템지원그룹",
            COALESCE(SUM(CASE WHEN d.dept_name = '구매그룹' THEN ae.acct_amt ELSE 0 END), 0) AS "구매그룹",
            COALESCE(SUM(CASE WHEN d.dept_name = '전략팀' THEN ae.acct_amt ELSE 0 END), 0) AS "전략팀",
            COALESCE(SUM(CASE WHEN d.dept_name = '도우VINA' THEN ae.acct_amt ELSE 0 END), 0) AS "도우VINA",
            COALESCE(SUM(CASE WHEN d.dept_name = '개발실' THEN ae.acct_amt ELSE 0 END), 0) AS "개발실",
            COALESCE(SUM(CASE WHEN d.dept_name = '연구팀' THEN ae.acct_amt ELSE 0 END), 0) AS "연구팀",
            COALESCE(SUM(CASE WHEN d.dept_name = 'HTG개발그룹' THEN ae.acct_amt ELSE 0 END), 0) AS "HTG개발그룹",
            COALESCE(SUM(CASE WHEN d.dept_name = '선행연구그룹' THEN ae.acct_amt ELSE 0 END), 0) AS "선행연구그룹",
            COALESCE(SUM(CASE WHEN d.dept_name = '개발팀' THEN ae.acct_amt ELSE 0 END), 0) AS "개발팀",
            COALESCE(SUM(CASE WHEN d.dept_name = '공정개발그룹' THEN ae.acct_amt ELSE 0 END), 0) AS "공정개발그룹",
            COALESCE(SUM(CASE WHEN d.dept_name = '제품개발그룹' THEN ae.acct_amt ELSE 0 END), 0) AS "제품개발그룹",
            COALESCE(SUM(CASE WHEN d.dept_name = '설비개발팀' THEN ae.acct_amt ELSE 0 END), 0) AS "설비개발팀",
            COALESCE(SUM(CASE WHEN d.dept_name = '설계그룹' THEN ae.acct_amt ELSE 0 END), 0) AS "설계그룹",
            COALESCE(SUM(CASE WHEN d.dept_name = '제어그룹' THEN ae.acct_amt ELSE 0 END), 0) AS "제어그룹",
            COALESCE(SUM(CASE WHEN d.dept_name = '사업기획그룹' THEN ae.acct_amt ELSE 0 END), 0) AS "사업기획그룹",
            COALESCE(SUM(CASE WHEN d.dept_name = '마케팅그룹' THEN ae.acct_amt ELSE 0 END), 0) AS "마케팅그룹",
            COALESCE(SUM(CASE WHEN d.dept_name = '기술기획그룹' THEN ae.acct_amt ELSE 0 END), 0) AS "기술기획그룹",
            COALESCE(SUM(CASE WHEN d.dept_name = '지원그룹' THEN ae.acct_amt ELSE 0 END), 0) AS "지원그룹"
        FROM doi_acct_expen ae
        LEFT JOIN doi_acct a ON ae.yyyymm = a.yyyymm 
            AND ae.acct = a.acct 
            AND ae.site = a.site
            AND a.계정대분류 = '판매관리비'
        LEFT JOIN doi_dept d ON ae.yyyymm = d.yyyymm 
            AND ae.dept = d.dept 
            AND ae.site = d.site
        WHERE ae.yyyymm = $1
            AND ($2::text IS NULL OR ae.site = $2)
            AND a.계정대분류 = '판매관리비'
        GROUP BY ROLLUP(a.acct_name)
        ORDER BY CASE WHEN a.acct_name IS NULL THEN 1 ELSE 0 END, a.acct_name
      `;
        const result = await ctx.db.$queryRawUnsafe(sql, input.yearMonth, input.site || null);
        // 컬럼명을 그리드 필드명으로 매핑
        const mappedData = result.map((row)=>({
                col_0: row['구분_부서별'],
                col_1: Number(row['계획'] || 0),
                col_2: Number(row['합계'] || 0),
                col_3: Number(row['전사'] || 0),
                col_4: Number(row['장애인운동선수'] || 0),
                col_5: Number(row['판매공통'] || 0),
                col_6: Number(row['경영지원실'] || 0),
                col_7: Number(row['지원팀'] || 0),
                col_8: Number(row['자금그룹'] || 0),
                col_9: Number(row['회계그룹'] || 0),
                col_10: Number(row['인사총무그룹'] || 0),
                col_11: Number(row['시스템지원그룹'] || 0),
                col_12: Number(row['구매그룹'] || 0),
                col_13: Number(row['전략팀'] || 0),
                col_14: Number(row['도우VINA'] || 0),
                col_15: Number(row['개발실'] || 0),
                col_16: Number(row['연구팀'] || 0),
                col_17: Number(row['HTG개발그룹'] || 0),
                col_18: Number(row['선행연구그룹'] || 0),
                col_19: Number(row['개발팀'] || 0),
                col_20: Number(row['공정개발그룹'] || 0),
                col_21: Number(row['제품개발그룹'] || 0),
                col_22: Number(row['설비개발팀'] || 0),
                col_23: Number(row['설계그룹'] || 0),
                col_24: Number(row['제어그룹'] || 0),
                col_25: Number(row['사업기획그룹'] || 0),
                col_26: Number(row['마케팅그룹'] || 0),
                col_27: Number(row['기술기획그룹'] || 0),
                col_28: Number(row['지원그룹'] || 0)
            }));
        return {
            data: mappedData,
            total: mappedData.length
        };
    })
});
}),
"[project]/src/server/api/routers/menu.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * 메뉴 API 라우터
 * DB에서 메뉴 데이터를 조회하여 트리 구조로 반환
 */ __turbopack_context__.s([
    "menuRouter",
    ()=>menuRouter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/trpc.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
;
;
/**
 * 화면 ID에 해당하는 생성된 파일들 삭제
 */ function deleteScreenFiles(screenId) {
    const result = {
        deleted: [],
        errors: []
    };
    if (!screenId || !screenId.match(/^SC\d+$/i)) {
        return result;
    }
    const screenIdUpper = screenId.toUpperCase();
    const screenIdLower = screenId.toLowerCase();
    // generated/screens/{SCREENID} 삭제
    const generatedPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'generated', 'screens', screenIdUpper);
    if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(generatedPath)) {
        try {
            __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].rmSync(generatedPath, {
                recursive: true,
                force: true
            });
            result.deleted.push(generatedPath);
            console.log(`[메뉴 삭제] generated 삭제: ${generatedPath}`);
        } catch (e) {
            result.errors.push(`generated 삭제 실패: ${e}`);
        }
    }
    // src/app/screens/{screenid} 삭제
    const appPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'src', 'app', 'screens', screenIdLower);
    if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(appPath)) {
        try {
            __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].rmSync(appPath, {
                recursive: true,
                force: true
            });
            result.deleted.push(appPath);
            console.log(`[메뉴 삭제] app/screens 삭제: ${appPath}`);
        } catch (e) {
            result.errors.push(`app/screens 삭제 실패: ${e}`);
        }
    }
    return result;
}
const menuRouter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createTRPCRouter"])({
    /**
   * 전체 메뉴를 트리 구조로 조회
   */ getMenuTree: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].query(async ({ ctx })=>{
        // 모든 메뉴 조회 (활성화된 것만, 정렬 순서대로)
        const menus = await ctx.db.$queryRaw`
      SELECT 
        menu_id, parent_id, menu_level, sort_order,
        menu_name, menu_name_en, menu_path, menu_icon,
        screen_id, screen_type, is_active, is_visible,
        badge_text, badge_type
      FROM "binary".sys_menu
      WHERE is_active = true AND is_visible = true
      ORDER BY sort_order ASC
    `;
        // 트리 구조로 변환
        const menuMap = new Map();
        const rootMenus = [];
        // 먼저 모든 메뉴를 맵에 저장
        menus.forEach((menu)=>{
            menuMap.set(menu.menu_id, {
                menuId: menu.menu_id,
                parentId: menu.parent_id,
                menuLevel: menu.menu_level,
                sortOrder: menu.sort_order,
                menuName: menu.menu_name,
                menuNameEn: menu.menu_name_en,
                menuPath: menu.menu_path,
                menuIcon: menu.menu_icon,
                screenId: menu.screen_id,
                screenType: menu.screen_type,
                isActive: menu.is_active,
                isVisible: menu.is_visible,
                badgeText: menu.badge_text,
                badgeType: menu.badge_type,
                children: []
            });
        });
        // 부모-자식 관계 설정
        menuMap.forEach((menu)=>{
            if (menu.parentId) {
                const parent = menuMap.get(menu.parentId);
                if (parent) {
                    parent.children.push(menu);
                }
            } else {
                rootMenus.push(menu);
            }
        });
        return rootMenus;
    }),
    /**
   * 새 메뉴 생성
   */ createMenu: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        menuId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        parentId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        menuName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        menuNameEn: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        menuPath: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        menuIcon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        screenId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        sortOrder: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().default(99),
        menuLevel: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().default(2)
    })).mutation(async ({ ctx, input })=>{
        try {
            // 이미 존재하는지 확인
            const existing = await ctx.db.$queryRaw`
          SELECT menu_id FROM "binary".sys_menu WHERE menu_id = ${input.menuId}
        `;
            if (existing.length > 0) {
                return {
                    success: false,
                    error: '이미 존재하는 메뉴 ID입니다.'
                };
            }
            // 메뉴 추가
            await ctx.db.$executeRaw`
          INSERT INTO "binary".sys_menu (
            menu_id, parent_id, menu_name, menu_name_en, menu_path, 
            menu_icon, screen_id, sort_order, menu_level, 
            screen_type, is_active, is_visible
          ) VALUES (
            ${input.menuId},
            ${input.parentId || null},
            ${input.menuName},
            ${input.menuNameEn || null},
            ${input.menuPath || null},
            ${input.menuIcon || 'FileText'},
            ${input.screenId || null},
            ${input.sortOrder},
            ${input.menuLevel},
            'PAGE',
            true,
            true
          )
        `;
            return {
                success: true,
                menuId: input.menuId
            };
        } catch (error) {
            console.error('메뉴 생성 오류:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : '메뉴 생성 중 오류가 발생했습니다.'
            };
        }
    }),
    /**
   * 특정 역할의 메뉴 권한 조회
   */ getMenuByRole: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        roleId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })).query(async ({ ctx, input })=>{
        const permissions = await ctx.db.$queryRaw`
        SELECT 
          m.menu_id, m.menu_name, m.menu_path, m.menu_icon,
          mr.can_read, mr.can_create, mr.can_update, 
          mr.can_delete, mr.can_export, mr.can_print
        FROM "binary".sys_menu m
        JOIN "binary".sys_menu_role mr ON m.menu_id = mr.menu_id
        WHERE mr.role_id = ${input.roleId}
          AND m.is_active = true
        ORDER BY m.sort_order
      `;
        return permissions;
    }),
    /**
   * 역할 목록 조회
   */ getRoles: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].query(async ({ ctx })=>{
        const roles = await ctx.db.$queryRaw`
      SELECT role_id, role_name, role_desc, is_active
      FROM "binary".sys_role
      WHERE is_active = true
      ORDER BY role_id
    `;
        return roles;
    }),
    /**
   * 메뉴 삭제 (하위 메뉴 포함)
   */ deleteMenu: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        menuId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        deleteChildren: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(true)
    })).mutation(async ({ ctx, input })=>{
        const { menuId, deleteChildren } = input;
        // 하위 메뉴가 있는지 확인
        const children = await ctx.db.$queryRaw`
        SELECT menu_id FROM "binary".sys_menu WHERE parent_id = ${menuId}
      `;
        if (children.length > 0 && !deleteChildren) {
            return {
                success: false,
                error: "하위 메뉴가 있습니다. 하위 메뉴를 먼저 삭제하거나 함께 삭제하세요.",
                childCount: children.length
            };
        }
        try {
            // 하위 메뉴가 있으면 재귀적으로 삭제
            if (deleteChildren && children.length > 0) {
                // 모든 하위 메뉴 ID 수집 (재귀적)
                const getAllChildIds = async (parentId)=>{
                    const directChildren = await ctx.db.$queryRaw`
              SELECT menu_id FROM "binary".sys_menu WHERE parent_id = ${parentId}
            `;
                    let allIds = [];
                    for (const child of directChildren){
                        allIds.push(child.menu_id);
                        const grandChildren = await getAllChildIds(child.menu_id);
                        allIds = allIds.concat(grandChildren);
                    }
                    return allIds;
                };
                const childIds = await getAllChildIds(menuId);
                // 하위 메뉴의 화면 파일 삭제
                const deletedFiles = [];
                for (const childId of childIds){
                    // 하위 메뉴의 screen_id 조회
                    const childMenu = await ctx.db.$queryRaw`
              SELECT screen_id FROM "binary".sys_menu WHERE menu_id = ${childId}
            `;
                    if (childMenu[0]?.screen_id) {
                        const fileResult = deleteScreenFiles(childMenu[0].screen_id);
                        deletedFiles.push(...fileResult.deleted);
                    }
                }
                // 하위 메뉴들 먼저 삭제 (깊은 것부터)
                for (const childId of childIds.reverse()){
                    await ctx.db.$executeRaw`DELETE FROM "binary".sys_menu WHERE menu_id = ${childId}`;
                }
            }
            // 삭제할 메뉴의 screen_id 조회
            const menuToDelete = await ctx.db.$queryRaw`
          SELECT screen_id FROM "binary".sys_menu WHERE menu_id = ${menuId}
        `;
            // 해당 메뉴의 화면 파일 삭제
            let deletedScreens = [];
            if (menuToDelete[0]?.screen_id) {
                const fileResult = deleteScreenFiles(menuToDelete[0].screen_id);
                deletedScreens = fileResult.deleted;
            }
            // 해당 메뉴 삭제
            await ctx.db.$executeRaw`DELETE FROM "binary".sys_menu WHERE menu_id = ${menuId}`;
            return {
                success: true,
                deletedMenuId: menuId,
                deletedChildCount: children.length,
                deletedScreenFiles: deletedScreens
            };
        } catch (error) {
            console.error("메뉴 삭제 오류:", error);
            return {
                success: false,
                error: error instanceof Error ? error.message : "메뉴 삭제 중 오류가 발생했습니다."
            };
        }
    })
});
}),
"[project]/src/server/api/routers/screen-generator/_shared/types.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * 화면 생성기 공통 타입 정의
 * @module screenGenerator/_shared/types
 */ __turbopack_context__.s([
    "CrudColumnDefSchema",
    ()=>CrudColumnDefSchema,
    "CrudConfigSchema",
    ()=>CrudConfigSchema,
    "CrudSaveRequestSchema",
    ()=>CrudSaveRequestSchema,
    "PreviewResultSchema",
    ()=>PreviewResultSchema,
    "SCREEN_TYPE_FEATURES",
    ()=>SCREEN_TYPE_FEATURES,
    "ScreenType",
    ()=>ScreenType,
    "ValidationResultSchema",
    ()=>ValidationResultSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
;
var ScreenType = /*#__PURE__*/ function(ScreenType) {
    ScreenType["SIMPLE_GRID"] = "simpleGrid";
    ScreenType["SIMPLE_GRID_CRUD"] = "simpleGridCrud";
    ScreenType["COMPLEX_GRID"] = "complexGrid";
    ScreenType["COMPLEX_GRID_CRUD"] = "complexGridCrud";
    ScreenType["GRID_WITH_CHART"] = "gridWithChart";
    // RealGrid 유형
    ScreenType["REALGRID_SIMPLE"] = "realgridSimple";
    ScreenType["REALGRID_CRUD"] = "realgridCrud";
    return ScreenType;
}({});
const SCREEN_TYPE_FEATURES = {
    ["simpleGrid"]: {
        hasRead: true,
        hasCrud: false,
        hasGroupHeader: false,
        hasMasterDetail: false,
        hasTree: false,
        hasChart: false,
        description: '단순 조회 화면'
    },
    ["simpleGridCrud"]: {
        hasRead: true,
        hasCrud: true,
        hasGroupHeader: false,
        hasMasterDetail: false,
        hasTree: false,
        hasChart: false,
        description: '단순 CRUD 화면 (기준정보 관리)'
    },
    ["complexGrid"]: {
        hasRead: true,
        hasCrud: false,
        hasGroupHeader: true,
        hasMasterDetail: true,
        hasTree: true,
        hasChart: false,
        description: '복잡 조회 화면'
    },
    ["complexGridCrud"]: {
        hasRead: true,
        hasCrud: true,
        hasGroupHeader: true,
        hasMasterDetail: true,
        hasTree: true,
        hasChart: false,
        description: '복잡 CRUD 화면'
    },
    ["gridWithChart"]: {
        hasRead: true,
        hasCrud: true,
        hasGroupHeader: true,
        hasMasterDetail: true,
        hasTree: true,
        hasChart: true,
        description: 'CRUD + 차트 화면'
    },
    // RealGrid 유형
    ["realgridSimple"]: {
        hasRead: true,
        hasCrud: false,
        hasGroupHeader: true,
        hasMasterDetail: false,
        hasTree: false,
        hasChart: false,
        description: '단순 조회 화면 (RealGrid)'
    },
    ["realgridCrud"]: {
        hasRead: true,
        hasCrud: true,
        hasGroupHeader: true,
        hasMasterDetail: false,
        hasTree: false,
        hasChart: false,
        description: '단순 CRUD 화면 (RealGrid)'
    }
};
const ValidationResultSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    isValid: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    screenName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    screenNameEn: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    tableName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    screenType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].nativeEnum(ScreenType).optional(),
    columns: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
    searchConditions: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
    summaryRows: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).optional(),
    errors: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).optional(),
    warnings: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).optional(),
    parsedData: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any().optional()
});
const PreviewResultSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    success: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    html: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    componentCode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
const CrudColumnDefSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    headerName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    field: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    width: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().default(100),
    editorType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'text',
        'number',
        'date',
        'datetime',
        'select',
        'checkbox',
        'textarea',
        'readonly'
    ]).default('text'),
    editable: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(true),
    required: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(false),
    defaultValue: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].union([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean()
    ]).optional(),
    options: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].union([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            value: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
            label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
        })),
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    ]).optional(),
    align: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'left',
        'center',
        'right'
    ]).optional(),
    maxLength: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
    minValue: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
    maxValue: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
    pattern: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    hidden: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional()
});
const CrudConfigSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    primaryKey: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    autoGeneratePk: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(false),
    pkPattern: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    sortColumn: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    sortDirection: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'asc',
        'desc'
    ]).default('asc'),
    softDelete: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(false),
    auditColumns: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(true),
    rowSelection: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'single',
        'multiple'
    ]).default('multiple'),
    pagination: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(false),
    pageSize: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional()
});
const CrudSaveRequestSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    inserts: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any())),
    updates: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any())),
    deletes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string())
});
}),
"[project]/src/server/api/routers/screen-generator/_shared/validation.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Excel 템플릿 검증 유틸리티
 * @module screenGenerator/_shared/validation
 */ __turbopack_context__.s([
    "OPTION_MAPPING",
    ()=>OPTION_MAPPING,
    "detectScreenType",
    ()=>detectScreenType,
    "extractCrudConfig",
    ()=>extractCrudConfig,
    "generateWarnings",
    ()=>generateWarnings,
    "parseCrudExcel",
    ()=>parseCrudExcel,
    "parseCrudGridSheet",
    ()=>parseCrudGridSheet,
    "parseGridSheet",
    ()=>parseGridSheet,
    "parseMetaSheet",
    ()=>parseMetaSheet,
    "parseSampleDataSheet",
    ()=>parseSampleDataSheet,
    "parseSearchConditions",
    ()=>parseSearchConditions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/xlsx/xlsx.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/types.ts [app-route] (ecmascript)");
;
;
const OPTION_MAPPING = {
    '년월': {
        label: '년월',
        type: 'yearmonth'
    },
    '년': {
        label: '년',
        type: 'year'
    },
    '자재': {
        label: '자재',
        type: 'material'
    },
    '거래처': {
        label: '거래처',
        type: 'customer'
    },
    '부서': {
        label: '부서',
        type: 'department'
    },
    '계정': {
        label: '계정',
        type: 'account'
    },
    '모델': {
        label: '모델',
        type: 'model'
    },
    '사업장': {
        label: '사업장',
        type: 'site'
    },
    '비용': {
        label: '비용',
        type: 'expense'
    }
};
function detectScreenType(parsedData) {
    const { gridColumns } = parsedData;
    if (!gridColumns) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ScreenType"].SIMPLE_GRID;
    }
    // 그룹 헤더 존재 여부 (row2에 병합 셀이 있으면 복잡 화면)
    const hasGroupHeader = gridColumns.merges?.some((m)=>m.startRow === 1 && m.endRow === 1 && m.startCol !== m.endCol) ?? false;
    // 컬럼 수에 따른 복잡도 판단
    const columnCount = gridColumns.row3?.filter((h)=>h && typeof h === 'string' && h.trim()).length ?? 0;
    const isComplex = hasGroupHeader || columnCount > 15;
    // TODO: CRUD 여부는 메타정보에서 판단 (현재는 조회 전용)
    // TODO: 차트 여부도 메타정보에서 판단
    if (isComplex) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ScreenType"].COMPLEX_GRID;
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ScreenType"].SIMPLE_GRID;
}
function parseMetaSheet(workbook) {
    const metaSheet = workbook.Sheets["메타정보"];
    if (!metaSheet) {
        return {
            screenName: '',
            screenNameEn: '',
            tableName: '',
            options: ''
        };
    }
    const metaData = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["utils"].sheet_to_json(metaSheet, {
        header: 1,
        defval: ""
    });
    let screenName = "";
    let screenNameEn = "";
    let tableName = "";
    let options = "";
    let screenType = "";
    // CRUD 설정
    let primaryKey = "";
    let autoGeneratePk = false;
    let pkPattern = "";
    let sortColumn = "";
    let sortDirection = 'asc';
    let softDelete = false;
    let auditColumns = true;
    let rowSelection = 'multiple';
    let pagination = false;
    let pageSize = 50;
    for (const row of metaData){
        const key = row[0]?.toString().trim() || "";
        const value = row[1]?.toString().trim() || "";
        if (key === "화면명" || key === "화면명(한글)") screenName = value;
        if (key === "화면명(영문)") screenNameEn = value;
        if (key === "테이블명" || key === "사용테이블") tableName = value;
        if (key === "옵션") options = value;
        if (key === "화면유형" || key === "화면타입") screenType = value;
        // CRUD 설정 파싱
        if (key === "PK컬럼" || key === "기본키") primaryKey = value;
        if (key === "PK자동생성") autoGeneratePk = value.toLowerCase() === 'y' || value.toLowerCase() === 'yes';
        if (key === "PK패턴") pkPattern = value;
        if (key === "정렬컬럼") sortColumn = value;
        if (key === "정렬방향") sortDirection = value.toLowerCase() === 'desc' ? 'desc' : 'asc';
        if (key === "소프트삭제") softDelete = value.toLowerCase() === 'y' || value.toLowerCase() === 'yes';
        if (key === "감사컬럼") auditColumns = value.toLowerCase() !== 'n' && value.toLowerCase() !== 'no';
        if (key === "행선택") rowSelection = value === 'single' ? 'single' : 'multiple';
        if (key === "페이징" || key === "페이지네이션") pagination = value.toLowerCase() === 'y' || value.toLowerCase() === 'yes';
        if (key === "페이지크기") pageSize = parseInt(value, 10) || 50;
    }
    return {
        screenName,
        screenNameEn,
        tableName,
        options,
        screenType,
        primaryKey,
        autoGeneratePk,
        pkPattern,
        sortColumn,
        sortDirection,
        softDelete,
        auditColumns,
        rowSelection,
        pagination,
        pageSize
    };
}
function parseSearchConditions(optionsStr) {
    if (!optionsStr) return [];
    const searchConditions = [];
    const optionList = optionsStr.split(',').map((o)=>o.trim()).filter((o)=>o);
    for (const opt of optionList){
        const mapping = OPTION_MAPPING[opt];
        if (mapping) {
            searchConditions.push({
                label: mapping.label,
                type: mapping.type,
                field: mapping.type,
                required: false
            });
        }
    }
    return searchConditions;
}
function parseGridSheet(workbook) {
    const gridSheet = workbook.Sheets["그리드컬럼"];
    if (!gridSheet) {
        return {
            row1: [],
            row2: [],
            row3: [],
            merges: [],
            summaryRows: [],
            sampleData: [],
            columnCount: 0
        };
    }
    const gridData = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["utils"].sheet_to_json(gridSheet, {
        header: 1,
        defval: ""
    });
    const rawMerges = gridSheet["!merges"] || [];
    const row1 = gridData[0] || [];
    const row2 = gridData[1] || [];
    const row3 = gridData[2] || [];
    // 병합 셀 정보 변환
    const merges = rawMerges.map((m)=>({
            startCol: m.s.c,
            endCol: m.e.c,
            startRow: m.s.r,
            endRow: m.e.r
        }));
    // 컬럼 수 계산
    let columnCount = 0;
    for(let col = 0; col < row3.length; col++){
        const header = row3[col]?.toString().trim() || row2[col]?.toString().trim();
        if (header && !header.includes("합계")) {
            columnCount++;
        }
    }
    // 합계 행 추출
    const summaryRows = [];
    for(let row = 3; row < gridData.length; row++){
        const firstCell = gridData[row]?.[0]?.toString() || "";
        if (firstCell.includes("합계")) {
            summaryRows.push(firstCell);
        }
    }
    // 샘플 데이터 추출
    const sampleData = gridData.slice(3).filter((row)=>{
        const firstCell = row[0]?.toString() || "";
        return firstCell && !firstCell.includes("합계");
    }).slice(0, 5);
    return {
        row1,
        row2,
        row3,
        merges,
        summaryRows,
        sampleData,
        columnCount
    };
}
function parseSampleDataSheet(workbook) {
    if (!workbook.SheetNames.includes("샘플데이터")) {
        return [];
    }
    const sampleSheet = workbook.Sheets["샘플데이터"];
    if (!sampleSheet) return [];
    const sampleSheetData = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["utils"].sheet_to_json(sampleSheet, {
        header: 1,
        defval: ""
    });
    // Row 1: 제목, Row 2: 헤더, Row 3+: 데이터
    return sampleSheetData.slice(2).filter((row)=>{
        const firstCell = row[0]?.toString() || "";
        return firstCell && !firstCell.includes("합계");
    }).slice(0, 5);
}
function generateWarnings(row2, row3, merges) {
    const warnings = [];
    // 그룹 헤더 맵 생성
    const groupHeaderMap = new Map();
    for (const merge of merges){
        if (merge.startRow === 1 && merge.endRow === 1 && merge.startCol !== merge.endCol) {
            const headerValue = row2[merge.startCol]?.toString().trim() || "";
            if (headerValue) {
                for(let c = merge.startCol; c <= merge.endCol; c++){
                    groupHeaderMap.set(c, headerValue);
                }
            }
        }
    }
    // 그룹명과 상세 컬럼명 동일 여부 체크
    for(let col = 0; col < row3.length; col++){
        const groupHeader = groupHeaderMap.get(col);
        const detailHeader = row3[col]?.toString().trim();
        if (groupHeader && detailHeader && groupHeader === detailHeader) {
            warnings.push(`Col ${col + 1}: 그룹명 '${groupHeader}'과 상세 컬럼명이 동일합니다. 구분을 권장합니다.`);
        }
    }
    // 컬럼명 중복 체크
    const headerCounts = new Map();
    for (const header of row3){
        const h = header?.toString().trim();
        if (h) {
            headerCounts.set(h, (headerCounts.get(h) || 0) + 1);
        }
    }
    for (const [header, count] of headerCounts){
        if (count > 1) {
            warnings.push(`상세 컬럼명 '${header}'이(가) ${count}번 중복됩니다.`);
        }
    }
    return warnings;
}
// ============================================================
// CRUD 컬럼 시트 파싱 (CRUD 전용)
// ============================================================
/**
 * 에디터 타입 매핑
 */ const EDITOR_TYPE_MAPPING = {
    '텍스트': 'text',
    'text': 'text',
    '숫자': 'number',
    'number': 'number',
    '날짜': 'date',
    'date': 'date',
    '날짜시간': 'datetime',
    'datetime': 'datetime',
    '선택': 'select',
    'select': 'select',
    '콤보': 'select',
    '체크박스': 'checkbox',
    'checkbox': 'checkbox',
    '여러줄': 'textarea',
    'textarea': 'textarea',
    '읽기전용': 'readonly',
    'readonly': 'readonly'
};
function parseCrudGridSheet(workbook) {
    const gridSheet = workbook.Sheets["그리드컬럼"];
    if (!gridSheet) {
        return [];
    }
    const gridData = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["utils"].sheet_to_json(gridSheet, {
        defval: ""
    });
    const columns = [];
    for (const row of gridData){
        // 컬럼명이 없으면 스킵
        const headerName = row['컬럼명(한글)'] || row['컬럼명'] || row['헤더명'] || '';
        if (!headerName.trim()) continue;
        const field = row['DB컬럼명'] || row['필드명'] || row['field'] || headerName;
        const widthStr = row['너비'] || row['width'] || '100';
        const editorTypeStr = row['편집타입'] || row['편집기'] || row['editorType'] || '텍스트';
        const editableStr = row['편집가능'] || row['editable'] || 'Y';
        const requiredStr = row['필수'] || row['required'] || 'N';
        const defaultValue = row['기본값'] || row['default'] || '';
        const optionsStr = row['옵션'] || row['options'] || '';
        const alignStr = row['정렬'] || row['align'] || '';
        const maxLengthStr = row['최대길이'] || row['maxLength'] || '';
        const hiddenStr = row['숨김'] || row['hidden'] || 'N';
        const column = {
            headerName: headerName.trim(),
            field: field.trim(),
            width: parseInt(widthStr, 10) || 100,
            editorType: EDITOR_TYPE_MAPPING[editorTypeStr.toLowerCase()] || 'text',
            editable: editableStr.toUpperCase() === 'Y' || editableStr.toLowerCase() === 'yes',
            required: requiredStr.toUpperCase() === 'Y' || requiredStr.toLowerCase() === 'yes',
            hidden: hiddenStr.toUpperCase() === 'Y' || hiddenStr.toLowerCase() === 'yes'
        };
        // 기본값 (타입에 따라 변환)
        if (defaultValue) {
            if (column.editorType === 'number') {
                column.defaultValue = parseFloat(defaultValue) || 0;
            } else if (column.editorType === 'checkbox') {
                column.defaultValue = defaultValue.toUpperCase() === 'Y' || defaultValue.toLowerCase() === 'true';
            } else {
                column.defaultValue = defaultValue;
            }
        }
        // 옵션 (select 타입인 경우)
        if (optionsStr && column.editorType === 'select') {
            // "값1:라벨1,값2:라벨2" 형식 또는 API 경로
            if (optionsStr.startsWith('/') || optionsStr.startsWith('api.')) {
                column.options = optionsStr;
            } else {
                column.options = optionsStr.split(',').map((opt)=>{
                    const [value, label] = opt.split(':');
                    return {
                        value: value?.trim() ?? '',
                        label: label?.trim() ?? value?.trim() ?? ''
                    };
                });
            }
        }
        // 정렬
        if (alignStr) {
            const align = alignStr.toLowerCase();
            if (align === 'left' || align === 'center' || align === 'right') {
                column.align = align;
            }
        }
        // 최대길이
        if (maxLengthStr) {
            column.maxLength = parseInt(maxLengthStr, 10) || undefined;
        }
        columns.push(column);
    }
    return columns;
}
function extractCrudConfig(meta) {
    return {
        primaryKey: meta.primaryKey || 'id',
        autoGeneratePk: meta.autoGeneratePk ?? false,
        pkPattern: meta.pkPattern,
        sortColumn: meta.sortColumn,
        sortDirection: meta.sortDirection ?? 'asc',
        softDelete: meta.softDelete ?? false,
        auditColumns: meta.auditColumns ?? true,
        rowSelection: meta.rowSelection ?? 'multiple',
        pagination: meta.pagination ?? false,
        pageSize: meta.pageSize
    };
}
function parseCrudExcel(workbook) {
    const meta = parseMetaSheet(workbook);
    // CRUD 화면 유형인지 확인
    const screenTypeStr = meta.screenType?.toLowerCase() ?? '';
    const isCrud = screenTypeStr.includes('crud') || screenTypeStr === 'simplegridcrud' || screenTypeStr === 'complexgridcrud' || screenTypeStr === '기준정보' || screenTypeStr === '마스터';
    if (!isCrud) {
        return null;
    }
    // CRUD 컬럼 파싱
    const crudColumns = parseCrudGridSheet(workbook);
    if (crudColumns.length === 0) {
        return null;
    }
    // CRUD 설정 추출
    const crudConfig = extractCrudConfig(meta);
    // 검색 조건 파싱
    const searchConditions = parseSearchConditions(meta.options);
    // 화면 유형 결정
    const screenType = screenTypeStr.includes('complex') ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ScreenType"].COMPLEX_GRID_CRUD : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ScreenType"].SIMPLE_GRID_CRUD;
    return {
        screenName: meta.screenName,
        screenNameEn: meta.screenNameEn,
        tableName: meta.tableName,
        screenType,
        searchConditions,
        gridColumns: {
            row1: [],
            row2: crudColumns.map((c)=>c.headerName),
            row3: crudColumns.map((c)=>c.field),
            merges: [],
            summaryRows: [],
            sampleData: []
        },
        crudConfig,
        crudColumns
    };
}
}),
"[project]/src/server/api/routers/screen-generator/procedures/validate.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Excel 템플릿 검증 프로시저
 * @module screenGenerator/procedures/validate
 */ __turbopack_context__.s([
    "validateTemplate",
    ()=>validateTemplate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/trpc.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/xlsx/xlsx.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/validation.ts [app-route] (ecmascript)");
;
;
;
;
const validateTemplate = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    fileBase64: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    fileName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
})).mutation(async ({ input })=>{
    try {
        // Base64 → Buffer → Workbook
        const buffer = Buffer.from(input.fileBase64, "base64");
        const workbook = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["read"](buffer, {
            type: "buffer"
        });
        const errors = [];
        const warnings = [];
        // 1. 필수 시트 확인
        const requiredSheets = [
            "메타정보",
            "그리드컬럼"
        ];
        for (const sheetName of requiredSheets){
            if (!workbook.SheetNames.includes(sheetName)) {
                errors.push(`필수 시트 '${sheetName}'이(가) 없습니다.`);
            }
        }
        if (errors.length > 0) {
            return {
                isValid: false,
                errors,
                warnings
            };
        }
        // 2. 메타정보 시트 파싱
        const metaInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseMetaSheet"])(workbook);
        const { screenName, screenNameEn, tableName, options } = metaInfo;
        console.log(`[DEBUG] 파싱 결과: screenName=${screenName}, tableName=${tableName}, options=${options}`);
        if (!screenName) {
            errors.push("메타정보 시트에 '화면명'이 없습니다.");
        }
        if (!tableName) {
            warnings.push("메타정보 시트에 '테이블명'이 없습니다. 쿼리 생성 시 수동 입력이 필요합니다.");
        }
        // 3. 옵션 → 검색조건 변환
        const searchConditions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSearchConditions"])(options);
        console.log(`[DEBUG] 파싱된 옵션: ${searchConditions.length}개`, searchConditions);
        // 4. 그리드컬럼 시트 파싱
        const gridInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseGridSheet"])(workbook);
        const { row1, row2, row3, merges, summaryRows, columnCount } = gridInfo;
        // 5. 샘플데이터 시트 파싱 (있는 경우)
        let sampleDataRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSampleDataSheet"])(workbook);
        if (sampleDataRows.length === 0) {
            // 샘플데이터 시트가 없으면 그리드컬럼에서 추출
            sampleDataRows = gridInfo.sampleData;
        }
        // 6. 경고 생성
        const additionalWarnings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateWarnings"])(row2, row3, merges);
        warnings.push(...additionalWarnings);
        // 7. 파싱 데이터 구성
        const parsedData = {
            screenName,
            screenNameEn,
            tableName,
            searchConditions,
            gridColumns: {
                row1,
                row2,
                row3,
                merges,
                summaryRows,
                sampleData: sampleDataRows
            }
        };
        // 8. 화면 유형 자동 감지
        const screenType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["detectScreenType"])(parsedData);
        const isValid = errors.length === 0;
        return {
            isValid,
            screenName,
            screenNameEn,
            tableName,
            screenType,
            columns: columnCount,
            searchConditions,
            summaryRows,
            errors,
            warnings,
            parsedData
        };
    } catch (error) {
        return {
            isValid: false,
            errors: [
                `파일 파싱 오류: ${error instanceof Error ? error.message : "알 수 없는 오류"}`
            ],
            warnings: []
        };
    }
});
}),
"[project]/src/server/api/routers/screen-generator/_shared/legacy/types.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * 화면 생성기 공통 타입 정의
 */ // ========================================
// DB 메타데이터 타입
// ========================================
__turbopack_context__.s([
    "HEADER_TO_COLUMN_MAP",
    ()=>HEADER_TO_COLUMN_MAP,
    "OPTION_MAPPING",
    ()=>OPTION_MAPPING
]);
const HEADER_TO_COLUMN_MAP = {
    // 기본 정보
    '자재구분': [
        'mat_gubun',
        'mat_class'
    ],
    '품번': [
        'mat_code',
        'item_code'
    ],
    '품명': [
        'mat_desc',
        'mat_name',
        'item_name'
    ],
    '대분류': [
        'mat_class',
        'category1'
    ],
    '중분류': [
        'mat_class2',
        'category2'
    ],
    '규격': [
        'size',
        'spec'
    ],
    '모델': [
        'model'
    ],
    '년월': [
        'yyyymm'
    ],
    '사업장': [
        'site'
    ],
    // 기초
    '기초': [
        'begin_qty',
        'begin_amt',
        'begin_cost'
    ],
    '기초수량': [
        'begin_qty',
        'opening_qty'
    ],
    '기초금액': [
        'begin_amt',
        'opening_amt'
    ],
    '기초단가': [
        'begin_cost',
        'begin_unit_cost'
    ],
    // 입고
    '입고': [
        'in_qty',
        'in_amt'
    ],
    '입고수량': [
        'in_qty',
        'receipt_qty'
    ],
    '입고금액': [
        'in_amt',
        'receipt_amt'
    ],
    '입고단가': [
        'unit_cost',
        'in_unit_cost'
    ],
    '기타입고수량': [
        'etc_in_qty',
        'other_in_qty'
    ],
    '기타입고금액': [
        'etc_in_amt',
        'other_in_amt'
    ],
    '기타입고단가': [
        'etc_in_cost',
        'other_in_cost'
    ],
    // 출고
    '출고': [
        'out_qty',
        'out_amt'
    ],
    '출고수량': [
        'out_qty',
        'issue_qty'
    ],
    '출고금액': [
        'out_amt',
        'issue_amt'
    ],
    '출고단가': [
        'out_unit_cost'
    ],
    '기타출고수량': [
        'etc_out_qty',
        'other_out_qty'
    ],
    '기타출고금액': [
        'etc_out_amt',
        'other_out_amt'
    ],
    '기타출고단가': [
        'etc_out_cost'
    ],
    // 재고
    '재고': [
        'stock_qty',
        'stock_amt'
    ],
    '재고수량': [
        'stock_qty',
        'balance_qty',
        'end_qty'
    ],
    '재고금액': [
        'stock_amt',
        'balance_amt',
        'end_amt'
    ],
    '재고단가': [
        'stock_cost',
        'balance_cost'
    ],
    // 수량/금액
    '수량': [
        'qty'
    ],
    '금액': [
        'amt',
        'amount'
    ],
    '단가': [
        'cost',
        'unit_cost',
        'price'
    ]
};
const OPTION_MAPPING = {
    '년월': {
        label: '년월',
        type: 'yearmonth'
    },
    '년': {
        label: '년',
        type: 'year'
    },
    '자재': {
        label: '자재',
        type: 'material'
    },
    '거래처': {
        label: '거래처',
        type: 'customer'
    },
    '부서': {
        label: '부서',
        type: 'department'
    },
    '계정': {
        label: '계정',
        type: 'account'
    },
    '모델': {
        label: '모델',
        type: 'model'
    },
    '사업장': {
        label: '사업장',
        type: 'site'
    },
    '비용': {
        label: '비용',
        type: 'expense'
    }
};
}),
"[project]/src/server/api/routers/screen-generator/_shared/legacy/db-metadata.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * DB 메타데이터 로드 및 관리 모듈
 * - DB 테이블/컬럼 메타정보 로드
 * - 테이블 검색 기능
 */ __turbopack_context__.s([
    "clearDbMetadataCache",
    ()=>clearDbMetadataCache,
    "findColumnByKoreanName",
    ()=>findColumnByKoreanName,
    "findTableMeta",
    ()=>findTableMeta,
    "getTableColumns",
    ()=>getTableColumns,
    "loadDbMetadata",
    ()=>loadDbMetadata,
    "searchTables",
    ()=>searchTables
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
// DB 메타데이터 캐시
let dbMetadataCache = null;
function loadDbMetadata() {
    if (dbMetadataCache) return dbMetadataCache;
    const metadataPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](process.cwd(), 'data', 'db_metadata_enhanced.json');
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["existsSync"](metadataPath)) {
        console.log('[DB-META] 메타데이터 파일 없음:', metadataPath);
        return [];
    }
    try {
        const content = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["readFileSync"](metadataPath, 'utf-8');
        dbMetadataCache = JSON.parse(content);
        console.log(`[DB-META] 메타데이터 로드 완료: ${dbMetadataCache.length}개 테이블`);
        return dbMetadataCache;
    } catch (error) {
        console.error('[DB-META] 메타데이터 파싱 오류:', error);
        return [];
    }
}
function findTableMeta(tableName) {
    const metadata = loadDbMetadata();
    return metadata.find((t)=>t.name.toLowerCase() === tableName.toLowerCase());
}
function clearDbMetadataCache() {
    dbMetadataCache = null;
}
function searchTables(keyword, limit = 10) {
    const metadata = loadDbMetadata();
    const keywordLower = keyword.toLowerCase();
    return metadata.filter((t)=>t.name.toLowerCase().includes(keywordLower) || t.korean_name.toLowerCase().includes(keywordLower)).slice(0, limit);
}
function getTableColumns(tableName) {
    const tableMeta = findTableMeta(tableName);
    if (!tableMeta) return [];
    return tableMeta.columns.map((col)=>col.name);
}
function findColumnByKoreanName(tableName, koreanName) {
    const tableMeta = findTableMeta(tableName);
    if (!tableMeta) return null;
    const column = tableMeta.columns.find((col)=>col.korean_name.toLowerCase().includes(koreanName.toLowerCase()));
    return column?.name || null;
}
}),
"[project]/src/server/api/routers/screen-generator/_shared/legacy/id-generator.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * 화면 ID 생성 모듈
 * - SC + 6자리 숫자 형식 (예: SC000001)
 */ __turbopack_context__.s([
    "extractScreenNumber",
    ()=>extractScreenNumber,
    "generateScreenId",
    ()=>generateScreenId,
    "isValidScreenId",
    ()=>isValidScreenId
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
async function generateScreenId() {
    try {
        const screensDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](process.cwd(), 'generated', 'screens');
        let maxNum = 0;
        if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["existsSync"](screensDir)) {
            const dirs = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["readdirSync"](screensDir);
            for (const dir of dirs){
                if (dir.startsWith('SC') && dir.length === 8) {
                    const num = parseInt(dir.slice(2), 10);
                    if (!isNaN(num) && num > maxNum) {
                        maxNum = num;
                    }
                }
            }
        }
        // 다음 번호로 ID 생성
        const nextNum = maxNum + 1;
        return `SC${nextNum.toString().padStart(6, '0')}`;
    } catch (error) {
        console.error('[ID-GEN] 화면 ID 생성 오류:', error);
        // 실패시 타임스탬프 기반 ID
        return `SC${Date.now().toString().slice(-6)}`;
    }
}
function isValidScreenId(screenId) {
    const pattern = /^SC\d{6}$/;
    return pattern.test(screenId);
}
function extractScreenNumber(screenId) {
    if (!isValidScreenId(screenId)) {
        throw new Error(`Invalid screen ID: ${screenId}`);
    }
    return parseInt(screenId.slice(2), 10);
}
}),
"[project]/src/server/api/routers/screen-generator/_shared/legacy/api-key.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Anthropic API 키 관리 모듈
 * - 환경 변수 및 .env 파일에서 API 키 로드
 */ __turbopack_context__.s([
    "getAnthropicApiKey",
    ()=>getAnthropicApiKey,
    "isValidApiKey",
    ()=>isValidApiKey
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
function getAnthropicApiKey() {
    // 1. .env.local 파일에서 직접 읽기 시도
    const envLocalPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](process.cwd(), '.env.local');
    if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["existsSync"](envLocalPath)) {
        const content = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["readFileSync"](envLocalPath, 'utf-8');
        const match = content.match(/^ANTHROPIC_API_KEY=(.+)$/m);
        if (match && match[1]) {
            const key = match[1].trim();
            if (key.length >= 100) {
                console.log(`[API-KEY] .env.local에서 API 키 로드 (${key.length}자)`);
                return key;
            }
        }
    }
    // 2. .env 파일에서 직접 읽기 시도
    const envPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](process.cwd(), '.env');
    if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["existsSync"](envPath)) {
        const content = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["readFileSync"](envPath, 'utf-8');
        const match = content.match(/^ANTHROPIC_API_KEY=(.+)$/m);
        if (match && match[1]) {
            const key = match[1].trim();
            if (key.length >= 100) {
                console.log(`[API-KEY] .env에서 API 키 로드 (${key.length}자)`);
                return key;
            }
        }
    }
    // 3. 환경 변수에서 가져오기 (폴백)
    const envKey = (process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY)?.trim();
    if (envKey && envKey.length >= 100) {
        console.log(`[API-KEY] 환경 변수에서 API 키 로드 (${envKey.length}자)`);
        return envKey;
    }
    console.log(`[API-KEY] API 키를 찾을 수 없거나 잘려있음`);
    return null;
}
function isValidApiKey(apiKey) {
    if (!apiKey) return false;
    // Anthropic API 키 형식: sk-ant- 로 시작
    if (!apiKey.startsWith('sk-ant-')) {
        console.warn('[API-KEY] 키가 sk-ant-로 시작하지 않음');
    }
    // 최소 길이 검증 (일반적으로 100자 이상)
    return apiKey.length >= 100;
}
}),
"[project]/src/server/api/routers/screen-generator/_shared/legacy/query-generator.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * SQL 쿼리 자동 생성 모듈
 * 
 * 이 모듈은 향후 LLM 교체를 고려하여 분리되었습니다.
 * - 현재: 규칙 기반 쿼리 생성
 * - 향후: LLM 기반 쿼리 생성으로 교체 가능
 */ __turbopack_context__.s([
    "buildQueryPrompt",
    ()=>buildQueryPrompt,
    "generateSqlQuery",
    ()=>generateSqlQuery,
    "generateSqlQueryWithLLM",
    ()=>generateSqlQueryWithLLM
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$db$2d$metadata$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/legacy/db-metadata.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/legacy/types.ts [app-route] (ecmascript)");
;
;
function generateSqlQuery(parsedData, tableName) {
    try {
        // 1. DB 메타데이터에서 테이블 정보 조회
        const tableMeta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$db$2d$metadata$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findTableMeta"])(tableName);
        if (!tableMeta) {
            const metadata = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$db$2d$metadata$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadDbMetadata"])();
            return {
                success: false,
                error: `테이블 '${tableName}'을(를) 찾을 수 없습니다. DB 메타데이터를 확인하세요.`,
                availableTables: metadata.slice(0, 20).map((t)=>t.name)
            };
        }
        // 2. 조회조건에서 WHERE 절 컬럼 추출
        const searchConditions = parsedData.searchConditions || [];
        const { whereColumns, columnMappings } = extractWhereColumns(searchConditions, tableMeta);
        // 3. 그리드 컬럼에서 SELECT 절 컬럼 추출
        const gridColumns = parsedData.gridColumns;
        const { selectColumns, selectMappings, allColumnMappings } = extractSelectColumns(gridColumns, tableMeta);
        // 4. SQL 쿼리 생성
        const sql = buildSqlQuery(parsedData.screenName || '화면', tableName, tableMeta, allColumnMappings, selectColumns, columnMappings);
        // 5. 통계 및 결과 반환
        const unmatchedHeaders = allColumnMappings.filter((m)=>!m.isMapped).map((m)=>m.gridHeader);
        const mappedCount = allColumnMappings.filter((m)=>m.isMapped).length;
        const unmappedCount = allColumnMappings.filter((m)=>!m.isMapped).length;
        return {
            success: true,
            sql,
            tableMeta: {
                name: tableMeta.name,
                korean_name: tableMeta.korean_name,
                columnCount: tableMeta.columns.length,
                availableColumns: tableMeta.columns.map((c)=>c.name)
            },
            columnMappings,
            selectMappings,
            allColumnMappings,
            unmatchedHeaders,
            stats: {
                totalColumns: allColumnMappings.length,
                mappedCount,
                unmappedCount
            }
        };
    } catch (error) {
        return {
            success: false,
            error: `쿼리 생성 오류: ${error instanceof Error ? error.message : "알 수 없는 오류"}`
        };
    }
}
/**
 * 조회조건에서 WHERE 절 컬럼 추출
 */ function extractWhereColumns(searchConditions, tableMeta) {
    const whereColumns = [];
    const columnMappings = [];
    for (const sc of searchConditions){
        const label = sc.label?.toString() || '';
        const scId = sc.id?.toString().toLowerCase() || '';
        // 1차: 매핑 사전에서 찾기
        let matchedColName = null;
        const mappedCols = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HEADER_TO_COLUMN_MAP"][label];
        if (mappedCols) {
            for (const candidate of mappedCols){
                const found = tableMeta.columns.find((c)=>c.name.toLowerCase() === candidate.toLowerCase());
                if (found) {
                    matchedColName = found.name;
                    break;
                }
            }
        }
        // 2차: 메타데이터에서 직접 찾기
        if (!matchedColName) {
            const matchedCol = tableMeta.columns.find((col)=>{
                const colName = col.name.toLowerCase();
                const korName = col.korean_name.toLowerCase();
                return colName.includes(scId) || korName.includes(label.toLowerCase()) || scId.includes(colName);
            });
            if (matchedCol) matchedColName = matchedCol.name;
        }
        if (matchedColName) {
            whereColumns.push(matchedColName);
            const col = tableMeta.columns.find((c)=>c.name === matchedColName);
            columnMappings.push({
                label: sc.label,
                dbColumn: matchedColName,
                type: col?.type || 'unknown'
            });
        } else {
            columnMappings.push({
                label: sc.label,
                dbColumn: sc.id || 'UNKNOWN',
                type: 'unknown'
            });
        }
    }
    return {
        whereColumns,
        columnMappings
    };
}
/**
 * 그리드 컬럼에서 SELECT 절 컬럼 추출
 */ function extractSelectColumns(gridColumns, tableMeta) {
    const selectColumns = [];
    const selectMappings = [];
    const allColumnMappings = [];
    const row2 = gridColumns?.row2 || [];
    const row3 = gridColumns?.row3 || [];
    // 기본 컬럼 추가 (그룹화/정렬용)
    const baseColumns = [
        'yyyymm',
        'site',
        'mat_gubun',
        'mat_code',
        'mat_desc',
        'size'
    ];
    for (const col of baseColumns){
        const found = tableMeta.columns.find((c)=>c.name.toLowerCase() === col);
        if (found && !selectColumns.includes(found.name)) {
            selectColumns.push(found.name);
        }
    }
    // row3 (상세 헤더) 기반 매핑
    for(let i = 0; i < row3.length; i++){
        const groupHeader = row2[i]?.toString().trim() || '';
        const detailHeader = row3[i]?.toString().trim() || '';
        const h = detailHeader || groupHeader;
        if (!h || h.includes('합계')) continue;
        // 1차: 매핑 사전에서 찾기
        let matchedColName = null;
        const mappedCols = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HEADER_TO_COLUMN_MAP"][h];
        if (mappedCols) {
            for (const candidate of mappedCols){
                const found = tableMeta.columns.find((c)=>c.name.toLowerCase() === candidate.toLowerCase());
                if (found && !selectColumns.includes(found.name)) {
                    matchedColName = found.name;
                    break;
                }
            }
        }
        // 2차: 메타데이터에서 직접 찾기
        if (!matchedColName) {
            const matchedCol = tableMeta.columns.find((col)=>{
                const colName = col.name.toLowerCase();
                const korName = col.korean_name.toLowerCase();
                const hLower = h.toLowerCase();
                return (colName === hLower || korName === hLower || hLower.includes(colName) || hLower.includes(korName)) && !selectColumns.includes(col.name);
            });
            if (matchedCol) matchedColName = matchedCol.name;
        }
        if (matchedColName) {
            selectColumns.push(matchedColName);
            const col = tableMeta.columns.find((c)=>c.name === matchedColName);
            selectMappings.push({
                gridHeader: h,
                dbColumn: matchedColName,
                type: col?.type || 'unknown',
                alias: h
            });
            allColumnMappings.push({
                gridHeader: h,
                dbColumn: matchedColName,
                type: col?.type || 'unknown',
                alias: h,
                isMapped: true
            });
        } else {
            allColumnMappings.push({
                gridHeader: h,
                dbColumn: null,
                type: 'unknown',
                alias: h,
                isMapped: false
            });
        }
    }
    // SELECT 컬럼이 없으면 전체 컬럼 사용 (비즈니스 컬럼만)
    if (allColumnMappings.length === 0) {
        const businessColumns = tableMeta.columns.filter((col)=>!col.name.toLowerCase().includes('create') && !col.name.toLowerCase().includes('update') && !col.name.toLowerCase().includes('delete'));
        for (const col of businessColumns.slice(0, 20)){
            selectColumns.push(col.name);
            selectMappings.push({
                gridHeader: col.korean_name || col.name,
                dbColumn: col.name,
                type: col.type,
                alias: col.korean_name || col.name
            });
            allColumnMappings.push({
                gridHeader: col.korean_name || col.name,
                dbColumn: col.name,
                type: col.type,
                alias: col.korean_name || col.name,
                isMapped: true
            });
        }
    }
    return {
        selectColumns,
        selectMappings,
        allColumnMappings
    };
}
/**
 * SQL 쿼리 문자열 생성
 */ function buildSqlQuery(screenName, tableName, tableMeta, allColumnMappings, selectColumns, columnMappings) {
    // SELECT 절 생성
    const selectItems = allColumnMappings.length > 0 ? allColumnMappings.map((m, index)=>{
        const isLast = index === allColumnMappings.length - 1;
        const comma = isLast ? '' : ',';
        if (m.isMapped && m.dbColumn) {
            return `  ${m.dbColumn} AS "${m.alias}"${comma}`;
        } else {
            return `  '' AS "${m.alias}"${comma}  -- TODO: 미매핑`;
        }
    }) : selectColumns.map((c, index)=>{
        const isLast = index === selectColumns.length - 1;
        return `  ${c}${isLast ? '' : ','}`;
    });
    const selectClause = selectItems.join('\n');
    // WHERE 절 생성
    let whereClause = '';
    if (columnMappings.length > 0) {
        const conditions = columnMappings.filter((m)=>m.dbColumn !== 'UNKNOWN').map((m)=>{
            if (m.type.includes('varchar') || m.type.includes('text')) {
                return `  AND ${m.dbColumn} = :${m.dbColumn}`;
            } else if (m.type.includes('date') || m.type.includes('timestamp')) {
                return `  AND ${m.dbColumn} BETWEEN :${m.dbColumn}_start AND :${m.dbColumn}_end`;
            } else {
                return `  AND ${m.dbColumn} = :${m.dbColumn}`;
            }
        });
        whereClause = conditions.join('\n');
    }
    // 미매핑 헤더 추출
    const unmatchedHeaders = allColumnMappings.filter((m)=>!m.isMapped).map((m)=>m.gridHeader);
    // 미매핑 컬럼에 대한 주석 생성
    let unmatchedComment = '';
    if (unmatchedHeaders.length > 0) {
        unmatchedComment = `
-- ⚠️ 미매핑 컬럼 ${unmatchedHeaders.length}개 (빈값으로 처리됨 - JOIN 또는 계산 필요):
-- ${unmatchedHeaders.join(', ')}
-- 
-- 💡 힌트: 자재수불부는 보통 다음과 같은 구조가 필요합니다:
--   - 기초 = 전월 재고
--   - 입고 = 당월 입고 합계
--   - 출고 = 당월 출고 합계  
--   - 재고 = 기초 + 입고 - 출고
-- 별도 테이블 JOIN 또는 서브쿼리/CTE로 계산 필요
`;
    }
    // 최종 SQL 생성
    const sql = `-- ${screenName} 조회 쿼리
-- 생성일시: ${new Date().toISOString()}
-- 테이블: ${tableName}
-- 사용 가능 컬럼: ${tableMeta.columns.length}개
${unmatchedComment}
SELECT
${selectClause}
FROM ${tableName}
WHERE 1=1
${whereClause}
ORDER BY ${selectColumns[0] || 'yyyymm'} DESC
;`;
    return sql;
}
async function generateSqlQueryWithLLM(parsedData, tableName, provider) {
    // TODO: LLM 기반 쿼리 생성 구현
    // 1. 프롬프트 생성
    // 2. LLM API 호출
    // 3. 응답 파싱 및 검증
    // 4. 결과 반환
    // 현재는 규칙 기반 생성으로 폴백
    console.log(`[QUERY-GEN] LLM provider '${provider.name}' 요청됨, 규칙 기반으로 폴백`);
    return generateSqlQuery(parsedData, tableName);
}
function buildQueryPrompt(parsedData, tableMeta) {
    const columnInfo = tableMeta.columns.map((c)=>`  - ${c.name} (${c.korean_name}): ${c.type}`).join('\n');
    return `
다음 정보를 바탕으로 SQL SELECT 쿼리를 생성해주세요.

## 화면 정보
- 화면명: ${parsedData.screenName}
- 테이블: ${tableMeta.name} (${tableMeta.korean_name})

## 테이블 컬럼 정보
${columnInfo}

## 조회조건
${JSON.stringify(parsedData.searchConditions || [], null, 2)}

## 그리드 컬럼
${JSON.stringify(parsedData.gridColumns?.row3 || [], null, 2)}

## 요구사항
1. SELECT 절에는 그리드 컬럼에 해당하는 DB 컬럼을 매핑
2. WHERE 절에는 조회조건에 해당하는 필터 추가
3. 적절한 ORDER BY 추가
4. 파라미터 바인딩 형식 사용 (:paramName)
`;
}
}),
"[project]/src/server/api/routers/screen-generator/_shared/legacy/utils/helpers.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * 유틸리티 헬퍼 함수 모음
 */ /**
 * 문자열 첫 글자 대문자 변환
 * @param str 변환할 문자열
 * @returns 첫 글자가 대문자인 문자열
 */ __turbopack_context__.s([
    "capitalize",
    ()=>capitalize,
    "deepClone",
    ()=>deepClone,
    "formatDate",
    ()=>formatDate,
    "formatNumber",
    ()=>formatNumber,
    "getCurrentYearMonth",
    ()=>getCurrentYearMonth,
    "intersection",
    ()=>intersection,
    "isEmpty",
    ()=>isEmpty,
    "koreanToEnglish",
    ()=>koreanToEnglish,
    "sanitizeFilename",
    ()=>sanitizeFilename,
    "toKebabCase",
    ()=>toKebabCase,
    "toSnakeCase",
    ()=>toSnakeCase,
    "unique",
    ()=>unique
]);
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function koreanToEnglish(koreanName) {
    const mappings = {
        '년월': 'yearMonth',
        '년도': 'year',
        '자재': 'material',
        '품번': 'partNumber',
        '품명': 'partName',
        '거래처': 'customer',
        '부서': 'department',
        '계정': 'account',
        '모델': 'model',
        '사업장': 'site',
        '수량': 'qty',
        '금액': 'amount',
        '단가': 'price'
    };
    return mappings[koreanName] || koreanName;
}
function toKebabCase(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[\s_]+/g, '-').toLowerCase();
}
function toSnakeCase(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1_$2').replace(/[\s-]+/g, '_').toLowerCase();
}
function sanitizeFilename(filename) {
    return filename.replace(/[<>:"/\\|?*]/g, '').replace(/\s+/g, '_').trim();
}
function formatNumber(num) {
    return num.toLocaleString('ko-KR');
}
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
function getCurrentYearMonth() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `${year}${month}`;
}
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
function isEmpty(obj) {
    if (obj == null) return true;
    if (Array.isArray(obj)) return obj.length === 0;
    if (typeof obj === 'object') return Object.keys(obj).length === 0;
    if (typeof obj === 'string') return obj.trim().length === 0;
    return false;
}
function intersection(arr1, arr2) {
    const set2 = new Set(arr2);
    return arr1.filter((item)=>set2.has(item));
}
function unique(arr) {
    return [
        ...new Set(arr)
    ];
}
}),
"[project]/src/server/api/routers/screen-generator/_shared/legacy/converters/to-next-page.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Next.js 페이지 변환 모듈
 * 생성된 React 컴포넌트를 실제 동작하는 Next.js 페이지로 변환
 */ __turbopack_context__.s([
    "convertToNextPage",
    ()=>convertToNextPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$utils$2f$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/legacy/utils/helpers.ts [app-route] (ecmascript)");
;
/**
 * 코드에서 사용된 옵션 컴포넌트 감지
 */ function detectUsedOptions(componentCode) {
    const usedOptions = [];
    // 년월 감지
    if (componentCode.match(/년월|기간|type="month"/i)) {
        usedOptions.push({
            type: 'YearMonthPicker',
            label: '년월',
            stateVar: 'yearMonth',
            paramName: 'yearMonth'
        });
    }
    // 년도 감지
    if (componentCode.match(/년도|연도/i) && !componentCode.match(/년월/)) {
        usedOptions.push({
            type: 'YearPicker',
            label: '년도',
            stateVar: 'year',
            paramName: 'year'
        });
    }
    // 자재 감지
    if (componentCode.match(/자재|품목|품번/i)) {
        usedOptions.push({
            type: 'MaterialSelect',
            label: '자재',
            stateVar: 'materialCode',
            paramName: 'materialCode'
        });
    }
    // 거래처 감지
    if (componentCode.match(/거래처|고객/i)) {
        usedOptions.push({
            type: 'CustomerSelect',
            label: '거래처',
            stateVar: 'customerCode',
            paramName: 'customerCode'
        });
    }
    // 부서 감지
    if (componentCode.match(/부서|팀/i)) {
        usedOptions.push({
            type: 'DepartmentSelect',
            label: '부서',
            stateVar: 'deptCode',
            paramName: 'deptCode'
        });
    }
    // 사업장 감지
    if (componentCode.match(/사업장|site/i)) {
        usedOptions.push({
            type: 'SiteSelect',
            label: '사업장',
            stateVar: 'site',
            paramName: 'site'
        });
    }
    // 모델 감지
    if (componentCode.match(/모델/i)) {
        usedOptions.push({
            type: 'ModelSelect',
            label: '모델',
            stateVar: 'modelCode',
            paramName: 'modelCode'
        });
    }
    // 계정 감지
    if (componentCode.match(/계정/i)) {
        usedOptions.push({
            type: 'AccountSelect',
            label: '계정',
            stateVar: 'accountCode',
            paramName: 'accountCode'
        });
    }
    return usedOptions;
}
/**
 * 상태 변수 선언 코드 생성
 */ function generateStateDeclarations(usedOptions) {
    return usedOptions.map((opt)=>{
        if (opt.type === 'YearMonthPicker') {
            return `const [${opt.stateVar}, set${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$utils$2f$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["capitalize"])(opt.stateVar)}] = useState<string>(() => {
    const now = new Date();
    return \`\${now.getFullYear()}\${String(now.getMonth() + 1).padStart(2, '0')}\`;
  });`;
        } else if (opt.type === 'YearPicker') {
            return `const [${opt.stateVar}, set${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$utils$2f$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["capitalize"])(opt.stateVar)}] = useState<string>(String(new Date().getFullYear()));`;
        } else {
            return `const [${opt.stateVar}, set${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$utils$2f$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["capitalize"])(opt.stateVar)}] = useState<string>('');`;
        }
    }).join('\n  ');
}
/**
 * URL 파라미터 생성 코드 생성
 */ function generateParamBuilderCode(usedOptions, screenId) {
    if (usedOptions.length === 0) {
        return `const url = '/api/screens/${screenId.toLowerCase()}/data';`;
    }
    const paramAppends = usedOptions.map((opt)=>`if (${opt.stateVar}) params.append('${opt.paramName}', ${opt.stateVar});`).join('\n      ');
    return `const params = new URLSearchParams();
      ${paramAppends}
      const queryString = params.toString();
      const url = \`/api/screens/${screenId.toLowerCase()}/data\${queryString ? '?' + queryString : ''}\`;`;
}
/**
 * 옵션 컴포넌트 JSX 생성
 */ function generateOptionComponentsJsx(usedOptions) {
    return usedOptions.map((opt)=>{
        return `<${opt.type}
          label="${opt.label}"
          value={${opt.stateVar}}
          onChange={(value) => set${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$utils$2f$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["capitalize"])(opt.stateVar)}(value)}
        />`;
    }).join('\n        ');
}
/**
 * 기본 import 구문 생성
 */ function generateImports() {
    return `'use client';

import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef, RowClassParams } from 'ag-grid-community';
import { Search, RotateCcw, Download, Loader2, Plus, Save, Trash2 } from 'lucide-react';
// 공통 옵션 컴포넌트
import {
  SiteSelect,
  YearMonthPicker,
  YearPicker,
  CustomerSelect,
  MaterialSelect,
  ModelSelect,
  AccountSelect,
  ExpenSelSelect,
  DepartmentSelect,
  SelCodeSelect,
} from "~/components/options";

// AG Grid 모듈 등록 (필수!)
ModuleRegistry.registerModules([AllCommunityModule]);

`;
}
function convertToNextPage(componentCode, screenId, screenName) {
    // ========================================
    // 1. 사용된 옵션 컴포넌트 감지
    // ========================================
    const usedOptions = detectUsedOptions(componentCode);
    // ========================================
    // 2. 코드 생성
    // ========================================
    const stateDeclarations = generateStateDeclarations(usedOptions);
    const paramBuilderCode = generateParamBuilderCode(usedOptions, screenId);
    const optionComponentsJsx = generateOptionComponentsJsx(usedOptions);
    const imports = generateImports();
    // ========================================
    // 3. 기존 코드 정리
    // ========================================
    let cleanedCode = componentCode.replace(/import\s+.*?from\s+['"].*?['"];?\s*/g, '').replace(/['"]use client['"];?\s*/g, '').trim();
    // 컴포넌트명을 영문으로 변환
    const safeComponentName = `Screen${screenId.replace('SC', '')}`;
    cleanedCode = cleanedCode.replace(/export\s+default\s+function\s+[\w가-힣]+\s*\(/, `export default function ${safeComponentName}(`);
    // ========================================
    // 4. 샘플 데이터 → API 호출 코드로 변환
    // ========================================
    cleanedCode = cleanedCode.replace(/const\s+sampleData\s*=\s*\[[\s\S]*?\];/, '// 샘플 데이터는 제거됨 - API에서 조회');
    // useState(sampleData) → 상태 및 API 호출 코드
    cleanedCode = cleanedCode.replace(/const\s*\[\s*rowData\s*,\s*setRowData\s*\]\s*=\s*useState\s*\(\s*sampleData\s*\)/, `const [rowData, setRowData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // 검색 조건 상태
  ${stateDeclarations}

  // 실제 DB 데이터 조회 (버튼 클릭 시에만 호출)
  const fetchData = async () => {
    setLoading(true);
    try {
      ${paramBuilderCode}
      const response = await fetch(url);
      if (!response.ok) throw new Error('데이터 조회 실패');
      const result = await response.json();
      setRowData(result.data || []);
    } catch (error) {
      console.error('데이터 조회 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  // 초기 로드 (컴포넌트 마운트 시 1회만)
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])`);
    // ========================================
    // 5. handleSearch 수정
    // ========================================
    // 패턴 1: console.log만 있는 경우
    cleanedCode = cleanedCode.replace(/const\s+handleSearch\s*=\s*\(\)\s*=>\s*\{\s*console\.log\s*\(\s*['"]검색 실행['"]\s*\)\s*;?\s*\}\s*;?/g, `const handleSearch = () => {
    fetchData();
  };`);
    // 패턴 2: 빈 함수인 경우
    cleanedCode = cleanedCode.replace(/const\s+handleSearch\s*=\s*\(\)\s*=>\s*\{\s*\}\s*;?/g, `const handleSearch = () => {
    fetchData();
  };`);
    // 패턴 3: handleSearch가 없으면 handleReset 위에 추가
    if (!cleanedCode.includes('const handleSearch')) {
        cleanedCode = cleanedCode.replace(/(const\s+handleReset)/, `const handleSearch = () => {
    fetchData();
  };

  $1`);
    }
    // handleReset 수정
    cleanedCode = cleanedCode.replace(/const\s+handleReset\s*=\s*\(\)\s*=>\s*\{[\s\S]*?setRowData\s*\(\s*sampleData\s*\);?\s*\};?/, `const handleReset = () => {
    fetchData();
  };`);
    // ========================================
    // 6. 인라인 HTML → 공통 옵션 컴포넌트로 교체
    // ========================================
    if (usedOptions.length > 0) {
        cleanedCode = cleanedCode.replace(/(<div style=\{\{\s*display:\s*['"]flex['"][\s\S]*?조회조건[\s\S]*?\}\}>\s*)([\s\S]*?)(<div style=\{\{\s*display:\s*['"]flex['"]\s*,\s*gap:\s*8)/, `$1
        ${optionComponentsJsx}
        $3`);
    }
    // 남아있는 인라인 년월 입력 제거
    cleanedCode = cleanedCode.replace(/<div style=\{\{\s*display:\s*['"]flex['"]\s*,\s*flexDirection:\s*['"]column['"]\s*,\s*gap:\s*4\s*\}\}>\s*<label[^>]*>(년월|기간)[^<]*<\/label>\s*<input\s+type="month"[\s\S]*?<\/div>/g, '');
    // 남아있는 인라인 select 제거
    cleanedCode = cleanedCode.replace(/<div style=\{\{\s*display:\s*['"]flex['"]\s*,\s*flexDirection:\s*['"]column['"]\s*,\s*gap:\s*4\s*\}\}>\s*<label[^>]*>(자재|품목|품번|거래처|고객|부서|팀|사업장|모델)[^<]*<\/label>\s*<select[\s\S]*?<\/select>\s*<\/div>/g, '');
    // ========================================
    // 7. AG Grid 높이 수정
    // ========================================
    cleanedCode = cleanedCode.replace(/className="ag-theme-alpine"\s+style=\{\{\s*width:\s*['"]100%['"]\s*,\s*height:\s*\d+\s*,?\s*(minHeight:\s*\d+\s*,?)?\s*\}\}/g, 'className="ag-theme-alpine" style={{ width: \'100%\', flex: 1, minHeight: 300 }}');
    cleanedCode = cleanedCode.replace(/style=\{\{\s*display:\s*['"]flex['"]\s*,\s*flexDirection:\s*['"]column['"]\s*,\s*height:\s*['"]100vh['"]/g, "style={{ display: 'flex', flexDirection: 'column', height: '100%'");
    // ========================================
    // 8. AG Grid 스타일 추가 (인라인 CSS 변수)
    // ========================================
    // ag-theme-alpine div에 CSS 변수 스타일 추가
    cleanedCode = cleanedCode.replace(/className="ag-theme-alpine"\s+style=\{\{([^}]*)\}\}/g, `className="ag-theme-alpine" style={{$1, '--ag-header-background-color': '#dbeafe', '--ag-header-foreground-color': '#1e3a5f', '--ag-row-hover-color': '#eff6ff', '--ag-selected-row-background-color': '#dbeafe', '--ag-border-color': '#e5e7eb', '--ag-font-family': 'inherit', '--ag-font-size': '14px' }}`);
    return imports + cleanedCode;
}
}),
"[project]/src/server/api/routers/screen-generator/_shared/legacy/converters/index.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * 컨버터 모듈 인덱스
 */ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$converters$2f$to$2d$next$2d$page$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/legacy/converters/to-next-page.ts [app-route] (ecmascript)");
;
}),
"[project]/src/server/api/routers/screen-generator/_shared/legacy/templates/ag-grid-styles.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * AG Grid 커스텀 스타일 정의
 */ /**
 * AG Grid 스타일 객체 (인라인 스타일)
 * - styled-jsx 대신 CSS 변수를 인라인으로 적용
 * - 메뉴 hover 색상과 일치하는 헤더 (#dbeafe)
 */ __turbopack_context__.s([
    "AG_GRID_CSS",
    ()=>AG_GRID_CSS,
    "AG_GRID_STYLES",
    ()=>AG_GRID_STYLES,
    "AG_GRID_STYLE_OBJECT",
    ()=>AG_GRID_STYLE_OBJECT,
    "CARBON_COLORS",
    ()=>CARBON_COLORS,
    "COMPONENT_SIZES",
    ()=>COMPONENT_SIZES
]);
const AG_GRID_STYLES = ``;
const AG_GRID_STYLE_OBJECT = `{
    '--ag-header-background-color': '#dbeafe',
    '--ag-header-foreground-color': '#1e3a5f',
    '--ag-row-hover-color': '#eff6ff',
    '--ag-selected-row-background-color': '#dbeafe',
    '--ag-border-color': '#e5e7eb',
    '--ag-font-family': 'inherit',
    '--ag-font-size': '14px',
  }`;
const AG_GRID_CSS = `
.ag-theme-alpine {
  --ag-header-background-color: #dbeafe;
  --ag-header-foreground-color: #1e3a5f;
  --ag-row-hover-color: #eff6ff;
  --ag-selected-row-background-color: #dbeafe;
  --ag-border-color: #e5e7eb;
  --ag-font-size: 14px;
}
.ag-theme-alpine .ag-header-group-cell {
  background: linear-gradient(180deg, #eff6ff 0%, #dbeafe 100%);
  font-weight: 600;
  color: #1e40af;
}
.ag-theme-alpine .ag-header-cell {
  background: linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 100%);
  color: #1e3a5f;
  font-weight: 500;
}
.ag-theme-alpine .ag-header-cell-text {
  font-size: 14px;
}
.ag-theme-alpine .ag-cell {
  font-size: 14px;
}
.ag-row-total {
  background-color: #f8fafc !important;
  font-weight: 600;
  border-top: 2px solid #93c5fd;
  border-bottom: 2px solid #93c5fd;
}
`;
const CARBON_COLORS = {
    // 배경색
    background: '#ffffff',
    layer01: '#f4f4f4',
    layer02: '#e0e0e0',
    // 테두리
    border: '#e0e0e0',
    borderAccent: '#8d8d8d',
    // 텍스트
    textPrimary: '#161616',
    textSecondary: '#525252',
    textPlaceholder: '#a8a8a8',
    // 인터랙티브
    interactive: '#0f62fe',
    interactiveHover: '#0043ce',
    // 상태
    danger: '#da1e28',
    success: '#24a148',
    warning: '#f1c21b'
};
const COMPONENT_SIZES = {
    buttonHeightMedium: 40,
    buttonHeightSmall: 32,
    inputHeight: 40,
    tableHeaderHeight: 40,
    tableRowHeight: 40,
    borderRadius: 0,
    paddingDefault: 16,
    paddingSmall: 12,
    gapDefault: 8,
    gapSection: 24
};
}),
"[project]/src/server/api/routers/screen-generator/_shared/legacy/templates/react-template.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * React 컴포넌트 템플릿 생성
 * JSON 데이터를 기반으로 Sandpack 미리보기용 React 컴포넌트 생성
 */ /**
 * Sandpack용 인라인 옵션 컴포넌트 생성
 */ __turbopack_context__.s([
    "createDefaultGridData",
    ()=>createDefaultGridData,
    "generateReactFromTemplate",
    ()=>generateReactFromTemplate
]);
function generateInlineComponent(sf) {
    const label = sf.label || '검색';
    const type = sf.type?.toLowerCase() || 'text';
    // 년월 선택
    if (type === 'yearmonth' || label.includes('년월') || label.includes('기간')) {
        return `
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 12, color: '#525252' }}>${label}</label>
            <input 
              type="month"
              style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0', borderRadius: 0, minWidth: 140 }}
              defaultValue="${new Date().toISOString().slice(0, 7)}"
            />
          </div>`;
    }
    // 년도 선택
    if (type === 'year' || label.includes('년') && !label.includes('월')) {
        const currentYear = new Date().getFullYear();
        const years = Array.from({
            length: 5
        }, (_, i)=>currentYear - i);
        return `
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 12, color: '#525252' }}>${label}</label>
            <select style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0', borderRadius: 0, minWidth: 100 }}>
              ${years.map((y)=>`<option value="${y}">${y}년</option>`).join('\n              ')}
            </select>
          </div>`;
    }
    // 자재/품목 선택
    if (type === 'material' || label.includes('자재') || label.includes('품목') || label.includes('품번')) {
        return `
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 12, color: '#525252' }}>${label}</label>
            <select style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0', borderRadius: 0, minWidth: 150 }}>
              <option value="">전체</option>
              <option value="MAT001">원자재A</option>
              <option value="MAT002">원자재B</option>
              <option value="MAT003">부품C</option>
            </select>
          </div>`;
    }
    // 거래처 선택
    if (type === 'customer' || label.includes('거래처') || label.includes('고객')) {
        return `
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 12, color: '#525252' }}>${label}</label>
            <select style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0', borderRadius: 0, minWidth: 150 }}>
              <option value="">전체</option>
              <option value="CUST001">거래처A</option>
              <option value="CUST002">거래처B</option>
            </select>
          </div>`;
    }
    // 부서 선택
    if (type === 'department' || label.includes('부서') || label.includes('팀')) {
        return `
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 12, color: '#525252' }}>${label}</label>
            <select style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0', borderRadius: 0, minWidth: 120 }}>
              <option value="">전체</option>
              <option value="DEPT001">영업부</option>
              <option value="DEPT002">생산부</option>
              <option value="DEPT003">관리부</option>
            </select>
          </div>`;
    }
    // 기본 텍스트 입력
    return `
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 12, color: '#525252' }}>${label}</label>
            <input 
              type="text"
              style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0', borderRadius: 0, minWidth: 120 }}
              placeholder="${label}"
            />
          </div>`;
}
function generateReactFromTemplate(parsedData, gridData) {
    const screenName = gridData.screenName || parsedData.screenName || "GeneratedScreen";
    const componentName = screenName.replace(/[^a-zA-Z가-힣0-9]/g, '') || "GeneratedScreen";
    // columnDefs를 문자열로 변환
    const columnDefsStr = JSON.stringify(gridData.columnDefs || [], null, 2).replace(/"type":\s*"numericColumn"/g, '"type": "numericColumn", "cellStyle": { "textAlign": "right" }');
    // sampleData를 문자열로 변환
    const sampleDataStr = JSON.stringify(gridData.sampleData || [], null, 2);
    // summaryData를 문자열로 변환
    const summaryDataStr = gridData.summaryData ? JSON.stringify([
        gridData.summaryData
    ], null, 2) : "[]";
    // searchFields 처리
    const searchFields = gridData.searchFields || [];
    const searchFieldsJsx = searchFields.length > 0 ? searchFields.map((sf)=>generateInlineComponent(sf)).join('') : `
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 12, color: '#525252' }}>기간</label>
            <input 
              type="month"
              style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0', borderRadius: 0, minWidth: 140 }}
              defaultValue="${new Date().toISOString().slice(0, 7)}"
            />
          </div>`;
    return `import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

export default function ${componentName}() {
  const columnDefs = ${columnDefsStr};

  const defaultColDef = {
    sortable: true,
    resizable: true,
    filter: true
  };

  const sampleData = ${sampleDataStr};
  const summaryData = ${summaryDataStr};

  const [rowData, setRowData] = useState(sampleData);

  const handleSearch = () => {
    console.log('검색 실행');
  };

  const handleReset = () => {
    setRowData(sampleData);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: 16, backgroundColor: '#ffffff', fontFamily: 'sans-serif', overflow: 'hidden' }}>
      {/* 제목 */}
      <h1 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: '#161616', flexShrink: 0 }}>
        ${screenName}
      </h1>

      {/* 조회조건 */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'flex-end', 
        gap: 16, 
        marginBottom: 12, 
        padding: 12, 
        backgroundColor: '#f4f4f4', 
        flexShrink: 0, 
        border: '1px solid #e0e0e0' 
      }}>
        ${searchFieldsJsx}
        <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
          <button 
            onClick={handleSearch}
            style={{ 
              height: 32, 
              padding: '0 16px', 
              backgroundColor: '#0f62fe', 
              color: 'white', 
              border: 'none', 
              cursor: 'pointer',
              fontSize: 14
            }}
          >
            검색
          </button>
          <button 
            onClick={handleReset}
            style={{ 
              height: 32, 
              padding: '0 16px', 
              backgroundColor: '#e0e0e0', 
              color: '#161616', 
              border: 'none', 
              cursor: 'pointer',
              fontSize: 14
            }}
          >
            초기화
          </button>
        </div>
      </div>

      {/* AG Grid - 고정 높이 500px */}
      <div className="ag-theme-alpine" style={{ width: '100%', height: 500, minHeight: 500 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pinnedBottomRowData={summaryData.length > 0 ? summaryData : undefined}
        />
      </div>
    </div>
  );
}
`;
}
function createDefaultGridData(parsedData) {
    const { screenName, gridColumns, searchConditions } = parsedData;
    // row3에서 컬럼 헤더 추출
    const headers = gridColumns?.row3 || [];
    const columnDefs = headers.filter((h)=>h && typeof h === 'string' && h.trim()).map((header, index)=>{
        const name = header.trim();
        const field = `col${index}`;
        const isNumeric = name.includes('금액') || name.includes('수량') || name.includes('단가') || name.includes('합계');
        return {
            headerName: name,
            field: field,
            width: isNumeric ? 120 : 100,
            ...isNumeric ? {
                type: 'numericColumn'
            } : {}
        };
    });
    // 샘플 데이터 생성
    const sampleRow = {};
    columnDefs.forEach((col, i)=>{
        const isNumeric = col.type === 'numericColumn';
        sampleRow[col.field] = isNumeric ? (i + 1) * 1000 : `샘플${i + 1}`;
    });
    // 검색 필드 생성
    const searchFields = (searchConditions || []).map((sc)=>({
            label: sc.label || '검색',
            field: sc.id || 'search',
            type: sc.type === 'select' ? 'select' : 'text'
        }));
    return {
        screenName: screenName || '화면',
        columnDefs: columnDefs.length > 0 ? columnDefs : [
            {
                headerName: '항목1',
                field: 'item1',
                width: 100
            },
            {
                headerName: '항목2',
                field: 'item2',
                width: 100
            },
            {
                headerName: '금액',
                field: 'amount',
                width: 120,
                type: 'numericColumn'
            }
        ],
        sampleData: columnDefs.length > 0 ? [
            sampleRow,
            sampleRow,
            sampleRow
        ] : [
            {
                item1: '데이터1',
                item2: 'A',
                amount: 1000
            },
            {
                item1: '데이터2',
                item2: 'B',
                amount: 2000
            },
            {
                item1: '데이터3',
                item2: 'C',
                amount: 3000
            }
        ],
        summaryData: null,
        searchFields: searchFields.length > 0 ? searchFields : [
            {
                label: '검색어',
                field: 'search',
                type: 'text'
            }
        ]
    };
}
}),
"[project]/src/server/api/routers/screen-generator/_shared/legacy/templates/html-template.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * HTML 템플릿 생성
 * JSON 데이터를 기반으로 순수 HTML + AG Grid 미리보기 생성
 */ __turbopack_context__.s([
    "generateHtmlFromTemplate",
    ()=>generateHtmlFromTemplate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$templates$2f$ag$2d$grid$2d$styles$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/legacy/templates/ag-grid-styles.ts [app-route] (ecmascript)");
;
function generateHtmlFromTemplate(parsedData, gridData) {
    const screenName = gridData.screenName || parsedData.screenName || "화면";
    // columnDefs를 문자열로 변환
    const columnDefsStr = JSON.stringify(gridData.columnDefs || [], null, 2);
    // sampleData를 문자열로 변환
    const sampleDataStr = JSON.stringify(gridData.sampleData || [], null, 2);
    // summaryData
    const summaryDataStr = gridData.summaryData ? JSON.stringify([
        gridData.summaryData
    ], null, 2) : "[]";
    return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${screenName}</title>
  <script src="https://cdn.jsdelivr.net/npm/ag-grid-community/dist/ag-grid-community.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ag-grid-community/styles/ag-grid.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ag-grid-community/styles/ag-theme-alpine.css">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif; background: #fff; }
    .container { padding: 16px; height: 100vh; display: flex; flex-direction: column; }
    h1 { font-size: 20px; font-weight: 600; margin-bottom: 16px; color: #161616; }
    .search-area { display: flex; align-items: flex-end; gap: 16px; margin-bottom: 16px; padding: 16px; background: #f4f4f4; border: 1px solid #e0e0e0; }
    .search-field { display: flex; flex-direction: column; gap: 4px; }
    .search-field label { font-size: 12px; color: #525252; }
    .search-field input, .search-field select { height: 32px; padding: 0 8px; border: 1px solid #e0e0e0; min-width: 120px; }
    .btn-group { display: flex; gap: 8px; margin-left: auto; }
    .btn { height: 32px; padding: 0 16px; border: none; cursor: pointer; font-size: 14px; }
    .btn-primary { background: #0f62fe; color: white; }
    .btn-primary:hover { background: #0043ce; }
    .btn-secondary { background: #e0e0e0; color: #161616; }
    .btn-secondary:hover { background: #c6c6c6; }
    .grid-container { flex: 1; min-height: 400px; }
    
    /* AG Grid 커스텀 스타일 */
    ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$templates$2f$ag$2d$grid$2d$styles$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AG_GRID_CSS"]}
  </style>
</head>
<body>
  <div class="container">
    <h1>${screenName}</h1>
    <div class="search-area">
      <div class="search-field">
        <label>기간</label>
        <input type="month" value="${new Date().toISOString().slice(0, 7)}">
      </div>
      <div class="search-field">
        <label>검색어</label>
        <input type="text" placeholder="검색어 입력">
      </div>
      <div class="btn-group">
        <button class="btn btn-primary" onclick="handleSearch()">검색</button>
        <button class="btn btn-secondary" onclick="handleReset()">초기화</button>
      </div>
    </div>
    <div id="myGrid" class="ag-theme-alpine grid-container"></div>
  </div>
  <script>
    const columnDefs = ${columnDefsStr};
    const rowData = ${sampleDataStr};
    const pinnedBottomRowData = ${summaryDataStr};
    
    let gridApi;

    const gridOptions = {
      columnDefs: columnDefs,
      rowData: rowData,
      pinnedBottomRowData: pinnedBottomRowData.length > 0 ? pinnedBottomRowData : undefined,
      defaultColDef: {
        sortable: true,
        resizable: true,
        filter: true
      },
      onGridReady: (params) => {
        gridApi = params.api;
      }
    };
    
    function handleSearch() {
      console.log('검색 실행');
      // 실제 검색 로직 구현
    }
    
    function handleReset() {
      console.log('초기화');
      if (gridApi) {
        gridApi.setRowData(rowData);
      }
    }

    document.addEventListener('DOMContentLoaded', function() {
      const gridDiv = document.querySelector('#myGrid');
      agGrid.createGrid(gridDiv, gridOptions);
    });
  </script>
</body>
</html>`;
}
}),
"[project]/src/server/api/routers/screen-generator/_shared/legacy/templates/index.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * 템플릿 모듈 인덱스
 */ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$templates$2f$ag$2d$grid$2d$styles$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/legacy/templates/ag-grid-styles.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$templates$2f$react$2d$template$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/legacy/templates/react-template.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$templates$2f$html$2d$template$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/legacy/templates/html-template.ts [app-route] (ecmascript)");
;
;
;
}),
"[project]/src/server/api/routers/screen-generator/_shared/legacy/prompts/column-structure.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * 컬럼 구조 설명 생성 (LLM 프롬프트용)
 */ __turbopack_context__.s([
    "buildColumnStructureDescription",
    ()=>buildColumnStructureDescription
]);
function buildColumnStructureDescription(gridColumns) {
    const { row2, row3, merges } = gridColumns;
    // 병합 정보로 그룹 헤더 맵 생성
    const groupMap = new Map();
    for (const merge of merges || []){
        if (merge.startRow === 1 && merge.endRow === 1 && merge.startCol !== merge.endCol) {
            const header = row2[merge.startCol]?.toString().trim();
            if (header) {
                for(let c = merge.startCol; c <= merge.endCol; c++){
                    groupMap.set(c, header);
                }
            }
        }
    }
    // 컬럼 목록 생성
    const columns = [];
    let currentGroup = "";
    for(let col = 0; col < row3.length; col++){
        const group = groupMap.get(col) || "";
        const detail = row3[col]?.toString().trim() || row2[col]?.toString().trim();
        if (!detail) continue;
        if (group && group !== currentGroup) {
            currentGroup = group;
            columns.push(`\n[그룹: ${group}]`);
        }
        if (group) {
            columns.push(`  - ${detail}`);
        } else {
            columns.push(`- ${detail} (단일 컬럼)`);
        }
    }
    return columns.join("\n");
}
}),
"[project]/src/server/api/routers/screen-generator/_shared/legacy/prompts/json-data-prompt.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * JSON 데이터 생성 프롬프트
 * Claude API에 전송하여 AG Grid용 columnDefs와 샘플 데이터를 생성받음
 */ __turbopack_context__.s([
    "buildJsonDataPrompt",
    ()=>buildJsonDataPrompt
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$prompts$2f$column$2d$structure$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/legacy/prompts/column-structure.ts [app-route] (ecmascript)");
;
function buildJsonDataPrompt(parsedData) {
    const { screenName, screenNameEn, tableName, searchConditions, gridColumns } = parsedData;
    // 그리드 컬럼 구조 설명
    const columnStructure = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$prompts$2f$column$2d$structure$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildColumnStructureDescription"])(gridColumns);
    // 옵션 정보 생성
    const optionInfo = searchConditions?.length > 0 ? searchConditions.map((sc)=>`- ${sc.label} (${sc.type})`).join("\n") : "기본: 년월";
    return `다음 Excel 템플릿 정보를 기반으로 AG Grid용 columnDefs와 샘플 데이터를 JSON 형식으로 생성해주세요.

## 화면 정보
- 화면명: ${screenName}
- 화면명(영문): ${screenNameEn || "N/A"}
- 테이블명: ${tableName || "N/A"}

## 사용할 옵션 (공통 컴포넌트)
${optionInfo}

## 그리드 컬럼 구조
${columnStructure}

## 합계 행
${gridColumns.summaryRows?.join(", ") || "없음"}

## 출력 형식 (JSON만 출력!)
\`\`\`json
{
  "screenName": "화면명",
  "columnDefs": [
    { "headerName": "컬럼1", "field": "col1", "width": 100 },
    { "headerName": "컬럼2", "field": "col2", "width": 120, "type": "numericColumn" },
    {
      "headerName": "그룹명",
      "children": [
        { "headerName": "서브1", "field": "sub1", "width": 100 },
        { "headerName": "서브2", "field": "sub2", "width": 100, "type": "numericColumn" }
      ]
    }
  ],
  "sampleData": [
    { "col1": "값1", "col2": 1000, "sub1": "A", "sub2": 500 },
    { "col1": "값2", "col2": 2000, "sub1": "B", "sub2": 600 }
  ],
  "summaryData": { "col1": "합계", "col2": 3000, "sub1": "", "sub2": 1100 },
  "searchFields": [
    { "label": "년월", "field": "yearmonth", "type": "yearmonth" },
    { "label": "자재", "field": "material", "type": "material" }
  ]
}
\`\`\`

## 규칙
1. columnDefs: 그리드 컬럼 구조에 맞게 생성
   - 숫자 컬럼은 "type": "numericColumn" 추가
   - 그룹 헤더가 있으면 children으로 중첩
2. sampleData: 3-5개의 샘플 행
   - 숫자는 Number 타입
3. summaryData: 합계 행 (있는 경우)
4. searchFields: 위 "사용할 옵션" 정보를 기반으로 생성
   - 옵션 타입: yearmonth, year, material, customer, department, account, model, site, expense

JSON만 출력하세요 (설명 없이):`;
}
}),
"[project]/src/server/api/routers/screen-generator/_shared/legacy/prompts/react-component-prompt.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * React 컴포넌트 생성 프롬프트
 * Claude API에 전송하여 완전한 React + AG Grid 컴포넌트를 생성받음
 */ __turbopack_context__.s([
    "buildReactComponentPrompt",
    ()=>buildReactComponentPrompt
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$prompts$2f$column$2d$structure$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/legacy/prompts/column-structure.ts [app-route] (ecmascript)");
;
/**
 * 공통 옵션 컴포넌트 사용 가이드
 */ const OPTION_COMPONENT_GUIDE = `
## 🚨 중요: 공통 옵션 컴포넌트 사용 필수!

검색조건은 반드시 아래 공통 옵션 컴포넌트를 import해서 사용하세요:

\`\`\`tsx
import {
  CustomerSelect,    // 거래처 선택 (label: 거래처, 업체, 고객)
  MaterialSelect,    // 부품/자재 선택 (label: 부품, 자재, 품목)
  ModelSelect,       // 모델 선택 (label: 모델, 제품)
  AccountSelect,     // 계정 선택 (label: 계정, 계정과목)
  ExpenSelSelect,    // 비용구분 선택 (label: 비용구분, 비용, 경비)
  DepartmentSelect,  // 부서 선택 (label: 부서, 팀)
  SiteSelect,        // Site 선택 (label: Site, 사업장, 법인)
  SelCodeSelect,     // SEL_CODE 선택 (label: SEL_CODE, 구분)
  YearMonthPicker,   // 년월 선택 (label: 년월, 기준월, 월)
  YearPicker,        // 년도 선택 (label: 년도, 연도, 기준년)
} from "~/components/options";
\`\`\`

### 옵션 컴포넌트 사용 규칙:
1. **Site** → SiteSelect 사용
2. **년월, 기준월** → YearMonthPicker 사용  
3. **년도, 기준년** → YearPicker 사용
4. **거래처, 업체, 고객** → CustomerSelect 사용
5. **부품, 자재, 품목** → MaterialSelect 사용
6. **모델, 제품** → ModelSelect 사용
7. **계정, 계정과목** → AccountSelect 사용
8. **비용구분, 비용** → ExpenSelSelect 사용
9. **부서** → DepartmentSelect 사용
10. **SEL_CODE** → SelCodeSelect 사용

### 사용 예시:
\`\`\`tsx
// state 정의
const [site, setSite] = useState("HQ");
const [yearMonth, setYearMonth] = useState("");
const [customer, setCustomer] = useState("");

// 컴포넌트 사용
<SiteSelect value={site} onChange={setSite} label="Site" />
<YearMonthPicker value={yearMonth} onChange={setYearMonth} label="기준월" />
<CustomerSelect value={customer} onChange={setCustomer} site={site} label="거래처" />
\`\`\`

주의사항:
- 모든 옵션 컴포넌트는 inline 스타일(라벨 왼쪽) 기본 적용됨
- site prop이 있는 컴포넌트는 Site 연동 필터링 지원
- 직접 input/select 만들지 말고 공통 컴포넌트 사용!
`;
function buildReactComponentPrompt(parsedData, sqlQuery) {
    const { screenName, screenNameEn, tableName, searchConditions, gridColumns } = parsedData;
    // 컬럼 정보 추출
    const columnStructure = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$prompts$2f$column$2d$structure$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildColumnStructureDescription"])(gridColumns);
    return `다음 ERP 화면 정보를 기반으로 AG Grid를 사용하는 React 컴포넌트를 생성해주세요.

## 화면 정보
- 화면명: ${screenName}
- 화면명(영문): ${screenNameEn || screenName.replace(/\s/g, '')}
- 테이블명: ${tableName || "N/A"}

## 조회조건 (검색 필터)
${searchConditions?.map((sc)=>`- ${sc.label} (${sc.type})${sc.required ? " [필수]" : ""}`).join("\n") || "없음"}

## 그리드 컬럼 구조
${columnStructure}

## 합계 행
${gridColumns.summaryRows?.join(", ") || "없음"}

${sqlQuery ? `## SQL 쿼리 참고
\`\`\`sql
${sqlQuery}
\`\`\`` : ""}

${OPTION_COMPONENT_GUIDE}

## 필수 요구사항

### 1. 기술 스택
- TypeScript + React 함수형 컴포넌트
- AG Grid Community (ag-grid-react, ag-grid-community)
- Tailwind CSS
- lucide-react 아이콘
- **공통 옵션 컴포넌트 (~/components/options)**

### 2. 필수 import 구문
\`\`\`tsx
'use client';

import { useMemo, useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef, RowClassParams } from 'ag-grid-community';
import { Search, RotateCcw, Download } from 'lucide-react';
// 🚨 공통 옵션 컴포넌트 import 필수!
import {
  SiteSelect,
  YearMonthPicker,
  YearPicker,
  CustomerSelect,
  MaterialSelect,
  ModelSelect,
  AccountSelect,
  ExpenSelSelect,
  DepartmentSelect,
  SelCodeSelect,
} from "~/components/options";

// AG Grid 모듈 등록 (필수!)
ModuleRegistry.registerModules([AllCommunityModule]);
\`\`\`

### 3. 컬럼 정의 (ColGroupDef 사용)
- 그룹 헤더가 있으면 children으로 중첩
- 숫자 컬럼: type: 'numericColumn', cellStyle: { textAlign: 'right' }
- valueFormatter로 천단위 콤마 적용
- 합계 행 구분: getRowClass로 스타일 적용

### 4. 검색 필터 영역 (공통 옵션 컴포넌트 사용!)
- **직접 input/select 만들지 말고 공통 옵션 컴포넌트 사용!**
- 조회조건 라벨에 맞는 컴포넌트 선택
- 예시:
\`\`\`tsx
<div className="flex flex-wrap items-center gap-4 mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
  <SiteSelect value={site} onChange={setSite} label="Site" />
  <YearMonthPicker value={yearMonth} onChange={setYearMonth} label="기준월" />
  <CustomerSelect value={customer} onChange={setCustomer} site={site} label="거래처" />
  
  {/* 버튼 영역 */}
  <div className="flex gap-2 ml-auto">
    <button className="inline-flex items-center h-9 px-4 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
      <Search className="w-4 h-4 mr-2" />
      조회
    </button>
    <button onClick={handleReset} className="inline-flex items-center h-9 px-4 bg-gray-500 text-white text-sm font-medium rounded-md hover:bg-gray-600">
      <RotateCcw className="w-4 h-4 mr-2" />
      초기화
    </button>
  </div>
</div>
\`\`\`

### 5. AG Grid 설정
\`\`\`tsx
<div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
  <AgGridReact
    rowData={rowData}
    columnDefs={columnDefs}
    defaultColDef={defaultColDef}
    animateRows={true}
    rowHeight={40}
    headerHeight={40}
    groupHeaderHeight={40}
    getRowClass={getRowClass}
  />
</div>
\`\`\`

### 6. 샘플 데이터
- 합계 행 1개 + 일반 데이터 3-5행 포함
- 실제 데이터 형식과 유사하게

### 7. 커스텀 AG Grid 스타일 (style jsx global)
\`\`\`css
.ag-theme-alpine {
  --ag-header-background-color: #e0e0e0;
  --ag-header-foreground-color: #161616;
  --ag-row-hover-color: #e8e8e8;
  --ag-border-color: #e0e0e0;
  --ag-font-size: 13px;
}
.ag-theme-alpine .ag-header-group-cell {
  background-color: #d0d0d0;
  font-weight: 600;
}
.ag-row-total {
  background-color: #f4f4f4 !important;
  font-weight: 600;
}
\`\`\`

## 출력 형식
- 완전한 React 컴포넌트 코드만 출력
- 설명 없이 코드만
- export default 포함
- **검색조건은 반드시 공통 옵션 컴포넌트 사용!**

React 컴포넌트 코드:`;
}
}),
"[project]/src/server/api/routers/screen-generator/_shared/legacy/prompts/index.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * 프롬프트 모듈 인덱스
 */ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$prompts$2f$column$2d$structure$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/legacy/prompts/column-structure.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$prompts$2f$json$2d$data$2d$prompt$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/legacy/prompts/json-data-prompt.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$prompts$2f$react$2d$component$2d$prompt$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/legacy/prompts/react-component-prompt.ts [app-route] (ecmascript)");
;
;
;
}),
"[project]/src/server/api/routers/screen-generator/_shared/legacy/utils/index.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * 유틸리티 모듈 인덱스
 */ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$utils$2f$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/legacy/utils/helpers.ts [app-route] (ecmascript)");
;
}),
"[project]/src/server/api/routers/screen-generator/_shared/legacy/index.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * 화면 생성기 모듈 메인 인덱스
 * 
 * 이 모듈은 screenGenerator.ts에서 분리된 유틸리티 함수들을 제공합니다.
 * 
 * 구조:
 * - types.ts: 공통 타입 정의
 * - db-metadata.ts: DB 메타데이터 로드 및 검색
 * - id-generator.ts: 화면 ID 생성
 * - api-key.ts: API 키 관리
 * - query-generator.ts: SQL 쿼리 생성 (LLM 교체 대비)
 * - converters/: 코드 변환 모듈
 * - templates/: 템플릿 생성 모듈
 * - prompts/: LLM 프롬프트 모듈
 * - utils/: 유틸리티 함수
 */ // 타입 export
__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/legacy/types.ts [app-route] (ecmascript)");
// DB 메타데이터
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$db$2d$metadata$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/legacy/db-metadata.ts [app-route] (ecmascript)");
// ID 생성
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$id$2d$generator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/legacy/id-generator.ts [app-route] (ecmascript)");
// API 키
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$api$2d$key$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/legacy/api-key.ts [app-route] (ecmascript)");
// 쿼리 생성
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$query$2d$generator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/legacy/query-generator.ts [app-route] (ecmascript)");
// 컨버터
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$converters$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/legacy/converters/index.ts [app-route] (ecmascript) <locals>");
// 템플릿
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$templates$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/legacy/templates/index.ts [app-route] (ecmascript) <locals>");
// 프롬프트
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$prompts$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/legacy/prompts/index.ts [app-route] (ecmascript) <locals>");
// 유틸리티
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$utils$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/legacy/utils/index.ts [app-route] (ecmascript) <locals>");
;
;
;
;
;
;
;
;
;
}),
"[project]/src/server/api/routers/screen-generator/templates/base/BaseTemplate.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * 화면 생성 템플릿 기반 클래스
 * 
 * 모든 화면 유형별 템플릿이 상속받아야 하는 추상 클래스
 * 공통 유틸리티 메서드와 인터페이스를 정의합니다.
 * 
 * @module screenGenerator/templates/base/BaseTemplate
 */ __turbopack_context__.s([
    "BaseTemplate",
    ()=>BaseTemplate
]);
class BaseTemplate {
    // ============================================================
    // 공통 유틸리티 메서드
    // ============================================================
    /**
   * 화면 유형 반환
   */ getScreenType() {
        return this.screenType;
    }
    /**
   * 템플릿 설명 반환
   */ getDescription() {
        return this.description;
    }
    /**
   * 컬럼명을 camelCase로 변환
   * @param columnName DB 컬럼명 (snake_case)
   * @returns camelCase 문자열
   */ toCamelCase(columnName) {
        return columnName.toLowerCase().replace(/_([a-z])/g, (_, letter)=>letter.toUpperCase());
    }
    /**
   * 컬럼명을 PascalCase로 변환
   * @param columnName DB 컬럼명 (snake_case)
   * @returns PascalCase 문자열
   */ toPascalCase(columnName) {
        const camel = this.toCamelCase(columnName);
        return camel.charAt(0).toUpperCase() + camel.slice(1);
    }
    /**
   * 화면 ID를 컴포넌트명으로 변환
   * @param screenId 화면 ID (예: SC001)
   * @param screenName 화면명 (예: 거래처관리)
   * @returns 컴포넌트명 (예: SC001CustomerMasterScreen)
   */ getComponentName(screenId, screenName) {
        // 한글 화면명은 영문 suffix로 대체
        const suffix = this.getEnglishSuffix(screenName);
        return `${screenId}${suffix}Screen`;
    }
    /**
   * 한글 화면명에서 영문 suffix 추출
   * @param screenName 한글 화면명
   * @returns 영문 suffix
   */ getEnglishSuffix(screenName) {
        // 화면명 매핑 (확장 가능)
        const nameMapping = {
            '거래처관리': 'CustomerMaster',
            '품목관리': 'ItemMaster',
            '창고관리': 'WarehouseMaster',
            '부서관리': 'DepartmentMaster',
            '직원관리': 'EmployeeMaster',
            '코드관리': 'CommonCode',
            '단위관리': 'UnitMaster',
            '계정과목': 'AccountMaster',
            '프로젝트관리': 'ProjectMaster',
            '설비관리': 'EquipmentMaster'
        };
        return nameMapping[screenName] ?? 'Master';
    }
    /**
   * 파일명 생성 (컴포넌트용)
   * @param screenId 화면 ID
   * @returns 파일명
   */ getFileName(screenId) {
        return `${screenId}Screen.tsx`;
    }
    /**
   * 상대 경로 생성
   * @param screenId 화면 ID
   * @param isTemp 임시 저장 여부
   * @returns 상대 경로
   */ getFilePath(screenId, isTemp = true) {
        const basePath = isTemp ? 'generated/screens/temp' : 'generated/screens/published';
        return `${basePath}/${screenId}/${this.getFileName(screenId)}`;
    }
    /**
   * 컬럼 정의를 AG Grid ColDef 문자열로 변환
   * @param columns 컬럼 정의 배열
   * @returns AG Grid ColDef 코드 문자열
   */ generateColumnDefs(columns) {
        const colDefs = columns.map((col)=>{
            const parts = [];
            parts.push(`headerName: '${col.headerName}'`);
            parts.push(`field: '${col.field}'`);
            if (col.width) {
                parts.push(`width: ${col.width}`);
            }
            if (col.type) {
                parts.push(`type: '${col.type}'`);
            }
            if (col.align) {
                const alignClass = col.align === 'right' ? 'ag-right-aligned-cell' : col.align === 'center' ? 'ag-center-aligned-cell' : '';
                if (alignClass) {
                    parts.push(`cellClass: '${alignClass}'`);
                }
            }
            return `    { ${parts.join(', ')} }`;
        });
        return `[\n${colDefs.join(',\n')}\n  ]`;
    }
    /**
   * Import 문 생성
   * @param imports Import 정보 배열
   * @returns Import 코드 문자열
   */ generateImports(imports) {
        return imports.map(({ items, from, isType })=>{
            const typePrefix = isType ? 'type ' : '';
            return `import { ${typePrefix}${items.join(', ')} } from '${from}';`;
        }).join('\n');
    }
    /**
   * 기본 컴포넌트 코드 래퍼 생성
   * @param componentName 컴포넌트명
   * @param imports Import 코드
   * @param body 컴포넌트 본문
   * @returns 전체 컴포넌트 코드
   */ wrapComponent(componentName, imports, body) {
        return `/**
 * ${componentName}
 * 
 * 이 파일은 AI Factory Lab에 의해 자동 생성되었습니다.
 * 수정이 필요한 경우 직접 편집하거나 재생성해주세요.
 * 
 * @generated
 */

'use client';

${imports}

${body}

export default ${componentName};
`;
    }
    /**
   * 에러 결과 생성 헬퍼
   * @param error 에러 메시지
   * @param screenId 화면 ID
   * @returns 실패 결과 객체
   */ createErrorResult(error, screenId = 'unknown') {
        return {
            success: false,
            filePath: '',
            fileName: '',
            code: '',
            error
        };
    }
    /**
   * 현재 날짜/시간 문자열 (주석용)
   */ getTimestamp() {
        return new Date().toISOString();
    }
}
}),
"[project]/src/server/api/routers/screen-generator/templates/base/index.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * 화면 생성 템플릿 기반 모듈
 * @module screenGenerator/templates/base
 */ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$templates$2f$base$2f$BaseTemplate$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/templates/base/BaseTemplate.ts [app-route] (ecmascript)");
;
}),
"[project]/src/domain/entities/block-schema.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * 블록 기반 화면 생성기 - 타입 정의
 *
 * 4단계 아키텍처(Layered Architecture)를 위한 블록 조립 방식 스키마
 * - 화면을 재사용 가능한 블록 단위로 구성
 * - 각 블록은 독립적인 Props와 동작을 가짐
 * - 런타임 검증을 위한 Zod 스키마 제공
 *
 * @module features/screen-generator/types/block-schema
 */ __turbopack_context__.s([
    "BlockBaseSchema",
    ()=>BlockBaseSchema,
    "BlockSchema",
    ()=>BlockSchema,
    "BlockType",
    ()=>BlockType,
    "BlockTypeSchema",
    ()=>BlockTypeSchema,
    "ChartType",
    ()=>ChartType,
    "ChartTypeSchema",
    ()=>ChartTypeSchema,
    "ChartWidgetBlockSchema",
    ()=>ChartWidgetBlockSchema,
    "CustomBlockSchema",
    ()=>CustomBlockSchema,
    "DataGridBlockSchema",
    ()=>DataGridBlockSchema,
    "GridColumnSchema",
    ()=>GridColumnSchema,
    "KpiWidgetBlockSchema",
    ()=>KpiWidgetBlockSchema,
    "LayoutConfigSchema",
    ()=>LayoutConfigSchema,
    "LayoutType",
    ()=>LayoutType,
    "LayoutTypeSchema",
    ()=>LayoutTypeSchema,
    "PageHeaderBlockSchema",
    ()=>PageHeaderBlockSchema,
    "ScreenSchemaSchema",
    ()=>ScreenSchemaSchema,
    "SearchFieldSchema",
    ()=>SearchFieldSchema,
    "SearchFormBlockSchema",
    ()=>SearchFormBlockSchema,
    "TabContainerBlockSchema",
    ()=>TabContainerBlockSchema,
    "TabItemSchema",
    ()=>TabItemSchema,
    "ToolbarBlockSchema",
    ()=>ToolbarBlockSchema,
    "ToolbarButtonSchema",
    ()=>ToolbarButtonSchema,
    "isChartWidgetBlock",
    ()=>isChartWidgetBlock,
    "isCustomBlock",
    ()=>isCustomBlock,
    "isDataGridBlock",
    ()=>isDataGridBlock,
    "isKpiWidgetBlock",
    ()=>isKpiWidgetBlock,
    "isPageHeaderBlock",
    ()=>isPageHeaderBlock,
    "isSearchFormBlock",
    ()=>isSearchFormBlock,
    "isTabContainerBlock",
    ()=>isTabContainerBlock,
    "isToolbarBlock",
    ()=>isToolbarBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
;
var BlockType = /*#__PURE__*/ function(BlockType) {
    /** 페이지 헤더 (제목, 설명, 브레드크럼) */ BlockType["PAGE_HEADER"] = "PAGE_HEADER";
    /** 검색 폼 (조회 조건) */ BlockType["SEARCH_FORM"] = "SEARCH_FORM";
    /** 데이터 그리드 (AG Grid) */ BlockType["DATA_GRID"] = "DATA_GRID";
    /** KPI 위젯 (통계 카드) */ BlockType["KPI_WIDGET"] = "KPI_WIDGET";
    /** 차트 위젯 (Line, Bar, Pie 등) */ BlockType["CHART_WIDGET"] = "CHART_WIDGET";
    /** 툴바 (버튼 그룹) */ BlockType["TOOLBAR"] = "TOOLBAR";
    /** 탭 컨테이너 (여러 탭으로 구성된 화면) */ BlockType["TAB_CONTAINER"] = "TAB_CONTAINER";
    /** 커스텀 블록 (사용자 정의) */ BlockType["CUSTOM"] = "CUSTOM";
    return BlockType;
}({});
var LayoutType = /*#__PURE__*/ function(LayoutType) {
    /** 단일 컬럼 레이아웃 (세로 스택) */ LayoutType["SINGLE_COLUMN"] = "SINGLE_COLUMN";
    /** 2컬럼 레이아웃 (좌우 분할) */ LayoutType["TWO_COLUMNS"] = "TWO_COLUMNS";
    /** 그리드 레이아웃 (자동 배치) */ LayoutType["GRID"] = "GRID";
    /** 대시보드 레이아웃 (자유 배치) */ LayoutType["DASHBOARD"] = "DASHBOARD";
    return LayoutType;
}({});
var ChartType = /*#__PURE__*/ function(ChartType) {
    ChartType["LINE"] = "LINE";
    ChartType["BAR"] = "BAR";
    ChartType["PIE"] = "PIE";
    ChartType["DONUT"] = "DONUT";
    ChartType["AREA"] = "AREA";
    ChartType["SCATTER"] = "SCATTER";
    ChartType["HEATMAP"] = "HEATMAP";
    return ChartType;
}({});
const BlockTypeSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].nativeEnum(BlockType);
const LayoutTypeSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].nativeEnum(LayoutType);
const LayoutConfigSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    type: LayoutTypeSchema,
    gap: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
    padding: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
    columns: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(1).max(12).optional(),
    columnRatio: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].tuple([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number()
    ]).optional()
});
const BlockBaseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    type: BlockTypeSchema,
    title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    order: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    visible: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].union([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    ]).optional(),
    className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    style: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].union([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number()
    ])).optional()
});
const SearchFieldSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'text',
        'number',
        'date',
        'dateRange',
        'select',
        'multiSelect',
        'siteSelect',
        'scenarioSelect',
        'yearMonthPicker',
        'checkbox'
    ]),
    required: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional(),
    defaultValue: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].union([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].tuple([
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
        ])
    ]).optional(),
    options: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        value: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })).optional(),
    optionsApi: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    placeholder: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    width: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(1).max(12).optional()
});
const GridColumnSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    field: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    headerName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    width: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'text',
        'number',
        'date',
        'datetime',
        'boolean',
        'select',
        'custom'
    ]).optional(),
    editable: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional(),
    sortable: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional(),
    filterable: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional(),
    align: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'left',
        'center',
        'right'
    ]).optional(),
    hidden: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional(),
    pinned: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'left',
        'right'
    ]).optional(),
    cellRenderer: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    valueFormatter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    cellStyle: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].union([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number()
    ])).optional(),
    children: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].lazy(()=>GridColumnSchema.array()).optional()
});
const ToolbarButtonSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    variant: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'primary',
        'secondary',
        'success',
        'danger',
        'ghost'
    ]).optional(),
    onClick: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    disabled: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].union([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    ]).optional(),
    visible: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].union([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    ]).optional(),
    tooltip: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
const PageHeaderBlockSchema = BlockBaseSchema.extend({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("PAGE_HEADER"),
    title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    breadcrumbs: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        href: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
    })).optional(),
    actions: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        onClick: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        variant: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
            'primary',
            'secondary',
            'ghost'
        ]).optional()
    })).optional()
});
const SearchFormBlockSchema = BlockBaseSchema.extend({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("SEARCH_FORM"),
    fields: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(SearchFieldSchema),
    searchButtonLabel: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    showResetButton: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional(),
    resetButtonLabel: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    onSearch: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    onReset: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    collapsible: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional(),
    defaultCollapsed: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional()
});
const DataGridBlockSchema = BlockBaseSchema.extend({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("DATA_GRID"),
    columns: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(GridColumnSchema),
    apiEndpoint: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    tableName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    primaryKey: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    selectColumns: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).optional(),
    rowSelection: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'single',
        'multiple',
        'none'
    ]).optional(),
    showCheckboxSelection: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional(),
    enableSelection: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional(),
    pagination: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional(),
    pageSize: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
    height: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].union([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal('auto')
    ]).optional(),
    editable: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional(),
    onCellValueChanged: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    onRowSelected: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    onRowDoubleClicked: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    onDelete: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    onSave: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    onCreate: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    sortModel: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        field: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        order: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
            'asc',
            'desc'
        ])
    })).optional(),
    rowGrouping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        enabled: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
        groupBy: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string())
    }).optional(),
    showSummaryRow: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional(),
    summaryRowCalculator: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    loadingText: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    noRowsText: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
const KpiWidgetBlockSchema = BlockBaseSchema.extend({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("KPI_WIDGET"),
    title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    value: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].union([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number()
    ]),
    valueApi: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    unit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    changeRate: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
    showChangeRate: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional(),
    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    theme: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'primary',
        'success',
        'warning',
        'danger',
        'info'
    ]).optional(),
    onClick: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    showTrendChart: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional(),
    trendChartApi: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
const ChartTypeSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].nativeEnum(ChartType);
const ChartWidgetBlockSchema = BlockBaseSchema.extend({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("CHART_WIDGET"),
    title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    chartType: ChartTypeSchema,
    dataApi: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    height: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
    xField: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    yField: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].union([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string())
    ]).optional(),
    seriesField: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    chartOptions: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any()).optional(),
    showLegend: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional(),
    showTooltip: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional(),
    showGridLines: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional()
});
const ToolbarBlockSchema = BlockBaseSchema.extend({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("TOOLBAR"),
    buttons: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(ToolbarButtonSchema),
    alignment: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'left',
        'center',
        'right',
        'space-between'
    ]).optional(),
    size: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'small',
        'medium',
        'large'
    ]).optional(),
    gap: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional()
});
const TabItemSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    blocks: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].lazy(()=>BlockSchema.array()),
    disabled: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional()
});
const TabContainerBlockSchema = BlockBaseSchema.extend({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("TAB_CONTAINER"),
    tabs: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(TabItemSchema),
    defaultActiveTab: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    onTabChange: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
const CustomBlockSchema = BlockBaseSchema.extend({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("CUSTOM"),
    componentName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    componentProps: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any()).optional()
});
const BlockSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].discriminatedUnion('type', [
    PageHeaderBlockSchema,
    SearchFormBlockSchema,
    DataGridBlockSchema,
    KpiWidgetBlockSchema,
    ChartWidgetBlockSchema,
    ToolbarBlockSchema,
    TabContainerBlockSchema,
    CustomBlockSchema
]);
const ScreenSchemaSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    screenId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    screenName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    screenNameEn: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    path: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    layout: LayoutConfigSchema,
    blocks: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(BlockSchema),
    metadata: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        author: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        version: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        tags: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).optional()
    }).optional()
});
function isPageHeaderBlock(block) {
    return block.type === "PAGE_HEADER";
}
function isSearchFormBlock(block) {
    return block.type === "SEARCH_FORM";
}
function isDataGridBlock(block) {
    return block.type === "DATA_GRID";
}
function isKpiWidgetBlock(block) {
    return block.type === "KPI_WIDGET";
}
function isChartWidgetBlock(block) {
    return block.type === "CHART_WIDGET";
}
function isToolbarBlock(block) {
    return block.type === "TOOLBAR";
}
function isTabContainerBlock(block) {
    return block.type === "TAB_CONTAINER";
}
function isCustomBlock(block) {
    return block.type === "CUSTOM";
}
}),
"[project]/src/server/api/routers/screen-generator/templates/simple-grid-crud/SimpleGridCrudTemplate.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Simple Grid CRUD 템플릿 (블록 기반 리팩토링)
 *
 * 기존: 전체 React 컴포넌트 코드를 생성 (873줄)
 * 신규: ScreenSchema JSON만 생성 → BlockRenderer가 렌더링
 *
 * 표준 화면: /master/dept (부서관리)
 *
 * @module screenGenerator/templates/simpleGridCrud
 */ __turbopack_context__.s([
    "SimpleGridCrudTemplate",
    ()=>SimpleGridCrudTemplate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$templates$2f$base$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/templates/base/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$templates$2f$base$2f$BaseTemplate$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/templates/base/BaseTemplate.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/types.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$entities$2f$block$2d$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/domain/entities/block-schema.ts [app-route] (ecmascript)");
;
;
;
// ============================================================
// 타입 가드
// ============================================================
/**
 * ParsedData가 CrudParsedData인지 확인
 */ function isCrudParsedData(data) {
    return (data.screenType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ScreenType"].SIMPLE_GRID_CRUD || data.screenType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ScreenType"].COMPLEX_GRID_CRUD) && 'crudConfig' in data && 'crudColumns' in data;
}
class SimpleGridCrudTemplate extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$templates$2f$base$2f$BaseTemplate$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseTemplate"] {
    screenType = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ScreenType"].SIMPLE_GRID_CRUD;
    description = '단순 CRUD 화면 (기준정보 관리)';
    // ============================================================
    // 컴포넌트 생성 (ScreenSchema JSON 생성)
    // ============================================================
    /**
   * CRUD 화면 컴포넌트 생성
   *
   * 기존: generateFullComponent() → React 코드 873줄
   * 신규: ComponentGenerator.generate() → ScreenSchema를 사용하는 React 컴포넌트
   */ async generateComponent(data) {
        // 타입 체크
        if (!isCrudParsedData(data)) {
            return this.createErrorResult('Invalid data: CrudParsedData required', data.screenId ?? 'unknown');
        }
        const screenId = data.screenId ?? 'SC000';
        const componentName = this.getComponentName(screenId, data.screenName);
        try {
            // ScreenSchema 생성
            const schema = this.generateScreenSchema(data);
            // 직접 인라인 코드 생성 (Sandpack 호환)
            const code = this.generateComponentCode(componentName, schema);
            return {
                success: true,
                filePath: this.getFilePath(screenId, true),
                fileName: this.getFileName(screenId),
                code
            };
        } catch (error) {
            return this.createErrorResult(`Component generation failed: ${error instanceof Error ? error.message : String(error)}`, screenId);
        }
    }
    /**
   * React 컴포넌트 코드 생성 (Sandpack 호환)
   * JSON 스키마를 기반으로 인라인 렌더링 코드 생성
   * 
   * 개선사항 (2025-12-14):
   * - AG Grid 커스텀 스타일 (파란색 헤더)
   * - CRUD 툴바 (행추가/저장/삭제/엑셀)
   * - 상태 관리 (modifiedRows, deletedRows)
   * - 참조: /master/dept
   */ generateComponentCode(componentName, schema) {
        // DATA_GRID 블록 찾기
        const gridBlock = schema.blocks.find((b)=>b.type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$entities$2f$block$2d$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BlockType"].DATA_GRID);
        const searchBlock = schema.blocks.find((b)=>b.type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$entities$2f$block$2d$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BlockType"].SEARCH_FORM);
        if (!gridBlock) {
            throw new Error('DATA_GRID 블록을 찾을 수 없습니다.');
        }
        const columns = gridBlock.columns || [];
        const searchFields = searchBlock?.fields || [];
        const primaryKey = gridBlock.primaryKey || 'id';
        // 컬럼 정의 (JSON 기반) - 체크박스 컬럼 추가
        const columnDefsArray = [
            // 체크박스 선택 컬럼
            {
                headerCheckboxSelection: true,
                checkboxSelection: true,
                width: 50,
                pinned: 'left',
                lockPosition: true
            },
            // 데이터 컬럼들
            ...columns.map((col)=>({
                    headerName: col.headerName,
                    field: col.field,
                    width: col.width || 120,
                    editable: col.editable !== false,
                    // 신규/수정 행 색상 표시 (한 줄로 작성해야 Sandpack에서 파싱 가능)
                    cellStyle: `(params) => params.data?._isNew ? { backgroundColor: '#e8f5e9' } : params.data?._isModified ? { backgroundColor: '#fff3e0' } : null`,
                    ...col.type === 'number' && {
                        type: 'numericColumn',
                        cellStyle: `(params) => ({ textAlign: 'right', ...(params.data?._isNew ? { backgroundColor: '#e8f5e9' } : params.data?._isModified ? { backgroundColor: '#fff3e0' } : {}) })`
                    }
                }))
        ];
        // cellStyle을 함수로 변환하기 위해 별도 처리
        const columnDefsJson = JSON.stringify(columnDefsArray, null, 2).replace(/"cellStyle": "(.*?)"/g, 'cellStyle: $1');
        // 검색 필드 state 생성
        const searchStates = searchFields.map((field)=>`  const [${field.name}, set${field.name.charAt(0).toUpperCase() + field.name.slice(1)}] = useState('');`).join('\n');
        // 검색 필드 렌더링 (공통 옵션 컴포넌트 사용)
        const searchFieldsRender = searchFields.map((field)=>{
            const setter = `set${field.name.charAt(0).toUpperCase() + field.name.slice(1)}`;
            const fieldType = field.type || 'TEXT_INPUT';
            // 검색 필드 타입에 따라 적절한 공통 컴포넌트 렌더링
            switch(fieldType){
                case 'YEAR_MONTH':
                case 'BI_YEAR_MONTH':
                    return `        <YearMonthPicker
          value={${field.name}}
          onChange={${setter}}
          label="${field.label}"
        />`;
                case 'BI_SITE':
                    return `        <SiteSelect
          value={${field.name}}
          onChange={${setter}}
          label="${field.label}"
        />`;
                case 'BI_DEPT':
                    return `        <DepartmentSelect
          value={${field.name}}
          onChange={${setter}}
          label="${field.label}"
        />`;
                case 'BI_ACCOUNT':
                    return `        <AccountSelect
          value={${field.name}}
          onChange={${setter}}
          label="${field.label}"
        />`;
                case 'BI_CUSTOMER':
                    return `        <CustomerSelect
          value={${field.name}}
          onChange={${setter}}
          label="${field.label}"
        />`;
                case 'BI_SCENARIO':
                    return `        <SelCodeSelect
          value={${field.name}}
          onChange={${setter}}
          label="${field.label}"
        />`;
                case 'BI_PRODUCT':
                    return `        <MaterialSelect
          value={${field.name}}
          onChange={${setter}}
          label="${field.label}"
        />`;
                case 'DATE_PICKER':
                    return `        <YearMonthPicker
          value={${field.name}}
          onChange={${setter}}
          label="${field.label}"
        />`;
                default:
                    // 기본: 인라인 스타일 input 사용
                    return `        <div style={styles.searchField}>
          <label style={styles.label}>${field.label}</label>
          <input
            type="text"
            value={${field.name}}
            onChange={(e) => ${setter}(e.target.value)}
            style={styles.input}
            placeholder="${field.placeholder || field.label}"
          />
        </div>`;
            }
        }).join('\n');
        // 공통 옵션 컴포넌트가 필요한지 확인
        const needsOptionImports = searchFields.some((f)=>{
            const type = f.type || 'TEXT_INPUT';
            return [
                'YEAR_MONTH',
                'BI_YEAR_MONTH',
                'BI_SITE',
                'BI_DEPT',
                'BI_ACCOUNT',
                'BI_CUSTOMER',
                'BI_SCENARIO',
                'BI_PRODUCT',
                'DATE_PICKER'
            ].includes(type);
        });
        const hasSearchFields = searchFields.length > 0;
        // 공통 옵션 import 생성
        const optionImports = needsOptionImports ? `
// 공통 옵션 컴포넌트
import {
  SiteSelect,
  YearMonthPicker,
  YearPicker,
  CustomerSelect,
  MaterialSelect,
  AccountSelect,
  DepartmentSelect,
  SelCodeSelect,
} from '~/components/options';
` : '';
        return `'use client';

import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Plus, Save, Trash2, Download } from 'lucide-react';
${optionImports}

/**
 * ${schema.screenName}
 * @generated by AI Factory Lab
 */

export default function ${componentName}() {
  const gridRef = useRef(null);
  
  // 그리드 데이터
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // 변경 추적 상태
  const [modifiedRows, setModifiedRows] = useState(new Set());
  const [deletedRows, setDeletedRows] = useState(new Set());
  
${searchStates}

  // 컬럼 정의
  const columnDefs = useMemo(() => ${columnDefsJson}, []);

  // 기본 컬럼 설정
  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    filter: true,
  }), []);

  // 데이터 조회
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
${searchFields.map((f)=>`      if (${f.name}) params.append('${f.name}', ${f.name});`).join('\n')}
      const queryString = params.toString();
      const url = \`${gridBlock.apiEndpoint}\${queryString ? '?' + queryString : ''}\`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch');
      const result = await response.json();
      setRowData(result.data || []);
      setModifiedRows(new Set());
      setDeletedRows(new Set());
    } catch (error) {
      console.error('Error:', error);
      setRowData([]);
    } finally {
      setLoading(false);
    }
  }, [${searchFields.map((f)=>f.name).join(', ')}]);

  useEffect(() => {
    fetchData();
  }, []);

  // 검색
  const handleSearch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  // 초기화
  const handleReset = useCallback(() => {
${searchFields.map((f)=>`    set${f.name.charAt(0).toUpperCase() + f.name.slice(1)}('');`).join('\n')}
    fetchData();
  }, [fetchData]);

  // 셀 값 변경 시
  const onCellValueChanged = useCallback((event) => {
    const { data } = event;
    if (!data._isNew) {
      data._isModified = true;
    }
    setModifiedRows(prev => new Set(prev).add(data.${primaryKey}));
    if (event.node) {
      event.api.refreshCells({ rowNodes: [event.node], force: true });
    }
  }, []);

  // 행 추가
  const handleAddRow = useCallback(() => {
    const newRow = {
      ${columns.map((col)=>`${col.field}: ${col.type === 'number' ? '0' : col.type === 'boolean' ? 'false' : "''"}`).join(',\n      ')},
      _isNew: true,
      ${primaryKey}: \`NEW_\${Date.now()}\`,
    };
    setRowData(prev => [newRow, ...prev]);
  }, []);

  // 선택된 행 삭제
  const handleDeleteSelected = useCallback(() => {
    const selectedNodes = gridRef.current?.api.getSelectedNodes();
    if (!selectedNodes || selectedNodes.length === 0) {
      alert('삭제할 행을 선택해주세요.');
      return;
    }

    if (!confirm(\`선택된 \${selectedNodes.length}개 행을 삭제하시겠습니까?\`)) {
      return;
    }

    const deleteIds = new Set();
    selectedNodes.forEach((node) => {
      if (!node.data._isNew) {
        deleteIds.add(node.data.${primaryKey});
      }
    });

    // 새 행은 바로 제거, 기존 행은 삭제 표시
    setRowData(prev => prev.filter(row => {
      const isSelected = selectedNodes.some((n) => n.data.${primaryKey} === row.${primaryKey});
      if (isSelected && row._isNew) return false;
      return true;
    }));

    setDeletedRows(prev => new Set([...prev, ...deleteIds]));
  }, []);

  // 저장
  const handleSave = useCallback(async () => {
    const rowsToSave = rowData.filter(row => row._isNew || row._isModified);
    const rowsToDelete = Array.from(deletedRows);

    if (rowsToSave.length === 0 && rowsToDelete.length === 0) {
      alert('변경된 내용이 없습니다.');
      return;
    }

    try {
      // TODO: API 호출 구현
      // const response = await fetch('${gridBlock.apiEndpoint}', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     inserts: rowsToSave.filter(r => r._isNew),
      //     updates: rowsToSave.filter(r => r._isModified && !r._isNew),
      //     deletes: rowsToDelete,
      //   }),
      // });
      
      alert(\`저장 완료: 추가 \${rowsToSave.filter(r => r._isNew).length}건, 수정 \${rowsToSave.filter(r => r._isModified && !r._isNew).length}건, 삭제 \${rowsToDelete.length}건\`);
      fetchData();
    } catch (error) {
      console.error('저장 오류:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
  }, [rowData, deletedRows, fetchData]);

  // 엑셀 다운로드
  const handleExcelExport = useCallback(() => {
    gridRef.current?.api.exportDataAsCsv({
      fileName: '${schema.screenName}_export.csv',
    });
  }, []);

  // 변경 여부 확인
  const hasChanges = modifiedRows.size > 0 || deletedRows.size > 0 || rowData.some(r => r._isNew);

  // 인라인 스타일 정의 (Sandpack에서 Tailwind 미지원)
  const styles = {
    container: { display: 'flex', flexDirection: 'column', height: '100%', padding: 16, backgroundColor: '#ffffff', fontFamily: 'sans-serif' },
    title: { fontSize: 18, fontWeight: 600, marginBottom: 12, color: '#161616' },
    searchContainer: { display: 'flex', alignItems: 'flex-end', gap: 16, marginBottom: 12, padding: 12, backgroundColor: '#f4f4f4', border: '1px solid #e0e0e0' },
    searchField: { display: 'flex', flexDirection: 'column', gap: 4 },
    label: { fontSize: 12, color: '#525252' },
    input: { height: 32, padding: '0 8px', border: '1px solid #e0e0e0', minWidth: 120 },
    buttonGroup: { display: 'flex', gap: 8, marginLeft: 'auto' },
    toolbar: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 },
    btnPrimary: { display: 'flex', alignItems: 'center', gap: 4, height: 32, padding: '0 12px', backgroundColor: '#0f62fe', color: 'white', border: 'none', fontSize: 14, cursor: 'pointer' },
    btnSuccess: { display: 'flex', alignItems: 'center', gap: 4, height: 32, padding: '0 12px', backgroundColor: '#24a148', color: 'white', border: 'none', fontSize: 14, cursor: 'pointer' },
    btnDanger: { display: 'flex', alignItems: 'center', gap: 4, height: 32, padding: '0 12px', backgroundColor: '#da1e28', color: 'white', border: 'none', fontSize: 14, cursor: 'pointer' },
    btnSecondary: { display: 'flex', alignItems: 'center', gap: 4, height: 32, padding: '0 12px', backgroundColor: '#393939', color: 'white', border: 'none', fontSize: 14, cursor: 'pointer' },
    btnDisabled: { display: 'flex', alignItems: 'center', gap: 4, height: 32, padding: '0 12px', backgroundColor: '#c6c6c6', color: 'white', border: 'none', fontSize: 14, cursor: 'not-allowed' },
    statusBar: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8, fontSize: 12, color: '#525252' },
    statusItem: { display: 'flex', alignItems: 'center', gap: 4 },
    statusNew: { width: 12, height: 12, backgroundColor: '#e8f5e9', border: '1px solid #c6c6c6' },
    statusModified: { width: 12, height: 12, backgroundColor: '#fff3e0', border: '1px solid #c6c6c6' },
    statusDeleted: { width: 12, height: 12, backgroundColor: '#ffebee', border: '1px solid #c6c6c6' },
    gridContainer: { flex: 1, minHeight: 400 },
  };

  return (
    <div style={styles.container}>
      {/* 제목 */}
      <h1 style={styles.title}>
        ${schema.screenName}
      </h1>

      ${hasSearchFields ? `{/* 조회조건 */}
      <div style={styles.searchContainer}>
${searchFieldsRender.split('\\n').map((line)=>'        ' + line.trim()).join('\\n')}
        <div style={styles.buttonGroup}>
          <button
            onClick={handleSearch}
            style={styles.btnPrimary}
          >
            검색
          </button>
          <button
            onClick={handleReset}
            style={{ ...styles.btnPrimary, backgroundColor: '#e0e0e0', color: '#161616' }}
          >
            초기화
          </button>
        </div>
      </div>` : ''}

      {/* 툴바 */}
      <div style={styles.toolbar}>
        <button onClick={handleAddRow} style={styles.btnPrimary}>
          <Plus style={{ width: 16, height: 16 }} />
          행 추가
        </button>
        <button 
          onClick={handleSave} 
          disabled={!hasChanges}
          style={hasChanges ? styles.btnSuccess : styles.btnDisabled}
        >
          <Save style={{ width: 16, height: 16 }} />
          저장
        </button>
        <button onClick={handleDeleteSelected} style={styles.btnDanger}>
          <Trash2 style={{ width: 16, height: 16 }} />
          삭제
        </button>
        <div style={{ marginLeft: 'auto' }}>
          <button onClick={handleExcelExport} style={styles.btnSecondary}>
            <Download style={{ width: 16, height: 16 }} />
            엑셀
          </button>
        </div>
      </div>

      {/* 상태 표시 */}
      {hasChanges && (
        <div style={styles.statusBar}>
          <span style={styles.statusItem}>
            <span style={styles.statusNew}></span>
            신규 ({rowData.filter(r => r._isNew).length})
          </span>
          <span style={styles.statusItem}>
            <span style={styles.statusModified}></span>
            수정 ({modifiedRows.size})
          </span>
          <span style={styles.statusItem}>
            <span style={styles.statusDeleted}></span>
            삭제 ({deletedRows.size})
          </span>
        </div>
      )}

      {/* AG Grid */}
      <div className="ag-theme-alpine" style={styles.gridContainer}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          onCellValueChanged={onCellValueChanged}
          getRowId={(params) => params.data.${primaryKey}}
          loading={loading}
          overlayLoadingTemplate="<span>데이터 로딩 중...</span>"
          overlayNoRowsTemplate="<span>조회된 데이터가 없습니다</span>"
        />
      </div>
    </div>
  );
}
`;
    }
    /**
   * ScreenSchema 생성 (Excel 데이터 → 블록 조립)
   */ generateScreenSchema(data) {
        const { screenId, screenName, screenNameEn, crudConfig, crudColumns } = data;
        const blocks = [
            // 1. PAGE_HEADER 블록
            {
                id: 'header-1',
                type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$entities$2f$block$2d$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BlockType"].PAGE_HEADER,
                order: 1,
                title: screenName,
                description: `${screenName} 관리 화면`,
                breadcrumbs: [
                    {
                        label: '홈',
                        href: '/'
                    },
                    {
                        label: '기준정보',
                        href: '/master'
                    },
                    {
                        label: screenName
                    }
                ],
                actions: [
                    {
                        label: '엑셀 다운로드',
                        icon: 'Download',
                        onClick: 'handleExcelExport',
                        variant: 'secondary'
                    }
                ]
            },
            // 2. SEARCH_FORM 블록
            {
                id: 'search-form-1',
                type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$entities$2f$block$2d$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BlockType"].SEARCH_FORM,
                order: 2,
                fields: this.generateSearchFields(data),
                searchButtonLabel: '검색',
                showResetButton: true,
                resetButtonLabel: '초기화',
                onSearch: 'handleSearch',
                onReset: 'handleReset',
                collapsible: false
            },
            // 3. TOOLBAR 블록
            {
                id: 'toolbar-1',
                type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$entities$2f$block$2d$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BlockType"].TOOLBAR,
                order: 3,
                alignment: 'space-between',
                buttons: this.generateToolbarButtons()
            },
            // 4. DATA_GRID 블록
            {
                id: 'grid-1',
                type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$entities$2f$block$2d$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BlockType"].DATA_GRID,
                order: 4,
                columns: this.generateGridColumns(crudColumns, crudConfig.primaryKey),
                apiEndpoint: `/ api / screens / ${screenId}/data`,
                tableName: data.tableName ?? 'unknown_table',
                primaryKey: crudConfig.primaryKey ?? 'id',
                selectColumns: crudColumns.map((col)=>col.field),
                rowSelection: 'multiple',
                showCheckboxSelection: true,
                pagination: true,
                pageSize: 50,
                height: 600,
                editable: true,
                onCellValueChanged: 'handleCellValueChanged',
                onRowSelected: 'handleRowSelected'
            }
        ];
        return {
            screenId: screenId ?? 'SC000',
            screenName,
            screenNameEn: screenNameEn ?? screenName,
            description: `${screenName} CRUD 화면`,
            path: `/generated/${screenId}`,
            layout: {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$entities$2f$block$2d$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LayoutType"].SINGLE_COLUMN,
                gap: 16,
                padding: 16
            },
            blocks,
            metadata: {
                createdAt: new Date().toISOString(),
                version: '1.0',
                tags: [
                    'crud',
                    'master',
                    'auto-generated'
                ]
            }
        };
    }
    /**
   * 검색 필드 생성 (실제 데이터 사용, Mock 데이터 제거)
   */ generateSearchFields(data) {
        // data.searchConditions가 존재하면 이를 사용, 없으면 빈 배열 반환
        if (!data.searchConditions || data.searchConditions.length === 0) {
            return [];
        }
        return data.searchConditions.map((condition)=>({
                name: condition.field,
                label: condition.label,
                type: this.mapSearchFieldType(condition.type),
                required: condition.required,
                width: 3,
                options: condition.options
            }));
    }
    /**
   * SearchCondition.type (string) → SearchFieldType 매핑
   */ mapSearchFieldType(type) {
        // 타입 매핑 (대소문자 무관)
        const normalized = type.toLowerCase().replace(/_/g, '');
        switch(normalized){
            case 'text':
            case 'textinput':
                return 'text';
            case 'number':
            case 'numberinput':
                return 'number';
            case 'date':
            case 'datepicker':
                return 'date';
            case 'daterange':
                return 'dateRange';
            case 'select':
                return 'select';
            case 'multiselect':
                return 'multiSelect';
            case 'siteselect':
                return 'siteSelect';
            case 'scenarioselect':
                return 'scenarioSelect';
            case 'yearmonth':
            case 'yearmonthpicker':
                return 'yearMonthPicker';
            case 'checkbox':
                return 'checkbox';
            default:
                // 기본값은 text
                return 'text';
        }
    }
    /**
   * 툴바 버튼 생성
   */ generateToolbarButtons() {
        return [
            {
                id: 'add',
                label: '행 추가',
                icon: 'Plus',
                variant: 'primary',
                onClick: 'handleAddRow'
            },
            {
                id: 'save',
                label: '저장',
                icon: 'Save',
                variant: 'success',
                onClick: 'handleSave',
                disabled: '!hasChanges'
            },
            {
                id: 'delete',
                label: '삭제',
                icon: 'Trash2',
                variant: 'danger',
                onClick: 'handleDeleteSelected'
            }
        ];
    }
    /**
   * 그리드 컬럼 생성 (CrudColumnDef → GridColumn 변환)
   */ generateGridColumns(columns, pkField) {
        return columns.map((col)=>{
            const gridColumn = {
                field: col.field,
                headerName: col.headerName,
                width: col.width,
                type: this.mapColumnType(col.editorType),
                editable: col.field === pkField ? false : col.editable,
                sortable: true,
                filterable: true,
                align: col.editorType === 'number' ? 'right' : 'left',
                hidden: col.hidden
            };
            // PK 필드는 왼쪽 고정
            if (col.field === pkField) {
                gridColumn.pinned = 'left';
            }
            return gridColumn;
        });
    }
    /**
   * 에디터 타입 → 그리드 컬럼 타입 매핑
   */ mapColumnType(editorType) {
        switch(editorType){
            case 'number':
                return 'number';
            case 'date':
                return 'date';
            case 'datetime':
                return 'datetime';
            case 'checkbox':
                return 'boolean';
            case 'select':
                return 'select';
            default:
                return 'text';
        }
    }
    // ============================================================
    // API 생성
    // ============================================================
    /**
   * API 코드 생성 (문자열 반환)
   *
   * 요구사항에 따라 tRPC Router 코드를 문자열로 반환
   * - getList: 목록 조회 (검색 조건 포함)
   * - create: 단건 추가
   * - update: 단건 수정
   * - deleteMany: 다중 삭제
   */ async generateApiCode(data) {
        const result = await this.generateApi(data);
        if (!result.success) {
            throw new Error(result.error ?? 'API 코드 생성 실패');
        }
        return result.routerCode;
    }
    /**
   * API 라우터 코드 생성 (전체 결과 반환)
   */ async generateApi(data) {
        if (!isCrudParsedData(data)) {
            return {
                success: false,
                routerPath: '',
                routerCode: '',
                procedures: [],
                error: 'Invalid data: CrudParsedData required'
            };
        }
        const screenId = data.screenId ?? 'SC000';
        const routerName = this.getRouterName(screenId);
        const tableName = data.tableName ?? 'unknown_table';
        const { crudConfig, crudColumns } = data;
        try {
            const routerCode = this.generateRouterCode(routerName, tableName, crudConfig, crudColumns);
            return {
                success: true,
                routerPath: `src/server/api/routers/generated/${routerName}.ts`,
                routerCode,
                procedures: [
                    'getList',
                    'getById',
                    'create',
                    'update',
                    'deleteMany',
                    'save'
                ]
            };
        } catch (error) {
            return {
                success: false,
                routerPath: '',
                routerCode: '',
                procedures: [],
                error: `API generation failed: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
    /**
   * tRPC 라우터 코드 생성
   */ generateRouterCode(routerName, tableName, config, columns) {
        const pkField = config.primaryKey;
        const prismaModelName = this.toCamelCase(tableName);
        // 검색 가능한 컬럼 추출 (문자열, 날짜 타입 등)
        const searchableColumns = columns.filter((col)=>[
                'text',
                'select',
                'date',
                'datetime'
            ].includes(col.editorType ?? 'text')).slice(0, 5); // 최대 5개까지만
        return `/**
 * ${routerName} - 자동 생성된 CRUD API
 *
 * @generated by AI Factory Lab
 * @table ${tableName}
 * @primaryKey ${pkField}
 */

import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { db } from '~/server/db';

// 검색 조건 스키마 (동적 생성)
const searchParamsSchema = z.object({
${searchableColumns.map((col)=>`  ${col.field}: z.string().optional(),`).join('\n')}
  // 페이지네이션
  page: z.number().min(1).optional(),
  pageSize: z.number().min(1).max(1000).optional(),
  // 정렬
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
}).optional();

// 행 데이터 스키마
const rowSchema = z.object({
${this.generateZodSchema(columns)}
});

// 저장 입력 스키마
const saveInputSchema = z.object({
  inserts: z.array(rowSchema).optional(),
  updates: z.array(rowSchema).optional(),
  deletes: z.array(z.string()).optional(), // PK 배열
});

export const ${routerName}Router = createTRPCRouter({
  // 목록 조회 (Read with filters)
  getList: publicProcedure
    .input(searchParamsSchema)
    .query(async ({ input }) => {
      const page = input?.page ?? 1;
      const pageSize = input?.pageSize ?? ${config.pageSize ?? 50};
      const skip = (page - 1) * pageSize;

      // 동적 WHERE 조건 구성
      const where: any = {
        ${config.softDelete ? `delete_yn: 'N',` : ''}
      };

${searchableColumns.map((col)=>`      if (input?.${col.field}) {
        where.${col.field} = { contains: input.${col.field} };
      }`).join('\n')}

      // 데이터 조회
      const [data, total] = await db.$transaction([
        db.${prismaModelName}.findMany({
          where,
          orderBy: {
            [input?.sortBy ?? '${config.sortColumn ?? pkField}']: input?.sortOrder ?? '${config.sortDirection ?? 'asc'}'
          },
          skip,
          take: pageSize,
        }),
        db.${prismaModelName}.count({ where }),
      ]);

      return {
        data,
        pagination: {
          page,
          pageSize,
          total,
          totalPages: Math.ceil(total / pageSize),
        },
      };
    }),

  // 단건 조회
  getById: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const result = await db.${prismaModelName}.findUnique({
        where: { ${pkField}: input },
      });
      return result;
    }),

  // 일괄 저장 (Create/Update/Delete)
  save: publicProcedure
    .input(saveInputSchema)
    .mutation(async ({ input }) => {
      const { inserts = [], updates = [], deletes = [] } = input;

      // 트랜잭션으로 일괄 처리
      const result = await db.$transaction(async (tx) => {
        let insertedCount = 0;
        let updatedCount = 0;
        let deletedCount = 0;

        // 1. Insert
        if (inserts.length > 0) {
          await tx.${prismaModelName}.createMany({
            data: inserts.map(row => ({
              ...row,
              ${config.auditColumns ? `created_at: new Date(),\n              updated_at: new Date(),` : ''}
            })),
          });
          insertedCount = inserts.length;
        }

        // 2. Update
        if (updates.length > 0) {
          for (const row of updates) {
            await tx.${prismaModelName}.update({
              where: { ${pkField}: row.${pkField} },
              data: {
                ...row,
                ${config.auditColumns ? `updated_at: new Date(),` : ''}
              },
            });
          }
          updatedCount = updates.length;
        }

        // 3. Delete (soft delete or hard delete)
        if (deletes.length > 0) {
          ${config.softDelete ? `await tx.${prismaModelName}.updateMany({
            where: { ${pkField}: { in: deletes } },
            data: {
              delete_yn: 'Y',
              ${config.auditColumns ? `updated_at: new Date(),` : ''}
            },
          });` : `await tx.${prismaModelName}.deleteMany({
            where: { ${pkField}: { in: deletes } },
          });`}
          deletedCount = deletes.length;
        }

        return { insertedCount, updatedCount, deletedCount };
      });

      return {
        success: true,
        ...result,
        message: \`성공: 추가 \${result.insertedCount}건, 수정 \${result.updatedCount}건, 삭제 \${result.deletedCount}건\`,
      };
    }),

  // 단건 생성 (Create)
  create: publicProcedure
    .input(rowSchema)
    .mutation(async ({ input }) => {
      const result = await db.${prismaModelName}.create({
        data: {
          ...input,
          ${config.auditColumns ? `created_at: new Date(),\n          updated_at: new Date(),` : ''}
        },
      });
      return result;
    }),

  // 단건 수정 (Update)
  update: publicProcedure
    .input(z.object({
      ${pkField}: z.string(),
      data: rowSchema.partial(),
    }))
    .mutation(async ({ input }) => {
      const result = await db.${prismaModelName}.update({
        where: { ${pkField}: input.${pkField} },
        data: {
          ...input.data,
          ${config.auditColumns ? `updated_at: new Date(),` : ''}
        },
      });
      return result;
    }),

  // 단건 삭제 (Delete)
  deleteOne: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      ${config.softDelete ? `const result = await db.${prismaModelName}.update({
        where: { ${pkField}: input },
        data: {
          delete_yn: 'Y',
          ${config.auditColumns ? `updated_at: new Date(),` : ''}
        },
      });` : `const result = await db.${prismaModelName}.delete({
        where: { ${pkField}: input },
      });`}
      return result;
    }),

  // 다중 삭제 (Delete Many)
  deleteMany: publicProcedure
    .input(z.array(z.string()))
    .mutation(async ({ input }) => {
      if (input.length === 0) {
        return {
          success: true,
          deletedCount: 0,
          message: '삭제할 항목이 없습니다.',
        };
      }

      ${config.softDelete ? `const result = await db.${prismaModelName}.updateMany({
        where: { ${pkField}: { in: input } },
        data: {
          delete_yn: 'Y',
          ${config.auditColumns ? `updated_at: new Date(),` : ''}
        },
      });

      return {
        success: true,
        deletedCount: result.count,
        message: \`\${result.count}건이 삭제되었습니다.\`,
      };` : `const result = await db.${prismaModelName}.deleteMany({
        where: { ${pkField}: { in: input } },
      });

      return {
        success: true,
        deletedCount: result.count,
        message: \`\${result.count}건이 삭제되었습니다.\`,
      };`}
    }),
});
`;
    }
    /**
   * Zod 스키마 생성
   */ generateZodSchema(columns) {
        return columns.map((col)=>{
            let zodType;
            switch(col.editorType){
                case 'number':
                    zodType = 'z.number()';
                    break;
                case 'checkbox':
                    zodType = 'z.boolean()';
                    break;
                case 'date':
                case 'datetime':
                    zodType = 'z.string()';
                    break;
                default:
                    zodType = 'z.string()';
            }
            if (!col.required) {
                zodType += '.nullable().optional()';
            }
            if (col.maxLength && col.editorType === 'text') {
                zodType = `z.string().max(${col.maxLength})${col.required ? '' : '.nullable().optional()'}`;
            }
            return `  ${col.field}: ${zodType},`;
        }).join('\n');
    }
    /**
   * 라우터 이름 생성
   */ getRouterName(screenId) {
        return `screen${screenId.replace(/[^a-zA-Z0-9]/g, '')}`;
    }
    // ============================================================
    // 전체 화면 생성
    // ============================================================
    /**
   * 컴포넌트(스키마) + API 전체 생성
   */ async generateScreen(data) {
        const startTime = Date.now();
        const screenId = data.screenId ?? 'SC000';
        const screenName = data.screenName;
        const warnings = [];
        // 스키마 생성
        const componentResult = await this.generateComponent(data);
        if (!componentResult.success) {
            return {
                success: false,
                screenId,
                screenName,
                component: componentResult,
                warnings,
                generationTime: Date.now() - startTime
            };
        }
        // API 생성
        const apiResult = await this.generateApi(data);
        if (!apiResult.success) {
            warnings.push(`API 생성 실패: ${apiResult.error}`);
        }
        return {
            success: true,
            screenId,
            screenName,
            component: componentResult,
            api: apiResult,
            warnings,
            generationTime: Date.now() - startTime
        };
    }
}
}),
"[project]/src/server/api/routers/screen-generator/templates/simple-grid-crud/index.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * Simple Grid CRUD 템플릿 모듈
 * @module screenGenerator/templates/simpleGridCrud
 */ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$templates$2f$simple$2d$grid$2d$crud$2f$SimpleGridCrudTemplate$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/templates/simple-grid-crud/SimpleGridCrudTemplate.ts [app-route] (ecmascript)");
;
}),
"[project]/src/server/api/routers/screen-generator/templates/realgrid-crud/RealGridCrudTemplate.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * RealGrid CRUD 템플릿
 *
 * AG Grid 기반 SimpleGridCrudTemplate과 동일한 구조로,
 * RealGrid 라이브러리를 사용하여 CRUD 화면을 생성합니다.
 *
 * 표준 스타일: Corporate Professional (파란 그라디언트 헤더)
 * 참조: /screens/grid-examples/style-1-corporate
 *
 * @module screenGenerator/templates/realgrid-crud
 */ __turbopack_context__.s([
    "RealGridCrudTemplate",
    ()=>RealGridCrudTemplate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$templates$2f$base$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/templates/base/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$templates$2f$base$2f$BaseTemplate$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/templates/base/BaseTemplate.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/types.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$entities$2f$block$2d$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/domain/entities/block-schema.ts [app-route] (ecmascript)");
;
;
;
// ============================================================
// 타입 가드
// ============================================================
/**
 * ParsedData가 CrudParsedData인지 확인
 */ function isCrudParsedData(data) {
    return (data.screenType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ScreenType"].SIMPLE_GRID_CRUD || data.screenType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ScreenType"].COMPLEX_GRID_CRUD || data.screenType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ScreenType"].REALGRID_CRUD) && 'crudConfig' in data && 'crudColumns' in data;
}
class RealGridCrudTemplate extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$templates$2f$base$2f$BaseTemplate$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseTemplate"] {
    screenType = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ScreenType"].REALGRID_CRUD;
    description = '단순 CRUD 화면 (RealGrid)';
    // ============================================================
    // 컴포넌트 생성
    // ============================================================
    /**
   * CRUD 화면 컴포넌트 생성
   */ async generateComponent(data) {
        // screenType을 RealGrid CRUD로 변경
        const realGridData = {
            ...data,
            screenType: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ScreenType"].REALGRID_CRUD
        };
        // 타입 체크
        if (!isCrudParsedData(realGridData)) {
            return this.createErrorResult('Invalid data: CrudParsedData required', data.screenId ?? 'unknown');
        }
        const screenId = data.screenId ?? 'SC000';
        const componentName = this.getComponentName(screenId, data.screenName);
        try {
            // ScreenSchema 생성
            const schema = this.generateScreenSchema(realGridData);
            // RealGrid 컴포넌트 코드 생성
            const code = this.generateComponentCode(componentName, schema);
            return {
                success: true,
                filePath: this.getFilePath(screenId, true),
                fileName: this.getFileName(screenId),
                code
            };
        } catch (error) {
            return this.createErrorResult(`Component generation failed: ${error instanceof Error ? error.message : String(error)}`, screenId);
        }
    }
    /**
   * RealGrid 컴포넌트 코드 생성
   * 
   * AG Grid와 달리 RealGrid는 DOM 기반 초기화가 필요합니다.
   * - useRef로 컨테이너, gridView, dataProvider 관리
   * - useEffect에서 RealGrid 초기화
   * - DataProvider API를 사용한 CRUD 처리
   */ generateComponentCode(componentName, schema) {
        const gridBlock = schema.blocks.find((b)=>b.type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$entities$2f$block$2d$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BlockType"].DATA_GRID);
        const searchBlock = schema.blocks.find((b)=>b.type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$entities$2f$block$2d$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BlockType"].SEARCH_FORM);
        const columns = gridBlock?.config?.columns || [];
        const searchFields = searchBlock?.config?.fields || [];
        const pkField = gridBlock?.config?.primaryKey || 'id';
        // Fields 정의 생성 (DataProvider용) - ValueType은 JSON.stringify하면 문자열이 되므로 수동 생성
        const fieldsJson = `[
${columns.map((col)=>`    { fieldName: "${col.field}", dataType: ${this.mapToRealGridDataType(col.type || 'text')} }`).join(',\n')}
  ]`;
        // Columns 정의 생성 (GridView용)
        const columnsJson = JSON.stringify(columns.map((col)=>({
                name: col.field,
                fieldName: col.field,
                header: {
                    text: col.headerName
                },
                width: col.width || 120,
                editable: col.editable ?? true,
                styles: {
                    textAlignment: col.align || 'center'
                }
            })), null, 2);
        // 검색 필드 state 생성
        const searchStates = searchFields.map((field)=>`  const [${field.name}, set${field.name.charAt(0).toUpperCase() + field.name.slice(1)}] = useState('');`).join('\n');
        // 검색 필드 렌더링 (공통 옵션 컴포넌트 사용)
        const searchFieldsRender = searchFields.map((field)=>{
            const setter = `set${field.name.charAt(0).toUpperCase() + field.name.slice(1)}`;
            const fieldType = field.type || 'TEXT_INPUT';
            switch(fieldType){
                case 'YEAR_MONTH':
                case 'BI_YEAR_MONTH':
                    return `        <YearMonthPicker
          value={${field.name}}
          onChange={${setter}}
          label="${field.label}"
        />`;
                case 'BI_SITE':
                    return `        <SiteSelect
          value={${field.name}}
          onChange={${setter}}
          label="${field.label}"
        />`;
                case 'BI_DEPT':
                    return `        <DepartmentSelect
          value={${field.name}}
          onChange={${setter}}
          label="${field.label}"
        />`;
                case 'BI_ACCOUNT':
                    return `        <AccountSelect
          value={${field.name}}
          onChange={${setter}}
          label="${field.label}"
        />`;
                case 'BI_CUSTOMER':
                    return `        <CustomerSelect
          value={${field.name}}
          onChange={${setter}}
          label="${field.label}"
        />`;
                case 'BI_EQUIPMENT':
                    return `        <div style={styles.searchField}>
          <label style={styles.label}>${field.label}</label>
          <input
            type="text"
            value={${field.name}}
            onChange={(e) => ${setter}(e.target.value)}
            style={styles.input}
            placeholder="${field.placeholder || field.label}"
          />
        </div>`;
                case 'BI_EXPENSE':
                    return `        <ExpenSelSelect
          value={${field.name}}
          onChange={${setter}}
          label="${field.label}"
        />`;
                case 'BI_PRODUCT':
                    return `        <MaterialSelect
          value={${field.name}}
          onChange={${setter}}
          label="${field.label}"
        />`;
                default:
                    return `        <div style={styles.searchField}>
          <label style={styles.label}>${field.label}</label>
          <input
            type="text"
            value={${field.name}}
            onChange={(e) => ${setter}(e.target.value)}
            style={styles.input}
            placeholder="${field.placeholder || field.label}"
          />
        </div>`;
            }
        }).join('\n');
        // 새 행 템플릿 생성 (빈 columns 처리)
        const newRowFields = columns.map((col)=>`      ${col.field}: ''`);
        const newRowTemplate = newRowFields.length > 0 ? newRowFields.join(',\n') + ',' : '';
        const hasSearchFields = searchFields.length > 0;
        // 공통 옵션 import 생성
        const needsOptionImports = searchFields.some((f)=>{
            const type = f.type || 'TEXT_INPUT';
            return [
                'YEAR_MONTH',
                'BI_YEAR_MONTH',
                'BI_SITE',
                'BI_DEPT',
                'BI_ACCOUNT',
                'BI_CUSTOMER',
                'BI_SCENARIO',
                'BI_PRODUCT',
                'DATE_PICKER'
            ].includes(type);
        });
        const optionImports = needsOptionImports ? `
// 공통 옵션 컴포넌트
import {
  SiteSelect,
  YearMonthPicker,
  YearPicker,
  CustomerSelect,
  MaterialSelect,
  AccountSelect,
  DepartmentSelect,
  SelCodeSelect,
} from '~/components/options';
` : '';
        return `'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import RealGrid, { GridView, LocalDataProvider, ValueType } from 'realgrid';
import { Search, RotateCcw, Plus, Save, Trash2, Download, Loader2 } from 'lucide-react';
${optionImports}

/**
 * ${schema.screenName}
 * @generated by AI Factory Lab (RealGrid)
 */

export default function ${componentName}() {
  // RealGrid 참조
  const containerRef = useRef<HTMLDivElement>(null);
  const gridViewRef = useRef<GridView | null>(null);
  const dataProviderRef = useRef<LocalDataProvider | null>(null);
  
  // 상태
  const [loading, setLoading] = useState(false);
  const [modifiedRows, setModifiedRows] = useState(new Set());
  const [deletedRows, setDeletedRows] = useState<any[]>([]);
  
${searchStates}

  // RealGrid 필드 정의
  const fields = ${fieldsJson};

  // RealGrid 컬럼 정의
  const columns = ${columnsJson};

  // RealGrid 초기화
  useEffect(() => {
    if (!containerRef.current) return;
    
    // 라이센스 설정
    const license = process.env.NEXT_PUBLIC_REALGRID_LICENSE;
    if (license) {
      RealGrid.setLicenseKey(license);
    }
    
    // DataProvider & GridView 초기화
    const dataProvider = new LocalDataProvider(false);
    const gridView = new GridView(containerRef.current);
    gridView.setDataSource(dataProvider);
    
    // 필드 & 컬럼 설정
    dataProvider.setFields(fields);
    gridView.setColumns(columns);
    
    // 그리드 옵션
    gridView.setDisplayOptions({
      columnMovable: true,
      columnResizable: true,
      rowHeight: 40,
    });
    
    gridView.setHeader({ height: 40 });
    gridView.setEditOptions({
      editable: true,
      insertable: true,
      deletable: true,
      // 셀 편집 활성화 옵션
      readOnly: false,
      updatable: true,            // 기존 데이터 수정 가능
      editWhenFocused: true,      // 셀 포커스 시 편집 모드
      editWhenClickFocused: true, // 선택된 셀 클릭 시 편집 모드
      commitByCell: true,         // 셀 이동 시 자동 커밋
      commitWhenLeave: true,      // 그리드 벗어날 때 커밋
      commitWhenNoEdit: true,     // 편집 없이도 커밋
    });
    gridView.setStateBar({ visible: true });
    gridView.setCheckBar({ visible: true });
    
    // 참조 저장
    gridViewRef.current = gridView;
    dataProviderRef.current = dataProvider;
    
    // 데이터 변경 이벤트
    dataProvider.onRowStateChanged = (provider, row) => {
      setModifiedRows(prev => new Set(prev).add(row));
    };
    
    // 초기 데이터 로드
    fetchData();
    
    return () => {
      gridView.destroy();
      dataProvider.destroy();
    };
  }, []);

  // 데이터 조회
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
${searchFields.map((f)=>`      if (${f.name}) params.append('${f.name}', ${f.name});`).join('\n')}
      const queryString = params.toString();
      const url = \`${gridBlock?.config?.apiEndpoint || '/api/data'}\${queryString ? '?' + queryString : ''}\`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch');
      const result = await response.json();
      
      if (dataProviderRef.current) {
        dataProviderRef.current.setRows(result.data || []);
      }
      setModifiedRows(new Set());
      setDeletedRows(new Set());
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, [${searchFields.map((f)=>f.name).join(', ')}]);

  // 검색
  const handleSearch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  // 초기화
  const handleReset = useCallback(() => {
${searchFields.map((f)=>`    set${f.name.charAt(0).toUpperCase() + f.name.slice(1)}('');`).join('\n')}
    fetchData();
  }, [fetchData]);

  // 행 추가
  const handleAddRow = useCallback(() => {
    if (dataProviderRef.current) {
      const newRow = {
${newRowTemplate}        _isNew: true,
      };
      dataProviderRef.current.insertRow(0, newRow);
    }
  }, []);

  // 선택된 행 삭제
  const handleDeleteSelected = useCallback(() => {
    if (!gridViewRef.current || !dataProviderRef.current) return;
    
    const checkedRows = gridViewRef.current.getCheckedRows();
    if (checkedRows.length === 0) {
      alert('삭제할 행을 선택해주세요.');
      return;
    }
    
    if (!confirm(\`선택된 \${checkedRows.length}개 행을 삭제하시겠습니까?\`)) {
      return;
    }
    
    // 삭제할 행의 데이터 저장 (PK 값 포함)
    const rowsToDelete = checkedRows.map(row => dataProviderRef.current?.getJsonRow(row)).filter(Boolean);
    
    // 역순으로 삭제 (인덱스 유지)
    checkedRows.sort((a, b) => b - a).forEach(row => {
      if (dataProviderRef.current) {
        dataProviderRef.current.removeRow(row);
      }
    });
    
    setDeletedRows(prev => [...prev, ...rowsToDelete]);
  }, []);

  // 저장
  const handleSave = useCallback(async () => {
    if (!dataProviderRef.current) return;
    
    // 변경된 행들 수집
    const provider = dataProviderRef.current;
    const insertedRows = [];
    const updatedRows = [];
    
    for (let i = 0; i < provider.getRowCount(); i++) {
      const state = provider.getRowState(i);
      const values = provider.getJsonRow(i);
      
      if (state === 'created') {
        insertedRows.push(values);
      } else if (state === 'updated') {
        updatedRows.push(values);
      }
    }
    
    if (insertedRows.length === 0 && updatedRows.length === 0 && deletedRows.length === 0) {
      alert('변경된 내용이 없습니다.');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(\`${gridBlock?.config?.apiEndpoint || '/api/data'}\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inserted: insertedRows,
          updated: updatedRows,
          deleted: deletedRows,
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert(\`저장 완료: 추가 \${result.insertedCount}건, 수정 \${result.updatedCount}건, 삭제 \${result.deletedCount}건\`);
        setDeletedRows([]);
        fetchData();
      } else {
        alert('저장 실패: ' + (result.error || '알 수 없는 오류'));
        if (result.errors?.length > 0) {
          console.error('저장 오류 상세:', result.errors);
        }
      }
    } catch (error) {
      console.error('저장 오류:', error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, [deletedRows, fetchData]);

  // 엑셀 다운로드
  const handleExcelExport = useCallback(() => {
    if (gridViewRef.current) {
      gridViewRef.current.exportGrid({
        type: 'excel',
        target: 'local',
        fileName: '${schema.screenName}_export.xlsx',
      });
    }
  }, []);

  // 변경 여부 확인
  const hasChanges = modifiedRows.size > 0 || deletedRows.length > 0;

  // 인라인 스타일 정의 (IBM Carbon Design System)
  const styles = {
    container: { display: 'flex', flexDirection: 'column' as const, height: '100%', padding: 16, backgroundColor: '#ffffff', fontFamily: "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif" },
    title: { fontSize: 20, fontWeight: 600, marginBottom: 16, color: '#161616' },
    searchContainer: { display: 'flex', alignItems: 'flex-end', gap: 16, marginBottom: 16, padding: 16, backgroundColor: '#f4f4f4', border: 'none' },
    searchField: { display: 'flex', flexDirection: 'column' as const, gap: 4 },
    label: { fontSize: 12, color: '#525252', marginBottom: 4 },
    input: { height: 40, padding: '0 16px', border: 'none', borderBottom: '1px solid #8d8d8d', backgroundColor: '#f4f4f4', minWidth: 120, fontSize: 14 },
    buttonGroup: { display: 'flex', gap: 8, marginLeft: 'auto' },
    toolbar: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 },
    btnPrimary: { display: 'flex', alignItems: 'center', gap: 4, height: 48, padding: '0 16px', backgroundColor: '#0f62fe', color: 'white', border: 'none', fontSize: 14, cursor: 'pointer' },
    btnSuccess: { display: 'flex', alignItems: 'center', gap: 4, height: 48, padding: '0 16px', backgroundColor: '#24a148', color: 'white', border: 'none', fontSize: 14, cursor: 'pointer' },
    btnDanger: { display: 'flex', alignItems: 'center', gap: 4, height: 48, padding: '0 16px', backgroundColor: '#da1e28', color: 'white', border: 'none', fontSize: 14, cursor: 'pointer' },
    btnSecondary: { display: 'flex', alignItems: 'center', gap: 4, height: 48, padding: '0 16px', backgroundColor: '#393939', color: 'white', border: 'none', fontSize: 14, cursor: 'pointer' },
    btnDisabled: { display: 'flex', alignItems: 'center', gap: 4, height: 48, padding: '0 16px', backgroundColor: '#c6c6c6', color: '#8d8d8d', border: 'none', fontSize: 14, cursor: 'not-allowed' },
    statusBar: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8, fontSize: 12, color: '#525252' },
    statusItem: { display: 'flex', alignItems: 'center', gap: 4 },
    gridContainer: { flex: 1, minHeight: 400 },
  };

  return (
    <div style={styles.container}>
      {/* RealGrid IBM Carbon Design System Style */}
      <style jsx global>{\`
        /* IBM Carbon Design System - Data Table Style */
        .realgrid-container .rg-root {
          border: 1px solid #e0e0e0 !important;
          border-radius: 0 !important;
          overflow: hidden !important;
          font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif !important;
        }
        
        /* Header - Carbon Gray */
        .realgrid-container .rg-header-bar {
          background: #e0e0e0 !important;
          border-bottom: 1px solid #c6c6c6 !important;
        }
        
        .realgrid-container .rg-header-text {
          color: #161616 !important;
          font-weight: 600 !important;
          font-size: 14px !important;
        }
        
        /* Body Cells */
        .realgrid-container .rg-data-cell {
          border-right: 1px solid #e0e0e0 !important;
          border-bottom: 1px solid #e0e0e0 !important;
          padding: 0 16px !important;
          font-size: 14px !important;
          color: #161616 !important;
        }
        
        /* Row Hover - Carbon hover color */
        .realgrid-container .rg-data-row:hover {
          background: #e8e8e8 !important;
        }
        
        /* Selected Row */
        .realgrid-container .rg-data-row.rg-selected {
          background: #d0e2ff !important;
        }
        
        /* State Bar */
        .realgrid-container .rg-state-bar {
          background: #f4f4f4 !important;
          border-right: 1px solid #e0e0e0 !important;
        }
        
        /* Check Bar */
        .realgrid-container .rg-check-bar {
          background: #f4f4f4 !important;
          border-right: 1px solid #e0e0e0 !important;
        }
        
        /* Zebra Striping (Carbon style) */
        .realgrid-container .rg-data-row:nth-child(even) {
          background: #f4f4f4 !important;
        }
        
        .realgrid-container .rg-data-row:nth-child(even):hover {
          background: #e8e8e8 !important;
        }
        
        /* Focus style - Carbon blue outline */
        .realgrid-container .rg-data-cell:focus {
          outline: 2px solid #0f62fe !important;
          outline-offset: -2px !important;
        }
      \`}</style>

      {/* 제목 */}
      <h1 style={styles.title}>
        ${schema.screenName}
      </h1>

      {/* 조회조건 */}
${hasSearchFields ? `      <div style={styles.searchContainer}>
${searchFieldsRender}
        <div style={styles.buttonGroup}>
          <button onClick={handleSearch} style={styles.btnPrimary}>
            검색
          </button>
          <button onClick={handleReset} style={{ ...styles.btnPrimary, backgroundColor: '#e0e0e0', color: '#161616' }}>
            초기화
          </button>
        </div>
      </div>` : ''}

      {/* 툴바 */}
      <div style={styles.toolbar}>
        <button onClick={handleAddRow} style={styles.btnPrimary}>
          <Plus style={{ width: 16, height: 16 }} />
          행 추가
        </button>
        <button 
          onClick={handleSave} 
          disabled={!hasChanges}
          style={hasChanges ? styles.btnSuccess : styles.btnDisabled}
        >
          <Save style={{ width: 16, height: 16 }} />
          저장
        </button>
        <button onClick={handleDeleteSelected} style={styles.btnDanger}>
          <Trash2 style={{ width: 16, height: 16 }} />
          삭제
        </button>
        <div style={{ marginLeft: 'auto' }}>
          <button onClick={handleExcelExport} style={styles.btnSecondary}>
            <Download style={{ width: 16, height: 16 }} />
            엑셀
          </button>
        </div>
      </div>

      {/* 상태 표시 */}
      {hasChanges && (
        <div style={styles.statusBar}>
          <span style={styles.statusItem}>
            <span style={{ width: 12, height: 12, backgroundColor: '#e8f5e9', border: '1px solid #c6c6c6' }}></span>
            변경 ({modifiedRows.size})
          </span>
          <span style={styles.statusItem}>
            <span style={{ width: 12, height: 12, backgroundColor: '#ffebee', border: '1px solid #c6c6c6' }}></span>
            삭제 ({deletedRows.length})
          </span>
        </div>
      )}

      {/* RealGrid */}
      <div className="realgrid-container" style={styles.gridContainer}>
        <div 
          ref={containerRef} 
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
}
`;
    }
    /**
   * RealGrid DataType 매핑
   */ mapToRealGridDataType(type) {
        switch(type){
            case 'number':
                return 'ValueType.NUMBER';
            case 'date':
            case 'datetime':
                return 'ValueType.DATE';
            case 'boolean':
                return 'ValueType.BOOLEAN';
            default:
                return 'ValueType.TEXT';
        }
    }
    // ============================================================
    // ScreenSchema 생성 (SimpleGridCrudTemplate과 동일)
    // ============================================================
    /**
   * ScreenSchema 생성 (Excel 데이터 → 블록 조립)
   */ generateScreenSchema(data) {
        const screenId = data.screenId ?? 'SC000';
        const pkField = data.crudConfig?.primaryKey || 'id';
        // 검색 필드 생성
        const searchFields = this.generateSearchFields(data);
        // 그리드 컬럼 생성
        const gridColumns = this.generateGridColumns(data.crudColumns, pkField);
        // 툴바 버튼 생성
        const toolbarButtons = this.generateToolbarButtons();
        // 블록 조립
        const blocks = [
            // 페이지 헤더
            {
                id: `${screenId}_header`,
                type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$entities$2f$block$2d$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BlockType"].PAGE_HEADER,
                config: {
                    title: data.screenName,
                    subtitle: data.screenNameEn
                }
            },
            // 검색 폼
            {
                id: `${screenId}_search`,
                type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$entities$2f$block$2d$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BlockType"].SEARCH_FORM,
                config: {
                    fields: searchFields,
                    onSearch: 'handleSearch',
                    onReset: 'handleReset'
                }
            },
            // 툴바
            {
                id: `${screenId}_toolbar`,
                type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$entities$2f$block$2d$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BlockType"].TOOLBAR,
                config: {
                    buttons: toolbarButtons
                }
            },
            // 데이터 그리드 - RealGrid
            {
                id: `${screenId}_grid`,
                type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$entities$2f$block$2d$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BlockType"].DATA_GRID,
                config: {
                    gridType: 'realgrid',
                    columns: gridColumns,
                    primaryKey: pkField,
                    rowSelection: data.crudConfig?.rowSelection ?? 'multiple',
                    pagination: data.crudConfig?.pagination ?? false,
                    pageSize: data.crudConfig?.pageSize ?? 50,
                    editable: true,
                    apiEndpoint: `/api/screens/${screenId.toLowerCase()}/data`
                }
            }
        ];
        return {
            version: '1.0',
            screenId,
            screenName: data.screenName,
            screenNameEn: data.screenNameEn,
            screenType: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ScreenType"].REALGRID_CRUD,
            tableName: data.tableName,
            layout: {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$entities$2f$block$2d$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LayoutType"].SINGLE_COLUMN,
                blocks: blocks.map((b)=>b.id)
            },
            blocks,
            createdAt: new Date().toISOString()
        };
    }
    /**
   * 검색 필드 생성
   */ generateSearchFields(data) {
        return data.searchConditions.map((cond, i)=>({
                id: `search_${i}`,
                name: cond.field || `search${cond.label.replace(/\s/g, '')}`,
                label: cond.label,
                type: this.mapSearchFieldType(cond.type),
                placeholder: cond.label,
                required: cond.required || false
            }));
    }
    /**
   * SearchCondition.type → SearchFieldType 매핑
   * UI는 대문자 enum 사용 (YEAR_MONTH, BI_SITE 등)
   */ mapSearchFieldType(type) {
        const typeMap = {
            // 소문자 (legacy)
            'text': 'TEXT_INPUT',
            'number': 'NUMBER_INPUT',
            'date': 'DATE_PICKER',
            'dateRange': 'DATE_RANGE',
            'yearMonth': 'YEAR_MONTH',
            'select': 'SELECT',
            'multiSelect': 'MULTI_SELECT',
            'checkbox': 'CHECKBOX',
            'site': 'BI_SITE',
            'scenario': 'BI_SCENARIO',
            'dept': 'BI_DEPT',
            'costCenter': 'BI_COST_CENTER',
            'user': 'BI_USER',
            'account': 'BI_ACCOUNT',
            'expense': 'BI_EXPENSE',
            'customer': 'BI_CUSTOMER',
            'equipment': 'BI_EQUIPMENT',
            'product': 'BI_PRODUCT',
            // 대문자 (UI enum values) - 그대로 반환
            'TEXT_INPUT': 'TEXT_INPUT',
            'NUMBER_INPUT': 'NUMBER_INPUT',
            'DATE_PICKER': 'DATE_PICKER',
            'DATE_RANGE': 'DATE_RANGE',
            'YEAR_MONTH': 'YEAR_MONTH',
            'SELECT': 'SELECT',
            'MULTI_SELECT': 'MULTI_SELECT',
            'CHECKBOX': 'CHECKBOX',
            'BI_SITE': 'BI_SITE',
            'BI_SCENARIO': 'BI_SCENARIO',
            'BI_DEPT': 'BI_DEPT',
            'BI_COST_CENTER': 'BI_COST_CENTER',
            'BI_USER': 'BI_USER',
            'BI_ACCOUNT': 'BI_ACCOUNT',
            'BI_EXPENSE': 'BI_EXPENSE',
            'BI_CUSTOMER': 'BI_CUSTOMER',
            'BI_EQUIPMENT': 'BI_EQUIPMENT',
            'BI_PRODUCT': 'BI_PRODUCT'
        };
        return typeMap[type] || 'TEXT_INPUT';
    }
    /**
   * 툴바 버튼 생성
   */ generateToolbarButtons() {
        return [
            {
                id: 'add',
                label: '행 추가',
                icon: 'Plus',
                action: 'handleAddRow',
                variant: 'primary'
            },
            {
                id: 'save',
                label: '저장',
                icon: 'Save',
                action: 'handleSave',
                variant: 'success'
            },
            {
                id: 'delete',
                label: '삭제',
                icon: 'Trash2',
                action: 'handleDeleteSelected',
                variant: 'danger'
            },
            {
                id: 'excel',
                label: '엑셀',
                icon: 'Download',
                action: 'handleExcelExport',
                variant: 'secondary',
                position: 'right'
            }
        ];
    }
    /**
   * 그리드 컬럼 생성
   */ generateGridColumns(columns, pkField) {
        return columns.map((col, index)=>({
                id: `col_${index}`,
                headerName: col.headerName,
                field: col.field,
                width: col.width || 120,
                type: this.mapColumnType(col.editorType),
                editable: col.editable,
                required: col.required,
                align: col.align,
                isPrimaryKey: col.field === pkField
            }));
    }
    /**
   * 에디터 타입 → 그리드 컬럼 타입 매핑
   */ mapColumnType(editorType) {
        const typeMap = {
            'text': 'text',
            'number': 'number',
            'date': 'date',
            'datetime': 'datetime',
            'select': 'select',
            'checkbox': 'checkbox',
            'textarea': 'text',
            'readonly': 'text'
        };
        return typeMap[editorType] || 'text';
    }
    // ============================================================
    // API 생성 (SimpleGridCrudTemplate과 동일)
    // ============================================================
    /**
   * API 코드 생성
   */ async generateApiCode(data) {
        if (!isCrudParsedData(data)) {
            throw new Error('CrudParsedData required');
        }
        const screenId = data.screenId ?? 'SC000';
        const routerName = this.getRouterName(screenId);
        const tableName = data.tableName ?? 'unknown_table';
        return this.generateRouterCode(routerName, tableName, data.crudConfig, data.crudColumns);
    }
    /**
   * API 라우터 코드 생성 (전체 결과 반환)
   */ async generateApi(data) {
        try {
            const code = await this.generateApiCode(data);
            const screenId = data.screenId ?? 'SC000';
            return {
                success: true,
                fileName: `${this.getRouterName(screenId)}.ts`,
                code
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error)
            };
        }
    }
    /**
   * tRPC 라우터 코드 생성
   */ generateRouterCode(routerName, tableName, config, columns) {
        const pkField = config.primaryKey;
        const zodSchema = this.generateZodSchema(columns);
        return `/**
 * ${routerName} tRPC Router
 * @generated by AI Factory Lab (RealGrid Template)
 */

import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

${zodSchema}

export const ${routerName}Router = createTRPCRouter({
  // 목록 조회
  getList: publicProcedure
    .input(z.object({
      // 검색 조건 추가
    }).optional())
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.$queryRaw\`
        SELECT * FROM ${tableName}
        ${config.sortColumn ? `ORDER BY ${config.sortColumn} ${config.sortDirection || 'ASC'}` : ''}
      \`;
      return { data };
    }),

  // 단건 생성
  create: publicProcedure
    .input(${routerName}Schema)
    .mutation(async ({ ctx, input }) => {
      // TODO: INSERT 구현
      return { success: true };
    }),

  // 단건 수정
  update: publicProcedure
    .input(${routerName}Schema.extend({ ${pkField}: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // TODO: UPDATE 구현
      return { success: true };
    }),

  // 다중 삭제
  deleteMany: publicProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      // TODO: DELETE 구현
      return { success: true, deletedCount: input.ids.length };
    }),

  // 일괄 저장 (추가/수정/삭제)
  saveAll: publicProcedure
    .input(z.object({
      inserts: z.array(${routerName}Schema),
      updates: z.array(${routerName}Schema.extend({ ${pkField}: z.string() })),
      deletes: z.array(z.string()),
    }))
    .mutation(async ({ ctx, input }) => {
      // TODO: 트랜잭션으로 일괄 처리
      return {
        success: true,
        insertedCount: input.inserts.length,
        updatedCount: input.updates.length,
        deletedCount: input.deletes.length,
      };
    }),
});
`;
    }
    /**
   * Zod 스키마 생성
   */ generateZodSchema(columns) {
        const fields = columns.map((col)=>{
            let zodType = 'z.string()';
            switch(col.editorType){
                case 'number':
                    zodType = 'z.number()';
                    break;
                case 'checkbox':
                    zodType = 'z.boolean()';
                    break;
                case 'date':
                case 'datetime':
                    zodType = 'z.string()'; // ISO string
                    break;
                default:
                    zodType = 'z.string()';
            }
            if (!col.required) {
                zodType += '.optional()';
            }
            return `  ${col.field}: ${zodType},`;
        }).join('\n');
        const routerName = 'screen';
        return `const ${routerName}Schema = z.object({\n${fields}\n});`;
    }
    /**
   * 라우터 이름 생성
   */ getRouterName(screenId) {
        return `screen${screenId.replace('SC', '')}`;
    }
    // ============================================================
    // 컴포넌트 + API 전체 생성
    // ============================================================
    /**
   * 컴포넌트(스키마) + API 전체 생성
   */ async generateScreen(data) {
        const [componentResult, apiResult] = await Promise.all([
            this.generateComponent(data),
            this.generateApi(data)
        ]);
        return {
            success: componentResult.success && apiResult.success,
            component: componentResult,
            api: apiResult,
            metadata: {
                screenId: data.screenId ?? 'SC000',
                screenName: data.screenName,
                screenType: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ScreenType"].REALGRID_CRUD,
                tableName: data.tableName ?? '',
                generatedAt: new Date().toISOString()
            }
        };
    }
}
}),
"[project]/src/server/api/routers/screen-generator/templates/realgrid-crud/index.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * RealGrid CRUD 템플릿
 * @module screenGenerator/templates/realgrid-crud
 */ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$templates$2f$realgrid$2d$crud$2f$RealGridCrudTemplate$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/templates/realgrid-crud/RealGridCrudTemplate.ts [app-route] (ecmascript)");
;
}),
"[project]/src/server/api/routers/screen-generator/procedures/preview.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * 미리보기 생성 프로시저
 * @module screenGenerator/procedures/preview
 */ __turbopack_context__.s([
    "generateCrudPreview",
    ()=>generateCrudPreview,
    "generatePreview",
    ()=>generatePreview,
    "generatePreviewTemplate",
    ()=>generatePreviewTemplate,
    "generateRealGridPreview",
    ()=>generateRealGridPreview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/trpc.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$anthropic$2d$ai$2f$sdk$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@anthropic-ai/sdk/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$anthropic$2d$ai$2f$sdk$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__Anthropic__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/@anthropic-ai/sdk/client.mjs [app-route] (ecmascript) <export Anthropic as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/legacy/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$api$2d$key$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/legacy/api-key.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$templates$2f$react$2d$template$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/legacy/templates/react-template.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$templates$2f$html$2d$template$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/legacy/templates/html-template.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$prompts$2f$json$2d$data$2d$prompt$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/legacy/prompts/json-data-prompt.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/types.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$templates$2f$simple$2d$grid$2d$crud$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/templates/simple-grid-crud/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$templates$2f$simple$2d$grid$2d$crud$2f$SimpleGridCrudTemplate$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/templates/simple-grid-crud/SimpleGridCrudTemplate.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$templates$2f$realgrid$2d$crud$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/templates/realgrid-crud/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$templates$2f$realgrid$2d$crud$2f$RealGridCrudTemplate$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/templates/realgrid-crud/RealGridCrudTemplate.ts [app-route] (ecmascript)");
;
;
;
;
;
;
;
const generatePreview = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    parsedData: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any(),
    previewType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "html",
        "react"
    ]).default("html")
})).mutation(async ({ input })=>{
    try {
        // API 키 가져오기
        const apiKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$api$2d$key$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAnthropicApiKey"])();
        let gridData;
        if (apiKey) {
            try {
                const anthropic = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$anthropic$2d$ai$2f$sdk$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__Anthropic__as__default$3e$__["default"]({
                    apiKey
                });
                const jsonPrompt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$prompts$2f$json$2d$data$2d$prompt$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildJsonDataPrompt"])(input.parsedData);
                const message = await anthropic.messages.create({
                    model: "claude-sonnet-4-20250514",
                    max_tokens: 4096,
                    messages: [
                        {
                            role: "user",
                            content: jsonPrompt
                        }
                    ]
                });
                const content = message.content[0];
                if (content && content.type === "text") {
                    console.log("[DEBUG] Claude JSON 응답:", content.text.substring(0, 500));
                    // JSON 파싱 시도
                    const jsonMatch = content.text.match(/```json\s*([\s\S]*?)\s*```/) || content.text.match(/\{[\s\S]*\}/);
                    const jsonStr = jsonMatch ? jsonMatch[1] || jsonMatch[0] : content.text;
                    gridData = JSON.parse(jsonStr);
                    console.log("[DEBUG] JSON 파싱 성공:", Object.keys(gridData));
                }
            } catch (parseError) {
                console.error("[ERROR] Claude API/JSON 파싱 실패:", parseError);
                console.log("[DEBUG] 파싱 실패로 기본 데이터 사용");
            }
        }
        // API 실패 또는 API 키 없음 → 템플릿 기반 기본 데이터
        if (!gridData) {
            gridData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$templates$2f$react$2d$template$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createDefaultGridData"])(input.parsedData);
        }
        // 템플릿에 데이터 주입하여 코드 생성
        const reactCode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$templates$2f$react$2d$template$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateReactFromTemplate"])(input.parsedData, gridData);
        console.log("[DEBUG] 생성된 React 코드 길이:", reactCode.length);
        if (input.previewType === "html") {
            const htmlCode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$templates$2f$html$2d$template$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateHtmlFromTemplate"])(input.parsedData, gridData);
            return {
                success: true,
                html: htmlCode,
                preview: htmlCode
            };
        }
        return {
            success: true,
            componentCode: reactCode,
            preview: reactCode
        };
    } catch (error) {
        return {
            success: false,
            error: `미리보기 생성 오류: ${error instanceof Error ? error.message : "알 수 없는 오류"}`
        };
    }
});
const generatePreviewTemplate = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    parsedData: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any(),
    previewType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "html",
        "react"
    ]).default("html")
})).mutation(async ({ input })=>{
    try {
        // 템플릿 기반 기본 데이터 생성
        const gridData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$templates$2f$react$2d$template$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createDefaultGridData"])(input.parsedData);
        const reactCode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$templates$2f$react$2d$template$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateReactFromTemplate"])(input.parsedData, gridData);
        if (input.previewType === "html") {
            const htmlCode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$templates$2f$html$2d$template$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateHtmlFromTemplate"])(input.parsedData, gridData);
            return {
                success: true,
                html: htmlCode,
                preview: htmlCode
            };
        }
        return {
            success: true,
            componentCode: reactCode,
            preview: reactCode
        };
    } catch (error) {
        return {
            success: false,
            error: `미리보기 생성 오류: ${error instanceof Error ? error.message : "알 수 없는 오류"}`
        };
    }
});
const generateCrudPreview = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    parsedData: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any().optional(),
    screenId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    screenName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    tableName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    searchConditions: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any()).optional(),
    crudColumns: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any()).optional()
})).mutation(async ({ input })=>{
    try {
        let parsedData;
        // parsedData가 없으면 기본값으로 생성
        if (input.parsedData) {
            parsedData = input.parsedData;
            if (input.screenId) {
                parsedData.screenId = input.screenId;
            }
        } else if (input.screenId && input.screenName && input.tableName) {
            // 간편 모드: screenId, screenName, tableName으로 생성
            parsedData = {
                screenId: input.screenId,
                screenName: input.screenName,
                tableName: input.tableName,
                screenType: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ScreenType"].SIMPLE_GRID_CRUD,
                searchConditions: input.searchConditions || [],
                gridColumns: {
                    row1: [],
                    row2: [],
                    row3: [],
                    merges: [],
                    summaryRows: []
                },
                crudConfig: {
                    primaryKey: 'id',
                    autoGeneratePk: false,
                    softDelete: false,
                    auditColumns: true,
                    rowSelection: 'multiple',
                    pagination: false
                },
                crudColumns: input.crudColumns || []
            };
        } else {
            return {
                success: false,
                error: 'parsedData 또는 (screenId, screenName, tableName)을 입력해주세요.'
            };
        }
        // SimpleGridCrudTemplate 사용 (실제 데이터 기반)
        const template = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$templates$2f$simple$2d$grid$2d$crud$2f$SimpleGridCrudTemplate$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SimpleGridCrudTemplate"]();
        const result = await template.generateComponent(parsedData);
        if (!result.success) {
            return {
                success: false,
                error: result.error || '컴포넌트 생성 실패'
            };
        }
        return {
            success: true,
            component: result.code,
            api: '',
            warnings: [],
            generationTime: new Date().toISOString()
        };
    } catch (error) {
        return {
            success: false,
            error: `CRUD 미리보기 생성 오류: ${error instanceof Error ? error.message : "알 수 없는 오류"}`
        };
    }
});
const generateRealGridPreview = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    parsedData: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any().optional(),
    screenId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    screenName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    tableName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    searchConditions: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any()).optional(),
    crudColumns: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any()).optional()
})).mutation(async ({ input })=>{
    try {
        let parsedData;
        // parsedData가 없으면 기본값으로 생성
        if (input.parsedData) {
            parsedData = input.parsedData;
            if (input.screenId) {
                parsedData.screenId = input.screenId;
            }
        } else if (input.screenId && input.screenName && input.tableName) {
            // 간편 모드: screenId, screenName, tableName으로 생성
            parsedData = {
                screenId: input.screenId,
                screenName: input.screenName,
                tableName: input.tableName,
                screenType: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ScreenType"].REALGRID_CRUD,
                searchConditions: input.searchConditions || [],
                gridColumns: {
                    row1: [],
                    row2: [],
                    row3: [],
                    merges: [],
                    summaryRows: []
                },
                crudConfig: {
                    primaryKey: 'id',
                    autoGeneratePk: false,
                    softDelete: false,
                    auditColumns: true,
                    rowSelection: 'multiple',
                    pagination: false
                },
                crudColumns: input.crudColumns || []
            };
        } else {
            return {
                success: false,
                error: 'parsedData 또는 (screenId, screenName, tableName)을 입력해주세요.'
            };
        }
        // RealGridCrudTemplate 사용 (실제 데이터 기반)
        const template = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$templates$2f$realgrid$2d$crud$2f$RealGridCrudTemplate$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RealGridCrudTemplate"]();
        const result = await template.generateComponent(parsedData);
        if (!result.success) {
            return {
                success: false,
                error: result.error || '컴포넌트 생성 실패'
            };
        }
        // SQL 쿼리 생성
        const { SelectQueryBuilder } = await __turbopack_context__.A("[project]/src/server/api/routers/screen-generator/templates/query-generator/index.ts [app-route] (ecmascript, async loader)");
        // 공통 옵션 타입 → DB 컬럼명 매핑 (실제 binary 스키마 테이블 기준)
        const OPTION_TYPE_TO_COLUMN = {
            'YEAR_MONTH': 'yyyymm',
            'BI_YEAR_MONTH': 'yyyymm',
            'BI_SITE': 'plant_site_code',
            'BI_SCENARIO': 'scenario_code',
            // bi_dept_mst 테이블
            'BI_DEPT': 'department_code',
            'BI_COST_CENTER': 'cost_center_mapping_code',
            // bi_acct_mst 테이블
            'BI_ACCOUNT': 'account_code',
            // bi_cust_mst 테이블
            'BI_CUSTOMER': 'partner_code',
            // bi_prod_mst 테이블
            'BI_PRODUCT': 'product_item_code',
            // bi_equip_mst 테이블 (존재 시)
            'BI_EQUIPMENT': 'equipment_code',
            // bi_user_mst 테이블
            'BI_USER': 'user_code',
            // bi_expen_sel_mst 테이블
            'BI_EXPENSE': 'expense_item_code'
        };
        const queryBuilder = new SelectQueryBuilder();
        const sqlQuery = queryBuilder.build({
            tableName: parsedData.tableName || 'unknown_table',
            searchConditions: parsedData.searchConditions?.map((sc)=>{
                const optionType = sc.type?.toUpperCase() || '';
                const dbColumn = OPTION_TYPE_TO_COLUMN[optionType] || sc.columnName || sc.field || sc.name;
                return {
                    field: dbColumn,
                    operator: 'eq',
                    paramName: sc.name || sc.field
                };
            }) || [],
            limit: 500
        });
        return {
            success: true,
            component: result.code,
            query: sqlQuery,
            api: '',
            warnings: [],
            generationTime: new Date().toISOString()
        };
    } catch (error) {
        return {
            success: false,
            error: `RealGrid 미리보기 생성 오류: ${error instanceof Error ? error.message : "알 수 없는 오류"}`
        };
    }
});
}),
"[project]/src/server/api/routers/screen-generator/procedures/query.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * SQL 쿼리 생성 프로시저
 * @module screenGenerator/procedures/query
 */ __turbopack_context__.s([
    "generateQuery",
    ()=>generateQuery,
    "getTableColumns",
    ()=>getTableColumns,
    "getTableList",
    ()=>getTableList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/trpc.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/legacy/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$db$2d$metadata$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/legacy/db-metadata.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/legacy/types.ts [app-route] (ecmascript)");
;
;
;
const generateQuery = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    parsedData: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any(),
    tableName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
})).mutation(async ({ input })=>{
    try {
        const { parsedData, tableName } = input;
        // 1. DB 메타데이터에서 테이블 정보 조회
        const tableMeta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$db$2d$metadata$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findTableMeta"])(tableName);
        if (!tableMeta) {
            return {
                success: false,
                error: `테이블 '${tableName}'을(를) 찾을 수 없습니다. DB 메타데이터를 확인하세요.`,
                availableTables: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$db$2d$metadata$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadDbMetadata"])().slice(0, 20).map((t)=>t.name)
            };
        }
        // 2. 조회조건에서 WHERE 절 컬럼 추출
        const searchConditions = parsedData.searchConditions || [];
        const whereColumns = [];
        const columnMappings = [];
        for (const sc of searchConditions){
            const label = sc.label?.toString() || '';
            const scId = sc.id?.toString().toLowerCase() || '';
            let matchedColName = null;
            const mappedCols = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HEADER_TO_COLUMN_MAP"][label];
            if (mappedCols) {
                for (const candidate of mappedCols){
                    const found = tableMeta.columns.find((c)=>c.name.toLowerCase() === candidate.toLowerCase());
                    if (found) {
                        matchedColName = found.name;
                        break;
                    }
                }
            }
            if (!matchedColName) {
                const matchedCol = tableMeta.columns.find((col)=>{
                    const colName = col.name.toLowerCase();
                    const korName = col.korean_name.toLowerCase();
                    return colName.includes(scId) || korName.includes(label.toLowerCase()) || scId.includes(colName);
                });
                if (matchedCol) matchedColName = matchedCol.name;
            }
            if (matchedColName) {
                whereColumns.push(matchedColName);
                const col = tableMeta.columns.find((c)=>c.name === matchedColName);
                columnMappings.push({
                    label: sc.label,
                    dbColumn: matchedColName,
                    type: col?.type || 'unknown'
                });
            } else {
                columnMappings.push({
                    label: sc.label,
                    dbColumn: sc.id || 'UNKNOWN',
                    type: 'unknown'
                });
            }
        }
        // 3. 그리드 컬럼에서 SELECT 절 컬럼 추출
        const gridColumns = parsedData.gridColumns || {};
        const row2 = gridColumns.row2 || [];
        const row3 = gridColumns.row3 || [];
        const selectColumns = [];
        const allColumnMappings = [];
        // 기본 컬럼 추가
        const baseColumns = [
            'yyyymm',
            'site',
            'mat_gubun',
            'mat_code',
            'mat_desc',
            'size'
        ];
        for (const col of baseColumns){
            const found = tableMeta.columns.find((c)=>c.name.toLowerCase() === col);
            if (found && !selectColumns.includes(found.name)) {
                selectColumns.push(found.name);
            }
        }
        // row2 + row3 조합해서 매핑
        for(let i = 0; i < row3.length; i++){
            const groupHeader = row2[i]?.toString().trim() || '';
            const detailHeader = row3[i]?.toString().trim() || '';
            const h = detailHeader || groupHeader;
            if (!h || h.includes('합계')) continue;
            let matchedColName = null;
            const mappedCols = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HEADER_TO_COLUMN_MAP"][h];
            if (mappedCols) {
                for (const candidate of mappedCols){
                    const found = tableMeta.columns.find((c)=>c.name.toLowerCase() === candidate.toLowerCase());
                    if (found && !selectColumns.includes(found.name)) {
                        matchedColName = found.name;
                        break;
                    }
                }
            }
            if (!matchedColName) {
                const matchedCol = tableMeta.columns.find((col)=>{
                    const colName = col.name.toLowerCase();
                    const korName = col.korean_name.toLowerCase();
                    const hLower = h.toLowerCase();
                    return (colName === hLower || korName === hLower || hLower.includes(colName) || hLower.includes(korName)) && !selectColumns.includes(col.name);
                });
                if (matchedCol) matchedColName = matchedCol.name;
            }
            if (matchedColName) {
                selectColumns.push(matchedColName);
                const col = tableMeta.columns.find((c)=>c.name === matchedColName);
                allColumnMappings.push({
                    gridHeader: h,
                    dbColumn: matchedColName,
                    type: col?.type || 'unknown',
                    alias: h,
                    isMapped: true
                });
            } else {
                allColumnMappings.push({
                    gridHeader: h,
                    dbColumn: null,
                    type: 'unknown',
                    alias: h,
                    isMapped: false
                });
            }
        }
        // 4. SELECT 컬럼이 없으면 전체 컬럼 사용
        if (allColumnMappings.length === 0) {
            const businessColumns = tableMeta.columns.filter((col)=>!col.name.toLowerCase().includes('create') && !col.name.toLowerCase().includes('update') && !col.name.toLowerCase().includes('delete'));
            for (const col of businessColumns.slice(0, 20)){
                selectColumns.push(col.name);
                allColumnMappings.push({
                    gridHeader: col.korean_name || col.name,
                    dbColumn: col.name,
                    type: col.type,
                    alias: col.korean_name || col.name,
                    isMapped: true
                });
            }
        }
        // 5. SQL 쿼리 생성
        const selectItems = allColumnMappings.length > 0 ? allColumnMappings.map((m, index)=>{
            const isLast = index === allColumnMappings.length - 1;
            const comma = isLast ? '' : ',';
            if (m.isMapped && m.dbColumn) {
                return `  ${m.dbColumn} AS "${m.alias}"${comma}`;
            } else {
                return `  '' AS "${m.alias}"${comma}  -- TODO: 미매핑`;
            }
        }) : selectColumns.map((c, index)=>{
            const isLast = index === selectColumns.length - 1;
            return `  ${c}${isLast ? '' : ','}`;
        });
        const selectClause = selectItems.join('\n');
        // WHERE 절 생성
        let whereClause = '';
        if (whereColumns.length > 0) {
            const conditions = columnMappings.filter((m)=>m.dbColumn !== 'UNKNOWN').map((m)=>{
                if (m.type.includes('varchar') || m.type.includes('text')) {
                    return `  AND ${m.dbColumn} = :${m.dbColumn}`;
                } else if (m.type.includes('date') || m.type.includes('timestamp')) {
                    return `  AND ${m.dbColumn} BETWEEN :${m.dbColumn}_start AND :${m.dbColumn}_end`;
                } else {
                    return `  AND ${m.dbColumn} = :${m.dbColumn}`;
                }
            });
            whereClause = conditions.join('\n');
        }
        // 미매핑 헤더 추출
        const unmatchedHeaders = allColumnMappings.filter((m)=>!m.isMapped).map((m)=>m.gridHeader);
        let unmatchedComment = '';
        if (unmatchedHeaders.length > 0) {
            unmatchedComment = `
-- ⚠️ 미매핑 컬럼 ${unmatchedHeaders.length}개 (빈값으로 처리됨):
-- ${unmatchedHeaders.join(', ')}
`;
        }
        const sql = `-- ${parsedData.screenName || '화면'} 조회 쿼리
-- 생성일시: ${new Date().toISOString()}
-- 테이블: ${tableName}
${unmatchedComment}
SELECT
${selectClause}
FROM ${tableName}
WHERE 1=1
${whereClause}
ORDER BY ${selectColumns[0] || 'yyyymm'} DESC
;`;
        const mappedCount = allColumnMappings.filter((m)=>m.isMapped).length;
        const unmappedCount = allColumnMappings.filter((m)=>!m.isMapped).length;
        return {
            success: true,
            sql,
            tableMeta: {
                name: tableMeta.name,
                korean_name: tableMeta.korean_name,
                columnCount: tableMeta.columns.length,
                availableColumns: tableMeta.columns.map((c)=>c.name)
            },
            columnMappings,
            allColumnMappings,
            unmatchedHeaders,
            stats: {
                totalColumns: allColumnMappings.length,
                mappedCount,
                unmappedCount
            },
            suggestion: unmatchedHeaders.length > 0 ? `전체 ${allColumnMappings.length}개 컬럼 중 ${mappedCount}개 매핑, ${unmappedCount}개 미매핑.` : `전체 ${allColumnMappings.length}개 컬럼 모두 매핑 완료.`
        };
    } catch (error) {
        return {
            success: false,
            error: `쿼리 생성 오류: ${error instanceof Error ? error.message : "알 수 없는 오류"}`
        };
    }
});
const getTableList = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].query(()=>{
    const metadata = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$db$2d$metadata$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadDbMetadata"])();
    return metadata.map((t)=>({
            name: t.name,
            korean_name: t.korean_name,
            columnCount: t.columns.length
        }));
});
const getTableColumns = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    tableName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
})).query(({ input })=>{
    const tableMeta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$db$2d$metadata$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findTableMeta"])(input.tableName);
    if (!tableMeta) {
        return {
            success: false,
            error: `테이블 '${input.tableName}'을(를) 찾을 수 없습니다.`
        };
    }
    return {
        success: true,
        tableName: tableMeta.name,
        korean_name: tableMeta.korean_name,
        columns: tableMeta.columns.map((c)=>({
                name: c.name,
                korean_name: c.korean_name,
                type: c.type,
                nullable: c.nullable,
                meaning: c.meaning
            }))
    };
});
}),
"[project]/src/server/api/routers/screen-generator/_shared/utils.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * 화면 생성기 공통 유틸리티
 * @module screenGenerator/_shared/utils
 */ __turbopack_context__.s([
    "capitalize",
    ()=>capitalize,
    "ensureDir",
    ()=>ensureDir,
    "generateTempScreenId",
    ()=>generateTempScreenId,
    "getAppScreenPath",
    ()=>getAppScreenPath,
    "getISOTimestamp",
    ()=>getISOTimestamp,
    "getPublishedScreenPath",
    ()=>getPublishedScreenPath,
    "getScreensBasePath",
    ()=>getScreensBasePath,
    "getTempScreenPath",
    ()=>getTempScreenPath,
    "getTimestamp",
    ()=>getTimestamp,
    "readJsonFile",
    ()=>readJsonFile,
    "readTextFile",
    ()=>readTextFile,
    "toCamelCase",
    ()=>toCamelCase,
    "toPascalCase",
    ()=>toPascalCase,
    "toSafeComponentName",
    ()=>toSafeComponentName,
    "writeJsonFile",
    ()=>writeJsonFile,
    "writeTextFile",
    ()=>writeTextFile
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
// ============================================================
// 공통 export
// ============================================================
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/types.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/validation.ts [app-route] (ecmascript)");
;
;
function ensureDir(dirPath) {
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["existsSync"](dirPath)) {
        __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["mkdirSync"](dirPath, {
            recursive: true
        });
    }
}
function readJsonFile(filePath) {
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["existsSync"](filePath)) {
        return null;
    }
    return JSON.parse(__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["readFileSync"](filePath, 'utf-8'));
}
function writeJsonFile(filePath, data) {
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["writeFileSync"](filePath, JSON.stringify(data, null, 2));
}
function readTextFile(filePath) {
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["existsSync"](filePath)) {
        return null;
    }
    return __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["readFileSync"](filePath, 'utf-8');
}
function writeTextFile(filePath, content) {
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["writeFileSync"](filePath, content);
}
function getScreensBasePath() {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](process.cwd(), 'generated', 'screens');
}
function getTempScreenPath(screenId) {
    const base = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](getScreensBasePath(), 'temp');
    return screenId ? __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](base, screenId) : base;
}
function getPublishedScreenPath(screenId) {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](getScreensBasePath(), screenId);
}
function getAppScreenPath(screenId) {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](process.cwd(), 'src', 'app', 'screens', screenId.toLowerCase());
}
function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function toCamelCase(str) {
    return str.replace(/[^a-zA-Z0-9가-힣]/g, ' ').split(' ').filter(Boolean).map((word, index)=>index === 0 ? word.toLowerCase() : capitalize(word.toLowerCase())).join('');
}
function toPascalCase(str) {
    return str.replace(/[^a-zA-Z0-9가-힣]/g, ' ').split(' ').filter(Boolean).map((word)=>capitalize(word.toLowerCase())).join('');
}
function toSafeComponentName(screenName) {
    // 한글도 허용하되, 특수문자 제거
    const name = screenName.replace(/[^a-zA-Z0-9가-힣]/g, '') || 'GeneratedScreen';
    return name;
}
function getISOTimestamp() {
    return new Date().toISOString();
}
function getTimestamp() {
    return Date.now();
}
function generateTempScreenId() {
    return `TEMP_${getTimestamp()}`;
}
;
;
}),
"[project]/src/server/api/routers/screen-generator/procedures/tempScreen.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * 임시화면 관리 프로시저
 * @module screenGenerator/procedures/tempScreen
 */ __turbopack_context__.s([
    "deleteTempScreen",
    ()=>deleteTempScreen,
    "getTempScreen",
    ()=>getTempScreen,
    "getTempScreenList",
    ()=>getTempScreenList,
    "saveTempScreen",
    ()=>saveTempScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/trpc.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/utils.ts [app-route] (ecmascript) <locals>");
;
;
;
;
;
const saveTempScreen = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    screenName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    screenNameEn: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    tableName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    htmlContent: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    reactContent: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    sqlQuery: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    parsedData: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any().optional()
})).mutation(async ({ input })=>{
    try {
        const tempDir = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getTempScreenPath"])();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ensureDir"])(tempDir);
        // 고유 ID 생성
        const screenId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["generateTempScreenId"])();
        const screenDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](tempDir, screenId);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ensureDir"])(screenDir);
        // 메타데이터 저장
        const metadata = {
            screenId,
            screenName: input.screenName,
            screenNameEn: input.screenNameEn || '',
            tableName: input.tableName || '',
            createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getISOTimestamp"])(),
            status: 'temp'
        };
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["writeJsonFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](screenDir, 'metadata.json'), metadata);
        // HTML 미리보기 저장
        if (input.htmlContent) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["writeTextFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](screenDir, 'preview.html'), input.htmlContent);
        }
        // React 컴포넌트 저장
        if (input.reactContent) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["writeTextFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](screenDir, 'component.tsx'), input.reactContent);
        }
        // SQL 쿼리 저장
        if (input.sqlQuery) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["writeTextFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](screenDir, 'query.sql'), input.sqlQuery);
        }
        // parsedData 저장
        if (input.parsedData) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["writeJsonFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](screenDir, 'parsedData.json'), input.parsedData);
        }
        console.log(`[DEBUG] 임시화면 저장: ${screenId}`);
        return {
            success: true,
            screenId,
            path: screenDir,
            message: `임시화면 '${input.screenName}'이(가) 저장되었습니다.`
        };
    } catch (error) {
        return {
            success: false,
            error: `임시화면 저장 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`
        };
    }
});
const getTempScreenList = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].query(()=>{
    try {
        const tempDir = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getTempScreenPath"])();
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["existsSync"](tempDir)) {
            return {
                success: true,
                screens: []
            };
        }
        const screens = [];
        const dirs = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["readdirSync"](tempDir);
        for (const dir of dirs){
            const screenDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](tempDir, dir);
            const metadata = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["readJsonFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](screenDir, 'metadata.json'));
            if (metadata) {
                screens.push({
                    ...metadata,
                    hasHtml: __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["existsSync"](__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](screenDir, 'preview.html')),
                    hasReact: __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["existsSync"](__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](screenDir, 'component.tsx')),
                    hasSql: __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["existsSync"](__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](screenDir, 'query.sql'))
                });
            }
        }
        // 최신순 정렬
        screens.sort((a, b)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        return {
            success: true,
            screens
        };
    } catch (error) {
        return {
            success: false,
            screens: [],
            error: `목록 조회 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`
        };
    }
});
const getTempScreen = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    screenId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
})).query(({ input })=>{
    try {
        const screenDir = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getTempScreenPath"])(input.screenId);
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["existsSync"](screenDir)) {
            return {
                success: false,
                error: `화면 '${input.screenId}'을(를) 찾을 수 없습니다.`
            };
        }
        const metadata = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["readJsonFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](screenDir, 'metadata.json'));
        return {
            success: true,
            metadata,
            htmlContent: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["readTextFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](screenDir, 'preview.html')),
            reactContent: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["readTextFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](screenDir, 'component.tsx')),
            sqlQuery: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["readTextFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](screenDir, 'query.sql')),
            parsedData: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["readJsonFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](screenDir, 'parsedData.json'))
        };
    } catch (error) {
        return {
            success: false,
            error: `화면 조회 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`
        };
    }
});
const deleteTempScreen = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    screenId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
})).mutation(({ input })=>{
    try {
        const screenDir = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getTempScreenPath"])(input.screenId);
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["existsSync"](screenDir)) {
            return {
                success: false,
                error: `화면 '${input.screenId}'을(를) 찾을 수 없습니다.`
            };
        }
        __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["rmSync"](screenDir, {
            recursive: true,
            force: true
        });
        return {
            success: true,
            message: `화면 '${input.screenId}'이(가) 삭제되었습니다.`
        };
    } catch (error) {
        return {
            success: false,
            error: `화면 삭제 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`
        };
    }
});
}),
"[project]/src/server/api/routers/screen-generator/procedures/publish.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * 화면 발행 프로시저
 * @module screenGenerator/procedures/publish
 */ __turbopack_context__.s([
    "generateReactComponent",
    ()=>generateReactComponent,
    "publishScreen",
    ()=>publishScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/trpc.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$anthropic$2d$ai$2f$sdk$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@anthropic-ai/sdk/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$anthropic$2d$ai$2f$sdk$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__Anthropic__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/@anthropic-ai/sdk/client.mjs [app-route] (ecmascript) <export Anthropic as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/legacy/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$id$2d$generator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/legacy/id-generator.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$api$2d$key$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/legacy/api-key.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$converters$2f$to$2d$next$2d$page$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/legacy/converters/to-next-page.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$prompts$2f$react$2d$component$2d$prompt$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/legacy/prompts/react-component-prompt.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/utils.ts [app-route] (ecmascript) <locals>");
;
;
;
;
;
;
;
/**
 * 화면 ID 생성 wrapper
 */ async function generateScreenId() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$id$2d$generator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateScreenId"])();
}
const publishScreen = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    screenId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    parentMenuId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    menuName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    menuNameEn: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    sortOrder: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional()
})).mutation(async ({ input, ctx })=>{
    try {
        const tempScreenDir = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getTempScreenPath"])(input.screenId);
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["existsSync"](tempScreenDir)) {
            return {
                success: false,
                error: `임시화면 '${input.screenId}'을(를) 찾을 수 없습니다.`
            };
        }
        // 1. 새 화면 ID 생성 (SC + 6자리)
        const newScreenId = await generateScreenId();
        // 2. 정식 화면 폴더로 복사
        const finalDir = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getPublishedScreenPath"])(newScreenId);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ensureDir"])(finalDir);
        const files = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["readdirSync"](tempScreenDir);
        for (const file of files){
            __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["copyFileSync"](__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](tempScreenDir, file), __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](finalDir, file));
        }
        // 메타데이터 업데이트
        const metadata = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["readJsonFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](finalDir, 'metadata.json')) || {};
        metadata.screenId = newScreenId;
        metadata.status = 'published';
        metadata.publishedAt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getISOTimestamp"])();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["writeJsonFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](finalDir, 'metadata.json'), metadata);
        // 3. 부모 메뉴 정보 조회
        const parentMenu = await ctx.db.$queryRaw`
        SELECT menu_level, menu_id 
        FROM "binary".sys_menu 
        WHERE menu_id = ${input.parentMenuId}
      `;
        const parentLevel = parentMenu?.[0]?.menu_level ?? 0;
        const newMenuLevel = parentLevel + 1;
        // 현재 부모 아래 최대 sort_order 조회
        const maxSortOrder = await ctx.db.$queryRaw`
        SELECT MAX(sort_order) as max_order 
        FROM "binary".sys_menu 
        WHERE parent_id = ${input.parentMenuId}
      `;
        const maxOrderValue = maxSortOrder?.[0]?.max_order ?? 0;
        const newSortOrder = input.sortOrder ?? (maxOrderValue ?? 0) + 10;
        // 새 메뉴 ID 생성
        const newMenuId = `MENU_${newScreenId}`;
        // 4. 메뉴 DB에 INSERT
        await ctx.db.$executeRaw`
        INSERT INTO "binary".sys_menu (
          menu_id, parent_id, menu_level, sort_order,
          menu_name, menu_name_en, menu_path, menu_icon,
          screen_id, screen_type, is_active, is_visible,
          created_at, updated_at
        ) VALUES (
          ${newMenuId},
          ${input.parentMenuId},
          ${newMenuLevel},
          ${newSortOrder},
          ${input.menuName},
          ${input.menuNameEn || ''},
          ${`/screens/${newScreenId}`},
          ${'FileText'},
          ${newScreenId},
          ${'grid'},
          ${true},
          ${true},
          NOW(),
          NOW()
        )
      `;
        console.log(`[DEBUG] 메뉴 DB 등록 완료: ${newMenuId} → ${input.parentMenuId}`);
        // 5. 파일에도 백업 저장
        const menuEntry = {
            menuId: newMenuId,
            parentId: input.parentMenuId,
            menuName: input.menuName,
            menuNameEn: input.menuNameEn || '',
            menuPath: `/screens/${newScreenId}`,
            screenId: newScreenId,
            menuLevel: newMenuLevel,
            sortOrder: newSortOrder,
            isActive: true,
            isVisible: true,
            createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getISOTimestamp"])()
        };
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["writeJsonFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](finalDir, 'menu.json'), menuEntry);
        // 6. src/app/screens/[screenId]/page.tsx 생성
        const componentCode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["readTextFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](finalDir, 'component.tsx'));
        if (componentCode) {
            // RealGrid 화면 여부 감지 (RealGrid import 포함 시)
            const isRealGridScreen = componentCode.includes("from 'realgrid'") || componentCode.includes('from "realgrid"') || componentCode.includes('GridView') || componentCode.includes('LocalDataProvider');
            let pageCode;
            if (isRealGridScreen) {
                // RealGrid 화면: 직접 사용 (convertToNextPage가 AG Grid 코드를 추가하므로 건너뜀)
                pageCode = componentCode;
                console.log(`[DEBUG] RealGrid 화면 감지 - 변환 없이 사용: ${newScreenId}`);
            } else {
                // AG Grid 화면: 기존 변환 로직 사용
                pageCode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$converters$2f$to$2d$next$2d$page$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["convertToNextPage"])(componentCode, newScreenId, input.menuName);
            }
            const appScreenDir = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getAppScreenPath"])(newScreenId);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ensureDir"])(appScreenDir);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["writeTextFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](appScreenDir, 'page.tsx'), pageCode);
            console.log(`[DEBUG] 실제 페이지 생성: src/app/screens/${newScreenId.toLowerCase()}/page.tsx`);
        }
        // 7. 임시 폴더 삭제
        __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["rmSync"](tempScreenDir, {
            recursive: true,
            force: true
        });
        console.log(`[DEBUG] 화면 발행: ${input.screenId} → ${newScreenId}`);
        return {
            success: true,
            screenId: newScreenId,
            menuId: newMenuId,
            menuPath: `/screens/${newScreenId}`,
            message: `화면 '${input.menuName}'이(가) 메뉴에 등록되었습니다.`
        };
    } catch (error) {
        console.error('[ERROR] 화면 발행 실패:', error);
        return {
            success: false,
            error: `화면 발행 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`
        };
    }
});
const generateReactComponent = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    screenId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
})).mutation(async ({ input })=>{
    try {
        const tempDir = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getTempScreenPath"])(input.screenId);
        const parsedData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["readJsonFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](tempDir, 'parsedData.json'));
        if (!parsedData) {
            return {
                success: false,
                error: '화면 데이터를 찾을 수 없습니다.'
            };
        }
        // SQL 쿼리 로드
        const sqlQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["readTextFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](tempDir, 'query.sql'));
        // React 컴포넌트 프롬프트 생성
        const prompt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$prompts$2f$react$2d$component$2d$prompt$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildReactComponentPrompt"])(parsedData, sqlQuery);
        // Claude API 호출
        const apiKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$legacy$2f$api$2d$key$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAnthropicApiKey"])();
        if (!apiKey) {
            return {
                success: false,
                error: 'API 키가 없습니다.'
            };
        }
        const client = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$anthropic$2d$ai$2f$sdk$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__Anthropic__as__default$3e$__["default"]({
            apiKey
        });
        const message = await client.messages.create({
            model: "claude-sonnet-4-20250514",
            max_tokens: 8000,
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]
        });
        let reactCode = "";
        for (const block of message.content){
            if (block.type === "text") {
                reactCode += block.text;
            }
        }
        // 코드 블록 마커 제거
        reactCode = reactCode.replace(/```(?:tsx|typescript|jsx)?\n?/g, '').replace(/```$/g, '').trim();
        // 파일 저장
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["writeTextFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](tempDir, 'component.tsx'), reactCode);
        // 메타데이터 업데이트
        const metadata = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["readJsonFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](tempDir, 'metadata.json'));
        if (metadata) {
            metadata.hasReact = true;
            metadata.reactGeneratedAt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getISOTimestamp"])();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["writeJsonFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](tempDir, 'metadata.json'), metadata);
        }
        console.log(`[DEBUG] React 컴포넌트 생성 완료: ${input.screenId}`);
        return {
            success: true,
            reactCode,
            message: 'React 컴포넌트가 생성되었습니다.'
        };
    } catch (error) {
        console.error('[ERROR] React 컴포넌트 생성 실패:', error);
        return {
            success: false,
            error: `React 생성 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`
        };
    }
});
}),
"[project]/src/server/api/routers/screen-generator/procedures/index.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * 프로시저 re-export
 * @module screenGenerator/procedures
 */ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$procedures$2f$validate$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/procedures/validate.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$procedures$2f$preview$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/procedures/preview.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$procedures$2f$query$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/procedures/query.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$procedures$2f$tempScreen$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/procedures/tempScreen.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$procedures$2f$publish$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/procedures/publish.ts [app-route] (ecmascript)");
;
;
;
;
;
}),
"[project]/src/server/api/routers/screen-generator/index.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * 화면 생성기 API 라우터 (리팩토링 버전)
 * 
 * 구조:
 * - _shared/: 공통 타입, 유틸리티, 검증 로직
 * - procedures/: tRPC 프로시저 (validate, preview, query, tempScreen, publish)
 * - templates/: 화면 유형별 템플릿 생성기 (향후 확장)
 * 
 * 지원 화면 유형:
 * - SIMPLE_GRID: 단순 조회 화면 (현재)
 * - SIMPLE_GRID_CRUD: 단순 CRUD 화면 (향후)
 * - COMPLEX_GRID: 복잡 조회 화면 (향후)
 * - COMPLEX_GRID_CRUD: 복잡 CRUD 화면 (향후)
 * - GRID_WITH_CHART: CRUD + 차트 화면 (향후)
 * 
 * @module screenGenerator
 */ __turbopack_context__.s([
    "screenGeneratorRouter",
    ()=>screenGeneratorRouter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/trpc.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$procedures$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/procedures/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$procedures$2f$validate$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/procedures/validate.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$procedures$2f$preview$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/procedures/preview.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$procedures$2f$query$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/procedures/query.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$procedures$2f$tempScreen$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/procedures/tempScreen.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$procedures$2f$publish$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/procedures/publish.ts [app-route] (ecmascript)");
// 타입 re-export
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$_shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/_shared/types.ts [app-route] (ecmascript)");
;
;
const screenGeneratorRouter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createTRPCRouter"])({
    // ============================================================
    // 검증 (Validation)
    // ============================================================
    /** Excel 템플릿 검증 */ validateTemplate: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$procedures$2f$validate$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateTemplate"],
    // ============================================================
    // 미리보기 (Preview)
    // ============================================================
    /** Claude API + 템플릿 기반 미리보기 생성 */ generatePreview: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$procedures$2f$preview$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generatePreview"],
    /** 템플릿 기반 미리보기 생성 (Claude API 없이) */ generatePreviewTemplate: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$procedures$2f$preview$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generatePreviewTemplate"],
    /** CRUD 화면 미리보기 생성 */ generateCrudPreview: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$procedures$2f$preview$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateCrudPreview"],
    /** RealGrid CRUD 화면 미리보기 생성 */ generateRealGridPreview: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$procedures$2f$preview$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateRealGridPreview"],
    // ============================================================
    // 쿼리 (Query)
    // ============================================================
    /** SQL 쿼리 자동 생성 */ generateQuery: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$procedures$2f$query$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateQuery"],
    /** DB 테이블 목록 조회 */ getTableList: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$procedures$2f$query$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getTableList"],
    /** 테이블 컬럼 정보 조회 */ getTableColumns: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$procedures$2f$query$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getTableColumns"],
    // ============================================================
    // 임시화면 관리 (Temp Screen)
    // ============================================================
    /** 임시화면 저장 */ saveTempScreen: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$procedures$2f$tempScreen$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["saveTempScreen"],
    /** 임시화면 목록 조회 */ getTempScreenList: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$procedures$2f$tempScreen$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getTempScreenList"],
    /** 임시화면 상세 조회 */ getTempScreen: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$procedures$2f$tempScreen$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getTempScreen"],
    /** 임시화면 삭제 */ deleteTempScreen: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$procedures$2f$tempScreen$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deleteTempScreen"],
    // ============================================================
    // 발행 (Publish)
    // ============================================================
    /** 임시화면을 정식 화면으로 발행 */ publishScreen: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$procedures$2f$publish$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publishScreen"],
    /** React 컴포넌트 생성 */ generateReactComponent: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$procedures$2f$publish$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateReactComponent"]
});
;
}),
"[project]/src/server/api/routers/options.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * 옵션 공통 API 라우터
 * binary 스키마의 마스터 테이블에서 코드/명칭 데이터를 조회
 * 
 * 컬럼 규칙:
 * - 표시: _name (예: department_name)
 * - 값: _code (예: department_code)
 */ __turbopack_context__.s([
    "optionsRouter",
    ()=>optionsRouter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/trpc.ts [app-route] (ecmascript)");
;
;
// 공통 입력 스키마
const optionQueryInput = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    search: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    site: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    yyyymm: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    scenario: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    limit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional().default(100)
});
const optionsRouter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createTRPCRouter"])({
    /**
   * 거래처 목록 조회 (bi_cust_mst)
   * code: partner_code, name: partner_name
   */ getCustomers: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(optionQueryInput).query(async ({ ctx, input })=>{
        const { search, site, yyyymm, scenario, limit } = input;
        const conditions = [
            "1=1"
        ];
        const params = [];
        let paramIndex = 1;
        if (site) {
            conditions.push(`plant_site_code = $${paramIndex}`);
            params.push(site);
            paramIndex++;
        }
        if (yyyymm) {
            conditions.push(`yyyymm = $${paramIndex}`);
            params.push(yyyymm);
            paramIndex++;
        }
        if (scenario) {
            conditions.push(`scenario_code = $${paramIndex}`);
            params.push(scenario);
            paramIndex++;
        }
        if (search) {
            conditions.push(`(partner_code ILIKE $${paramIndex} OR partner_name ILIKE $${paramIndex})`);
            params.push(`%${search}%`);
            paramIndex++;
        }
        params.push(limit);
        const query = `
        SELECT DISTINCT 
          partner_code as code, 
          COALESCE(partner_name, partner_code) as name
        FROM "binary".bi_cust_mst
        WHERE ${conditions.join(" AND ")}
        ORDER BY partner_code
        LIMIT $${paramIndex}
      `;
        const results = await ctx.db.$queryRawUnsafe(query, ...params);
        return results;
    }),
    /**
   * 제품/자재 목록 조회 (bi_prod_mst)
   * code: product_item_code, name: product_item_name
   */ getMaterials: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(optionQueryInput).query(async ({ ctx, input })=>{
        const { search, site, yyyymm, scenario, limit } = input;
        const conditions = [
            "1=1"
        ];
        const params = [];
        let paramIndex = 1;
        if (site) {
            conditions.push(`plant_site_code = $${paramIndex}`);
            params.push(site);
            paramIndex++;
        }
        if (yyyymm) {
            conditions.push(`yyyymm = $${paramIndex}`);
            params.push(yyyymm);
            paramIndex++;
        }
        if (scenario) {
            conditions.push(`scenario_code = $${paramIndex}`);
            params.push(scenario);
            paramIndex++;
        }
        if (search) {
            conditions.push(`(product_item_code ILIKE $${paramIndex} OR product_item_name ILIKE $${paramIndex})`);
            params.push(`%${search}%`);
            paramIndex++;
        }
        params.push(limit);
        const query = `
        SELECT DISTINCT 
          product_item_code as code, 
          COALESCE(product_item_name, product_item_code) as name
        FROM "binary".bi_prod_mst
        WHERE ${conditions.join(" AND ")}
        ORDER BY product_item_code
        LIMIT $${paramIndex}
      `;
        const results = await ctx.db.$queryRawUnsafe(query, ...params);
        return results;
    }),
    /**
   * 설비 목록 조회 (bi_eqp_mst)
   * code: equipment_code, name: equipment_name
   */ getModels: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(optionQueryInput).query(async ({ ctx, input })=>{
        const { search, site, yyyymm, scenario, limit } = input;
        const conditions = [
            "1=1"
        ];
        const params = [];
        let paramIndex = 1;
        if (site) {
            conditions.push(`plant_site_code = $${paramIndex}`);
            params.push(site);
            paramIndex++;
        }
        if (yyyymm) {
            conditions.push(`yyyymm = $${paramIndex}`);
            params.push(yyyymm);
            paramIndex++;
        }
        if (scenario) {
            conditions.push(`scenario_code = $${paramIndex}`);
            params.push(scenario);
            paramIndex++;
        }
        if (search) {
            conditions.push(`(equipment_code ILIKE $${paramIndex} OR equipment_name ILIKE $${paramIndex})`);
            params.push(`%${search}%`);
            paramIndex++;
        }
        params.push(limit);
        const query = `
        SELECT DISTINCT 
          equipment_code as code, 
          COALESCE(equipment_name, equipment_code) as name
        FROM "binary".bi_eqp_mst
        WHERE ${conditions.join(" AND ")}
        ORDER BY equipment_code
        LIMIT $${paramIndex}
      `;
        const results = await ctx.db.$queryRawUnsafe(query, ...params);
        return results;
    }),
    /**
   * 계정 목록 조회 (bi_acct_mst)
   * code: account_code, name: account_name
   */ getAccounts: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(optionQueryInput).query(async ({ ctx, input })=>{
        const { search, site, yyyymm, scenario, limit } = input;
        const conditions = [
            "1=1"
        ];
        const params = [];
        let paramIndex = 1;
        if (site) {
            conditions.push(`plant_site_code = $${paramIndex}`);
            params.push(site);
            paramIndex++;
        }
        if (yyyymm) {
            conditions.push(`yyyymm = $${paramIndex}`);
            params.push(yyyymm);
            paramIndex++;
        }
        if (scenario) {
            conditions.push(`scenario_code = $${paramIndex}`);
            params.push(scenario);
            paramIndex++;
        }
        if (search) {
            conditions.push(`(account_code ILIKE $${paramIndex} OR account_name ILIKE $${paramIndex})`);
            params.push(`%${search}%`);
            paramIndex++;
        }
        params.push(limit);
        const query = `
        SELECT DISTINCT 
          account_code as code, 
          COALESCE(account_name, account_code) as name
        FROM "binary".bi_acct_mst
        WHERE ${conditions.join(" AND ")}
        ORDER BY account_code
        LIMIT $${paramIndex}
      `;
        const results = await ctx.db.$queryRawUnsafe(query, ...params);
        return results;
    }),
    /**
   * 비용구분 목록 조회 (bi_expen_sel_mst)
   * code: expense_item_code, name: expense_item_name
   */ getExpenSels: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(optionQueryInput).query(async ({ ctx, input })=>{
        const { search, site, yyyymm, scenario, limit } = input;
        const conditions = [
            "1=1"
        ];
        const params = [];
        let paramIndex = 1;
        if (site) {
            conditions.push(`plant_site_code = $${paramIndex}`);
            params.push(site);
            paramIndex++;
        }
        if (yyyymm) {
            conditions.push(`yyyymm = $${paramIndex}`);
            params.push(yyyymm);
            paramIndex++;
        }
        if (scenario) {
            conditions.push(`scenario_code = $${paramIndex}`);
            params.push(scenario);
            paramIndex++;
        }
        if (search) {
            conditions.push(`(expense_item_code ILIKE $${paramIndex} OR expense_item_name ILIKE $${paramIndex})`);
            params.push(`%${search}%`);
            paramIndex++;
        }
        params.push(limit);
        const query = `
        SELECT DISTINCT 
          expense_item_code as code, 
          COALESCE(expense_item_name, expense_item_code) as name
        FROM "binary".bi_expen_sel_mst
        WHERE ${conditions.join(" AND ")}
        ORDER BY expense_item_code
        LIMIT $${paramIndex}
      `;
        const results = await ctx.db.$queryRawUnsafe(query, ...params);
        return results;
    }),
    /**
   * 부서 목록 조회 (bi_dept_mst)
   * code: department_code, name: department_name
   */ getDepartments: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(optionQueryInput).query(async ({ ctx, input })=>{
        const { search, site, yyyymm, scenario, limit } = input;
        const conditions = [
            "1=1"
        ];
        const params = [];
        let paramIndex = 1;
        if (site) {
            conditions.push(`plant_site_code = $${paramIndex}`);
            params.push(site);
            paramIndex++;
        }
        if (yyyymm) {
            conditions.push(`yyyymm = $${paramIndex}`);
            params.push(yyyymm);
            paramIndex++;
        }
        if (scenario) {
            conditions.push(`scenario_code = $${paramIndex}`);
            params.push(scenario);
            paramIndex++;
        }
        if (search) {
            conditions.push(`(department_code ILIKE $${paramIndex} OR department_name ILIKE $${paramIndex})`);
            params.push(`%${search}%`);
            paramIndex++;
        }
        params.push(limit);
        const query = `
        SELECT DISTINCT 
          department_code as code, 
          COALESCE(department_name, department_code) as name
        FROM "binary".bi_dept_mst
        WHERE ${conditions.join(" AND ")}
        ORDER BY department_code
        LIMIT $${paramIndex}
      `;
        const results = await ctx.db.$queryRawUnsafe(query, ...params);
        return results;
    }),
    /**
   * 코스트센터 목록 조회 (bi_cost_center)
   * code: cost_center_code, name: cost_center_name
   */ getCostCenters: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(optionQueryInput).query(async ({ ctx, input })=>{
        const { search, site, yyyymm, scenario, limit } = input;
        const conditions = [
            "1=1"
        ];
        const params = [];
        let paramIndex = 1;
        if (site) {
            conditions.push(`plant_site_code = $${paramIndex}`);
            params.push(site);
            paramIndex++;
        }
        if (yyyymm) {
            conditions.push(`yyyymm = $${paramIndex}`);
            params.push(yyyymm);
            paramIndex++;
        }
        if (scenario) {
            conditions.push(`scenario_code = $${paramIndex}`);
            params.push(scenario);
            paramIndex++;
        }
        if (search) {
            conditions.push(`(cost_center_code ILIKE $${paramIndex} OR cost_center_name ILIKE $${paramIndex})`);
            params.push(`%${search}%`);
            paramIndex++;
        }
        params.push(limit);
        const query = `
        SELECT DISTINCT 
          cost_center_code as code, 
          COALESCE(cost_center_name, cost_center_code) as name
        FROM "binary".bi_cost_center
        WHERE ${conditions.join(" AND ")}
        ORDER BY cost_center_code
        LIMIT $${paramIndex}
      `;
        const results = await ctx.db.$queryRawUnsafe(query, ...params);
        return results;
    }),
    /**
   * 사용자 목록 조회 (bi_user_mst)
   * code: employee_id, name: employee_name
   */ getUsers: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(optionQueryInput).query(async ({ ctx, input })=>{
        const { search, site, yyyymm, scenario, limit } = input;
        const conditions = [
            "1=1"
        ];
        const params = [];
        let paramIndex = 1;
        if (site) {
            conditions.push(`plant_site_code = $${paramIndex}`);
            params.push(site);
            paramIndex++;
        }
        if (yyyymm) {
            conditions.push(`yyyymm = $${paramIndex}`);
            params.push(yyyymm);
            paramIndex++;
        }
        if (scenario) {
            conditions.push(`scenario_code = $${paramIndex}`);
            params.push(scenario);
            paramIndex++;
        }
        if (search) {
            conditions.push(`(employee_id ILIKE $${paramIndex} OR employee_name ILIKE $${paramIndex})`);
            params.push(`%${search}%`);
            paramIndex++;
        }
        params.push(limit);
        const query = `
        SELECT DISTINCT 
          employee_id as code, 
          COALESCE(employee_name, employee_id) as name
        FROM "binary".bi_user_mst
        WHERE ${conditions.join(" AND ")}
        ORDER BY employee_id
        LIMIT $${paramIndex}
      `;
        const results = await ctx.db.$queryRawUnsafe(query, ...params);
        return results;
    }),
    /**
   * Site(사업장) 목록 조회 - bi_dept_mst에서 DISTINCT
   */ getSites: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        search: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        limit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional().default(100)
    })).query(async ({ ctx, input })=>{
        const { search, limit } = input;
        const conditions = [
            "plant_site_code IS NOT NULL"
        ];
        const params = [];
        let paramIndex = 1;
        if (search) {
            conditions.push(`plant_site_code ILIKE $${paramIndex}`);
            params.push(`%${search}%`);
            paramIndex++;
        }
        params.push(limit);
        const query = `
        SELECT DISTINCT 
          plant_site_code as code, 
          plant_site_code as name
        FROM "binary".bi_dept_mst
        WHERE ${conditions.join(" AND ")}
        ORDER BY plant_site_code
        LIMIT $${paramIndex}
      `;
        const results = await ctx.db.$queryRawUnsafe(query, ...params);
        return results;
    }),
    /**
   * SEL_CODE/시나리오 목록 - bi_dept_mst에서 DISTINCT scenario_code
   */ getSelCodes: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        search: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        limit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional().default(100)
    })).query(async ({ ctx, input })=>{
        const { search, limit } = input;
        const conditions = [
            "scenario_code IS NOT NULL"
        ];
        const params = [];
        let paramIndex = 1;
        if (search) {
            conditions.push(`scenario_code ILIKE $${paramIndex}`);
            params.push(`%${search}%`);
            paramIndex++;
        }
        params.push(limit);
        const query = `
        SELECT DISTINCT 
          scenario_code as code, 
          scenario_code as name
        FROM "binary".bi_dept_mst
        WHERE ${conditions.join(" AND ")}
        ORDER BY scenario_code
        LIMIT $${paramIndex}
      `;
        const results = await ctx.db.$queryRawUnsafe(query, ...params);
        return results;
    })
});
}),
"[project]/src/server/api/routers/biMaster.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * 기준정보 마스터 API 라우터
 * binary 스키마의 마스터 테이블 CRUD 및 조회
 */ __turbopack_context__.s([
    "biMasterRouter",
    ()=>biMasterRouter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/trpc.ts [app-route] (ecmascript)");
;
;
// 공통 입력 스키마
const masterQueryInput = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    search: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    site: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    yyyymm: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    scenario: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    limit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional().default(100)
});
const biMasterRouter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createTRPCRouter"])({
    /**
   * 부서 목록 조회 (bi_dept_mst)
   */ getDepartments: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(masterQueryInput).query(async ({ ctx, input })=>{
        const { search, site, yyyymm, scenario, limit } = input;
        const conditions = [
            "1=1"
        ];
        const params = [];
        let paramIndex = 1;
        if (site) {
            conditions.push(`plant_site_code = $${paramIndex}`);
            params.push(site);
            paramIndex++;
        }
        if (yyyymm) {
            conditions.push(`yyyymm = $${paramIndex}`);
            params.push(yyyymm);
            paramIndex++;
        }
        if (scenario) {
            conditions.push(`scenario_code = $${paramIndex}`);
            params.push(scenario);
            paramIndex++;
        }
        if (search) {
            conditions.push(`(department_code ILIKE $${paramIndex} OR department_name ILIKE $${paramIndex})`);
            params.push(`%${search}%`);
            paramIndex++;
        }
        params.push(limit);
        const query = `
        SELECT DISTINCT 
          department_code as code, 
          COALESCE(department_name, department_code) as name
        FROM "binary".bi_dept_mst
        WHERE ${conditions.join(" AND ")}
        ORDER BY department_code
        LIMIT $${paramIndex}
      `;
        const results = await ctx.db.$queryRawUnsafe(query, ...params);
        return results;
    }),
    /**
   * 코스트센터 목록 조회 (bi_cost_center)
   */ getCostCenters: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(masterQueryInput).query(async ({ ctx, input })=>{
        const { search, site, yyyymm, scenario, limit } = input;
        const conditions = [
            "1=1"
        ];
        const params = [];
        let paramIndex = 1;
        if (site) {
            conditions.push(`plant_site_code = $${paramIndex}`);
            params.push(site);
            paramIndex++;
        }
        if (yyyymm) {
            conditions.push(`yyyymm = $${paramIndex}`);
            params.push(yyyymm);
            paramIndex++;
        }
        if (scenario) {
            conditions.push(`scenario_code = $${paramIndex}`);
            params.push(scenario);
            paramIndex++;
        }
        if (search) {
            conditions.push(`(cost_center_code ILIKE $${paramIndex} OR cost_center_name ILIKE $${paramIndex})`);
            params.push(`%${search}%`);
            paramIndex++;
        }
        params.push(limit);
        const query = `
        SELECT DISTINCT 
          cost_center_code as code, 
          COALESCE(cost_center_name, cost_center_code) as name
        FROM "binary".bi_cost_center
        WHERE ${conditions.join(" AND ")}
        ORDER BY cost_center_code
        LIMIT $${paramIndex}
      `;
        const results = await ctx.db.$queryRawUnsafe(query, ...params);
        return results;
    }),
    /**
   * 사원 목록 조회 (bi_user_mst)
   */ getUsers: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(masterQueryInput).query(async ({ ctx, input })=>{
        const { search, site, yyyymm, scenario, limit } = input;
        const conditions = [
            "1=1"
        ];
        const params = [];
        let paramIndex = 1;
        if (site) {
            conditions.push(`plant_site_code = $${paramIndex}`);
            params.push(site);
            paramIndex++;
        }
        if (yyyymm) {
            conditions.push(`yyyymm = $${paramIndex}`);
            params.push(yyyymm);
            paramIndex++;
        }
        if (scenario) {
            conditions.push(`scenario_code = $${paramIndex}`);
            params.push(scenario);
            paramIndex++;
        }
        if (search) {
            conditions.push(`(employee_id ILIKE $${paramIndex} OR employee_name ILIKE $${paramIndex})`);
            params.push(`%${search}%`);
            paramIndex++;
        }
        params.push(limit);
        const query = `
        SELECT DISTINCT 
          employee_id as code, 
          COALESCE(employee_name, employee_id) as name
        FROM "binary".bi_user_mst
        WHERE ${conditions.join(" AND ")}
        ORDER BY employee_id
        LIMIT $${paramIndex}
      `;
        const results = await ctx.db.$queryRawUnsafe(query, ...params);
        return results;
    }),
    /**
   * 계정 목록 조회 (bi_acct_mst)
   */ getAccounts: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(masterQueryInput).query(async ({ ctx, input })=>{
        const { search, site, yyyymm, scenario, limit } = input;
        const conditions = [
            "1=1"
        ];
        const params = [];
        let paramIndex = 1;
        if (site) {
            conditions.push(`plant_site_code = $${paramIndex}`);
            params.push(site);
            paramIndex++;
        }
        if (yyyymm) {
            conditions.push(`yyyymm = $${paramIndex}`);
            params.push(yyyymm);
            paramIndex++;
        }
        if (scenario) {
            conditions.push(`scenario_code = $${paramIndex}`);
            params.push(scenario);
            paramIndex++;
        }
        if (search) {
            conditions.push(`(account_code ILIKE $${paramIndex} OR account_name ILIKE $${paramIndex})`);
            params.push(`%${search}%`);
            paramIndex++;
        }
        params.push(limit);
        const query = `
        SELECT DISTINCT 
          account_code as code, 
          COALESCE(account_name, account_code) as name
        FROM "binary".bi_acct_mst
        WHERE ${conditions.join(" AND ")}
        ORDER BY account_code
        LIMIT $${paramIndex}
      `;
        const results = await ctx.db.$queryRawUnsafe(query, ...params);
        return results;
    }),
    /**
   * 경비항목 목록 조회 (bi_expen_sel_mst)
   */ getExpenseItems: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(masterQueryInput).query(async ({ ctx, input })=>{
        const { search, site, yyyymm, scenario, limit } = input;
        const conditions = [
            "1=1"
        ];
        const params = [];
        let paramIndex = 1;
        if (site) {
            conditions.push(`plant_site_code = $${paramIndex}`);
            params.push(site);
            paramIndex++;
        }
        if (yyyymm) {
            conditions.push(`yyyymm = $${paramIndex}`);
            params.push(yyyymm);
            paramIndex++;
        }
        if (scenario) {
            conditions.push(`scenario_code = $${paramIndex}`);
            params.push(scenario);
            paramIndex++;
        }
        if (search) {
            conditions.push(`(expense_item_code ILIKE $${paramIndex} OR expense_item_name ILIKE $${paramIndex})`);
            params.push(`%${search}%`);
            paramIndex++;
        }
        params.push(limit);
        const query = `
        SELECT DISTINCT 
          expense_item_code as code, 
          COALESCE(expense_item_name, expense_item_code) as name
        FROM "binary".bi_expen_sel_mst
        WHERE ${conditions.join(" AND ")}
        ORDER BY expense_item_code
        LIMIT $${paramIndex}
      `;
        const results = await ctx.db.$queryRawUnsafe(query, ...params);
        return results;
    }),
    /**
   * 거래처 목록 조회 (bi_cust_mst)
   */ getCustomers: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(masterQueryInput).query(async ({ ctx, input })=>{
        const { search, site, yyyymm, scenario, limit } = input;
        const conditions = [
            "1=1"
        ];
        const params = [];
        let paramIndex = 1;
        if (site) {
            conditions.push(`plant_site_code = $${paramIndex}`);
            params.push(site);
            paramIndex++;
        }
        if (yyyymm) {
            conditions.push(`yyyymm = $${paramIndex}`);
            params.push(yyyymm);
            paramIndex++;
        }
        if (scenario) {
            conditions.push(`scenario_code = $${paramIndex}`);
            params.push(scenario);
            paramIndex++;
        }
        if (search) {
            conditions.push(`(partner_code ILIKE $${paramIndex} OR partner_name ILIKE $${paramIndex})`);
            params.push(`%${search}%`);
            paramIndex++;
        }
        params.push(limit);
        const query = `
        SELECT DISTINCT 
          partner_code as code, 
          COALESCE(partner_name, partner_code) as name
        FROM "binary".bi_cust_mst
        WHERE ${conditions.join(" AND ")}
        ORDER BY partner_code
        LIMIT $${paramIndex}
      `;
        const results = await ctx.db.$queryRawUnsafe(query, ...params);
        return results;
    }),
    /**
   * 설비 목록 조회 (bi_eqp_mst)
   */ getEquipments: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(masterQueryInput).query(async ({ ctx, input })=>{
        const { search, site, yyyymm, scenario, limit } = input;
        const conditions = [
            "1=1"
        ];
        const params = [];
        let paramIndex = 1;
        if (site) {
            conditions.push(`plant_site_code = $${paramIndex}`);
            params.push(site);
            paramIndex++;
        }
        if (yyyymm) {
            conditions.push(`yyyymm = $${paramIndex}`);
            params.push(yyyymm);
            paramIndex++;
        }
        if (scenario) {
            conditions.push(`scenario_code = $${paramIndex}`);
            params.push(scenario);
            paramIndex++;
        }
        if (search) {
            conditions.push(`(equipment_code ILIKE $${paramIndex} OR equipment_name ILIKE $${paramIndex})`);
            params.push(`%${search}%`);
            paramIndex++;
        }
        params.push(limit);
        const query = `
        SELECT DISTINCT 
          equipment_code as code, 
          COALESCE(equipment_name, equipment_code) as name
        FROM "binary".bi_eqp_mst
        WHERE ${conditions.join(" AND ")}
        ORDER BY equipment_code
        LIMIT $${paramIndex}
      `;
        const results = await ctx.db.$queryRawUnsafe(query, ...params);
        return results;
    }),
    /**
   * 제품 목록 조회 (bi_prod_mst)
   */ getProducts: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(masterQueryInput).query(async ({ ctx, input })=>{
        const { search, site, yyyymm, scenario, limit } = input;
        const conditions = [
            "1=1"
        ];
        const params = [];
        let paramIndex = 1;
        if (site) {
            conditions.push(`plant_site_code = $${paramIndex}`);
            params.push(site);
            paramIndex++;
        }
        if (yyyymm) {
            conditions.push(`yyyymm = $${paramIndex}`);
            params.push(yyyymm);
            paramIndex++;
        }
        if (scenario) {
            conditions.push(`scenario_code = $${paramIndex}`);
            params.push(scenario);
            paramIndex++;
        }
        if (search) {
            conditions.push(`(product_item_code ILIKE $${paramIndex} OR product_item_name ILIKE $${paramIndex})`);
            params.push(`%${search}%`);
            paramIndex++;
        }
        params.push(limit);
        const query = `
        SELECT DISTINCT 
          product_item_code as code, 
          COALESCE(product_item_name, product_item_code) as name
        FROM "binary".bi_prod_mst
        WHERE ${conditions.join(" AND ")}
        ORDER BY product_item_code
        LIMIT $${paramIndex}
      `;
        const results = await ctx.db.$queryRawUnsafe(query, ...params);
        return results;
    }),
    /**
   * 사업장 목록 조회 (plant_site_code DISTINCT)
   */ getSites: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        search: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        limit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional().default(100)
    })).query(async ({ ctx, input })=>{
        const { search, limit } = input;
        const conditions = [
            "plant_site_code IS NOT NULL"
        ];
        const params = [];
        let paramIndex = 1;
        if (search) {
            conditions.push(`plant_site_code ILIKE $${paramIndex}`);
            params.push(`%${search}%`);
            paramIndex++;
        }
        params.push(limit);
        const query = `
        SELECT DISTINCT 
          plant_site_code as code, 
          plant_site_code as name
        FROM "binary".bi_dept_mst
        WHERE ${conditions.join(" AND ")}
        ORDER BY plant_site_code
        LIMIT $${paramIndex}
      `;
        const results = await ctx.db.$queryRawUnsafe(query, ...params);
        return results;
    }),
    // ==========================================
    // CRUD 프로시저
    // ==========================================
    /**
   * 부서 목록 조회 (전체 필드)
   */ listDepartments: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        site: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        yyyymm: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        scenario: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().default('ACTUAL')
    })).query(async ({ ctx, input })=>{
        const { site, yyyymm, scenario } = input;
        const query = `
        SELECT 
          plant_site_code,
          yyyymm,
          scenario_code,
          department_code,
          department_name,
          parent_department_code,
          cost_center_mapping_code,
          is_production_dept,
          use_yn
        FROM "binary".bi_dept_mst
        WHERE plant_site_code = $1
          AND yyyymm = $2
          AND scenario_code = $3
        ORDER BY department_code
      `;
        return await ctx.db.$queryRawUnsafe(query, site, yyyymm, scenario);
    }),
    /**
   * 부서 저장 (Insert/Update)
   */ saveDepartment: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        plant_site_code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        yyyymm: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        scenario_code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        department_code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        department_name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        parent_department_code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        cost_center_mapping_code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        is_production_dept: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional(),
        use_yn: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
    })).mutation(async ({ ctx, input })=>{
        const query = `
        INSERT INTO "binary".bi_dept_mst (
          plant_site_code, yyyymm, scenario_code, department_code,
          department_name, parent_department_code, cost_center_mapping_code,
          is_production_dept, use_yn
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (plant_site_code, yyyymm, scenario_code, department_code)
        DO UPDATE SET
          department_name = EXCLUDED.department_name,
          parent_department_code = EXCLUDED.parent_department_code,
          cost_center_mapping_code = EXCLUDED.cost_center_mapping_code,
          is_production_dept = EXCLUDED.is_production_dept,
          use_yn = EXCLUDED.use_yn
        RETURNING *
      `;
        return await ctx.db.$queryRawUnsafe(query, input.plant_site_code, input.yyyymm, input.scenario_code, input.department_code, input.department_name ?? null, input.parent_department_code ?? null, input.cost_center_mapping_code ?? null, input.is_production_dept ?? null, input.use_yn ?? 'Y');
    }),
    /**
   * 부서 삭제
   */ deleteDepartment: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        plant_site_code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        yyyymm: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        scenario_code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        department_code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })).mutation(async ({ ctx, input })=>{
        const query = `
        DELETE FROM "binary".bi_dept_mst
        WHERE plant_site_code = $1
          AND yyyymm = $2
          AND scenario_code = $3
          AND department_code = $4
      `;
        return await ctx.db.$queryRawUnsafe(query, input.plant_site_code, input.yyyymm, input.scenario_code, input.department_code);
    }),
    /**
   * 코스트센터 목록 조회 (전체 필드)
   */ listCostCenters: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        site: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        yyyymm: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        scenario: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().default('ACTUAL')
    })).query(async ({ ctx, input })=>{
        const { site, yyyymm, scenario } = input;
        const query = `
        SELECT 
          plant_site_code,
          yyyymm,
          scenario_code,
          cost_center_code,
          cost_center_name,
          managing_dept_code,
          cost_center_type,
          production_line_code,
          use_yn
        FROM "binary".bi_cost_center
        WHERE plant_site_code = $1
          AND yyyymm = $2
          AND scenario_code = $3
        ORDER BY cost_center_code
      `;
        return await ctx.db.$queryRawUnsafe(query, site, yyyymm, scenario);
    }),
    /**
   * 제품 목록 조회 (전체 필드)
   */ listProducts: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        site: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        yyyymm: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        scenario: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().default('ACTUAL')
    })).query(async ({ ctx, input })=>{
        const { site, yyyymm, scenario } = input;
        const query = `
        SELECT 
          plant_site_code,
          yyyymm,
          scenario_code,
          product_item_code,
          product_item_name,
          product_group_code,
          material_type,
          base_unit_of_measure,
          unit_weight_kg,
          procurement_type
        FROM "binary".bi_prod_mst
        WHERE plant_site_code = $1
          AND yyyymm = $2
          AND scenario_code = $3
        ORDER BY product_item_code
      `;
        return await ctx.db.$queryRawUnsafe(query, site, yyyymm, scenario);
    }),
    /**
   * 거래처 목록 조회 (전체 필드)
   */ listCustomers: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        site: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        yyyymm: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        scenario: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().default('ACTUAL')
    })).query(async ({ ctx, input })=>{
        const { site, yyyymm, scenario } = input;
        const query = `
        SELECT 
          plant_site_code,
          yyyymm,
          scenario_code,
          partner_code,
          partner_name,
          business_reg_number,
          partner_type,
          delivery_region_name,
          credit_rating_score
        FROM "binary".bi_cust_mst
        WHERE plant_site_code = $1
          AND yyyymm = $2
          AND scenario_code = $3
        ORDER BY partner_code
      `;
        return await ctx.db.$queryRawUnsafe(query, site, yyyymm, scenario);
    })
});
}),
"[project]/src/server/api/routers/db-meta.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * DB 메타데이터 조회 라우터
 *
 * 실시간으로 DB의 INFORMATION_SCHEMA를 조회하여
 * 테이블 스키마 정보를 반환합니다.
 *
 * @module db-meta
 */ __turbopack_context__.s([
    "dbMetaRouter",
    ()=>dbMetaRouter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/trpc.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/db.ts [app-route] (ecmascript)");
;
;
;
const dbMetaRouter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createTRPCRouter"])({
    /**
   * 테이블 스키마 조회
   *
   * INFORMATION_SCHEMA.COLUMNS를 조회하여
   * 테이블의 컬럼 정보를 실시간으로 가져옵니다.
   * public, binary 스키마 모두 검색
   */ getTableSchema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        tableName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })).query(async ({ input })=>{
        const { tableName } = input;
        try {
            // PostgreSQL용 쿼리 (대소문자 구분 없이 검색, public + binary 스키마)
            const columns = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$queryRaw`
          SELECT
            c.column_name as field,
            c.data_type as type,
            CASE WHEN pk.column_name IS NOT NULL THEN true ELSE false END as "isPk",
            CASE WHEN c.is_nullable = 'YES' THEN true ELSE false END as "isNullable",
            c.column_default as "defaultValue",
            '' as extra
          FROM information_schema.columns c
          LEFT JOIN (
            SELECT ku.column_name, ku.table_schema
            FROM information_schema.table_constraints tc
            JOIN information_schema.key_column_usage ku
              ON tc.constraint_name = ku.constraint_name
              AND tc.table_schema = ku.table_schema
            WHERE tc.constraint_type = 'PRIMARY KEY'
              AND tc.table_schema IN ('public', 'binary')
              AND LOWER(tc.table_name) = LOWER(${tableName})
          ) pk ON c.column_name = pk.column_name AND c.table_schema = pk.table_schema
          WHERE c.table_schema IN ('public', 'binary')
            AND LOWER(c.table_name) = LOWER(${tableName})
          ORDER BY c.ordinal_position
        `;
            if (!columns || columns.length === 0) {
                // 테이블 목록을 가져와서 유사한 테이블명 제안 (public + binary 스키마)
                const similarTables = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$queryRaw`
            SELECT table_name as "tableName"
            FROM information_schema.tables
            WHERE table_schema IN ('public', 'binary')
              AND table_type = 'BASE TABLE'
              AND LOWER(table_name) LIKE LOWER(${'%' + tableName + '%'})
            LIMIT 5
          `;
                const suggestion = similarTables.length > 0 ? ` 유사한 테이블: ${similarTables.map((t)=>t.tableName).join(', ')}` : '';
                return {
                    success: false,
                    error: `테이블 '${tableName}'을(를) 찾을 수 없습니다.${suggestion}`,
                    columns: []
                };
            }
            // 데이터 포맷팅
            const formattedColumns = columns.map((col)=>({
                    field: col.field,
                    type: col.type,
                    isPk: Boolean(col.isPk),
                    isNullable: Boolean(col.isNullable),
                    defaultValue: col.defaultValue,
                    extra: col.extra
                }));
            return {
                success: true,
                tableName,
                columns: formattedColumns,
                primaryKeys: formattedColumns.filter((col)=>col.isPk).map((col)=>col.field)
            };
        } catch (error) {
            console.error('[DB-META] 테이블 스키마 조회 오류:', error);
            return {
                success: false,
                error: `스키마 조회 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
                columns: []
            };
        }
    }),
    /**
   * 모든 테이블 목록 조회 (public + binary 스키마)
   */ getTableList: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].query(async ()=>{
        try {
            const tables = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$queryRaw`
          SELECT
            table_name as "tableName",
            table_type as "tableType",
            table_schema as "tableSchema"
          FROM information_schema.tables
          WHERE table_schema IN ('public', 'binary')
            AND table_type = 'BASE TABLE'
          ORDER BY table_schema, table_name
        `;
            return {
                success: true,
                tables: tables.map((t)=>t.tableName),
                count: tables.length
            };
        } catch (error) {
            console.error('[DB-META] 테이블 목록 조회 오류:', error);
            return {
                success: false,
                error: `테이블 목록 조회 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
                tables: [],
                count: 0
            };
        }
    }),
    /**
   * 테이블의 Primary Key 조회
   */ getPrimaryKeys: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        tableName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })).query(async ({ input })=>{
        const { tableName } = input;
        try {
            const keys = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$queryRaw`
          SELECT
            ku.column_name as field
          FROM information_schema.table_constraints tc
          JOIN information_schema.key_column_usage ku
            ON tc.constraint_name = ku.constraint_name
            AND tc.table_schema = ku.table_schema
          WHERE tc.constraint_type = 'PRIMARY KEY'
            AND tc.table_schema = 'public'
            AND tc.table_name = ${tableName}
          ORDER BY ku.ordinal_position
        `;
            return {
                success: true,
                primaryKeys: keys.map((k)=>k.field)
            };
        } catch (error) {
            console.error('[DB-META] PK 조회 오류:', error);
            return {
                success: false,
                error: `PK 조회 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
                primaryKeys: []
            };
        }
    }),
    /**
   * 테이블의 인덱스 정보 조회
   */ getTableIndexes: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        tableName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })).query(async ({ input })=>{
        const { tableName } = input;
        try {
            const indexes = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$queryRaw`
          SELECT
            i.relname as "indexName",
            a.attname as "columnName",
            ix.indisunique as "isUnique",
            a.attnum as "ordinalPosition"
          FROM pg_class t
          JOIN pg_index ix ON t.oid = ix.indrelid
          JOIN pg_class i ON i.oid = ix.indexrelid
          JOIN pg_attribute a ON a.attrelid = t.oid AND a.attnum = ANY(ix.indkey)
          WHERE t.relkind = 'r'
            AND t.relnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
            AND t.relname = ${tableName}
          ORDER BY i.relname, a.attnum
        `;
            // 인덱스별로 그룹화
            const indexMap = new Map();
            for (const idx of indexes){
                if (!indexMap.has(idx.indexName)) {
                    indexMap.set(idx.indexName, {
                        name: idx.indexName,
                        columns: [],
                        isUnique: idx.isUnique
                    });
                }
                indexMap.get(idx.indexName).columns.push(idx.columnName);
            }
            return {
                success: true,
                indexes: Array.from(indexMap.values())
            };
        } catch (error) {
            console.error('[DB-META] 인덱스 조회 오류:', error);
            return {
                success: false,
                error: `인덱스 조회 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
                indexes: []
            };
        }
    })
});
}),
"[project]/src/server/api/root.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "appRouter",
    ()=>appRouter,
    "createCaller",
    ()=>createCaller
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$post$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/post.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$product$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/product.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$excel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/excel.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen982157$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen982157.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$menu$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/menu.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$options$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/options.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$biMaster$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/biMaster.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$db$2d$meta$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/db-meta.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/trpc.ts [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
const appRouter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createTRPCRouter"])({
    post: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$post$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["postRouter"],
    product: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$product$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["productRouter"],
    excel: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$excel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["excelRouter"],
    screen982157: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen982157$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["screen982157Router"],
    menu: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$menu$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["menuRouter"],
    screenGenerator: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["screenGeneratorRouter"],
    options: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$options$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["optionsRouter"],
    biMaster: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$biMaster$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["biMasterRouter"],
    dbMeta: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$db$2d$meta$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dbMetaRouter"]
});
const createCaller = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createCallerFactory"])(appRouter);
}),
"[project]/src/app/api/trpc/[trpc]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>handler,
    "POST",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$adapters$2f$fetch$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@trpc/server/dist/adapters/fetch/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$env$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/env.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$root$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/root.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/trpc.ts [app-route] (ecmascript)");
;
;
;
;
/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */ const createContext = async (req)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createTRPCContext"])({
        headers: req.headers
    });
};
const handler = (req)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$adapters$2f$fetch$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchRequestHandler"])({
        endpoint: "/api/trpc",
        req,
        router: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$root$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["appRouter"],
        createContext: ()=>createContext(req),
        onError: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$env$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].NODE_ENV === "development" ? ({ path, error })=>{
            console.error(`❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`);
        } : undefined
    });
;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__647103d6._.js.map