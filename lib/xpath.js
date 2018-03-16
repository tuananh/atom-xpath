'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'xpath:query': () => this.query()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  query() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {

      // use this dummy reverse code for now
      let selection = editor.getSelectedText()
      let reversed = selection.split('').reverse().join('')
      editor.insertText(reversed)
    }
  }

};
