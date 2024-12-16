// Wrapping all code in the function
// so I can have private variables
var HugeNumber = (function () {
    const ARROW_LIMITS = [2.396009145337229,1.3794884713808426,1.1397180753577167,1.0567974360219186,1.0239917509322818,1.0102964580665499,1.0044488304267691,1.0019278174114663,1.000836434476243,1.0003631070410433,1.0001576667610421,1.0000684684068455,1.0000297344333546,1.0000129133083444,1.0000056081423478,1.0000024355784451,1.0000010577569909,1.0000004593777803,1.0000001995051901,1.0000000866439955,1.0000000376290075,1.0000000163420704,1.0000000070972699,1.0000000030823064,1.0000000013386274,1.000000000581359,1.0000000002524811,1.000000000109651,1.0000000000476201,1.0000000000206821,1.0000000000089813,1.0000000000039009,1.0000000000016946,1.000000000000735,1.0000000000003197,1.0000000000001381,1.0000000000000608,1.0000000000000262,1.000000000000011,1.0000000000000062,1.0000000000000013,1.0000000000000013,1.0000000000000013,1.0000000000000013,1.0000000000000013,1.0000000000000013,1.0000000000000013,1.0000000000000013];

    function normalize(array) {
        var b = array[0], c = array[1], d = array[2];
        if(c === 1 && d === 1 && b < Math.log10(Number.MAX_VALUE)) {
            return Math.pow(10, b);
        } else if(b === 1) {
            return 10;
        } else if(c === 1 && 1 < d && d < 2) {
            var t1 = normalize([b, 1, 1]);
            var t2 = normalize([b, 1, 2]);
            
            if(typeof t1 === "number") {
                t1 = [Math.log10(t1), 1, 1];
            }
            if(typeof t2 === "number") {
                t2 = [Math.log10(t2), 1, 1];
            }

            if(t1[1] === 1 && t1[2] === 1 && t2[1] === 1 && t2[2] === 1) {
                return normalize([t1[0] * (2 - d) + t2[0] * (d - 1), 1, 1]);
            } else {
                return normalize([b, 1, Math.ceil(d)]);
            }
        } else if(1 < b && b < 2 && c === 1 && d >= 2) {
            return normalize([Math.pow(10, b - 1), 10, d - 1]);
        } else if(b >= 2 && d >= 2) {
            return normalize([10, normalize([b - 1, 1, d]), d - 1]);
        } else if(1 < c && c < 2) {
            var t1 = normalize([b, 1, d]);
            var t2 = normalize([b, 2, d]);
            
            if(typeof t1 === "number") {
                t1 = [Math.log10(t1), 1, 1];
            }
            if(typeof t2 === "number") {
                t2 = [Math.log10(t2), 1, 1];
            }

            if(t1[1] === 1 && t1[2] === 1 && t2[1] === 1 && t2[2] === 1) {
                return normalize([t1[0] * (2 - d) + t2[0] * (d - 1), 1, 1]);
            } else {
                return normalize([b, Math.ceil(c), d]);
            }
        } else if(1 < b && b < 2 && c >= 2) {
            return normalize([Math.pow(10, b - 1), c - 1, d]);
        } else if(b >= 2 && b < 4) {
            var innerArray = normalize([b - 1, c, d]);
            if(typeof innerArray === "number" || innerArray[1] < (c - 1) || innerArray[2] < d) {
                return normalize([innerArray, c - 1, d]);                
            } else {
                return array;
            }
        } else {
            return array;
        }
    }

    class HugeNumber {
        constructor(sign, array) {
            this.sign = sign
            this.array = normalize(array);
        }

        clone() {
            return new HugeNumber(this.sign, this.n, this.ords.slice());
        }

        abs() {
            return new HugeNumber(1, this.n, this.ords.slice());
        }

        neg() {
            return new HugeNumber(-this.sign, this.n, this.ords.slice());
        }

        negAbs() {
            return new HugeNumber(-1, this.n, this.ords.slice());
        }

        add(other) {
            return thi;
        }

        static getFSTerm(ord, n) {
            return getFSTerm(ord, n);
        }
    }

    return HugeNumber;
})();

// Export if in node.js
if (typeof module === "object") {
    module.exports = HugeNumber;
}


// var HugeNumber = (function () {
//     const LNLN2 = -0.36651292058166435;

