import {Diagnose, Encoder, Medication, MedicationIntervals, PhoneNumber, QRContents} from "./lib/parser-js/src/encoder";

class Page {
    json: QRContents;
    allergies: HTMLElement[];
    medications: HTMLElement[][];
    diagnoses: HTMLElement[];

    constructor() {
        this.allergies = [];
        this.medications = [];
        this.diagnoses = [];
    }

    addAllergie() {
        let input = document.createElement("input");
        input.className = "list-group-item form-control";
        input.type = "text";
        input.placeholder = "Allergie";
        document.getElementById('allergies_list').appendChild(input);
        this.allergies.push(input);
    }

    addDiagnose() {
        let options = [[1, "Test"], [2, "Name"], [3, "Drei"]];

        let div = document.createElement("DIV");
        div.className = "list-group-item";
        let select = document.createElement("SELECT");
        select.className = "form-control";
        let defaultOption;
        defaultOption = document.createElement("OPTION");
        defaultOption.appendChild(document.createTextNode("Bitte auswählen..."));
        defaultOption.value = NaN;
        select.appendChild(defaultOption);
        div.appendChild(select);

        let option;
        for (let i = 0; i < options.length; i++) {
            option = document.createElement("OPTION");
            option.appendChild(document.createTextNode(options[i][1].toString()));
            option.value = options[i][0];
            select.appendChild(option);
        }

        document.getElementById('diagnoses_list').appendChild(div);
        this.diagnoses.push(select);
    }

    addMedication() {
        let options = [[1, "Test"], [2, "Name"], [3, "Drei"]];

        let div = document.createElement("DIV");
        div.className = "list-group-item";
        let row = document.createElement("DIV");
        row.className = "container-fluid row";
        div.appendChild(row);
        document.getElementById('medications_list').appendChild(div);

        let select = document.createElement("SELECT");
        select.className = "col form-control";
        let defaultOption;
        defaultOption = document.createElement("OPTION");
        defaultOption.appendChild(document.createTextNode("Bitte auswählen..."));
        defaultOption.value = NaN;
        select.appendChild(defaultOption);
        row.appendChild(select);

        let option;
        for (let i = 0; i < options.length; i++) {
            option = document.createElement("OPTION");
            option.appendChild(document.createTextNode(options[i][1].toString()));
            option.value = options[i][0];
            select.appendChild(option);
        }

        let mo = document.createElement("input");
        mo.className = "col-1 form-control";
        mo.type = "number";
        mo.placeholder = "Mo";
        mo.max = "15";
        mo.min = "0";
        row.appendChild(mo);

        let mi = document.createElement("input");
        mi.className = "col-1 form-control";
        mi.type = "number";
        mi.placeholder = "Mo";
        mi.max = "15";
        mi.min = "0";
        row.appendChild(mi);

        let ab = document.createElement("input");
        ab.className = "col-1 form-control";
        ab.type = "number";
        ab.placeholder = "Mo";
        ab.max = "15";
        ab.min = "0";
        row.appendChild(ab);

        let na = document.createElement("input");
        na.className = "col-1 form-control";
        na.type = "number";
        na.placeholder = "Mo";
        na.max = "15";
        na .min = "0";
        row.appendChild(na);

        this.medications.push([select, mo, mi, ab, na]);
    }

    parseInterval(s) {
        let i = parseInt(s) | 0;
        if (i < 0) {
            i = 0;
        }
        if (i > 15) {
            i = 15;
        }
        return i;
    }

    generateAnchor() {
        let contents = new QRContents();
        contents.generationDate = Math.floor(new Date().getTime() / (24 * 60 * 60 * 1000))

        contents.phoneContact = new PhoneNumber();
        // @ts-ignore
        contents.phoneContact.name = document.getElementById("doctor_name").value;
        // @ts-ignore
        contents.phoneContact.number = document.getElementById("doctor_number").value.replace(/[^0-9+]*/g, '');

        contents.phoneMedical = new PhoneNumber();
        // @ts-ignore
        contents.phoneMedical.name = document.getElementById("emergency_name").value;
        // @ts-ignore
        contents.phoneMedical.number = document.getElementById("emergency_number").value.replace(/[^0-9+]*/g, '');

        // @ts-ignore
        contents.notes = document.getElementById('notes').value;

        contents.allergies = [];
        for (let i = 0; i < this.allergies.length; i++) {
            // @ts-ignore
            if (this.allergies[i].value !== "") {
                // @ts-ignore
                contents.allergies.push(this.allergies[i].value);
            }
        }

        contents.medications = [];
        for (let i = 0; i < this.medications.length; i++) {
            // @ts-ignore
            let select = this.medications[i][0].value;
            // @ts-ignore
            let mo = this.parseInterval(this.medications[i][1].value);
            // @ts-ignore
            let mi = this.parseInterval(this.medications[i][2].value);
            // @ts-ignore
            let ab = this.parseInterval(this.medications[i][3].value);
            // @ts-ignore
            let na = this.parseInterval(this.medications[i][4].value);

            if (select !== "NaN") {
                let medication = new Medication();
                // @ts-ignore
                medication.code = select;
                medication.intervals = new MedicationIntervals();
                medication.intervals.morning = mo;
                medication.intervals.lunch = mi;
                medication.intervals.evening = ab;
                medication.intervals.night = na;
                contents.medications.push(medication);
            }
        }

        contents.diagnoses = [];
        for (let i = 0; i < this.diagnoses.length; i++) {
            // @ts-ignore
            if (this.diagnoses[i].value !== "NaN") {
                let diagnose = new Diagnose();
                // @ts-ignore
                diagnose.code = this.diagnoses[i].value;
                contents.diagnoses.push(diagnose);
            }
        }

        let encoder = new Encoder(contents);
        let raw = encoder.encode();
        console.log("Data JSON: ");
        console.log(contents);
        console.log("Checksum: " + contents.checksum);
        console.log("Anchor: " + raw);
    }

}

let page = new Page();  // build Page

export {page, QRContents}
