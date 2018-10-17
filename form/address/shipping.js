export default class HTMLShippingAddressElement extends HTMLFieldSetElement {
  constructor() {
    super();
    const tmp = document.getElementById('address-fieldset-template').content;
    this.append(document.importNode(tmp, true));
  }

  get name() {
    return this.querySelector('input[name="contact[name]"]').value;
  }

  set name(name) {
    this.querySelector('input[name="contact[name]"]').value = name;
  }

  get address() {
    return this.querySelector('textarea[name="contact[address]"]').value.split('\n');
  }
}

fetch(new URL('form/address/shipping.html', document.baseURI)).then(async resp => {
  if (resp.ok) {
    const parser = new DOMParser();
    const html = await resp.text();
    const doc = parser.parseFromString(html, 'text/html');
    document.body.append(...doc.body.children);
    await customElements.whenDefined('state-select');
    customElements.define('shipping-address', HTMLShippingAddressElement, {extends: 'fieldset'});
  }
});
