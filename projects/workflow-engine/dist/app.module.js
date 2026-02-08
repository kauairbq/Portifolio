"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const bull_1 = require("@nestjs/bull");
const prisma_module_1 = require("./prisma/prisma.module");
const workflows_module_1 = require("./workflows/workflows.module");
const versions_module_1 = require("./versions/versions.module");
const instances_module_1 = require("./instances/instances.module");
const rules_module_1 = require("./rules/rules.module");
const audit_module_1 = require("./audit/audit.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            throttler_1.ThrottlerModule.forRoot({ throttlers: [{ ttl: 60, limit: 100 }] }),
            bull_1.BullModule.forRoot({
                redis: (_a = process.env.REDIS_URL) !== null && _a !== void 0 ? _a : "redis://localhost:6379",
            }),
            prisma_module_1.PrismaModule,
            workflows_module_1.WorkflowsModule,
            versions_module_1.VersionsModule,
            instances_module_1.InstancesModule,
            rules_module_1.RulesModule,
            audit_module_1.AuditModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map