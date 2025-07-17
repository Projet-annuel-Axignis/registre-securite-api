import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const title = 'Registre Securite Swagger';
const description = 'Registre de sécurité API';

// Ordre personnalisé des tags (à adapter selon tes besoins)
const TAG_ORDER = [
  'Auth',
  'User',
  'Company',
  'Lot',
  'Intervention',
  'Report',
  'Building',
  'Site',
  'Plan',
  'Equipment',
  'Observation',
  // Ajoute ici tous tes tags principaux dans l’ordre souhaité
];

/**
 * Setup swagger in the application
 * @param app {INestApplication}
 */
export const SwaggerConfig = (app: INestApplication, apiVersion: string) => {
  const options = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(apiVersion)
    .addBearerAuth({ type: 'http', name: 'access_token', description: 'Set access token provided auth login route' })
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api-docs', app, document, {
    customSiteTitle: 'Registre Securite Swagger',
    swaggerOptions: {
      tagSorter: (a: string, b: string) => {
        const idxA = TAG_ORDER.indexOf(a);
        const idxB = TAG_ORDER.indexOf(b);
        if (idxA === -1 && idxB === -1) return a.localeCompare(b);
        if (idxA === -1) return 1;
        if (idxB === -1) return -1;
        return idxA - idxB;
      },
      operationsSorter: 'method',
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: 'none',
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
      tryItOutEnabled: true,
      deepLinking: true,
      defaultModelsExpandDepth: 1,
      defaultModelExpandDepth: 1,
      displayOperationId: false,
      supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
      modelPropertyMacro: null,
      parameterMacro: null,
      apisSorter: 'alpha',
      modelsSorter: 'alpha',
    },
  });
};
