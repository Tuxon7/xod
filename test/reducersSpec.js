import * as Actions from '../app/actions.js';
import { initialState } from '../app/state.js';
import { newId, nodes, lastId, copyNode } from '../app/reducers.js';
import chai from 'chai';


describe('Nodes reducer', function() {
  describe('while adding node', function () {
    it('should insert node', () => {
      "use strict";
      const oldState = initialState.project.nodes;
      const state = nodes(oldState, Actions.addNode({
        id: null,
        patchId: 1,
        typeId: 0,
        props: {
          label: 'node'
        }
      }));
      chai.assert(newId(oldState) + 1=== newId(state));
    });

    it('should set appropriate id for a new node', () => {
      "use strict";
      const props = {
        label: 'node'
      };
      const oldState = initialState.project.nodes;
      const state = nodes(oldState, Actions.addNode({
        id: null,
        patchId: 1,
        typeId: 0,
        props
      }));
      const newNode = state[lastId(state)];
      chai.assert(newNode.id === lastId(state));
    });

    it('should be reverse operation for node deletion', () => {
      "use strict";
      let state = null;
      const props = {
        label: 'node'
      };
      const oldState = initialState.project.nodes;
      state = nodes(oldState, Actions.addNode({
        id: null,
        patchId: 1,
        typeId: 0,
        props
      }));
      state = nodes(state, Actions.deleteNode(lastId(state)));
      chai.expect(state).to.deep.equal(oldState);
    });
  });

  describe('while removing node', function () {
    it('should remove node', () => {
      "use strict";
      const oldState = initialState.project.nodes;
      const state = nodes(oldState, Actions.deleteNode(lastId(oldState)));

      chai.assert(lastId(oldState) - 1 === lastId(state));
    });

    it('should remove node with specified id', () => {
      "use strict";
      const oldState = initialState.project.nodes;
      const removingNodeId = lastId(oldState);
      const state = nodes(oldState, Actions.deleteNode(removingNodeId));

      chai.assert(!nodes.hasOwnProperty(removingNodeId));
    });

    it('should be reverse operation for node insertion', () => {
      "use strict";
      let state = null;
      const props = {
        label: 'node'
      };
      const oldState = initialState.project.nodes;
      const removingNodeId = lastId(oldState);
      const removingNode = copyNode(oldState[removingNodeId]);
      state = nodes(oldState, Actions.deleteNode(removingNodeId));
      state = nodes(state, Actions.addNode(removingNode));
      chai.expect(state).to.deep.equal(oldState);
    });
  });

  describe('while moving node', function () {
    it('should move node', () => {
      "use strict";
      const oldState = initialState.project.nodes;
      const movingNodeId = lastId(oldState);
      const position = {
        x: 0,
        y: 100
      };
      const state = nodes(oldState, Actions.moveNode(lastId(oldState), position));

      const movedNode = state[lastId(oldState)];

      chai.expect(movedNode.position).to.deep.equal(position);
    });

    it('should not affect other nodes', () => {
      "use strict";
      const oldState = initialState.project.nodes;
      const removingNodeId = lastId(oldState);
      const state = nodes(oldState, Actions.deleteNode(removingNodeId));

      chai.assert(!nodes.hasOwnProperty(removingNodeId));
    });
  });
});
