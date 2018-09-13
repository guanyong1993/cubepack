export class Component extends HTMLElement {
    render() { }

    connectedCallback() {
        let html = this.render();
        if (typeof html === 'string') {
            this.innerHTML = html;
        }
    }

    disconnectedCallback() {
        this.innerHTML = '';
    }

    static Register() {
        let name = ((re, str) => str.replace(re, '$1-$2').replace(re, '$1-$2').toLowerCase())(/([^-])([A-Z])/g, this.name);
        customElements.define(name, this);
    }
}