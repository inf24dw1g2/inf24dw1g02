import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';

export {ApplicationConfig};

export class FitnessTrackerApiLbApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Enable CORS for frontend (localhost:3000)
    this.static('/', path.join(__dirname, '../public'));

    // Set up CORS middleware
    this.bind('rest.cors').to({
      allowedOrigins: ['http://localhost:3000'], // Your frontend URL
      allowedMethods: ['GET', 'POST', 'PUT', 'DELETE'], // HTTP methods allowed
      allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers
      credentials: true, // Enable credentials if needed
    });

    // Set up the custom sequence
    this.sequence(MySequence);

    // Configure the Rest Explorer (for testing endpoints)
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    // Set project root and boot options
    this.projectRoot = __dirname;
    this.bootOptions = {
      controllers: {
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
