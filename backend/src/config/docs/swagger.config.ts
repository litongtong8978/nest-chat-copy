import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export class SwaggerConfig{
  static config(app){
    const config = new DocumentBuilder()
      .setTitle('NestJS Chat Copy API')
      .setDescription('NestJS Chat Copy API')
      .setVersion('1.0')
      .addBearerAuth({
        type:'http',
        scheme:'bearer',
        bearerFormat:'JWT'
      })
      .build();
    const document = SwaggerModule.createDocument(app,config);
    SwaggerModule.setup('docs',app,document);
  }
}