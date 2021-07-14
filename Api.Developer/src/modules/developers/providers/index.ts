import { container } from 'tsyringe';
import { BcryptHashProvider } from './hashprovider/implementations/BcryptHashProvider';
import { IHashProvider } from './hashprovider/models/IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);
