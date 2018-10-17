import './form/address/shipping.js';
import './form/address/state-select/state-select.js';

async function ready() {
  await new Promise(resolve => {
    if (document.readyState === 'interactive') {
      resolve();
    } else {
      document.addEventListener('DOMContentLoaded', () => resolve, {once: true});
    }
  })
}

ready().then(() => {
  document.forms.contact.addEventListener('submit', event => {
    event.preventDefault();
    const form = new FormData(event.target);
    console.log([...form.entries()]);
  })
});
