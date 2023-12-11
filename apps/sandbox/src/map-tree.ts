import {
  BRANCH_TYPES,
  SyntaxTree,
  TreeBranchToken,
} from '@idl/parsing/syntax-tree';
import { BasicTokenNames, NonBasicTokenNames } from '@idl/parsing/tokenizer';

import { MiniTree, MiniTreeToken } from './mini-tree.interface';

/**
 * Recursor for our tree creator
 */
function MapTreeRecursor(tree: SyntaxTree, scope: number[]): MiniTree {
  /**
   * Create our mini tree
   */
  const mini: MiniTree = [];

  /**
   * Process each node
   */
  for (let i = 0; i < tree.length; i++) {
    /** Get new scope */
    const iScope = scope.concat([i]);

    // check what kind of node we are working with
    if (tree[i].t === BRANCH_TYPES.BRANCH) {
      const add: MiniTreeToken<NonBasicTokenNames> = [
        i,
        BRANCH_TYPES.BRANCH,
        tree[i].n as any,
        scope.concat([i]),
        [[tree[i].p, tree[i].match]],
        tree[i].p,
        {
          accessTokens: tree[i].at,
          cache: tree[i].c,
          hoverOverride: tree[i].h,
        },
        MapTreeRecursor((tree[i] as TreeBranchToken).kids, iScope),
      ];

      // add to tree
      mini.push(add);
    } else {
      const add: MiniTreeToken<BasicTokenNames> = [
        i,
        BRANCH_TYPES.BASIC,
        tree[i].n as any,
        scope.concat([i]),
        [[tree[i].p, tree[i].match]],
        tree[i].p,
        {
          accessTokens: tree[i].at,
          cache: tree[i].c,
          hoverOverride: tree[i].h,
        },
      ];

      // add to tree
      mini.push(add);
    }
  }

  return mini;
}

/**
 * Maps tree to our minimal data format
 */
export function MapTree(tree: SyntaxTree) {
  return MapTreeRecursor(tree, []);
}
