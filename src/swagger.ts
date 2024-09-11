import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

// Swagger API Document
export const swagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('API Sample')
    .setDescription('Sample description')
    .setVersion('0.1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('/swagger', app, document)
}
