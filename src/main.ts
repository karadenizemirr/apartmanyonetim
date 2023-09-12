import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { join } from 'path';
import Handlebars from 'handlebars';
import secureSession from '@fastify/secure-session'
import { ErrorInterceptor } from './interceptors/error.interceptors';


async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.useStaticAssets({
    root: join(__dirname, '..', 'src/assets/public'),
    prefix: '/public/',
  });
  app.setViewEngine({
    engine: {
      handlebars: require('handlebars'),
    },
    templates: join(__dirname, '..', 'src/assets/views'),
    layout: 'partials/layout'
  });

  Handlebars.registerHelper('selectOption', function(a,b){
    if (a == b){
      return 'selected'
    }
    return ''
  })

  await app.register(secureSession, {
    secret: 'averylogphrasebiggerthanthirtytwochars',
    salt: 'mq9hDxBVDbspDR6n',
    cookieName: 'apartmanyonetimsistemi',
    cookie: {
      path: '/',
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 // 7 days
    }
  });

  app.useGlobalFilters(new ErrorInterceptor())
  await app.listen(3000);
}
bootstrap();