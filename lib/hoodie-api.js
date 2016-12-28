'use babel';

import HoodieApiView from './hoodie-api-view';
import { CompositeDisposable } from 'atom';

export default {

  hoodieApiView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.hoodieApiView = new HoodieApiView(state.hoodieApiViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.hoodieApiView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'hoodie-api:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.hoodieApiView.destroy();
  },

  serialize() {
    return {
      hoodieApiViewState: this.hoodieApiView.serialize()
    };
  },

  toggle() {
    console.log('HoodieApi was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
