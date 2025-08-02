import { Matches } from "class-validator";

export class AuthDto {

    
    @Matches(/^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/, {
        message: '5–20 chars, start/end with letter/number, no repeated ".", "_", "-"',
    })
    username: string;


    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,20}$/, {
        message: '8–20 chars, must include uppercase, lowercase, digit, special char (@.#$!%*?&)',
    })
    password: string;

}