//     // function dh(ord, n) {
//     //     if(ord === 0) {
//     //         return n;
//     //     } else if(typeof ord === "number") {
//     //         return dh(ord - 1, Math.pow(10, n));
//     //     }
//     // }

//     function jsonEq(a, b) {
//         return JSON.stringify(a) === JSON.stringify(b);
//     }


//     function cmpOrd(a, b) {
//         if (typeof a === "number" && typeof b === "number") {
//             return (a < b ? -1 : (a === b ? 0 : 1));
//         } else if (typeof a === "number") {
//             return -1;
//         } else if (typeof b === "number") {
//             return 1;
//         } else {
//             for (var i = Math.max(a.length, b.length) - 1; i >= 0; i--) {
//                 var t1 = i >= a.length ? 0 : a[i][1];
//                 var t2 = i >= a.length ? 0 : b[i][1];
//                 if (cmpOrd(t1, t2) === -1) {
//                     return -1;
//                 } else if (cmpOrd(t1, t2) === 1) {
//                     return 1;
//                 }
//                 var t3 = i >= a.length ? 0 : a[i][0];
//                 var t4 = i >= a.length ? 0 : b[i][0];
//                 if (t3 < t4) {
//                     return -1;
//                 } else if (t3 > t4) {
//                     return 1;
//                 }
//             }

//             return 0;
//         }
//     }

//     function normalizeOrd(ord) {
//         if (typeof ord === "number") {
//             return ord;
//         } else if (ord.length === 0) {
//             return 0;
//         } else if (ord.length === 1 && ord[0][1] === 0) {
//             return ord[0][0];
//         }

//         var result = [...ord].map((e) => [e[0], normalizeOrd(e[1])]).filter((e) => e !== 0 && (e[0] !== 0));
//         var largestExp = 0;
//         // var indicesToRemove = [];
//         for (var i = ord.length - 1; i >= 0; i--) {
//             if (cmpOrd(ord[i][1], largestExp) >= 0) {
//                 largestExp = ord[i][1];
//             } else {
//                 result = result.filter((e) => !jsonEq(e[1], ord[i][1]) && e[0] !== 0);
//             }
//         }

//         var largestExpTerms = result.filter((e) => jsonEq(e[1], largestExp));
//         if (largestExpTerms.length > 1) {
//             var sum = 0;
//             for (var i = 0; i < largestExpTerms.length; i++) {
//                 sum += largestExpTerms[i][0];
//             }
//             result = result.filter((e) => !largestExpTerms.includes(e));
//             result.push([sum, largestExp]);
//         }

//         return result;
//     }

//     // 

//     function ordToString(ord) {
//         if (typeof ord === "number") {
//             return ord;
//         } else {
//             var result = "";
//             for (var i = 0; i < ord.length; i++) {
//                 var coef = (ord[i][0] === 1 ? "" : "*" + ord[i][0].toString());
//                 var exp = ordToString(ord[i][1]);
//                 if (ord[i][1] === 0) {
//                     result += ord[i][0] + "+";
//                 } else if (ord[i][1] === 1) {
//                     result += "ω" + coef + "+";
//                 } else {
//                     if ((typeof ord[i][1] === "number") || (ord[i][1].length === 1 && ord[i][1][0][1] === 1)) {
//                         result += "ω^" + exp + coef + "+";
//                     } else {
//                         result += "ω^(" + exp + ")" + coef + "+";
//                     }
//                 }
//             }
//             return result.slice(0, -1);
//         }
//     }

//     // Check if ord is a limit ordinal

//     function isLimitOrd(ord) {
//         if (typeof ord === "number") {
//             return false;
//         }

//         return ord.filter((e) => e[1] === 0).length === 0;
//     }


//     // Decrement (subtract 1) from ord
//     // Only works for non-limit ordinals
//     function dec(ord) {
//         if(typeof ord === "number") {
//             return ord - 1;
//         }
        
//         var constantTerm = ord[ord.length - 1][0];
//         return ord.slice(0, -1).concat(constantTerm - 1);
//     }

//     // Get the nth term of the fundamental sequence of ord
//     function getFSTerm(ord, n) {
//         if (jsonEq(ord, [[1, 1]])) {
//             return n;
//         } else if (ord.length === 1) {
//             if (isLimitOrd(ord[0][1])) {
//                 return [[ord[0][0] - 1, ord[0][1]], [1, getFSTerm(ord[0][1], n)]];
//             } else {
//                 return [[ord[0][0] - 1, ord[0][1]], [n, dec(ord[0][1])]];
//             }
//         } else {
//             var higherTerms = ord.slice(0, -1);
//             var lowestTerm = [ord[ord.length - 1]];
//             return higherTerms.concat(getFSTerm(lowestTerm, n));
//         }
//     }

