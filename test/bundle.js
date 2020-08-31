!function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Diagnose=t.MedicationIntervals=t.Medication=t.PhoneNumber=t.QRContents=void 0;var i=function(){};t.QRContents=i;var r=function(){};t.PhoneNumber=r;var o=function(){};t.Medication=o;var s=function(){};t.MedicationIntervals=s;var a=function(){};t.Diagnose=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ByteBuffer=void 0;var i=function(){function e(e){this.data=e,this.position=0}return e.prototype.isBitSet=function(e){var t=e>>3,n=128>>(e%=8);return(this.data[t]&n)==n},e.prototype.setBit=function(e,t){var n=e>>3,i=128>>(e%=8);t?this.data[n]|=i:(i=~i,this.data[n]&=i)},e.prototype.readBit=function(){var e=this.isBitSet(this.position);return this.position++,e},e.prototype.readUnsignedNum=function(e){for(var t=0,n=0;n<e;n++)this.readBit()&&(t+=1<<e-n-1);return t},e.prototype.readBinary=function(e){for(var t=new Uint8Array((e>>3)+(e%8==0?0:1)),n=(8-e%8)%8,i=0;i<e;i++){var r=n+i;if(this.readBit()){var o=r>>3,s=128>>(r%=8);t[o]|=s}}return t},e.prototype.readString=function(e,t){for(var n=Math.ceil(Math.log(t.length)/Math.log(2)),i="",r=0;r<e;r++)i+=t.charAt(this.readUnsignedNum(n));return i},e.prototype.writeBit=function(e){this.setBit(this.position,e),this.position++},e.prototype.writeUnsignedNum=function(e,t){for(var n=0;n<t;n++){var i=1<<t-n-1;this.writeBit((i&e)==i)}},e.prototype.writeBinary=function(e,t){for(var n=(8-t%8)%8,i=0;i<t;i++){var r=n+i,o=r>>3,s=128>>(r%=8);this.writeBit((e[o]&s)==s)}},e.prototype.writeString=function(e,t){for(var n=Math.ceil(Math.log(t.length)/Math.log(2)),i=0;i<e.length;i++){var r=t.indexOf(e.charAt(i));-1==r&&(r=0),this.writeUnsignedNum(r,n)}},e.prototype.rewind=function(){this.position=0},e.prototype.getPosition=function(){return this.position},e.prototype.finalize=function(){for(var e=(this.position>>3)+(this.position%8==0?0:1),t=new Uint8Array(e),n=0;n<e;n++)t[n]=this.data[n];return this.data=t,t},e}();t.ByteBuffer=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.PHONE_CHARSET=t.NAME_CHARSET=t.VARTEXT_CHARSET=void 0,t.VARTEXT_CHARSET="? 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.!-+_=><ÄÖÜäöüßáàâéeêìíîóòôúùûÁÀÂÉÈÊÍÌÎÓÒÔÚÙÛ",t.NAME_CHARSET="? ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-ÄÖÜäöüßáàâéeêìíîóòôúùûÁÀÂÉÈÊÍÌÎÓÒÔÚÙÛ",t.PHONE_CHARSET="? 0123456789+"},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.fromByteArray=t.toByteArray=void 0;for(var i=[],r=[],o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",s=0,a=o.length;s<a;++s)i[s]=o[s],r[o.charCodeAt(s)]=s;function u(e,t,n){for(var r,o,s=[],a=t;a<n;a+=3)r=(e[a]<<16&16711680)+(e[a+1]<<8&65280)+(255&e[a+2]),s.push(i[(o=r)>>18&63]+i[o>>12&63]+i[o>>6&63]+i[63&o]);return s.join("")}r["-".charCodeAt(0)]=62,r["_".charCodeAt(0)]=63,t.toByteArray=function(e){var t,n,i=function(e){var t=e.length;if(t%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var n=e.indexOf("=");return-1===n&&(n=t),[n,n===t?0:4-n%4]}(e),o=i[0],s=i[1],a=new Uint8Array(function(e,t,n){return 3*(t+n)/4-n}(0,o,s)),u=0,d=s>0?o-4:o;for(n=0;n<d;n+=4)t=r[e.charCodeAt(n)]<<18|r[e.charCodeAt(n+1)]<<12|r[e.charCodeAt(n+2)]<<6|r[e.charCodeAt(n+3)],a[u++]=t>>16&255,a[u++]=t>>8&255,a[u++]=255&t;return 2===s&&(t=r[e.charCodeAt(n)]<<2|r[e.charCodeAt(n+1)]>>4,a[u++]=255&t),1===s&&(t=r[e.charCodeAt(n)]<<10|r[e.charCodeAt(n+1)]<<4|r[e.charCodeAt(n+2)]>>2,a[u++]=t>>8&255,a[u++]=255&t),a},t.fromByteArray=function(e){for(var t,n=e.length,r=n%3,o=[],s=0,a=n-r;s<a;s+=16383)o.push(u(e,s,s+16383>a?a:s+16383));return 1===r?(t=e[n-1],o.push(i[t>>2]+i[t<<4&63]+"==")):2===r&&(t=(e[n-2]<<8)+e[n-1],o.push(i[t>>10]+i[t>>4&63]+i[t<<2&63]+"=")),o.join("")}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(0),r=n(5),o=n(6),s=new i.QRContents;s.checksum=815,s.generationDate=32021,s.phoneContact=new i.PhoneNumber,s.phoneContact.name="Klaus Müller",s.phoneContact.number="+49 800 800 3 800",s.phoneMedical=new i.PhoneNumber,s.phoneMedical.name="EinsEinsZwei - sei dabei",s.phoneMedical.number="112",s.allergies=["Erdnuss","Mangomilchshake"];var a=new i.Medication;a.code=12321,a.intervals=new i.MedicationIntervals,a.intervals.morning=3,a.intervals.lunch=2,a.intervals.evening=1,a.intervals.night=0,s.medications=[a];var u=new i.Diagnose;u.code=320,s.diagnoses=[u],s.notes="Lorem ipsum dolor sit amet!",console.log(s);var d=new r.Encoder(s).encode();console.log(d);var c=new o.Decoder(d);console.log(c.decode())},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Encoder=void 0;var i=n(1),r=n(2),o=n(3),s=function(){function e(e){this.input=e}return e.prototype.getResult=function(){return this.anchor},e.prototype.encode=function(){var e=new i.ByteBuffer(new Uint8Array(4096));return e.writeUnsignedNum(this.input.checksum,14),e.writeUnsignedNum(this.input.generationDate,16),e.writeUnsignedNum(this.input.phoneContact.name.length,6),e.writeString(this.input.phoneContact.name,r.NAME_CHARSET),e.writeUnsignedNum(this.input.phoneContact.number.length,6),e.writeString(this.input.phoneContact.number,r.PHONE_CHARSET),e.writeUnsignedNum(this.input.phoneMedical.name.length,6),e.writeString(this.input.phoneMedical.name,r.NAME_CHARSET),e.writeUnsignedNum(this.input.phoneMedical.number.length,6),e.writeString(this.input.phoneMedical.number,r.PHONE_CHARSET),e.writeUnsignedNum(this.input.allergies.length,6),this.input.allergies.forEach((function(t){e.writeUnsignedNum(t.length,6),e.writeString(t,r.NAME_CHARSET)})),e.writeUnsignedNum(this.input.medications.length,6),this.input.medications.forEach((function(t){e.writeUnsignedNum(t.code,24),e.writeUnsignedNum(t.intervals.morning,4),e.writeUnsignedNum(t.intervals.lunch,4),e.writeUnsignedNum(t.intervals.evening,4),e.writeUnsignedNum(t.intervals.night,4)})),e.writeUnsignedNum(this.input.diagnoses.length,6),this.input.diagnoses.forEach((function(t){e.writeUnsignedNum(t.code,14)})),e.writeUnsignedNum(this.input.notes.length,12),e.writeString(this.input.notes,r.VARTEXT_CHARSET),this.anchor=o.fromByteArray(e.finalize()),this.anchor},e}();t.Encoder=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Decoder=void 0;var i=n(0),r=n(1),o=n(2),s=n(3),a=function(){function e(e){this.anchor=e}return e.prototype.getResult=function(){return this.result},e.prototype.decode=function(){var e=s.toByteArray(this.anchor),t=new r.ByteBuffer(e);this.result=new i.QRContents,this.result.checksum=t.readUnsignedNum(14),this.result.generationDate=t.readUnsignedNum(16),this.result.phoneContact=new i.PhoneNumber;var n=t.readUnsignedNum(6);this.result.phoneContact.name=t.readString(n,o.NAME_CHARSET),n=t.readUnsignedNum(6),this.result.phoneContact.number=t.readString(n,o.PHONE_CHARSET),this.result.phoneMedical=new i.PhoneNumber,n=t.readUnsignedNum(6),this.result.phoneMedical.name=t.readString(n,o.NAME_CHARSET),n=t.readUnsignedNum(6),this.result.phoneMedical.number=t.readString(n,o.PHONE_CHARSET);var a=t.readUnsignedNum(6);this.result.allergies=[];for(var u=0;u<a;u++)n=t.readUnsignedNum(6),this.result.allergies=this.result.allergies.concat(t.readString(n,o.NAME_CHARSET));a=t.readUnsignedNum(6),this.result.medications=[];for(u=0;u<a;u++){var d=new i.Medication;d.code=t.readUnsignedNum(24),d.intervals=new i.MedicationIntervals,d.intervals.morning=t.readUnsignedNum(4),d.intervals.lunch=t.readUnsignedNum(4),d.intervals.evening=t.readUnsignedNum(4),d.intervals.night=t.readUnsignedNum(4),d.state="RESOLVING",this.result.medications=this.result.medications.concat(d)}a=t.readUnsignedNum(6),this.result.diagnoses=[];for(u=0;u<a;u++){var c=new i.Diagnose;c.code=t.readUnsignedNum(14),c.state="RESOLVING",this.result.diagnoses=this.result.diagnoses.concat(c)}return n=t.readUnsignedNum(12),this.result.notes=t.readString(n,o.VARTEXT_CHARSET),this.result},e}();t.Decoder=a}]);