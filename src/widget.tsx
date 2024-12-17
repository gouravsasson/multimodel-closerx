import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

class ReactWidget extends HTMLElement {
  private root: ReactDOM.Root | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const container = document.createElement('div');
    this.shadowRoot?.appendChild(container);

    this.root = ReactDOM.createRoot(container);
    this.root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }

  disconnectedCallback() {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
  }
}

customElements.define('react-widget', ReactWidget);

export function createReactWidget() {
  const widget = document.createElement('react-widget');
  document.body.appendChild(widget);
  return widget;
}