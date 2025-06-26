import * as migration_20250626_003303_initial_setup from './20250626_003303_initial_setup';

export const migrations = [
  {
    up: migration_20250626_003303_initial_setup.up,
    down: migration_20250626_003303_initial_setup.down,
    name: '20250626_003303_initial_setup'
  },
];
