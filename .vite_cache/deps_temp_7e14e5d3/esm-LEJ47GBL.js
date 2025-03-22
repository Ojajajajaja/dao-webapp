import {
  require_elliptic,
  require_isarray
} from "./chunk-VYQIVKUD.js";
import {
  LruMap,
  checksumAddress,
  defineFormatter,
  hexToBigInt,
  hexToNumber,
  isHex,
  keccak256,
  numberToHex,
  toHex
} from "./chunk-KZUTYLRN.js";
import "./chunk-ITOYII5B.js";
import "./chunk-N77D4CVZ.js";
import {
  require_events
} from "./chunk-SQBP2HP4.js";
import {
  require_dijkstra
} from "./chunk-NPFSRFYW.js";
import {
  PublicKey,
  Transaction,
  init_index_browser_esm,
  require_base64_js,
  require_ieee754
} from "./chunk-T57VFI6X.js";
import {
  init_sha3,
  keccak_256
} from "./chunk-HDGENT7J.js";
import {
  HashMD,
  init_md,
  init_secp256k1,
  init_sha256,
  init_utils as init_utils2
} from "./chunk-6PKTQLOZ.js";
import {
  init_utils,
  rotl,
  wrapConstructor
} from "./chunk-CVZ63DHF.js";
import {
  __commonJS,
  __esm,
  __export,
  __reExport,
  __toCommonJS,
  __toESM
} from "./chunk-MVEJMUOB.js";

// node_modules/@walletconnect/window-getters/dist/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/@walletconnect/window-getters/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getLocalStorage = exports.getLocalStorageOrThrow = exports.getCrypto = exports.getCryptoOrThrow = exports.getLocation = exports.getLocationOrThrow = exports.getNavigator = exports.getNavigatorOrThrow = exports.getDocument = exports.getDocumentOrThrow = exports.getFromWindowOrThrow = exports.getFromWindow = void 0;
    function getFromWindow3(name2) {
      let res = void 0;
      if (typeof window !== "undefined" && typeof window[name2] !== "undefined") {
        res = window[name2];
      }
      return res;
    }
    exports.getFromWindow = getFromWindow3;
    function getFromWindowOrThrow3(name2) {
      const res = getFromWindow3(name2);
      if (!res) {
        throw new Error(`${name2} is not defined in Window`);
      }
      return res;
    }
    exports.getFromWindowOrThrow = getFromWindowOrThrow3;
    function getDocumentOrThrow3() {
      return getFromWindowOrThrow3("document");
    }
    exports.getDocumentOrThrow = getDocumentOrThrow3;
    function getDocument3() {
      return getFromWindow3("document");
    }
    exports.getDocument = getDocument3;
    function getNavigatorOrThrow3() {
      return getFromWindowOrThrow3("navigator");
    }
    exports.getNavigatorOrThrow = getNavigatorOrThrow3;
    function getNavigator3() {
      return getFromWindow3("navigator");
    }
    exports.getNavigator = getNavigator3;
    function getLocationOrThrow3() {
      return getFromWindowOrThrow3("location");
    }
    exports.getLocationOrThrow = getLocationOrThrow3;
    function getLocation3() {
      return getFromWindow3("location");
    }
    exports.getLocation = getLocation3;
    function getCryptoOrThrow3() {
      return getFromWindowOrThrow3("crypto");
    }
    exports.getCryptoOrThrow = getCryptoOrThrow3;
    function getCrypto3() {
      return getFromWindow3("crypto");
    }
    exports.getCrypto = getCrypto3;
    function getLocalStorageOrThrow3() {
      return getFromWindowOrThrow3("localStorage");
    }
    exports.getLocalStorageOrThrow = getLocalStorageOrThrow3;
    function getLocalStorage3() {
      return getFromWindow3("localStorage");
    }
    exports.getLocalStorage = getLocalStorage3;
  }
});

// node_modules/@walletconnect/window-metadata/dist/cjs/index.js
var require_cjs2 = __commonJS({
  "node_modules/@walletconnect/window-metadata/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getWindowMetadata = void 0;
    var window_getters_1 = require_cjs();
    function getWindowMetadata2() {
      let doc;
      let loc;
      try {
        doc = window_getters_1.getDocumentOrThrow();
        loc = window_getters_1.getLocationOrThrow();
      } catch (e4) {
        return null;
      }
      function getIcons() {
        const links = doc.getElementsByTagName("link");
        const icons2 = [];
        for (let i6 = 0; i6 < links.length; i6++) {
          const link = links[i6];
          const rel = link.getAttribute("rel");
          if (rel) {
            if (rel.toLowerCase().indexOf("icon") > -1) {
              const href = link.getAttribute("href");
              if (href) {
                if (href.toLowerCase().indexOf("https:") === -1 && href.toLowerCase().indexOf("http:") === -1 && href.indexOf("//") !== 0) {
                  let absoluteHref = loc.protocol + "//" + loc.host;
                  if (href.indexOf("/") === 0) {
                    absoluteHref += href;
                  } else {
                    const path = loc.pathname.split("/");
                    path.pop();
                    const finalPath = path.join("/");
                    absoluteHref += finalPath + "/" + href;
                  }
                  icons2.push(absoluteHref);
                } else if (href.indexOf("//") === 0) {
                  const absoluteUrl = loc.protocol + href;
                  icons2.push(absoluteUrl);
                } else {
                  icons2.push(href);
                }
              }
            }
          }
        }
        return icons2;
      }
      function getWindowMetadataOfAny(...args) {
        const metaTags = doc.getElementsByTagName("meta");
        for (let i6 = 0; i6 < metaTags.length; i6++) {
          const tag = metaTags[i6];
          const attributes = ["itemprop", "property", "name"].map((target) => tag.getAttribute(target)).filter((attr) => {
            if (attr) {
              return args.includes(attr);
            }
            return false;
          });
          if (attributes.length && attributes) {
            const content = tag.getAttribute("content");
            if (content) {
              return content;
            }
          }
        }
        return "";
      }
      function getName() {
        let name3 = getWindowMetadataOfAny("name", "og:site_name", "og:title", "twitter:title");
        if (!name3) {
          name3 = doc.title;
        }
        return name3;
      }
      function getDescription() {
        const description2 = getWindowMetadataOfAny("description", "og:description", "twitter:description", "keywords");
        return description2;
      }
      const name2 = getName();
      const description = getDescription();
      const url = loc.origin;
      const icons = getIcons();
      const meta = {
        description,
        url,
        icons,
        name: name2
      };
      return meta;
    }
    exports.getWindowMetadata = getWindowMetadata2;
  }
});

// node_modules/detect-browser/es/index.js
function detect(userAgent) {
  if (!!userAgent) {
    return parseUserAgent(userAgent);
  }
  if (typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative") {
    return new ReactNativeInfo();
  }
  if (typeof navigator !== "undefined") {
    return parseUserAgent(navigator.userAgent);
  }
  return getNodeVersion();
}
function matchUserAgent(ua) {
  return ua !== "" && userAgentRules.reduce(function(matched, _a) {
    var browser = _a[0], regex = _a[1];
    if (matched) {
      return matched;
    }
    var uaMatch = regex.exec(ua);
    return !!uaMatch && [browser, uaMatch];
  }, false);
}
function parseUserAgent(ua) {
  var matchedRule = matchUserAgent(ua);
  if (!matchedRule) {
    return null;
  }
  var name2 = matchedRule[0], match = matchedRule[1];
  if (name2 === "searchbot") {
    return new BotInfo();
  }
  var versionParts = match[1] && match[1].split(/[._]/).slice(0, 3);
  if (versionParts) {
    if (versionParts.length < REQUIRED_VERSION_PARTS) {
      versionParts = __spreadArrays(versionParts, createVersionParts(REQUIRED_VERSION_PARTS - versionParts.length));
    }
  } else {
    versionParts = [];
  }
  var version3 = versionParts.join(".");
  var os2 = detectOS(ua);
  var searchBotMatch = SEARCHBOT_OS_REGEX.exec(ua);
  if (searchBotMatch && searchBotMatch[1]) {
    return new SearchBotDeviceInfo(name2, version3, os2, searchBotMatch[1]);
  }
  return new BrowserInfo(name2, version3, os2);
}
function detectOS(ua) {
  for (var ii3 = 0, count = operatingSystemRules.length; ii3 < count; ii3++) {
    var _a = operatingSystemRules[ii3], os2 = _a[0], regex = _a[1];
    var match = regex.exec(ua);
    if (match) {
      return os2;
    }
  }
  return null;
}
function getNodeVersion() {
  var isNode3 = typeof process !== "undefined" && process.version;
  return isNode3 ? new NodeInfo(process.version.slice(1)) : null;
}
function createVersionParts(count) {
  var output = [];
  for (var ii3 = 0; ii3 < count; ii3++) {
    output.push("0");
  }
  return output;
}
var __spreadArrays, BrowserInfo, NodeInfo, SearchBotDeviceInfo, BotInfo, ReactNativeInfo, SEARCHBOX_UA_REGEX, SEARCHBOT_OS_REGEX, REQUIRED_VERSION_PARTS, userAgentRules, operatingSystemRules;
var init_es = __esm({
  "node_modules/detect-browser/es/index.js"() {
    __spreadArrays = function() {
      for (var s5 = 0, i6 = 0, il = arguments.length; i6 < il; i6++) s5 += arguments[i6].length;
      for (var r5 = Array(s5), k7 = 0, i6 = 0; i6 < il; i6++)
        for (var a5 = arguments[i6], j6 = 0, jl = a5.length; j6 < jl; j6++, k7++)
          r5[k7] = a5[j6];
      return r5;
    };
    BrowserInfo = /** @class */
    /* @__PURE__ */ function() {
      function BrowserInfo3(name2, version3, os2) {
        this.name = name2;
        this.version = version3;
        this.os = os2;
        this.type = "browser";
      }
      return BrowserInfo3;
    }();
    NodeInfo = /** @class */
    /* @__PURE__ */ function() {
      function NodeInfo3(version3) {
        this.version = version3;
        this.type = "node";
        this.name = "node";
        this.os = process.platform;
      }
      return NodeInfo3;
    }();
    SearchBotDeviceInfo = /** @class */
    /* @__PURE__ */ function() {
      function SearchBotDeviceInfo3(name2, version3, os2, bot) {
        this.name = name2;
        this.version = version3;
        this.os = os2;
        this.bot = bot;
        this.type = "bot-device";
      }
      return SearchBotDeviceInfo3;
    }();
    BotInfo = /** @class */
    /* @__PURE__ */ function() {
      function BotInfo3() {
        this.type = "bot";
        this.bot = true;
        this.name = "bot";
        this.version = null;
        this.os = null;
      }
      return BotInfo3;
    }();
    ReactNativeInfo = /** @class */
    /* @__PURE__ */ function() {
      function ReactNativeInfo3() {
        this.type = "react-native";
        this.name = "react-native";
        this.version = null;
        this.os = null;
      }
      return ReactNativeInfo3;
    }();
    SEARCHBOX_UA_REGEX = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/;
    SEARCHBOT_OS_REGEX = /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/;
    REQUIRED_VERSION_PARTS = 3;
    userAgentRules = [
      ["aol", /AOLShield\/([0-9\._]+)/],
      ["edge", /Edge\/([0-9\._]+)/],
      ["edge-ios", /EdgiOS\/([0-9\._]+)/],
      ["yandexbrowser", /YaBrowser\/([0-9\._]+)/],
      ["kakaotalk", /KAKAOTALK\s([0-9\.]+)/],
      ["samsung", /SamsungBrowser\/([0-9\.]+)/],
      ["silk", /\bSilk\/([0-9._-]+)\b/],
      ["miui", /MiuiBrowser\/([0-9\.]+)$/],
      ["beaker", /BeakerBrowser\/([0-9\.]+)/],
      ["edge-chromium", /EdgA?\/([0-9\.]+)/],
      [
        "chromium-webview",
        /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/
      ],
      ["chrome", /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
      ["phantomjs", /PhantomJS\/([0-9\.]+)(:?\s|$)/],
      ["crios", /CriOS\/([0-9\.]+)(:?\s|$)/],
      ["firefox", /Firefox\/([0-9\.]+)(?:\s|$)/],
      ["fxios", /FxiOS\/([0-9\.]+)/],
      ["opera-mini", /Opera Mini.*Version\/([0-9\.]+)/],
      ["opera", /Opera\/([0-9\.]+)(?:\s|$)/],
      ["opera", /OPR\/([0-9\.]+)(:?\s|$)/],
      ["ie", /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
      ["ie", /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
      ["ie", /MSIE\s(7\.0)/],
      ["bb10", /BB10;\sTouch.*Version\/([0-9\.]+)/],
      ["android", /Android\s([0-9\.]+)/],
      ["ios", /Version\/([0-9\._]+).*Mobile.*Safari.*/],
      ["safari", /Version\/([0-9\._]+).*Safari/],
      ["facebook", /FBAV\/([0-9\.]+)/],
      ["instagram", /Instagram\s([0-9\.]+)/],
      ["ios-webview", /AppleWebKit\/([0-9\.]+).*Mobile/],
      ["ios-webview", /AppleWebKit\/([0-9\.]+).*Gecko\)$/],
      ["searchbot", SEARCHBOX_UA_REGEX]
    ];
    operatingSystemRules = [
      ["iOS", /iP(hone|od|ad)/],
      ["Android OS", /Android/],
      ["BlackBerry OS", /BlackBerry|BB10/],
      ["Windows Mobile", /IEMobile/],
      ["Amazon OS", /Kindle/],
      ["Windows 3.11", /Win16/],
      ["Windows 95", /(Windows 95)|(Win95)|(Windows_95)/],
      ["Windows 98", /(Windows 98)|(Win98)/],
      ["Windows 2000", /(Windows NT 5.0)|(Windows 2000)/],
      ["Windows XP", /(Windows NT 5.1)|(Windows XP)/],
      ["Windows Server 2003", /(Windows NT 5.2)/],
      ["Windows Vista", /(Windows NT 6.0)/],
      ["Windows 7", /(Windows NT 6.1)/],
      ["Windows 8", /(Windows NT 6.2)/],
      ["Windows 8.1", /(Windows NT 6.3)/],
      ["Windows 10", /(Windows NT 10.0)/],
      ["Windows ME", /Windows ME/],
      ["Open BSD", /OpenBSD/],
      ["Sun OS", /SunOS/],
      ["Chrome OS", /CrOS/],
      ["Linux", /(Linux)|(X11)/],
      ["Mac OS", /(Mac_PowerPC)|(Macintosh)/],
      ["QNX", /QNX/],
      ["BeOS", /BeOS/],
      ["OS/2", /OS\/2/]
    ];
  }
});

// node_modules/@walletconnect/browser-utils/dist/esm/browser.js
function detectEnv(userAgent) {
  return detect(userAgent);
}
function detectOS2() {
  const env = detectEnv();
  return env && env.os ? env.os : void 0;
}
function isAndroid() {
  const os2 = detectOS2();
  return os2 ? os2.toLowerCase().includes("android") : false;
}
function isIOS() {
  const os2 = detectOS2();
  return os2 ? os2.toLowerCase().includes("ios") || os2.toLowerCase().includes("mac") && navigator.maxTouchPoints > 1 : false;
}
function isMobile() {
  const os2 = detectOS2();
  return os2 ? isAndroid() || isIOS() : false;
}
function isNode() {
  const env = detectEnv();
  const result = env && env.name ? env.name.toLowerCase() === "node" : false;
  return result;
}
function isBrowser() {
  const result = !isNode() && !!getNavigator2();
  return result;
}
function getClientMeta() {
  return windowMetadata.getWindowMetadata();
}
var windowMetadata, windowGetters, getFromWindow2, getFromWindowOrThrow2, getDocumentOrThrow2, getDocument2, getNavigatorOrThrow2, getNavigator2, getLocationOrThrow2, getLocation2, getCryptoOrThrow2, getCrypto2, getLocalStorageOrThrow2, getLocalStorage2;
var init_browser = __esm({
  "node_modules/@walletconnect/browser-utils/dist/esm/browser.js"() {
    windowMetadata = __toESM(require_cjs2());
    windowGetters = __toESM(require_cjs());
    init_es();
    getFromWindow2 = windowGetters.getFromWindow;
    getFromWindowOrThrow2 = windowGetters.getFromWindowOrThrow;
    getDocumentOrThrow2 = windowGetters.getDocumentOrThrow;
    getDocument2 = windowGetters.getDocument;
    getNavigatorOrThrow2 = windowGetters.getNavigatorOrThrow;
    getNavigator2 = windowGetters.getNavigator;
    getLocationOrThrow2 = windowGetters.getLocationOrThrow;
    getLocation2 = windowGetters.getLocation;
    getCryptoOrThrow2 = windowGetters.getCryptoOrThrow;
    getCrypto2 = windowGetters.getCrypto;
    getLocalStorageOrThrow2 = windowGetters.getLocalStorageOrThrow;
    getLocalStorage2 = windowGetters.getLocalStorage;
  }
});

// node_modules/@walletconnect/safe-json/dist/esm/index.js
function safeJsonParse(value) {
  if (typeof value !== "string") {
    throw new Error(`Cannot safe json parse value of type ${typeof value}`);
  }
  try {
    return JSON.parse(value);
  } catch (_a) {
    return value;
  }
}
function safeJsonStringify(value) {
  return typeof value === "string" ? value : JSON.stringify(value);
}
var init_esm = __esm({
  "node_modules/@walletconnect/safe-json/dist/esm/index.js"() {
  }
});

// node_modules/@walletconnect/browser-utils/dist/esm/json.js
var safeJsonParse2, safeJsonStringify2;
var init_json = __esm({
  "node_modules/@walletconnect/browser-utils/dist/esm/json.js"() {
    init_esm();
    safeJsonParse2 = safeJsonParse;
    safeJsonStringify2 = safeJsonStringify;
  }
});

// node_modules/@walletconnect/browser-utils/dist/esm/local.js
function setLocal(key, data) {
  const raw = safeJsonStringify2(data);
  const local = getLocalStorage2();
  if (local) {
    local.setItem(key, raw);
  }
}
function getLocal(key) {
  let data = null;
  let raw = null;
  const local = getLocalStorage2();
  if (local) {
    raw = local.getItem(key);
  }
  data = raw ? safeJsonParse2(raw) : raw;
  return data;
}
function removeLocal(key) {
  const local = getLocalStorage2();
  if (local) {
    local.removeItem(key);
  }
}
var init_local = __esm({
  "node_modules/@walletconnect/browser-utils/dist/esm/local.js"() {
    init_json();
    init_browser();
  }
});

// node_modules/@walletconnect/browser-utils/dist/esm/mobile.js
function formatIOSMobile(uri, entry) {
  const encodedUri = encodeURIComponent(uri);
  return entry.universalLink ? `${entry.universalLink}/wc?uri=${encodedUri}` : entry.deepLink ? `${entry.deepLink}${entry.deepLink.endsWith(":") ? "//" : "/"}wc?uri=${encodedUri}` : "";
}
function saveMobileLinkInfo(data) {
  const focusUri = data.href.split("?")[0];
  setLocal(mobileLinkChoiceKey, Object.assign(Object.assign({}, data), { href: focusUri }));
}
function getMobileRegistryEntry(registry, name2) {
  return registry.filter((entry) => entry.name.toLowerCase().includes(name2.toLowerCase()))[0];
}
function getMobileLinkRegistry(registry, whitelist) {
  let links = registry;
  if (whitelist) {
    links = whitelist.map((name2) => getMobileRegistryEntry(registry, name2)).filter(Boolean);
  }
  return links;
}
var mobileLinkChoiceKey;
var init_mobile = __esm({
  "node_modules/@walletconnect/browser-utils/dist/esm/mobile.js"() {
    init_local();
    mobileLinkChoiceKey = "WALLETCONNECT_DEEPLINK_CHOICE";
  }
});

// node_modules/@walletconnect/browser-utils/dist/esm/registry.js
function getWalletRegistryUrl() {
  return API_URL + "/api/v2/wallets";
}
function getDappRegistryUrl() {
  return API_URL + "/api/v2/dapps";
}
function formatMobileRegistryEntry(entry, platform = "mobile") {
  var _a;
  return {
    name: entry.name || "",
    shortName: entry.metadata.shortName || "",
    color: entry.metadata.colors.primary || "",
    logo: (_a = entry.image_url.sm) !== null && _a !== void 0 ? _a : "",
    universalLink: entry[platform].universal || "",
    deepLink: entry[platform].native || ""
  };
}
function formatMobileRegistry(registry, platform = "mobile") {
  return Object.values(registry).filter((entry) => !!entry[platform].universal || !!entry[platform].native).map((entry) => formatMobileRegistryEntry(entry, platform));
}
var API_URL;
var init_registry = __esm({
  "node_modules/@walletconnect/browser-utils/dist/esm/registry.js"() {
    API_URL = "https://registry.walletconnect.com";
  }
});

// node_modules/@walletconnect/browser-utils/dist/esm/index.js
var esm_exports2 = {};
__export(esm_exports2, {
  detectEnv: () => detectEnv,
  detectOS: () => detectOS2,
  formatIOSMobile: () => formatIOSMobile,
  formatMobileRegistry: () => formatMobileRegistry,
  formatMobileRegistryEntry: () => formatMobileRegistryEntry,
  getClientMeta: () => getClientMeta,
  getCrypto: () => getCrypto2,
  getCryptoOrThrow: () => getCryptoOrThrow2,
  getDappRegistryUrl: () => getDappRegistryUrl,
  getDocument: () => getDocument2,
  getDocumentOrThrow: () => getDocumentOrThrow2,
  getFromWindow: () => getFromWindow2,
  getFromWindowOrThrow: () => getFromWindowOrThrow2,
  getLocal: () => getLocal,
  getLocalStorage: () => getLocalStorage2,
  getLocalStorageOrThrow: () => getLocalStorageOrThrow2,
  getLocation: () => getLocation2,
  getLocationOrThrow: () => getLocationOrThrow2,
  getMobileLinkRegistry: () => getMobileLinkRegistry,
  getMobileRegistryEntry: () => getMobileRegistryEntry,
  getNavigator: () => getNavigator2,
  getNavigatorOrThrow: () => getNavigatorOrThrow2,
  getWalletRegistryUrl: () => getWalletRegistryUrl,
  isAndroid: () => isAndroid,
  isBrowser: () => isBrowser,
  isIOS: () => isIOS,
  isMobile: () => isMobile,
  isNode: () => isNode,
  mobileLinkChoiceKey: () => mobileLinkChoiceKey,
  removeLocal: () => removeLocal,
  safeJsonParse: () => safeJsonParse2,
  safeJsonStringify: () => safeJsonStringify2,
  saveMobileLinkInfo: () => saveMobileLinkInfo,
  setLocal: () => setLocal
});
var init_esm2 = __esm({
  "node_modules/@walletconnect/browser-utils/dist/esm/index.js"() {
    init_browser();
    init_json();
    init_local();
    init_mobile();
    init_registry();
  }
});

// node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/can-promise.js
var require_can_promise = __commonJS({
  "node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/can-promise.js"(exports, module) {
    module.exports = function() {
      return typeof Promise === "function" && Promise.prototype && Promise.prototype.then;
    };
  }
});

// node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/utils/typedarray-buffer.js
var require_typedarray_buffer = __commonJS({
  "node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/utils/typedarray-buffer.js"(exports, module) {
    "use strict";
    var isArray = require_isarray();
    function typedArraySupport() {
      try {
        var arr = new Uint8Array(1);
        arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function() {
          return 42;
        } };
        return arr.foo() === 42;
      } catch (e4) {
        return false;
      }
    }
    Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
    var K_MAX_LENGTH = Buffer2.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
    function Buffer2(arg, offset, length2) {
      if (!Buffer2.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer2)) {
        return new Buffer2(arg, offset, length2);
      }
      if (typeof arg === "number") {
        return allocUnsafe2(this, arg);
      }
      return from8(this, arg, offset, length2);
    }
    if (Buffer2.TYPED_ARRAY_SUPPORT) {
      Buffer2.prototype.__proto__ = Uint8Array.prototype;
      Buffer2.__proto__ = Uint8Array;
      if (typeof Symbol !== "undefined" && Symbol.species && Buffer2[Symbol.species] === Buffer2) {
        Object.defineProperty(Buffer2, Symbol.species, {
          value: null,
          configurable: true,
          enumerable: false,
          writable: false
        });
      }
    }
    function checked(length2) {
      if (length2 >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length2 | 0;
    }
    function isnan(val) {
      return val !== val;
    }
    function createBuffer(that, length2) {
      var buf;
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        buf = new Uint8Array(length2);
        buf.__proto__ = Buffer2.prototype;
      } else {
        buf = that;
        if (buf === null) {
          buf = new Buffer2(length2);
        }
        buf.length = length2;
      }
      return buf;
    }
    function allocUnsafe2(that, size4) {
      var buf = createBuffer(that, size4 < 0 ? 0 : checked(size4) | 0);
      if (!Buffer2.TYPED_ARRAY_SUPPORT) {
        for (var i6 = 0; i6 < size4; ++i6) {
          buf[i6] = 0;
        }
      }
      return buf;
    }
    function fromString5(that, string2) {
      var length2 = byteLength(string2) | 0;
      var buf = createBuffer(that, length2);
      var actual = buf.write(string2);
      if (actual !== length2) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    function fromArrayLike(that, array) {
      var length2 = array.length < 0 ? 0 : checked(array.length) | 0;
      var buf = createBuffer(that, length2);
      for (var i6 = 0; i6 < length2; i6 += 1) {
        buf[i6] = array[i6] & 255;
      }
      return buf;
    }
    function fromArrayBuffer(that, array, byteOffset, length2) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError("'offset' is out of bounds");
      }
      if (array.byteLength < byteOffset + (length2 || 0)) {
        throw new RangeError("'length' is out of bounds");
      }
      var buf;
      if (byteOffset === void 0 && length2 === void 0) {
        buf = new Uint8Array(array);
      } else if (length2 === void 0) {
        buf = new Uint8Array(array, byteOffset);
      } else {
        buf = new Uint8Array(array, byteOffset, length2);
      }
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        buf.__proto__ = Buffer2.prototype;
      } else {
        buf = fromArrayLike(that, buf);
      }
      return buf;
    }
    function fromObject(that, obj) {
      if (Buffer2.isBuffer(obj)) {
        var len = checked(obj.length) | 0;
        var buf = createBuffer(that, len);
        if (buf.length === 0) {
          return buf;
        }
        obj.copy(buf, 0, 0, len);
        return buf;
      }
      if (obj) {
        if (typeof ArrayBuffer !== "undefined" && obj.buffer instanceof ArrayBuffer || "length" in obj) {
          if (typeof obj.length !== "number" || isnan(obj.length)) {
            return createBuffer(that, 0);
          }
          return fromArrayLike(that, obj);
        }
        if (obj.type === "Buffer" && Array.isArray(obj.data)) {
          return fromArrayLike(that, obj.data);
        }
      }
      throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
    }
    function utf8ToBytes(string2, units) {
      units = units || Infinity;
      var codePoint;
      var length2 = string2.length;
      var leadSurrogate = null;
      var bytes = [];
      for (var i6 = 0; i6 < length2; ++i6) {
        codePoint = string2.charCodeAt(i6);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            } else if (i6 + 1 === length2) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0) break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0) break;
          bytes.push(
            codePoint >> 6 | 192,
            codePoint & 63 | 128
          );
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0) break;
          bytes.push(
            codePoint >> 12 | 224,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0) break;
          bytes.push(
            codePoint >> 18 | 240,
            codePoint >> 12 & 63 | 128,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    function byteLength(string2) {
      if (Buffer2.isBuffer(string2)) {
        return string2.length;
      }
      if (typeof ArrayBuffer !== "undefined" && typeof ArrayBuffer.isView === "function" && (ArrayBuffer.isView(string2) || string2 instanceof ArrayBuffer)) {
        return string2.byteLength;
      }
      if (typeof string2 !== "string") {
        string2 = "" + string2;
      }
      var len = string2.length;
      if (len === 0) return 0;
      return utf8ToBytes(string2).length;
    }
    function blitBuffer(src2, dst, offset, length2) {
      for (var i6 = 0; i6 < length2; ++i6) {
        if (i6 + offset >= dst.length || i6 >= src2.length) break;
        dst[i6 + offset] = src2[i6];
      }
      return i6;
    }
    function utf8Write(buf, string2, offset, length2) {
      return blitBuffer(utf8ToBytes(string2, buf.length - offset), buf, offset, length2);
    }
    function from8(that, value, offset, length2) {
      if (typeof value === "number") {
        throw new TypeError('"value" argument must not be a number');
      }
      if (typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer) {
        return fromArrayBuffer(that, value, offset, length2);
      }
      if (typeof value === "string") {
        return fromString5(that, value, offset);
      }
      return fromObject(that, value);
    }
    Buffer2.prototype.write = function write(string2, offset, length2) {
      if (offset === void 0) {
        length2 = this.length;
        offset = 0;
      } else if (length2 === void 0 && typeof offset === "string") {
        length2 = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset | 0;
        if (isFinite(length2)) {
          length2 = length2 | 0;
        } else {
          length2 = void 0;
        }
      }
      var remaining = this.length - offset;
      if (length2 === void 0 || length2 > remaining) length2 = remaining;
      if (string2.length > 0 && (length2 < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      return utf8Write(this, string2, offset, length2);
    };
    Buffer2.prototype.slice = function slice4(start, end) {
      var len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0) start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0) end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start) end = start;
      var newBuf;
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        newBuf = this.subarray(start, end);
        newBuf.__proto__ = Buffer2.prototype;
      } else {
        var sliceLen = end - start;
        newBuf = new Buffer2(sliceLen, void 0);
        for (var i6 = 0; i6 < sliceLen; ++i6) {
          newBuf[i6] = this[i6 + start];
        }
      }
      return newBuf;
    };
    Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
      if (!start) start = 0;
      if (!end && end !== 0) end = this.length;
      if (targetStart >= target.length) targetStart = target.length;
      if (!targetStart) targetStart = 0;
      if (end > 0 && end < start) end = start;
      if (end === start) return 0;
      if (target.length === 0 || this.length === 0) return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length) throw new RangeError("sourceStart out of bounds");
      if (end < 0) throw new RangeError("sourceEnd out of bounds");
      if (end > this.length) end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      var len = end - start;
      var i6;
      if (this === target && start < targetStart && targetStart < end) {
        for (i6 = len - 1; i6 >= 0; --i6) {
          target[i6 + targetStart] = this[i6 + start];
        }
      } else if (len < 1e3 || !Buffer2.TYPED_ARRAY_SUPPORT) {
        for (i6 = 0; i6 < len; ++i6) {
          target[i6 + targetStart] = this[i6 + start];
        }
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, start + len),
          targetStart
        );
      }
      return len;
    };
    Buffer2.prototype.fill = function fill(val, start, end) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          end = this.length;
        }
        if (val.length === 1) {
          var code2 = val.charCodeAt(0);
          if (code2 < 256) {
            val = code2;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val) val = 0;
      var i6;
      if (typeof val === "number") {
        for (i6 = start; i6 < end; ++i6) {
          this[i6] = val;
        }
      } else {
        var bytes = Buffer2.isBuffer(val) ? val : new Buffer2(val);
        var len = bytes.length;
        for (i6 = 0; i6 < end - start; ++i6) {
          this[i6 + start] = bytes[i6 % len];
        }
      }
      return this;
    };
    Buffer2.concat = function concat4(list, length2) {
      if (!isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return createBuffer(null, 0);
      }
      var i6;
      if (length2 === void 0) {
        length2 = 0;
        for (i6 = 0; i6 < list.length; ++i6) {
          length2 += list[i6].length;
        }
      }
      var buffer = allocUnsafe2(null, length2);
      var pos = 0;
      for (i6 = 0; i6 < list.length; ++i6) {
        var buf = list[i6];
        if (!Buffer2.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        buf.copy(buffer, pos);
        pos += buf.length;
      }
      return buffer;
    };
    Buffer2.byteLength = byteLength;
    Buffer2.prototype._isBuffer = true;
    Buffer2.isBuffer = function isBuffer(b5) {
      return !!(b5 != null && b5._isBuffer);
    };
    module.exports.alloc = function(size4) {
      var buffer = new Buffer2(size4);
      buffer.fill(0);
      return buffer;
    };
    module.exports.from = function(data) {
      return new Buffer2(data);
    };
  }
});

// node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/utils.js
var require_utils = __commonJS({
  "node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/utils.js"(exports) {
    var toSJISFunction;
    var CODEWORDS_COUNT = [
      0,
      // Not used
      26,
      44,
      70,
      100,
      134,
      172,
      196,
      242,
      292,
      346,
      404,
      466,
      532,
      581,
      655,
      733,
      815,
      901,
      991,
      1085,
      1156,
      1258,
      1364,
      1474,
      1588,
      1706,
      1828,
      1921,
      2051,
      2185,
      2323,
      2465,
      2611,
      2761,
      2876,
      3034,
      3196,
      3362,
      3532,
      3706
    ];
    exports.getSymbolSize = function getSymbolSize(version3) {
      if (!version3) throw new Error('"version" cannot be null or undefined');
      if (version3 < 1 || version3 > 40) throw new Error('"version" should be in range from 1 to 40');
      return version3 * 4 + 17;
    };
    exports.getSymbolTotalCodewords = function getSymbolTotalCodewords(version3) {
      return CODEWORDS_COUNT[version3];
    };
    exports.getBCHDigit = function(data) {
      var digit = 0;
      while (data !== 0) {
        digit++;
        data >>>= 1;
      }
      return digit;
    };
    exports.setToSJISFunction = function setToSJISFunction(f8) {
      if (typeof f8 !== "function") {
        throw new Error('"toSJISFunc" is not a valid function.');
      }
      toSJISFunction = f8;
    };
    exports.isKanjiModeEnabled = function() {
      return typeof toSJISFunction !== "undefined";
    };
    exports.toSJIS = function toSJIS(kanji) {
      return toSJISFunction(kanji);
    };
  }
});

// node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/error-correction-level.js
var require_error_correction_level = __commonJS({
  "node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/error-correction-level.js"(exports) {
    exports.L = { bit: 1 };
    exports.M = { bit: 0 };
    exports.Q = { bit: 3 };
    exports.H = { bit: 2 };
    function fromString5(string2) {
      if (typeof string2 !== "string") {
        throw new Error("Param is not a string");
      }
      var lcStr = string2.toLowerCase();
      switch (lcStr) {
        case "l":
        case "low":
          return exports.L;
        case "m":
        case "medium":
          return exports.M;
        case "q":
        case "quartile":
          return exports.Q;
        case "h":
        case "high":
          return exports.H;
        default:
          throw new Error("Unknown EC Level: " + string2);
      }
    }
    exports.isValid = function isValid(level) {
      return level && typeof level.bit !== "undefined" && level.bit >= 0 && level.bit < 4;
    };
    exports.from = function from8(value, defaultValue) {
      if (exports.isValid(value)) {
        return value;
      }
      try {
        return fromString5(value);
      } catch (e4) {
        return defaultValue;
      }
    };
  }
});

// node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/bit-buffer.js
var require_bit_buffer = __commonJS({
  "node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/bit-buffer.js"(exports, module) {
    function BitBuffer() {
      this.buffer = [];
      this.length = 0;
    }
    BitBuffer.prototype = {
      get: function(index) {
        var bufIndex = Math.floor(index / 8);
        return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;
      },
      put: function(num, length2) {
        for (var i6 = 0; i6 < length2; i6++) {
          this.putBit((num >>> length2 - i6 - 1 & 1) === 1);
        }
      },
      getLengthInBits: function() {
        return this.length;
      },
      putBit: function(bit) {
        var bufIndex = Math.floor(this.length / 8);
        if (this.buffer.length <= bufIndex) {
          this.buffer.push(0);
        }
        if (bit) {
          this.buffer[bufIndex] |= 128 >>> this.length % 8;
        }
        this.length++;
      }
    };
    module.exports = BitBuffer;
  }
});

// node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/bit-matrix.js
var require_bit_matrix = __commonJS({
  "node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/bit-matrix.js"(exports, module) {
    var BufferUtil = require_typedarray_buffer();
    function BitMatrix(size4) {
      if (!size4 || size4 < 1) {
        throw new Error("BitMatrix size must be defined and greater than 0");
      }
      this.size = size4;
      this.data = BufferUtil.alloc(size4 * size4);
      this.reservedBit = BufferUtil.alloc(size4 * size4);
    }
    BitMatrix.prototype.set = function(row, col, value, reserved) {
      var index = row * this.size + col;
      this.data[index] = value;
      if (reserved) this.reservedBit[index] = true;
    };
    BitMatrix.prototype.get = function(row, col) {
      return this.data[row * this.size + col];
    };
    BitMatrix.prototype.xor = function(row, col, value) {
      this.data[row * this.size + col] ^= value;
    };
    BitMatrix.prototype.isReserved = function(row, col) {
      return this.reservedBit[row * this.size + col];
    };
    module.exports = BitMatrix;
  }
});

// node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/alignment-pattern.js
var require_alignment_pattern = __commonJS({
  "node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/alignment-pattern.js"(exports) {
    var getSymbolSize = require_utils().getSymbolSize;
    exports.getRowColCoords = function getRowColCoords(version3) {
      if (version3 === 1) return [];
      var posCount = Math.floor(version3 / 7) + 2;
      var size4 = getSymbolSize(version3);
      var intervals = size4 === 145 ? 26 : Math.ceil((size4 - 13) / (2 * posCount - 2)) * 2;
      var positions = [size4 - 7];
      for (var i6 = 1; i6 < posCount - 1; i6++) {
        positions[i6] = positions[i6 - 1] - intervals;
      }
      positions.push(6);
      return positions.reverse();
    };
    exports.getPositions = function getPositions(version3) {
      var coords = [];
      var pos = exports.getRowColCoords(version3);
      var posLength = pos.length;
      for (var i6 = 0; i6 < posLength; i6++) {
        for (var j6 = 0; j6 < posLength; j6++) {
          if (i6 === 0 && j6 === 0 || // top-left
          i6 === 0 && j6 === posLength - 1 || // bottom-left
          i6 === posLength - 1 && j6 === 0) {
            continue;
          }
          coords.push([pos[i6], pos[j6]]);
        }
      }
      return coords;
    };
  }
});

// node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/finder-pattern.js
var require_finder_pattern = __commonJS({
  "node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/finder-pattern.js"(exports) {
    var getSymbolSize = require_utils().getSymbolSize;
    var FINDER_PATTERN_SIZE = 7;
    exports.getPositions = function getPositions(version3) {
      var size4 = getSymbolSize(version3);
      return [
        // top-left
        [0, 0],
        // top-right
        [size4 - FINDER_PATTERN_SIZE, 0],
        // bottom-left
        [0, size4 - FINDER_PATTERN_SIZE]
      ];
    };
  }
});

// node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/mask-pattern.js
var require_mask_pattern = __commonJS({
  "node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/mask-pattern.js"(exports) {
    exports.Patterns = {
      PATTERN000: 0,
      PATTERN001: 1,
      PATTERN010: 2,
      PATTERN011: 3,
      PATTERN100: 4,
      PATTERN101: 5,
      PATTERN110: 6,
      PATTERN111: 7
    };
    var PenaltyScores = {
      N1: 3,
      N2: 3,
      N3: 40,
      N4: 10
    };
    exports.isValid = function isValid(mask) {
      return mask != null && mask !== "" && !isNaN(mask) && mask >= 0 && mask <= 7;
    };
    exports.from = function from8(value) {
      return exports.isValid(value) ? parseInt(value, 10) : void 0;
    };
    exports.getPenaltyN1 = function getPenaltyN1(data) {
      var size4 = data.size;
      var points = 0;
      var sameCountCol = 0;
      var sameCountRow = 0;
      var lastCol = null;
      var lastRow = null;
      for (var row = 0; row < size4; row++) {
        sameCountCol = sameCountRow = 0;
        lastCol = lastRow = null;
        for (var col = 0; col < size4; col++) {
          var module2 = data.get(row, col);
          if (module2 === lastCol) {
            sameCountCol++;
          } else {
            if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
            lastCol = module2;
            sameCountCol = 1;
          }
          module2 = data.get(col, row);
          if (module2 === lastRow) {
            sameCountRow++;
          } else {
            if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
            lastRow = module2;
            sameCountRow = 1;
          }
        }
        if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
        if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
      }
      return points;
    };
    exports.getPenaltyN2 = function getPenaltyN2(data) {
      var size4 = data.size;
      var points = 0;
      for (var row = 0; row < size4 - 1; row++) {
        for (var col = 0; col < size4 - 1; col++) {
          var last = data.get(row, col) + data.get(row, col + 1) + data.get(row + 1, col) + data.get(row + 1, col + 1);
          if (last === 4 || last === 0) points++;
        }
      }
      return points * PenaltyScores.N2;
    };
    exports.getPenaltyN3 = function getPenaltyN3(data) {
      var size4 = data.size;
      var points = 0;
      var bitsCol = 0;
      var bitsRow = 0;
      for (var row = 0; row < size4; row++) {
        bitsCol = bitsRow = 0;
        for (var col = 0; col < size4; col++) {
          bitsCol = bitsCol << 1 & 2047 | data.get(row, col);
          if (col >= 10 && (bitsCol === 1488 || bitsCol === 93)) points++;
          bitsRow = bitsRow << 1 & 2047 | data.get(col, row);
          if (col >= 10 && (bitsRow === 1488 || bitsRow === 93)) points++;
        }
      }
      return points * PenaltyScores.N3;
    };
    exports.getPenaltyN4 = function getPenaltyN4(data) {
      var darkCount = 0;
      var modulesCount = data.data.length;
      for (var i6 = 0; i6 < modulesCount; i6++) darkCount += data.data[i6];
      var k7 = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);
      return k7 * PenaltyScores.N4;
    };
    function getMaskAt(maskPattern, i6, j6) {
      switch (maskPattern) {
        case exports.Patterns.PATTERN000:
          return (i6 + j6) % 2 === 0;
        case exports.Patterns.PATTERN001:
          return i6 % 2 === 0;
        case exports.Patterns.PATTERN010:
          return j6 % 3 === 0;
        case exports.Patterns.PATTERN011:
          return (i6 + j6) % 3 === 0;
        case exports.Patterns.PATTERN100:
          return (Math.floor(i6 / 2) + Math.floor(j6 / 3)) % 2 === 0;
        case exports.Patterns.PATTERN101:
          return i6 * j6 % 2 + i6 * j6 % 3 === 0;
        case exports.Patterns.PATTERN110:
          return (i6 * j6 % 2 + i6 * j6 % 3) % 2 === 0;
        case exports.Patterns.PATTERN111:
          return (i6 * j6 % 3 + (i6 + j6) % 2) % 2 === 0;
        default:
          throw new Error("bad maskPattern:" + maskPattern);
      }
    }
    exports.applyMask = function applyMask(pattern, data) {
      var size4 = data.size;
      for (var col = 0; col < size4; col++) {
        for (var row = 0; row < size4; row++) {
          if (data.isReserved(row, col)) continue;
          data.xor(row, col, getMaskAt(pattern, row, col));
        }
      }
    };
    exports.getBestMask = function getBestMask(data, setupFormatFunc) {
      var numPatterns = Object.keys(exports.Patterns).length;
      var bestPattern = 0;
      var lowerPenalty = Infinity;
      for (var p6 = 0; p6 < numPatterns; p6++) {
        setupFormatFunc(p6);
        exports.applyMask(p6, data);
        var penalty = exports.getPenaltyN1(data) + exports.getPenaltyN2(data) + exports.getPenaltyN3(data) + exports.getPenaltyN4(data);
        exports.applyMask(p6, data);
        if (penalty < lowerPenalty) {
          lowerPenalty = penalty;
          bestPattern = p6;
        }
      }
      return bestPattern;
    };
  }
});

// node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/error-correction-code.js
var require_error_correction_code = __commonJS({
  "node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/error-correction-code.js"(exports) {
    var ECLevel = require_error_correction_level();
    var EC_BLOCKS_TABLE = [
      // L  M  Q  H
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      2,
      2,
      1,
      2,
      2,
      4,
      1,
      2,
      4,
      4,
      2,
      4,
      4,
      4,
      2,
      4,
      6,
      5,
      2,
      4,
      6,
      6,
      2,
      5,
      8,
      8,
      4,
      5,
      8,
      8,
      4,
      5,
      8,
      11,
      4,
      8,
      10,
      11,
      4,
      9,
      12,
      16,
      4,
      9,
      16,
      16,
      6,
      10,
      12,
      18,
      6,
      10,
      17,
      16,
      6,
      11,
      16,
      19,
      6,
      13,
      18,
      21,
      7,
      14,
      21,
      25,
      8,
      16,
      20,
      25,
      8,
      17,
      23,
      25,
      9,
      17,
      23,
      34,
      9,
      18,
      25,
      30,
      10,
      20,
      27,
      32,
      12,
      21,
      29,
      35,
      12,
      23,
      34,
      37,
      12,
      25,
      34,
      40,
      13,
      26,
      35,
      42,
      14,
      28,
      38,
      45,
      15,
      29,
      40,
      48,
      16,
      31,
      43,
      51,
      17,
      33,
      45,
      54,
      18,
      35,
      48,
      57,
      19,
      37,
      51,
      60,
      19,
      38,
      53,
      63,
      20,
      40,
      56,
      66,
      21,
      43,
      59,
      70,
      22,
      45,
      62,
      74,
      24,
      47,
      65,
      77,
      25,
      49,
      68,
      81
    ];
    var EC_CODEWORDS_TABLE = [
      // L  M  Q  H
      7,
      10,
      13,
      17,
      10,
      16,
      22,
      28,
      15,
      26,
      36,
      44,
      20,
      36,
      52,
      64,
      26,
      48,
      72,
      88,
      36,
      64,
      96,
      112,
      40,
      72,
      108,
      130,
      48,
      88,
      132,
      156,
      60,
      110,
      160,
      192,
      72,
      130,
      192,
      224,
      80,
      150,
      224,
      264,
      96,
      176,
      260,
      308,
      104,
      198,
      288,
      352,
      120,
      216,
      320,
      384,
      132,
      240,
      360,
      432,
      144,
      280,
      408,
      480,
      168,
      308,
      448,
      532,
      180,
      338,
      504,
      588,
      196,
      364,
      546,
      650,
      224,
      416,
      600,
      700,
      224,
      442,
      644,
      750,
      252,
      476,
      690,
      816,
      270,
      504,
      750,
      900,
      300,
      560,
      810,
      960,
      312,
      588,
      870,
      1050,
      336,
      644,
      952,
      1110,
      360,
      700,
      1020,
      1200,
      390,
      728,
      1050,
      1260,
      420,
      784,
      1140,
      1350,
      450,
      812,
      1200,
      1440,
      480,
      868,
      1290,
      1530,
      510,
      924,
      1350,
      1620,
      540,
      980,
      1440,
      1710,
      570,
      1036,
      1530,
      1800,
      570,
      1064,
      1590,
      1890,
      600,
      1120,
      1680,
      1980,
      630,
      1204,
      1770,
      2100,
      660,
      1260,
      1860,
      2220,
      720,
      1316,
      1950,
      2310,
      750,
      1372,
      2040,
      2430
    ];
    exports.getBlocksCount = function getBlocksCount(version3, errorCorrectionLevel) {
      switch (errorCorrectionLevel) {
        case ECLevel.L:
          return EC_BLOCKS_TABLE[(version3 - 1) * 4 + 0];
        case ECLevel.M:
          return EC_BLOCKS_TABLE[(version3 - 1) * 4 + 1];
        case ECLevel.Q:
          return EC_BLOCKS_TABLE[(version3 - 1) * 4 + 2];
        case ECLevel.H:
          return EC_BLOCKS_TABLE[(version3 - 1) * 4 + 3];
        default:
          return void 0;
      }
    };
    exports.getTotalCodewordsCount = function getTotalCodewordsCount(version3, errorCorrectionLevel) {
      switch (errorCorrectionLevel) {
        case ECLevel.L:
          return EC_CODEWORDS_TABLE[(version3 - 1) * 4 + 0];
        case ECLevel.M:
          return EC_CODEWORDS_TABLE[(version3 - 1) * 4 + 1];
        case ECLevel.Q:
          return EC_CODEWORDS_TABLE[(version3 - 1) * 4 + 2];
        case ECLevel.H:
          return EC_CODEWORDS_TABLE[(version3 - 1) * 4 + 3];
        default:
          return void 0;
      }
    };
  }
});

// node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/galois-field.js
var require_galois_field = __commonJS({
  "node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/galois-field.js"(exports) {
    var BufferUtil = require_typedarray_buffer();
    var EXP_TABLE = BufferUtil.alloc(512);
    var LOG_TABLE = BufferUtil.alloc(256);
    (function initTables() {
      var x9 = 1;
      for (var i6 = 0; i6 < 255; i6++) {
        EXP_TABLE[i6] = x9;
        LOG_TABLE[x9] = i6;
        x9 <<= 1;
        if (x9 & 256) {
          x9 ^= 285;
        }
      }
      for (i6 = 255; i6 < 512; i6++) {
        EXP_TABLE[i6] = EXP_TABLE[i6 - 255];
      }
    })();
    exports.log = function log(n7) {
      if (n7 < 1) throw new Error("log(" + n7 + ")");
      return LOG_TABLE[n7];
    };
    exports.exp = function exp(n7) {
      return EXP_TABLE[n7];
    };
    exports.mul = function mul(x9, y6) {
      if (x9 === 0 || y6 === 0) return 0;
      return EXP_TABLE[LOG_TABLE[x9] + LOG_TABLE[y6]];
    };
  }
});

// node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/polynomial.js
var require_polynomial = __commonJS({
  "node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/polynomial.js"(exports) {
    var BufferUtil = require_typedarray_buffer();
    var GF = require_galois_field();
    exports.mul = function mul(p1, p22) {
      var coeff = BufferUtil.alloc(p1.length + p22.length - 1);
      for (var i6 = 0; i6 < p1.length; i6++) {
        for (var j6 = 0; j6 < p22.length; j6++) {
          coeff[i6 + j6] ^= GF.mul(p1[i6], p22[j6]);
        }
      }
      return coeff;
    };
    exports.mod = function mod(divident, divisor) {
      var result = BufferUtil.from(divident);
      while (result.length - divisor.length >= 0) {
        var coeff = result[0];
        for (var i6 = 0; i6 < divisor.length; i6++) {
          result[i6] ^= GF.mul(divisor[i6], coeff);
        }
        var offset = 0;
        while (offset < result.length && result[offset] === 0) offset++;
        result = result.slice(offset);
      }
      return result;
    };
    exports.generateECPolynomial = function generateECPolynomial(degree) {
      var poly = BufferUtil.from([1]);
      for (var i6 = 0; i6 < degree; i6++) {
        poly = exports.mul(poly, [1, GF.exp(i6)]);
      }
      return poly;
    };
  }
});

// node_modules/@walletconnect/qrcode-modal/node_modules/buffer/index.js
var require_buffer = __commonJS({
  "node_modules/@walletconnect/qrcode-modal/node_modules/buffer/index.js"(exports) {
    "use strict";
    var base642 = require_base64_js();
    var ieee754 = require_ieee754();
    var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports.Buffer = Buffer2;
    exports.SlowBuffer = SlowBuffer;
    exports.INSPECT_MAX_BYTES = 50;
    var K_MAX_LENGTH = 2147483647;
    exports.kMaxLength = K_MAX_LENGTH;
    Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer2.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
      );
    }
    function typedArraySupport() {
      try {
        var arr = new Uint8Array(1);
        var proto = { foo: function() {
          return 42;
        } };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e4) {
        return false;
      }
    }
    Object.defineProperty(Buffer2.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer2.isBuffer(this)) return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer2.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer2.isBuffer(this)) return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length2) {
      if (length2 > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length2 + '" is invalid for option "size"');
      }
      var buf = new Uint8Array(length2);
      Object.setPrototypeOf(buf, Buffer2.prototype);
      return buf;
    }
    function Buffer2(arg, encodingOrOffset, length2) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        }
        return allocUnsafe2(arg);
      }
      return from8(arg, encodingOrOffset, length2);
    }
    Buffer2.poolSize = 8192;
    function from8(value, encodingOrOffset, length2) {
      if (typeof value === "string") {
        return fromString5(value, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value)) {
        return fromArrayView(value);
      }
      if (value == null) {
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length2);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length2);
      }
      if (typeof value === "number") {
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      }
      var valueOf = value.valueOf && value.valueOf();
      if (valueOf != null && valueOf !== value) {
        return Buffer2.from(valueOf, encodingOrOffset, length2);
      }
      var b5 = fromObject(value);
      if (b5) return b5;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer2.from(
          value[Symbol.toPrimitive]("string"),
          encodingOrOffset,
          length2
        );
      }
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
      );
    }
    Buffer2.from = function(value, encodingOrOffset, length2) {
      return from8(value, encodingOrOffset, length2);
    };
    Object.setPrototypeOf(Buffer2.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer2, Uint8Array);
    function assertSize3(size4) {
      if (typeof size4 !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size4 < 0) {
        throw new RangeError('The value "' + size4 + '" is invalid for option "size"');
      }
    }
    function alloc(size4, fill, encoding) {
      assertSize3(size4);
      if (size4 <= 0) {
        return createBuffer(size4);
      }
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(size4).fill(fill, encoding) : createBuffer(size4).fill(fill);
      }
      return createBuffer(size4);
    }
    Buffer2.alloc = function(size4, fill, encoding) {
      return alloc(size4, fill, encoding);
    };
    function allocUnsafe2(size4) {
      assertSize3(size4);
      return createBuffer(size4 < 0 ? 0 : checked(size4) | 0);
    }
    Buffer2.allocUnsafe = function(size4) {
      return allocUnsafe2(size4);
    };
    Buffer2.allocUnsafeSlow = function(size4) {
      return allocUnsafe2(size4);
    };
    function fromString5(string2, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer2.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      var length2 = byteLength(string2, encoding) | 0;
      var buf = createBuffer(length2);
      var actual = buf.write(string2, encoding);
      if (actual !== length2) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    function fromArrayLike(array) {
      var length2 = array.length < 0 ? 0 : checked(array.length) | 0;
      var buf = createBuffer(length2);
      for (var i6 = 0; i6 < length2; i6 += 1) {
        buf[i6] = array[i6] & 255;
      }
      return buf;
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        var copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    function fromArrayBuffer(array, byteOffset, length2) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array.byteLength < byteOffset + (length2 || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      var buf;
      if (byteOffset === void 0 && length2 === void 0) {
        buf = new Uint8Array(array);
      } else if (length2 === void 0) {
        buf = new Uint8Array(array, byteOffset);
      } else {
        buf = new Uint8Array(array, byteOffset, length2);
      }
      Object.setPrototypeOf(buf, Buffer2.prototype);
      return buf;
    }
    function fromObject(obj) {
      if (Buffer2.isBuffer(obj)) {
        var len = checked(obj.length) | 0;
        var buf = createBuffer(len);
        if (buf.length === 0) {
          return buf;
        }
        obj.copy(buf, 0, 0, len);
        return buf;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    function checked(length2) {
      if (length2 >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length2 | 0;
    }
    function SlowBuffer(length2) {
      if (+length2 != length2) {
        length2 = 0;
      }
      return Buffer2.alloc(+length2);
    }
    Buffer2.isBuffer = function isBuffer(b5) {
      return b5 != null && b5._isBuffer === true && b5 !== Buffer2.prototype;
    };
    Buffer2.compare = function compare2(a5, b5) {
      if (isInstance(a5, Uint8Array)) a5 = Buffer2.from(a5, a5.offset, a5.byteLength);
      if (isInstance(b5, Uint8Array)) b5 = Buffer2.from(b5, b5.offset, b5.byteLength);
      if (!Buffer2.isBuffer(a5) || !Buffer2.isBuffer(b5)) {
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      }
      if (a5 === b5) return 0;
      var x9 = a5.length;
      var y6 = b5.length;
      for (var i6 = 0, len = Math.min(x9, y6); i6 < len; ++i6) {
        if (a5[i6] !== b5[i6]) {
          x9 = a5[i6];
          y6 = b5[i6];
          break;
        }
      }
      if (x9 < y6) return -1;
      if (y6 < x9) return 1;
      return 0;
    };
    Buffer2.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer2.concat = function concat4(list, length2) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer2.alloc(0);
      }
      var i6;
      if (length2 === void 0) {
        length2 = 0;
        for (i6 = 0; i6 < list.length; ++i6) {
          length2 += list[i6].length;
        }
      }
      var buffer = Buffer2.allocUnsafe(length2);
      var pos = 0;
      for (i6 = 0; i6 < list.length; ++i6) {
        var buf = list[i6];
        if (isInstance(buf, Uint8Array)) {
          if (pos + buf.length > buffer.length) {
            Buffer2.from(buf).copy(buffer, pos);
          } else {
            Uint8Array.prototype.set.call(
              buffer,
              buf,
              pos
            );
          }
        } else if (!Buffer2.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer, pos);
        }
        pos += buf.length;
      }
      return buffer;
    };
    function byteLength(string2, encoding) {
      if (Buffer2.isBuffer(string2)) {
        return string2.length;
      }
      if (ArrayBuffer.isView(string2) || isInstance(string2, ArrayBuffer)) {
        return string2.byteLength;
      }
      if (typeof string2 !== "string") {
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string2
        );
      }
      var len = string2.length;
      var mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0) return 0;
      var loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
            return utf8ToBytes(string2).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string2).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes(string2).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer2.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      var loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding) encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer2.prototype._isBuffer = true;
    function swap(b5, n7, m5) {
      var i6 = b5[n7];
      b5[n7] = b5[m5];
      b5[m5] = i6;
    }
    Buffer2.prototype.swap16 = function swap16() {
      var len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (var i6 = 0; i6 < len; i6 += 2) {
        swap(this, i6, i6 + 1);
      }
      return this;
    };
    Buffer2.prototype.swap32 = function swap32() {
      var len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (var i6 = 0; i6 < len; i6 += 4) {
        swap(this, i6, i6 + 3);
        swap(this, i6 + 1, i6 + 2);
      }
      return this;
    };
    Buffer2.prototype.swap64 = function swap64() {
      var len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (var i6 = 0; i6 < len; i6 += 8) {
        swap(this, i6, i6 + 7);
        swap(this, i6 + 1, i6 + 6);
        swap(this, i6 + 2, i6 + 5);
        swap(this, i6 + 3, i6 + 4);
      }
      return this;
    };
    Buffer2.prototype.toString = function toString4() {
      var length2 = this.length;
      if (length2 === 0) return "";
      if (arguments.length === 0) return utf8Slice(this, 0, length2);
      return slowToString.apply(this, arguments);
    };
    Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
    Buffer2.prototype.equals = function equals4(b5) {
      if (!Buffer2.isBuffer(b5)) throw new TypeError("Argument must be a Buffer");
      if (this === b5) return true;
      return Buffer2.compare(this, b5) === 0;
    };
    Buffer2.prototype.inspect = function inspect() {
      var str = "";
      var max = exports.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max) str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect;
    }
    Buffer2.prototype.compare = function compare2(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer2.from(target, target.offset, target.byteLength);
      }
      if (!Buffer2.isBuffer(target)) {
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
        );
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target) return 0;
      var x9 = thisEnd - thisStart;
      var y6 = end - start;
      var len = Math.min(x9, y6);
      var thisCopy = this.slice(thisStart, thisEnd);
      var targetCopy = target.slice(start, end);
      for (var i6 = 0; i6 < len; ++i6) {
        if (thisCopy[i6] !== targetCopy[i6]) {
          x9 = thisCopy[i6];
          y6 = targetCopy[i6];
          break;
        }
      }
      if (x9 < y6) return -1;
      if (y6 < x9) return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
      if (buffer.length === 0) return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer.length - 1;
      }
      if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
      if (byteOffset >= buffer.length) {
        if (dir) return -1;
        else byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;
        else return -1;
      }
      if (typeof val === "string") {
        val = Buffer2.from(val, encoding);
      }
      if (Buffer2.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      var indexSize = 1;
      var arrLength = arr.length;
      var valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read2(buf, i7) {
        if (indexSize === 1) {
          return buf[i7];
        } else {
          return buf.readUInt16BE(i7 * indexSize);
        }
      }
      var i6;
      if (dir) {
        var foundIndex = -1;
        for (i6 = byteOffset; i6 < arrLength; i6++) {
          if (read2(arr, i6) === read2(val, foundIndex === -1 ? 0 : i6 - foundIndex)) {
            if (foundIndex === -1) foundIndex = i6;
            if (i6 - foundIndex + 1 === valLength) return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1) i6 -= i6 - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
        for (i6 = byteOffset; i6 >= 0; i6--) {
          var found = true;
          for (var j6 = 0; j6 < valLength; j6++) {
            if (read2(arr, i6 + j6) !== read2(val, j6)) {
              found = false;
              break;
            }
          }
          if (found) return i6;
        }
      }
      return -1;
    }
    Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string2, offset, length2) {
      offset = Number(offset) || 0;
      var remaining = buf.length - offset;
      if (!length2) {
        length2 = remaining;
      } else {
        length2 = Number(length2);
        if (length2 > remaining) {
          length2 = remaining;
        }
      }
      var strLen = string2.length;
      if (length2 > strLen / 2) {
        length2 = strLen / 2;
      }
      for (var i6 = 0; i6 < length2; ++i6) {
        var parsed = parseInt(string2.substr(i6 * 2, 2), 16);
        if (numberIsNaN(parsed)) return i6;
        buf[offset + i6] = parsed;
      }
      return i6;
    }
    function utf8Write(buf, string2, offset, length2) {
      return blitBuffer(utf8ToBytes(string2, buf.length - offset), buf, offset, length2);
    }
    function asciiWrite(buf, string2, offset, length2) {
      return blitBuffer(asciiToBytes(string2), buf, offset, length2);
    }
    function base64Write(buf, string2, offset, length2) {
      return blitBuffer(base64ToBytes(string2), buf, offset, length2);
    }
    function ucs2Write(buf, string2, offset, length2) {
      return blitBuffer(utf16leToBytes(string2, buf.length - offset), buf, offset, length2);
    }
    Buffer2.prototype.write = function write(string2, offset, length2, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length2 = this.length;
        offset = 0;
      } else if (length2 === void 0 && typeof offset === "string") {
        encoding = offset;
        length2 = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length2)) {
          length2 = length2 >>> 0;
          if (encoding === void 0) encoding = "utf8";
        } else {
          encoding = length2;
          length2 = void 0;
        }
      } else {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      }
      var remaining = this.length - offset;
      if (length2 === void 0 || length2 > remaining) length2 = remaining;
      if (string2.length > 0 && (length2 < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding) encoding = "utf8";
      var loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string2, offset, length2);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string2, offset, length2);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string2, offset, length2);
          case "base64":
            return base64Write(this, string2, offset, length2);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string2, offset, length2);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer2.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base642.fromByteArray(buf);
      } else {
        return base642.fromByteArray(buf.slice(start, end));
      }
    }
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      var res = [];
      var i6 = start;
      while (i6 < end) {
        var firstByte = buf[i6];
        var codePoint = null;
        var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i6 + bytesPerSequence <= end) {
          var secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i6 + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i6 + 1];
              thirdByte = buf[i6 + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i6 + 1];
              thirdByte = buf[i6 + 2];
              fourthByte = buf[i6 + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i6 += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    var MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      var len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      var res = "";
      var i6 = 0;
      while (i6 < len) {
        res += String.fromCharCode.apply(
          String,
          codePoints.slice(i6, i6 += MAX_ARGUMENTS_LENGTH)
        );
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      var ret = "";
      end = Math.min(buf.length, end);
      for (var i6 = start; i6 < end; ++i6) {
        ret += String.fromCharCode(buf[i6] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      var ret = "";
      end = Math.min(buf.length, end);
      for (var i6 = start; i6 < end; ++i6) {
        ret += String.fromCharCode(buf[i6]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      var len = buf.length;
      if (!start || start < 0) start = 0;
      if (!end || end < 0 || end > len) end = len;
      var out = "";
      for (var i6 = start; i6 < end; ++i6) {
        out += hexSliceLookupTable[buf[i6]];
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      var bytes = buf.slice(start, end);
      var res = "";
      for (var i6 = 0; i6 < bytes.length - 1; i6 += 2) {
        res += String.fromCharCode(bytes[i6] + bytes[i6 + 1] * 256);
      }
      return res;
    }
    Buffer2.prototype.slice = function slice4(start, end) {
      var len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0) start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0) end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start) end = start;
      var newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer2.prototype);
      return newBuf;
    };
    function checkOffset(offset, ext, length2) {
      if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
      if (offset + ext > length2) throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      var val = this[offset];
      var mul = 1;
      var i6 = 0;
      while (++i6 < byteLength2 && (mul *= 256)) {
        val += this[offset + i6] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      var val = this[offset + --byteLength2];
      var mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      var val = this[offset];
      var mul = 1;
      var i6 = 0;
      while (++i6 < byteLength2 && (mul *= 256)) {
        val += this[offset + i6] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      var i6 = byteLength2;
      var mul = 1;
      var val = this[offset + --i6];
      while (i6 > 0 && (mul *= 256)) {
        val += this[offset + --i6] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128)) return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      var val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      var val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    };
    Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    };
    Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    };
    Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, false, 52, 8);
    };
    function checkInt(buf, value, offset, ext, max, min) {
      if (!Buffer2.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length) throw new RangeError("Index out of range");
    }
    Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      var mul = 1;
      var i6 = 0;
      this[offset] = value & 255;
      while (++i6 < byteLength2 && (mul *= 256)) {
        this[offset + i6] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      var i6 = byteLength2 - 1;
      var mul = 1;
      this[offset + i6] = value & 255;
      while (--i6 >= 0 && (mul *= 256)) {
        this[offset + i6] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 255;
      return offset + 4;
    };
    Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      var i6 = 0;
      var mul = 1;
      var sub = 0;
      this[offset] = value & 255;
      while (++i6 < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i6 - 1] !== 0) {
          sub = 1;
        }
        this[offset + i6] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      var i6 = byteLength2 - 1;
      var mul = 1;
      var sub = 0;
      this[offset + i6] = value & 255;
      while (--i6 >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i6 + 1] !== 0) {
          sub = 1;
        }
        this[offset + i6] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
      if (value < 0) value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
      return offset + 4;
    };
    Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0) value = 4294967295 + value + 1;
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    function checkIEEE754(buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length) throw new RangeError("Index out of range");
      if (offset < 0) throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
      }
      ieee754.write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
      }
      ieee754.write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer2.isBuffer(target)) throw new TypeError("argument should be a Buffer");
      if (!start) start = 0;
      if (!end && end !== 0) end = this.length;
      if (targetStart >= target.length) targetStart = target.length;
      if (!targetStart) targetStart = 0;
      if (end > 0 && end < start) end = start;
      if (end === start) return 0;
      if (target.length === 0 || this.length === 0) return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
      if (end < 0) throw new RangeError("sourceEnd out of bounds");
      if (end > this.length) end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      var len = end - start;
      if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, end),
          targetStart
        );
      }
      return len;
    };
    Buffer2.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          var code2 = val.charCodeAt(0);
          if (encoding === "utf8" && code2 < 128 || encoding === "latin1") {
            val = code2;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val) val = 0;
      var i6;
      if (typeof val === "number") {
        for (i6 = start; i6 < end; ++i6) {
          this[i6] = val;
        }
      } else {
        var bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
        var len = bytes.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i6 = 0; i6 < end - start; ++i6) {
          this[i6 + start] = bytes[i6 % len];
        }
      }
      return this;
    };
    var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2) return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function utf8ToBytes(string2, units) {
      units = units || Infinity;
      var codePoint;
      var length2 = string2.length;
      var leadSurrogate = null;
      var bytes = [];
      for (var i6 = 0; i6 < length2; ++i6) {
        codePoint = string2.charCodeAt(i6);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            } else if (i6 + 1 === length2) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0) break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0) break;
          bytes.push(
            codePoint >> 6 | 192,
            codePoint & 63 | 128
          );
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0) break;
          bytes.push(
            codePoint >> 12 | 224,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0) break;
          bytes.push(
            codePoint >> 18 | 240,
            codePoint >> 12 & 63 | 128,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    function asciiToBytes(str) {
      var byteArray = [];
      for (var i6 = 0; i6 < str.length; ++i6) {
        byteArray.push(str.charCodeAt(i6) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      var c8, hi3, lo3;
      var byteArray = [];
      for (var i6 = 0; i6 < str.length; ++i6) {
        if ((units -= 2) < 0) break;
        c8 = str.charCodeAt(i6);
        hi3 = c8 >> 8;
        lo3 = c8 % 256;
        byteArray.push(lo3);
        byteArray.push(hi3);
      }
      return byteArray;
    }
    function base64ToBytes(str) {
      return base642.toByteArray(base64clean(str));
    }
    function blitBuffer(src2, dst, offset, length2) {
      for (var i6 = 0; i6 < length2; ++i6) {
        if (i6 + offset >= dst.length || i6 >= src2.length) break;
        dst[i6 + offset] = src2[i6];
      }
      return i6;
    }
    function isInstance(obj, type) {
      return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
    }
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    var hexSliceLookupTable = function() {
      var alphabet2 = "0123456789abcdef";
      var table = new Array(256);
      for (var i6 = 0; i6 < 16; ++i6) {
        var i16 = i6 * 16;
        for (var j6 = 0; j6 < 16; ++j6) {
          table[i16 + j6] = alphabet2[i6] + alphabet2[j6];
        }
      }
      return table;
    }();
  }
});

// node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/reed-solomon-encoder.js
var require_reed_solomon_encoder = __commonJS({
  "node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/reed-solomon-encoder.js"(exports, module) {
    var BufferUtil = require_typedarray_buffer();
    var Polynomial = require_polynomial();
    var Buffer2 = require_buffer().Buffer;
    function ReedSolomonEncoder(degree) {
      this.genPoly = void 0;
      this.degree = degree;
      if (this.degree) this.initialize(this.degree);
    }
    ReedSolomonEncoder.prototype.initialize = function initialize(degree) {
      this.degree = degree;
      this.genPoly = Polynomial.generateECPolynomial(this.degree);
    };
    ReedSolomonEncoder.prototype.encode = function encode8(data) {
      if (!this.genPoly) {
        throw new Error("Encoder not initialized");
      }
      var pad4 = BufferUtil.alloc(this.degree);
      var paddedData = Buffer2.concat([data, pad4], data.length + this.degree);
      var remainder = Polynomial.mod(paddedData, this.genPoly);
      var start = this.degree - remainder.length;
      if (start > 0) {
        var buff = BufferUtil.alloc(this.degree);
        remainder.copy(buff, start);
        return buff;
      }
      return remainder;
    };
    module.exports = ReedSolomonEncoder;
  }
});

// node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/version-check.js
var require_version_check = __commonJS({
  "node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/version-check.js"(exports) {
    exports.isValid = function isValid(version3) {
      return !isNaN(version3) && version3 >= 1 && version3 <= 40;
    };
  }
});

// node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/regex.js
var require_regex = __commonJS({
  "node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/regex.js"(exports) {
    var numeric = "[0-9]+";
    var alphanumeric = "[A-Z $%*+\\-./:]+";
    var kanji = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
    kanji = kanji.replace(/u/g, "\\u");
    var byte = "(?:(?![A-Z0-9 $%*+\\-./:]|" + kanji + ")(?:.|[\r\n]))+";
    exports.KANJI = new RegExp(kanji, "g");
    exports.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g");
    exports.BYTE = new RegExp(byte, "g");
    exports.NUMERIC = new RegExp(numeric, "g");
    exports.ALPHANUMERIC = new RegExp(alphanumeric, "g");
    var TEST_KANJI = new RegExp("^" + kanji + "$");
    var TEST_NUMERIC = new RegExp("^" + numeric + "$");
    var TEST_ALPHANUMERIC = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
    exports.testKanji = function testKanji(str) {
      return TEST_KANJI.test(str);
    };
    exports.testNumeric = function testNumeric(str) {
      return TEST_NUMERIC.test(str);
    };
    exports.testAlphanumeric = function testAlphanumeric(str) {
      return TEST_ALPHANUMERIC.test(str);
    };
  }
});

// node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/mode.js
var require_mode = __commonJS({
  "node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/mode.js"(exports) {
    var VersionCheck = require_version_check();
    var Regex = require_regex();
    exports.NUMERIC = {
      id: "Numeric",
      bit: 1 << 0,
      ccBits: [10, 12, 14]
    };
    exports.ALPHANUMERIC = {
      id: "Alphanumeric",
      bit: 1 << 1,
      ccBits: [9, 11, 13]
    };
    exports.BYTE = {
      id: "Byte",
      bit: 1 << 2,
      ccBits: [8, 16, 16]
    };
    exports.KANJI = {
      id: "Kanji",
      bit: 1 << 3,
      ccBits: [8, 10, 12]
    };
    exports.MIXED = {
      bit: -1
    };
    exports.getCharCountIndicator = function getCharCountIndicator(mode, version3) {
      if (!mode.ccBits) throw new Error("Invalid mode: " + mode);
      if (!VersionCheck.isValid(version3)) {
        throw new Error("Invalid version: " + version3);
      }
      if (version3 >= 1 && version3 < 10) return mode.ccBits[0];
      else if (version3 < 27) return mode.ccBits[1];
      return mode.ccBits[2];
    };
    exports.getBestModeForData = function getBestModeForData(dataStr) {
      if (Regex.testNumeric(dataStr)) return exports.NUMERIC;
      else if (Regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC;
      else if (Regex.testKanji(dataStr)) return exports.KANJI;
      else return exports.BYTE;
    };
    exports.toString = function toString4(mode) {
      if (mode && mode.id) return mode.id;
      throw new Error("Invalid mode");
    };
    exports.isValid = function isValid(mode) {
      return mode && mode.bit && mode.ccBits;
    };
    function fromString5(string2) {
      if (typeof string2 !== "string") {
        throw new Error("Param is not a string");
      }
      var lcStr = string2.toLowerCase();
      switch (lcStr) {
        case "numeric":
          return exports.NUMERIC;
        case "alphanumeric":
          return exports.ALPHANUMERIC;
        case "kanji":
          return exports.KANJI;
        case "byte":
          return exports.BYTE;
        default:
          throw new Error("Unknown mode: " + string2);
      }
    }
    exports.from = function from8(value, defaultValue) {
      if (exports.isValid(value)) {
        return value;
      }
      try {
        return fromString5(value);
      } catch (e4) {
        return defaultValue;
      }
    };
  }
});

// node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/version.js
var require_version = __commonJS({
  "node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/version.js"(exports) {
    var Utils = require_utils();
    var ECCode = require_error_correction_code();
    var ECLevel = require_error_correction_level();
    var Mode = require_mode();
    var VersionCheck = require_version_check();
    var isArray = require_isarray();
    var G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
    var G18_BCH = Utils.getBCHDigit(G18);
    function getBestVersionForDataLength(mode, length2, errorCorrectionLevel) {
      for (var currentVersion = 1; currentVersion <= 40; currentVersion++) {
        if (length2 <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
          return currentVersion;
        }
      }
      return void 0;
    }
    function getReservedBitsCount(mode, version3) {
      return Mode.getCharCountIndicator(mode, version3) + 4;
    }
    function getTotalBitsFromDataArray(segments, version3) {
      var totalBits = 0;
      segments.forEach(function(data) {
        var reservedBits = getReservedBitsCount(data.mode, version3);
        totalBits += reservedBits + data.getBitsLength();
      });
      return totalBits;
    }
    function getBestVersionForMixedData(segments, errorCorrectionLevel) {
      for (var currentVersion = 1; currentVersion <= 40; currentVersion++) {
        var length2 = getTotalBitsFromDataArray(segments, currentVersion);
        if (length2 <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
          return currentVersion;
        }
      }
      return void 0;
    }
    exports.from = function from8(value, defaultValue) {
      if (VersionCheck.isValid(value)) {
        return parseInt(value, 10);
      }
      return defaultValue;
    };
    exports.getCapacity = function getCapacity(version3, errorCorrectionLevel, mode) {
      if (!VersionCheck.isValid(version3)) {
        throw new Error("Invalid QR Code version");
      }
      if (typeof mode === "undefined") mode = Mode.BYTE;
      var totalCodewords = Utils.getSymbolTotalCodewords(version3);
      var ecTotalCodewords = ECCode.getTotalCodewordsCount(version3, errorCorrectionLevel);
      var dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
      if (mode === Mode.MIXED) return dataTotalCodewordsBits;
      var usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version3);
      switch (mode) {
        case Mode.NUMERIC:
          return Math.floor(usableBits / 10 * 3);
        case Mode.ALPHANUMERIC:
          return Math.floor(usableBits / 11 * 2);
        case Mode.KANJI:
          return Math.floor(usableBits / 13);
        case Mode.BYTE:
        default:
          return Math.floor(usableBits / 8);
      }
    };
    exports.getBestVersionForData = function getBestVersionForData(data, errorCorrectionLevel) {
      var seg;
      var ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M);
      if (isArray(data)) {
        if (data.length > 1) {
          return getBestVersionForMixedData(data, ecl);
        }
        if (data.length === 0) {
          return 1;
        }
        seg = data[0];
      } else {
        seg = data;
      }
      return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);
    };
    exports.getEncodedBits = function getEncodedBits(version3) {
      if (!VersionCheck.isValid(version3) || version3 < 7) {
        throw new Error("Invalid QR Code version");
      }
      var d7 = version3 << 12;
      while (Utils.getBCHDigit(d7) - G18_BCH >= 0) {
        d7 ^= G18 << Utils.getBCHDigit(d7) - G18_BCH;
      }
      return version3 << 12 | d7;
    };
  }
});

// node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/format-info.js
var require_format_info = __commonJS({
  "node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/format-info.js"(exports) {
    var Utils = require_utils();
    var G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
    var G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
    var G15_BCH = Utils.getBCHDigit(G15);
    exports.getEncodedBits = function getEncodedBits(errorCorrectionLevel, mask) {
      var data = errorCorrectionLevel.bit << 3 | mask;
      var d7 = data << 10;
      while (Utils.getBCHDigit(d7) - G15_BCH >= 0) {
        d7 ^= G15 << Utils.getBCHDigit(d7) - G15_BCH;
      }
      return (data << 10 | d7) ^ G15_MASK;
    };
  }
});

// node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/numeric-data.js
var require_numeric_data = __commonJS({
  "node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/numeric-data.js"(exports, module) {
    var Mode = require_mode();
    function NumericData(data) {
      this.mode = Mode.NUMERIC;
      this.data = data.toString();
    }
    NumericData.getBitsLength = function getBitsLength(length2) {
      return 10 * Math.floor(length2 / 3) + (length2 % 3 ? length2 % 3 * 3 + 1 : 0);
    };
    NumericData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    NumericData.prototype.getBitsLength = function getBitsLength() {
      return NumericData.getBitsLength(this.data.length);
    };
    NumericData.prototype.write = function write(bitBuffer) {
      var i6, group, value;
      for (i6 = 0; i6 + 3 <= this.data.length; i6 += 3) {
        group = this.data.substr(i6, 3);
        value = parseInt(group, 10);
        bitBuffer.put(value, 10);
      }
      var remainingNum = this.data.length - i6;
      if (remainingNum > 0) {
        group = this.data.substr(i6);
        value = parseInt(group, 10);
        bitBuffer.put(value, remainingNum * 3 + 1);
      }
    };
    module.exports = NumericData;
  }
});

// node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/alphanumeric-data.js
var require_alphanumeric_data = __commonJS({
  "node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/alphanumeric-data.js"(exports, module) {
    var Mode = require_mode();
    var ALPHA_NUM_CHARS = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      " ",
      "$",
      "%",
      "*",
      "+",
      "-",
      ".",
      "/",
      ":"
    ];
    function AlphanumericData(data) {
      this.mode = Mode.ALPHANUMERIC;
      this.data = data;
    }
    AlphanumericData.getBitsLength = function getBitsLength(length2) {
      return 11 * Math.floor(length2 / 2) + 6 * (length2 % 2);
    };
    AlphanumericData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    AlphanumericData.prototype.getBitsLength = function getBitsLength() {
      return AlphanumericData.getBitsLength(this.data.length);
    };
    AlphanumericData.prototype.write = function write(bitBuffer) {
      var i6;
      for (i6 = 0; i6 + 2 <= this.data.length; i6 += 2) {
        var value = ALPHA_NUM_CHARS.indexOf(this.data[i6]) * 45;
        value += ALPHA_NUM_CHARS.indexOf(this.data[i6 + 1]);
        bitBuffer.put(value, 11);
      }
      if (this.data.length % 2) {
        bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i6]), 6);
      }
    };
    module.exports = AlphanumericData;
  }
});

// node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/byte-data.js
var require_byte_data = __commonJS({
  "node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/byte-data.js"(exports, module) {
    var BufferUtil = require_typedarray_buffer();
    var Mode = require_mode();
    function ByteData(data) {
      this.mode = Mode.BYTE;
      this.data = BufferUtil.from(data);
    }
    ByteData.getBitsLength = function getBitsLength(length2) {
      return length2 * 8;
    };
    ByteData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    ByteData.prototype.getBitsLength = function getBitsLength() {
      return ByteData.getBitsLength(this.data.length);
    };
    ByteData.prototype.write = function(bitBuffer) {
      for (var i6 = 0, l9 = this.data.length; i6 < l9; i6++) {
        bitBuffer.put(this.data[i6], 8);
      }
    };
    module.exports = ByteData;
  }
});

// node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/kanji-data.js
var require_kanji_data = __commonJS({
  "node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/kanji-data.js"(exports, module) {
    var Mode = require_mode();
    var Utils = require_utils();
    function KanjiData(data) {
      this.mode = Mode.KANJI;
      this.data = data;
    }
    KanjiData.getBitsLength = function getBitsLength(length2) {
      return length2 * 13;
    };
    KanjiData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    KanjiData.prototype.getBitsLength = function getBitsLength() {
      return KanjiData.getBitsLength(this.data.length);
    };
    KanjiData.prototype.write = function(bitBuffer) {
      var i6;
      for (i6 = 0; i6 < this.data.length; i6++) {
        var value = Utils.toSJIS(this.data[i6]);
        if (value >= 33088 && value <= 40956) {
          value -= 33088;
        } else if (value >= 57408 && value <= 60351) {
          value -= 49472;
        } else {
          throw new Error(
            "Invalid SJIS character: " + this.data[i6] + "\nMake sure your charset is UTF-8"
          );
        }
        value = (value >>> 8 & 255) * 192 + (value & 255);
        bitBuffer.put(value, 13);
      }
    };
    module.exports = KanjiData;
  }
});

// node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/segments.js
var require_segments = __commonJS({
  "node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/segments.js"(exports) {
    var Mode = require_mode();
    var NumericData = require_numeric_data();
    var AlphanumericData = require_alphanumeric_data();
    var ByteData = require_byte_data();
    var KanjiData = require_kanji_data();
    var Regex = require_regex();
    var Utils = require_utils();
    var dijkstra = require_dijkstra();
    function getStringByteLength(str) {
      return unescape(encodeURIComponent(str)).length;
    }
    function getSegments(regex, mode, str) {
      var segments = [];
      var result;
      while ((result = regex.exec(str)) !== null) {
        segments.push({
          data: result[0],
          index: result.index,
          mode,
          length: result[0].length
        });
      }
      return segments;
    }
    function getSegmentsFromString(dataStr) {
      var numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr);
      var alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr);
      var byteSegs;
      var kanjiSegs;
      if (Utils.isKanjiModeEnabled()) {
        byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr);
        kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr);
      } else {
        byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr);
        kanjiSegs = [];
      }
      var segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);
      return segs.sort(function(s1, s22) {
        return s1.index - s22.index;
      }).map(function(obj) {
        return {
          data: obj.data,
          mode: obj.mode,
          length: obj.length
        };
      });
    }
    function getSegmentBitsLength(length2, mode) {
      switch (mode) {
        case Mode.NUMERIC:
          return NumericData.getBitsLength(length2);
        case Mode.ALPHANUMERIC:
          return AlphanumericData.getBitsLength(length2);
        case Mode.KANJI:
          return KanjiData.getBitsLength(length2);
        case Mode.BYTE:
          return ByteData.getBitsLength(length2);
      }
    }
    function mergeSegments(segs) {
      return segs.reduce(function(acc, curr) {
        var prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
        if (prevSeg && prevSeg.mode === curr.mode) {
          acc[acc.length - 1].data += curr.data;
          return acc;
        }
        acc.push(curr);
        return acc;
      }, []);
    }
    function buildNodes(segs) {
      var nodes = [];
      for (var i6 = 0; i6 < segs.length; i6++) {
        var seg = segs[i6];
        switch (seg.mode) {
          case Mode.NUMERIC:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.ALPHANUMERIC, length: seg.length },
              { data: seg.data, mode: Mode.BYTE, length: seg.length }
            ]);
            break;
          case Mode.ALPHANUMERIC:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.BYTE, length: seg.length }
            ]);
            break;
          case Mode.KANJI:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
            ]);
            break;
          case Mode.BYTE:
            nodes.push([
              { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
            ]);
        }
      }
      return nodes;
    }
    function buildGraph(nodes, version3) {
      var table = {};
      var graph = { "start": {} };
      var prevNodeIds = ["start"];
      for (var i6 = 0; i6 < nodes.length; i6++) {
        var nodeGroup = nodes[i6];
        var currentNodeIds = [];
        for (var j6 = 0; j6 < nodeGroup.length; j6++) {
          var node = nodeGroup[j6];
          var key = "" + i6 + j6;
          currentNodeIds.push(key);
          table[key] = { node, lastCount: 0 };
          graph[key] = {};
          for (var n7 = 0; n7 < prevNodeIds.length; n7++) {
            var prevNodeId = prevNodeIds[n7];
            if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
              graph[prevNodeId][key] = getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) - getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);
              table[prevNodeId].lastCount += node.length;
            } else {
              if (table[prevNodeId]) table[prevNodeId].lastCount = node.length;
              graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) + 4 + Mode.getCharCountIndicator(node.mode, version3);
            }
          }
        }
        prevNodeIds = currentNodeIds;
      }
      for (n7 = 0; n7 < prevNodeIds.length; n7++) {
        graph[prevNodeIds[n7]]["end"] = 0;
      }
      return { map: graph, table };
    }
    function buildSingleSegment(data, modesHint) {
      var mode;
      var bestMode = Mode.getBestModeForData(data);
      mode = Mode.from(modesHint, bestMode);
      if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
        throw new Error('"' + data + '" cannot be encoded with mode ' + Mode.toString(mode) + ".\n Suggested mode is: " + Mode.toString(bestMode));
      }
      if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
        mode = Mode.BYTE;
      }
      switch (mode) {
        case Mode.NUMERIC:
          return new NumericData(data);
        case Mode.ALPHANUMERIC:
          return new AlphanumericData(data);
        case Mode.KANJI:
          return new KanjiData(data);
        case Mode.BYTE:
          return new ByteData(data);
      }
    }
    exports.fromArray = function fromArray2(array) {
      return array.reduce(function(acc, seg) {
        if (typeof seg === "string") {
          acc.push(buildSingleSegment(seg, null));
        } else if (seg.data) {
          acc.push(buildSingleSegment(seg.data, seg.mode));
        }
        return acc;
      }, []);
    };
    exports.fromString = function fromString5(data, version3) {
      var segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled());
      var nodes = buildNodes(segs);
      var graph = buildGraph(nodes, version3);
      var path = dijkstra.find_path(graph.map, "start", "end");
      var optimizedSegs = [];
      for (var i6 = 1; i6 < path.length - 1; i6++) {
        optimizedSegs.push(graph.table[path[i6]].node);
      }
      return exports.fromArray(mergeSegments(optimizedSegs));
    };
    exports.rawSplit = function rawSplit(data) {
      return exports.fromArray(
        getSegmentsFromString(data, Utils.isKanjiModeEnabled())
      );
    };
  }
});

// node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/qrcode.js
var require_qrcode = __commonJS({
  "node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/core/qrcode.js"(exports) {
    var BufferUtil = require_typedarray_buffer();
    var Utils = require_utils();
    var ECLevel = require_error_correction_level();
    var BitBuffer = require_bit_buffer();
    var BitMatrix = require_bit_matrix();
    var AlignmentPattern = require_alignment_pattern();
    var FinderPattern = require_finder_pattern();
    var MaskPattern = require_mask_pattern();
    var ECCode = require_error_correction_code();
    var ReedSolomonEncoder = require_reed_solomon_encoder();
    var Version = require_version();
    var FormatInfo = require_format_info();
    var Mode = require_mode();
    var Segments = require_segments();
    var isArray = require_isarray();
    function setupFinderPattern(matrix, version3) {
      var size4 = matrix.size;
      var pos = FinderPattern.getPositions(version3);
      for (var i6 = 0; i6 < pos.length; i6++) {
        var row = pos[i6][0];
        var col = pos[i6][1];
        for (var r5 = -1; r5 <= 7; r5++) {
          if (row + r5 <= -1 || size4 <= row + r5) continue;
          for (var c8 = -1; c8 <= 7; c8++) {
            if (col + c8 <= -1 || size4 <= col + c8) continue;
            if (r5 >= 0 && r5 <= 6 && (c8 === 0 || c8 === 6) || c8 >= 0 && c8 <= 6 && (r5 === 0 || r5 === 6) || r5 >= 2 && r5 <= 4 && c8 >= 2 && c8 <= 4) {
              matrix.set(row + r5, col + c8, true, true);
            } else {
              matrix.set(row + r5, col + c8, false, true);
            }
          }
        }
      }
    }
    function setupTimingPattern(matrix) {
      var size4 = matrix.size;
      for (var r5 = 8; r5 < size4 - 8; r5++) {
        var value = r5 % 2 === 0;
        matrix.set(r5, 6, value, true);
        matrix.set(6, r5, value, true);
      }
    }
    function setupAlignmentPattern(matrix, version3) {
      var pos = AlignmentPattern.getPositions(version3);
      for (var i6 = 0; i6 < pos.length; i6++) {
        var row = pos[i6][0];
        var col = pos[i6][1];
        for (var r5 = -2; r5 <= 2; r5++) {
          for (var c8 = -2; c8 <= 2; c8++) {
            if (r5 === -2 || r5 === 2 || c8 === -2 || c8 === 2 || r5 === 0 && c8 === 0) {
              matrix.set(row + r5, col + c8, true, true);
            } else {
              matrix.set(row + r5, col + c8, false, true);
            }
          }
        }
      }
    }
    function setupVersionInfo(matrix, version3) {
      var size4 = matrix.size;
      var bits = Version.getEncodedBits(version3);
      var row, col, mod;
      for (var i6 = 0; i6 < 18; i6++) {
        row = Math.floor(i6 / 3);
        col = i6 % 3 + size4 - 8 - 3;
        mod = (bits >> i6 & 1) === 1;
        matrix.set(row, col, mod, true);
        matrix.set(col, row, mod, true);
      }
    }
    function setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {
      var size4 = matrix.size;
      var bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
      var i6, mod;
      for (i6 = 0; i6 < 15; i6++) {
        mod = (bits >> i6 & 1) === 1;
        if (i6 < 6) {
          matrix.set(i6, 8, mod, true);
        } else if (i6 < 8) {
          matrix.set(i6 + 1, 8, mod, true);
        } else {
          matrix.set(size4 - 15 + i6, 8, mod, true);
        }
        if (i6 < 8) {
          matrix.set(8, size4 - i6 - 1, mod, true);
        } else if (i6 < 9) {
          matrix.set(8, 15 - i6 - 1 + 1, mod, true);
        } else {
          matrix.set(8, 15 - i6 - 1, mod, true);
        }
      }
      matrix.set(size4 - 8, 8, 1, true);
    }
    function setupData(matrix, data) {
      var size4 = matrix.size;
      var inc = -1;
      var row = size4 - 1;
      var bitIndex = 7;
      var byteIndex = 0;
      for (var col = size4 - 1; col > 0; col -= 2) {
        if (col === 6) col--;
        while (true) {
          for (var c8 = 0; c8 < 2; c8++) {
            if (!matrix.isReserved(row, col - c8)) {
              var dark = false;
              if (byteIndex < data.length) {
                dark = (data[byteIndex] >>> bitIndex & 1) === 1;
              }
              matrix.set(row, col - c8, dark);
              bitIndex--;
              if (bitIndex === -1) {
                byteIndex++;
                bitIndex = 7;
              }
            }
          }
          row += inc;
          if (row < 0 || size4 <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }
    }
    function createData(version3, errorCorrectionLevel, segments) {
      var buffer = new BitBuffer();
      segments.forEach(function(data) {
        buffer.put(data.mode.bit, 4);
        buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version3));
        data.write(buffer);
      });
      var totalCodewords = Utils.getSymbolTotalCodewords(version3);
      var ecTotalCodewords = ECCode.getTotalCodewordsCount(version3, errorCorrectionLevel);
      var dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
      if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
        buffer.put(0, 4);
      }
      while (buffer.getLengthInBits() % 8 !== 0) {
        buffer.putBit(0);
      }
      var remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
      for (var i6 = 0; i6 < remainingByte; i6++) {
        buffer.put(i6 % 2 ? 17 : 236, 8);
      }
      return createCodewords(buffer, version3, errorCorrectionLevel);
    }
    function createCodewords(bitBuffer, version3, errorCorrectionLevel) {
      var totalCodewords = Utils.getSymbolTotalCodewords(version3);
      var ecTotalCodewords = ECCode.getTotalCodewordsCount(version3, errorCorrectionLevel);
      var dataTotalCodewords = totalCodewords - ecTotalCodewords;
      var ecTotalBlocks = ECCode.getBlocksCount(version3, errorCorrectionLevel);
      var blocksInGroup2 = totalCodewords % ecTotalBlocks;
      var blocksInGroup1 = ecTotalBlocks - blocksInGroup2;
      var totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);
      var dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
      var dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;
      var ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;
      var rs2 = new ReedSolomonEncoder(ecCount);
      var offset = 0;
      var dcData = new Array(ecTotalBlocks);
      var ecData = new Array(ecTotalBlocks);
      var maxDataSize = 0;
      var buffer = BufferUtil.from(bitBuffer.buffer);
      for (var b5 = 0; b5 < ecTotalBlocks; b5++) {
        var dataSize = b5 < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;
        dcData[b5] = buffer.slice(offset, offset + dataSize);
        ecData[b5] = rs2.encode(dcData[b5]);
        offset += dataSize;
        maxDataSize = Math.max(maxDataSize, dataSize);
      }
      var data = BufferUtil.alloc(totalCodewords);
      var index = 0;
      var i6, r5;
      for (i6 = 0; i6 < maxDataSize; i6++) {
        for (r5 = 0; r5 < ecTotalBlocks; r5++) {
          if (i6 < dcData[r5].length) {
            data[index++] = dcData[r5][i6];
          }
        }
      }
      for (i6 = 0; i6 < ecCount; i6++) {
        for (r5 = 0; r5 < ecTotalBlocks; r5++) {
          data[index++] = ecData[r5][i6];
        }
      }
      return data;
    }
    function createSymbol(data, version3, errorCorrectionLevel, maskPattern) {
      var segments;
      if (isArray(data)) {
        segments = Segments.fromArray(data);
      } else if (typeof data === "string") {
        var estimatedVersion = version3;
        if (!estimatedVersion) {
          var rawSegments = Segments.rawSplit(data);
          estimatedVersion = Version.getBestVersionForData(
            rawSegments,
            errorCorrectionLevel
          );
        }
        segments = Segments.fromString(data, estimatedVersion || 40);
      } else {
        throw new Error("Invalid data");
      }
      var bestVersion = Version.getBestVersionForData(
        segments,
        errorCorrectionLevel
      );
      if (!bestVersion) {
        throw new Error("The amount of data is too big to be stored in a QR Code");
      }
      if (!version3) {
        version3 = bestVersion;
      } else if (version3 < bestVersion) {
        throw new Error(
          "\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " + bestVersion + ".\n"
        );
      }
      var dataBits = createData(version3, errorCorrectionLevel, segments);
      var moduleCount = Utils.getSymbolSize(version3);
      var modules = new BitMatrix(moduleCount);
      setupFinderPattern(modules, version3);
      setupTimingPattern(modules);
      setupAlignmentPattern(modules, version3);
      setupFormatInfo(modules, errorCorrectionLevel, 0);
      if (version3 >= 7) {
        setupVersionInfo(modules, version3);
      }
      setupData(modules, dataBits);
      if (isNaN(maskPattern)) {
        maskPattern = MaskPattern.getBestMask(
          modules,
          setupFormatInfo.bind(null, modules, errorCorrectionLevel)
        );
      }
      MaskPattern.applyMask(maskPattern, modules);
      setupFormatInfo(modules, errorCorrectionLevel, maskPattern);
      return {
        modules,
        version: version3,
        errorCorrectionLevel,
        maskPattern,
        segments
      };
    }
    exports.create = function create3(data, options) {
      if (typeof data === "undefined" || data === "") {
        throw new Error("No input text");
      }
      var errorCorrectionLevel = ECLevel.M;
      var version3;
      var mask;
      if (typeof options !== "undefined") {
        errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
        version3 = Version.from(options.version);
        mask = MaskPattern.from(options.maskPattern);
        if (options.toSJISFunc) {
          Utils.setToSJISFunction(options.toSJISFunc);
        }
      }
      return createSymbol(data, version3, errorCorrectionLevel, mask);
    };
  }
});

// node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/renderer/utils.js
var require_utils2 = __commonJS({
  "node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/renderer/utils.js"(exports) {
    function hex2rgba(hex) {
      if (typeof hex === "number") {
        hex = hex.toString();
      }
      if (typeof hex !== "string") {
        throw new Error("Color should be defined as hex string");
      }
      var hexCode = hex.slice().replace("#", "").split("");
      if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
        throw new Error("Invalid hex color: " + hex);
      }
      if (hexCode.length === 3 || hexCode.length === 4) {
        hexCode = Array.prototype.concat.apply([], hexCode.map(function(c8) {
          return [c8, c8];
        }));
      }
      if (hexCode.length === 6) hexCode.push("F", "F");
      var hexValue = parseInt(hexCode.join(""), 16);
      return {
        r: hexValue >> 24 & 255,
        g: hexValue >> 16 & 255,
        b: hexValue >> 8 & 255,
        a: hexValue & 255,
        hex: "#" + hexCode.slice(0, 6).join("")
      };
    }
    exports.getOptions = function getOptions(options) {
      if (!options) options = {};
      if (!options.color) options.color = {};
      var margin = typeof options.margin === "undefined" || options.margin === null || options.margin < 0 ? 4 : options.margin;
      var width = options.width && options.width >= 21 ? options.width : void 0;
      var scale = options.scale || 4;
      return {
        width,
        scale: width ? 4 : scale,
        margin,
        color: {
          dark: hex2rgba(options.color.dark || "#000000ff"),
          light: hex2rgba(options.color.light || "#ffffffff")
        },
        type: options.type,
        rendererOpts: options.rendererOpts || {}
      };
    };
    exports.getScale = function getScale(qrSize, opts) {
      return opts.width && opts.width >= qrSize + opts.margin * 2 ? opts.width / (qrSize + opts.margin * 2) : opts.scale;
    };
    exports.getImageWidth = function getImageWidth(qrSize, opts) {
      var scale = exports.getScale(qrSize, opts);
      return Math.floor((qrSize + opts.margin * 2) * scale);
    };
    exports.qrToImageData = function qrToImageData(imgData, qr3, opts) {
      var size4 = qr3.modules.size;
      var data = qr3.modules.data;
      var scale = exports.getScale(size4, opts);
      var symbolSize = Math.floor((size4 + opts.margin * 2) * scale);
      var scaledMargin = opts.margin * scale;
      var palette = [opts.color.light, opts.color.dark];
      for (var i6 = 0; i6 < symbolSize; i6++) {
        for (var j6 = 0; j6 < symbolSize; j6++) {
          var posDst = (i6 * symbolSize + j6) * 4;
          var pxColor = opts.color.light;
          if (i6 >= scaledMargin && j6 >= scaledMargin && i6 < symbolSize - scaledMargin && j6 < symbolSize - scaledMargin) {
            var iSrc = Math.floor((i6 - scaledMargin) / scale);
            var jSrc = Math.floor((j6 - scaledMargin) / scale);
            pxColor = palette[data[iSrc * size4 + jSrc] ? 1 : 0];
          }
          imgData[posDst++] = pxColor.r;
          imgData[posDst++] = pxColor.g;
          imgData[posDst++] = pxColor.b;
          imgData[posDst] = pxColor.a;
        }
      }
    };
  }
});

// node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/renderer/canvas.js
var require_canvas = __commonJS({
  "node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/renderer/canvas.js"(exports) {
    var Utils = require_utils2();
    function clearCanvas(ctx, canvas, size4) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!canvas.style) canvas.style = {};
      canvas.height = size4;
      canvas.width = size4;
      canvas.style.height = size4 + "px";
      canvas.style.width = size4 + "px";
    }
    function getCanvasElement() {
      try {
        return document.createElement("canvas");
      } catch (e4) {
        throw new Error("You need to specify a canvas element");
      }
    }
    exports.render = function render(qrData, canvas, options) {
      var opts = options;
      var canvasEl = canvas;
      if (typeof opts === "undefined" && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = void 0;
      }
      if (!canvas) {
        canvasEl = getCanvasElement();
      }
      opts = Utils.getOptions(opts);
      var size4 = Utils.getImageWidth(qrData.modules.size, opts);
      var ctx = canvasEl.getContext("2d");
      var image = ctx.createImageData(size4, size4);
      Utils.qrToImageData(image.data, qrData, opts);
      clearCanvas(ctx, canvasEl, size4);
      ctx.putImageData(image, 0, 0);
      return canvasEl;
    };
    exports.renderToDataURL = function renderToDataURL(qrData, canvas, options) {
      var opts = options;
      if (typeof opts === "undefined" && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = void 0;
      }
      if (!opts) opts = {};
      var canvasEl = exports.render(qrData, canvas, opts);
      var type = opts.type || "image/png";
      var rendererOpts = opts.rendererOpts || {};
      return canvasEl.toDataURL(type, rendererOpts.quality);
    };
  }
});

// node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/renderer/svg-tag.js
var require_svg_tag = __commonJS({
  "node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/renderer/svg-tag.js"(exports) {
    var Utils = require_utils2();
    function getColorAttrib(color, attrib) {
      var alpha = color.a / 255;
      var str = attrib + '="' + color.hex + '"';
      return alpha < 1 ? str + " " + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"' : str;
    }
    function svgCmd(cmd, x9, y6) {
      var str = cmd + x9;
      if (typeof y6 !== "undefined") str += " " + y6;
      return str;
    }
    function qrToPath(data, size4, margin) {
      var path = "";
      var moveBy = 0;
      var newRow = false;
      var lineLength = 0;
      for (var i6 = 0; i6 < data.length; i6++) {
        var col = Math.floor(i6 % size4);
        var row = Math.floor(i6 / size4);
        if (!col && !newRow) newRow = true;
        if (data[i6]) {
          lineLength++;
          if (!(i6 > 0 && col > 0 && data[i6 - 1])) {
            path += newRow ? svgCmd("M", col + margin, 0.5 + row + margin) : svgCmd("m", moveBy, 0);
            moveBy = 0;
            newRow = false;
          }
          if (!(col + 1 < size4 && data[i6 + 1])) {
            path += svgCmd("h", lineLength);
            lineLength = 0;
          }
        } else {
          moveBy++;
        }
      }
      return path;
    }
    exports.render = function render(qrData, options, cb) {
      var opts = Utils.getOptions(options);
      var size4 = qrData.modules.size;
      var data = qrData.modules.data;
      var qrcodesize = size4 + opts.margin * 2;
      var bg = !opts.color.light.a ? "" : "<path " + getColorAttrib(opts.color.light, "fill") + ' d="M0 0h' + qrcodesize + "v" + qrcodesize + 'H0z"/>';
      var path = "<path " + getColorAttrib(opts.color.dark, "stroke") + ' d="' + qrToPath(data, size4, opts.margin) + '"/>';
      var viewBox = 'viewBox="0 0 ' + qrcodesize + " " + qrcodesize + '"';
      var width = !opts.width ? "" : 'width="' + opts.width + '" height="' + opts.width + '" ';
      var svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + "</svg>\n";
      if (typeof cb === "function") {
        cb(null, svgTag);
      }
      return svgTag;
    };
  }
});

// node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/browser.js
var require_browser = __commonJS({
  "node_modules/@walletconnect/qrcode-modal/node_modules/qrcode/lib/browser.js"(exports) {
    var canPromise = require_can_promise();
    var QRCode = require_qrcode();
    var CanvasRenderer = require_canvas();
    var SvgRenderer = require_svg_tag();
    function renderCanvas(renderFunc, canvas, text, opts, cb) {
      var args = [].slice.call(arguments, 1);
      var argsNum = args.length;
      var isLastArgCb = typeof args[argsNum - 1] === "function";
      if (!isLastArgCb && !canPromise()) {
        throw new Error("Callback required as last argument");
      }
      if (isLastArgCb) {
        if (argsNum < 2) {
          throw new Error("Too few arguments provided");
        }
        if (argsNum === 2) {
          cb = text;
          text = canvas;
          canvas = opts = void 0;
        } else if (argsNum === 3) {
          if (canvas.getContext && typeof cb === "undefined") {
            cb = opts;
            opts = void 0;
          } else {
            cb = opts;
            opts = text;
            text = canvas;
            canvas = void 0;
          }
        }
      } else {
        if (argsNum < 1) {
          throw new Error("Too few arguments provided");
        }
        if (argsNum === 1) {
          text = canvas;
          canvas = opts = void 0;
        } else if (argsNum === 2 && !canvas.getContext) {
          opts = text;
          text = canvas;
          canvas = void 0;
        }
        return new Promise(function(resolve, reject) {
          try {
            var data2 = QRCode.create(text, opts);
            resolve(renderFunc(data2, canvas, opts));
          } catch (e4) {
            reject(e4);
          }
        });
      }
      try {
        var data = QRCode.create(text, opts);
        cb(null, renderFunc(data, canvas, opts));
      } catch (e4) {
        cb(e4);
      }
    }
    exports.create = QRCode.create;
    exports.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
    exports.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL);
    exports.toString = renderCanvas.bind(null, function(data, _8, opts) {
      return SvgRenderer.render(data, opts);
    });
  }
});

// node_modules/toggle-selection/index.js
var require_toggle_selection = __commonJS({
  "node_modules/toggle-selection/index.js"(exports, module) {
    module.exports = function() {
      var selection = document.getSelection();
      if (!selection.rangeCount) {
        return function() {
        };
      }
      var active = document.activeElement;
      var ranges = [];
      for (var i6 = 0; i6 < selection.rangeCount; i6++) {
        ranges.push(selection.getRangeAt(i6));
      }
      switch (active.tagName.toUpperCase()) {
        case "INPUT":
        case "TEXTAREA":
          active.blur();
          break;
        default:
          active = null;
          break;
      }
      selection.removeAllRanges();
      return function() {
        selection.type === "Caret" && selection.removeAllRanges();
        if (!selection.rangeCount) {
          ranges.forEach(function(range) {
            selection.addRange(range);
          });
        }
        active && active.focus();
      };
    };
  }
});

// node_modules/copy-to-clipboard/index.js
var require_copy_to_clipboard = __commonJS({
  "node_modules/copy-to-clipboard/index.js"(exports, module) {
    "use strict";
    var deselectCurrent = require_toggle_selection();
    var clipboardToIE11Formatting = {
      "text/plain": "Text",
      "text/html": "Url",
      "default": "Text"
    };
    var defaultMessage = "Copy to clipboard: #{key}, Enter";
    function format(message) {
      var copyKey = (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C";
      return message.replace(/#{\s*key\s*}/g, copyKey);
    }
    function copy(text, options) {
      var debug, message, reselectPrevious, range, selection, mark, success = false;
      if (!options) {
        options = {};
      }
      debug = options.debug || false;
      try {
        reselectPrevious = deselectCurrent();
        range = document.createRange();
        selection = document.getSelection();
        mark = document.createElement("span");
        mark.textContent = text;
        mark.ariaHidden = "true";
        mark.style.all = "unset";
        mark.style.position = "fixed";
        mark.style.top = 0;
        mark.style.clip = "rect(0, 0, 0, 0)";
        mark.style.whiteSpace = "pre";
        mark.style.webkitUserSelect = "text";
        mark.style.MozUserSelect = "text";
        mark.style.msUserSelect = "text";
        mark.style.userSelect = "text";
        mark.addEventListener("copy", function(e4) {
          e4.stopPropagation();
          if (options.format) {
            e4.preventDefault();
            if (typeof e4.clipboardData === "undefined") {
              debug && console.warn("unable to use e.clipboardData");
              debug && console.warn("trying IE specific stuff");
              window.clipboardData.clearData();
              var format2 = clipboardToIE11Formatting[options.format] || clipboardToIE11Formatting["default"];
              window.clipboardData.setData(format2, text);
            } else {
              e4.clipboardData.clearData();
              e4.clipboardData.setData(options.format, text);
            }
          }
          if (options.onCopy) {
            e4.preventDefault();
            options.onCopy(e4.clipboardData);
          }
        });
        document.body.appendChild(mark);
        range.selectNodeContents(mark);
        selection.addRange(range);
        var successful = document.execCommand("copy");
        if (!successful) {
          throw new Error("copy command was unsuccessful");
        }
        success = true;
      } catch (err) {
        debug && console.error("unable to copy using execCommand: ", err);
        debug && console.warn("trying IE specific stuff");
        try {
          window.clipboardData.setData(options.format || "text", text);
          options.onCopy && options.onCopy(window.clipboardData);
          success = true;
        } catch (err2) {
          debug && console.error("unable to copy using clipboardData: ", err2);
          debug && console.error("falling back to prompt");
          message = format("message" in options ? options.message : defaultMessage);
          window.prompt(message, text);
        }
      } finally {
        if (selection) {
          if (typeof selection.removeRange == "function") {
            selection.removeRange(range);
          } else {
            selection.removeAllRanges();
          }
        }
        if (mark) {
          document.body.removeChild(mark);
        }
        reselectPrevious();
      }
      return success;
    }
    module.exports = copy;
  }
});

// node_modules/preact/dist/preact.module.js
function a(n7, l9) {
  for (var u4 in l9) n7[u4] = l9[u4];
  return n7;
}
function v(n7) {
  var l9 = n7.parentNode;
  l9 && l9.removeChild(n7);
}
function h(n7, l9, u4) {
  var i6, t3 = arguments, r5 = {};
  for (i6 in l9) "key" !== i6 && "ref" !== i6 && (r5[i6] = l9[i6]);
  if (arguments.length > 3) for (u4 = [u4], i6 = 3; i6 < arguments.length; i6++) u4.push(t3[i6]);
  if (null != u4 && (r5.children = u4), "function" == typeof n7 && null != n7.defaultProps) for (i6 in n7.defaultProps) void 0 === r5[i6] && (r5[i6] = n7.defaultProps[i6]);
  return p(n7, r5, l9 && l9.key, l9 && l9.ref, null);
}
function p(l9, u4, i6, t3, r5) {
  var o6 = { type: l9, props: u4, key: i6, ref: t3, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: r5 };
  return null == r5 && (o6.__v = o6), n.vnode && n.vnode(o6), o6;
}
function y() {
  return {};
}
function d(n7) {
  return n7.children;
}
function m(n7, l9) {
  this.props = n7, this.context = l9;
}
function w(n7, l9) {
  if (null == l9) return n7.__ ? w(n7.__, n7.__.__k.indexOf(n7) + 1) : null;
  for (var u4; l9 < n7.__k.length; l9++) if (null != (u4 = n7.__k[l9]) && null != u4.__e) return u4.__e;
  return "function" == typeof n7.type ? w(n7) : null;
}
function k(n7) {
  var l9, u4;
  if (null != (n7 = n7.__) && null != n7.__c) {
    for (n7.__e = n7.__c.base = null, l9 = 0; l9 < n7.__k.length; l9++) if (null != (u4 = n7.__k[l9]) && null != u4.__e) {
      n7.__e = n7.__c.base = u4.__e;
      break;
    }
    return k(n7);
  }
}
function g(l9) {
  (!l9.__d && (l9.__d = true) && u.push(l9) && !i++ || r !== n.debounceRendering) && ((r = n.debounceRendering) || t)(_);
}
function _() {
  for (var n7; i = u.length; ) n7 = u.sort(function(n8, l9) {
    return n8.__v.__b - l9.__v.__b;
  }), u = [], n7.some(function(n8) {
    var l9, u4, i6, t3, r5, o6, f8;
    n8.__d && (o6 = (r5 = (l9 = n8).__v).__e, (f8 = l9.__P) && (u4 = [], (i6 = a({}, r5)).__v = i6, t3 = A(f8, r5, i6, l9.__n, void 0 !== f8.ownerSVGElement, null, u4, null == o6 ? w(r5) : o6), T(u4, r5), t3 != o6 && k(r5)));
  });
}
function b(n7, l9, u4, i6, t3, r5, o6, f8, s5) {
  var a5, h7, p6, y6, d7, m5, k7, g5 = u4 && u4.__k || c, _8 = g5.length;
  if (f8 == e && (f8 = null != r5 ? r5[0] : _8 ? w(u4, 0) : null), a5 = 0, l9.__k = x(l9.__k, function(u5) {
    if (null != u5) {
      if (u5.__ = l9, u5.__b = l9.__b + 1, null === (p6 = g5[a5]) || p6 && u5.key == p6.key && u5.type === p6.type) g5[a5] = void 0;
      else for (h7 = 0; h7 < _8; h7++) {
        if ((p6 = g5[h7]) && u5.key == p6.key && u5.type === p6.type) {
          g5[h7] = void 0;
          break;
        }
        p6 = null;
      }
      if (y6 = A(n7, u5, p6 = p6 || e, i6, t3, r5, o6, f8, s5), (h7 = u5.ref) && p6.ref != h7 && (k7 || (k7 = []), p6.ref && k7.push(p6.ref, null, u5), k7.push(h7, u5.__c || y6, u5)), null != y6) {
        var c8;
        if (null == m5 && (m5 = y6), void 0 !== u5.__d) c8 = u5.__d, u5.__d = void 0;
        else if (r5 == p6 || y6 != f8 || null == y6.parentNode) {
          n: if (null == f8 || f8.parentNode !== n7) n7.appendChild(y6), c8 = null;
          else {
            for (d7 = f8, h7 = 0; (d7 = d7.nextSibling) && h7 < _8; h7 += 2) if (d7 == y6) break n;
            n7.insertBefore(y6, f8), c8 = f8;
          }
          "option" == l9.type && (n7.value = "");
        }
        f8 = void 0 !== c8 ? c8 : y6.nextSibling, "function" == typeof l9.type && (l9.__d = f8);
      } else f8 && p6.__e == f8 && f8.parentNode != n7 && (f8 = w(p6));
    }
    return a5++, u5;
  }), l9.__e = m5, null != r5 && "function" != typeof l9.type) for (a5 = r5.length; a5--; ) null != r5[a5] && v(r5[a5]);
  for (a5 = _8; a5--; ) null != g5[a5] && D(g5[a5], g5[a5]);
  if (k7) for (a5 = 0; a5 < k7.length; a5++) j(k7[a5], k7[++a5], k7[++a5]);
}
function x(n7, l9, u4) {
  if (null == u4 && (u4 = []), null == n7 || "boolean" == typeof n7) l9 && u4.push(l9(null));
  else if (Array.isArray(n7)) for (var i6 = 0; i6 < n7.length; i6++) x(n7[i6], l9, u4);
  else u4.push(l9 ? l9("string" == typeof n7 || "number" == typeof n7 ? p(null, n7, null, null, n7) : null != n7.__e || null != n7.__c ? p(n7.type, n7.props, n7.key, null, n7.__v) : n7) : n7);
  return u4;
}
function P(n7, l9, u4, i6, t3) {
  var r5;
  for (r5 in u4) "children" === r5 || "key" === r5 || r5 in l9 || N(n7, r5, null, u4[r5], i6);
  for (r5 in l9) t3 && "function" != typeof l9[r5] || "children" === r5 || "key" === r5 || "value" === r5 || "checked" === r5 || u4[r5] === l9[r5] || N(n7, r5, l9[r5], u4[r5], i6);
}
function C(n7, l9, u4) {
  "-" === l9[0] ? n7.setProperty(l9, u4) : n7[l9] = "number" == typeof u4 && false === s.test(l9) ? u4 + "px" : null == u4 ? "" : u4;
}
function N(n7, l9, u4, i6, t3) {
  var r5, o6, f8, e4, c8;
  if (t3 ? "className" === l9 && (l9 = "class") : "class" === l9 && (l9 = "className"), "style" === l9) if (r5 = n7.style, "string" == typeof u4) r5.cssText = u4;
  else {
    if ("string" == typeof i6 && (r5.cssText = "", i6 = null), i6) for (e4 in i6) u4 && e4 in u4 || C(r5, e4, "");
    if (u4) for (c8 in u4) i6 && u4[c8] === i6[c8] || C(r5, c8, u4[c8]);
  }
  else "o" === l9[0] && "n" === l9[1] ? (o6 = l9 !== (l9 = l9.replace(/Capture$/, "")), f8 = l9.toLowerCase(), l9 = (f8 in n7 ? f8 : l9).slice(2), u4 ? (i6 || n7.addEventListener(l9, z, o6), (n7.l || (n7.l = {}))[l9] = u4) : n7.removeEventListener(l9, z, o6)) : "list" !== l9 && "tagName" !== l9 && "form" !== l9 && "type" !== l9 && "size" !== l9 && !t3 && l9 in n7 ? n7[l9] = null == u4 ? "" : u4 : "function" != typeof u4 && "dangerouslySetInnerHTML" !== l9 && (l9 !== (l9 = l9.replace(/^xlink:?/, "")) ? null == u4 || false === u4 ? n7.removeAttributeNS("http://www.w3.org/1999/xlink", l9.toLowerCase()) : n7.setAttributeNS("http://www.w3.org/1999/xlink", l9.toLowerCase(), u4) : null == u4 || false === u4 && !/^ar/.test(l9) ? n7.removeAttribute(l9) : n7.setAttribute(l9, u4));
}
function z(l9) {
  this.l[l9.type](n.event ? n.event(l9) : l9);
}
function A(l9, u4, i6, t3, r5, o6, f8, e4, c8) {
  var s5, v7, h7, p6, y6, w6, k7, g5, _8, x9, P6 = u4.type;
  if (void 0 !== u4.constructor) return null;
  (s5 = n.__b) && s5(u4);
  try {
    n: if ("function" == typeof P6) {
      if (g5 = u4.props, _8 = (s5 = P6.contextType) && t3[s5.__c], x9 = s5 ? _8 ? _8.props.value : s5.__ : t3, i6.__c ? k7 = (v7 = u4.__c = i6.__c).__ = v7.__E : ("prototype" in P6 && P6.prototype.render ? u4.__c = v7 = new P6(g5, x9) : (u4.__c = v7 = new m(g5, x9), v7.constructor = P6, v7.render = E), _8 && _8.sub(v7), v7.props = g5, v7.state || (v7.state = {}), v7.context = x9, v7.__n = t3, h7 = v7.__d = true, v7.__h = []), null == v7.__s && (v7.__s = v7.state), null != P6.getDerivedStateFromProps && (v7.__s == v7.state && (v7.__s = a({}, v7.__s)), a(v7.__s, P6.getDerivedStateFromProps(g5, v7.__s))), p6 = v7.props, y6 = v7.state, h7) null == P6.getDerivedStateFromProps && null != v7.componentWillMount && v7.componentWillMount(), null != v7.componentDidMount && v7.__h.push(v7.componentDidMount);
      else {
        if (null == P6.getDerivedStateFromProps && g5 !== p6 && null != v7.componentWillReceiveProps && v7.componentWillReceiveProps(g5, x9), !v7.__e && null != v7.shouldComponentUpdate && false === v7.shouldComponentUpdate(g5, v7.__s, x9) || u4.__v === i6.__v && !v7.__) {
          for (v7.props = g5, v7.state = v7.__s, u4.__v !== i6.__v && (v7.__d = false), v7.__v = u4, u4.__e = i6.__e, u4.__k = i6.__k, v7.__h.length && f8.push(v7), s5 = 0; s5 < u4.__k.length; s5++) u4.__k[s5] && (u4.__k[s5].__ = u4);
          break n;
        }
        null != v7.componentWillUpdate && v7.componentWillUpdate(g5, v7.__s, x9), null != v7.componentDidUpdate && v7.__h.push(function() {
          v7.componentDidUpdate(p6, y6, w6);
        });
      }
      v7.context = x9, v7.props = g5, v7.state = v7.__s, (s5 = n.__r) && s5(u4), v7.__d = false, v7.__v = u4, v7.__P = l9, s5 = v7.render(v7.props, v7.state, v7.context), u4.__k = null != s5 && s5.type == d && null == s5.key ? s5.props.children : Array.isArray(s5) ? s5 : [s5], null != v7.getChildContext && (t3 = a(a({}, t3), v7.getChildContext())), h7 || null == v7.getSnapshotBeforeUpdate || (w6 = v7.getSnapshotBeforeUpdate(p6, y6)), b(l9, u4, i6, t3, r5, o6, f8, e4, c8), v7.base = u4.__e, v7.__h.length && f8.push(v7), k7 && (v7.__E = v7.__ = null), v7.__e = false;
    } else null == o6 && u4.__v === i6.__v ? (u4.__k = i6.__k, u4.__e = i6.__e) : u4.__e = $(i6.__e, u4, i6, t3, r5, o6, f8, c8);
    (s5 = n.diffed) && s5(u4);
  } catch (l10) {
    u4.__v = null, n.__e(l10, u4, i6);
  }
  return u4.__e;
}
function T(l9, u4) {
  n.__c && n.__c(u4, l9), l9.some(function(u5) {
    try {
      l9 = u5.__h, u5.__h = [], l9.some(function(n7) {
        n7.call(u5);
      });
    } catch (l10) {
      n.__e(l10, u5.__v);
    }
  });
}
function $(n7, l9, u4, i6, t3, r5, o6, f8) {
  var s5, a5, v7, h7, p6, y6 = u4.props, d7 = l9.props;
  if (t3 = "svg" === l9.type || t3, null != r5) {
    for (s5 = 0; s5 < r5.length; s5++) if (null != (a5 = r5[s5]) && ((null === l9.type ? 3 === a5.nodeType : a5.localName === l9.type) || n7 == a5)) {
      n7 = a5, r5[s5] = null;
      break;
    }
  }
  if (null == n7) {
    if (null === l9.type) return document.createTextNode(d7);
    n7 = t3 ? document.createElementNS("http://www.w3.org/2000/svg", l9.type) : document.createElement(l9.type, d7.is && { is: d7.is }), r5 = null, f8 = false;
  }
  if (null === l9.type) y6 !== d7 && n7.data != d7 && (n7.data = d7);
  else {
    if (null != r5 && (r5 = c.slice.call(n7.childNodes)), v7 = (y6 = u4.props || e).dangerouslySetInnerHTML, h7 = d7.dangerouslySetInnerHTML, !f8) {
      if (y6 === e) for (y6 = {}, p6 = 0; p6 < n7.attributes.length; p6++) y6[n7.attributes[p6].name] = n7.attributes[p6].value;
      (h7 || v7) && (h7 && v7 && h7.__html == v7.__html || (n7.innerHTML = h7 && h7.__html || ""));
    }
    P(n7, d7, y6, t3, f8), h7 ? l9.__k = [] : (l9.__k = l9.props.children, b(n7, l9, u4, i6, "foreignObject" !== l9.type && t3, r5, o6, e, f8)), f8 || ("value" in d7 && void 0 !== (s5 = d7.value) && s5 !== n7.value && N(n7, "value", s5, y6.value, false), "checked" in d7 && void 0 !== (s5 = d7.checked) && s5 !== n7.checked && N(n7, "checked", s5, y6.checked, false));
  }
  return n7;
}
function j(l9, u4, i6) {
  try {
    "function" == typeof l9 ? l9(u4) : l9.current = u4;
  } catch (l10) {
    n.__e(l10, i6);
  }
}
function D(l9, u4, i6) {
  var t3, r5, o6;
  if (n.unmount && n.unmount(l9), (t3 = l9.ref) && (t3.current && t3.current !== l9.__e || j(t3, null, u4)), i6 || "function" == typeof l9.type || (i6 = null != (r5 = l9.__e)), l9.__e = l9.__d = void 0, null != (t3 = l9.__c)) {
    if (t3.componentWillUnmount) try {
      t3.componentWillUnmount();
    } catch (l10) {
      n.__e(l10, u4);
    }
    t3.base = t3.__P = null;
  }
  if (t3 = l9.__k) for (o6 = 0; o6 < t3.length; o6++) t3[o6] && D(t3[o6], u4, i6);
  null != r5 && v(r5);
}
function E(n7, l9, u4) {
  return this.constructor(n7, u4);
}
function H(l9, u4, i6) {
  var t3, r5, f8;
  n.__ && n.__(l9, u4), r5 = (t3 = i6 === o) ? null : i6 && i6.__k || u4.__k, l9 = h(d, null, [l9]), f8 = [], A(u4, (t3 ? u4 : i6 || u4).__k = l9, r5 || e, e, void 0 !== u4.ownerSVGElement, i6 && !t3 ? [i6] : r5 ? null : c.slice.call(u4.childNodes), f8, i6 || e, t3), T(f8, l9);
}
function I(n7, l9) {
  H(n7, l9, o);
}
function L(n7, l9) {
  var u4, i6;
  for (i6 in l9 = a(a({}, n7.props), l9), arguments.length > 2 && (l9.children = c.slice.call(arguments, 2)), u4 = {}, l9) "key" !== i6 && "ref" !== i6 && (u4[i6] = l9[i6]);
  return p(n7.type, u4, l9.key || n7.key, l9.ref || n7.ref, null);
}
function M(n7) {
  var l9 = {}, u4 = { __c: "__cC" + f++, __: n7, Consumer: function(n8, l10) {
    return n8.children(l10);
  }, Provider: function(n8) {
    var i6, t3 = this;
    return this.getChildContext || (i6 = [], this.getChildContext = function() {
      return l9[u4.__c] = t3, l9;
    }, this.shouldComponentUpdate = function(n9) {
      t3.props.value !== n9.value && i6.some(function(l10) {
        l10.context = n9.value, g(l10);
      });
    }, this.sub = function(n9) {
      i6.push(n9);
      var l10 = n9.componentWillUnmount;
      n9.componentWillUnmount = function() {
        i6.splice(i6.indexOf(n9), 1), l10 && l10.call(n9);
      };
    }), n8.children;
  } };
  return u4.Consumer.contextType = u4, u4.Provider.__ = u4, u4;
}
var n, l, u, i, t, r, o, f, e, c, s;
var init_preact_module = __esm({
  "node_modules/preact/dist/preact.module.js"() {
    e = {};
    c = [];
    s = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
    n = { __e: function(n7, l9) {
      for (var u4, i6; l9 = l9.__; ) if ((u4 = l9.__c) && !u4.__) try {
        if (u4.constructor && null != u4.constructor.getDerivedStateFromError && (i6 = true, u4.setState(u4.constructor.getDerivedStateFromError(n7))), null != u4.componentDidCatch && (i6 = true, u4.componentDidCatch(n7)), i6) return g(u4.__E = u4);
      } catch (l10) {
        n7 = l10;
      }
      throw n7;
    } }, l = function(n7) {
      return null != n7 && void 0 === n7.constructor;
    }, m.prototype.setState = function(n7, l9) {
      var u4;
      u4 = this.__s !== this.state ? this.__s : this.__s = a({}, this.state), "function" == typeof n7 && (n7 = n7(u4, this.props)), n7 && a(u4, n7), null != n7 && this.__v && (l9 && this.__h.push(l9), g(this));
    }, m.prototype.forceUpdate = function(n7) {
      this.__v && (this.__e = true, n7 && this.__h.push(n7), g(this));
    }, m.prototype.render = d, u = [], i = 0, t = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, o = e, f = 0;
  }
});

// node_modules/preact/hooks/dist/hooks.module.js
function v2(t3, r5) {
  n.__h && n.__h(u2, t3, i2 || r5), i2 = 0;
  var o6 = u2.__H || (u2.__H = { __: [], __h: [] });
  return t3 >= o6.__.length && o6.__.push({}), o6.__[t3];
}
function m2(n7) {
  return i2 = 1, p2(E2, n7);
}
function p2(n7, r5, i6) {
  var o6 = v2(t2++, 2);
  return o6.__c || (o6.__c = u2, o6.__ = [i6 ? i6(r5) : E2(void 0, r5), function(t3) {
    var u4 = n7(o6.__[0], t3);
    o6.__[0] !== u4 && (o6.__[0] = u4, o6.__c.setState({}));
  }]), o6.__;
}
function l2(r5, i6) {
  var o6 = v2(t2++, 3);
  !n.__s && x2(o6.__H, i6) && (o6.__ = r5, o6.__H = i6, u2.__H.__h.push(o6));
}
function y2(r5, i6) {
  var o6 = v2(t2++, 4);
  !n.__s && x2(o6.__H, i6) && (o6.__ = r5, o6.__H = i6, u2.__h.push(o6));
}
function d2(n7) {
  return i2 = 5, h2(function() {
    return { current: n7 };
  }, []);
}
function s2(n7, t3, u4) {
  i2 = 6, y2(function() {
    "function" == typeof n7 ? n7(t3()) : n7 && (n7.current = t3());
  }, null == u4 ? u4 : u4.concat(n7));
}
function h2(n7, u4) {
  var r5 = v2(t2++, 7);
  return x2(r5.__H, u4) ? (r5.__H = u4, r5.__h = n7, r5.__ = n7()) : r5.__;
}
function T2(n7, t3) {
  return i2 = 8, h2(function() {
    return n7;
  }, t3);
}
function w2(n7) {
  var r5 = u2.context[n7.__c], i6 = v2(t2++, 9);
  return i6.__c = n7, r5 ? (null == i6.__ && (i6.__ = true, r5.sub(u2)), r5.props.value) : n7.__;
}
function A2(t3, u4) {
  n.useDebugValue && n.useDebugValue(u4 ? u4(t3) : t3);
}
function F(n7) {
  var r5 = v2(t2++, 10), i6 = m2();
  return r5.__ = n7, u2.componentDidCatch || (u2.componentDidCatch = function(n8) {
    r5.__ && r5.__(n8), i6[1](n8);
  }), [i6[0], function() {
    i6[1](void 0);
  }];
}
function _2() {
  o2.some(function(t3) {
    if (t3.__P) try {
      t3.__H.__h.forEach(g2), t3.__H.__h.forEach(q), t3.__H.__h = [];
    } catch (u4) {
      return t3.__H.__h = [], n.__e(u4, t3.__v), true;
    }
  }), o2 = [];
}
function g2(n7) {
  n7.t && n7.t();
}
function q(n7) {
  var t3 = n7.__();
  "function" == typeof t3 && (n7.t = t3);
}
function x2(n7, t3) {
  return !n7 || t3.some(function(t4, u4) {
    return t4 !== n7[u4];
  });
}
function E2(n7, t3) {
  return "function" == typeof t3 ? t3(n7) : t3;
}
var t2, u2, r2, i2, o2, c2, f2, e2, a2;
var init_hooks_module = __esm({
  "node_modules/preact/hooks/dist/hooks.module.js"() {
    init_preact_module();
    i2 = 0;
    o2 = [];
    c2 = n.__r;
    f2 = n.diffed;
    e2 = n.__c;
    a2 = n.unmount;
    n.__r = function(n7) {
      c2 && c2(n7), t2 = 0, (u2 = n7.__c).__H && (u2.__H.__h.forEach(g2), u2.__H.__h.forEach(q), u2.__H.__h = []);
    }, n.diffed = function(t3) {
      f2 && f2(t3);
      var u4 = t3.__c;
      if (u4) {
        var i6 = u4.__H;
        i6 && i6.__h.length && (1 !== o2.push(u4) && r2 === n.requestAnimationFrame || ((r2 = n.requestAnimationFrame) || function(n7) {
          var t4, u5 = function() {
            clearTimeout(r5), cancelAnimationFrame(t4), setTimeout(n7);
          }, r5 = setTimeout(u5, 100);
          "undefined" != typeof window && (t4 = requestAnimationFrame(u5));
        })(_2));
      }
    }, n.__c = function(t3, u4) {
      u4.some(function(t4) {
        try {
          t4.__h.forEach(g2), t4.__h = t4.__h.filter(function(n7) {
            return !n7.__ || q(n7);
          });
        } catch (r5) {
          u4.some(function(n7) {
            n7.__h && (n7.__h = []);
          }), u4 = [], n.__e(r5, t4.__v);
        }
      }), e2 && e2(t3, u4);
    }, n.unmount = function(t3) {
      a2 && a2(t3);
      var u4 = t3.__c;
      if (u4) {
        var r5 = u4.__H;
        if (r5) try {
          r5.__.forEach(function(n7) {
            return n7.t && n7.t();
          });
        } catch (t4) {
          n.__e(t4, u4.__v);
        }
      }
    };
  }
});

// node_modules/preact/compat/dist/compat.module.js
var compat_module_exports = {};
__export(compat_module_exports, {
  Children: () => R,
  Component: () => m,
  Fragment: () => d,
  PureComponent: () => C2,
  Suspense: () => U,
  SuspenseList: () => O,
  cloneElement: () => K,
  createContext: () => M,
  createElement: () => h,
  createFactory: () => G,
  createPortal: () => z2,
  createRef: () => y,
  default: () => compat_module_default,
  findDOMNode: () => X,
  forwardRef: () => S,
  hydrate: () => V,
  isValidElement: () => J,
  lazy: () => L2,
  memo: () => _3,
  render: () => T3,
  unmountComponentAtNode: () => Q,
  unstable_batchedUpdates: () => Y,
  useCallback: () => T2,
  useContext: () => w2,
  useDebugValue: () => A2,
  useEffect: () => l2,
  useErrorBoundary: () => F,
  useImperativeHandle: () => s2,
  useLayoutEffect: () => y2,
  useMemo: () => h2,
  useReducer: () => p2,
  useRef: () => d2,
  useState: () => m2,
  version: () => B
});
function E3(n7, t3) {
  for (var e4 in t3) n7[e4] = t3[e4];
  return n7;
}
function w3(n7, t3) {
  for (var e4 in n7) if ("__source" !== e4 && !(e4 in t3)) return true;
  for (var r5 in t3) if ("__source" !== r5 && n7[r5] !== t3[r5]) return true;
  return false;
}
function _3(n7, t3) {
  function e4(n8) {
    var e5 = this.props.ref, r6 = e5 == n8.ref;
    return !r6 && e5 && (e5.call ? e5(null) : e5.current = null), t3 ? !t3(this.props, n8) || !r6 : w3(this.props, n8);
  }
  function r5(t4) {
    return this.shouldComponentUpdate = e4, h(n7, E3({}, t4));
  }
  return r5.prototype.isReactComponent = true, r5.displayName = "Memo(" + (n7.displayName || n7.name) + ")", r5.t = true, r5;
}
function S(n7) {
  function t3(t4) {
    var e4 = E3({}, t4);
    return delete e4.ref, n7(e4, t4.ref);
  }
  return t3.prototype.isReactComponent = t3.t = true, t3.displayName = "ForwardRef(" + (n7.displayName || n7.name) + ")", t3;
}
function N2(n7) {
  return n7 && ((n7 = E3({}, n7)).__c = null, n7.__k = n7.__k && n7.__k.map(N2)), n7;
}
function U() {
  this.__u = 0, this.o = null, this.__b = null;
}
function M2(n7) {
  var t3 = n7.__.__c;
  return t3 && t3.u && t3.u(n7);
}
function L2(n7) {
  var t3, e4, r5;
  function o6(o7) {
    if (t3 || (t3 = n7()).then(function(n8) {
      e4 = n8.default || n8;
    }, function(n8) {
      r5 = n8;
    }), r5) throw r5;
    if (!e4) throw t3;
    return h(e4, o7);
  }
  return o6.displayName = "Lazy", o6.t = true, o6;
}
function O() {
  this.i = null, this.l = null;
}
function j2(n7) {
  var t3 = this, e4 = n7.container, r5 = h(W, { context: t3.context }, n7.vnode);
  return t3.s && t3.s !== e4 && (t3.v.parentNode && t3.s.removeChild(t3.v), D(t3.h), t3.p = false), n7.vnode ? t3.p ? (e4.__k = t3.__k, H(r5, e4), t3.__k = e4.__k) : (t3.v = document.createTextNode(""), I("", e4), e4.appendChild(t3.v), t3.p = true, t3.s = e4, H(r5, e4, t3.v), t3.__k = t3.v.__k) : t3.p && (t3.v.parentNode && t3.s.removeChild(t3.v), D(t3.h)), t3.h = r5, t3.componentWillUnmount = function() {
    t3.v.parentNode && t3.s.removeChild(t3.v), D(t3.h);
  }, null;
}
function z2(n7, t3) {
  return h(j2, { vnode: n7, container: t3 });
}
function T3(n7, t3, e4) {
  if (null == t3.__k) for (; t3.firstChild; ) t3.removeChild(t3.firstChild);
  return H(n7, t3), "function" == typeof e4 && e4(), n7 ? n7.__c : null;
}
function V(n7, t3, e4) {
  return I(n7, t3), "function" == typeof e4 && e4(), n7 ? n7.__c : null;
}
function I2(n7, t3) {
  n7["UNSAFE_" + t3] && !n7[t3] && Object.defineProperty(n7, t3, { configurable: false, get: function() {
    return this["UNSAFE_" + t3];
  }, set: function(n8) {
    this["UNSAFE_" + t3] = n8;
  } });
}
function G(n7) {
  return h.bind(null, n7);
}
function J(n7) {
  return !!n7 && n7.$$typeof === H2;
}
function K(n7) {
  return J(n7) ? L.apply(null, arguments) : n7;
}
function Q(n7) {
  return !!n7.__k && (H(null, n7), true);
}
function X(n7) {
  return n7 && (n7.base || 1 === n7.nodeType && n7) || null;
}
var C2, A3, k2, R, F2, P2, W, D2, H2, Z, $2, q2, B, Y, compat_module_default;
var init_compat_module = __esm({
  "node_modules/preact/compat/dist/compat.module.js"() {
    init_hooks_module();
    init_hooks_module();
    init_preact_module();
    init_preact_module();
    C2 = function(n7) {
      var t3, e4;
      function r5(t4) {
        var e5;
        return (e5 = n7.call(this, t4) || this).isPureReactComponent = true, e5;
      }
      return e4 = n7, (t3 = r5).prototype = Object.create(e4.prototype), t3.prototype.constructor = t3, t3.__proto__ = e4, r5.prototype.shouldComponentUpdate = function(n8, t4) {
        return w3(this.props, n8) || w3(this.state, t4);
      }, r5;
    }(m);
    A3 = n.__b;
    n.__b = function(n7) {
      n7.type && n7.type.t && n7.ref && (n7.props.ref = n7.ref, n7.ref = null), A3 && A3(n7);
    };
    k2 = function(n7, t3) {
      return n7 ? x(n7).reduce(function(n8, e4, r5) {
        return n8.concat(t3(e4, r5));
      }, []) : null;
    };
    R = { map: k2, forEach: k2, count: function(n7) {
      return n7 ? x(n7).length : 0;
    }, only: function(n7) {
      if (1 !== (n7 = x(n7)).length) throw new Error("Children.only() expects only one child.");
      return n7[0];
    }, toArray: x };
    F2 = n.__e;
    n.__e = function(n7, t3, e4) {
      if (n7.then) {
        for (var r5, o6 = t3; o6 = o6.__; ) if ((r5 = o6.__c) && r5.__c) return r5.__c(n7, t3.__c);
      }
      F2(n7, t3, e4);
    }, (U.prototype = new m()).__c = function(n7, t3) {
      var e4 = this;
      null == e4.o && (e4.o = []), e4.o.push(t3);
      var r5 = M2(e4.__v), o6 = false, u4 = function() {
        o6 || (o6 = true, r5 ? r5(i6) : i6());
      };
      t3.__c = t3.componentWillUnmount, t3.componentWillUnmount = function() {
        u4(), t3.__c && t3.__c();
      };
      var i6 = function() {
        var n8;
        if (!--e4.__u) for (e4.__v.__k[0] = e4.state.u, e4.setState({ u: e4.__b = null }); n8 = e4.o.pop(); ) n8.forceUpdate();
      };
      e4.__u++ || e4.setState({ u: e4.__b = e4.__v.__k[0] }), n7.then(u4, u4);
    }, U.prototype.render = function(n7, t3) {
      return this.__b && (this.__v.__k[0] = N2(this.__b), this.__b = null), [h(m, null, t3.u ? null : n7.children), t3.u && n7.fallback];
    };
    P2 = function(n7, t3, e4) {
      if (++e4[1] === e4[0] && n7.l.delete(t3), n7.props.revealOrder && ("t" !== n7.props.revealOrder[0] || !n7.l.size)) for (e4 = n7.i; e4; ) {
        for (; e4.length > 3; ) e4.pop()();
        if (e4[1] < e4[0]) break;
        n7.i = e4 = e4[2];
      }
    };
    (O.prototype = new m()).u = function(n7) {
      var t3 = this, e4 = M2(t3.__v), r5 = t3.l.get(n7);
      return r5[0]++, function(o6) {
        var u4 = function() {
          t3.props.revealOrder ? (r5.push(o6), P2(t3, n7, r5)) : o6();
        };
        e4 ? e4(u4) : u4();
      };
    }, O.prototype.render = function(n7) {
      this.i = null, this.l = /* @__PURE__ */ new Map();
      var t3 = x(n7.children);
      n7.revealOrder && "b" === n7.revealOrder[0] && t3.reverse();
      for (var e4 = t3.length; e4--; ) this.l.set(t3[e4], this.i = [1, 0, this.i]);
      return n7.children;
    }, O.prototype.componentDidUpdate = O.prototype.componentDidMount = function() {
      var n7 = this;
      n7.l.forEach(function(t3, e4) {
        P2(n7, e4, t3);
      });
    };
    W = function() {
      function n7() {
      }
      var t3 = n7.prototype;
      return t3.getChildContext = function() {
        return this.props.context;
      }, t3.render = function(n8) {
        return n8.children;
      }, n7;
    }();
    D2 = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
    m.prototype.isReactComponent = {};
    H2 = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
    Z = n.event;
    n.event = function(n7) {
      Z && (n7 = Z(n7)), n7.persist = function() {
      };
      var t3 = false, e4 = false, r5 = n7.stopPropagation;
      n7.stopPropagation = function() {
        r5.call(n7), t3 = true;
      };
      var o6 = n7.preventDefault;
      return n7.preventDefault = function() {
        o6.call(n7), e4 = true;
      }, n7.isPropagationStopped = function() {
        return t3;
      }, n7.isDefaultPrevented = function() {
        return e4;
      }, n7.nativeEvent = n7;
    };
    $2 = { configurable: true, get: function() {
      return this.class;
    } };
    q2 = n.vnode;
    n.vnode = function(n7) {
      n7.$$typeof = H2;
      var t3 = n7.type, e4 = n7.props;
      if (t3) {
        if (e4.class != e4.className && ($2.enumerable = "className" in e4, null != e4.className && (e4.class = e4.className), Object.defineProperty(e4, "className", $2)), "function" != typeof t3) {
          var r5, o6, u4;
          for (u4 in e4.defaultValue && void 0 !== e4.value && (e4.value || 0 === e4.value || (e4.value = e4.defaultValue), delete e4.defaultValue), Array.isArray(e4.value) && e4.multiple && "select" === t3 && (x(e4.children).forEach(function(n8) {
            -1 != e4.value.indexOf(n8.props.value) && (n8.props.selected = true);
          }), delete e4.value), e4) if (r5 = D2.test(u4)) break;
          if (r5) for (u4 in o6 = n7.props = {}, e4) o6[D2.test(u4) ? u4.replace(/[A-Z0-9]/, "-$&").toLowerCase() : u4] = e4[u4];
        }
        !function(t4) {
          var e5 = n7.type, r6 = n7.props;
          if (r6 && "string" == typeof e5) {
            var o7 = {};
            for (var u5 in r6) /^on(Ani|Tra|Tou)/.test(u5) && (r6[u5.toLowerCase()] = r6[u5], delete r6[u5]), o7[u5.toLowerCase()] = u5;
            if (o7.ondoubleclick && (r6.ondblclick = r6[o7.ondoubleclick], delete r6[o7.ondoubleclick]), o7.onbeforeinput && (r6.onbeforeinput = r6[o7.onbeforeinput], delete r6[o7.onbeforeinput]), o7.onchange && ("textarea" === e5 || "input" === e5.toLowerCase() && !/^fil|che|ra/i.test(r6.type))) {
              var i6 = o7.oninput || "oninput";
              r6[i6] || (r6[i6] = r6[o7.onchange], delete r6[o7.onchange]);
            }
          }
        }(), "function" == typeof t3 && !t3.m && t3.prototype && (I2(t3.prototype, "componentWillMount"), I2(t3.prototype, "componentWillReceiveProps"), I2(t3.prototype, "componentWillUpdate"), t3.m = true);
      }
      q2 && q2(n7);
    };
    B = "16.8.0";
    Y = function(n7, t3) {
      return n7(t3);
    };
    compat_module_default = { useState: m2, useReducer: p2, useEffect: l2, useLayoutEffect: y2, useRef: d2, useImperativeHandle: s2, useMemo: h2, useCallback: T2, useContext: w2, useDebugValue: A2, version: "16.8.0", Children: R, render: T3, hydrate: T3, unmountComponentAtNode: Q, createPortal: z2, createElement: h, createContext: M, createFactory: G, cloneElement: K, createRef: y, Fragment: d, isValidElement: J, findDOMNode: X, Component: m, PureComponent: C2, memo: _3, forwardRef: S, unstable_batchedUpdates: Y, Suspense: U, SuspenseList: O, lazy: L2 };
  }
});

// node_modules/@walletconnect/qrcode-modal/dist/cjs/index.js
var require_cjs3 = __commonJS({
  "node_modules/@walletconnect/qrcode-modal/dist/cjs/index.js"(exports, module) {
    function _interopDefault(ex) {
      return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
    }
    var browserUtils = (init_esm2(), __toCommonJS(esm_exports2));
    var QRCode = _interopDefault(require_browser());
    var copy = _interopDefault(require_copy_to_clipboard());
    var React = (init_compat_module(), __toCommonJS(compat_module_exports));
    function open(uri) {
      QRCode.toString(uri, {
        type: "terminal"
      }).then(console.log);
    }
    var WALLETCONNECT_STYLE_SHEET = ':root {\n  --animation-duration: 300ms;\n}\n\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes fadeOut {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n\n.animated {\n  animation-duration: var(--animation-duration);\n  animation-fill-mode: both;\n}\n\n.fadeIn {\n  animation-name: fadeIn;\n}\n\n.fadeOut {\n  animation-name: fadeOut;\n}\n\n#walletconnect-wrapper {\n  -webkit-user-select: none;\n  align-items: center;\n  display: flex;\n  height: 100%;\n  justify-content: center;\n  left: 0;\n  pointer-events: none;\n  position: fixed;\n  top: 0;\n  user-select: none;\n  width: 100%;\n  z-index: 99999999999999;\n}\n\n.walletconnect-modal__headerLogo {\n  height: 21px;\n}\n\n.walletconnect-modal__header p {\n  color: #ffffff;\n  font-size: 20px;\n  font-weight: 600;\n  margin: 0;\n  align-items: flex-start;\n  display: flex;\n  flex: 1;\n  margin-left: 5px;\n}\n\n.walletconnect-modal__close__wrapper {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  z-index: 10000;\n  background: white;\n  border-radius: 26px;\n  padding: 6px;\n  box-sizing: border-box;\n  width: 26px;\n  height: 26px;\n  cursor: pointer;\n}\n\n.walletconnect-modal__close__icon {\n  position: relative;\n  top: 7px;\n  right: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transform: rotate(45deg);\n}\n\n.walletconnect-modal__close__line1 {\n  position: absolute;\n  width: 100%;\n  border: 1px solid rgb(48, 52, 59);\n}\n\n.walletconnect-modal__close__line2 {\n  position: absolute;\n  width: 100%;\n  border: 1px solid rgb(48, 52, 59);\n  transform: rotate(90deg);\n}\n\n.walletconnect-qrcode__base {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  background: rgba(37, 41, 46, 0.95);\n  height: 100%;\n  left: 0;\n  pointer-events: auto;\n  position: fixed;\n  top: 0;\n  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);\n  width: 100%;\n  will-change: opacity;\n  padding: 40px;\n  box-sizing: border-box;\n}\n\n.walletconnect-qrcode__text {\n  color: rgba(60, 66, 82, 0.6);\n  font-size: 16px;\n  font-weight: 600;\n  letter-spacing: 0;\n  line-height: 1.1875em;\n  margin: 10px 0 20px 0;\n  text-align: center;\n  width: 100%;\n}\n\n@media only screen and (max-width: 768px) {\n  .walletconnect-qrcode__text {\n    font-size: 4vw;\n  }\n}\n\n@media only screen and (max-width: 320px) {\n  .walletconnect-qrcode__text {\n    font-size: 14px;\n  }\n}\n\n.walletconnect-qrcode__image {\n  width: calc(100% - 30px);\n  box-sizing: border-box;\n  cursor: none;\n  margin: 0 auto;\n}\n\n.walletconnect-qrcode__notification {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  font-size: 16px;\n  padding: 16px 20px;\n  border-radius: 16px;\n  text-align: center;\n  transition: all 0.1s ease-in-out;\n  background: white;\n  color: black;\n  margin-bottom: -60px;\n  opacity: 0;\n}\n\n.walletconnect-qrcode__notification.notification__show {\n  opacity: 1;\n}\n\n@media only screen and (max-width: 768px) {\n  .walletconnect-modal__header {\n    height: 130px;\n  }\n  .walletconnect-modal__base {\n    overflow: auto;\n  }\n}\n\n@media only screen and (min-device-width: 415px) and (max-width: 768px) {\n  #content {\n    max-width: 768px;\n    box-sizing: border-box;\n  }\n}\n\n@media only screen and (min-width: 375px) and (max-width: 415px) {\n  #content {\n    max-width: 414px;\n    box-sizing: border-box;\n  }\n}\n\n@media only screen and (min-width: 320px) and (max-width: 375px) {\n  #content {\n    max-width: 375px;\n    box-sizing: border-box;\n  }\n}\n\n@media only screen and (max-width: 320px) {\n  #content {\n    max-width: 320px;\n    box-sizing: border-box;\n  }\n}\n\n.walletconnect-modal__base {\n  -webkit-font-smoothing: antialiased;\n  background: #ffffff;\n  border-radius: 24px;\n  box-shadow: 0 10px 50px 5px rgba(0, 0, 0, 0.4);\n  font-family: ui-rounded, "SF Pro Rounded", "SF Pro Text", medium-content-sans-serif-font,\n    -apple-system, BlinkMacSystemFont, ui-sans-serif, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,\n    "Open Sans", "Helvetica Neue", sans-serif;\n  margin-top: 41px;\n  padding: 24px 24px 22px;\n  pointer-events: auto;\n  position: relative;\n  text-align: center;\n  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);\n  will-change: transform;\n  overflow: visible;\n  transform: translateY(-50%);\n  top: 50%;\n  max-width: 500px;\n  margin: auto;\n}\n\n@media only screen and (max-width: 320px) {\n  .walletconnect-modal__base {\n    padding: 24px 12px;\n  }\n}\n\n.walletconnect-modal__base .hidden {\n  transform: translateY(150%);\n  transition: 0.125s cubic-bezier(0.4, 0, 1, 1);\n}\n\n.walletconnect-modal__header {\n  align-items: center;\n  display: flex;\n  height: 26px;\n  left: 0;\n  justify-content: space-between;\n  position: absolute;\n  top: -42px;\n  width: 100%;\n}\n\n.walletconnect-modal__base .wc-logo {\n  align-items: center;\n  display: flex;\n  height: 26px;\n  margin-top: 15px;\n  padding-bottom: 15px;\n  pointer-events: auto;\n}\n\n.walletconnect-modal__base .wc-logo div {\n  background-color: #3399ff;\n  height: 21px;\n  margin-right: 5px;\n  mask-image: url("images/wc-logo.svg") center no-repeat;\n  width: 32px;\n}\n\n.walletconnect-modal__base .wc-logo p {\n  color: #ffffff;\n  font-size: 20px;\n  font-weight: 600;\n  margin: 0;\n}\n\n.walletconnect-modal__base h2 {\n  color: rgba(60, 66, 82, 0.6);\n  font-size: 16px;\n  font-weight: 600;\n  letter-spacing: 0;\n  line-height: 1.1875em;\n  margin: 0 0 19px 0;\n  text-align: center;\n  width: 100%;\n}\n\n.walletconnect-modal__base__row {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  align-items: center;\n  border-radius: 20px;\n  cursor: pointer;\n  display: flex;\n  height: 56px;\n  justify-content: space-between;\n  padding: 0 15px;\n  position: relative;\n  margin: 0px 0px 8px;\n  text-align: left;\n  transition: 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  will-change: transform;\n  text-decoration: none;\n}\n\n.walletconnect-modal__base__row:hover {\n  background: rgba(60, 66, 82, 0.06);\n}\n\n.walletconnect-modal__base__row:active {\n  background: rgba(60, 66, 82, 0.06);\n  transform: scale(0.975);\n  transition: 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n}\n\n.walletconnect-modal__base__row__h3 {\n  color: #25292e;\n  font-size: 20px;\n  font-weight: 700;\n  margin: 0;\n  padding-bottom: 3px;\n}\n\n.walletconnect-modal__base__row__right {\n  align-items: center;\n  display: flex;\n  justify-content: center;\n}\n\n.walletconnect-modal__base__row__right__app-icon {\n  border-radius: 8px;\n  height: 34px;\n  margin: 0 11px 2px 0;\n  width: 34px;\n  background-size: 100%;\n  box-shadow: 0 4px 12px 0 rgba(37, 41, 46, 0.25);\n}\n\n.walletconnect-modal__base__row__right__caret {\n  height: 18px;\n  opacity: 0.3;\n  transition: 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  width: 8px;\n  will-change: opacity;\n}\n\n.walletconnect-modal__base__row:hover .caret,\n.walletconnect-modal__base__row:active .caret {\n  opacity: 0.6;\n}\n\n.walletconnect-modal__mobile__toggle {\n  width: 80%;\n  display: flex;\n  margin: 0 auto;\n  position: relative;\n  overflow: hidden;\n  border-radius: 8px;\n  margin-bottom: 18px;\n  background: #d4d5d9;\n}\n\n.walletconnect-modal__single_wallet {\n  display: flex;\n  justify-content: center;\n  margin-top: 7px;\n  margin-bottom: 18px;\n}\n\n.walletconnect-modal__single_wallet a {\n  cursor: pointer;\n  color: rgb(64, 153, 255);\n  font-size: 21px;\n  font-weight: 800;\n  text-decoration: none !important;\n  margin: 0 auto;\n}\n\n.walletconnect-modal__mobile__toggle_selector {\n  width: calc(50% - 8px);\n  background: white;\n  position: absolute;\n  border-radius: 5px;\n  height: calc(100% - 8px);\n  top: 4px;\n  transition: all 0.2s ease-in-out;\n  transform: translate3d(4px, 0, 0);\n}\n\n.walletconnect-modal__mobile__toggle.right__selected .walletconnect-modal__mobile__toggle_selector {\n  transform: translate3d(calc(100% + 12px), 0, 0);\n}\n\n.walletconnect-modal__mobile__toggle a {\n  font-size: 12px;\n  width: 50%;\n  text-align: center;\n  padding: 8px;\n  margin: 0;\n  font-weight: 600;\n  z-index: 1;\n}\n\n.walletconnect-modal__footer {\n  display: flex;\n  justify-content: center;\n  margin-top: 20px;\n}\n\n@media only screen and (max-width: 768px) {\n  .walletconnect-modal__footer {\n    margin-top: 5vw;\n  }\n}\n\n.walletconnect-modal__footer a {\n  cursor: pointer;\n  color: #898d97;\n  font-size: 15px;\n  margin: 0 auto;\n}\n\n@media only screen and (max-width: 320px) {\n  .walletconnect-modal__footer a {\n    font-size: 14px;\n  }\n}\n\n.walletconnect-connect__buttons__wrapper {\n  max-height: 44vh;\n}\n\n.walletconnect-connect__buttons__wrapper__android {\n  margin: 50% 0;\n}\n\n.walletconnect-connect__buttons__wrapper__wrap {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  margin: 10px 0;\n}\n\n@media only screen and (min-width: 768px) {\n  .walletconnect-connect__buttons__wrapper__wrap {\n    margin-top: 40px;\n  }\n}\n\n.walletconnect-connect__button {\n  background-color: rgb(64, 153, 255);\n  padding: 12px;\n  border-radius: 8px;\n  text-decoration: none;\n  color: rgb(255, 255, 255);\n  font-weight: 500;\n}\n\n.walletconnect-connect__button__icon_anchor {\n  cursor: pointer;\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  margin: 8px;\n  width: 42px;\n  justify-self: center;\n  flex-direction: column;\n  text-decoration: none !important;\n}\n\n@media only screen and (max-width: 320px) {\n  .walletconnect-connect__button__icon_anchor {\n    margin: 4px;\n  }\n}\n\n.walletconnect-connect__button__icon {\n  border-radius: 10px;\n  height: 42px;\n  margin: 0;\n  width: 42px;\n  background-size: cover !important;\n  box-shadow: 0 4px 12px 0 rgba(37, 41, 46, 0.25);\n}\n\n.walletconnect-connect__button__text {\n  color: #424952;\n  font-size: 2.7vw;\n  text-decoration: none !important;\n  padding: 0;\n  margin-top: 1.8vw;\n  font-weight: 600;\n}\n\n@media only screen and (min-width: 768px) {\n  .walletconnect-connect__button__text {\n    font-size: 16px;\n    margin-top: 12px;\n  }\n}\n\n.walletconnect-search__input {\n  border: none;\n  background: #d4d5d9;\n  border-style: none;\n  padding: 8px 16px;\n  outline: none;\n  font-style: normal;\n  font-stretch: normal;\n  font-size: 16px;\n  font-style: normal;\n  font-stretch: normal;\n  line-height: normal;\n  letter-spacing: normal;\n  text-align: left;\n  border-radius: 8px;\n  width: calc(100% - 16px);\n  margin: 0;\n  margin-bottom: 8px;\n}\n';
    var _iteratorSymbol = typeof Symbol !== "undefined" ? Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator")) : "@@iterator";
    var _asyncIteratorSymbol = typeof Symbol !== "undefined" ? Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator")) : "@@asyncIterator";
    function _catch(body, recover) {
      try {
        var result = body();
      } catch (e4) {
        return recover(e4);
      }
      if (result && result.then) {
        return result.then(void 0, recover);
      }
      return result;
    }
    var WALLETCONNECT_LOGO_SVG_URL = "data:image/svg+xml,%3Csvg height='185' viewBox='0 0 300 185' width='300' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m61.4385429 36.2562612c48.9112241-47.8881663 128.2119871-47.8881663 177.1232091 0l5.886545 5.7634174c2.445561 2.3944081 2.445561 6.2765112 0 8.6709204l-20.136695 19.715503c-1.222781 1.1972051-3.2053 1.1972051-4.428081 0l-8.100584-7.9311479c-34.121692-33.4079817-89.443886-33.4079817-123.5655788 0l-8.6750562 8.4936051c-1.2227816 1.1972041-3.205301 1.1972041-4.4280806 0l-20.1366949-19.7155031c-2.4455612-2.3944092-2.4455612-6.2765122 0-8.6709204zm218.7677961 40.7737449 17.921697 17.546897c2.445549 2.3943969 2.445563 6.2764769.000031 8.6708899l-80.810171 79.121134c-2.445544 2.394426-6.410582 2.394453-8.85616.000062-.00001-.00001-.000022-.000022-.000032-.000032l-57.354143-56.154572c-.61139-.598602-1.60265-.598602-2.21404 0-.000004.000004-.000007.000008-.000011.000011l-57.3529212 56.154531c-2.4455368 2.394432-6.4105755 2.394472-8.8561612.000087-.0000143-.000014-.0000296-.000028-.0000449-.000044l-80.81241943-79.122185c-2.44556021-2.394408-2.44556021-6.2765115 0-8.6709197l17.92172963-17.5468673c2.4455602-2.3944082 6.4105989-2.3944082 8.8561602 0l57.3549775 56.155357c.6113908.598602 1.602649.598602 2.2140398 0 .0000092-.000009.0000174-.000017.0000265-.000024l57.3521031-56.155333c2.445505-2.3944633 6.410544-2.3945531 8.856161-.0002.000034.0000336.000068.0000673.000101.000101l57.354902 56.155432c.61139.598601 1.60265.598601 2.21404 0l57.353975-56.1543249c2.445561-2.3944092 6.410599-2.3944092 8.85616 0z' fill='%233b99fc'/%3E%3C/svg%3E";
    var WALLETCONNECT_HEADER_TEXT = "WalletConnect";
    var ANIMATION_DURATION = 300;
    var DEFAULT_BUTTON_COLOR = "rgb(64, 153, 255)";
    var WALLETCONNECT_WRAPPER_ID = "walletconnect-wrapper";
    var WALLETCONNECT_STYLE_ID = "walletconnect-style-sheet";
    var WALLETCONNECT_MODAL_ID = "walletconnect-qrcode-modal";
    var WALLETCONNECT_CLOSE_BUTTON_ID = "walletconnect-qrcode-close";
    var WALLETCONNECT_CTA_TEXT_ID = "walletconnect-qrcode-text";
    var WALLETCONNECT_CONNECT_BUTTON_ID = "walletconnect-connect-button";
    function Header(props) {
      return React.createElement("div", {
        className: "walletconnect-modal__header"
      }, React.createElement("img", {
        src: WALLETCONNECT_LOGO_SVG_URL,
        className: "walletconnect-modal__headerLogo"
      }), React.createElement("p", null, WALLETCONNECT_HEADER_TEXT), React.createElement("div", {
        className: "walletconnect-modal__close__wrapper",
        onClick: props.onClose
      }, React.createElement("div", {
        id: WALLETCONNECT_CLOSE_BUTTON_ID,
        className: "walletconnect-modal__close__icon"
      }, React.createElement("div", {
        className: "walletconnect-modal__close__line1"
      }), React.createElement("div", {
        className: "walletconnect-modal__close__line2"
      }))));
    }
    function ConnectButton(props) {
      return React.createElement("a", {
        className: "walletconnect-connect__button",
        href: props.href,
        id: WALLETCONNECT_CONNECT_BUTTON_ID + "-" + props.name,
        onClick: props.onClick,
        rel: "noopener noreferrer",
        style: {
          backgroundColor: props.color
        },
        target: "_blank"
      }, props.name);
    }
    var CARET_SVG_URL = "data:image/svg+xml,%3Csvg fill='none' height='18' viewBox='0 0 8 18' width='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath clip-rule='evenodd' d='m.586301.213898c-.435947.33907-.5144813.967342-.175411 1.403292l4.87831 6.27212c.28087.36111.28087.86677 0 1.22788l-4.878311 6.27211c-.33907.436-.260536 1.0642.175412 1.4033.435949.3391 1.064219.2605 1.403289-.1754l4.87832-6.2721c.84259-1.08336.84259-2.60034 0-3.68367l-4.87832-6.27212c-.33907-.4359474-.96734-.514482-1.403289-.175412z' fill='%233c4252' fill-rule='evenodd'/%3E%3C/svg%3E";
    function WalletButton(props) {
      var color = props.color;
      var href = props.href;
      var name2 = props.name;
      var logo = props.logo;
      var onClick = props.onClick;
      return React.createElement("a", {
        className: "walletconnect-modal__base__row",
        href,
        onClick,
        rel: "noopener noreferrer",
        target: "_blank"
      }, React.createElement("h3", {
        className: "walletconnect-modal__base__row__h3"
      }, name2), React.createElement("div", {
        className: "walletconnect-modal__base__row__right"
      }, React.createElement("div", {
        className: "walletconnect-modal__base__row__right__app-icon",
        style: {
          background: "url('" + logo + "') " + color,
          backgroundSize: "100%"
        }
      }), React.createElement("img", {
        src: CARET_SVG_URL,
        className: "walletconnect-modal__base__row__right__caret"
      })));
    }
    function WalletIcon(props) {
      var color = props.color;
      var href = props.href;
      var name2 = props.name;
      var logo = props.logo;
      var onClick = props.onClick;
      var fontSize = window.innerWidth < 768 ? (name2.length > 8 ? 2.5 : 2.7) + "vw" : "inherit";
      return React.createElement("a", {
        className: "walletconnect-connect__button__icon_anchor",
        href,
        onClick,
        rel: "noopener noreferrer",
        target: "_blank"
      }, React.createElement("div", {
        className: "walletconnect-connect__button__icon",
        style: {
          background: "url('" + logo + "') " + color,
          backgroundSize: "100%"
        }
      }), React.createElement("div", {
        style: {
          fontSize
        },
        className: "walletconnect-connect__button__text"
      }, name2));
    }
    var GRID_MIN_COUNT = 5;
    var LINKS_PER_PAGE = 12;
    function LinkDisplay(props) {
      var android = browserUtils.isAndroid();
      var ref = React.useState("");
      var input = ref[0];
      var setInput = ref[1];
      var ref$1 = React.useState("");
      var filter = ref$1[0];
      var setFilter = ref$1[1];
      var ref$2 = React.useState(1);
      var page = ref$2[0];
      var setPage = ref$2[1];
      var links = filter ? props.links.filter(function(link) {
        return link.name.toLowerCase().includes(filter.toLowerCase());
      }) : props.links;
      var errorMessage = props.errorMessage;
      var grid = filter || links.length > GRID_MIN_COUNT;
      var pages = Math.ceil(links.length / LINKS_PER_PAGE);
      var range = [(page - 1) * LINKS_PER_PAGE + 1, page * LINKS_PER_PAGE];
      var pageLinks = links.length ? links.filter(function(_8, index2) {
        return index2 + 1 >= range[0] && index2 + 1 <= range[1];
      }) : [];
      var hasPaging = !!(!android && pages > 1);
      var filterTimeout = void 0;
      function handleInput(e4) {
        setInput(e4.target.value);
        clearTimeout(filterTimeout);
        if (e4.target.value) {
          filterTimeout = setTimeout(function() {
            setFilter(e4.target.value);
            setPage(1);
          }, 1e3);
        } else {
          setInput("");
          setFilter("");
          setPage(1);
        }
      }
      return React.createElement("div", null, React.createElement("p", {
        id: WALLETCONNECT_CTA_TEXT_ID,
        className: "walletconnect-qrcode__text"
      }, android ? props.text.connect_mobile_wallet : props.text.choose_preferred_wallet), !android && React.createElement("input", {
        className: "walletconnect-search__input",
        placeholder: "Search",
        value: input,
        onChange: handleInput
      }), React.createElement("div", {
        className: "walletconnect-connect__buttons__wrapper" + (android ? "__android" : grid && links.length ? "__wrap" : "")
      }, !android ? pageLinks.length ? pageLinks.map(function(entry) {
        var color = entry.color;
        var name2 = entry.name;
        var shortName = entry.shortName;
        var logo = entry.logo;
        var href = browserUtils.formatIOSMobile(props.uri, entry);
        var handleClickIOS = React.useCallback(function() {
          browserUtils.saveMobileLinkInfo({
            name: name2,
            href
          });
        }, [pageLinks]);
        return !grid ? React.createElement(WalletButton, {
          color,
          href,
          name: name2,
          logo,
          onClick: handleClickIOS
        }) : React.createElement(WalletIcon, {
          color,
          href,
          name: shortName || name2,
          logo,
          onClick: handleClickIOS
        });
      }) : React.createElement(React.Fragment, null, React.createElement("p", null, errorMessage.length ? props.errorMessage : !!props.links.length && !links.length ? props.text.no_wallets_found : props.text.loading)) : React.createElement(ConnectButton, {
        name: props.text.connect,
        color: DEFAULT_BUTTON_COLOR,
        href: props.uri,
        onClick: React.useCallback(function() {
          browserUtils.saveMobileLinkInfo({
            name: "Unknown",
            href: props.uri
          });
        }, [])
      })), hasPaging && React.createElement("div", {
        className: "walletconnect-modal__footer"
      }, Array(pages).fill(0).map(function(_8, index2) {
        var pageNumber = index2 + 1;
        var selected = page === pageNumber;
        return React.createElement("a", {
          style: {
            margin: "auto 10px",
            fontWeight: selected ? "bold" : "normal"
          },
          onClick: function() {
            return setPage(pageNumber);
          }
        }, pageNumber);
      })));
    }
    function Notification(props) {
      var show = !!props.message.trim();
      return React.createElement("div", {
        className: "walletconnect-qrcode__notification" + (show ? " notification__show" : "")
      }, props.message);
    }
    var formatQRCodeImage = function(data) {
      try {
        var result = "";
        return Promise.resolve(QRCode.toString(data, {
          margin: 0,
          type: "svg"
        })).then(function(dataString) {
          if (typeof dataString === "string") {
            result = dataString.replace("<svg", '<svg class="walletconnect-qrcode__image"');
          }
          return result;
        });
      } catch (e4) {
        return Promise.reject(e4);
      }
    };
    function QRCodeDisplay(props) {
      var ref = React.useState("");
      var notification = ref[0];
      var setNotification = ref[1];
      var ref$1 = React.useState("");
      var svg = ref$1[0];
      var setSvg = ref$1[1];
      React.useEffect(function() {
        try {
          return Promise.resolve(formatQRCodeImage(props.uri)).then(function(_formatQRCodeImage) {
            setSvg(_formatQRCodeImage);
          });
        } catch (e4) {
          Promise.reject(e4);
        }
      }, []);
      var copyToClipboard = function() {
        var success = copy(props.uri);
        if (success) {
          setNotification(props.text.copied_to_clipboard);
          setInterval(function() {
            return setNotification("");
          }, 1200);
        } else {
          setNotification("Error");
          setInterval(function() {
            return setNotification("");
          }, 1200);
        }
      };
      return React.createElement("div", null, React.createElement("p", {
        id: WALLETCONNECT_CTA_TEXT_ID,
        className: "walletconnect-qrcode__text"
      }, props.text.scan_qrcode_with_wallet), React.createElement("div", {
        dangerouslySetInnerHTML: {
          __html: svg
        }
      }), React.createElement("div", {
        className: "walletconnect-modal__footer"
      }, React.createElement("a", {
        onClick: copyToClipboard
      }, props.text.copy_to_clipboard)), React.createElement(Notification, {
        message: notification
      }));
    }
    function Modal(props) {
      var android = browserUtils.isAndroid();
      var mobile = browserUtils.isMobile();
      var whitelist = mobile ? props.qrcodeModalOptions && props.qrcodeModalOptions.mobileLinks ? props.qrcodeModalOptions.mobileLinks : void 0 : props.qrcodeModalOptions && props.qrcodeModalOptions.desktopLinks ? props.qrcodeModalOptions.desktopLinks : void 0;
      var ref = React.useState(false);
      var loading = ref[0];
      var setLoading = ref[1];
      var ref$1 = React.useState(false);
      var fetched = ref$1[0];
      var setFetched = ref$1[1];
      var ref$2 = React.useState(!mobile);
      var displayQRCode = ref$2[0];
      var setDisplayQRCode = ref$2[1];
      var displayProps = {
        mobile,
        text: props.text,
        uri: props.uri,
        qrcodeModalOptions: props.qrcodeModalOptions
      };
      var ref$3 = React.useState("");
      var singleLinkHref = ref$3[0];
      var setSingleLinkHref = ref$3[1];
      var ref$4 = React.useState(false);
      var hasSingleLink = ref$4[0];
      var setHasSingleLink = ref$4[1];
      var ref$5 = React.useState([]);
      var links = ref$5[0];
      var setLinks = ref$5[1];
      var ref$6 = React.useState("");
      var errorMessage = ref$6[0];
      var setErrorMessage = ref$6[1];
      var getLinksIfNeeded = function() {
        if (fetched || loading || whitelist && !whitelist.length || links.length > 0) {
          return;
        }
        React.useEffect(function() {
          var initLinks = function() {
            try {
              if (android) {
                return Promise.resolve();
              }
              setLoading(true);
              var _temp = _catch(function() {
                var url = props.qrcodeModalOptions && props.qrcodeModalOptions.registryUrl ? props.qrcodeModalOptions.registryUrl : browserUtils.getWalletRegistryUrl();
                return Promise.resolve(fetch(url)).then(function(registryResponse) {
                  return Promise.resolve(registryResponse.json()).then(function(_registryResponse$jso) {
                    var registry = _registryResponse$jso.listings;
                    var platform = mobile ? "mobile" : "desktop";
                    var _links = browserUtils.getMobileLinkRegistry(browserUtils.formatMobileRegistry(registry, platform), whitelist);
                    setLoading(false);
                    setFetched(true);
                    setErrorMessage(!_links.length ? props.text.no_supported_wallets : "");
                    setLinks(_links);
                    var hasSingleLink2 = _links.length === 1;
                    if (hasSingleLink2) {
                      setSingleLinkHref(browserUtils.formatIOSMobile(props.uri, _links[0]));
                      setDisplayQRCode(true);
                    }
                    setHasSingleLink(hasSingleLink2);
                  });
                });
              }, function(e4) {
                setLoading(false);
                setFetched(true);
                setErrorMessage(props.text.something_went_wrong);
                console.error(e4);
              });
              return Promise.resolve(_temp && _temp.then ? _temp.then(function() {
              }) : void 0);
            } catch (e4) {
              return Promise.reject(e4);
            }
          };
          initLinks();
        });
      };
      getLinksIfNeeded();
      var rightSelected = mobile ? displayQRCode : !displayQRCode;
      return React.createElement("div", {
        id: WALLETCONNECT_MODAL_ID,
        className: "walletconnect-qrcode__base animated fadeIn"
      }, React.createElement("div", {
        className: "walletconnect-modal__base"
      }, React.createElement(Header, {
        onClose: props.onClose
      }), hasSingleLink && displayQRCode ? React.createElement("div", {
        className: "walletconnect-modal__single_wallet"
      }, React.createElement("a", {
        onClick: function() {
          return browserUtils.saveMobileLinkInfo({
            name: links[0].name,
            href: singleLinkHref
          });
        },
        href: singleLinkHref,
        rel: "noopener noreferrer",
        target: "_blank"
      }, props.text.connect_with + " " + (hasSingleLink ? links[0].name : "") + " ›")) : android || loading || !loading && links.length ? React.createElement("div", {
        className: "walletconnect-modal__mobile__toggle" + (rightSelected ? " right__selected" : "")
      }, React.createElement("div", {
        className: "walletconnect-modal__mobile__toggle_selector"
      }), mobile ? React.createElement(React.Fragment, null, React.createElement("a", {
        onClick: function() {
          return setDisplayQRCode(false), getLinksIfNeeded();
        }
      }, props.text.mobile), React.createElement("a", {
        onClick: function() {
          return setDisplayQRCode(true);
        }
      }, props.text.qrcode)) : React.createElement(React.Fragment, null, React.createElement("a", {
        onClick: function() {
          return setDisplayQRCode(true);
        }
      }, props.text.qrcode), React.createElement("a", {
        onClick: function() {
          return setDisplayQRCode(false), getLinksIfNeeded();
        }
      }, props.text.desktop))) : null, React.createElement("div", null, displayQRCode || !android && !loading && !links.length ? React.createElement(QRCodeDisplay, Object.assign({}, displayProps)) : React.createElement(LinkDisplay, Object.assign(
        {},
        displayProps,
        {
          links,
          errorMessage
        }
      )))));
    }
    var de4 = {
      choose_preferred_wallet: "Wähle bevorzugte Wallet",
      connect_mobile_wallet: "Verbinde mit Mobile Wallet",
      scan_qrcode_with_wallet: "Scanne den QR-code mit einer WalletConnect kompatiblen Wallet",
      connect: "Verbinden",
      qrcode: "QR-Code",
      mobile: "Mobile",
      desktop: "Desktop",
      copy_to_clipboard: "In die Zwischenablage kopieren",
      copied_to_clipboard: "In die Zwischenablage kopiert!",
      connect_with: "Verbinden mit Hilfe von",
      loading: "Laden...",
      something_went_wrong: "Etwas ist schief gelaufen",
      no_supported_wallets: "Es gibt noch keine unterstützten Wallet",
      no_wallets_found: "keine Wallet gefunden"
    };
    var en4 = {
      choose_preferred_wallet: "Choose your preferred wallet",
      connect_mobile_wallet: "Connect to Mobile Wallet",
      scan_qrcode_with_wallet: "Scan QR code with a WalletConnect-compatible wallet",
      connect: "Connect",
      qrcode: "QR Code",
      mobile: "Mobile",
      desktop: "Desktop",
      copy_to_clipboard: "Copy to clipboard",
      copied_to_clipboard: "Copied to clipboard!",
      connect_with: "Connect with",
      loading: "Loading...",
      something_went_wrong: "Something went wrong",
      no_supported_wallets: "There are no supported wallets yet",
      no_wallets_found: "No wallets found"
    };
    var es2 = {
      choose_preferred_wallet: "Elige tu billetera preferida",
      connect_mobile_wallet: "Conectar a billetera móvil",
      scan_qrcode_with_wallet: "Escanea el código QR con una billetera compatible con WalletConnect",
      connect: "Conectar",
      qrcode: "Código QR",
      mobile: "Móvil",
      desktop: "Desktop",
      copy_to_clipboard: "Copiar",
      copied_to_clipboard: "Copiado!",
      connect_with: "Conectar mediante",
      loading: "Cargando...",
      something_went_wrong: "Algo salió mal",
      no_supported_wallets: "Todavía no hay billeteras compatibles",
      no_wallets_found: "No se encontraron billeteras"
    };
    var fr3 = {
      choose_preferred_wallet: "Choisissez votre portefeuille préféré",
      connect_mobile_wallet: "Se connecter au portefeuille mobile",
      scan_qrcode_with_wallet: "Scannez le QR code avec un portefeuille compatible WalletConnect",
      connect: "Se connecter",
      qrcode: "QR Code",
      mobile: "Mobile",
      desktop: "Desktop",
      copy_to_clipboard: "Copier",
      copied_to_clipboard: "Copié!",
      connect_with: "Connectez-vous à l'aide de",
      loading: "Chargement...",
      something_went_wrong: "Quelque chose a mal tourné",
      no_supported_wallets: "Il n'y a pas encore de portefeuilles pris en charge",
      no_wallets_found: "Aucun portefeuille trouvé"
    };
    var ko3 = {
      choose_preferred_wallet: "원하는 지갑을 선택하세요",
      connect_mobile_wallet: "모바일 지갑과 연결",
      scan_qrcode_with_wallet: "WalletConnect 지원 지갑에서 QR코드를 스캔하세요",
      connect: "연결",
      qrcode: "QR 코드",
      mobile: "모바일",
      desktop: "데스크탑",
      copy_to_clipboard: "클립보드에 복사",
      copied_to_clipboard: "클립보드에 복사되었습니다!",
      connect_with: "와 연결하다",
      loading: "로드 중...",
      something_went_wrong: "문제가 발생했습니다.",
      no_supported_wallets: "아직 지원되는 지갑이 없습니다",
      no_wallets_found: "지갑을 찾을 수 없습니다"
    };
    var pt3 = {
      choose_preferred_wallet: "Escolha sua carteira preferida",
      connect_mobile_wallet: "Conectar-se à carteira móvel",
      scan_qrcode_with_wallet: "Ler o código QR com uma carteira compatível com WalletConnect",
      connect: "Conectar",
      qrcode: "Código QR",
      mobile: "Móvel",
      desktop: "Desktop",
      copy_to_clipboard: "Copiar",
      copied_to_clipboard: "Copiado!",
      connect_with: "Ligar por meio de",
      loading: "Carregamento...",
      something_went_wrong: "Algo correu mal",
      no_supported_wallets: "Ainda não há carteiras suportadas",
      no_wallets_found: "Nenhuma carteira encontrada"
    };
    var zh = {
      choose_preferred_wallet: "选择你的钱包",
      connect_mobile_wallet: "连接至移动端钱包",
      scan_qrcode_with_wallet: "使用兼容 WalletConnect 的钱包扫描二维码",
      connect: "连接",
      qrcode: "二维码",
      mobile: "移动",
      desktop: "桌面",
      copy_to_clipboard: "复制到剪贴板",
      copied_to_clipboard: "复制到剪贴板成功！",
      connect_with: "通过以下方式连接",
      loading: "正在加载...",
      something_went_wrong: "出了问题",
      no_supported_wallets: "目前还没有支持的钱包",
      no_wallets_found: "没有找到钱包"
    };
    var fa = {
      choose_preferred_wallet: "کیف پول مورد نظر خود را انتخاب کنید",
      connect_mobile_wallet: "به کیف پول موبایل وصل شوید",
      scan_qrcode_with_wallet: "کد QR را با یک کیف پول سازگار با WalletConnect اسکن کنید",
      connect: "اتصال",
      qrcode: "کد QR",
      mobile: "سیار",
      desktop: "دسکتاپ",
      copy_to_clipboard: "کپی به کلیپ بورد",
      copied_to_clipboard: "در کلیپ بورد کپی شد!",
      connect_with: "ارتباط با",
      loading: "...بارگذاری",
      something_went_wrong: "مشکلی پیش آمد",
      no_supported_wallets: "هنوز هیچ کیف پول پشتیبانی شده ای وجود ندارد",
      no_wallets_found: "هیچ کیف پولی پیدا نشد"
    };
    var languages = {
      de: de4,
      en: en4,
      es: es2,
      fr: fr3,
      ko: ko3,
      pt: pt3,
      zh,
      fa
    };
    function injectStyleSheet() {
      var doc = browserUtils.getDocumentOrThrow();
      var prev = doc.getElementById(WALLETCONNECT_STYLE_ID);
      if (prev) {
        doc.head.removeChild(prev);
      }
      var style = doc.createElement("style");
      style.setAttribute("id", WALLETCONNECT_STYLE_ID);
      style.innerText = WALLETCONNECT_STYLE_SHEET;
      doc.head.appendChild(style);
    }
    function renderWrapper() {
      var doc = browserUtils.getDocumentOrThrow();
      var wrapper = doc.createElement("div");
      wrapper.setAttribute("id", WALLETCONNECT_WRAPPER_ID);
      doc.body.appendChild(wrapper);
      return wrapper;
    }
    function triggerCloseAnimation() {
      var doc = browserUtils.getDocumentOrThrow();
      var modal = doc.getElementById(WALLETCONNECT_MODAL_ID);
      if (modal) {
        modal.className = modal.className.replace("fadeIn", "fadeOut");
        setTimeout(function() {
          var wrapper = doc.getElementById(WALLETCONNECT_WRAPPER_ID);
          if (wrapper) {
            doc.body.removeChild(wrapper);
          }
        }, ANIMATION_DURATION);
      }
    }
    function getWrappedCallback(cb) {
      return function() {
        triggerCloseAnimation();
        if (cb) {
          cb();
        }
      };
    }
    function getText() {
      var lang = browserUtils.getNavigatorOrThrow().language.split("-")[0] || "en";
      return languages[lang] || languages["en"];
    }
    function open$1(uri, cb, qrcodeModalOptions) {
      injectStyleSheet();
      var wrapper = renderWrapper();
      React.render(React.createElement(Modal, {
        text: getText(),
        uri,
        onClose: getWrappedCallback(cb),
        qrcodeModalOptions
      }), wrapper);
    }
    function close$1() {
      triggerCloseAnimation();
    }
    var isNode3 = function() {
      return typeof process !== "undefined" && typeof process.versions !== "undefined" && typeof process.versions.node !== "undefined";
    };
    function open$2(uri, cb, qrcodeModalOptions) {
      console.log(uri);
      if (isNode3()) {
        open(uri);
      } else {
        open$1(uri, cb, qrcodeModalOptions);
      }
    }
    function close$2() {
      if (isNode3()) ;
      else {
        close$1();
      }
    }
    var index = {
      open: open$2,
      close: close$2
    };
    module.exports = index;
  }
});

// node_modules/@walletconnect/time/node_modules/tslib/tslib.es6.js
var tslib_es6_exports = {};
__export(tslib_es6_exports, {
  __assign: () => __assign,
  __asyncDelegator: () => __asyncDelegator,
  __asyncGenerator: () => __asyncGenerator,
  __asyncValues: () => __asyncValues,
  __await: () => __await,
  __awaiter: () => __awaiter,
  __classPrivateFieldGet: () => __classPrivateFieldGet,
  __classPrivateFieldSet: () => __classPrivateFieldSet,
  __createBinding: () => __createBinding,
  __decorate: () => __decorate,
  __exportStar: () => __exportStar,
  __extends: () => __extends,
  __generator: () => __generator,
  __importDefault: () => __importDefault,
  __importStar: () => __importStar,
  __makeTemplateObject: () => __makeTemplateObject,
  __metadata: () => __metadata,
  __param: () => __param,
  __read: () => __read,
  __rest: () => __rest,
  __spread: () => __spread,
  __spreadArrays: () => __spreadArrays2,
  __values: () => __values
});
function __extends(d7, b5) {
  extendStatics(d7, b5);
  function __() {
    this.constructor = d7;
  }
  d7.prototype = b5 === null ? Object.create(b5) : (__.prototype = b5.prototype, new __());
}
function __rest(s5, e4) {
  var t3 = {};
  for (var p6 in s5) if (Object.prototype.hasOwnProperty.call(s5, p6) && e4.indexOf(p6) < 0)
    t3[p6] = s5[p6];
  if (s5 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i6 = 0, p6 = Object.getOwnPropertySymbols(s5); i6 < p6.length; i6++) {
      if (e4.indexOf(p6[i6]) < 0 && Object.prototype.propertyIsEnumerable.call(s5, p6[i6]))
        t3[p6[i6]] = s5[p6[i6]];
    }
  return t3;
}
function __decorate(decorators, target, key, desc) {
  var c8 = arguments.length, r5 = c8 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d7;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r5 = Reflect.decorate(decorators, target, key, desc);
  else for (var i6 = decorators.length - 1; i6 >= 0; i6--) if (d7 = decorators[i6]) r5 = (c8 < 3 ? d7(r5) : c8 > 3 ? d7(target, key, r5) : d7(target, key)) || r5;
  return c8 > 3 && r5 && Object.defineProperty(target, key, r5), r5;
}
function __param(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P6, generator) {
  function adopt(value) {
    return value instanceof P6 ? value : new P6(function(resolve) {
      resolve(value);
    });
  }
  return new (P6 || (P6 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e4) {
        reject(e4);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e4) {
        reject(e4);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _8 = { label: 0, sent: function() {
    if (t3[0] & 1) throw t3[1];
    return t3[1];
  }, trys: [], ops: [] }, f8, y6, t3, g5;
  return g5 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g5[Symbol.iterator] = function() {
    return this;
  }), g5;
  function verb(n7) {
    return function(v7) {
      return step([n7, v7]);
    };
  }
  function step(op) {
    if (f8) throw new TypeError("Generator is already executing.");
    while (_8) try {
      if (f8 = 1, y6 && (t3 = op[0] & 2 ? y6["return"] : op[0] ? y6["throw"] || ((t3 = y6["return"]) && t3.call(y6), 0) : y6.next) && !(t3 = t3.call(y6, op[1])).done) return t3;
      if (y6 = 0, t3) op = [op[0] & 2, t3.value];
      switch (op[0]) {
        case 0:
        case 1:
          t3 = op;
          break;
        case 4:
          _8.label++;
          return { value: op[1], done: false };
        case 5:
          _8.label++;
          y6 = op[1];
          op = [0];
          continue;
        case 7:
          op = _8.ops.pop();
          _8.trys.pop();
          continue;
        default:
          if (!(t3 = _8.trys, t3 = t3.length > 0 && t3[t3.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _8 = 0;
            continue;
          }
          if (op[0] === 3 && (!t3 || op[1] > t3[0] && op[1] < t3[3])) {
            _8.label = op[1];
            break;
          }
          if (op[0] === 6 && _8.label < t3[1]) {
            _8.label = t3[1];
            t3 = op;
            break;
          }
          if (t3 && _8.label < t3[2]) {
            _8.label = t3[2];
            _8.ops.push(op);
            break;
          }
          if (t3[2]) _8.ops.pop();
          _8.trys.pop();
          continue;
      }
      op = body.call(thisArg, _8);
    } catch (e4) {
      op = [6, e4];
      y6 = 0;
    } finally {
      f8 = t3 = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __createBinding(o6, m5, k7, k22) {
  if (k22 === void 0) k22 = k7;
  o6[k22] = m5[k7];
}
function __exportStar(m5, exports) {
  for (var p6 in m5) if (p6 !== "default" && !exports.hasOwnProperty(p6)) exports[p6] = m5[p6];
}
function __values(o6) {
  var s5 = typeof Symbol === "function" && Symbol.iterator, m5 = s5 && o6[s5], i6 = 0;
  if (m5) return m5.call(o6);
  if (o6 && typeof o6.length === "number") return {
    next: function() {
      if (o6 && i6 >= o6.length) o6 = void 0;
      return { value: o6 && o6[i6++], done: !o6 };
    }
  };
  throw new TypeError(s5 ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o6, n7) {
  var m5 = typeof Symbol === "function" && o6[Symbol.iterator];
  if (!m5) return o6;
  var i6 = m5.call(o6), r5, ar4 = [], e4;
  try {
    while ((n7 === void 0 || n7-- > 0) && !(r5 = i6.next()).done) ar4.push(r5.value);
  } catch (error) {
    e4 = { error };
  } finally {
    try {
      if (r5 && !r5.done && (m5 = i6["return"])) m5.call(i6);
    } finally {
      if (e4) throw e4.error;
    }
  }
  return ar4;
}
function __spread() {
  for (var ar4 = [], i6 = 0; i6 < arguments.length; i6++)
    ar4 = ar4.concat(__read(arguments[i6]));
  return ar4;
}
function __spreadArrays2() {
  for (var s5 = 0, i6 = 0, il = arguments.length; i6 < il; i6++) s5 += arguments[i6].length;
  for (var r5 = Array(s5), k7 = 0, i6 = 0; i6 < il; i6++)
    for (var a5 = arguments[i6], j6 = 0, jl = a5.length; j6 < jl; j6++, k7++)
      r5[k7] = a5[j6];
  return r5;
}
function __await(v7) {
  return this instanceof __await ? (this.v = v7, this) : new __await(v7);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g5 = generator.apply(thisArg, _arguments || []), i6, q5 = [];
  return i6 = {}, verb("next"), verb("throw"), verb("return"), i6[Symbol.asyncIterator] = function() {
    return this;
  }, i6;
  function verb(n7) {
    if (g5[n7]) i6[n7] = function(v7) {
      return new Promise(function(a5, b5) {
        q5.push([n7, v7, a5, b5]) > 1 || resume(n7, v7);
      });
    };
  }
  function resume(n7, v7) {
    try {
      step(g5[n7](v7));
    } catch (e4) {
      settle(q5[0][3], e4);
    }
  }
  function step(r5) {
    r5.value instanceof __await ? Promise.resolve(r5.value.v).then(fulfill, reject) : settle(q5[0][2], r5);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f8, v7) {
    if (f8(v7), q5.shift(), q5.length) resume(q5[0][0], q5[0][1]);
  }
}
function __asyncDelegator(o6) {
  var i6, p6;
  return i6 = {}, verb("next"), verb("throw", function(e4) {
    throw e4;
  }), verb("return"), i6[Symbol.iterator] = function() {
    return this;
  }, i6;
  function verb(n7, f8) {
    i6[n7] = o6[n7] ? function(v7) {
      return (p6 = !p6) ? { value: __await(o6[n7](v7)), done: n7 === "return" } : f8 ? f8(v7) : v7;
    } : f8;
  }
}
function __asyncValues(o6) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m5 = o6[Symbol.asyncIterator], i6;
  return m5 ? m5.call(o6) : (o6 = typeof __values === "function" ? __values(o6) : o6[Symbol.iterator](), i6 = {}, verb("next"), verb("throw"), verb("return"), i6[Symbol.asyncIterator] = function() {
    return this;
  }, i6);
  function verb(n7) {
    i6[n7] = o6[n7] && function(v7) {
      return new Promise(function(resolve, reject) {
        v7 = o6[n7](v7), settle(resolve, reject, v7.done, v7.value);
      });
    };
  }
  function settle(resolve, reject, d7, v7) {
    Promise.resolve(v7).then(function(v8) {
      resolve({ value: v8, done: d7 });
    }, reject);
  }
}
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) {
    for (var k7 in mod) if (Object.hasOwnProperty.call(mod, k7)) result[k7] = mod[k7];
  }
  result.default = mod;
  return result;
}
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : { default: mod };
}
function __classPrivateFieldGet(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }
  return privateMap.get(receiver);
}
function __classPrivateFieldSet(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }
  privateMap.set(receiver, value);
  return value;
}
var extendStatics, __assign;
var init_tslib_es6 = __esm({
  "node_modules/@walletconnect/time/node_modules/tslib/tslib.es6.js"() {
    extendStatics = function(d7, b5) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d8, b6) {
        d8.__proto__ = b6;
      } || function(d8, b6) {
        for (var p6 in b6) if (b6.hasOwnProperty(p6)) d8[p6] = b6[p6];
      };
      return extendStatics(d7, b5);
    };
    __assign = function() {
      __assign = Object.assign || function __assign3(t3) {
        for (var s5, i6 = 1, n7 = arguments.length; i6 < n7; i6++) {
          s5 = arguments[i6];
          for (var p6 in s5) if (Object.prototype.hasOwnProperty.call(s5, p6)) t3[p6] = s5[p6];
        }
        return t3;
      };
      return __assign.apply(this, arguments);
    };
  }
});

// node_modules/@walletconnect/time/dist/cjs/utils/delay.js
var require_delay = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/utils/delay.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.delay = void 0;
    function delay(timeout) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, timeout);
      });
    }
    exports.delay = delay;
  }
});

// node_modules/@walletconnect/time/dist/cjs/constants/misc.js
var require_misc = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/constants/misc.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ONE_THOUSAND = exports.ONE_HUNDRED = void 0;
    exports.ONE_HUNDRED = 100;
    exports.ONE_THOUSAND = 1e3;
  }
});

// node_modules/@walletconnect/time/dist/cjs/constants/time.js
var require_time = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/constants/time.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ONE_YEAR = exports.FOUR_WEEKS = exports.THREE_WEEKS = exports.TWO_WEEKS = exports.ONE_WEEK = exports.THIRTY_DAYS = exports.SEVEN_DAYS = exports.FIVE_DAYS = exports.THREE_DAYS = exports.ONE_DAY = exports.TWENTY_FOUR_HOURS = exports.TWELVE_HOURS = exports.SIX_HOURS = exports.THREE_HOURS = exports.ONE_HOUR = exports.SIXTY_MINUTES = exports.THIRTY_MINUTES = exports.TEN_MINUTES = exports.FIVE_MINUTES = exports.ONE_MINUTE = exports.SIXTY_SECONDS = exports.THIRTY_SECONDS = exports.TEN_SECONDS = exports.FIVE_SECONDS = exports.ONE_SECOND = void 0;
    exports.ONE_SECOND = 1;
    exports.FIVE_SECONDS = 5;
    exports.TEN_SECONDS = 10;
    exports.THIRTY_SECONDS = 30;
    exports.SIXTY_SECONDS = 60;
    exports.ONE_MINUTE = exports.SIXTY_SECONDS;
    exports.FIVE_MINUTES = exports.ONE_MINUTE * 5;
    exports.TEN_MINUTES = exports.ONE_MINUTE * 10;
    exports.THIRTY_MINUTES = exports.ONE_MINUTE * 30;
    exports.SIXTY_MINUTES = exports.ONE_MINUTE * 60;
    exports.ONE_HOUR = exports.SIXTY_MINUTES;
    exports.THREE_HOURS = exports.ONE_HOUR * 3;
    exports.SIX_HOURS = exports.ONE_HOUR * 6;
    exports.TWELVE_HOURS = exports.ONE_HOUR * 12;
    exports.TWENTY_FOUR_HOURS = exports.ONE_HOUR * 24;
    exports.ONE_DAY = exports.TWENTY_FOUR_HOURS;
    exports.THREE_DAYS = exports.ONE_DAY * 3;
    exports.FIVE_DAYS = exports.ONE_DAY * 5;
    exports.SEVEN_DAYS = exports.ONE_DAY * 7;
    exports.THIRTY_DAYS = exports.ONE_DAY * 30;
    exports.ONE_WEEK = exports.SEVEN_DAYS;
    exports.TWO_WEEKS = exports.ONE_WEEK * 2;
    exports.THREE_WEEKS = exports.ONE_WEEK * 3;
    exports.FOUR_WEEKS = exports.ONE_WEEK * 4;
    exports.ONE_YEAR = exports.ONE_DAY * 365;
  }
});

// node_modules/@walletconnect/time/dist/cjs/constants/index.js
var require_constants = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/constants/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_misc(), exports);
    tslib_1.__exportStar(require_time(), exports);
  }
});

// node_modules/@walletconnect/time/dist/cjs/utils/convert.js
var require_convert = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/utils/convert.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fromMiliseconds = exports.toMiliseconds = void 0;
    var constants_1 = require_constants();
    function toMiliseconds(seconds) {
      return seconds * constants_1.ONE_THOUSAND;
    }
    exports.toMiliseconds = toMiliseconds;
    function fromMiliseconds(miliseconds) {
      return Math.floor(miliseconds / constants_1.ONE_THOUSAND);
    }
    exports.fromMiliseconds = fromMiliseconds;
  }
});

// node_modules/@walletconnect/time/dist/cjs/utils/index.js
var require_utils3 = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/utils/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_delay(), exports);
    tslib_1.__exportStar(require_convert(), exports);
  }
});

// node_modules/@walletconnect/time/dist/cjs/watch.js
var require_watch = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/watch.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Watch = void 0;
    var Watch = class {
      constructor() {
        this.timestamps = /* @__PURE__ */ new Map();
      }
      start(label) {
        if (this.timestamps.has(label)) {
          throw new Error(`Watch already started for label: ${label}`);
        }
        this.timestamps.set(label, { started: Date.now() });
      }
      stop(label) {
        const timestamp = this.get(label);
        if (typeof timestamp.elapsed !== "undefined") {
          throw new Error(`Watch already stopped for label: ${label}`);
        }
        const elapsed = Date.now() - timestamp.started;
        this.timestamps.set(label, { started: timestamp.started, elapsed });
      }
      get(label) {
        const timestamp = this.timestamps.get(label);
        if (typeof timestamp === "undefined") {
          throw new Error(`No timestamp found for label: ${label}`);
        }
        return timestamp;
      }
      elapsed(label) {
        const timestamp = this.get(label);
        const elapsed = timestamp.elapsed || Date.now() - timestamp.started;
        return elapsed;
      }
    };
    exports.Watch = Watch;
    exports.default = Watch;
  }
});

// node_modules/@walletconnect/time/dist/cjs/types/watch.js
var require_watch2 = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/types/watch.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IWatch = void 0;
    var IWatch = class {
    };
    exports.IWatch = IWatch;
  }
});

// node_modules/@walletconnect/time/dist/cjs/types/index.js
var require_types = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/types/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_watch2(), exports);
  }
});

// node_modules/@walletconnect/time/dist/cjs/index.js
var require_cjs4 = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_utils3(), exports);
    tslib_1.__exportStar(require_watch(), exports);
    tslib_1.__exportStar(require_types(), exports);
    tslib_1.__exportStar(require_constants(), exports);
  }
});

// node_modules/quick-format-unescaped/index.js
var require_quick_format_unescaped = __commonJS({
  "node_modules/quick-format-unescaped/index.js"(exports, module) {
    "use strict";
    function tryStringify(o6) {
      try {
        return JSON.stringify(o6);
      } catch (e4) {
        return '"[Circular]"';
      }
    }
    module.exports = format;
    function format(f8, args, opts) {
      var ss2 = opts && opts.stringify || tryStringify;
      var offset = 1;
      if (typeof f8 === "object" && f8 !== null) {
        var len = args.length + offset;
        if (len === 1) return f8;
        var objects = new Array(len);
        objects[0] = ss2(f8);
        for (var index = 1; index < len; index++) {
          objects[index] = ss2(args[index]);
        }
        return objects.join(" ");
      }
      if (typeof f8 !== "string") {
        return f8;
      }
      var argLen = args.length;
      if (argLen === 0) return f8;
      var str = "";
      var a5 = 1 - offset;
      var lastPos = -1;
      var flen = f8 && f8.length || 0;
      for (var i6 = 0; i6 < flen; ) {
        if (f8.charCodeAt(i6) === 37 && i6 + 1 < flen) {
          lastPos = lastPos > -1 ? lastPos : 0;
          switch (f8.charCodeAt(i6 + 1)) {
            case 100:
            case 102:
              if (a5 >= argLen)
                break;
              if (args[a5] == null) break;
              if (lastPos < i6)
                str += f8.slice(lastPos, i6);
              str += Number(args[a5]);
              lastPos = i6 + 2;
              i6++;
              break;
            case 105:
              if (a5 >= argLen)
                break;
              if (args[a5] == null) break;
              if (lastPos < i6)
                str += f8.slice(lastPos, i6);
              str += Math.floor(Number(args[a5]));
              lastPos = i6 + 2;
              i6++;
              break;
            case 79:
            case 111:
            case 106:
              if (a5 >= argLen)
                break;
              if (args[a5] === void 0) break;
              if (lastPos < i6)
                str += f8.slice(lastPos, i6);
              var type = typeof args[a5];
              if (type === "string") {
                str += "'" + args[a5] + "'";
                lastPos = i6 + 2;
                i6++;
                break;
              }
              if (type === "function") {
                str += args[a5].name || "<anonymous>";
                lastPos = i6 + 2;
                i6++;
                break;
              }
              str += ss2(args[a5]);
              lastPos = i6 + 2;
              i6++;
              break;
            case 115:
              if (a5 >= argLen)
                break;
              if (lastPos < i6)
                str += f8.slice(lastPos, i6);
              str += String(args[a5]);
              lastPos = i6 + 2;
              i6++;
              break;
            case 37:
              if (lastPos < i6)
                str += f8.slice(lastPos, i6);
              str += "%";
              lastPos = i6 + 2;
              i6++;
              a5--;
              break;
          }
          ++a5;
        }
        ++i6;
      }
      if (lastPos === -1)
        return f8;
      else if (lastPos < flen) {
        str += f8.slice(lastPos);
      }
      return str;
    }
  }
});

// node_modules/pino/browser.js
var require_browser2 = __commonJS({
  "node_modules/pino/browser.js"(exports, module) {
    "use strict";
    var format = require_quick_format_unescaped();
    module.exports = pino;
    var _console = pfGlobalThisOrFallback().console || {};
    var stdSerializers = {
      mapHttpRequest: mock,
      mapHttpResponse: mock,
      wrapRequestSerializer: passthrough,
      wrapResponseSerializer: passthrough,
      wrapErrorSerializer: passthrough,
      req: mock,
      res: mock,
      err: asErrValue
    };
    function shouldSerialize(serialize, serializers) {
      if (Array.isArray(serialize)) {
        const hasToFilter = serialize.filter(function(k7) {
          return k7 !== "!stdSerializers.err";
        });
        return hasToFilter;
      } else if (serialize === true) {
        return Object.keys(serializers);
      }
      return false;
    }
    function pino(opts) {
      opts = opts || {};
      opts.browser = opts.browser || {};
      const transmit2 = opts.browser.transmit;
      if (transmit2 && typeof transmit2.send !== "function") {
        throw Error("pino: transmit option must have a send function");
      }
      const proto = opts.browser.write || _console;
      if (opts.browser.write) opts.browser.asObject = true;
      const serializers = opts.serializers || {};
      const serialize = shouldSerialize(opts.browser.serialize, serializers);
      let stdErrSerialize = opts.browser.serialize;
      if (Array.isArray(opts.browser.serialize) && opts.browser.serialize.indexOf("!stdSerializers.err") > -1) stdErrSerialize = false;
      const levels = ["error", "fatal", "warn", "info", "debug", "trace"];
      if (typeof proto === "function") {
        proto.error = proto.fatal = proto.warn = proto.info = proto.debug = proto.trace = proto;
      }
      if (opts.enabled === false) opts.level = "silent";
      const level = opts.level || "info";
      const logger = Object.create(proto);
      if (!logger.log) logger.log = noop;
      Object.defineProperty(logger, "levelVal", {
        get: getLevelVal
      });
      Object.defineProperty(logger, "level", {
        get: getLevel,
        set: setLevel
      });
      const setOpts = {
        transmit: transmit2,
        serialize,
        asObject: opts.browser.asObject,
        levels,
        timestamp: getTimeFunction(opts)
      };
      logger.levels = pino.levels;
      logger.level = level;
      logger.setMaxListeners = logger.getMaxListeners = logger.emit = logger.addListener = logger.on = logger.prependListener = logger.once = logger.prependOnceListener = logger.removeListener = logger.removeAllListeners = logger.listeners = logger.listenerCount = logger.eventNames = logger.write = logger.flush = noop;
      logger.serializers = serializers;
      logger._serialize = serialize;
      logger._stdErrSerialize = stdErrSerialize;
      logger.child = child;
      if (transmit2) logger._logEvent = createLogEventShape();
      function getLevelVal() {
        return this.level === "silent" ? Infinity : this.levels.values[this.level];
      }
      function getLevel() {
        return this._level;
      }
      function setLevel(level2) {
        if (level2 !== "silent" && !this.levels.values[level2]) {
          throw Error("unknown level " + level2);
        }
        this._level = level2;
        set2(setOpts, logger, "error", "log");
        set2(setOpts, logger, "fatal", "error");
        set2(setOpts, logger, "warn", "error");
        set2(setOpts, logger, "info", "log");
        set2(setOpts, logger, "debug", "log");
        set2(setOpts, logger, "trace", "log");
      }
      function child(bindings, childOptions) {
        if (!bindings) {
          throw new Error("missing bindings for child Pino");
        }
        childOptions = childOptions || {};
        if (serialize && bindings.serializers) {
          childOptions.serializers = bindings.serializers;
        }
        const childOptionsSerializers = childOptions.serializers;
        if (serialize && childOptionsSerializers) {
          var childSerializers = Object.assign({}, serializers, childOptionsSerializers);
          var childSerialize = opts.browser.serialize === true ? Object.keys(childSerializers) : serialize;
          delete bindings.serializers;
          applySerializers([bindings], childSerialize, childSerializers, this._stdErrSerialize);
        }
        function Child(parent) {
          this._childLevel = (parent._childLevel | 0) + 1;
          this.error = bind(parent, bindings, "error");
          this.fatal = bind(parent, bindings, "fatal");
          this.warn = bind(parent, bindings, "warn");
          this.info = bind(parent, bindings, "info");
          this.debug = bind(parent, bindings, "debug");
          this.trace = bind(parent, bindings, "trace");
          if (childSerializers) {
            this.serializers = childSerializers;
            this._serialize = childSerialize;
          }
          if (transmit2) {
            this._logEvent = createLogEventShape(
              [].concat(parent._logEvent.bindings, bindings)
            );
          }
        }
        Child.prototype = this;
        return new Child(this);
      }
      return logger;
    }
    pino.levels = {
      values: {
        fatal: 60,
        error: 50,
        warn: 40,
        info: 30,
        debug: 20,
        trace: 10
      },
      labels: {
        10: "trace",
        20: "debug",
        30: "info",
        40: "warn",
        50: "error",
        60: "fatal"
      }
    };
    pino.stdSerializers = stdSerializers;
    pino.stdTimeFunctions = Object.assign({}, { nullTime, epochTime, unixTime, isoTime });
    function set2(opts, logger, level, fallback2) {
      const proto = Object.getPrototypeOf(logger);
      logger[level] = logger.levelVal > logger.levels.values[level] ? noop : proto[level] ? proto[level] : _console[level] || _console[fallback2] || noop;
      wrap(opts, logger, level);
    }
    function wrap(opts, logger, level) {
      if (!opts.transmit && logger[level] === noop) return;
      logger[level] = /* @__PURE__ */ function(write) {
        return function LOG() {
          const ts2 = opts.timestamp();
          const args = new Array(arguments.length);
          const proto = Object.getPrototypeOf && Object.getPrototypeOf(this) === _console ? _console : this;
          for (var i6 = 0; i6 < args.length; i6++) args[i6] = arguments[i6];
          if (opts.serialize && !opts.asObject) {
            applySerializers(args, this._serialize, this.serializers, this._stdErrSerialize);
          }
          if (opts.asObject) write.call(proto, asObject(this, level, args, ts2));
          else write.apply(proto, args);
          if (opts.transmit) {
            const transmitLevel = opts.transmit.level || logger.level;
            const transmitValue = pino.levels.values[transmitLevel];
            const methodValue = pino.levels.values[level];
            if (methodValue < transmitValue) return;
            transmit(this, {
              ts: ts2,
              methodLevel: level,
              methodValue,
              transmitLevel,
              transmitValue: pino.levels.values[opts.transmit.level || logger.level],
              send: opts.transmit.send,
              val: logger.levelVal
            }, args);
          }
        };
      }(logger[level]);
    }
    function asObject(logger, level, args, ts2) {
      if (logger._serialize) applySerializers(args, logger._serialize, logger.serializers, logger._stdErrSerialize);
      const argsCloned = args.slice();
      let msg = argsCloned[0];
      const o6 = {};
      if (ts2) {
        o6.time = ts2;
      }
      o6.level = pino.levels.values[level];
      let lvl = (logger._childLevel | 0) + 1;
      if (lvl < 1) lvl = 1;
      if (msg !== null && typeof msg === "object") {
        while (lvl-- && typeof argsCloned[0] === "object") {
          Object.assign(o6, argsCloned.shift());
        }
        msg = argsCloned.length ? format(argsCloned.shift(), argsCloned) : void 0;
      } else if (typeof msg === "string") msg = format(argsCloned.shift(), argsCloned);
      if (msg !== void 0) o6.msg = msg;
      return o6;
    }
    function applySerializers(args, serialize, serializers, stdErrSerialize) {
      for (const i6 in args) {
        if (stdErrSerialize && args[i6] instanceof Error) {
          args[i6] = pino.stdSerializers.err(args[i6]);
        } else if (typeof args[i6] === "object" && !Array.isArray(args[i6])) {
          for (const k7 in args[i6]) {
            if (serialize && serialize.indexOf(k7) > -1 && k7 in serializers) {
              args[i6][k7] = serializers[k7](args[i6][k7]);
            }
          }
        }
      }
    }
    function bind(parent, bindings, level) {
      return function() {
        const args = new Array(1 + arguments.length);
        args[0] = bindings;
        for (var i6 = 1; i6 < args.length; i6++) {
          args[i6] = arguments[i6 - 1];
        }
        return parent[level].apply(this, args);
      };
    }
    function transmit(logger, opts, args) {
      const send = opts.send;
      const ts2 = opts.ts;
      const methodLevel = opts.methodLevel;
      const methodValue = opts.methodValue;
      const val = opts.val;
      const bindings = logger._logEvent.bindings;
      applySerializers(
        args,
        logger._serialize || Object.keys(logger.serializers),
        logger.serializers,
        logger._stdErrSerialize === void 0 ? true : logger._stdErrSerialize
      );
      logger._logEvent.ts = ts2;
      logger._logEvent.messages = args.filter(function(arg) {
        return bindings.indexOf(arg) === -1;
      });
      logger._logEvent.level.label = methodLevel;
      logger._logEvent.level.value = methodValue;
      send(methodLevel, logger._logEvent, val);
      logger._logEvent = createLogEventShape(bindings);
    }
    function createLogEventShape(bindings) {
      return {
        ts: 0,
        messages: [],
        bindings: bindings || [],
        level: { label: "", value: 0 }
      };
    }
    function asErrValue(err) {
      const obj = {
        type: err.constructor.name,
        msg: err.message,
        stack: err.stack
      };
      for (const key in err) {
        if (obj[key] === void 0) {
          obj[key] = err[key];
        }
      }
      return obj;
    }
    function getTimeFunction(opts) {
      if (typeof opts.timestamp === "function") {
        return opts.timestamp;
      }
      if (opts.timestamp === false) {
        return nullTime;
      }
      return epochTime;
    }
    function mock() {
      return {};
    }
    function passthrough(a5) {
      return a5;
    }
    function noop() {
    }
    function nullTime() {
      return false;
    }
    function epochTime() {
      return Date.now();
    }
    function unixTime() {
      return Math.round(Date.now() / 1e3);
    }
    function isoTime() {
      return new Date(Date.now()).toISOString();
    }
    function pfGlobalThisOrFallback() {
      function defd(o6) {
        return typeof o6 !== "undefined" && o6;
      }
      try {
        if (typeof globalThis !== "undefined") return globalThis;
        Object.defineProperty(Object.prototype, "globalThis", {
          get: function() {
            delete Object.prototype.globalThis;
            return this.globalThis = this;
          },
          configurable: true
        });
        return globalThis;
      } catch (e4) {
        return defd(self) || defd(window) || defd(this) || {};
      }
    }
  }
});

// node_modules/@walletconnect/utils/node_modules/@walletconnect/window-getters/dist/cjs/index.js
var require_cjs5 = __commonJS({
  "node_modules/@walletconnect/utils/node_modules/@walletconnect/window-getters/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getLocalStorage = exports.getLocalStorageOrThrow = exports.getCrypto = exports.getCryptoOrThrow = exports.getLocation = exports.getLocationOrThrow = exports.getNavigator = exports.getNavigatorOrThrow = exports.getDocument = exports.getDocumentOrThrow = exports.getFromWindowOrThrow = exports.getFromWindow = void 0;
    function getFromWindow3(name2) {
      let res = void 0;
      if (typeof window !== "undefined" && typeof window[name2] !== "undefined") {
        res = window[name2];
      }
      return res;
    }
    exports.getFromWindow = getFromWindow3;
    function getFromWindowOrThrow3(name2) {
      const res = getFromWindow3(name2);
      if (!res) {
        throw new Error(`${name2} is not defined in Window`);
      }
      return res;
    }
    exports.getFromWindowOrThrow = getFromWindowOrThrow3;
    function getDocumentOrThrow3() {
      return getFromWindowOrThrow3("document");
    }
    exports.getDocumentOrThrow = getDocumentOrThrow3;
    function getDocument3() {
      return getFromWindow3("document");
    }
    exports.getDocument = getDocument3;
    function getNavigatorOrThrow3() {
      return getFromWindowOrThrow3("navigator");
    }
    exports.getNavigatorOrThrow = getNavigatorOrThrow3;
    function getNavigator3() {
      return getFromWindow3("navigator");
    }
    exports.getNavigator = getNavigator3;
    function getLocationOrThrow3() {
      return getFromWindowOrThrow3("location");
    }
    exports.getLocationOrThrow = getLocationOrThrow3;
    function getLocation3() {
      return getFromWindow3("location");
    }
    exports.getLocation = getLocation3;
    function getCryptoOrThrow3() {
      return getFromWindowOrThrow3("crypto");
    }
    exports.getCryptoOrThrow = getCryptoOrThrow3;
    function getCrypto3() {
      return getFromWindow3("crypto");
    }
    exports.getCrypto = getCrypto3;
    function getLocalStorageOrThrow3() {
      return getFromWindowOrThrow3("localStorage");
    }
    exports.getLocalStorageOrThrow = getLocalStorageOrThrow3;
    function getLocalStorage3() {
      return getFromWindow3("localStorage");
    }
    exports.getLocalStorage = getLocalStorage3;
  }
});

// node_modules/@walletconnect/utils/node_modules/@walletconnect/window-metadata/dist/cjs/index.js
var require_cjs6 = __commonJS({
  "node_modules/@walletconnect/utils/node_modules/@walletconnect/window-metadata/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getWindowMetadata = void 0;
    var window_getters_1 = require_cjs5();
    function getWindowMetadata2() {
      let doc;
      let loc;
      try {
        doc = window_getters_1.getDocumentOrThrow();
        loc = window_getters_1.getLocationOrThrow();
      } catch (e4) {
        return null;
      }
      function getIcons() {
        const links = doc.getElementsByTagName("link");
        const icons2 = [];
        for (let i6 = 0; i6 < links.length; i6++) {
          const link = links[i6];
          const rel = link.getAttribute("rel");
          if (rel) {
            if (rel.toLowerCase().indexOf("icon") > -1) {
              const href = link.getAttribute("href");
              if (href) {
                if (href.toLowerCase().indexOf("https:") === -1 && href.toLowerCase().indexOf("http:") === -1 && href.indexOf("//") !== 0) {
                  let absoluteHref = loc.protocol + "//" + loc.host;
                  if (href.indexOf("/") === 0) {
                    absoluteHref += href;
                  } else {
                    const path = loc.pathname.split("/");
                    path.pop();
                    const finalPath = path.join("/");
                    absoluteHref += finalPath + "/" + href;
                  }
                  icons2.push(absoluteHref);
                } else if (href.indexOf("//") === 0) {
                  const absoluteUrl = loc.protocol + href;
                  icons2.push(absoluteUrl);
                } else {
                  icons2.push(href);
                }
              }
            }
          }
        }
        return icons2;
      }
      function getWindowMetadataOfAny(...args) {
        const metaTags = doc.getElementsByTagName("meta");
        for (let i6 = 0; i6 < metaTags.length; i6++) {
          const tag = metaTags[i6];
          const attributes = ["itemprop", "property", "name"].map((target) => tag.getAttribute(target)).filter((attr) => {
            if (attr) {
              return args.includes(attr);
            }
            return false;
          });
          if (attributes.length && attributes) {
            const content = tag.getAttribute("content");
            if (content) {
              return content;
            }
          }
        }
        return "";
      }
      function getName() {
        let name3 = getWindowMetadataOfAny("name", "og:site_name", "og:title", "twitter:title");
        if (!name3) {
          name3 = doc.title;
        }
        return name3;
      }
      function getDescription() {
        const description2 = getWindowMetadataOfAny("description", "og:description", "twitter:description", "keywords");
        return description2;
      }
      const name2 = getName();
      const description = getDescription();
      const url = loc.origin;
      const icons = getIcons();
      const meta = {
        description,
        url,
        icons,
        name: name2
      };
      return meta;
    }
    exports.getWindowMetadata = getWindowMetadata2;
  }
});

// node_modules/@walletconnect/environment/node_modules/tslib/tslib.es6.js
var tslib_es6_exports2 = {};
__export(tslib_es6_exports2, {
  __assign: () => __assign2,
  __asyncDelegator: () => __asyncDelegator2,
  __asyncGenerator: () => __asyncGenerator2,
  __asyncValues: () => __asyncValues2,
  __await: () => __await2,
  __awaiter: () => __awaiter2,
  __classPrivateFieldGet: () => __classPrivateFieldGet2,
  __classPrivateFieldSet: () => __classPrivateFieldSet2,
  __createBinding: () => __createBinding2,
  __decorate: () => __decorate2,
  __exportStar: () => __exportStar2,
  __extends: () => __extends2,
  __generator: () => __generator2,
  __importDefault: () => __importDefault2,
  __importStar: () => __importStar2,
  __makeTemplateObject: () => __makeTemplateObject2,
  __metadata: () => __metadata2,
  __param: () => __param2,
  __read: () => __read2,
  __rest: () => __rest2,
  __spread: () => __spread2,
  __spreadArrays: () => __spreadArrays3,
  __values: () => __values2
});
function __extends2(d7, b5) {
  extendStatics2(d7, b5);
  function __() {
    this.constructor = d7;
  }
  d7.prototype = b5 === null ? Object.create(b5) : (__.prototype = b5.prototype, new __());
}
function __rest2(s5, e4) {
  var t3 = {};
  for (var p6 in s5) if (Object.prototype.hasOwnProperty.call(s5, p6) && e4.indexOf(p6) < 0)
    t3[p6] = s5[p6];
  if (s5 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i6 = 0, p6 = Object.getOwnPropertySymbols(s5); i6 < p6.length; i6++) {
      if (e4.indexOf(p6[i6]) < 0 && Object.prototype.propertyIsEnumerable.call(s5, p6[i6]))
        t3[p6[i6]] = s5[p6[i6]];
    }
  return t3;
}
function __decorate2(decorators, target, key, desc) {
  var c8 = arguments.length, r5 = c8 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d7;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r5 = Reflect.decorate(decorators, target, key, desc);
  else for (var i6 = decorators.length - 1; i6 >= 0; i6--) if (d7 = decorators[i6]) r5 = (c8 < 3 ? d7(r5) : c8 > 3 ? d7(target, key, r5) : d7(target, key)) || r5;
  return c8 > 3 && r5 && Object.defineProperty(target, key, r5), r5;
}
function __param2(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
function __metadata2(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter2(thisArg, _arguments, P6, generator) {
  function adopt(value) {
    return value instanceof P6 ? value : new P6(function(resolve) {
      resolve(value);
    });
  }
  return new (P6 || (P6 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e4) {
        reject(e4);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e4) {
        reject(e4);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator2(thisArg, body) {
  var _8 = { label: 0, sent: function() {
    if (t3[0] & 1) throw t3[1];
    return t3[1];
  }, trys: [], ops: [] }, f8, y6, t3, g5;
  return g5 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g5[Symbol.iterator] = function() {
    return this;
  }), g5;
  function verb(n7) {
    return function(v7) {
      return step([n7, v7]);
    };
  }
  function step(op) {
    if (f8) throw new TypeError("Generator is already executing.");
    while (_8) try {
      if (f8 = 1, y6 && (t3 = op[0] & 2 ? y6["return"] : op[0] ? y6["throw"] || ((t3 = y6["return"]) && t3.call(y6), 0) : y6.next) && !(t3 = t3.call(y6, op[1])).done) return t3;
      if (y6 = 0, t3) op = [op[0] & 2, t3.value];
      switch (op[0]) {
        case 0:
        case 1:
          t3 = op;
          break;
        case 4:
          _8.label++;
          return { value: op[1], done: false };
        case 5:
          _8.label++;
          y6 = op[1];
          op = [0];
          continue;
        case 7:
          op = _8.ops.pop();
          _8.trys.pop();
          continue;
        default:
          if (!(t3 = _8.trys, t3 = t3.length > 0 && t3[t3.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _8 = 0;
            continue;
          }
          if (op[0] === 3 && (!t3 || op[1] > t3[0] && op[1] < t3[3])) {
            _8.label = op[1];
            break;
          }
          if (op[0] === 6 && _8.label < t3[1]) {
            _8.label = t3[1];
            t3 = op;
            break;
          }
          if (t3 && _8.label < t3[2]) {
            _8.label = t3[2];
            _8.ops.push(op);
            break;
          }
          if (t3[2]) _8.ops.pop();
          _8.trys.pop();
          continue;
      }
      op = body.call(thisArg, _8);
    } catch (e4) {
      op = [6, e4];
      y6 = 0;
    } finally {
      f8 = t3 = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __createBinding2(o6, m5, k7, k22) {
  if (k22 === void 0) k22 = k7;
  o6[k22] = m5[k7];
}
function __exportStar2(m5, exports) {
  for (var p6 in m5) if (p6 !== "default" && !exports.hasOwnProperty(p6)) exports[p6] = m5[p6];
}
function __values2(o6) {
  var s5 = typeof Symbol === "function" && Symbol.iterator, m5 = s5 && o6[s5], i6 = 0;
  if (m5) return m5.call(o6);
  if (o6 && typeof o6.length === "number") return {
    next: function() {
      if (o6 && i6 >= o6.length) o6 = void 0;
      return { value: o6 && o6[i6++], done: !o6 };
    }
  };
  throw new TypeError(s5 ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read2(o6, n7) {
  var m5 = typeof Symbol === "function" && o6[Symbol.iterator];
  if (!m5) return o6;
  var i6 = m5.call(o6), r5, ar4 = [], e4;
  try {
    while ((n7 === void 0 || n7-- > 0) && !(r5 = i6.next()).done) ar4.push(r5.value);
  } catch (error) {
    e4 = { error };
  } finally {
    try {
      if (r5 && !r5.done && (m5 = i6["return"])) m5.call(i6);
    } finally {
      if (e4) throw e4.error;
    }
  }
  return ar4;
}
function __spread2() {
  for (var ar4 = [], i6 = 0; i6 < arguments.length; i6++)
    ar4 = ar4.concat(__read2(arguments[i6]));
  return ar4;
}
function __spreadArrays3() {
  for (var s5 = 0, i6 = 0, il = arguments.length; i6 < il; i6++) s5 += arguments[i6].length;
  for (var r5 = Array(s5), k7 = 0, i6 = 0; i6 < il; i6++)
    for (var a5 = arguments[i6], j6 = 0, jl = a5.length; j6 < jl; j6++, k7++)
      r5[k7] = a5[j6];
  return r5;
}
function __await2(v7) {
  return this instanceof __await2 ? (this.v = v7, this) : new __await2(v7);
}
function __asyncGenerator2(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g5 = generator.apply(thisArg, _arguments || []), i6, q5 = [];
  return i6 = {}, verb("next"), verb("throw"), verb("return"), i6[Symbol.asyncIterator] = function() {
    return this;
  }, i6;
  function verb(n7) {
    if (g5[n7]) i6[n7] = function(v7) {
      return new Promise(function(a5, b5) {
        q5.push([n7, v7, a5, b5]) > 1 || resume(n7, v7);
      });
    };
  }
  function resume(n7, v7) {
    try {
      step(g5[n7](v7));
    } catch (e4) {
      settle(q5[0][3], e4);
    }
  }
  function step(r5) {
    r5.value instanceof __await2 ? Promise.resolve(r5.value.v).then(fulfill, reject) : settle(q5[0][2], r5);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f8, v7) {
    if (f8(v7), q5.shift(), q5.length) resume(q5[0][0], q5[0][1]);
  }
}
function __asyncDelegator2(o6) {
  var i6, p6;
  return i6 = {}, verb("next"), verb("throw", function(e4) {
    throw e4;
  }), verb("return"), i6[Symbol.iterator] = function() {
    return this;
  }, i6;
  function verb(n7, f8) {
    i6[n7] = o6[n7] ? function(v7) {
      return (p6 = !p6) ? { value: __await2(o6[n7](v7)), done: n7 === "return" } : f8 ? f8(v7) : v7;
    } : f8;
  }
}
function __asyncValues2(o6) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m5 = o6[Symbol.asyncIterator], i6;
  return m5 ? m5.call(o6) : (o6 = typeof __values2 === "function" ? __values2(o6) : o6[Symbol.iterator](), i6 = {}, verb("next"), verb("throw"), verb("return"), i6[Symbol.asyncIterator] = function() {
    return this;
  }, i6);
  function verb(n7) {
    i6[n7] = o6[n7] && function(v7) {
      return new Promise(function(resolve, reject) {
        v7 = o6[n7](v7), settle(resolve, reject, v7.done, v7.value);
      });
    };
  }
  function settle(resolve, reject, d7, v7) {
    Promise.resolve(v7).then(function(v8) {
      resolve({ value: v8, done: d7 });
    }, reject);
  }
}
function __makeTemplateObject2(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
function __importStar2(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) {
    for (var k7 in mod) if (Object.hasOwnProperty.call(mod, k7)) result[k7] = mod[k7];
  }
  result.default = mod;
  return result;
}
function __importDefault2(mod) {
  return mod && mod.__esModule ? mod : { default: mod };
}
function __classPrivateFieldGet2(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }
  return privateMap.get(receiver);
}
function __classPrivateFieldSet2(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }
  privateMap.set(receiver, value);
  return value;
}
var extendStatics2, __assign2;
var init_tslib_es62 = __esm({
  "node_modules/@walletconnect/environment/node_modules/tslib/tslib.es6.js"() {
    extendStatics2 = function(d7, b5) {
      extendStatics2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d8, b6) {
        d8.__proto__ = b6;
      } || function(d8, b6) {
        for (var p6 in b6) if (b6.hasOwnProperty(p6)) d8[p6] = b6[p6];
      };
      return extendStatics2(d7, b5);
    };
    __assign2 = function() {
      __assign2 = Object.assign || function __assign3(t3) {
        for (var s5, i6 = 1, n7 = arguments.length; i6 < n7; i6++) {
          s5 = arguments[i6];
          for (var p6 in s5) if (Object.prototype.hasOwnProperty.call(s5, p6)) t3[p6] = s5[p6];
        }
        return t3;
      };
      return __assign2.apply(this, arguments);
    };
  }
});

// node_modules/@walletconnect/environment/dist/cjs/crypto.js
var require_crypto = __commonJS({
  "node_modules/@walletconnect/environment/dist/cjs/crypto.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isBrowserCryptoAvailable = exports.getSubtleCrypto = exports.getBrowerCrypto = void 0;
    function getBrowerCrypto() {
      return (global === null || global === void 0 ? void 0 : global.crypto) || (global === null || global === void 0 ? void 0 : global.msCrypto) || {};
    }
    exports.getBrowerCrypto = getBrowerCrypto;
    function getSubtleCrypto() {
      const browserCrypto = getBrowerCrypto();
      return browserCrypto.subtle || browserCrypto.webkitSubtle;
    }
    exports.getSubtleCrypto = getSubtleCrypto;
    function isBrowserCryptoAvailable() {
      return !!getBrowerCrypto() && !!getSubtleCrypto();
    }
    exports.isBrowserCryptoAvailable = isBrowserCryptoAvailable;
  }
});

// node_modules/@walletconnect/environment/dist/cjs/env.js
var require_env = __commonJS({
  "node_modules/@walletconnect/environment/dist/cjs/env.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isBrowser = exports.isNode = exports.isReactNative = void 0;
    function isReactNative() {
      return typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative";
    }
    exports.isReactNative = isReactNative;
    function isNode3() {
      return typeof process !== "undefined" && typeof process.versions !== "undefined" && typeof process.versions.node !== "undefined";
    }
    exports.isNode = isNode3;
    function isBrowser2() {
      return !isReactNative() && !isNode3();
    }
    exports.isBrowser = isBrowser2;
  }
});

// node_modules/@walletconnect/environment/dist/cjs/index.js
var require_cjs7 = __commonJS({
  "node_modules/@walletconnect/environment/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es62(), __toCommonJS(tslib_es6_exports2));
    tslib_1.__exportStar(require_crypto(), exports);
    tslib_1.__exportStar(require_env(), exports);
  }
});

// node_modules/@walletconnect/jsonrpc-ws-connection/node_modules/ws/browser.js
var require_browser3 = __commonJS({
  "node_modules/@walletconnect/jsonrpc-ws-connection/node_modules/ws/browser.js"(exports, module) {
    "use strict";
    module.exports = function() {
      throw new Error(
        "ws does not work in the browser. Browser clients must use the native WebSocket object"
      );
    };
  }
});

// node_modules/lodash.isequal/index.js
var require_lodash = __commonJS({
  "node_modules/lodash.isequal/index.js"(exports, module) {
    var LARGE_ARRAY_SIZE = 200;
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    var MAX_SAFE_INTEGER = 9007199254740991;
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var asyncTag = "[object AsyncFunction]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var nullTag = "[object Null]";
    var objectTag = "[object Object]";
    var promiseTag = "[object Promise]";
    var proxyTag = "[object Proxy]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var undefinedTag = "[object Undefined]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = function() {
      try {
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e4) {
      }
    }();
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    function arrayFilter(array, predicate) {
      var index = -1, length2 = array == null ? 0 : array.length, resIndex = 0, result = [];
      while (++index < length2) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result[resIndex++] = value;
        }
      }
      return result;
    }
    function arrayPush(array, values) {
      var index = -1, length2 = values.length, offset = array.length;
      while (++index < length2) {
        array[offset + index] = values[index];
      }
      return array;
    }
    function arraySome(array, predicate) {
      var index = -1, length2 = array == null ? 0 : array.length;
      while (++index < length2) {
        if (predicate(array[index], index, array)) {
          return true;
        }
      }
      return false;
    }
    function baseTimes(n7, iteratee) {
      var index = -1, result = Array(n7);
      while (++index < n7) {
        result[index] = iteratee(index);
      }
      return result;
    }
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    function cacheHas(cache, key) {
      return cache.has(key);
    }
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    function mapToArray(map) {
      var index = -1, result = Array(map.size);
      map.forEach(function(value, key) {
        result[++index] = [key, value];
      });
      return result;
    }
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    function setToArray(set2) {
      var index = -1, result = Array(set2.size);
      set2.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }
    var arrayProto = Array.prototype;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var coreJsData = root["__core-js_shared__"];
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var maskSrcKey = function() {
      var uid2 = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid2 ? "Symbol(src)_1." + uid2 : "";
    }();
    var nativeObjectToString = objectProto.toString;
    var reIsNative = RegExp(
      "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    var Buffer2 = moduleExports ? root.Buffer : void 0;
    var Symbol2 = root.Symbol;
    var Uint8Array2 = root.Uint8Array;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var splice = arrayProto.splice;
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    var nativeGetSymbols = Object.getOwnPropertySymbols;
    var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
    var nativeKeys = overArg(Object.keys, Object);
    var DataView2 = getNative(root, "DataView");
    var Map2 = getNative(root, "Map");
    var Promise2 = getNative(root, "Promise");
    var Set2 = getNative(root, "Set");
    var WeakMap2 = getNative(root, "WeakMap");
    var nativeCreate = getNative(Object, "create");
    var dataViewCtorString = toSource(DataView2);
    var mapCtorString = toSource(Map2);
    var promiseCtorString = toSource(Promise2);
    var setCtorString = toSource(Set2);
    var weakMapCtorString = toSource(WeakMap2);
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
    function Hash(entries) {
      var index = -1, length2 = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length2) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    function ListCache(entries) {
      var index = -1, length2 = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length2) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }
    function listCacheDelete(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      --this.size;
      return true;
    }
    function listCacheGet(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      return index < 0 ? void 0 : data[index][1];
    }
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    function listCacheSet(key, value) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    function MapCache(entries) {
      var index = -1, length2 = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length2) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map2 || ListCache)(),
        "string": new Hash()
      };
    }
    function mapCacheDelete(key) {
      var result = getMapData(this, key)["delete"](key);
      this.size -= result ? 1 : 0;
      return result;
    }
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    function mapCacheSet(key, value) {
      var data = getMapData(this, key), size4 = data.size;
      data.set(key, value);
      this.size += data.size == size4 ? 0 : 1;
      return this;
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    function SetCache(values) {
      var index = -1, length2 = values == null ? 0 : values.length;
      this.__data__ = new MapCache();
      while (++index < length2) {
        this.add(values[index]);
      }
    }
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);
      return this;
    }
    function setCacheHas(value) {
      return this.__data__.has(value);
    }
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;
    function Stack(entries) {
      var data = this.__data__ = new ListCache(entries);
      this.size = data.size;
    }
    function stackClear() {
      this.__data__ = new ListCache();
      this.size = 0;
    }
    function stackDelete(key) {
      var data = this.__data__, result = data["delete"](key);
      this.size = data.size;
      return result;
    }
    function stackGet(key) {
      return this.__data__.get(key);
    }
    function stackHas(key) {
      return this.__data__.has(key);
    }
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key, value]);
          this.size = ++data.size;
          return this;
        }
        data = this.__data__ = new MapCache(pairs);
      }
      data.set(key, value);
      this.size = data.size;
      return this;
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype["delete"] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length2 = result.length;
      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
        (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
        isIndex(key, length2)))) {
          result.push(key);
        }
      }
      return result;
    }
    function assocIndexOf(array, key) {
      var length2 = array.length;
      while (length2--) {
        if (eq(array[length2][0], key)) {
          return length2;
        }
      }
      return -1;
    }
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
    }
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }
    function baseIsEqual(value, other, bitmask, customizer, stack) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
    }
    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
      var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
      objTag = objTag == argsTag ? objectTag : objTag;
      othTag = othTag == argsTag ? objectTag : othTag;
      var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
      if (isSameTag && isBuffer(object)) {
        if (!isBuffer(other)) {
          return false;
        }
        objIsArr = true;
        objIsObj = false;
      }
      if (isSameTag && !objIsObj) {
        stack || (stack = new Stack());
        return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
      }
      if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
          stack || (stack = new Stack());
          return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
        }
      }
      if (!isSameTag) {
        return false;
      }
      stack || (stack = new Stack());
      return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
    }
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    function baseIsTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      }
      var stacked = stack.get(array);
      if (stacked && stack.get(other)) {
        return stacked == other;
      }
      var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : void 0;
      stack.set(array, other);
      stack.set(other, array);
      while (++index < arrLength) {
        var arrValue = array[index], othValue = other[index];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
        }
        if (compared !== void 0) {
          if (compared) {
            continue;
          }
          result = false;
          break;
        }
        if (seen) {
          if (!arraySome(other, function(othValue2, othIndex) {
            if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
            result = false;
            break;
          }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          result = false;
          break;
        }
      }
      stack["delete"](array);
      stack["delete"](other);
      return result;
    }
    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
      switch (tag) {
        case dataViewTag:
          if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
            return false;
          }
          object = object.buffer;
          other = other.buffer;
        case arrayBufferTag:
          if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
            return false;
          }
          return true;
        case boolTag:
        case dateTag:
        case numberTag:
          return eq(+object, +other);
        case errorTag:
          return object.name == other.name && object.message == other.message;
        case regexpTag:
        case stringTag:
          return object == other + "";
        case mapTag:
          var convert = mapToArray;
        case setTag:
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
          convert || (convert = setToArray);
          if (object.size != other.size && !isPartial) {
            return false;
          }
          var stacked = stack.get(object);
          if (stacked) {
            return stacked == other;
          }
          bitmask |= COMPARE_UNORDERED_FLAG;
          stack.set(object, other);
          var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
          stack["delete"](object);
          return result;
        case symbolTag:
          if (symbolValueOf) {
            return symbolValueOf.call(object) == symbolValueOf.call(other);
          }
      }
      return false;
    }
    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
      if (objLength != othLength && !isPartial) {
        return false;
      }
      var index = objLength;
      while (index--) {
        var key = objProps[index];
        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
          return false;
        }
      }
      var stacked = stack.get(object);
      if (stacked && stack.get(other)) {
        return stacked == other;
      }
      var result = true;
      stack.set(object, other);
      stack.set(other, object);
      var skipCtor = isPartial;
      while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key], othValue = other[key];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
        }
        if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
          result = false;
          break;
        }
        skipCtor || (skipCtor = key == "constructor");
      }
      if (result && !skipCtor) {
        var objCtor = object.constructor, othCtor = other.constructor;
        if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
          result = false;
        }
      }
      stack["delete"](object);
      stack["delete"](other);
      return result;
    }
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys2, getSymbols);
    }
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      try {
        value[symToStringTag] = void 0;
        var unmasked = true;
      } catch (e4) {
      }
      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }
    var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
      if (object == null) {
        return [];
      }
      object = Object(object);
      return arrayFilter(nativeGetSymbols(object), function(symbol) {
        return propertyIsEnumerable.call(object, symbol);
      });
    };
    var getTag = baseGetTag;
    if (DataView2 && getTag(new DataView2(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
      getTag = function(value) {
        var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag;
            case mapCtorString:
              return mapTag;
            case promiseCtorString:
              return promiseTag;
            case setCtorString:
              return setTag;
            case weakMapCtorString:
              return weakMapTag;
          }
        }
        return result;
      };
    }
    function isIndex(value, length2) {
      length2 = length2 == null ? MAX_SAFE_INTEGER : length2;
      return !!length2 && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length2);
    }
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e4) {
        }
        try {
          return func + "";
        } catch (e4) {
        }
      }
      return "";
    }
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    var isArguments = baseIsArguments(/* @__PURE__ */ function() {
      return arguments;
    }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
    };
    var isArray = Array.isArray;
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    var isBuffer = nativeIsBuffer || stubFalse;
    function isEqual(value, other) {
      return baseIsEqual(value, other);
    }
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    function keys2(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    function stubArray() {
      return [];
    }
    function stubFalse() {
      return false;
    }
    module.exports = isEqual;
  }
});

// node_modules/@walletconnect/core/node_modules/@walletconnect/window-getters/dist/cjs/index.js
var require_cjs8 = __commonJS({
  "node_modules/@walletconnect/core/node_modules/@walletconnect/window-getters/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getLocalStorage = exports.getLocalStorageOrThrow = exports.getCrypto = exports.getCryptoOrThrow = exports.getLocation = exports.getLocationOrThrow = exports.getNavigator = exports.getNavigatorOrThrow = exports.getDocument = exports.getDocumentOrThrow = exports.getFromWindowOrThrow = exports.getFromWindow = void 0;
    function getFromWindow3(name2) {
      let res = void 0;
      if (typeof window !== "undefined" && typeof window[name2] !== "undefined") {
        res = window[name2];
      }
      return res;
    }
    exports.getFromWindow = getFromWindow3;
    function getFromWindowOrThrow3(name2) {
      const res = getFromWindow3(name2);
      if (!res) {
        throw new Error(`${name2} is not defined in Window`);
      }
      return res;
    }
    exports.getFromWindowOrThrow = getFromWindowOrThrow3;
    function getDocumentOrThrow3() {
      return getFromWindowOrThrow3("document");
    }
    exports.getDocumentOrThrow = getDocumentOrThrow3;
    function getDocument3() {
      return getFromWindow3("document");
    }
    exports.getDocument = getDocument3;
    function getNavigatorOrThrow3() {
      return getFromWindowOrThrow3("navigator");
    }
    exports.getNavigatorOrThrow = getNavigatorOrThrow3;
    function getNavigator3() {
      return getFromWindow3("navigator");
    }
    exports.getNavigator = getNavigator3;
    function getLocationOrThrow3() {
      return getFromWindowOrThrow3("location");
    }
    exports.getLocationOrThrow = getLocationOrThrow3;
    function getLocation3() {
      return getFromWindow3("location");
    }
    exports.getLocation = getLocation3;
    function getCryptoOrThrow3() {
      return getFromWindowOrThrow3("crypto");
    }
    exports.getCryptoOrThrow = getCryptoOrThrow3;
    function getCrypto3() {
      return getFromWindow3("crypto");
    }
    exports.getCrypto = getCrypto3;
    function getLocalStorageOrThrow3() {
      return getFromWindowOrThrow3("localStorage");
    }
    exports.getLocalStorageOrThrow = getLocalStorageOrThrow3;
    function getLocalStorage3() {
      return getFromWindow3("localStorage");
    }
    exports.getLocalStorage = getLocalStorage3;
  }
});

// node_modules/@jnwng/walletconnect-solana/node_modules/base-x/src/index.js
var require_src = __commonJS({
  "node_modules/@jnwng/walletconnect-solana/node_modules/base-x/src/index.js"(exports, module) {
    "use strict";
    function base3(ALPHABET) {
      if (ALPHABET.length >= 255) {
        throw new TypeError("Alphabet too long");
      }
      var BASE_MAP = new Uint8Array(256);
      for (var j6 = 0; j6 < BASE_MAP.length; j6++) {
        BASE_MAP[j6] = 255;
      }
      for (var i6 = 0; i6 < ALPHABET.length; i6++) {
        var x9 = ALPHABET.charAt(i6);
        var xc = x9.charCodeAt(0);
        if (BASE_MAP[xc] !== 255) {
          throw new TypeError(x9 + " is ambiguous");
        }
        BASE_MAP[xc] = i6;
      }
      var BASE = ALPHABET.length;
      var LEADER = ALPHABET.charAt(0);
      var FACTOR = Math.log(BASE) / Math.log(256);
      var iFACTOR = Math.log(256) / Math.log(BASE);
      function encode8(source) {
        if (source instanceof Uint8Array) {
        } else if (ArrayBuffer.isView(source)) {
          source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
        } else if (Array.isArray(source)) {
          source = Uint8Array.from(source);
        }
        if (!(source instanceof Uint8Array)) {
          throw new TypeError("Expected Uint8Array");
        }
        if (source.length === 0) {
          return "";
        }
        var zeroes = 0;
        var length2 = 0;
        var pbegin = 0;
        var pend = source.length;
        while (pbegin !== pend && source[pbegin] === 0) {
          pbegin++;
          zeroes++;
        }
        var size4 = (pend - pbegin) * iFACTOR + 1 >>> 0;
        var b58 = new Uint8Array(size4);
        while (pbegin !== pend) {
          var carry = source[pbegin];
          var i7 = 0;
          for (var it1 = size4 - 1; (carry !== 0 || i7 < length2) && it1 !== -1; it1--, i7++) {
            carry += 256 * b58[it1] >>> 0;
            b58[it1] = carry % BASE >>> 0;
            carry = carry / BASE >>> 0;
          }
          if (carry !== 0) {
            throw new Error("Non-zero carry");
          }
          length2 = i7;
          pbegin++;
        }
        var it22 = size4 - length2;
        while (it22 !== size4 && b58[it22] === 0) {
          it22++;
        }
        var str = LEADER.repeat(zeroes);
        for (; it22 < size4; ++it22) {
          str += ALPHABET.charAt(b58[it22]);
        }
        return str;
      }
      function decodeUnsafe(source) {
        if (typeof source !== "string") {
          throw new TypeError("Expected String");
        }
        if (source.length === 0) {
          return new Uint8Array();
        }
        var psz = 0;
        var zeroes = 0;
        var length2 = 0;
        while (source[psz] === LEADER) {
          zeroes++;
          psz++;
        }
        var size4 = (source.length - psz) * FACTOR + 1 >>> 0;
        var b256 = new Uint8Array(size4);
        while (source[psz]) {
          var carry = BASE_MAP[source.charCodeAt(psz)];
          if (carry === 255) {
            return;
          }
          var i7 = 0;
          for (var it3 = size4 - 1; (carry !== 0 || i7 < length2) && it3 !== -1; it3--, i7++) {
            carry += BASE * b256[it3] >>> 0;
            b256[it3] = carry % 256 >>> 0;
            carry = carry / 256 >>> 0;
          }
          if (carry !== 0) {
            throw new Error("Non-zero carry");
          }
          length2 = i7;
          psz++;
        }
        var it4 = size4 - length2;
        while (it4 !== size4 && b256[it4] === 0) {
          it4++;
        }
        var vch = new Uint8Array(zeroes + (size4 - it4));
        var j7 = zeroes;
        while (it4 !== size4) {
          vch[j7++] = b256[it4++];
        }
        return vch;
      }
      function decode7(string2) {
        var buffer = decodeUnsafe(string2);
        if (buffer) {
          return buffer;
        }
        throw new Error("Non-base" + BASE + " character");
      }
      return {
        encode: encode8,
        decodeUnsafe,
        decode: decode7
      };
    }
    module.exports = base3;
  }
});

// node_modules/@jnwng/walletconnect-solana/node_modules/bs58/index.js
var require_bs58 = __commonJS({
  "node_modules/@jnwng/walletconnect-solana/node_modules/bs58/index.js"(exports, module) {
    var basex = require_src();
    var ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    module.exports = basex(ALPHABET);
  }
});

// node_modules/@jnwng/walletconnect-solana/lib/esm/adapter.js
init_index_browser_esm();
var import_qrcode_modal = __toESM(require_cjs3(), 1);

// node_modules/@walletconnect/core/dist/index.es.js
var import_events7 = __toESM(require_events());

// node_modules/@walletconnect/heartbeat/dist/index.es.js
var import_events = __toESM(require_events());
var import_time = __toESM(require_cjs4());

// node_modules/@walletconnect/events/dist/esm/events.js
var IEvents = class {
};

// node_modules/@walletconnect/heartbeat/dist/index.es.js
var n2 = class extends IEvents {
  constructor(e4) {
    super();
  }
};
var s3 = import_time.FIVE_SECONDS;
var r3 = { pulse: "heartbeat_pulse" };
var i3 = class _i2 extends n2 {
  constructor(e4) {
    super(e4), this.events = new import_events.EventEmitter(), this.interval = s3, this.interval = (e4 == null ? void 0 : e4.interval) || s3;
  }
  static async init(e4) {
    const t3 = new _i2(e4);
    return await t3.init(), t3;
  }
  async init() {
    await this.initialize();
  }
  stop() {
    clearInterval(this.intervalRef);
  }
  on(e4, t3) {
    this.events.on(e4, t3);
  }
  once(e4, t3) {
    this.events.once(e4, t3);
  }
  off(e4, t3) {
    this.events.off(e4, t3);
  }
  removeListener(e4, t3) {
    this.events.removeListener(e4, t3);
  }
  async initialize() {
    this.intervalRef = setInterval(() => this.pulse(), (0, import_time.toMiliseconds)(this.interval));
  }
  pulse() {
    this.events.emit(r3.pulse);
  }
};

// node_modules/destr/dist/index.mjs
var suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
var suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
var JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  const _value = value.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    value[0] === '"' && value.endsWith('"') && !value.includes("\\")
  ) {
    return _value.slice(1, -1);
  }
  if (_value.length <= 9) {
    const _lval = _value.toLowerCase();
    if (_lval === "true") {
      return true;
    }
    if (_lval === "false") {
      return false;
    }
    if (_lval === "undefined") {
      return void 0;
    }
    if (_lval === "null") {
      return null;
    }
    if (_lval === "nan") {
      return Number.NaN;
    }
    if (_lval === "infinity") {
      return Number.POSITIVE_INFINITY;
    }
    if (_lval === "-infinity") {
      return Number.NEGATIVE_INFINITY;
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

// node_modules/@walletconnect/core/node_modules/unstorage/dist/shared/unstorage.mNKHTF5Y.mjs
function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
var BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  return BASE64_PREFIX + base64Encode(value);
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  return base64Decode(value.slice(BASE64_PREFIX.length));
}
function base64Decode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input, "base64");
  }
  return Uint8Array.from(
    globalThis.atob(input),
    (c8) => c8.codePointAt(0)
  );
}
function base64Encode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input).toString("base64");
  }
  return globalThis.btoa(String.fromCodePoint(...input));
}
function normalizeKey(key) {
  var _a;
  if (!key) {
    return "";
  }
  return ((_a = key.split("?")[0]) == null ? void 0 : _a.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "")) || "";
}
function joinKeys(...keys2) {
  return normalizeKey(keys2.join(":"));
}
function normalizeBaseKey(base3) {
  base3 = normalizeKey(base3);
  return base3 ? base3 + ":" : "";
}
function filterKeyByDepth(key, depth) {
  if (depth === void 0) {
    return true;
  }
  let substrCount = 0;
  let index = key.indexOf(":");
  while (index > -1) {
    substrCount++;
    index = key.indexOf(":", index + 1);
  }
  return substrCount <= depth;
}
function filterKeyByBase(key, base3) {
  if (base3) {
    return key.startsWith(base3) && key[key.length - 1] !== "$";
  }
  return key[key.length - 1] !== "$";
}

// node_modules/@walletconnect/core/node_modules/unstorage/dist/index.mjs
function defineDriver(factory) {
  return factory;
}
var DRIVER_NAME = "memory";
var memory = defineDriver(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});
function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base3 of context.mountpoints) {
      if (key.startsWith(base3)) {
        return {
          base: base3,
          relativeKey: key.slice(base3.length),
          driver: context.mounts[base3]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base3, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base3) || includeParent && base3.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base3.length > mountpoint.length ? base3.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r5) => r5.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions = {}) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r5) => r5.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base3, opts = {}) {
      var _a;
      base3 = normalizeBaseKey(base3);
      const mounts = getMounts(base3, true);
      let maskedMounts = [];
      const allKeys = [];
      let allMountsSupportMaxDepth = true;
      for (const mount of mounts) {
        if (!((_a = mount.driver.flags) == null ? void 0 : _a.maxDepth)) {
          allMountsSupportMaxDepth = false;
        }
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        for (const key of rawKeys) {
          const fullKey = mount.mountpoint + normalizeKey(key);
          if (!maskedMounts.some((p6) => fullKey.startsWith(p6))) {
            allKeys.push(fullKey);
          }
        }
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p6) => !p6.startsWith(mount.mountpoint))
        ];
      }
      const shouldFilterByDepth = opts.maxDepth !== void 0 && !allMountsSupportMaxDepth;
      return allKeys.filter(
        (key) => (!shouldFilterByDepth || filterKeyByDepth(key, opts.maxDepth)) && filterKeyByBase(key, base3)
      );
    },
    // Utils
    async clear(base3, opts = {}) {
      base3 = normalizeBaseKey(base3);
      await Promise.all(
        getMounts(base3, false).map(async (m5) => {
          if (m5.driver.clear) {
            return asyncCall(m5.driver.clear, m5.relativeBase, opts);
          }
          if (m5.driver.removeItem) {
            const keys2 = await m5.driver.getKeys(m5.relativeBase || "", opts);
            return Promise.all(
              keys2.map((key) => m5.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base3, driver) {
      base3 = normalizeBaseKey(base3);
      if (base3 && context.mounts[base3]) {
        throw new Error(`already mounted at ${base3}`);
      }
      if (base3) {
        context.mountpoints.push(base3);
        context.mountpoints.sort((a5, b5) => b5.length - a5.length);
      }
      context.mounts[base3] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base3)).then((unwatcher) => {
          context.unwatch[base3] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base3, _dispose = true) {
      var _a, _b;
      base3 = normalizeBaseKey(base3);
      if (!base3 || !context.mounts[base3]) {
        return;
      }
      if (context.watching && base3 in context.unwatch) {
        (_b = (_a = context.unwatch)[base3]) == null ? void 0 : _b.call(_a);
        delete context.unwatch[base3];
      }
      if (_dispose) {
        await dispose(context.mounts[base3]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base3);
      delete context.mounts[base3];
    },
    getMount(key = "") {
      key = normalizeKey(key) + ":";
      const m5 = getMount(key);
      return {
        driver: m5.driver,
        base: m5.base
      };
    },
    getMounts(base3 = "", opts = {}) {
      base3 = normalizeKey(base3);
      const mounts = getMounts(base3, opts.parents);
      return mounts.map((m5) => ({
        driver: m5.driver,
        base: m5.mountpoint
      }));
    },
    // Aliases
    keys: (base3, opts = {}) => storage.getKeys(base3, opts),
    get: (key, opts = {}) => storage.getItem(key, opts),
    set: (key, value, opts = {}) => storage.setItem(key, value, opts),
    has: (key, opts = {}) => storage.hasItem(key, opts),
    del: (key, opts = {}) => storage.removeItem(key, opts),
    remove: (key, opts = {}) => storage.removeItem(key, opts)
  };
  return storage;
}
function watch(driver, onChange, base3) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base3 + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

// node_modules/idb-keyval/dist/index.js
function promisifyRequest(request) {
  return new Promise((resolve, reject) => {
    request.oncomplete = request.onsuccess = () => resolve(request.result);
    request.onabort = request.onerror = () => reject(request.error);
  });
}
function createStore(dbName, storeName) {
  const request = indexedDB.open(dbName);
  request.onupgradeneeded = () => request.result.createObjectStore(storeName);
  const dbp = promisifyRequest(request);
  return (txMode, callback) => dbp.then((db) => callback(db.transaction(storeName, txMode).objectStore(storeName)));
}
var defaultGetStoreFunc;
function defaultGetStore() {
  if (!defaultGetStoreFunc) {
    defaultGetStoreFunc = createStore("keyval-store", "keyval");
  }
  return defaultGetStoreFunc;
}
function get(key, customStore = defaultGetStore()) {
  return customStore("readonly", (store) => promisifyRequest(store.get(key)));
}
function set(key, value, customStore = defaultGetStore()) {
  return customStore("readwrite", (store) => {
    store.put(value, key);
    return promisifyRequest(store.transaction);
  });
}
function del(key, customStore = defaultGetStore()) {
  return customStore("readwrite", (store) => {
    store.delete(key);
    return promisifyRequest(store.transaction);
  });
}
function clear(customStore = defaultGetStore()) {
  return customStore("readwrite", (store) => {
    store.clear();
    return promisifyRequest(store.transaction);
  });
}
function eachCursor(store, callback) {
  store.openCursor().onsuccess = function() {
    if (!this.result)
      return;
    callback(this.result);
    this.result.continue();
  };
  return promisifyRequest(store.transaction);
}
function keys(customStore = defaultGetStore()) {
  return customStore("readonly", (store) => {
    if (store.getAllKeys) {
      return promisifyRequest(store.getAllKeys());
    }
    const items = [];
    return eachCursor(store, (cursor) => items.push(cursor.key)).then(() => items);
  });
}

// node_modules/@walletconnect/core/node_modules/@walletconnect/safe-json/dist/esm/index.js
var JSONStringify = (data) => JSON.stringify(data, (_8, value) => typeof value === "bigint" ? value.toString() + "n" : value);
var JSONParse = (json) => {
  const numbersBiggerThanMaxInt = /([\[:])?(\d{17,}|(?:[9](?:[1-9]07199254740991|0[1-9]7199254740991|00[8-9]199254740991|007[2-9]99254740991|007199[3-9]54740991|0071992[6-9]4740991|00719925[5-9]740991|007199254[8-9]40991|0071992547[5-9]0991|00719925474[1-9]991|00719925474099[2-9])))([,\}\]])/g;
  const serializedData = json.replace(numbersBiggerThanMaxInt, '$1"$2n"$3');
  return JSON.parse(serializedData, (_8, value) => {
    const isCustomFormatBigInt = typeof value === "string" && value.match(/^\d+n$/);
    if (isCustomFormatBigInt)
      return BigInt(value.substring(0, value.length - 1));
    return value;
  });
};
function safeJsonParse3(value) {
  if (typeof value !== "string") {
    throw new Error(`Cannot safe json parse value of type ${typeof value}`);
  }
  try {
    return JSONParse(value);
  } catch (_a) {
    return value;
  }
}
function safeJsonStringify3(value) {
  return typeof value === "string" ? value : JSONStringify(value) || "";
}

// node_modules/@walletconnect/core/node_modules/@walletconnect/keyvaluestorage/dist/index.es.js
var x3 = "idb-keyval";
var z3 = (i6 = {}) => {
  const t3 = i6.base && i6.base.length > 0 ? `${i6.base}:` : "", e4 = (s5) => t3 + s5;
  let n7;
  return i6.dbName && i6.storeName && (n7 = createStore(i6.dbName, i6.storeName)), { name: x3, options: i6, async hasItem(s5) {
    return !(typeof await get(e4(s5), n7) > "u");
  }, async getItem(s5) {
    return await get(e4(s5), n7) ?? null;
  }, setItem(s5, a5) {
    return set(e4(s5), a5, n7);
  }, removeItem(s5) {
    return del(e4(s5), n7);
  }, getKeys() {
    return keys(n7);
  }, clear() {
    return clear(n7);
  } };
};
var D3 = "WALLET_CONNECT_V2_INDEXED_DB";
var E4 = "keyvaluestorage";
var _4 = class {
  constructor() {
    this.indexedDb = createStorage({ driver: z3({ dbName: D3, storeName: E4 }) });
  }
  async getKeys() {
    return this.indexedDb.getKeys();
  }
  async getEntries() {
    return (await this.indexedDb.getItems(await this.indexedDb.getKeys())).map((t3) => [t3.key, t3.value]);
  }
  async getItem(t3) {
    const e4 = await this.indexedDb.getItem(t3);
    if (e4 !== null) return e4;
  }
  async setItem(t3, e4) {
    await this.indexedDb.setItem(t3, safeJsonStringify3(e4));
  }
  async removeItem(t3) {
    await this.indexedDb.removeItem(t3);
  }
};
var l4 = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
var c3 = { exports: {} };
(function() {
  let i6;
  function t3() {
  }
  i6 = t3, i6.prototype.getItem = function(e4) {
    return this.hasOwnProperty(e4) ? String(this[e4]) : null;
  }, i6.prototype.setItem = function(e4, n7) {
    this[e4] = String(n7);
  }, i6.prototype.removeItem = function(e4) {
    delete this[e4];
  }, i6.prototype.clear = function() {
    const e4 = this;
    Object.keys(e4).forEach(function(n7) {
      e4[n7] = void 0, delete e4[n7];
    });
  }, i6.prototype.key = function(e4) {
    return e4 = e4 || 0, Object.keys(this)[e4];
  }, i6.prototype.__defineGetter__("length", function() {
    return Object.keys(this).length;
  }), typeof l4 < "u" && l4.localStorage ? c3.exports = l4.localStorage : typeof window < "u" && window.localStorage ? c3.exports = window.localStorage : c3.exports = new t3();
})();
function k3(i6) {
  var t3;
  return [i6[0], safeJsonParse3((t3 = i6[1]) != null ? t3 : "")];
}
var K2 = class {
  constructor() {
    this.localStorage = c3.exports;
  }
  async getKeys() {
    return Object.keys(this.localStorage);
  }
  async getEntries() {
    return Object.entries(this.localStorage).map(k3);
  }
  async getItem(t3) {
    const e4 = this.localStorage.getItem(t3);
    if (e4 !== null) return safeJsonParse3(e4);
  }
  async setItem(t3, e4) {
    this.localStorage.setItem(t3, safeJsonStringify3(e4));
  }
  async removeItem(t3) {
    this.localStorage.removeItem(t3);
  }
};
var N3 = "wc_storage_version";
var y3 = 1;
var O2 = async (i6, t3, e4) => {
  const n7 = N3, s5 = await t3.getItem(n7);
  if (s5 && s5 >= y3) {
    e4(t3);
    return;
  }
  const a5 = await i6.getKeys();
  if (!a5.length) {
    e4(t3);
    return;
  }
  const m5 = [];
  for (; a5.length; ) {
    const r5 = a5.shift();
    if (!r5) continue;
    const o6 = r5.toLowerCase();
    if (o6.includes("wc@") || o6.includes("walletconnect") || o6.includes("wc_") || o6.includes("wallet_connect")) {
      const f8 = await i6.getItem(r5);
      await t3.setItem(r5, f8), m5.push(r5);
    }
  }
  await t3.setItem(n7, y3), e4(t3), j3(i6, m5);
};
var j3 = async (i6, t3) => {
  t3.length && t3.forEach(async (e4) => {
    await i6.removeItem(e4);
  });
};
var h3 = class {
  constructor() {
    this.initialized = false, this.setInitialized = (e4) => {
      this.storage = e4, this.initialized = true;
    };
    const t3 = new K2();
    this.storage = t3;
    try {
      const e4 = new _4();
      O2(t3, e4, this.setInitialized);
    } catch {
      this.initialized = true;
    }
  }
  async getKeys() {
    return await this.initialize(), this.storage.getKeys();
  }
  async getEntries() {
    return await this.initialize(), this.storage.getEntries();
  }
  async getItem(t3) {
    return await this.initialize(), this.storage.getItem(t3);
  }
  async setItem(t3, e4) {
    return await this.initialize(), this.storage.setItem(t3, e4);
  }
  async removeItem(t3) {
    return await this.initialize(), this.storage.removeItem(t3);
  }
  async initialize() {
    this.initialized || await new Promise((t3) => {
      const e4 = setInterval(() => {
        this.initialized && (clearInterval(e4), t3());
      }, 20);
    });
  }
};

// node_modules/@walletconnect/logger/dist/index.es.js
var import_pino = __toESM(require_browser2());
var import_pino2 = __toESM(require_browser2());

// node_modules/@walletconnect/logger/node_modules/@walletconnect/safe-json/dist/esm/index.js
var JSONStringify2 = (data) => JSON.stringify(data, (_8, value) => typeof value === "bigint" ? value.toString() + "n" : value);
function safeJsonStringify4(value) {
  return typeof value === "string" ? value : JSONStringify2(value) || "";
}

// node_modules/@walletconnect/logger/dist/index.es.js
var c4 = { level: "info" };
var n3 = "custom_context";
var l5 = 1e3 * 1024;
var O3 = class {
  constructor(e4) {
    this.nodeValue = e4, this.sizeInBytes = new TextEncoder().encode(this.nodeValue).length, this.next = null;
  }
  get value() {
    return this.nodeValue;
  }
  get size() {
    return this.sizeInBytes;
  }
};
var d3 = class {
  constructor(e4) {
    this.head = null, this.tail = null, this.lengthInNodes = 0, this.maxSizeInBytes = e4, this.sizeInBytes = 0;
  }
  append(e4) {
    const t3 = new O3(e4);
    if (t3.size > this.maxSizeInBytes) throw new Error(`[LinkedList] Value too big to insert into list: ${e4} with size ${t3.size}`);
    for (; this.size + t3.size > this.maxSizeInBytes; ) this.shift();
    this.head ? (this.tail && (this.tail.next = t3), this.tail = t3) : (this.head = t3, this.tail = t3), this.lengthInNodes++, this.sizeInBytes += t3.size;
  }
  shift() {
    if (!this.head) return;
    const e4 = this.head;
    this.head = this.head.next, this.head || (this.tail = null), this.lengthInNodes--, this.sizeInBytes -= e4.size;
  }
  toArray() {
    const e4 = [];
    let t3 = this.head;
    for (; t3 !== null; ) e4.push(t3.value), t3 = t3.next;
    return e4;
  }
  get length() {
    return this.lengthInNodes;
  }
  get size() {
    return this.sizeInBytes;
  }
  toOrderedArray() {
    return Array.from(this);
  }
  [Symbol.iterator]() {
    let e4 = this.head;
    return { next: () => {
      if (!e4) return { done: true, value: null };
      const t3 = e4.value;
      return e4 = e4.next, { done: false, value: t3 };
    } };
  }
};
var L3 = class {
  constructor(e4, t3 = l5) {
    this.level = e4 ?? "error", this.levelValue = import_pino.levels.values[this.level], this.MAX_LOG_SIZE_IN_BYTES = t3, this.logs = new d3(this.MAX_LOG_SIZE_IN_BYTES);
  }
  forwardToConsole(e4, t3) {
    t3 === import_pino.levels.values.error ? console.error(e4) : t3 === import_pino.levels.values.warn ? console.warn(e4) : t3 === import_pino.levels.values.debug ? console.debug(e4) : t3 === import_pino.levels.values.trace ? console.trace(e4) : console.log(e4);
  }
  appendToLogs(e4) {
    this.logs.append(safeJsonStringify4({ timestamp: (/* @__PURE__ */ new Date()).toISOString(), log: e4 }));
    const t3 = typeof e4 == "string" ? JSON.parse(e4).level : e4.level;
    t3 >= this.levelValue && this.forwardToConsole(e4, t3);
  }
  getLogs() {
    return this.logs;
  }
  clearLogs() {
    this.logs = new d3(this.MAX_LOG_SIZE_IN_BYTES);
  }
  getLogArray() {
    return Array.from(this.logs);
  }
  logsToBlob(e4) {
    const t3 = this.getLogArray();
    return t3.push(safeJsonStringify4({ extraMetadata: e4 })), new Blob(t3, { type: "application/json" });
  }
};
var m3 = class {
  constructor(e4, t3 = l5) {
    this.baseChunkLogger = new L3(e4, t3);
  }
  write(e4) {
    this.baseChunkLogger.appendToLogs(e4);
  }
  getLogs() {
    return this.baseChunkLogger.getLogs();
  }
  clearLogs() {
    this.baseChunkLogger.clearLogs();
  }
  getLogArray() {
    return this.baseChunkLogger.getLogArray();
  }
  logsToBlob(e4) {
    return this.baseChunkLogger.logsToBlob(e4);
  }
  downloadLogsBlobInBrowser(e4) {
    const t3 = URL.createObjectURL(this.logsToBlob(e4)), o6 = document.createElement("a");
    o6.href = t3, o6.download = `walletconnect-logs-${(/* @__PURE__ */ new Date()).toISOString()}.txt`, document.body.appendChild(o6), o6.click(), document.body.removeChild(o6), URL.revokeObjectURL(t3);
  }
};
var B2 = class {
  constructor(e4, t3 = l5) {
    this.baseChunkLogger = new L3(e4, t3);
  }
  write(e4) {
    this.baseChunkLogger.appendToLogs(e4);
  }
  getLogs() {
    return this.baseChunkLogger.getLogs();
  }
  clearLogs() {
    this.baseChunkLogger.clearLogs();
  }
  getLogArray() {
    return this.baseChunkLogger.getLogArray();
  }
  logsToBlob(e4) {
    return this.baseChunkLogger.logsToBlob(e4);
  }
};
var x4 = Object.defineProperty;
var S2 = Object.defineProperties;
var _5 = Object.getOwnPropertyDescriptors;
var p3 = Object.getOwnPropertySymbols;
var T4 = Object.prototype.hasOwnProperty;
var z4 = Object.prototype.propertyIsEnumerable;
var f3 = (r5, e4, t3) => e4 in r5 ? x4(r5, e4, { enumerable: true, configurable: true, writable: true, value: t3 }) : r5[e4] = t3;
var i4 = (r5, e4) => {
  for (var t3 in e4 || (e4 = {})) T4.call(e4, t3) && f3(r5, t3, e4[t3]);
  if (p3) for (var t3 of p3(e4)) z4.call(e4, t3) && f3(r5, t3, e4[t3]);
  return r5;
};
var g3 = (r5, e4) => S2(r5, _5(e4));
function k4(r5) {
  return g3(i4({}, r5), { level: (r5 == null ? void 0 : r5.level) || c4.level });
}
function v3(r5, e4 = n3) {
  return r5[e4] || "";
}
function b2(r5, e4, t3 = n3) {
  return r5[t3] = e4, r5;
}
function y4(r5, e4 = n3) {
  let t3 = "";
  return typeof r5.bindings > "u" ? t3 = v3(r5, e4) : t3 = r5.bindings().context || "", t3;
}
function w4(r5, e4, t3 = n3) {
  const o6 = y4(r5, t3);
  return o6.trim() ? `${o6}/${e4}` : e4;
}
function E5(r5, e4, t3 = n3) {
  const o6 = w4(r5, e4, t3), a5 = r5.child({ context: o6 });
  return b2(a5, o6, t3);
}
function C3(r5) {
  var e4, t3;
  const o6 = new m3((e4 = r5.opts) == null ? void 0 : e4.level, r5.maxSizeInBytes);
  return { logger: (0, import_pino.default)(g3(i4({}, r5.opts), { level: "trace", browser: g3(i4({}, (t3 = r5.opts) == null ? void 0 : t3.browser), { write: (a5) => o6.write(a5) }) })), chunkLoggerController: o6 };
}
function I3(r5) {
  var e4;
  const t3 = new B2((e4 = r5.opts) == null ? void 0 : e4.level, r5.maxSizeInBytes);
  return { logger: (0, import_pino.default)(g3(i4({}, r5.opts), { level: "trace" }), t3), chunkLoggerController: t3 };
}
function A4(r5) {
  return typeof r5.loggerOverride < "u" && typeof r5.loggerOverride != "string" ? { logger: r5.loggerOverride, chunkLoggerController: null } : typeof window < "u" ? C3(r5) : I3(r5);
}

// node_modules/@walletconnect/core/node_modules/@walletconnect/types/dist/index.es.js
var import_events4 = __toESM(require_events());
var a4 = Object.defineProperty;
var u3 = (e4, s5, r5) => s5 in e4 ? a4(e4, s5, { enumerable: true, configurable: true, writable: true, value: r5 }) : e4[s5] = r5;
var c5 = (e4, s5, r5) => u3(e4, typeof s5 != "symbol" ? s5 + "" : s5, r5);
var h5 = class extends IEvents {
  constructor(s5) {
    super(), this.opts = s5, c5(this, "protocol", "wc"), c5(this, "version", 2);
  }
};
var p4 = Object.defineProperty;
var b3 = (e4, s5, r5) => s5 in e4 ? p4(e4, s5, { enumerable: true, configurable: true, writable: true, value: r5 }) : e4[s5] = r5;
var v4 = (e4, s5, r5) => b3(e4, typeof s5 != "symbol" ? s5 + "" : s5, r5);
var I4 = class extends IEvents {
  constructor(s5, r5) {
    super(), this.core = s5, this.logger = r5, v4(this, "records", /* @__PURE__ */ new Map());
  }
};
var y5 = class {
  constructor(s5, r5) {
    this.logger = s5, this.core = r5;
  }
};
var m4 = class extends IEvents {
  constructor(s5, r5) {
    super(), this.relayer = s5, this.logger = r5;
  }
};
var d4 = class extends IEvents {
  constructor(s5) {
    super();
  }
};
var f4 = class {
  constructor(s5, r5, t3, q5) {
    this.core = s5, this.logger = r5, this.name = t3;
  }
};
var P3 = class extends IEvents {
  constructor(s5, r5) {
    super(), this.relayer = s5, this.logger = r5;
  }
};
var S3 = class extends IEvents {
  constructor(s5, r5) {
    super(), this.core = s5, this.logger = r5;
  }
};
var M3 = class {
  constructor(s5, r5, t3) {
    this.core = s5, this.logger = r5, this.store = t3;
  }
};
var O4 = class {
  constructor(s5, r5) {
    this.projectId = s5, this.logger = r5;
  }
};
var R2 = class {
  constructor(s5, r5, t3) {
    this.core = s5, this.logger = r5, this.telemetryEnabled = t3;
  }
};

// node_modules/@walletconnect/core/dist/index.es.js
var import_time4 = __toESM(require_cjs4());

// node_modules/@walletconnect/relay-auth/dist/index.es.js
var import_time2 = __toESM(require_cjs4());

// node_modules/@walletconnect/relay-auth/node_modules/@walletconnect/safe-json/dist/esm/index.js
var JSONStringify3 = (data) => JSON.stringify(data, (_8, value) => typeof value === "bigint" ? value.toString() + "n" : value);
var JSONParse2 = (json) => {
  const numbersBiggerThanMaxInt = /([\[:])?(\d{17,}|(?:[9](?:[1-9]07199254740991|0[1-9]7199254740991|00[8-9]199254740991|007[2-9]99254740991|007199[3-9]54740991|0071992[6-9]4740991|00719925[5-9]740991|007199254[8-9]40991|0071992547[5-9]0991|00719925474[1-9]991|00719925474099[2-9])))([,\}\]])/g;
  const serializedData = json.replace(numbersBiggerThanMaxInt, '$1"$2n"$3');
  return JSON.parse(serializedData, (_8, value) => {
    const isCustomFormatBigInt = typeof value === "string" && value.match(/^\d+n$/);
    if (isCustomFormatBigInt)
      return BigInt(value.substring(0, value.length - 1));
    return value;
  });
};
function safeJsonParse4(value) {
  if (typeof value !== "string") {
    throw new Error(`Cannot safe json parse value of type ${typeof value}`);
  }
  try {
    return JSONParse2(value);
  } catch (_a) {
    return value;
  }
}
function safeJsonStringify5(value) {
  return typeof value === "string" ? value : JSONStringify3(value) || "";
}

// node_modules/@walletconnect/relay-auth/dist/index.es.js
function En(t3) {
  return t3 instanceof Uint8Array || ArrayBuffer.isView(t3) && t3.constructor.name === "Uint8Array";
}
function fe(t3, ...e4) {
  if (!En(t3)) throw new Error("Uint8Array expected");
  if (e4.length > 0 && !e4.includes(t3.length)) throw new Error("Uint8Array expected of length " + e4 + ", got length=" + t3.length);
}
function De(t3, e4 = true) {
  if (t3.destroyed) throw new Error("Hash instance has been destroyed");
  if (e4 && t3.finished) throw new Error("Hash#digest() has already been called");
}
function gn(t3, e4) {
  fe(t3);
  const n7 = e4.outputLen;
  if (t3.length < n7) throw new Error("digestInto() expects output buffer of length at least " + n7);
}
var it = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
var _t = (t3) => new DataView(t3.buffer, t3.byteOffset, t3.byteLength);
function yn(t3) {
  if (typeof t3 != "string") throw new Error("utf8ToBytes expected string, got " + typeof t3);
  return new Uint8Array(new TextEncoder().encode(t3));
}
function de(t3) {
  return typeof t3 == "string" && (t3 = yn(t3)), fe(t3), t3;
}
var xn = class {
  clone() {
    return this._cloneInto();
  }
};
function Bn(t3) {
  const e4 = (r5) => t3().update(de(r5)).digest(), n7 = t3();
  return e4.outputLen = n7.outputLen, e4.blockLen = n7.blockLen, e4.create = () => t3(), e4;
}
function he(t3 = 32) {
  if (it && typeof it.getRandomValues == "function") return it.getRandomValues(new Uint8Array(t3));
  if (it && typeof it.randomBytes == "function") return it.randomBytes(t3);
  throw new Error("crypto.getRandomValues must be defined");
}
function Cn(t3, e4, n7, r5) {
  if (typeof t3.setBigUint64 == "function") return t3.setBigUint64(e4, n7, r5);
  const o6 = BigInt(32), s5 = BigInt(4294967295), a5 = Number(n7 >> o6 & s5), u4 = Number(n7 & s5), i6 = r5 ? 4 : 0, D5 = r5 ? 0 : 4;
  t3.setUint32(e4 + i6, a5, r5), t3.setUint32(e4 + D5, u4, r5);
}
var An = class extends xn {
  constructor(e4, n7, r5, o6) {
    super(), this.blockLen = e4, this.outputLen = n7, this.padOffset = r5, this.isLE = o6, this.finished = false, this.length = 0, this.pos = 0, this.destroyed = false, this.buffer = new Uint8Array(e4), this.view = _t(this.buffer);
  }
  update(e4) {
    De(this);
    const { view: n7, buffer: r5, blockLen: o6 } = this;
    e4 = de(e4);
    const s5 = e4.length;
    for (let a5 = 0; a5 < s5; ) {
      const u4 = Math.min(o6 - this.pos, s5 - a5);
      if (u4 === o6) {
        const i6 = _t(e4);
        for (; o6 <= s5 - a5; a5 += o6) this.process(i6, a5);
        continue;
      }
      r5.set(e4.subarray(a5, a5 + u4), this.pos), this.pos += u4, a5 += u4, this.pos === o6 && (this.process(n7, 0), this.pos = 0);
    }
    return this.length += e4.length, this.roundClean(), this;
  }
  digestInto(e4) {
    De(this), gn(e4, this), this.finished = true;
    const { buffer: n7, view: r5, blockLen: o6, isLE: s5 } = this;
    let { pos: a5 } = this;
    n7[a5++] = 128, this.buffer.subarray(a5).fill(0), this.padOffset > o6 - a5 && (this.process(r5, 0), a5 = 0);
    for (let l9 = a5; l9 < o6; l9++) n7[l9] = 0;
    Cn(r5, o6 - 8, BigInt(this.length * 8), s5), this.process(r5, 0);
    const u4 = _t(e4), i6 = this.outputLen;
    if (i6 % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
    const D5 = i6 / 4, c8 = this.get();
    if (D5 > c8.length) throw new Error("_sha2: outputLen bigger than state");
    for (let l9 = 0; l9 < D5; l9++) u4.setUint32(4 * l9, c8[l9], s5);
  }
  digest() {
    const { buffer: e4, outputLen: n7 } = this;
    this.digestInto(e4);
    const r5 = e4.slice(0, n7);
    return this.destroy(), r5;
  }
  _cloneInto(e4) {
    e4 || (e4 = new this.constructor()), e4.set(...this.get());
    const { blockLen: n7, buffer: r5, length: o6, finished: s5, destroyed: a5, pos: u4 } = this;
    return e4.length = o6, e4.pos = u4, e4.finished = s5, e4.destroyed = a5, o6 % n7 && e4.buffer.set(r5), e4;
  }
};
var wt = BigInt(2 ** 32 - 1);
var St = BigInt(32);
function le(t3, e4 = false) {
  return e4 ? { h: Number(t3 & wt), l: Number(t3 >> St & wt) } : { h: Number(t3 >> St & wt) | 0, l: Number(t3 & wt) | 0 };
}
function mn(t3, e4 = false) {
  let n7 = new Uint32Array(t3.length), r5 = new Uint32Array(t3.length);
  for (let o6 = 0; o6 < t3.length; o6++) {
    const { h: s5, l: a5 } = le(t3[o6], e4);
    [n7[o6], r5[o6]] = [s5, a5];
  }
  return [n7, r5];
}
var _n = (t3, e4) => BigInt(t3 >>> 0) << St | BigInt(e4 >>> 0);
var Sn = (t3, e4, n7) => t3 >>> n7;
var vn = (t3, e4, n7) => t3 << 32 - n7 | e4 >>> n7;
var In = (t3, e4, n7) => t3 >>> n7 | e4 << 32 - n7;
var Un = (t3, e4, n7) => t3 << 32 - n7 | e4 >>> n7;
var Tn = (t3, e4, n7) => t3 << 64 - n7 | e4 >>> n7 - 32;
var Fn = (t3, e4, n7) => t3 >>> n7 - 32 | e4 << 64 - n7;
var Nn = (t3, e4) => e4;
var Ln = (t3, e4) => t3;
var On = (t3, e4, n7) => t3 << n7 | e4 >>> 32 - n7;
var Hn = (t3, e4, n7) => e4 << n7 | t3 >>> 32 - n7;
var zn = (t3, e4, n7) => e4 << n7 - 32 | t3 >>> 64 - n7;
var Mn = (t3, e4, n7) => t3 << n7 - 32 | e4 >>> 64 - n7;
function qn(t3, e4, n7, r5) {
  const o6 = (e4 >>> 0) + (r5 >>> 0);
  return { h: t3 + n7 + (o6 / 2 ** 32 | 0) | 0, l: o6 | 0 };
}
var $n = (t3, e4, n7) => (t3 >>> 0) + (e4 >>> 0) + (n7 >>> 0);
var kn = (t3, e4, n7, r5) => e4 + n7 + r5 + (t3 / 2 ** 32 | 0) | 0;
var Rn = (t3, e4, n7, r5) => (t3 >>> 0) + (e4 >>> 0) + (n7 >>> 0) + (r5 >>> 0);
var jn = (t3, e4, n7, r5, o6) => e4 + n7 + r5 + o6 + (t3 / 2 ** 32 | 0) | 0;
var Zn = (t3, e4, n7, r5, o6) => (t3 >>> 0) + (e4 >>> 0) + (n7 >>> 0) + (r5 >>> 0) + (o6 >>> 0);
var Gn = (t3, e4, n7, r5, o6, s5) => e4 + n7 + r5 + o6 + s5 + (t3 / 2 ** 32 | 0) | 0;
var x5 = { fromBig: le, split: mn, toBig: _n, shrSH: Sn, shrSL: vn, rotrSH: In, rotrSL: Un, rotrBH: Tn, rotrBL: Fn, rotr32H: Nn, rotr32L: Ln, rotlSH: On, rotlSL: Hn, rotlBH: zn, rotlBL: Mn, add: qn, add3L: $n, add3H: kn, add4L: Rn, add4H: jn, add5H: Gn, add5L: Zn };
var [Vn, Yn] = (() => x5.split(["0x428a2f98d728ae22", "0x7137449123ef65cd", "0xb5c0fbcfec4d3b2f", "0xe9b5dba58189dbbc", "0x3956c25bf348b538", "0x59f111f1b605d019", "0x923f82a4af194f9b", "0xab1c5ed5da6d8118", "0xd807aa98a3030242", "0x12835b0145706fbe", "0x243185be4ee4b28c", "0x550c7dc3d5ffb4e2", "0x72be5d74f27b896f", "0x80deb1fe3b1696b1", "0x9bdc06a725c71235", "0xc19bf174cf692694", "0xe49b69c19ef14ad2", "0xefbe4786384f25e3", "0x0fc19dc68b8cd5b5", "0x240ca1cc77ac9c65", "0x2de92c6f592b0275", "0x4a7484aa6ea6e483", "0x5cb0a9dcbd41fbd4", "0x76f988da831153b5", "0x983e5152ee66dfab", "0xa831c66d2db43210", "0xb00327c898fb213f", "0xbf597fc7beef0ee4", "0xc6e00bf33da88fc2", "0xd5a79147930aa725", "0x06ca6351e003826f", "0x142929670a0e6e70", "0x27b70a8546d22ffc", "0x2e1b21385c26c926", "0x4d2c6dfc5ac42aed", "0x53380d139d95b3df", "0x650a73548baf63de", "0x766a0abb3c77b2a8", "0x81c2c92e47edaee6", "0x92722c851482353b", "0xa2bfe8a14cf10364", "0xa81a664bbc423001", "0xc24b8b70d0f89791", "0xc76c51a30654be30", "0xd192e819d6ef5218", "0xd69906245565a910", "0xf40e35855771202a", "0x106aa07032bbd1b8", "0x19a4c116b8d2d0c8", "0x1e376c085141ab53", "0x2748774cdf8eeb99", "0x34b0bcb5e19b48a8", "0x391c0cb3c5c95a63", "0x4ed8aa4ae3418acb", "0x5b9cca4f7763e373", "0x682e6ff3d6b2b8a3", "0x748f82ee5defb2fc", "0x78a5636f43172f60", "0x84c87814a1f0ab72", "0x8cc702081a6439ec", "0x90befffa23631e28", "0xa4506cebde82bde9", "0xbef9a3f7b2c67915", "0xc67178f2e372532b", "0xca273eceea26619c", "0xd186b8c721c0c207", "0xeada7dd6cde0eb1e", "0xf57d4f7fee6ed178", "0x06f067aa72176fba", "0x0a637dc5a2c898a6", "0x113f9804bef90dae", "0x1b710b35131c471b", "0x28db77f523047d84", "0x32caab7b40c72493", "0x3c9ebe0a15c9bebc", "0x431d67c49c100d4c", "0x4cc5d4becb3e42b6", "0x597f299cfc657e2a", "0x5fcb6fab3ad6faec", "0x6c44198c4a475817"].map((t3) => BigInt(t3))))();
var P4 = new Uint32Array(80);
var Q2 = new Uint32Array(80);
var Jn = class extends An {
  constructor() {
    super(128, 64, 16, false), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  get() {
    const { Ah: e4, Al: n7, Bh: r5, Bl: o6, Ch: s5, Cl: a5, Dh: u4, Dl: i6, Eh: D5, El: c8, Fh: l9, Fl: p6, Gh: w6, Gl: h7, Hh: g5, Hl: S5 } = this;
    return [e4, n7, r5, o6, s5, a5, u4, i6, D5, c8, l9, p6, w6, h7, g5, S5];
  }
  set(e4, n7, r5, o6, s5, a5, u4, i6, D5, c8, l9, p6, w6, h7, g5, S5) {
    this.Ah = e4 | 0, this.Al = n7 | 0, this.Bh = r5 | 0, this.Bl = o6 | 0, this.Ch = s5 | 0, this.Cl = a5 | 0, this.Dh = u4 | 0, this.Dl = i6 | 0, this.Eh = D5 | 0, this.El = c8 | 0, this.Fh = l9 | 0, this.Fl = p6 | 0, this.Gh = w6 | 0, this.Gl = h7 | 0, this.Hh = g5 | 0, this.Hl = S5 | 0;
  }
  process(e4, n7) {
    for (let d7 = 0; d7 < 16; d7++, n7 += 4) P4[d7] = e4.getUint32(n7), Q2[d7] = e4.getUint32(n7 += 4);
    for (let d7 = 16; d7 < 80; d7++) {
      const m5 = P4[d7 - 15] | 0, F5 = Q2[d7 - 15] | 0, q5 = x5.rotrSH(m5, F5, 1) ^ x5.rotrSH(m5, F5, 8) ^ x5.shrSH(m5, F5, 7), z7 = x5.rotrSL(m5, F5, 1) ^ x5.rotrSL(m5, F5, 8) ^ x5.shrSL(m5, F5, 7), I5 = P4[d7 - 2] | 0, O5 = Q2[d7 - 2] | 0, ot2 = x5.rotrSH(I5, O5, 19) ^ x5.rotrBH(I5, O5, 61) ^ x5.shrSH(I5, O5, 6), tt2 = x5.rotrSL(I5, O5, 19) ^ x5.rotrBL(I5, O5, 61) ^ x5.shrSL(I5, O5, 6), st2 = x5.add4L(z7, tt2, Q2[d7 - 7], Q2[d7 - 16]), at2 = x5.add4H(st2, q5, ot2, P4[d7 - 7], P4[d7 - 16]);
      P4[d7] = at2 | 0, Q2[d7] = st2 | 0;
    }
    let { Ah: r5, Al: o6, Bh: s5, Bl: a5, Ch: u4, Cl: i6, Dh: D5, Dl: c8, Eh: l9, El: p6, Fh: w6, Fl: h7, Gh: g5, Gl: S5, Hh: v7, Hl: L5 } = this;
    for (let d7 = 0; d7 < 80; d7++) {
      const m5 = x5.rotrSH(l9, p6, 14) ^ x5.rotrSH(l9, p6, 18) ^ x5.rotrBH(l9, p6, 41), F5 = x5.rotrSL(l9, p6, 14) ^ x5.rotrSL(l9, p6, 18) ^ x5.rotrBL(l9, p6, 41), q5 = l9 & w6 ^ ~l9 & g5, z7 = p6 & h7 ^ ~p6 & S5, I5 = x5.add5L(L5, F5, z7, Yn[d7], Q2[d7]), O5 = x5.add5H(I5, v7, m5, q5, Vn[d7], P4[d7]), ot2 = I5 | 0, tt2 = x5.rotrSH(r5, o6, 28) ^ x5.rotrBH(r5, o6, 34) ^ x5.rotrBH(r5, o6, 39), st2 = x5.rotrSL(r5, o6, 28) ^ x5.rotrBL(r5, o6, 34) ^ x5.rotrBL(r5, o6, 39), at2 = r5 & s5 ^ r5 & u4 ^ s5 & u4, Ct3 = o6 & a5 ^ o6 & i6 ^ a5 & i6;
      v7 = g5 | 0, L5 = S5 | 0, g5 = w6 | 0, S5 = h7 | 0, w6 = l9 | 0, h7 = p6 | 0, { h: l9, l: p6 } = x5.add(D5 | 0, c8 | 0, O5 | 0, ot2 | 0), D5 = u4 | 0, c8 = i6 | 0, u4 = s5 | 0, i6 = a5 | 0, s5 = r5 | 0, a5 = o6 | 0;
      const At3 = x5.add3L(ot2, st2, Ct3);
      r5 = x5.add3H(At3, O5, tt2, at2), o6 = At3 | 0;
    }
    ({ h: r5, l: o6 } = x5.add(this.Ah | 0, this.Al | 0, r5 | 0, o6 | 0)), { h: s5, l: a5 } = x5.add(this.Bh | 0, this.Bl | 0, s5 | 0, a5 | 0), { h: u4, l: i6 } = x5.add(this.Ch | 0, this.Cl | 0, u4 | 0, i6 | 0), { h: D5, l: c8 } = x5.add(this.Dh | 0, this.Dl | 0, D5 | 0, c8 | 0), { h: l9, l: p6 } = x5.add(this.Eh | 0, this.El | 0, l9 | 0, p6 | 0), { h: w6, l: h7 } = x5.add(this.Fh | 0, this.Fl | 0, w6 | 0, h7 | 0), { h: g5, l: S5 } = x5.add(this.Gh | 0, this.Gl | 0, g5 | 0, S5 | 0), { h: v7, l: L5 } = x5.add(this.Hh | 0, this.Hl | 0, v7 | 0, L5 | 0), this.set(r5, o6, s5, a5, u4, i6, D5, c8, l9, p6, w6, h7, g5, S5, v7, L5);
  }
  roundClean() {
    P4.fill(0), Q2.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
};
var Kn = Bn(() => new Jn());
var vt = BigInt(0);
var be = BigInt(1);
var Wn = BigInt(2);
function It(t3) {
  return t3 instanceof Uint8Array || ArrayBuffer.isView(t3) && t3.constructor.name === "Uint8Array";
}
function Ut(t3) {
  if (!It(t3)) throw new Error("Uint8Array expected");
}
function Tt(t3, e4) {
  if (typeof e4 != "boolean") throw new Error(t3 + " boolean expected, got " + e4);
}
var Xn = Array.from({ length: 256 }, (t3, e4) => e4.toString(16).padStart(2, "0"));
function Ft(t3) {
  Ut(t3);
  let e4 = "";
  for (let n7 = 0; n7 < t3.length; n7++) e4 += Xn[t3[n7]];
  return e4;
}
function pe(t3) {
  if (typeof t3 != "string") throw new Error("hex string expected, got " + typeof t3);
  return t3 === "" ? vt : BigInt("0x" + t3);
}
var K3 = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function we(t3) {
  if (t3 >= K3._0 && t3 <= K3._9) return t3 - K3._0;
  if (t3 >= K3.A && t3 <= K3.F) return t3 - (K3.A - 10);
  if (t3 >= K3.a && t3 <= K3.f) return t3 - (K3.a - 10);
}
function Ee(t3) {
  if (typeof t3 != "string") throw new Error("hex string expected, got " + typeof t3);
  const e4 = t3.length, n7 = e4 / 2;
  if (e4 % 2) throw new Error("hex string expected, got unpadded hex of length " + e4);
  const r5 = new Uint8Array(n7);
  for (let o6 = 0, s5 = 0; o6 < n7; o6++, s5 += 2) {
    const a5 = we(t3.charCodeAt(s5)), u4 = we(t3.charCodeAt(s5 + 1));
    if (a5 === void 0 || u4 === void 0) {
      const i6 = t3[s5] + t3[s5 + 1];
      throw new Error('hex string expected, got non-hex character "' + i6 + '" at index ' + s5);
    }
    r5[o6] = a5 * 16 + u4;
  }
  return r5;
}
function Pn(t3) {
  return pe(Ft(t3));
}
function Et(t3) {
  return Ut(t3), pe(Ft(Uint8Array.from(t3).reverse()));
}
function ge(t3, e4) {
  return Ee(t3.toString(16).padStart(e4 * 2, "0"));
}
function Nt(t3, e4) {
  return ge(t3, e4).reverse();
}
function W2(t3, e4, n7) {
  let r5;
  if (typeof e4 == "string") try {
    r5 = Ee(e4);
  } catch (s5) {
    throw new Error(t3 + " must be hex string or Uint8Array, cause: " + s5);
  }
  else if (It(e4)) r5 = Uint8Array.from(e4);
  else throw new Error(t3 + " must be hex string or Uint8Array");
  const o6 = r5.length;
  if (typeof n7 == "number" && o6 !== n7) throw new Error(t3 + " of length " + n7 + " expected, got " + o6);
  return r5;
}
function ye(...t3) {
  let e4 = 0;
  for (let r5 = 0; r5 < t3.length; r5++) {
    const o6 = t3[r5];
    Ut(o6), e4 += o6.length;
  }
  const n7 = new Uint8Array(e4);
  for (let r5 = 0, o6 = 0; r5 < t3.length; r5++) {
    const s5 = t3[r5];
    n7.set(s5, o6), o6 += s5.length;
  }
  return n7;
}
var Lt = (t3) => typeof t3 == "bigint" && vt <= t3;
function Qn(t3, e4, n7) {
  return Lt(t3) && Lt(e4) && Lt(n7) && e4 <= t3 && t3 < n7;
}
function ft(t3, e4, n7, r5) {
  if (!Qn(e4, n7, r5)) throw new Error("expected valid " + t3 + ": " + n7 + " <= n < " + r5 + ", got " + e4);
}
function tr(t3) {
  let e4;
  for (e4 = 0; t3 > vt; t3 >>= be, e4 += 1) ;
  return e4;
}
var er = (t3) => (Wn << BigInt(t3 - 1)) - be;
var nr = { bigint: (t3) => typeof t3 == "bigint", function: (t3) => typeof t3 == "function", boolean: (t3) => typeof t3 == "boolean", string: (t3) => typeof t3 == "string", stringOrUint8Array: (t3) => typeof t3 == "string" || It(t3), isSafeInteger: (t3) => Number.isSafeInteger(t3), array: (t3) => Array.isArray(t3), field: (t3, e4) => e4.Fp.isValid(t3), hash: (t3) => typeof t3 == "function" && Number.isSafeInteger(t3.outputLen) };
function Ot(t3, e4, n7 = {}) {
  const r5 = (o6, s5, a5) => {
    const u4 = nr[s5];
    if (typeof u4 != "function") throw new Error("invalid validator function");
    const i6 = t3[o6];
    if (!(a5 && i6 === void 0) && !u4(i6, t3)) throw new Error("param " + String(o6) + " is invalid. Expected " + s5 + ", got " + i6);
  };
  for (const [o6, s5] of Object.entries(e4)) r5(o6, s5, false);
  for (const [o6, s5] of Object.entries(n7)) r5(o6, s5, true);
  return t3;
}
function xe(t3) {
  const e4 = /* @__PURE__ */ new WeakMap();
  return (n7, ...r5) => {
    const o6 = e4.get(n7);
    if (o6 !== void 0) return o6;
    const s5 = t3(n7, ...r5);
    return e4.set(n7, s5), s5;
  };
}
var M4 = BigInt(0);
var N4 = BigInt(1);
var nt = BigInt(2);
var rr = BigInt(3);
var Ht = BigInt(4);
var Be = BigInt(5);
var Ce = BigInt(8);
function H3(t3, e4) {
  const n7 = t3 % e4;
  return n7 >= M4 ? n7 : e4 + n7;
}
function or(t3, e4, n7) {
  if (e4 < M4) throw new Error("invalid exponent, negatives unsupported");
  if (n7 <= M4) throw new Error("invalid modulus");
  if (n7 === N4) return M4;
  let r5 = N4;
  for (; e4 > M4; ) e4 & N4 && (r5 = r5 * t3 % n7), t3 = t3 * t3 % n7, e4 >>= N4;
  return r5;
}
function J2(t3, e4, n7) {
  let r5 = t3;
  for (; e4-- > M4; ) r5 *= r5, r5 %= n7;
  return r5;
}
function Ae(t3, e4) {
  if (t3 === M4) throw new Error("invert: expected non-zero number");
  if (e4 <= M4) throw new Error("invert: expected positive modulus, got " + e4);
  let n7 = H3(t3, e4), r5 = e4, o6 = M4, s5 = N4;
  for (; n7 !== M4; ) {
    const u4 = r5 / n7, i6 = r5 % n7, D5 = o6 - s5 * u4;
    r5 = n7, n7 = i6, o6 = s5, s5 = D5;
  }
  if (r5 !== N4) throw new Error("invert: does not exist");
  return H3(o6, e4);
}
function sr(t3) {
  const e4 = (t3 - N4) / nt;
  let n7, r5, o6;
  for (n7 = t3 - N4, r5 = 0; n7 % nt === M4; n7 /= nt, r5++) ;
  for (o6 = nt; o6 < t3 && or(o6, e4, t3) !== t3 - N4; o6++) if (o6 > 1e3) throw new Error("Cannot find square root: likely non-prime P");
  if (r5 === 1) {
    const a5 = (t3 + N4) / Ht;
    return function(i6, D5) {
      const c8 = i6.pow(D5, a5);
      if (!i6.eql(i6.sqr(c8), D5)) throw new Error("Cannot find square root");
      return c8;
    };
  }
  const s5 = (n7 + N4) / nt;
  return function(u4, i6) {
    if (u4.pow(i6, e4) === u4.neg(u4.ONE)) throw new Error("Cannot find square root");
    let D5 = r5, c8 = u4.pow(u4.mul(u4.ONE, o6), n7), l9 = u4.pow(i6, s5), p6 = u4.pow(i6, n7);
    for (; !u4.eql(p6, u4.ONE); ) {
      if (u4.eql(p6, u4.ZERO)) return u4.ZERO;
      let w6 = 1;
      for (let g5 = u4.sqr(p6); w6 < D5 && !u4.eql(g5, u4.ONE); w6++) g5 = u4.sqr(g5);
      const h7 = u4.pow(c8, N4 << BigInt(D5 - w6 - 1));
      c8 = u4.sqr(h7), l9 = u4.mul(l9, h7), p6 = u4.mul(p6, c8), D5 = w6;
    }
    return l9;
  };
}
function ir(t3) {
  if (t3 % Ht === rr) {
    const e4 = (t3 + N4) / Ht;
    return function(r5, o6) {
      const s5 = r5.pow(o6, e4);
      if (!r5.eql(r5.sqr(s5), o6)) throw new Error("Cannot find square root");
      return s5;
    };
  }
  if (t3 % Ce === Be) {
    const e4 = (t3 - Be) / Ce;
    return function(r5, o6) {
      const s5 = r5.mul(o6, nt), a5 = r5.pow(s5, e4), u4 = r5.mul(o6, a5), i6 = r5.mul(r5.mul(u4, nt), a5), D5 = r5.mul(u4, r5.sub(i6, r5.ONE));
      if (!r5.eql(r5.sqr(D5), o6)) throw new Error("Cannot find square root");
      return D5;
    };
  }
  return sr(t3);
}
var ur = (t3, e4) => (H3(t3, e4) & N4) === N4;
var cr = ["create", "isValid", "is0", "neg", "inv", "sqrt", "sqr", "eql", "add", "sub", "mul", "pow", "div", "addN", "subN", "mulN", "sqrN"];
function ar(t3) {
  const e4 = { ORDER: "bigint", MASK: "bigint", BYTES: "isSafeInteger", BITS: "isSafeInteger" }, n7 = cr.reduce((r5, o6) => (r5[o6] = "function", r5), e4);
  return Ot(t3, n7);
}
function fr(t3, e4, n7) {
  if (n7 < M4) throw new Error("invalid exponent, negatives unsupported");
  if (n7 === M4) return t3.ONE;
  if (n7 === N4) return e4;
  let r5 = t3.ONE, o6 = e4;
  for (; n7 > M4; ) n7 & N4 && (r5 = t3.mul(r5, o6)), o6 = t3.sqr(o6), n7 >>= N4;
  return r5;
}
function Dr(t3, e4) {
  const n7 = new Array(e4.length), r5 = e4.reduce((s5, a5, u4) => t3.is0(a5) ? s5 : (n7[u4] = s5, t3.mul(s5, a5)), t3.ONE), o6 = t3.inv(r5);
  return e4.reduceRight((s5, a5, u4) => t3.is0(a5) ? s5 : (n7[u4] = t3.mul(s5, n7[u4]), t3.mul(s5, a5)), o6), n7;
}
function me(t3, e4) {
  const n7 = e4 !== void 0 ? e4 : t3.toString(2).length, r5 = Math.ceil(n7 / 8);
  return { nBitLength: n7, nByteLength: r5 };
}
function _e(t3, e4, n7 = false, r5 = {}) {
  if (t3 <= M4) throw new Error("invalid field: expected ORDER > 0, got " + t3);
  const { nBitLength: o6, nByteLength: s5 } = me(t3, e4);
  if (s5 > 2048) throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let a5;
  const u4 = Object.freeze({ ORDER: t3, isLE: n7, BITS: o6, BYTES: s5, MASK: er(o6), ZERO: M4, ONE: N4, create: (i6) => H3(i6, t3), isValid: (i6) => {
    if (typeof i6 != "bigint") throw new Error("invalid field element: expected bigint, got " + typeof i6);
    return M4 <= i6 && i6 < t3;
  }, is0: (i6) => i6 === M4, isOdd: (i6) => (i6 & N4) === N4, neg: (i6) => H3(-i6, t3), eql: (i6, D5) => i6 === D5, sqr: (i6) => H3(i6 * i6, t3), add: (i6, D5) => H3(i6 + D5, t3), sub: (i6, D5) => H3(i6 - D5, t3), mul: (i6, D5) => H3(i6 * D5, t3), pow: (i6, D5) => fr(u4, i6, D5), div: (i6, D5) => H3(i6 * Ae(D5, t3), t3), sqrN: (i6) => i6 * i6, addN: (i6, D5) => i6 + D5, subN: (i6, D5) => i6 - D5, mulN: (i6, D5) => i6 * D5, inv: (i6) => Ae(i6, t3), sqrt: r5.sqrt || ((i6) => (a5 || (a5 = ir(t3)), a5(u4, i6))), invertBatch: (i6) => Dr(u4, i6), cmov: (i6, D5, c8) => c8 ? D5 : i6, toBytes: (i6) => n7 ? Nt(i6, s5) : ge(i6, s5), fromBytes: (i6) => {
    if (i6.length !== s5) throw new Error("Field.fromBytes: expected " + s5 + " bytes, got " + i6.length);
    return n7 ? Et(i6) : Pn(i6);
  } });
  return Object.freeze(u4);
}
var Se = BigInt(0);
var gt = BigInt(1);
function zt(t3, e4) {
  const n7 = e4.negate();
  return t3 ? n7 : e4;
}
function ve(t3, e4) {
  if (!Number.isSafeInteger(t3) || t3 <= 0 || t3 > e4) throw new Error("invalid window size, expected [1.." + e4 + "], got W=" + t3);
}
function Mt(t3, e4) {
  ve(t3, e4);
  const n7 = Math.ceil(e4 / t3) + 1, r5 = 2 ** (t3 - 1);
  return { windows: n7, windowSize: r5 };
}
function dr(t3, e4) {
  if (!Array.isArray(t3)) throw new Error("array expected");
  t3.forEach((n7, r5) => {
    if (!(n7 instanceof e4)) throw new Error("invalid point at index " + r5);
  });
}
function hr(t3, e4) {
  if (!Array.isArray(t3)) throw new Error("array of scalars expected");
  t3.forEach((n7, r5) => {
    if (!e4.isValid(n7)) throw new Error("invalid scalar at index " + r5);
  });
}
var qt = /* @__PURE__ */ new WeakMap();
var Ie = /* @__PURE__ */ new WeakMap();
function $t(t3) {
  return Ie.get(t3) || 1;
}
function lr(t3, e4) {
  return { constTimeNegate: zt, hasPrecomputes(n7) {
    return $t(n7) !== 1;
  }, unsafeLadder(n7, r5, o6 = t3.ZERO) {
    let s5 = n7;
    for (; r5 > Se; ) r5 & gt && (o6 = o6.add(s5)), s5 = s5.double(), r5 >>= gt;
    return o6;
  }, precomputeWindow(n7, r5) {
    const { windows: o6, windowSize: s5 } = Mt(r5, e4), a5 = [];
    let u4 = n7, i6 = u4;
    for (let D5 = 0; D5 < o6; D5++) {
      i6 = u4, a5.push(i6);
      for (let c8 = 1; c8 < s5; c8++) i6 = i6.add(u4), a5.push(i6);
      u4 = i6.double();
    }
    return a5;
  }, wNAF(n7, r5, o6) {
    const { windows: s5, windowSize: a5 } = Mt(n7, e4);
    let u4 = t3.ZERO, i6 = t3.BASE;
    const D5 = BigInt(2 ** n7 - 1), c8 = 2 ** n7, l9 = BigInt(n7);
    for (let p6 = 0; p6 < s5; p6++) {
      const w6 = p6 * a5;
      let h7 = Number(o6 & D5);
      o6 >>= l9, h7 > a5 && (h7 -= c8, o6 += gt);
      const g5 = w6, S5 = w6 + Math.abs(h7) - 1, v7 = p6 % 2 !== 0, L5 = h7 < 0;
      h7 === 0 ? i6 = i6.add(zt(v7, r5[g5])) : u4 = u4.add(zt(L5, r5[S5]));
    }
    return { p: u4, f: i6 };
  }, wNAFUnsafe(n7, r5, o6, s5 = t3.ZERO) {
    const { windows: a5, windowSize: u4 } = Mt(n7, e4), i6 = BigInt(2 ** n7 - 1), D5 = 2 ** n7, c8 = BigInt(n7);
    for (let l9 = 0; l9 < a5; l9++) {
      const p6 = l9 * u4;
      if (o6 === Se) break;
      let w6 = Number(o6 & i6);
      if (o6 >>= c8, w6 > u4 && (w6 -= D5, o6 += gt), w6 === 0) continue;
      let h7 = r5[p6 + Math.abs(w6) - 1];
      w6 < 0 && (h7 = h7.negate()), s5 = s5.add(h7);
    }
    return s5;
  }, getPrecomputes(n7, r5, o6) {
    let s5 = qt.get(r5);
    return s5 || (s5 = this.precomputeWindow(r5, n7), n7 !== 1 && qt.set(r5, o6(s5))), s5;
  }, wNAFCached(n7, r5, o6) {
    const s5 = $t(n7);
    return this.wNAF(s5, this.getPrecomputes(s5, n7, o6), r5);
  }, wNAFCachedUnsafe(n7, r5, o6, s5) {
    const a5 = $t(n7);
    return a5 === 1 ? this.unsafeLadder(n7, r5, s5) : this.wNAFUnsafe(a5, this.getPrecomputes(a5, n7, o6), r5, s5);
  }, setWindowSize(n7, r5) {
    ve(r5, e4), Ie.set(n7, r5), qt.delete(n7);
  } };
}
function br(t3, e4, n7, r5) {
  if (dr(n7, t3), hr(r5, e4), n7.length !== r5.length) throw new Error("arrays of points and scalars must have equal length");
  const o6 = t3.ZERO, s5 = tr(BigInt(n7.length)), a5 = s5 > 12 ? s5 - 3 : s5 > 4 ? s5 - 2 : s5 ? 2 : 1, u4 = (1 << a5) - 1, i6 = new Array(u4 + 1).fill(o6), D5 = Math.floor((e4.BITS - 1) / a5) * a5;
  let c8 = o6;
  for (let l9 = D5; l9 >= 0; l9 -= a5) {
    i6.fill(o6);
    for (let w6 = 0; w6 < r5.length; w6++) {
      const h7 = r5[w6], g5 = Number(h7 >> BigInt(l9) & BigInt(u4));
      i6[g5] = i6[g5].add(n7[w6]);
    }
    let p6 = o6;
    for (let w6 = i6.length - 1, h7 = o6; w6 > 0; w6--) h7 = h7.add(i6[w6]), p6 = p6.add(h7);
    if (c8 = c8.add(p6), l9 !== 0) for (let w6 = 0; w6 < a5; w6++) c8 = c8.double();
  }
  return c8;
}
function pr(t3) {
  return ar(t3.Fp), Ot(t3, { n: "bigint", h: "bigint", Gx: "field", Gy: "field" }, { nBitLength: "isSafeInteger", nByteLength: "isSafeInteger" }), Object.freeze({ ...me(t3.n, t3.nBitLength), ...t3, p: t3.Fp.ORDER });
}
var G2 = BigInt(0);
var j4 = BigInt(1);
var yt = BigInt(2);
var wr = BigInt(8);
var Er = { zip215: true };
function gr(t3) {
  const e4 = pr(t3);
  return Ot(t3, { hash: "function", a: "bigint", d: "bigint", randomBytes: "function" }, { adjustScalarBytes: "function", domain: "function", uvRatio: "function", mapToCurve: "function" }), Object.freeze({ ...e4 });
}
function yr(t3) {
  const e4 = gr(t3), { Fp: n7, n: r5, prehash: o6, hash: s5, randomBytes: a5, nByteLength: u4, h: i6 } = e4, D5 = yt << BigInt(u4 * 8) - j4, c8 = n7.create, l9 = _e(e4.n, e4.nBitLength), p6 = e4.uvRatio || ((y6, f8) => {
    try {
      return { isValid: true, value: n7.sqrt(y6 * n7.inv(f8)) };
    } catch {
      return { isValid: false, value: G2 };
    }
  }), w6 = e4.adjustScalarBytes || ((y6) => y6), h7 = e4.domain || ((y6, f8, b5) => {
    if (Tt("phflag", b5), f8.length || b5) throw new Error("Contexts/pre-hash are not supported");
    return y6;
  });
  function g5(y6, f8) {
    ft("coordinate " + y6, f8, G2, D5);
  }
  function S5(y6) {
    if (!(y6 instanceof d7)) throw new Error("ExtendedPoint expected");
  }
  const v7 = xe((y6, f8) => {
    const { ex: b5, ey: E7, ez: B4 } = y6, C6 = y6.is0();
    f8 == null && (f8 = C6 ? wr : n7.inv(B4));
    const A6 = c8(b5 * f8), U3 = c8(E7 * f8), _8 = c8(B4 * f8);
    if (C6) return { x: G2, y: j4 };
    if (_8 !== j4) throw new Error("invZ was invalid");
    return { x: A6, y: U3 };
  }), L5 = xe((y6) => {
    const { a: f8, d: b5 } = e4;
    if (y6.is0()) throw new Error("bad point: ZERO");
    const { ex: E7, ey: B4, ez: C6, et: A6 } = y6, U3 = c8(E7 * E7), _8 = c8(B4 * B4), T7 = c8(C6 * C6), $5 = c8(T7 * T7), R4 = c8(U3 * f8), V4 = c8(T7 * c8(R4 + _8)), Y4 = c8($5 + c8(b5 * c8(U3 * _8)));
    if (V4 !== Y4) throw new Error("bad point: equation left != right (1)");
    const Z3 = c8(E7 * B4), X2 = c8(C6 * A6);
    if (Z3 !== X2) throw new Error("bad point: equation left != right (2)");
    return true;
  });
  class d7 {
    constructor(f8, b5, E7, B4) {
      this.ex = f8, this.ey = b5, this.ez = E7, this.et = B4, g5("x", f8), g5("y", b5), g5("z", E7), g5("t", B4), Object.freeze(this);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static fromAffine(f8) {
      if (f8 instanceof d7) throw new Error("extended point not allowed");
      const { x: b5, y: E7 } = f8 || {};
      return g5("x", b5), g5("y", E7), new d7(b5, E7, j4, c8(b5 * E7));
    }
    static normalizeZ(f8) {
      const b5 = n7.invertBatch(f8.map((E7) => E7.ez));
      return f8.map((E7, B4) => E7.toAffine(b5[B4])).map(d7.fromAffine);
    }
    static msm(f8, b5) {
      return br(d7, l9, f8, b5);
    }
    _setWindowSize(f8) {
      q5.setWindowSize(this, f8);
    }
    assertValidity() {
      L5(this);
    }
    equals(f8) {
      S5(f8);
      const { ex: b5, ey: E7, ez: B4 } = this, { ex: C6, ey: A6, ez: U3 } = f8, _8 = c8(b5 * U3), T7 = c8(C6 * B4), $5 = c8(E7 * U3), R4 = c8(A6 * B4);
      return _8 === T7 && $5 === R4;
    }
    is0() {
      return this.equals(d7.ZERO);
    }
    negate() {
      return new d7(c8(-this.ex), this.ey, this.ez, c8(-this.et));
    }
    double() {
      const { a: f8 } = e4, { ex: b5, ey: E7, ez: B4 } = this, C6 = c8(b5 * b5), A6 = c8(E7 * E7), U3 = c8(yt * c8(B4 * B4)), _8 = c8(f8 * C6), T7 = b5 + E7, $5 = c8(c8(T7 * T7) - C6 - A6), R4 = _8 + A6, V4 = R4 - U3, Y4 = _8 - A6, Z3 = c8($5 * V4), X2 = c8(R4 * Y4), et2 = c8($5 * Y4), pt3 = c8(V4 * R4);
      return new d7(Z3, X2, pt3, et2);
    }
    add(f8) {
      S5(f8);
      const { a: b5, d: E7 } = e4, { ex: B4, ey: C6, ez: A6, et: U3 } = this, { ex: _8, ey: T7, ez: $5, et: R4 } = f8;
      if (b5 === BigInt(-1)) {
        const re3 = c8((C6 - B4) * (T7 + _8)), oe2 = c8((C6 + B4) * (T7 - _8)), mt4 = c8(oe2 - re3);
        if (mt4 === G2) return this.double();
        const se3 = c8(A6 * yt * R4), ie3 = c8(U3 * yt * $5), ue3 = ie3 + se3, ce3 = oe2 + re3, ae2 = ie3 - se3, Dn3 = c8(ue3 * mt4), dn3 = c8(ce3 * ae2), hn3 = c8(ue3 * ae2), ln3 = c8(mt4 * ce3);
        return new d7(Dn3, dn3, ln3, hn3);
      }
      const V4 = c8(B4 * _8), Y4 = c8(C6 * T7), Z3 = c8(U3 * E7 * R4), X2 = c8(A6 * $5), et2 = c8((B4 + C6) * (_8 + T7) - V4 - Y4), pt3 = X2 - Z3, ee3 = X2 + Z3, ne2 = c8(Y4 - b5 * V4), un3 = c8(et2 * pt3), cn3 = c8(ee3 * ne2), an3 = c8(et2 * ne2), fn3 = c8(pt3 * ee3);
      return new d7(un3, cn3, fn3, an3);
    }
    subtract(f8) {
      return this.add(f8.negate());
    }
    wNAF(f8) {
      return q5.wNAFCached(this, f8, d7.normalizeZ);
    }
    multiply(f8) {
      const b5 = f8;
      ft("scalar", b5, j4, r5);
      const { p: E7, f: B4 } = this.wNAF(b5);
      return d7.normalizeZ([E7, B4])[0];
    }
    multiplyUnsafe(f8, b5 = d7.ZERO) {
      const E7 = f8;
      return ft("scalar", E7, G2, r5), E7 === G2 ? F5 : this.is0() || E7 === j4 ? this : q5.wNAFCachedUnsafe(this, E7, d7.normalizeZ, b5);
    }
    isSmallOrder() {
      return this.multiplyUnsafe(i6).is0();
    }
    isTorsionFree() {
      return q5.unsafeLadder(this, r5).is0();
    }
    toAffine(f8) {
      return v7(this, f8);
    }
    clearCofactor() {
      const { h: f8 } = e4;
      return f8 === j4 ? this : this.multiplyUnsafe(f8);
    }
    static fromHex(f8, b5 = false) {
      const { d: E7, a: B4 } = e4, C6 = n7.BYTES;
      f8 = W2("pointHex", f8, C6), Tt("zip215", b5);
      const A6 = f8.slice(), U3 = f8[C6 - 1];
      A6[C6 - 1] = U3 & -129;
      const _8 = Et(A6), T7 = b5 ? D5 : n7.ORDER;
      ft("pointHex.y", _8, G2, T7);
      const $5 = c8(_8 * _8), R4 = c8($5 - j4), V4 = c8(E7 * $5 - B4);
      let { isValid: Y4, value: Z3 } = p6(R4, V4);
      if (!Y4) throw new Error("Point.fromHex: invalid y coordinate");
      const X2 = (Z3 & j4) === j4, et2 = (U3 & 128) !== 0;
      if (!b5 && Z3 === G2 && et2) throw new Error("Point.fromHex: x=0 and x_0=1");
      return et2 !== X2 && (Z3 = c8(-Z3)), d7.fromAffine({ x: Z3, y: _8 });
    }
    static fromPrivateKey(f8) {
      return O5(f8).point;
    }
    toRawBytes() {
      const { x: f8, y: b5 } = this.toAffine(), E7 = Nt(b5, n7.BYTES);
      return E7[E7.length - 1] |= f8 & j4 ? 128 : 0, E7;
    }
    toHex() {
      return Ft(this.toRawBytes());
    }
  }
  d7.BASE = new d7(e4.Gx, e4.Gy, j4, c8(e4.Gx * e4.Gy)), d7.ZERO = new d7(G2, j4, j4, G2);
  const { BASE: m5, ZERO: F5 } = d7, q5 = lr(d7, u4 * 8);
  function z7(y6) {
    return H3(y6, r5);
  }
  function I5(y6) {
    return z7(Et(y6));
  }
  function O5(y6) {
    const f8 = n7.BYTES;
    y6 = W2("private key", y6, f8);
    const b5 = W2("hashed private key", s5(y6), 2 * f8), E7 = w6(b5.slice(0, f8)), B4 = b5.slice(f8, 2 * f8), C6 = I5(E7), A6 = m5.multiply(C6), U3 = A6.toRawBytes();
    return { head: E7, prefix: B4, scalar: C6, point: A6, pointBytes: U3 };
  }
  function ot2(y6) {
    return O5(y6).pointBytes;
  }
  function tt2(y6 = new Uint8Array(), ...f8) {
    const b5 = ye(...f8);
    return I5(s5(h7(b5, W2("context", y6), !!o6)));
  }
  function st2(y6, f8, b5 = {}) {
    y6 = W2("message", y6), o6 && (y6 = o6(y6));
    const { prefix: E7, scalar: B4, pointBytes: C6 } = O5(f8), A6 = tt2(b5.context, E7, y6), U3 = m5.multiply(A6).toRawBytes(), _8 = tt2(b5.context, U3, C6, y6), T7 = z7(A6 + _8 * B4);
    ft("signature.s", T7, G2, r5);
    const $5 = ye(U3, Nt(T7, n7.BYTES));
    return W2("result", $5, n7.BYTES * 2);
  }
  const at2 = Er;
  function Ct3(y6, f8, b5, E7 = at2) {
    const { context: B4, zip215: C6 } = E7, A6 = n7.BYTES;
    y6 = W2("signature", y6, 2 * A6), f8 = W2("message", f8), b5 = W2("publicKey", b5, A6), C6 !== void 0 && Tt("zip215", C6), o6 && (f8 = o6(f8));
    const U3 = Et(y6.slice(A6, 2 * A6));
    let _8, T7, $5;
    try {
      _8 = d7.fromHex(b5, C6), T7 = d7.fromHex(y6.slice(0, A6), C6), $5 = m5.multiplyUnsafe(U3);
    } catch {
      return false;
    }
    if (!C6 && _8.isSmallOrder()) return false;
    const R4 = tt2(B4, T7.toRawBytes(), _8.toRawBytes(), f8);
    return T7.add(_8.multiplyUnsafe(R4)).subtract($5).clearCofactor().equals(d7.ZERO);
  }
  return m5._setWindowSize(8), { CURVE: e4, getPublicKey: ot2, sign: st2, verify: Ct3, ExtendedPoint: d7, utils: { getExtendedPublicKey: O5, randomPrivateKey: () => a5(n7.BYTES), precompute(y6 = 8, f8 = d7.BASE) {
    return f8._setWindowSize(y6), f8.multiply(BigInt(3)), f8;
  } } };
}
BigInt(0), BigInt(1);
var kt = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949");
var Ue = BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");
BigInt(0);
var xr = BigInt(1);
var Te = BigInt(2);
BigInt(3);
var Br = BigInt(5);
var Cr = BigInt(8);
function Ar(t3) {
  const e4 = BigInt(10), n7 = BigInt(20), r5 = BigInt(40), o6 = BigInt(80), s5 = kt, u4 = t3 * t3 % s5 * t3 % s5, i6 = J2(u4, Te, s5) * u4 % s5, D5 = J2(i6, xr, s5) * t3 % s5, c8 = J2(D5, Br, s5) * D5 % s5, l9 = J2(c8, e4, s5) * c8 % s5, p6 = J2(l9, n7, s5) * l9 % s5, w6 = J2(p6, r5, s5) * p6 % s5, h7 = J2(w6, o6, s5) * w6 % s5, g5 = J2(h7, o6, s5) * w6 % s5, S5 = J2(g5, e4, s5) * c8 % s5;
  return { pow_p_5_8: J2(S5, Te, s5) * t3 % s5, b2: u4 };
}
function mr(t3) {
  return t3[0] &= 248, t3[31] &= 127, t3[31] |= 64, t3;
}
function _r(t3, e4) {
  const n7 = kt, r5 = H3(e4 * e4 * e4, n7), o6 = H3(r5 * r5 * e4, n7), s5 = Ar(t3 * o6).pow_p_5_8;
  let a5 = H3(t3 * r5 * s5, n7);
  const u4 = H3(e4 * a5 * a5, n7), i6 = a5, D5 = H3(a5 * Ue, n7), c8 = u4 === t3, l9 = u4 === H3(-t3, n7), p6 = u4 === H3(-t3 * Ue, n7);
  return c8 && (a5 = i6), (l9 || p6) && (a5 = D5), ur(a5, n7) && (a5 = H3(-a5, n7)), { isValid: c8 || l9, value: a5 };
}
var Sr = (() => _e(kt, void 0, true))();
var vr = (() => ({ a: BigInt(-1), d: BigInt("37095705934669439343138083508754565189542113879843219016388785533085940283555"), Fp: Sr, n: BigInt("7237005577332262213973186563042994240857116359379907606001950938285454250989"), h: Cr, Gx: BigInt("15112221349535400772501151409588531511454012693041857206046113283949847762202"), Gy: BigInt("46316835694926478169428394003475163141307993866256225615783033603165251855960"), hash: Kn, randomBytes: he, adjustScalarBytes: mr, uvRatio: _r }))();
var Rt = (() => yr(vr))();
var jt = "EdDSA";
var Zt = "JWT";
var ut = ".";
var Dt = "base64url";
var Gt = "utf8";
var xt = "utf8";
var Vt = ":";
var Yt = "did";
var Jt = "key";
var dt = "base58btc";
var Kt = "z";
var Wt = "K36";
var Ne = 32;
function Xt(t3) {
  return globalThis.Buffer != null ? new Uint8Array(t3.buffer, t3.byteOffset, t3.byteLength) : t3;
}
function Le(t3 = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? Xt(globalThis.Buffer.allocUnsafe(t3)) : new Uint8Array(t3);
}
function Oe(t3, e4) {
  e4 || (e4 = t3.reduce((o6, s5) => o6 + s5.length, 0));
  const n7 = Le(e4);
  let r5 = 0;
  for (const o6 of t3) n7.set(o6, r5), r5 += o6.length;
  return Xt(n7);
}
function Ir(t3, e4) {
  if (t3.length >= 255) throw new TypeError("Alphabet too long");
  for (var n7 = new Uint8Array(256), r5 = 0; r5 < n7.length; r5++) n7[r5] = 255;
  for (var o6 = 0; o6 < t3.length; o6++) {
    var s5 = t3.charAt(o6), a5 = s5.charCodeAt(0);
    if (n7[a5] !== 255) throw new TypeError(s5 + " is ambiguous");
    n7[a5] = o6;
  }
  var u4 = t3.length, i6 = t3.charAt(0), D5 = Math.log(u4) / Math.log(256), c8 = Math.log(256) / Math.log(u4);
  function l9(h7) {
    if (h7 instanceof Uint8Array || (ArrayBuffer.isView(h7) ? h7 = new Uint8Array(h7.buffer, h7.byteOffset, h7.byteLength) : Array.isArray(h7) && (h7 = Uint8Array.from(h7))), !(h7 instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
    if (h7.length === 0) return "";
    for (var g5 = 0, S5 = 0, v7 = 0, L5 = h7.length; v7 !== L5 && h7[v7] === 0; ) v7++, g5++;
    for (var d7 = (L5 - v7) * c8 + 1 >>> 0, m5 = new Uint8Array(d7); v7 !== L5; ) {
      for (var F5 = h7[v7], q5 = 0, z7 = d7 - 1; (F5 !== 0 || q5 < S5) && z7 !== -1; z7--, q5++) F5 += 256 * m5[z7] >>> 0, m5[z7] = F5 % u4 >>> 0, F5 = F5 / u4 >>> 0;
      if (F5 !== 0) throw new Error("Non-zero carry");
      S5 = q5, v7++;
    }
    for (var I5 = d7 - S5; I5 !== d7 && m5[I5] === 0; ) I5++;
    for (var O5 = i6.repeat(g5); I5 < d7; ++I5) O5 += t3.charAt(m5[I5]);
    return O5;
  }
  function p6(h7) {
    if (typeof h7 != "string") throw new TypeError("Expected String");
    if (h7.length === 0) return new Uint8Array();
    var g5 = 0;
    if (h7[g5] !== " ") {
      for (var S5 = 0, v7 = 0; h7[g5] === i6; ) S5++, g5++;
      for (var L5 = (h7.length - g5) * D5 + 1 >>> 0, d7 = new Uint8Array(L5); h7[g5]; ) {
        var m5 = n7[h7.charCodeAt(g5)];
        if (m5 === 255) return;
        for (var F5 = 0, q5 = L5 - 1; (m5 !== 0 || F5 < v7) && q5 !== -1; q5--, F5++) m5 += u4 * d7[q5] >>> 0, d7[q5] = m5 % 256 >>> 0, m5 = m5 / 256 >>> 0;
        if (m5 !== 0) throw new Error("Non-zero carry");
        v7 = F5, g5++;
      }
      if (h7[g5] !== " ") {
        for (var z7 = L5 - v7; z7 !== L5 && d7[z7] === 0; ) z7++;
        for (var I5 = new Uint8Array(S5 + (L5 - z7)), O5 = S5; z7 !== L5; ) I5[O5++] = d7[z7++];
        return I5;
      }
    }
  }
  function w6(h7) {
    var g5 = p6(h7);
    if (g5) return g5;
    throw new Error(`Non-${e4} character`);
  }
  return { encode: l9, decodeUnsafe: p6, decode: w6 };
}
var Ur = Ir;
var Tr = Ur;
var He = (t3) => {
  if (t3 instanceof Uint8Array && t3.constructor.name === "Uint8Array") return t3;
  if (t3 instanceof ArrayBuffer) return new Uint8Array(t3);
  if (ArrayBuffer.isView(t3)) return new Uint8Array(t3.buffer, t3.byteOffset, t3.byteLength);
  throw new Error("Unknown type, must be binary type");
};
var Fr = (t3) => new TextEncoder().encode(t3);
var Nr = (t3) => new TextDecoder().decode(t3);
var Lr = class {
  constructor(e4, n7, r5) {
    this.name = e4, this.prefix = n7, this.baseEncode = r5;
  }
  encode(e4) {
    if (e4 instanceof Uint8Array) return `${this.prefix}${this.baseEncode(e4)}`;
    throw Error("Unknown type, must be binary type");
  }
};
var Or = class {
  constructor(e4, n7, r5) {
    if (this.name = e4, this.prefix = n7, n7.codePointAt(0) === void 0) throw new Error("Invalid prefix character");
    this.prefixCodePoint = n7.codePointAt(0), this.baseDecode = r5;
  }
  decode(e4) {
    if (typeof e4 == "string") {
      if (e4.codePointAt(0) !== this.prefixCodePoint) throw Error(`Unable to decode multibase string ${JSON.stringify(e4)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      return this.baseDecode(e4.slice(this.prefix.length));
    } else throw Error("Can only multibase decode strings");
  }
  or(e4) {
    return ze(this, e4);
  }
};
var Hr = class {
  constructor(e4) {
    this.decoders = e4;
  }
  or(e4) {
    return ze(this, e4);
  }
  decode(e4) {
    const n7 = e4[0], r5 = this.decoders[n7];
    if (r5) return r5.decode(e4);
    throw RangeError(`Unable to decode multibase string ${JSON.stringify(e4)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
  }
};
var ze = (t3, e4) => new Hr({ ...t3.decoders || { [t3.prefix]: t3 }, ...e4.decoders || { [e4.prefix]: e4 } });
var zr = class {
  constructor(e4, n7, r5, o6) {
    this.name = e4, this.prefix = n7, this.baseEncode = r5, this.baseDecode = o6, this.encoder = new Lr(e4, n7, r5), this.decoder = new Or(e4, n7, o6);
  }
  encode(e4) {
    return this.encoder.encode(e4);
  }
  decode(e4) {
    return this.decoder.decode(e4);
  }
};
var Bt = ({ name: t3, prefix: e4, encode: n7, decode: r5 }) => new zr(t3, e4, n7, r5);
var ht = ({ prefix: t3, name: e4, alphabet: n7 }) => {
  const { encode: r5, decode: o6 } = Tr(n7, e4);
  return Bt({ prefix: t3, name: e4, encode: r5, decode: (s5) => He(o6(s5)) });
};
var Mr = (t3, e4, n7, r5) => {
  const o6 = {};
  for (let c8 = 0; c8 < e4.length; ++c8) o6[e4[c8]] = c8;
  let s5 = t3.length;
  for (; t3[s5 - 1] === "="; ) --s5;
  const a5 = new Uint8Array(s5 * n7 / 8 | 0);
  let u4 = 0, i6 = 0, D5 = 0;
  for (let c8 = 0; c8 < s5; ++c8) {
    const l9 = o6[t3[c8]];
    if (l9 === void 0) throw new SyntaxError(`Non-${r5} character`);
    i6 = i6 << n7 | l9, u4 += n7, u4 >= 8 && (u4 -= 8, a5[D5++] = 255 & i6 >> u4);
  }
  if (u4 >= n7 || 255 & i6 << 8 - u4) throw new SyntaxError("Unexpected end of data");
  return a5;
};
var qr = (t3, e4, n7) => {
  const r5 = e4[e4.length - 1] === "=", o6 = (1 << n7) - 1;
  let s5 = "", a5 = 0, u4 = 0;
  for (let i6 = 0; i6 < t3.length; ++i6) for (u4 = u4 << 8 | t3[i6], a5 += 8; a5 > n7; ) a5 -= n7, s5 += e4[o6 & u4 >> a5];
  if (a5 && (s5 += e4[o6 & u4 << n7 - a5]), r5) for (; s5.length * n7 & 7; ) s5 += "=";
  return s5;
};
var k5 = ({ name: t3, prefix: e4, bitsPerChar: n7, alphabet: r5 }) => Bt({ prefix: e4, name: t3, encode(o6) {
  return qr(o6, r5, n7);
}, decode(o6) {
  return Mr(o6, r5, n7, t3);
} });
var $r = Bt({ prefix: "\0", name: "identity", encode: (t3) => Nr(t3), decode: (t3) => Fr(t3) });
var kr = Object.freeze({ __proto__: null, identity: $r });
var Rr = k5({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 });
var jr = Object.freeze({ __proto__: null, base2: Rr });
var Zr = k5({ prefix: "7", name: "base8", alphabet: "01234567", bitsPerChar: 3 });
var Gr = Object.freeze({ __proto__: null, base8: Zr });
var Vr = ht({ prefix: "9", name: "base10", alphabet: "0123456789" });
var Yr = Object.freeze({ __proto__: null, base10: Vr });
var Jr = k5({ prefix: "f", name: "base16", alphabet: "0123456789abcdef", bitsPerChar: 4 });
var Kr = k5({ prefix: "F", name: "base16upper", alphabet: "0123456789ABCDEF", bitsPerChar: 4 });
var Wr = Object.freeze({ __proto__: null, base16: Jr, base16upper: Kr });
var Xr = k5({ prefix: "b", name: "base32", alphabet: "abcdefghijklmnopqrstuvwxyz234567", bitsPerChar: 5 });
var Pr = k5({ prefix: "B", name: "base32upper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", bitsPerChar: 5 });
var Qr = k5({ prefix: "c", name: "base32pad", alphabet: "abcdefghijklmnopqrstuvwxyz234567=", bitsPerChar: 5 });
var to = k5({ prefix: "C", name: "base32padupper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=", bitsPerChar: 5 });
var eo = k5({ prefix: "v", name: "base32hex", alphabet: "0123456789abcdefghijklmnopqrstuv", bitsPerChar: 5 });
var no = k5({ prefix: "V", name: "base32hexupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV", bitsPerChar: 5 });
var ro = k5({ prefix: "t", name: "base32hexpad", alphabet: "0123456789abcdefghijklmnopqrstuv=", bitsPerChar: 5 });
var oo = k5({ prefix: "T", name: "base32hexpadupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=", bitsPerChar: 5 });
var so = k5({ prefix: "h", name: "base32z", alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769", bitsPerChar: 5 });
var io = Object.freeze({ __proto__: null, base32: Xr, base32upper: Pr, base32pad: Qr, base32padupper: to, base32hex: eo, base32hexupper: no, base32hexpad: ro, base32hexpadupper: oo, base32z: so });
var uo = ht({ prefix: "k", name: "base36", alphabet: "0123456789abcdefghijklmnopqrstuvwxyz" });
var co = ht({ prefix: "K", name: "base36upper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" });
var ao = Object.freeze({ __proto__: null, base36: uo, base36upper: co });
var fo = ht({ name: "base58btc", prefix: "z", alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz" });
var Do = ht({ name: "base58flickr", prefix: "Z", alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ" });
var ho = Object.freeze({ __proto__: null, base58btc: fo, base58flickr: Do });
var lo = k5({ prefix: "m", name: "base64", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", bitsPerChar: 6 });
var bo = k5({ prefix: "M", name: "base64pad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", bitsPerChar: 6 });
var po = k5({ prefix: "u", name: "base64url", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bitsPerChar: 6 });
var wo = k5({ prefix: "U", name: "base64urlpad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=", bitsPerChar: 6 });
var Eo = Object.freeze({ __proto__: null, base64: lo, base64pad: bo, base64url: po, base64urlpad: wo });
var Me = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂");
var go = Me.reduce((t3, e4, n7) => (t3[n7] = e4, t3), []);
var yo = Me.reduce((t3, e4, n7) => (t3[e4.codePointAt(0)] = n7, t3), []);
function xo(t3) {
  return t3.reduce((e4, n7) => (e4 += go[n7], e4), "");
}
function Bo(t3) {
  const e4 = [];
  for (const n7 of t3) {
    const r5 = yo[n7.codePointAt(0)];
    if (r5 === void 0) throw new Error(`Non-base256emoji character: ${n7}`);
    e4.push(r5);
  }
  return new Uint8Array(e4);
}
var Co = Bt({ prefix: "🚀", name: "base256emoji", encode: xo, decode: Bo });
var Ao = Object.freeze({ __proto__: null, base256emoji: Co });
var mo = $e;
var qe = 128;
var _o = 127;
var So = ~_o;
var vo = Math.pow(2, 31);
function $e(t3, e4, n7) {
  e4 = e4 || [], n7 = n7 || 0;
  for (var r5 = n7; t3 >= vo; ) e4[n7++] = t3 & 255 | qe, t3 /= 128;
  for (; t3 & So; ) e4[n7++] = t3 & 255 | qe, t3 >>>= 7;
  return e4[n7] = t3 | 0, $e.bytes = n7 - r5 + 1, e4;
}
var Io = Pt;
var Uo = 128;
var ke = 127;
function Pt(t3, r5) {
  var n7 = 0, r5 = r5 || 0, o6 = 0, s5 = r5, a5, u4 = t3.length;
  do {
    if (s5 >= u4) throw Pt.bytes = 0, new RangeError("Could not decode varint");
    a5 = t3[s5++], n7 += o6 < 28 ? (a5 & ke) << o6 : (a5 & ke) * Math.pow(2, o6), o6 += 7;
  } while (a5 >= Uo);
  return Pt.bytes = s5 - r5, n7;
}
var To = Math.pow(2, 7);
var Fo = Math.pow(2, 14);
var No = Math.pow(2, 21);
var Lo = Math.pow(2, 28);
var Oo = Math.pow(2, 35);
var Ho = Math.pow(2, 42);
var zo = Math.pow(2, 49);
var Mo = Math.pow(2, 56);
var qo = Math.pow(2, 63);
var $o = function(t3) {
  return t3 < To ? 1 : t3 < Fo ? 2 : t3 < No ? 3 : t3 < Lo ? 4 : t3 < Oo ? 5 : t3 < Ho ? 6 : t3 < zo ? 7 : t3 < Mo ? 8 : t3 < qo ? 9 : 10;
};
var ko = { encode: mo, decode: Io, encodingLength: $o };
var Re = ko;
var je = (t3, e4, n7 = 0) => (Re.encode(t3, e4, n7), e4);
var Ze = (t3) => Re.encodingLength(t3);
var Qt = (t3, e4) => {
  const n7 = e4.byteLength, r5 = Ze(t3), o6 = r5 + Ze(n7), s5 = new Uint8Array(o6 + n7);
  return je(t3, s5, 0), je(n7, s5, r5), s5.set(e4, o6), new Ro(t3, n7, e4, s5);
};
var Ro = class {
  constructor(e4, n7, r5, o6) {
    this.code = e4, this.size = n7, this.digest = r5, this.bytes = o6;
  }
};
var Ge = ({ name: t3, code: e4, encode: n7 }) => new jo(t3, e4, n7);
var jo = class {
  constructor(e4, n7, r5) {
    this.name = e4, this.code = n7, this.encode = r5;
  }
  digest(e4) {
    if (e4 instanceof Uint8Array) {
      const n7 = this.encode(e4);
      return n7 instanceof Uint8Array ? Qt(this.code, n7) : n7.then((r5) => Qt(this.code, r5));
    } else throw Error("Unknown type, must be binary type");
  }
};
var Ve = (t3) => async (e4) => new Uint8Array(await crypto.subtle.digest(t3, e4));
var Zo = Ge({ name: "sha2-256", code: 18, encode: Ve("SHA-256") });
var Go = Ge({ name: "sha2-512", code: 19, encode: Ve("SHA-512") });
var Vo = Object.freeze({ __proto__: null, sha256: Zo, sha512: Go });
var Ye = 0;
var Yo = "identity";
var Je = He;
var Jo = (t3) => Qt(Ye, Je(t3));
var Ko = { code: Ye, name: Yo, encode: Je, digest: Jo };
var Wo = Object.freeze({ __proto__: null, identity: Ko });
new TextEncoder(), new TextDecoder();
var Ke = { ...kr, ...jr, ...Gr, ...Yr, ...Wr, ...io, ...ao, ...ho, ...Eo, ...Ao };
({ ...Vo, ...Wo });
function We(t3, e4, n7, r5) {
  return { name: t3, prefix: e4, encoder: { name: t3, prefix: e4, encode: n7 }, decoder: { decode: r5 } };
}
var Xe = We("utf8", "u", (t3) => "u" + new TextDecoder("utf8").decode(t3), (t3) => new TextEncoder().encode(t3.substring(1)));
var te = We("ascii", "a", (t3) => {
  let e4 = "a";
  for (let n7 = 0; n7 < t3.length; n7++) e4 += String.fromCharCode(t3[n7]);
  return e4;
}, (t3) => {
  t3 = t3.substring(1);
  const e4 = Le(t3.length);
  for (let n7 = 0; n7 < t3.length; n7++) e4[n7] = t3.charCodeAt(n7);
  return e4;
});
var Pe = { utf8: Xe, "utf-8": Xe, hex: Ke.base16, latin1: te, ascii: te, binary: te, ...Ke };
function ct(t3, e4 = "utf8") {
  const n7 = Pe[e4];
  if (!n7) throw new Error(`Unsupported encoding "${e4}"`);
  return (e4 === "utf8" || e4 === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(t3.buffer, t3.byteOffset, t3.byteLength).toString("utf8") : n7.encoder.encode(t3).substring(1);
}
function rt(t3, e4 = "utf8") {
  const n7 = Pe[e4];
  if (!n7) throw new Error(`Unsupported encoding "${e4}"`);
  return (e4 === "utf8" || e4 === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? Xt(globalThis.Buffer.from(t3, "utf-8")) : n7.decoder.decode(`${n7.prefix}${t3}`);
}
function lt(t3) {
  return safeJsonParse4(ct(rt(t3, Dt), Gt));
}
function bt(t3) {
  return ct(rt(safeJsonStringify5(t3), Gt), Dt);
}
function Qe(t3) {
  const e4 = rt(Wt, dt), n7 = Kt + ct(Oe([e4, t3]), dt);
  return [Yt, Jt, n7].join(Vt);
}
function en(t3) {
  return ct(t3, Dt);
}
function nn(t3) {
  return rt(t3, Dt);
}
function rn(t3) {
  return rt([bt(t3.header), bt(t3.payload)].join(ut), xt);
}
function on(t3) {
  return [bt(t3.header), bt(t3.payload), en(t3.signature)].join(ut);
}
function sn(t3) {
  const e4 = t3.split(ut), n7 = lt(e4[0]), r5 = lt(e4[1]), o6 = nn(e4[2]), s5 = rt(e4.slice(0, 2).join(ut), xt);
  return { header: n7, payload: r5, signature: o6, data: s5 };
}
function Po(t3 = he(Ne)) {
  const e4 = Rt.getPublicKey(t3);
  return { secretKey: Oe([t3, e4]), publicKey: e4 };
}
async function Qo(t3, e4, n7, r5, o6 = (0, import_time2.fromMiliseconds)(Date.now())) {
  const s5 = { alg: jt, typ: Zt }, a5 = Qe(r5.publicKey), u4 = o6 + n7, i6 = { iss: a5, sub: t3, aud: e4, iat: o6, exp: u4 }, D5 = rn({ header: s5, payload: i6 }), c8 = Rt.sign(D5, r5.secretKey.slice(0, 32));
  return on({ header: s5, payload: i6, signature: c8 });
}

// node_modules/@walletconnect/utils/node_modules/detect-browser/es/index.js
var __spreadArray = function(to3, from8, pack) {
  if (pack || arguments.length === 2) for (var i6 = 0, l9 = from8.length, ar4; i6 < l9; i6++) {
    if (ar4 || !(i6 in from8)) {
      if (!ar4) ar4 = Array.prototype.slice.call(from8, 0, i6);
      ar4[i6] = from8[i6];
    }
  }
  return to3.concat(ar4 || Array.prototype.slice.call(from8));
};
var BrowserInfo2 = (
  /** @class */
  /* @__PURE__ */ function() {
    function BrowserInfo3(name2, version3, os2) {
      this.name = name2;
      this.version = version3;
      this.os = os2;
      this.type = "browser";
    }
    return BrowserInfo3;
  }()
);
var NodeInfo2 = (
  /** @class */
  /* @__PURE__ */ function() {
    function NodeInfo3(version3) {
      this.version = version3;
      this.type = "node";
      this.name = "node";
      this.os = process.platform;
    }
    return NodeInfo3;
  }()
);
var SearchBotDeviceInfo2 = (
  /** @class */
  /* @__PURE__ */ function() {
    function SearchBotDeviceInfo3(name2, version3, os2, bot) {
      this.name = name2;
      this.version = version3;
      this.os = os2;
      this.bot = bot;
      this.type = "bot-device";
    }
    return SearchBotDeviceInfo3;
  }()
);
var BotInfo2 = (
  /** @class */
  /* @__PURE__ */ function() {
    function BotInfo3() {
      this.type = "bot";
      this.bot = true;
      this.name = "bot";
      this.version = null;
      this.os = null;
    }
    return BotInfo3;
  }()
);
var ReactNativeInfo2 = (
  /** @class */
  /* @__PURE__ */ function() {
    function ReactNativeInfo3() {
      this.type = "react-native";
      this.name = "react-native";
      this.version = null;
      this.os = null;
    }
    return ReactNativeInfo3;
  }()
);
var SEARCHBOX_UA_REGEX2 = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/;
var SEARCHBOT_OS_REGEX2 = /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/;
var REQUIRED_VERSION_PARTS2 = 3;
var userAgentRules2 = [
  ["aol", /AOLShield\/([0-9\._]+)/],
  ["edge", /Edge\/([0-9\._]+)/],
  ["edge-ios", /EdgiOS\/([0-9\._]+)/],
  ["yandexbrowser", /YaBrowser\/([0-9\._]+)/],
  ["kakaotalk", /KAKAOTALK\s([0-9\.]+)/],
  ["samsung", /SamsungBrowser\/([0-9\.]+)/],
  ["silk", /\bSilk\/([0-9._-]+)\b/],
  ["miui", /MiuiBrowser\/([0-9\.]+)$/],
  ["beaker", /BeakerBrowser\/([0-9\.]+)/],
  ["edge-chromium", /EdgA?\/([0-9\.]+)/],
  [
    "chromium-webview",
    /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/
  ],
  ["chrome", /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
  ["phantomjs", /PhantomJS\/([0-9\.]+)(:?\s|$)/],
  ["crios", /CriOS\/([0-9\.]+)(:?\s|$)/],
  ["firefox", /Firefox\/([0-9\.]+)(?:\s|$)/],
  ["fxios", /FxiOS\/([0-9\.]+)/],
  ["opera-mini", /Opera Mini.*Version\/([0-9\.]+)/],
  ["opera", /Opera\/([0-9\.]+)(?:\s|$)/],
  ["opera", /OPR\/([0-9\.]+)(:?\s|$)/],
  ["pie", /^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],
  ["pie", /^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],
  ["netfront", /^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],
  ["ie", /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
  ["ie", /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
  ["ie", /MSIE\s(7\.0)/],
  ["bb10", /BB10;\sTouch.*Version\/([0-9\.]+)/],
  ["android", /Android\s([0-9\.]+)/],
  ["ios", /Version\/([0-9\._]+).*Mobile.*Safari.*/],
  ["safari", /Version\/([0-9\._]+).*Safari/],
  ["facebook", /FB[AS]V\/([0-9\.]+)/],
  ["instagram", /Instagram\s([0-9\.]+)/],
  ["ios-webview", /AppleWebKit\/([0-9\.]+).*Mobile/],
  ["ios-webview", /AppleWebKit\/([0-9\.]+).*Gecko\)$/],
  ["curl", /^curl\/([0-9\.]+)$/],
  ["searchbot", SEARCHBOX_UA_REGEX2]
];
var operatingSystemRules2 = [
  ["iOS", /iP(hone|od|ad)/],
  ["Android OS", /Android/],
  ["BlackBerry OS", /BlackBerry|BB10/],
  ["Windows Mobile", /IEMobile/],
  ["Amazon OS", /Kindle/],
  ["Windows 3.11", /Win16/],
  ["Windows 95", /(Windows 95)|(Win95)|(Windows_95)/],
  ["Windows 98", /(Windows 98)|(Win98)/],
  ["Windows 2000", /(Windows NT 5.0)|(Windows 2000)/],
  ["Windows XP", /(Windows NT 5.1)|(Windows XP)/],
  ["Windows Server 2003", /(Windows NT 5.2)/],
  ["Windows Vista", /(Windows NT 6.0)/],
  ["Windows 7", /(Windows NT 6.1)/],
  ["Windows 8", /(Windows NT 6.2)/],
  ["Windows 8.1", /(Windows NT 6.3)/],
  ["Windows 10", /(Windows NT 10.0)/],
  ["Windows ME", /Windows ME/],
  ["Windows CE", /Windows CE|WinCE|Microsoft Pocket Internet Explorer/],
  ["Open BSD", /OpenBSD/],
  ["Sun OS", /SunOS/],
  ["Chrome OS", /CrOS/],
  ["Linux", /(Linux)|(X11)/],
  ["Mac OS", /(Mac_PowerPC)|(Macintosh)/],
  ["QNX", /QNX/],
  ["BeOS", /BeOS/],
  ["OS/2", /OS\/2/]
];
function detect2(userAgent) {
  if (!!userAgent) {
    return parseUserAgent2(userAgent);
  }
  if (typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative") {
    return new ReactNativeInfo2();
  }
  if (typeof navigator !== "undefined") {
    return parseUserAgent2(navigator.userAgent);
  }
  return getNodeVersion2();
}
function matchUserAgent2(ua) {
  return ua !== "" && userAgentRules2.reduce(function(matched, _a) {
    var browser = _a[0], regex = _a[1];
    if (matched) {
      return matched;
    }
    var uaMatch = regex.exec(ua);
    return !!uaMatch && [browser, uaMatch];
  }, false);
}
function parseUserAgent2(ua) {
  var matchedRule = matchUserAgent2(ua);
  if (!matchedRule) {
    return null;
  }
  var name2 = matchedRule[0], match = matchedRule[1];
  if (name2 === "searchbot") {
    return new BotInfo2();
  }
  var versionParts = match[1] && match[1].split(".").join("_").split("_").slice(0, 3);
  if (versionParts) {
    if (versionParts.length < REQUIRED_VERSION_PARTS2) {
      versionParts = __spreadArray(__spreadArray([], versionParts, true), createVersionParts2(REQUIRED_VERSION_PARTS2 - versionParts.length), true);
    }
  } else {
    versionParts = [];
  }
  var version3 = versionParts.join(".");
  var os2 = detectOS3(ua);
  var searchBotMatch = SEARCHBOT_OS_REGEX2.exec(ua);
  if (searchBotMatch && searchBotMatch[1]) {
    return new SearchBotDeviceInfo2(name2, version3, os2, searchBotMatch[1]);
  }
  return new BrowserInfo2(name2, version3, os2);
}
function detectOS3(ua) {
  for (var ii3 = 0, count = operatingSystemRules2.length; ii3 < count; ii3++) {
    var _a = operatingSystemRules2[ii3], os2 = _a[0], regex = _a[1];
    var match = regex.exec(ua);
    if (match) {
      return os2;
    }
  }
  return null;
}
function getNodeVersion2() {
  var isNode3 = typeof process !== "undefined" && process.version;
  return isNode3 ? new NodeInfo2(process.version.slice(1)) : null;
}
function createVersionParts2(count) {
  var output = [];
  for (var ii3 = 0; ii3 < count; ii3++) {
    output.push("0");
  }
  return output;
}

// node_modules/@walletconnect/utils/dist/index.es.js
var import_time3 = __toESM(require_cjs4());
var import_window_getters = __toESM(require_cjs5());
var import_window_metadata = __toESM(require_cjs6());

// node_modules/viem/_esm/accounts/utils/publicKeyToAddress.js
function publicKeyToAddress(publicKey) {
  const address = keccak256(`0x${publicKey.substring(4)}`).substring(26);
  return checksumAddress(`0x${address}`);
}

// node_modules/viem/_esm/utils/signature/recoverPublicKey.js
async function recoverPublicKey({ hash, signature }) {
  const hashHex = isHex(hash) ? hash : toHex(hash);
  const { secp256k1: secp256k12 } = await import("./secp256k1-GPWPCLCA.js");
  const signature_ = (() => {
    if (typeof signature === "object" && "r" in signature && "s" in signature) {
      const { r: r5, s: s5, v: v7, yParity } = signature;
      const yParityOrV2 = Number(yParity ?? v7);
      const recoveryBit2 = toRecoveryBit(yParityOrV2);
      return new secp256k12.Signature(hexToBigInt(r5), hexToBigInt(s5)).addRecoveryBit(recoveryBit2);
    }
    const signatureHex = isHex(signature) ? signature : toHex(signature);
    const yParityOrV = hexToNumber(`0x${signatureHex.slice(130)}`);
    const recoveryBit = toRecoveryBit(yParityOrV);
    return secp256k12.Signature.fromCompact(signatureHex.substring(2, 130)).addRecoveryBit(recoveryBit);
  })();
  const publicKey = signature_.recoverPublicKey(hashHex.substring(2)).toHex(false);
  return `0x${publicKey}`;
}
function toRecoveryBit(yParityOrV) {
  if (yParityOrV === 0 || yParityOrV === 1)
    return yParityOrV;
  if (yParityOrV === 27)
    return 0;
  if (yParityOrV === 28)
    return 1;
  throw new Error("Invalid yParityOrV value");
}

// node_modules/viem/_esm/utils/signature/recoverAddress.js
async function recoverAddress({ hash, signature }) {
  return publicKeyToAddress(await recoverPublicKey({ hash, signature }));
}

// node_modules/viem/_esm/utils/formatters/transaction.js
var transactionType = {
  "0x0": "legacy",
  "0x1": "eip2930",
  "0x2": "eip1559",
  "0x3": "eip4844",
  "0x4": "eip7702"
};
function formatTransaction(transaction) {
  const transaction_ = {
    ...transaction,
    blockHash: transaction.blockHash ? transaction.blockHash : null,
    blockNumber: transaction.blockNumber ? BigInt(transaction.blockNumber) : null,
    chainId: transaction.chainId ? hexToNumber(transaction.chainId) : void 0,
    gas: transaction.gas ? BigInt(transaction.gas) : void 0,
    gasPrice: transaction.gasPrice ? BigInt(transaction.gasPrice) : void 0,
    maxFeePerBlobGas: transaction.maxFeePerBlobGas ? BigInt(transaction.maxFeePerBlobGas) : void 0,
    maxFeePerGas: transaction.maxFeePerGas ? BigInt(transaction.maxFeePerGas) : void 0,
    maxPriorityFeePerGas: transaction.maxPriorityFeePerGas ? BigInt(transaction.maxPriorityFeePerGas) : void 0,
    nonce: transaction.nonce ? hexToNumber(transaction.nonce) : void 0,
    to: transaction.to ? transaction.to : null,
    transactionIndex: transaction.transactionIndex ? Number(transaction.transactionIndex) : null,
    type: transaction.type ? transactionType[transaction.type] : void 0,
    typeHex: transaction.type ? transaction.type : void 0,
    value: transaction.value ? BigInt(transaction.value) : void 0,
    v: transaction.v ? BigInt(transaction.v) : void 0
  };
  if (transaction.authorizationList)
    transaction_.authorizationList = formatAuthorizationList(transaction.authorizationList);
  transaction_.yParity = (() => {
    if (transaction.yParity)
      return Number(transaction.yParity);
    if (typeof transaction_.v === "bigint") {
      if (transaction_.v === 0n || transaction_.v === 27n)
        return 0;
      if (transaction_.v === 1n || transaction_.v === 28n)
        return 1;
      if (transaction_.v >= 35n)
        return transaction_.v % 2n === 0n ? 1 : 0;
    }
    return void 0;
  })();
  if (transaction_.type === "legacy") {
    delete transaction_.accessList;
    delete transaction_.maxFeePerBlobGas;
    delete transaction_.maxFeePerGas;
    delete transaction_.maxPriorityFeePerGas;
    delete transaction_.yParity;
  }
  if (transaction_.type === "eip2930") {
    delete transaction_.maxFeePerBlobGas;
    delete transaction_.maxFeePerGas;
    delete transaction_.maxPriorityFeePerGas;
  }
  if (transaction_.type === "eip1559") {
    delete transaction_.maxFeePerBlobGas;
  }
  return transaction_;
}
var defineTransaction = defineFormatter("transaction", formatTransaction);
function formatAuthorizationList(authorizationList) {
  return authorizationList.map((authorization) => ({
    contractAddress: authorization.address,
    chainId: Number(authorization.chainId),
    nonce: Number(authorization.nonce),
    r: authorization.r,
    s: authorization.s,
    yParity: Number(authorization.yParity)
  }));
}

// node_modules/viem/_esm/utils/formatters/block.js
function formatBlock(block) {
  const transactions = (block.transactions ?? []).map((transaction) => {
    if (typeof transaction === "string")
      return transaction;
    return formatTransaction(transaction);
  });
  return {
    ...block,
    baseFeePerGas: block.baseFeePerGas ? BigInt(block.baseFeePerGas) : null,
    blobGasUsed: block.blobGasUsed ? BigInt(block.blobGasUsed) : void 0,
    difficulty: block.difficulty ? BigInt(block.difficulty) : void 0,
    excessBlobGas: block.excessBlobGas ? BigInt(block.excessBlobGas) : void 0,
    gasLimit: block.gasLimit ? BigInt(block.gasLimit) : void 0,
    gasUsed: block.gasUsed ? BigInt(block.gasUsed) : void 0,
    hash: block.hash ? block.hash : null,
    logsBloom: block.logsBloom ? block.logsBloom : null,
    nonce: block.nonce ? block.nonce : null,
    number: block.number ? BigInt(block.number) : null,
    size: block.size ? BigInt(block.size) : void 0,
    timestamp: block.timestamp ? BigInt(block.timestamp) : void 0,
    transactions,
    totalDifficulty: block.totalDifficulty ? BigInt(block.totalDifficulty) : null
  };
}
var defineBlock = defineFormatter("block", formatBlock);

// node_modules/viem/_esm/actions/public/getTransactionCount.js
async function getTransactionCount(client, { address, blockTag = "latest", blockNumber }) {
  const count = await client.request({
    method: "eth_getTransactionCount",
    params: [address, blockNumber ? numberToHex(blockNumber) : blockTag]
  }, { dedupe: Boolean(blockNumber) });
  return hexToNumber(count);
}

// node_modules/viem/_esm/utils/hash/sha256.js
init_sha256();

// node_modules/viem/_esm/constants/blob.js
var blobsPerTransaction = 6;
var bytesPerFieldElement = 32;
var fieldElementsPerBlob = 4096;
var bytesPerBlob = bytesPerFieldElement * fieldElementsPerBlob;
var maxBytesPerTransaction = bytesPerBlob * blobsPerTransaction - // terminator byte (0x80).
1 - // zero byte (0x00) appended to each field element.
1 * fieldElementsPerBlob * blobsPerTransaction;

// node_modules/viem/_esm/utils/formatters/log.js
function formatLog(log, { args, eventName } = {}) {
  return {
    ...log,
    blockHash: log.blockHash ? log.blockHash : null,
    blockNumber: log.blockNumber ? BigInt(log.blockNumber) : null,
    logIndex: log.logIndex ? Number(log.logIndex) : null,
    transactionHash: log.transactionHash ? log.transactionHash : null,
    transactionIndex: log.transactionIndex ? Number(log.transactionIndex) : null,
    ...eventName ? { args, eventName } : {}
  };
}

// node_modules/viem/_esm/actions/wallet/sendTransaction.js
var supportsWalletNamespace = new LruMap(128);

// node_modules/viem/_esm/utils/promise/withDedupe.js
var promiseCache = new LruMap(8192);

// node_modules/viem/_esm/utils/rpc/id.js
function createIdStore() {
  return {
    current: 0,
    take() {
      return this.current++;
    },
    reset() {
      this.current = 0;
    }
  };
}
var idCache = createIdStore();

// node_modules/viem/_esm/utils/formatters/transactionReceipt.js
var receiptStatuses = {
  "0x0": "reverted",
  "0x1": "success"
};
function formatTransactionReceipt(transactionReceipt) {
  const receipt = {
    ...transactionReceipt,
    blockNumber: transactionReceipt.blockNumber ? BigInt(transactionReceipt.blockNumber) : null,
    contractAddress: transactionReceipt.contractAddress ? transactionReceipt.contractAddress : null,
    cumulativeGasUsed: transactionReceipt.cumulativeGasUsed ? BigInt(transactionReceipt.cumulativeGasUsed) : null,
    effectiveGasPrice: transactionReceipt.effectiveGasPrice ? BigInt(transactionReceipt.effectiveGasPrice) : null,
    gasUsed: transactionReceipt.gasUsed ? BigInt(transactionReceipt.gasUsed) : null,
    logs: transactionReceipt.logs ? transactionReceipt.logs.map((log) => formatLog(log)) : null,
    to: transactionReceipt.to ? transactionReceipt.to : null,
    transactionIndex: transactionReceipt.transactionIndex ? hexToNumber(transactionReceipt.transactionIndex) : null,
    status: transactionReceipt.status ? receiptStatuses[transactionReceipt.status] : null,
    type: transactionReceipt.type ? transactionType[transactionReceipt.type] || transactionReceipt.type : null
  };
  if (transactionReceipt.blobGasPrice)
    receipt.blobGasPrice = BigInt(transactionReceipt.blobGasPrice);
  if (transactionReceipt.blobGasUsed)
    receipt.blobGasUsed = BigInt(transactionReceipt.blobGasUsed);
  return receipt;
}
var defineTransactionReceipt = defineFormatter("transactionReceipt", formatTransactionReceipt);

// node_modules/@noble/hashes/esm/ripemd160.js
init_md();
init_utils();
var Rho = new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]);
var Id = new Uint8Array(new Array(16).fill(0).map((_8, i6) => i6));
var Pi = Id.map((i6) => (9 * i6 + 5) % 16);
var idxL = [Id];
var idxR = [Pi];
for (let i6 = 0; i6 < 4; i6++)
  for (let j6 of [idxL, idxR])
    j6.push(j6[i6].map((k7) => Rho[k7]));
var shifts = [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((i6) => new Uint8Array(i6));
var shiftsL = idxL.map((idx, i6) => idx.map((j6) => shifts[i6][j6]));
var shiftsR = idxR.map((idx, i6) => idx.map((j6) => shifts[i6][j6]));
var Kl = new Uint32Array([
  0,
  1518500249,
  1859775393,
  2400959708,
  2840853838
]);
var Kr2 = new Uint32Array([
  1352829926,
  1548603684,
  1836072691,
  2053994217,
  0
]);
function f5(group, x9, y6, z7) {
  if (group === 0)
    return x9 ^ y6 ^ z7;
  else if (group === 1)
    return x9 & y6 | ~x9 & z7;
  else if (group === 2)
    return (x9 | ~y6) ^ z7;
  else if (group === 3)
    return x9 & z7 | y6 & ~z7;
  else
    return x9 ^ (y6 | ~z7);
}
var R_BUF = new Uint32Array(16);
var RIPEMD160 = class extends HashMD {
  constructor() {
    super(64, 20, 8, true);
    this.h0 = 1732584193 | 0;
    this.h1 = 4023233417 | 0;
    this.h2 = 2562383102 | 0;
    this.h3 = 271733878 | 0;
    this.h4 = 3285377520 | 0;
  }
  get() {
    const { h0, h1, h2: h22, h3: h32, h4: h42 } = this;
    return [h0, h1, h22, h32, h42];
  }
  set(h0, h1, h22, h32, h42) {
    this.h0 = h0 | 0;
    this.h1 = h1 | 0;
    this.h2 = h22 | 0;
    this.h3 = h32 | 0;
    this.h4 = h42 | 0;
  }
  process(view, offset) {
    for (let i6 = 0; i6 < 16; i6++, offset += 4)
      R_BUF[i6] = view.getUint32(offset, true);
    let al = this.h0 | 0, ar4 = al, bl = this.h1 | 0, br4 = bl, cl = this.h2 | 0, cr4 = cl, dl = this.h3 | 0, dr4 = dl, el = this.h4 | 0, er4 = el;
    for (let group = 0; group < 5; group++) {
      const rGroup = 4 - group;
      const hbl = Kl[group], hbr = Kr2[group];
      const rl = idxL[group], rr4 = idxR[group];
      const sl = shiftsL[group], sr4 = shiftsR[group];
      for (let i6 = 0; i6 < 16; i6++) {
        const tl = rotl(al + f5(group, bl, cl, dl) + R_BUF[rl[i6]] + hbl, sl[i6]) + el | 0;
        al = el, el = dl, dl = rotl(cl, 10) | 0, cl = bl, bl = tl;
      }
      for (let i6 = 0; i6 < 16; i6++) {
        const tr4 = rotl(ar4 + f5(rGroup, br4, cr4, dr4) + R_BUF[rr4[i6]] + hbr, sr4[i6]) + er4 | 0;
        ar4 = er4, er4 = dr4, dr4 = rotl(cr4, 10) | 0, cr4 = br4, br4 = tr4;
      }
    }
    this.set(this.h1 + cl + dr4 | 0, this.h2 + dl + er4 | 0, this.h3 + el + ar4 | 0, this.h4 + al + br4 | 0, this.h0 + bl + cr4 | 0);
  }
  roundClean() {
    R_BUF.fill(0);
  }
  destroy() {
    this.destroyed = true;
    this.buffer.fill(0);
    this.set(0, 0, 0, 0, 0);
  }
};
var ripemd160 = wrapConstructor(() => new RIPEMD160());

// node_modules/viem/_esm/utils/nonceManager.js
function createNonceManager(parameters) {
  const { source } = parameters;
  const deltaMap = /* @__PURE__ */ new Map();
  const nonceMap = new LruMap(8192);
  const promiseMap = /* @__PURE__ */ new Map();
  const getKey = ({ address, chainId }) => `${address}.${chainId}`;
  return {
    async consume({ address, chainId, client }) {
      const key = getKey({ address, chainId });
      const promise = this.get({ address, chainId, client });
      this.increment({ address, chainId });
      const nonce = await promise;
      await source.set({ address, chainId }, nonce);
      nonceMap.set(key, nonce);
      return nonce;
    },
    async increment({ address, chainId }) {
      const key = getKey({ address, chainId });
      const delta = deltaMap.get(key) ?? 0;
      deltaMap.set(key, delta + 1);
    },
    async get({ address, chainId, client }) {
      const key = getKey({ address, chainId });
      let promise = promiseMap.get(key);
      if (!promise) {
        promise = (async () => {
          try {
            const nonce = await source.get({ address, chainId, client });
            const previousNonce = nonceMap.get(key) ?? 0;
            if (previousNonce > 0 && nonce <= previousNonce)
              return previousNonce + 1;
            nonceMap.delete(key);
            return nonce;
          } finally {
            this.reset({ address, chainId });
          }
        })();
        promiseMap.set(key, promise);
      }
      const delta = deltaMap.get(key) ?? 0;
      return delta + await promise;
    },
    reset({ address, chainId }) {
      const key = getKey({ address, chainId });
      deltaMap.delete(key);
      promiseMap.delete(key);
    }
  };
}
function jsonRpc() {
  return {
    async get(parameters) {
      const { address, client } = parameters;
      return getTransactionCount(client, {
        address,
        blockTag: "pending"
      });
    },
    set() {
    }
  };
}
var nonceManager = createNonceManager({
  source: jsonRpc()
});

// node_modules/ox/_esm/core/Hex.js
init_utils2();

// node_modules/ox/_esm/core/Bytes.js
init_utils2();

// node_modules/ox/_esm/core/version.js
var version = "0.1.1";

// node_modules/ox/_esm/core/internal/errors.js
function getVersion() {
  return version;
}

// node_modules/ox/_esm/core/Errors.js
var BaseError2 = class _BaseError extends Error {
  constructor(shortMessage, options = {}) {
    const details = (() => {
      var _a;
      if (options.cause instanceof _BaseError) {
        if (options.cause.details)
          return options.cause.details;
        if (options.cause.shortMessage)
          return options.cause.shortMessage;
      }
      if ((_a = options.cause) == null ? void 0 : _a.message)
        return options.cause.message;
      return options.details;
    })();
    const docsPath = (() => {
      if (options.cause instanceof _BaseError)
        return options.cause.docsPath || options.docsPath;
      return options.docsPath;
    })();
    const docsBaseUrl = "https://oxlib.sh";
    const docs = `${docsBaseUrl}${docsPath ?? ""}`;
    const message = [
      shortMessage || "An error occurred.",
      ...options.metaMessages ? ["", ...options.metaMessages] : [],
      ...details || docsPath ? [
        "",
        details ? `Details: ${details}` : void 0,
        docsPath ? `See: ${docs}` : void 0
      ] : []
    ].filter((x9) => typeof x9 === "string").join("\n");
    super(message, options.cause ? { cause: options.cause } : void 0);
    Object.defineProperty(this, "details", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "docs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "docsPath", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "shortMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "cause", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "BaseError"
    });
    Object.defineProperty(this, "version", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: `ox@${getVersion()}`
    });
    this.cause = options.cause;
    this.details = details;
    this.docs = docs;
    this.docsPath = docsPath;
    this.shortMessage = shortMessage;
  }
  walk(fn3) {
    return walk(this, fn3);
  }
};
function walk(err, fn3) {
  if (fn3 == null ? void 0 : fn3(err))
    return err;
  if (err && typeof err === "object" && "cause" in err && err.cause)
    return walk(err.cause, fn3);
  return fn3 ? null : err;
}

// node_modules/ox/_esm/core/internal/bytes.js
function assertSize(bytes, size_) {
  if (size2(bytes) > size_)
    throw new SizeOverflowError({
      givenSize: size2(bytes),
      maxSize: size_
    });
}
var charCodeMap = {
  zero: 48,
  nine: 57,
  A: 65,
  F: 70,
  a: 97,
  f: 102
};
function charCodeToBase16(char) {
  if (char >= charCodeMap.zero && char <= charCodeMap.nine)
    return char - charCodeMap.zero;
  if (char >= charCodeMap.A && char <= charCodeMap.F)
    return char - (charCodeMap.A - 10);
  if (char >= charCodeMap.a && char <= charCodeMap.f)
    return char - (charCodeMap.a - 10);
  return void 0;
}
function pad2(bytes, options = {}) {
  const { dir, size: size4 = 32 } = options;
  if (size4 === 0)
    return bytes;
  if (bytes.length > size4)
    throw new SizeExceedsPaddingSizeError({
      size: bytes.length,
      targetSize: size4,
      type: "Bytes"
    });
  const paddedBytes = new Uint8Array(size4);
  for (let i6 = 0; i6 < size4; i6++) {
    const padEnd = dir === "right";
    paddedBytes[padEnd ? i6 : size4 - i6 - 1] = bytes[padEnd ? i6 : bytes.length - i6 - 1];
  }
  return paddedBytes;
}

// node_modules/ox/_esm/core/internal/hex.js
function assertSize2(hex, size_) {
  if (size3(hex) > size_)
    throw new SizeOverflowError2({
      givenSize: size3(hex),
      maxSize: size_
    });
}
function pad3(hex_, options = {}) {
  const { dir, size: size4 = 32 } = options;
  if (size4 === 0)
    return hex_;
  const hex = hex_.replace("0x", "");
  if (hex.length > size4 * 2)
    throw new SizeExceedsPaddingSizeError2({
      size: Math.ceil(hex.length / 2),
      targetSize: size4,
      type: "Hex"
    });
  return `0x${hex[dir === "right" ? "padEnd" : "padStart"](size4 * 2, "0")}`;
}

// node_modules/ox/_esm/core/Bytes.js
var decoder = new TextDecoder();
var encoder = new TextEncoder();
function from(value) {
  if (value instanceof Uint8Array)
    return value;
  if (typeof value === "string")
    return fromHex2(value);
  return fromArray(value);
}
function fromArray(value) {
  return value instanceof Uint8Array ? value : new Uint8Array(value);
}
function fromHex2(value, options = {}) {
  const { size: size4 } = options;
  let hex = value;
  if (size4) {
    assertSize2(value, size4);
    hex = padRight(value, size4);
  }
  let hexString = hex.slice(2);
  if (hexString.length % 2)
    hexString = `0${hexString}`;
  const length2 = hexString.length / 2;
  const bytes = new Uint8Array(length2);
  for (let index = 0, j6 = 0; index < length2; index++) {
    const nibbleLeft = charCodeToBase16(hexString.charCodeAt(j6++));
    const nibbleRight = charCodeToBase16(hexString.charCodeAt(j6++));
    if (nibbleLeft === void 0 || nibbleRight === void 0) {
      throw new BaseError2(`Invalid byte sequence ("${hexString[j6 - 2]}${hexString[j6 - 1]}" in "${hexString}").`);
    }
    bytes[index] = nibbleLeft * 16 + nibbleRight;
  }
  return bytes;
}
function fromString(value, options = {}) {
  const { size: size4 } = options;
  const bytes = encoder.encode(value);
  if (typeof size4 === "number") {
    assertSize(bytes, size4);
    return padRight2(bytes, size4);
  }
  return bytes;
}
function padRight2(value, size4) {
  return pad2(value, { dir: "right", size: size4 });
}
function size2(value) {
  return value.length;
}
var SizeOverflowError = class extends BaseError2 {
  constructor({ givenSize, maxSize }) {
    super(`Size cannot exceed \`${maxSize}\` bytes. Given size: \`${givenSize}\` bytes.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Bytes.SizeOverflowError"
    });
  }
};
var SizeExceedsPaddingSizeError = class extends BaseError2 {
  constructor({ size: size4, targetSize, type }) {
    super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (\`${size4}\`) exceeds padding size (\`${targetSize}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Bytes.SizeExceedsPaddingSizeError"
    });
  }
};

// node_modules/ox/_esm/core/Hex.js
var encoder2 = new TextEncoder();
var hexes = Array.from({ length: 256 }, (_v, i6) => i6.toString(16).padStart(2, "0"));
function concat2(...values) {
  return `0x${values.reduce((acc, x9) => acc + x9.replace("0x", ""), "")}`;
}
function fromBoolean(value, options = {}) {
  const hex = `0x${Number(value)}`;
  if (typeof options.size === "number") {
    assertSize2(hex, options.size);
    return padLeft(hex, options.size);
  }
  return hex;
}
function fromBytes2(value, options = {}) {
  let string2 = "";
  for (let i6 = 0; i6 < value.length; i6++)
    string2 += hexes[value[i6]];
  const hex = `0x${string2}`;
  if (typeof options.size === "number") {
    assertSize2(hex, options.size);
    return padRight(hex, options.size);
  }
  return hex;
}
function fromNumber(value, options = {}) {
  const { signed, size: size4 } = options;
  const value_ = BigInt(value);
  let maxValue;
  if (size4) {
    if (signed)
      maxValue = (1n << BigInt(size4) * 8n - 1n) - 1n;
    else
      maxValue = 2n ** (BigInt(size4) * 8n) - 1n;
  } else if (typeof value === "number") {
    maxValue = BigInt(Number.MAX_SAFE_INTEGER);
  }
  const minValue = typeof maxValue === "bigint" && signed ? -maxValue - 1n : 0;
  if (maxValue && value_ > maxValue || value_ < minValue) {
    const suffix = typeof value === "bigint" ? "n" : "";
    throw new IntegerOutOfRangeError({
      max: maxValue ? `${maxValue}${suffix}` : void 0,
      min: `${minValue}${suffix}`,
      signed,
      size: size4,
      value: `${value}${suffix}`
    });
  }
  const stringValue = (signed && value_ < 0 ? (1n << BigInt(size4 * 8)) + BigInt(value_) : value_).toString(16);
  const hex = `0x${stringValue}`;
  if (size4)
    return padLeft(hex, size4);
  return hex;
}
function fromString2(value, options = {}) {
  return fromBytes2(encoder2.encode(value), options);
}
function padLeft(value, size4) {
  return pad3(value, { dir: "left", size: size4 });
}
function padRight(value, size4) {
  return pad3(value, { dir: "right", size: size4 });
}
function size3(value) {
  return Math.ceil((value.length - 2) / 2);
}
var IntegerOutOfRangeError = class extends BaseError2 {
  constructor({ max, min, signed, size: size4, value }) {
    super(`Number \`${value}\` is not in safe${size4 ? ` ${size4 * 8}-bit` : ""}${signed ? " signed" : " unsigned"} integer range ${max ? `(\`${min}\` to \`${max}\`)` : `(above \`${min}\`)`}`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.IntegerOutOfRangeError"
    });
  }
};
var SizeOverflowError2 = class extends BaseError2 {
  constructor({ givenSize, maxSize }) {
    super(`Size cannot exceed \`${maxSize}\` bytes. Given size: \`${givenSize}\` bytes.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.SizeOverflowError"
    });
  }
};
var SizeExceedsPaddingSizeError2 = class extends BaseError2 {
  constructor({ size: size4, targetSize, type }) {
    super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (\`${size4}\`) exceeds padding size (\`${targetSize}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.SizeExceedsPaddingSizeError"
    });
  }
};

// node_modules/ox/_esm/core/Hash.js
init_sha3();
init_sha256();
function keccak2562(value, options = {}) {
  const { as: as2 = typeof value === "string" ? "Hex" : "Bytes" } = options;
  const bytes = keccak_256(from(value));
  if (as2 === "Bytes")
    return bytes;
  return fromBytes2(bytes);
}

// node_modules/ox/_esm/core/internal/lru.js
var LruMap2 = class extends Map {
  constructor(size4) {
    super();
    Object.defineProperty(this, "maxSize", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.maxSize = size4;
  }
  get(key) {
    const value = super.get(key);
    if (super.has(key) && value !== void 0) {
      this.delete(key);
      super.set(key, value);
    }
    return value;
  }
  set(key, value) {
    super.set(key, value);
    if (this.maxSize && this.size > this.maxSize) {
      const firstKey = this.keys().next().value;
      if (firstKey)
        this.delete(firstKey);
    }
    return this;
  }
};

// node_modules/ox/_esm/core/Caches.js
var caches = {
  checksum: new LruMap2(8192)
};
var checksum = caches.checksum;

// node_modules/ox/_esm/core/Address.js
var addressRegex = /^0x[a-fA-F0-9]{40}$/;
function assert(value, options = {}) {
  const { strict = true } = options;
  if (!addressRegex.test(value))
    throw new InvalidAddressError2({
      address: value,
      cause: new InvalidInputError()
    });
  if (strict) {
    if (value.toLowerCase() === value)
      return;
    if (checksum2(value) !== value)
      throw new InvalidAddressError2({
        address: value,
        cause: new InvalidChecksumError()
      });
  }
}
function checksum2(address) {
  if (checksum.has(address))
    return checksum.get(address);
  assert(address, { strict: false });
  const hexAddress = address.substring(2).toLowerCase();
  const hash = keccak2562(fromString(hexAddress), { as: "Bytes" });
  const characters = hexAddress.split("");
  for (let i6 = 0; i6 < 40; i6 += 2) {
    if (hash[i6 >> 1] >> 4 >= 8 && characters[i6]) {
      characters[i6] = characters[i6].toUpperCase();
    }
    if ((hash[i6 >> 1] & 15) >= 8 && characters[i6 + 1]) {
      characters[i6 + 1] = characters[i6 + 1].toUpperCase();
    }
  }
  const result = `0x${characters.join("")}`;
  checksum.set(address, result);
  return result;
}
var InvalidAddressError2 = class extends BaseError2 {
  constructor({ address, cause }) {
    super(`Address "${address}" is invalid.`, {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Address.InvalidAddressError"
    });
  }
};
var InvalidInputError = class extends BaseError2 {
  constructor() {
    super("Address is not a 20 byte (40 hexadecimal character) value.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Address.InvalidInputError"
    });
  }
};
var InvalidChecksumError = class extends BaseError2 {
  constructor() {
    super("Address does not match its checksum counterpart.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Address.InvalidChecksumError"
    });
  }
};

// node_modules/ox/_esm/core/Solidity.js
var arrayRegex2 = /^(.*)\[([0-9]*)\]$/;
var bytesRegex2 = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
var integerRegex2 = /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
var maxInt8 = 2n ** (8n - 1n) - 1n;
var maxInt16 = 2n ** (16n - 1n) - 1n;
var maxInt24 = 2n ** (24n - 1n) - 1n;
var maxInt32 = 2n ** (32n - 1n) - 1n;
var maxInt40 = 2n ** (40n - 1n) - 1n;
var maxInt48 = 2n ** (48n - 1n) - 1n;
var maxInt56 = 2n ** (56n - 1n) - 1n;
var maxInt64 = 2n ** (64n - 1n) - 1n;
var maxInt72 = 2n ** (72n - 1n) - 1n;
var maxInt80 = 2n ** (80n - 1n) - 1n;
var maxInt88 = 2n ** (88n - 1n) - 1n;
var maxInt96 = 2n ** (96n - 1n) - 1n;
var maxInt104 = 2n ** (104n - 1n) - 1n;
var maxInt112 = 2n ** (112n - 1n) - 1n;
var maxInt120 = 2n ** (120n - 1n) - 1n;
var maxInt128 = 2n ** (128n - 1n) - 1n;
var maxInt136 = 2n ** (136n - 1n) - 1n;
var maxInt144 = 2n ** (144n - 1n) - 1n;
var maxInt152 = 2n ** (152n - 1n) - 1n;
var maxInt160 = 2n ** (160n - 1n) - 1n;
var maxInt168 = 2n ** (168n - 1n) - 1n;
var maxInt176 = 2n ** (176n - 1n) - 1n;
var maxInt184 = 2n ** (184n - 1n) - 1n;
var maxInt192 = 2n ** (192n - 1n) - 1n;
var maxInt200 = 2n ** (200n - 1n) - 1n;
var maxInt208 = 2n ** (208n - 1n) - 1n;
var maxInt216 = 2n ** (216n - 1n) - 1n;
var maxInt224 = 2n ** (224n - 1n) - 1n;
var maxInt232 = 2n ** (232n - 1n) - 1n;
var maxInt240 = 2n ** (240n - 1n) - 1n;
var maxInt248 = 2n ** (248n - 1n) - 1n;
var maxInt256 = 2n ** (256n - 1n) - 1n;
var minInt8 = -(2n ** (8n - 1n));
var minInt16 = -(2n ** (16n - 1n));
var minInt24 = -(2n ** (24n - 1n));
var minInt32 = -(2n ** (32n - 1n));
var minInt40 = -(2n ** (40n - 1n));
var minInt48 = -(2n ** (48n - 1n));
var minInt56 = -(2n ** (56n - 1n));
var minInt64 = -(2n ** (64n - 1n));
var minInt72 = -(2n ** (72n - 1n));
var minInt80 = -(2n ** (80n - 1n));
var minInt88 = -(2n ** (88n - 1n));
var minInt96 = -(2n ** (96n - 1n));
var minInt104 = -(2n ** (104n - 1n));
var minInt112 = -(2n ** (112n - 1n));
var minInt120 = -(2n ** (120n - 1n));
var minInt128 = -(2n ** (128n - 1n));
var minInt136 = -(2n ** (136n - 1n));
var minInt144 = -(2n ** (144n - 1n));
var minInt152 = -(2n ** (152n - 1n));
var minInt160 = -(2n ** (160n - 1n));
var minInt168 = -(2n ** (168n - 1n));
var minInt176 = -(2n ** (176n - 1n));
var minInt184 = -(2n ** (184n - 1n));
var minInt192 = -(2n ** (192n - 1n));
var minInt200 = -(2n ** (200n - 1n));
var minInt208 = -(2n ** (208n - 1n));
var minInt216 = -(2n ** (216n - 1n));
var minInt224 = -(2n ** (224n - 1n));
var minInt232 = -(2n ** (232n - 1n));
var minInt240 = -(2n ** (240n - 1n));
var minInt248 = -(2n ** (248n - 1n));
var minInt256 = -(2n ** (256n - 1n));
var maxUint8 = 2n ** 8n - 1n;
var maxUint16 = 2n ** 16n - 1n;
var maxUint24 = 2n ** 24n - 1n;
var maxUint32 = 2n ** 32n - 1n;
var maxUint40 = 2n ** 40n - 1n;
var maxUint48 = 2n ** 48n - 1n;
var maxUint56 = 2n ** 56n - 1n;
var maxUint64 = 2n ** 64n - 1n;
var maxUint72 = 2n ** 72n - 1n;
var maxUint80 = 2n ** 80n - 1n;
var maxUint88 = 2n ** 88n - 1n;
var maxUint96 = 2n ** 96n - 1n;
var maxUint104 = 2n ** 104n - 1n;
var maxUint112 = 2n ** 112n - 1n;
var maxUint120 = 2n ** 120n - 1n;
var maxUint128 = 2n ** 128n - 1n;
var maxUint136 = 2n ** 136n - 1n;
var maxUint144 = 2n ** 144n - 1n;
var maxUint152 = 2n ** 152n - 1n;
var maxUint160 = 2n ** 160n - 1n;
var maxUint168 = 2n ** 168n - 1n;
var maxUint176 = 2n ** 176n - 1n;
var maxUint184 = 2n ** 184n - 1n;
var maxUint192 = 2n ** 192n - 1n;
var maxUint200 = 2n ** 200n - 1n;
var maxUint208 = 2n ** 208n - 1n;
var maxUint216 = 2n ** 216n - 1n;
var maxUint224 = 2n ** 224n - 1n;
var maxUint232 = 2n ** 232n - 1n;
var maxUint240 = 2n ** 240n - 1n;
var maxUint248 = 2n ** 248n - 1n;
var maxUint2562 = 2n ** 256n - 1n;

// node_modules/ox/_esm/core/internal/cursor.js
var staticCursor = {
  bytes: new Uint8Array(),
  dataView: new DataView(new ArrayBuffer(0)),
  position: 0,
  positionReadCount: /* @__PURE__ */ new Map(),
  recursiveReadCount: 0,
  recursiveReadLimit: Number.POSITIVE_INFINITY,
  assertReadLimit() {
    if (this.recursiveReadCount >= this.recursiveReadLimit)
      throw new RecursiveReadLimitExceededError({
        count: this.recursiveReadCount + 1,
        limit: this.recursiveReadLimit
      });
  },
  assertPosition(position) {
    if (position < 0 || position > this.bytes.length - 1)
      throw new PositionOutOfBoundsError2({
        length: this.bytes.length,
        position
      });
  },
  decrementPosition(offset) {
    if (offset < 0)
      throw new NegativeOffsetError({ offset });
    const position = this.position - offset;
    this.assertPosition(position);
    this.position = position;
  },
  getReadCount(position) {
    return this.positionReadCount.get(position || this.position) || 0;
  },
  incrementPosition(offset) {
    if (offset < 0)
      throw new NegativeOffsetError({ offset });
    const position = this.position + offset;
    this.assertPosition(position);
    this.position = position;
  },
  inspectByte(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position);
    return this.bytes[position];
  },
  inspectBytes(length2, position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + length2 - 1);
    return this.bytes.subarray(position, position + length2);
  },
  inspectUint8(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position);
    return this.bytes[position];
  },
  inspectUint16(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + 1);
    return this.dataView.getUint16(position);
  },
  inspectUint24(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + 2);
    return (this.dataView.getUint16(position) << 8) + this.dataView.getUint8(position + 2);
  },
  inspectUint32(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + 3);
    return this.dataView.getUint32(position);
  },
  pushByte(byte) {
    this.assertPosition(this.position);
    this.bytes[this.position] = byte;
    this.position++;
  },
  pushBytes(bytes) {
    this.assertPosition(this.position + bytes.length - 1);
    this.bytes.set(bytes, this.position);
    this.position += bytes.length;
  },
  pushUint8(value) {
    this.assertPosition(this.position);
    this.bytes[this.position] = value;
    this.position++;
  },
  pushUint16(value) {
    this.assertPosition(this.position + 1);
    this.dataView.setUint16(this.position, value);
    this.position += 2;
  },
  pushUint24(value) {
    this.assertPosition(this.position + 2);
    this.dataView.setUint16(this.position, value >> 8);
    this.dataView.setUint8(this.position + 2, value & ~4294967040);
    this.position += 3;
  },
  pushUint32(value) {
    this.assertPosition(this.position + 3);
    this.dataView.setUint32(this.position, value);
    this.position += 4;
  },
  readByte() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectByte();
    this.position++;
    return value;
  },
  readBytes(length2, size4) {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectBytes(length2);
    this.position += size4 ?? length2;
    return value;
  },
  readUint8() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint8();
    this.position += 1;
    return value;
  },
  readUint16() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint16();
    this.position += 2;
    return value;
  },
  readUint24() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint24();
    this.position += 3;
    return value;
  },
  readUint32() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint32();
    this.position += 4;
    return value;
  },
  get remaining() {
    return this.bytes.length - this.position;
  },
  setPosition(position) {
    const oldPosition = this.position;
    this.assertPosition(position);
    this.position = position;
    return () => this.position = oldPosition;
  },
  _touch() {
    if (this.recursiveReadLimit === Number.POSITIVE_INFINITY)
      return;
    const count = this.getReadCount();
    this.positionReadCount.set(this.position, count + 1);
    if (count > 0)
      this.recursiveReadCount++;
  }
};
var NegativeOffsetError = class extends BaseError2 {
  constructor({ offset }) {
    super(`Offset \`${offset}\` cannot be negative.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Cursor.NegativeOffsetError"
    });
  }
};
var PositionOutOfBoundsError2 = class extends BaseError2 {
  constructor({ length: length2, position }) {
    super(`Position \`${position}\` is out of bounds (\`0 < position < ${length2}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Cursor.PositionOutOfBoundsError"
    });
  }
};
var RecursiveReadLimitExceededError = class extends BaseError2 {
  constructor({ count, limit }) {
    super(`Recursive read limit of \`${limit}\` exceeded (recursive read count: \`${count}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Cursor.RecursiveReadLimitExceededError"
    });
  }
};

// node_modules/ox/_esm/core/AbiParameters.js
function encodePacked2(types, values) {
  if (types.length !== values.length)
    throw new LengthMismatchError({
      expectedLength: types.length,
      givenLength: values.length
    });
  const data = [];
  for (let i6 = 0; i6 < types.length; i6++) {
    const type = types[i6];
    const value = values[i6];
    data.push(encodePacked2.encode(type, value));
  }
  return concat2(...data);
}
(function(encodePacked3) {
  function encode8(type, value, isArray = false) {
    if (type === "address") {
      const address = value;
      assert(address);
      return padLeft(address.toLowerCase(), isArray ? 32 : 0);
    }
    if (type === "string")
      return fromString2(value);
    if (type === "bytes")
      return value;
    if (type === "bool")
      return padLeft(fromBoolean(value), isArray ? 32 : 1);
    const intMatch = type.match(integerRegex2);
    if (intMatch) {
      const [_type, baseType, bits = "256"] = intMatch;
      const size4 = Number.parseInt(bits) / 8;
      return fromNumber(value, {
        size: isArray ? 32 : size4,
        signed: baseType === "int"
      });
    }
    const bytesMatch = type.match(bytesRegex2);
    if (bytesMatch) {
      const [_type, size4] = bytesMatch;
      if (Number.parseInt(size4) !== (value.length - 2) / 2)
        throw new BytesSizeMismatchError2({
          expectedSize: Number.parseInt(size4),
          value
        });
      return padRight(value, isArray ? 32 : 0);
    }
    const arrayMatch = type.match(arrayRegex2);
    if (arrayMatch && Array.isArray(value)) {
      const [_type, childType] = arrayMatch;
      const data = [];
      for (let i6 = 0; i6 < value.length; i6++) {
        data.push(encode8(childType, value[i6], true));
      }
      if (data.length === 0)
        return "0x";
      return concat2(...data);
    }
    throw new InvalidTypeError(type);
  }
  encodePacked3.encode = encode8;
})(encodePacked2 || (encodePacked2 = {}));
var BytesSizeMismatchError2 = class extends BaseError2 {
  constructor({ expectedSize, value }) {
    super(`Size of bytes "${value}" (bytes${size3(value)}) does not match expected size (bytes${expectedSize}).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.BytesSizeMismatchError"
    });
  }
};
var LengthMismatchError = class extends BaseError2 {
  constructor({ expectedLength, givenLength }) {
    super([
      "ABI encoding parameters/values length mismatch.",
      `Expected length (parameters): ${expectedLength}`,
      `Given length (values): ${givenLength}`
    ].join("\n"));
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.LengthMismatchError"
    });
  }
};
var InvalidTypeError = class extends BaseError2 {
  constructor(type) {
    super(`Type \`${type}\` is not a valid ABI Type.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.InvalidTypeError"
    });
  }
};

// node_modules/viem/_esm/utils/signature/serializeSignature.js
init_secp256k1();

// node_modules/viem/_esm/utils/signature/parseCompactSignature.js
init_secp256k1();

// node_modules/viem/_esm/utils/signature/parseSignature.js
init_secp256k1();

// node_modules/viem/_esm/utils/signature/serializeCompactSignature.js
init_secp256k1();

// node_modules/uint8arrays/esm/src/alloc.js
function allocUnsafe(size4 = 0) {
  if (globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null) {
    return globalThis.Buffer.allocUnsafe(size4);
  }
  return new Uint8Array(size4);
}

// node_modules/uint8arrays/esm/src/concat.js
function concat3(arrays, length2) {
  if (!length2) {
    length2 = arrays.reduce((acc, curr) => acc + curr.length, 0);
  }
  const output = allocUnsafe(length2);
  let offset = 0;
  for (const arr of arrays) {
    output.set(arr, offset);
    offset += arr.length;
  }
  return output;
}

// node_modules/multiformats/esm/src/bases/identity.js
var identity_exports = {};
__export(identity_exports, {
  identity: () => identity
});

// node_modules/multiformats/esm/vendor/base-x.js
function base(ALPHABET, name2) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j6 = 0; j6 < BASE_MAP.length; j6++) {
    BASE_MAP[j6] = 255;
  }
  for (var i6 = 0; i6 < ALPHABET.length; i6++) {
    var x9 = ALPHABET.charAt(i6);
    var xc = x9.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x9 + " is ambiguous");
    }
    BASE_MAP[xc] = i6;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode8(source) {
    if (source instanceof Uint8Array) ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length2 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size4 = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size4);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i7 = 0;
      for (var it1 = size4 - 1; (carry !== 0 || i7 < length2) && it1 !== -1; it1--, i7++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i7;
      pbegin++;
    }
    var it22 = size4 - length2;
    while (it22 !== size4 && b58[it22] === 0) {
      it22++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it22 < size4; ++it22) {
      str += ALPHABET.charAt(b58[it22]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length2 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size4 = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size4);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i7 = 0;
      for (var it3 = size4 - 1; (carry !== 0 || i7 < length2) && it3 !== -1; it3--, i7++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i7;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it4 = size4 - length2;
    while (it4 !== size4 && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size4 - it4));
    var j7 = zeroes;
    while (it4 !== size4) {
      vch[j7++] = b256[it4++];
    }
    return vch;
  }
  function decode7(string2) {
    var buffer = decodeUnsafe(string2);
    if (buffer) {
      return buffer;
    }
    throw new Error(`Non-${name2} character`);
  }
  return {
    encode: encode8,
    decodeUnsafe,
    decode: decode7
  };
}
var src = base;
var _brrp__multiformats_scope_baseX = src;
var base_x_default = _brrp__multiformats_scope_baseX;

// node_modules/multiformats/esm/src/bytes.js
var empty = new Uint8Array(0);
var equals = (aa, bb) => {
  if (aa === bb)
    return true;
  if (aa.byteLength !== bb.byteLength) {
    return false;
  }
  for (let ii3 = 0; ii3 < aa.byteLength; ii3++) {
    if (aa[ii3] !== bb[ii3]) {
      return false;
    }
  }
  return true;
};
var coerce = (o6) => {
  if (o6 instanceof Uint8Array && o6.constructor.name === "Uint8Array")
    return o6;
  if (o6 instanceof ArrayBuffer)
    return new Uint8Array(o6);
  if (ArrayBuffer.isView(o6)) {
    return new Uint8Array(o6.buffer, o6.byteOffset, o6.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
};
var fromString3 = (str) => new TextEncoder().encode(str);
var toString2 = (b5) => new TextDecoder().decode(b5);

// node_modules/multiformats/esm/src/bases/base.js
var Encoder = class {
  constructor(name2, prefix, baseEncode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  encode(bytes) {
    if (bytes instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};
var Decoder = class {
  constructor(name2, prefix, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  or(decoder2) {
    return or2(this, decoder2);
  }
};
var ComposedDecoder = class {
  constructor(decoders) {
    this.decoders = decoders;
  }
  or(decoder2) {
    return or2(this, decoder2);
  }
  decode(input) {
    const prefix = input[0];
    const decoder2 = this.decoders[prefix];
    if (decoder2) {
      return decoder2.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
};
var or2 = (left, right) => new ComposedDecoder({
  ...left.decoders || { [left.prefix]: left },
  ...right.decoders || { [right.prefix]: right }
});
var Codec = class {
  constructor(name2, prefix, baseEncode, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder(name2, prefix, baseEncode);
    this.decoder = new Decoder(name2, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
};
var from6 = ({ name: name2, prefix, encode: encode8, decode: decode7 }) => new Codec(name2, prefix, encode8, decode7);
var baseX = ({ prefix, name: name2, alphabet: alphabet2 }) => {
  const { encode: encode8, decode: decode7 } = base_x_default(alphabet2, name2);
  return from6({
    prefix,
    name: name2,
    encode: encode8,
    decode: (text) => coerce(decode7(text))
  });
};
var decode2 = (string2, alphabet2, bitsPerChar, name2) => {
  const codes = {};
  for (let i6 = 0; i6 < alphabet2.length; ++i6) {
    codes[alphabet2[i6]] = i6;
  }
  let end = string2.length;
  while (string2[end - 1] === "=") {
    --end;
  }
  const out = new Uint8Array(end * bitsPerChar / 8 | 0);
  let bits = 0;
  let buffer = 0;
  let written = 0;
  for (let i6 = 0; i6 < end; ++i6) {
    const value = codes[string2[i6]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name2} character`);
    }
    buffer = buffer << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer >> bits;
    }
  }
  if (bits >= bitsPerChar || 255 & buffer << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
var encode4 = (data, alphabet2, bitsPerChar) => {
  const pad4 = alphabet2[alphabet2.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer = 0;
  for (let i6 = 0; i6 < data.length; ++i6) {
    buffer = buffer << 8 | data[i6];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet2[mask & buffer >> bits];
    }
  }
  if (bits) {
    out += alphabet2[mask & buffer << bitsPerChar - bits];
  }
  if (pad4) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
var rfc4648 = ({ name: name2, prefix, bitsPerChar, alphabet: alphabet2 }) => {
  return from6({
    prefix,
    name: name2,
    encode(input) {
      return encode4(input, alphabet2, bitsPerChar);
    },
    decode(input) {
      return decode2(input, alphabet2, bitsPerChar, name2);
    }
  });
};

// node_modules/multiformats/esm/src/bases/identity.js
var identity = from6({
  prefix: "\0",
  name: "identity",
  encode: (buf) => toString2(buf),
  decode: (str) => fromString3(str)
});

// node_modules/multiformats/esm/src/bases/base2.js
var base2_exports = {};
__export(base2_exports, {
  base2: () => base2
});
var base2 = rfc4648({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
});

// node_modules/multiformats/esm/src/bases/base8.js
var base8_exports = {};
__export(base8_exports, {
  base8: () => base8
});
var base8 = rfc4648({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
});

// node_modules/multiformats/esm/src/bases/base10.js
var base10_exports = {};
__export(base10_exports, {
  base10: () => base10
});
var base10 = baseX({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
});

// node_modules/multiformats/esm/src/bases/base16.js
var base16_exports = {};
__export(base16_exports, {
  base16: () => base16,
  base16upper: () => base16upper
});
var base16 = rfc4648({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
});
var base16upper = rfc4648({
  prefix: "F",
  name: "base16upper",
  alphabet: "0123456789ABCDEF",
  bitsPerChar: 4
});

// node_modules/multiformats/esm/src/bases/base32.js
var base32_exports = {};
__export(base32_exports, {
  base32: () => base32,
  base32hex: () => base32hex,
  base32hexpad: () => base32hexpad,
  base32hexpadupper: () => base32hexpadupper,
  base32hexupper: () => base32hexupper,
  base32pad: () => base32pad,
  base32padupper: () => base32padupper,
  base32upper: () => base32upper,
  base32z: () => base32z
});
var base32 = rfc4648({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
var base32upper = rfc4648({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
var base32pad = rfc4648({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
var base32padupper = rfc4648({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
var base32hex = rfc4648({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
var base32hexupper = rfc4648({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
var base32hexpad = rfc4648({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
var base32hexpadupper = rfc4648({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
var base32z = rfc4648({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});

// node_modules/multiformats/esm/src/bases/base36.js
var base36_exports = {};
__export(base36_exports, {
  base36: () => base36,
  base36upper: () => base36upper
});
var base36 = baseX({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
});
var base36upper = baseX({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});

// node_modules/multiformats/esm/src/bases/base58.js
var base58_exports = {};
__export(base58_exports, {
  base58btc: () => base58btc,
  base58flickr: () => base58flickr
});
var base58btc = baseX({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
var base58flickr = baseX({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});

// node_modules/multiformats/esm/src/bases/base64.js
var base64_exports = {};
__export(base64_exports, {
  base64: () => base64,
  base64pad: () => base64pad,
  base64url: () => base64url,
  base64urlpad: () => base64urlpad
});
var base64 = rfc4648({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
var base64pad = rfc4648({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
var base64url = rfc4648({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
var base64urlpad = rfc4648({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});

// node_modules/multiformats/esm/src/bases/base256emoji.js
var base256emoji_exports = {};
__export(base256emoji_exports, {
  base256emoji: () => base256emoji
});
var alphabet = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂");
var alphabetBytesToChars = alphabet.reduce((p6, c8, i6) => {
  p6[i6] = c8;
  return p6;
}, []);
var alphabetCharsToBytes = alphabet.reduce((p6, c8, i6) => {
  p6[c8.codePointAt(0)] = i6;
  return p6;
}, []);
function encode5(data) {
  return data.reduce((p6, c8) => {
    p6 += alphabetBytesToChars[c8];
    return p6;
  }, "");
}
function decode3(str) {
  const byts = [];
  for (const char of str) {
    const byt = alphabetCharsToBytes[char.codePointAt(0)];
    if (byt === void 0) {
      throw new Error(`Non-base256emoji character: ${char}`);
    }
    byts.push(byt);
  }
  return new Uint8Array(byts);
}
var base256emoji = from6({
  prefix: "🚀",
  name: "base256emoji",
  encode: encode5,
  decode: decode3
});

// node_modules/multiformats/esm/src/hashes/sha2-browser.js
var sha2_browser_exports = {};
__export(sha2_browser_exports, {
  sha256: () => sha2563,
  sha512: () => sha512
});

// node_modules/multiformats/esm/vendor/varint.js
var encode_1 = encode6;
var MSB = 128;
var REST = 127;
var MSBALL = ~REST;
var INT = Math.pow(2, 31);
function encode6(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT) {
    out[offset++] = num & 255 | MSB;
    num /= 128;
  }
  while (num & MSBALL) {
    out[offset++] = num & 255 | MSB;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode6.bytes = offset - oldOffset + 1;
  return out;
}
var decode4 = read;
var MSB$1 = 128;
var REST$1 = 127;
function read(buf, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b5, l9 = buf.length;
  do {
    if (counter >= l9) {
      read.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b5 = buf[counter++];
    res += shift < 28 ? (b5 & REST$1) << shift : (b5 & REST$1) * Math.pow(2, shift);
    shift += 7;
  } while (b5 >= MSB$1);
  read.bytes = counter - offset;
  return res;
}
var N1 = Math.pow(2, 7);
var N22 = Math.pow(2, 14);
var N32 = Math.pow(2, 21);
var N42 = Math.pow(2, 28);
var N5 = Math.pow(2, 35);
var N6 = Math.pow(2, 42);
var N7 = Math.pow(2, 49);
var N8 = Math.pow(2, 56);
var N9 = Math.pow(2, 63);
var length = function(value) {
  return value < N1 ? 1 : value < N22 ? 2 : value < N32 ? 3 : value < N42 ? 4 : value < N5 ? 5 : value < N6 ? 6 : value < N7 ? 7 : value < N8 ? 8 : value < N9 ? 9 : 10;
};
var varint = {
  encode: encode_1,
  decode: decode4,
  encodingLength: length
};
var _brrp_varint = varint;
var varint_default = _brrp_varint;

// node_modules/multiformats/esm/src/varint.js
var decode5 = (data, offset = 0) => {
  const code2 = varint_default.decode(data, offset);
  return [
    code2,
    varint_default.decode.bytes
  ];
};
var encodeTo = (int, target, offset = 0) => {
  varint_default.encode(int, target, offset);
  return target;
};
var encodingLength = (int) => {
  return varint_default.encodingLength(int);
};

// node_modules/multiformats/esm/src/hashes/digest.js
var create2 = (code2, digest2) => {
  const size4 = digest2.byteLength;
  const sizeOffset = encodingLength(code2);
  const digestOffset = sizeOffset + encodingLength(size4);
  const bytes = new Uint8Array(digestOffset + size4);
  encodeTo(code2, bytes, 0);
  encodeTo(size4, bytes, sizeOffset);
  bytes.set(digest2, digestOffset);
  return new Digest(code2, size4, digest2, bytes);
};
var decode6 = (multihash) => {
  const bytes = coerce(multihash);
  const [code2, sizeOffset] = decode5(bytes);
  const [size4, digestOffset] = decode5(bytes.subarray(sizeOffset));
  const digest2 = bytes.subarray(sizeOffset + digestOffset);
  if (digest2.byteLength !== size4) {
    throw new Error("Incorrect length");
  }
  return new Digest(code2, size4, digest2, bytes);
};
var equals2 = (a5, b5) => {
  if (a5 === b5) {
    return true;
  } else {
    return a5.code === b5.code && a5.size === b5.size && equals(a5.bytes, b5.bytes);
  }
};
var Digest = class {
  constructor(code2, size4, digest2, bytes) {
    this.code = code2;
    this.size = size4;
    this.digest = digest2;
    this.bytes = bytes;
  }
};

// node_modules/multiformats/esm/src/hashes/hasher.js
var from7 = ({ name: name2, code: code2, encode: encode8 }) => new Hasher(name2, code2, encode8);
var Hasher = class {
  constructor(name2, code2, encode8) {
    this.name = name2;
    this.code = code2;
    this.encode = encode8;
  }
  digest(input) {
    if (input instanceof Uint8Array) {
      const result = this.encode(input);
      return result instanceof Uint8Array ? create2(this.code, result) : result.then((digest2) => create2(this.code, digest2));
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};

// node_modules/multiformats/esm/src/hashes/sha2-browser.js
var sha = (name2) => async (data) => new Uint8Array(await crypto.subtle.digest(name2, data));
var sha2563 = from7({
  name: "sha2-256",
  code: 18,
  encode: sha("SHA-256")
});
var sha512 = from7({
  name: "sha2-512",
  code: 19,
  encode: sha("SHA-512")
});

// node_modules/multiformats/esm/src/hashes/identity.js
var identity_exports2 = {};
__export(identity_exports2, {
  identity: () => identity2
});
var code = 0;
var name = "identity";
var encode7 = coerce;
var digest = (input) => create2(code, encode7(input));
var identity2 = {
  code,
  name,
  encode: encode7,
  digest
};

// node_modules/multiformats/esm/src/codecs/json.js
var textEncoder = new TextEncoder();
var textDecoder = new TextDecoder();

// node_modules/multiformats/esm/src/cid.js
var CID = class _CID {
  constructor(version3, code2, multihash, bytes) {
    this.code = code2;
    this.version = version3;
    this.multihash = multihash;
    this.bytes = bytes;
    this.byteOffset = bytes.byteOffset;
    this.byteLength = bytes.byteLength;
    this.asCID = this;
    this._baseCache = /* @__PURE__ */ new Map();
    Object.defineProperties(this, {
      byteOffset: hidden,
      byteLength: hidden,
      code: readonly,
      version: readonly,
      multihash: readonly,
      bytes: readonly,
      _baseCache: hidden,
      asCID: hidden
    });
  }
  toV0() {
    switch (this.version) {
      case 0: {
        return this;
      }
      default: {
        const { code: code2, multihash } = this;
        if (code2 !== DAG_PB_CODE) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE) {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        return _CID.createV0(multihash);
      }
    }
  }
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: code2, digest: digest2 } = this.multihash;
        const multihash = create2(code2, digest2);
        return _CID.createV1(this.code, multihash);
      }
      case 1: {
        return this;
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
      }
    }
  }
  equals(other) {
    return other && this.code === other.code && this.version === other.version && equals2(this.multihash, other.multihash);
  }
  toString(base3) {
    const { bytes, version: version3, _baseCache } = this;
    switch (version3) {
      case 0:
        return toStringV0(bytes, _baseCache, base3 || base58btc.encoder);
      default:
        return toStringV1(bytes, _baseCache, base3 || base32.encoder);
    }
  }
  toJSON() {
    return {
      code: this.code,
      version: this.version,
      hash: this.multihash.bytes
    };
  }
  get [Symbol.toStringTag]() {
    return "CID";
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return "CID(" + this.toString() + ")";
  }
  static isCID(value) {
    deprecate(/^0\.0/, IS_CID_DEPRECATION);
    return !!(value && (value[cidSymbol] || value.asCID === value));
  }
  get toBaseEncodedString() {
    throw new Error("Deprecated, use .toString()");
  }
  get codec() {
    throw new Error('"codec" property is deprecated, use integer "code" property instead');
  }
  get buffer() {
    throw new Error("Deprecated .buffer property, use .bytes to get Uint8Array instead");
  }
  get multibaseName() {
    throw new Error('"multibaseName" property is deprecated');
  }
  get prefix() {
    throw new Error('"prefix" property is deprecated');
  }
  static asCID(value) {
    if (value instanceof _CID) {
      return value;
    } else if (value != null && value.asCID === value) {
      const { version: version3, code: code2, multihash, bytes } = value;
      return new _CID(version3, code2, multihash, bytes || encodeCID(version3, code2, multihash.bytes));
    } else if (value != null && value[cidSymbol] === true) {
      const { version: version3, multihash, code: code2 } = value;
      const digest2 = decode6(multihash);
      return _CID.create(version3, code2, digest2);
    } else {
      return null;
    }
  }
  static create(version3, code2, digest2) {
    if (typeof code2 !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    switch (version3) {
      case 0: {
        if (code2 !== DAG_PB_CODE) {
          throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`);
        } else {
          return new _CID(version3, code2, digest2, digest2.bytes);
        }
      }
      case 1: {
        const bytes = encodeCID(version3, code2, digest2.bytes);
        return new _CID(version3, code2, digest2, bytes);
      }
      default: {
        throw new Error("Invalid version");
      }
    }
  }
  static createV0(digest2) {
    return _CID.create(0, DAG_PB_CODE, digest2);
  }
  static createV1(code2, digest2) {
    return _CID.create(1, code2, digest2);
  }
  static decode(bytes) {
    const [cid, remainder] = _CID.decodeFirst(bytes);
    if (remainder.length) {
      throw new Error("Incorrect length");
    }
    return cid;
  }
  static decodeFirst(bytes) {
    const specs = _CID.inspectBytes(bytes);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = coerce(bytes.subarray(prefixSize, prefixSize + specs.multihashSize));
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
    const digest2 = new Digest(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
    const cid = specs.version === 0 ? _CID.createV0(digest2) : _CID.createV1(specs.codec, digest2);
    return [
      cid,
      bytes.subarray(specs.size)
    ];
  }
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i6, length2] = decode5(initialBytes.subarray(offset));
      offset += length2;
      return i6;
    };
    let version3 = next();
    let codec = DAG_PB_CODE;
    if (version3 === 18) {
      version3 = 0;
      offset = 0;
    } else if (version3 === 1) {
      codec = next();
    }
    if (version3 !== 0 && version3 !== 1) {
      throw new RangeError(`Invalid CID version ${version3}`);
    }
    const prefixSize = offset;
    const multihashCode = next();
    const digestSize = next();
    const size4 = offset + digestSize;
    const multihashSize = size4 - prefixSize;
    return {
      version: version3,
      codec,
      multihashCode,
      digestSize,
      multihashSize,
      size: size4
    };
  }
  static parse(source, base3) {
    const [prefix, bytes] = parseCIDtoBytes(source, base3);
    const cid = _CID.decode(bytes);
    cid._baseCache.set(prefix, source);
    return cid;
  }
};
var parseCIDtoBytes = (source, base3) => {
  switch (source[0]) {
    case "Q": {
      const decoder2 = base3 || base58btc;
      return [
        base58btc.prefix,
        decoder2.decode(`${base58btc.prefix}${source}`)
      ];
    }
    case base58btc.prefix: {
      const decoder2 = base3 || base58btc;
      return [
        base58btc.prefix,
        decoder2.decode(source)
      ];
    }
    case base32.prefix: {
      const decoder2 = base3 || base32;
      return [
        base32.prefix,
        decoder2.decode(source)
      ];
    }
    default: {
      if (base3 == null) {
        throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
      }
      return [
        source[0],
        base3.decode(source)
      ];
    }
  }
};
var toStringV0 = (bytes, cache, base3) => {
  const { prefix } = base3;
  if (prefix !== base58btc.prefix) {
    throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
  }
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes).slice(1);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
var toStringV1 = (bytes, cache, base3) => {
  const { prefix } = base3;
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
var DAG_PB_CODE = 112;
var SHA_256_CODE = 18;
var encodeCID = (version3, code2, multihash) => {
  const codeOffset = encodingLength(version3);
  const hashOffset = codeOffset + encodingLength(code2);
  const bytes = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo(version3, bytes, 0);
  encodeTo(code2, bytes, codeOffset);
  bytes.set(multihash, hashOffset);
  return bytes;
};
var cidSymbol = Symbol.for("@ipld/js-cid/CID");
var readonly = {
  writable: false,
  configurable: false,
  enumerable: true
};
var hidden = {
  writable: false,
  enumerable: false,
  configurable: false
};
var version2 = "0.0.0-dev";
var deprecate = (range, message) => {
  if (range.test(version2)) {
    console.warn(message);
  } else {
    throw new Error(message);
  }
};
var IS_CID_DEPRECATION = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`;

// node_modules/multiformats/esm/src/basics.js
var bases = {
  ...identity_exports,
  ...base2_exports,
  ...base8_exports,
  ...base10_exports,
  ...base16_exports,
  ...base32_exports,
  ...base36_exports,
  ...base58_exports,
  ...base64_exports,
  ...base256emoji_exports
};
var hashes = {
  ...sha2_browser_exports,
  ...identity_exports2
};

// node_modules/uint8arrays/esm/src/util/bases.js
function createCodec(name2, prefix, encode8, decode7) {
  return {
    name: name2,
    prefix,
    encoder: {
      name: name2,
      prefix,
      encode: encode8
    },
    decoder: { decode: decode7 }
  };
}
var string = createCodec("utf8", "u", (buf) => {
  const decoder2 = new TextDecoder("utf8");
  return "u" + decoder2.decode(buf);
}, (str) => {
  const encoder3 = new TextEncoder();
  return encoder3.encode(str.substring(1));
});
var ascii = createCodec("ascii", "a", (buf) => {
  let string2 = "a";
  for (let i6 = 0; i6 < buf.length; i6++) {
    string2 += String.fromCharCode(buf[i6]);
  }
  return string2;
}, (str) => {
  str = str.substring(1);
  const buf = allocUnsafe(str.length);
  for (let i6 = 0; i6 < str.length; i6++) {
    buf[i6] = str.charCodeAt(i6);
  }
  return buf;
});
var BASES = {
  utf8: string,
  "utf-8": string,
  hex: bases.base16,
  latin1: ascii,
  ascii,
  binary: ascii,
  ...bases
};
var bases_default = BASES;

// node_modules/uint8arrays/esm/src/from-string.js
function fromString4(string2, encoding = "utf8") {
  const base3 = bases_default[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return globalThis.Buffer.from(string2, "utf8");
  }
  return base3.decoder.decode(`${base3.prefix}${string2}`);
}

// node_modules/uint8arrays/esm/src/to-string.js
function toString3(array, encoding = "utf8") {
  const base3 = bases_default[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return globalThis.Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString("utf8");
  }
  return base3.encoder.encode(array).substring(1);
}

// node_modules/@walletconnect/utils/dist/index.es.js
var import_elliptic = __toESM(require_elliptic());

// node_modules/@walletconnect/relay-api/dist/index.es.js
var C4 = { waku: { publish: "waku_publish", batchPublish: "waku_batchPublish", subscribe: "waku_subscribe", batchSubscribe: "waku_batchSubscribe", subscription: "waku_subscription", unsubscribe: "waku_unsubscribe", batchUnsubscribe: "waku_batchUnsubscribe", batchFetchMessages: "waku_batchFetchMessages" }, irn: { publish: "irn_publish", batchPublish: "irn_batchPublish", subscribe: "irn_subscribe", batchSubscribe: "irn_batchSubscribe", subscription: "irn_subscription", unsubscribe: "irn_unsubscribe", batchUnsubscribe: "irn_batchUnsubscribe", batchFetchMessages: "irn_batchFetchMessages" }, iridium: { publish: "iridium_publish", batchPublish: "iridium_batchPublish", subscribe: "iridium_subscribe", batchSubscribe: "iridium_batchSubscribe", subscription: "iridium_subscription", unsubscribe: "iridium_unsubscribe", batchUnsubscribe: "iridium_batchUnsubscribe", batchFetchMessages: "iridium_batchFetchMessages" } };

// node_modules/@walletconnect/utils/dist/index.es.js
var Pe2 = ":";
function Ye2(e4) {
  const [t3, n7] = e4.split(Pe2);
  return { namespace: t3, reference: n7 };
}
function Xe2(e4) {
  const [t3, n7, r5] = e4.split(Pe2);
  return { namespace: t3, reference: n7, address: r5 };
}
function Le2(e4, t3) {
  return e4.includes(":") ? [e4] : t3.chains || [];
}
var Ft2 = "ReactNative";
var H4 = { reactNative: "react-native", node: "node", browser: "browser", unknown: "unknown" };
var Gt2 = "js";
function et() {
  return typeof process < "u" && typeof process.versions < "u" && typeof process.versions.node < "u";
}
function ne() {
  return !(0, import_window_getters.getDocument)() && !!(0, import_window_getters.getNavigator)() && navigator.product === Ft2;
}
function Wr2() {
  return ne() && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u" && (global == null ? void 0 : global.Platform.OS) === "android";
}
function zr2() {
  return ne() && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u" && (global == null ? void 0 : global.Platform.OS) === "ios";
}
function Ae2() {
  return !et() && !!(0, import_window_getters.getNavigator)() && !!(0, import_window_getters.getDocument)();
}
function ue() {
  return ne() ? H4.reactNative : et() ? H4.node : Ae2() ? H4.browser : H4.unknown;
}
function Jr2() {
  var e4;
  try {
    return ne() && typeof global < "u" && typeof (global == null ? void 0 : global.Application) < "u" ? (e4 = global.Application) == null ? void 0 : e4.applicationId : void 0;
  } catch {
    return;
  }
}
function Wt2(e4, t3) {
  const n7 = new URLSearchParams(e4);
  for (const r5 of Object.keys(t3).sort()) if (t3.hasOwnProperty(r5)) {
    const o6 = t3[r5];
    o6 !== void 0 && n7.set(r5, o6);
  }
  return n7.toString();
}
function Yr2() {
  return (0, import_window_metadata.getWindowMetadata)() || { name: "", description: "", url: "", icons: [""] };
}
function zt2() {
  if (ue() === H4.reactNative && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u") {
    const { OS: n7, Version: r5 } = global.Platform;
    return [n7, r5].join("-");
  }
  const e4 = detect2();
  if (e4 === null) return "unknown";
  const t3 = e4.os ? e4.os.replace(" ", "").toLowerCase() : "unknown";
  return e4.type === "browser" ? [t3, e4.name, e4.version].join("-") : [t3, e4.version].join("-");
}
function Jt2() {
  var e4;
  const t3 = ue();
  return t3 === H4.browser ? [t3, ((e4 = (0, import_window_getters.getLocation)()) == null ? void 0 : e4.host) || "unknown"].join(":") : t3;
}
function Yt2(e4, t3, n7) {
  const r5 = zt2(), o6 = Jt2();
  return [[e4, t3].join("-"), [Gt2, n7].join("-"), r5, o6].join("/");
}
function Zr2({ protocol: e4, version: t3, relayUrl: n7, sdkVersion: r5, auth: o6, projectId: s5, useOnCloseEvent: i6, bundleId: c8, packageName: u4 }) {
  const a5 = n7.split("?"), l9 = Yt2(e4, t3, r5), f8 = { auth: o6, ua: l9, projectId: s5, useOnCloseEvent: i6 || void 0, packageName: u4 || void 0, bundleId: c8 || void 0 }, d7 = Wt2(a5[1] || "", f8);
  return a5[0] + "?" + d7;
}
function re(e4, t3) {
  return e4.filter((n7) => t3.includes(n7)).length === e4.length;
}
function no2(e4) {
  return Object.fromEntries(e4.entries());
}
function ro2(e4) {
  return new Map(Object.entries(e4));
}
function co2(e4 = import_time3.FIVE_MINUTES, t3) {
  const n7 = (0, import_time3.toMiliseconds)(e4 || import_time3.FIVE_MINUTES);
  let r5, o6, s5, i6;
  return { resolve: (c8) => {
    s5 && r5 && (clearTimeout(s5), r5(c8), i6 = Promise.resolve(c8));
  }, reject: (c8) => {
    s5 && o6 && (clearTimeout(s5), o6(c8));
  }, done: () => new Promise((c8, u4) => {
    if (i6) return c8(i6);
    s5 = setTimeout(() => {
      const a5 = new Error(t3);
      i6 = Promise.reject(a5), u4(a5);
    }, n7), r5 = c8, o6 = u4;
  }) };
}
function ao2(e4, t3, n7) {
  return new Promise(async (r5, o6) => {
    const s5 = setTimeout(() => o6(new Error(n7)), t3);
    try {
      const i6 = await e4;
      r5(i6);
    } catch (i6) {
      o6(i6);
    }
    clearTimeout(s5);
  });
}
function tt(e4, t3) {
  if (typeof t3 == "string" && t3.startsWith(`${e4}:`)) return t3;
  if (e4.toLowerCase() === "topic") {
    if (typeof t3 != "string") throw new Error('Value must be "string" for expirer target type: topic');
    return `topic:${t3}`;
  } else if (e4.toLowerCase() === "id") {
    if (typeof t3 != "number") throw new Error('Value must be "number" for expirer target type: id');
    return `id:${t3}`;
  }
  throw new Error(`Unknown expirer target type: ${e4}`);
}
function uo2(e4) {
  return tt("topic", e4);
}
function fo2(e4) {
  return tt("id", e4);
}
function lo2(e4) {
  const [t3, n7] = e4.split(":"), r5 = { id: void 0, topic: void 0 };
  if (t3 === "topic" && typeof n7 == "string") r5.topic = n7;
  else if (t3 === "id" && Number.isInteger(Number(n7))) r5.id = Number(n7);
  else throw new Error(`Invalid target, expected id:number or topic:string, got ${t3}:${n7}`);
  return r5;
}
function ho2(e4, t3) {
  return (0, import_time3.fromMiliseconds)((t3 || Date.now()) + (0, import_time3.toMiliseconds)(e4));
}
function po2(e4) {
  return Date.now() >= (0, import_time3.toMiliseconds)(e4);
}
function go2(e4, t3) {
  return `${e4}${t3 ? `:${t3}` : ""}`;
}
function Q3(e4 = [], t3 = []) {
  return [.../* @__PURE__ */ new Set([...e4, ...t3])];
}
async function yo2({ id: e4, topic: t3, wcDeepLink: n7 }) {
  var r5;
  try {
    if (!n7) return;
    const o6 = typeof n7 == "string" ? JSON.parse(n7) : n7, s5 = o6 == null ? void 0 : o6.href;
    if (typeof s5 != "string") return;
    const i6 = en2(s5, e4, t3), c8 = ue();
    if (c8 === H4.browser) {
      if (!((r5 = (0, import_window_getters.getDocument)()) != null && r5.hasFocus())) {
        console.warn("Document does not have focus, skipping deeplink.");
        return;
      }
      tn(i6);
    } else c8 === H4.reactNative && typeof (global == null ? void 0 : global.Linking) < "u" && await global.Linking.openURL(i6);
  } catch (o6) {
    console.error(o6);
  }
}
function en2(e4, t3, n7) {
  const r5 = `requestId=${t3}&sessionTopic=${n7}`;
  e4.endsWith("/") && (e4 = e4.slice(0, -1));
  let o6 = `${e4}`;
  if (e4.startsWith("https://t.me")) {
    const s5 = e4.includes("?") ? "&startapp=" : "?startapp=";
    o6 = `${o6}${s5}${on2(r5, true)}`;
  } else o6 = `${o6}/wc?${r5}`;
  return o6;
}
function tn(e4) {
  let t3 = "_self";
  rn2() ? t3 = "_top" : (nn2() || e4.startsWith("https://") || e4.startsWith("http://")) && (t3 = "_blank"), window.open(e4, t3, "noreferrer noopener");
}
async function mo2(e4, t3) {
  let n7 = "";
  try {
    if (Ae2() && (n7 = localStorage.getItem(t3), n7)) return n7;
    n7 = await e4.getItem(t3);
  } catch (r5) {
    console.error(r5);
  }
  return n7;
}
function bo2(e4, t3) {
  if (!e4.includes(t3)) return null;
  const n7 = e4.split(/([&,?,=])/), r5 = n7.indexOf(t3);
  return n7[r5 + 2];
}
function wo2() {
  return typeof crypto < "u" && crypto != null && crypto.randomUUID ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu, (e4) => {
    const t3 = Math.random() * 16 | 0;
    return (e4 === "x" ? t3 : t3 & 3 | 8).toString(16);
  });
}
function Eo2() {
  return typeof process < "u" && process.env.IS_VITEST === "true";
}
function nn2() {
  return typeof window < "u" && (!!window.TelegramWebviewProxy || !!window.Telegram || !!window.TelegramWebviewProxyProto);
}
function rn2() {
  try {
    return window.self !== window.top;
  } catch {
    return false;
  }
}
function on2(e4, t3 = false) {
  const n7 = Buffer.from(e4).toString("base64");
  return t3 ? n7.replace(/[=]/g, "") : n7;
}
function rt2(e4) {
  return Buffer.from(e4, "base64").toString("utf-8");
}
function vo2(e4) {
  return new Promise((t3) => setTimeout(t3, e4));
}
function Ne2(e4) {
  if (!Number.isSafeInteger(e4) || e4 < 0) throw new Error("positive integer expected, got " + e4);
}
function xo2(e4) {
  return e4 instanceof Uint8Array || ArrayBuffer.isView(e4) && e4.constructor.name === "Uint8Array";
}
function je2(e4, ...t3) {
  if (!xo2(e4)) throw new Error("Uint8Array expected");
  if (t3.length > 0 && !t3.includes(e4.length)) throw new Error("Uint8Array expected of length " + t3 + ", got length=" + e4.length);
}
function ot(e4) {
  if (typeof e4 != "function" || typeof e4.create != "function") throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Ne2(e4.outputLen), Ne2(e4.blockLen);
}
function me2(e4, t3 = true) {
  if (e4.destroyed) throw new Error("Hash instance has been destroyed");
  if (t3 && e4.finished) throw new Error("Hash#digest() has already been called");
}
function sn2(e4, t3) {
  je2(e4);
  const n7 = t3.outputLen;
  if (e4.length < n7) throw new Error("digestInto() expects output buffer of length at least " + n7);
}
var Ce2 = BigInt(2 ** 32 - 1);
var cn = BigInt(32);
function Oo2(e4, t3 = false) {
  return t3 ? { h: Number(e4 & Ce2), l: Number(e4 >> cn & Ce2) } : { h: Number(e4 >> cn & Ce2) | 0, l: Number(e4 & Ce2) | 0 };
}
function Io2(e4, t3 = false) {
  let n7 = new Uint32Array(e4.length), r5 = new Uint32Array(e4.length);
  for (let o6 = 0; o6 < e4.length; o6++) {
    const { h: s5, l: i6 } = Oo2(e4[o6], t3);
    [n7[o6], r5[o6]] = [s5, i6];
  }
  return [n7, r5];
}
var Ao2 = (e4, t3, n7) => e4 << n7 | t3 >>> 32 - n7;
var No2 = (e4, t3, n7) => t3 << n7 | e4 >>> 32 - n7;
var So2 = (e4, t3, n7) => t3 << n7 - 32 | e4 >>> 64 - n7;
var Uo2 = (e4, t3, n7) => e4 << n7 - 32 | t3 >>> 64 - n7;
var be2 = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
function _o2(e4) {
  return new Uint32Array(e4.buffer, e4.byteOffset, Math.floor(e4.byteLength / 4));
}
function st(e4) {
  return new DataView(e4.buffer, e4.byteOffset, e4.byteLength);
}
function J3(e4, t3) {
  return e4 << 32 - t3 | e4 >>> t3;
}
var an = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
function To2(e4) {
  return e4 << 24 & 4278190080 | e4 << 8 & 16711680 | e4 >>> 8 & 65280 | e4 >>> 24 & 255;
}
function un(e4) {
  for (let t3 = 0; t3 < e4.length; t3++) e4[t3] = To2(e4[t3]);
}
function $o2(e4) {
  if (typeof e4 != "string") throw new Error("utf8ToBytes expected string, got " + typeof e4);
  return new Uint8Array(new TextEncoder().encode(e4));
}
function we2(e4) {
  return typeof e4 == "string" && (e4 = $o2(e4)), je2(e4), e4;
}
var it2 = class {
  clone() {
    return this._cloneInto();
  }
};
function fn(e4) {
  const t3 = (r5) => e4().update(we2(r5)).digest(), n7 = e4();
  return t3.outputLen = n7.outputLen, t3.blockLen = n7.blockLen, t3.create = () => e4(), t3;
}
function Se2(e4 = 32) {
  if (be2 && typeof be2.getRandomValues == "function") return be2.getRandomValues(new Uint8Array(e4));
  if (be2 && typeof be2.randomBytes == "function") return be2.randomBytes(e4);
  throw new Error("crypto.getRandomValues must be defined");
}
var ln = [];
var dn = [];
var hn = [];
var Ro2 = BigInt(0);
var Ue2 = BigInt(1);
var Po2 = BigInt(2);
var Lo2 = BigInt(7);
var Bo2 = BigInt(256);
var jo2 = BigInt(113);
for (let e4 = 0, t3 = Ue2, n7 = 1, r5 = 0; e4 < 24; e4++) {
  [n7, r5] = [r5, (2 * n7 + 3 * r5) % 5], ln.push(2 * (5 * r5 + n7)), dn.push((e4 + 1) * (e4 + 2) / 2 % 64);
  let o6 = Ro2;
  for (let s5 = 0; s5 < 7; s5++) t3 = (t3 << Ue2 ^ (t3 >> Lo2) * jo2) % Bo2, t3 & Po2 && (o6 ^= Ue2 << (Ue2 << BigInt(s5)) - Ue2);
  hn.push(o6);
}
var [Co2, ko2] = Io2(hn, true);
var pn = (e4, t3, n7) => n7 > 32 ? So2(e4, t3, n7) : Ao2(e4, t3, n7);
var gn2 = (e4, t3, n7) => n7 > 32 ? Uo2(e4, t3, n7) : No2(e4, t3, n7);
function Do2(e4, t3 = 24) {
  const n7 = new Uint32Array(10);
  for (let r5 = 24 - t3; r5 < 24; r5++) {
    for (let i6 = 0; i6 < 10; i6++) n7[i6] = e4[i6] ^ e4[i6 + 10] ^ e4[i6 + 20] ^ e4[i6 + 30] ^ e4[i6 + 40];
    for (let i6 = 0; i6 < 10; i6 += 2) {
      const c8 = (i6 + 8) % 10, u4 = (i6 + 2) % 10, a5 = n7[u4], l9 = n7[u4 + 1], f8 = pn(a5, l9, 1) ^ n7[c8], d7 = gn2(a5, l9, 1) ^ n7[c8 + 1];
      for (let g5 = 0; g5 < 50; g5 += 10) e4[i6 + g5] ^= f8, e4[i6 + g5 + 1] ^= d7;
    }
    let o6 = e4[2], s5 = e4[3];
    for (let i6 = 0; i6 < 24; i6++) {
      const c8 = dn[i6], u4 = pn(o6, s5, c8), a5 = gn2(o6, s5, c8), l9 = ln[i6];
      o6 = e4[l9], s5 = e4[l9 + 1], e4[l9] = u4, e4[l9 + 1] = a5;
    }
    for (let i6 = 0; i6 < 50; i6 += 10) {
      for (let c8 = 0; c8 < 10; c8++) n7[c8] = e4[i6 + c8];
      for (let c8 = 0; c8 < 10; c8++) e4[i6 + c8] ^= ~n7[(c8 + 2) % 10] & n7[(c8 + 4) % 10];
    }
    e4[0] ^= Co2[r5], e4[1] ^= ko2[r5];
  }
  n7.fill(0);
}
var Bt2 = class _Bt extends it2 {
  constructor(t3, n7, r5, o6 = false, s5 = 24) {
    if (super(), this.blockLen = t3, this.suffix = n7, this.outputLen = r5, this.enableXOF = o6, this.rounds = s5, this.pos = 0, this.posOut = 0, this.finished = false, this.destroyed = false, Ne2(r5), 0 >= this.blockLen || this.blockLen >= 200) throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = _o2(this.state);
  }
  keccak() {
    an || un(this.state32), Do2(this.state32, this.rounds), an || un(this.state32), this.posOut = 0, this.pos = 0;
  }
  update(t3) {
    me2(this);
    const { blockLen: n7, state: r5 } = this;
    t3 = we2(t3);
    const o6 = t3.length;
    for (let s5 = 0; s5 < o6; ) {
      const i6 = Math.min(n7 - this.pos, o6 - s5);
      for (let c8 = 0; c8 < i6; c8++) r5[this.pos++] ^= t3[s5++];
      this.pos === n7 && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished) return;
    this.finished = true;
    const { state: t3, suffix: n7, pos: r5, blockLen: o6 } = this;
    t3[r5] ^= n7, (n7 & 128) !== 0 && r5 === o6 - 1 && this.keccak(), t3[o6 - 1] ^= 128, this.keccak();
  }
  writeInto(t3) {
    me2(this, false), je2(t3), this.finish();
    const n7 = this.state, { blockLen: r5 } = this;
    for (let o6 = 0, s5 = t3.length; o6 < s5; ) {
      this.posOut >= r5 && this.keccak();
      const i6 = Math.min(r5 - this.posOut, s5 - o6);
      t3.set(n7.subarray(this.posOut, this.posOut + i6), o6), this.posOut += i6, o6 += i6;
    }
    return t3;
  }
  xofInto(t3) {
    if (!this.enableXOF) throw new Error("XOF is not possible for this instance");
    return this.writeInto(t3);
  }
  xof(t3) {
    return Ne2(t3), this.xofInto(new Uint8Array(t3));
  }
  digestInto(t3) {
    if (sn2(t3, this), this.finished) throw new Error("digest() was already called");
    return this.writeInto(t3), this.destroy(), t3;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = true, this.state.fill(0);
  }
  _cloneInto(t3) {
    const { blockLen: n7, suffix: r5, outputLen: o6, rounds: s5, enableXOF: i6 } = this;
    return t3 || (t3 = new _Bt(n7, r5, o6, i6, s5)), t3.state32.set(this.state32), t3.pos = this.pos, t3.posOut = this.posOut, t3.finished = this.finished, t3.rounds = s5, t3.suffix = r5, t3.outputLen = o6, t3.enableXOF = i6, t3.destroyed = this.destroyed, t3;
  }
};
var Mo2 = (e4, t3, n7) => fn(() => new Bt2(t3, e4, n7));
var Vo2 = Mo2(1, 136, 256 / 8);
var Ho2 = "https://rpc.walletconnect.org/v1";
function ct2(e4) {
  const t3 = `Ethereum Signed Message:
${e4.length}`, n7 = new TextEncoder().encode(t3 + e4);
  return "0x" + Buffer.from(Vo2(n7)).toString("hex");
}
async function yn2(e4, t3, n7, r5, o6, s5) {
  switch (n7.t) {
    case "eip191":
      return await mn2(e4, t3, n7.s);
    case "eip1271":
      return await bn2(e4, t3, n7.s, r5, o6, s5);
    default:
      throw new Error(`verifySignature failed: Attempted to verify CacaoSignature with unknown type: ${n7.t}`);
  }
}
async function mn2(e4, t3, n7) {
  return (await recoverAddress({ hash: ct2(t3), signature: n7 })).toLowerCase() === e4.toLowerCase();
}
async function bn2(e4, t3, n7, r5, o6, s5) {
  const i6 = Ye2(r5);
  if (!i6.namespace || !i6.reference) throw new Error(`isValidEip1271Signature failed: chainId must be in CAIP-2 format, received: ${r5}`);
  try {
    const c8 = "0x1626ba7e", u4 = "0000000000000000000000000000000000000000000000000000000000000040", a5 = "0000000000000000000000000000000000000000000000000000000000000041", l9 = n7.substring(2), f8 = ct2(t3).substring(2), d7 = c8 + f8 + u4 + a5 + l9, g5 = await fetch(`${s5 || Ho2}/?chainId=${r5}&projectId=${o6}`, { method: "POST", body: JSON.stringify({ id: Ko2(), jsonrpc: "2.0", method: "eth_call", params: [{ to: e4, data: d7 }, "latest"] }) }), { result: y6 } = await g5.json();
    return y6 ? y6.slice(0, c8.length).toLowerCase() === c8.toLowerCase() : false;
  } catch (c8) {
    return console.error("isValidEip1271Signature: ", c8), false;
  }
}
function Ko2() {
  return Date.now() + Math.floor(Math.random() * 1e3);
}
var Fo2 = Object.defineProperty;
var qo2 = Object.defineProperties;
var Go2 = Object.getOwnPropertyDescriptors;
var wn = Object.getOwnPropertySymbols;
var Wo2 = Object.prototype.hasOwnProperty;
var zo2 = Object.prototype.propertyIsEnumerable;
var En2 = (e4, t3, n7) => t3 in e4 ? Fo2(e4, t3, { enumerable: true, configurable: true, writable: true, value: n7 }) : e4[t3] = n7;
var at = (e4, t3) => {
  for (var n7 in t3 || (t3 = {})) Wo2.call(t3, n7) && En2(e4, n7, t3[n7]);
  if (wn) for (var n7 of wn(t3)) zo2.call(t3, n7) && En2(e4, n7, t3[n7]);
  return e4;
};
var vn2 = (e4, t3) => qo2(e4, Go2(t3));
var Jo2 = "did:pkh:";
var ke2 = (e4) => e4 == null ? void 0 : e4.split(":");
var xn2 = (e4) => {
  const t3 = e4 && ke2(e4);
  if (t3) return e4.includes(Jo2) ? t3[3] : t3[1];
};
var On2 = (e4) => {
  const t3 = e4 && ke2(e4);
  if (t3) return t3[2] + ":" + t3[3];
};
var ut2 = (e4) => {
  const t3 = e4 && ke2(e4);
  if (t3) return t3.pop();
};
async function Yo2(e4) {
  const { cacao: t3, projectId: n7 } = e4, { s: r5, p: o6 } = t3, s5 = In2(o6, o6.iss), i6 = ut2(o6.iss);
  return await yn2(i6, s5, r5, On2(o6.iss), n7);
}
var In2 = (e4, t3) => {
  const n7 = `${e4.domain} wants you to sign in with your Ethereum account:`, r5 = ut2(t3);
  if (!e4.aud && !e4.uri) throw new Error("Either `aud` or `uri` is required to construct the message");
  let o6 = e4.statement || void 0;
  const s5 = `URI: ${e4.aud || e4.uri}`, i6 = `Version: ${e4.version}`, c8 = `Chain ID: ${xn2(t3)}`, u4 = `Nonce: ${e4.nonce}`, a5 = `Issued At: ${e4.iat}`, l9 = e4.exp ? `Expiration Time: ${e4.exp}` : void 0, f8 = e4.nbf ? `Not Before: ${e4.nbf}` : void 0, d7 = e4.requestId ? `Request ID: ${e4.requestId}` : void 0, g5 = e4.resources ? `Resources:${e4.resources.map((h7) => `
- ${h7}`).join("")}` : void 0, y6 = Me2(e4.resources);
  if (y6) {
    const h7 = oe(y6);
    o6 = dt2(o6, h7);
  }
  return [n7, r5, "", o6, "", s5, i6, c8, u4, a5, l9, f8, d7, g5].filter((h7) => h7 != null).join(`
`);
};
function Un2(e4) {
  return Buffer.from(JSON.stringify(e4)).toString("base64");
}
function _n2(e4) {
  return JSON.parse(Buffer.from(e4, "base64").toString("utf-8"));
}
function Y2(e4) {
  if (!e4) throw new Error("No recap provided, value is undefined");
  if (!e4.att) throw new Error("No `att` property found");
  const t3 = Object.keys(e4.att);
  if (!(t3 != null && t3.length)) throw new Error("No resources found in `att` property");
  t3.forEach((n7) => {
    const r5 = e4.att[n7];
    if (Array.isArray(r5)) throw new Error(`Resource must be an object: ${n7}`);
    if (typeof r5 != "object") throw new Error(`Resource must be an object: ${n7}`);
    if (!Object.keys(r5).length) throw new Error(`Resource object is empty: ${n7}`);
    Object.keys(r5).forEach((o6) => {
      const s5 = r5[o6];
      if (!Array.isArray(s5)) throw new Error(`Ability limits ${o6} must be an array of objects, found: ${s5}`);
      if (!s5.length) throw new Error(`Value of ${o6} is empty array, must be an array with objects`);
      s5.forEach((i6) => {
        if (typeof i6 != "object") throw new Error(`Ability limits (${o6}) must be an array of objects, found: ${i6}`);
      });
    });
  });
}
function Tn2(e4, t3, n7, r5 = {}) {
  return n7 == null ? void 0 : n7.sort((o6, s5) => o6.localeCompare(s5)), { att: { [e4]: ft2(t3, n7, r5) } };
}
function ft2(e4, t3, n7 = {}) {
  t3 = t3 == null ? void 0 : t3.sort((o6, s5) => o6.localeCompare(s5));
  const r5 = t3.map((o6) => ({ [`${e4}/${o6}`]: [n7] }));
  return Object.assign({}, ...r5);
}
function De2(e4) {
  return Y2(e4), `urn:recap:${Un2(e4).replace(/=/g, "")}`;
}
function oe(e4) {
  const t3 = _n2(e4.replace("urn:recap:", ""));
  return Y2(t3), t3;
}
function ts(e4, t3, n7) {
  const r5 = Tn2(e4, t3, n7);
  return De2(r5);
}
function lt2(e4) {
  return e4 && e4.includes("urn:recap:");
}
function ns(e4, t3) {
  const n7 = oe(e4), r5 = oe(t3), o6 = Rn2(n7, r5);
  return De2(o6);
}
function Rn2(e4, t3) {
  Y2(e4), Y2(t3);
  const n7 = Object.keys(e4.att).concat(Object.keys(t3.att)).sort((o6, s5) => o6.localeCompare(s5)), r5 = { att: {} };
  return n7.forEach((o6) => {
    var s5, i6;
    Object.keys(((s5 = e4.att) == null ? void 0 : s5[o6]) || {}).concat(Object.keys(((i6 = t3.att) == null ? void 0 : i6[o6]) || {})).sort((c8, u4) => c8.localeCompare(u4)).forEach((c8) => {
      var u4, a5;
      r5.att[o6] = vn2(at({}, r5.att[o6]), { [c8]: ((u4 = e4.att[o6]) == null ? void 0 : u4[c8]) || ((a5 = t3.att[o6]) == null ? void 0 : a5[c8]) });
    });
  }), r5;
}
function dt2(e4 = "", t3) {
  Y2(t3);
  const n7 = "I further authorize the stated URI to perform the following actions on my behalf: ";
  if (e4.includes(n7)) return e4;
  const r5 = [];
  let o6 = 0;
  Object.keys(t3.att).forEach((c8) => {
    const u4 = Object.keys(t3.att[c8]).map((f8) => ({ ability: f8.split("/")[0], action: f8.split("/")[1] }));
    u4.sort((f8, d7) => f8.action.localeCompare(d7.action));
    const a5 = {};
    u4.forEach((f8) => {
      a5[f8.ability] || (a5[f8.ability] = []), a5[f8.ability].push(f8.action);
    });
    const l9 = Object.keys(a5).map((f8) => (o6++, `(${o6}) '${f8}': '${a5[f8].join("', '")}' for '${c8}'.`));
    r5.push(l9.join(", ").replace(".,", "."));
  });
  const s5 = r5.join(" "), i6 = `${n7}${s5}`;
  return `${e4 ? e4 + " " : ""}${i6}`;
}
function rs(e4) {
  var t3;
  const n7 = oe(e4);
  Y2(n7);
  const r5 = (t3 = n7.att) == null ? void 0 : t3.eip155;
  return r5 ? Object.keys(r5).map((o6) => o6.split("/")[1]) : [];
}
function os(e4) {
  const t3 = oe(e4);
  Y2(t3);
  const n7 = [];
  return Object.values(t3.att).forEach((r5) => {
    Object.values(r5).forEach((o6) => {
      var s5;
      (s5 = o6 == null ? void 0 : o6[0]) != null && s5.chains && n7.push(o6[0].chains);
    });
  }), [...new Set(n7.flat())];
}
function Me2(e4) {
  if (!e4) return;
  const t3 = e4 == null ? void 0 : e4[e4.length - 1];
  return lt2(t3) ? t3 : void 0;
}
function ht2(e4) {
  if (!Number.isSafeInteger(e4) || e4 < 0) throw new Error("positive integer expected, got " + e4);
}
function Ln2(e4) {
  return e4 instanceof Uint8Array || ArrayBuffer.isView(e4) && e4.constructor.name === "Uint8Array";
}
function F3(e4, ...t3) {
  if (!Ln2(e4)) throw new Error("Uint8Array expected");
  if (t3.length > 0 && !t3.includes(e4.length)) throw new Error("Uint8Array expected of length " + t3 + ", got length=" + e4.length);
}
function Bn2(e4, t3 = true) {
  if (e4.destroyed) throw new Error("Hash instance has been destroyed");
  if (t3 && e4.finished) throw new Error("Hash#digest() has already been called");
}
function ss(e4, t3) {
  F3(e4);
  const n7 = t3.outputLen;
  if (e4.length < n7) throw new Error("digestInto() expects output buffer of length at least " + n7);
}
function jn2(e4) {
  if (typeof e4 != "boolean") throw new Error(`boolean expected, not ${e4}`);
}
var se = (e4) => new Uint32Array(e4.buffer, e4.byteOffset, Math.floor(e4.byteLength / 4));
var is = (e4) => new DataView(e4.buffer, e4.byteOffset, e4.byteLength);
var cs = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!cs) throw new Error("Non little-endian hardware is not supported");
function as(e4) {
  if (typeof e4 != "string") throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(e4));
}
function pt(e4) {
  if (typeof e4 == "string") e4 = as(e4);
  else if (Ln2(e4)) e4 = gt2(e4);
  else throw new Error("Uint8Array expected, got " + typeof e4);
  return e4;
}
function us(e4, t3) {
  if (t3 == null || typeof t3 != "object") throw new Error("options must be defined");
  return Object.assign(e4, t3);
}
function fs(e4, t3) {
  if (e4.length !== t3.length) return false;
  let n7 = 0;
  for (let r5 = 0; r5 < e4.length; r5++) n7 |= e4[r5] ^ t3[r5];
  return n7 === 0;
}
var ls = (e4, t3) => {
  function n7(r5, ...o6) {
    if (F3(r5), e4.nonceLength !== void 0) {
      const l9 = o6[0];
      if (!l9) throw new Error("nonce / iv required");
      e4.varSizeNonce ? F3(l9) : F3(l9, e4.nonceLength);
    }
    const s5 = e4.tagLength;
    s5 && o6[1] !== void 0 && F3(o6[1]);
    const i6 = t3(r5, ...o6), c8 = (l9, f8) => {
      if (f8 !== void 0) {
        if (l9 !== 2) throw new Error("cipher output not supported");
        F3(f8);
      }
    };
    let u4 = false;
    return { encrypt(l9, f8) {
      if (u4) throw new Error("cannot encrypt() twice with same key + nonce");
      return u4 = true, F3(l9), c8(i6.encrypt.length, f8), i6.encrypt(l9, f8);
    }, decrypt(l9, f8) {
      if (F3(l9), s5 && l9.length < s5) throw new Error("invalid ciphertext length: smaller than tagLength=" + s5);
      return c8(i6.decrypt.length, f8), i6.decrypt(l9, f8);
    } };
  }
  return Object.assign(n7, e4), n7;
};
function Cn2(e4, t3, n7 = true) {
  if (t3 === void 0) return new Uint8Array(e4);
  if (t3.length !== e4) throw new Error("invalid output length, expected " + e4 + ", got: " + t3.length);
  if (n7 && !ds(t3)) throw new Error("invalid output, must be aligned");
  return t3;
}
function kn2(e4, t3, n7, r5) {
  if (typeof e4.setBigUint64 == "function") return e4.setBigUint64(t3, n7, r5);
  const o6 = BigInt(32), s5 = BigInt(4294967295), i6 = Number(n7 >> o6 & s5), c8 = Number(n7 & s5), u4 = r5 ? 4 : 0, a5 = r5 ? 0 : 4;
  e4.setUint32(t3 + u4, i6, r5), e4.setUint32(t3 + a5, c8, r5);
}
function ds(e4) {
  return e4.byteOffset % 4 === 0;
}
function gt2(e4) {
  return Uint8Array.from(e4);
}
function Ee2(...e4) {
  for (let t3 = 0; t3 < e4.length; t3++) e4[t3].fill(0);
}
var Dn = (e4) => Uint8Array.from(e4.split("").map((t3) => t3.charCodeAt(0)));
var hs = Dn("expand 16-byte k");
var ps = Dn("expand 32-byte k");
var gs = se(hs);
var ys = se(ps);
function x6(e4, t3) {
  return e4 << t3 | e4 >>> 32 - t3;
}
function yt2(e4) {
  return e4.byteOffset % 4 === 0;
}
var Ve2 = 64;
var ms = 16;
var Mn2 = 2 ** 32 - 1;
var Vn2 = new Uint32Array();
function bs(e4, t3, n7, r5, o6, s5, i6, c8) {
  const u4 = o6.length, a5 = new Uint8Array(Ve2), l9 = se(a5), f8 = yt2(o6) && yt2(s5), d7 = f8 ? se(o6) : Vn2, g5 = f8 ? se(s5) : Vn2;
  for (let y6 = 0; y6 < u4; i6++) {
    if (e4(t3, n7, r5, l9, i6, c8), i6 >= Mn2) throw new Error("arx: counter overflow");
    const h7 = Math.min(Ve2, u4 - y6);
    if (f8 && h7 === Ve2) {
      const m5 = y6 / 4;
      if (y6 % 4 !== 0) throw new Error("arx: invalid block position");
      for (let B4 = 0, b5; B4 < ms; B4++) b5 = m5 + B4, g5[b5] = d7[b5] ^ l9[B4];
      y6 += Ve2;
      continue;
    }
    for (let m5 = 0, B4; m5 < h7; m5++) B4 = y6 + m5, s5[B4] = o6[B4] ^ a5[m5];
    y6 += h7;
  }
}
function ws(e4, t3) {
  const { allowShortKeys: n7, extendNonceFn: r5, counterLength: o6, counterRight: s5, rounds: i6 } = us({ allowShortKeys: false, counterLength: 8, counterRight: false, rounds: 20 }, t3);
  if (typeof e4 != "function") throw new Error("core must be a function");
  return ht2(o6), ht2(i6), jn2(s5), jn2(n7), (c8, u4, a5, l9, f8 = 0) => {
    F3(c8), F3(u4), F3(a5);
    const d7 = a5.length;
    if (l9 === void 0 && (l9 = new Uint8Array(d7)), F3(l9), ht2(f8), f8 < 0 || f8 >= Mn2) throw new Error("arx: counter overflow");
    if (l9.length < d7) throw new Error(`arx: output (${l9.length}) is shorter than data (${d7})`);
    const g5 = [];
    let y6 = c8.length, h7, m5;
    if (y6 === 32) g5.push(h7 = gt2(c8)), m5 = ys;
    else if (y6 === 16 && n7) h7 = new Uint8Array(32), h7.set(c8), h7.set(c8, 16), m5 = gs, g5.push(h7);
    else throw new Error(`arx: invalid 32-byte key, got length=${y6}`);
    yt2(u4) || g5.push(u4 = gt2(u4));
    const B4 = se(h7);
    if (r5) {
      if (u4.length !== 24) throw new Error("arx: extended nonce must be 24 bytes");
      r5(m5, B4, se(u4.subarray(0, 16)), B4), u4 = u4.subarray(16);
    }
    const b5 = 16 - o6;
    if (b5 !== u4.length) throw new Error(`arx: nonce must be ${b5} or 16 bytes`);
    if (b5 !== 12) {
      const I5 = new Uint8Array(12);
      I5.set(u4, s5 ? 0 : 12 - u4.length), u4 = I5, g5.push(u4);
    }
    const _8 = se(u4);
    return bs(e4, m5, B4, _8, a5, l9, f8, i6), Ee2(...g5), l9;
  };
}
var M5 = (e4, t3) => e4[t3++] & 255 | (e4[t3++] & 255) << 8;
var Es = class {
  constructor(t3) {
    this.blockLen = 16, this.outputLen = 16, this.buffer = new Uint8Array(16), this.r = new Uint16Array(10), this.h = new Uint16Array(10), this.pad = new Uint16Array(8), this.pos = 0, this.finished = false, t3 = pt(t3), F3(t3, 32);
    const n7 = M5(t3, 0), r5 = M5(t3, 2), o6 = M5(t3, 4), s5 = M5(t3, 6), i6 = M5(t3, 8), c8 = M5(t3, 10), u4 = M5(t3, 12), a5 = M5(t3, 14);
    this.r[0] = n7 & 8191, this.r[1] = (n7 >>> 13 | r5 << 3) & 8191, this.r[2] = (r5 >>> 10 | o6 << 6) & 7939, this.r[3] = (o6 >>> 7 | s5 << 9) & 8191, this.r[4] = (s5 >>> 4 | i6 << 12) & 255, this.r[5] = i6 >>> 1 & 8190, this.r[6] = (i6 >>> 14 | c8 << 2) & 8191, this.r[7] = (c8 >>> 11 | u4 << 5) & 8065, this.r[8] = (u4 >>> 8 | a5 << 8) & 8191, this.r[9] = a5 >>> 5 & 127;
    for (let l9 = 0; l9 < 8; l9++) this.pad[l9] = M5(t3, 16 + 2 * l9);
  }
  process(t3, n7, r5 = false) {
    const o6 = r5 ? 0 : 2048, { h: s5, r: i6 } = this, c8 = i6[0], u4 = i6[1], a5 = i6[2], l9 = i6[3], f8 = i6[4], d7 = i6[5], g5 = i6[6], y6 = i6[7], h7 = i6[8], m5 = i6[9], B4 = M5(t3, n7 + 0), b5 = M5(t3, n7 + 2), _8 = M5(t3, n7 + 4), I5 = M5(t3, n7 + 6), k7 = M5(t3, n7 + 8), E7 = M5(t3, n7 + 10), L5 = M5(t3, n7 + 12), j6 = M5(t3, n7 + 14);
    let v7 = s5[0] + (B4 & 8191), O5 = s5[1] + ((B4 >>> 13 | b5 << 3) & 8191), w6 = s5[2] + ((b5 >>> 10 | _8 << 6) & 8191), R4 = s5[3] + ((_8 >>> 7 | I5 << 9) & 8191), A6 = s5[4] + ((I5 >>> 4 | k7 << 12) & 8191), T7 = s5[5] + (k7 >>> 1 & 8191), N11 = s5[6] + ((k7 >>> 14 | E7 << 2) & 8191), S5 = s5[7] + ((E7 >>> 11 | L5 << 5) & 8191), U3 = s5[8] + ((L5 >>> 8 | j6 << 8) & 8191), $5 = s5[9] + (j6 >>> 5 | o6), p6 = 0, C6 = p6 + v7 * c8 + O5 * (5 * m5) + w6 * (5 * h7) + R4 * (5 * y6) + A6 * (5 * g5);
    p6 = C6 >>> 13, C6 &= 8191, C6 += T7 * (5 * d7) + N11 * (5 * f8) + S5 * (5 * l9) + U3 * (5 * a5) + $5 * (5 * u4), p6 += C6 >>> 13, C6 &= 8191;
    let D5 = p6 + v7 * u4 + O5 * c8 + w6 * (5 * m5) + R4 * (5 * h7) + A6 * (5 * y6);
    p6 = D5 >>> 13, D5 &= 8191, D5 += T7 * (5 * g5) + N11 * (5 * d7) + S5 * (5 * f8) + U3 * (5 * l9) + $5 * (5 * a5), p6 += D5 >>> 13, D5 &= 8191;
    let P6 = p6 + v7 * a5 + O5 * u4 + w6 * c8 + R4 * (5 * m5) + A6 * (5 * h7);
    p6 = P6 >>> 13, P6 &= 8191, P6 += T7 * (5 * y6) + N11 * (5 * g5) + S5 * (5 * d7) + U3 * (5 * f8) + $5 * (5 * l9), p6 += P6 >>> 13, P6 &= 8191;
    let G4 = p6 + v7 * l9 + O5 * a5 + w6 * u4 + R4 * c8 + A6 * (5 * m5);
    p6 = G4 >>> 13, G4 &= 8191, G4 += T7 * (5 * h7) + N11 * (5 * y6) + S5 * (5 * g5) + U3 * (5 * d7) + $5 * (5 * f8), p6 += G4 >>> 13, G4 &= 8191;
    let X2 = p6 + v7 * f8 + O5 * l9 + w6 * a5 + R4 * u4 + A6 * c8;
    p6 = X2 >>> 13, X2 &= 8191, X2 += T7 * (5 * m5) + N11 * (5 * h7) + S5 * (5 * y6) + U3 * (5 * g5) + $5 * (5 * d7), p6 += X2 >>> 13, X2 &= 8191;
    let Z3 = p6 + v7 * d7 + O5 * f8 + w6 * l9 + R4 * a5 + A6 * u4;
    p6 = Z3 >>> 13, Z3 &= 8191, Z3 += T7 * c8 + N11 * (5 * m5) + S5 * (5 * h7) + U3 * (5 * y6) + $5 * (5 * g5), p6 += Z3 >>> 13, Z3 &= 8191;
    let he3 = p6 + v7 * g5 + O5 * d7 + w6 * f8 + R4 * l9 + A6 * a5;
    p6 = he3 >>> 13, he3 &= 8191, he3 += T7 * u4 + N11 * c8 + S5 * (5 * m5) + U3 * (5 * h7) + $5 * (5 * y6), p6 += he3 >>> 13, he3 &= 8191;
    let pe3 = p6 + v7 * y6 + O5 * g5 + w6 * d7 + R4 * f8 + A6 * l9;
    p6 = pe3 >>> 13, pe3 &= 8191, pe3 += T7 * a5 + N11 * u4 + S5 * c8 + U3 * (5 * m5) + $5 * (5 * h7), p6 += pe3 >>> 13, pe3 &= 8191;
    let ge2 = p6 + v7 * h7 + O5 * y6 + w6 * g5 + R4 * d7 + A6 * f8;
    p6 = ge2 >>> 13, ge2 &= 8191, ge2 += T7 * l9 + N11 * a5 + S5 * u4 + U3 * c8 + $5 * (5 * m5), p6 += ge2 >>> 13, ge2 &= 8191;
    let ye3 = p6 + v7 * m5 + O5 * h7 + w6 * y6 + R4 * g5 + A6 * d7;
    p6 = ye3 >>> 13, ye3 &= 8191, ye3 += T7 * f8 + N11 * l9 + S5 * a5 + U3 * u4 + $5 * c8, p6 += ye3 >>> 13, ye3 &= 8191, p6 = (p6 << 2) + p6 | 0, p6 = p6 + C6 | 0, C6 = p6 & 8191, p6 = p6 >>> 13, D5 += p6, s5[0] = C6, s5[1] = D5, s5[2] = P6, s5[3] = G4, s5[4] = X2, s5[5] = Z3, s5[6] = he3, s5[7] = pe3, s5[8] = ge2, s5[9] = ye3;
  }
  finalize() {
    const { h: t3, pad: n7 } = this, r5 = new Uint16Array(10);
    let o6 = t3[1] >>> 13;
    t3[1] &= 8191;
    for (let c8 = 2; c8 < 10; c8++) t3[c8] += o6, o6 = t3[c8] >>> 13, t3[c8] &= 8191;
    t3[0] += o6 * 5, o6 = t3[0] >>> 13, t3[0] &= 8191, t3[1] += o6, o6 = t3[1] >>> 13, t3[1] &= 8191, t3[2] += o6, r5[0] = t3[0] + 5, o6 = r5[0] >>> 13, r5[0] &= 8191;
    for (let c8 = 1; c8 < 10; c8++) r5[c8] = t3[c8] + o6, o6 = r5[c8] >>> 13, r5[c8] &= 8191;
    r5[9] -= 8192;
    let s5 = (o6 ^ 1) - 1;
    for (let c8 = 0; c8 < 10; c8++) r5[c8] &= s5;
    s5 = ~s5;
    for (let c8 = 0; c8 < 10; c8++) t3[c8] = t3[c8] & s5 | r5[c8];
    t3[0] = (t3[0] | t3[1] << 13) & 65535, t3[1] = (t3[1] >>> 3 | t3[2] << 10) & 65535, t3[2] = (t3[2] >>> 6 | t3[3] << 7) & 65535, t3[3] = (t3[3] >>> 9 | t3[4] << 4) & 65535, t3[4] = (t3[4] >>> 12 | t3[5] << 1 | t3[6] << 14) & 65535, t3[5] = (t3[6] >>> 2 | t3[7] << 11) & 65535, t3[6] = (t3[7] >>> 5 | t3[8] << 8) & 65535, t3[7] = (t3[8] >>> 8 | t3[9] << 5) & 65535;
    let i6 = t3[0] + n7[0];
    t3[0] = i6 & 65535;
    for (let c8 = 1; c8 < 8; c8++) i6 = (t3[c8] + n7[c8] | 0) + (i6 >>> 16) | 0, t3[c8] = i6 & 65535;
    Ee2(r5);
  }
  update(t3) {
    Bn2(this);
    const { buffer: n7, blockLen: r5 } = this;
    t3 = pt(t3);
    const o6 = t3.length;
    for (let s5 = 0; s5 < o6; ) {
      const i6 = Math.min(r5 - this.pos, o6 - s5);
      if (i6 === r5) {
        for (; r5 <= o6 - s5; s5 += r5) this.process(t3, s5);
        continue;
      }
      n7.set(t3.subarray(s5, s5 + i6), this.pos), this.pos += i6, s5 += i6, this.pos === r5 && (this.process(n7, 0, false), this.pos = 0);
    }
    return this;
  }
  destroy() {
    Ee2(this.h, this.r, this.buffer, this.pad);
  }
  digestInto(t3) {
    Bn2(this), ss(t3, this), this.finished = true;
    const { buffer: n7, h: r5 } = this;
    let { pos: o6 } = this;
    if (o6) {
      for (n7[o6++] = 1; o6 < 16; o6++) n7[o6] = 0;
      this.process(n7, 0, true);
    }
    this.finalize();
    let s5 = 0;
    for (let i6 = 0; i6 < 8; i6++) t3[s5++] = r5[i6] >>> 0, t3[s5++] = r5[i6] >>> 8;
    return t3;
  }
  digest() {
    const { buffer: t3, outputLen: n7 } = this;
    this.digestInto(t3);
    const r5 = t3.slice(0, n7);
    return this.destroy(), r5;
  }
};
function vs(e4) {
  const t3 = (r5, o6) => e4(o6).update(pt(r5)).digest(), n7 = e4(new Uint8Array(32));
  return t3.outputLen = n7.outputLen, t3.blockLen = n7.blockLen, t3.create = (r5) => e4(r5), t3;
}
var xs = vs((e4) => new Es(e4));
function Os(e4, t3, n7, r5, o6, s5 = 20) {
  let i6 = e4[0], c8 = e4[1], u4 = e4[2], a5 = e4[3], l9 = t3[0], f8 = t3[1], d7 = t3[2], g5 = t3[3], y6 = t3[4], h7 = t3[5], m5 = t3[6], B4 = t3[7], b5 = o6, _8 = n7[0], I5 = n7[1], k7 = n7[2], E7 = i6, L5 = c8, j6 = u4, v7 = a5, O5 = l9, w6 = f8, R4 = d7, A6 = g5, T7 = y6, N11 = h7, S5 = m5, U3 = B4, $5 = b5, p6 = _8, C6 = I5, D5 = k7;
  for (let G4 = 0; G4 < s5; G4 += 2) E7 = E7 + O5 | 0, $5 = x6($5 ^ E7, 16), T7 = T7 + $5 | 0, O5 = x6(O5 ^ T7, 12), E7 = E7 + O5 | 0, $5 = x6($5 ^ E7, 8), T7 = T7 + $5 | 0, O5 = x6(O5 ^ T7, 7), L5 = L5 + w6 | 0, p6 = x6(p6 ^ L5, 16), N11 = N11 + p6 | 0, w6 = x6(w6 ^ N11, 12), L5 = L5 + w6 | 0, p6 = x6(p6 ^ L5, 8), N11 = N11 + p6 | 0, w6 = x6(w6 ^ N11, 7), j6 = j6 + R4 | 0, C6 = x6(C6 ^ j6, 16), S5 = S5 + C6 | 0, R4 = x6(R4 ^ S5, 12), j6 = j6 + R4 | 0, C6 = x6(C6 ^ j6, 8), S5 = S5 + C6 | 0, R4 = x6(R4 ^ S5, 7), v7 = v7 + A6 | 0, D5 = x6(D5 ^ v7, 16), U3 = U3 + D5 | 0, A6 = x6(A6 ^ U3, 12), v7 = v7 + A6 | 0, D5 = x6(D5 ^ v7, 8), U3 = U3 + D5 | 0, A6 = x6(A6 ^ U3, 7), E7 = E7 + w6 | 0, D5 = x6(D5 ^ E7, 16), S5 = S5 + D5 | 0, w6 = x6(w6 ^ S5, 12), E7 = E7 + w6 | 0, D5 = x6(D5 ^ E7, 8), S5 = S5 + D5 | 0, w6 = x6(w6 ^ S5, 7), L5 = L5 + R4 | 0, $5 = x6($5 ^ L5, 16), U3 = U3 + $5 | 0, R4 = x6(R4 ^ U3, 12), L5 = L5 + R4 | 0, $5 = x6($5 ^ L5, 8), U3 = U3 + $5 | 0, R4 = x6(R4 ^ U3, 7), j6 = j6 + A6 | 0, p6 = x6(p6 ^ j6, 16), T7 = T7 + p6 | 0, A6 = x6(A6 ^ T7, 12), j6 = j6 + A6 | 0, p6 = x6(p6 ^ j6, 8), T7 = T7 + p6 | 0, A6 = x6(A6 ^ T7, 7), v7 = v7 + O5 | 0, C6 = x6(C6 ^ v7, 16), N11 = N11 + C6 | 0, O5 = x6(O5 ^ N11, 12), v7 = v7 + O5 | 0, C6 = x6(C6 ^ v7, 8), N11 = N11 + C6 | 0, O5 = x6(O5 ^ N11, 7);
  let P6 = 0;
  r5[P6++] = i6 + E7 | 0, r5[P6++] = c8 + L5 | 0, r5[P6++] = u4 + j6 | 0, r5[P6++] = a5 + v7 | 0, r5[P6++] = l9 + O5 | 0, r5[P6++] = f8 + w6 | 0, r5[P6++] = d7 + R4 | 0, r5[P6++] = g5 + A6 | 0, r5[P6++] = y6 + T7 | 0, r5[P6++] = h7 + N11 | 0, r5[P6++] = m5 + S5 | 0, r5[P6++] = B4 + U3 | 0, r5[P6++] = b5 + $5 | 0, r5[P6++] = _8 + p6 | 0, r5[P6++] = I5 + C6 | 0, r5[P6++] = k7 + D5 | 0;
}
var Is = ws(Os, { counterRight: false, counterLength: 4, allowShortKeys: false });
var As = new Uint8Array(16);
var Hn2 = (e4, t3) => {
  e4.update(t3);
  const n7 = t3.length % 16;
  n7 && e4.update(As.subarray(n7));
};
var Ns = new Uint8Array(32);
function Kn2(e4, t3, n7, r5, o6) {
  const s5 = e4(t3, n7, Ns), i6 = xs.create(s5);
  o6 && Hn2(i6, o6), Hn2(i6, r5);
  const c8 = new Uint8Array(16), u4 = is(c8);
  kn2(u4, 0, BigInt(o6 ? o6.length : 0), true), kn2(u4, 8, BigInt(r5.length), true), i6.update(c8);
  const a5 = i6.digest();
  return Ee2(s5, c8), a5;
}
var Ss = (e4) => (t3, n7, r5) => ({ encrypt(s5, i6) {
  const c8 = s5.length;
  i6 = Cn2(c8 + 16, i6, false), i6.set(s5);
  const u4 = i6.subarray(0, -16);
  e4(t3, n7, u4, u4, 1);
  const a5 = Kn2(e4, t3, n7, u4, r5);
  return i6.set(a5, c8), Ee2(a5), i6;
}, decrypt(s5, i6) {
  i6 = Cn2(s5.length - 16, i6, false);
  const c8 = s5.subarray(0, -16), u4 = s5.subarray(-16), a5 = Kn2(e4, t3, n7, c8, r5);
  if (!fs(u4, a5)) throw new Error("invalid tag");
  return i6.set(s5.subarray(0, -16)), e4(t3, n7, i6, i6, 1), Ee2(a5), i6;
} });
var Fn2 = ls({ blockSize: 64, nonceLength: 12, tagLength: 16 }, Ss(Is));
var qn2 = class extends it2 {
  constructor(t3, n7) {
    super(), this.finished = false, this.destroyed = false, ot(t3);
    const r5 = we2(n7);
    if (this.iHash = t3.create(), typeof this.iHash.update != "function") throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const o6 = this.blockLen, s5 = new Uint8Array(o6);
    s5.set(r5.length > o6 ? t3.create().update(r5).digest() : r5);
    for (let i6 = 0; i6 < s5.length; i6++) s5[i6] ^= 54;
    this.iHash.update(s5), this.oHash = t3.create();
    for (let i6 = 0; i6 < s5.length; i6++) s5[i6] ^= 106;
    this.oHash.update(s5), s5.fill(0);
  }
  update(t3) {
    return me2(this), this.iHash.update(t3), this;
  }
  digestInto(t3) {
    me2(this), je2(t3, this.outputLen), this.finished = true, this.iHash.digestInto(t3), this.oHash.update(t3), this.oHash.digestInto(t3), this.destroy();
  }
  digest() {
    const t3 = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(t3), t3;
  }
  _cloneInto(t3) {
    t3 || (t3 = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: n7, iHash: r5, finished: o6, destroyed: s5, blockLen: i6, outputLen: c8 } = this;
    return t3 = t3, t3.finished = o6, t3.destroyed = s5, t3.blockLen = i6, t3.outputLen = c8, t3.oHash = n7._cloneInto(t3.oHash), t3.iHash = r5._cloneInto(t3.iHash), t3;
  }
  destroy() {
    this.destroyed = true, this.oHash.destroy(), this.iHash.destroy();
  }
};
var mt = (e4, t3, n7) => new qn2(e4, t3).update(n7).digest();
mt.create = (e4, t3) => new qn2(e4, t3);
function Us(e4, t3, n7) {
  return ot(e4), n7 === void 0 && (n7 = new Uint8Array(e4.outputLen)), mt(e4, we2(n7), we2(t3));
}
var bt2 = new Uint8Array([0]);
var Gn2 = new Uint8Array();
function _s(e4, t3, n7, r5 = 32) {
  if (ot(e4), Ne2(r5), r5 > 255 * e4.outputLen) throw new Error("Length should be <= 255*HashLen");
  const o6 = Math.ceil(r5 / e4.outputLen);
  n7 === void 0 && (n7 = Gn2);
  const s5 = new Uint8Array(o6 * e4.outputLen), i6 = mt.create(e4, t3), c8 = i6._cloneInto(), u4 = new Uint8Array(i6.outputLen);
  for (let a5 = 0; a5 < o6; a5++) bt2[0] = a5 + 1, c8.update(a5 === 0 ? Gn2 : u4).update(n7).update(bt2).digestInto(u4), s5.set(u4, e4.outputLen * a5), i6._cloneInto(c8);
  return i6.destroy(), c8.destroy(), u4.fill(0), bt2.fill(0), s5.slice(0, r5);
}
var Ts = (e4, t3, n7, r5, o6) => _s(e4, Us(e4, t3, n7), r5, o6);
function $s(e4, t3, n7, r5) {
  if (typeof e4.setBigUint64 == "function") return e4.setBigUint64(t3, n7, r5);
  const o6 = BigInt(32), s5 = BigInt(4294967295), i6 = Number(n7 >> o6 & s5), c8 = Number(n7 & s5), u4 = r5 ? 4 : 0, a5 = r5 ? 0 : 4;
  e4.setUint32(t3 + u4, i6, r5), e4.setUint32(t3 + a5, c8, r5);
}
function Rs(e4, t3, n7) {
  return e4 & t3 ^ ~e4 & n7;
}
function Ps(e4, t3, n7) {
  return e4 & t3 ^ e4 & n7 ^ t3 & n7;
}
var Ls = class extends it2 {
  constructor(t3, n7, r5, o6) {
    super(), this.blockLen = t3, this.outputLen = n7, this.padOffset = r5, this.isLE = o6, this.finished = false, this.length = 0, this.pos = 0, this.destroyed = false, this.buffer = new Uint8Array(t3), this.view = st(this.buffer);
  }
  update(t3) {
    me2(this);
    const { view: n7, buffer: r5, blockLen: o6 } = this;
    t3 = we2(t3);
    const s5 = t3.length;
    for (let i6 = 0; i6 < s5; ) {
      const c8 = Math.min(o6 - this.pos, s5 - i6);
      if (c8 === o6) {
        const u4 = st(t3);
        for (; o6 <= s5 - i6; i6 += o6) this.process(u4, i6);
        continue;
      }
      r5.set(t3.subarray(i6, i6 + c8), this.pos), this.pos += c8, i6 += c8, this.pos === o6 && (this.process(n7, 0), this.pos = 0);
    }
    return this.length += t3.length, this.roundClean(), this;
  }
  digestInto(t3) {
    me2(this), sn2(t3, this), this.finished = true;
    const { buffer: n7, view: r5, blockLen: o6, isLE: s5 } = this;
    let { pos: i6 } = this;
    n7[i6++] = 128, this.buffer.subarray(i6).fill(0), this.padOffset > o6 - i6 && (this.process(r5, 0), i6 = 0);
    for (let f8 = i6; f8 < o6; f8++) n7[f8] = 0;
    $s(r5, o6 - 8, BigInt(this.length * 8), s5), this.process(r5, 0);
    const c8 = st(t3), u4 = this.outputLen;
    if (u4 % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
    const a5 = u4 / 4, l9 = this.get();
    if (a5 > l9.length) throw new Error("_sha2: outputLen bigger than state");
    for (let f8 = 0; f8 < a5; f8++) c8.setUint32(4 * f8, l9[f8], s5);
  }
  digest() {
    const { buffer: t3, outputLen: n7 } = this;
    this.digestInto(t3);
    const r5 = t3.slice(0, n7);
    return this.destroy(), r5;
  }
  _cloneInto(t3) {
    t3 || (t3 = new this.constructor()), t3.set(...this.get());
    const { blockLen: n7, buffer: r5, length: o6, finished: s5, destroyed: i6, pos: c8 } = this;
    return t3.length = o6, t3.pos = c8, t3.finished = s5, t3.destroyed = i6, o6 % n7 && t3.buffer.set(r5), t3;
  }
};
var Bs = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]);
var ie = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]);
var ce = new Uint32Array(64);
var js = class extends Ls {
  constructor() {
    super(64, 32, 8, false), this.A = ie[0] | 0, this.B = ie[1] | 0, this.C = ie[2] | 0, this.D = ie[3] | 0, this.E = ie[4] | 0, this.F = ie[5] | 0, this.G = ie[6] | 0, this.H = ie[7] | 0;
  }
  get() {
    const { A: t3, B: n7, C: r5, D: o6, E: s5, F: i6, G: c8, H: u4 } = this;
    return [t3, n7, r5, o6, s5, i6, c8, u4];
  }
  set(t3, n7, r5, o6, s5, i6, c8, u4) {
    this.A = t3 | 0, this.B = n7 | 0, this.C = r5 | 0, this.D = o6 | 0, this.E = s5 | 0, this.F = i6 | 0, this.G = c8 | 0, this.H = u4 | 0;
  }
  process(t3, n7) {
    for (let f8 = 0; f8 < 16; f8++, n7 += 4) ce[f8] = t3.getUint32(n7, false);
    for (let f8 = 16; f8 < 64; f8++) {
      const d7 = ce[f8 - 15], g5 = ce[f8 - 2], y6 = J3(d7, 7) ^ J3(d7, 18) ^ d7 >>> 3, h7 = J3(g5, 17) ^ J3(g5, 19) ^ g5 >>> 10;
      ce[f8] = h7 + ce[f8 - 7] + y6 + ce[f8 - 16] | 0;
    }
    let { A: r5, B: o6, C: s5, D: i6, E: c8, F: u4, G: a5, H: l9 } = this;
    for (let f8 = 0; f8 < 64; f8++) {
      const d7 = J3(c8, 6) ^ J3(c8, 11) ^ J3(c8, 25), g5 = l9 + d7 + Rs(c8, u4, a5) + Bs[f8] + ce[f8] | 0, h7 = (J3(r5, 2) ^ J3(r5, 13) ^ J3(r5, 22)) + Ps(r5, o6, s5) | 0;
      l9 = a5, a5 = u4, u4 = c8, c8 = i6 + g5 | 0, i6 = s5, s5 = o6, o6 = r5, r5 = g5 + h7 | 0;
    }
    r5 = r5 + this.A | 0, o6 = o6 + this.B | 0, s5 = s5 + this.C | 0, i6 = i6 + this.D | 0, c8 = c8 + this.E | 0, u4 = u4 + this.F | 0, a5 = a5 + this.G | 0, l9 = l9 + this.H | 0, this.set(r5, o6, s5, i6, c8, u4, a5, l9);
  }
  roundClean() {
    ce.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
var He2 = fn(() => new js());
var Wn2 = BigInt(0);
function wt2(e4) {
  return e4 instanceof Uint8Array || ArrayBuffer.isView(e4) && e4.constructor.name === "Uint8Array";
}
function zn2(e4) {
  if (!wt2(e4)) throw new Error("Uint8Array expected");
}
var Cs = Array.from({ length: 256 }, (e4, t3) => t3.toString(16).padStart(2, "0"));
function ks(e4) {
  zn2(e4);
  let t3 = "";
  for (let n7 = 0; n7 < e4.length; n7++) t3 += Cs[e4[n7]];
  return t3;
}
function Ds(e4) {
  if (typeof e4 != "string") throw new Error("hex string expected, got " + typeof e4);
  return e4 === "" ? Wn2 : BigInt("0x" + e4);
}
var ee = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function Jn2(e4) {
  if (e4 >= ee._0 && e4 <= ee._9) return e4 - ee._0;
  if (e4 >= ee.A && e4 <= ee.F) return e4 - (ee.A - 10);
  if (e4 >= ee.a && e4 <= ee.f) return e4 - (ee.a - 10);
}
function Yn2(e4) {
  if (typeof e4 != "string") throw new Error("hex string expected, got " + typeof e4);
  const t3 = e4.length, n7 = t3 / 2;
  if (t3 % 2) throw new Error("hex string expected, got unpadded hex of length " + t3);
  const r5 = new Uint8Array(n7);
  for (let o6 = 0, s5 = 0; o6 < n7; o6++, s5 += 2) {
    const i6 = Jn2(e4.charCodeAt(s5)), c8 = Jn2(e4.charCodeAt(s5 + 1));
    if (i6 === void 0 || c8 === void 0) {
      const u4 = e4[s5] + e4[s5 + 1];
      throw new Error('hex string expected, got non-hex character "' + u4 + '" at index ' + s5);
    }
    r5[o6] = i6 * 16 + c8;
  }
  return r5;
}
function Xn2(e4) {
  return zn2(e4), Ds(ks(Uint8Array.from(e4).reverse()));
}
function Ms(e4, t3) {
  return Yn2(e4.toString(16).padStart(t3 * 2, "0"));
}
function Vs(e4, t3) {
  return Ms(e4, t3).reverse();
}
function Zn2(e4, t3, n7) {
  let r5;
  if (typeof t3 == "string") try {
    r5 = Yn2(t3);
  } catch (s5) {
    throw new Error(e4 + " must be hex string or Uint8Array, cause: " + s5);
  }
  else if (wt2(t3)) r5 = Uint8Array.from(t3);
  else throw new Error(e4 + " must be hex string or Uint8Array");
  const o6 = r5.length;
  if (typeof n7 == "number" && o6 !== n7) throw new Error(e4 + " of length " + n7 + " expected, got " + o6);
  return r5;
}
var Et2 = (e4) => typeof e4 == "bigint" && Wn2 <= e4;
function Hs(e4, t3, n7) {
  return Et2(e4) && Et2(t3) && Et2(n7) && t3 <= e4 && e4 < n7;
}
function Qn2(e4, t3, n7, r5) {
  if (!Hs(t3, n7, r5)) throw new Error("expected valid " + e4 + ": " + n7 + " <= n < " + r5 + ", got " + t3);
}
var Ks = { bigint: (e4) => typeof e4 == "bigint", function: (e4) => typeof e4 == "function", boolean: (e4) => typeof e4 == "boolean", string: (e4) => typeof e4 == "string", stringOrUint8Array: (e4) => typeof e4 == "string" || wt2(e4), isSafeInteger: (e4) => Number.isSafeInteger(e4), array: (e4) => Array.isArray(e4), field: (e4, t3) => t3.Fp.isValid(e4), hash: (e4) => typeof e4 == "function" && Number.isSafeInteger(e4.outputLen) };
function Fs(e4, t3, n7 = {}) {
  const r5 = (o6, s5, i6) => {
    const c8 = Ks[s5];
    if (typeof c8 != "function") throw new Error("invalid validator function");
    const u4 = e4[o6];
    if (!(i6 && u4 === void 0) && !c8(u4, e4)) throw new Error("param " + String(o6) + " is invalid. Expected " + s5 + ", got " + u4);
  };
  for (const [o6, s5] of Object.entries(t3)) r5(o6, s5, false);
  for (const [o6, s5] of Object.entries(n7)) r5(o6, s5, true);
  return e4;
}
var ve2 = BigInt(0);
var Ke2 = BigInt(1);
function er2(e4, t3) {
  const n7 = e4 % t3;
  return n7 >= ve2 ? n7 : t3 + n7;
}
function qs(e4, t3, n7) {
  if (t3 < ve2) throw new Error("invalid exponent, negatives unsupported");
  if (n7 <= ve2) throw new Error("invalid modulus");
  if (n7 === Ke2) return ve2;
  let r5 = Ke2;
  for (; t3 > ve2; ) t3 & Ke2 && (r5 = r5 * e4 % n7), e4 = e4 * e4 % n7, t3 >>= Ke2;
  return r5;
}
function z5(e4, t3, n7) {
  let r5 = e4;
  for (; t3-- > ve2; ) r5 *= r5, r5 %= n7;
  return r5;
}
BigInt(0), BigInt(1), BigInt(0), BigInt(1), BigInt(2), BigInt(8);
var xe2 = BigInt(0);
var vt2 = BigInt(1);
function Gs(e4) {
  return Fs(e4, { a: "bigint" }, { montgomeryBits: "isSafeInteger", nByteLength: "isSafeInteger", adjustScalarBytes: "function", domain: "function", powPminus2: "function", Gu: "bigint" }), Object.freeze({ ...e4 });
}
function Ws(e4) {
  const t3 = Gs(e4), { P: n7 } = t3, r5 = (b5) => er2(b5, n7), o6 = t3.montgomeryBits, s5 = Math.ceil(o6 / 8), i6 = t3.nByteLength, c8 = t3.adjustScalarBytes || ((b5) => b5), u4 = t3.powPminus2 || ((b5) => qs(b5, n7 - BigInt(2), n7));
  function a5(b5, _8, I5) {
    const k7 = r5(b5 * (_8 - I5));
    return _8 = r5(_8 - k7), I5 = r5(I5 + k7), [_8, I5];
  }
  const l9 = (t3.a - BigInt(2)) / BigInt(4);
  function f8(b5, _8) {
    Qn2("u", b5, xe2, n7), Qn2("scalar", _8, xe2, n7);
    const I5 = _8, k7 = b5;
    let E7 = vt2, L5 = xe2, j6 = b5, v7 = vt2, O5 = xe2, w6;
    for (let A6 = BigInt(o6 - 1); A6 >= xe2; A6--) {
      const T7 = I5 >> A6 & vt2;
      O5 ^= T7, w6 = a5(O5, E7, j6), E7 = w6[0], j6 = w6[1], w6 = a5(O5, L5, v7), L5 = w6[0], v7 = w6[1], O5 = T7;
      const N11 = E7 + L5, S5 = r5(N11 * N11), U3 = E7 - L5, $5 = r5(U3 * U3), p6 = S5 - $5, C6 = j6 + v7, D5 = j6 - v7, P6 = r5(D5 * N11), G4 = r5(C6 * U3), X2 = P6 + G4, Z3 = P6 - G4;
      j6 = r5(X2 * X2), v7 = r5(k7 * r5(Z3 * Z3)), E7 = r5(S5 * $5), L5 = r5(p6 * (S5 + r5(l9 * p6)));
    }
    w6 = a5(O5, E7, j6), E7 = w6[0], j6 = w6[1], w6 = a5(O5, L5, v7), L5 = w6[0], v7 = w6[1];
    const R4 = u4(L5);
    return r5(E7 * R4);
  }
  function d7(b5) {
    return Vs(r5(b5), s5);
  }
  function g5(b5) {
    const _8 = Zn2("u coordinate", b5, s5);
    return i6 === 32 && (_8[31] &= 127), Xn2(_8);
  }
  function y6(b5) {
    const _8 = Zn2("scalar", b5), I5 = _8.length;
    if (I5 !== s5 && I5 !== i6) {
      let k7 = "" + s5 + " or " + i6;
      throw new Error("invalid scalar, expected " + k7 + " bytes, got " + I5);
    }
    return Xn2(c8(_8));
  }
  function h7(b5, _8) {
    const I5 = g5(_8), k7 = y6(b5), E7 = f8(I5, k7);
    if (E7 === xe2) throw new Error("invalid private or public key received");
    return d7(E7);
  }
  const m5 = d7(t3.Gu);
  function B4(b5) {
    return h7(b5, m5);
  }
  return { scalarMult: h7, scalarMultBase: B4, getSharedSecret: (b5, _8) => h7(b5, _8), getPublicKey: (b5) => B4(b5), utils: { randomPrivateKey: () => t3.randomBytes(t3.nByteLength) }, GuBytes: m5 };
}
var xt2 = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949");
BigInt(0);
var zs = BigInt(1);
var tr2 = BigInt(2);
var Js = BigInt(3);
var Ys = BigInt(5);
BigInt(8);
function Xs(e4) {
  const t3 = BigInt(10), n7 = BigInt(20), r5 = BigInt(40), o6 = BigInt(80), s5 = xt2, c8 = e4 * e4 % s5 * e4 % s5, u4 = z5(c8, tr2, s5) * c8 % s5, a5 = z5(u4, zs, s5) * e4 % s5, l9 = z5(a5, Ys, s5) * a5 % s5, f8 = z5(l9, t3, s5) * l9 % s5, d7 = z5(f8, n7, s5) * f8 % s5, g5 = z5(d7, r5, s5) * d7 % s5, y6 = z5(g5, o6, s5) * g5 % s5, h7 = z5(y6, o6, s5) * g5 % s5, m5 = z5(h7, t3, s5) * l9 % s5;
  return { pow_p_5_8: z5(m5, tr2, s5) * e4 % s5, b2: c8 };
}
function Zs(e4) {
  return e4[0] &= 248, e4[31] &= 127, e4[31] |= 64, e4;
}
var Ot2 = Ws({ P: xt2, a: BigInt(486662), montgomeryBits: 255, nByteLength: 32, Gu: BigInt(9), powPminus2: (e4) => {
  const t3 = xt2, { pow_p_5_8: n7, b2: r5 } = Xs(e4);
  return er2(z5(n7, Js, t3) * r5, t3);
}, adjustScalarBytes: Zs, randomBytes: Se2 });
var It2 = "base10";
var V2 = "base16";
var At = "base64pad";
var Qs = "base64url";
var Oe2 = "utf8";
var Nt2 = 0;
var Ie2 = 1;
var _e2 = 2;
var ei = 0;
var nr2 = 1;
var Te2 = 12;
var St2 = 32;
function ti() {
  const e4 = Ot2.utils.randomPrivateKey(), t3 = Ot2.getPublicKey(e4);
  return { privateKey: toString3(e4, V2), publicKey: toString3(t3, V2) };
}
function ni() {
  const e4 = Se2(St2);
  return toString3(e4, V2);
}
function ri(e4, t3) {
  const n7 = Ot2.getSharedSecret(fromString4(e4, V2), fromString4(t3, V2)), r5 = Ts(He2, n7, void 0, void 0, St2);
  return toString3(r5, V2);
}
function oi(e4) {
  const t3 = He2(fromString4(e4, V2));
  return toString3(t3, V2);
}
function si(e4) {
  const t3 = He2(fromString4(e4, Oe2));
  return toString3(t3, V2);
}
function Ut2(e4) {
  return fromString4(`${e4}`, It2);
}
function fe2(e4) {
  return Number(toString3(e4, It2));
}
function ii(e4) {
  const t3 = Ut2(typeof e4.type < "u" ? e4.type : Nt2);
  if (fe2(t3) === Ie2 && typeof e4.senderPublicKey > "u") throw new Error("Missing sender public key for type 1 envelope");
  const n7 = typeof e4.senderPublicKey < "u" ? fromString4(e4.senderPublicKey, V2) : void 0, r5 = typeof e4.iv < "u" ? fromString4(e4.iv, V2) : Se2(Te2), o6 = fromString4(e4.symKey, V2), s5 = Fn2(o6, r5).encrypt(fromString4(e4.message, Oe2));
  return _t2({ type: t3, sealed: s5, iv: r5, senderPublicKey: n7, encoding: e4.encoding });
}
function ci(e4) {
  const t3 = fromString4(e4.symKey, V2), { sealed: n7, iv: r5 } = Fe(e4), o6 = Fn2(t3, r5).decrypt(n7);
  if (o6 === null) throw new Error("Failed to decrypt");
  return toString3(o6, Oe2);
}
function ai(e4, t3) {
  const n7 = Ut2(_e2), r5 = Se2(Te2), o6 = fromString4(e4, Oe2);
  return _t2({ type: n7, sealed: o6, iv: r5, encoding: t3 });
}
function ui(e4, t3) {
  const { sealed: n7 } = Fe({ encoded: e4, encoding: t3 });
  return toString3(n7, Oe2);
}
function _t2(e4) {
  const { encoding: t3 = At } = e4;
  if (fe2(e4.type) === _e2) return toString3(concat3([e4.type, e4.sealed]), t3);
  if (fe2(e4.type) === Ie2) {
    if (typeof e4.senderPublicKey > "u") throw new Error("Missing sender public key for type 1 envelope");
    return toString3(concat3([e4.type, e4.senderPublicKey, e4.iv, e4.sealed]), t3);
  }
  return toString3(concat3([e4.type, e4.iv, e4.sealed]), t3);
}
function Fe(e4) {
  const { encoded: t3, encoding: n7 = At } = e4, r5 = fromString4(t3, n7), o6 = r5.slice(ei, nr2), s5 = nr2;
  if (fe2(o6) === Ie2) {
    const a5 = s5 + St2, l9 = a5 + Te2, f8 = r5.slice(s5, a5), d7 = r5.slice(a5, l9), g5 = r5.slice(l9);
    return { type: o6, sealed: g5, iv: d7, senderPublicKey: f8 };
  }
  if (fe2(o6) === _e2) {
    const a5 = r5.slice(s5), l9 = Se2(Te2);
    return { type: o6, sealed: a5, iv: l9 };
  }
  const i6 = s5 + Te2, c8 = r5.slice(s5, i6), u4 = r5.slice(i6);
  return { type: o6, sealed: u4, iv: c8 };
}
function fi(e4, t3) {
  const n7 = Fe({ encoded: e4, encoding: t3 == null ? void 0 : t3.encoding });
  return rr2({ type: fe2(n7.type), senderPublicKey: typeof n7.senderPublicKey < "u" ? toString3(n7.senderPublicKey, V2) : void 0, receiverPublicKey: t3 == null ? void 0 : t3.receiverPublicKey });
}
function rr2(e4) {
  const t3 = (e4 == null ? void 0 : e4.type) || Nt2;
  if (t3 === Ie2) {
    if (typeof (e4 == null ? void 0 : e4.senderPublicKey) > "u") throw new Error("missing sender public key");
    if (typeof (e4 == null ? void 0 : e4.receiverPublicKey) > "u") throw new Error("missing receiver public key");
  }
  return { type: t3, senderPublicKey: e4 == null ? void 0 : e4.senderPublicKey, receiverPublicKey: e4 == null ? void 0 : e4.receiverPublicKey };
}
function li(e4) {
  return e4.type === Ie2 && typeof e4.senderPublicKey == "string" && typeof e4.receiverPublicKey == "string";
}
function di(e4) {
  return e4.type === _e2;
}
function or3(e4) {
  return new import_elliptic.ec("p256").keyFromPublic({ x: Buffer.from(e4.x, "base64").toString("hex"), y: Buffer.from(e4.y, "base64").toString("hex") }, "hex");
}
function hi(e4) {
  let t3 = e4.replace(/-/g, "+").replace(/_/g, "/");
  const n7 = t3.length % 4;
  return n7 > 0 && (t3 += "=".repeat(4 - n7)), t3;
}
function pi(e4) {
  return Buffer.from(hi(e4), "base64");
}
function gi(e4, t3) {
  const [n7, r5, o6] = e4.split("."), s5 = pi(o6);
  if (s5.length !== 64) throw new Error("Invalid signature length");
  const i6 = s5.slice(0, 32).toString("hex"), c8 = s5.slice(32, 64).toString("hex"), u4 = `${n7}.${r5}`, a5 = He2(u4), l9 = or3(t3), f8 = toString3(a5, V2);
  if (!l9.verify(f8, { r: i6, s: c8 })) throw new Error("Invalid signature");
  return sn(e4).payload;
}
var sr2 = "irn";
function yi(e4) {
  return (e4 == null ? void 0 : e4.relay) || { protocol: sr2 };
}
function mi(e4) {
  const t3 = C4[e4];
  if (typeof t3 > "u") throw new Error(`Relay Protocol not supported: ${e4}`);
  return t3;
}
function ir2(e4, t3 = "-") {
  const n7 = {}, r5 = "relay" + t3;
  return Object.keys(e4).forEach((o6) => {
    if (o6.startsWith(r5)) {
      const s5 = o6.replace(r5, ""), i6 = e4[o6];
      n7[s5] = i6;
    }
  }), n7;
}
function bi(e4) {
  if (!e4.includes("wc:")) {
    const a5 = rt2(e4);
    a5 != null && a5.includes("wc:") && (e4 = a5);
  }
  e4 = e4.includes("wc://") ? e4.replace("wc://", "") : e4, e4 = e4.includes("wc:") ? e4.replace("wc:", "") : e4;
  const t3 = e4.indexOf(":"), n7 = e4.indexOf("?") !== -1 ? e4.indexOf("?") : void 0, r5 = e4.substring(0, t3), o6 = e4.substring(t3 + 1, n7).split("@"), s5 = typeof n7 < "u" ? e4.substring(n7) : "", i6 = new URLSearchParams(s5), c8 = {};
  i6.forEach((a5, l9) => {
    c8[l9] = a5;
  });
  const u4 = typeof c8.methods == "string" ? c8.methods.split(",") : void 0;
  return { protocol: r5, topic: cr2(o6[0]), version: parseInt(o6[1], 10), symKey: c8.symKey, relay: ir2(c8), methods: u4, expiryTimestamp: c8.expiryTimestamp ? parseInt(c8.expiryTimestamp, 10) : void 0 };
}
function cr2(e4) {
  return e4.startsWith("//") ? e4.substring(2) : e4;
}
function ar2(e4, t3 = "-") {
  const n7 = "relay", r5 = {};
  return Object.keys(e4).forEach((o6) => {
    const s5 = o6, i6 = n7 + t3 + s5;
    e4[s5] && (r5[i6] = e4[s5]);
  }), r5;
}
function wi(e4) {
  const t3 = new URLSearchParams(), n7 = ar2(e4.relay);
  Object.keys(n7).sort().forEach((o6) => {
    t3.set(o6, n7[o6]);
  }), t3.set("symKey", e4.symKey), e4.expiryTimestamp && t3.set("expiryTimestamp", e4.expiryTimestamp.toString()), e4.methods && t3.set("methods", e4.methods.join(","));
  const r5 = t3.toString();
  return `${e4.protocol}:${e4.topic}@${e4.version}?${r5}`;
}
function Ei(e4, t3, n7) {
  return `${e4}?wc_ev=${n7}&topic=${t3}`;
}
function le2(e4) {
  const t3 = [];
  return e4.forEach((n7) => {
    const [r5, o6] = n7.split(":");
    t3.push(`${r5}:${o6}`);
  }), t3;
}
function lr2(e4) {
  const t3 = [];
  return Object.values(e4).forEach((n7) => {
    t3.push(...le2(n7.accounts));
  }), t3;
}
function dr2(e4, t3) {
  const n7 = [];
  return Object.values(e4).forEach((r5) => {
    le2(r5.accounts).includes(t3) && n7.push(...r5.methods);
  }), n7;
}
function hr2(e4, t3) {
  const n7 = [];
  return Object.values(e4).forEach((r5) => {
    le2(r5.accounts).includes(t3) && n7.push(...r5.events);
  }), n7;
}
function gr2(e4) {
  const t3 = {};
  return e4 == null ? void 0 : e4.forEach((n7) => {
    var r5;
    const [o6, s5] = n7.split(":");
    t3[o6] || (t3[o6] = { accounts: [], chains: [], events: [], methods: [] }), t3[o6].accounts.push(n7), (r5 = t3[o6].chains) == null || r5.push(`${o6}:${s5}`);
  }), t3;
}
function Ti(e4, t3) {
  t3 = t3.map((r5) => r5.replace("did:pkh:", ""));
  const n7 = gr2(t3);
  for (const [r5, o6] of Object.entries(n7)) o6.methods ? o6.methods = Q3(o6.methods, e4) : o6.methods = e4, o6.events = ["chainChanged", "accountsChanged"];
  return n7;
}
var yr2 = { INVALID_METHOD: { message: "Invalid method.", code: 1001 }, INVALID_EVENT: { message: "Invalid event.", code: 1002 }, INVALID_UPDATE_REQUEST: { message: "Invalid update request.", code: 1003 }, INVALID_EXTEND_REQUEST: { message: "Invalid extend request.", code: 1004 }, INVALID_SESSION_SETTLE_REQUEST: { message: "Invalid session settle request.", code: 1005 }, UNAUTHORIZED_METHOD: { message: "Unauthorized method.", code: 3001 }, UNAUTHORIZED_EVENT: { message: "Unauthorized event.", code: 3002 }, UNAUTHORIZED_UPDATE_REQUEST: { message: "Unauthorized update request.", code: 3003 }, UNAUTHORIZED_EXTEND_REQUEST: { message: "Unauthorized extend request.", code: 3004 }, USER_REJECTED: { message: "User rejected.", code: 5e3 }, USER_REJECTED_CHAINS: { message: "User rejected chains.", code: 5001 }, USER_REJECTED_METHODS: { message: "User rejected methods.", code: 5002 }, USER_REJECTED_EVENTS: { message: "User rejected events.", code: 5003 }, UNSUPPORTED_CHAINS: { message: "Unsupported chains.", code: 5100 }, UNSUPPORTED_METHODS: { message: "Unsupported methods.", code: 5101 }, UNSUPPORTED_EVENTS: { message: "Unsupported events.", code: 5102 }, UNSUPPORTED_ACCOUNTS: { message: "Unsupported accounts.", code: 5103 }, UNSUPPORTED_NAMESPACE_KEY: { message: "Unsupported namespace key.", code: 5104 }, USER_DISCONNECTED: { message: "User disconnected.", code: 6e3 }, SESSION_SETTLEMENT_FAILED: { message: "Session settlement failed.", code: 7e3 }, WC_METHOD_UNSUPPORTED: { message: "Unsupported wc_ method.", code: 10001 } };
var mr2 = { NOT_INITIALIZED: { message: "Not initialized.", code: 1 }, NO_MATCHING_KEY: { message: "No matching key.", code: 2 }, RESTORE_WILL_OVERRIDE: { message: "Restore will override.", code: 3 }, RESUBSCRIBED: { message: "Resubscribed.", code: 4 }, MISSING_OR_INVALID: { message: "Missing or invalid.", code: 5 }, EXPIRED: { message: "Expired.", code: 6 }, UNKNOWN_TYPE: { message: "Unknown type.", code: 7 }, MISMATCHED_TOPIC: { message: "Mismatched topic.", code: 8 }, NON_CONFORMING_NAMESPACES: { message: "Non conforming namespaces.", code: 9 } };
function te2(e4, t3) {
  const { message: n7, code: r5 } = mr2[e4];
  return { message: t3 ? `${n7} ${t3}` : n7, code: r5 };
}
function de2(e4, t3) {
  const { message: n7, code: r5 } = yr2[e4];
  return { message: t3 ? `${n7} ${t3}` : n7, code: r5 };
}
function $e2(e4, t3) {
  return Array.isArray(e4) ? typeof t3 < "u" && e4.length ? e4.every(t3) : true : false;
}
function qe2(e4) {
  return Object.getPrototypeOf(e4) === Object.prototype && Object.keys(e4).length;
}
function ae(e4) {
  return typeof e4 > "u";
}
function q3(e4, t3) {
  return t3 && ae(e4) ? true : typeof e4 == "string" && !!e4.trim().length;
}
function Ge2(e4, t3) {
  return t3 && ae(e4) ? true : typeof e4 == "number" && !isNaN(e4);
}
function $i(e4, t3) {
  const { requiredNamespaces: n7 } = t3, r5 = Object.keys(e4.namespaces), o6 = Object.keys(n7);
  let s5 = true;
  return re(o6, r5) ? (r5.forEach((i6) => {
    const { accounts: c8, methods: u4, events: a5 } = e4.namespaces[i6], l9 = le2(c8), f8 = n7[i6];
    (!re(Le2(i6, f8), l9) || !re(f8.methods, u4) || !re(f8.events, a5)) && (s5 = false);
  }), s5) : false;
}
function Re2(e4) {
  return q3(e4, false) && e4.includes(":") ? e4.split(":").length === 2 : false;
}
function br2(e4) {
  if (q3(e4, false) && e4.includes(":")) {
    const t3 = e4.split(":");
    if (t3.length === 3) {
      const n7 = t3[0] + ":" + t3[1];
      return !!t3[2] && Re2(n7);
    }
  }
  return false;
}
function Ri(e4) {
  function t3(n7) {
    try {
      return typeof new URL(n7) < "u";
    } catch {
      return false;
    }
  }
  try {
    if (q3(e4, false)) {
      if (t3(e4)) return true;
      const n7 = rt2(e4);
      return t3(n7);
    }
  } catch {
  }
  return false;
}
function Pi2(e4) {
  var t3;
  return (t3 = e4 == null ? void 0 : e4.proposer) == null ? void 0 : t3.publicKey;
}
function Li(e4) {
  return e4 == null ? void 0 : e4.topic;
}
function Bi(e4, t3) {
  let n7 = null;
  return q3(e4 == null ? void 0 : e4.publicKey, false) || (n7 = te2("MISSING_OR_INVALID", `${t3} controller public key should be a string`)), n7;
}
function Rt2(e4) {
  let t3 = true;
  return $e2(e4) ? e4.length && (t3 = e4.every((n7) => q3(n7, false))) : t3 = false, t3;
}
function wr2(e4, t3, n7) {
  let r5 = null;
  return $e2(t3) && t3.length ? t3.forEach((o6) => {
    r5 || Re2(o6) || (r5 = de2("UNSUPPORTED_CHAINS", `${n7}, chain ${o6} should be a string and conform to "namespace:chainId" format`));
  }) : Re2(e4) || (r5 = de2("UNSUPPORTED_CHAINS", `${n7}, chains must be defined as "namespace:chainId" e.g. "eip155:1": {...} in the namespace key OR as an array of CAIP-2 chainIds e.g. eip155: { chains: ["eip155:1", "eip155:5"] }`)), r5;
}
function Er2(e4, t3, n7) {
  let r5 = null;
  return Object.entries(e4).forEach(([o6, s5]) => {
    if (r5) return;
    const i6 = wr2(o6, Le2(o6, s5), `${t3} ${n7}`);
    i6 && (r5 = i6);
  }), r5;
}
function vr2(e4, t3) {
  let n7 = null;
  return $e2(e4) ? e4.forEach((r5) => {
    n7 || br2(r5) || (n7 = de2("UNSUPPORTED_ACCOUNTS", `${t3}, account ${r5} should be a string and conform to "namespace:chainId:address" format`));
  }) : n7 = de2("UNSUPPORTED_ACCOUNTS", `${t3}, accounts should be an array of strings conforming to "namespace:chainId:address" format`), n7;
}
function xr2(e4, t3) {
  let n7 = null;
  return Object.values(e4).forEach((r5) => {
    if (n7) return;
    const o6 = vr2(r5 == null ? void 0 : r5.accounts, `${t3} namespace`);
    o6 && (n7 = o6);
  }), n7;
}
function Or2(e4, t3) {
  let n7 = null;
  return Rt2(e4 == null ? void 0 : e4.methods) ? Rt2(e4 == null ? void 0 : e4.events) || (n7 = de2("UNSUPPORTED_EVENTS", `${t3}, events should be an array of strings or empty array for no events`)) : n7 = de2("UNSUPPORTED_METHODS", `${t3}, methods should be an array of strings or empty array for no methods`), n7;
}
function Pt2(e4, t3) {
  let n7 = null;
  return Object.values(e4).forEach((r5) => {
    if (n7) return;
    const o6 = Or2(r5, `${t3}, namespace`);
    o6 && (n7 = o6);
  }), n7;
}
function ji(e4, t3, n7) {
  let r5 = null;
  if (e4 && qe2(e4)) {
    const o6 = Pt2(e4, t3);
    o6 && (r5 = o6);
    const s5 = Er2(e4, t3, n7);
    s5 && (r5 = s5);
  } else r5 = te2("MISSING_OR_INVALID", `${t3}, ${n7} should be an object with data`);
  return r5;
}
function Ir2(e4, t3) {
  let n7 = null;
  if (e4 && qe2(e4)) {
    const r5 = Pt2(e4, t3);
    r5 && (n7 = r5);
    const o6 = xr2(e4, t3);
    o6 && (n7 = o6);
  } else n7 = te2("MISSING_OR_INVALID", `${t3}, namespaces should be an object with data`);
  return n7;
}
function Ar2(e4) {
  return q3(e4.protocol, true);
}
function Ci(e4, t3) {
  let n7 = false;
  return t3 && !e4 ? n7 = true : e4 && $e2(e4) && e4.length && e4.forEach((r5) => {
    n7 = Ar2(r5);
  }), n7;
}
function ki(e4) {
  return typeof e4 == "number";
}
function Di(e4) {
  return typeof e4 < "u" && typeof e4 !== null;
}
function Mi(e4) {
  return !(!e4 || typeof e4 != "object" || !e4.code || !Ge2(e4.code, false) || !e4.message || !q3(e4.message, false));
}
function Vi(e4) {
  return !(ae(e4) || !q3(e4.method, false));
}
function Hi(e4) {
  return !(ae(e4) || ae(e4.result) && ae(e4.error) || !Ge2(e4.id, false) || !q3(e4.jsonrpc, false));
}
function Ki(e4) {
  return !(ae(e4) || !q3(e4.name, false));
}
function Fi(e4, t3) {
  return !(!Re2(t3) || !lr2(e4).includes(t3));
}
function qi(e4, t3, n7) {
  return q3(n7, false) ? dr2(e4, t3).includes(n7) : false;
}
function Gi(e4, t3, n7) {
  return q3(n7, false) ? hr2(e4, t3).includes(n7) : false;
}
function Nr2(e4, t3, n7) {
  let r5 = null;
  const o6 = Wi(e4), s5 = zi(t3), i6 = Object.keys(o6), c8 = Object.keys(s5), u4 = Sr2(Object.keys(e4)), a5 = Sr2(Object.keys(t3)), l9 = u4.filter((f8) => !a5.includes(f8));
  return l9.length && (r5 = te2("NON_CONFORMING_NAMESPACES", `${n7} namespaces keys don't satisfy requiredNamespaces.
      Required: ${l9.toString()}
      Received: ${Object.keys(t3).toString()}`)), re(i6, c8) || (r5 = te2("NON_CONFORMING_NAMESPACES", `${n7} namespaces chains don't satisfy required namespaces.
      Required: ${i6.toString()}
      Approved: ${c8.toString()}`)), Object.keys(t3).forEach((f8) => {
    if (!f8.includes(":") || r5) return;
    const d7 = le2(t3[f8].accounts);
    d7.includes(f8) || (r5 = te2("NON_CONFORMING_NAMESPACES", `${n7} namespaces accounts don't satisfy namespace accounts for ${f8}
        Required: ${f8}
        Approved: ${d7.toString()}`));
  }), i6.forEach((f8) => {
    r5 || (re(o6[f8].methods, s5[f8].methods) ? re(o6[f8].events, s5[f8].events) || (r5 = te2("NON_CONFORMING_NAMESPACES", `${n7} namespaces events don't satisfy namespace events for ${f8}`)) : r5 = te2("NON_CONFORMING_NAMESPACES", `${n7} namespaces methods don't satisfy namespace methods for ${f8}`));
  }), r5;
}
function Wi(e4) {
  const t3 = {};
  return Object.keys(e4).forEach((n7) => {
    var r5;
    n7.includes(":") ? t3[n7] = e4[n7] : (r5 = e4[n7].chains) == null || r5.forEach((o6) => {
      t3[o6] = { methods: e4[n7].methods, events: e4[n7].events };
    });
  }), t3;
}
function Sr2(e4) {
  return [...new Set(e4.map((t3) => t3.includes(":") ? t3.split(":")[0] : t3))];
}
function zi(e4) {
  const t3 = {};
  return Object.keys(e4).forEach((n7) => {
    if (n7.includes(":")) t3[n7] = e4[n7];
    else {
      const r5 = le2(e4[n7].accounts);
      r5 == null ? void 0 : r5.forEach((o6) => {
        t3[o6] = { accounts: e4[n7].accounts.filter((s5) => s5.includes(`${o6}:`)), methods: e4[n7].methods, events: e4[n7].events };
      });
    }
  }), t3;
}
function Ji(e4, t3) {
  return Ge2(e4, false) && e4 <= t3.max && e4 >= t3.min;
}
function Yi() {
  const e4 = ue();
  return new Promise((t3) => {
    switch (e4) {
      case H4.browser:
        t3(Ur2());
        break;
      case H4.reactNative:
        t3(_r2());
        break;
      case H4.node:
        t3(Tr2());
        break;
      default:
        t3(true);
    }
  });
}
function Ur2() {
  return Ae2() && (navigator == null ? void 0 : navigator.onLine);
}
async function _r2() {
  if (ne() && typeof global < "u" && global != null && global.NetInfo) {
    const e4 = await (global == null ? void 0 : global.NetInfo.fetch());
    return e4 == null ? void 0 : e4.isConnected;
  }
  return true;
}
function Tr2() {
  return true;
}
function Xi(e4) {
  switch (ue()) {
    case H4.browser:
      $r2(e4);
      break;
    case H4.reactNative:
      Rr2(e4);
      break;
    case H4.node:
      break;
  }
}
function $r2(e4) {
  !ne() && Ae2() && (window.addEventListener("online", () => e4(true)), window.addEventListener("offline", () => e4(false)));
}
function Rr2(e4) {
  ne() && typeof global < "u" && global != null && global.NetInfo && (global == null ? void 0 : global.NetInfo.addEventListener((t3) => e4(t3 == null ? void 0 : t3.isConnected)));
}
var Lt2 = {};
var Zi = class {
  static get(t3) {
    return Lt2[t3];
  }
  static set(t3, n7) {
    Lt2[t3] = n7;
  }
  static delete(t3) {
    delete Lt2[t3];
  }
};

// node_modules/@walletconnect/jsonrpc-provider/dist/index.es.js
var import_events5 = __toESM(require_events());

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js
var esm_exports3 = {};
__export(esm_exports3, {
  DEFAULT_ERROR: () => DEFAULT_ERROR,
  IBaseJsonRpcProvider: () => n5,
  IEvents: () => e3,
  IJsonRpcConnection: () => o4,
  IJsonRpcProvider: () => r4,
  INTERNAL_ERROR: () => INTERNAL_ERROR,
  INVALID_PARAMS: () => INVALID_PARAMS,
  INVALID_REQUEST: () => INVALID_REQUEST,
  METHOD_NOT_FOUND: () => METHOD_NOT_FOUND,
  PARSE_ERROR: () => PARSE_ERROR,
  RESERVED_ERROR_CODES: () => RESERVED_ERROR_CODES,
  SERVER_ERROR: () => SERVER_ERROR,
  SERVER_ERROR_CODE_RANGE: () => SERVER_ERROR_CODE_RANGE,
  STANDARD_ERROR_MAP: () => STANDARD_ERROR_MAP,
  formatErrorMessage: () => formatErrorMessage,
  formatJsonRpcError: () => formatJsonRpcError,
  formatJsonRpcRequest: () => formatJsonRpcRequest,
  formatJsonRpcResult: () => formatJsonRpcResult,
  getBigIntRpcId: () => getBigIntRpcId,
  getError: () => getError,
  getErrorByCode: () => getErrorByCode,
  isHttpUrl: () => isHttpUrl,
  isJsonRpcError: () => isJsonRpcError,
  isJsonRpcPayload: () => isJsonRpcPayload,
  isJsonRpcRequest: () => isJsonRpcRequest,
  isJsonRpcResponse: () => isJsonRpcResponse,
  isJsonRpcResult: () => isJsonRpcResult,
  isJsonRpcValidationInvalid: () => isJsonRpcValidationInvalid,
  isLocalhostUrl: () => isLocalhostUrl,
  isNodeJs: () => isNodeJs,
  isReservedErrorCode: () => isReservedErrorCode,
  isServerErrorCode: () => isServerErrorCode,
  isValidDefaultRoute: () => isValidDefaultRoute,
  isValidErrorCode: () => isValidErrorCode,
  isValidLeadingWildcardRoute: () => isValidLeadingWildcardRoute,
  isValidRoute: () => isValidRoute,
  isValidTrailingWildcardRoute: () => isValidTrailingWildcardRoute,
  isValidWildcardRoute: () => isValidWildcardRoute,
  isWsUrl: () => isWsUrl,
  parseConnectionError: () => parseConnectionError,
  payloadId: () => payloadId,
  validateJsonRpcError: () => validateJsonRpcError
});

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/constants.js
var PARSE_ERROR = "PARSE_ERROR";
var INVALID_REQUEST = "INVALID_REQUEST";
var METHOD_NOT_FOUND = "METHOD_NOT_FOUND";
var INVALID_PARAMS = "INVALID_PARAMS";
var INTERNAL_ERROR = "INTERNAL_ERROR";
var SERVER_ERROR = "SERVER_ERROR";
var RESERVED_ERROR_CODES = [-32700, -32600, -32601, -32602, -32603];
var SERVER_ERROR_CODE_RANGE = [-32e3, -32099];
var STANDARD_ERROR_MAP = {
  [PARSE_ERROR]: { code: -32700, message: "Parse error" },
  [INVALID_REQUEST]: { code: -32600, message: "Invalid Request" },
  [METHOD_NOT_FOUND]: { code: -32601, message: "Method not found" },
  [INVALID_PARAMS]: { code: -32602, message: "Invalid params" },
  [INTERNAL_ERROR]: { code: -32603, message: "Internal error" },
  [SERVER_ERROR]: { code: -32e3, message: "Server error" }
};
var DEFAULT_ERROR = SERVER_ERROR;

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/error.js
function isServerErrorCode(code2) {
  return code2 <= SERVER_ERROR_CODE_RANGE[0] && code2 >= SERVER_ERROR_CODE_RANGE[1];
}
function isReservedErrorCode(code2) {
  return RESERVED_ERROR_CODES.includes(code2);
}
function isValidErrorCode(code2) {
  return typeof code2 === "number";
}
function getError(type) {
  if (!Object.keys(STANDARD_ERROR_MAP).includes(type)) {
    return STANDARD_ERROR_MAP[DEFAULT_ERROR];
  }
  return STANDARD_ERROR_MAP[type];
}
function getErrorByCode(code2) {
  const match = Object.values(STANDARD_ERROR_MAP).find((e4) => e4.code === code2);
  if (!match) {
    return STANDARD_ERROR_MAP[DEFAULT_ERROR];
  }
  return match;
}
function validateJsonRpcError(response) {
  if (typeof response.error.code === "undefined") {
    return { valid: false, error: "Missing code for JSON-RPC error" };
  }
  if (typeof response.error.message === "undefined") {
    return { valid: false, error: "Missing message for JSON-RPC error" };
  }
  if (!isValidErrorCode(response.error.code)) {
    return {
      valid: false,
      error: `Invalid error code type for JSON-RPC: ${response.error.code}`
    };
  }
  if (isReservedErrorCode(response.error.code)) {
    const error = getErrorByCode(response.error.code);
    if (error.message !== STANDARD_ERROR_MAP[DEFAULT_ERROR].message && response.error.message === error.message) {
      return {
        valid: false,
        error: `Invalid error code message for JSON-RPC: ${response.error.code}`
      };
    }
  }
  return { valid: true };
}
function parseConnectionError(e4, url, type) {
  return e4.message.includes("getaddrinfo ENOTFOUND") || e4.message.includes("connect ECONNREFUSED") ? new Error(`Unavailable ${type} RPC url at ${url}`) : e4;
}

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/env.js
var env_exports = {};
__export(env_exports, {
  isNodeJs: () => isNodeJs
});
var import_environment = __toESM(require_cjs7());
__reExport(env_exports, __toESM(require_cjs7()));
var isNodeJs = import_environment.isNode;

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js
__reExport(esm_exports3, env_exports);

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/format.js
function payloadId(entropy = 3) {
  const date = Date.now() * Math.pow(10, entropy);
  const extra = Math.floor(Math.random() * Math.pow(10, entropy));
  return date + extra;
}
function getBigIntRpcId(entropy = 6) {
  return BigInt(payloadId(entropy));
}
function formatJsonRpcRequest(method, params, id) {
  return {
    id: id || payloadId(),
    jsonrpc: "2.0",
    method,
    params
  };
}
function formatJsonRpcResult(id, result) {
  return {
    id,
    jsonrpc: "2.0",
    result
  };
}
function formatJsonRpcError(id, error, data) {
  return {
    id,
    jsonrpc: "2.0",
    error: formatErrorMessage(error, data)
  };
}
function formatErrorMessage(error, data) {
  if (typeof error === "undefined") {
    return getError(INTERNAL_ERROR);
  }
  if (typeof error === "string") {
    error = Object.assign(Object.assign({}, getError(SERVER_ERROR)), { message: error });
  }
  if (typeof data !== "undefined") {
    error.data = data;
  }
  if (isReservedErrorCode(error.code)) {
    error = getErrorByCode(error.code);
  }
  return error;
}

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/routing.js
function isValidRoute(route) {
  if (route.includes("*")) {
    return isValidWildcardRoute(route);
  }
  if (/\W/g.test(route)) {
    return false;
  }
  return true;
}
function isValidDefaultRoute(route) {
  return route === "*";
}
function isValidWildcardRoute(route) {
  if (isValidDefaultRoute(route)) {
    return true;
  }
  if (!route.includes("*")) {
    return false;
  }
  if (route.split("*").length !== 2) {
    return false;
  }
  if (route.split("*").filter((x9) => x9.trim() === "").length !== 1) {
    return false;
  }
  return true;
}
function isValidLeadingWildcardRoute(route) {
  return !isValidDefaultRoute(route) && isValidWildcardRoute(route) && !route.split("*")[0].trim();
}
function isValidTrailingWildcardRoute(route) {
  return !isValidDefaultRoute(route) && isValidWildcardRoute(route) && !route.split("*")[1].trim();
}

// node_modules/@walletconnect/jsonrpc-types/dist/index.es.js
var e3 = class {
};
var o4 = class extends e3 {
  constructor(c8) {
    super();
  }
};
var n5 = class extends e3 {
  constructor() {
    super();
  }
};
var r4 = class extends n5 {
  constructor(c8) {
    super();
  }
};

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/url.js
var HTTP_REGEX = "^https?:";
var WS_REGEX = "^wss?:";
function getUrlProtocol(url) {
  const matches = url.match(new RegExp(/^\w+:/, "gi"));
  if (!matches || !matches.length)
    return;
  return matches[0];
}
function matchRegexProtocol(url, regex) {
  const protocol = getUrlProtocol(url);
  if (typeof protocol === "undefined")
    return false;
  return new RegExp(regex).test(protocol);
}
function isHttpUrl(url) {
  return matchRegexProtocol(url, HTTP_REGEX);
}
function isWsUrl(url) {
  return matchRegexProtocol(url, WS_REGEX);
}
function isLocalhostUrl(url) {
  return new RegExp("wss?://localhost(:d{2,5})?").test(url);
}

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/validators.js
function isJsonRpcPayload(payload) {
  return typeof payload === "object" && "id" in payload && "jsonrpc" in payload && payload.jsonrpc === "2.0";
}
function isJsonRpcRequest(payload) {
  return isJsonRpcPayload(payload) && "method" in payload;
}
function isJsonRpcResponse(payload) {
  return isJsonRpcPayload(payload) && (isJsonRpcResult(payload) || isJsonRpcError(payload));
}
function isJsonRpcResult(payload) {
  return "result" in payload;
}
function isJsonRpcError(payload) {
  return "error" in payload;
}
function isJsonRpcValidationInvalid(validation) {
  return "error" in validation && validation.valid === false;
}

// node_modules/@walletconnect/jsonrpc-provider/dist/index.es.js
var o5 = class extends r4 {
  constructor(t3) {
    super(t3), this.events = new import_events5.EventEmitter(), this.hasRegisteredEventListeners = false, this.connection = this.setConnection(t3), this.connection.connected && this.registerEventListeners();
  }
  async connect(t3 = this.connection) {
    await this.open(t3);
  }
  async disconnect() {
    await this.close();
  }
  on(t3, e4) {
    this.events.on(t3, e4);
  }
  once(t3, e4) {
    this.events.once(t3, e4);
  }
  off(t3, e4) {
    this.events.off(t3, e4);
  }
  removeListener(t3, e4) {
    this.events.removeListener(t3, e4);
  }
  async request(t3, e4) {
    return this.requestStrict(formatJsonRpcRequest(t3.method, t3.params || [], t3.id || getBigIntRpcId().toString()), e4);
  }
  async requestStrict(t3, e4) {
    return new Promise(async (i6, s5) => {
      if (!this.connection.connected) try {
        await this.open();
      } catch (n7) {
        s5(n7);
      }
      this.events.on(`${t3.id}`, (n7) => {
        isJsonRpcError(n7) ? s5(n7.error) : i6(n7.result);
      });
      try {
        await this.connection.send(t3, e4);
      } catch (n7) {
        s5(n7);
      }
    });
  }
  setConnection(t3 = this.connection) {
    return t3;
  }
  onPayload(t3) {
    this.events.emit("payload", t3), isJsonRpcResponse(t3) ? this.events.emit(`${t3.id}`, t3) : this.events.emit("message", { type: t3.method, data: t3.params });
  }
  onClose(t3) {
    t3 && t3.code === 3e3 && this.events.emit("error", new Error(`WebSocket connection closed abnormally with code: ${t3.code} ${t3.reason ? `(${t3.reason})` : ""}`)), this.events.emit("disconnect");
  }
  async open(t3 = this.connection) {
    this.connection === t3 && this.connection.connected || (this.connection.connected && this.close(), typeof t3 == "string" && (await this.connection.open(t3), t3 = this.connection), this.connection = this.setConnection(t3), await this.connection.open(), this.registerEventListeners(), this.events.emit("connect"));
  }
  async close() {
    await this.connection.close();
  }
  registerEventListeners() {
    this.hasRegisteredEventListeners || (this.connection.on("payload", (t3) => this.onPayload(t3)), this.connection.on("close", (t3) => this.onClose(t3)), this.connection.on("error", (t3) => this.events.emit("error", t3)), this.connection.on("register_error", (t3) => this.onClose()), this.hasRegisteredEventListeners = true);
  }
};

// node_modules/@walletconnect/jsonrpc-ws-connection/dist/index.es.js
var import_events6 = __toESM(require_events());

// node_modules/@walletconnect/jsonrpc-ws-connection/node_modules/@walletconnect/safe-json/dist/esm/index.js
var JSONStringify4 = (data) => JSON.stringify(data, (_8, value) => typeof value === "bigint" ? value.toString() + "n" : value);
var JSONParse3 = (json) => {
  const numbersBiggerThanMaxInt = /([\[:])?(\d{17,}|(?:[9](?:[1-9]07199254740991|0[1-9]7199254740991|00[8-9]199254740991|007[2-9]99254740991|007199[3-9]54740991|0071992[6-9]4740991|00719925[5-9]740991|007199254[8-9]40991|0071992547[5-9]0991|00719925474[1-9]991|00719925474099[2-9])))([,\}\]])/g;
  const serializedData = json.replace(numbersBiggerThanMaxInt, '$1"$2n"$3');
  return JSON.parse(serializedData, (_8, value) => {
    const isCustomFormatBigInt = typeof value === "string" && value.match(/^\d+n$/);
    if (isCustomFormatBigInt)
      return BigInt(value.substring(0, value.length - 1));
    return value;
  });
};
function safeJsonParse5(value) {
  if (typeof value !== "string") {
    throw new Error(`Cannot safe json parse value of type ${typeof value}`);
  }
  try {
    return JSONParse3(value);
  } catch (_a) {
    return value;
  }
}
function safeJsonStringify6(value) {
  return typeof value === "string" ? value : JSONStringify4(value) || "";
}

// node_modules/@walletconnect/jsonrpc-ws-connection/dist/index.es.js
var v5 = () => typeof WebSocket < "u" ? WebSocket : typeof global < "u" && typeof global.WebSocket < "u" ? global.WebSocket : typeof window < "u" && typeof window.WebSocket < "u" ? window.WebSocket : typeof self < "u" && typeof self.WebSocket < "u" ? self.WebSocket : require_browser3();
var w5 = () => typeof WebSocket < "u" || typeof global < "u" && typeof global.WebSocket < "u" || typeof window < "u" && typeof window.WebSocket < "u" || typeof self < "u" && typeof self.WebSocket < "u";
var d5 = (r5) => r5.split("?")[0];
var h6 = 10;
var b4 = v5();
var f6 = class {
  constructor(e4) {
    if (this.url = e4, this.events = new import_events6.EventEmitter(), this.registering = false, !isWsUrl(e4)) throw new Error(`Provided URL is not compatible with WebSocket connection: ${e4}`);
    this.url = e4;
  }
  get connected() {
    return typeof this.socket < "u";
  }
  get connecting() {
    return this.registering;
  }
  on(e4, t3) {
    this.events.on(e4, t3);
  }
  once(e4, t3) {
    this.events.once(e4, t3);
  }
  off(e4, t3) {
    this.events.off(e4, t3);
  }
  removeListener(e4, t3) {
    this.events.removeListener(e4, t3);
  }
  async open(e4 = this.url) {
    await this.register(e4);
  }
  async close() {
    return new Promise((e4, t3) => {
      if (typeof this.socket > "u") {
        t3(new Error("Connection already closed"));
        return;
      }
      this.socket.onclose = (n7) => {
        this.onClose(n7), e4();
      }, this.socket.close();
    });
  }
  async send(e4) {
    typeof this.socket > "u" && (this.socket = await this.register());
    try {
      this.socket.send(safeJsonStringify6(e4));
    } catch (t3) {
      this.onError(e4.id, t3);
    }
  }
  register(e4 = this.url) {
    if (!isWsUrl(e4)) throw new Error(`Provided URL is not compatible with WebSocket connection: ${e4}`);
    if (this.registering) {
      const t3 = this.events.getMaxListeners();
      return (this.events.listenerCount("register_error") >= t3 || this.events.listenerCount("open") >= t3) && this.events.setMaxListeners(t3 + 1), new Promise((n7, s5) => {
        this.events.once("register_error", (o6) => {
          this.resetMaxListeners(), s5(o6);
        }), this.events.once("open", () => {
          if (this.resetMaxListeners(), typeof this.socket > "u") return s5(new Error("WebSocket connection is missing or invalid"));
          n7(this.socket);
        });
      });
    }
    return this.url = e4, this.registering = true, new Promise((t3, n7) => {
      const s5 = (0, esm_exports3.isReactNative)() ? void 0 : { rejectUnauthorized: !isLocalhostUrl(e4) }, o6 = new b4(e4, [], s5);
      w5() ? o6.onerror = (i6) => {
        const a5 = i6;
        n7(this.emitError(a5.error));
      } : o6.on("error", (i6) => {
        n7(this.emitError(i6));
      }), o6.onopen = () => {
        this.onOpen(o6), t3(o6);
      };
    });
  }
  onOpen(e4) {
    e4.onmessage = (t3) => this.onPayload(t3), e4.onclose = (t3) => this.onClose(t3), this.socket = e4, this.registering = false, this.events.emit("open");
  }
  onClose(e4) {
    this.socket = void 0, this.registering = false, this.events.emit("close", e4);
  }
  onPayload(e4) {
    if (typeof e4.data > "u") return;
    const t3 = typeof e4.data == "string" ? safeJsonParse5(e4.data) : e4.data;
    this.events.emit("payload", t3);
  }
  onError(e4, t3) {
    const n7 = this.parseError(t3), s5 = n7.message || n7.toString(), o6 = formatJsonRpcError(e4, s5);
    this.events.emit("payload", o6);
  }
  parseError(e4, t3 = this.url) {
    return parseConnectionError(e4, d5(t3), "WS");
  }
  resetMaxListeners() {
    this.events.getMaxListeners() > h6 && this.events.setMaxListeners(h6);
  }
  emitError(e4) {
    const t3 = this.parseError(new Error((e4 == null ? void 0 : e4.message) || `WebSocket connection failed for host: ${d5(this.url)}`));
    return this.events.emit("register_error", t3), t3;
  }
};

// node_modules/@walletconnect/core/dist/index.es.js
var import_lodash = __toESM(require_lodash());
var import_window_getters2 = __toESM(require_cjs8());
var xe3 = "wc";
var Oe3 = 2;
var he2 = "core";
var B3 = `${xe3}@2:${he2}:`;
var mt2 = { name: he2, logger: "error" };
var vt3 = { database: ":memory:" };
var ft3 = "crypto";
var Ae3 = "client_ed25519_seed";
var _t3 = import_time4.ONE_DAY;
var Et3 = "keychain";
var wt3 = "0.3";
var It3 = "messages";
var Tt2 = "0.3";
var Ne3 = import_time4.SIX_HOURS;
var Ct2 = "publisher";
var Pt3 = "irn";
var St3 = "error";
var $e3 = "wss://relay.walletconnect.org";
var Rt3 = "relayer";
var T5 = { message: "relayer_message", message_ack: "relayer_message_ack", connect: "relayer_connect", disconnect: "relayer_disconnect", error: "relayer_error", connection_stalled: "relayer_connection_stalled", transport_closed: "relayer_transport_closed", publish: "relayer_publish" };
var xt3 = "_subscription";
var L4 = { payload: "payload", connect: "connect", disconnect: "disconnect", error: "error" };
var Ot3 = 0.1;
var me3 = "2.19.0";
var Q4 = { link_mode: "link_mode", relay: "relay" };
var At2 = "0.3";
var Nt3 = "WALLETCONNECT_CLIENT_ID";
var ze3 = "WALLETCONNECT_LINK_MODE_APPS";
var $3 = { created: "subscription_created", deleted: "subscription_deleted", expired: "subscription_expired", disabled: "subscription_disabled", sync: "subscription_sync", resubscribed: "subscription_resubscribed" };
var $t2 = "subscription";
var zt3 = "0.3";
var Lt3 = import_time4.FIVE_SECONDS * 1e3;
var kt3 = "pairing";
var Ut3 = "0.3";
var ie2 = { wc_pairingDelete: { req: { ttl: import_time4.ONE_DAY, prompt: false, tag: 1e3 }, res: { ttl: import_time4.ONE_DAY, prompt: false, tag: 1001 } }, wc_pairingPing: { req: { ttl: import_time4.THIRTY_SECONDS, prompt: false, tag: 1002 }, res: { ttl: import_time4.THIRTY_SECONDS, prompt: false, tag: 1003 } }, unregistered_method: { req: { ttl: import_time4.ONE_DAY, prompt: false, tag: 0 }, res: { ttl: import_time4.ONE_DAY, prompt: false, tag: 0 } } };
var se2 = { create: "pairing_create", expire: "pairing_expire", delete: "pairing_delete", ping: "pairing_ping" };
var F4 = { created: "history_created", updated: "history_updated", deleted: "history_deleted", sync: "history_sync" };
var Ft3 = "history";
var Mt2 = "0.3";
var Kt2 = "expirer";
var M6 = { created: "expirer_created", deleted: "expirer_deleted", expired: "expirer_expired", sync: "expirer_sync" };
var Bt3 = "0.3";
var jt3 = "verify-api";
var js2 = "https://verify.walletconnect.com";
var Vt2 = "https://verify.walletconnect.org";
var le3 = Vt2;
var qt2 = `${le3}/v3`;
var Gt3 = [js2, Vt2];
var Ht2 = "echo";
var Yt3 = "https://echo.walletconnect.com";
var q4 = { pairing_started: "pairing_started", pairing_uri_validation_success: "pairing_uri_validation_success", pairing_uri_not_expired: "pairing_uri_not_expired", store_new_pairing: "store_new_pairing", subscribing_pairing_topic: "subscribing_pairing_topic", subscribe_pairing_topic_success: "subscribe_pairing_topic_success", existing_pairing: "existing_pairing", pairing_not_expired: "pairing_not_expired", emit_inactive_pairing: "emit_inactive_pairing", emit_session_proposal: "emit_session_proposal", subscribing_to_pairing_topic: "subscribing_to_pairing_topic" };
var J4 = { no_wss_connection: "no_wss_connection", no_internet_connection: "no_internet_connection", malformed_pairing_uri: "malformed_pairing_uri", active_pairing_already_exists: "active_pairing_already_exists", subscribe_pairing_topic_failure: "subscribe_pairing_topic_failure", pairing_expired: "pairing_expired", proposal_expired: "proposal_expired", proposal_listener_not_found: "proposal_listener_not_found" };
var qs2 = { session_approve_started: "session_approve_started", proposal_not_expired: "proposal_not_expired", session_namespaces_validation_success: "session_namespaces_validation_success", create_session_topic: "create_session_topic", subscribing_session_topic: "subscribing_session_topic", subscribe_session_topic_success: "subscribe_session_topic_success", publishing_session_approve: "publishing_session_approve", session_approve_publish_success: "session_approve_publish_success", store_session: "store_session", publishing_session_settle: "publishing_session_settle", session_settle_publish_success: "session_settle_publish_success" };
var Gs2 = { no_internet_connection: "no_internet_connection", no_wss_connection: "no_wss_connection", proposal_expired: "proposal_expired", subscribe_session_topic_failure: "subscribe_session_topic_failure", session_approve_publish_failure: "session_approve_publish_failure", session_settle_publish_failure: "session_settle_publish_failure", session_approve_namespace_validation_failure: "session_approve_namespace_validation_failure", proposal_not_found: "proposal_not_found" };
var Hs2 = { authenticated_session_approve_started: "authenticated_session_approve_started", authenticated_session_not_expired: "authenticated_session_not_expired", chains_caip2_compliant: "chains_caip2_compliant", chains_evm_compliant: "chains_evm_compliant", create_authenticated_session_topic: "create_authenticated_session_topic", cacaos_verified: "cacaos_verified", store_authenticated_session: "store_authenticated_session", subscribing_authenticated_session_topic: "subscribing_authenticated_session_topic", subscribe_authenticated_session_topic_success: "subscribe_authenticated_session_topic_success", publishing_authenticated_session_approve: "publishing_authenticated_session_approve", authenticated_session_approve_publish_success: "authenticated_session_approve_publish_success" };
var Ys2 = { no_internet_connection: "no_internet_connection", no_wss_connection: "no_wss_connection", missing_session_authenticate_request: "missing_session_authenticate_request", session_authenticate_request_expired: "session_authenticate_request_expired", chains_caip2_compliant_failure: "chains_caip2_compliant_failure", chains_evm_compliant_failure: "chains_evm_compliant_failure", invalid_cacao: "invalid_cacao", subscribe_authenticated_session_topic_failure: "subscribe_authenticated_session_topic_failure", authenticated_session_approve_publish_failure: "authenticated_session_approve_publish_failure", authenticated_session_pending_request_not_found: "authenticated_session_pending_request_not_found" };
var Jt3 = 0.1;
var Xt2 = "event-client";
var Wt3 = 86400;
var Zt2 = "https://pulse.walletconnect.org/batch";
function Js2(n7, e4) {
  if (n7.length >= 255) throw new TypeError("Alphabet too long");
  for (var t3 = new Uint8Array(256), s5 = 0; s5 < t3.length; s5++) t3[s5] = 255;
  for (var i6 = 0; i6 < n7.length; i6++) {
    var r5 = n7.charAt(i6), o6 = r5.charCodeAt(0);
    if (t3[o6] !== 255) throw new TypeError(r5 + " is ambiguous");
    t3[o6] = i6;
  }
  var a5 = n7.length, c8 = n7.charAt(0), h7 = Math.log(a5) / Math.log(256), u4 = Math.log(256) / Math.log(a5);
  function g5(l9) {
    if (l9 instanceof Uint8Array || (ArrayBuffer.isView(l9) ? l9 = new Uint8Array(l9.buffer, l9.byteOffset, l9.byteLength) : Array.isArray(l9) && (l9 = Uint8Array.from(l9))), !(l9 instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
    if (l9.length === 0) return "";
    for (var y6 = 0, O5 = 0, w6 = 0, v7 = l9.length; w6 !== v7 && l9[w6] === 0; ) w6++, y6++;
    for (var k7 = (v7 - w6) * u4 + 1 >>> 0, I5 = new Uint8Array(k7); w6 !== v7; ) {
      for (var V4 = l9[w6], X2 = 0, K5 = k7 - 1; (V4 !== 0 || X2 < O5) && K5 !== -1; K5--, X2++) V4 += 256 * I5[K5] >>> 0, I5[K5] = V4 % a5 >>> 0, V4 = V4 / a5 >>> 0;
      if (V4 !== 0) throw new Error("Non-zero carry");
      O5 = X2, w6++;
    }
    for (var Y4 = k7 - O5; Y4 !== k7 && I5[Y4] === 0; ) Y4++;
    for (var ge2 = c8.repeat(y6); Y4 < k7; ++Y4) ge2 += n7.charAt(I5[Y4]);
    return ge2;
  }
  function m5(l9) {
    if (typeof l9 != "string") throw new TypeError("Expected String");
    if (l9.length === 0) return new Uint8Array();
    var y6 = 0;
    if (l9[y6] !== " ") {
      for (var O5 = 0, w6 = 0; l9[y6] === c8; ) O5++, y6++;
      for (var v7 = (l9.length - y6) * h7 + 1 >>> 0, k7 = new Uint8Array(v7); l9[y6]; ) {
        var I5 = t3[l9.charCodeAt(y6)];
        if (I5 === 255) return;
        for (var V4 = 0, X2 = v7 - 1; (I5 !== 0 || V4 < w6) && X2 !== -1; X2--, V4++) I5 += a5 * k7[X2] >>> 0, k7[X2] = I5 % 256 >>> 0, I5 = I5 / 256 >>> 0;
        if (I5 !== 0) throw new Error("Non-zero carry");
        w6 = V4, y6++;
      }
      if (l9[y6] !== " ") {
        for (var K5 = v7 - w6; K5 !== v7 && k7[K5] === 0; ) K5++;
        for (var Y4 = new Uint8Array(O5 + (v7 - K5)), ge2 = O5; K5 !== v7; ) Y4[ge2++] = k7[K5++];
        return Y4;
      }
    }
  }
  function A6(l9) {
    var y6 = m5(l9);
    if (y6) return y6;
    throw new Error(`Non-${e4} character`);
  }
  return { encode: g5, decodeUnsafe: m5, decode: A6 };
}
var Xs2 = Js2;
var Ws2 = Xs2;
var Qt2 = (n7) => {
  if (n7 instanceof Uint8Array && n7.constructor.name === "Uint8Array") return n7;
  if (n7 instanceof ArrayBuffer) return new Uint8Array(n7);
  if (ArrayBuffer.isView(n7)) return new Uint8Array(n7.buffer, n7.byteOffset, n7.byteLength);
  throw new Error("Unknown type, must be binary type");
};
var Zs2 = (n7) => new TextEncoder().encode(n7);
var Qs2 = (n7) => new TextDecoder().decode(n7);
var er3 = class {
  constructor(e4, t3, s5) {
    this.name = e4, this.prefix = t3, this.baseEncode = s5;
  }
  encode(e4) {
    if (e4 instanceof Uint8Array) return `${this.prefix}${this.baseEncode(e4)}`;
    throw Error("Unknown type, must be binary type");
  }
};
var tr3 = class {
  constructor(e4, t3, s5) {
    if (this.name = e4, this.prefix = t3, t3.codePointAt(0) === void 0) throw new Error("Invalid prefix character");
    this.prefixCodePoint = t3.codePointAt(0), this.baseDecode = s5;
  }
  decode(e4) {
    if (typeof e4 == "string") {
      if (e4.codePointAt(0) !== this.prefixCodePoint) throw Error(`Unable to decode multibase string ${JSON.stringify(e4)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      return this.baseDecode(e4.slice(this.prefix.length));
    } else throw Error("Can only multibase decode strings");
  }
  or(e4) {
    return ei2(this, e4);
  }
};
var ir3 = class {
  constructor(e4) {
    this.decoders = e4;
  }
  or(e4) {
    return ei2(this, e4);
  }
  decode(e4) {
    const t3 = e4[0], s5 = this.decoders[t3];
    if (s5) return s5.decode(e4);
    throw RangeError(`Unable to decode multibase string ${JSON.stringify(e4)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
  }
};
var ei2 = (n7, e4) => new ir3({ ...n7.decoders || { [n7.prefix]: n7 }, ...e4.decoders || { [e4.prefix]: e4 } });
var sr3 = class {
  constructor(e4, t3, s5, i6) {
    this.name = e4, this.prefix = t3, this.baseEncode = s5, this.baseDecode = i6, this.encoder = new er3(e4, t3, s5), this.decoder = new tr3(e4, t3, i6);
  }
  encode(e4) {
    return this.encoder.encode(e4);
  }
  decode(e4) {
    return this.decoder.decode(e4);
  }
};
var ve3 = ({ name: n7, prefix: e4, encode: t3, decode: s5 }) => new sr3(n7, e4, t3, s5);
var ue2 = ({ prefix: n7, name: e4, alphabet: t3 }) => {
  const { encode: s5, decode: i6 } = Ws2(t3, e4);
  return ve3({ prefix: n7, name: e4, encode: s5, decode: (r5) => Qt2(i6(r5)) });
};
var rr3 = (n7, e4, t3, s5) => {
  const i6 = {};
  for (let u4 = 0; u4 < e4.length; ++u4) i6[e4[u4]] = u4;
  let r5 = n7.length;
  for (; n7[r5 - 1] === "="; ) --r5;
  const o6 = new Uint8Array(r5 * t3 / 8 | 0);
  let a5 = 0, c8 = 0, h7 = 0;
  for (let u4 = 0; u4 < r5; ++u4) {
    const g5 = i6[n7[u4]];
    if (g5 === void 0) throw new SyntaxError(`Non-${s5} character`);
    c8 = c8 << t3 | g5, a5 += t3, a5 >= 8 && (a5 -= 8, o6[h7++] = 255 & c8 >> a5);
  }
  if (a5 >= t3 || 255 & c8 << 8 - a5) throw new SyntaxError("Unexpected end of data");
  return o6;
};
var nr3 = (n7, e4, t3) => {
  const s5 = e4[e4.length - 1] === "=", i6 = (1 << t3) - 1;
  let r5 = "", o6 = 0, a5 = 0;
  for (let c8 = 0; c8 < n7.length; ++c8) for (a5 = a5 << 8 | n7[c8], o6 += 8; o6 > t3; ) o6 -= t3, r5 += e4[i6 & a5 >> o6];
  if (o6 && (r5 += e4[i6 & a5 << t3 - o6]), s5) for (; r5.length * t3 & 7; ) r5 += "=";
  return r5;
};
var C5 = ({ name: n7, prefix: e4, bitsPerChar: t3, alphabet: s5 }) => ve3({ prefix: e4, name: n7, encode(i6) {
  return nr3(i6, s5, t3);
}, decode(i6) {
  return rr3(i6, s5, t3, n7);
} });
var or4 = ve3({ prefix: "\0", name: "identity", encode: (n7) => Qs2(n7), decode: (n7) => Zs2(n7) });
var ar3 = Object.freeze({ __proto__: null, identity: or4 });
var cr3 = C5({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 });
var hr3 = Object.freeze({ __proto__: null, base2: cr3 });
var lr3 = C5({ prefix: "7", name: "base8", alphabet: "01234567", bitsPerChar: 3 });
var ur2 = Object.freeze({ __proto__: null, base8: lr3 });
var dr3 = ue2({ prefix: "9", name: "base10", alphabet: "0123456789" });
var pr2 = Object.freeze({ __proto__: null, base10: dr3 });
var gr3 = C5({ prefix: "f", name: "base16", alphabet: "0123456789abcdef", bitsPerChar: 4 });
var yr3 = C5({ prefix: "F", name: "base16upper", alphabet: "0123456789ABCDEF", bitsPerChar: 4 });
var br3 = Object.freeze({ __proto__: null, base16: gr3, base16upper: yr3 });
var Dr2 = C5({ prefix: "b", name: "base32", alphabet: "abcdefghijklmnopqrstuvwxyz234567", bitsPerChar: 5 });
var mr3 = C5({ prefix: "B", name: "base32upper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", bitsPerChar: 5 });
var vr3 = C5({ prefix: "c", name: "base32pad", alphabet: "abcdefghijklmnopqrstuvwxyz234567=", bitsPerChar: 5 });
var fr2 = C5({ prefix: "C", name: "base32padupper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=", bitsPerChar: 5 });
var _r3 = C5({ prefix: "v", name: "base32hex", alphabet: "0123456789abcdefghijklmnopqrstuv", bitsPerChar: 5 });
var Er3 = C5({ prefix: "V", name: "base32hexupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV", bitsPerChar: 5 });
var wr3 = C5({ prefix: "t", name: "base32hexpad", alphabet: "0123456789abcdefghijklmnopqrstuv=", bitsPerChar: 5 });
var Ir3 = C5({ prefix: "T", name: "base32hexpadupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=", bitsPerChar: 5 });
var Tr3 = C5({ prefix: "h", name: "base32z", alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769", bitsPerChar: 5 });
var Cr2 = Object.freeze({ __proto__: null, base32: Dr2, base32upper: mr3, base32pad: vr3, base32padupper: fr2, base32hex: _r3, base32hexupper: Er3, base32hexpad: wr3, base32hexpadupper: Ir3, base32z: Tr3 });
var Pr2 = ue2({ prefix: "k", name: "base36", alphabet: "0123456789abcdefghijklmnopqrstuvwxyz" });
var Sr3 = ue2({ prefix: "K", name: "base36upper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" });
var Rr3 = Object.freeze({ __proto__: null, base36: Pr2, base36upper: Sr3 });
var xr3 = ue2({ name: "base58btc", prefix: "z", alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz" });
var Or3 = ue2({ name: "base58flickr", prefix: "Z", alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ" });
var Ar3 = Object.freeze({ __proto__: null, base58btc: xr3, base58flickr: Or3 });
var Nr3 = C5({ prefix: "m", name: "base64", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", bitsPerChar: 6 });
var $r3 = C5({ prefix: "M", name: "base64pad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", bitsPerChar: 6 });
var zr3 = C5({ prefix: "u", name: "base64url", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bitsPerChar: 6 });
var Lr3 = C5({ prefix: "U", name: "base64urlpad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=", bitsPerChar: 6 });
var kr3 = Object.freeze({ __proto__: null, base64: Nr3, base64pad: $r3, base64url: zr3, base64urlpad: Lr3 });
var ti2 = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂");
var Ur3 = ti2.reduce((n7, e4, t3) => (n7[t3] = e4, n7), []);
var Fr2 = ti2.reduce((n7, e4, t3) => (n7[e4.codePointAt(0)] = t3, n7), []);
function Mr2(n7) {
  return n7.reduce((e4, t3) => (e4 += Ur3[t3], e4), "");
}
function Kr3(n7) {
  const e4 = [];
  for (const t3 of n7) {
    const s5 = Fr2[t3.codePointAt(0)];
    if (s5 === void 0) throw new Error(`Non-base256emoji character: ${t3}`);
    e4.push(s5);
  }
  return new Uint8Array(e4);
}
var Br3 = ve3({ prefix: "🚀", name: "base256emoji", encode: Mr2, decode: Kr3 });
var jr2 = Object.freeze({ __proto__: null, base256emoji: Br3 });
var Vr2 = si2;
var ii2 = 128;
var qr2 = 127;
var Gr2 = ~qr2;
var Hr2 = Math.pow(2, 31);
function si2(n7, e4, t3) {
  e4 = e4 || [], t3 = t3 || 0;
  for (var s5 = t3; n7 >= Hr2; ) e4[t3++] = n7 & 255 | ii2, n7 /= 128;
  for (; n7 & Gr2; ) e4[t3++] = n7 & 255 | ii2, n7 >>>= 7;
  return e4[t3] = n7 | 0, si2.bytes = t3 - s5 + 1, e4;
}
var Yr3 = Le3;
var Jr3 = 128;
var ri2 = 127;
function Le3(n7, s5) {
  var t3 = 0, s5 = s5 || 0, i6 = 0, r5 = s5, o6, a5 = n7.length;
  do {
    if (r5 >= a5) throw Le3.bytes = 0, new RangeError("Could not decode varint");
    o6 = n7[r5++], t3 += i6 < 28 ? (o6 & ri2) << i6 : (o6 & ri2) * Math.pow(2, i6), i6 += 7;
  } while (o6 >= Jr3);
  return Le3.bytes = r5 - s5, t3;
}
var Xr2 = Math.pow(2, 7);
var Wr3 = Math.pow(2, 14);
var Zr3 = Math.pow(2, 21);
var Qr2 = Math.pow(2, 28);
var en3 = Math.pow(2, 35);
var tn2 = Math.pow(2, 42);
var sn3 = Math.pow(2, 49);
var rn3 = Math.pow(2, 56);
var nn3 = Math.pow(2, 63);
var on3 = function(n7) {
  return n7 < Xr2 ? 1 : n7 < Wr3 ? 2 : n7 < Zr3 ? 3 : n7 < Qr2 ? 4 : n7 < en3 ? 5 : n7 < tn2 ? 6 : n7 < sn3 ? 7 : n7 < rn3 ? 8 : n7 < nn3 ? 9 : 10;
};
var an2 = { encode: Vr2, decode: Yr3, encodingLength: on3 };
var ni2 = an2;
var oi2 = (n7, e4, t3 = 0) => (ni2.encode(n7, e4, t3), e4);
var ai2 = (n7) => ni2.encodingLength(n7);
var ke3 = (n7, e4) => {
  const t3 = e4.byteLength, s5 = ai2(n7), i6 = s5 + ai2(t3), r5 = new Uint8Array(i6 + t3);
  return oi2(n7, r5, 0), oi2(t3, r5, s5), r5.set(e4, i6), new cn2(n7, t3, e4, r5);
};
var cn2 = class {
  constructor(e4, t3, s5, i6) {
    this.code = e4, this.size = t3, this.digest = s5, this.bytes = i6;
  }
};
var ci2 = ({ name: n7, code: e4, encode: t3 }) => new hn2(n7, e4, t3);
var hn2 = class {
  constructor(e4, t3, s5) {
    this.name = e4, this.code = t3, this.encode = s5;
  }
  digest(e4) {
    if (e4 instanceof Uint8Array) {
      const t3 = this.encode(e4);
      return t3 instanceof Uint8Array ? ke3(this.code, t3) : t3.then((s5) => ke3(this.code, s5));
    } else throw Error("Unknown type, must be binary type");
  }
};
var hi2 = (n7) => async (e4) => new Uint8Array(await crypto.subtle.digest(n7, e4));
var ln2 = ci2({ name: "sha2-256", code: 18, encode: hi2("SHA-256") });
var un2 = ci2({ name: "sha2-512", code: 19, encode: hi2("SHA-512") });
var dn2 = Object.freeze({ __proto__: null, sha256: ln2, sha512: un2 });
var li2 = 0;
var pn2 = "identity";
var ui2 = Qt2;
var gn3 = (n7) => ke3(li2, ui2(n7));
var yn3 = { code: li2, name: pn2, encode: ui2, digest: gn3 };
var bn3 = Object.freeze({ __proto__: null, identity: yn3 });
new TextEncoder(), new TextDecoder();
var di2 = { ...ar3, ...hr3, ...ur2, ...pr2, ...br3, ...Cr2, ...Rr3, ...Ar3, ...kr3, ...jr2 };
({ ...dn2, ...bn3 });
function Dn2(n7 = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? globalThis.Buffer.allocUnsafe(n7) : new Uint8Array(n7);
}
function pi2(n7, e4, t3, s5) {
  return { name: n7, prefix: e4, encoder: { name: n7, prefix: e4, encode: t3 }, decoder: { decode: s5 } };
}
var gi2 = pi2("utf8", "u", (n7) => "u" + new TextDecoder("utf8").decode(n7), (n7) => new TextEncoder().encode(n7.substring(1)));
var Ue3 = pi2("ascii", "a", (n7) => {
  let e4 = "a";
  for (let t3 = 0; t3 < n7.length; t3++) e4 += String.fromCharCode(n7[t3]);
  return e4;
}, (n7) => {
  n7 = n7.substring(1);
  const e4 = Dn2(n7.length);
  for (let t3 = 0; t3 < n7.length; t3++) e4[t3] = n7.charCodeAt(t3);
  return e4;
});
var mn3 = { utf8: gi2, "utf-8": gi2, hex: di2.base16, latin1: Ue3, ascii: Ue3, binary: Ue3, ...di2 };
function vn3(n7, e4 = "utf8") {
  const t3 = mn3[e4];
  if (!t3) throw new Error(`Unsupported encoding "${e4}"`);
  return (e4 === "utf8" || e4 === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(n7, "utf8") : t3.decoder.decode(`${t3.prefix}${n7}`);
}
var fn2 = Object.defineProperty;
var _n3 = (n7, e4, t3) => e4 in n7 ? fn2(n7, e4, { enumerable: true, configurable: true, writable: true, value: t3 }) : n7[e4] = t3;
var G3 = (n7, e4, t3) => _n3(n7, typeof e4 != "symbol" ? e4 + "" : e4, t3);
var yi2 = class {
  constructor(e4, t3) {
    this.core = e4, this.logger = t3, G3(this, "keychain", /* @__PURE__ */ new Map()), G3(this, "name", Et3), G3(this, "version", wt3), G3(this, "initialized", false), G3(this, "storagePrefix", B3), G3(this, "init", async () => {
      if (!this.initialized) {
        const s5 = await this.getKeyChain();
        typeof s5 < "u" && (this.keychain = s5), this.initialized = true;
      }
    }), G3(this, "has", (s5) => (this.isInitialized(), this.keychain.has(s5))), G3(this, "set", async (s5, i6) => {
      this.isInitialized(), this.keychain.set(s5, i6), await this.persist();
    }), G3(this, "get", (s5) => {
      this.isInitialized();
      const i6 = this.keychain.get(s5);
      if (typeof i6 > "u") {
        const { message: r5 } = te2("NO_MATCHING_KEY", `${this.name}: ${s5}`);
        throw new Error(r5);
      }
      return i6;
    }), G3(this, "del", async (s5) => {
      this.isInitialized(), this.keychain.delete(s5), await this.persist();
    }), this.core = e4, this.logger = E5(t3, this.name);
  }
  get context() {
    return y4(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  async setKeyChain(e4) {
    await this.core.storage.setItem(this.storageKey, no2(e4));
  }
  async getKeyChain() {
    const e4 = await this.core.storage.getItem(this.storageKey);
    return typeof e4 < "u" ? ro2(e4) : void 0;
  }
  async persist() {
    await this.setKeyChain(this.keychain);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e4 } = te2("NOT_INITIALIZED", this.name);
      throw new Error(e4);
    }
  }
};
var En3 = Object.defineProperty;
var wn2 = (n7, e4, t3) => e4 in n7 ? En3(n7, e4, { enumerable: true, configurable: true, writable: true, value: t3 }) : n7[e4] = t3;
var P5 = (n7, e4, t3) => wn2(n7, typeof e4 != "symbol" ? e4 + "" : e4, t3);
var bi2 = class {
  constructor(e4, t3, s5) {
    this.core = e4, this.logger = t3, P5(this, "name", ft3), P5(this, "keychain"), P5(this, "randomSessionIdentifier", ni()), P5(this, "initialized", false), P5(this, "init", async () => {
      this.initialized || (await this.keychain.init(), this.initialized = true);
    }), P5(this, "hasKeys", (i6) => (this.isInitialized(), this.keychain.has(i6))), P5(this, "getClientId", async () => {
      this.isInitialized();
      const i6 = await this.getClientSeed(), r5 = Po(i6);
      return Qe(r5.publicKey);
    }), P5(this, "generateKeyPair", () => {
      this.isInitialized();
      const i6 = ti();
      return this.setPrivateKey(i6.publicKey, i6.privateKey);
    }), P5(this, "signJWT", async (i6) => {
      this.isInitialized();
      const r5 = await this.getClientSeed(), o6 = Po(r5), a5 = this.randomSessionIdentifier, c8 = _t3;
      return await Qo(a5, i6, c8, o6);
    }), P5(this, "generateSharedKey", (i6, r5, o6) => {
      this.isInitialized();
      const a5 = this.getPrivateKey(i6), c8 = ri(a5, r5);
      return this.setSymKey(c8, o6);
    }), P5(this, "setSymKey", async (i6, r5) => {
      this.isInitialized();
      const o6 = r5 || oi(i6);
      return await this.keychain.set(o6, i6), o6;
    }), P5(this, "deleteKeyPair", async (i6) => {
      this.isInitialized(), await this.keychain.del(i6);
    }), P5(this, "deleteSymKey", async (i6) => {
      this.isInitialized(), await this.keychain.del(i6);
    }), P5(this, "encode", async (i6, r5, o6) => {
      this.isInitialized();
      const a5 = rr2(o6), c8 = safeJsonStringify3(r5);
      if (di(a5)) return ai(c8, o6 == null ? void 0 : o6.encoding);
      if (li(a5)) {
        const m5 = a5.senderPublicKey, A6 = a5.receiverPublicKey;
        i6 = await this.generateSharedKey(m5, A6);
      }
      const h7 = this.getSymKey(i6), { type: u4, senderPublicKey: g5 } = a5;
      return ii({ type: u4, symKey: h7, message: c8, senderPublicKey: g5, encoding: o6 == null ? void 0 : o6.encoding });
    }), P5(this, "decode", async (i6, r5, o6) => {
      this.isInitialized();
      const a5 = fi(r5, o6);
      if (di(a5)) {
        const c8 = ui(r5, o6 == null ? void 0 : o6.encoding);
        return safeJsonParse3(c8);
      }
      if (li(a5)) {
        const c8 = a5.receiverPublicKey, h7 = a5.senderPublicKey;
        i6 = await this.generateSharedKey(c8, h7);
      }
      try {
        const c8 = this.getSymKey(i6), h7 = ci({ symKey: c8, encoded: r5, encoding: o6 == null ? void 0 : o6.encoding });
        return safeJsonParse3(h7);
      } catch (c8) {
        this.logger.error(`Failed to decode message from topic: '${i6}', clientId: '${await this.getClientId()}'`), this.logger.error(c8);
      }
    }), P5(this, "getPayloadType", (i6, r5 = At) => {
      const o6 = Fe({ encoded: i6, encoding: r5 });
      return fe2(o6.type);
    }), P5(this, "getPayloadSenderPublicKey", (i6, r5 = At) => {
      const o6 = Fe({ encoded: i6, encoding: r5 });
      return o6.senderPublicKey ? toString3(o6.senderPublicKey, V2) : void 0;
    }), this.core = e4, this.logger = E5(t3, this.name), this.keychain = s5 || new yi2(this.core, this.logger);
  }
  get context() {
    return y4(this.logger);
  }
  async setPrivateKey(e4, t3) {
    return await this.keychain.set(e4, t3), e4;
  }
  getPrivateKey(e4) {
    return this.keychain.get(e4);
  }
  async getClientSeed() {
    let e4 = "";
    try {
      e4 = this.keychain.get(Ae3);
    } catch {
      e4 = ni(), await this.keychain.set(Ae3, e4);
    }
    return vn3(e4, "base16");
  }
  getSymKey(e4) {
    return this.keychain.get(e4);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e4 } = te2("NOT_INITIALIZED", this.name);
      throw new Error(e4);
    }
  }
};
var In3 = Object.defineProperty;
var Tn3 = (n7, e4, t3) => e4 in n7 ? In3(n7, e4, { enumerable: true, configurable: true, writable: true, value: t3 }) : n7[e4] = t3;
var H5 = (n7, e4, t3) => Tn3(n7, typeof e4 != "symbol" ? e4 + "" : e4, t3);
var Di2 = class extends y5 {
  constructor(e4, t3) {
    super(e4, t3), this.logger = e4, this.core = t3, H5(this, "messages", /* @__PURE__ */ new Map()), H5(this, "name", It3), H5(this, "version", Tt2), H5(this, "initialized", false), H5(this, "storagePrefix", B3), H5(this, "init", async () => {
      if (!this.initialized) {
        this.logger.trace("Initialized");
        try {
          const s5 = await this.getRelayerMessages();
          typeof s5 < "u" && (this.messages = s5), this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", size: this.messages.size });
        } catch (s5) {
          this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(s5);
        } finally {
          this.initialized = true;
        }
      }
    }), H5(this, "set", async (s5, i6) => {
      this.isInitialized();
      const r5 = si(i6);
      let o6 = this.messages.get(s5);
      return typeof o6 > "u" && (o6 = {}), typeof o6[r5] < "u" || (o6[r5] = i6, this.messages.set(s5, o6), await this.persist()), r5;
    }), H5(this, "get", (s5) => {
      this.isInitialized();
      let i6 = this.messages.get(s5);
      return typeof i6 > "u" && (i6 = {}), i6;
    }), H5(this, "has", (s5, i6) => {
      this.isInitialized();
      const r5 = this.get(s5), o6 = si(i6);
      return typeof r5[o6] < "u";
    }), H5(this, "del", async (s5) => {
      this.isInitialized(), this.messages.delete(s5), await this.persist();
    }), this.logger = E5(e4, this.name), this.core = t3;
  }
  get context() {
    return y4(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  async setRelayerMessages(e4) {
    await this.core.storage.setItem(this.storageKey, no2(e4));
  }
  async getRelayerMessages() {
    const e4 = await this.core.storage.getItem(this.storageKey);
    return typeof e4 < "u" ? ro2(e4) : void 0;
  }
  async persist() {
    await this.setRelayerMessages(this.messages);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e4 } = te2("NOT_INITIALIZED", this.name);
      throw new Error(e4);
    }
  }
};
var Cn3 = Object.defineProperty;
var Pn2 = Object.defineProperties;
var Sn2 = Object.getOwnPropertyDescriptors;
var mi2 = Object.getOwnPropertySymbols;
var Rn3 = Object.prototype.hasOwnProperty;
var xn3 = Object.prototype.propertyIsEnumerable;
var Fe2 = (n7, e4, t3) => e4 in n7 ? Cn3(n7, e4, { enumerable: true, configurable: true, writable: true, value: t3 }) : n7[e4] = t3;
var fe3 = (n7, e4) => {
  for (var t3 in e4 || (e4 = {})) Rn3.call(e4, t3) && Fe2(n7, t3, e4[t3]);
  if (mi2) for (var t3 of mi2(e4)) xn3.call(e4, t3) && Fe2(n7, t3, e4[t3]);
  return n7;
};
var Me3 = (n7, e4) => Pn2(n7, Sn2(e4));
var j5 = (n7, e4, t3) => Fe2(n7, typeof e4 != "symbol" ? e4 + "" : e4, t3);
var On3 = class extends m4 {
  constructor(e4, t3) {
    super(e4, t3), this.relayer = e4, this.logger = t3, j5(this, "events", new import_events7.EventEmitter()), j5(this, "name", Ct2), j5(this, "queue", /* @__PURE__ */ new Map()), j5(this, "publishTimeout", (0, import_time4.toMiliseconds)(import_time4.ONE_MINUTE)), j5(this, "initialPublishTimeout", (0, import_time4.toMiliseconds)(import_time4.ONE_SECOND * 15)), j5(this, "needsTransportRestart", false), j5(this, "publish", async (s5, i6, r5) => {
      var o6;
      this.logger.debug("Publishing Payload"), this.logger.trace({ type: "method", method: "publish", params: { topic: s5, message: i6, opts: r5 } });
      const a5 = (r5 == null ? void 0 : r5.ttl) || Ne3, c8 = yi(r5), h7 = (r5 == null ? void 0 : r5.prompt) || false, u4 = (r5 == null ? void 0 : r5.tag) || 0, g5 = (r5 == null ? void 0 : r5.id) || getBigIntRpcId().toString(), m5 = { topic: s5, message: i6, opts: { ttl: a5, relay: c8, prompt: h7, tag: u4, id: g5, attestation: r5 == null ? void 0 : r5.attestation, tvf: r5 == null ? void 0 : r5.tvf } }, A6 = `Failed to publish payload, please try again. id:${g5} tag:${u4}`;
      try {
        const l9 = new Promise(async (y6) => {
          const O5 = ({ id: v7 }) => {
            m5.opts.id === v7 && (this.removeRequestFromQueue(v7), this.relayer.events.removeListener(T5.publish, O5), y6(m5));
          };
          this.relayer.events.on(T5.publish, O5);
          const w6 = ao2(new Promise((v7, k7) => {
            this.rpcPublish({ topic: s5, message: i6, ttl: a5, prompt: h7, tag: u4, id: g5, attestation: r5 == null ? void 0 : r5.attestation, tvf: r5 == null ? void 0 : r5.tvf }).then(v7).catch((I5) => {
              this.logger.warn(I5, I5 == null ? void 0 : I5.message), k7(I5);
            });
          }), this.initialPublishTimeout, `Failed initial publish, retrying.... id:${g5} tag:${u4}`);
          try {
            await w6, this.events.removeListener(T5.publish, O5);
          } catch (v7) {
            this.queue.set(g5, Me3(fe3({}, m5), { attempt: 1 })), this.logger.warn(v7, v7 == null ? void 0 : v7.message);
          }
        });
        this.logger.trace({ type: "method", method: "publish", params: { id: g5, topic: s5, message: i6, opts: r5 } }), await ao2(l9, this.publishTimeout, A6);
      } catch (l9) {
        if (this.logger.debug("Failed to Publish Payload"), this.logger.error(l9), (o6 = r5 == null ? void 0 : r5.internal) != null && o6.throwOnFailedPublish) throw l9;
      } finally {
        this.queue.delete(g5);
      }
    }), j5(this, "on", (s5, i6) => {
      this.events.on(s5, i6);
    }), j5(this, "once", (s5, i6) => {
      this.events.once(s5, i6);
    }), j5(this, "off", (s5, i6) => {
      this.events.off(s5, i6);
    }), j5(this, "removeListener", (s5, i6) => {
      this.events.removeListener(s5, i6);
    }), this.relayer = e4, this.logger = E5(t3, this.name), this.registerEventListeners();
  }
  get context() {
    return y4(this.logger);
  }
  async rpcPublish(e4) {
    var t3, s5, i6, r5;
    const { topic: o6, message: a5, ttl: c8 = Ne3, prompt: h7, tag: u4, id: g5, attestation: m5, tvf: A6 } = e4, l9 = { method: mi(yi().protocol).publish, params: fe3({ topic: o6, message: a5, ttl: c8, prompt: h7, tag: u4, attestation: m5 }, A6), id: g5 };
    ae((t3 = l9.params) == null ? void 0 : t3.prompt) && ((s5 = l9.params) == null || delete s5.prompt), ae((i6 = l9.params) == null ? void 0 : i6.tag) && ((r5 = l9.params) == null || delete r5.tag), this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "message", direction: "outgoing", request: l9 });
    const y6 = await this.relayer.request(l9);
    return this.relayer.events.emit(T5.publish, e4), this.logger.debug("Successfully Published Payload"), y6;
  }
  removeRequestFromQueue(e4) {
    this.queue.delete(e4);
  }
  checkQueue() {
    this.queue.forEach(async (e4, t3) => {
      const s5 = e4.attempt + 1;
      this.queue.set(t3, Me3(fe3({}, e4), { attempt: s5 }));
      const { topic: i6, message: r5, opts: o6, attestation: a5 } = e4;
      this.logger.warn({}, `Publisher: queue->publishing: ${e4.opts.id}, tag: ${e4.opts.tag}, attempt: ${s5}`), await this.rpcPublish(Me3(fe3({}, e4), { topic: i6, message: r5, ttl: o6.ttl, prompt: o6.prompt, tag: o6.tag, id: o6.id, attestation: a5, tvf: o6.tvf })), this.logger.warn({}, `Publisher: queue->published: ${e4.opts.id}`);
    });
  }
  registerEventListeners() {
    this.relayer.core.heartbeat.on(r3.pulse, () => {
      if (this.needsTransportRestart) {
        this.needsTransportRestart = false, this.relayer.events.emit(T5.connection_stalled);
        return;
      }
      this.checkQueue();
    }), this.relayer.on(T5.message_ack, (e4) => {
      this.removeRequestFromQueue(e4.id.toString());
    });
  }
};
var An2 = Object.defineProperty;
var Nn2 = (n7, e4, t3) => e4 in n7 ? An2(n7, e4, { enumerable: true, configurable: true, writable: true, value: t3 }) : n7[e4] = t3;
var re2 = (n7, e4, t3) => Nn2(n7, typeof e4 != "symbol" ? e4 + "" : e4, t3);
var $n2 = class {
  constructor() {
    re2(this, "map", /* @__PURE__ */ new Map()), re2(this, "set", (e4, t3) => {
      const s5 = this.get(e4);
      this.exists(e4, t3) || this.map.set(e4, [...s5, t3]);
    }), re2(this, "get", (e4) => this.map.get(e4) || []), re2(this, "exists", (e4, t3) => this.get(e4).includes(t3)), re2(this, "delete", (e4, t3) => {
      if (typeof t3 > "u") {
        this.map.delete(e4);
        return;
      }
      if (!this.map.has(e4)) return;
      const s5 = this.get(e4);
      if (!this.exists(e4, t3)) return;
      const i6 = s5.filter((r5) => r5 !== t3);
      if (!i6.length) {
        this.map.delete(e4);
        return;
      }
      this.map.set(e4, i6);
    }), re2(this, "clear", () => {
      this.map.clear();
    });
  }
  get topics() {
    return Array.from(this.map.keys());
  }
};
var zn3 = Object.defineProperty;
var Ln3 = Object.defineProperties;
var kn3 = Object.getOwnPropertyDescriptors;
var vi = Object.getOwnPropertySymbols;
var Un3 = Object.prototype.hasOwnProperty;
var Fn3 = Object.prototype.propertyIsEnumerable;
var Ke3 = (n7, e4, t3) => e4 in n7 ? zn3(n7, e4, { enumerable: true, configurable: true, writable: true, value: t3 }) : n7[e4] = t3;
var de3 = (n7, e4) => {
  for (var t3 in e4 || (e4 = {})) Un3.call(e4, t3) && Ke3(n7, t3, e4[t3]);
  if (vi) for (var t3 of vi(e4)) Fn3.call(e4, t3) && Ke3(n7, t3, e4[t3]);
  return n7;
};
var Be2 = (n7, e4) => Ln3(n7, kn3(e4));
var D4 = (n7, e4, t3) => Ke3(n7, typeof e4 != "symbol" ? e4 + "" : e4, t3);
var fi2 = class extends P3 {
  constructor(e4, t3) {
    super(e4, t3), this.relayer = e4, this.logger = t3, D4(this, "subscriptions", /* @__PURE__ */ new Map()), D4(this, "topicMap", new $n2()), D4(this, "events", new import_events7.EventEmitter()), D4(this, "name", $t2), D4(this, "version", zt3), D4(this, "pending", /* @__PURE__ */ new Map()), D4(this, "cached", []), D4(this, "initialized", false), D4(this, "pendingSubscriptionWatchLabel", "pending_sub_watch_label"), D4(this, "pollingInterval", 20), D4(this, "storagePrefix", B3), D4(this, "subscribeTimeout", (0, import_time4.toMiliseconds)(import_time4.ONE_MINUTE)), D4(this, "initialSubscribeTimeout", (0, import_time4.toMiliseconds)(import_time4.ONE_SECOND * 15)), D4(this, "clientId"), D4(this, "batchSubscribeTopicsLimit", 500), D4(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), this.registerEventListeners(), await this.restore()), this.initialized = true;
    }), D4(this, "subscribe", async (s5, i6) => {
      this.isInitialized(), this.logger.debug("Subscribing Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: s5, opts: i6 } });
      try {
        const r5 = yi(i6), o6 = { topic: s5, relay: r5, transportType: i6 == null ? void 0 : i6.transportType };
        this.pending.set(s5, o6);
        const a5 = await this.rpcSubscribe(s5, r5, i6);
        return typeof a5 == "string" && (this.onSubscribe(a5, o6), this.logger.debug("Successfully Subscribed Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: s5, opts: i6 } })), a5;
      } catch (r5) {
        throw this.logger.debug("Failed to Subscribe Topic"), this.logger.error(r5), r5;
      }
    }), D4(this, "unsubscribe", async (s5, i6) => {
      this.isInitialized(), typeof (i6 == null ? void 0 : i6.id) < "u" ? await this.unsubscribeById(s5, i6.id, i6) : await this.unsubscribeByTopic(s5, i6);
    }), D4(this, "isSubscribed", async (s5) => {
      if (this.topics.includes(s5)) return true;
      const i6 = `${this.pendingSubscriptionWatchLabel}_${s5}`;
      return await new Promise((r5, o6) => {
        const a5 = new import_time4.Watch();
        a5.start(i6);
        const c8 = setInterval(() => {
          (!this.pending.has(s5) && this.topics.includes(s5) || this.cached.some((h7) => h7.topic === s5)) && (clearInterval(c8), a5.stop(i6), r5(true)), a5.elapsed(i6) >= Lt3 && (clearInterval(c8), a5.stop(i6), o6(new Error("Subscription resolution timeout")));
        }, this.pollingInterval);
      }).catch(() => false);
    }), D4(this, "on", (s5, i6) => {
      this.events.on(s5, i6);
    }), D4(this, "once", (s5, i6) => {
      this.events.once(s5, i6);
    }), D4(this, "off", (s5, i6) => {
      this.events.off(s5, i6);
    }), D4(this, "removeListener", (s5, i6) => {
      this.events.removeListener(s5, i6);
    }), D4(this, "start", async () => {
      await this.onConnect();
    }), D4(this, "stop", async () => {
      await this.onDisconnect();
    }), D4(this, "restart", async () => {
      await this.restore(), await this.onRestart();
    }), D4(this, "checkPending", async () => {
      if (this.pending.size === 0 && (!this.initialized || !this.relayer.connected)) return;
      const s5 = [];
      this.pending.forEach((i6) => {
        s5.push(i6);
      }), await this.batchSubscribe(s5);
    }), D4(this, "registerEventListeners", () => {
      this.relayer.core.heartbeat.on(r3.pulse, async () => {
        await this.checkPending();
      }), this.events.on($3.created, async (s5) => {
        const i6 = $3.created;
        this.logger.info(`Emitting ${i6}`), this.logger.debug({ type: "event", event: i6, data: s5 }), await this.persist();
      }), this.events.on($3.deleted, async (s5) => {
        const i6 = $3.deleted;
        this.logger.info(`Emitting ${i6}`), this.logger.debug({ type: "event", event: i6, data: s5 }), await this.persist();
      });
    }), this.relayer = e4, this.logger = E5(t3, this.name), this.clientId = "";
  }
  get context() {
    return y4(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.relayer.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.subscriptions.size;
  }
  get ids() {
    return Array.from(this.subscriptions.keys());
  }
  get values() {
    return Array.from(this.subscriptions.values());
  }
  get topics() {
    return this.topicMap.topics;
  }
  get hasAnyTopics() {
    return this.topicMap.topics.length > 0 || this.pending.size > 0 || this.cached.length > 0 || this.subscriptions.size > 0;
  }
  hasSubscription(e4, t3) {
    let s5 = false;
    try {
      s5 = this.getSubscription(e4).topic === t3;
    } catch {
    }
    return s5;
  }
  reset() {
    this.cached = [], this.initialized = true;
  }
  onDisable() {
    this.cached = this.values, this.subscriptions.clear(), this.topicMap.clear();
  }
  async unsubscribeByTopic(e4, t3) {
    const s5 = this.topicMap.get(e4);
    await Promise.all(s5.map(async (i6) => await this.unsubscribeById(e4, i6, t3)));
  }
  async unsubscribeById(e4, t3, s5) {
    this.logger.debug("Unsubscribing Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e4, id: t3, opts: s5 } });
    try {
      const i6 = yi(s5);
      await this.restartToComplete({ topic: e4, id: t3, relay: i6 }), await this.rpcUnsubscribe(e4, t3, i6);
      const r5 = de2("USER_DISCONNECTED", `${this.name}, ${e4}`);
      await this.onUnsubscribe(e4, t3, r5), this.logger.debug("Successfully Unsubscribed Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e4, id: t3, opts: s5 } });
    } catch (i6) {
      throw this.logger.debug("Failed to Unsubscribe Topic"), this.logger.error(i6), i6;
    }
  }
  async rpcSubscribe(e4, t3, s5) {
    var i6;
    (!s5 || (s5 == null ? void 0 : s5.transportType) === Q4.relay) && await this.restartToComplete({ topic: e4, id: e4, relay: t3 });
    const r5 = { method: mi(t3.protocol).subscribe, params: { topic: e4 } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: r5 });
    const o6 = (i6 = s5 == null ? void 0 : s5.internal) == null ? void 0 : i6.throwOnFailedPublish;
    try {
      const a5 = await this.getSubscriptionId(e4);
      if ((s5 == null ? void 0 : s5.transportType) === Q4.link_mode) return setTimeout(() => {
        (this.relayer.connected || this.relayer.connecting) && this.relayer.request(r5).catch((u4) => this.logger.warn(u4));
      }, (0, import_time4.toMiliseconds)(import_time4.ONE_SECOND)), a5;
      const c8 = new Promise(async (u4) => {
        const g5 = (m5) => {
          m5.topic === e4 && (this.events.removeListener($3.created, g5), u4(m5.id));
        };
        this.events.on($3.created, g5);
        try {
          const m5 = await ao2(new Promise((A6, l9) => {
            this.relayer.request(r5).catch((y6) => {
              this.logger.warn(y6, y6 == null ? void 0 : y6.message), l9(y6);
            }).then(A6);
          }), this.initialSubscribeTimeout, `Subscribing to ${e4} failed, please try again`);
          this.events.removeListener($3.created, g5), u4(m5);
        } catch {
        }
      }), h7 = await ao2(c8, this.subscribeTimeout, `Subscribing to ${e4} failed, please try again`);
      if (!h7 && o6) throw new Error(`Subscribing to ${e4} failed, please try again`);
      return h7 ? a5 : null;
    } catch (a5) {
      if (this.logger.debug("Outgoing Relay Subscribe Payload stalled"), this.relayer.events.emit(T5.connection_stalled), o6) throw a5;
    }
    return null;
  }
  async rpcBatchSubscribe(e4) {
    if (!e4.length) return;
    const t3 = e4[0].relay, s5 = { method: mi(t3.protocol).batchSubscribe, params: { topics: e4.map((i6) => i6.topic) } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: s5 });
    try {
      await await ao2(new Promise((i6) => {
        this.relayer.request(s5).catch((r5) => this.logger.warn(r5)).then(i6);
      }), this.subscribeTimeout, "rpcBatchSubscribe failed, please try again");
    } catch {
      this.relayer.events.emit(T5.connection_stalled);
    }
  }
  async rpcBatchFetchMessages(e4) {
    if (!e4.length) return;
    const t3 = e4[0].relay, s5 = { method: mi(t3.protocol).batchFetchMessages, params: { topics: e4.map((r5) => r5.topic) } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: s5 });
    let i6;
    try {
      i6 = await await ao2(new Promise((r5, o6) => {
        this.relayer.request(s5).catch((a5) => {
          this.logger.warn(a5), o6(a5);
        }).then(r5);
      }), this.subscribeTimeout, "rpcBatchFetchMessages failed, please try again");
    } catch {
      this.relayer.events.emit(T5.connection_stalled);
    }
    return i6;
  }
  rpcUnsubscribe(e4, t3, s5) {
    const i6 = { method: mi(s5.protocol).unsubscribe, params: { topic: e4, id: t3 } };
    return this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: i6 }), this.relayer.request(i6);
  }
  onSubscribe(e4, t3) {
    this.setSubscription(e4, Be2(de3({}, t3), { id: e4 })), this.pending.delete(t3.topic);
  }
  onBatchSubscribe(e4) {
    e4.length && e4.forEach((t3) => {
      this.setSubscription(t3.id, de3({}, t3)), this.pending.delete(t3.topic);
    });
  }
  async onUnsubscribe(e4, t3, s5) {
    this.events.removeAllListeners(t3), this.hasSubscription(t3, e4) && this.deleteSubscription(t3, s5), await this.relayer.messages.del(e4);
  }
  async setRelayerSubscriptions(e4) {
    await this.relayer.core.storage.setItem(this.storageKey, e4);
  }
  async getRelayerSubscriptions() {
    return await this.relayer.core.storage.getItem(this.storageKey);
  }
  setSubscription(e4, t3) {
    this.logger.debug("Setting subscription"), this.logger.trace({ type: "method", method: "setSubscription", id: e4, subscription: t3 }), this.addSubscription(e4, t3);
  }
  addSubscription(e4, t3) {
    this.subscriptions.set(e4, de3({}, t3)), this.topicMap.set(t3.topic, e4), this.events.emit($3.created, t3);
  }
  getSubscription(e4) {
    this.logger.debug("Getting subscription"), this.logger.trace({ type: "method", method: "getSubscription", id: e4 });
    const t3 = this.subscriptions.get(e4);
    if (!t3) {
      const { message: s5 } = te2("NO_MATCHING_KEY", `${this.name}: ${e4}`);
      throw new Error(s5);
    }
    return t3;
  }
  deleteSubscription(e4, t3) {
    this.logger.debug("Deleting subscription"), this.logger.trace({ type: "method", method: "deleteSubscription", id: e4, reason: t3 });
    const s5 = this.getSubscription(e4);
    this.subscriptions.delete(e4), this.topicMap.delete(s5.topic, e4), this.events.emit($3.deleted, Be2(de3({}, s5), { reason: t3 }));
  }
  async persist() {
    await this.setRelayerSubscriptions(this.values), this.events.emit($3.sync);
  }
  async onRestart() {
    if (this.cached.length) {
      const e4 = [...this.cached], t3 = Math.ceil(this.cached.length / this.batchSubscribeTopicsLimit);
      for (let s5 = 0; s5 < t3; s5++) {
        const i6 = e4.splice(0, this.batchSubscribeTopicsLimit);
        await this.batchSubscribe(i6);
      }
    }
    this.events.emit($3.resubscribed);
  }
  async restore() {
    try {
      const e4 = await this.getRelayerSubscriptions();
      if (typeof e4 > "u" || !e4.length) return;
      if (this.subscriptions.size) {
        const { message: t3 } = te2("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t3), this.logger.error(`${this.name}: ${JSON.stringify(this.values)}`), new Error(t3);
      }
      this.cached = e4, this.logger.debug(`Successfully Restored subscriptions for ${this.name}`), this.logger.trace({ type: "method", method: "restore", subscriptions: this.values });
    } catch (e4) {
      this.logger.debug(`Failed to Restore subscriptions for ${this.name}`), this.logger.error(e4);
    }
  }
  async batchSubscribe(e4) {
    e4.length && (await this.rpcBatchSubscribe(e4), this.onBatchSubscribe(await Promise.all(e4.map(async (t3) => Be2(de3({}, t3), { id: await this.getSubscriptionId(t3.topic) })))));
  }
  async batchFetchMessages(e4) {
    if (!e4.length) return;
    this.logger.trace(`Fetching batch messages for ${e4.length} subscriptions`);
    const t3 = await this.rpcBatchFetchMessages(e4);
    t3 && t3.messages && (await vo2((0, import_time4.toMiliseconds)(import_time4.ONE_SECOND)), await this.relayer.handleBatchMessageEvents(t3.messages));
  }
  async onConnect() {
    await this.restart(), this.reset();
  }
  onDisconnect() {
    this.onDisable();
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e4 } = te2("NOT_INITIALIZED", this.name);
      throw new Error(e4);
    }
  }
  async restartToComplete(e4) {
    !this.relayer.connected && !this.relayer.connecting && (this.cached.push(e4), await this.relayer.transportOpen());
  }
  async getClientId() {
    return this.clientId || (this.clientId = await this.relayer.core.crypto.getClientId()), this.clientId;
  }
  async getSubscriptionId(e4) {
    return si(e4 + await this.getClientId());
  }
};
var Mn3 = Object.defineProperty;
var _i = Object.getOwnPropertySymbols;
var Kn3 = Object.prototype.hasOwnProperty;
var Bn3 = Object.prototype.propertyIsEnumerable;
var je3 = (n7, e4, t3) => e4 in n7 ? Mn3(n7, e4, { enumerable: true, configurable: true, writable: true, value: t3 }) : n7[e4] = t3;
var Ei2 = (n7, e4) => {
  for (var t3 in e4 || (e4 = {})) Kn3.call(e4, t3) && je3(n7, t3, e4[t3]);
  if (_i) for (var t3 of _i(e4)) Bn3.call(e4, t3) && je3(n7, t3, e4[t3]);
  return n7;
};
var p5 = (n7, e4, t3) => je3(n7, typeof e4 != "symbol" ? e4 + "" : e4, t3);
var wi2 = class extends d4 {
  constructor(e4) {
    super(e4), p5(this, "protocol", "wc"), p5(this, "version", 2), p5(this, "core"), p5(this, "logger"), p5(this, "events", new import_events7.EventEmitter()), p5(this, "provider"), p5(this, "messages"), p5(this, "subscriber"), p5(this, "publisher"), p5(this, "name", Rt3), p5(this, "transportExplicitlyClosed", false), p5(this, "initialized", false), p5(this, "connectionAttemptInProgress", false), p5(this, "relayUrl"), p5(this, "projectId"), p5(this, "packageName"), p5(this, "bundleId"), p5(this, "hasExperiencedNetworkDisruption", false), p5(this, "pingTimeout"), p5(this, "heartBeatTimeout", (0, import_time4.toMiliseconds)(import_time4.THIRTY_SECONDS + import_time4.FIVE_SECONDS)), p5(this, "reconnectTimeout"), p5(this, "connectPromise"), p5(this, "reconnectInProgress", false), p5(this, "requestsInFlight", []), p5(this, "connectTimeout", (0, import_time4.toMiliseconds)(import_time4.ONE_SECOND * 15)), p5(this, "request", async (t3) => {
      var s5, i6;
      this.logger.debug("Publishing Request Payload");
      const r5 = t3.id || getBigIntRpcId().toString();
      await this.toEstablishConnection();
      try {
        this.logger.trace({ id: r5, method: t3.method, topic: (s5 = t3.params) == null ? void 0 : s5.topic }, "relayer.request - publishing...");
        const o6 = `${r5}:${((i6 = t3.params) == null ? void 0 : i6.tag) || ""}`;
        this.requestsInFlight.push(o6);
        const a5 = await this.provider.request(t3);
        return this.requestsInFlight = this.requestsInFlight.filter((c8) => c8 !== o6), a5;
      } catch (o6) {
        throw this.logger.debug(`Failed to Publish Request: ${r5}`), o6;
      }
    }), p5(this, "resetPingTimeout", () => {
      if (et()) try {
        clearTimeout(this.pingTimeout), this.pingTimeout = setTimeout(() => {
          var t3, s5, i6;
          this.logger.debug({}, "pingTimeout: Connection stalled, terminating..."), (i6 = (s5 = (t3 = this.provider) == null ? void 0 : t3.connection) == null ? void 0 : s5.socket) == null || i6.terminate();
        }, this.heartBeatTimeout);
      } catch (t3) {
        this.logger.warn(t3, t3 == null ? void 0 : t3.message);
      }
    }), p5(this, "onPayloadHandler", (t3) => {
      this.onProviderPayload(t3), this.resetPingTimeout();
    }), p5(this, "onConnectHandler", () => {
      this.logger.warn({}, "Relayer connected 🛜"), this.startPingTimeout(), this.events.emit(T5.connect);
    }), p5(this, "onDisconnectHandler", () => {
      this.logger.warn({}, "Relayer disconnected 🛑"), this.requestsInFlight = [], this.onProviderDisconnect();
    }), p5(this, "onProviderErrorHandler", (t3) => {
      this.logger.fatal(`Fatal socket error: ${t3.message}`), this.events.emit(T5.error, t3), this.logger.fatal("Fatal socket error received, closing transport"), this.transportClose();
    }), p5(this, "registerProviderListeners", () => {
      this.provider.on(L4.payload, this.onPayloadHandler), this.provider.on(L4.connect, this.onConnectHandler), this.provider.on(L4.disconnect, this.onDisconnectHandler), this.provider.on(L4.error, this.onProviderErrorHandler);
    }), this.core = e4.core, this.logger = typeof e4.logger < "u" && typeof e4.logger != "string" ? E5(e4.logger, this.name) : (0, import_pino2.default)(k4({ level: e4.logger || St3 })), this.messages = new Di2(this.logger, e4.core), this.subscriber = new fi2(this, this.logger), this.publisher = new On3(this, this.logger), this.relayUrl = (e4 == null ? void 0 : e4.relayUrl) || $e3, this.projectId = e4.projectId, Wr2() ? this.packageName = Jr2() : zr2() && (this.bundleId = Jr2()), this.provider = {};
  }
  async init() {
    if (this.logger.trace("Initialized"), this.registerEventListeners(), await Promise.all([this.messages.init(), this.subscriber.init()]), this.initialized = true, this.subscriber.hasAnyTopics) try {
      await this.transportOpen();
    } catch (e4) {
      this.logger.warn(e4, e4 == null ? void 0 : e4.message);
    }
  }
  get context() {
    return y4(this.logger);
  }
  get connected() {
    var e4, t3, s5;
    return ((s5 = (t3 = (e4 = this.provider) == null ? void 0 : e4.connection) == null ? void 0 : t3.socket) == null ? void 0 : s5.readyState) === 1 || false;
  }
  get connecting() {
    var e4, t3, s5;
    return ((s5 = (t3 = (e4 = this.provider) == null ? void 0 : e4.connection) == null ? void 0 : t3.socket) == null ? void 0 : s5.readyState) === 0 || this.connectPromise !== void 0 || false;
  }
  async publish(e4, t3, s5) {
    this.isInitialized(), await this.publisher.publish(e4, t3, s5), await this.recordMessageEvent({ topic: e4, message: t3, publishedAt: Date.now(), transportType: Q4.relay });
  }
  async subscribe(e4, t3) {
    var s5, i6, r5;
    this.isInitialized(), (!(t3 != null && t3.transportType) || (t3 == null ? void 0 : t3.transportType) === "relay") && await this.toEstablishConnection();
    const o6 = typeof ((s5 = t3 == null ? void 0 : t3.internal) == null ? void 0 : s5.throwOnFailedPublish) > "u" ? true : (i6 = t3 == null ? void 0 : t3.internal) == null ? void 0 : i6.throwOnFailedPublish;
    let a5 = ((r5 = this.subscriber.topicMap.get(e4)) == null ? void 0 : r5[0]) || "", c8;
    const h7 = (u4) => {
      u4.topic === e4 && (this.subscriber.off($3.created, h7), c8());
    };
    return await Promise.all([new Promise((u4) => {
      c8 = u4, this.subscriber.on($3.created, h7);
    }), new Promise(async (u4, g5) => {
      a5 = await this.subscriber.subscribe(e4, Ei2({ internal: { throwOnFailedPublish: o6 } }, t3)).catch((m5) => {
        o6 && g5(m5);
      }) || a5, u4();
    })]), a5;
  }
  async unsubscribe(e4, t3) {
    this.isInitialized(), await this.subscriber.unsubscribe(e4, t3);
  }
  on(e4, t3) {
    this.events.on(e4, t3);
  }
  once(e4, t3) {
    this.events.once(e4, t3);
  }
  off(e4, t3) {
    this.events.off(e4, t3);
  }
  removeListener(e4, t3) {
    this.events.removeListener(e4, t3);
  }
  async transportDisconnect() {
    this.provider.disconnect && (this.hasExperiencedNetworkDisruption || this.connected) ? await ao2(this.provider.disconnect(), 2e3, "provider.disconnect()").catch(() => this.onProviderDisconnect()) : this.onProviderDisconnect();
  }
  async transportClose() {
    this.transportExplicitlyClosed = true, await this.transportDisconnect();
  }
  async transportOpen(e4) {
    if (!this.subscriber.hasAnyTopics) {
      this.logger.warn("Starting WS connection skipped because the client has no topics to work with.");
      return;
    }
    if (this.connectPromise ? (this.logger.debug({}, "Waiting for existing connection attempt to resolve..."), await this.connectPromise, this.logger.debug({}, "Existing connection attempt resolved")) : (this.connectPromise = new Promise(async (t3, s5) => {
      await this.connect(e4).then(t3).catch(s5).finally(() => {
        this.connectPromise = void 0;
      });
    }), await this.connectPromise), !this.connected) throw new Error(`Couldn't establish socket connection to the relay server: ${this.relayUrl}`);
  }
  async restartTransport(e4) {
    this.logger.debug({}, "Restarting transport..."), !this.connectionAttemptInProgress && (this.relayUrl = e4 || this.relayUrl, await this.confirmOnlineStateOrThrow(), await this.transportClose(), await this.transportOpen());
  }
  async confirmOnlineStateOrThrow() {
    if (!await Yi()) throw new Error("No internet connection detected. Please restart your network and try again.");
  }
  async handleBatchMessageEvents(e4) {
    if ((e4 == null ? void 0 : e4.length) === 0) {
      this.logger.trace("Batch message events is empty. Ignoring...");
      return;
    }
    const t3 = e4.sort((s5, i6) => s5.publishedAt - i6.publishedAt);
    this.logger.debug(`Batch of ${t3.length} message events sorted`);
    for (const s5 of t3) try {
      await this.onMessageEvent(s5);
    } catch (i6) {
      this.logger.warn(i6, "Error while processing batch message event: " + (i6 == null ? void 0 : i6.message));
    }
    this.logger.trace(`Batch of ${t3.length} message events processed`);
  }
  async onLinkMessageEvent(e4, t3) {
    const { topic: s5 } = e4;
    if (!t3.sessionExists) {
      const i6 = ho2(import_time4.FIVE_MINUTES), r5 = { topic: s5, expiry: i6, relay: { protocol: "irn" }, active: false };
      await this.core.pairing.pairings.set(s5, r5);
    }
    this.events.emit(T5.message, e4), await this.recordMessageEvent(e4);
  }
  async connect(e4) {
    await this.confirmOnlineStateOrThrow(), e4 && e4 !== this.relayUrl && (this.relayUrl = e4, await this.transportDisconnect()), this.connectionAttemptInProgress = true, this.transportExplicitlyClosed = false;
    let t3 = 1;
    for (; t3 < 6; ) {
      try {
        if (this.transportExplicitlyClosed) break;
        this.logger.debug({}, `Connecting to ${this.relayUrl}, attempt: ${t3}...`), await this.createProvider(), await new Promise(async (s5, i6) => {
          const r5 = () => {
            i6(new Error("Connection interrupted while trying to subscribe"));
          };
          this.provider.once(L4.disconnect, r5), await ao2(new Promise((o6, a5) => {
            this.provider.connect().then(o6).catch(a5);
          }), this.connectTimeout, `Socket stalled when trying to connect to ${this.relayUrl}`).catch((o6) => {
            i6(o6);
          }).finally(() => {
            this.provider.off(L4.disconnect, r5), clearTimeout(this.reconnectTimeout);
          }), await new Promise(async (o6, a5) => {
            const c8 = () => {
              a5(new Error("Connection interrupted while trying to subscribe"));
            };
            this.provider.once(L4.disconnect, c8), await this.subscriber.start().then(o6).catch(a5).finally(() => {
              this.provider.off(L4.disconnect, c8);
            });
          }), this.hasExperiencedNetworkDisruption = false, s5();
        });
      } catch (s5) {
        await this.subscriber.stop();
        const i6 = s5;
        this.logger.warn({}, i6.message), this.hasExperiencedNetworkDisruption = true;
      } finally {
        this.connectionAttemptInProgress = false;
      }
      if (this.connected) {
        this.logger.debug({}, `Connected to ${this.relayUrl} successfully on attempt: ${t3}`);
        break;
      }
      await new Promise((s5) => setTimeout(s5, (0, import_time4.toMiliseconds)(t3 * 1))), t3++;
    }
  }
  startPingTimeout() {
    var e4, t3, s5, i6, r5;
    if (et()) try {
      (t3 = (e4 = this.provider) == null ? void 0 : e4.connection) != null && t3.socket && ((r5 = (i6 = (s5 = this.provider) == null ? void 0 : s5.connection) == null ? void 0 : i6.socket) == null || r5.on("ping", () => {
        this.resetPingTimeout();
      })), this.resetPingTimeout();
    } catch (o6) {
      this.logger.warn(o6, o6 == null ? void 0 : o6.message);
    }
  }
  async createProvider() {
    this.provider.connection && this.unregisterProviderListeners();
    const e4 = await this.core.crypto.signJWT(this.relayUrl);
    this.provider = new o5(new f6(Zr2({ sdkVersion: me3, protocol: this.protocol, version: this.version, relayUrl: this.relayUrl, projectId: this.projectId, auth: e4, useOnCloseEvent: true, bundleId: this.bundleId, packageName: this.packageName }))), this.registerProviderListeners();
  }
  async recordMessageEvent(e4) {
    const { topic: t3, message: s5 } = e4;
    await this.messages.set(t3, s5);
  }
  async shouldIgnoreMessageEvent(e4) {
    const { topic: t3, message: s5 } = e4;
    if (!s5 || s5.length === 0) return this.logger.warn(`Ignoring invalid/empty message: ${s5}`), true;
    if (!await this.subscriber.isSubscribed(t3)) return this.logger.warn(`Ignoring message for non-subscribed topic ${t3}`), true;
    const i6 = this.messages.has(t3, s5);
    return i6 && this.logger.warn(`Ignoring duplicate message: ${s5}`), i6;
  }
  async onProviderPayload(e4) {
    if (this.logger.debug("Incoming Relay Payload"), this.logger.trace({ type: "payload", direction: "incoming", payload: e4 }), isJsonRpcRequest(e4)) {
      if (!e4.method.endsWith(xt3)) return;
      const t3 = e4.params, { topic: s5, message: i6, publishedAt: r5, attestation: o6 } = t3.data, a5 = { topic: s5, message: i6, publishedAt: r5, transportType: Q4.relay, attestation: o6 };
      this.logger.debug("Emitting Relayer Payload"), this.logger.trace(Ei2({ type: "event", event: t3.id }, a5)), this.events.emit(t3.id, a5), await this.acknowledgePayload(e4), await this.onMessageEvent(a5);
    } else isJsonRpcResponse(e4) && this.events.emit(T5.message_ack, e4);
  }
  async onMessageEvent(e4) {
    await this.shouldIgnoreMessageEvent(e4) || (this.events.emit(T5.message, e4), await this.recordMessageEvent(e4));
  }
  async acknowledgePayload(e4) {
    const t3 = formatJsonRpcResult(e4.id, true);
    await this.provider.connection.send(t3);
  }
  unregisterProviderListeners() {
    this.provider.off(L4.payload, this.onPayloadHandler), this.provider.off(L4.connect, this.onConnectHandler), this.provider.off(L4.disconnect, this.onDisconnectHandler), this.provider.off(L4.error, this.onProviderErrorHandler), clearTimeout(this.pingTimeout);
  }
  async registerEventListeners() {
    let e4 = await Yi();
    Xi(async (t3) => {
      e4 !== t3 && (e4 = t3, t3 ? await this.transportOpen().catch((s5) => this.logger.error(s5, s5 == null ? void 0 : s5.message)) : (this.hasExperiencedNetworkDisruption = true, await this.transportDisconnect(), this.transportExplicitlyClosed = false));
    });
  }
  async onProviderDisconnect() {
    clearTimeout(this.pingTimeout), this.events.emit(T5.disconnect), this.connectionAttemptInProgress = false, !this.reconnectInProgress && (this.reconnectInProgress = true, await this.subscriber.stop(), this.subscriber.hasAnyTopics && (this.transportExplicitlyClosed || (this.reconnectTimeout = setTimeout(async () => {
      await this.transportOpen().catch((e4) => this.logger.error(e4, e4 == null ? void 0 : e4.message)), this.reconnectTimeout = void 0, this.reconnectInProgress = false;
    }, (0, import_time4.toMiliseconds)(Ot3)))));
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e4 } = te2("NOT_INITIALIZED", this.name);
      throw new Error(e4);
    }
  }
  async toEstablishConnection() {
    await this.confirmOnlineStateOrThrow(), !this.connected && await this.connect();
  }
};
var jn3 = Object.defineProperty;
var Ii = Object.getOwnPropertySymbols;
var Vn3 = Object.prototype.hasOwnProperty;
var qn3 = Object.prototype.propertyIsEnumerable;
var Ve3 = (n7, e4, t3) => e4 in n7 ? jn3(n7, e4, { enumerable: true, configurable: true, writable: true, value: t3 }) : n7[e4] = t3;
var Ti2 = (n7, e4) => {
  for (var t3 in e4 || (e4 = {})) Vn3.call(e4, t3) && Ve3(n7, t3, e4[t3]);
  if (Ii) for (var t3 of Ii(e4)) qn3.call(e4, t3) && Ve3(n7, t3, e4[t3]);
  return n7;
};
var z6 = (n7, e4, t3) => Ve3(n7, typeof e4 != "symbol" ? e4 + "" : e4, t3);
var Ci2 = class extends f4 {
  constructor(e4, t3, s5, i6 = B3, r5 = void 0) {
    super(e4, t3, s5, i6), this.core = e4, this.logger = t3, this.name = s5, z6(this, "map", /* @__PURE__ */ new Map()), z6(this, "version", At2), z6(this, "cached", []), z6(this, "initialized", false), z6(this, "getKey"), z6(this, "storagePrefix", B3), z6(this, "recentlyDeleted", []), z6(this, "recentlyDeletedLimit", 200), z6(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((o6) => {
        this.getKey && o6 !== null && !ae(o6) ? this.map.set(this.getKey(o6), o6) : Pi2(o6) ? this.map.set(o6.id, o6) : Li(o6) && this.map.set(o6.topic, o6);
      }), this.cached = [], this.initialized = true);
    }), z6(this, "set", async (o6, a5) => {
      this.isInitialized(), this.map.has(o6) ? await this.update(o6, a5) : (this.logger.debug("Setting value"), this.logger.trace({ type: "method", method: "set", key: o6, value: a5 }), this.map.set(o6, a5), await this.persist());
    }), z6(this, "get", (o6) => (this.isInitialized(), this.logger.debug("Getting value"), this.logger.trace({ type: "method", method: "get", key: o6 }), this.getData(o6))), z6(this, "getAll", (o6) => (this.isInitialized(), o6 ? this.values.filter((a5) => Object.keys(o6).every((c8) => (0, import_lodash.default)(a5[c8], o6[c8]))) : this.values)), z6(this, "update", async (o6, a5) => {
      this.isInitialized(), this.logger.debug("Updating value"), this.logger.trace({ type: "method", method: "update", key: o6, update: a5 });
      const c8 = Ti2(Ti2({}, this.getData(o6)), a5);
      this.map.set(o6, c8), await this.persist();
    }), z6(this, "delete", async (o6, a5) => {
      this.isInitialized(), this.map.has(o6) && (this.logger.debug("Deleting value"), this.logger.trace({ type: "method", method: "delete", key: o6, reason: a5 }), this.map.delete(o6), this.addToRecentlyDeleted(o6), await this.persist());
    }), this.logger = E5(t3, this.name), this.storagePrefix = i6, this.getKey = r5;
  }
  get context() {
    return y4(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.map.size;
  }
  get keys() {
    return Array.from(this.map.keys());
  }
  get values() {
    return Array.from(this.map.values());
  }
  addToRecentlyDeleted(e4) {
    this.recentlyDeleted.push(e4), this.recentlyDeleted.length >= this.recentlyDeletedLimit && this.recentlyDeleted.splice(0, this.recentlyDeletedLimit / 2);
  }
  async setDataStore(e4) {
    await this.core.storage.setItem(this.storageKey, e4);
  }
  async getDataStore() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getData(e4) {
    const t3 = this.map.get(e4);
    if (!t3) {
      if (this.recentlyDeleted.includes(e4)) {
        const { message: i6 } = te2("MISSING_OR_INVALID", `Record was recently deleted - ${this.name}: ${e4}`);
        throw this.logger.error(i6), new Error(i6);
      }
      const { message: s5 } = te2("NO_MATCHING_KEY", `${this.name}: ${e4}`);
      throw this.logger.error(s5), new Error(s5);
    }
    return t3;
  }
  async persist() {
    await this.setDataStore(this.values);
  }
  async restore() {
    try {
      const e4 = await this.getDataStore();
      if (typeof e4 > "u" || !e4.length) return;
      if (this.map.size) {
        const { message: t3 } = te2("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t3), new Error(t3);
      }
      this.cached = e4, this.logger.debug(`Successfully Restored value for ${this.name}`), this.logger.trace({ type: "method", method: "restore", value: this.values });
    } catch (e4) {
      this.logger.debug(`Failed to Restore value for ${this.name}`), this.logger.error(e4);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e4 } = te2("NOT_INITIALIZED", this.name);
      throw new Error(e4);
    }
  }
};
var Gn3 = Object.defineProperty;
var Hn3 = (n7, e4, t3) => e4 in n7 ? Gn3(n7, e4, { enumerable: true, configurable: true, writable: true, value: t3 }) : n7[e4] = t3;
var d6 = (n7, e4, t3) => Hn3(n7, typeof e4 != "symbol" ? e4 + "" : e4, t3);
var Pi3 = class {
  constructor(e4, t3) {
    this.core = e4, this.logger = t3, d6(this, "name", kt3), d6(this, "version", Ut3), d6(this, "events", new import_events7.default()), d6(this, "pairings"), d6(this, "initialized", false), d6(this, "storagePrefix", B3), d6(this, "ignoredPayloadTypes", [Ie2]), d6(this, "registeredMethods", []), d6(this, "init", async () => {
      this.initialized || (await this.pairings.init(), await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.initialized = true, this.logger.trace("Initialized"));
    }), d6(this, "register", ({ methods: s5 }) => {
      this.isInitialized(), this.registeredMethods = [.../* @__PURE__ */ new Set([...this.registeredMethods, ...s5])];
    }), d6(this, "create", async (s5) => {
      this.isInitialized();
      const i6 = ni(), r5 = await this.core.crypto.setSymKey(i6), o6 = ho2(import_time4.FIVE_MINUTES), a5 = { protocol: Pt3 }, c8 = { topic: r5, expiry: o6, relay: a5, active: false, methods: s5 == null ? void 0 : s5.methods }, h7 = wi({ protocol: this.core.protocol, version: this.core.version, topic: r5, symKey: i6, relay: a5, expiryTimestamp: o6, methods: s5 == null ? void 0 : s5.methods });
      return this.events.emit(se2.create, c8), this.core.expirer.set(r5, o6), await this.pairings.set(r5, c8), await this.core.relayer.subscribe(r5, { transportType: s5 == null ? void 0 : s5.transportType }), { topic: r5, uri: h7 };
    }), d6(this, "pair", async (s5) => {
      this.isInitialized();
      const i6 = this.core.eventClient.createEvent({ properties: { topic: s5 == null ? void 0 : s5.uri, trace: [q4.pairing_started] } });
      this.isValidPair(s5, i6);
      const { topic: r5, symKey: o6, relay: a5, expiryTimestamp: c8, methods: h7 } = bi(s5.uri);
      i6.props.properties.topic = r5, i6.addTrace(q4.pairing_uri_validation_success), i6.addTrace(q4.pairing_uri_not_expired);
      let u4;
      if (this.pairings.keys.includes(r5)) {
        if (u4 = this.pairings.get(r5), i6.addTrace(q4.existing_pairing), u4.active) throw i6.setError(J4.active_pairing_already_exists), new Error(`Pairing already exists: ${r5}. Please try again with a new connection URI.`);
        i6.addTrace(q4.pairing_not_expired);
      }
      const g5 = c8 || ho2(import_time4.FIVE_MINUTES), m5 = { topic: r5, relay: a5, expiry: g5, active: false, methods: h7 };
      this.core.expirer.set(r5, g5), await this.pairings.set(r5, m5), i6.addTrace(q4.store_new_pairing), s5.activatePairing && await this.activate({ topic: r5 }), this.events.emit(se2.create, m5), i6.addTrace(q4.emit_inactive_pairing), this.core.crypto.keychain.has(r5) || await this.core.crypto.setSymKey(o6, r5), i6.addTrace(q4.subscribing_pairing_topic);
      try {
        await this.core.relayer.confirmOnlineStateOrThrow();
      } catch {
        i6.setError(J4.no_internet_connection);
      }
      try {
        await this.core.relayer.subscribe(r5, { relay: a5 });
      } catch (A6) {
        throw i6.setError(J4.subscribe_pairing_topic_failure), A6;
      }
      return i6.addTrace(q4.subscribe_pairing_topic_success), m5;
    }), d6(this, "activate", async ({ topic: s5 }) => {
      this.isInitialized();
      const i6 = ho2(import_time4.FIVE_MINUTES);
      this.core.expirer.set(s5, i6), await this.pairings.update(s5, { active: true, expiry: i6 });
    }), d6(this, "ping", async (s5) => {
      this.isInitialized(), await this.isValidPing(s5), this.logger.warn("ping() is deprecated and will be removed in the next major release.");
      const { topic: i6 } = s5;
      if (this.pairings.keys.includes(i6)) {
        const r5 = await this.sendRequest(i6, "wc_pairingPing", {}), { done: o6, resolve: a5, reject: c8 } = co2();
        this.events.once(go2("pairing_ping", r5), ({ error: h7 }) => {
          h7 ? c8(h7) : a5();
        }), await o6();
      }
    }), d6(this, "updateExpiry", async ({ topic: s5, expiry: i6 }) => {
      this.isInitialized(), await this.pairings.update(s5, { expiry: i6 });
    }), d6(this, "updateMetadata", async ({ topic: s5, metadata: i6 }) => {
      this.isInitialized(), await this.pairings.update(s5, { peerMetadata: i6 });
    }), d6(this, "getPairings", () => (this.isInitialized(), this.pairings.values)), d6(this, "disconnect", async (s5) => {
      this.isInitialized(), await this.isValidDisconnect(s5);
      const { topic: i6 } = s5;
      this.pairings.keys.includes(i6) && (await this.sendRequest(i6, "wc_pairingDelete", de2("USER_DISCONNECTED")), await this.deletePairing(i6));
    }), d6(this, "formatUriFromPairing", (s5) => {
      this.isInitialized();
      const { topic: i6, relay: r5, expiry: o6, methods: a5 } = s5, c8 = this.core.crypto.keychain.get(i6);
      return wi({ protocol: this.core.protocol, version: this.core.version, topic: i6, symKey: c8, relay: r5, expiryTimestamp: o6, methods: a5 });
    }), d6(this, "sendRequest", async (s5, i6, r5) => {
      const o6 = formatJsonRpcRequest(i6, r5), a5 = await this.core.crypto.encode(s5, o6), c8 = ie2[i6].req;
      return this.core.history.set(s5, o6), this.core.relayer.publish(s5, a5, c8), o6.id;
    }), d6(this, "sendResult", async (s5, i6, r5) => {
      const o6 = formatJsonRpcResult(s5, r5), a5 = await this.core.crypto.encode(i6, o6), c8 = (await this.core.history.get(i6, s5)).request.method, h7 = ie2[c8].res;
      await this.core.relayer.publish(i6, a5, h7), await this.core.history.resolve(o6);
    }), d6(this, "sendError", async (s5, i6, r5) => {
      const o6 = formatJsonRpcError(s5, r5), a5 = await this.core.crypto.encode(i6, o6), c8 = (await this.core.history.get(i6, s5)).request.method, h7 = ie2[c8] ? ie2[c8].res : ie2.unregistered_method.res;
      await this.core.relayer.publish(i6, a5, h7), await this.core.history.resolve(o6);
    }), d6(this, "deletePairing", async (s5, i6) => {
      await this.core.relayer.unsubscribe(s5), await Promise.all([this.pairings.delete(s5, de2("USER_DISCONNECTED")), this.core.crypto.deleteSymKey(s5), i6 ? Promise.resolve() : this.core.expirer.del(s5)]);
    }), d6(this, "cleanup", async () => {
      const s5 = this.pairings.getAll().filter((i6) => po2(i6.expiry));
      await Promise.all(s5.map((i6) => this.deletePairing(i6.topic)));
    }), d6(this, "onRelayEventRequest", (s5) => {
      const { topic: i6, payload: r5 } = s5;
      switch (r5.method) {
        case "wc_pairingPing":
          return this.onPairingPingRequest(i6, r5);
        case "wc_pairingDelete":
          return this.onPairingDeleteRequest(i6, r5);
        default:
          return this.onUnknownRpcMethodRequest(i6, r5);
      }
    }), d6(this, "onRelayEventResponse", async (s5) => {
      const { topic: i6, payload: r5 } = s5, o6 = (await this.core.history.get(i6, r5.id)).request.method;
      switch (o6) {
        case "wc_pairingPing":
          return this.onPairingPingResponse(i6, r5);
        default:
          return this.onUnknownRpcMethodResponse(o6);
      }
    }), d6(this, "onPairingPingRequest", async (s5, i6) => {
      const { id: r5 } = i6;
      try {
        this.isValidPing({ topic: s5 }), await this.sendResult(r5, s5, true), this.events.emit(se2.ping, { id: r5, topic: s5 });
      } catch (o6) {
        await this.sendError(r5, s5, o6), this.logger.error(o6);
      }
    }), d6(this, "onPairingPingResponse", (s5, i6) => {
      const { id: r5 } = i6;
      setTimeout(() => {
        isJsonRpcResult(i6) ? this.events.emit(go2("pairing_ping", r5), {}) : isJsonRpcError(i6) && this.events.emit(go2("pairing_ping", r5), { error: i6.error });
      }, 500);
    }), d6(this, "onPairingDeleteRequest", async (s5, i6) => {
      const { id: r5 } = i6;
      try {
        this.isValidDisconnect({ topic: s5 }), await this.deletePairing(s5), this.events.emit(se2.delete, { id: r5, topic: s5 });
      } catch (o6) {
        await this.sendError(r5, s5, o6), this.logger.error(o6);
      }
    }), d6(this, "onUnknownRpcMethodRequest", async (s5, i6) => {
      const { id: r5, method: o6 } = i6;
      try {
        if (this.registeredMethods.includes(o6)) return;
        const a5 = de2("WC_METHOD_UNSUPPORTED", o6);
        await this.sendError(r5, s5, a5), this.logger.error(a5);
      } catch (a5) {
        await this.sendError(r5, s5, a5), this.logger.error(a5);
      }
    }), d6(this, "onUnknownRpcMethodResponse", (s5) => {
      this.registeredMethods.includes(s5) || this.logger.error(de2("WC_METHOD_UNSUPPORTED", s5));
    }), d6(this, "isValidPair", (s5, i6) => {
      var r5;
      if (!Di(s5)) {
        const { message: a5 } = te2("MISSING_OR_INVALID", `pair() params: ${s5}`);
        throw i6.setError(J4.malformed_pairing_uri), new Error(a5);
      }
      if (!Ri(s5.uri)) {
        const { message: a5 } = te2("MISSING_OR_INVALID", `pair() uri: ${s5.uri}`);
        throw i6.setError(J4.malformed_pairing_uri), new Error(a5);
      }
      const o6 = bi(s5 == null ? void 0 : s5.uri);
      if (!((r5 = o6 == null ? void 0 : o6.relay) != null && r5.protocol)) {
        const { message: a5 } = te2("MISSING_OR_INVALID", "pair() uri#relay-protocol");
        throw i6.setError(J4.malformed_pairing_uri), new Error(a5);
      }
      if (!(o6 != null && o6.symKey)) {
        const { message: a5 } = te2("MISSING_OR_INVALID", "pair() uri#symKey");
        throw i6.setError(J4.malformed_pairing_uri), new Error(a5);
      }
      if (o6 != null && o6.expiryTimestamp && (0, import_time4.toMiliseconds)(o6 == null ? void 0 : o6.expiryTimestamp) < Date.now()) {
        i6.setError(J4.pairing_expired);
        const { message: a5 } = te2("EXPIRED", "pair() URI has expired. Please try again with a new connection URI.");
        throw new Error(a5);
      }
    }), d6(this, "isValidPing", async (s5) => {
      if (!Di(s5)) {
        const { message: r5 } = te2("MISSING_OR_INVALID", `ping() params: ${s5}`);
        throw new Error(r5);
      }
      const { topic: i6 } = s5;
      await this.isValidPairingTopic(i6);
    }), d6(this, "isValidDisconnect", async (s5) => {
      if (!Di(s5)) {
        const { message: r5 } = te2("MISSING_OR_INVALID", `disconnect() params: ${s5}`);
        throw new Error(r5);
      }
      const { topic: i6 } = s5;
      await this.isValidPairingTopic(i6);
    }), d6(this, "isValidPairingTopic", async (s5) => {
      if (!q3(s5, false)) {
        const { message: i6 } = te2("MISSING_OR_INVALID", `pairing topic should be a string: ${s5}`);
        throw new Error(i6);
      }
      if (!this.pairings.keys.includes(s5)) {
        const { message: i6 } = te2("NO_MATCHING_KEY", `pairing topic doesn't exist: ${s5}`);
        throw new Error(i6);
      }
      if (po2(this.pairings.get(s5).expiry)) {
        await this.deletePairing(s5);
        const { message: i6 } = te2("EXPIRED", `pairing topic: ${s5}`);
        throw new Error(i6);
      }
    }), this.core = e4, this.logger = E5(t3, this.name), this.pairings = new Ci2(this.core, this.logger, this.name, this.storagePrefix);
  }
  get context() {
    return y4(this.logger);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e4 } = te2("NOT_INITIALIZED", this.name);
      throw new Error(e4);
    }
  }
  registerRelayerEvents() {
    this.core.relayer.on(T5.message, async (e4) => {
      const { topic: t3, message: s5, transportType: i6 } = e4;
      if (!this.pairings.keys.includes(t3) || i6 === Q4.link_mode || this.ignoredPayloadTypes.includes(this.core.crypto.getPayloadType(s5))) return;
      const r5 = await this.core.crypto.decode(t3, s5);
      try {
        isJsonRpcRequest(r5) ? (this.core.history.set(t3, r5), this.onRelayEventRequest({ topic: t3, payload: r5 })) : isJsonRpcResponse(r5) && (await this.core.history.resolve(r5), await this.onRelayEventResponse({ topic: t3, payload: r5 }), this.core.history.delete(t3, r5.id));
      } catch (o6) {
        this.logger.error(o6);
      }
    });
  }
  registerExpirerEvents() {
    this.core.expirer.on(M6.expired, async (e4) => {
      const { topic: t3 } = lo2(e4.target);
      t3 && this.pairings.keys.includes(t3) && (await this.deletePairing(t3, true), this.events.emit(se2.expire, { topic: t3 }));
    });
  }
};
var Yn3 = Object.defineProperty;
var Jn3 = (n7, e4, t3) => e4 in n7 ? Yn3(n7, e4, { enumerable: true, configurable: true, writable: true, value: t3 }) : n7[e4] = t3;
var S4 = (n7, e4, t3) => Jn3(n7, typeof e4 != "symbol" ? e4 + "" : e4, t3);
var Si = class extends I4 {
  constructor(e4, t3) {
    super(e4, t3), this.core = e4, this.logger = t3, S4(this, "records", /* @__PURE__ */ new Map()), S4(this, "events", new import_events7.EventEmitter()), S4(this, "name", Ft3), S4(this, "version", Mt2), S4(this, "cached", []), S4(this, "initialized", false), S4(this, "storagePrefix", B3), S4(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((s5) => this.records.set(s5.id, s5)), this.cached = [], this.registerEventListeners(), this.initialized = true);
    }), S4(this, "set", (s5, i6, r5) => {
      if (this.isInitialized(), this.logger.debug("Setting JSON-RPC request history record"), this.logger.trace({ type: "method", method: "set", topic: s5, request: i6, chainId: r5 }), this.records.has(i6.id)) return;
      const o6 = { id: i6.id, topic: s5, request: { method: i6.method, params: i6.params || null }, chainId: r5, expiry: ho2(import_time4.THIRTY_DAYS) };
      this.records.set(o6.id, o6), this.persist(), this.events.emit(F4.created, o6);
    }), S4(this, "resolve", async (s5) => {
      if (this.isInitialized(), this.logger.debug("Updating JSON-RPC response history record"), this.logger.trace({ type: "method", method: "update", response: s5 }), !this.records.has(s5.id)) return;
      const i6 = await this.getRecord(s5.id);
      typeof i6.response > "u" && (i6.response = isJsonRpcError(s5) ? { error: s5.error } : { result: s5.result }, this.records.set(i6.id, i6), this.persist(), this.events.emit(F4.updated, i6));
    }), S4(this, "get", async (s5, i6) => (this.isInitialized(), this.logger.debug("Getting record"), this.logger.trace({ type: "method", method: "get", topic: s5, id: i6 }), await this.getRecord(i6))), S4(this, "delete", (s5, i6) => {
      this.isInitialized(), this.logger.debug("Deleting record"), this.logger.trace({ type: "method", method: "delete", id: i6 }), this.values.forEach((r5) => {
        if (r5.topic === s5) {
          if (typeof i6 < "u" && r5.id !== i6) return;
          this.records.delete(r5.id), this.events.emit(F4.deleted, r5);
        }
      }), this.persist();
    }), S4(this, "exists", async (s5, i6) => (this.isInitialized(), this.records.has(i6) ? (await this.getRecord(i6)).topic === s5 : false)), S4(this, "on", (s5, i6) => {
      this.events.on(s5, i6);
    }), S4(this, "once", (s5, i6) => {
      this.events.once(s5, i6);
    }), S4(this, "off", (s5, i6) => {
      this.events.off(s5, i6);
    }), S4(this, "removeListener", (s5, i6) => {
      this.events.removeListener(s5, i6);
    }), this.logger = E5(t3, this.name);
  }
  get context() {
    return y4(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get size() {
    return this.records.size;
  }
  get keys() {
    return Array.from(this.records.keys());
  }
  get values() {
    return Array.from(this.records.values());
  }
  get pending() {
    const e4 = [];
    return this.values.forEach((t3) => {
      if (typeof t3.response < "u") return;
      const s5 = { topic: t3.topic, request: formatJsonRpcRequest(t3.request.method, t3.request.params, t3.id), chainId: t3.chainId };
      return e4.push(s5);
    }), e4;
  }
  async setJsonRpcRecords(e4) {
    await this.core.storage.setItem(this.storageKey, e4);
  }
  async getJsonRpcRecords() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getRecord(e4) {
    this.isInitialized();
    const t3 = this.records.get(e4);
    if (!t3) {
      const { message: s5 } = te2("NO_MATCHING_KEY", `${this.name}: ${e4}`);
      throw new Error(s5);
    }
    return t3;
  }
  async persist() {
    await this.setJsonRpcRecords(this.values), this.events.emit(F4.sync);
  }
  async restore() {
    try {
      const e4 = await this.getJsonRpcRecords();
      if (typeof e4 > "u" || !e4.length) return;
      if (this.records.size) {
        const { message: t3 } = te2("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t3), new Error(t3);
      }
      this.cached = e4, this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", records: this.values });
    } catch (e4) {
      this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(e4);
    }
  }
  registerEventListeners() {
    this.events.on(F4.created, (e4) => {
      const t3 = F4.created;
      this.logger.info(`Emitting ${t3}`), this.logger.debug({ type: "event", event: t3, record: e4 });
    }), this.events.on(F4.updated, (e4) => {
      const t3 = F4.updated;
      this.logger.info(`Emitting ${t3}`), this.logger.debug({ type: "event", event: t3, record: e4 });
    }), this.events.on(F4.deleted, (e4) => {
      const t3 = F4.deleted;
      this.logger.info(`Emitting ${t3}`), this.logger.debug({ type: "event", event: t3, record: e4 });
    }), this.core.heartbeat.on(r3.pulse, () => {
      this.cleanup();
    });
  }
  cleanup() {
    try {
      this.isInitialized();
      let e4 = false;
      this.records.forEach((t3) => {
        (0, import_time4.toMiliseconds)(t3.expiry || 0) - Date.now() <= 0 && (this.logger.info(`Deleting expired history log: ${t3.id}`), this.records.delete(t3.id), this.events.emit(F4.deleted, t3, false), e4 = true);
      }), e4 && this.persist();
    } catch (e4) {
      this.logger.warn(e4);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e4 } = te2("NOT_INITIALIZED", this.name);
      throw new Error(e4);
    }
  }
};
var Xn3 = Object.defineProperty;
var Wn3 = (n7, e4, t3) => e4 in n7 ? Xn3(n7, e4, { enumerable: true, configurable: true, writable: true, value: t3 }) : n7[e4] = t3;
var x7 = (n7, e4, t3) => Wn3(n7, typeof e4 != "symbol" ? e4 + "" : e4, t3);
var Ri2 = class extends S3 {
  constructor(e4, t3) {
    super(e4, t3), this.core = e4, this.logger = t3, x7(this, "expirations", /* @__PURE__ */ new Map()), x7(this, "events", new import_events7.EventEmitter()), x7(this, "name", Kt2), x7(this, "version", Bt3), x7(this, "cached", []), x7(this, "initialized", false), x7(this, "storagePrefix", B3), x7(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((s5) => this.expirations.set(s5.target, s5)), this.cached = [], this.registerEventListeners(), this.initialized = true);
    }), x7(this, "has", (s5) => {
      try {
        const i6 = this.formatTarget(s5);
        return typeof this.getExpiration(i6) < "u";
      } catch {
        return false;
      }
    }), x7(this, "set", (s5, i6) => {
      this.isInitialized();
      const r5 = this.formatTarget(s5), o6 = { target: r5, expiry: i6 };
      this.expirations.set(r5, o6), this.checkExpiry(r5, o6), this.events.emit(M6.created, { target: r5, expiration: o6 });
    }), x7(this, "get", (s5) => {
      this.isInitialized();
      const i6 = this.formatTarget(s5);
      return this.getExpiration(i6);
    }), x7(this, "del", (s5) => {
      if (this.isInitialized(), this.has(s5)) {
        const i6 = this.formatTarget(s5), r5 = this.getExpiration(i6);
        this.expirations.delete(i6), this.events.emit(M6.deleted, { target: i6, expiration: r5 });
      }
    }), x7(this, "on", (s5, i6) => {
      this.events.on(s5, i6);
    }), x7(this, "once", (s5, i6) => {
      this.events.once(s5, i6);
    }), x7(this, "off", (s5, i6) => {
      this.events.off(s5, i6);
    }), x7(this, "removeListener", (s5, i6) => {
      this.events.removeListener(s5, i6);
    }), this.logger = E5(t3, this.name);
  }
  get context() {
    return y4(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.expirations.size;
  }
  get keys() {
    return Array.from(this.expirations.keys());
  }
  get values() {
    return Array.from(this.expirations.values());
  }
  formatTarget(e4) {
    if (typeof e4 == "string") return uo2(e4);
    if (typeof e4 == "number") return fo2(e4);
    const { message: t3 } = te2("UNKNOWN_TYPE", `Target type: ${typeof e4}`);
    throw new Error(t3);
  }
  async setExpirations(e4) {
    await this.core.storage.setItem(this.storageKey, e4);
  }
  async getExpirations() {
    return await this.core.storage.getItem(this.storageKey);
  }
  async persist() {
    await this.setExpirations(this.values), this.events.emit(M6.sync);
  }
  async restore() {
    try {
      const e4 = await this.getExpirations();
      if (typeof e4 > "u" || !e4.length) return;
      if (this.expirations.size) {
        const { message: t3 } = te2("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t3), new Error(t3);
      }
      this.cached = e4, this.logger.debug(`Successfully Restored expirations for ${this.name}`), this.logger.trace({ type: "method", method: "restore", expirations: this.values });
    } catch (e4) {
      this.logger.debug(`Failed to Restore expirations for ${this.name}`), this.logger.error(e4);
    }
  }
  getExpiration(e4) {
    const t3 = this.expirations.get(e4);
    if (!t3) {
      const { message: s5 } = te2("NO_MATCHING_KEY", `${this.name}: ${e4}`);
      throw this.logger.warn(s5), new Error(s5);
    }
    return t3;
  }
  checkExpiry(e4, t3) {
    const { expiry: s5 } = t3;
    (0, import_time4.toMiliseconds)(s5) - Date.now() <= 0 && this.expire(e4, t3);
  }
  expire(e4, t3) {
    this.expirations.delete(e4), this.events.emit(M6.expired, { target: e4, expiration: t3 });
  }
  checkExpirations() {
    this.core.relayer.connected && this.expirations.forEach((e4, t3) => this.checkExpiry(t3, e4));
  }
  registerEventListeners() {
    this.core.heartbeat.on(r3.pulse, () => this.checkExpirations()), this.events.on(M6.created, (e4) => {
      const t3 = M6.created;
      this.logger.info(`Emitting ${t3}`), this.logger.debug({ type: "event", event: t3, data: e4 }), this.persist();
    }), this.events.on(M6.expired, (e4) => {
      const t3 = M6.expired;
      this.logger.info(`Emitting ${t3}`), this.logger.debug({ type: "event", event: t3, data: e4 }), this.persist();
    }), this.events.on(M6.deleted, (e4) => {
      const t3 = M6.deleted;
      this.logger.info(`Emitting ${t3}`), this.logger.debug({ type: "event", event: t3, data: e4 }), this.persist();
    });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e4 } = te2("NOT_INITIALIZED", this.name);
      throw new Error(e4);
    }
  }
};
var Zn3 = Object.defineProperty;
var Qn3 = (n7, e4, t3) => e4 in n7 ? Zn3(n7, e4, { enumerable: true, configurable: true, writable: true, value: t3 }) : n7[e4] = t3;
var _6 = (n7, e4, t3) => Qn3(n7, typeof e4 != "symbol" ? e4 + "" : e4, t3);
var xi = class extends M3 {
  constructor(e4, t3, s5) {
    super(e4, t3, s5), this.core = e4, this.logger = t3, this.store = s5, _6(this, "name", jt3), _6(this, "abortController"), _6(this, "isDevEnv"), _6(this, "verifyUrlV3", qt2), _6(this, "storagePrefix", B3), _6(this, "version", Oe3), _6(this, "publicKey"), _6(this, "fetchPromise"), _6(this, "init", async () => {
      var i6;
      this.isDevEnv || (this.publicKey = await this.store.getItem(this.storeKey), this.publicKey && (0, import_time4.toMiliseconds)((i6 = this.publicKey) == null ? void 0 : i6.expiresAt) < Date.now() && (this.logger.debug("verify v2 public key expired"), await this.removePublicKey()));
    }), _6(this, "register", async (i6) => {
      if (!Ae2() || this.isDevEnv) return;
      const r5 = window.location.origin, { id: o6, decryptedId: a5 } = i6, c8 = `${this.verifyUrlV3}/attestation?projectId=${this.core.projectId}&origin=${r5}&id=${o6}&decryptedId=${a5}`;
      try {
        const h7 = (0, import_window_getters2.getDocument)(), u4 = this.startAbortTimer(import_time4.ONE_SECOND * 5), g5 = await new Promise((m5, A6) => {
          const l9 = () => {
            window.removeEventListener("message", O5), h7.body.removeChild(y6), A6("attestation aborted");
          };
          this.abortController.signal.addEventListener("abort", l9);
          const y6 = h7.createElement("iframe");
          y6.src = c8, y6.style.display = "none", y6.addEventListener("error", l9, { signal: this.abortController.signal });
          const O5 = (w6) => {
            if (w6.data && typeof w6.data == "string") try {
              const v7 = JSON.parse(w6.data);
              if (v7.type === "verify_attestation") {
                if (sn(v7.attestation).payload.id !== o6) return;
                clearInterval(u4), h7.body.removeChild(y6), this.abortController.signal.removeEventListener("abort", l9), window.removeEventListener("message", O5), m5(v7.attestation === null ? "" : v7.attestation);
              }
            } catch (v7) {
              this.logger.warn(v7);
            }
          };
          h7.body.appendChild(y6), window.addEventListener("message", O5, { signal: this.abortController.signal });
        });
        return this.logger.debug("jwt attestation", g5), g5;
      } catch (h7) {
        this.logger.warn(h7);
      }
      return "";
    }), _6(this, "resolve", async (i6) => {
      if (this.isDevEnv) return "";
      const { attestationId: r5, hash: o6, encryptedId: a5 } = i6;
      if (r5 === "") {
        this.logger.debug("resolve: attestationId is empty, skipping");
        return;
      }
      if (r5) {
        if (sn(r5).payload.id !== a5) return;
        const h7 = await this.isValidJwtAttestation(r5);
        if (h7) {
          if (!h7.isVerified) {
            this.logger.warn("resolve: jwt attestation: origin url not verified");
            return;
          }
          return h7;
        }
      }
      if (!o6) return;
      const c8 = this.getVerifyUrl(i6 == null ? void 0 : i6.verifyUrl);
      return this.fetchAttestation(o6, c8);
    }), _6(this, "fetchAttestation", async (i6, r5) => {
      this.logger.debug(`resolving attestation: ${i6} from url: ${r5}`);
      const o6 = this.startAbortTimer(import_time4.ONE_SECOND * 5), a5 = await fetch(`${r5}/attestation/${i6}?v2Supported=true`, { signal: this.abortController.signal });
      return clearTimeout(o6), a5.status === 200 ? await a5.json() : void 0;
    }), _6(this, "getVerifyUrl", (i6) => {
      let r5 = i6 || le3;
      return Gt3.includes(r5) || (this.logger.info(`verify url: ${r5}, not included in trusted list, assigning default: ${le3}`), r5 = le3), r5;
    }), _6(this, "fetchPublicKey", async () => {
      try {
        this.logger.debug(`fetching public key from: ${this.verifyUrlV3}`);
        const i6 = this.startAbortTimer(import_time4.FIVE_SECONDS), r5 = await fetch(`${this.verifyUrlV3}/public-key`, { signal: this.abortController.signal });
        return clearTimeout(i6), await r5.json();
      } catch (i6) {
        this.logger.warn(i6);
      }
    }), _6(this, "persistPublicKey", async (i6) => {
      this.logger.debug("persisting public key to local storage", i6), await this.store.setItem(this.storeKey, i6), this.publicKey = i6;
    }), _6(this, "removePublicKey", async () => {
      this.logger.debug("removing verify v2 public key from storage"), await this.store.removeItem(this.storeKey), this.publicKey = void 0;
    }), _6(this, "isValidJwtAttestation", async (i6) => {
      const r5 = await this.getPublicKey();
      try {
        if (r5) return this.validateAttestation(i6, r5);
      } catch (a5) {
        this.logger.error(a5), this.logger.warn("error validating attestation");
      }
      const o6 = await this.fetchAndPersistPublicKey();
      try {
        if (o6) return this.validateAttestation(i6, o6);
      } catch (a5) {
        this.logger.error(a5), this.logger.warn("error validating attestation");
      }
    }), _6(this, "getPublicKey", async () => this.publicKey ? this.publicKey : await this.fetchAndPersistPublicKey()), _6(this, "fetchAndPersistPublicKey", async () => {
      if (this.fetchPromise) return await this.fetchPromise, this.publicKey;
      this.fetchPromise = new Promise(async (r5) => {
        const o6 = await this.fetchPublicKey();
        o6 && (await this.persistPublicKey(o6), r5(o6));
      });
      const i6 = await this.fetchPromise;
      return this.fetchPromise = void 0, i6;
    }), _6(this, "validateAttestation", (i6, r5) => {
      const o6 = gi(i6, r5.publicKey), a5 = { hasExpired: (0, import_time4.toMiliseconds)(o6.exp) < Date.now(), payload: o6 };
      if (a5.hasExpired) throw this.logger.warn("resolve: jwt attestation expired"), new Error("JWT attestation expired");
      return { origin: a5.payload.origin, isScam: a5.payload.isScam, isVerified: a5.payload.isVerified };
    }), this.logger = E5(t3, this.name), this.abortController = new AbortController(), this.isDevEnv = Eo2(), this.init();
  }
  get storeKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//verify:public:key";
  }
  get context() {
    return y4(this.logger);
  }
  startAbortTimer(e4) {
    return this.abortController = new AbortController(), setTimeout(() => this.abortController.abort(), (0, import_time4.toMiliseconds)(e4));
  }
};
var eo2 = Object.defineProperty;
var to2 = (n7, e4, t3) => e4 in n7 ? eo2(n7, e4, { enumerable: true, configurable: true, writable: true, value: t3 }) : n7[e4] = t3;
var Oi = (n7, e4, t3) => to2(n7, typeof e4 != "symbol" ? e4 + "" : e4, t3);
var Ai = class extends O4 {
  constructor(e4, t3) {
    super(e4, t3), this.projectId = e4, this.logger = t3, Oi(this, "context", Ht2), Oi(this, "registerDeviceToken", async (s5) => {
      const { clientId: i6, token: r5, notificationType: o6, enableEncrypted: a5 = false } = s5, c8 = `${Yt3}/${this.projectId}/clients`;
      await fetch(c8, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ client_id: i6, type: o6, token: r5, always_raw: a5 }) });
    }), this.logger = E5(t3, this.context);
  }
};
var io2 = Object.defineProperty;
var Ni = Object.getOwnPropertySymbols;
var so2 = Object.prototype.hasOwnProperty;
var ro3 = Object.prototype.propertyIsEnumerable;
var qe3 = (n7, e4, t3) => e4 in n7 ? io2(n7, e4, { enumerable: true, configurable: true, writable: true, value: t3 }) : n7[e4] = t3;
var pe2 = (n7, e4) => {
  for (var t3 in e4 || (e4 = {})) so2.call(e4, t3) && qe3(n7, t3, e4[t3]);
  if (Ni) for (var t3 of Ni(e4)) ro3.call(e4, t3) && qe3(n7, t3, e4[t3]);
  return n7;
};
var E6 = (n7, e4, t3) => qe3(n7, typeof e4 != "symbol" ? e4 + "" : e4, t3);
var $i2 = class extends R2 {
  constructor(e4, t3, s5 = true) {
    super(e4, t3, s5), this.core = e4, this.logger = t3, E6(this, "context", Xt2), E6(this, "storagePrefix", B3), E6(this, "storageVersion", Jt3), E6(this, "events", /* @__PURE__ */ new Map()), E6(this, "shouldPersist", false), E6(this, "init", async () => {
      if (!Eo2()) try {
        const i6 = { eventId: wo2(), timestamp: Date.now(), domain: this.getAppDomain(), props: { event: "INIT", type: "", properties: { client_id: await this.core.crypto.getClientId(), user_agent: Yt2(this.core.relayer.protocol, this.core.relayer.version, me3) } } };
        await this.sendEvent([i6]);
      } catch (i6) {
        this.logger.warn(i6);
      }
    }), E6(this, "createEvent", (i6) => {
      const { event: r5 = "ERROR", type: o6 = "", properties: { topic: a5, trace: c8 } } = i6, h7 = wo2(), u4 = this.core.projectId || "", g5 = Date.now(), m5 = pe2({ eventId: h7, timestamp: g5, props: { event: r5, type: o6, properties: { topic: a5, trace: c8 } }, bundleId: u4, domain: this.getAppDomain() }, this.setMethods(h7));
      return this.telemetryEnabled && (this.events.set(h7, m5), this.shouldPersist = true), m5;
    }), E6(this, "getEvent", (i6) => {
      const { eventId: r5, topic: o6 } = i6;
      if (r5) return this.events.get(r5);
      const a5 = Array.from(this.events.values()).find((c8) => c8.props.properties.topic === o6);
      if (a5) return pe2(pe2({}, a5), this.setMethods(a5.eventId));
    }), E6(this, "deleteEvent", (i6) => {
      const { eventId: r5 } = i6;
      this.events.delete(r5), this.shouldPersist = true;
    }), E6(this, "setEventListeners", () => {
      this.core.heartbeat.on(r3.pulse, async () => {
        this.shouldPersist && await this.persist(), this.events.forEach((i6) => {
          (0, import_time4.fromMiliseconds)(Date.now()) - (0, import_time4.fromMiliseconds)(i6.timestamp) > Wt3 && (this.events.delete(i6.eventId), this.shouldPersist = true);
        });
      });
    }), E6(this, "setMethods", (i6) => ({ addTrace: (r5) => this.addTrace(i6, r5), setError: (r5) => this.setError(i6, r5) })), E6(this, "addTrace", (i6, r5) => {
      const o6 = this.events.get(i6);
      o6 && (o6.props.properties.trace.push(r5), this.events.set(i6, o6), this.shouldPersist = true);
    }), E6(this, "setError", (i6, r5) => {
      const o6 = this.events.get(i6);
      o6 && (o6.props.type = r5, o6.timestamp = Date.now(), this.events.set(i6, o6), this.shouldPersist = true);
    }), E6(this, "persist", async () => {
      await this.core.storage.setItem(this.storageKey, Array.from(this.events.values())), this.shouldPersist = false;
    }), E6(this, "restore", async () => {
      try {
        const i6 = await this.core.storage.getItem(this.storageKey) || [];
        if (!i6.length) return;
        i6.forEach((r5) => {
          this.events.set(r5.eventId, pe2(pe2({}, r5), this.setMethods(r5.eventId)));
        });
      } catch (i6) {
        this.logger.warn(i6);
      }
    }), E6(this, "submit", async () => {
      if (!this.telemetryEnabled || this.events.size === 0) return;
      const i6 = [];
      for (const [r5, o6] of this.events) o6.props.type && i6.push(o6);
      if (i6.length !== 0) try {
        if ((await this.sendEvent(i6)).ok) for (const r5 of i6) this.events.delete(r5.eventId), this.shouldPersist = true;
      } catch (r5) {
        this.logger.warn(r5);
      }
    }), E6(this, "sendEvent", async (i6) => {
      const r5 = this.getAppDomain() ? "" : "&sp=desktop";
      return await fetch(`${Zt2}?projectId=${this.core.projectId}&st=events_sdk&sv=js-${me3}${r5}`, { method: "POST", body: JSON.stringify(i6) });
    }), E6(this, "getAppDomain", () => Yr2().url), this.logger = E5(t3, this.context), this.telemetryEnabled = s5, s5 ? this.restore().then(async () => {
      await this.submit(), this.setEventListeners();
    }) : this.persist();
  }
  get storageKey() {
    return this.storagePrefix + this.storageVersion + this.core.customStoragePrefix + "//" + this.context;
  }
};
var no3 = Object.defineProperty;
var zi2 = Object.getOwnPropertySymbols;
var oo2 = Object.prototype.hasOwnProperty;
var ao3 = Object.prototype.propertyIsEnumerable;
var Ge3 = (n7, e4, t3) => e4 in n7 ? no3(n7, e4, { enumerable: true, configurable: true, writable: true, value: t3 }) : n7[e4] = t3;
var Li2 = (n7, e4) => {
  for (var t3 in e4 || (e4 = {})) oo2.call(e4, t3) && Ge3(n7, t3, e4[t3]);
  if (zi2) for (var t3 of zi2(e4)) ao3.call(e4, t3) && Ge3(n7, t3, e4[t3]);
  return n7;
};
var f7 = (n7, e4, t3) => Ge3(n7, typeof e4 != "symbol" ? e4 + "" : e4, t3);
var _e3 = class __e extends h5 {
  constructor(e4) {
    var t3;
    super(e4), f7(this, "protocol", xe3), f7(this, "version", Oe3), f7(this, "name", he2), f7(this, "relayUrl"), f7(this, "projectId"), f7(this, "customStoragePrefix"), f7(this, "events", new import_events7.EventEmitter()), f7(this, "logger"), f7(this, "heartbeat"), f7(this, "relayer"), f7(this, "crypto"), f7(this, "storage"), f7(this, "history"), f7(this, "expirer"), f7(this, "pairing"), f7(this, "verify"), f7(this, "echoClient"), f7(this, "linkModeSupportedApps"), f7(this, "eventClient"), f7(this, "initialized", false), f7(this, "logChunkController"), f7(this, "on", (o6, a5) => this.events.on(o6, a5)), f7(this, "once", (o6, a5) => this.events.once(o6, a5)), f7(this, "off", (o6, a5) => this.events.off(o6, a5)), f7(this, "removeListener", (o6, a5) => this.events.removeListener(o6, a5)), f7(this, "dispatchEnvelope", ({ topic: o6, message: a5, sessionExists: c8 }) => {
      if (!o6 || !a5) return;
      const h7 = { topic: o6, message: a5, publishedAt: Date.now(), transportType: Q4.link_mode };
      this.relayer.onLinkMessageEvent(h7, { sessionExists: c8 });
    }), this.projectId = e4 == null ? void 0 : e4.projectId, this.relayUrl = (e4 == null ? void 0 : e4.relayUrl) || $e3, this.customStoragePrefix = e4 != null && e4.customStoragePrefix ? `:${e4.customStoragePrefix}` : "";
    const s5 = k4({ level: typeof (e4 == null ? void 0 : e4.logger) == "string" && e4.logger ? e4.logger : mt2.logger, name: he2 }), { logger: i6, chunkLoggerController: r5 } = A4({ opts: s5, maxSizeInBytes: e4 == null ? void 0 : e4.maxLogBlobSizeInBytes, loggerOverride: e4 == null ? void 0 : e4.logger });
    this.logChunkController = r5, (t3 = this.logChunkController) != null && t3.downloadLogsBlobInBrowser && (window.downloadLogsBlobInBrowser = async () => {
      var o6, a5;
      (o6 = this.logChunkController) != null && o6.downloadLogsBlobInBrowser && ((a5 = this.logChunkController) == null || a5.downloadLogsBlobInBrowser({ clientId: await this.crypto.getClientId() }));
    }), this.logger = E5(i6, this.name), this.heartbeat = new i3(), this.crypto = new bi2(this, this.logger, e4 == null ? void 0 : e4.keychain), this.history = new Si(this, this.logger), this.expirer = new Ri2(this, this.logger), this.storage = e4 != null && e4.storage ? e4.storage : new h3(Li2(Li2({}, vt3), e4 == null ? void 0 : e4.storageOptions)), this.relayer = new wi2({ core: this, logger: this.logger, relayUrl: this.relayUrl, projectId: this.projectId }), this.pairing = new Pi3(this, this.logger), this.verify = new xi(this, this.logger, this.storage), this.echoClient = new Ai(this.projectId || "", this.logger), this.linkModeSupportedApps = [], this.eventClient = new $i2(this, this.logger, e4 == null ? void 0 : e4.telemetryEnabled);
  }
  static async init(e4) {
    const t3 = new __e(e4);
    await t3.initialize();
    const s5 = await t3.crypto.getClientId();
    return await t3.storage.setItem(Nt3, s5), t3;
  }
  get context() {
    return y4(this.logger);
  }
  async start() {
    this.initialized || await this.initialize();
  }
  async getLogsBlob() {
    var e4;
    return (e4 = this.logChunkController) == null ? void 0 : e4.logsToBlob({ clientId: await this.crypto.getClientId() });
  }
  async addLinkModeSupportedApp(e4) {
    this.linkModeSupportedApps.includes(e4) || (this.linkModeSupportedApps.push(e4), await this.storage.setItem(ze3, this.linkModeSupportedApps));
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.crypto.init(), await this.history.init(), await this.expirer.init(), await this.relayer.init(), await this.heartbeat.init(), await this.pairing.init(), this.linkModeSupportedApps = await this.storage.getItem(ze3) || [], this.initialized = true, this.logger.info("Core Initialization Success");
    } catch (e4) {
      throw this.logger.warn(`Core Initialization Failure at epoch ${Date.now()}`, e4), this.logger.error(e4.message), e4;
    }
  }
};
var co3 = _e3;

// node_modules/@walletconnect/sign-client/node_modules/@walletconnect/types/dist/index.es.js
var import_events9 = __toESM(require_events());
var T6 = Object.defineProperty;
var k6 = (e4, s5, r5) => s5 in e4 ? T6(e4, s5, { enumerable: true, configurable: true, writable: true, value: r5 }) : e4[s5] = r5;
var i5 = (e4, s5, r5) => k6(e4, typeof s5 != "symbol" ? s5 + "" : s5, r5);
var J5 = class {
  constructor(s5) {
    this.opts = s5, i5(this, "protocol", "wc"), i5(this, "version", 2);
  }
};
var V3 = class {
  constructor(s5) {
    this.client = s5;
  }
};

// node_modules/@walletconnect/sign-client/dist/index.es.js
var import_time5 = __toESM(require_cjs4());
var import_events10 = __toESM(require_events());
var De3 = "wc";
var Le4 = 2;
var Me4 = "client";
var me4 = `${De3}@${Le4}:${Me4}:`;
var _e4 = { name: Me4, logger: "error", controller: false, relayUrl: "wss://relay.walletconnect.org" };
var ke4 = "WALLETCONNECT_DEEPLINK_CHOICE";
var pt2 = "proposal";
var $e4 = "Proposal expired";
var ht3 = "session";
var Y3 = import_time5.SEVEN_DAYS;
var dt3 = "engine";
var N10 = { wc_sessionPropose: { req: { ttl: import_time5.FIVE_MINUTES, prompt: true, tag: 1100 }, res: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1101 }, reject: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1120 }, autoReject: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1121 } }, wc_sessionSettle: { req: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1102 }, res: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1103 } }, wc_sessionUpdate: { req: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1104 }, res: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1105 } }, wc_sessionExtend: { req: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1106 }, res: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1107 } }, wc_sessionRequest: { req: { ttl: import_time5.FIVE_MINUTES, prompt: true, tag: 1108 }, res: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1109 } }, wc_sessionEvent: { req: { ttl: import_time5.FIVE_MINUTES, prompt: true, tag: 1110 }, res: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1111 } }, wc_sessionDelete: { req: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1112 }, res: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1113 } }, wc_sessionPing: { req: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1114 }, res: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1115 } }, wc_sessionAuthenticate: { req: { ttl: import_time5.ONE_HOUR, prompt: true, tag: 1116 }, res: { ttl: import_time5.ONE_HOUR, prompt: false, tag: 1117 }, reject: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1118 }, autoReject: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1119 } } };
var Ee4 = { min: import_time5.FIVE_MINUTES, max: import_time5.SEVEN_DAYS };
var $4 = { idle: "IDLE", active: "ACTIVE" };
var Ke4 = { eth_sendTransaction: { key: "" }, eth_sendRawTransaction: { key: "" }, wallet_sendCalls: { key: "" }, solana_signTransaction: { key: "signature" }, solana_signAllTransactions: { key: "transactions" }, solana_signAndSendTransaction: { key: "signature" } };
var ut3 = "request";
var gt3 = ["wc_sessionPropose", "wc_sessionRequest", "wc_authRequest", "wc_sessionAuthenticate"];
var yt3 = "wc";
var wt4 = "auth";
var mt3 = "authKeys";
var _t4 = "pairingTopics";
var Et4 = "requests";
var ce2 = `${yt3}@${1.5}:${wt4}:`;
var le4 = `${ce2}:PUB_KEY`;
var Rs2 = Object.defineProperty;
var fs2 = Object.defineProperties;
var Is2 = Object.getOwnPropertyDescriptors;
var St4 = Object.getOwnPropertySymbols;
var vs2 = Object.prototype.hasOwnProperty;
var qs3 = Object.prototype.propertyIsEnumerable;
var Ue4 = (S5, n7, e4) => n7 in S5 ? Rs2(S5, n7, { enumerable: true, configurable: true, writable: true, value: e4 }) : S5[n7] = e4;
var v6 = (S5, n7) => {
  for (var e4 in n7 || (n7 = {})) vs2.call(n7, e4) && Ue4(S5, e4, n7[e4]);
  if (St4) for (var e4 of St4(n7)) qs3.call(n7, e4) && Ue4(S5, e4, n7[e4]);
  return S5;
};
var x8 = (S5, n7) => fs2(S5, Is2(n7));
var c7 = (S5, n7, e4) => Ue4(S5, typeof n7 != "symbol" ? n7 + "" : n7, e4);
var Ts2 = class extends V3 {
  constructor(n7) {
    super(n7), c7(this, "name", dt3), c7(this, "events", new import_events10.default()), c7(this, "initialized", false), c7(this, "requestQueue", { state: $4.idle, queue: [] }), c7(this, "sessionRequestQueue", { state: $4.idle, queue: [] }), c7(this, "requestQueueDelay", import_time5.ONE_SECOND), c7(this, "expectedPairingMethodMap", /* @__PURE__ */ new Map()), c7(this, "recentlyDeletedMap", /* @__PURE__ */ new Map()), c7(this, "recentlyDeletedLimit", 200), c7(this, "relayMessageCache", []), c7(this, "pendingSessions", /* @__PURE__ */ new Map()), c7(this, "init", async () => {
      this.initialized || (await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.registerPairingEvents(), await this.registerLinkModeListeners(), this.client.core.pairing.register({ methods: Object.keys(N10) }), this.initialized = true, setTimeout(() => {
        this.sessionRequestQueue.queue = this.getPendingSessionRequests(), this.processSessionRequestQueue();
      }, (0, import_time5.toMiliseconds)(this.requestQueueDelay)));
    }), c7(this, "connect", async (e4) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      const t3 = x8(v6({}, e4), { requiredNamespaces: e4.requiredNamespaces || {}, optionalNamespaces: e4.optionalNamespaces || {} });
      await this.isValidConnect(t3);
      const { pairingTopic: s5, requiredNamespaces: i6, optionalNamespaces: r5, sessionProperties: o6, relays: a5 } = t3;
      let l9 = s5, u4, g5 = false;
      try {
        if (l9) {
          const R4 = this.client.core.pairing.pairings.get(l9);
          this.client.logger.warn("connect() with existing pairing topic is deprecated and will be removed in the next major release."), g5 = R4.active;
        }
      } catch (R4) {
        throw this.client.logger.error(`connect() -> pairing.get(${l9}) failed`), R4;
      }
      if (!l9 || !g5) {
        const { topic: R4, uri: D5 } = await this.client.core.pairing.create();
        l9 = R4, u4 = D5;
      }
      if (!l9) {
        const { message: R4 } = te2("NO_MATCHING_KEY", `connect() pairing topic: ${l9}`);
        throw new Error(R4);
      }
      const h7 = await this.client.core.crypto.generateKeyPair(), d7 = N10.wc_sessionPropose.req.ttl || import_time5.FIVE_MINUTES, y6 = ho2(d7), m5 = x8(v6({ requiredNamespaces: i6, optionalNamespaces: r5, relays: a5 ?? [{ protocol: Pt3 }], proposer: { publicKey: h7, metadata: this.client.metadata }, expiryTimestamp: y6, pairingTopic: l9 }, o6 && { sessionProperties: o6 }), { id: payloadId() }), I5 = go2("session_connect", m5.id), { reject: p6, resolve: E7, done: V4 } = co2(d7, $e4), q5 = ({ id: R4 }) => {
        R4 === m5.id && (this.client.events.off("proposal_expire", q5), this.pendingSessions.delete(m5.id), this.events.emit(I5, { error: { message: $e4, code: 0 } }));
      };
      return this.client.events.on("proposal_expire", q5), this.events.once(I5, ({ error: R4, session: D5 }) => {
        this.client.events.off("proposal_expire", q5), R4 ? p6(R4) : D5 && E7(D5);
      }), await this.sendRequest({ topic: l9, method: "wc_sessionPropose", params: m5, throwOnFailedPublish: true, clientRpcId: m5.id }), await this.setProposal(m5.id, m5), { uri: u4, approval: V4 };
    }), c7(this, "pair", async (e4) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        return await this.client.core.pairing.pair(e4);
      } catch (t3) {
        throw this.client.logger.error("pair() failed"), t3;
      }
    }), c7(this, "approve", async (e4) => {
      var t3, s5, i6;
      const r5 = this.client.core.eventClient.createEvent({ properties: { topic: (t3 = e4 == null ? void 0 : e4.id) == null ? void 0 : t3.toString(), trace: [qs2.session_approve_started] } });
      try {
        this.isInitialized(), await this.confirmOnlineStateOrThrow();
      } catch (P6) {
        throw r5.setError(Gs2.no_internet_connection), P6;
      }
      try {
        await this.isValidProposalId(e4 == null ? void 0 : e4.id);
      } catch (P6) {
        throw this.client.logger.error(`approve() -> proposal.get(${e4 == null ? void 0 : e4.id}) failed`), r5.setError(Gs2.proposal_not_found), P6;
      }
      try {
        await this.isValidApprove(e4);
      } catch (P6) {
        throw this.client.logger.error("approve() -> isValidApprove() failed"), r5.setError(Gs2.session_approve_namespace_validation_failure), P6;
      }
      const { id: o6, relayProtocol: a5, namespaces: l9, sessionProperties: u4, sessionConfig: g5 } = e4, h7 = this.client.proposal.get(o6);
      this.client.core.eventClient.deleteEvent({ eventId: r5.eventId });
      const { pairingTopic: d7, proposer: y6, requiredNamespaces: m5, optionalNamespaces: I5 } = h7;
      let p6 = (s5 = this.client.core.eventClient) == null ? void 0 : s5.getEvent({ topic: d7 });
      p6 || (p6 = (i6 = this.client.core.eventClient) == null ? void 0 : i6.createEvent({ type: qs2.session_approve_started, properties: { topic: d7, trace: [qs2.session_approve_started, qs2.session_namespaces_validation_success] } }));
      const E7 = await this.client.core.crypto.generateKeyPair(), V4 = y6.publicKey, q5 = await this.client.core.crypto.generateSharedKey(E7, V4), R4 = v6(v6({ relay: { protocol: a5 ?? "irn" }, namespaces: l9, controller: { publicKey: E7, metadata: this.client.metadata }, expiry: ho2(Y3) }, u4 && { sessionProperties: u4 }), g5 && { sessionConfig: g5 }), D5 = Q4.relay;
      p6.addTrace(qs2.subscribing_session_topic);
      try {
        await this.client.core.relayer.subscribe(q5, { transportType: D5 });
      } catch (P6) {
        throw p6.setError(Gs2.subscribe_session_topic_failure), P6;
      }
      p6.addTrace(qs2.subscribe_session_topic_success);
      const ee3 = x8(v6({}, R4), { topic: q5, requiredNamespaces: m5, optionalNamespaces: I5, pairingTopic: d7, acknowledged: false, self: R4.controller, peer: { publicKey: y6.publicKey, metadata: y6.metadata }, controller: E7, transportType: Q4.relay });
      await this.client.session.set(q5, ee3), p6.addTrace(qs2.store_session);
      try {
        p6.addTrace(qs2.publishing_session_settle), await this.sendRequest({ topic: q5, method: "wc_sessionSettle", params: R4, throwOnFailedPublish: true }).catch((P6) => {
          throw p6 == null ? void 0 : p6.setError(Gs2.session_settle_publish_failure), P6;
        }), p6.addTrace(qs2.session_settle_publish_success), p6.addTrace(qs2.publishing_session_approve), await this.sendResult({ id: o6, topic: d7, result: { relay: { protocol: a5 ?? "irn" }, responderPublicKey: E7 }, throwOnFailedPublish: true }).catch((P6) => {
          throw p6 == null ? void 0 : p6.setError(Gs2.session_approve_publish_failure), P6;
        }), p6.addTrace(qs2.session_approve_publish_success);
      } catch (P6) {
        throw this.client.logger.error(P6), this.client.session.delete(q5, de2("USER_DISCONNECTED")), await this.client.core.relayer.unsubscribe(q5), P6;
      }
      return this.client.core.eventClient.deleteEvent({ eventId: p6.eventId }), await this.client.core.pairing.updateMetadata({ topic: d7, metadata: y6.metadata }), await this.client.proposal.delete(o6, de2("USER_DISCONNECTED")), await this.client.core.pairing.activate({ topic: d7 }), await this.setExpiry(q5, ho2(Y3)), { topic: q5, acknowledged: () => Promise.resolve(this.client.session.get(q5)) };
    }), c7(this, "reject", async (e4) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidReject(e4);
      } catch (r5) {
        throw this.client.logger.error("reject() -> isValidReject() failed"), r5;
      }
      const { id: t3, reason: s5 } = e4;
      let i6;
      try {
        i6 = this.client.proposal.get(t3).pairingTopic;
      } catch (r5) {
        throw this.client.logger.error(`reject() -> proposal.get(${t3}) failed`), r5;
      }
      i6 && (await this.sendError({ id: t3, topic: i6, error: s5, rpcOpts: N10.wc_sessionPropose.reject }), await this.client.proposal.delete(t3, de2("USER_DISCONNECTED")));
    }), c7(this, "update", async (e4) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidUpdate(e4);
      } catch (g5) {
        throw this.client.logger.error("update() -> isValidUpdate() failed"), g5;
      }
      const { topic: t3, namespaces: s5 } = e4, { done: i6, resolve: r5, reject: o6 } = co2(), a5 = payloadId(), l9 = getBigIntRpcId().toString(), u4 = this.client.session.get(t3).namespaces;
      return this.events.once(go2("session_update", a5), ({ error: g5 }) => {
        g5 ? o6(g5) : r5();
      }), await this.client.session.update(t3, { namespaces: s5 }), await this.sendRequest({ topic: t3, method: "wc_sessionUpdate", params: { namespaces: s5 }, throwOnFailedPublish: true, clientRpcId: a5, relayRpcId: l9 }).catch((g5) => {
        this.client.logger.error(g5), this.client.session.update(t3, { namespaces: u4 }), o6(g5);
      }), { acknowledged: i6 };
    }), c7(this, "extend", async (e4) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidExtend(e4);
      } catch (a5) {
        throw this.client.logger.error("extend() -> isValidExtend() failed"), a5;
      }
      const { topic: t3 } = e4, s5 = payloadId(), { done: i6, resolve: r5, reject: o6 } = co2();
      return this.events.once(go2("session_extend", s5), ({ error: a5 }) => {
        a5 ? o6(a5) : r5();
      }), await this.setExpiry(t3, ho2(Y3)), this.sendRequest({ topic: t3, method: "wc_sessionExtend", params: {}, clientRpcId: s5, throwOnFailedPublish: true }).catch((a5) => {
        o6(a5);
      }), { acknowledged: i6 };
    }), c7(this, "request", async (e4) => {
      this.isInitialized();
      try {
        await this.isValidRequest(e4);
      } catch (p6) {
        throw this.client.logger.error("request() -> isValidRequest() failed"), p6;
      }
      const { chainId: t3, request: s5, topic: i6, expiry: r5 = N10.wc_sessionRequest.req.ttl } = e4, o6 = this.client.session.get(i6);
      (o6 == null ? void 0 : o6.transportType) === Q4.relay && await this.confirmOnlineStateOrThrow();
      const a5 = payloadId(), l9 = getBigIntRpcId().toString(), { done: u4, resolve: g5, reject: h7 } = co2(r5, "Request expired. Please try again.");
      this.events.once(go2("session_request", a5), ({ error: p6, result: E7 }) => {
        p6 ? h7(p6) : g5(E7);
      });
      const d7 = "wc_sessionRequest", y6 = this.getAppLinkIfEnabled(o6.peer.metadata, o6.transportType);
      if (y6) return await this.sendRequest({ clientRpcId: a5, relayRpcId: l9, topic: i6, method: d7, params: { request: x8(v6({}, s5), { expiryTimestamp: ho2(r5) }), chainId: t3 }, expiry: r5, throwOnFailedPublish: true, appLink: y6 }).catch((p6) => h7(p6)), this.client.events.emit("session_request_sent", { topic: i6, request: s5, chainId: t3, id: a5 }), await u4();
      const m5 = { request: x8(v6({}, s5), { expiryTimestamp: ho2(r5) }), chainId: t3 }, I5 = this.shouldSetTVF(d7, m5);
      return await Promise.all([new Promise(async (p6) => {
        await this.sendRequest(v6({ clientRpcId: a5, relayRpcId: l9, topic: i6, method: d7, params: m5, expiry: r5, throwOnFailedPublish: true }, I5 && { tvf: this.getTVFParams(a5, m5) })).catch((E7) => h7(E7)), this.client.events.emit("session_request_sent", { topic: i6, request: s5, chainId: t3, id: a5 }), p6();
      }), new Promise(async (p6) => {
        var E7;
        if (!((E7 = o6.sessionConfig) != null && E7.disableDeepLink)) {
          const V4 = await mo2(this.client.core.storage, ke4);
          await yo2({ id: a5, topic: i6, wcDeepLink: V4 });
        }
        p6();
      }), u4()]).then((p6) => p6[2]);
    }), c7(this, "respond", async (e4) => {
      this.isInitialized(), await this.isValidRespond(e4);
      const { topic: t3, response: s5 } = e4, { id: i6 } = s5, r5 = this.client.session.get(t3);
      r5.transportType === Q4.relay && await this.confirmOnlineStateOrThrow();
      const o6 = this.getAppLinkIfEnabled(r5.peer.metadata, r5.transportType);
      isJsonRpcResult(s5) ? await this.sendResult({ id: i6, topic: t3, result: s5.result, throwOnFailedPublish: true, appLink: o6 }) : isJsonRpcError(s5) && await this.sendError({ id: i6, topic: t3, error: s5.error, appLink: o6 }), this.cleanupAfterResponse(e4);
    }), c7(this, "ping", async (e4) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidPing(e4);
      } catch (s5) {
        throw this.client.logger.error("ping() -> isValidPing() failed"), s5;
      }
      const { topic: t3 } = e4;
      if (this.client.session.keys.includes(t3)) {
        const s5 = payloadId(), i6 = getBigIntRpcId().toString(), { done: r5, resolve: o6, reject: a5 } = co2();
        this.events.once(go2("session_ping", s5), ({ error: l9 }) => {
          l9 ? a5(l9) : o6();
        }), await Promise.all([this.sendRequest({ topic: t3, method: "wc_sessionPing", params: {}, throwOnFailedPublish: true, clientRpcId: s5, relayRpcId: i6 }), r5()]);
      } else this.client.core.pairing.pairings.keys.includes(t3) && (this.client.logger.warn("ping() on pairing topic is deprecated and will be removed in the next major release."), await this.client.core.pairing.ping({ topic: t3 }));
    }), c7(this, "emit", async (e4) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow(), await this.isValidEmit(e4);
      const { topic: t3, event: s5, chainId: i6 } = e4, r5 = getBigIntRpcId().toString(), o6 = payloadId();
      await this.sendRequest({ topic: t3, method: "wc_sessionEvent", params: { event: s5, chainId: i6 }, throwOnFailedPublish: true, relayRpcId: r5, clientRpcId: o6 });
    }), c7(this, "disconnect", async (e4) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow(), await this.isValidDisconnect(e4);
      const { topic: t3 } = e4;
      if (this.client.session.keys.includes(t3)) await this.sendRequest({ topic: t3, method: "wc_sessionDelete", params: de2("USER_DISCONNECTED"), throwOnFailedPublish: true }), await this.deleteSession({ topic: t3, emitEvent: false });
      else if (this.client.core.pairing.pairings.keys.includes(t3)) await this.client.core.pairing.disconnect({ topic: t3 });
      else {
        const { message: s5 } = te2("MISMATCHED_TOPIC", `Session or pairing topic not found: ${t3}`);
        throw new Error(s5);
      }
    }), c7(this, "find", (e4) => (this.isInitialized(), this.client.session.getAll().filter((t3) => $i(t3, e4)))), c7(this, "getPendingSessionRequests", () => this.client.pendingRequest.getAll()), c7(this, "authenticate", async (e4, t3) => {
      var s5;
      this.isInitialized(), this.isValidAuthenticate(e4);
      const i6 = t3 && this.client.core.linkModeSupportedApps.includes(t3) && ((s5 = this.client.metadata.redirect) == null ? void 0 : s5.linkMode), r5 = i6 ? Q4.link_mode : Q4.relay;
      r5 === Q4.relay && await this.confirmOnlineStateOrThrow();
      const { chains: o6, statement: a5 = "", uri: l9, domain: u4, nonce: g5, type: h7, exp: d7, nbf: y6, methods: m5 = [], expiry: I5 } = e4, p6 = [...e4.resources || []], { topic: E7, uri: V4 } = await this.client.core.pairing.create({ methods: ["wc_sessionAuthenticate"], transportType: r5 });
      this.client.logger.info({ message: "Generated new pairing", pairing: { topic: E7, uri: V4 } });
      const q5 = await this.client.core.crypto.generateKeyPair(), R4 = oi(q5);
      if (await Promise.all([this.client.auth.authKeys.set(le4, { responseTopic: R4, publicKey: q5 }), this.client.auth.pairingTopics.set(R4, { topic: R4, pairingTopic: E7 })]), await this.client.core.relayer.subscribe(R4, { transportType: r5 }), this.client.logger.info(`sending request to new pairing topic: ${E7}`), m5.length > 0) {
        const { namespace: b5 } = Ye2(o6[0]);
        let L5 = ts(b5, "request", m5);
        Me2(p6) && (L5 = ns(L5, p6.pop())), p6.push(L5);
      }
      const D5 = I5 && I5 > N10.wc_sessionAuthenticate.req.ttl ? I5 : N10.wc_sessionAuthenticate.req.ttl, ee3 = { authPayload: { type: h7 ?? "caip122", chains: o6, statement: a5, aud: l9, domain: u4, version: "1", nonce: g5, iat: (/* @__PURE__ */ new Date()).toISOString(), exp: d7, nbf: y6, resources: p6 }, requester: { publicKey: q5, metadata: this.client.metadata }, expiryTimestamp: ho2(D5) }, P6 = { eip155: { chains: o6, methods: [.../* @__PURE__ */ new Set(["personal_sign", ...m5])], events: ["chainChanged", "accountsChanged"] } }, X2 = { requiredNamespaces: {}, optionalNamespaces: P6, relays: [{ protocol: "irn" }], pairingTopic: E7, proposer: { publicKey: q5, metadata: this.client.metadata }, expiryTimestamp: ho2(N10.wc_sessionPropose.req.ttl), id: payloadId() }, { done: ft4, resolve: Fe3, reject: Re3 } = co2(D5, "Request expired"), te4 = payloadId(), pe3 = go2("session_connect", X2.id), fe4 = go2("session_request", te4), he3 = async ({ error: b5, session: L5 }) => {
        this.events.off(fe4, Ie4), b5 ? Re3(b5) : L5 && Fe3({ session: L5 });
      }, Ie4 = async (b5) => {
        var L5, je4, Qe2;
        if (await this.deletePendingAuthRequest(te4, { message: "fulfilled", code: 0 }), b5.error) {
          const ie3 = de2("WC_METHOD_UNSUPPORTED", "wc_sessionAuthenticate");
          return b5.error.code === ie3.code ? void 0 : (this.events.off(pe3, he3), Re3(b5.error.message));
        }
        await this.deleteProposal(X2.id), this.events.off(pe3, he3);
        const { cacaos: He3, responder: Q5 } = b5.result, qe4 = [], ze4 = [];
        for (const ie3 of He3) {
          await Yo2({ cacao: ie3, projectId: this.client.core.projectId }) || (this.client.logger.error(ie3, "Signature verification failed"), Re3(de2("SESSION_SETTLEMENT_FAILED", "Signature verification failed")));
          const { p: Te3 } = ie3, Ne4 = Me2(Te3.resources), Ye4 = [On2(Te3.iss)], It4 = ut2(Te3.iss);
          if (Ne4) {
            const Pe3 = rs(Ne4), vt4 = os(Ne4);
            qe4.push(...Pe3), Ye4.push(...vt4);
          }
          for (const Pe3 of Ye4) ze4.push(`${Pe3}:${It4}`);
        }
        const se3 = await this.client.core.crypto.generateSharedKey(q5, Q5.publicKey);
        let de4;
        qe4.length > 0 && (de4 = { topic: se3, acknowledged: true, self: { publicKey: q5, metadata: this.client.metadata }, peer: Q5, controller: Q5.publicKey, expiry: ho2(Y3), requiredNamespaces: {}, optionalNamespaces: {}, relay: { protocol: "irn" }, pairingTopic: E7, namespaces: Ti([...new Set(qe4)], [...new Set(ze4)]), transportType: r5 }, await this.client.core.relayer.subscribe(se3, { transportType: r5 }), await this.client.session.set(se3, de4), E7 && await this.client.core.pairing.updateMetadata({ topic: E7, metadata: Q5.metadata }), de4 = this.client.session.get(se3)), (L5 = this.client.metadata.redirect) != null && L5.linkMode && (je4 = Q5.metadata.redirect) != null && je4.linkMode && (Qe2 = Q5.metadata.redirect) != null && Qe2.universal && t3 && (this.client.core.addLinkModeSupportedApp(Q5.metadata.redirect.universal), this.client.session.update(se3, { transportType: Q4.link_mode })), Fe3({ auths: He3, session: de4 });
      };
      this.events.once(pe3, he3), this.events.once(fe4, Ie4);
      let ve4;
      try {
        if (i6) {
          const b5 = formatJsonRpcRequest("wc_sessionAuthenticate", ee3, te4);
          this.client.core.history.set(E7, b5);
          const L5 = await this.client.core.crypto.encode("", b5, { type: _e2, encoding: Qs });
          ve4 = Ei(t3, E7, L5);
        } else await Promise.all([this.sendRequest({ topic: E7, method: "wc_sessionAuthenticate", params: ee3, expiry: e4.expiry, throwOnFailedPublish: true, clientRpcId: te4 }), this.sendRequest({ topic: E7, method: "wc_sessionPropose", params: X2, expiry: N10.wc_sessionPropose.req.ttl, throwOnFailedPublish: true, clientRpcId: X2.id })]);
      } catch (b5) {
        throw this.events.off(pe3, he3), this.events.off(fe4, Ie4), b5;
      }
      return await this.setProposal(X2.id, X2), await this.setAuthRequest(te4, { request: x8(v6({}, ee3), { verifyContext: {} }), pairingTopic: E7, transportType: r5 }), { uri: ve4 ?? V4, response: ft4 };
    }), c7(this, "approveSessionAuthenticate", async (e4) => {
      const { id: t3, auths: s5 } = e4, i6 = this.client.core.eventClient.createEvent({ properties: { topic: t3.toString(), trace: [Hs2.authenticated_session_approve_started] } });
      try {
        this.isInitialized();
      } catch (I5) {
        throw i6.setError(Ys2.no_internet_connection), I5;
      }
      const r5 = this.getPendingAuthRequest(t3);
      if (!r5) throw i6.setError(Ys2.authenticated_session_pending_request_not_found), new Error(`Could not find pending auth request with id ${t3}`);
      const o6 = r5.transportType || Q4.relay;
      o6 === Q4.relay && await this.confirmOnlineStateOrThrow();
      const a5 = r5.requester.publicKey, l9 = await this.client.core.crypto.generateKeyPair(), u4 = oi(a5), g5 = { type: Ie2, receiverPublicKey: a5, senderPublicKey: l9 }, h7 = [], d7 = [];
      for (const I5 of s5) {
        if (!await Yo2({ cacao: I5, projectId: this.client.core.projectId })) {
          i6.setError(Ys2.invalid_cacao);
          const R4 = de2("SESSION_SETTLEMENT_FAILED", "Signature verification failed");
          throw await this.sendError({ id: t3, topic: u4, error: R4, encodeOpts: g5 }), new Error(R4.message);
        }
        i6.addTrace(Hs2.cacaos_verified);
        const { p: p6 } = I5, E7 = Me2(p6.resources), V4 = [On2(p6.iss)], q5 = ut2(p6.iss);
        if (E7) {
          const R4 = rs(E7), D5 = os(E7);
          h7.push(...R4), V4.push(...D5);
        }
        for (const R4 of V4) d7.push(`${R4}:${q5}`);
      }
      const y6 = await this.client.core.crypto.generateSharedKey(l9, a5);
      i6.addTrace(Hs2.create_authenticated_session_topic);
      let m5;
      if ((h7 == null ? void 0 : h7.length) > 0) {
        m5 = { topic: y6, acknowledged: true, self: { publicKey: l9, metadata: this.client.metadata }, peer: { publicKey: a5, metadata: r5.requester.metadata }, controller: a5, expiry: ho2(Y3), authentication: s5, requiredNamespaces: {}, optionalNamespaces: {}, relay: { protocol: "irn" }, pairingTopic: r5.pairingTopic, namespaces: Ti([...new Set(h7)], [...new Set(d7)]), transportType: o6 }, i6.addTrace(Hs2.subscribing_authenticated_session_topic);
        try {
          await this.client.core.relayer.subscribe(y6, { transportType: o6 });
        } catch (I5) {
          throw i6.setError(Ys2.subscribe_authenticated_session_topic_failure), I5;
        }
        i6.addTrace(Hs2.subscribe_authenticated_session_topic_success), await this.client.session.set(y6, m5), i6.addTrace(Hs2.store_authenticated_session), await this.client.core.pairing.updateMetadata({ topic: r5.pairingTopic, metadata: r5.requester.metadata });
      }
      i6.addTrace(Hs2.publishing_authenticated_session_approve);
      try {
        await this.sendResult({ topic: u4, id: t3, result: { cacaos: s5, responder: { publicKey: l9, metadata: this.client.metadata } }, encodeOpts: g5, throwOnFailedPublish: true, appLink: this.getAppLinkIfEnabled(r5.requester.metadata, o6) });
      } catch (I5) {
        throw i6.setError(Ys2.authenticated_session_approve_publish_failure), I5;
      }
      return await this.client.auth.requests.delete(t3, { message: "fulfilled", code: 0 }), await this.client.core.pairing.activate({ topic: r5.pairingTopic }), this.client.core.eventClient.deleteEvent({ eventId: i6.eventId }), { session: m5 };
    }), c7(this, "rejectSessionAuthenticate", async (e4) => {
      this.isInitialized();
      const { id: t3, reason: s5 } = e4, i6 = this.getPendingAuthRequest(t3);
      if (!i6) throw new Error(`Could not find pending auth request with id ${t3}`);
      i6.transportType === Q4.relay && await this.confirmOnlineStateOrThrow();
      const r5 = i6.requester.publicKey, o6 = await this.client.core.crypto.generateKeyPair(), a5 = oi(r5), l9 = { type: Ie2, receiverPublicKey: r5, senderPublicKey: o6 };
      await this.sendError({ id: t3, topic: a5, error: s5, encodeOpts: l9, rpcOpts: N10.wc_sessionAuthenticate.reject, appLink: this.getAppLinkIfEnabled(i6.requester.metadata, i6.transportType) }), await this.client.auth.requests.delete(t3, { message: "rejected", code: 0 }), await this.client.proposal.delete(t3, de2("USER_DISCONNECTED"));
    }), c7(this, "formatAuthMessage", (e4) => {
      this.isInitialized();
      const { request: t3, iss: s5 } = e4;
      return In2(t3, s5);
    }), c7(this, "processRelayMessageCache", () => {
      setTimeout(async () => {
        if (this.relayMessageCache.length !== 0) for (; this.relayMessageCache.length > 0; ) try {
          const e4 = this.relayMessageCache.shift();
          e4 && await this.onRelayMessage(e4);
        } catch (e4) {
          this.client.logger.error(e4);
        }
      }, 50);
    }), c7(this, "cleanupDuplicatePairings", async (e4) => {
      if (e4.pairingTopic) try {
        const t3 = this.client.core.pairing.pairings.get(e4.pairingTopic), s5 = this.client.core.pairing.pairings.getAll().filter((i6) => {
          var r5, o6;
          return ((r5 = i6.peerMetadata) == null ? void 0 : r5.url) && ((o6 = i6.peerMetadata) == null ? void 0 : o6.url) === e4.peer.metadata.url && i6.topic && i6.topic !== t3.topic;
        });
        if (s5.length === 0) return;
        this.client.logger.info(`Cleaning up ${s5.length} duplicate pairing(s)`), await Promise.all(s5.map((i6) => this.client.core.pairing.disconnect({ topic: i6.topic }))), this.client.logger.info("Duplicate pairings clean up finished");
      } catch (t3) {
        this.client.logger.error(t3);
      }
    }), c7(this, "deleteSession", async (e4) => {
      var t3;
      const { topic: s5, expirerHasDeleted: i6 = false, emitEvent: r5 = true, id: o6 = 0 } = e4, { self: a5 } = this.client.session.get(s5);
      await this.client.core.relayer.unsubscribe(s5), await this.client.session.delete(s5, de2("USER_DISCONNECTED")), this.addToRecentlyDeleted(s5, "session"), this.client.core.crypto.keychain.has(a5.publicKey) && await this.client.core.crypto.deleteKeyPair(a5.publicKey), this.client.core.crypto.keychain.has(s5) && await this.client.core.crypto.deleteSymKey(s5), i6 || this.client.core.expirer.del(s5), this.client.core.storage.removeItem(ke4).catch((l9) => this.client.logger.warn(l9)), this.getPendingSessionRequests().forEach((l9) => {
        l9.topic === s5 && this.deletePendingSessionRequest(l9.id, de2("USER_DISCONNECTED"));
      }), s5 === ((t3 = this.sessionRequestQueue.queue[0]) == null ? void 0 : t3.topic) && (this.sessionRequestQueue.state = $4.idle), r5 && this.client.events.emit("session_delete", { id: o6, topic: s5 });
    }), c7(this, "deleteProposal", async (e4, t3) => {
      if (t3) try {
        const s5 = this.client.proposal.get(e4), i6 = this.client.core.eventClient.getEvent({ topic: s5.pairingTopic });
        i6 == null ? void 0 : i6.setError(Gs2.proposal_expired);
      } catch {
      }
      await Promise.all([this.client.proposal.delete(e4, de2("USER_DISCONNECTED")), t3 ? Promise.resolve() : this.client.core.expirer.del(e4)]), this.addToRecentlyDeleted(e4, "proposal");
    }), c7(this, "deletePendingSessionRequest", async (e4, t3, s5 = false) => {
      await Promise.all([this.client.pendingRequest.delete(e4, t3), s5 ? Promise.resolve() : this.client.core.expirer.del(e4)]), this.addToRecentlyDeleted(e4, "request"), this.sessionRequestQueue.queue = this.sessionRequestQueue.queue.filter((i6) => i6.id !== e4), s5 && (this.sessionRequestQueue.state = $4.idle, this.client.events.emit("session_request_expire", { id: e4 }));
    }), c7(this, "deletePendingAuthRequest", async (e4, t3, s5 = false) => {
      await Promise.all([this.client.auth.requests.delete(e4, t3), s5 ? Promise.resolve() : this.client.core.expirer.del(e4)]);
    }), c7(this, "setExpiry", async (e4, t3) => {
      this.client.session.keys.includes(e4) && (this.client.core.expirer.set(e4, t3), await this.client.session.update(e4, { expiry: t3 }));
    }), c7(this, "setProposal", async (e4, t3) => {
      this.client.core.expirer.set(e4, ho2(N10.wc_sessionPropose.req.ttl)), await this.client.proposal.set(e4, t3);
    }), c7(this, "setAuthRequest", async (e4, t3) => {
      const { request: s5, pairingTopic: i6, transportType: r5 = Q4.relay } = t3;
      this.client.core.expirer.set(e4, s5.expiryTimestamp), await this.client.auth.requests.set(e4, { authPayload: s5.authPayload, requester: s5.requester, expiryTimestamp: s5.expiryTimestamp, id: e4, pairingTopic: i6, verifyContext: s5.verifyContext, transportType: r5 });
    }), c7(this, "setPendingSessionRequest", async (e4) => {
      const { id: t3, topic: s5, params: i6, verifyContext: r5 } = e4, o6 = i6.request.expiryTimestamp || ho2(N10.wc_sessionRequest.req.ttl);
      this.client.core.expirer.set(t3, o6), await this.client.pendingRequest.set(t3, { id: t3, topic: s5, params: i6, verifyContext: r5 });
    }), c7(this, "sendRequest", async (e4) => {
      const { topic: t3, method: s5, params: i6, expiry: r5, relayRpcId: o6, clientRpcId: a5, throwOnFailedPublish: l9, appLink: u4, tvf: g5 } = e4, h7 = formatJsonRpcRequest(s5, i6, a5);
      let d7;
      const y6 = !!u4;
      try {
        const p6 = y6 ? Qs : At;
        d7 = await this.client.core.crypto.encode(t3, h7, { encoding: p6 });
      } catch (p6) {
        throw await this.cleanup(), this.client.logger.error(`sendRequest() -> core.crypto.encode() for topic ${t3} failed`), p6;
      }
      let m5;
      if (gt3.includes(s5)) {
        const p6 = si(JSON.stringify(h7)), E7 = si(d7);
        m5 = await this.client.core.verify.register({ id: E7, decryptedId: p6 });
      }
      const I5 = N10[s5].req;
      if (I5.attestation = m5, r5 && (I5.ttl = r5), o6 && (I5.id = o6), this.client.core.history.set(t3, h7), y6) {
        const p6 = Ei(u4, t3, d7);
        await global.Linking.openURL(p6, this.client.name);
      } else {
        const p6 = N10[s5].req;
        r5 && (p6.ttl = r5), o6 && (p6.id = o6), p6.tvf = x8(v6({}, g5), { correlationId: h7.id }), l9 ? (p6.internal = x8(v6({}, p6.internal), { throwOnFailedPublish: true }), await this.client.core.relayer.publish(t3, d7, p6)) : this.client.core.relayer.publish(t3, d7, p6).catch((E7) => this.client.logger.error(E7));
      }
      return h7.id;
    }), c7(this, "sendResult", async (e4) => {
      const { id: t3, topic: s5, result: i6, throwOnFailedPublish: r5, encodeOpts: o6, appLink: a5 } = e4, l9 = formatJsonRpcResult(t3, i6);
      let u4;
      const g5 = a5 && typeof (global == null ? void 0 : global.Linking) < "u";
      try {
        const y6 = g5 ? Qs : At;
        u4 = await this.client.core.crypto.encode(s5, l9, x8(v6({}, o6 || {}), { encoding: y6 }));
      } catch (y6) {
        throw await this.cleanup(), this.client.logger.error(`sendResult() -> core.crypto.encode() for topic ${s5} failed`), y6;
      }
      let h7, d7;
      try {
        h7 = await this.client.core.history.get(s5, t3);
        const y6 = h7.request;
        try {
          this.shouldSetTVF(y6.method, y6.params) && (d7 = this.getTVFParams(t3, y6.params, i6));
        } catch (m5) {
          this.client.logger.warn("sendResult() -> getTVFParams() failed", m5);
        }
      } catch (y6) {
        throw this.client.logger.error(`sendResult() -> history.get(${s5}, ${t3}) failed`), y6;
      }
      if (g5) {
        const y6 = Ei(a5, s5, u4);
        await global.Linking.openURL(y6, this.client.name);
      } else {
        const y6 = h7.request.method, m5 = N10[y6].res;
        m5.tvf = x8(v6({}, d7), { correlationId: t3 }), r5 ? (m5.internal = x8(v6({}, m5.internal), { throwOnFailedPublish: true }), await this.client.core.relayer.publish(s5, u4, m5)) : this.client.core.relayer.publish(s5, u4, m5).catch((I5) => this.client.logger.error(I5));
      }
      await this.client.core.history.resolve(l9);
    }), c7(this, "sendError", async (e4) => {
      const { id: t3, topic: s5, error: i6, encodeOpts: r5, rpcOpts: o6, appLink: a5 } = e4, l9 = formatJsonRpcError(t3, i6);
      let u4;
      const g5 = a5 && typeof (global == null ? void 0 : global.Linking) < "u";
      try {
        const d7 = g5 ? Qs : At;
        u4 = await this.client.core.crypto.encode(s5, l9, x8(v6({}, r5 || {}), { encoding: d7 }));
      } catch (d7) {
        throw await this.cleanup(), this.client.logger.error(`sendError() -> core.crypto.encode() for topic ${s5} failed`), d7;
      }
      let h7;
      try {
        h7 = await this.client.core.history.get(s5, t3);
      } catch (d7) {
        throw this.client.logger.error(`sendError() -> history.get(${s5}, ${t3}) failed`), d7;
      }
      if (g5) {
        const d7 = Ei(a5, s5, u4);
        await global.Linking.openURL(d7, this.client.name);
      } else {
        const d7 = h7.request.method, y6 = o6 || N10[d7].res;
        this.client.core.relayer.publish(s5, u4, y6);
      }
      await this.client.core.history.resolve(l9);
    }), c7(this, "cleanup", async () => {
      const e4 = [], t3 = [];
      this.client.session.getAll().forEach((s5) => {
        let i6 = false;
        po2(s5.expiry) && (i6 = true), this.client.core.crypto.keychain.has(s5.topic) || (i6 = true), i6 && e4.push(s5.topic);
      }), this.client.proposal.getAll().forEach((s5) => {
        po2(s5.expiryTimestamp) && t3.push(s5.id);
      }), await Promise.all([...e4.map((s5) => this.deleteSession({ topic: s5 })), ...t3.map((s5) => this.deleteProposal(s5))]);
    }), c7(this, "onRelayEventRequest", async (e4) => {
      this.requestQueue.queue.push(e4), await this.processRequestsQueue();
    }), c7(this, "processRequestsQueue", async () => {
      if (this.requestQueue.state === $4.active) {
        this.client.logger.info("Request queue already active, skipping...");
        return;
      }
      for (this.client.logger.info(`Request queue starting with ${this.requestQueue.queue.length} requests`); this.requestQueue.queue.length > 0; ) {
        this.requestQueue.state = $4.active;
        const e4 = this.requestQueue.queue.shift();
        if (e4) try {
          await this.processRequest(e4);
        } catch (t3) {
          this.client.logger.warn(t3);
        }
      }
      this.requestQueue.state = $4.idle;
    }), c7(this, "processRequest", async (e4) => {
      const { topic: t3, payload: s5, attestation: i6, transportType: r5, encryptedId: o6 } = e4, a5 = s5.method;
      if (!this.shouldIgnorePairingRequest({ topic: t3, requestMethod: a5 })) switch (a5) {
        case "wc_sessionPropose":
          return await this.onSessionProposeRequest({ topic: t3, payload: s5, attestation: i6, encryptedId: o6 });
        case "wc_sessionSettle":
          return await this.onSessionSettleRequest(t3, s5);
        case "wc_sessionUpdate":
          return await this.onSessionUpdateRequest(t3, s5);
        case "wc_sessionExtend":
          return await this.onSessionExtendRequest(t3, s5);
        case "wc_sessionPing":
          return await this.onSessionPingRequest(t3, s5);
        case "wc_sessionDelete":
          return await this.onSessionDeleteRequest(t3, s5);
        case "wc_sessionRequest":
          return await this.onSessionRequest({ topic: t3, payload: s5, attestation: i6, encryptedId: o6, transportType: r5 });
        case "wc_sessionEvent":
          return await this.onSessionEventRequest(t3, s5);
        case "wc_sessionAuthenticate":
          return await this.onSessionAuthenticateRequest({ topic: t3, payload: s5, attestation: i6, encryptedId: o6, transportType: r5 });
        default:
          return this.client.logger.info(`Unsupported request method ${a5}`);
      }
    }), c7(this, "onRelayEventResponse", async (e4) => {
      const { topic: t3, payload: s5, transportType: i6 } = e4, r5 = (await this.client.core.history.get(t3, s5.id)).request.method;
      switch (r5) {
        case "wc_sessionPropose":
          return this.onSessionProposeResponse(t3, s5, i6);
        case "wc_sessionSettle":
          return this.onSessionSettleResponse(t3, s5);
        case "wc_sessionUpdate":
          return this.onSessionUpdateResponse(t3, s5);
        case "wc_sessionExtend":
          return this.onSessionExtendResponse(t3, s5);
        case "wc_sessionPing":
          return this.onSessionPingResponse(t3, s5);
        case "wc_sessionRequest":
          return this.onSessionRequestResponse(t3, s5);
        case "wc_sessionAuthenticate":
          return this.onSessionAuthenticateResponse(t3, s5);
        default:
          return this.client.logger.info(`Unsupported response method ${r5}`);
      }
    }), c7(this, "onRelayEventUnknownPayload", (e4) => {
      const { topic: t3 } = e4, { message: s5 } = te2("MISSING_OR_INVALID", `Decoded payload on topic ${t3} is not identifiable as a JSON-RPC request or a response.`);
      throw new Error(s5);
    }), c7(this, "shouldIgnorePairingRequest", (e4) => {
      const { topic: t3, requestMethod: s5 } = e4, i6 = this.expectedPairingMethodMap.get(t3);
      return !i6 || i6.includes(s5) ? false : !!(i6.includes("wc_sessionAuthenticate") && this.client.events.listenerCount("session_authenticate") > 0);
    }), c7(this, "onSessionProposeRequest", async (e4) => {
      const { topic: t3, payload: s5, attestation: i6, encryptedId: r5 } = e4, { params: o6, id: a5 } = s5;
      try {
        const l9 = this.client.core.eventClient.getEvent({ topic: t3 });
        this.client.events.listenerCount("session_proposal") === 0 && (console.warn("No listener for session_proposal event"), l9 == null ? void 0 : l9.setError(J4.proposal_listener_not_found)), this.isValidConnect(v6({}, s5.params));
        const u4 = o6.expiryTimestamp || ho2(N10.wc_sessionPropose.req.ttl), g5 = v6({ id: a5, pairingTopic: t3, expiryTimestamp: u4 }, o6);
        await this.setProposal(a5, g5);
        const h7 = await this.getVerifyContext({ attestationId: i6, hash: si(JSON.stringify(s5)), encryptedId: r5, metadata: g5.proposer.metadata });
        l9 == null ? void 0 : l9.addTrace(q4.emit_session_proposal), this.client.events.emit("session_proposal", { id: a5, params: g5, verifyContext: h7 });
      } catch (l9) {
        await this.sendError({ id: a5, topic: t3, error: l9, rpcOpts: N10.wc_sessionPropose.autoReject }), this.client.logger.error(l9);
      }
    }), c7(this, "onSessionProposeResponse", async (e4, t3, s5) => {
      const { id: i6 } = t3;
      if (isJsonRpcResult(t3)) {
        const { result: r5 } = t3;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", result: r5 });
        const o6 = this.client.proposal.get(i6);
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", proposal: o6 });
        const a5 = o6.proposer.publicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", selfPublicKey: a5 });
        const l9 = r5.responderPublicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", peerPublicKey: l9 });
        const u4 = await this.client.core.crypto.generateSharedKey(a5, l9);
        this.pendingSessions.set(i6, { sessionTopic: u4, pairingTopic: e4, proposalId: i6, publicKey: a5 });
        const g5 = await this.client.core.relayer.subscribe(u4, { transportType: s5 });
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", subscriptionId: g5 }), await this.client.core.pairing.activate({ topic: e4 });
      } else if (isJsonRpcError(t3)) {
        await this.client.proposal.delete(i6, de2("USER_DISCONNECTED"));
        const r5 = go2("session_connect", i6);
        if (this.events.listenerCount(r5) === 0) throw new Error(`emitting ${r5} without any listeners, 954`);
        this.events.emit(r5, { error: t3.error });
      }
    }), c7(this, "onSessionSettleRequest", async (e4, t3) => {
      const { id: s5, params: i6 } = t3;
      try {
        this.isValidSessionSettleRequest(i6);
        const { relay: r5, controller: o6, expiry: a5, namespaces: l9, sessionProperties: u4, sessionConfig: g5 } = t3.params, h7 = [...this.pendingSessions.values()].find((m5) => m5.sessionTopic === e4);
        if (!h7) return this.client.logger.error(`Pending session not found for topic ${e4}`);
        const d7 = this.client.proposal.get(h7.proposalId), y6 = x8(v6(v6({ topic: e4, relay: r5, expiry: a5, namespaces: l9, acknowledged: true, pairingTopic: h7.pairingTopic, requiredNamespaces: d7.requiredNamespaces, optionalNamespaces: d7.optionalNamespaces, controller: o6.publicKey, self: { publicKey: h7.publicKey, metadata: this.client.metadata }, peer: { publicKey: o6.publicKey, metadata: o6.metadata } }, u4 && { sessionProperties: u4 }), g5 && { sessionConfig: g5 }), { transportType: Q4.relay });
        await this.client.session.set(y6.topic, y6), await this.setExpiry(y6.topic, y6.expiry), await this.client.core.pairing.updateMetadata({ topic: h7.pairingTopic, metadata: y6.peer.metadata }), this.client.events.emit("session_connect", { session: y6 }), this.events.emit(go2("session_connect", h7.proposalId), { session: y6 }), this.pendingSessions.delete(h7.proposalId), this.deleteProposal(h7.proposalId, false), this.cleanupDuplicatePairings(y6), await this.sendResult({ id: t3.id, topic: e4, result: true, throwOnFailedPublish: true });
      } catch (r5) {
        await this.sendError({ id: s5, topic: e4, error: r5 }), this.client.logger.error(r5);
      }
    }), c7(this, "onSessionSettleResponse", async (e4, t3) => {
      const { id: s5 } = t3;
      isJsonRpcResult(t3) ? (await this.client.session.update(e4, { acknowledged: true }), this.events.emit(go2("session_approve", s5), {})) : isJsonRpcError(t3) && (await this.client.session.delete(e4, de2("USER_DISCONNECTED")), this.events.emit(go2("session_approve", s5), { error: t3.error }));
    }), c7(this, "onSessionUpdateRequest", async (e4, t3) => {
      const { params: s5, id: i6 } = t3;
      try {
        const r5 = `${e4}_session_update`, o6 = Zi.get(r5);
        if (o6 && this.isRequestOutOfSync(o6, i6)) {
          this.client.logger.warn(`Discarding out of sync request - ${i6}`), this.sendError({ id: i6, topic: e4, error: de2("INVALID_UPDATE_REQUEST") });
          return;
        }
        this.isValidUpdate(v6({ topic: e4 }, s5));
        try {
          Zi.set(r5, i6), await this.client.session.update(e4, { namespaces: s5.namespaces }), await this.sendResult({ id: i6, topic: e4, result: true, throwOnFailedPublish: true });
        } catch (a5) {
          throw Zi.delete(r5), a5;
        }
        this.client.events.emit("session_update", { id: i6, topic: e4, params: s5 });
      } catch (r5) {
        await this.sendError({ id: i6, topic: e4, error: r5 }), this.client.logger.error(r5);
      }
    }), c7(this, "isRequestOutOfSync", (e4, t3) => t3.toString().slice(0, -3) < e4.toString().slice(0, -3)), c7(this, "onSessionUpdateResponse", (e4, t3) => {
      const { id: s5 } = t3, i6 = go2("session_update", s5);
      if (this.events.listenerCount(i6) === 0) throw new Error(`emitting ${i6} without any listeners`);
      isJsonRpcResult(t3) ? this.events.emit(go2("session_update", s5), {}) : isJsonRpcError(t3) && this.events.emit(go2("session_update", s5), { error: t3.error });
    }), c7(this, "onSessionExtendRequest", async (e4, t3) => {
      const { id: s5 } = t3;
      try {
        this.isValidExtend({ topic: e4 }), await this.setExpiry(e4, ho2(Y3)), await this.sendResult({ id: s5, topic: e4, result: true, throwOnFailedPublish: true }), this.client.events.emit("session_extend", { id: s5, topic: e4 });
      } catch (i6) {
        await this.sendError({ id: s5, topic: e4, error: i6 }), this.client.logger.error(i6);
      }
    }), c7(this, "onSessionExtendResponse", (e4, t3) => {
      const { id: s5 } = t3, i6 = go2("session_extend", s5);
      if (this.events.listenerCount(i6) === 0) throw new Error(`emitting ${i6} without any listeners`);
      isJsonRpcResult(t3) ? this.events.emit(go2("session_extend", s5), {}) : isJsonRpcError(t3) && this.events.emit(go2("session_extend", s5), { error: t3.error });
    }), c7(this, "onSessionPingRequest", async (e4, t3) => {
      const { id: s5 } = t3;
      try {
        this.isValidPing({ topic: e4 }), await this.sendResult({ id: s5, topic: e4, result: true, throwOnFailedPublish: true }), this.client.events.emit("session_ping", { id: s5, topic: e4 });
      } catch (i6) {
        await this.sendError({ id: s5, topic: e4, error: i6 }), this.client.logger.error(i6);
      }
    }), c7(this, "onSessionPingResponse", (e4, t3) => {
      const { id: s5 } = t3, i6 = go2("session_ping", s5);
      if (this.events.listenerCount(i6) === 0) throw new Error(`emitting ${i6} without any listeners`);
      setTimeout(() => {
        isJsonRpcResult(t3) ? this.events.emit(go2("session_ping", s5), {}) : isJsonRpcError(t3) && this.events.emit(go2("session_ping", s5), { error: t3.error });
      }, 500);
    }), c7(this, "onSessionDeleteRequest", async (e4, t3) => {
      const { id: s5 } = t3;
      try {
        this.isValidDisconnect({ topic: e4, reason: t3.params }), Promise.all([new Promise((i6) => {
          this.client.core.relayer.once(T5.publish, async () => {
            i6(await this.deleteSession({ topic: e4, id: s5 }));
          });
        }), this.sendResult({ id: s5, topic: e4, result: true, throwOnFailedPublish: true }), this.cleanupPendingSentRequestsForTopic({ topic: e4, error: de2("USER_DISCONNECTED") })]).catch((i6) => this.client.logger.error(i6));
      } catch (i6) {
        this.client.logger.error(i6);
      }
    }), c7(this, "onSessionRequest", async (e4) => {
      var t3, s5, i6;
      const { topic: r5, payload: o6, attestation: a5, encryptedId: l9, transportType: u4 } = e4, { id: g5, params: h7 } = o6;
      try {
        await this.isValidRequest(v6({ topic: r5 }, h7));
        const d7 = this.client.session.get(r5), y6 = await this.getVerifyContext({ attestationId: a5, hash: si(JSON.stringify(formatJsonRpcRequest("wc_sessionRequest", h7, g5))), encryptedId: l9, metadata: d7.peer.metadata, transportType: u4 }), m5 = { id: g5, topic: r5, params: h7, verifyContext: y6 };
        await this.setPendingSessionRequest(m5), u4 === Q4.link_mode && (t3 = d7.peer.metadata.redirect) != null && t3.universal && this.client.core.addLinkModeSupportedApp((s5 = d7.peer.metadata.redirect) == null ? void 0 : s5.universal), (i6 = this.client.signConfig) != null && i6.disableRequestQueue ? this.emitSessionRequest(m5) : (this.addSessionRequestToSessionRequestQueue(m5), this.processSessionRequestQueue());
      } catch (d7) {
        await this.sendError({ id: g5, topic: r5, error: d7 }), this.client.logger.error(d7);
      }
    }), c7(this, "onSessionRequestResponse", (e4, t3) => {
      const { id: s5 } = t3, i6 = go2("session_request", s5);
      if (this.events.listenerCount(i6) === 0) throw new Error(`emitting ${i6} without any listeners`);
      isJsonRpcResult(t3) ? this.events.emit(go2("session_request", s5), { result: t3.result }) : isJsonRpcError(t3) && this.events.emit(go2("session_request", s5), { error: t3.error });
    }), c7(this, "onSessionEventRequest", async (e4, t3) => {
      const { id: s5, params: i6 } = t3;
      try {
        const r5 = `${e4}_session_event_${i6.event.name}`, o6 = Zi.get(r5);
        if (o6 && this.isRequestOutOfSync(o6, s5)) {
          this.client.logger.info(`Discarding out of sync request - ${s5}`);
          return;
        }
        this.isValidEmit(v6({ topic: e4 }, i6)), this.client.events.emit("session_event", { id: s5, topic: e4, params: i6 }), Zi.set(r5, s5);
      } catch (r5) {
        await this.sendError({ id: s5, topic: e4, error: r5 }), this.client.logger.error(r5);
      }
    }), c7(this, "onSessionAuthenticateResponse", (e4, t3) => {
      const { id: s5 } = t3;
      this.client.logger.trace({ type: "method", method: "onSessionAuthenticateResponse", topic: e4, payload: t3 }), isJsonRpcResult(t3) ? this.events.emit(go2("session_request", s5), { result: t3.result }) : isJsonRpcError(t3) && this.events.emit(go2("session_request", s5), { error: t3.error });
    }), c7(this, "onSessionAuthenticateRequest", async (e4) => {
      var t3;
      const { topic: s5, payload: i6, attestation: r5, encryptedId: o6, transportType: a5 } = e4;
      try {
        const { requester: l9, authPayload: u4, expiryTimestamp: g5 } = i6.params, h7 = await this.getVerifyContext({ attestationId: r5, hash: si(JSON.stringify(i6)), encryptedId: o6, metadata: l9.metadata, transportType: a5 }), d7 = { requester: l9, pairingTopic: s5, id: i6.id, authPayload: u4, verifyContext: h7, expiryTimestamp: g5 };
        await this.setAuthRequest(i6.id, { request: d7, pairingTopic: s5, transportType: a5 }), a5 === Q4.link_mode && (t3 = l9.metadata.redirect) != null && t3.universal && this.client.core.addLinkModeSupportedApp(l9.metadata.redirect.universal), this.client.events.emit("session_authenticate", { topic: s5, params: i6.params, id: i6.id, verifyContext: h7 });
      } catch (l9) {
        this.client.logger.error(l9);
        const u4 = i6.params.requester.publicKey, g5 = await this.client.core.crypto.generateKeyPair(), h7 = this.getAppLinkIfEnabled(i6.params.requester.metadata, a5), d7 = { type: Ie2, receiverPublicKey: u4, senderPublicKey: g5 };
        await this.sendError({ id: i6.id, topic: s5, error: l9, encodeOpts: d7, rpcOpts: N10.wc_sessionAuthenticate.autoReject, appLink: h7 });
      }
    }), c7(this, "addSessionRequestToSessionRequestQueue", (e4) => {
      this.sessionRequestQueue.queue.push(e4);
    }), c7(this, "cleanupAfterResponse", (e4) => {
      this.deletePendingSessionRequest(e4.response.id, { message: "fulfilled", code: 0 }), setTimeout(() => {
        this.sessionRequestQueue.state = $4.idle, this.processSessionRequestQueue();
      }, (0, import_time5.toMiliseconds)(this.requestQueueDelay));
    }), c7(this, "cleanupPendingSentRequestsForTopic", ({ topic: e4, error: t3 }) => {
      const s5 = this.client.core.history.pending;
      s5.length > 0 && s5.filter((i6) => i6.topic === e4 && i6.request.method === "wc_sessionRequest").forEach((i6) => {
        const r5 = i6.request.id, o6 = go2("session_request", r5);
        if (this.events.listenerCount(o6) === 0) throw new Error(`emitting ${o6} without any listeners`);
        this.events.emit(go2("session_request", i6.request.id), { error: t3 });
      });
    }), c7(this, "processSessionRequestQueue", () => {
      if (this.sessionRequestQueue.state === $4.active) {
        this.client.logger.info("session request queue is already active.");
        return;
      }
      const e4 = this.sessionRequestQueue.queue[0];
      if (!e4) {
        this.client.logger.info("session request queue is empty.");
        return;
      }
      try {
        this.sessionRequestQueue.state = $4.active, this.emitSessionRequest(e4);
      } catch (t3) {
        this.client.logger.error(t3);
      }
    }), c7(this, "emitSessionRequest", (e4) => {
      this.client.events.emit("session_request", e4);
    }), c7(this, "onPairingCreated", (e4) => {
      if (e4.methods && this.expectedPairingMethodMap.set(e4.topic, e4.methods), e4.active) return;
      const t3 = this.client.proposal.getAll().find((s5) => s5.pairingTopic === e4.topic);
      t3 && this.onSessionProposeRequest({ topic: e4.topic, payload: formatJsonRpcRequest("wc_sessionPropose", { requiredNamespaces: t3.requiredNamespaces, optionalNamespaces: t3.optionalNamespaces, relays: t3.relays, proposer: t3.proposer, sessionProperties: t3.sessionProperties }, t3.id) });
    }), c7(this, "isValidConnect", async (e4) => {
      if (!Di(e4)) {
        const { message: a5 } = te2("MISSING_OR_INVALID", `connect() params: ${JSON.stringify(e4)}`);
        throw new Error(a5);
      }
      const { pairingTopic: t3, requiredNamespaces: s5, optionalNamespaces: i6, sessionProperties: r5, relays: o6 } = e4;
      if (ae(t3) || await this.isValidPairingTopic(t3), !Ci(o6, true)) {
        const { message: a5 } = te2("MISSING_OR_INVALID", `connect() relays: ${o6}`);
        throw new Error(a5);
      }
      !ae(s5) && qe2(s5) !== 0 && this.validateNamespaces(s5, "requiredNamespaces"), !ae(i6) && qe2(i6) !== 0 && this.validateNamespaces(i6, "optionalNamespaces"), ae(r5) || this.validateSessionProps(r5, "sessionProperties");
    }), c7(this, "validateNamespaces", (e4, t3) => {
      const s5 = ji(e4, "connect()", t3);
      if (s5) throw new Error(s5.message);
    }), c7(this, "isValidApprove", async (e4) => {
      if (!Di(e4)) throw new Error(te2("MISSING_OR_INVALID", `approve() params: ${e4}`).message);
      const { id: t3, namespaces: s5, relayProtocol: i6, sessionProperties: r5 } = e4;
      this.checkRecentlyDeleted(t3), await this.isValidProposalId(t3);
      const o6 = this.client.proposal.get(t3), a5 = Ir2(s5, "approve()");
      if (a5) throw new Error(a5.message);
      const l9 = Nr2(o6.requiredNamespaces, s5, "approve()");
      if (l9) throw new Error(l9.message);
      if (!q3(i6, true)) {
        const { message: u4 } = te2("MISSING_OR_INVALID", `approve() relayProtocol: ${i6}`);
        throw new Error(u4);
      }
      ae(r5) || this.validateSessionProps(r5, "sessionProperties");
    }), c7(this, "isValidReject", async (e4) => {
      if (!Di(e4)) {
        const { message: i6 } = te2("MISSING_OR_INVALID", `reject() params: ${e4}`);
        throw new Error(i6);
      }
      const { id: t3, reason: s5 } = e4;
      if (this.checkRecentlyDeleted(t3), await this.isValidProposalId(t3), !Mi(s5)) {
        const { message: i6 } = te2("MISSING_OR_INVALID", `reject() reason: ${JSON.stringify(s5)}`);
        throw new Error(i6);
      }
    }), c7(this, "isValidSessionSettleRequest", (e4) => {
      if (!Di(e4)) {
        const { message: l9 } = te2("MISSING_OR_INVALID", `onSessionSettleRequest() params: ${e4}`);
        throw new Error(l9);
      }
      const { relay: t3, controller: s5, namespaces: i6, expiry: r5 } = e4;
      if (!Ar2(t3)) {
        const { message: l9 } = te2("MISSING_OR_INVALID", "onSessionSettleRequest() relay protocol should be a string");
        throw new Error(l9);
      }
      const o6 = Bi(s5, "onSessionSettleRequest()");
      if (o6) throw new Error(o6.message);
      const a5 = Ir2(i6, "onSessionSettleRequest()");
      if (a5) throw new Error(a5.message);
      if (po2(r5)) {
        const { message: l9 } = te2("EXPIRED", "onSessionSettleRequest()");
        throw new Error(l9);
      }
    }), c7(this, "isValidUpdate", async (e4) => {
      if (!Di(e4)) {
        const { message: a5 } = te2("MISSING_OR_INVALID", `update() params: ${e4}`);
        throw new Error(a5);
      }
      const { topic: t3, namespaces: s5 } = e4;
      this.checkRecentlyDeleted(t3), await this.isValidSessionTopic(t3);
      const i6 = this.client.session.get(t3), r5 = Ir2(s5, "update()");
      if (r5) throw new Error(r5.message);
      const o6 = Nr2(i6.requiredNamespaces, s5, "update()");
      if (o6) throw new Error(o6.message);
    }), c7(this, "isValidExtend", async (e4) => {
      if (!Di(e4)) {
        const { message: s5 } = te2("MISSING_OR_INVALID", `extend() params: ${e4}`);
        throw new Error(s5);
      }
      const { topic: t3 } = e4;
      this.checkRecentlyDeleted(t3), await this.isValidSessionTopic(t3);
    }), c7(this, "isValidRequest", async (e4) => {
      if (!Di(e4)) {
        const { message: a5 } = te2("MISSING_OR_INVALID", `request() params: ${e4}`);
        throw new Error(a5);
      }
      const { topic: t3, request: s5, chainId: i6, expiry: r5 } = e4;
      this.checkRecentlyDeleted(t3), await this.isValidSessionTopic(t3);
      const { namespaces: o6 } = this.client.session.get(t3);
      if (!Fi(o6, i6)) {
        const { message: a5 } = te2("MISSING_OR_INVALID", `request() chainId: ${i6}`);
        throw new Error(a5);
      }
      if (!Vi(s5)) {
        const { message: a5 } = te2("MISSING_OR_INVALID", `request() ${JSON.stringify(s5)}`);
        throw new Error(a5);
      }
      if (!qi(o6, i6, s5.method)) {
        const { message: a5 } = te2("MISSING_OR_INVALID", `request() method: ${s5.method}`);
        throw new Error(a5);
      }
      if (r5 && !Ji(r5, Ee4)) {
        const { message: a5 } = te2("MISSING_OR_INVALID", `request() expiry: ${r5}. Expiry must be a number (in seconds) between ${Ee4.min} and ${Ee4.max}`);
        throw new Error(a5);
      }
    }), c7(this, "isValidRespond", async (e4) => {
      var t3;
      if (!Di(e4)) {
        const { message: r5 } = te2("MISSING_OR_INVALID", `respond() params: ${e4}`);
        throw new Error(r5);
      }
      const { topic: s5, response: i6 } = e4;
      try {
        await this.isValidSessionTopic(s5);
      } catch (r5) {
        throw (t3 = e4 == null ? void 0 : e4.response) != null && t3.id && this.cleanupAfterResponse(e4), r5;
      }
      if (!Hi(i6)) {
        const { message: r5 } = te2("MISSING_OR_INVALID", `respond() response: ${JSON.stringify(i6)}`);
        throw new Error(r5);
      }
    }), c7(this, "isValidPing", async (e4) => {
      if (!Di(e4)) {
        const { message: s5 } = te2("MISSING_OR_INVALID", `ping() params: ${e4}`);
        throw new Error(s5);
      }
      const { topic: t3 } = e4;
      await this.isValidSessionOrPairingTopic(t3);
    }), c7(this, "isValidEmit", async (e4) => {
      if (!Di(e4)) {
        const { message: o6 } = te2("MISSING_OR_INVALID", `emit() params: ${e4}`);
        throw new Error(o6);
      }
      const { topic: t3, event: s5, chainId: i6 } = e4;
      await this.isValidSessionTopic(t3);
      const { namespaces: r5 } = this.client.session.get(t3);
      if (!Fi(r5, i6)) {
        const { message: o6 } = te2("MISSING_OR_INVALID", `emit() chainId: ${i6}`);
        throw new Error(o6);
      }
      if (!Ki(s5)) {
        const { message: o6 } = te2("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(s5)}`);
        throw new Error(o6);
      }
      if (!Gi(r5, i6, s5.name)) {
        const { message: o6 } = te2("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(s5)}`);
        throw new Error(o6);
      }
    }), c7(this, "isValidDisconnect", async (e4) => {
      if (!Di(e4)) {
        const { message: s5 } = te2("MISSING_OR_INVALID", `disconnect() params: ${e4}`);
        throw new Error(s5);
      }
      const { topic: t3 } = e4;
      await this.isValidSessionOrPairingTopic(t3);
    }), c7(this, "isValidAuthenticate", (e4) => {
      const { chains: t3, uri: s5, domain: i6, nonce: r5 } = e4;
      if (!Array.isArray(t3) || t3.length === 0) throw new Error("chains is required and must be a non-empty array");
      if (!q3(s5, false)) throw new Error("uri is required parameter");
      if (!q3(i6, false)) throw new Error("domain is required parameter");
      if (!q3(r5, false)) throw new Error("nonce is required parameter");
      if ([...new Set(t3.map((a5) => Ye2(a5).namespace))].length > 1) throw new Error("Multi-namespace requests are not supported. Please request single namespace only.");
      const { namespace: o6 } = Ye2(t3[0]);
      if (o6 !== "eip155") throw new Error("Only eip155 namespace is supported for authenticated sessions. Please use .connect() for non-eip155 chains.");
    }), c7(this, "getVerifyContext", async (e4) => {
      const { attestationId: t3, hash: s5, encryptedId: i6, metadata: r5, transportType: o6 } = e4, a5 = { verified: { verifyUrl: r5.verifyUrl || le3, validation: "UNKNOWN", origin: r5.url || "" } };
      try {
        if (o6 === Q4.link_mode) {
          const u4 = this.getAppLinkIfEnabled(r5, o6);
          return a5.verified.validation = u4 && new URL(u4).origin === new URL(r5.url).origin ? "VALID" : "INVALID", a5;
        }
        const l9 = await this.client.core.verify.resolve({ attestationId: t3, hash: s5, encryptedId: i6, verifyUrl: r5.verifyUrl });
        l9 && (a5.verified.origin = l9.origin, a5.verified.isScam = l9.isScam, a5.verified.validation = l9.origin === new URL(r5.url).origin ? "VALID" : "INVALID");
      } catch (l9) {
        this.client.logger.warn(l9);
      }
      return this.client.logger.debug(`Verify context: ${JSON.stringify(a5)}`), a5;
    }), c7(this, "validateSessionProps", (e4, t3) => {
      Object.values(e4).forEach((s5) => {
        if (!q3(s5, false)) {
          const { message: i6 } = te2("MISSING_OR_INVALID", `${t3} must be in Record<string, string> format. Received: ${JSON.stringify(s5)}`);
          throw new Error(i6);
        }
      });
    }), c7(this, "getPendingAuthRequest", (e4) => {
      const t3 = this.client.auth.requests.get(e4);
      return typeof t3 == "object" ? t3 : void 0;
    }), c7(this, "addToRecentlyDeleted", (e4, t3) => {
      if (this.recentlyDeletedMap.set(e4, t3), this.recentlyDeletedMap.size >= this.recentlyDeletedLimit) {
        let s5 = 0;
        const i6 = this.recentlyDeletedLimit / 2;
        for (const r5 of this.recentlyDeletedMap.keys()) {
          if (s5++ >= i6) break;
          this.recentlyDeletedMap.delete(r5);
        }
      }
    }), c7(this, "checkRecentlyDeleted", (e4) => {
      const t3 = this.recentlyDeletedMap.get(e4);
      if (t3) {
        const { message: s5 } = te2("MISSING_OR_INVALID", `Record was recently deleted - ${t3}: ${e4}`);
        throw new Error(s5);
      }
    }), c7(this, "isLinkModeEnabled", (e4, t3) => {
      var s5, i6, r5, o6, a5, l9, u4, g5, h7;
      return !e4 || t3 !== Q4.link_mode ? false : ((i6 = (s5 = this.client.metadata) == null ? void 0 : s5.redirect) == null ? void 0 : i6.linkMode) === true && ((o6 = (r5 = this.client.metadata) == null ? void 0 : r5.redirect) == null ? void 0 : o6.universal) !== void 0 && ((l9 = (a5 = this.client.metadata) == null ? void 0 : a5.redirect) == null ? void 0 : l9.universal) !== "" && ((u4 = e4 == null ? void 0 : e4.redirect) == null ? void 0 : u4.universal) !== void 0 && ((g5 = e4 == null ? void 0 : e4.redirect) == null ? void 0 : g5.universal) !== "" && ((h7 = e4 == null ? void 0 : e4.redirect) == null ? void 0 : h7.linkMode) === true && this.client.core.linkModeSupportedApps.includes(e4.redirect.universal) && typeof (global == null ? void 0 : global.Linking) < "u";
    }), c7(this, "getAppLinkIfEnabled", (e4, t3) => {
      var s5;
      return this.isLinkModeEnabled(e4, t3) ? (s5 = e4 == null ? void 0 : e4.redirect) == null ? void 0 : s5.universal : void 0;
    }), c7(this, "handleLinkModeMessage", ({ url: e4 }) => {
      if (!e4 || !e4.includes("wc_ev") || !e4.includes("topic")) return;
      const t3 = bo2(e4, "topic") || "", s5 = decodeURIComponent(bo2(e4, "wc_ev") || ""), i6 = this.client.session.keys.includes(t3);
      i6 && this.client.session.update(t3, { transportType: Q4.link_mode }), this.client.core.dispatchEnvelope({ topic: t3, message: s5, sessionExists: i6 });
    }), c7(this, "registerLinkModeListeners", async () => {
      var e4;
      if (Eo2() || ne() && (e4 = this.client.metadata.redirect) != null && e4.linkMode) {
        const t3 = global == null ? void 0 : global.Linking;
        if (typeof t3 < "u") {
          t3.addEventListener("url", this.handleLinkModeMessage, this.client.name);
          const s5 = await t3.getInitialURL();
          s5 && setTimeout(() => {
            this.handleLinkModeMessage({ url: s5 });
          }, 50);
        }
      }
    }), c7(this, "shouldSetTVF", (e4, t3) => {
      if (!t3 || e4 !== "wc_sessionRequest") return false;
      const { request: s5 } = t3;
      return Object.keys(Ke4).includes(s5.method);
    }), c7(this, "getTVFParams", (e4, t3, s5) => {
      var i6, r5;
      try {
        const o6 = t3.request.method, a5 = this.extractTxHashesFromResult(o6, s5);
        return x8(v6({ correlationId: e4, rpcMethods: [o6], chainId: t3.chainId }, this.isValidContractData(t3.request.params) && { contractAddresses: [(r5 = (i6 = t3.request.params) == null ? void 0 : i6[0]) == null ? void 0 : r5.to] }), { txHashes: a5 });
      } catch (o6) {
        this.client.logger.warn("Error getting TVF params", o6);
      }
      return {};
    }), c7(this, "isValidContractData", (e4) => {
      var t3;
      if (!e4) return false;
      try {
        const s5 = (e4 == null ? void 0 : e4.data) || ((t3 = e4 == null ? void 0 : e4[0]) == null ? void 0 : t3.data);
        if (!s5.startsWith("0x")) return false;
        const i6 = s5.slice(2);
        return /^[0-9a-fA-F]*$/.test(i6) ? i6.length % 2 === 0 : false;
      } catch {
      }
      return false;
    }), c7(this, "extractTxHashesFromResult", (e4, t3) => {
      try {
        const s5 = Ke4[e4];
        if (typeof t3 == "string") return [t3];
        const i6 = t3[s5.key];
        if ($e2(i6)) return i6;
        if (typeof i6 == "string") return [i6];
      } catch (s5) {
        this.client.logger.warn("Error extracting tx hashes from result", s5);
      }
      return [];
    });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: n7 } = te2("NOT_INITIALIZED", this.name);
      throw new Error(n7);
    }
  }
  async confirmOnlineStateOrThrow() {
    await this.client.core.relayer.confirmOnlineStateOrThrow();
  }
  registerRelayerEvents() {
    this.client.core.relayer.on(T5.message, (n7) => {
      !this.initialized || this.relayMessageCache.length > 0 ? this.relayMessageCache.push(n7) : this.onRelayMessage(n7);
    });
  }
  async onRelayMessage(n7) {
    const { topic: e4, message: t3, attestation: s5, transportType: i6 } = n7, { publicKey: r5 } = this.client.auth.authKeys.keys.includes(le4) ? this.client.auth.authKeys.get(le4) : { responseTopic: void 0, publicKey: void 0 }, o6 = await this.client.core.crypto.decode(e4, t3, { receiverPublicKey: r5, encoding: i6 === Q4.link_mode ? Qs : At });
    try {
      isJsonRpcRequest(o6) ? (this.client.core.history.set(e4, o6), this.onRelayEventRequest({ topic: e4, payload: o6, attestation: s5, transportType: i6, encryptedId: si(t3) })) : isJsonRpcResponse(o6) ? (await this.client.core.history.resolve(o6), await this.onRelayEventResponse({ topic: e4, payload: o6, transportType: i6 }), this.client.core.history.delete(e4, o6.id)) : this.onRelayEventUnknownPayload({ topic: e4, payload: o6, transportType: i6 });
    } catch (a5) {
      this.client.logger.error(a5);
    }
  }
  registerExpirerEvents() {
    this.client.core.expirer.on(M6.expired, async (n7) => {
      const { topic: e4, id: t3 } = lo2(n7.target);
      if (t3 && this.client.pendingRequest.keys.includes(t3)) return await this.deletePendingSessionRequest(t3, te2("EXPIRED"), true);
      if (t3 && this.client.auth.requests.keys.includes(t3)) return await this.deletePendingAuthRequest(t3, te2("EXPIRED"), true);
      e4 ? this.client.session.keys.includes(e4) && (await this.deleteSession({ topic: e4, expirerHasDeleted: true }), this.client.events.emit("session_expire", { topic: e4 })) : t3 && (await this.deleteProposal(t3, true), this.client.events.emit("proposal_expire", { id: t3 }));
    });
  }
  registerPairingEvents() {
    this.client.core.pairing.events.on(se2.create, (n7) => this.onPairingCreated(n7)), this.client.core.pairing.events.on(se2.delete, (n7) => {
      this.addToRecentlyDeleted(n7.topic, "pairing");
    });
  }
  isValidPairingTopic(n7) {
    if (!q3(n7, false)) {
      const { message: e4 } = te2("MISSING_OR_INVALID", `pairing topic should be a string: ${n7}`);
      throw new Error(e4);
    }
    if (!this.client.core.pairing.pairings.keys.includes(n7)) {
      const { message: e4 } = te2("NO_MATCHING_KEY", `pairing topic doesn't exist: ${n7}`);
      throw new Error(e4);
    }
    if (po2(this.client.core.pairing.pairings.get(n7).expiry)) {
      const { message: e4 } = te2("EXPIRED", `pairing topic: ${n7}`);
      throw new Error(e4);
    }
  }
  async isValidSessionTopic(n7) {
    if (!q3(n7, false)) {
      const { message: e4 } = te2("MISSING_OR_INVALID", `session topic should be a string: ${n7}`);
      throw new Error(e4);
    }
    if (this.checkRecentlyDeleted(n7), !this.client.session.keys.includes(n7)) {
      const { message: e4 } = te2("NO_MATCHING_KEY", `session topic doesn't exist: ${n7}`);
      throw new Error(e4);
    }
    if (po2(this.client.session.get(n7).expiry)) {
      await this.deleteSession({ topic: n7 });
      const { message: e4 } = te2("EXPIRED", `session topic: ${n7}`);
      throw new Error(e4);
    }
    if (!this.client.core.crypto.keychain.has(n7)) {
      const { message: e4 } = te2("MISSING_OR_INVALID", `session topic does not exist in keychain: ${n7}`);
      throw await this.deleteSession({ topic: n7 }), new Error(e4);
    }
  }
  async isValidSessionOrPairingTopic(n7) {
    if (this.checkRecentlyDeleted(n7), this.client.session.keys.includes(n7)) await this.isValidSessionTopic(n7);
    else if (this.client.core.pairing.pairings.keys.includes(n7)) this.isValidPairingTopic(n7);
    else if (q3(n7, false)) {
      const { message: e4 } = te2("NO_MATCHING_KEY", `session or pairing topic doesn't exist: ${n7}`);
      throw new Error(e4);
    } else {
      const { message: e4 } = te2("MISSING_OR_INVALID", `session or pairing topic should be a string: ${n7}`);
      throw new Error(e4);
    }
  }
  async isValidProposalId(n7) {
    if (!ki(n7)) {
      const { message: e4 } = te2("MISSING_OR_INVALID", `proposal id should be a number: ${n7}`);
      throw new Error(e4);
    }
    if (!this.client.proposal.keys.includes(n7)) {
      const { message: e4 } = te2("NO_MATCHING_KEY", `proposal id doesn't exist: ${n7}`);
      throw new Error(e4);
    }
    if (po2(this.client.proposal.get(n7).expiryTimestamp)) {
      await this.deleteProposal(n7);
      const { message: e4 } = te2("EXPIRED", `proposal id: ${n7}`);
      throw new Error(e4);
    }
  }
};
var Ns2 = class extends Ci2 {
  constructor(n7, e4) {
    super(n7, e4, pt2, me4), this.core = n7, this.logger = e4;
  }
};
var Rt4 = class extends Ci2 {
  constructor(n7, e4) {
    super(n7, e4, ht3, me4), this.core = n7, this.logger = e4;
  }
};
var Ps2 = class extends Ci2 {
  constructor(n7, e4) {
    super(n7, e4, ut3, me4, (t3) => t3.id), this.core = n7, this.logger = e4;
  }
};
var Os2 = class extends Ci2 {
  constructor(n7, e4) {
    super(n7, e4, mt3, ce2, () => le4), this.core = n7, this.logger = e4;
  }
};
var bs2 = class extends Ci2 {
  constructor(n7, e4) {
    super(n7, e4, _t4, ce2), this.core = n7, this.logger = e4;
  }
};
var As2 = class extends Ci2 {
  constructor(n7, e4) {
    super(n7, e4, Et4, ce2, (t3) => t3.id), this.core = n7, this.logger = e4;
  }
};
var Cs2 = Object.defineProperty;
var xs2 = (S5, n7, e4) => n7 in S5 ? Cs2(S5, n7, { enumerable: true, configurable: true, writable: true, value: e4 }) : S5[n7] = e4;
var Ge4 = (S5, n7, e4) => xs2(S5, typeof n7 != "symbol" ? n7 + "" : n7, e4);
var Vs2 = class {
  constructor(n7, e4) {
    this.core = n7, this.logger = e4, Ge4(this, "authKeys"), Ge4(this, "pairingTopics"), Ge4(this, "requests"), this.authKeys = new Os2(this.core, this.logger), this.pairingTopics = new bs2(this.core, this.logger), this.requests = new As2(this.core, this.logger);
  }
  async init() {
    await this.authKeys.init(), await this.pairingTopics.init(), await this.requests.init();
  }
};
var Ds2 = Object.defineProperty;
var Ls3 = (S5, n7, e4) => n7 in S5 ? Ds2(S5, n7, { enumerable: true, configurable: true, writable: true, value: e4 }) : S5[n7] = e4;
var _7 = (S5, n7, e4) => Ls3(S5, typeof n7 != "symbol" ? n7 + "" : n7, e4);
var Se3 = class _Se extends J5 {
  constructor(n7) {
    super(n7), _7(this, "protocol", De3), _7(this, "version", Le4), _7(this, "name", _e4.name), _7(this, "metadata"), _7(this, "core"), _7(this, "logger"), _7(this, "events", new import_events10.EventEmitter()), _7(this, "engine"), _7(this, "session"), _7(this, "proposal"), _7(this, "pendingRequest"), _7(this, "auth"), _7(this, "signConfig"), _7(this, "on", (t3, s5) => this.events.on(t3, s5)), _7(this, "once", (t3, s5) => this.events.once(t3, s5)), _7(this, "off", (t3, s5) => this.events.off(t3, s5)), _7(this, "removeListener", (t3, s5) => this.events.removeListener(t3, s5)), _7(this, "removeAllListeners", (t3) => this.events.removeAllListeners(t3)), _7(this, "connect", async (t3) => {
      try {
        return await this.engine.connect(t3);
      } catch (s5) {
        throw this.logger.error(s5.message), s5;
      }
    }), _7(this, "pair", async (t3) => {
      try {
        return await this.engine.pair(t3);
      } catch (s5) {
        throw this.logger.error(s5.message), s5;
      }
    }), _7(this, "approve", async (t3) => {
      try {
        return await this.engine.approve(t3);
      } catch (s5) {
        throw this.logger.error(s5.message), s5;
      }
    }), _7(this, "reject", async (t3) => {
      try {
        return await this.engine.reject(t3);
      } catch (s5) {
        throw this.logger.error(s5.message), s5;
      }
    }), _7(this, "update", async (t3) => {
      try {
        return await this.engine.update(t3);
      } catch (s5) {
        throw this.logger.error(s5.message), s5;
      }
    }), _7(this, "extend", async (t3) => {
      try {
        return await this.engine.extend(t3);
      } catch (s5) {
        throw this.logger.error(s5.message), s5;
      }
    }), _7(this, "request", async (t3) => {
      try {
        return await this.engine.request(t3);
      } catch (s5) {
        throw this.logger.error(s5.message), s5;
      }
    }), _7(this, "respond", async (t3) => {
      try {
        return await this.engine.respond(t3);
      } catch (s5) {
        throw this.logger.error(s5.message), s5;
      }
    }), _7(this, "ping", async (t3) => {
      try {
        return await this.engine.ping(t3);
      } catch (s5) {
        throw this.logger.error(s5.message), s5;
      }
    }), _7(this, "emit", async (t3) => {
      try {
        return await this.engine.emit(t3);
      } catch (s5) {
        throw this.logger.error(s5.message), s5;
      }
    }), _7(this, "disconnect", async (t3) => {
      try {
        return await this.engine.disconnect(t3);
      } catch (s5) {
        throw this.logger.error(s5.message), s5;
      }
    }), _7(this, "find", (t3) => {
      try {
        return this.engine.find(t3);
      } catch (s5) {
        throw this.logger.error(s5.message), s5;
      }
    }), _7(this, "getPendingSessionRequests", () => {
      try {
        return this.engine.getPendingSessionRequests();
      } catch (t3) {
        throw this.logger.error(t3.message), t3;
      }
    }), _7(this, "authenticate", async (t3, s5) => {
      try {
        return await this.engine.authenticate(t3, s5);
      } catch (i6) {
        throw this.logger.error(i6.message), i6;
      }
    }), _7(this, "formatAuthMessage", (t3) => {
      try {
        return this.engine.formatAuthMessage(t3);
      } catch (s5) {
        throw this.logger.error(s5.message), s5;
      }
    }), _7(this, "approveSessionAuthenticate", async (t3) => {
      try {
        return await this.engine.approveSessionAuthenticate(t3);
      } catch (s5) {
        throw this.logger.error(s5.message), s5;
      }
    }), _7(this, "rejectSessionAuthenticate", async (t3) => {
      try {
        return await this.engine.rejectSessionAuthenticate(t3);
      } catch (s5) {
        throw this.logger.error(s5.message), s5;
      }
    }), this.name = (n7 == null ? void 0 : n7.name) || _e4.name, this.metadata = (n7 == null ? void 0 : n7.metadata) || Yr2(), this.signConfig = n7 == null ? void 0 : n7.signConfig;
    const e4 = typeof (n7 == null ? void 0 : n7.logger) < "u" && typeof (n7 == null ? void 0 : n7.logger) != "string" ? n7.logger : (0, import_pino2.default)(k4({ level: (n7 == null ? void 0 : n7.logger) || _e4.logger }));
    this.core = (n7 == null ? void 0 : n7.core) || new co3(n7), this.logger = E5(e4, this.name), this.session = new Rt4(this.core, this.logger), this.proposal = new Ns2(this.core, this.logger), this.pendingRequest = new Ps2(this.core, this.logger), this.engine = new Ts2(this), this.auth = new Vs2(this.core, this.logger);
  }
  static async init(n7) {
    const e4 = new _Se(n7);
    return await e4.initialize(), e4;
  }
  get context() {
    return y4(this.logger);
  }
  get pairing() {
    return this.core.pairing.pairings;
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.core.start(), await this.session.init(), await this.proposal.init(), await this.pendingRequest.init(), await this.auth.init(), await this.engine.init(), this.logger.info("SignClient Initialization Success"), setTimeout(() => {
        this.engine.processRelayMessageCache();
      }, (0, import_time5.toMiliseconds)(import_time5.ONE_SECOND));
    } catch (n7) {
      throw this.logger.info("SignClient Initialization Failure"), this.logger.error(n7.message), n7;
    }
  }
};

// node_modules/@jnwng/walletconnect-solana/lib/esm/adapter.js
var import_bs58 = __toESM(require_bs58(), 1);

// node_modules/@jnwng/walletconnect-solana/lib/esm/errors.js
var ClientNotInitializedError = class _ClientNotInitializedError extends Error {
  constructor() {
    super();
    Object.setPrototypeOf(this, _ClientNotInitializedError.prototype);
  }
};
var QRCodeModalError = class _QRCodeModalError extends Error {
  constructor() {
    super();
    Object.setPrototypeOf(this, _QRCodeModalError.prototype);
  }
};

// node_modules/@jnwng/walletconnect-solana/lib/esm/adapter.js
var WalletConnectChainID;
(function(WalletConnectChainID2) {
  WalletConnectChainID2["Mainnet"] = "solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ";
  WalletConnectChainID2["Devnet"] = "solana:8E9rvCKLFQia2Y35HXjjpWzj8weVo44K";
})(WalletConnectChainID || (WalletConnectChainID = {}));
var WalletConnectRPCMethods;
(function(WalletConnectRPCMethods2) {
  WalletConnectRPCMethods2["signTransaction"] = "solana_signTransaction";
  WalletConnectRPCMethods2["signMessage"] = "solana_signMessage";
})(WalletConnectRPCMethods || (WalletConnectRPCMethods = {}));
var getConnectParams = (chainId) => ({
  requiredNamespaces: {
    solana: {
      chains: [chainId],
      methods: [WalletConnectRPCMethods.signTransaction, WalletConnectRPCMethods.signMessage],
      events: []
    }
  }
});
var isVersionedTransaction = (transaction) => "version" in transaction;
var WalletConnectWallet = class {
  constructor(config) {
    this._options = config.options;
    this._network = config.network;
  }
  async connect() {
    const client = this._client ?? await Se3.init(this._options);
    const sessions = client.find(getConnectParams(this._network)).filter((s5) => s5.acknowledged);
    if (sessions.length) {
      this._session = sessions[sessions.length - 1];
      this._client = client;
      return {
        publicKey: this.publicKey
      };
    } else {
      const { uri, approval } = await client.connect(getConnectParams(this._network));
      return new Promise((resolve, reject) => {
        if (uri) {
          import_qrcode_modal.default.open(uri, () => {
            reject(new QRCodeModalError());
          });
        }
        approval().then((session) => {
          this._session = session;
          this._client = client;
          resolve({ publicKey: this.publicKey });
        }).catch(reject).finally(() => {
          import_qrcode_modal.default.close();
        });
      });
    }
  }
  async disconnect() {
    if (this._client && this._session) {
      await this._client.disconnect({
        topic: this._session.topic,
        reason: de2("USER_DISCONNECTED")
      });
      this._session = void 0;
    } else {
      throw new ClientNotInitializedError();
    }
  }
  get client() {
    if (this._client) {
      return Object.assign({}, this._client, { off: this._client.removeListener });
    } else {
      throw new ClientNotInitializedError();
    }
  }
  get publicKey() {
    if (this._client && this._session) {
      const { address } = Xe2(this._session.namespaces.solana.accounts[0]);
      return new PublicKey(address);
    } else {
      throw new ClientNotInitializedError();
    }
  }
  async signTransaction(transaction) {
    if (this._client && this._session) {
      let rawTransaction;
      let legacyTransaction;
      if (isVersionedTransaction(transaction)) {
        rawTransaction = Buffer.from(transaction.serialize()).toString("base64");
        if (transaction.version === "legacy") {
          legacyTransaction = Transaction.from(transaction.serialize());
        }
      } else {
        rawTransaction = transaction.serialize({
          requireAllSignatures: false,
          verifySignatures: false
        }).toString("base64");
        legacyTransaction = transaction;
      }
      const { signature } = await this._client.request({
        chainId: this._network,
        topic: this._session.topic,
        request: {
          method: WalletConnectRPCMethods.signTransaction,
          params: {
            // Passing ...legacyTransaction is deprecated.
            // All new clients should rely on the `transaction` parameter.
            // The future versions will stop passing ...legacyTransaction.
            ...legacyTransaction,
            // New base64-encoded serialized transaction request parameter
            transaction: rawTransaction
          }
        }
      });
      transaction.addSignature(this.publicKey, Buffer.from(import_bs58.default.decode(signature)));
      return transaction;
    } else {
      throw new ClientNotInitializedError();
    }
  }
  async signMessage(message) {
    if (this._client && this._session) {
      const { signature } = await this._client.request({
        // The network does not change the output of message signing, but this is a required parameter for SignClient
        chainId: this._network,
        topic: this._session.topic,
        request: {
          method: WalletConnectRPCMethods.signMessage,
          params: { pubkey: this.publicKey.toString(), message: import_bs58.default.encode(message) }
        }
      });
      return import_bs58.default.decode(signature);
    } else {
      throw new ClientNotInitializedError();
    }
  }
};
export {
  ClientNotInitializedError,
  QRCodeModalError,
  WalletConnectChainID,
  Se3 as WalletConnectClient,
  WalletConnectRPCMethods,
  WalletConnectWallet
};
/*! Bundled license information:

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

tslib/tslib.es6.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

tslib/tslib.es6.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@walletconnect/relay-auth/dist/index.es.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@walletconnect/utils/dist/index.es.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
//# sourceMappingURL=esm-LEJ47GBL.js.map
