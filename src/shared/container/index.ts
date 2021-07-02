import { container } from 'tsyringe';
import { IDeveloperRepository } from '@modules/developer/domain/repositories/IDeveloperRepository';
import { DeveloperRepository } from '@modules/developer/infra/typeorm/repositories/DeveloperRepository';

container.registerSingleton<IDeveloperRepository>(
   'DeveloperRepository',
   DeveloperRepository,
);
