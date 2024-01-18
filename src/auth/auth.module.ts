import { Module, Options } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./user.schma";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports:[MongooseModule.forFeature([{name:'User' , schema:UserSchema}]) , 
    JwtModule.register({
        global: true,
        secret: 'secret',
        signOptions: { expiresIn: '60s' },
      }),
    ],
    controllers:[AuthController],
    providers:[AuthService]
})

export class AuthModule {}