class Loader {
  async load() {
    if (this._wasm) return;
    this._wasm = import(
      "@emurgo/cardano-serialization-lib-browser/cardano_serialization_lib"
    );
  }

  get Cardano() {
    return this._wasm;
  }
}

export default new Loader();