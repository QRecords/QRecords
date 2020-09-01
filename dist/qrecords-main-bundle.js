var QRecords=function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=7)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Diagnose=t.MedicationIntervals=t.Medication=t.PhoneNumber=t.QRContents=void 0;var n=function(){};t.QRContents=n;var i=function(){};t.PhoneNumber=i;var o=function(){};t.Medication=o;var s=function(){};t.MedicationIntervals=s;var a=function(){};t.Diagnose=a},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ByteBuffer=void 0;var n=function(){function e(e){this.data=e,this.position=0}return e.prototype.isBitSet=function(e){var t=e>>3,r=128>>(e%=8);return(this.data[t]&r)==r},e.prototype.setBit=function(e,t){var r=e>>3,n=128>>(e%=8);t?this.data[r]|=n:(n=~n,this.data[r]&=n)},e.prototype.readBit=function(){var e=this.isBitSet(this.position);return this.position++,e},e.prototype.readUnsignedNum=function(e){for(var t=0,r=0;r<e;r++)this.readBit()&&(t+=1<<e-r-1);return t},e.prototype.readBinary=function(e){for(var t=new Uint8Array((e>>3)+(e%8==0?0:1)),r=(8-e%8)%8,n=0;n<e;n++){var i=r+n;if(this.readBit()){var o=i>>3,s=128>>(i%=8);t[o]|=s}}return t},e.prototype.readString=function(e,t){for(var r=Math.ceil(Math.log(t.length)/Math.log(2)),n="",i=0;i<e;i++)n+=t.charAt(this.readUnsignedNum(r));return n},e.prototype.writeBit=function(e){this.setBit(this.position,e),this.position++},e.prototype.writeUnsignedNum=function(e,t){for(var r=0;r<t;r++){var n=1<<t-r-1;this.writeBit((n&e)==n)}},e.prototype.writeBinary=function(e,t){for(var r=(8-t%8)%8,n=0;n<t;n++){var i=r+n,o=i>>3,s=128>>(i%=8);this.writeBit((e[o]&s)==s)}},e.prototype.writeString=function(e,t){for(var r=Math.ceil(Math.log(t.length)/Math.log(2)),n=0;n<e.length;n++){var i=t.indexOf(e.charAt(n));-1==i&&(i=0),this.writeUnsignedNum(i,r)}},e.prototype.rewind=function(){this.position=0},e.prototype.getPosition=function(){return this.position},e.prototype.finalize=function(){for(var e=(this.position>>3)+(this.position%8==0?0:1),t=new Uint8Array(e),r=0;r<e;r++)t[r]=this.data[r];return this.data=t,t},e}();t.ByteBuffer=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.PHONE_CHARSET=t.NAME_CHARSET=t.VARTEXT_CHARSET=void 0,t.VARTEXT_CHARSET="? 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.!-+_=><ÄÖÜäöüßáàâéeêìíîóòôúùûÁÀÂÉÈÊÍÌÎÓÒÔÚÙÛ",t.NAME_CHARSET="? ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-ÄÖÜäöüßáàâéeêìíîóòôúùûÁÀÂÉÈÊÍÌÎÓÒÔÚÙÛ",t.PHONE_CHARSET="? 0123456789+"},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.fromByteArray=t.toByteArray=void 0;for(var n=[],i=[],o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",s=0,a=o.length;s<a;++s)n[s]=o[s],i[o.charCodeAt(s)]=s;function u(e,t,r){for(var i,o,s=[],a=t;a<r;a+=3)i=(e[a]<<16&16711680)+(e[a+1]<<8&65280)+(255&e[a+2]),s.push(n[(o=i)>>18&63]+n[o>>12&63]+n[o>>6&63]+n[63&o]);return s.join("")}i["-".charCodeAt(0)]=62,i["_".charCodeAt(0)]=63,t.toByteArray=function(e){var t,r,n=function(e){var t=e.length;if(t%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var r=e.indexOf("=");return-1===r&&(r=t),[r,r===t?0:4-r%4]}(e),o=n[0],s=n[1],a=new Uint8Array(function(e,t,r){return 3*(t+r)/4-r}(0,o,s)),u=0,d=s>0?o-4:o;for(r=0;r<d;r+=4)t=i[e.charCodeAt(r)]<<18|i[e.charCodeAt(r+1)]<<12|i[e.charCodeAt(r+2)]<<6|i[e.charCodeAt(r+3)],a[u++]=t>>16&255,a[u++]=t>>8&255,a[u++]=255&t;return 2===s&&(t=i[e.charCodeAt(r)]<<2|i[e.charCodeAt(r+1)]>>4,a[u++]=255&t),1===s&&(t=i[e.charCodeAt(r)]<<10|i[e.charCodeAt(r+1)]<<4|i[e.charCodeAt(r+2)]>>2,a[u++]=t>>8&255,a[u++]=255&t),a},t.fromByteArray=function(e){for(var t,r=e.length,i=r%3,o=[],s=0,a=r-i;s<a;s+=16383)o.push(u(e,s,s+16383>a?a:s+16383));return 1===i?(t=e[r-1],o.push(n[t>>2]+n[t<<4&63]+"==")):2===i&&(t=(e[r-2]<<8)+e[r-1],o.push(n[t>>10]+n[t>>4&63]+n[t<<2&63]+"=")),o.join("")}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.QRContents=t.PhoneNumber=t.MedicationIntervals=t.Medication=t.Diagnose=t.Decoder=void 0;var n=r(0);Object.defineProperty(t,"Diagnose",{enumerable:!0,get:function(){return n.Diagnose}}),Object.defineProperty(t,"Medication",{enumerable:!0,get:function(){return n.Medication}}),Object.defineProperty(t,"MedicationIntervals",{enumerable:!0,get:function(){return n.MedicationIntervals}}),Object.defineProperty(t,"PhoneNumber",{enumerable:!0,get:function(){return n.PhoneNumber}}),Object.defineProperty(t,"QRContents",{enumerable:!0,get:function(){return n.QRContents}});var i=r(1),o=r(2),s=r(3),a=function(){function e(e){this.anchor=e}return e.prototype.getResult=function(){return this.result},e.prototype.decode=function(){var e=s.toByteArray(this.anchor),t=new i.ByteBuffer(e);this.result=new n.QRContents,this.result.checksum=t.readUnsignedNum(14),this.result.generationDate=t.readUnsignedNum(16),this.result.phoneContact=new n.PhoneNumber;var r=t.readUnsignedNum(6);this.result.phoneContact.name=t.readString(r,o.NAME_CHARSET),r=t.readUnsignedNum(6),this.result.phoneContact.number=t.readString(r,o.PHONE_CHARSET),this.result.phoneMedical=new n.PhoneNumber,r=t.readUnsignedNum(6),this.result.phoneMedical.name=t.readString(r,o.NAME_CHARSET),r=t.readUnsignedNum(6),this.result.phoneMedical.number=t.readString(r,o.PHONE_CHARSET);var a=t.readUnsignedNum(6);this.result.allergies=[];for(var u=0;u<a;u++)r=t.readUnsignedNum(6),this.result.allergies=this.result.allergies.concat(t.readString(r,o.NAME_CHARSET));a=t.readUnsignedNum(6),this.result.medications=[];for(u=0;u<a;u++){var d=new n.Medication;d.code=t.readUnsignedNum(24),d.intervals=new n.MedicationIntervals,d.intervals.morning=t.readUnsignedNum(4),d.intervals.lunch=t.readUnsignedNum(4),d.intervals.evening=t.readUnsignedNum(4),d.intervals.night=t.readUnsignedNum(4),d.resolved=!1,this.result.medications=this.result.medications.concat(d)}a=t.readUnsignedNum(6),this.result.diagnoses=[];for(u=0;u<a;u++){var c=new n.Diagnose;c.code=t.readUnsignedNum(14),c.resolved=!1,this.result.diagnoses=this.result.diagnoses.concat(c)}return r=t.readUnsignedNum(12),this.result.notes=t.readString(r,o.VARTEXT_CHARSET),this.result},e}();t.Decoder=a},,,function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(4);new(r(8).Resolver)(new n.Decoder(document.URL.split("#").length>1?document.URL.split("#")[1]:null).decode()).resolve()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Resolver=void 0;var n=function(){function e(e){this.result=e}return e.prototype.resolve=function(){function e(){if(200===this.xhr.status)for(var e=this.xhr.responseURL.split("/").pop(),t=JSON.parse(this.xhr.responseText),r=this.result.medications,n=0;n<r.length;n++)if(Math.floor(r[n].code/100).toString()===e){var i=r[n].code.toString();t.hasOwnProperty(i)&&(r[n].name=t[i].name,r[n].ref=t[i].ref,r[n].resolved=!0)}pageUpdate(this.result)}function t(){if(200===this.xhr.status)for(var e=this.xhr.responseURL.split("/").pop(),t=JSON.parse(this.xhr.responseText),r=this.result.diagnoses,n=0;n<r.length;n++)if(Math.floor(r[n].code/100).toString()===e){var i=r[n].code.toString();t.hasOwnProperty(i)&&(r[n].icd=t[i].icd,r[n].name=t[i].name,r[n].ref=t[i].ref,r[n].resolved=!0)}pageUpdate(this.result)}for(var r=[],n=[],i=0;i<this.result.medications.length;i++){var o=Math.floor(this.result.medications[i].code/100);r.indexOf(o)&&r.push(o)}for(i=0;i<this.result.diagnoses.length;i++){o=Math.floor(this.result.diagnoses[i].code/100);n.indexOf(o)&&n.push(o)}for(i=0;i<r.length;i++){(s=new XMLHttpRequest).open("GET","./PZN/"+r[i].toString()),s.onload=e.bind({xhr:s,result:this.result}),s.send()}for(i=0;i<n.length;i++){var s;(s=new XMLHttpRequest).open("GET","./ICD/"+n[i].toString()),s.onload=t.bind({xhr:s,result:this.result}),s.send()}},e}();t.Resolver=n}]);