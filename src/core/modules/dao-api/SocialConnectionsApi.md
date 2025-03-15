# .SocialConnectionsApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getSocialConnections**](SocialConnectionsApi.md#getSocialConnections) | **GET** /auth/connections | Get user\&#39;s social connections


# **getSocialConnections**
> ConnectionsList getSocialConnections()

Returns all social connections for the authenticated user.

### Example


```typescript
import { createConfiguration, SocialConnectionsApi } from '';

const configuration = createConfiguration();
const apiInstance = new SocialConnectionsApi(configuration);

const request = {};

const data = await apiInstance.getSocialConnections(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**ConnectionsList**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | List of social connections |  -  |
**500** | Server error |  -  |
**404** | User not found |  -  |
**401** | Unauthorized |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


