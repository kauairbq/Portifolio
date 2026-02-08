"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dotenv = require("dotenv");
async function bootstrap() {
    var _a;
    dotenv.config({ override: true });
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Workflow Engine API")
        .setDescription("State machine + rule engine + audit trail")
        .setVersion("v1")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("docs", app, document);
    await app.listen((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4030);
}
bootstrap();
//# sourceMappingURL=main.js.map