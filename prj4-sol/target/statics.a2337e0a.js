// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      if (res === false) {
        return {};
      }
      // Synthesize a module to follow re-exports.
      if (Array.isArray(res)) {
        var m = {__esModule: true};
        res.forEach(function (v) {
          var key = v[0];
          var id = v[1];
          var exp = v[2] || v[0];
          var x = newRequire(id);
          if (key === '*') {
            Object.keys(x).forEach(function (key) {
              if (
                key === 'default' ||
                key === '__esModule' ||
                Object.prototype.hasOwnProperty.call(m, key)
              ) {
                return;
              }

              Object.defineProperty(m, key, {
                enumerable: true,
                get: function () {
                  return x[key];
                },
              });
            });
          } else if (exp === '*') {
            Object.defineProperty(m, key, {
              enumerable: true,
              value: x,
            });
          } else {
            Object.defineProperty(m, key, {
              enumerable: true,
              get: function () {
                if (exp === 'default') {
                  return x.__esModule ? x.default : x;
                }
                return x[exp];
              },
            });
          }
        });
        return m;
      }
      return newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"61zLH":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 2346;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "80b67ef2a2337e0a";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"ayIut":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _appJs = require("./app.js");
var _appJsDefault = parcelHelpers.interopDefault(_appJs);
const DEFAULT_WS_URL = 'https://localhost:2345';
window.addEventListener('DOMContentLoaded', async ()=>{
    (0, _appJsDefault.default)(getWsUrl());
});
function getWsUrl() {
    const url = new URL(document.location.href);
    return url?.searchParams?.get('ws-url') ?? DEFAULT_WS_URL;
}

},{"./app.js":"1iidm","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"1iidm":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>makeApp);
var _libraryWsJs = require("./library-ws.js");
var _utilsJs = require("./utils.js");
function makeApp(wsUrl) {
    return new App(wsUrl);
}
class App {
    wsUrl;
    ws;
    result;
    errors;
    constructor(wsUrl){
        this.wsUrl = wsUrl;
        this.ws = (0, _libraryWsJs.makeLibraryWs)(wsUrl);
        this.result = document.querySelector('#result');
        this.errors = document.querySelector('#errors');
        //TODO: add search handler
        const search = document.querySelector('#search');
        if (search) search.addEventListener('blur', (ev)=>{
            const value = ev.target.value;
            const url = (0, _utilsJs.makeQueryUrl)(`${this.wsUrl}/api/books`, {
                search: value
            });
            console.log('#search blurred', value, url);
            // Call the auxiliary method with the generated URL
            this.displaySearchResults(url);
        });
    }
    //TODO: add private methods as needed
    /** Auxiliary method to display search results */ async displaySearchResults(url) {
        this.clearErrors();
        // Convert URL object to string if necessary
        const urlString = typeof url === 'string' ? url : url.toString();
        // Call the web service
        const result = await this.ws.findBooksByUrl(urlString);
        // Log the result to console to verify structure
        console.log('Search result:', result);
        // Unwrap the result to check for errors
        const data = this.unwrap(result);
        if (data) {
            console.log('Unwrapped data:', data);
            // Clear previous results
            this.result.innerHTML = '';
            // Add scroll controls before results
            const scrollBefore = this.makeScrollControls(data.links);
            if (scrollBefore) this.result.append(scrollBefore);
            // Display the books as an unordered list
            const books = data.result;
            const ul = (0, _utilsJs.makeElement)('ul');
            for (const book of books){
                const li = (0, _utilsJs.makeElement)('li');
                const title = (0, _utilsJs.makeElement)('span', {}, book.result.title);
                const details = (0, _utilsJs.makeElement)('a', {
                    href: '#'
                }, 'details...');
                // Add click handler for details link
                const selfLink = book.links.self.href;
                details.addEventListener('click', (ev)=>{
                    ev.preventDefault();
                    this.displayBookDetails(selfLink);
                });
                li.append(title, ' ', details);
                ul.append(li);
            }
            this.result.append(ul);
            // Add scroll controls after results
            const scrollAfter = this.makeScrollControls(data.links);
            if (scrollAfter) this.result.append(scrollAfter);
        }
    }
    /** Create scroll controls (prev/next) based on available links */ makeScrollControls(links) {
        const hasPrev = links.prev !== undefined;
        const hasNext = links.next !== undefined;
        if (!hasPrev && !hasNext) return null;
        const scrollDiv = (0, _utilsJs.makeElement)('div', {
            class: 'scroll'
        });
        if (hasPrev) {
            const prevLink = (0, _utilsJs.makeElement)('a', {
                href: links.prev.href,
                rel: 'prev'
            }, '<<');
            prevLink.addEventListener('click', (ev)=>{
                ev.preventDefault();
                this.displaySearchResults(this.wsUrl + links.prev.href);
            });
            scrollDiv.append(prevLink);
        }
        if (hasPrev && hasNext) scrollDiv.append(' ');
        if (hasNext) {
            const nextLink = (0, _utilsJs.makeElement)('a', {
                href: links.next.href,
                rel: 'next'
            }, '>>');
            nextLink.addEventListener('click', (ev)=>{
                ev.preventDefault();
                this.displaySearchResults(this.wsUrl + links.next.href);
            });
            scrollDiv.append(nextLink);
        }
        return scrollDiv;
    }
    /** Auxiliary method to display book details */ async displayBookDetails(url) {
        this.clearErrors();
        console.log('Details URL:', url);
        // Call the web service
        const result = await this.ws.getBookByUrl(this.wsUrl + url);
        // Log the result to console
        console.log('Book details result:', result);
        // Unwrap the result
        const data = this.unwrap(result);
        if (data) {
            const book = data.result;
            // Create definition list for book details
            const dl = (0, _utilsJs.makeElement)('dl');
            // ISBN
            dl.append((0, _utilsJs.makeElement)('dt', {}, 'ISBN'));
            dl.append((0, _utilsJs.makeElement)('dd', {}, book.isbn));
            // Title
            dl.append((0, _utilsJs.makeElement)('dt', {}, 'Title'));
            dl.append((0, _utilsJs.makeElement)('dd', {}, book.title));
            // Authors
            dl.append((0, _utilsJs.makeElement)('dt', {}, 'Authors'));
            dl.append((0, _utilsJs.makeElement)('dd', {}, book.authors.join('; ')));
            // Number of Pages
            dl.append((0, _utilsJs.makeElement)('dt', {}, 'Number of Pages'));
            dl.append((0, _utilsJs.makeElement)('dd', {}, String(book.pages)));
            // Publisher
            dl.append((0, _utilsJs.makeElement)('dt', {}, 'Publisher'));
            dl.append((0, _utilsJs.makeElement)('dd', {}, book.publisher));
            // Number of Copies
            dl.append((0, _utilsJs.makeElement)('dt', {}, 'Number of Copies'));
            dl.append((0, _utilsJs.makeElement)('dd', {}, String(book.nCopies)));
            // Borrowers (with id for later use)
            dl.append((0, _utilsJs.makeElement)('dt', {
                id: 'borrowers'
            }, 'Borrowers'));
            dl.append((0, _utilsJs.makeElement)('dd', {}, 'None'));
            // Display in result area
            this.result.innerHTML = '';
            this.result.append(dl);
        }
    }
    /** unwrap a result, displaying errors if !result.isOk,
     *  returning T otherwise.   Use as if (unwrap(result)) { ... }
     *  when T !== void.
     */ unwrap(result) {
        if (result.isOk === false) displayErrors(result.errors);
        else return result.val;
    }
    /** clear out all errors */ clearErrors() {
        this.errors.innerHTML = '';
        document.querySelectorAll(`.error`).forEach((el)=>{
            el.innerHTML = '';
        });
    }
} //class App
/** Display errors. If an error has a widget or path widgetId such
 *  that an element having ID `${widgetId}-error` exists,
 *  then the error message is added to that element; otherwise the
 *  error message is added to the element having to the element having
 *  ID `errors` wrapped within an `<li>`.
 */ function displayErrors(errors) {
    for (const err of errors){
        const id = err.options.widget ?? err.options.path;
        const widget = id && document.querySelector(`#${id}-error`);
        if (widget) widget.append(err.message);
        else {
            const li = (0, _utilsJs.makeElement)('li', {
                class: 'error'
            }, err.message);
            document.querySelector(`#errors`).append(li);
        }
    }
} //TODO: add functions as needed

},{"./library-ws.js":"TN2hU","./utils.js":"Giq4f","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"TN2hU":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "makeLibraryWs", ()=>makeLibraryWs);
parcelHelpers.export(exports, "LibraryWs", ()=>LibraryWs);
var _cs544JsUtils = require("cs544-js-utils");
function makeLibraryWs(url) {
    return new LibraryWs(url);
}
class LibraryWs {
    //base url for these web services
    url;
    constructor(url){
        this.url = url;
    }
    /** given an absolute books url bookUrl ending with /books/api,
     *  return a SuccessEnvelope for the book identified by bookUrl.
     */ async getBookByUrl(bookUrl) {
        return getEnvelope(bookUrl);
    }
    /** given an absolute url findUrl ending with /books with query
     *  parameters search and optional query parameters count and index,
     *  return a PagedEnvelope containing a list of matching books.
     */ async findBooksByUrl(findUrl) {
        return getEnvelope(findUrl);
    }
    /** check out book specified by lend */ //make a PUT request to /lendings
    async checkoutBook(lend) {
        return (0, _cs544JsUtils.Errors).errResult('TODO');
    }
    /** return book specified by lend */ //make a DELETE request to /lendings
    async returnBook(lend) {
        return (0, _cs544JsUtils.Errors).errResult('TODO');
    }
    /** return Lend[] of all lendings for isbn. */ //make a GET request to /lendings with query-params set
    //to { findBy: 'isbn', isbn }.
    async getLends(isbn) {
        return (0, _cs544JsUtils.Errors).errResult('TODO');
    }
}
/** Return either a SuccessEnvelope<T> or PagedEnvelope<T> wrapped
 *  within a Errors.Result.  Note that the caller needs to instantiate
 *  both type parameters appropriately.
 */ async function getEnvelope(url) {
    const result = await fetchJson(url);
    if (result.isOk === true) {
        const response = result.val;
        if (response.isOk === true) return (0, _cs544JsUtils.Errors).okResult(response);
        else return new (0, _cs544JsUtils.Errors).ErrResult(response.errors);
    } else return result;
}
const DEFAULT_FETCH = {
    method: 'GET'
};
/** send a request to url, converting any exceptions to an
 *  error result.
 */ async function fetchJson(url, options = DEFAULT_FETCH) {
    //<https://github.com/microsoft/TypeScript/blob/main/src/lib/dom.generated.d.ts#L26104>
    try {
        const response = await fetch(url, options);
        return (0, _cs544JsUtils.Errors).okResult(await response.json());
    } catch (err) {
        console.error(err);
        return (0, _cs544JsUtils.Errors).errResult(`${options.method} ${url}: error ${err}`);
    }
} //TODO: add other functions as needed

},{"cs544-js-utils":"fbWgX","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"fbWgX":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Errors", ()=>_errorsJs);
var _errorsJs = require("./lib/errors.js");

},{"./lib/errors.js":"35zfW","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"35zfW":[function(require,module,exports,__globalThis) {
// Immutable API
/** throw exception with msg and args; use when impossible conditions occur */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "panic", ()=>panic);
parcelHelpers.export(exports, "Err", ()=>Err);
/** A Result is either a success result identified by isOk=true,
 *  or an error result identified by isOk=false.  A success
 *  result has the success value in its 'val' property; an
 *  error result will have one or more 'Err' objects in its
 *  'errors' property.
 */ parcelHelpers.export(exports, "OkResult", ()=>OkResult);
