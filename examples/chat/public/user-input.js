class UserInput extends AlonElement {
  constructor() {
    super();

    // Define the component's structure with inline styles using CSS variables
    const form = Habiscript.toElement([
      'form',
      {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--base-padding, 0.5rem)',
          width: '100%',
        }
      },
      [
        'textarea',
        {
          name: 'input',
          placeholder: 'Enter message',
          style: {
            flex: 1,
            padding: 'var(--base-padding, 0.5rem)',
            border: '1px solid #ccc',
            borderRadius: 'var(--border-radius, 0.5rem)',
            resize: 'vertical',
            fontSize: '1rem',
            ':focus': {
              outline: 'none',
              borderColor: 'var(--focus-color, #4a90e2)',
              boxShadow: `0 0 0 0.0625rem var(--focus-color, #4a90e2)`
            }
          }
        }
      ],
      [
        'button',
        {
          type: 'submit',
          style: {
            padding: 'var(--base-padding, 0.5rem)',
            border: 'none',
            borderRadius: 'var(--border-radius, 0.5rem)',
            backgroundColor: 'var(--primary-color, #5c6bc0)',
            color: 'white',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'background-color 0.3s',
            ':hover': {
              filter: 'brightness(90%)',
            },
            ':active': {
              filter: 'brightness(80%)',
            }
          }
        },
        'Send'
      ]
    ]);

    // Attach the form to the shadow DOM
    this.attachShadow({ mode: 'open' }).appendChild(form);
  }

  get input() {
    return this.shadowRoot.querySelector('[name=input]');
  }

  get form() {
    return this.shadowRoot.querySelector('form');
  }

  get value() {
    return this.input.value;
  }


  connectedCallback() {
    this.intercept(this.form, 'submit', (e) => {
      this.signalUp({ userInput: { value: this.value } });
      e.currentTarget.reset();
    });
  }
}

customElements.define('user-input', UserInput);
