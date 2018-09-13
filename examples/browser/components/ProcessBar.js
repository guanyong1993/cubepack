import {Component} from "Component";

export class ProcessBar extends Component {
    constructor(process) {
        super();
        this.process = process;
    }
    render() {
        return `<div style="width: 260px; height: 26px; border: 1px solid #dddddd; margin: 24px auto;">
            <div style="width: ${this.process}%;height: 24px; background: dodgerblue;margin: 1px;"></div>
        </div>`;
    }
}