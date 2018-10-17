export default class StateSelect extends HTMLSelectElement {
  constructor() {
    super();
    const template = document.getElementById('state-select-template').content;
    this.append(document.importNode(template, true));

    const territories = this.querySelector('optgroup[label="Outlying Territories"]');
    const armedForces = this.querySelector('optgroup[label="Armed Forces"]');

    const observer = new MutationObserver(mutations => {
      territories.disabled = ! this.territories;
      armedForces.disabled = ! this.armedForces;
    });

    observer.observe(this, {
      attributes: true,
      attributeFilter: ['territories', 'armed-forces'],
    });

    territories.disabled = ! this.territories;
    armedForces.disabled = ! this.armedForces;
  }

  get territories() {
    return this.hasAttribute('territories');
  }

  set territories(include) {
    if (include) {
      this.setAttribute('territories', '');
    } else {
      this.removeAttribute('territories', '');
    }
  }

  get armedForces() {
    return this.hasAttribute('armed-forces');
  }

  set armedForces(include) {
    if (include) {
      this.setAttribute('armed-forces', '')
    } else {
      this.removeAttribute('armed-forces');
    }
  }
}


fetch(new URL('form/address/state-select/state-select.html', document.baseURI)).then(async resp => {
  if (resp.ok) {
    const parser = new DOMParser();
    const html = await resp.text();
    const doc = parser.parseFromString(html, 'text/html');
    document.body.append(...doc.body.children);
    customElements.define('state-select', StateSelect, {extends: 'select'});
  }
})
