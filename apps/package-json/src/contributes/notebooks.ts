import {
  IDL_COMMANDS,
  IDL_NOTEBOOK_CONTROLLER_TRANSLATION_NAME,
  IDL_NOTEBOOK_EXTENSION,
  IDL_NOTEBOOK_NAME,
} from '@idl/shared';

import { IPackageJSON, IPackageNLS } from '../package.interface';
import { VerifyNLS } from './helpers/verify-nls';

/**
 * When we have a notebook open, the toolbar we add
 */
export const NOTEBOOK_TOOLBAR = [
  {
    command: IDL_COMMANDS.NOTEBOOKS.RESET,
    group: 'navigation',
    when: `resourceExtname == ${IDL_NOTEBOOK_EXTENSION}`,
  },
  {
    command: IDL_COMMANDS.NOTEBOOKS.STOP,
    group: 'navigation',
    when: `resourceExtname == ${IDL_NOTEBOOK_EXTENSION}`,
  },
];

/**
 * Adds config for notebooks to our file
 */
export function ProcessNotebooks(packageJSON: IPackageJSON, nls: IPackageNLS) {
  const ourNotebook = {
    type: IDL_NOTEBOOK_NAME,
    displayName: '%notebooks.title%',
    selector: [
      {
        filenamePattern: `*${IDL_NOTEBOOK_EXTENSION}`,
      },
    ],
  };

  if (!VerifyNLS(ourNotebook.displayName, nls)) {
    throw new Error('Notebook displayName not in translation');
  }

  if (!VerifyNLS(IDL_NOTEBOOK_CONTROLLER_TRANSLATION_NAME, nls)) {
    throw new Error(
      'IDL_NOTEBOOK_CONTROLLER_TRANSLATION_NAME not in translation'
    );
  }

  // add to contribution point
  const contrib = packageJSON['contributes'];
  contrib['notebooks'] = [ourNotebook];

  // get menu to add debug icons
  if (!('menus' in contrib)) {
    contrib['menus'] = {};
  }
  const menus = contrib['menus'];
  menus['notebook/toolbar'] = NOTEBOOK_TOOLBAR;
}
