'use babel';

import { CompositeDisposable } from 'atom';
import * as xpath from 'xpath';
import { DOMParser as dom } from 'xmldom';
import InputDialog from '@aki77/atom-input-dialog';

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
    var dialog = new InputDialog({
      callback: (query) => {
        console.log("query", query)
        let editor
        if (editor = atom.workspace.getActiveTextEditor()) {

          // use this dummy reverse code for now
          let selection = editor.getSelectedText()
          var doc = new dom().parseFromString(selection)
          var result = xpath.select(`string(${query})`, doc)

          // console.log(nodes[0].localName + ": " + nodes[0].firstChild.data)
          // console.log("Node: " + nodes[0].toString())
          //
          // let reversed = selection.split('').reverse().join('')
          editor.insertText(result)
        }
      }
    })
    dialog.attach()
  }

};