//     class HugeNumber {
//         constructor(sign, ord, n) {
//             // console.log("!", sign, ord, n);
//             this.sign = sign;
//             this.ord = normalizeOrd(ord);
//             this.n = n;
//             while(isLimitOrd(this.ord)) {
//                 this.ord = normalizeOrd(getFSTerm(this.ord, Math.ceil(n)));
//                 this.n = Math.ceil(n);
//             }
//             if(typeof this.ord === "number") {
//                 while(this.ord > 0 && this.n <= 308.25471555991675) {
//                     this.ord = dec(this.ord);
//                     this.n = Math.pow(10, this.n);                
//                 }
//             }
//         }

//         clone() {
//             return new HugeNumber(this.sign, [...this.ord], this.n);
//         }

//         cmp(other) {
//             if (this.sign === -1 && other.sign === -1) {
//                 return this.negAbs().cmp(other.negAbs());
//             }
//             if (jsonEq(this.ord, other.ord)) {
//                 return (this.n < other.n ? -1 : (this.n === other.n ? 0 : 1));
//             } else {
//                 return cmpOrd(this.ord, other.ord);
//             }
//         }

//         eq(other) {
//             return this.cmp(other) === 0;
//         }

//         ne(other) {
//             return this.cmp(other) !== 0;
//         }

//         lt(other) {
//             return this.cmp(other) < 0;
//         }

//         le(other) {
//             return this.cmp(other) <= 0;
//         }

//         gt(other) {
//             return this.cmp(other) > 0;
//         }

//         ge(other) {
//             return this.cmp(other) >= 0;
//         }

//         min(other) {
//             return this.lt(other) ? this.clone() : other;
//         }

//         max(other) {
//             return this.gt(other) ? this.clone() : other;
//         }

//         add(other) {
//             if (this.lt(other)) {
//                 return other.add(this);
//             } else if (this.sign === -1 && other.sign === -1) {
//                 return this.negAbs().add(other.negAbs()).negAbs();
//             } else if (this.sign === 1 && other.sign === -1) {
//                 return this.sub(other.negAbs());
//             } else if (this.ord === 0 && other.ord === 0) {
//                 return new HugeNumber(1, 0, this.n + other.n);
//             } else if (this.ord === 1 && (other.ord === 0 || other.ord === 1)) {
//                 var y = other.n === 0 ? Math.log10(other.n) : other.n;
//                 var gaussianLog = Math.log10(1 + Math.pow(10, y - this.n));
//                 return new HugeNumber(1, 1, this.n + gaussianLog);
//             } else {
//                 return this.clone();
//             }
//         }

//         sub(other) {
//             if (this.lt(other)) {
//                 return other.sub(this).neg();
//             } else if (this.sign === -1 && other.sign === -1) {
//                 return this.negAbs().sub(other.negAbs()).negAbs();
//             } else if (this.sign === 1 && other.sign === -1) {
//                 return this.add(other.negAbs());
//             } else if (this.ord === 0 && other.ord === 0) {
//                 return new HugeNumber(1, 0, this.n - other.n);
//             } else if (this.ord === 1 && (other.ord === 0 || other.ord === 1)) {
//                 var y = other.n === 0 ? Math.log10(other.n) : other.n;
//                 var gaussianLog = Math.log10(Math.abs(1 - Math.pow(10, y - this.n)));
//                 return new HugeNumber(1, 1, this.n + gaussianLog);
//             } else {
//                 return this.clone();
//             }
//         }

//         mul(other) {
//             var sign = this.sign * other.sign;
//             if (this.lt(other)) {
//                 return other.mul(this);
//             } else if (this.ord === 0 && other.ord === 0) {
//                 return new HugeNumber(1, 0, this.n * other.n);
//             } else if (this.ord === 1 && (other.ord === 0 || other.ord === 1)) {
//                 return new HugeNumber(1, 0, this.n + (other.ord === 0 ? Math.log10(other.n) : other.n));
//             } else if (this.ord === 2 && (other.ord === 1 || other.ord === 2)) {
//                 var y = other.n === 0 ? Math.log10(other.n) : other.n;
//                 var gaussianLog = Math.log10(1 + Math.pow(10, y - this.n));
//                 return new HugeNumber(1, 2, this.n + gaussianLog);
//             } else {
//                 return this.clone();
//             }
//         }

