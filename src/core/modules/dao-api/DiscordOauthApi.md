# .DiscordOauthApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**connectDiscord**](DiscordOauthApi.md#connectDiscord) | **GET** /auth/discord/connect | Initiate Discord OAuth flow
[**disconnectDiscord**](DiscordOauthApi.md#disconnectDiscord) | **DELETE** /auth/discord/disconnect | Disconnect Discord account
[**discordCallback**](DiscordOauthApi.md#discordCallback) | **GET** /auth/discord/callback | Handle Discord OAuth callback


# **connectDiscord**
> connectDiscord()

Redirects the user to Discord\'s authorization page to begin the OAuth flow.

### Example


```typescript
import { createConfiguration, DiscordOauthApi } from '';

const configuration = createConfiguration();
const apiInstance = new DiscordOauthApi(configuration);

const request = {};

const data = await apiInstance.connectDiscord(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**302** | Redirect to Discord authorization page |  -  |
**401** | Unauthorized |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **disconnectDiscord**
> DisconnectResponse disconnectDiscord()

Removes the connection between the user\'s account and their Discord account.

### Example


```typescript
import { createConfiguration, DiscordOauthApi } from '';

const configuration = createConfiguration();
const apiInstance = new DiscordOauthApi(configuration);

const request = {};

const data = await apiInstance.disconnectDiscord(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**DisconnectResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Connection successfully removed |  -  |
**404** | No connection found |  -  |
**401** | Unauthorized |  -  |
**500** | Error disconnecting account |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **discordCallback**
> discordCallback()

Processes the callback from Discord after user authorization.

### Example


```typescript
import { createConfiguration, DiscordOauthApi } from '';

const configuration = createConfiguration();
const apiInstance = new DiscordOauthApi(configuration);

const request = {};

const data = await apiInstance.discordCallback(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**302** | Redirect to frontend with success or error status |  -  |
**500** | Database error |  -  |
**400** | User info retrieval failed |  -  |
**401** | Unauthorized |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


