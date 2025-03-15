/**
 * DAO-API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * OpenAPI spec version: dev
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { HttpFile } from '../http/http';

export class TelegramAuth {
    /**
    * Telegram user ID
    */
    'id': number;
    /**
    * User\'s first name
    */
    'firstName': string;
    /**
    * Telegram username
    */
    'username': string;
    /**
    * URL of the user\'s profile photo
    */
    'photoUrl'?: string;
    /**
    * Authentication date (Unix time)
    */
    'authDate': number;
    /**
    * Authentication hash
    */
    'hash': string;

    static readonly discriminator: string | undefined = undefined;

    static readonly mapping: {[index: string]: string} | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "id",
            "baseName": "id",
            "type": "number",
            "format": ""
        },
        {
            "name": "firstName",
            "baseName": "first_name",
            "type": "string",
            "format": ""
        },
        {
            "name": "username",
            "baseName": "username",
            "type": "string",
            "format": ""
        },
        {
            "name": "photoUrl",
            "baseName": "photo_url",
            "type": "string",
            "format": ""
        },
        {
            "name": "authDate",
            "baseName": "auth_date",
            "type": "number",
            "format": ""
        },
        {
            "name": "hash",
            "baseName": "hash",
            "type": "string",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return TelegramAuth.attributeTypeMap;
    }

    public constructor() {
    }
}