//         div(other) {
//             var sign = this.sign * other.sign;
//             if (this.eq(other)) {
//                 return new HugeNumber(sign, 0, 1);
//             } else if (this.ord === 0 && other.ord === 0) {
//                 return new HugeNumber(sign, 0, this.n / other.n);
//             } else if (this.ord === 1 && (other.ord === 0 || other.ord === 1)) {
//                 return new HugeNumber(sign, 0, this.n - (other.ord === 0 ? Math.log10(other.n) : other.n));
//             } else if (this.lt(other)) {
//                 return new HugeNumber(sign, 0, 0);
//             } else if (this.ord === 2 && (other.ord === 1 || other.ord === 2)) {
//                 var y = other.n === 0 ? Math.log10(other.n) : other.n;
//                 var gaussianLog = Math.log10(Math.abs(1 - Math.pow(10, y - this.n)));
//                 return new HugeNumber(sign, 2, this.n + gaussianLog);
//             } else if (this.gt(other)) {
//                 return this.clone();
//             }
//         }

//         pow10() {
//             if(this.sign === -1) {
//                 return new HugeNumber(1, 0, Math.pow(10, -this.toNumber()));
//             } else if (typeof this.ord === "number") {
//                 return new HugeNumber(1, this.ord + 1, this.n);
//             } else if(jsonEq(this.ord, [[1, 1]])) {
//                 return new HugeNumber(1, this.ord, this.n + 1);                
//             } else {
//                 return this.clone();
//             }
//         }

//         log10() {
//             if(this.ord === 0) {
//                 return new HugeNumber(sign, 0, Math.log10(this.n));
//             } else if(typeof this.ord === "number") {
//                 return new HugeNumber(sign, this.ord - 1, this.n);
//             } else if(jsonEq(this.ord, [[1, 1]])) {
//                 return new HugeNumber(sign, this.ord, this.n - 1);                
//             } else {
//                 return this.clone();
//             }
//         }


//         pow(other) {
//             return other.mul(this.log10()).pow10();
//         }

//         tetr10() {
//             if (typeof this.ord === "number") {
//                 return new HugeNumber(1, Math.floor(this.n), Math.pow(10, this.n % 1));
//             } else if(cmpOrd(this.ord, [[1, 2]]) === -1) {
//                 return new HugeNumber(1, [[1, 1]].concat(this.ord), this.n);                
//             } else if(jsonEq(this.ord, [[1, 2]])) {
//                 return new HugeNumber(1, [[1, 2]], this.n + 1);
//             } else {
//                 return this.clone();
//             }
//         }

//         pent10() {
//             if (typeof this.ord === "number") {
//                 console.log([[this.n, 1]], Math.pow(10, this.n % 1));
//                 return new HugeNumber(1,  [[this.n, 1]], 1);                
//             } else if(cmpOrd(this.ord, [[1, 3]]) === -1) {
//                 return new HugeNumber(1, [[1, 3]].concat(this.ord), this.n);                
//             } else if(jsonEq(this.ord, [[1, 2]])) {
//                 return new HugeNumber(1, [[1, 3]], this.n + 1);
//             } else {
//                 return this.clone();
//             }
//         }

//         // slog10() {
//         //     if(cmpOrd(this.ord, [[1, 2]]) === -1) {
//         //         console.log("!");
//         //         return new HugeNumber(1, [[1, 1]].concat(this.ord), this.n);                
//         //     } else if(jsonEq(this.ord, [[1, 2]])) {
//         //         return new HugeNumber(1, [[1, 2]], this.n + 1);
//         //     } else {
//         //         return this.clone();
//         //     }
//         // }


//         toNumber() {
//             if(this.ord === 0) {
//                 return this.sign * this.n;
//             } else {
//                 return this.sign * Infinity;
//             }
//         }


//         toString() {
//             if(this.ord === 0) {
//                 return this.n.toString();
//             } else {
//                 return "D_" + ordToString(this.ord) + "(" + this.n + ")";
//             }
//         }
//     }

//     return HugeNumber;
// })();


// // Export if in node.js
// if (typeof module === "object") {
//     module.exports = HugeNumber;
// }