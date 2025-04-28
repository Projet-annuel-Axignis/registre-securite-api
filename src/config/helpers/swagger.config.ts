import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const title = 'BET Swagger';
const description = 'Base Équipement Technique API';

/**
 * Setup swagger in the application
 * @param app {INestApplication}
 */
export const SwaggerConfig = (app: INestApplication, apiVersion: string) => {
  const options = new DocumentBuilder().setTitle(title).setDescription(description).setVersion(apiVersion).build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api-docs', app, document, {
    customSiteTitle: 'BET Swagger',
    swaggerOptions: {
      tagSorter: 'alpha',
      operationsSorter: 'method',
      persistAuthorization: true,
      displayRequestDuration: true,
    },
  });
};
