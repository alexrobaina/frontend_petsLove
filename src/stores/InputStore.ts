import { makeAutoObservable } from 'mobx';

interface IInputs {
  value: string;
  error: boolean;
  messageError: string;
}

class InputStore implements IInputs {
  value;
  error;
  isLoading;
  messageError;

  constructor() {
    this.value = '';
    this.error = false;
    this.isLoading = false;
    this.messageError = '';

    makeAutoObservable(this);
  }

  setValue(value) {
    this.value = value;
  }

  setError(error, messageError) {
    this.error = error;
    this.messageError = messageError;
  }

  clearError() {
    this.error = false;
    this.messageError = '';
  }
}

export default InputStore;
