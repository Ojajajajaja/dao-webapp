# .TwitterOauthApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**connectTwitter**](TwitterOauthApi.md#connectTwitter) | **GET** /auth/twitter/connect | Initiate Twitter OAuth flow
[**disconnectTwitter**](TwitterOauthApi.md#disconnectTwitter) | **DELETE** /auth/twitter/disconnect | Disconnect Twitter account
[**twitterCallback**](TwitterOauthApi.md#twitterCallback) | **GET** /auth/twitter/callback | Handle Twitter OAuth callback


# **connectTwitter**
> OAuthResponse connectTwitter()

Redirects the user to Twitter\'s authorization page to begin the OAuth 2.0 PKCE flow.

### Example


```typescript
import { createConfiguration, TwitterOauthApi } from '';

const configuration = createConfiguration();
const apiInstance = new TwitterOauthApi(configuration);

const request = {};

const data = await apiInstance.connectTwitter(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**OAuthResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Redirect to Twitter authorization page |  -  |
**401** | Unauthorized |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **disconnectTwitter**
> DisconnectResponse disconnectTwitter()

Removes the connection between the user\'s account and their Twitter account.

### Example


```typescript
import { createConfiguration, TwitterOauthApi } from '';

const configuration = createConfiguration();
const apiInstance = new TwitterOauthApi(configuration);

const request = {};

const data = await apiInstance.disconnectTwitter(request);
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
**500** | Error disconnecting account |  -  |
**404** | No connection found |  -  |
**401** | Unauthorized |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **twitterCallback**
> twitterCallback()

Processes the callback from Twitter after user authorization.

### Example


```typescript
import { createConfiguration, TwitterOauthApi } from '';

const configuration = createConfiguration();
const apiInstance = new TwitterOauthApi(configuration);

const request = {};

const data = await apiInstance.twitterCallback(request);
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


