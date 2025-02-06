import { ModalBoxConfig } from "@bitnoi.se/react-scheduler/codebase/dhtmlxgantt.es.d.ts";

export default class ModalConfigBox extends ModalBoxConfig {
    constructor() {
        super();
        this.buttons = ["delete", "cancel", "save"];
        this.textarea = true;
        this.input = true;
    }
}
