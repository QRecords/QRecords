!function(t){var e={};function r(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=3)}([function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ByteBuffer=void 0;var n=function(){function t(t){this.data=t,this.position=0}return t.prototype.isBitSet=function(t){var e=t>>3,r=128>>(t%=8);return(this.data[e]&r)==r},t.prototype.setBit=function(t,e){var r=t>>3,n=128>>(t%=8);e?this.data[r]|=n:(n=~n,this.data[r]&=n)},t.prototype.readBit=function(){var t=this.isBitSet(this.position);return this.position++,t},t.prototype.readUnsignedNum=function(t){for(var e=0,r=0;r<t;r++)this.readBit()&&(e+=1<<t-r-1);return e},t.prototype.readBinary=function(t){for(var e=new Uint8Array((t>>3)+(t%8==0?0:1)),r=(8-t%8)%8,n=0;n<t;n++){var i=r+n;if(this.readBit()){var o=i>>3,a=128>>(i%=8);e[o]|=a}}return e},t.prototype.readString=function(t,e){for(var r=Math.ceil(Math.log(e.length)/Math.log(2)),n="",i=0;i<t;i++)n+=e.charAt(this.readUnsignedNum(r));return n},t.prototype.writeBit=function(t){this.setBit(this.position,t),this.position++},t.prototype.writeUnsignedNum=function(t,e){for(var r=0;r<e;r++){var n=1<<e-r-1;this.writeBit((n&t)==n)}},t.prototype.writeBinary=function(t,e){for(var r=(8-e%8)%8,n=0;n<e;n++){var i=r+n,o=i>>3,a=128>>(i%=8);this.writeBit((t[o]&a)==a)}},t.prototype.writeString=function(t,e){for(var r=Math.ceil(Math.log(e.length)/Math.log(2)),n=0;n<t.length;n++){var i=e.indexOf(t.charAt(n));-1==i&&(i=0),this.writeUnsignedNum(i,r)}},t.prototype.rewind=function(){this.position=0},t.prototype.getPosition=function(){return this.position},t.prototype.finalize=function(){for(var t=(this.position>>3)+(this.position%8==0?0:1),e=new Uint8Array(t),r=0;r<t;r++)e[r]=this.data[r];return this.data=e,e},t}();e.ByteBuffer=n},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.PHONE_CHARSET=e.NAME_CHARSET=e.VARTEXT_CHARSET=void 0,e.VARTEXT_CHARSET="? 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.!-+_=><ÄÖÜäöüßáàâéeêìíîóòôúùûÁÀÂÉÈÊÍÌÎÓÒÔÚÙÛ",e.NAME_CHARSET="? ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-ÄÖÜäöüßáàâéeêìíîóòôúùûÁÀÂÉÈÊÍÌÎÓÒÔÚÙÛ",e.PHONE_CHARSET="? 0123456789+"},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.fromByteArray=e.toByteArray=void 0;for(var n=[],i=[],o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a=0,s=o.length;a<s;++a)n[a]=o[a],i[o.charCodeAt(a)]=a;function u(t,e,r){for(var i,o,a=[],s=e;s<r;s+=3)i=(t[s]<<16&16711680)+(t[s+1]<<8&65280)+(255&t[s+2]),a.push(n[(o=i)>>18&63]+n[o>>12&63]+n[o>>6&63]+n[63&o]);return a.join("")}i["-".charCodeAt(0)]=62,i["_".charCodeAt(0)]=63,e.toByteArray=function(t){var e,r,n=function(t){var e=t.length;if(e%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var r=t.indexOf("=");return-1===r&&(r=e),[r,r===e?0:4-r%4]}(t),o=n[0],a=n[1],s=new Uint8Array(function(t,e,r){return 3*(e+r)/4-r}(0,o,a)),u=0,d=a>0?o-4:o;for(r=0;r<d;r+=4)e=i[t.charCodeAt(r)]<<18|i[t.charCodeAt(r+1)]<<12|i[t.charCodeAt(r+2)]<<6|i[t.charCodeAt(r+3)],s[u++]=e>>16&255,s[u++]=e>>8&255,s[u++]=255&e;return 2===a&&(e=i[t.charCodeAt(r)]<<2|i[t.charCodeAt(r+1)]>>4,s[u++]=255&e),1===a&&(e=i[t.charCodeAt(r)]<<10|i[t.charCodeAt(r+1)]<<4|i[t.charCodeAt(r+2)]>>2,s[u++]=e>>8&255,s[u++]=255&e),s},e.fromByteArray=function(t){for(var e,r=t.length,i=r%3,o=[],a=0,s=r-i;a<s;a+=16383)o.push(u(t,a,a+16383>s?s:a+16383));return 1===i?(e=t[r-1],o.push(n[e>>2]+n[e<<4&63]+"==")):2===i&&(e=(t[r-2]<<8)+t[r-1],o.push(n[e>>10]+n[e>>4&63]+n[e<<2&63]+"=")),o.join("")}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Decoder=void 0;var n=r(4),i=r(0),o=r(1),a=r(2),s=function(){function t(t){this.anchor=t}return t.prototype.getResult=function(){return this.result},t.prototype.decode=function(){var t=a.toByteArray(this.anchor),e=new i.ByteBuffer(t);this.result=new n.QRContents,this.result.checksum=e.readUnsignedNum(14),this.result.generationDate=e.readUnsignedNum(16),this.result.phoneContact=new n.PhoneNumber;var r=e.readUnsignedNum(6);this.result.phoneContact.name=e.readString(r,o.NAME_CHARSET),r=e.readUnsignedNum(6),this.result.phoneContact.number=e.readString(r,o.PHONE_CHARSET),this.result.phoneMedical=new n.PhoneNumber,r=e.readUnsignedNum(6),this.result.phoneMedical.name=e.readString(r,o.NAME_CHARSET),r=e.readUnsignedNum(6),this.result.phoneMedical.number=e.readString(r,o.PHONE_CHARSET);var s=e.readUnsignedNum(6);this.result.allergies=[];for(var u=0;u<s;u++)r=e.readUnsignedNum(6),this.result.allergies=this.result.allergies.concat(e.readString(r,o.NAME_CHARSET));s=e.readUnsignedNum(6),this.result.medications=[];for(u=0;u<s;u++){var d=new n.Medication;d.code=e.readUnsignedNum(24),d.intervals=new n.MedicationIntervals,d.intervals.morning=e.readUnsignedNum(4),d.intervals.lunch=e.readUnsignedNum(4),d.intervals.evening=e.readUnsignedNum(4),d.intervals.night=e.readUnsignedNum(4),d.state="RESOLVING",this.result.medications=this.result.medications.concat(d)}s=e.readUnsignedNum(6),this.result.diagnoses=[];for(u=0;u<s;u++){var c=new n.Diagnose;c.code=e.readUnsignedNum(14),c.state="RESOLVING",this.result.diagnoses=this.result.diagnoses.concat(c)}return r=e.readUnsignedNum(12),this.result.notes=e.readString(r,o.VARTEXT_CHARSET),this.result},t}();e.Decoder=s},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Diagnose=e.MedicationIntervals=e.Medication=e.PhoneNumber=e.QRContents=void 0;var n=function(){};e.QRContents=n;var i=function(){};e.PhoneNumber=i;var o=function(){};e.Medication=o;var a=function(){};e.MedicationIntervals=a;var s=function(){};e.Diagnose=s}]);