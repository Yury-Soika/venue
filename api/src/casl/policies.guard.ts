import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AbilityFactory, AppAbility } from './ability.factory';
import { CHECK_POLICIES_KEY, PolicyHandler } from './check-policies.decorator';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: AbilityFactory,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const handlers = this.reflector.get<PolicyHandler[]>(
      CHECK_POLICIES_KEY,
      context.getHandler(),
    );

    // No @CheckPolicies on this route — allow through
    if (!handlers) return true;

    const { user } = context.switchToHttp().getRequest();
    const ability = this.abilityFactory.defineAbilityFor(user);

    const allowed = handlers.every(handler => handler(ability));
    if (!allowed) throw new ForbiddenException('Insufficient permissions');

    return true;
  }
}
