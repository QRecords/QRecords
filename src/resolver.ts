import {QRContents} from "./qrcontents";

// @ts-ignore
Number.prototype.zfill = function(size) {
    var s = String(this);
    while (s.length < (size)) {s = "0" + s;}
    return s;
}

export class Resolver {
    result: QRContents;
    callback: CallableFunction;

    constructor(result: QRContents, callback: CallableFunction) {
        this.result = result;
        this.callback = callback;
    }

    resolve() {
        function add_medications() {
            if (this.xhr.status === 200) {
                let fileName = this.xhr.responseURL.split('/').pop();
                let json = JSON.parse(this.xhr.responseText);
                let medications = this.result.medications;
                for (let i = 0; i < medications.length; i++) {
                    if (Math.floor(medications[i].code / 100).toString() === fileName) {
                        let code = medications[i].code.zfill(5);
                        if (json.hasOwnProperty(code)) {
                            medications[i].name = json[code].name;
                            medications[i].ref = json[code].ref;
                            medications[i].resolved = true;
                        }
                    }
                }
            }
            this.callback();
        }

        function add_diagnoses() {
            if (this.xhr.status === 200) {
                let fileName = this.xhr.responseURL.split('/').pop();
                let json = JSON.parse(this.xhr.responseText);
                let diagnoses = this.result.diagnoses;
                for (let i = 0; i < diagnoses.length; i++) {
                    if (Math.floor(diagnoses[i].code / 100).toString() === fileName) {
                        let code = diagnoses[i].code.zfill(5);
                        if (json.hasOwnProperty(code)) {
                            diagnoses[i].icd = json[code].icd;
                            diagnoses[i].name = json[code].name;
                            diagnoses[i].ref = json[code].ref;
                            diagnoses[i].resolved = true;
                        }
                    }
                }
            }
            this.callback();
        }

        let medication_files = [];
        let diagnose_files = [];

        for (let i = 0; i < this.result.medications.length; i++) {
            let file = Math.floor(this.result.medications[i].code / 100)
            if (medication_files.indexOf(file)) {
                medication_files.push(file);
            }
        }
        for (let i = 0; i < this.result.diagnoses.length; i++) {
            let file = Math.floor(this.result.diagnoses[i].code / 100)
            if (diagnose_files.indexOf(file)) {
                diagnose_files.push(file);
            }
        }
        for (let i = 0; i < medication_files.length; i++) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', './PZN/' + medication_files[i].toString());
            xhr.onload = add_medications.bind({'xhr': xhr, 'result': this.result, 'callback': this.callback});
            xhr.send();
        }
        for (let i = 0; i < diagnose_files.length; i++) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', './ICD/' + diagnose_files[i].toString());
            xhr.onload = add_diagnoses.bind({'xhr': xhr, 'result': this.result, 'callback': this.callback});
            xhr.send();
        }
    }
}