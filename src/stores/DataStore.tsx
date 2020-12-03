import { makeAutoObservable, observable } from "mobx";
// import { useStaticRendering } from "mobx-react";

const isServer = typeof window === "undefined";
// eslint-disable-next-line react-hooks/rules-of-hooks
// useStaticRendering(isServer);

type Note = {
  title: string;
  content: string;
};

export class DataStore {
  title: string | undefined;

  constructor() {
    makeAutoObservable(this, { title: observable.shallow })
  }

  setNote(note: Note) {
    this.title = note.title;
  }

  changeTitle(newTitle: string) {
    this.title = newTitle;
  }
}

export async function fetchInitialStoreState() {
  // You can do anything to fetch initial store state
  return {};
}