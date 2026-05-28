import { AbilityBuilder, createMongoAbility, MongoAbility } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';

export type Action = 'manage' | 'read' | 'create' | 'update' | 'delete';
export type Subject =
  | 'Booking'
  | 'Event'
  | 'Guest'
  | 'Staff'
  | 'Table'
  | 'Analytics'
  | 'all';

export type AppAbility = MongoAbility<[Action, Subject]>;

@Injectable()
export class AbilityFactory {
  defineAbilityFor(user: Pick<User, 'role'>): AppAbility {
    const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    if (user.role === 'manager') {
      can('manage', 'all');
    } else {
      // demo — read everything, nothing else
      can('read', 'all');
    }

    return build();
  }
}
