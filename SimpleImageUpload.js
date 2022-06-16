class SimpleImageUpload extends HTMLElement {

  #privateVariable = 'es privada';
  publicaVariable = 'es publica';

  constructor() {
    super();
    // this.attachShadow({ mode: "open" });
    this.file = 'voy a ser un archivo';
    console.log('los artibutos', this.getAttributeNames());
  }

  static get observedAttributes() {
    return ['drag-enabled'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('Custom square element attributes changed.');
    console.log(name, oldValue, newValue);
    //updateStyle(this);
  }

  disconnectedCallback() {
    console.log('Custom square element removed from page.');
    this.querySelector('#archivo')
      .removeEventListener('change', this);
  }

  adoptedCallback() {
    console.log('Custom square element moved to new page.');
  }

  #showImage(event) {
    const imagenSource = event.target.result;
    const previewImage = this.querySelector('#preview');

    previewImage.src = imagenSource;
  }

  #readFile(event) {
    console.log('readFile', event.target);
    const imagen = event.target.files[0];
    const lector = new FileReader();

    lector.addEventListener('load', (progress) => {
      console.log('imagen cargada', progress);
      this.#showImage(progress);
    }, false);

    lector.readAsDataURL(imagen);
  }

  connectedCallback() {
    console.log('Custom square element added to page.');
    console.log(this.shadowRoot);

    //this.shadowRoot.innerHTML = `
    this.innerHTML = `
    <div id="supremo" data-loba="me late">
      <div class="input-container">
        Clic aquí para subir tu avatar
        <input type="file" id="archivo" name="archivo" />
      </div>
      <div class="preview-container">
        <img alt="uploadedFile" src="" id="preview" />
      </div>
    </div>`;
    const element = this.querySelector('div#supremo');
    console.log('selected', element);

    this.querySelector('#archivo')
      .addEventListener('change', this);
  }

  handleEvent(event) {
    console.log('hanlde even', event);
    if (event.type === 'change')
      this.#readFile(event);
  }
}

window.customElements.define('simple-image-upload', SimpleImageUpload);
