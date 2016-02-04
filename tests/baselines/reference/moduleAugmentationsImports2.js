//// [tests/cases/compiler/moduleAugmentationsImports2.ts] ////

//// [a.ts]

export class A {}

//// [b.ts]
export class B {x: number;}

//// [c.d.ts]
declare module "C" {
    class Cls {y: string; }
}

//// [d.ts]
/// <reference path="c.d.ts"/>

import {A} from "./a";
import {B} from "./b";

A.prototype.getB = function () { return undefined; }

declare module "./a" {
    interface A {
        getB(): B;
    }
}

//// [e.ts]
import {A} from "./a";
import {Cls} from "C";

A.prototype.getCls = function () { return undefined; }

declare module "./a" {
    interface A {
        getCls(): Cls;
    }
}

//// [main.ts]
import {A} from "./a";
import "d";
import "e";

let a: A;
let b = a.getB().x.toFixed();
let c = a.getCls().y.toLowerCase();

//// [f.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    var A = (function () {
        function A() {
        }
        return A;
    }());
    exports.A = A;
});
define("b", ["require", "exports"], function (require, exports) {
    "use strict";
    var B = (function () {
        function B() {
        }
        return B;
    }());
    exports.B = B;
});
/// <reference path="c.d.ts"/>
define("d", ["require", "exports", "a"], function (require, exports, a_1) {
    "use strict";
    a_1.A.prototype.getB = function () { return undefined; };
});
define("e", ["require", "exports", "a"], function (require, exports, a_2) {
    "use strict";
    a_2.A.prototype.getCls = function () { return undefined; };
});
define("main", ["require", "exports", "d", "e"], function (require, exports) {
    "use strict";
    var a;
    var b = a.getB().x.toFixed();
    var c = a.getCls().y.toLowerCase();
});


//// [f.d.ts]
/// <reference path="tests/cases/compiler/c.d.ts" />
declare module "a" {
    export class A {
    }
}
declare module "b" {
    export class B {
        x: number;
    }
}
declare module "d" {
    import { B } from "b";
    module "a" {
        interface A {
            getB(): B;
        }
    }
}
declare module "e" {
    import { Cls } from "C";
    module "a" {
        interface A {
            getCls(): Cls;
        }
    }
}
declare module "main" {
    import "d";
    import "e";
}