parcelHelpers.export(exports, "ErrResult", ()=>ErrResult);
/** factory function for a success result */ parcelHelpers.export(exports, "okResult", ()=>okResult);
parcelHelpers.export(exports, "VOID_RESULT", ()=>VOID_RESULT);
/** factory function for an error result initialized to contain
 *  a single error as per arg0, args.
 *    errResult(msg: string, code?: string, widget?: string)
 *    errResult(msg: string, options: ErrOptions)
 *    errResult(err: Err)
 *    errResult(err: ErrResult, options: ErrOptions)
 *    errResult(errObj: object, options: ErrOptions)
 */ parcelHelpers.export(exports, "errResult", ()=>errResult);
/** Convenience error building function.  Possible arguments:
 *     error(msg: string, code?: string, widget?: string)
 *     error(msg: string, options: ErrOptions)
 *     error(err: Err)
 *     error(err: Error, options?: ErrOptions)
 *     error(errObj: object, options?: ErrOptions)
 */ parcelHelpers.export(exports, "error", ()=>error) /*
//demo program

function safeDiv(num: number, denom: number) : Result<number> {
  if (denom === 0) return errResult('zero denominator');
  return okResult(num/denom);
}

function demo(result: Result<number>) : Result<string> {
  if (!result.isOk) return result as Result<string>;
  const v = result.val + 1;
  return result.chain((val: number) => okResult('x'.repeat(v*val)))
               .chain((str: string) => okResult(str + 'aaa'));
}

console.log(safeDiv(1, 0));
console.log(safeDiv(1, 2));
console.log(demo(errResult('some error', 'ERR_CODE')));
console.log(demo(okResult(2)));
*/ ;
function panic(msg, ...args) {
    throw new Error(msg + args.map((a)=>JSON.stringify(a)).join(', '));
}
const DEFAULT_ERR_CODE = 'UNKNOWN';
class Err {
    message;
    options;
    constructor(message, options){
        this.message = message;
        this.options = options;
    }
}
class OkResult {
    isOk = true;
    val;
    constructor(v){
        this.val = v;
    }
    /** return result of applying fn on val */ chain(fn) {
        return fn(this.val);
    }
}
class ErrResult {
    isOk = false;
    errors;
    constructor(errors = []){
        this.errors = errors;
    }
    /** Possible arguments
     *   addError(ErrResult errResult)
     *   addError(msg: string, code?: string, widget?: string)
     *   addError(msg: string, options: ErrOptions)
     *   addError(err: Err)
     *   addError(err: Error, options?: ErrOptions)
     *   addError(errObj: object, options?: ErrOptions)
     */ addError(arg0, ...args) {
        const errors = arg0 instanceof ErrResult ? arg0.errors : [
            error(arg0, ...args)
        ];
        return new ErrResult(this.errors.concat(errors));
    }
    /** ignore fn, simply returning this error result */ chain(_fn) {
        return this;
    }
}
function okResult(v) {
    return new OkResult(v);
}
const VOID_RESULT = okResult(undefined);
function errResult(arg0, ...args) {
    return new ErrResult().addError(arg0, ...args);
}
function error(arg0, ...args) {
    let options = {
        code: DEFAULT_ERR_CODE
    };
    if (typeof arg0 === 'string') {
        const msg = arg0;
        if (args.length === 0) return new Err(msg, {
            code: DEFAULT_ERR_CODE
        });
        else if (args.length === 1 && typeof args[0] === 'object') return new Err(msg, {
            code: DEFAULT_ERR_CODE,
            ...args[0]
        });
        else if (args.length === 1 && typeof args[0] === 'string') return new Err(msg, {
            code: args[0]
        });
        else if (args.length === 2 && typeof args[0] === 'string' && typeof args[1] === 'string') return new Err(msg, {
            code: args[0],
            widget: args[1]
        });
        else panic(`bad error args`, [
            arg0,
            ...args
        ]);
    } else if (arg0 instanceof Err) return arg0;
    else if (arg0 instanceof Error) return new Err(arg0.message, args.length > 0 ? args[0] : {
        code: DEFAULT_ERR_CODE
    });
    else if (typeof arg0 === 'object') return new Err(arg0.toString(), args.length > 0 ? args[0] : {
        code: DEFAULT_ERR_CODE
    });
    else panic(`bad error args`, [
        arg0,
        ...args
    ]);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"jnFvT":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"Giq4f":[function(require,module,exports,__globalThis) {
/** Return a new DOM element with specified tagName, attributes given
 *  by object attrs and internal elements appendees which can be text
 *  or HTML elements.  Note that .append(TextOrElement...) can be
 *  called on the returned element to append further string text or a
 *  DOM elements to it while setAttribute() can be used for setting
 *  its attributes.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "makeElement", ()=>makeElement);
/** Given a baseUrl and req, return a URL object which contains
 *  req as query-parameters appended to baseUrl.
 */ parcelHelpers.export(exports, "makeQueryUrl", ()=>makeQueryUrl);
/** Return a key-value mapping for all non-empty data from form */ parcelHelpers.export(exports, "getFormData", ()=>getFormData);
function makeElement(tagName, attrs = {}, ...appendees) {
    const element = document.createElement(tagName);
    for (const [k, v] of Object.entries(attrs))element.setAttribute(k, v);
    element.append(...appendees);
    return element;
}
function makeQueryUrl(baseUrl, req) {
    const url = new URL(baseUrl);
    Object.entries(req).forEach(([k, v])=>url.searchParams.append(k, v));
    return url;
}
function getFormData(form) {
    const pairs = [
        ...new FormData(form).entries()
    ].map(([k, v])=>[
            k,
            v
        ]).filter(([_, v])=>v.trim().length > 0);
    return Object.fromEntries(pairs);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}]},["61zLH","ayIut"], "ayIut", "parcelRequireeeb6", {})

//# sourceMappingURL=statics.a2337e0a.js.map
