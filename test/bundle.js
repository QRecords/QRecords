!function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Diagnose=t.MedicationIntervals=t.Medication=t.PhoneNumber=t.QRContents=void 0;var r=function(){function e(){}return e.prototype.getGenerationDateText=function(){return new Date(24*this.generationDate*60*60*1e3).toDateString()},e}();t.QRContents=r;var i=function(){};t.PhoneNumber=i;var o=function(){};t.Medication=o;var a=function(){};t.MedicationIntervals=a;var s=function(){};t.Diagnose=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ByteBuffer=void 0;var r=function(){function e(e){this.data=e,this.position=0}return e.prototype.isBitSet=function(e){var t=e>>3,n=128>>(e%=8);return(this.data[t]&n)==n},e.prototype.setBit=function(e,t){var n=e>>3,r=128>>(e%=8);t?this.data[n]|=r:(r=~r,this.data[n]&=r)},e.prototype.readBit=function(){var e=this.isBitSet(this.position);return this.position++,e},e.prototype.readUnsignedNum=function(e){for(var t=0,n=0;n<e;n++)this.readBit()&&(t+=1<<e-n-1);return t},e.prototype.readBinary=function(e){for(var t=new Uint8Array((e>>3)+(e%8==0?0:1)),n=(8-e%8)%8,r=0;r<e;r++){var i=n+r;if(this.readBit()){var o=i>>3,a=128>>(i%=8);t[o]|=a}}return t},e.prototype.readString=function(e,t){for(var n=Math.ceil(Math.log(t.length)/Math.log(2)),r="",i=0;i<e;i++)r+=t.charAt(this.readUnsignedNum(n));return r},e.prototype.writeBit=function(e){this.setBit(this.position,e),this.position++},e.prototype.writeUnsignedNum=function(e,t){for(var n=0;n<t;n++){var r=1<<t-n-1;this.writeBit((r&e)==r)}},e.prototype.writeBinary=function(e,t){for(var n=(8-t%8)%8,r=0;r<t;r++){var i=n+r,o=i>>3,a=128>>(i%=8);this.writeBit((e[o]&a)==a)}},e.prototype.writeString=function(e,t){for(var n=Math.ceil(Math.log(t.length)/Math.log(2)),r=0;r<e.length;r++){var i=t.indexOf(e.charAt(r));-1==i&&(i=0),this.writeUnsignedNum(i,n)}},e.prototype.rewind=function(){this.position=0},e.prototype.getPosition=function(){return this.position},e.prototype.finalize=function(){for(var e=(this.position>>3)+(this.position%8==0?0:1),t=new Uint8Array(e),n=0;n<e;n++)t[n]=this.data[n];return this.data=t,t},e.prototype.generateChecksum=function(){var e=this.position;this.rewind();for(var t=Math.floor(8*this.data.length/13),n=0,r=0;r<t;r++)n^=this.readUnsignedNum(13);return this.position=e,n},e}();t.ByteBuffer=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.PHONE_CHARSET=t.NAME_CHARSET=t.VARTEXT_CHARSET=void 0,t.VARTEXT_CHARSET="? 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.!-+_=><ÄÖÜäöüßáàâéeêìíîóòôúùûÁÀÂÉÈÊÍÌÎÓÒÔÚÙÛ",t.NAME_CHARSET="? ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-ÄÖÜäöüßáàâéeêìíîóòôúùûÁÀÂÉÈÊÍÌÎÓÒÔÚÙÛ",t.PHONE_CHARSET="? 0123456789+"},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.fromByteArray=t.toByteArray=void 0;for(var r=[],i=[],o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a=0,s=o.length;a<s;++a)r[a]=o[a],i[o.charCodeAt(a)]=a;function u(e,t,n){for(var i,o,a=[],s=t;s<n;s+=3)i=(e[s]<<16&16711680)+(e[s+1]<<8&65280)+(255&e[s+2]),a.push(r[(o=i)>>18&63]+r[o>>12&63]+r[o>>6&63]+r[63&o]);return a.join("")}i["-".charCodeAt(0)]=62,i["_".charCodeAt(0)]=63,t.toByteArray=function(e){var t,n,r=function(e){var t=e.length;if(t%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var n=e.indexOf("=");return-1===n&&(n=t),[n,n===t?0:4-n%4]}(e),o=r[0],a=r[1],s=new Uint8Array(function(e,t,n){return 3*(t+n)/4-n}(0,o,a)),u=0,c=a>0?o-4:o;for(n=0;n<c;n+=4)t=i[e.charCodeAt(n)]<<18|i[e.charCodeAt(n+1)]<<12|i[e.charCodeAt(n+2)]<<6|i[e.charCodeAt(n+3)],s[u++]=t>>16&255,s[u++]=t>>8&255,s[u++]=255&t;return 2===a&&(t=i[e.charCodeAt(n)]<<2|i[e.charCodeAt(n+1)]>>4,s[u++]=255&t),1===a&&(t=i[e.charCodeAt(n)]<<10|i[e.charCodeAt(n+1)]<<4|i[e.charCodeAt(n+2)]>>2,s[u++]=t>>8&255,s[u++]=255&t),s},t.fromByteArray=function(e){for(var t,n=e.length,i=n%3,o=[],a=0,s=n-i;a<s;a+=16383)o.push(u(e,a,a+16383>s?s:a+16383));return 1===i?(t=e[n-1],o.push(r[t>>2]+r[t<<4&63]+"==")):2===i&&(t=(e[n-2]<<8)+e[n-1],o.push(r[t>>10]+r[t>>4&63]+r[t<<2&63]+"=")),o.join("")}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),i=n(5),o=n(6),a=new r.QRContents;a.checksum=815,a.generationDate=32021,a.phoneContact=new r.PhoneNumber,a.phoneContact.name="Klaus Müller",a.phoneContact.number="+49 800 800 3 800",a.phoneMedical=new r.PhoneNumber,a.phoneMedical.name="EinsEinsZwei - sei dabei",a.phoneMedical.number="112",a.allergies=["Erdnuss","Mangomilchshake","Lizensierte PZN"];var s=new r.Medication;s.code=9142,s.intervals=new r.MedicationIntervals,s.intervals.morning=3,s.intervals.lunch=2,s.intervals.evening=1,s.intervals.night=0,a.medications=[s];var u=new r.Diagnose;u.code=8804,a.diagnoses=[u],a.notes="Lorem ipsum dolor sit amet!",console.log(a);var c=new i.Encoder(a).encode();console.log(c);var d=new o.Decoder(c);console.log(d.decode())},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.QRContents=t.PhoneNumber=t.MedicationIntervals=t.Medication=t.Diagnose=t.Encoder=void 0;var r=n(0);Object.defineProperty(t,"Diagnose",{enumerable:!0,get:function(){return r.Diagnose}}),Object.defineProperty(t,"Medication",{enumerable:!0,get:function(){return r.Medication}}),Object.defineProperty(t,"MedicationIntervals",{enumerable:!0,get:function(){return r.MedicationIntervals}}),Object.defineProperty(t,"PhoneNumber",{enumerable:!0,get:function(){return r.PhoneNumber}}),Object.defineProperty(t,"QRContents",{enumerable:!0,get:function(){return r.QRContents}});var i=n(1),o=n(2),a=n(3),s=function(){function e(e){this.input=e}return e.prototype.getResult=function(){return this.anchor},e.prototype.encode=function(){var e=new i.ByteBuffer(new Uint8Array(4096));return e.writeUnsignedNum(this.input.generationDate,16),e.writeUnsignedNum(this.input.phoneContact.name.length,6),e.writeString(this.input.phoneContact.name,o.NAME_CHARSET),e.writeUnsignedNum(this.input.phoneContact.number.length,6),e.writeString(this.input.phoneContact.number,o.PHONE_CHARSET),e.writeUnsignedNum(this.input.phoneMedical.name.length,6),e.writeString(this.input.phoneMedical.name,o.NAME_CHARSET),e.writeUnsignedNum(this.input.phoneMedical.number.length,6),e.writeString(this.input.phoneMedical.number,o.PHONE_CHARSET),e.writeUnsignedNum(this.input.allergies.length,6),this.input.allergies.forEach((function(t){e.writeUnsignedNum(t.length,6),e.writeString(t,o.NAME_CHARSET)})),e.writeUnsignedNum(this.input.medications.length,6),this.input.medications.forEach((function(t){e.writeUnsignedNum(t.code,24),e.writeUnsignedNum(t.intervals.morning,4),e.writeUnsignedNum(t.intervals.lunch,4),e.writeUnsignedNum(t.intervals.evening,4),e.writeUnsignedNum(t.intervals.night,4)})),e.writeUnsignedNum(this.input.diagnoses.length,6),this.input.diagnoses.forEach((function(t){e.writeUnsignedNum(t.code,14)})),e.writeUnsignedNum(this.input.notes.length,12),e.writeString(this.input.notes,o.VARTEXT_CHARSET),this.anchor=a.fromByteArray(e.finalize()),this.input.checksum=e.generateChecksum(),this.anchor},e}();t.Encoder=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.QRContents=t.PhoneNumber=t.MedicationIntervals=t.Medication=t.Diagnose=t.Decoder=void 0;var r=n(0);Object.defineProperty(t,"Diagnose",{enumerable:!0,get:function(){return r.Diagnose}}),Object.defineProperty(t,"Medication",{enumerable:!0,get:function(){return r.Medication}}),Object.defineProperty(t,"MedicationIntervals",{enumerable:!0,get:function(){return r.MedicationIntervals}}),Object.defineProperty(t,"PhoneNumber",{enumerable:!0,get:function(){return r.PhoneNumber}}),Object.defineProperty(t,"QRContents",{enumerable:!0,get:function(){return r.QRContents}});var i=n(1),o=n(2),a=n(3),s=function(){function e(e){this.anchor=e}return e.prototype.getResult=function(){return this.result},e.prototype.decode=function(){var e=a.toByteArray(this.anchor),t=new i.ByteBuffer(e);this.result=new r.QRContents,this.result.checksum=t.generateChecksum(),this.result.generationDate=t.readUnsignedNum(16),this.result.phoneContact=new r.PhoneNumber;var n=t.readUnsignedNum(6);this.result.phoneContact.name=t.readString(n,o.NAME_CHARSET),n=t.readUnsignedNum(6),this.result.phoneContact.number=t.readString(n,o.PHONE_CHARSET),this.result.phoneMedical=new r.PhoneNumber,n=t.readUnsignedNum(6),this.result.phoneMedical.name=t.readString(n,o.NAME_CHARSET),n=t.readUnsignedNum(6),this.result.phoneMedical.number=t.readString(n,o.PHONE_CHARSET);var s=t.readUnsignedNum(6);this.result.allergies=[];for(var u=0;u<s;u++)n=t.readUnsignedNum(6),this.result.allergies=this.result.allergies.concat(t.readString(n,o.NAME_CHARSET));s=t.readUnsignedNum(6),this.result.medications=[];for(u=0;u<s;u++){var c=new r.Medication;c.code=t.readUnsignedNum(24),c.intervals=new r.MedicationIntervals,c.intervals.morning=t.readUnsignedNum(4),c.intervals.lunch=t.readUnsignedNum(4),c.intervals.evening=t.readUnsignedNum(4),c.intervals.night=t.readUnsignedNum(4),c.resolved=!1,this.result.medications=this.result.medications.concat(c)}s=t.readUnsignedNum(6),this.result.diagnoses=[];for(u=0;u<s;u++){var d=new r.Diagnose;d.code=t.readUnsignedNum(14),d.resolved=!1,this.result.diagnoses=this.result.diagnoses.concat(d)}return n=t.readUnsignedNum(12),this.result.notes=t.readString(n,o.VARTEXT_CHARSET),this.result},e}();t.Decoder=s}]);