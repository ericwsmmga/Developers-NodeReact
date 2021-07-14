import { container } from 'tsyringe';
import { IDevelopersRepository } from '@modules/developers/domain/repositories/IDevelopersRepository';
import { DevelopersRepository } from '@modules/developers/infra/typeorm/repositories/DevelopersRepository';
import '@modules/developers/providers';
import { ILogErrorsRepository } from '@modules/logs/errors/domain/repositories/ILogErrorsRepository';
import { LogErrorsRepository } from '@modules/logs/errors/infra/typeorm/repositories/LogErrorsRepository';

container.registerSingleton<IDevelopersRepository>(
   'DevelopersRepository',
   DevelopersRepository,
);

container.registerSingleton<ILogErrorsRepository>(
   'LogErrorsRepository',
   LogErrorsRepository,
);
