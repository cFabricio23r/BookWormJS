//src/auth/entity/auth.entity.ts
import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from 'class-transformer';

/*export class AuthEntity {
    @ApiProperty()
    accessToken: string;
}*/

export class ResponseEntity {
    @ApiProperty()
    message: string;
    @ApiProperty()
    data: any;
    @ApiProperty()
    status: number;
}

export class UserEntity {
    @ApiProperty()
    id: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;

    @Exclude()
    public password: string;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}

export class SummaryEntity {
    @ApiProperty()
    id: string;
    @ApiProperty()
    title: string;
    @ApiProperty()
    author: string;
    @ApiProperty()
    year: string;
    @ApiProperty()
    summary: string;
    @ApiProperty()
    key_aspects: JSON;
    @ApiProperty()
    user_id: string;

    @Exclude()
    public createdAt: string;
    @Exclude()
    public updatedAt: string;
    @Exclude()
    public context: JSON;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}